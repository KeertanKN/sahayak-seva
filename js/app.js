/**
 * Main Application Orchestrator
 * View Routing, i18n Translation Binding, Accessibility Engine, and Event Binding
 */

import { stateStore } from './state.js';
import { REGIONS } from './config.js';
import { I18N } from './i18n.js';
import { voiceService } from './voice.js';
import { healthcareService } from './healthcare.js';
import { civicService } from './civic.js';
import { safetyService } from './safety.js';
import { chatbotService } from './chatbot.js';

class SahayakApp {
  constructor() {
    this.healthcareService = healthcareService;
    this.civicService = civicService;
    this.safetyService = safetyService;
    this.chatbotService = chatbotService;
    window.appInstance = this;
  }

  init() {
    this.setupAccessibilityControls();
    this.setupLanguageAndRegionSelectors();
    this.setupNavigation();
    this.chatbotService.render();
    
    // Subscribe to state changes
    stateStore.subscribe((state) => {
      this.updateUI(state);
    });

    // Initial render
    this.updateUI(stateStore.get());
  }

  setupAccessibilityControls() {
    // High contrast toggle
    const contrastBtn = document.getElementById('toggle-contrast-btn');
    if (contrastBtn) {
      contrastBtn.onclick = () => {
        stateStore.toggleHighContrast();
      };
    }

    // Font size scaling buttons
    const fontBtns = document.querySelectorAll('.font-size-btn');
    fontBtns.forEach(btn => {
      btn.onclick = () => {
        fontBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const scale = parseFloat(btn.dataset.scale);
        stateStore.setFontSize(scale);
      };
    });

    // Read aloud whole page toggle
    const ttsBtn = document.getElementById('toggle-tts-btn');
    if (ttsBtn) {
      ttsBtn.onclick = () => {
        const state = stateStore.get();
        const t = I18N[state.language] || I18N.en;

        if (voiceService.isSpeaking) {
          voiceService.stop();
          ttsBtn.innerText = `🔊 ${t.readAloud}`;
          ttsBtn.classList.remove('active');
        } else {
          const mainContent = document.getElementById('content-area');
          const textToRead = mainContent.innerText;
          ttsBtn.innerText = `🛑 ${t.stopReading}`;
          ttsBtn.classList.add('active');
          voiceService.speak(textToRead, state.language, () => {
            ttsBtn.innerText = `🔊 ${t.readAloud}`;
            ttsBtn.classList.remove('active');
          });
        }
      };
    }
  }

