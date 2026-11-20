# Contributing to Sahayak Seva

Thank you for your interest in improving Sahayak Seva! This project is dedicated to providing an accessible, multilingual public utility platform for citizens of all backgrounds, ages, and technical abilities.

---

## Areas Where You Can Help

1. **Adding Regional Configurations**:
   - We aim to support every Indian state and union territory.
   - You can add your region's local emergency helplines, municipal corporations, water/electricity boards, and trauma centers in `js/config.js`.

2. **Expanding Language Translations**:
   - Help translate UI labels, emergency alerts, and document guides into more regional languages and dialects in `js/i18n.js`.

3. **Accessibility (a11y) Improvements**:
   - Help test screen reader behavior (NVDA, TalkBack, VoiceOver).
   - Ensure color contrast ratios satisfy WCAG 2.1 AAA benchmarks.

4. **Civic Service Guides**:
   - Update government identity procedures (Aadhaar, PAN, Voter ID, Ration Cards, Ayushman Bharat) as official portals evolve.

---

## Development Workflow

1. Fork this repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/sahayak-seva.git
   cd sahayak-seva
   ```
3. Start the local server:
   ```bash
   python3 server.py
   ```
4. Open `http://localhost:8080` in your web browser.
5. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/add-kerala-region
   ```
6. Commit your changes and open a Pull Request.

---

## Coding Standards

- **Zero External Dependencies**: Keep the core frontend lightweight using standard web technologies (HTML5, CSS3, modern ES modules).
- **Graceful Fallbacks**: Ensure any new features operate reliably even when JavaScript speech synthesis or network connectivity is limited.
- **Privacy by Design**: Never send sensitive health or identity data to external analytics or unverified third parties.
