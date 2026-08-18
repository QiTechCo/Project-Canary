<?php
$pageTitle = 'Get Involved & Volunteer';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Page Header Banner -->
<section class="bg-primary-dark text-white py-5">
  <div class="container py-3">
    <div class="max-w-700">
      <span class="badge bg-warning text-dark uppercase tracking-wider mb-2">Join Team Dimple</span>
      <h1 class="serif-font display-4 fw-bold mb-3">Power Our Grassroots Movement</h1>
      <p class="lead text-white-50 mb-0">
        Grassroots supporters are the heart of our campaign. Whether hosting a neighbor meet & greet, placing a yard sign, or knocking on doors, your help makes all the difference!
      </p>
    </div>
  </div>
</section>

<!-- Volunteer Form & Options -->
<section class="py-5">
  <div class="container py-lg-4">
    <div class="row g-5">

      <!-- Volunteer Form -->
      <div class="col-lg-7">
        
        <!-- Success Alert -->
        <div id="volunteerSuccessAlert" class="alert alert-success p-4 rounded-4 d-none mb-4" role="alert">
          <h4 class="alert-heading serif-font fw-bold"><i class="bi bi-check-circle-fill me-2"></i> Thank You for Signing Up!</h4>
          <p class="mb-0">
            We have received your volunteer signup information. A member of Team Dimple will reach out to you shortly with next steps and campaign materials.
          </p>
        </div>

        <div id="volunteerFormCard" class="card border-0 shadow-sm p-4 p-lg-5 rounded-4 bg-white">
          <h3 class="serif-font fw-bold text-dark mb-4">Volunteer Action Sign-Up</h3>
          
          <form id="volunteerForm" novalidate>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="firstName" class="form-label fw-semibold">First Name *</label>
                <input type="text" class="form-control" id="firstName" required>
                <div class="invalid-feedback">Please enter your first name.</div>
              </div>
              
              <div class="col-md-6">
                <label for="lastName" class="form-label fw-semibold">Last Name *</label>
                <input type="text" class="form-control" id="lastName" required>
                <div class="invalid-feedback">Please enter your last name.</div>
              </div>

              <div class="col-md-6">
                <label for="email" class="form-label fw-semibold">Email Address *</label>
                <input type="email" class="form-control" id="email" required>
                <div class="invalid-feedback">Please enter a valid email address.</div>
              </div>

              <div class="col-md-6">
                <label for="phone" class="form-label fw-semibold">Phone Number *</label>
                <input type="tel" class="form-control" id="phone" placeholder="980-555-0199" required>
                <div class="invalid-feedback">Please enter your phone number.</div>
              </div>

              <div class="col-md-12">
                <label for="zipCode" class="form-label fw-semibold">ZIP Code / Neighborhood *</label>
                <input type="text" class="form-control" id="zipCode" placeholder="e.g. 28205 or East Charlotte" required>
              </div>

              <div class="col-md-12 mt-4">
                <label class="form-label fw-bold text-dark">How would you like to get involved? (Select all that apply)</label>
                
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" value="yard_sign" id="checkYardSign">
                  <label class="form-check-label" for="checkYardSign">
                    <strong>Request a Yard Sign</strong> for my home or business
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" value="canvass" id="checkCanvass">
                  <label class="form-check-label" for="checkCanvass">
                    <strong>Door Knocking & Canvassing</strong> in my neighborhood
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" value="phonebank" id="checkPhonebank">
                  <label class="form-check-label" for="checkPhonebank">
                    <strong>Phone & Text Banking</strong> to reach voters
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" value="host_event" id="checkHostEvent">
                  <label class="form-check-label" for="checkHostEvent">
                    <strong>Host a Meet & Greet</strong> or neighborhood coffee gathering
                  </label>
                </div>

                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" value="poll_worker" id="checkPollWorker">
                  <label class="form-check-label" for="checkPollWorker">
                    <strong>Poll Greeting</strong> on Early Voting or Election Day
                  </label>
                </div>
              </div>

              <div class="col-md-12">
                <label for="comments" class="form-label fw-semibold">Additional Comments or Questions</label>
                <textarea class="form-control" id="comments" rows="3" placeholder="Tell us any specific topics or ideas you would like to share..."></textarea>
              </div>

              <div class="col-md-12 mt-4">
                <button type="submit" class="btn btn-primary-green btn-lg w-100">
                  <i class="bi bi-send-fill me-2"></i> Submit Volunteer Registration
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>

      <!-- Volunteer Action Cards Sidebar -->
      <div class="col-lg-5">
        <div class="p-4 bg-light rounded-4 mb-4 border border-secondary border-opacity-10">
          <h4 class="serif-font fw-bold text-primary-green mb-3"><i class="bi bi-calendar2-week me-2"></i> Key Campaign Activities</h4>
          <p class="text-secondary">
            Our campaign relies on direct voter outreach to share Dimple's platform for environmental sustainability, public safety, and fiscal discipline.
          </p>
          <ul class="list-unstyled text-secondary mb-0">
            <li class="mb-2"><i class="bi bi-check2-circle text-primary-green me-2"></i> <strong>Early Voting Greeting</strong> across Mecklenburg polling sites.</li>
            <li class="mb-2"><i class="bi bi-check2-circle text-primary-green me-2"></i> <strong>Neighborhood Canvassing</strong> on weekend mornings.</li>
            <li class="mb-2"><i class="bi bi-check2-circle text-primary-green me-2"></i> <strong>Town Hall Organizing</strong> for environmental policies.</li>
          </ul>
        </div>

        <div class="p-4 bg-primary-soft rounded-4 border border-success border-opacity-25">
          <h4 class="serif-font fw-bold text-dark mb-2"><i class="bi bi-geo-alt me-2 text-primary-green"></i> Campaign Office Contact</h4>
          <p class="text-secondary mb-3">
            Have questions about volunteering or hosting an event? Contact our team directly:
          </p>
          <p class="mb-1"><strong>Email:</strong> <a href="mailto:<?php echo CAMPAIGN_EMAIL; ?>" class="text-primary-green"><?php echo CAMPAIGN_EMAIL; ?></a></p>
          <p class="mb-0"><strong>Phone:</strong> <?php echo CAMPAIGN_PHONE; ?></p>
        </div>
      </div>

    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
