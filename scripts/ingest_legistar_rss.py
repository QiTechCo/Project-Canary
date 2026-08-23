#!/usr/bin/env python3
"""
scripts/ingest_legistar_rss.py
Charlotte City Council Legistar RSS Feed Ingestion & Real-Time Listener.
"""

import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

ARCHIVE_FILE = "data/dimple-ajmera-council-archive.json"

# Known Charlotte Legistar RSS Endpoints
RSS_FEEDS = [
    # Primary Meeting Feed
    "https://charlottenc.legistar.com/Feed.ashx?M=CalendarDetail&ID=1379066&GUID=9FA4ED3E-9493-438B-B9EF-E11B5BBEE83D&G=BE036CCA-47DC-4396-B00E-55A8D4A8D752&Title=City+of+Charlotte+-+Meeting+of+City+Council+Business+Meeting+on+8%2f24%2f2026+at+5%3a30+PM",
    # Main Council Calendar Feed
    "https://charlottenc.legistar.com/Feed.ashx?M=Calendar",
]

def load_existing_records(filepath):
    if os.path.exists(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning loading archive: {e}", flush=True)
    return []

def parse_rss_feed(url):
    """Fetches and parses a Legistar RSS feed."""
    print(f"Connecting to Legistar RSS feed: {url[:80]}...", flush=True)
    items_data = []
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            xml_content = resp.read().decode("utf-8")
            root = ET.fromstring(xml_content)
            
            # Extract channel title and link
            channel = root.find("channel")
            channel_title = "Charlotte City Council"
            channel_link = ""
            if channel is not None:
                c_title = channel.find("title")
                if c_title is not None and c_title.text:
                    channel_title = c_title.text.strip()
                c_link = channel.find("link")
                if c_link is not None and c_link.text:
                    channel_link = c_link.text.strip()

            # Extract meeting date and ID from feed Title or URL if available
            date_match = re.search(r"(\d{1,2})%2f(\d{1,2})%2f(\d{4})", url)
            if date_match:
                m, d, y = date_match.groups()
                meeting_date = f"{y}-{int(m):02d}-{int(d):02d}"
            else:
                meeting_date = datetime.now().strftime("%Y-%m-%d")

            id_match = re.search(r"ID=(\d+)", url)
            meeting_id = id_match.group(1) if id_match else "upcoming"

            for item in root.findall(".//item"):
                title_elem = item.find("title")
                title = title_elem.text.strip() if title_elem is not None and title_elem.text else ""
                
                link_elem = item.find("link")
                link = link_elem.text.strip() if link_elem is not None and link_elem.text else ""
                
                desc_elem = item.find("description")
                desc = desc_elem.text.strip() if desc_elem is not None and desc_elem.text else ""
                
                cat_elem = item.find("category")
                category = cat_elem.text.strip() if cat_elem is not None and cat_elem.text else "Action Item"
                
                pub_elem = item.find("pubDate")
                pub_date = pub_elem.text.strip() if pub_elem is not None and pub_elem.text else ""

                title_clean = title
                t_match = re.search(r"Title:\s*([^<]+)", desc)
                if t_match:
                    title_clean = t_match.group(1).strip()

                items_data.append({
                    "matterFile": title or "AGENDA-ITEM",
                    "title": title_clean or title or "Agenda Item",
                    "category": category,
                    "link": link,
                    "pubDate": pub_date,
                    "actionName": category,
                    "ajmeraVote": "Scheduled / Active",
                    "result": "Agenda Item"
                })

            return {
                "meetingId": meeting_id,
                "meetingTitle": channel_title,
                "meetingDate": meeting_date,
                "channelLink": channel_link,
                "items": items_data
            }
    except Exception as e:
        print(f"Notice parsing RSS stream: {e}", flush=True)
        return None

def ingest_rss_streams():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    archive_path = os.path.join(base_dir, ARCHIVE_FILE)

    existing_records = load_existing_records(archive_path)
    records_by_id = {r["id"]: r for r in existing_records}

    print("Running Legistar RSS Feed Ingestion Listener...", flush=True)
    new_added = 0

    for feed_url in RSS_FEEDS:
        parsed = parse_rss_feed(feed_url)
        if not parsed or not parsed.get("items"):
            continue

        record_id = f"mtg-{parsed['meetingId']}"
        date_str = parsed["meetingDate"]
        title = parsed.get("meetingTitle") or "City Council Business Meeting"
        votes = parsed["items"]

        tags = ["#council", "#agenda"]
        title_lower = title.lower() + " " + " ".join([(v.get("title") or "").lower() for v in votes])
        if "budget" in title_lower:
            tags.append("#budget")
        if "seap" in title_lower or "energy" in title_lower or "climate" in title_lower or "environment" in title_lower:
            tags.append("#seap")
            tags.append("#environment")
        if "housing" in title_lower:
            tags.append("#affordable-housing")
        if "transit" in title_lower:
            tags.append("#transit")

        term = "At-Large (2025–Present)" if int(date_str[:4]) >= 2025 else "At-Large (2023–2025)"

        new_record = {
            "id": record_id,
            "eventId": int(parsed["meetingId"]) if parsed["meetingId"].isdigit() else 0,
            "date": date_str,
            "body": "City Council Business Meeting",
            "term": term,
            "title": f"Charlotte City Council Business Meeting ({date_str}) [Live RSS Feed]",
            "summary": f"Live RSS agenda feed with {len(votes)} published agenda items, matter files, and scheduled legislative actions.",
            "tags": list(set(tags)),
            "votesText": " ".join([f"{v.get('matterFile', '')} {v.get('title', '')}" for v in votes]),
            "transcriptText": "",
            "agendaStatus": "Live Agenda Published (RSS)",
            "minutesUrl": parsed["channelLink"],
            "agendaUrl": parsed["channelLink"],
            "inInsiteUrl": f"https://charlottenc.legistar.com/MeetingDetail.aspx?ID={parsed['meetingId']}",
            "videoUrl": None,
            "ajmeraVotes": votes,
            "transcripts": []
        }

        if record_id in records_by_id:
            if len(votes) > len(records_by_id[record_id].get("ajmeraVotes", [])):
                records_by_id[record_id]["ajmeraVotes"] = votes
                records_by_id[record_id]["votesText"] = new_record["votesText"]
        else:
            records_by_id[record_id] = new_record
            new_added += 1

    all_records = list(records_by_id.values())
    all_records.sort(key=lambda x: x.get("date", ""), reverse=True)

    with open(archive_path, "w", encoding="utf-8") as f:
        json.dump(all_records, f, indent=2)

    print(f"RSS Ingestion Complete. Total indexed: {len(all_records)} meetings (New: {new_added}).", flush=True)

if __name__ == "__main__":
    ingest_rss_streams()
