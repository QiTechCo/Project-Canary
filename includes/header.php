<?php
require_once __DIR__ . '/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) . ' | ' . CANDIDATE_NAME : CANDIDATE_NAME . ' | Charlotte City Council At-Large'; ?></title>
  <meta name="description" content="Official campaign website for Dimple Ajmera for Charlotte City Council At-Large. Working Mother, Accountant, and Fighter for all Charlotte families.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Dimple Ajmera for Charlotte City Council At-Large">
  <meta property="og:description" content="Working Mother • Accountant • Fighter. Delivering Results for All of Charlotte.">
  <meta property="og:url" content="https://www.dimpleajmera.com">
  <meta property="og:image" content="assets/images/DimpleMainLogo.png">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/images/whiteboard_9_navlogo.png">
  <link rel="shortcut icon" href="favicon.ico">

  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <!-- Theme Styles -->
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body id="top">

<!-- Restored Top Navigation Header with Master Campaign Logo & Active Markers -->
<nav class="navbar navbar-expand-lg navbar-campaign sticky-top">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center" href="index.php">
      <img src="assets/images/whiteboard_9_navlogo.png" alt="<?php echo CANDIDATE_NAME; ?>" style="height: 60px; width: auto;" class="me-2">
    </a>

    <button class="navbar-toggler border-0 text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCampaignNav" aria-controls="navbarCampaignNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCampaignNav">
      <ul class="navbar-nav ms-auto me-3 mb-2 mb-lg-0 align-items-lg-center">
        <li class="nav-item">
          <a class="nav-link active" href="index.php#top">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.php#event-townhall">Environment Town Hall</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.php#about">About Dimple</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.php#media">Media & Socials</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="index.php#priorities">Key Priorities</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="endorsements.php">Endorsements</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="volunteer.php">Get Involved</a>
        </li>
      </ul>
      <div class="d-flex gap-2">
        <a href="<?php echo DONATE_URL; ?>" target="_blank" rel="noopener" class="btn btn-red-patriot">
          <i class="bi bi-heart-fill me-1"></i> Donate
        </a>
      </div>
    </div>
  </div>
</nav>
