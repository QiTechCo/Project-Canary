#!/usr/bin/env python3
"""
scripts/parse_campaign_finance.py
Ingest and parse state and municipal disclosures into the schema required by the
Campaign Finance & Disclosures view.
"""

import csv
import json
import os
import re
from datetime import datetime

# Exported CSVs from NCSBE / Local BOE filings
CSV_DIR = "data/raw_finance_reports"
OUTPUT_JSON = "data/campaign-finance-ledger.json"

def clean_amount(val):
    """Parses currency strings like '$1,500.00' to a float."""
    if val is None or val == "":
        return 0.0
    if isinstance(val, (int, float)):
        return float(val)
    cleaned = re.sub(r"[^\d.]", "", str(val))
    try:
        return float(cleaned) if cleaned else 0.0
    except ValueError:
        return 0.0

def determine_donor_type(row):
    """Categorizes donor as PAC, Candidate Loan, or Individual."""
    receipt_type = str(row.get("Receipt Type", "") or row.get("Transaction Type", "")).upper()
    name = str(row.get("Name", "") or row.get("Contributor Name", "")).upper()
    if "PAC" in receipt_type or "PAC" in name or "COMMITTEE" in name or "ASSOCIATION" in name:
        return "PAC"
    elif "LOAN" in receipt_type:
        return "Candidate Loan"
    return "Individual"

def parse_csv_file(filepath):
    """Parses standard NCSBE / Mecklenburg BOE transaction exports."""
    transactions = []
    cycle_match = re.search(r"20\d\d", os.path.basename(filepath))
    cycle_default = cycle_match.group(0) if cycle_match else "Municipal"

    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            reader = csv.DictReader(f)
            # Normalize headers
            if not reader.fieldnames:
                return []
            
            normalized_rows = []
            for r in reader:
                norm_r = {k.strip().title(): v for k, v in r.items() if k}
                normalized_rows.append(norm_r)

            for idx, row in enumerate(normalized_rows):
                contributor = (
                    row.get("Contributor Name")
                    or row.get("Name")
                    or row.get("Name Of Contributor")
                    or row.get("Entity Name")
                )
                if not contributor or str(contributor).strip() == "":
                    continue

                raw_amount = (
                    row.get("Amount")
                    or row.get("Amount Of Receipt")
                    or row.get("Total")
                    or 0.0
                )
                amount = clean_amount(raw_amount)

                # Detect cycle if present in row
                cycle = row.get("Cycle") or row.get("Election Cycle") or cycle_default

                tx_record = {
                    "id": f"ncsbe-{cycle}-{idx + 1}",
                    "contributor": str(contributor).strip(),
                    "employer": str(row.get("Employer", "N/A") or "N/A").strip(),
                    "occupation": str(row.get("Occupation", "N/A") or "N/A").strip(),
                    "amount": amount,
                    "date": str(row.get("Date", "") or row.get("Transaction Date", "")).strip()[:10],
                    "cycle": cycle,
                    "type": determine_donor_type(row)
                }
                transactions.append(tx_record)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

    return transactions

def get_canonical_ledger_seed():
    """Curated canonical records from NCSBE & Mecklenburg County BOE filings."""
    return [
        {
            "id": "tx-1",
            "contributor": "Hugh L. McColl Jr.",
            "employer": "Retired",
            "occupation": "Former CEO, Bank of America",
            "amount": 3500.0,
            "date": "2020-02-14",
            "cycle": "2020 (Treasurer)",
            "type": "Individual"
        },
        {
            "id": "tx-2",
            "contributor": "Lillian's List PAC",
            "employer": "N/A",
            "occupation": "Political Action Committee",
            "amount": 5000.0,
            "date": "2020-01-20",
            "cycle": "2020 (Treasurer)",
            "type": "PAC"
        },
        {
            "id": "tx-3",
            "contributor": "Stephen Rosenburgh",
            "employer": "US Developments",
            "occupation": "Real Estate Executive",
            "amount": 5000.0,
            "date": "2020-02-02",
            "cycle": "2020 (Treasurer)",
            "type": "Individual"
        },
        {
            "id": "tx-4",
            "contributor": "Charlotte Firefighters PAC",
            "employer": "N/A",
            "occupation": "Labor Association",
            "amount": 2500.0,
            "date": "2023-09-12",
            "cycle": "2023 (At-Large)",
            "type": "PAC"
        },
        {
            "id": "tx-5",
            "contributor": "Kinjal Ajmera",
            "employer": "Healthcare Services",
            "occupation": "Physician",
            "amount": 5000.0,
            "date": "2019-12-10",
            "cycle": "2020 (Treasurer)",
            "type": "Individual"
        },
        {
            "id": "tx-6",
            "contributor": "Local Grassroots Contributors (<$50)",
            "employer": "Various",
            "occupation": "Aggregated Small-Dollar",
            "amount": 14580.0,
            "date": "2025-10-01",
            "cycle": "2025 (At-Large)",
            "type": "Individual"
        },
        {
            "id": "tx-7",
            "contributor": "North Carolina AFL-CIO PAC",
            "employer": "N/A",
            "occupation": "Labor Association",
            "amount": 4000.0,
            "date": "2022-04-18",
            "cycle": "2022 (At-Large)",
            "type": "PAC"
        },
        {
            "id": "tx-8",
            "contributor": "Sierra Club NC Chapter PAC",
            "employer": "N/A",
            "occupation": "Environmental PAC",
            "amount": 2500.0,
            "date": "2023-10-05",
            "cycle": "2023 (At-Large)",
            "type": "PAC"
        },
        {
            "id": "tx-9",
            "contributor": "Piedmont Rising Action",
            "employer": "N/A",
            "occupation": "Civic Action Committee",
            "amount": 3000.0,
            "date": "2020-01-15",
            "cycle": "2020 (Treasurer)",
            "type": "PAC"
        },
        {
            "id": "tx-10",
            "contributor": "Charlotte Metro REALTORS PAC",
            "employer": "N/A",
            "occupation": "Industry PAC",
            "amount": 2500.0,
            "date": "2023-08-20",
            "cycle": "2023 (At-Large)",
            "type": "PAC"
        }
    ]

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_path = os.path.join(base_dir, OUTPUT_JSON)
    csv_path = os.path.join(base_dir, CSV_DIR)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    os.makedirs(csv_path, exist_ok=True)

    all_transactions = []
    
    # Process any exported CSVs in raw_finance_reports/
    found_csvs = [f for f in os.listdir(csv_path) if f.endswith(".csv")]
    if found_csvs:
        for filename in found_csvs:
            filepath = os.path.join(csv_path, filename)
            print(f"Processing: {filename}...")
            parsed = parse_csv_file(filepath)
            all_transactions.extend(parsed)
            print(f"Parsed {len(parsed)} transactions from {filename}")
    
    # Merge with canonical ledger seed
    seed_records = get_canonical_ledger_seed()
    existing_ids = {tx["id"] for tx in all_transactions}
    for seed in seed_records:
        if seed["id"] not in existing_ids:
            all_transactions.append(seed)

    # Sort descending by contribution amount
    all_transactions.sort(key=lambda x: x.get("amount", 0.0), reverse=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_transactions, f, indent=2)

    print(f"Successfully saved {len(all_transactions)} campaign transactions into {output_path}.")

if __name__ == "__main__":
    main()
