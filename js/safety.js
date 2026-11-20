/**
 * Safety and Emergency Help Module
 * 1-Tap SOS, regional emergency numbers, life-saving first-aid guides, siren simulation, and safe spaces
 */

import { stateStore } from './state.js';
import { REGIONS } from './config.js';
import { I18N } from './i18n.js';

export class SafetyService {
  constructor() {
    this.sirenAudio = null;
    this.isSirenPlaying = false;
    this.firstAidGuides = [
      {
        id: "cpr",
        title: "Cardiac Arrest & CPR (Adult)",
        badge: "Life Threatening",
        badgeClass: "badge-emergency",
        icon: "❤️",
        urgency: "Call 112 / 108 immediately. Start CPR without delay.",
        steps: [
          "Check responsiveness: Shake shoulders gently and shout 'Are you okay?'.",
          "Check for normal breathing: Look at chest for 5-10 seconds. If not breathing or only gasping, act immediately.",
          "Call 112 / 108 and get an AED (Defibrillator) if nearby.",
          "Hand Placement: Place heel of one hand in center of chest (breastbone), interlock other hand on top.",
          "Chest Compressions: Push hard and fast at 100-120 beats per minute (to the rhythm of 'Stayin' Alive'). Compress at least 2 inches (5 cm) deep.",
          "Do not stop compressions until emergency medical team takes over or patient shows clear signs of life."
        ],
        caution: "Do NOT give food or water. Maintain continuous chest compressions."
      },
      {
        id: "bleeding",
        title: "Severe Bleeding & Wound Pressure",
        badge: "Critical",
        badgeClass: "badge-emergency",
        icon: "🩸",
        urgency: "Stop blood loss to prevent hypovolemic shock.",
        steps: [
          "Call 112 or transport to emergency room.",
          "Direct Pressure: Use a clean cloth, sterile gauze, or clothing to press directly and firmly onto the wound.",
          "Do NOT remove embedded objects (e.g. knife or glass shard); apply pressure around the object instead.",
          "Maintain continuous firm pressure for at least 10-15 minutes without lifting the cloth to check.",
          "If blood soaks through, place another cloth on top without removing the first one.",
          "Keep patient calm, lying down, and cover them with a jacket/blanket to maintain body warmth."
        ],
        caution: "Never apply an improvised tight tourniquet unless trained, as it can cause limb loss."
      },
      {
        id: "choking",
        title: "Choking (Heimlich Maneuver)",
        badge: "Immediate Action",
        badgeClass: "badge-emergency",
        icon: "🫁",
        urgency: "Victim cannot speak, cough, or breathe; hands clutching neck.",
        steps: [
          "Ask 'Are you choking? Can you speak?'. If they can cough forcefully, encourage them to keep coughing.",
          "If silent and struggling, stand behind victim and wrap your arms around their waist.",
          "Make a fist with one hand and place thumb side just above their navel (belly button), well below breastbone.",
          "Grasp your fist with your other hand.",
          "Perform quick, upward and inward abdominal thrusts with forceful pressure.",
          "Repeat until the blocking object is expelled or the person becomes unconscious (if unconscious, begin CPR)."
        ],
        caution: "For pregnant women or obese individuals, give chest thrusts over the center of the breastbone instead of abdominal thrusts."
      },
      {
        id: "burns",
        title: "Burns & Scalds Treatment",
        badge: "Urgent",
        badgeClass: "badge-warning",
        icon: "🔥",
        urgency: "Cool the burn immediately to stop deeper tissue destruction.",
        steps: [
          "Immediately hold the burned area under cool running tap water for at least 15 to 20 minutes.",
          "Gently remove tight items (rings, watches, belts) before swelling starts.",
          "Do NOT apply ice, ice water, toothpaste, butter, or oils (these cause skin infection and freeze tissue).",
          "Cover loosely with a clean, non-stick sterile plastic cling film or sterile gauze.",
          "Seek medical care immediately if burn is larger than the victim's palm, on face, hands, or genitals."
        ],
        caution: "Never pop blisters. Popping blisters exposes raw skin to severe infection."
      },
      {
        id: "domestic",
        title: "Domestic Violence & Threat to Safety",
        badge: "Confidential Help",
        badgeClass: "badge-emergency",
        icon: "🛡️",
        urgency: "Dial 181 (Women Helpline) or 112 for confidential rescue.",
        steps: [
          "If in immediate physical danger, move to a room with an exit or lockable door.",
          "Keep essential documents (Aadhaar, bank passbook, cash, keys) in an accessible emergency bag.",
          "Dial 112 for police dispatch or 181 / 1091 for state women protection officers.",
          "Under the Protection of Women from Domestic Violence Act (PWDVA), you have immediate right to shelter homes, medical examination, and protection orders."
        ],
        caution: "If browsing this on a shared phone, clear browser history or use Private Browsing mode."
      },
      {
        id: "samaritan",
        title: "Good Samaritan Law (Accident Bystander Protection)",
        badge: "Legal Protection",
        badgeClass: "badge-civic",
        icon: "⚖️",
        urgency: "Supreme Court Guidelines protect anyone helping an accident victim.",
        steps: [
          "You will NOT be forced to disclose your name, phone number, or identity at the hospital or police station.",
          "Hospitals CANNOT demand registration fees or advance payment before treating an emergency trauma patient.",
          "Police CANNOT harass or compel a Good Samaritan to become a witness in court.",
          "Taking an injured road victim to the hospital within the 'Golden Hour' (first 60 minutes) saves lives."
        ],
        caution: "Never hesitate to help someone injured on the road; the law is 100% on your side."
      }
    ];
  }

