# ZaynoorPay — Premium Multi-Currency Digital Wallet & Financial Platform

ZaynoorPay is an institutional-grade digital wallet, payments, and international remittance platform engineered with double-entry cryptographic ledger safety, multi-currency support, full bilingual localization (English and Urdu with RTL support), an interactive mobile wallet simulator, and a dedicated compliance admin console.

---

## 🌟 Brand Identity & Color Architecture

- **Brand Concept**: *Noor* (light, truth, and transparency), trust, convenience, and modern digital payments.
- **Custom Vector Emblem**: Sophisticated geometric shield combined with a stylized letter Z and diagonal Noor light-ray motif (`src/components/brand/Logo.tsx`).
- **Homepage Color Theme**: Mandatory rich crimson-red background (`#C8102E`, deep crimson `#850D22`, gold accent `#D6B36A`, and high-contrast white).
- **Internal Pages**: Premium navy (`#101A33`), secondary slate (`#1B2947`), soft grey (`#F4F6FA`), and gold accents.
- **Bilingual Support**: Instant toggle between Left-to-Right English and Right-to-Left authentic Nastaliq Urdu with font scale compensation.
- **Dual Form Factor ("Web aur App dono")**: Full responsive desktop web portal + interactive native iPhone 16 Pro mobile app simulator (`/app-view` or one-click header switch).

---

## 📂 50 Distinct Application Pages

### 1. Public Website
1. **Home (`/`)**: High-converting crimson red landing page, real-time mid-market remittance calculator, 4-pillar bento showcase, and interactive FAQ accordion.
2. **About ZaynoorPay (`/about`)**: Company vision, the concept of Noor, architectural operations room showcase, and regulatory posture.
3. **Features and Services (`/features`)**: In-depth analysis of instant P2P, bills, mobile loads, and cards.
4. **How It Works (`/how-it-works`)**: Four-step visual onboarding guide.
5. **Send Money (`/send`)**: Multi-currency transfer ticket with live fee calculation, beneficiary picker, and limit checks.
6. **Receive Money (`/receive`)**: Universal QR code, shareable pay link (`zaynoorpay.com/pay/@user`), and virtual inbound wire details.
7. **Add Money (`/add-money`)**: Funding via Debit/Credit cards, domestic bank wires, or instant payment switches.
8. **Withdraw Money (`/withdraw`)**: Bank payouts and cardless ATM 6-digit cash-out authorization generator.
9. **Bill Payments (`/bills`)**: Consumer inquiry and one-click settlements for electricity (LESCO, K-Electric), gas (SNGPL, SSGC), water (WASA), and broadband (PTCL, StormFiber).
10. **Mobile Top-ups (`/topups`)**: Cellular airtime recharge and data bundle activations for Jazz, Telenor, Zong, Ufone, and international carriers.
11. **Merchant Payments (`/merchant-payments`)**: Pay retail till numbers with an integrated Split-Bill group calculator.
12. **QR Payments (`/qr-payments`)**: Dual-mode EMVCo scanner simulation with viewfinder and dynamic invoice generator.
13. **International Transfers (`/international-transfers`)**: Authorized corridors (UK, UAE, Saudi Arabia, USA, EU to Pakistan) with real-time mid-market FX rates.
14. **Fees and Limits (`/fees-limits`)**: Transparent tiered comparison matrix (Tier 1 Basic, Tier 2 Verified, Tier 3 Commercial) and comprehensive fee schedule.
15. **Supported Countries & Currencies (`/supported-coverage`)**: Verified coverage map across 14 sovereign jurisdictions.
16. **Security Center (`/security`)**: Zero-trust defense, AES-256 GCM encryption, 2FA TOTP guides, and emergency reporting.
17. **Help Center & FAQs (`/help`)**: Searchable knowledge base with categorized interactive accordions.
18. **Contact Us (`/contact`)**: Validated multi-category inquiry ticket form and corporate financial hub addresses.
19. **Blog & Financial Literacy (`/blog`)**: Research articles with zero-pill metadata and category filters.
20. **Individual Blog Article (`/blog/understanding-digital-remittance-2026`)**: Detailed educational study on ISO 20022 and cross-border clearing.
21. **Privacy Policy (`/privacy-policy`)**: GDPR, data sovereignty, encryption standards, and user privacy rights.
22. **Terms and Conditions (`/terms`)**: Service obligations, wallet rules, and prototype disclosure.
23. **Cookie Policy (`/cookie-policy`)**: Granular token categorization and ePrivacy Directive compliance.
24. **Complaints and Dispute Resolution (`/disputes`)**: 3-stage dispute escalation process, interactive chargeback filing, and Banking Ombudsman contacts.
25. **Accessibility Statement (`/accessibility`)**: WCAG 2.1 Level AA conformance, keyboard navigation, and RTL friendliness.

