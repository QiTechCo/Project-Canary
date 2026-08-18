<?php
$pageTitle = 'Delivering Results for All of Charlotte';
require_once __DIR__ . '/includes/header.php';
?>

<!-- SPLC Webby Winner Style Full-Bleed Hero Stage with Large Transparent Logo Overlay -->
<section class="splc-hero-stage" id="top">
  <div class="splc-hero-bg"></div>
  <div class="splc-hero-vignette"></div>

  <div class="splc-hero-content">
    <!-- Massive Transparent Candidate Master Logo Overlay -->
    <div class="hero-giant-logo-container">
      <img src="assets/images/DimpleHzLogo2025.png" alt="<?php echo CANDIDATE_NAME; ?> Master Campaign Logo" class="hero-giant-logo">
    </div>

    <h1 class="splc-hero-headline serif-font">
      Delivering Results for <span class="text-gradient-halo">All of Charlotte</span>
    </h1>
    <p class="splc-hero-subtitle">
      Fiscal discipline, clean water preservation, workforce housing, and safe streets for every neighborhood across Charlotte.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-3">
      <a href="volunteer.php" class="btn btn-gold-2 btn-lg">
        <i class="bi bi-people-fill me-2"></i> Join Team Dimple
      </a>
      <a href="#event-townhall" class="btn btn-outline-light btn-lg">
        <i class="bi bi-calendar-event me-2"></i> Environment Town Hall
      </a>
      <a href="<?php echo DONATE_URL; ?>" target="_blank" rel="noopener" class="btn btn-emerald-2 btn-lg">
        <i class="bi bi-credit-card-fill me-2"></i> Contribute
      </a>
    </div>
  </div>
</section>

<!-- Impact Statistics Halo Counter Bar -->
<div class="container">
  <div class="stats-counter-bar">
    <div class="row text-center g-4">
      <div class="col-6 col-md-3 border-end border-secondary border-opacity-25">
        <div class="stat-number" data-target="4" data-suffix="">4</div>
        <div class="stat-label">Terms Elected At-Large</div>
      </div>
      <div class="col-6 col-md-3 border-md-end border-secondary border-opacity-25">
        <div class="stat-number" data-target="50" data-prefix="$" data-suffix="M+">$50M+</div>
        <div class="stat-label">Housing Bonds Passed</div>
      </div>
      <div class="col-6 col-md-3 border-end border-secondary border-opacity-25">
        <div class="stat-number" data-target="100" data-suffix="%">100%</div>
        <div class="stat-label">Environment Voting Record</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-number" data-target="38" data-suffix="+">38+</div>
        <div class="stat-label">Key Endorsing Leaders</div>
      </div>
    </div>
  </div>
</div>

