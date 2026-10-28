import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserProfile, 
  Transaction, 
  Beneficiary, 
  SupportTicket, 
  NotificationItem, 
  AuditLog, 
  PaymentProviderConfig, 
  CurrencyCode 
} from '../types';
import { Language, translations } from '../translations';

interface AppContextType {
  // Navigation & Route
  currentPath: string;
  navigate: (path: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  appMode: 'web' | 'mobile_app';
  setAppMode: (mode: 'web' | 'mobile_app') => void;
  demoMode: boolean;
  setDemoMode: (val: boolean) => void;

  // Auth & Profile
  user: UserProfile;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginAsCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;

  // Financial Ledger & Transactions
  transactions: Transaction[];
  performTransaction: (params: {
    type: Transaction['type'];
    amount: number;
    currency: CurrencyCode;
    recipient: string;
    recipientAccount?: string;
    category: Transaction['category'];
    note?: string;
    customFee?: number;
  }) => { success: boolean; transaction?: Transaction; error?: string };

  // Active Receipt Modal
  activeReceipt: Transaction | null;
  openReceipt: (tx: Transaction) => void;
  closeReceipt: () => void;

  // Beneficiaries
  beneficiaries: Beneficiary[];
  addBeneficiary: (ben: Omit<Beneficiary, 'id'>) => void;
  removeBeneficiary: (id: string) => void;
  toggleFavoriteBeneficiary: (id: string) => void;

  // Support & Complaints
  tickets: SupportTicket[];
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdated' | 'status' | 'messages'>, initialMessage: string) => void;
  replyTicket: (ticketId: string, message: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Admin & Security
  auditLogs: AuditLog[];
  providers: PaymentProviderConfig[];
  toggleProviderStatus: (id: string) => void;
  adminApproveKyc: (userId: string) => void;

  // Owner Earnings, Wallet, Deposit & Withdrawal
  ownerWallet: import('../types').OwnerWallet;
  earningStreams: import('../types').EarningStream[];
  ownerDeposit: (params: { amount: number; currency: CurrencyCode; source: string }) => { success: boolean; error?: string };
  ownerWithdraw: (params: { amount: number; currency: CurrencyCode; method: string; account: string }) => { success: boolean; error?: string };
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_zaynoor_8829',
  name: 'Aris K. Ahmed',
  email: 'aris.ahmed@example.com',
  phone: '+1 (555) 382-9014',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'customer',
  tier: 2,
  kycStatus: 'verified',
  twoFactorEnabled: true,
  biometricEnabled: true,
  transactionPinSet: true,
  country: 'United States',
  createdAt: '2025-01-15',
  balances: {
    USD: 14875.50,
    PKR: 685000,
    EUR: 3240.00,
    GBP: 2150.00,
    AED: 8400.00,
    SAR: 5600.00,
  },
  monthlyLimitRemaining: 34200,
  monthlyLimitTotal: 50000,
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_992140',
    type: 'send',
    title: 'Transfer to Farhan Tariq',
    amount: 320.00,
    currency: 'USD',
    fee: 0.50,
    netAmount: 320.50,
    recipient: 'Farhan Tariq (ZN-7712)',
    sender: 'Aris K. Ahmed',
    status: 'completed',
    timestamp: '2026-10-25 18:24',
    category: 'transfer',
    referenceNumber: 'ZN-REF-20261025-99214',
    idempotencyKey: 'idemp_89f02c4b81a20',
    note: 'Consulting milestone clearance',
    doubleEntryLegs: [
      { debitAccount: 'usr_wallet_usd', creditAccount: 'clearing_settlement', amount: 320.00 },
      { debitAccount: 'usr_wallet_usd', creditAccount: 'fee_revenue', amount: 0.50 },
    ],
  },
  {
    id: 'tx_992139',
    type: 'receive',
    title: 'Received from Global Solutions UK',
    amount: 1450.00,
    currency: 'USD',
    fee: 0.00,
    netAmount: 1450.00,
    recipient: 'Aris K. Ahmed',
    sender: 'Global Solutions UK Ltd',
    status: 'completed',
    timestamp: '2026-10-24 11:15',
    category: 'deposit',
    referenceNumber: 'ZN-REF-20261024-88410',
    idempotencyKey: 'idemp_11c390a12e',
    note: 'Invoice #4409 payout',
    doubleEntryLegs: [
      { debitAccount: 'nostro_partner_bank', creditAccount: 'usr_wallet_usd', amount: 1450.00 }
    ],
  },
  {
    id: 'tx_992138',
    type: 'bill_payment',
    title: 'Lahore Electric Supply (LESCO)',
    amount: 142.00,
    currency: 'USD',
    fee: 0.00,
    netAmount: 142.00,
    recipient: 'LESCO Electricity Utility',
    recipientAccount: 'Consumer # 08-11234-99881',
    sender: 'Aris K. Ahmed',
    status: 'completed',
    timestamp: '2026-10-22 14:02',
    category: 'utility',
    referenceNumber: 'ZN-REF-20261022-77192',
    idempotencyKey: 'idemp_utility_90192',
    note: 'October residential electricity',
    doubleEntryLegs: [
      { debitAccount: 'usr_wallet_usd', creditAccount: 'utility_escrow_lesco', amount: 142.00 }
    ],
  },
  {
    id: 'tx_992137',
    type: 'mobile_topup',
    title: 'Jazz Super 4G Data Recharge',
    amount: 25.00,
    currency: 'USD',
    fee: 0.00,
    netAmount: 25.00,
    recipient: '+92 300 8492019',
    sender: 'Aris K. Ahmed',
    status: 'completed',
    timestamp: '2026-10-20 09:41',
    category: 'mobile',
    referenceNumber: 'ZN-REF-20261020-66102',
    idempotencyKey: 'idemp_mob_5512',
    note: 'Monthly 50GB data package',
    doubleEntryLegs: [
      { debitAccount: 'usr_wallet_usd', creditAccount: 'telecom_aggregator_jazz', amount: 25.00 }
    ],
  },
  {
    id: 'tx_992136',
    type: 'merchant_qr',
    title: 'Noor Café & Roasters',
    amount: 18.50,
    currency: 'USD',
    fee: 0.00,
    netAmount: 18.50,
    recipient: 'Noor Artisanal Coffee (Till #492)',
    sender: 'Aris K. Ahmed',
    status: 'completed',
    timestamp: '2026-10-19 16:30',
    category: 'merchant',
    referenceNumber: 'ZN-REF-20261019-33100',
    idempotencyKey: 'idemp_qr_99218',
    note: 'POS QR scan purchase',
    doubleEntryLegs: [
      { debitAccount: 'usr_wallet_usd', creditAccount: 'merchant_settlement', amount: 18.50 }
    ],
  },
  {
    id: 'tx_992135',
    type: 'add_money',
    title: 'Funded via Visa Platinum Card (..4019)',
    amount: 2000.00,
    currency: 'USD',
    fee: 0.00,
    netAmount: 2000.00,
    recipient: 'Aris K. Ahmed Wallet',
    sender: 'Cardholder Bank Visa',
    status: 'completed',
    timestamp: '2026-10-18 10:11',
    category: 'deposit',
    referenceNumber: 'ZN-REF-20261018-11200',
    idempotencyKey: 'idemp_card_topup_441',
    note: 'Instant card top-up',
    doubleEntryLegs: [
      { debitAccount: 'acquirer_card_inflow', creditAccount: 'usr_wallet_usd', amount: 2000.00 }
    ],
  },
];

const INITIAL_BENEFICIARIES: Beneficiary[] = [
  { id: 'ben_1', name: 'Farhan Tariq', accountNumber: 'ZN-7712-990', bankOrWallet: 'ZaynoorPay Wallet', currency: 'USD', isFavorite: true, avatarInitials: 'FT', type: 'zaynoor' },
  { id: 'ben_2', name: 'Ayesha Siddiqui', accountNumber: 'PK36HABB00012398491029', bankOrWallet: 'Habib Bank Ltd', currency: 'PKR', isFavorite: true, avatarInitials: 'AS', type: 'bank' },
  { id: 'ben_3', name: 'Hamza Malik (Raast)', accountNumber: '03009482190', bankOrWallet: 'Raast Instant ID', currency: 'PKR', isFavorite: true, avatarInitials: 'HM', type: 'mobile_wallet' },
  { id: 'ben_4', name: 'Sophia Chen', accountNumber: 'GB82MIDL40051512345678', bankOrWallet: 'HSBC Bank UK', currency: 'GBP', isFavorite: false, avatarInitials: 'SC', type: 'bank' },
  { id: 'ben_5', name: 'Zaid Al-Harbi', accountNumber: 'SA0380000000608010167519', bankOrWallet: 'Al Rajhi Bank', currency: 'SAR', isFavorite: false, avatarInitials: 'ZH', type: 'bank' },
];

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-8921',
    subject: 'Inquiry regarding Tier 3 Business Volume limits',
    category: 'account',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-10-24 15:30',
    lastUpdated: '2026-10-25 09:12',
    messages: [
      { id: 'm1', sender: 'user', senderName: 'Aris K. Ahmed', text: 'Hello, I plan to run high-volume international remittances for my software agency next month. How can I expedite Tier 3 authorization?', timestamp: '2026-10-24 15:30' },
      { id: 'm2', sender: 'support', senderName: 'Zaynoor Compliance Officer', text: 'Peace be upon you Aris. Please submit your business tax registration certificate and recent corporate bank statement in the KYC portal. Our team reviews submissions within 2 hours.', timestamp: '2026-10-25 09:12' }
    ]
  },
  {
    id: 'TCK-8410',
    subject: 'Electricity bill transaction receipt verification',
    category: 'billing',
    priority: 'low',
    status: 'resolved',
    createdAt: '2026-10-22 14:10',
    lastUpdated: '2026-10-22 14:15',
    messages: [
      { id: 'm3', sender: 'user', senderName: 'Aris K. Ahmed', text: 'The LESCO utility bill was paid instantly. Receipt downloaded successfully.', timestamp: '2026-10-22 14:10' },
      { id: 'm4', sender: 'support', senderName: 'Zaynoor Automated Care', text: 'Thank you for choosing ZaynoorPay! Consumer utility confirmation code was sent to your registered phone.', timestamp: '2026-10-22 14:15' }
    ]
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif_1', title: 'Transfer Completed', message: 'You sent $320.00 to Farhan Tariq. Transaction hash: ZN-REF-20261025-99214.', type: 'transaction', read: false, timestamp: '1 hour ago' },
  { id: 'notif_2', title: 'Security Alert: New Sign-in', message: 'Authorized sign-in detected from Chrome on macOS (IP: 198.51.100.44).', type: 'security', read: false, timestamp: '4 hours ago' },
  { id: 'notif_3', title: 'Monthly Statement Ready', message: 'Your September 2026 multi-currency financial ledger statement is available for PDF download.', type: 'system', read: true, timestamp: '3 days ago' },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'aud_1', adminEmail: 'admin@zaynoorpay.com', action: 'USER_KYC_VERIFIED', targetId: 'usr_zaynoor_8829', ipAddress: '10.0.4.12', timestamp: '2026-10-25 17:40', status: 'success', details: 'Government ID & Proof of Address verified' },
  { id: 'aud_2', adminEmail: 'system_bot', action: 'IDEMPOTENCY_CHECK_PASSED', targetId: 'idemp_89f02c4b81a20', ipAddress: '127.0.0.1', timestamp: '2026-10-25 18:24', status: 'success', details: 'Zero duplicate executions detected' },
  { id: 'aud_3', adminEmail: 'risk_engine', action: 'VELOCITY_CHECK_NOMINAL', targetId: 'usr_zaynoor_8829', ipAddress: '10.0.2.88', timestamp: '2026-10-25 18:24', status: 'success', details: 'Transaction within Tier 2 single-day velocity limits' },
];

