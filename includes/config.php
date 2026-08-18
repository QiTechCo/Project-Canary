<?php
/**
 * Dimple Ajmera Campaign Website - Configuration
 *
 * Central configuration file storing campaign information, navigation links,
 * social media profiles, priorities, and press updates.
 */

define('SITE_NAME', 'Dimple Ajmera for Charlotte City Council At-Large');
define('CANDIDATE_NAME', 'Dimple Ajmera');
define('CANDIDATE_TITLE', 'Charlotte City Council Member (At-Large)');
define('CAMPAIGN_SLOGAN', 'Delivering Results for All of Charlotte');
define('SITE_DOMAIN', 'https://www.dimpleajmera.com');

define('CAMPAIGN_EMAIL', 'info@dimpleajmera.com');
define('CITY_EMAIL', 'Alexis.Rojas@charlottenc.gov');
define('CAMPAIGN_PHONE', '980-579-2721');

define('DONATE_URL', 'https://www.dimpleajmera.com/donate');
define('SUBSTACK_URL', 'https://dimpleajmera.substack.com');
define('TOWN_HALL_RSVP_URL', 'https://charlottenc.seamlessdocs.com/ng/fa/rjotkfzz0tct');

define('CAMPAIGN_DISCLAIMER', 'Paid for by the Committee to Elect Dimple Ajmera.');

$SOCIAL_LINKS = [
    'facebook'  => 'https://www.facebook.com/DimpleAjmeraCLT',
    'instagram' => 'https://www.instagram.com/dimpleajmeraclt',
    'twitter'   => 'https://twitter.com/DimpleAjmera',
    'linkedin'  => 'https://www.linkedin.com/in/dimpleajmera',
    'substack'  => 'https://dimpleajmera.substack.com',
];

$ISSUES = [
    [
        'id'          => 'environment-water',
        'title'       => 'Environment & Sustainable Resources',
        'icon'        => 'bi-tree-fill',
        'short_desc'  => 'Protecting Charlotte’s water supply, expanding tree canopy, and championing responsible data center policies.',
        'full_desc'   => 'Dimple has led the charge on environmental stewardship in Charlotte. From proposing smart policies for massive water demand from data centers to expanding urban tree canopy, Dimple works to ensure clean air, safe drinking water, and sustainable green energy for future generations.'
    ],
    [
        'id'          => 'affordable-housing',
        'title'       => 'Affordable Housing & Homeownership',
        'icon'        => 'bi-house-heart-fill',
        'short_desc'  => 'Expanding workforce housing, down-payment assistance, and preventing displacement in historic neighborhoods.',
        'full_desc'   => 'Housing stability is foundational to economic mobility. Dimple continues to champion municipal housing bonds, down-payment assistance programs for first-time homebuyers, and anti-displacement strategies that keep long-term residents in their homes.'
    ],
    [
        'id'          => 'public-safety',
        'title'       => 'Public Safety & Safe Streets',
        'icon'        => 'bi-shield-lock-fill',
        'short_desc'  => 'Investing in community policing, traffic safety improvements, and youth violence prevention.',
        'full_desc'   => 'Every resident deserves to feel safe in their neighborhood. Dimple supports comprehensive public safety strategies including competitive compensation for first responders, pedestrian & traffic infrastructure upgrades, and root-cause youth intervention programs.'
    ],
    [
        'id'          => 'economic-opportunity',
        'title'       => 'Economic Opportunity & Small Business',
        'icon'        => 'bi-graph-up-arrow',
        'short_desc'  => 'Supporting minority- and women-owned businesses, job training programs, and equitable growth.',
        'full_desc'   => 'As a Certified Public Accountant (CPA) and former corporate finance professional, Dimple applies rigorous fiscal oversight to the city budget while expanding access to capital, municipal contracts, and training for local small businesses.'
    ],
    [
        'id'          => 'transportation-infrastructure',
        'title'       => 'Transit & Infrastructure',
        'icon'        => 'bi-bus-front-fill',
        'short_desc'  => 'Modernizing Charlotte’s transit network, repairing roads, and building connected greenway trails.',
        'full_desc'   => 'Connecting residents to jobs, schools, and healthcare requires a modern, reliable transit system. Dimple advocates for smart infrastructure investments, safer pedestrian crossings, and expanded regional transit options.'
    ]
];

$UPCOMING_EVENTS = [
    [
        'title'       => 'State of Our Environment: Data Centers, Water & Charlotte’s Future',
        'date'        => 'August 20th, 2026',
        'time'        => '6:00 p.m. – 8:00 p.m.',
        'location'    => 'Project 658',
        'address'     => '3646 Central Ave., Charlotte, NC 28205',
        'rsvp_link'   => 'https://charlottenc.seamlessdocs.com/ng/fa/rjotkfzz0tct',
        'description' => 'Join Council Member Dimple Ajmera and local experts for a crucial community conversation on protecting our natural water resources and establishing sustainable policies for data center growth in Charlotte.'
    ]
];

$AWARDS = [
    'Charlotte Business Journal 40 Under 40 Honoree',
    'Women in Business Achievement Award Winner',
    'North Carolina League of Conservation Voters Environmental Champion',
    'Charlotte Chamber Young Public Servant of the Year'
];

$NEWS_ARTICLES = [
    [
        'title'   => 'Council Member Dimple Ajmera Host Community Town Hall on Data Center Water Demand',
        'date'    => 'August 2026',
        'summary' => 'Dimple Ajmera brings together local environmental experts and community members to address Charlotte’s growing water infrastructure demands.',
        'link'    => '#news-townhall'
    ],
    [
        'title'   => 'Charlotte City Council Approves Expanded Small Business & Enterprise Toolkit',
        'date'    => 'July 2026',
        'summary' => 'New initiatives supported by Council Member Ajmera aim to increase contract opportunities for local minority- and women-owned businesses.',
        'link'    => '#news-sbe'
    ]
];
