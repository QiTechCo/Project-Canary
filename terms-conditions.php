<?php
$pageTitle = 'Terms, Privacy & Contribution Guidelines';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header Banner -->
<section class="bg-primary-dark text-white py-5">
  <div class="container py-3">
    <div class="max-w-700">
      <span class="badge bg-warning text-dark uppercase tracking-wider mb-2">Legal & Governance</span>
      <h1 class="serif-font display-4 fw-bold mb-3">Terms, Privacy & Campaign Guidelines</h1>
      <p class="lead text-white-50 mb-0">
        Information regarding political contributions, privacy protections, and terms of use for the Committee to Elect Dimple Ajmera.
      </p>
    </div>
  </div>
</section>

<!-- Content Section -->
<section class="py-5">
  <div class="container py-lg-4">
    <div class="row">
      <div class="col-lg-10 mx-auto">
        
        <!-- Contribution Rules -->
        <article class="mb-5">
          <h2 class="serif-font fw-bold text-primary-green mb-3">Political Contribution Rules</h2>
          <div class="p-4 bg-light rounded-4 border">
            <p class="mb-2">Contributions to the <strong>Committee to Elect Dimple Ajmera</strong> are subject to North Carolina state election laws:</p>
            <ul class="mb-0 text-secondary">
              <li class="mb-1">Contributions are not tax-deductible for federal or state income tax purposes.</li>
              <li class="mb-1">Individual contribution limits apply per election cycle according to North Carolina State Board of Elections regulations.</li>
              <li class="mb-1">Corporate, labor union, and foreign national contributions (without permanent residency) are strictly prohibited by law.</li>
              <li class="mb-1">All contributors must provide their full name, mailing address, occupation, and employer for campaign reporting compliance.</li>
            </ul>
          </div>
        </article>

        <!-- Privacy Policy -->
        <article class="mb-5">
          <h2 class="serif-font fw-bold text-primary-green mb-3">Privacy Policy</h2>
          <p class="text-secondary">
            The Committee to Elect Dimple Ajmera respects the privacy of our volunteers, donors, and site visitors. Any personal information collected through our volunteer forms, town hall registrations, or email subscriptions (including name, email address, phone number, and mailing address) is strictly used for campaign communication and community organizing.
          </p>
          <p class="text-secondary">
            We do not sell, rent, or lease our supporter lists to third-party commercial entities. You may opt out of receiving email newsletters or SMS updates at any time by clicking the unsubscribe link or contacting our campaign.
          </p>
        </article>

        <!-- Terms of Use -->
        <article class="mb-5">
          <h2 class="serif-font fw-bold text-primary-green mb-3">Terms of Use</h2>
          <p class="text-secondary">
            All text, branding, official photography, logos, and digital campaign assets contained on this website are owned by or licensed to the Committee to Elect Dimple Ajmera. Content may not be reproduced for unauthorized commercial purposes without prior written consent.
          </p>
        </article>

        <!-- Mandatory Disclaimer -->
        <div class="campaign-disclaimer-box text-dark border-primary bg-primary-soft p-4 rounded-3 text-center fs-5">
          <?php echo CAMPAIGN_DISCLAIMER; ?>
        </div>

      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
