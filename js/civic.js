/**
 * Government and Civic Services Module
 * Aadhaar, PAN, Voter ID step-by-step guides, document checklists, and local civic grievance reporting
 */

import { stateStore } from './state.js';
import { REGIONS } from './config.js';
import { I18N } from './i18n.js';

export class CivicService {
  constructor() {
    this.guides = {
      aadhaar: {
        title: "Aadhaar Card (UIDAI)",
        subtitle: "12-digit Unique Identification Number for residents of India",
        portal: "https://myaadhaar.uidai.gov.in",
        helpline: "1947",
        services: [
          {
            name: "Update Mobile Number in Aadhaar",
            fee: "₹50 (Statutory UIDAI fee)",
            time: "24 to 72 hours",
            steps: [
              "Locate the nearest Aadhaar Seva Kendra (ASK) or bank/post office enrollment center.",
              "Book an appointment online via myaadhaar.uidai.gov.in or walk in.",
              "Fill out the Aadhaar Correction / Update Form.",
              "Provide biometric verification (fingerprint or iris scan) to authenticate your identity.",
              "Collect the acknowledgment slip containing your 14-digit Update Request Number (URN) to track status."
            ],
            docs: ["Original Aadhaar Card (No separate proof of address or ID needed for mobile update)"]
          },
          {
            name: "Update Address Online",
            fee: "₹50",
            time: "3 to 7 working days",
            steps: [
              "Visit myaadhaar.uidai.gov.in and login using your Aadhaar number and OTP sent to your linked phone.",
              "Select 'Update Address' and enter the new complete residential address.",
              "Upload a clear scanned copy of a valid Proof of Address (e.g., electricity bill, bank passbook, rent agreement).",
              "Alternatively, use 'Head of Family (HoF)' based verification if you don't have proof in your own name.",
              "Pay ₹50 online and note the Service Request Number (SRN)."
            ],
            docs: ["Electricity / Water Bill (< 3 months old)", "Bank Passbook with photo", "Registered Rent Agreement", "Passport or Voter ID"]
          },
          {
            name: "Download e-Aadhaar PDF / Order PVC Card",
            fee: "Free for PDF download | ₹50 for official PVC Card",
            time: "Instant for PDF | 5-7 days for PVC card via Speed Post",
            steps: [
              "Go to myaadhaar.uidai.gov.in and click 'Download Aadhaar' or 'Order Aadhaar PVC Card'.",
              "Enter your 12-digit Aadhaar number and Captcha, then verify with OTP.",
              "Your e-Aadhaar PDF is password protected: the password is the FIRST 4 LETTERS of your name in CAPITAL + 4-digit BIRTH YEAR (e.g., SUNITA born in 1964 = SUNI1964)."
            ],
            docs: ["Aadhaar Number or Enrolment ID (EID)"]
          }
        ]
      },

      pan: {
        title: "PAN Card (Income Tax Department)",
        subtitle: "10-digit alphanumeric permanent account number for tax and financial services",
        portal: "https://www.onlineservices.nsdl.com / https://eportal.incometax.gov.in",
        helpline: "020-27218080 / 1800-180-1961",
        services: [
          {
            name: "Instant e-PAN via Aadhaar (Free & 10 Minutes)",
            fee: "Free (₹0)",
            time: "Under 10 minutes",
            steps: [
              "Visit the Income Tax e-Filing Portal (eportal.incometax.gov.in).",
              "Under 'Quick Links', click 'Instant e-PAN' -> 'Get New e-PAN'.",
              "Enter your 12-digit Aadhaar number and confirm consent.",
              "Enter the 6-digit OTP received on your Aadhaar-linked mobile.",
              "Validate your Aadhaar details (Name, DOB, Gender, Photo).",
              "Submit request. Your digital PAN PDF will be generated within 10 minutes."
            ],
            docs: ["Aadhaar Card with active mobile link (Must NOT have an existing PAN)"]
          },
          {
            name: "New Physical PAN Card (Form 49A)",
            fee: "₹107 (within India) / ₹1,017 (abroad)",
            time: "10 to 15 working days",
            steps: [
              "Visit Protean NSDL or UTIITSL portal and select Application Type 'Form 49A (Indian Citizen)'.",
              "Fill personal details, father's name, communication address, and income source.",
              "Select digital submission mode: Paperless e-KYC or Scan & Upload.",
              "Make online payment and print acknowledgment slip."
            ],
            docs: ["Proof of Identity (Aadhaar, Voter ID, Passport)", "Proof of Address (Utility bill, bank statement)", "Proof of Date of Birth (Birth certificate, matriculation marksheet)"]
          },
          {
            name: "Link PAN with Aadhaar",
            fee: "₹1,000 (Statutory penalty fee under Sec 234H if not previously linked)",
            time: "Instant to 48 hours",
            steps: [
              "Go to eportal.incometax.gov.in -> Click 'Link Aadhaar'.",
              "Enter PAN and Aadhaar number.",
              "Pay the applicable Challan fee under Major Head (0021) and Minor Head (500).",
              "After fee clearance (usually instant), return to Link Aadhaar and click Validate."
            ],
            docs: ["PAN Card", "Aadhaar Card (Name and DOB must match on both documents)"]
          }
        ]
      },

      voter: {
        title: "Voter ID Card (Election Commission of India - ECI)",
        subtitle: "Electoral Photo Identity Card (EPIC) for exercising franchise rights",
        portal: "https://voters.eci.gov.in",
        helpline: "1950 (Toll-Free Voter Helpline)",
        services: [
          {
            name: "New Voter Registration (Form 6)",
            fee: "Free (₹0)",
            time: "15 to 30 days (Includes Booth Level Officer verification)",
            steps: [
              "Visit voters.eci.gov.in or download the official 'Voter Helpline App'.",
              "Sign up with your mobile number and click 'Fill Form 6'.",
              "Select your State, District, and Parliamentary / Assembly Constituency.",
              "Fill personal details, permanent & current residence address.",
              "Upload a passport-sized photograph and proofs.",
              "Submit and note the 12-digit Reference ID.",
              "The local Booth Level Officer (BLO) will conduct a doorstep field verification."
            ],
            docs: ["Passport-size photo", "Proof of Age (Birth Certificate, Aadhaar, PAN, Class 10 marksheet)", "Proof of Residence (Water/Gas/Electricity bill, Aadhaar, Bank passbook, Rent deed)"]
          },
          {
            name: "Change Address or Constituency / Correction (Form 8)",
            fee: "Free (₹0)",
            time: "15 to 20 days",
            steps: [
              "Log in to voters.eci.gov.in and select 'Shifting of Residence / Correction of Entries in Existing Electoral Roll (Form 8)'.",
              "Enter your existing EPIC number.",
              "Choose whether shifting within constituency or to a new constituency.",
              "Provide updated address and supporting proof.",
              "Submit for BLO verification."
            ],
            docs: ["Current Voter ID (EPIC)", "Proof of New Address"]
          },
          {
            name: "Download Digital e-EPIC",
            fee: "Free (₹0)",
            time: "Instant",
            steps: [
              "Visit voters.eci.gov.in and click 'e-EPIC Download'.",
              "Enter your EPIC number or Form Reference number.",
              "Verify with OTP sent to your registered mobile number.",
              "Download non-editable secure PDF Voter ID containing QR code."
            ],
            docs: ["Registered mobile number linked with Voter ID"]
          }
        ]
      }
    };
  }

