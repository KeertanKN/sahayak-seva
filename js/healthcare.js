/**
 * Healthcare Module
 * Ambulances, Doctor Appointments, Home Visits, Elder/Childcare, and Consent-Gated Health Records
 */

import { stateStore } from './state.js';
import { REGIONS } from './config.js';
import { I18N } from './i18n.js';

export class HealthcareService {
  constructor() {
    this.doctors = [
      {
        id: "DOC-101",
        name: "Dr. Arvind Verma",
        specialty: "General Physician & Internal Medicine",
        experience: "18 years exp",
        hospital: "Apollo / Max City Hospital",
        modes: ["Home Visit", "Clinic Visit", "Video Call"],
        languages: ["English", "Hindi", "Punjabi"],
        rating: "4.9 ★ (320 reviews)",
        fee: "₹600"
      },
      {
        id: "DOC-102",
        name: "Dr. K. S. Meenakshi",
        specialty: "Geriatric & Senior Care Specialist",
        experience: "15 years exp",
        hospital: "Fortis Geriatric Care Center",
        modes: ["Home Visit", "Clinic Visit"],
        languages: ["English", "Tamil", "Hindi"],
        rating: "4.9 ★ (280 reviews)",
        fee: "₹800"
      },
      {
        id: "DOC-103",
        name: "Dr. Rashmi Mukherjee",
        specialty: "Pediatrician & Child Health",
        experience: "12 years exp",
        hospital: "Rainbow Children's Hospital",
        modes: ["Clinic Visit", "Home Visit", "Video Call"],
        languages: ["English", "Bengali", "Hindi"],
        rating: "4.8 ★ (410 reviews)",
        fee: "₹700"
      },
      {
        id: "DOC-104",
        name: "Dr. Rajesh Kulkarni",
        specialty: "Cardiologist & Hypertension Specialist",
        experience: "22 years exp",
        hospital: "Asian Heart Institute",
        modes: ["Clinic Visit", "Video Call"],
        languages: ["English", "Marathi", "Hindi"],
        rating: "5.0 ★ (520 reviews)",
        fee: "₹1,200"
      }
    ];

    this.careServicesList = [
      {
        id: "CARE-ELDER-1",
        title: "Senior Daily Living & Nurse Attendant",
        category: "Elder Care",
        desc: "Assisted mobility, medication administration, vitals monitoring, companionship, and daily hygiene assistance by certified attendants.",
        agency: "Seva Elderly Care Network (Verified)",
        pricing: "₹800 / 12-hour shift or ₹18,000 / month",
        rating: "4.9 ★ (Govt Certified)"
      },
      {
        id: "CARE-ELDER-2",
        title: "Physiotherapy & Post-Surgery Rehabilitation",
        category: "Elder Care",
        desc: "Certified home physiotherapists for stroke recovery, joint replacement recovery, arthritis pain management, and balance restoration.",
        agency: "ActiveLife Home Physio Care",
        pricing: "₹600 / 45-min session",
        rating: "4.8 ★ (Verified Clinicians)"
      },
      {
        id: "CARE-CHILD-1",
        title: "Newborn & Infant Certified Caregiver",
        category: "Childcare",
        desc: "Trained neonatal nurses for postpartum mother care, infant massage, feeding assistance, and newborn sleep routines.",
        agency: "MatruCare Certified Nannies",
        pricing: "₹1,000 / day shift",
        rating: "4.9 ★ (Police Verified)"
      },
      {
        id: "CARE-CHILD-2",
        title: "Special Needs & Developmental Therapy",
        category: "Childcare",
        desc: "Specialized pediatric support for children with autism spectrum, ADHD, speech delay, or physical mobility support.",
        agency: "Asha Children Development Trust",
        pricing: "₹750 / session",
        rating: "5.0 ★ (Special Educator Certified)"
      }
    ];
  }