<!-- 1. Environment Town Hall Section -->
<section id="event-townhall" class="py-5 mt-4">
  <div class="container">
    <div class="event-banner-card p-4 p-lg-5">
      <div class="row align-items-center g-4">
        <div class="col-lg-7">
          <span class="event-badge mb-2"><i class="bi bi-geo-alt-fill me-1"></i> August 20th Town Hall</span>
          <h2 class="serif-font text-gradient-halo display-5 fw-bold mb-3">State of Our Environment: Data Centers, Water & Charlotte’s Future</h2>
          <p class="text-white-50 fs-5 mb-4">
            Join Council Member Dimple Ajmera and local environmental leaders to discuss protecting our natural water supply, green infrastructure, and smart policies for data center expansion.
          </p>
          <div class="d-flex flex-wrap gap-4 text-white">
            <div><i class="bi bi-calendar3 me-2 text-gold-halo"></i> <strong>August 20th, 2026</strong></div>
            <div><i class="bi bi-clock me-2 text-gold-halo"></i> <strong>6:00 p.m. – 8:00 p.m.</strong></div>
            <div><i class="bi bi-building me-2 text-gold-halo"></i> <strong>Project 658 (3646 Central Ave)</strong></div>
          </div>
        </div>
        
        <div class="col-lg-5 text-center text-lg-end">
          <div class="d-flex justify-content-center justify-content-lg-end gap-2 mb-4">
            <div class="countdown-box"><div class="countdown-num" id="countDays">00</div><div class="countdown-lbl">Days</div></div>
            <div class="countdown-box"><div class="countdown-num" id="countHours">00</div><div class="countdown-lbl">Hours</div></div>
            <div class="countdown-box"><div class="countdown-num" id="countMins">00</div><div class="countdown-lbl">Mins</div></div>
            <div class="countdown-box"><div class="countdown-num" id="countSecs">00</div><div class="countdown-lbl">Secs</div></div>
          </div>

          <a href="<?php echo TOWN_HALL_RSVP_URL; ?>" target="_blank" rel="noopener" class="btn btn-gold-2 btn-lg w-100 mb-2">
            <i class="bi bi-box-arrow-up-right me-2"></i> RSVP Required (Seats Limited)
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=Project%20658%2C%203646%20Central%20Ave.%2C%20Charlotte%2C%20NC%2028205" target="_blank" rel="noopener" class="btn btn-outline-light btn-sm w-100">
            <i class="bi bi-map me-1"></i> Open Google Maps Location
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 2. About Section -->
<section id="about" class="py-5">
  <div class="container py-lg-4">
    <div class="row align-items-center g-5 mb-5">
      <div class="col-lg-6">
        <span class="text-emerald-halo fw-bold text-uppercase tracking-wider">Meet Council Member Ajmera</span>
        <h2 class="serif-font display-5 fw-bold text-white mb-4">A Proven Track Record of Public Service & Fiscal Integrity</h2>
        <p class="lead text-white-50">
          Dimple Ajmera is a Working Mother, four-term Charlotte City Councilwoman, and Certified Public Accountant (CPA).
        </p>
        <p class="text-white-50">
          Dimple immigrated to the United States with her family at age 16. Overcoming language barriers, she learned English, graduated from Southern High School in Durham, earned her accounting degree from the University of Southern California, and became a Certified Public Accountant managing multi-million dollar budgets at major corporate institutions including Deloitte and TIAA.
        </p>
        <p class="text-white-50">
          Driven by public service values, Dimple left corporate finance to serve Charlotte. On City Council, she has championed public safety, CMPD officer family healthcare benefits, workforce housing bonds, clean water policies, and small business support.
        </p>
      </div>
      <div class="col-lg-6">
        <div class="feature-card-2">
          <h3 class="serif-font text-gradient-halo mb-4"><i class="bi bi-award-fill text-gold-halo me-2"></i> Honors & Awards</h3>
          <ul class="list-unstyled mb-0">
            <?php foreach ($AWARDS as $award): ?>
              <li class="d-flex align-items-start mb-3 pb-2 border-bottom border-secondary border-opacity-25">
                <i class="bi bi-star-fill text-gold-halo me-3 mt-1"></i>
                <div><strong class="text-white"><?php echo htmlspecialchars($award); ?></strong></div>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>

    <!-- High-Res Campaign Photography Gallery Grid (Using Downloads Photos) -->
    <div class="text-center mb-4">
      <span class="text-emerald-halo fw-bold text-uppercase tracking-wider">On The Ground in Charlotte</span>
      <h3 class="serif-font text-white display-6 fw-bold">Community & Activism Gallery</h3>
    </div>
    <div class="row g-4">
      <div class="col-lg-4 col-md-6">
        <div class="photo-gallery-card">
          <img src="assets/images/campaign_photo_1.jpg" alt="Dimple Ajmera Community Leadership">
          <div class="p-3 text-center">
            <span class="fw-bold text-white">Community & Civic Leadership</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="photo-gallery-card">
          <img src="assets/images/campaign_photo_2.jpg" alt="Dimple Ajmera Speaking at City Event">
          <div class="p-3 text-center">
            <span class="fw-bold text-white">Addressing Charlotte Families</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="photo-gallery-card">
          <img src="assets/images/campaign_photo_3.jpg" alt="Dimple Ajmera Action Photo">
          <div class="p-3 text-center">
            <span class="fw-bold text-white">Working Mother & Civic Leader</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="photo-gallery-card">
          <img src="assets/images/Dimple_Hugh_McColl.jpg" alt="Dimple Ajmera with Hugh McColl">
          <div class="p-3 text-center">
            <span class="fw-bold text-white">With Hugh McColl, Former CEO Bank of America</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="photo-gallery-card">
          <img src="assets/images/Susan_Dimple_Susan.jpg" alt="Dimple Ajmera with Susan Rodriguez McDowell">
          <div class="p-3 text-center">
            <span class="fw-bold text-white">With Commissioner Susan Rodriguez McDowell</span>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="photo-gallery-card">
          <img src="assets/images/Dimple_Ajmera_Charlotte_Councilmember_2025.jpg" alt="Council Member Dimple Ajmera">
          <div class="p-3 text-center">
            <span class="fw-bold text-white">Official Council Member Portrait</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- 3. Media & Speech Clips Section -->