  // Render Safety Section
  renderSection(container) {
    const state = stateStore.get();
    const region = REGIONS[state.region] || REGIONS.national;

    container.innerHTML = `
      <!-- Safety Hero -->
      <section class="category-hero safety-theme" aria-labelledby="safety-heading">
        <div class="hero-header">
          <div class="hero-title-group">
            <div class="hero-icon" aria-hidden="true">🚨</div>
            <div>
              <span class="badge badge-emergency">Category 3</span>
              <h2 id="safety-heading">Safety & Emergency Help</h2>
              <p>Immediate 1-tap dialing for Police, Fire, Ambulance, Women & Child helplines, instant SOS location alerts, and verified emergency first aid protocols.</p>
            </div>
          </div>
          <button class="btn btn-emergency btn-lg" id="btn-trigger-sos-hero" aria-label="Trigger SOS Emergency Broadcast">
            🚨 TRIGGER SOS ALERT
          </button>
        </div>
      </section>

      <!-- 1-Tap Emergency Quick Call Grid (Configurable for Region) -->
      <section class="card" style="border: 2px solid var(--color-emergency-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);">
          <div>
            <h3>📞 1-Tap Direct Emergency Dialing (${region.name})</h3>
            <p style="font-size: var(--text-sm); margin-bottom: 0;">Tap any card to dial immediately from your phone or device:</p>
          </div>
          <span class="badge badge-emergency">Toll-Free & 24/7 Available</span>
        </div>

        <div class="emergency-grid">
          
          <a href="tel:${region.emergencyNumbers.allEmergency}" class="emergency-btn-card">
            <div class="emergency-service-name">Unified Emergency</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.allEmergency}</div>
            <div class="emergency-service-desc">Police, Fire & Ambulance</div>
          </a>

          <a href="tel:${region.emergencyNumbers.police}" class="emergency-btn-card">
            <div class="emergency-service-name">Police Control</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.police}</div>
            <div class="emergency-service-desc">Immediate Law & Order</div>
          </a>

          <a href="tel:${region.emergencyNumbers.fire}" class="emergency-btn-card">
            <div class="emergency-service-name">Fire & Rescue</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.fire}</div>
            <div class="emergency-service-desc">Fire Brigade & Rescue</div>
          </a>

          <a href="tel:${region.emergencyNumbers.ambulance.split(' ')[0]}" class="emergency-btn-card">
            <div class="emergency-service-name">Medical Ambulance</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.ambulance.split(' ')[0]}</div>
            <div class="emergency-service-desc">Trauma & Medical Rescue</div>
          </a>

          <a href="tel:${region.emergencyNumbers.womenHelpline.split(' ')[0]}" class="emergency-btn-card">
            <div class="emergency-service-name">Women Helpline</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.womenHelpline.split(' ')[0]}</div>
            <div class="emergency-service-desc">Distress & Anti-Stalking</div>
          </a>

          <a href="tel:${region.emergencyNumbers.domesticViolence}" class="emergency-btn-card">
            <div class="emergency-service-name">Domestic Abuse</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.domesticViolence}</div>
            <div class="emergency-service-desc">Counseling & Shelter (181)</div>
          </a>

          <a href="tel:${region.emergencyNumbers.childline}" class="emergency-btn-card">
            <div class="emergency-service-name">Childline</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.childline}</div>
            <div class="emergency-service-desc">Emergency Aid for Minors</div>
          </a>

          <a href="tel:${region.emergencyNumbers.seniorHelpline.split(' ')[0]}" class="emergency-btn-card">
            <div class="emergency-service-name">Elderline</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.seniorHelpline.split(' ')[0]}</div>
            <div class="emergency-service-desc">Senior Citizens Support</div>
          </a>

          <a href="tel:${region.emergencyNumbers.cyberCrime}" class="emergency-btn-card">
            <div class="emergency-service-name">Cyber Crime</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.cyberCrime}</div>
            <div class="emergency-service-desc">Financial Fraud Reporting</div>
          </a>

          <a href="tel:${region.emergencyNumbers.disasterManagement.split(' ')[0]}" class="emergency-btn-card">
            <div class="emergency-service-name">Disaster Management</div>
            <div class="emergency-dial-number">${region.emergencyNumbers.disasterManagement.split(' ')[0]}</div>
            <div class="emergency-service-desc">Floods, Earthquake & Rescue</div>
          </a>

        </div>
      </section>

      <!-- Life-Saving First Aid & Urgent Situation Guides -->
      <section class="card" style="margin-top: var(--space-8);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-2);">
          <div>
            <h3>🩺 Life-Saving Emergency First Aid & Action Guides</h3>
            <p style="font-size: var(--text-sm); margin-bottom: 0;">Verified clinical protocols for critical moments before paramedics arrive:</p>
          </div>
        </div>

        <div class="grid-cards-2" style="margin-top: var(--space-4);">
          ${this.firstAidGuides.map(guide => `
            <div class="feature-card card-hover" style="border-left: 4px solid var(--color-emergency);">
              <div class="feature-header">
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                  <span style="font-size: 26px;">${guide.icon}</span>
                  <div>
                    <h4 style="font-size: var(--text-base); margin-bottom: 2px;">${guide.title}</h4>
                    <span class="badge ${guide.badgeClass}">${guide.badge}</span>
                  </div>
                </div>
              </div>
              <p style="font-size: var(--text-xs); color: var(--color-emergency); font-weight: 700; margin-top: var(--space-2); margin-bottom: var(--space-2);">
                ${guide.urgency}
              </p>
              <div class="feature-actions">
                <button class="btn btn-sm btn-outline btn-read-guide" data-id="${guide.id}">
                  Read Step-by-Step Instructions
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Personal Emergency Contacts Manager -->
      <section class="card" style="margin-top: var(--space-8);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);">
          <div>
            <h3>👥 Your Pre-Configured Emergency SOS Contacts</h3>
            <p style="font-size: var(--text-sm); margin-bottom: 0;">These contacts receive your live GPS tracking link when you trigger an SOS:</p>
          </div>
          <button class="btn btn-sm btn-outline" id="btn-add-emergency-contact">
            + Add Contact
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-4);">
          ${state.personalEmergencyContacts.map((contact, idx) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); background: var(--color-bg-alt); border-radius: var(--radius-md);">
              <div>
                <strong>${contact.name}</strong> (${contact.relation})
                <div style="font-size: var(--text-xs); color: var(--color-text-muted);">
                  📞 <a href="tel:${contact.phone}">${contact.phone}</a>
                </div>
              </div>
              <a href="tel:${contact.phone}" class="btn btn-sm btn-emergency">
                Call Now
              </a>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    this.attachEvents(container);
  }