  // Render Healthcare Section
  renderSection(container) {
    const state = stateStore.get();
    const lang = state.language;
    const t = I18N[lang] || I18N.en;
    const region = REGIONS[state.region] || REGIONS.national;

    container.innerHTML = `
      <!-- Healthcare Hero -->
      <section class="category-hero health-theme" aria-labelledby="health-heading">
        <div class="hero-header">
          <div class="hero-title-group">
            <div class="hero-icon" aria-hidden="true">🩺</div>
            <div>
              <span class="badge badge-health">Category 1</span>
              <h2 id="health-heading">${t.healthHeroTitle}</h2>
              <p>${t.healthHeroDesc}</p>
            </div>
          </div>
          <button class="btn btn-emergency" id="btn-quick-ambulance" aria-label="Request Emergency Ambulance Dispatch">
            🚑 108 Emergency Ambulance
          </button>
        </div>
      </section>

      <!-- Active Ambulance Tracker Banner (if active) -->
      <div id="ambulance-active-tracker-container"></div>

      <!-- Action Grid for Healthcare -->
      <div class="grid-cards-2">
        
        <!-- Service 1: Emergency Ambulance -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">🚑</div>
            <span class="badge badge-emergency">24/7 Emergency</span>
          </div>
          <h3>Ambulance & Emergency Medical Assistance</h3>
          <p>Instant dispatch of Basic (BLS) or Advanced Life Support (ALS) ambulances with live GPS tracking, doctor on call, and hospital notification.</p>
          <div class="feature-actions">
            <button class="btn btn-emergency" id="btn-open-ambulance-modal">
              Request Ambulance Now
            </button>
            <a href="tel:${region.emergencyNumbers.ambulance.split(' ')[0]}" class="btn btn-outline-danger">
              Call ${region.emergencyNumbers.ambulance}
            </a>
          </div>
        </article>

        <!-- Service 2: Doctor & Home Visits -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">👨‍⚕️</div>
            <span class="badge badge-health">Outpatient & Home</span>
          </div>
          <h3>Doctor Appointments & Home Consultations</h3>
          <p>Book verified physicians, geriatricians, and pediatricians for clinic visits, doorstep home examinations, or video teleconsultations.</p>
          <div class="feature-actions">
            <button class="btn btn-health" id="btn-open-doctor-modal">
              Find & Book Doctor
            </button>
          </div>
        </article>

        <!-- Service 3: Elder & Childcare -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">🤝</div>
            <span class="badge badge-health">Care & Support</span>
          </div>
          <h3>Elderly, Childcare & Specialized Support</h3>
          <p>Certified home caregivers, daily nurses for older adults, post-surgery rehabilitation, and verified infant care assistants.</p>
          <div class="feature-actions">
            <button class="btn btn-outline" id="btn-open-care-modal">
              Explore Care Services
            </button>
          </div>
        </article>

        <!-- Service 4: Health Vault & Consent -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">🔒</div>
            <span class="badge badge-civic">Encrypted & Private</span>
          </div>
          <h3>Patient Health Vault & Consent Portal</h3>
          <p>Store allergies, prescriptions, and conditions safely. Grant or revoke temporary 24-hour access to attending doctors with full audit logs.</p>
          <div class="feature-actions">
            <button class="btn btn-primary" id="btn-open-vault-view">
              View Health Vault & Consent
            </button>
          </div>
        </article>

      </div>

      <!-- Regional Emergency Hospital Directory -->
      <section class="card" style="margin-top: var(--space-8);">
        <h3>🏥 Regional Emergency Hospitals & Facilities (${region.name})</h3>
        <p>Direct lines and casualty departments for urgent medical admissions in your selected area:</p>
        <div class="grid-cards-3" style="margin-top: var(--space-4);">
          ${region.localServices.filter(s => s.type.includes('Hospital')).map(h => `
            <div class="card card-hover" style="background: var(--color-bg-alt); padding: var(--space-4);">
              <h4 style="font-size: var(--text-base);">${h.name}</h4>
              <p style="font-size: var(--text-xs); margin-bottom: var(--space-2);">${h.location}</p>
              <span class="badge badge-health">${h.type}</span>
              <div style="margin-top: var(--space-3);">
                <a href="tel:${h.contact}" class="btn btn-sm btn-outline" style="width: 100%;">
                  📞 Call: ${h.contact}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Active Bookings Summary -->
      ${this.renderBookingsSummary(state)}
    `;

    this.attachEvents(container);
    this.renderAmbulanceTracker();
  }

  renderBookingsSummary(state) {
    if (state.appointments.length === 0 && state.careRequests.length === 0) return '';
    return `
      <section class="card" style="margin-top: var(--space-8); border-left: 4px solid var(--color-health);">
        <h3>📋 Your Active Healthcare Bookings</h3>
        <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-4);">
          ${state.appointments.map(apt => `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2); padding: var(--space-3); background: var(--color-bg-alt); border-radius: var(--radius-md);">
              <div>
                <strong>${apt.doctor}</strong> (${apt.mode})
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">
                  📅 ${apt.date} at ${apt.timeSlot} | Ref: ${apt.id}
                </div>
              </div>
              <span class="badge badge-health">${apt.status}</span>
            </div>
          `).join('')}