<section id="media" class="py-5">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-emerald-halo fw-bold text-uppercase tracking-wider">Video & Media Clips</span>
      <h2 class="serif-font display-5 fw-bold text-white">Dimple in Action</h2>
      <p class="lead text-white-50">Watch Council Member Dimple Ajmera discuss water demand policies, data centers, and traffic safety.</p>
    </div>

    <div class="row g-4">
      <div class="col-lg-4 col-md-6">
        <div class="video-card h-100">
          <video controls poster="assets/images/Dimple_Ajmera_Charlotte_Councilmember_2025.jpg">
            <source src="assets/images/Clip 1 - Data Center Wave.mp4" type="video/mp4">
          </video>
          <div class="p-4">
            <span class="badge bg-gold-halo text-dark mb-2">Policy Video</span>
            <h5 class="serif-font text-white mb-2">Data Center Expansion & Water Demand</h5>
            <p class="text-white-50 small mb-0">Dimple outlines policies to protect Charlotte's municipal water supply.</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6">
        <div class="video-card h-100">
          <video controls poster="assets/images/dimple-ajmera-portrait.png">
            <source src="assets/images/Clip 2 - Policies for Water Demand.mp4" type="video/mp4">
          </video>
          <div class="p-4">
            <span class="badge bg-gold-halo text-dark mb-2">Environmental Leadership</span>
            <h5 class="serif-font text-white mb-2">Proactive Environmental Stewardship</h5>
            <p class="text-white-50 small mb-0">Championing smart, resilient infrastructure for future generations.</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6">
        <div class="video-card h-100">
          <video controls poster="assets/images/dimple-ajmera-event-photo.jpg">
            <source src="assets/images/One bad decision at a red light can change a life forever.We’ve seen too many crashes—and too ma.mp4" type="video/mp4">
          </video>
          <div class="p-4">
            <span class="badge bg-gold-halo text-dark mb-2">Public Safety</span>
            <h5 class="serif-font text-white mb-2">Safe Streets & Red Light Safety</h5>
            <p class="text-white-50 small mb-0">Addressing traffic crashes and investing in safer pedestrian crossings.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 4. Key Priorities Grid Section -->
<section id="priorities" class="py-5">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-emerald-halo fw-bold text-uppercase tracking-wider">Priorities</span>
      <h2 class="serif-font display-5 fw-bold text-white">Dimple’s Core Platform</h2>
    </div>

    <div class="row g-4">
      <?php foreach ($ISSUES as $issue): ?>
        <div class="col-lg-6">
          <div class="feature-card-2">
            <div class="feature-icon-wrapper">
              <i class="bi <?php echo $issue['icon']; ?>"></i>
            </div>
            <h3 class="serif-font h4 fw-bold text-white mb-3"><?php echo htmlspecialchars($issue['title']); ?></h3>
            <p class="text-white-50 mb-0"><?php echo htmlspecialchars($issue['full_desc']); ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 5. Endorsements Showcase Section -->
<section class="py-5">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-emerald-halo fw-bold text-uppercase tracking-wider">Endorsements</span>
      <h2 class="serif-font display-5 fw-bold text-white">Proudly Endorsed By Community Leaders</h2>
    </div>

    <div class="row g-4 mb-5">
      <?php foreach ($SPOTLIGHT_QUOTES as $quote): ?>
        <div class="col-lg-6">
          <div class="quote-card-2">
            <p class="serif-font fs-5 fst-italic text-white mb-3">
              "<?php echo htmlspecialchars($quote['quote']); ?>"
            </p>
            <div class="fw-bold text-emerald-halo">&mdash; <?php echo htmlspecialchars($quote['source']); ?></div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="text-center">
      <a href="endorsements.php" class="btn btn-emerald-2 btn-lg">
        <i class="bi bi-journal-check me-2"></i> View Full List of 38+ Endorsing Leaders & Organizations
      </a>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
