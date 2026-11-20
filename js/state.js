/**
 * Central Reactive Application State with SQLite Backend Database Sync
 */

const STORAGE_KEY = 'sahayak_seva_state';

const defaultState = {
  language: 'en',
  region: 'delhi',
  fontSizeFactor: 1.0,
  highContrast: false,
  activeView: 'home',
  databaseConnected: false,
  databaseType: "SQLite3",
  
  // Consent & Medical Vault
  patientConsent: {
    granted: false,
    timestamp: null,
    expiresAt: null,
    doctorAccessCode: null
  },
  patientProfile: {
    name: "Sunita Sharma",
    age: 62,
    gender: "Female",
    bloodGroup: "B+",
    abhaId: "91-2345-6789-0123",
    emergencyContact: "+91 98765 43210 (Son - Rohit)",
    allergies: ["Penicillin", "Sulfa drugs"],
    conditions: ["Type 2 Diabetes (HbA1c: 6.8)", "Mild Hypertension"],
    medications: [
      { name: "Metformin 500mg", timing: "Twice daily after meals", prescribedBy: "Dr. A. Verma" },
      { name: "Telmisartan 40mg", timing: "Once daily morning", prescribedBy: "Dr. R. Kapoor" }
    ],
    pastSurgeries: ["Knee Arthroscopy (2023)", "Appendectomy (2015)"],
    vaccinations: ["COVID-19 Precaution Dose (2024)", "Pneumococcal Vaccine (2023)"]
  },

  // Active Ambulance Request
  ambulanceRequest: null,

  // Booked Appointments
  appointments: [],

  // Care Requests (Eldercare / Childcare)
  careRequests: [],

  // Civic Grievances
  grievances: [],

  // Personal Emergency Contacts
  personalEmergencyContacts: [
    { name: "Rohit Sharma (Son)", phone: "+91 98765 43210", relation: "Primary Caregiver" },
    { name: "Ananya Sharma (Daughter)", phone: "+91 98765 12345", relation: "Family" }
  ]
};

class AppState {
  constructor() {
    this.state = this.loadLocalBackup();
    this.subscribers = [];
    // Sync with real backend SQLite database
    this.syncWithBackend();
  }

  loadLocalBackup() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not load stored state:", e);
    }
    return { ...defaultState };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
  }

  async syncWithBackend() {
    try {
      const res = await fetch('/api/state');
      if (res.ok) {
        const dbData = await res.json();
        this.set({
          grievances: dbData.grievances || [],
          appointments: dbData.appointments || [],
          careRequests: dbData.careRequests || [],
          ambulanceRequest: dbData.ambulanceRequest || null,
          patientConsent: dbData.patientConsent || this.state.patientConsent,
          databaseConnected: true,
          databaseType: dbData.databaseType || "SQLite3"
        });
        console.log("✅ Synced with SQLite Database (sahayak.db)");
      }
    } catch (e) {
      console.warn("Backend database fetch error, operating in offline/local mode:", e);
      this.set({ databaseConnected: false });
    }
  }

  get() {
    return this.state;
  }

  set(updates) {
    this.state = { ...this.state, ...updates };
    this.saveState();
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    for (const cb of this.subscribers) {
      cb(this.state);
    }
  }

  setLanguage(lang) {
    this.set({ language: lang });
  }

  setRegion(regionId) {
    this.set({ region: regionId });
  }

  setFontSize(scale) {
    this.set({ fontSizeFactor: scale });
    document.documentElement.style.setProperty('--font-scale-factor', scale);
  }

  toggleHighContrast() {
    const nextVal = !this.state.highContrast;
    this.set({ highContrast: nextVal });
    document.documentElement.setAttribute('data-contrast', nextVal ? 'high' : 'normal');
  }

  setActiveView(view) {
    this.set({ activeView: view });
  }

  async grantConsent(hours = 24) {
    const now = new Date();
    const expiry = new Date(now.getTime() + hours * 60 * 60 * 1000);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const consentObj = {
      granted: true,
      timestamp: now.toISOString(),
      expiresAt: expiry.toLocaleString(),
      doctorAccessCode: code
    };
    this.set({ patientConsent: consentObj });

    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consentObj)
      });
    } catch (e) {
      console.warn("Could not sync consent to DB:", e);
    }
  }

  async revokeConsent() {
    const consentObj = {
      granted: false,
      timestamp: null,
      expiresAt: null,
      doctorAccessCode: null
    };
    this.set({ patientConsent: consentObj });

    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consentObj)
      });
    } catch (e) {
      console.warn("Could not sync consent revocation to DB:", e);
    }
  }

  async addGrievance(item) {
    const current = this.state.grievances;
    this.set({ grievances: [item, ...current] });

    try {
      await fetch('/api/grievances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (e) {
      console.warn("Could not sync grievance to DB:", e);
    }
  }

  async addAppointment(apt) {
    const current = this.state.appointments;
    this.set({ appointments: [apt, ...current] });

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apt)
      });
    } catch (e) {
      console.warn("Could not sync appointment to DB:", e);
    }
  }

  async addCareRequest(req) {
    const current = this.state.careRequests;
    this.set({ careRequests: [req, ...current] });

    try {
      await fetch('/api/care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      });
    } catch (e) {
      console.warn("Could not sync care request to DB:", e);
    }
  }

  async setAmbulanceRequest(req) {
    this.set({ ambulanceRequest: req });

    try {
      if (req) {
        await fetch('/api/ambulance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req)
        });
      } else {
        await fetch('/api/ambulance', { method: 'DELETE' });
      }
    } catch (e) {
      console.warn("Could not sync ambulance to DB:", e);
    }
  }
}

export const stateStore = new AppState();