  // Render Civic Section
  renderSection(container) {
    const state = stateStore.get();
    const region = REGIONS[state.region] || REGIONS.national;

    container.innerHTML = `
      <!-- Civic Hero -->
      <section class="category-hero civic-theme" aria-labelledby="civic-heading">
        <div class="hero-header">
          <div class="hero-title-group">
            <div class="hero-icon" aria-hidden="true">🏛️</div>
            <div>
              <span class="badge badge-civic">Category 2</span>
              <h2 id="civic-heading">Government & Civic Services</h2>
              <p>Step-by-step guidance for Aadhaar, PAN, and Voter ID, plus direct filing of community complaints with your local municipal body.</p>
            </div>
          </div>
          <button class="btn btn-civic" id="btn-report-grievance-hero">
            📢 Report Local Community Problem
          </button>
        </div>
      </section>

      <!-- Action Grid for Civic Services -->
      <div class="grid-cards-3">
        
        <!-- Aadhaar Card Card -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">🆔</div>
            <span class="badge badge-civic">UIDAI</span>
          </div>
          <h3>Aadhaar Guidance</h3>
          <p>Update phone number, change address, order official PVC card, or download password-protected e-Aadhaar PDF.</p>
          <div class="feature-actions">
            <button class="btn btn-civic btn-open-guide" data-guide="aadhaar">
              Aadhaar Steps & Docs
            </button>
          </div>
        </article>

        <!-- PAN Card Card -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">💳</div>
            <span class="badge badge-civic">Income Tax</span>
          </div>
          <h3>PAN Card Services</h3>
          <p>Apply for 10-minute instant e-PAN with Aadhaar, apply for physical Form 49A, or link PAN with Aadhaar.</p>
          <div class="feature-actions">
            <button class="btn btn-civic btn-open-guide" data-guide="pan">
              PAN Steps & Docs
            </button>
          </div>
        </article>

        <!-- Voter ID Card -->
        <article class="feature-card">
          <div class="feature-header">
            <div class="feature-icon-bubble">🗳️</div>
            <span class="badge badge-civic">ECI</span>
          </div>
          <h3>Voter ID (EPIC)</h3>
          <p>Register as a new voter (Form 6), update residence address (Form 8), or download digital e-EPIC card.</p>
          <div class="feature-actions">
            <button class="btn btn-civic btn-open-guide" data-guide="voter">
              Voter ID Steps & Docs
            </button>
          </div>
        </article>

      </div>

      <!-- Community Grievance Reporting Center -->
      <section class="card" style="margin-top: var(--space-8); border-top: 4px solid var(--color-civic);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h3>📢 Citizen Grievance Portal ("CivicFix")</h3>
            <p style="margin-bottom: var(--space-1);">Report community issues (potholes, streetlights, garbage, water leaks) directly to <strong>${region.authorities.civicPortal}</strong>.</p>
            <p style="font-size: var(--text-xs); color: var(--color-text-light);">Submissions are geo-tagged and assigned directly to the Ward Executive Engineer.</p>
          </div>
          <button class="btn btn-civic" id="btn-report-grievance">
            + File New Community Complaint
          </button>
        </div>

        <!-- Submitted Grievances List -->
        <div style="margin-top: var(--space-6);">
          <h4>Recent Reports Filed in Your Area</h4>
          <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-3);">
            ${state.grievances.map(g => `
              <div class="card card-hover" style="border: 1px solid var(--color-border); padding: var(--space-4); background: var(--color-bg-alt);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-2);">
                  <div>
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                      <span class="badge badge-civic">${g.category}</span>
                      <strong style="font-size: var(--text-sm);">Ticket #${g.id}</strong>
                    </div>
                    <p style="font-size: var(--text-sm); font-weight: 600; margin: 4px 0 2px;">${g.description}</p>
                    <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-2);">
                      📍 ${g.location} • Authority: ${g.authority}
                    </p>
                    <div style="font-size: var(--text-xs); color: var(--color-text-light);">
                      Submitted on: ${g.submittedAt}
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span class="badge badge-warning">${g.status}</span>
                  </div>
                </div>