          ${state.careRequests.map(care => `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2); padding: var(--space-3); background: var(--color-bg-alt); border-radius: var(--radius-md);">
              <div>
                <strong>${care.service}</strong> (${care.agency})
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">
                  Recipient: ${care.recipient} | Starts: ${care.startDate} (${care.frequency})
                </div>
              </div>
              <span class="badge badge-civic">${care.status}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  attachEvents(container) {
    // Quick ambulance
    const quickAmb = container.querySelector('#btn-quick-ambulance');
    if (quickAmb) {
      quickAmb.addEventListener('click', () => this.openAmbulanceModal());
    }

    const openAmb = container.querySelector('#btn-open-ambulance-modal');
    if (openAmb) {
      openAmb.addEventListener('click', () => this.openAmbulanceModal());
    }

    const openDoc = container.querySelector('#btn-open-doctor-modal');
    if (openDoc) {
      openDoc.addEventListener('click', () => this.openDoctorModal());
    }

    const openCare = container.querySelector('#btn-open-care-modal');
    if (openCare) {
      openCare.addEventListener('click', () => this.openCareModal());
    }

    const openVault = container.querySelector('#btn-open-vault-view');
    if (openVault) {
      openVault.addEventListener('click', () => {
        stateStore.setActiveView('vault');
      });
    }
  }

  // Ambulance Dispatch Modal
  openAmbulanceModal() {
    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');
    const state = stateStore.get();
    const region = REGIONS[state.region] || REGIONS.national;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-emergency">Urgent Dispatch</span>
          <h3 style="margin-top: 4px;">🚑 Request Emergency Ambulance</h3>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <p style="color: var(--color-emergency); font-weight: 600;">
          If the patient has stopped breathing or is unresponsive, call <strong>${region.emergencyNumbers.ambulance}</strong> immediately without delay!
        </p>

        <form id="ambulance-form" style="margin-top: var(--space-4);">
          <div class="form-group">
            <label for="amb-condition">Patient Emergency Condition *</label>
            <select id="amb-condition" required>
              <option value="">Select Condition...</option>
              <option value="Cardiac / Severe Chest Pain">Cardiac / Severe Chest Pain (Suspected Heart Attack)</option>
              <option value="Road Accident / Severe Trauma">Road Accident / Severe Trauma / Bleeding</option>
              <option value="Breathing Difficulty / Asthma">Acute Breathing Difficulty / Severe Asthma</option>
              <option value="Unconscious / Suspected Stroke">Unconscious / Sudden Paralysis / Stroke</option>
              <option value="Pregnancy / Active Labor">Maternity / Active Labor Emergency</option>
              <option value="High Fever / Pediatric Emergency">Severe Child Emergency / Febrile Seizures</option>
              <option value="Other Medical Crisis">Other Acute Medical Crisis</option>
            </select>
          </div>

          <div class="form-group">
            <label for="amb-type">Ambulance Type Needed</label>
            <select id="amb-type">
              <option value="ALS (Advanced Life Support) - Oxygen, Defibrillator, Paramedic">Advanced Life Support (ALS) - ICU Equipment & Paramedic</option>
              <option value="BLS (Basic Life Support) - Stretcher & First Aid">Basic Life Support (BLS) - Stretcher & First Aid</option>
              <option value="Patient Transport Vehicle">Non-Emergency Patient Transfer</option>
            </select>
          </div>

          <div class="form-group">
            <label for="amb-address">Pickup Location Address *</label>
            <textarea id="amb-address" required placeholder="House number, apartment name, street, nearby landmark...">A-42, Shanti Vihar, Near Metro Station Pillar 128, New Delhi</textarea>
            <button type="button" class="btn btn-sm btn-outline" id="btn-use-gps" style="margin-top: var(--space-2); align-self: flex-start;">
              📍 Use My Current Location (GPS)
            </button>
          </div>

          <div class="form-group">
            <label for="amb-caller-phone">Contact Phone Number *</label>
            <input type="tel" id="amb-caller-phone" required value="+91 98765 43210" placeholder="+91 10-digit number" />
            <span class="form-hint">Ambulance driver and emergency team will call this number immediately.</span>
          </div>

          <div style="background: var(--color-bg-alt); padding: var(--space-4); border-radius: var(--radius-md); margin-top: var(--space-4);">
            <label style="display: flex; align-items: center; gap: var(--space-2); cursor: pointer;">
              <input type="checkbox" id="amb-consent-share" checked style="width: 20px; height: 20px;" />
              <span>Allow ambulance team and receiving ER hospital to view patient's emergency health records (Allergies, Blood Group, Medications)</span>
            </label>
          </div>

          <div class="modal-footer" style="padding-left: 0; padding-right: 0; margin-top: var(--space-6);">
            <button type="button" class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-emergency">
              🚨 Dispatch Ambulance Now
            </button>
          </div>
        </form>
      </div>
    `;

    modalBackdrop.classList.add('open');

    // Event listeners
    document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.remove('open');
    document.getElementById('modal-cancel-btn').onclick = () => modalBackdrop.classList.remove('open');

    document.getElementById('btn-use-gps').onclick = () => {
      const addrBox = document.getElementById('amb-address');
      addrBox.value = "📍 Live Coordinates: 28.6139° N, 77.2090° E (Near Central Hospital Road, GPS Accuracy 8m)";
    };

    document.getElementById('ambulance-form').onsubmit = (e) => {
      e.preventDefault();
      const condition = document.getElementById('amb-condition').value;
      const ambType = document.getElementById('amb-type').value;
      const address = document.getElementById('amb-address').value;
      const phone = document.getElementById('amb-caller-phone').value;

      const request = {
        id: `AMB-${Math.floor(1000 + Math.random() * 9000)}`,
        condition,
        ambType,
        address,
        phone,
        status: "Dispatched",
        eta: "8 - 12 Minutes",
        vehicleNo: "DL 01 AM 4920",
        driverName: "Rameshwar Singh (ALS Paramedic)",
        driverPhone: "+91 98112 00481",
        hospitalNotified: "AIIMS Trauma Center Emergency Wing",
        dispatchedAt: new Date().toLocaleTimeString()
      };

      stateStore.setAmbulanceRequest(request);
      modalBackdrop.classList.remove('open');
      this.renderAmbulanceTracker();
      
      // Auto open confirmation notice
      alert(`🚑 Ambulance Dispatched!\nTicket ID: ${request.id}\nETA: ${request.eta}\nDriver: ${request.driverName} (${request.driverPhone})\nHospital Notified: ${request.hospitalNotified}`);
    };
  }

  // Render Live Ambulance Tracker in View
  renderAmbulanceTracker() {
    const container = document.getElementById('ambulance-active-tracker-container');
    if (!container) return;

    const state = stateStore.get();
    const req = state.ambulanceRequest;

    if (!req) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="card" style="border: 2px solid var(--color-emergency); background: var(--color-emergency-light); margin-bottom: var(--space-6); animation: fadeIn 0.3s ease;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span class="badge badge-emergency">LIVE DISPATCH</span>
              <strong>Ref #${req.id}</strong>
            </div>
            <h3 style="color: var(--color-emergency); margin-top: 4px;">🚑 Ambulance is En Route</h3>
            <p style="margin-bottom: var(--space-2); color: var(--color-text-main);">
              <strong>Estimated Arrival Time:</strong> <span style="font-size: var(--text-lg); font-weight: 800;">${req.eta}</span>
            </p>
            <p style="font-size: var(--text-sm); margin-bottom: var(--space-1);">
              <strong>Vehicle:</strong> ${req.vehicleNo} (${req.ambType.split(' - ')[0]})
            </p>
            <p style="font-size: var(--text-sm); margin-bottom: var(--space-1);">
              <strong>Driver & Paramedic:</strong> ${req.driverName} (📞 <a href="tel:${req.driverPhone}">${req.driverPhone}</a>)
            </p>
            <p style="font-size: var(--text-sm); margin-bottom: var(--space-1);">
              <strong>Destination ER:</strong> ${req.hospitalNotified}
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <a href="tel:${req.driverPhone}" class="btn btn-emergency">
              📞 Call Driver
            </a>
            <button class="btn btn-outline" id="btn-cancel-ambulance">
              Cancel Dispatch
            </button>
          </div>
        </div>

        <!-- Dispatch Progress Bar -->
        <div class="stepper" style="margin-top: var(--space-4);">
          <div class="step-item completed">
            <div class="step-number">✓</div>
            <div class="step-content">
              <h4>Request Received & Triaged</h4>
              <p style="font-size: var(--text-xs); margin-bottom: 0;">Dispatched at ${req.dispatchedAt}</p>
            </div>
          </div>
          <div class="step-item active">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Ambulance En Route (High Priority Siren)</h4>
              <p style="font-size: var(--text-xs); margin-bottom: 0;">Distance: 2.4 km away, passing Ring Road</p>
            </div>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Arrived at Location & ER Admission</h4>
              <p style="font-size: var(--text-xs); margin-bottom: 0;">Paramedic will assess and initiate triage</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const cancelBtn = container.querySelector('#btn-cancel-ambulance');
    if (cancelBtn) {
      cancelBtn.onclick = () => {
        if (confirm("Are you sure you want to cancel the ambulance request?")) {
          stateStore.setAmbulanceRequest(null);
          this.renderAmbulanceTracker();
        }
      };
    }
  }

  // Doctor Booking Modal
  openDoctorModal() {
    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-health">Appointments & Home Visits</span>
          <h3 style="margin-top: 4px;">👨‍⚕️ Book Certified Doctor</h3>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <p>Select a verified physician for a clinic consultation, doorstep home examination, or teleconsultation:</p>

        <div style="display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4);">
          ${this.doctors.map(doc => `
            <div class="card card-hover" style="border: 1px solid var(--color-border); padding: var(--space-4);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-2);">
                <div>
                  <h4 style="font-size: var(--text-lg); margin-bottom: 2px;">${doc.name}</h4>
                  <p style="color: var(--color-primary); font-weight: 600; font-size: var(--text-sm); margin-bottom: 2px;">${doc.specialty}</p>
                  <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2);">
                    🏥 ${doc.hospital} • ${doc.experience} • ${doc.rating}
                  </p>
                  <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
                    ${doc.modes.map(m => `<span class="badge ${m === 'Home Visit' ? 'badge-health' : 'badge-civic'}">${m}</span>`).join('')}
                    <span class="badge badge-warning">Languages: ${doc.languages.join(', ')}</span>
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: var(--text-lg); font-weight: 800; color: var(--color-health);">${doc.fee}</div>
                  <button class="btn btn-sm btn-health btn-select-doc" data-id="${doc.id}" data-name="${doc.name}" style="margin-top: var(--space-2);">
                    Select Doctor
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="doctor-booking-form-container" style="margin-top: var(--space-6); display: none;">
          <h4 id="selected-doc-heading" style="color: var(--color-primary);">Confirm Booking Details</h4>
          <form id="doc-booking-form" style="margin-top: var(--space-3);">
            <div class="form-group">
              <label for="apt-mode">Consultation Mode *</label>
              <select id="apt-mode" required>
                <option value="Home Visit">Home Visit (Doctor visits your residence)</option>
                <option value="Clinic Visit">Clinic / Hospital Visit</option>
                <option value="Video Call">Secure Video Consultation</option>
              </select>
            </div>

            <div class="grid-cards-2">
              <div class="form-group">
                <label for="apt-date">Preferred Date *</label>
                <input type="date" id="apt-date" required value="2026-11-23" />
              </div>
              <div class="form-group">
                <label for="apt-time">Time Slot *</label>
                <select id="apt-time" required>
                  <option value="10:00 AM - 11:00 AM">Morning (10:00 AM - 11:00 AM)</option>
                  <option value="02:00 PM - 03:00 PM">Afternoon (02:00 PM - 03:00 PM)</option>
                  <option value="05:30 PM - 06:30 PM">Evening (05:30 PM - 06:30 PM)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="apt-patient-notes">Symptoms / Reason for Visit</label>
              <textarea id="apt-patient-notes" placeholder="Describe current complaints or routine checkup details..."></textarea>
            </div>

            <button type="submit" class="btn btn-health" style="width: 100%; margin-top: var(--space-2);">
              Confirm & Book Appointment
            </button>
          </form>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.remove('open');

    let selectedDoctor = null;
    modalContent.querySelectorAll('.btn-select-doc').forEach(btn => {
      btn.onclick = () => {
        selectedDoctor = btn.dataset.name;
        const formContainer = document.getElementById('doctor-booking-form-container');
        formContainer.style.display = 'block';
        document.getElementById('selected-doc-heading').innerText = `Booking with ${selectedDoctor}`;
        formContainer.scrollIntoView({ behavior: 'smooth' });
      };
    });

    const bookingForm = document.getElementById('doc-booking-form');
    if (bookingForm) {
      bookingForm.onsubmit = (e) => {
        e.preventDefault();
        const mode = document.getElementById('apt-mode').value;
        const date = document.getElementById('apt-date').value;
        const timeSlot = document.getElementById('apt-time').value;

        const newApt = {
          id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
          doctor: selectedDoctor,
          facility: "Associated Hospital / Doorstep",
          mode,
          date,
          timeSlot,
          status: "Confirmed"
        };

        stateStore.addAppointment(newApt);
        modalBackdrop.classList.remove('open');
        this.renderSection(document.getElementById('content-area'));
        alert(`✅ Appointment Successfully Confirmed!\nBooking ID: ${newApt.id}\nDoctor: ${newApt.doctor}\nMode: ${newApt.mode}\nDate & Time: ${newApt.date} at ${newApt.timeSlot}`);
      };
    }
  }

  // Care Services Modal (Elderly & Childcare)
  openCareModal() {
    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-health">Specialized Care</span>
          <h3 style="margin-top: 4px;">🤝 Elderly, Childcare & Home Assistance</h3>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <p>Book verified, background-checked nursing attendants and caregivers with official accreditation:</p>

        <div style="display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4);">
          ${this.careServicesList.map(care => `
            <div class="card card-hover" style="border: 1px solid var(--color-border); padding: var(--space-4);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-2);">
                <div>
                  <span class="badge ${care.category === 'Elder Care' ? 'badge-health' : 'badge-civic'}">${care.category}</span>
                  <h4 style="font-size: var(--text-lg); margin: 4px 0 2px;">${care.title}</h4>
                  <p style="font-size: var(--text-sm); color: var(--color-text-muted);">${care.desc}</p>
                  <p style="font-size: var(--text-xs); color: var(--color-text-light);">
                    🏢 ${care.agency} • ${care.rating}
                  </p>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: var(--text-sm); font-weight: 700; color: var(--color-primary);">${care.pricing}</div>
                  <button class="btn btn-sm btn-primary btn-book-care" data-title="${care.title}" data-agency="${care.agency}" style="margin-top: var(--space-2);">
                    Request Service
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.remove('open');

    modalContent.querySelectorAll('.btn-book-care').forEach(btn => {
      btn.onclick = () => {
        const title = btn.dataset.title;
        const agency = btn.dataset.agency;
        const recipient = prompt("Enter Care Recipient Name & Age (e.g., Ramesh Kumar, 70 yrs):", "Sunita Sharma, 62 yrs");
        if (recipient) {
          const req = {
            id: `CARE-${Math.floor(1000 + Math.random() * 9000)}`,
            service: title,
            recipient,
            startDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
            frequency: "Daily Assisted Shifts",
            agency,
            status: "Scheduled"
          };
          stateStore.addCareRequest(req);
          modalBackdrop.classList.remove('open');
          this.renderSection(document.getElementById('content-area'));
          alert(`✅ Care Request Submitted!\nService: ${title}\nAgency: ${agency}\nRecipient: ${recipient}\nA coordinator will call within 2 hours to confirm caregiver matching.`);
        }
      };
    });
  }

  // Render Health Vault & Consent Page
  renderHealthVault(container) {
    const state = stateStore.get();
    const p = state.patientProfile;
    const consent = state.patientConsent;

    container.innerHTML = `
      <section class="category-hero health-theme" aria-labelledby="vault-heading">
        <div class="hero-header">
          <div class="hero-title-group">
            <div class="hero-icon">🔒</div>
            <div>
              <span class="badge badge-civic">Encrypted Health Vault</span>
              <h2 id="vault-heading">Patient Medical History & Consent Management</h2>
              <p>Under Ayushman Bharat Digital Mission (ABDM) standards, your medical history is completely encrypted. You have sole sovereign authority to grant or revoke doctor access.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Consent Status Card -->
      <section class="consent-banner ${consent.granted ? 'granted' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span class="badge ${consent.granted ? 'badge-health' : 'badge-emergency'}">
                ${consent.granted ? 'ACCESS ACTIVE' : 'LOCKED / PRIVATE'}
              </span>
              <strong style="font-size: var(--text-base);">
                ${consent.granted ? 'Attending Physician Has Temporary Access' : 'Doctor Access Is Currently Revoked'}
              </strong>
            </div>
            <p style="font-size: var(--text-sm); margin-top: var(--space-2); margin-bottom: 0;">
              ${consent.granted
                ? `Expires on: <strong>${consent.expiresAt}</strong>. Doctor One-Time Passcode: <span style="font-family: monospace; font-size: var(--text-base); font-weight: 800; background: #fff; padding: 2px 8px; border-radius: 4px;">${consent.doctorAccessCode}</span>`
                : 'No doctor, hospital, or insurance company can view your medical records without your one-time consent.'}
            </p>
          </div>

          <div>
            ${consent.granted
              ? `<button class="btn btn-outline-danger" id="btn-revoke-consent">🛑 Revoke Access Now</button>`
              : `<button class="btn btn-health" id="btn-grant-consent">🔑 Grant 24-Hour Access</button>`}
          </div>
        </div>
      </section>

      <!-- Patient Health Summary Grid -->
      <div class="grid-cards-2">
        
        <!-- Profile & Emergency Contacts -->
        <div class="card">
          <h3>👤 Patient Identity & Vitals</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: var(--space-3); font-size: var(--text-sm);">
            <tr style="border-bottom: 1px solid var(--color-border-light);">
              <td style="padding: var(--space-2) 0; font-weight: 600;">Full Name:</td>
              <td>${p.name} (${p.age} yrs, ${p.gender})</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-light);">
              <td style="padding: var(--space-2) 0; font-weight: 600;">ABHA Health ID:</td>
              <td><span style="font-family: monospace; font-weight: 700;">${p.abhaId}</span></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border-light);">
              <td style="padding: var(--space-2) 0; font-weight: 600;">Blood Group:</td>
              <td><span class="badge badge-emergency">${p.bloodGroup}</span></td>
            </tr>
            <tr>
              <td style="padding: var(--space-2) 0; font-weight: 600;">Emergency Contact:</td>
              <td>${p.emergencyContact}</td>
            </tr>
          </table>
        </div>

        <!-- Critical Drug Allergies (Life-Saving for ER Doctors) -->
        <div class="card" style="border: 2px solid var(--color-emergency-border);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <span style="font-size: 24px;">⚠️</span>
            <div>
              <h3 style="color: var(--color-emergency);">Known Drug Allergies</h3>
              <p style="font-size: var(--text-xs); margin-bottom: 0;">Critical alert for emergency triage & medication safety.</p>
            </div>
          </div>
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-top: var(--space-4);">
            ${p.allergies.map(a => `<span class="badge badge-emergency" style="font-size: var(--text-sm); padding: 6px 12px;">🚫 ${a}</span>`).join('')}
          </div>
        </div>

        <!-- Chronic Conditions -->
        <div class="card">
          <h3>🩺 Chronic Medical Conditions</h3>
          <ul style="margin-top: var(--space-3); padding-left: var(--space-5); font-size: var(--text-sm);">
            ${p.conditions.map(c => `<li style="margin-bottom: var(--space-2);">${c}</li>`).join('')}
          </ul>
        </div>

        <!-- Ongoing Prescriptions -->
        <div class="card">
          <h3>💊 Ongoing Prescriptions</h3>
          <div style="margin-top: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2);">
            ${p.medications.map(m => `
              <div style="padding: var(--space-2) var(--space-3); background: var(--color-bg-alt); border-radius: var(--radius-sm); font-size: var(--text-sm);">
                <strong>${m.name}</strong> - <span>${m.timing}</span>
                <div style="font-size: var(--text-xs); color: var(--color-text-light);">Prescribed by: ${m.prescribedBy}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Past Surgeries & Immunizations -->
        <div class="card">
          <h3>🏥 Surgical History & Vaccinations</h3>
          <p style="font-size: var(--text-xs); font-weight: 700; margin-bottom: var(--space-1); text-transform: uppercase;">Surgeries:</p>
          <ul style="padding-left: var(--space-5); font-size: var(--text-sm); margin-bottom: var(--space-3);">
            ${p.pastSurgeries.map(s => `<li>${s}</li>`).join('')}
          </ul>
          <p style="font-size: var(--text-xs); font-weight: 700; margin-bottom: var(--space-1); text-transform: uppercase;">Vaccinations:</p>
          <ul style="padding-left: var(--space-5); font-size: var(--text-sm); margin-bottom: 0;">
            ${p.vaccinations.map(v => `<li>${v}</li>`).join('')}
          </ul>
        </div>

        <!-- Simulated Doctor View Demo -->
        <div class="card" style="background: var(--color-bg-alt);">
          <h3>👨‍⚕️ Attending Doctor's EMR View Mode</h3>
          <p style="font-size: var(--text-sm);">Test how this record looks to hospital emergency room doctors when they enter your patient ABHA ID and your granted OTP:</p>
          <button class="btn btn-outline" id="btn-simulate-doctor-view" style="margin-top: var(--space-2);">
            🖥️ Preview Doctor's Screen
          </button>
        </div>

      </div>
    `;

    // Attach consent handlers
    const grantBtn = container.querySelector('#btn-grant-consent');
    if (grantBtn) {
      grantBtn.onclick = () => {
        stateStore.grantConsent(24);
        this.renderHealthVault(container);
        alert("✅ Consent Granted!\nA 6-digit access OTP has been generated for your doctor. Access will automatically expire in 24 hours.");
      };
    }

    const revokeBtn = container.querySelector('#btn-revoke-consent');
    if (revokeBtn) {
      revokeBtn.onclick = () => {
        stateStore.revokeConsent();
        this.renderHealthVault(container);
        alert("🔒 Consent Revoked!\nAll third-party and doctor view access has been immediately disconnected.");
      };
    }

    const simBtn = container.querySelector('#btn-simulate-doctor-view');
    if (simBtn) {
      simBtn.onclick = () => {
        const cur = stateStore.get();
        if (!cur.patientConsent.granted) {
          alert("⛔ ACCESS DENIED: Hospital Doctor Terminal\n\nError: Patient has not granted consent or consent has expired.\nPlease ask patient to click 'Grant 24-Hour Access' to unlock emergency records.");
        } else {
          alert(`✅ HOSPITAL EMR TERMINAL: AIIMS / Max Healthcare\nVerified Patient: ${cur.patientProfile.name} (ABHA: ${cur.patientProfile.abhaId})\n\nCRITICAL ALLERGIES: ${cur.patientProfile.allergies.join(', ')}\nBLOOD GROUP: ${cur.patientProfile.bloodGroup}\nCONDITIONS: ${cur.patientProfile.conditions.join(', ')}\n\nConsent Verified: Valid until ${cur.patientConsent.expiresAt}`);
        }
      };
    }
  }
}

export const healthcareService = new HealthcareService();