  setupLanguageAndRegionSelectors() {
    const langSelect = document.getElementById('app-language-select');
    if (langSelect) {
      langSelect.value = stateStore.get().language;
      langSelect.onchange = (e) => {
        stateStore.setLanguage(e.target.value);
      };
    }

    const regionSelect = document.getElementById('app-region-select');
    if (regionSelect) {
      regionSelect.innerHTML = Object.values(REGIONS).map(r => `
        <option value="${r.id}">${r.name}</option>
      `).join('');
      regionSelect.value = stateStore.get().region;
      regionSelect.onchange = (e) => {
        stateStore.setRegion(e.target.value);
      };
    }
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn, .bottom-nav-btn');
    navButtons.forEach(btn => {
      btn.onclick = () => {
        const view = btn.dataset.view;
        if (view === 'chatbot') {
          this.chatbotService.toggleDrawer(true);
        } else {
          stateStore.setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };
    });

    // Top banner emergency quick SOS button
    const bannerSos = document.getElementById('banner-sos-btn');
    if (bannerSos) {
      bannerSos.onclick = (e) => {
        e.preventDefault();
        this.safetyService.openSOSModal();
      };
    }
  }

  updateUI(state) {
    const lang = state.language;
    const t = I18N[lang] || I18N.en;
    const region = REGIONS[state.region] || REGIONS.national;

    // Apply high contrast attribute
    document.documentElement.setAttribute('data-contrast', state.highContrast ? 'high' : 'normal');

    // Update static labels in header/banners
    document.getElementById('app-title-text').innerText = t.appTitle;
    document.getElementById('app-subtitle-text').innerText = t.appSubtitle;
    document.getElementById('top-banner-text').innerText = t.topBannerEmergency;
    document.getElementById('top-banner-sos-label').innerText = `📞 112 / ${region.emergencyNumbers.ambulance.split(' ')[0]}`;

    // Update nav tab labels
    this.updateNavTabs(state.activeView, t);

    // Render active view content
    const contentArea = document.getElementById('content-area');
    switch (state.activeView) {
      case 'health':
        this.healthcareService.renderSection(contentArea);
        break;
      case 'civic':
        this.civicService.renderSection(contentArea);
        break;
      case 'safety':
        this.safetyService.renderSection(contentArea);
        break;
      case 'vault':
        this.healthcareService.renderHealthVault(contentArea);
        break;
      case 'home':
      default:
        this.renderHomeOverview(contentArea, state, t, region);
        break;
    }
  }

  updateNavTabs(activeView, t) {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const view = btn.dataset.view;
      btn.classList.toggle('active', view === activeView);
      if (view === 'home') btn.innerHTML = `🏠 ${t.navHome}`;
      if (view === 'health') btn.innerHTML = `🩺 ${t.navHealth}`;
      if (view === 'civic') btn.innerHTML = `🏛️ ${t.navCivic}`;
      if (view === 'safety') btn.innerHTML = `🚨 ${t.navSafety}`;
      if (view === 'vault') btn.innerHTML = `🔒 ${t.navVault}`;
    });

    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
      const view = btn.dataset.view;
      btn.classList.toggle('active', view === activeView);
      if (view === 'safety') btn.classList.toggle('active-emergency', view === activeView);
    });
  }

  // Comprehensive Home Hub Overview
  renderHomeOverview(container, state, t, region) {
    container.innerHTML = `
      <!-- Welcome Hero Banner -->
      <section class="card" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: var(--space-8); margin-bottom: var(--space-8); border-radius: var(--radius-xl); box-shadow: var(--shadow-md);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
          <div style="max-width: 720px;">
            <div style="display: inline-flex; align-items: center; gap: var(--space-2); background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 700; margin-bottom: var(--space-3);">
              <span>🇮🇳 ${region.name}</span>
              <span>•</span>
              <span>Multilingual Voice & Screen Reader Enabled</span>
            </div>
            <h1 style="color: #ffffff; font-size: var(--text-3xl); margin-bottom: var(--space-2);">
              ${t.appTitle} - Accessible Civic & Health Hub
            </h1>
            <p style="color: #e0f2fe; font-size: var(--text-base); margin-bottom: var(--space-4);">
              Find verified medical assistance, step-by-step guidance for identity cards (Aadhaar, PAN, Voter ID), report municipal problems, and access life-saving emergency rescue in your preferred language.
            </p>
            <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
              <button class="btn btn-emergency btn-lg" id="home-trigger-sos">
                🚨 Trigger SOS Distress Broadcast
              </button>
              <button class="btn btn-outline" id="home-open-assistant" style="color: #ffffff; border-color: #ffffff;">
                💬 Ask Multilingual AI Assistant
              </button>
            </div>
          </div>

          <div style="text-align: center; background: rgba(255,255,255,0.1); padding: var(--space-5); border-radius: var(--radius-lg); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);">
            <div style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.1em; color: #bae6fd;">Instant Emergency Dial</div>
            <div style="font-size: var(--text-4xl); font-weight: 900; margin: var(--space-1) 0;">112</div>
            <div style="font-size: var(--text-xs); color: #e0f2fe;">Police • Fire • Ambulance</div>
            <a href="tel:112" class="btn btn-sm btn-emergency" style="margin-top: var(--space-3); width: 100%;">
              📞 Call 112 Now
            </a>
          </div>
        </div>
      </section>

      <!-- Active Ambulance Tracker Container (if active) -->
      <div id="home-ambulance-slot"></div>

      <!-- Main 3 Categories Showcase -->
      <div class="grid-cards-3">
        
        <!-- Category 1: Healthcare -->
        <article class="feature-card card-hover" style="border-top: 6px solid var(--color-health);">
          <div class="feature-header">
            <div class="feature-icon-bubble" style="background: var(--color-health-light); color: var(--color-health);">🩺</div>
            <span class="badge badge-health">Category 1</span>
          </div>
          <h3>Healthcare & Care Services</h3>
          <p>Request emergency ambulances, book clinic or doorstep doctor visits, find verified elder & childcare, and store consent-gated medical records.</p>
          <ul style="font-size: var(--text-xs); color: var(--color-text-muted); padding-left: var(--space-4); margin: var(--space-2) 0;">
            <li>🚑 108 / 102 Ambulance live tracking</li>
            <li>👨‍⚕️ Home visits & clinic doctor appointments</li>
            <li>👵 Certified eldercare & neonatal nurses</li>
            <li>🔒 Encrypted ABDM Health Vault & doctor consent</li>
          </ul>
          <div class="feature-actions" style="margin-top: auto;">
            <button class="btn btn-health btn-nav-goto" data-view="health" style="width: 100%;">
              Open Healthcare Hub →
            </button>
          </div>
        </article>

        <!-- Category 2: Government & Civic -->
        <article class="feature-card card-hover" style="border-top: 6px solid var(--color-civic);">
          <div class="feature-header">
            <div class="feature-icon-bubble" style="background: var(--color-civic-light); color: var(--color-civic);">🏛️</div>
            <span class="badge badge-civic">Category 2</span>
          </div>
          <h3>Government & Civic Services</h3>
          <p>Clear guidance for Aadhaar, PAN cards, and Voter ID, plus direct reporting of community issues (potholes, streetlights) to municipal authorities.</p>
          <ul style="font-size: var(--text-xs); color: var(--color-text-muted); padding-left: var(--space-4); margin: var(--space-2) 0;">
            <li>🆔 Aadhaar mobile & address updates, PVC order</li>
            <li>💳 Instant 10-minute e-PAN & linking steps</li>
            <li>🗳️ New voter registration (Form 6) & e-EPIC</li>
            <li>📢 File local municipal grievance ticket</li>
          </ul>
          <div class="feature-actions" style="margin-top: auto;">
            <button class="btn btn-civic btn-nav-goto" data-view="civic" style="width: 100%;">
              Open Civic Hub →
            </button>
          </div>
        </article>

        <!-- Category 3: Safety & Emergency -->
        <article class="feature-card card-hover" style="border-top: 6px solid var(--color-emergency);">
          <div class="feature-header">
            <div class="feature-icon-bubble" style="background: var(--color-emergency-light); color: var(--color-emergency);">🚨</div>
            <span class="badge badge-emergency">Category 3</span>
          </div>
          <h3>Safety & Emergency Help</h3>
          <p>Quick access to police, fire, women helpline (1091/181), and elderline. Life-saving first-aid guides and instant GPS SOS broadcast.</p>
          <ul style="font-size: var(--text-xs); color: var(--color-text-muted); padding-left: var(--space-4); margin: var(--space-2) 0;">
            <li>📞 1-Tap regional emergency dialer</li>
            <li>🆘 Live GPS SOS broadcast to family & police</li>
            <li>❤️ CPR, bleeding, and choking first aid protocols</li>
            <li>⚖️ Good Samaritan Supreme Court protection info</li>
          </ul>
          <div class="feature-actions" style="margin-top: auto;">
            <button class="btn btn-emergency btn-nav-goto" data-view="safety" style="width: 100%;">
              Open Safety Hub →
            </button>
          </div>
        </article>

      </div>

      <!-- Quick Action Dialing Strip (Configurable for Region) -->
      <section class="card" style="margin-top: var(--space-6); background: var(--color-bg-alt);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);">
          <h4>⚡ Quick Regional Helpline Access (${region.name})</h4>
          <span style="font-size: var(--text-xs); color: var(--color-text-muted);">Direct toll-free lines</span>
        </div>
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap; margin-top: var(--space-3);">
          <a href="tel:${region.emergencyNumbers.police}" class="btn btn-sm btn-outline">
            👮 Police: ${region.emergencyNumbers.police}
          </a>
          <a href="tel:${region.emergencyNumbers.ambulance.split(' ')[0]}" class="btn btn-sm btn-outline-danger">
            🚑 Ambulance: ${region.emergencyNumbers.ambulance.split(' ')[0]}
          </a>
          <a href="tel:${region.emergencyNumbers.fire}" class="btn btn-sm btn-outline">
            🚒 Fire: ${region.emergencyNumbers.fire}
          </a>
          <a href="tel:${region.emergencyNumbers.womenHelpline.split(' ')[0]}" class="btn btn-sm btn-outline">
            👩 Women: ${region.emergencyNumbers.womenHelpline.split(' ')[0]}
          </a>
          <a href="tel:${region.emergencyNumbers.seniorHelpline.split(' ')[0]}" class="btn btn-sm btn-outline">
            👵 Seniors: ${region.emergencyNumbers.seniorHelpline.split(' ')[0]}
          </a>
          <a href="tel:${region.emergencyNumbers.childline}" class="btn btn-sm btn-outline">
            👶 Childline: ${region.emergencyNumbers.childline}
          </a>
        </div>
      </section>

      <!-- Privacy & Sovereignty Assurance -->
      <section class="card" style="margin-top: var(--space-6); border-left: 4px solid var(--color-primary);">
        <div style="display: flex; align-items: center; gap: var(--space-3);">
          <span style="font-size: 32px;">🔐</span>
          <div>
            <h4 style="margin-bottom: 2px;">Your Data Privacy & Consent Guarantee</h4>
            <p style="font-size: var(--text-xs); margin-bottom: 0;">
              Sahayak Seva does NOT sell or share personal identity or medical records with advertisers or third parties. Medical records are encrypted in compliance with ABDM guidelines and can only be accessed with your explicit 24-hour consent.
            </p>
          </div>
        </div>
      </section>
    `;

    // Render active ambulance tracker on home page if present
    const homeAmbSlot = container.querySelector('#home-ambulance-slot');
    if (homeAmbSlot && state.ambulanceRequest) {
      homeAmbSlot.id = 'ambulance-active-tracker-container';
      this.healthcareService.renderAmbulanceTracker();
    }

    // Attach home listeners
    const homeSos = container.querySelector('#home-trigger-sos');
    if (homeSos) {
      homeSos.onclick = () => this.safetyService.openSOSModal();
    }

    const homeChat = container.querySelector('#home-open-assistant');
    if (homeChat) {
      homeChat.onclick = () => this.chatbotService.toggleDrawer(true);
    }

    container.querySelectorAll('.btn-nav-goto').forEach(btn => {
      btn.onclick = () => {
        const view = btn.dataset.view;
        stateStore.setActiveView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    });
  }
}

// Auto bootstrap on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const app = new SahayakApp();
  app.init();
});