                <!-- Update Timeline -->
                <div style="margin-top: var(--space-3); padding-top: var(--space-2); border-top: 1px solid var(--color-border-light);">
                  <p style="font-size: var(--text-xs); font-weight: 700; margin-bottom: 2px;">Latest Activity:</p>
                  ${g.updates.map(u => `
                    <div style="font-size: var(--text-xs); color: var(--color-text-muted);">
                      • <strong>${u.time}:</strong> ${u.note}
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Regional Civic Office Helpline Directory -->
      <section class="card" style="margin-top: var(--space-8);">
        <h3>🏛️ Regional Government Authorities & Portals (${region.name})</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: var(--space-3); font-size: var(--text-sm);">
          <tr style="border-bottom: 1px solid var(--color-border-light);">
            <td style="padding: var(--space-2) 0; font-weight: 600;">Municipal Corporation / Civic:</td>
            <td>${region.authorities.civicPortal}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--color-border-light);">
            <td style="padding: var(--space-2) 0; font-weight: 600;">Water Board Helpline:</td>
            <td>${region.authorities.waterBoard || '1916 (Central Water Helpline)'}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--color-border-light);">
            <td style="padding: var(--space-2) 0; font-weight: 600;">Electricity Distribution:</td>
            <td>${region.authorities.electricity || '1912 (Power Department)'}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--color-border-light);">
            <td style="padding: var(--space-2) 0; font-weight: 600;">Nearest Aadhaar Center:</td>
            <td>${region.authorities.aadhaarCenter}</td>
          </tr>
          <tr>
            <td style="padding: var(--space-2) 0; font-weight: 600;">Election Commission CEO:</td>
            <td>${region.authorities.electionCommission}</td>
          </tr>
        </table>
      </section>
    `;

    this.attachEvents(container);
  }

  attachEvents(container) {
    container.querySelectorAll('.btn-open-guide').forEach(btn => {
      btn.onclick = () => {
        const guideKey = btn.dataset.guide;
        this.openGuideModal(guideKey);
      };
    });

    const reportBtn = container.querySelector('#btn-report-grievance');
    if (reportBtn) {
      reportBtn.onclick = () => this.openReportModal();
    }

    const heroReportBtn = container.querySelector('#btn-report-grievance-hero');
    if (heroReportBtn) {
      heroReportBtn.onclick = () => this.openReportModal();
    }
  }

  // Identity Service Guide Modal
  openGuideModal(guideKey) {
    const guide = this.guides[guideKey];
    if (!guide) return;

    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-civic">Official Guidance</span>
          <h3 style="margin-top: 4px;">${guide.title}</h3>
          <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 0;">${guide.subtitle}</p>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-bg-alt); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);">
          <div>
            <strong>Official Portal:</strong> <a href="${guide.portal}" target="_blank" rel="noopener noreferrer">${guide.portal}</a>
          </div>
          <div>
            <strong>Toll-Free Helpline:</strong> <a href="tel:${guide.helpline}">📞 ${guide.helpline}</a>
          </div>
        </div>

        <h4 style="margin-top: var(--space-6); margin-bottom: var(--space-3);">Available Services & Step-by-Step Instructions:</h4>

        <div class="accordion">
          ${guide.services.map((srv, idx) => `
            <div class="accordion-item ${idx === 0 ? 'open' : ''}">
              <button class="accordion-trigger" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                <span>${srv.name}</span>
                <span class="chevron">▼</span>
              </button>
              <div class="accordion-content">
                <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-3); flex-wrap: wrap;">
                  <span class="badge badge-health">Fee: ${srv.fee}</span>
                  <span class="badge badge-warning">Processing Time: ${srv.time}</span>
                </div>
                
                <p style="font-weight: 700; margin-bottom: var(--space-2);">Steps to Complete:</p>
                <ol style="padding-left: var(--space-5); margin-bottom: var(--space-4);">
                  ${srv.steps.map(st => `<li style="margin-bottom: var(--space-1);">${st}</li>`).join('')}
                </ol>

                <p style="font-weight: 700; margin-bottom: var(--space-2);">Required Documents Checklist:</p>
                <div style="display: flex; flex-direction: column; gap: var(--space-1);">
                  ${srv.docs.map(doc => `
                    <label style="display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-xs);">
                      <input type="checkbox" checked />
                      <span>${doc}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Download Checklist Button -->
        <div style="margin-top: var(--space-6); text-align: center;">
          <button class="btn btn-outline" id="btn-print-checklist">
            📄 Print / Save Offline Checklist
          </button>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.remove('open');

    // Accordion triggers
    modalContent.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.onclick = () => {
        const item = trigger.closest('.accordion-item');
        item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', item.classList.contains('open'));
      };
    });

    const printBtn = document.getElementById('btn-print-checklist');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }
  }

