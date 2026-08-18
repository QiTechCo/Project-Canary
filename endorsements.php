<?php
$pageTitle = 'Community Endorsements';
require_once __DIR__ . '/includes/header.php';

$ENDORSEMENTS_LIST = [
    [
        'name'     => 'Environmental & Conservation Advocates',
        'title'    => 'Clean Energy & Water Stewardship Coalition',
        'quote'    => 'Council Member Dimple Ajmera has consistently led Charlotte on environmental conservation, tree canopy expansion, and protecting our water resources against industrial strain.',
        'category' => 'Environment'
    ],
    [
        'name'     => 'Small Business Owners & MWBE Leaders',
        'title'    => 'Charlotte Small Business Council',
        'quote'    => 'Dimple understands the numbers. As a CPA, she brings real fiscal acumen to the city budget while expanding opportunities for local small businesses to thrive.',
        'category' => 'Business & Economy'
    ],
    [
        'name'     => 'Workforce Housing Advocates',
        'title'    => 'Charlotte Community Housing Network',
        'quote'    => 'Dimple has been an unwavering champion for workforce housing bonds and down-payment assistance for working families across Charlotte.',
        'category' => 'Housing'
    ],
    [
        'name'     => 'Public Safety & Neighborhood Leaders',
        'title'    => 'East Charlotte Neighborhood Coalition',
        'quote'    => 'From pedestrian safety improvements on Central Avenue to supporting community policing, Dimple delivers real results for our neighborhoods.',
        'category' => 'Public Safety'
    ]
];
?>

<!-- Page Header Banner -->
<section class="bg-primary-dark text-white py-5">
  <div class="container py-3">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <span class="badge bg-warning text-dark uppercase tracking-wider mb-2">Community Support</span>
        <h1 class="serif-font display-4 fw-bold mb-3">Endorsements & Community Backing</h1>
        <p class="lead text-white-50 mb-0">
          Trusted by neighborhood advocates, conservation leaders, small business owners, and working families across Charlotte.
        </p>
      </div>
      <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
        <a href="volunteer.php" class="btn btn-gold btn-lg">
          <i class="bi bi-person-plus-fill me-2"></i> Add Your Endorsement
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Endorsements Roster -->
<section class="py-5">
  <div class="container py-lg-4">
    <div class="row g-4">
      <?php foreach ($ENDORSEMENTS_LIST as $item): ?>
        <div class="col-md-6">
          <div class="endorsement-card shadow-sm h-100 bg-white">
            <span class="badge bg-primary-soft text-primary-green mb-3"><?php echo htmlspecialchars($item['category']); ?></span>
            <blockquote class="blockquote mb-3">
              <p class="serif-font text-dark fs-5 fst-italic mb-0">
                "<?php echo htmlspecialchars($item['quote']); ?>"
              </p>
            </blockquote>
            <figcaption class="blockquote-footer mt-2 mb-0 fw-bold text-dark">
              <?php echo htmlspecialchars($item['name']); ?>
              <cite title="Source Title" class="d-block text-secondary font-sans fw-normal fs-6"><?php echo htmlspecialchars($item['title']); ?></cite>
            </figcaption>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Submit Endorsement Box -->
    <div class="card border-0 bg-primary-soft p-4 p-lg-5 rounded-4 mt-5">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <h3 class="serif-font fw-bold text-primary-green mb-2">Endorse Council Member Dimple Ajmera</h3>
          <p class="text-secondary mb-0">
            Are you a local resident, business owner, or community organization leader who supports Dimple’s campaign? We would love to feature your endorsement!
          </p>
        </div>
        <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
          <a href="mailto:<?php echo CAMPAIGN_EMAIL; ?>?subject=Endorsement%20For%20Dimple%20Ajmera" class="btn btn-primary-green btn-lg">
            <i class="bi bi-envelope-check-fill me-2"></i> Submit Endorsement
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
