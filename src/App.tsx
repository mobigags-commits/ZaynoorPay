/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CookieConsent } from './components/common/CookieConsent';
import { ReceiptModal } from './components/common/ReceiptModal';
import { MobileAppSimulator } from './components/mobile/MobileAppSimulator';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { SendMoneyPage } from './pages/public/SendMoneyPage';
import { ReceiveMoneyPage } from './pages/public/ReceiveMoneyPage';
import { AddMoneyPage } from './pages/public/AddMoneyPage';
import { WithdrawMoneyPage } from './pages/public/WithdrawMoneyPage';
import { BillPaymentsPage } from './pages/public/BillPaymentsPage';
import { MobileTopupsPage } from './pages/public/MobileTopupsPage';
import { MerchantPaymentsPage } from './pages/public/MerchantPaymentsPage';
import { QRPaymentsPage } from './pages/public/QRPaymentsPage';
import { InternationalTransfersPage } from './pages/public/InternationalTransfersPage';
import { FeesAndLimitsPage } from './pages/public/FeesAndLimitsPage';
import { SupportedCountriesCurrenciesPage } from './pages/public/SupportedCountriesCurrenciesPage';
import { SecurityCenterPage } from './pages/public/SecurityCenterPage';
import { HelpCenterPage } from './pages/public/HelpCenterPage';
import { ContactUsPage } from './pages/public/ContactUsPage';
import { BlogPage } from './pages/public/BlogPage';
import { BlogArticlePage } from './pages/public/BlogArticlePage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsPage } from './pages/public/TermsPage';
import { CookiePolicyPage } from './pages/public/CookiePolicyPage';
import { ComplaintsDisputesPage } from './pages/public/ComplaintsDisputesPage';
import { AccessibilityStatementPage } from './pages/public/AccessibilityStatementPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { VerifyOtpPage } from './pages/auth/VerifyOtpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Customer Dashboard Pages
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { WalletBalanceHistoryPage } from './pages/customer/WalletBalanceHistoryPage';
import { BeneficiariesPage } from './pages/customer/BeneficiariesPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { KycVerificationPage } from './pages/customer/KycVerificationPage';
import { SecuritySettingsPage } from './pages/customer/SecuritySettingsPage';
import { NotificationsPage } from './pages/customer/NotificationsPage';
import { SupportTicketsPage } from './pages/customer/SupportTicketsPage';
import { DownloadStatementsPage } from './pages/customer/DownloadStatementsPage';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUserManagementPage } from './pages/admin/AdminUserManagementPage';
import { AdminTransactionsAuditPage } from './pages/admin/AdminTransactionsAuditPage';
import { AdminPaymentProvidersPage } from './pages/admin/AdminPaymentProvidersPage';
import { AdminContentManagementPage } from './pages/admin/AdminContentManagementPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSystemStatusPage } from './pages/admin/AdminSystemStatusPage';

// System Pages
import { NotFoundPage } from './pages/system/NotFoundPage';
import { AccessDeniedPage } from './pages/system/AccessDeniedPage';
import { MaintenancePage } from './pages/system/MaintenancePage';

const AppRouter: React.FC = () => {
  const { currentPath, appMode, isAuthenticated, isAdmin } = useApp();

  // If user selected interactive native mobile app mode
  if (appMode === 'mobile_app') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1">
          <MobileAppSimulator />
        </main>
        <Footer />
        <ReceiptModal />
      </div>
    );
  }

  // Page Routing resolver
  const renderCurrentPage = () => {
    const path = currentPath.split('?')[0].toLowerCase();

    // Public Pages
    if (path === '' || path === '/') return <HomePage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/features') return <FeaturesPage />;
    if (path === '/how-it-works') return <HowItWorksPage />;
    if (path === '/send') return <SendMoneyPage />;
    if (path === '/receive') return <ReceiveMoneyPage />;
    if (path === '/add-money') return <AddMoneyPage />;
    if (path === '/withdraw') return <WithdrawMoneyPage />;
    if (path === '/bills') return <BillPaymentsPage />;
    if (path === '/topups') return <MobileTopupsPage />;
    if (path === '/merchant-payments') return <MerchantPaymentsPage />;
    if (path === '/qr-payments') return <QRPaymentsPage />;
    if (path === '/international-transfers') return <InternationalTransfersPage />;
    if (path === '/fees-limits') return <FeesAndLimitsPage />;
    if (path === '/supported-coverage') return <SupportedCountriesCurrenciesPage />;
    if (path === '/security') return <SecurityCenterPage />;
    if (path === '/help') return <HelpCenterPage />;
    if (path === '/contact') return <ContactUsPage />;
    if (path === '/blog') return <BlogPage />;
    if (path.startsWith('/blog/')) return <BlogArticlePage />;
    if (path === '/privacy-policy') return <PrivacyPolicyPage />;
    if (path === '/terms') return <TermsPage />;
    if (path === '/cookie-policy') return <CookiePolicyPage />;
    if (path === '/disputes') return <ComplaintsDisputesPage />;
    if (path === '/accessibility') return <AccessibilityStatementPage />;

    // Auth Pages
    if (path === '/login') return <LoginPage />;
    if (path === '/signup') return <SignUpPage />;
    if (path === '/verify-otp') return <VerifyOtpPage />;
    if (path === '/forgot-password') return <ForgotPasswordPage />;

    // Customer Dashboard Pages
    if (path === '/dashboard') return <CustomerDashboardPage />;
    if (path === '/wallet-history') return <WalletBalanceHistoryPage />;
    if (path === '/beneficiaries') return <BeneficiariesPage />;
    if (path === '/profile') return <ProfilePage />;
    if (path === '/kyc-verification') return <KycVerificationPage />;
    if (path === '/security-settings') return <SecuritySettingsPage />;
    if (path === '/notifications') return <NotificationsPage />;
    if (path === '/support-tickets') return <SupportTicketsPage />;
    if (path === '/download-statements') return <DownloadStatementsPage />;

    // Admin Portal Pages
    if (path === '/admin-login') return <AdminLoginPage />;
    if (path === '/admin') return <AdminDashboardPage />;
    if (path === '/admin/users') return <AdminUserManagementPage />;
    if (path === '/admin/transactions') return <AdminTransactionsAuditPage />;
    if (path === '/admin/providers') return <AdminPaymentProvidersPage />;
    if (path === '/admin/content') return <AdminContentManagementPage />;
    if (path === '/admin/reports') return <AdminReportsPage />;
    if (path === '/system-status') return <AdminSystemStatusPage />;

    // Special System Pages
    if (path === '/access-denied') return <AccessDeniedPage />;
    if (path === '/maintenance') return <MaintenancePage />;

    // Fallback 404
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#C8102E] selection:text-white">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <CookieConsent />
      <ReceiptModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
