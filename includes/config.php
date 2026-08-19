<?php
/**
 * Dimple Ajmera Campaign Website - Configuration
 *
 * Central configuration file storing campaign information, navigation links,
 * social media profiles, priorities, press updates, and full scraped endorsement rosters.
 */

define('SITE_NAME', 'Dimple Ajmera for Charlotte City Council At-Large');
define('CANDIDATE_NAME', 'Dimple Ajmera');
define('CANDIDATE_TITLE', 'Charlotte City Council Member (At-Large)');
define('CAMPAIGN_SLOGAN', 'Working Mother • Accountant • Fighter');
define('SITE_DOMAIN', 'https://www.dimpleajmera.com');

define('CAMPAIGN_EMAIL', 'Dimple@DimpleAjmera.com');
define('CITY_EMAIL', 'Alexis.Rojas@charlottenc.gov');
define('CAMPAIGN_PHONE', '980-579-2721');

define('DONATE_URL', 'https://secure.actblue.com/donate/dimple-ajmera-for-city-council-1');
define('SUBSTACK_URL', 'https://dimpleajmera.substack.com');
define('TOWN_HALL_RSVP_URL', 'https://charlottenc.seamlessdocs.com/ng/fa/rjotkfzz0tct');

define('CAMPAIGN_DISCLAIMER', 'Paid for by the Committee to Elect Dimple Ajmera.');

$SOCIAL_LINKS = [
    'facebook'  => 'https://www.facebook.com/DimpleAjmeraNC/',
    'instagram' => 'https://www.instagram.com/dimpleajmeranc/',
    'twitter'   => 'https://twitter.com/dimpleajmera',
    'linkedin'  => 'https://www.linkedin.com/in/dimpleajmera',
    'substack'  => 'https://dimpleajmera.substack.com',
];

$ISSUES = [
    [
        'id'          => 'public-safety',
        'title'       => 'Build a Safe Charlotte Regardless of Your ZIP Code',
        'icon'        => 'bi-shield-lock-fill',
        'short_desc'  => 'Supporting first responders, CMPD officer family healthcare benefits, and youth violence prevention.',
        'full_desc'   => 'Dimple works tirelessly to build a safe Charlotte for all families regardless of zip code. She championed providing city healthcare coverage for families of CMPD officers killed in the line of duty, which was unanimously passed by City Council.'
    ],
    [
        'id'          => 'environment-water',
        'title'       => 'Sustainable Infrastructure & Resilient Future',
        'icon'        => 'bi-tree-fill',
        'short_desc'  => 'Protecting Charlotte’s water supply, expanding tree canopy, and pausing data center expansion near residential areas.',
        'full_desc'   => 'Winner of the 2019 Blue Sky Award by Clean Air Carolina, Dimple is a staunch environmental champion who called for a pause on new data center developments near neighborhoods to protect Charlotte’s water supply and natural resources.'
    ],
    [
        'id'          => 'affordable-housing',
        'title'       => 'Expand Access to Affordable Housing',
        'icon'        => 'bi-house-heart-fill',
        'short_desc'  => 'Expanding workforce housing, housing bonds, down-payment assistance, and preventing displacement.',
        'full_desc'   => 'Housing stability is foundational to economic mobility. Dimple continues to champion municipal housing bonds, down-payment assistance programs for first-time homebuyers, and anti-displacement strategies that keep long-term residents in their homes.'
    ],
    [
        'id'          => 'economic-opportunity',
        'title'       => 'Create Economic Opportunities Across All City Districts',
        'icon'        => 'bi-graph-up-arrow',
        'short_desc'  => 'Supporting MWBE small businesses, job training programs, and rigorous fiscal oversight.',
        'full_desc'   => 'As a Certified Public Accountant (CPA) and former corporate finance professional managing multi-million dollar budgets at TIAA, Dimple applies rigorous fiscal oversight to the city budget while expanding access to capital and municipal contracts for local small businesses.'
    ]
];

$SPOTLIGHT_QUOTES = [
    [
        'quote'  => 'There’s a crowded field in the Democratic primary this year... Ajmera continues to be a thoughtful and dedicated representative with a knack for hearing and uplifting the community’s concerns. We recommend Ajmera.',
        'source' => 'The Charlotte Observer'
    ],
    [
        'quote'  => 'Councilwoman Ajmera is a two-time FOP endorsed councilwoman and Chairs the City of Charlotte’s Budget Committee and serves as a member of the Housing & Community Safety Committee. Councilwoman Ajmera championed providing city healthcare coverages for families of employees killed in the line of duty after the death of CMPD Officer Joshua Eyer... Due to Councilwoman Ajmera, this benefit was unanimously approved by all members of council.',
        'source' => 'Charlotte-Mecklenburg Fraternal Order of Police (FOP Lodge 9)'
    ]
];

