<?php
$pageTitle = 'Proudly Endorsed By | Community & Civic Leaders';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header Banner -->
<section class="bg-primary-dark text-white py-5">
  <div class="container py-3">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <span class="badge bg-warning text-dark uppercase tracking-wider mb-2">Community & Civic Backing</span>
        <h1 class="serif-font display-4 fw-bold mb-3">Proudly Endorsed By</h1>
        <p class="lead text-white-50 mb-0">
          Council Member Dimple Ajmera is trusted by civil rights leaders, law enforcement, labor unions, conservation organizations, and North Carolina community leaders.
        </p>
      </div>
      <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
        <a href="volunteer.php" class="btn btn-gold btn-lg">
          <i class="bi bi-person-plus-fill me-2"></i> Join Our Endorsement Roster
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Featured Spotlight Quotes Section -->
<section class="py-5 bg-light">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-primary-green fw-bold text-uppercase tracking-wider">Endorsement Spotlights</span>
      <h2 class="serif-font display-5 fw-bold text-dark">What Community Leaders Say</h2>
    </div>

    <div class="row g-4">
      <?php foreach ($SPOTLIGHT_QUOTES as $quote): ?>
        <div class="col-lg-6">
          <div class="endorsement-card shadow-sm h-100 bg-white p-4 p-lg-5">
            <i class="bi bi-quote display-3 text-gold opacity-50 mb-2"></i>
            <blockquote class="blockquote mb-3">
              <p class="serif-font text-dark fs-5 fst-italic mb-0">
                "<?php echo htmlspecialchars($quote['quote']); ?>"
              </p>
            </blockquote>
            <figcaption class="blockquote-footer mt-3 mb-0 fw-bold text-primary-green fs-6">
              &mdash; <?php echo htmlspecialchars($quote['source']); ?>
            </figcaption>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Organization & Newspaper Endorsements -->
<section class="py-5">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-primary-green fw-bold text-uppercase tracking-wider">Organizational Backing</span>
      <h2 class="serif-font display-5 fw-bold text-dark">Endorsing Organizations & Unions</h2>
    </div>

    <div class="row g-4">
      <?php foreach ($ORGANIZATION_ENDORSEMENTS as $org): ?>
        <div class="col-lg-6">
          <div class="d-flex align-items-center p-4 bg-white border border-success border-opacity-25 rounded-4 shadow-sm h-100">
            <div class="issue-icon-box mb-0 me-4 bg-primary-soft text-primary-green flex-shrink-0">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div>
              <h4 class="serif-font fw-bold text-dark mb-1"><?php echo htmlspecialchars($org['name']); ?></h4>
              <p class="text-secondary small mb-0"><?php echo htmlspecialchars($org['type']); ?></p>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Individual Community Voices Roster -->
<section class="py-5 bg-primary-soft">
  <div class="container py-lg-4">
    <div class="text-center max-w-700 mx-auto mb-5">
      <span class="text-primary-green fw-bold text-uppercase tracking-wider">North Carolina Voices</span>
      <h2 class="serif-font display-5 fw-bold text-dark">Community Leaders & Elected Officials</h2>
      <p class="lead text-secondary">A broad coalition of leaders standing with Dimple Ajmera for Charlotte City Council At-Large.</p>
    </div>

    <div class="row g-3">
      <?php foreach ($INDIVIDUAL_ENDORSEMENTS as $ind): ?>
        <div class="col-lg-4 col-md-6">
          <div class="p-3 bg-white rounded-3 border border-secondary border-opacity-10 h-100 d-flex align-items-center">
            <i class="bi bi-person-check-fill text-gold me-3 fs-4"></i>
            <div>
              <h6 class="fw-bold text-dark mb-0"><?php echo htmlspecialchars($ind['name']); ?></h6>
              <span class="small text-secondary"><?php echo htmlspecialchars($ind['title']); ?></span>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Submit Endorsement Card -->
    <div class="card border-0 bg-primary-dark text-white p-4 p-lg-5 rounded-4 mt-5 shadow">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h3 class="serif-font fw-bold text-white mb-2">Endorse Council Member Dimple Ajmera</h3>
          <p class="text-white-50 mb-0">
            Are you a local resident, business owner, or community organization leader who supports Dimple’s campaign? We would love to include your name in our official endorsement roster!
          </p>
        </div>
        <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
          <a href="mailto:<?php echo CAMPAIGN_EMAIL; ?>?subject=Endorsement%20For%20Dimple%20Ajmera" class="btn btn-gold btn-lg">
            <i class="bi bi-envelope-check-fill me-2"></i> Submit Your Endorsement
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