const INITIAL_PROVIDERS: PaymentProviderConfig[] = [
  { id: 'prv_stripe', name: 'Stripe Global Card Rail', type: 'card_rail', status: 'connected_sandbox', endpoint: 'https://api.stripe.com/v1', webhookVerified: true, supportedCurrencies: ['USD', 'EUR', 'GBP'], rateLimitPerSec: 100 },
  { id: 'prv_1link', name: '1Link Switch & PayPak', type: 'bank_switch', status: 'connected_sandbox', endpoint: 'https://switch.1link.net/iso8583', webhookVerified: true, supportedCurrencies: ['PKR'], rateLimitPerSec: 250 },
  { id: 'prv_raast', name: 'Raast Instant Payment System', type: 'instant_payment', status: 'connected_sandbox', endpoint: 'https://raast.sbp.org.pk/iso20022', webhookVerified: true, supportedCurrencies: ['PKR'], rateLimitPerSec: 500 },
  { id: 'prv_checkout', name: 'Checkout.com Remittance Gateway', type: 'card_rail', status: 'connected_sandbox', endpoint: 'https://api.checkout.com', webhookVerified: true, supportedCurrencies: ['USD', 'AED', 'SAR', 'EUR'], rateLimitPerSec: 80 },
];

const INITIAL_EARNING_STREAMS: import('../types').EarningStream[] = [
  {
    id: 'es_tx_fees',
    title: 'Interbank & P2P Settlement Fees',
    titleUrdu: 'انٹر بینک اور والیٹ ٹرانسفر فیس',
    description: 'Automatic $0.50 fixed fee or 0.25% surcharge collected on outbound 1Link, Raast, and ACH transfers.',
    descriptionUrdu: 'ہر بینک اور والیٹ ٹرانسفر پر خودکار فیس براہ راست مالک کے ریونیو والیٹ میں جمع ہوتی ہے۔',
    category: 'transaction_fees',
    currentRate: '$0.50 / PKR 50 per transfer',
    totalEarnedUsd: 42100.00,
    totalEarnedPkr: 11720000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_fx_spread',
    title: 'Foreign Exchange (FX) Spread Margins',
    titleUrdu: 'فاریکس کرنسی ریٹ مارجن (بیرون ملک ترسیلات)',
    description: '0.40% to 0.75% liquidity spread retained on international remittance corridors (UK, UAE, KSA, USA, EU to Pakistan).',
    descriptionUrdu: 'بیرونی ممالک سے بھیجی جانے والی رقوم پر بغیر کسی انویسٹمنٹ کے شفاف کرنسی ریٹ مارجن حاصل ہوتا ہے۔',
    category: 'fx_spread',
    currentRate: '0.50% - 0.75% of volume',
    totalEarnedUsd: 34200.00,
    totalEarnedPkr: 9520000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_adsense',
    title: 'Google AdSense Automated Monetization',
    titleUrdu: 'گوگل ایڈسینس اشتہارات سے خودکار آمدنی',
    description: 'High-eCPM financial advertisements served via verified Publisher ID (ca-pub-7550936944889241).',
    descriptionUrdu: 'آپ کی ویب سائٹ کے ٹریفک اور بینرز پر آٹومیٹک گوگل اشتہارات کے کلکس اور امپریشنز سے ڈالر میں کٹائی۔',
    category: 'adsense',
    currentRate: 'CPM $3.80 - $8.50 / RPM',
    totalEarnedUsd: 18450.00,
    totalEarnedPkr: 5136000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_utility_commission',
    title: 'Utility Biller Aggregator Kickbacks',
    titleUrdu: 'بجلی، گیس و انٹرنیٹ بل ادائیگی پر ایگریگیٹر کمیشن',
    description: '1.2% to 2.0% volume incentive paid by 1Link biller aggregator for each electricity, gas, and water bill cleared.',
    descriptionUrdu: 'صارفین کی طرف سے ادا کیے گئے ہر یوٹیلیٹی بل پر کمپنی کی جانب سے مالکانہ کمیشن۔',
    category: 'biller_commissions',
    currentRate: '1.50% per bill cleared',
    totalEarnedUsd: 12150.00,
    totalEarnedPkr: 3382000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_telecom_airtime',
    title: 'Mobile Load & Airtime Telecom Commissions',
    titleUrdu: 'موبائل ریچارج اور ڈیٹا بنڈل سیلز کمیشن',
    description: '2.5% to 3.5% wholesale telecom margin on Jazz, Zong, Telenor, and Ufone prepaid recharge & data bundles.',
    descriptionUrdu: 'موبائل کمپنیوں (جاز، زونگ، ٹیلی نار، یوفون) کی جانب سے ہر ریچارج پر 2.5% تا 3.5% منافع۔',
    category: 'biller_commissions',
    currentRate: '2.50% - 3.50% per top-up',
    totalEarnedUsd: 9400.00,
    totalEarnedPkr: 2617000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_merchant_mdr',
    title: 'Merchant QR & POS Till MDR Fees',
    titleUrdu: 'دکانداروں کے کیو آر اور پی او ایس سویپ چارجز',
    description: '1.20% Merchant Discount Rate (MDR) billed to retail stores, supermarkets, and restaurants on checkout payments.',
    descriptionUrdu: 'دکانوں اور ریسٹورنٹس پر کیو آر اسکیننگ سے ہونے والی ہر خریداری پر 1.2% سے 1.8% بزنس فیس۔',
    category: 'merchant_mdr',
    currentRate: '1.20% - 1.80% MDR',
    totalEarnedUsd: 9850.00,
    totalEarnedPkr: 2742000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_card_interchange',
    title: 'Virtual Titanium Visa Interchange Share',
    titleUrdu: 'ورچوئل ویزا ڈیبٹ کارڈ کا انٹرچینج ریونیو',
    description: '1.0% global interchange fee earned on user online e-commerce transactions and subscriptions via Visa rail.',
    descriptionUrdu: 'صارفین کے ذریعے جاری کردہ ورچوئل کارڈز سے آن لائن شاپنگ پر حاصل ہونے والا شیئر۔',
    category: 'card_interchange',
    currentRate: '1.00% interchange fee',
    totalEarnedUsd: 5400.00,
    totalEarnedPkr: 1503000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
  {
    id: 'es_bank_referrals',
    title: 'Sponsored Bank & Insurance Lead Referrals',
    titleUrdu: 'بینک اکاؤنٹس اور انشورنس ریفرل کمیشن',
    description: '$10.00 to $35.00 CPA bounty received when verified wallet users open high-yield savings accounts with partner banks.',
    descriptionUrdu: 'صارفین کو بینک کھاتے، کریڈٹ کارڈ یا ہیلتھ انشورنس ریفر کرنے پر پارٹنر مالیاتی اداروں سے کمیشن۔',
    category: 'bank_referrals',
    currentRate: '$15.00 flat per lead',
    totalEarnedUsd: 4100.00,
    totalEarnedPkr: 1141000.00,
    status: 'generating',
    noInvestmentTag: true,
  },
];

const INITIAL_OWNER_WALLET: import('../types').OwnerWallet = {
  balances: {
    USD: 48250.00,
    PKR: 3450000.00,
    EUR: 12400.00,
    GBP: 9800.00,
    AED: 28500.00,
    SAR: 18200.00,
  },
  totalEarnedAllTimeUsd: 128450.00,
  todayEarnedUsd: 1420.50,
  revenueBreakdown: {
    transactionFees: 42100.00,
    fxSpreadMargins: 34200.00,
    adSenseRevenue: 18450.00,
    billerCommissions: 12150.00,
    merchantMdr: 9850.00,
    cardInterchange: 5400.00,
    bankReferrals: 4100.00,
    premiumTiers: 2200.00,
  },
  payoutMethods: [
    { id: 'pm_1', type: 'bank', title: 'Habib Bank Ltd (HBL) - Primary Corporate Settlement', accountDetails: 'PK36HABB00012398491029 (Account Holder: Zaynoor Founder)', currency: 'PKR', isDefault: true },
    { id: 'pm_2', type: 'jazzcash', title: 'JazzCash Direct Merchant Wallet', accountDetails: '0300-8492019 (Verified)', currency: 'PKR', isDefault: false },
    { id: 'pm_3', type: 'easypaisa', title: 'EasyPaisa Master Account', accountDetails: '0345-9921401 (Verified)', currency: 'PKR', isDefault: false },
    { id: 'pm_4', type: 'crypto_usdt', title: 'Binance / Tether USDT (TRC-20)', accountDetails: 'TJv79x1KqpL29sB2p91A82Q440vBn99X01', currency: 'USD', isDefault: false },
    { id: 'pm_5', type: 'payoneer', title: 'Payoneer Global Wire Receiving', accountDetails: 'mobigags@gmail.com (ACH Bank Route)', currency: 'USD', isDefault: false },
  ],
  withdrawals: [
    { id: 'ow_101', amount: 5000.00, currency: 'USD', method: 'Binance USDT (TRC-20)', account: 'TJv79x...X01', timestamp: '2026-10-25 14:10', status: 'completed', referenceNumber: 'ZN-OWN-WD-9941', fee: 0 },
    { id: 'ow_102', amount: 500000.00, currency: 'PKR', method: 'HBL Corporate Settlement', account: 'PK36HABB...1029', timestamp: '2026-10-20 11:30', status: 'completed', referenceNumber: 'ZN-OWN-WD-8812', fee: 0 },
    { id: 'ow_103', amount: 250000.00, currency: 'PKR', method: 'JazzCash Direct Merchant Wallet', account: '0300-8492019', timestamp: '2026-10-18 16:45', status: 'completed', referenceNumber: 'ZN-OWN-WD-7719', fee: 0 },
  ],
  deposits: [
    { id: 'od_201', amount: 20000.00, currency: 'USD', source: 'Corporate Treasury Capital Reserves', timestamp: '2026-10-15 09:00', status: 'completed', referenceNumber: 'ZN-OWN-DEP-1102' },
    { id: 'od_202', amount: 1000000.00, currency: 'PKR', source: 'HBL Liquidity Injection', timestamp: '2026-10-10 12:20', status: 'completed', referenceNumber: 'ZN-OWN-DEP-0981' },
  ],
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Routing
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('zaynoor_lang') as Language) || 'en';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [appMode, setAppMode] = useState<'web' | 'mobile_app'>('web');
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // User & Auth
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zaynoor_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Financial Ledger
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('zaynoor_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() => {
    const saved = localStorage.getItem('zaynoor_ben');
    return saved ? JSON.parse(saved) : INITIAL_BENEFICIARIES;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [providers, setProviders] = useState<PaymentProviderConfig[]>(INITIAL_PROVIDERS);
  const [activeReceipt, setActiveReceipt] = useState<Transaction | null>(null);

  // Owner Wallet & Zero-Investment Earning Streams
  const [ownerWallet, setOwnerWallet] = useState<import('../types').OwnerWallet>(() => {
    const saved = localStorage.getItem('zaynoor_owner_wallet');
    return saved ? JSON.parse(saved) : INITIAL_OWNER_WALLET;
  });
  const [earningStreams] = useState<import('../types').EarningStream[]>(INITIAL_EARNING_STREAMS);

  useEffect(() => {
    localStorage.setItem('zaynoor_owner_wallet', JSON.stringify(ownerWallet));
  }, [ownerWallet]);

  // Sync Language & RTL direction
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('zaynoor_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language]);

  // Sync hash changes with navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Persist storage
  useEffect(() => {
    localStorage.setItem('zaynoor_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zaynoor_txs', JSON.stringify(transactions));
  }, [transactions]);

  const loginAsCustomer = () => {
    setIsAuthenticated(true);
    setIsAdmin(false);
    setUser(DEFAULT_USER);
    navigate('/dashboard');
  };

  const loginAsAdmin = () => {
    setIsAuthenticated(true);
    setIsAdmin(true);
    navigate('/admin');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  // Ledger Execution with Double-Entry and Idempotency
  const performTransaction = ({
    type,
    amount,
    currency,
    recipient,
    recipientAccount,
    category,
    note,
    customFee = 0,
  }: {
    type: Transaction['type'];
    amount: number;
    currency: CurrencyCode;
    recipient: string;
    recipientAccount?: string;
    category: Transaction['category'];
    note?: string;
    customFee?: number;
  }) => {
    if (amount <= 0) {
      return { success: false, error: 'Transaction amount must be greater than zero.' };
    }

    const currentBal = user.balances[currency] || 0;
    const isOutflow = ['send', 'withdraw', 'bill_payment', 'mobile_topup', 'merchant_qr'].includes(type);
    const totalRequired = amount + customFee;

    if (isOutflow && currentBal < totalRequired) {
      return { 
        success: false, 
        error: `Insufficient balance in ${currency}. Available: ${currency} ${currentBal.toLocaleString()}, required: ${currency} ${totalRequired.toLocaleString()}` 
      };
    }

    // Check tier daily/monthly limits
    if (isOutflow && user.tier === 1 && amount > 500) {
      return { success: false, error: 'Tier 1 account limit is $500 per transaction. Upgrade your KYC tier for larger limits.' };
    }

    // Generate unique verifiable reference and idempotency key
    const refNum = `ZN-REF-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(10000 + Math.random() * 90000)}`;
    const idempKey = `idemp_${Math.random().toString(36).substring(2, 15)}`;

    // Ledger double entry simulation
    const doubleEntryLegs = isOutflow ? [
      { debitAccount: `usr_wallet_${currency.toLowerCase()}`, creditAccount: 'clearing_settlement', amount },
      ...(customFee > 0 ? [{ debitAccount: `usr_wallet_${currency.toLowerCase()}`, creditAccount: 'fee_revenue', amount: customFee }] : [])
    ] : [
      { debitAccount: 'inbound_clearing', creditAccount: `usr_wallet_${currency.toLowerCase()}`, amount }
    ];

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type,
      title: type === 'send' ? `Transfer to ${recipient}` :
             type === 'receive' ? `Received from ${recipient}` :
             type === 'add_money' ? `Deposit via ${recipient}` :
             type === 'withdraw' ? `Withdrawal to ${recipient}` :
             type === 'bill_payment' ? `Utility Bill: ${recipient}` :
             type === 'mobile_topup' ? `Mobile Recharge: ${recipient}` :
             `Merchant Payment: ${recipient}`,
      amount,
      currency,
      fee: customFee,
      netAmount: isOutflow ? totalRequired : amount,
      recipient,
      recipientAccount,
      sender: user.name,
      status: 'completed',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      category,
      referenceNumber: refNum,
      idempotencyKey: idempKey,
      note: note || (isOutflow ? 'Wallet transaction' : 'Inbound settlement'),
      doubleEntryLegs,
    };

    // Update User Balance
    const newBalances = { ...user.balances };
    if (isOutflow) {
      newBalances[currency] = parseFloat((currentBal - totalRequired).toFixed(2));
    } else {
      newBalances[currency] = parseFloat((currentBal + amount).toFixed(2));
    }

    setUser(prev => ({
      ...prev,
      balances: newBalances,
      monthlyLimitRemaining: Math.max(0, prev.monthlyLimitRemaining - amount)
    }));

    setTransactions(prev => [newTx, ...prev]);

    // Real-time zero-investment owner revenue accretion from platform transactions
    const earnedFee = customFee > 0 ? customFee : (type === 'bill_payment' ? 0.35 : (type === 'mobile_topup' ? 0.25 : (type === 'merchant_qr' ? 0.40 : 0.10)));
    setOwnerWallet(prev => {
      const updatedBal = { ...prev.balances };
      updatedBal[currency] = parseFloat(((updatedBal[currency] || 0) + earnedFee).toFixed(2));
      const usdRate = currency === 'USD' ? 1 : currency === 'PKR' ? (1 / 278) : currency === 'EUR' ? 1.08 : currency === 'GBP' ? 1.28 : 0.27;
      const usdEarned = parseFloat((earnedFee * usdRate).toFixed(2));
      return {
        ...prev,
        balances: updatedBal,
        totalEarnedAllTimeUsd: parseFloat((prev.totalEarnedAllTimeUsd + usdEarned).toFixed(2)),
        todayEarnedUsd: parseFloat((prev.todayEarnedUsd + usdEarned).toFixed(2)),
        revenueBreakdown: {
          ...prev.revenueBreakdown,
          transactionFees: prev.revenueBreakdown.transactionFees + (type === 'send' ? usdEarned : 0),
          billerCommissions: prev.revenueBreakdown.billerCommissions + (type === 'bill_payment' || type === 'mobile_topup' ? usdEarned : 0),
          merchantMdr: prev.revenueBreakdown.merchantMdr + (type === 'merchant_qr' ? usdEarned : 0),
        }
      };
    });

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `${type === 'send' ? 'Funds Sent' : 'Transaction Success'}`,
      message: `${currency} ${amount.toLocaleString()} processed successfully. Ref: ${refNum}`,
      type: 'transaction',
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Audit log entry
    const newAudit: AuditLog = {
      id: `aud_${Date.now()}`,
      adminEmail: 'ledger_service',
      action: `TX_${type.toUpperCase()}`,
      targetId: newTx.id,
      ipAddress: '127.0.0.1',
      timestamp: newTx.timestamp,
      status: 'success',
      details: `Double entry balanced. Debit/Credit: ${currency} ${amount}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C8102E', '#D6B36A', '#101A33']
      });
    } catch {
      // ignore
    }

    // Auto open receipt
    setActiveReceipt(newTx);

    return { success: true, transaction: newTx };
  };

  const openReceipt = (tx: Transaction) => setActiveReceipt(tx);
  const closeReceipt = () => setActiveReceipt(null);

  const addBeneficiary = (ben: Omit<Beneficiary, 'id'>) => {
    const newBen: Beneficiary = {
      ...ben,
      id: `ben_${Date.now()}`
    };
    setBeneficiaries(prev => [newBen, ...prev]);
  };

  const removeBeneficiary = (id: string) => {
    setBeneficiaries(prev => prev.filter(b => b.id !== id));
  };

  const toggleFavoriteBeneficiary = (id: string) => {
    setBeneficiaries(prev => prev.map(b => b.id === id ? { ...b, isFavorite: !b.isFavorite } : b));
  };

  const createTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'lastUpdated' | 'status' | 'messages'>, initialMessage: string) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      lastUpdated: 'Just now',
      status: 'open',
      messages: [{
        id: `msg_${Date.now()}`,
        sender: 'user',
        senderName: user.name,
        text: initialMessage,
        timestamp: 'Just now'
      }]
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const replyTicket = (ticketId: string, message: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          lastUpdated: 'Just now',
          messages: [
            ...t.messages,
            {
              id: `msg_${Date.now()}`,
              sender: 'user',
              senderName: user.name,
              text: message,
              timestamp: 'Just now'
            }
          ]
        };
      }
      return t;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleProviderStatus = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'connected_sandbox' ? 'connected_live' :
                           p.status === 'connected_live' ? 'inactive' : 'connected_sandbox';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const adminApproveKyc = (userId: string) => {
    if (user.id === userId) {
      setUser(prev => ({ ...prev, kycStatus: 'verified', tier: 3, monthlyLimitTotal: 100000, monthlyLimitRemaining: 98000 }));
    }
  };

  const ownerDeposit = ({
    amount,
    currency,
    source,
  }: {
    amount: number;
    currency: CurrencyCode;
    source: string;
  }) => {
    if (amount <= 0) {
      return { success: false, error: 'Deposit amount must be greater than zero.' };
    }
    const refNum = `ZN-OWN-DEP-${Date.now().toString().slice(-6)}`;
    const newDep = {
      id: `od_${Date.now()}`,
      amount,
      currency,
      source,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'completed' as const,
      referenceNumber: refNum,
    };

    setOwnerWallet(prev => {
      const updatedBal = { ...prev.balances };
      updatedBal[currency] = parseFloat(((updatedBal[currency] || 0) + amount).toFixed(2));
      return {
        ...prev,
        balances: updatedBal,
        deposits: [newDep, ...prev.deposits],
      };
    });

    const notif: NotificationItem = {
      id: `notif_dep_${Date.now()}`,
      title: 'Owner Treasury Deposit Success',
      message: `Successfully deposited ${currency} ${amount.toLocaleString()} from ${source}. Ref: ${refNum}`,
      type: 'transaction',
      read: false,
      timestamp: 'Just now',
    };
    setNotifications(prev => [notif, ...prev]);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#D6B36A', '#C8102E', '#16845B']
      });
    } catch {}

    return { success: true };
  };

  const ownerWithdraw = ({
    amount,
    currency,
    method,
    account,
  }: {
    amount: number;
    currency: CurrencyCode;
    method: string;
    account: string;
  }) => {
    if (amount <= 0) {
      return { success: false, error: 'Withdrawal amount must be greater than zero.' };
    }
    const currentBal = ownerWallet.balances[currency] || 0;
    if (currentBal < amount) {
      return {
        success: false,
        error: `Insufficient treasury balance in ${currency}. Available: ${currency} ${currentBal.toLocaleString()}, requested: ${currency} ${amount.toLocaleString()}`
      };
    }

    const refNum = `ZN-OWN-WD-${Date.now().toString().slice(-6)}`;
    const newWd = {
      id: `ow_${Date.now()}`,
      amount,
      currency,
      method,
      account,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'completed' as const,
      referenceNumber: refNum,
      fee: 0,
    };

    setOwnerWallet(prev => {
      const updatedBal = { ...prev.balances };
      updatedBal[currency] = parseFloat(((updatedBal[currency] || 0) - amount).toFixed(2));
      return {
        ...prev,
        balances: updatedBal,
        withdrawals: [newWd, ...prev.withdrawals],
      };
    });

    const notif: NotificationItem = {
      id: `notif_wd_${Date.now()}`,
      title: 'Owner Profit Withdrawal Dispatched',
      message: `Zero-fee payout of ${currency} ${amount.toLocaleString()} dispatched to ${method} (${account}). Ref: ${refNum}`,
      type: 'transaction',
      read: false,
      timestamp: 'Just now',
    };
    setNotifications(prev => [notif, ...prev]);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D6B36A', '#16845B', '#101A33']
      });
    } catch {}

    return { success: true };
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        appMode,
        setAppMode,
        demoMode,
        setDemoMode,
        user,
        isAuthenticated,
        isAdmin,
        loginAsCustomer,
        loginAsAdmin,
        logout,
        updateUser,
        transactions,
        performTransaction,
        activeReceipt,
        openReceipt,
        closeReceipt,
        beneficiaries,
        addBeneficiary,
        removeBeneficiary,
        toggleFavoriteBeneficiary,
        tickets,
        createTicket,
        replyTicket,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        auditLogs,
        providers,
        toggleProviderStatus,
        adminApproveKyc,
        ownerWallet,
        earningStreams,
        ownerDeposit,
        ownerWithdraw,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