$ORGANIZATION_ENDORSEMENTS = [
    [
        'name' => 'The Charlotte Observer',
        'type' => 'Major Newspaper Editorial Board'
    ],
    [
        'name' => 'Charlotte-Mecklenburg Fraternal Order of Police (FOP Lodge 9)',
        'type' => 'Public Safety & Law Enforcement'
    ],
    [
        'name' => 'Moms Demand Action Gun Sense Candidate (2025)',
        'type' => 'Gun Safety Advocacy'
    ],
    [
        'name' => 'Black Political Caucus of Charlotte-Mecklenburg (BPC)',
        'type' => 'Political Advocacy Organization'
    ],
    [
        'name' => 'Southeastern Carpenters Regional Council (SECRC)',
        'type' => 'Labor & Building Trades'
    ],
    [
        'name' => 'SEIU Airport Workers Rising',
        'type' => 'Labor & Aviation Workers Union'
    ],
    [
        'name' => 'NCAAT in Action (North Carolina Asian Americans Together)',
        'type' => 'Civic Engagement Organization'
    ],
    [
        'name' => 'IMPACT PAC',
        'type' => 'Community Leadership PAC'
    ],
    [
        'name' => 'The Charlotte Post',
        'type' => 'Community Newspaper & Media'
    ],
    [
        'name' => 'Gaston Progressives United',
        'type' => 'Regional Progressive Coalition'
    ]
];

$INDIVIDUAL_ENDORSEMENTS = [
    ['name' => 'Harvey Gantt', 'title' => 'Former Mayor of Charlotte'],
    ['name' => 'Hugh McColl', 'title' => 'Former Chairman & CEO of Bank of America'],
    ['name' => 'Dorothy Counts-Scoggins', 'title' => 'Civil Rights Leader'],
    ['name' => 'Carlenia Ivory', 'title' => 'Former Charlotte City Council Member'],
    ['name' => 'DuMont Clarke', 'title' => 'Former Mecklenburg County Commissioner'],
    ['name' => 'Susan Harden', 'title' => 'Former Mecklenburg County Commissioner'],
    ['name' => 'Susan Rodriguez McDowell', 'title' => 'Mecklenburg County Commissioner'],
    ['name' => 'Renee Perkins Johnson', 'title' => 'Charlotte City Council Member'],
    ['name' => 'Malcolm Graham', 'title' => 'Charlotte City Council Member'],
    ['name' => 'Matt Newton', 'title' => 'Former Charlotte City Council Member'],
    ['name' => 'Rep. Kelly Alexander', 'title' => 'N.C. House of Representatives'],
    ['name' => 'Rep. John Autry', 'title' => 'N.C. House of Representatives'],
    ['name' => 'Rep. Nasif Majeed', 'title' => 'N.C. House of Representatives'],
    ['name' => 'Sen. Joyce Waddell', 'title' => 'N.C. Senate'],
    ['name' => 'Mark Jerrell', 'title' => 'Mecklenburg County Commissioner'],
    ['name' => 'Greg Phipps', 'title' => 'Former Charlotte City Council Member'],
    ['name' => 'Mayor Christy Clark', 'title' => 'Mayor of Huntersville'],
    ['name' => 'Lance Munger', 'title' => 'Town Commissioner (Huntersville)'],
    ['name' => 'Steve Rao', 'title' => 'City Council Member (Morrisville)'],
    ['name' => 'Tommy Hawkins', 'title' => 'Mayor of Saratoga'],
    ['name' => 'Rev. Thomas S. Gillespie', 'title' => 'Mayor Pro Tem (Lowell)'],
    ['name' => 'Danielle Adams', 'title' => 'Soil & Water Supervisor (Durham County)'],
    ['name' => 'Rev. Clifford Barnett', 'title' => 'City Council Member (Wilmington)'],
    ['name' => 'Kevin O’Grady', 'title' => 'City Council Member (Wilmington)'],
    ['name' => 'Renee Garner', 'title' => 'City Council Member (Matthews)'],
    ['name' => 'Fleming El-Amin', 'title' => 'Forsyth County Commissioner'],
    ['name' => 'Lenora Shipp', 'title' => 'Mecklenburg County School Board Member'],
    ['name' => 'Rev. Richard Joyner', 'title' => 'City Council Member (Rocky Mount)'],
    ['name' => 'Rev. Henrico D. White', 'title' => 'Faith Leader'],
    ['name' => 'Rev. Dr. Peter Wherry', 'title' => 'Faith Leader'],
    ['name' => 'Rev. Dr. Dwayne Walker', 'title' => 'Faith Leader'],
    ['name' => 'Bishop Tonyia Rawls', 'title' => 'Community & Faith Leader'],
    ['name' => 'Rev. Monte Witherspoon', 'title' => 'Faith Leader'],
    ['name' => 'Rev. Paul Anderson', 'title' => 'Community Leader (Raleigh)'],
    ['name' => 'Justin Parmenter', 'title' => 'Educator'],
    ['name' => 'Kevin Poirier', 'title' => 'Educator'],
    ['name' => 'Annie Ager', 'title' => 'Civic Leader (Buncombe County)'],
    ['name' => 'Ruth Sloane', 'title' => 'Community Leader']
];

$AWARDS = [
    '2018 Global Service Award by Rotary International',
    'Longleaf Politics Top 54 Young Political Stars in North Carolina',
    '50 Most Influential Women in Mecklenburg County by Mecklenburg Times',
    'Charlotte Business Journal 40 Under 40 Honoree',
    '2019 Blue Sky Award for Public Policy Work by Clean Air Carolina',
    'Community Advocate Award by Cafe Mocha Radio',
    'NAACP Excellence in Leadership Award'
];

$NEWS_ARTICLES = [
    [
        'title'   => 'Charlotte Council Member Calls for a Pause on New Data Centers Near Neighborhoods',
        'source'  => 'WFAE Public Radio (by David Boraks)',
        'date'    => 'April 24, 2026',
        'link'    => 'https://www.wfae.org/energy-environment/2026-04-24/charlotte-council-member-calls-for-a-pause-on-new-data-centers-near-neighborhoods'
    ]
];
