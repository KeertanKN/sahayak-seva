# Sahayak Seva (सहायक सेवा)
### Universal Multilingual Citizen Assistance & Emergency Access Portal

[![WCAG AAA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AAA-success)](#-universal-accessibility--inclusivity)
[![Languages](https://img.shields.io/badge/Languages-8%20Indian%20Languages-blue)](#-multilingual-support)
[![Database](https://img.shields.io/badge/Database-SQLite3%20Persistent-brightgreen)](#-database-architecture--api)
[![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20External%20Pkgs-orange)](#-zero-bloat-architecture)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Sahayak Seva** is an accessible, human-centered public assistance web application designed to connect citizens of all ages, languages, and technical abilities with essential life services across mobile phones, tablets, and desktop computers.

---

## 📑 Table of Contents
- [Core Features](#-core-features)
  - [1. Healthcare & Medical Services](#1--healthcare--medical-services)
  - [2. Government & Civic Services](#2--government--civic-services)
  - [3. Safety & Emergency Help](#3--safety--emergency-help)
  - [4. Mitra Multilingual AI Assistant](#4--mitra-multilingual-ai-assistant)
- [Universal Accessibility (a11y)](#-universal-accessibility--inclusivity)
- [Multilingual Support](#-multilingual-support)
- [Database Architecture & REST API](#-database-architecture--api)
- [Project Structure](#-project-structure)
- [Quick Start Guide](#-quick-start-guide)
- [Step-by-Step GitHub Upload Guide](#-how-to-upload-to-github)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Core Features

### 1. 🩺 Healthcare & Medical Services
- **Emergency Ambulance Dispatch (108 / 102):**
  - Instant dispatch for **ALS (Advanced Life Support)** and **BLS (Basic Life Support)** vehicles.
  - Triage selector for acute conditions (Cardiac, Trauma/Accident, Asthma, Stroke, Active Labor).
  - Real-time GPS tracker simulation displaying driver name, vehicle number, phone number, ETA countdown, and destination ER notification.
- **Doctor Appointments & Doorstep Visits:**
  - Multi-specialty directory: General Physicians, Geriatricians, Pediatricians, and Cardiologists.
  - Flexible consultation modes: **Home Visits**, **Clinic Appointments**, or **Telehealth Video Calls**.
- **Elderly, Childcare & Specialized Support:**
  - Verified nursing attendants, senior companions, and dementia care.
  - Certified infant care nurses, pediatric nutrition guidance, and developmental support.
- **Patient Health Vault & Sovereign Consent:**
  - ABDM-compliant encrypted records: blood group, critical drug allergies (flagged in high-visibility alerts), chronic conditions, and active prescriptions.
  - **Sovereign Patient Consent:** Records are locked by default. Citizens generate a temporary **24-hour passcode (OTP)** for attending doctors with instant revocation control.
  - **Hospital EMR Simulator:** Preview what attending emergency room doctors see when access is authorized vs. denied.

---

### 2. 🏛️ Government & Civic Services
- **Official Identity Document Guidance:**
  - **Aadhaar Card (UIDAI):** Step-by-step guidance for phone updates at Seva Kendras, online address changes (with Head of Family HoF consent), e-Aadhaar PDF downloads, and PVC card orders.
  - **PAN Card (Income Tax):** 10-minute instant paperless e-PAN via Aadhaar e-KYC, Form 49A physical card requests, and statutory PAN-Aadhaar linking steps.
  - **Voter ID (ECI):** New voter registration (Form 6), address or constituency shifts (Form 8), Booth Level Officer (BLO) verification, and digital e-EPIC downloads.
  - Interactive required document checklists, statutory fee breakdowns, and direct links to official portals.
- **Citizen Grievance Portal ("CivicFix"):**
  - File local community issues: Broken Roads / Potholes, Dark Streetlights, Garbage Dumps, Water Supply Pipeline Leaks, and Stray Animal hazards.
  - Automatic municipal jurisdiction routing (e.g., MCD in Delhi, BBMP in Bengaluru, BMC in Mumbai, GCC in Chennai, KMC in Kolkata, AMC in Ahmedabad, or CPGRAMS pan-India).
  - Geo-tagging, severity rating, and photo attachment simulation.
  - Real-time grievance ticket tracking with status logs.

---

### 3. 🚨 Safety & Emergency Help
- **1-Tap Direct Emergency Dialing:**
  - 10 direct lines: **112** (Unified Emergency), **100** (Police), **101** (Fire), **108/102** (Ambulance), **1091/181** (Women Helpline & Domestic Abuse), **1098** (Childline), **14567** (Elderline), **1930** (Cyber Crime), and **1078/1070** (Disaster Management).
  - Direct `tel:` links allowing instant one-touch dialing from mobile phones.
- **Distress SOS Broadcast & Loud Siren:**
  - One-tap SOS simulation that sends live GPS coordinates, battery status, and emergency SMS alerts to family contacts and local Police Control.
  - Browser-native emergency siren built with the Web Audio API (zero audio file dependencies).
- **Life-Saving First Aid Protocols:**
  - Clinical, step-by-step guides for **Cardiac Arrest / CPR** (with 100–120 bpm rhythm metronome), **Severe Bleeding**, **Choking (Heimlich Maneuver)**, and **Burns**.
  - **Good Samaritan Law Guidance:** Explains Supreme Court protections ensuring citizens can transport road accident victims without fear of harassment or financial liability.

---

### 4. 🤖 Mitra Multilingual AI Assistant
- **8 Supported Languages:** English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, বাংলা, मराठी, and ગુજરાતી.
- **Intelligent Citizen Triage:** Asks diagnostic questions to understand needs and recommends the appropriate service category with deep-link navigation buttons.
- **Emergency Safety Override Disclaimer:**
  - Automatically intercepts life-threatening queries (*heart attack, chest pain, stroke, severe bleeding, fire, unconscious, attack, robbery, accident*).
  - Immediately displays a prominent red warning banner:
    > **⚠️ CRITICAL EMERGENCY DISCLAIMER:** *The chatbot cannot provide emergency assistance directly. Please call 112 or request an ambulance immediately!*
  - Includes a direct 1-tap call button for **112 / 108**.
- **Voice Integration:** Built-in speech synthesis button on each message and speech query input simulation.

---

## ♿ Universal Accessibility & Inclusivity

- **WCAG 2.1 AAA Compliant High-Contrast Mode:** High-contrast palette (pure black `#000000`, high-visibility yellow `#FFEB3B`, white `#FFFFFF`, neon cyan `#80D8FF`, signal red `#FF1744`) for low-vision individuals and seniors.
- **4-Stage Text Resizing:** Dynamic scaling buttons (`A` 100%, `A+` 115%, `A++` 130%, `A+++` 145%) recalculating all UI elements via CSS custom properties.
- **Native Text-to-Speech (TTS):** Integrated Web Speech API reads any card or the entire screen aloud in the selected language.
- **Large Touch Targets:** Minimum 48px $\times$ 48px click and touch targets for individuals with tremors or motor limitations.
- **Screen Reader & Keyboard Friendly:** Includes a `skip-to-content` jump link, semantic landmarks (`role="banner"`, `role="main"`, `role="contentinfo"`), and visible focus rings.
- **Responsive Layout:** Optimized with single-column cards and an accessible bottom navigation bar on mobile, adapting into multi-column layouts on tablets and desktop monitors.

---

## 🌐 Multilingual Support

| Language | Native Name | Code |
| :--- | :--- | :--- |
| English | English | `en` |
| Hindi | हिन्दी | `hi` |
| Tamil | தமிழ் | `ta` |
| Telugu | తెలుగు | `te` |
| Kannada | ಕನ್ನಡ | `kn` |
| Bengali | বাংলা | `bn` |
| Marathi | मराठी | `mr` |
| Gujarati | ગુજરાતી | `gu` |

---

## 🗄️ Database Architecture & API

Sahayak Seva runs on a zero-configuration, disk-persistent **SQLite3 database** (`sahayak.db`):

### Database Tables
- **`grievances`**: Municipal complaints, categories, location geo-tags, authorities, statuses, and timeline updates.
- **`appointments`**: Doctor bookings, appointment dates, consultation modes, and reference numbers.
- **`care_requests`**: Eldercare, daily companion, and childcare service orders.
- **`ambulance_requests`**: Active ambulance dispatches, triage conditions, driver and paramedic contacts, and ETAs.
- **`patient_consent`**: Sovereign patient authorization, 6-digit doctor access passcodes, and expiration timestamps.

### REST Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/state` | Returns all database records, active ambulance tracking, and consent status |
| `GET` | `/api/health` | Healthcheck returning database connection status |
| `POST` | `/api/grievances` | Inserts a new municipal complaint ticket |
| `POST` | `/api/appointments` | Inserts a doctor consultation booking |
| `POST` | `/api/care` | Inserts an eldercare or childcare request |
| `POST` | `/api/ambulance` | Dispatches an ambulance and saves telemetry |
| `DELETE` | `/api/ambulance` | Cancels an active ambulance dispatch |
| `POST` | `/api/consent` | Updates patient 24-hour doctor authorization |

---

## 📁 Project Structure

```
sahayak-seva/
├── .gitignore              # Ignores OS, Python caches, and temporary files
├── LICENSE                 # Open-source MIT license
├── CONTRIBUTING.md         # Guidelines for adding regions and languages
├── package.json            # Node/npm project metadata
├── README.md               # Comprehensive documentation
├── index.html              # Accessible semantic HTML5 application shell
├── server.py               # Lightweight Python HTTP & SQLite REST server
├── sahayak.db              # SQLite3 persistent database
├── css/
│   ├── variables.css       # Design tokens, color palettes, typography scale
│   ├── base.css            # Accessible reset, touch targets, buttons, forms
│   ├── layout.css          # Navigation, emergency banners, responsive grid
│   └── components.css      # Hero cards, dialogs, steppers, SOS grid, chat drawer
└── js/
    ├── config.js           # Regional configurations (numbers, civic bodies, hospitals)
    ├── i18n.js             # Comprehensive translations for 8 Indian languages
    ├── state.js            # Reactive state store with SQLite sync & local caching
    ├── voice.js            # Web Speech API speech synthesis & accessibility reader
    ├── healthcare.js       # Ambulance dispatch, doctor booking, eldercare, Health Vault
    ├── civic.js            # Aadhaar/PAN/Voter ID guides & CivicFix grievance portal
    ├── safety.js           # 1-Tap dialing, SOS alerts, Web Audio siren, first aid
    ├── chatbot.js          # Mitra AI assistant with triage and emergency override
    └── app.js              # Application bootstrapper and view router
```

---

## ⚡ Quick Start Guide

### Prerequisites
- Python 3.8+ (standard with macOS, Linux, and Windows)
- Modern web browser (Chrome, Safari, Firefox, Edge)

### Run Locally
```bash
# Clone the repository
git clone https://github.com/<your-username>/sahayak-seva.git
cd sahayak-seva

# Start the server
python3 server.py
```

Open **`http://localhost:8080`** in your browser.

---

## 🚀 How to Upload to GitHub

Follow these steps from your terminal to publish the project to GitHub:

### Step 1: Initialize Git
Navigate to the project directory:
```bash
cd /Users/kirtankn/Downloads/nxtproject
git init
```

### Step 2: Stage and Commit the Files
```bash
git add .
git commit -m "Initial commit: Sahayak Seva accessible citizen portal with SQLite backend"
```

### Step 3: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Set the repository name to `sahayak-seva` (or your preferred name).
3. Choose **Public** or **Private**.
4. Leave "Add a README file", ".gitignore", and "License" **unchecked** (we already created them).
5. Click **Create repository**.

### Step 4: Link and Push to GitHub
Copy the commands provided on your new GitHub repository page:
```bash
# Rename branch to main
git branch -M main

# Add your GitHub repository as remote origin
git remote add origin https://github.com/<your-username>/sahayak-seva.git

# Push the code
git push -u origin main
```

---

## 🤝 Contributing

Contributions to expand regional service configurations, add additional languages, or improve screen reader accessibility are welcome! Please review [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