  // Grievance Reporting Modal
  openReportModal() {
    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');
    const state = stateStore.get();
    const region = REGIONS[state.region] || REGIONS.national;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div>
          <span class="badge badge-civic">Citizen Report</span>
          <h3 style="margin-top: 4px;">📢 Report Community or Local Problem</h3>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--text-sm);">
          Your complaint will be automatically forwarded to <strong>${region.authorities.civicPortal}</strong> with high municipal priority.
        </p>

        <form id="grievance-form" style="margin-top: var(--space-4);">
          <div class="form-group">
            <label for="griev-category">Category of Problem *</label>
            <select id="griev-category" required>
              <option value="">Select Category...</option>
              <option value="Roads & Potholes">Potholes / Damaged Road / Missing Manhole Cover</option>
              <option value="Streetlights">Streetlights Not Working / Dark Spots</option>
              <option value="Garbage & Sanitation">Garbage Dump / Uncollected Waste / Dirty Drain</option>
              <option value="Water Supply & Leakage">Water Pipeline Leak / Dirty Drinking Water</option>
              <option value="Electricity & Sparking">Low Voltage / Sparking Transformer / Dangling Cable</option>
              <option value="Stray Animals & Rabies">Stray Dog Pack / Rabid Animal / Cattle Nuisance</option>
              <option value="Encroachment & Tree Fall">Fallen Tree / Blocked Public Footpath</option>
            </select>
          </div>

