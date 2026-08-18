<?php
$pageTitle = 'Delivering Results for All of Charlotte';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Campaign Hero Section -->
<section class="hero-section">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-lg-7">
        <span class="badge-pill">Council Member Dimple Ajmera</span>
        <h1 class="hero-title serif-font">Delivering Results for All of Charlotte</h1>
        <p class="hero-subtitle">
          Fiscal responsibility, environmental sustainability, workforce housing, and safe streets for every neighborhood.
        </p>
        <div class="d-flex flex-wrap gap-3 mt-4">
          <a href="volunteer.php" class="btn btn-gold btn-lg">
            <i class="bi bi-people-fill me-2"></i> Join Our Campaign
          </a>
          <a href="#event-townhall" class="btn btn-outline-light btn-lg">
            <i class="bi bi-calendar-event me-2"></i> Upcoming Town Hall
          </a>
          <a href="<?php echo DONATE_URL; ?>" target="_blank" rel="noopener" class="btn btn-primary-green btn-lg">
            <i class="bi bi-heart-fill me-2"></i> Support Dimple
          </a>
        </div>
      </div>
      <div class="col-lg-5 text-center hero-img-container">
        <?php if (file_exists(__DIR__ . '/assets/images/dimple-ajmera-portrait.png')): ?>
          <img src="assets/images/dimple-ajmera-portrait.png" alt="Dimple Ajmera" class="img-fluid">
        <?php elseif (file_exists(__DIR__ . '/assets/images/dimple-ajmera-event-photo.jpg')): ?>
          <img src="assets/images/dimple-ajmera-event-photo.jpg" alt="Dimple Ajmera" class="img-fluid">
        <?php else: ?>
          <div class="p-5 bg-primary-dark text-white rounded-4 shadow">
            <i class="bi bi-person-bounding-box display-1 text-gold"></i>
            <h3 class="serif-font mt-3">Dimple Ajmera</h3>
            <p class="mb-0 text-white-50">At-Large City Council Member</p>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<!-- Featured Event: State of Our Environment Town Hall -->
<section id="event-townhall" class="py-5 bg-light">
  <div class="container">
    <div class="event-banner-card p-4 p-lg-5">
      <div class="row align-items-center g-4">
        <div class="col-lg-8">
          <span class="event-badge mb-2"><i class="bi bi-geo-alt-fill me-1"></i> Community Town Hall</span>
          <h2 class="serif-font text-white display-6 fw-bold mb-3">State of Our Environment: Data Centers, Water & Charlotte’s Future</h2>
          <p class="text-white-50 mb-3 fs-5">
            Join Council Member Dimple Ajmera and local policy experts for an important community conversation regarding Charlotte’s natural water resources, environmental sustainability, and policies governing data center growth.
          </p>
          <div class="d-flex flex-wrap gap-4 text-white">
            <div><i class="bi bi-calendar3 me-2 text-gold"></i> <strong>August 20th, 2026</strong></div>
            <div><i class="bi bi-clock me-2 text-gold"></i> <strong>6:00 p.m. – 8:00 p.m.</strong></div>
            <div><i class="bi bi-building me-2 text-gold"></i> <strong>Project 658 (3646 Central Ave)</strong></div>
          </div>
        </div>
        <div class="col-lg-4 text-lg-end">
          <a href="<?php echo TOWN_HALL_RSVP_URL; ?>" target="_blank" rel="noopener" class="btn btn-gold btn-lg w-100 mb-2">
            <i class="bi bi-box-arrow-up-right me-2"></i> RSVP Required (Seats Limited)
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=Project%20658%2C%203646%20Central%20Ave.%2C%20Charlotte%2C%20NC%2028205" target="_blank" rel="noopener" class="btn btn-outline-light btn-sm w-100">
            <i class="bi bi-map me-1"></i> Open Google Maps
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-5">
  <div class="container py-lg-4">
    <div class="row align-items-center g-5">
      <div class="col-lg-6">
        <span class="text-primary-green fw-bold text-uppercase tracking-wider">Meet Council Member Ajmera</span>
        <h2 class="serif-font display-5 fw-bold text-dark mb-4">A Proven Track Record of Public Service & Fiscal Integrity</h2>
        <p class="lead text-secondary">
          Dimple Ajmera is an accountant, public servant, and advocate dedicated to creating an inclusive, thriving Charlotte where every resident has an opportunity to succeed.
        </p>
        <p class="text-secondary">
          As a Certified Public Accountant (CPA) with background experience at major financial institutions including Deloitte and TIAA, Dimple brings rigorous financial management, transparency, and fiscal responsibility to the Charlotte City Council budget process.
        </p>
        <p class="text-secondary">
          She has championed historic investments in workforce housing, expanded public transit infrastructure, protected local waterways, and supported local small businesses and MWBE entrepreneurs across all districts.
        </p>
      </div>
      <div class="col-lg-6">
        <div class="p-4 p-lg-5 bg-primary-soft rounded-4 border border-success border-opacity-25 shadow-sm">
          <h3 class="serif-font text-primary-green mb-4">Honors & Recognition</h3>
          <ul class="list-unstyled mb-0">
            <?php foreach ($AWARDS as $award): ?>
              <li class="d-flex align-items-start mb-3">
                <i class="bi bi-award-fill text-gold fs-4 me-3"></i>
                <span class="fw-semibold text-dark fs-6 pt-1"><?php echo htmlspecialchars($award); ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Key Priorities Grid Section -->
<section id="priorities" class="py-5 bg-light">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-primary-green fw-bold text-uppercase tracking-wider">Focus Areas</span>
      <h2 class="serif-font display-5 fw-bold text-dark">Dimple’s Key Priorities for Charlotte</h2>
      <p class="lead text-secondary">Smart solutions grounded in fiscal discipline, community equity, and sustainable growth.</p>
    </div>

    <div class="row g-4">
      <?php foreach ($ISSUES as $issue): ?>
        <div class="col-lg-4 col-md-6">
          <div class="issue-card">
            <div class="issue-icon-box">
              <i class="bi <?php echo $issue['icon']; ?>"></i>
            </div>
            <h3 class="serif-font h4 fw-bold text-dark mb-3"><?php echo htmlspecialchars($issue['title']); ?></h3>
            <p class="text-secondary mb-0"><?php echo htmlspecialchars($issue['full_desc']); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Call to Action Banner -->
<section class="py-5 bg-primary-green text-white text-center">
  <div class="container py-4">
    <h2 class="serif-font display-5 fw-bold mb-3">Ready to Build a Stronger Charlotte Together?</h2>
    <p class="lead text-white-50 mb-4 max-w-700 mx-auto">
      Your voice, your vote, and your involvement make all the difference. Join our team of volunteers or make a contribution today.
    </p>
    <div class="d-flex justify-content-center flex-wrap gap-3">
      <a href="volunteer.php" class="btn btn-gold btn-lg">
        <i class="bi bi-hand-thumbs-up-fill me-2"></i> Volunteer Now
      </a>
      <a href="<?php echo DONATE_URL; ?>" target="_blank" rel="noopener" class="btn btn-outline-light btn-lg">
        <i class="bi bi-credit-card-fill me-2"></i> Contribute Online
      </a>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
