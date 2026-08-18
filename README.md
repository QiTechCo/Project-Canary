# Dimple Ajmera Campaign Website

Campaign website for **Dimple Ajmera for Charlotte City Council At-Large**.

The site is designed as a responsive, lightweight PHP website that can be hosted on IONOS or a standard Apache/PHP web server.

## Technology

* PHP
* HTML5
* CSS3
* JavaScript
* Bootstrap 5
* Bootstrap Icons

## Project Structure

```text
/
├── index.php
├── endorsements.php
├── volunteer.php
├── terms-conditions.php
├── sitemap.xml
├── robots.txt
│
├── includes/
│   ├── config.php
│   ├── header.php
│   └── footer.php
│
└── assets/
    ├── css/
    │   └── site.css
    ├── js/
    │   └── site.js
    └── images/
```

## Design

The site uses Dimple Ajmera's existing campaign branding while incorporating green as the primary website accent.

Primary colors:

```css
--primary: rgb(0, 120, 80);
--primary-dark: rgb(0, 82, 55);
--primary-soft: rgb(229, 244, 238);
--logo-red: #ed1c24;
--logo-blue: #3f4ea1;
```

Green is used for navigation accents, buttons, links, issue cards, and calls to action.

The campaign's existing red and blue remain supporting brand colors.

## Main Sections

The homepage includes:

* Campaign hero
* Biography / Journey
* Issues and priorities
* Awards and recognition
* Endorsement spotlight
* News
* Volunteer and campaign calls to action
* Social media links
* Campaign footer

## Configuration

Common website information is stored in:

```text
includes/config.php
```

This includes items such as:

* Campaign name
* Website domain
* Email address
* Donation URL
* Newsletter URL
* Social media URLs
* Issues
* Awards
* News articles

This keeps frequently updated content separate from the page layout.

## Local Development

The site can be run locally using XAMPP.

Place the project inside:

```text
C:\xampp\htdocs\
```

Start **Apache** from the XAMPP Control Panel.

Then visit:

```text
http://localhost/<project-folder>/
```

MySQL is not required for the current version.

## Images

Campaign images are stored in:

```text
assets/images/
```

Some sections may contain labeled image placeholders until final campaign-approved images are added.

## Responsive Design

Bootstrap and custom CSS provide layouts for:

* Desktop
* Tablet
* Mobile

## Search Engines

The project includes:

```text
sitemap.xml
robots.txt
```

The sitemap should be updated whenever new public pages are added.

## Deployment

The production site is intended for an **IONOS Apache/PHP hosting environment**.

Before deployment:

1. Verify production URLs.
2. Verify social media and donation links.
3. Replace remaining image placeholders.
4. Verify campaign disclaimer language.
5. Test mobile layouts.
6. Test all external links.
7. Update `sitemap.xml` if necessary.

## Campaign Disclaimer

Paid for by the Committee to Elect Dimple Ajmera.

## License

This repository contains campaign-specific branding, photographs, logos, and content. These materials are not provided for unrestricted reuse.
