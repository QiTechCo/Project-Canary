<?php require_once __DIR__ . '/config.php'; ?>
<!-- Campaign Footer -->
<footer class="footer-campaign">
  <div class="container">
    <div class="row g-4">
      
      <!-- Candidate & Mission -->
      <div class="col-lg-4 col-md-6">
        <h4 class="serif-font text-white fw-bold mb-3"><?php echo CANDIDATE_NAME; ?></h4>
        <p class="text-white-50 mb-3">
          Serving Charlotte as City Council Member (At-Large). Dedicated to fiscal responsibility, environmental protection, public safety, and housing affordability for every neighborhood.
        </p>
        <div class="d-flex gap-3 fs-5">
          <?php if (!empty($SOCIAL_LINKS['facebook'])): ?>
            <a href="<?php echo $SOCIAL_LINKS['facebook']; ?>" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <?php endif; ?>
          <?php if (!empty($SOCIAL_LINKS['instagram'])): ?>
            <a href="<?php echo $SOCIAL_LINKS['instagram']; ?>" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <?php endif; ?>
          <?php if (!empty($SOCIAL_LINKS['twitter'])): ?>
            <a href="<?php echo $SOCIAL_LINKS['twitter']; ?>" target="_blank" rel="noopener" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          <?php endif; ?>
          <?php if (!empty($SOCIAL_LINKS['linkedin'])): ?>
            <a href="<?php echo $SOCIAL_LINKS['linkedin']; ?>" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <?php endif; ?>
          <?php if (!empty($SOCIAL_LINKS['substack'])): ?>
            <a href="<?php echo $SOCIAL_LINKS['substack']; ?>" target="_blank" rel="noopener" aria-label="Substack"><i class="bi bi-newspaper"></i></a>
          <?php endif; ?>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="col-lg-3 col-md-6">
        <h5 class="text-white fw-bold mb-3">Navigation</h5>
        <ul class="list-unstyled mb-0">
          <li class="mb-2"><a href="index.php"><i class="bi bi-chevron-right me-1"></i> Home</a></li>
          <li class="mb-2"><a href="index.php#about"><i class="bi bi-chevron-right me-1"></i> About Dimple</a></li>
          <li class="mb-2"><a href="index.php#priorities"><i class="bi bi-chevron-right me-1"></i> Key Priorities</a></li>
          <li class="mb-2"><a href="endorsements.php"><i class="bi bi-chevron-right me-1"></i> Endorsements</a></li>
          <li class="mb-2"><a href="volunteer.php"><i class="bi bi-chevron-right me-1"></i> Volunteer & Join Us</a></li>
          <li class="mb-2"><a href="terms-conditions.php"><i class="bi bi-chevron-right me-1"></i> Terms & Privacy</a></li>
        </ul>
      </div>

      <!-- Newsletter & Updates -->
      <div class="col-lg-5 col-md-12">
        <h5 class="text-white fw-bold mb-3">Stay Connected</h5>
        <p class="text-white-50 small mb-3">
          Subscribe to Dimple's newsletter for official city updates, upcoming town halls, and community reports.
        </p>
        <form action="<?php echo SUBSTACK_URL; ?>" method="get" target="_blank" class="row g-2">
          <div class="col-8">
            <input type="email" class="form-control" placeholder="Enter your email address" required aria-label="Email Address">
          </div>
          <div class="col-4">
            <button type="submit" class="btn btn-gold w-100">Subscribe</button>
          </div>
        </form>
      </div>

    </div>

    <!-- Official Campaign Disclaimer -->
    <div class="row">
      <div class="col-12">
        <div class="campaign-disclaimer-box">
          <?php echo CAMPAIGN_DISCLAIMER; ?>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="row mt-4 pt-3 border-top border-secondary">
      <div class="col-md-6 text-center text-md-start text-white-50 small">
        &copy; <?php echo date('Y'); ?> Committee to Elect Dimple Ajmera. All rights reserved.
      </div>
      <div class="col-md-6 text-center text-md-end text-white-50 small">
        Built for Charlotte, NC
      </div>
    </div>

  </div>
</footer>

<!-- Bootstrap 5 JS Bundle -->
<script href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<!-- Custom Campaign JS -->
<script src="assets/js/site.js"></script>
</body>
</html>