          <div class="form-group">
            <label for="griev-desc">Detailed Description of Problem *</label>
            <textarea id="griev-desc" required placeholder="Describe the issue, how long it has been present, and exact landmark..."></textarea>
          </div>

          <div class="form-group">
            <label for="griev-location">Exact Location / Landmark *</label>
            <input type="text" id="griev-location" required placeholder="e.g. Near Community Center Gate 2, Main Market Road" />
            <button type="button" class="btn btn-sm btn-outline" id="btn-griev-gps" style="margin-top: var(--space-2); align-self: flex-start;">
              📍 Attach Geo-Tag Coordinates
            </button>
          </div>

          <div class="grid-cards-2">
            <div class="form-group">
              <label for="griev-severity">Severity Level</label>
              <select id="griev-severity">
                <option value="High (Hazard / Risk to Life)">High (Accident Hazard / Live Wire)</option>
                <option value="Medium (Significant Disruption)" selected>Medium (Public Disruption)</option>
                <option value="Low (Maintenance)">Low (Routine Maintenance)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="griev-photo">Attach Photo Proof (Optional)</label>
              <input type="file" id="griev-photo" accept="image/*" />
            </div>
          </div>

          <div class="form-group">
            <label for="griev-contact">Your Contact Phone Number *</label>
            <input type="tel" id="griev-contact" required value="+91 98765 43210" placeholder="+91 10-digit number" />
            <span class="form-hint">Used by the Ward Junior Engineer to inspect and close the ticket.</span>
          </div>

          <div class="modal-footer" style="padding-left: 0; padding-right: 0; margin-top: var(--space-6);">
            <button type="button" class="btn btn-outline" id="modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-civic">
              🚀 Submit Grievance Ticket
            </button>
          </div>
        </form>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.remove('open');
    document.getElementById('modal-cancel-btn').onclick = () => modalBackdrop.classList.remove('open');

    document.getElementById('btn-griev-gps').onclick = () => {
      document.getElementById('griev-location').value = "📍 Geo-tagged: 28.6142° N, 77.2098° E (Sector 4 Main Cross Road)";
    };

    document.getElementById('grievance-form').onsubmit = (e) => {
      e.preventDefault();
      const category = document.getElementById('griev-category').value;
      const desc = document.getElementById('griev-desc').value;
      const loc = document.getElementById('griev-location').value;
      const severity = document.getElementById('griev-severity').value;

      const newGrievance = {
        id: `CIVIC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        category,
        description: desc,
        location: loc,
        authority: region.authorities.civicPortal,
        severity,
        status: "Submitted & Assigned to Ward Officer",
        submittedAt: new Date().toLocaleString(),
        updates: [
          { time: new Date().toLocaleTimeString(), note: `Ticket auto-routed to ${region.authorities.civicPortal} Inspection Wing` }
        ]
      };

      stateStore.addGrievance(newGrievance);
      modalBackdrop.classList.remove('open');
      this.renderSection(document.getElementById('content-area'));
      alert(`✅ Grievance Ticket Created!\nTicket ID: ${newGrievance.id}\nCategory: ${newGrievance.category}\nForwarded to: ${newGrievance.authority}\nSMS confirmation sent.`);
    };
  }
}

export const civicService = new CivicService();
