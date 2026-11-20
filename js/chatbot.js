/**
 * Multilingual AI Chatbot Assistant ("Mitra / Sahayak")
 * Simple diagnostic questioning, category routing, step guidance,
 * and high-priority Emergency Safety Disclaimers with instant 1-tap emergency calling.
 */

import { stateStore } from './state.js';
import { REGIONS } from './config.js';
import { I18N } from './i18n.js';
import { voiceService } from './voice.js';

export class ChatbotService {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.initWelcomeMessage();
  }

  initWelcomeMessage() {
    this.messages = [
      {
        sender: 'bot',
        text: "Namaste! I am Mitra, your multilingual civic and emergency assistant. How can I help you today? You can type in English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, বাংলা, मराठी, or ગુજરાતી.",
        quickReplies: [
          "🚑 Need an Ambulance",
          "🆔 Update Aadhaar phone",
          "👨‍⚕️ Book Doctor Home Visit",
          "📢 Report Broken Road / Streetlight",
          "👵 Elder Care Services",
          "🚨 Emergency Police (112)"
        ]
      }
    ];
  }

  // Emergency safety keywords in multiple languages
  isEmergencyQuery(text) {
    const lower = text.toLowerCase();
    const emergencyKeywords = [
      // English
      'emergency', 'heart attack', 'cardiac', 'chest pain', 'bleeding', 'unconscious', 'dying',
      'breath', 'breathing', 'stroke', 'ambulance', 'fire', 'attack', 'suicide', 'kill',
      'robbery', 'thief', 'accident', 'blood', 'choking', 'burn', 'poison', 'rape', 'assault',
      
      // Hindi
      'आपातकाल', 'दिल का दौरा', 'छाती में दर्द', 'खून', 'बेहोश', 'सांस', 'एम्बुलेंस', 'आग',
      'हमला', 'आत्महत्या', 'चोरी', 'दुर्घटना', 'जलना', 'जहर', 'पुलिस', 'मदद', 'बचाओ',
      
      // Tamil
      'அவசரம்', 'மாரடைப்பு', 'ரத்தம்', 'மயக்கம்', 'சுவாசம்', 'ஆம்புலன்ஸ்', 'தீ', 'தாக்குதல்',
      
      // Telugu
      'అత్యవసరం', 'గుండెపోటు', 'రక్తం', 'స్పృహ', 'శ్వాస', 'అంబులెన్స్', 'మంటలు',
      
      // Kannada
      'ತುರ್ತು', 'ಹೃದಯಾಘಾತ', 'ರಕ್ತ', 'ಪ್ರಜ್ಞೆ', 'ಉಸಿರಾಟ', 'ಆಂಬ್ಯುಲೆನ್ಸ್', 'ಬೆಂಕಿ',
      
      // Bengali
      'জরুরি', 'হার্ট অ্যাটাক', 'রক্ত', 'অজ্ঞান', 'শ্বাসকষ্ট', 'অ্যাম্বুলেন্স', 'আগুন',
      
      // Marathi
      'आणीबाणी', 'हृदयविकार', 'रक्तस्त्राव', 'बेशुद्ध', 'श्वास', 'रुग्णवाहिका', 'आग',
      
      // Gujarati
      'કટોકટી', 'હાર્ટ એટેક', 'લોહી', 'બેભાન', 'શ્વાસ', 'એમ્બ્યુલન્સ', 'આગ'
    ];

    return emergencyKeywords.some(keyword => lower.includes(keyword));
  }

  // Analyze query and generate intelligent guided response
  generateResponse(query) {
    const state = stateStore.get();
    const region = REGIONS[state.region] || REGIONS.national;
    const lower = query.toLowerCase();

    // 1. Critical Emergency Check
    if (this.isEmergencyQuery(query)) {
      return {
        isEmergency: true,
        text: `CRITICAL ALERT: If you or someone nearby is experiencing a life-threatening crisis, medical trauma, or physical danger, please do not wait for chat instructions. Immediately call ${region.emergencyNumbers.allEmergency} or dispatch an ambulance!`,
        actionButton: {
          label: `🚨 Call ${region.emergencyNumbers.allEmergency} Immediately`,
          tel: `tel:${region.emergencyNumbers.allEmergency}`
        },
        category: 'safety',
        quickReplies: ["🚑 Dispatch Ambulance Now", "❤️ CPR & Cardiac First Aid", "🩸 Stop Bleeding First Aid"]
      };
    }

    // 2. Aadhaar Queries
    if (lower.includes('aadhaar') || lower.includes('आधार') || lower.includes('uidai') || lower.includes('ஆதார்') || lower.includes('ಆಧಾರ್')) {
      return {
        isEmergency: false,
        text: `Here is complete guidance for Aadhaar services:\n\n1. **Mobile Number Update:** Requires biometric visit at ${region.authorities.aadhaarCenter} (Fee: ₹50).\n2. **Address Update:** Can be submitted online with address proof or Head of Family (HoF) consent on myaadhaar.uidai.gov.in.\n3. **Download e-Aadhaar:** Instant PDF download using OTP. Password format: FIRST 4 CAPITAL LETTERS OF NAME + BIRTH YEAR.\n\nHelpline: 1947.`,
        actionButton: {
          label: "View Aadhaar Steps & Documents",
          view: "civic",
          modal: "aadhaar"
        },
        category: 'civic',
        quickReplies: ["Update Aadhaar Phone", "Download e-Aadhaar PDF", "Order PVC Card"]
      };
    }

    // 3. PAN Card Queries
    if (lower.includes('pan') || lower.includes('पैन') || lower.includes('incometax') || lower.includes('பான்') || lower.includes('ಪ್ಯಾನ್')) {
      return {
        isEmergency: false,
        text: `Here is guidance for PAN Card services:\n\n1. **Instant e-PAN:** Free, paperless, and generated in 10 minutes using your Aadhaar e-KYC at eportal.incometax.gov.in.\n2. **New Physical Card (Form 49A):** Apply online via Protean NSDL or UTIITSL (Fee: ₹107 within India).\n3. **Link PAN-Aadhaar:** Statutory mandatory linkage on Income Tax e-filing portal.\n\nLocal Office: ${region.authorities.panAuthority}.`,
        actionButton: {
          label: "Open PAN Guidance & Checklist",
          view: "civic",
          modal: "pan"
        },
        category: 'civic',
        quickReplies: ["Instant e-PAN in 10 mins", "Form 49A Physical PAN", "Link PAN with Aadhaar"]
      };
    }

    // 4. Voter ID Queries
    if (lower.includes('voter') || lower.includes('वोटर') || lower.includes('epic') || lower.includes('election') || lower.includes('தேர்தல்')) {
      return {
        isEmergency: false,
        text: `Guidance for Voter ID (EPIC) with Election Commission of India:\n\n1. **New Voter Registration:** Fill Form 6 online on voters.eci.gov.in or the Voter Helpline App.\n2. **Change Address / Correction:** Fill Form 8.\n3. **Download e-EPIC:** Instant digital voter card download.\n4. **Verification:** Local Booth Level Officer (BLO) performs physical verification.\n\nHelpline: 1950.`,
        actionButton: {
          label: "View Voter ID Steps & Forms",
          view: "civic",
          modal: "voter"
        },
        category: 'civic',
        quickReplies: ["New Voter Form 6", "Change Address Form 8", "Download e-EPIC"]
      };
    }

    // 5. Civic Complaints & Local Problems
    if (lower.includes('pothole') || lower.includes('road') || lower.includes('streetlight') || lower.includes('garbage') || lower.includes('water') || lower.includes('drain') || lower.includes('सड़क') || lower.includes('बिजली') || lower.includes('कचरा') || lower.includes('पानी')) {
      return {
        isEmergency: false,
        text: `You can report community issues directly to **${region.authorities.civicPortal}**:\n\n• Supported issues: Broken roads, dark streetlights, uncollected garbage, broken water mains, low voltage.\n• Your report includes photo upload and GPS coordinates.\n• A tracking ticket is generated with direct assignment to the Ward Engineer.`,
        actionButton: {
          label: "📢 File Community Complaint Now",
          view: "civic",
          modal: "report"
        },
        category: 'civic',
        quickReplies: ["Report Pothole", "Report Dark Streetlight", "Report Garbage Overflow"]
      };
    }

    // 6. Doctor Appointments & Home Visits
    if (lower.includes('doctor') || lower.includes('appointment') || lower.includes('visit') || lower.includes('डॉक्टर') || lower.includes('மருத்துவர்') || lower.includes('వైద్యుడు')) {
      return {
        isEmergency: false,
        text: `You can book verified medical professionals in ${region.name}:\n\n• **General Physicians:** Routine checkups, fever, diabetes monitoring.\n• **Geriatric Specialists:** Senior health assessments and home visits.\n• **Pediatricians:** Infant care, vaccinations, child growth.\n• Options: Doorstep Home Visit, Clinic Visit, or Video Teleconsultation.`,
        actionButton: {
          label: "👨‍⚕️ Find & Book Doctor",
          view: "health",
          modal: "doctor"
        },
        category: 'health',
        quickReplies: ["Book Home Doctor Visit", "Pediatrician for Child", "Geriatric Care for Senior"]
      };
    }

    // 7. Elder Care & Childcare
    if (lower.includes('elder') || lower.includes('senior') || lower.includes('child') || lower.includes('baby') || lower.includes('nurse') || lower.includes('care') || lower.includes('बुजुर्ग') || lower.includes('बच्चे')) {
      return {
        isEmergency: false,
        text: `Dedicated Care Services Available in ${region.name}:\n\n1. **Senior Living & Home Nursing:** Certified daily attendants, vitals tracking, companionship, dementia care.\n2. **Home Physiotherapy:** Post-surgery rehabilitation and stroke mobility recovery.\n3. **Childcare & Nanny:** Police-verified neonatal assistants and special needs developmental therapists.\n\nElderline National Helpline: ${region.emergencyNumbers.seniorHelpline} | Childline: ${region.emergencyNumbers.childline}.`,
        actionButton: {
          label: "Explore Caregiver Services",
          view: "health",
          modal: "care"
        },
        category: 'health',
        quickReplies: ["Senior Nurse Attendant", "Home Physiotherapy", "Childcare Assistant"]
      };
    }

    // 8. Health Records & Consent
    if (lower.includes('record') || lower.includes('history') || lower.includes('vault') || lower.includes('consent') || lower.includes('privacy') || lower.includes('मेडिकल') || lower.includes('रिकॉर्ड')) {
      return {
        isEmergency: false,
        text: `Your medical history is protected in your private **Health Vault** under ABDM standards:\n\n• Allergies, blood group, chronic conditions, and prescriptions are encrypted.\n• Healthcare professionals CANNOT view your file without your explicit one-time consent.\n• You can grant temporary 24-hour access with a 6-digit OTP and revoke it anytime.`,
        actionButton: {
          label: "🔒 Manage Health Vault & Consent",
          view: "vault"
        },
        category: 'health',
        quickReplies: ["View Medical History", "Grant Doctor Access", "Revoke Consent"]
      };
    }

    // Default Diagnostic Clarification
    return {
      isEmergency: false,
      text: `I want to connect you to the right help. Which of these three main areas best describes your need?\n\n1. 🩺 **Healthcare:** Ambulance, doctor visits, elder/childcare, or medical records.\n2. 🏛️ **Government & Civic:** Aadhaar, PAN card, Voter ID, or reporting community problems (potholes, streetlights).\n3. 🚨 **Safety & Emergency:** Police, Fire, SOS alerts, or life-saving first-aid guides.`,
      category: 'general',
      quickReplies: ["🩺 Healthcare Services", "🏛️ Government & Civic", "🚨 Safety & Emergency Helplines"]
    };
  }

  // Render Chatbot Component into DOM
  render() {
    let drawer = document.getElementById('chatbot-drawer');
    let triggerBtn = document.getElementById('chatbot-trigger-btn');

    if (!triggerBtn) {
      triggerBtn = document.createElement('button');
      triggerBtn.id = 'chatbot-trigger-btn';
      triggerBtn.className = 'chatbot-trigger-btn';
      triggerBtn.setAttribute('aria-label', 'Open AI Assistant Mitra');
      triggerBtn.innerHTML = '💬';
      document.body.appendChild(triggerBtn);

      triggerBtn.onclick = () => this.toggleDrawer();
    }

    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'chatbot-drawer';
      drawer.className = 'chatbot-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-label', 'AI Civic and Emergency Chatbot');
      document.body.appendChild(drawer);
    }

    const state = stateStore.get();
    const lang = state.language;
    const t = I18N[lang] || I18N.en;

    drawer.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">🤖</div>
          <div>
            <h3 style="color: #fff; font-size: var(--text-base); margin: 0;">${t.chatTitle}</h3>
            <span style="font-size: var(--text-xs); color: #e0f2fe;">Multilingual Citizen Triage</span>
          </div>
        </div>
        <button class="btn btn-sm btn-outline" id="chatbot-close-btn" style="color: #fff; border-color: rgba(255,255,255,0.4);" aria-label="Close chatbot">✕</button>
      </div>

      <div class="chatbot-messages" id="chatbot-message-list">
        ${this.renderMessagesHtml()}
      </div>

      <form class="chatbot-input-bar" id="chatbot-form">
        <button type="button" class="btn btn-sm btn-outline" id="chatbot-mic-btn" title="Speak Query (Voice Recognition)" aria-label="Speak Query">
          🎤
        </button>
        <input type="text" id="chatbot-input" placeholder="${t.chatInputPlaceholder}" autocomplete="off" />
        <button type="submit" class="btn btn-sm btn-primary" aria-label="Send Message">
          ➤
        </button>
      </form>
    `;

    document.getElementById('chatbot-close-btn').onclick = () => this.toggleDrawer(false);

    // Form submission
    const form = document.getElementById('chatbot-form');
    form.onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById('chatbot-input');
      const text = input.value.trim();
      if (!text) return;
      this.handleUserMessage(text);
      input.value = '';
    };

    // Mic button
    const micBtn = document.getElementById('chatbot-mic-btn');
    micBtn.onclick = () => {
      const sampleQueries = [
        "How do I update my mobile number in Aadhaar card?",
        "I need an emergency ambulance for chest pain!",
        "There is a deep pothole on Main Market Road, how to report it?",
        "How can I book a home visit doctor for an elderly patient?",
        "What should I do if someone is choking?"
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      const input = document.getElementById('chatbot-input');
      input.value = randomQuery;
      this.handleUserMessage(randomQuery);
      input.value = '';
    };

    this.attachMessageEventListeners();
    this.scrollToBottom();
  }

  renderMessagesHtml() {
    return this.messages.map((msg, idx) => {
      if (msg.sender === 'user') {
        return `
          <div class="chat-bubble user">
            ${msg.text}
          </div>
        `;
      }

      // Bot Message
      return `
        <div class="chat-bubble bot">
          ${msg.isEmergency ? `
            <div class="chat-emergency-warning">
              <strong>⚠️ CRITICAL EMERGENCY DISCLAIMER</strong>
              <p style="font-size: var(--text-xs); margin-bottom: var(--space-2);">${msg.text}</p>
              ${msg.actionButton ? `
                <a href="${msg.actionButton.tel}" class="btn btn-emergency btn-sm" style="text-decoration: none;">
                  ${msg.actionButton.label}
                </a>
              ` : ''}
            </div>
          ` : `
            <div>${msg.text.replace(/\n/g, '<br />')}</div>
            ${msg.actionButton ? `
              <div style="margin-top: var(--space-3);">
                <button class="btn btn-sm btn-primary btn-chat-action" data-view="${msg.actionButton.view}" data-modal="${msg.actionButton.modal || ''}">
                  👉 ${msg.actionButton.label}
                </button>
              </div>
            ` : ''}
          `}

          <!-- Text-to-speech button -->
          <div style="display: flex; justify-content: flex-end; margin-top: var(--space-2);">
            <button class="btn btn-sm btn-outline btn-speak-msg" data-msg-idx="${idx}" style="font-size: 11px; padding: 2px 6px;" title="Listen to this answer" aria-label="Listen to message">
              🔊 Listen
            </button>
          </div>

          <!-- Quick replies -->
          ${msg.quickReplies && msg.quickReplies.length > 0 ? `
            <div class="chat-quick-replies">
              ${msg.quickReplies.map(qr => `<button type="button" class="quick-reply-chip" data-query="${qr}">${qr}</button>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  attachMessageEventListeners() {
    const list = document.getElementById('chatbot-message-list');
    if (!list) return;

    // Quick reply chips
    list.querySelectorAll('.quick-reply-chip').forEach(chip => {
      chip.onclick = () => {
        const query = chip.dataset.query.replace(/^[^\w\s\u0900-\u0D7F]+/, '').trim();
        this.handleUserMessage(query);
      };
    });

    // Action buttons inside chat
    list.querySelectorAll('.btn-chat-action').forEach(btn => {
      btn.onclick = () => {
        const view = btn.dataset.view;
        const modal = btn.dataset.modal;
        this.toggleDrawer(false);
        stateStore.setActiveView(view);

        setTimeout(() => {
          if (modal === 'aadhaar' || modal === 'pan' || modal === 'voter') {
            window.appInstance?.civicService?.openGuideModal(modal);
          } else if (modal === 'report') {
            window.appInstance?.civicService?.openReportModal();
          } else if (modal === 'doctor') {
            window.appInstance?.healthcareService?.openDoctorModal();
          } else if (modal === 'care') {
            window.appInstance?.healthcareService?.openCareModal();
          }
        }, 150);
      };
    });

    // Voice speak button
    list.querySelectorAll('.btn-speak-msg').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.msgIdx, 10);
        const msg = this.messages[idx];
        if (msg) {
          const lang = stateStore.get().language;
          voiceService.speak(msg.text, lang);
        }
      };
    });
  }

  handleUserMessage(text) {
    this.messages.push({ sender: 'user', text });
    const response = this.generateResponse(text);
    
    // Slight realistic latency simulation
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: response.text,
        isEmergency: response.isEmergency,
        actionButton: response.actionButton,
        quickReplies: response.quickReplies
      });
      const list = document.getElementById('chatbot-message-list');
      if (list) {
        list.innerHTML = this.renderMessagesHtml();
        this.attachMessageEventListeners();
        this.scrollToBottom();
      }
    }, 200);

    const list = document.getElementById('chatbot-message-list');
    if (list) {
      list.innerHTML = this.renderMessagesHtml();
      this.attachMessageEventListeners();
      this.scrollToBottom();
    }
  }

  toggleDrawer(forceState = null) {
    const drawer = document.getElementById('chatbot-drawer');
    if (!drawer) return;

    if (forceState !== null) {
      this.isOpen = forceState;
    } else {
      this.isOpen = !this.isOpen;
    }

    if (this.isOpen) {
      drawer.classList.add('open');
      document.getElementById('chatbot-input')?.focus();
      this.scrollToBottom();
    } else {
      drawer.classList.remove('open');
    }
  }

  scrollToBottom() {
    const list = document.getElementById('chatbot-message-list');
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }
}

export const chatbotService = new ChatbotService();