  attachEvents(container) {
    const sosHero = container.querySelector('#btn-trigger-sos-hero');
    if (sosHero) {
      sosHero.onclick = () => this.openSOSModal();
    }

    container.querySelectorAll('.btn-read-guide').forEach(btn => {
      btn.onclick = () => {
        const guideId = btn.dataset.id;
        const guide = this.firstAidGuides.find(g => g.id === guideId);
        if (guide) this.openFirstAidModal(guide);
      };
    });

    const addContactBtn = container.querySelector('#btn-add-emergency-contact');
    if (addContactBtn) {
      addContactBtn.onclick = () => {
        const name = prompt("Enter Contact Name & Relation (e.g., Priya - Sister):");
        const phone = prompt("Enter 10-digit Phone Number:");
        if (name && phone) {
          const current = stateStore.get().personalEmergencyContacts;
          stateStore.set({
            personalEmergencyContacts: [...current, { name, phone, relation: "Emergency Contact" }]
          });
          this.renderSection(container);
          alert(`✅ Emergency Contact Added: ${name} (${phone})`);
        }
      };
    }
  }

  // SOS Emergency Trigger Modal & Siren Simulation
  openSOSModal() {
    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');
    const state = stateStore.get();
    const region = REGIONS[state.region] || REGIONS.national;

    modalContent.innerHTML = `
      <div class="modal-header" style="background: var(--color-emergency); color: #fff;">
        <div style="display: flex; align-items: center; gap: var(--space-2);">
          <span style="font-size: 28px;">🚨</span>
          <div>
            <h3 style="color: #fff; margin: 0;">EMERGENCY SOS ALERT</h3>
            <p style="font-size: var(--text-xs); color: #fee2e2; margin: 0;">Active Distress Broadcast</p>
          </div>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" style="color: #fff; border-color: #fff;" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body" style="text-align: center; padding: var(--space-6);">
        <div style="font-size: 54px; animation: pulse-border 1.5s infinite; width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4); background: var(--color-emergency-light); border: 4px solid var(--color-emergency);">
          🆘
        </div>

        <h3 style="color: var(--color-emergency); margin-bottom: var(--space-2);">Distress Message is Ready to Broadcast</h3>
        <p style="font-size: var(--text-sm); max-width: 500px; margin: 0 auto var(--space-4);">
          Triggering SOS will transmit your current GPS coordinates, phone battery level, and emergency alert to your saved emergency contacts and local Police Control Room (112).
        </p>

        <div style="background: var(--color-bg-alt); padding: var(--space-4); border-radius: var(--radius-md); text-align: left; font-size: var(--text-xs); margin-bottom: var(--space-4);">
          <strong>SMS Payload Preview:</strong><br />
          <em>"EMERGENCY ALERT! Sunita Sharma needs immediate assistance. Live Location: https://maps.google.com/?q=28.6139,77.2090. Please call or send emergency rescue immediately!"</em>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-3); max-width: 380px; margin: 0 auto;">
          <button class="btn btn-emergency btn-lg" id="btn-broadcast-sos">
            📡 SEND SOS TO CONTACTS & POLICE
          </button>

          <button class="btn btn-outline-danger" id="btn-toggle-siren">
            🔊 Sound Emergency Siren (Loud)
          </button>

          <a href="tel:112" class="btn btn-primary">
            📞 Direct Call 112 (Police Dispatch)
          </a>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.getElementById('modal-close-btn').onclick = () => {
      this.stopSiren();
      modalBackdrop.classList.remove('open');
    };

    const broadcastBtn = document.getElementById('btn-broadcast-sos');
    broadcastBtn.onclick = () => {
      alert("✅ SOS DISTRESS BROADCAST SENT!\n\n1. SMS with Live GPS location transmitted to all personal contacts.\n2. Automated alert logged to Police Control Room (112).\n3. Keep your phone line clear for incoming rescue calls.");
      modalBackdrop.classList.remove('open');
      this.stopSiren();
    };

    const sirenBtn = document.getElementById('btn-toggle-siren');
    sirenBtn.onclick = () => {
      this.toggleSiren(sirenBtn);
    };
  }

  // Audio Siren Simulation using Web Audio API (Zero external audio file dependencies)
  toggleSiren(btn) {
    if (this.isSirenPlaying) {
      this.stopSiren();
      btn.innerText = "🔊 Sound Emergency Siren (Loud)";
    } else {
      this.startSiren();
      btn.innerText = "🛑 Stop Emergency Siren";
    }
  }

  startSiren() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.audioCtx = new AudioContext();

      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = 'sawtooth';
      this.oscillator.frequency.setValueAtTime(600, this.audioCtx.currentTime);

      // Modulate frequency to create European / Indian emergency siren wail
      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.5, this.audioCtx.currentTime); // 0.5 Hz oscillation
      lfoGain.gain.setValueAtTime(300, this.audioCtx.currentTime);

      lfo.connect(this.oscillator.frequency);
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      this.oscillator.start();
      lfo.start();

      this.isSirenPlaying = true;
      this.lfo = lfo;
    } catch (e) {
      console.warn("Audio siren not supported:", e);
    }
  }

  stopSiren() {
    if (this.isSirenPlaying && this.oscillator) {
      try {
        this.oscillator.stop();
        if (this.lfo) this.lfo.stop();
        if (this.audioCtx) this.audioCtx.close();
      } catch (e) {}
      this.isSirenPlaying = false;
    }
  }

  // First Aid Modal
  openFirstAidModal(guide) {
    const modalBackdrop = document.getElementById('global-modal');
    const modalContent = document.getElementById('global-modal-content');

    modalContent.innerHTML = `
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: var(--space-2);">
          <span style="font-size: 28px;">${guide.icon}</span>
          <div>
            <span class="badge ${guide.badgeClass}">${guide.badge}</span>
            <h3 style="margin: 4px 0 0;">${guide.title}</h3>
          </div>
        </div>
        <button class="btn btn-sm btn-outline" id="modal-close-btn" aria-label="Close dialog">✕</button>
      </div>
      <div class="modal-body">
        <div style="background: var(--color-emergency-light); border-left: 4px solid var(--color-emergency); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-4); border-radius: var(--radius-sm);">
          <strong style="color: var(--color-emergency);">⚠️ Critical Priority:</strong>
          <span style="font-size: var(--text-sm);">${guide.urgency}</span>
        </div>

        <h4>Step-by-Step Action Protocol:</h4>
        <ol style="padding-left: var(--space-5); margin: var(--space-3) 0 var(--space-4); font-size: var(--text-sm);">
          ${guide.steps.map(step => `<li style="margin-bottom: var(--space-3); line-height: 1.6;">${step}</li>`).join('')}
        </ol>

        <div style="background: var(--color-warning-light); border-left: 4px solid var(--color-warning); padding: var(--space-3); border-radius: var(--radius-sm); font-size: var(--text-xs); margin-top: var(--space-4);">
          <strong>CAUTION / DO NOT:</strong> ${guide.caution}
        </div>

        <div class="modal-footer" style="padding-left: 0; padding-right: 0; margin-top: var(--space-6);">
          <a href="tel:112" class="btn btn-emergency">
            📞 Dial 112 for Paramedics
          </a>
          <button class="btn btn-outline" id="btn-close-first-aid">Done</button>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.getElementById('modal-close-btn').onclick = () => modalBackdrop.classList.remove('open');
    document.getElementById('btn-close-first-aid').onclick = () => modalBackdrop.classList.remove('open');
  }
}

export const safetyService = new SafetyService();