### 2. Authentication & Customer Dashboard
26. **Sign Up (`/signup`)**: Multi-step registration with password strength meter and terms agreement.
27. **Sign In (`/login`)**: Credentials login with one-click Customer Demo and Admin Demo instant shortcuts.
28. **Verification & OTP (`/verify-otp`)**: 6-digit auto-advancing passcode input with resend cooldown timer.
29. **Forgot Password (`/forgot-password`)**: Security token dispatch simulation.
30. **Customer Dashboard (`/dashboard`)**: Multi-currency balances, Titanium virtual card, quick actions, and recent activity.
31. **Wallet Balance & History (`/wallet-history`)**: Full double-entry ledger view, search, category filters, and CSV export.
32. **Transaction Details & Receipt (`modal`)**: Cryptographic receipt with reference number, idempotency key, double-entry legs, printable sheet, and text download.
33. **Beneficiaries & Saved Recipients (`/beneficiaries`)**: Contact management, favorite stars, and quick send shortcuts.
34. **Profile & Personal Information (`/profile`)**: Personal info, account tier, and primary jurisdiction editor.
35. **Identity Verification / KYC (`/kyc-verification`)**: Document upload simulation (CNIC / Passport) and 3D biometric liveness scan.
36. **Security Settings & 2FA (`/security-settings`)**: TOTP authenticator toggle, 6-digit transaction PIN change, biometrics, and active session management.
37. **Notifications Center (`/notifications`)**: Transaction and security alerts with mark-all-read and dismiss controls.
38. **Support Tickets (`/support-tickets`)**: Customer service ticket queue, case status badges, and threaded messaging.
39. **Download Statements (`/download-statements`)**: Certified multi-currency statement generator with period selection and download.

### 3. Administration & System Pages
40. **Admin Login (`/admin-login`)**: Root credential console with hardware FIDO2 token challenge.
41. **Admin Dashboard (`/admin`)**: Real-time 24h volume metrics, registered accounts, pending KYC dossiers, and audit event stream.
42. **User Management (`/admin/users`)**: Customer roster, freeze/unfreeze account controls, and KYC approval actions.
43. **Transaction Monitoring & Audit (`/admin/transactions`)**: Live transaction stream with debit/credit double-entry reconciliation.
44. **Payment Provider Configuration (`/admin/providers`)**: Sandbox vs. Live gateway toggles for Stripe, 1Link, Raast, and Checkout.com.
45. **Content Management (`/admin/content`)**: Global broadcast banners, mid-market FX quote adjustments, and emergency maintenance toggle.
46. **Reports & Analytics (`/admin/reports`)**: Trailing 30-day corridor volume distribution and compliance export packages.
47. **System Status (`/system-status`)**: 99.98% platform uptime, component health, and endpoint response latencies.
48. **404 Not Found (`/not-found`)**: Branded missing endpoint page with recovery links.
49. **403 Access Denied (`/access-denied`)**: Security boundary access restriction notice.
50. **Maintenance Page (`/maintenance`)**: Infrastructure upgrade announcement with estimated completion window.

---

## 🔒 Financial Security & Double-Entry Architecture

1. **Double-Entry Ledger Design**:
   - Every transaction records balanced debit and credit entries (`doubleEntryLegs`).
   - Balances are strictly computed from transaction movements, never trusted directly from client inputs.
2. **Idempotency Enforcement**:
   - Every payment assigns a unique `idempotencyKey` preventing accidental duplicate debits or network replay attempts.
3. **Sandbox Prototype Mode**:
   - Operating under a clearly labeled **DEMO SANDBOX** banner. All simulated financial activities avoid claims of unverified bank reserves until statutory Central Bank licensing is finalized.
4. **AdSense & Compliance Preparation**:
   - Compliant `AdSlot` components reserved with clear labels and zero deceptive buttons or clickjacking traps.
   - Granular `CookieConsent` banner honoring GDPR and ePrivacy guidelines.

---

## 🚀 Vercel Deployment Instructions

1. **Repository Push**:
   Commit and push your changes to your GitHub or GitLab repository:
   ```bash
   git add .
   git commit -m "Complete ZaynoorPay digital wallet web & mobile app"
   git push origin main
   ```
2. **Import into Vercel**:
   - Sign in to [Vercel](https://vercel.com).
   - Select **Add New...** → **Project** and select your repository.
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Environment Variables**:
   Add the following environment variables in the Vercel Project Settings (refer to `.env.example`):
   - `APP_URL`: Production domain URL (e.g. `https://zaynoorpay.com`)
   - `GEMINI_API_KEY`: Injected automatically in AI Studio / set for backend routes
   - `VITE_ADSENSE_PUB_ID` *(Optional)*: Google AdSense Publisher ID once approved
4. **Deploy**:
   Click **Deploy**. Vercel will build the SPA assets and serve them with global low-latency CDN edge nodes.
