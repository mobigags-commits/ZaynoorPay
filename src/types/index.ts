export type CurrencyCode = 'USD' | 'PKR' | 'EUR' | 'GBP' | 'AED' | 'SAR';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'customer' | 'admin';
  tier: 1 | 2 | 3; // Tier 1: Basic ($500/day), Tier 2: Verified ($5,000/day), Tier 3: Unlimited/Business
  kycStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  transactionPinSet: boolean;
  country: string;
  createdAt: string;
  balances: Record<CurrencyCode, number>;
  monthlyLimitRemaining: number;
  monthlyLimitTotal: number;
}

export type TransactionType = 
  | 'send' 
  | 'receive' 
  | 'add_money' 
  | 'withdraw' 
  | 'bill_payment' 
  | 'mobile_topup' 
  | 'merchant_qr';

export type TransactionStatus = 'completed' | 'pending' | 'flagged' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  currency: CurrencyCode;
  fee: number;
  netAmount: number;
  recipient: string;
  sender: string;
  recipientAccount?: string;
  status: TransactionStatus;
  timestamp: string;
  category: 'transfer' | 'utility' | 'mobile' | 'merchant' | 'deposit' | 'withdrawal';
  referenceNumber: string;
  idempotencyKey: string;
  note?: string;
  doubleEntryLegs: {
    debitAccount: string;
    creditAccount: string;
    amount: number;
  }[];
}

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bankOrWallet: string;
  currency: CurrencyCode;
  isFavorite: boolean;
  avatarInitials: string;
  type: 'zaynoor' | 'bank' | 'mobile_wallet';
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'transaction' | 'account' | 'security' | 'billing' | 'kyc';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  lastUpdated: string;
  messages: {
    id: string;
    sender: 'user' | 'support';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'transaction' | 'security' | 'system' | 'promotion';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  targetId: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'warning' | 'alert';
  details: string;
}

export interface PaymentProviderConfig {
  id: string;
  name: string;
  type: 'card_rail' | 'bank_switch' | 'instant_payment' | 'open_banking';
  status: 'connected_sandbox' | 'connected_live' | 'inactive';
  endpoint: string;
  webhookVerified: boolean;
  supportedCurrencies: CurrencyCode[];
  rateLimitPerSec: number;
}

export interface EarningStream {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  category: 'transaction_fees' | 'fx_spread' | 'adsense' | 'biller_commissions' | 'merchant_mdr' | 'card_interchange' | 'bank_referrals' | 'premium_tiers';
  currentRate: string;
  totalEarnedUsd: number;
  totalEarnedPkr: number;
  status: 'active' | 'generating';
  noInvestmentTag: boolean;
}

export interface OwnerWallet {
  balances: Record<CurrencyCode, number>;
  totalEarnedAllTimeUsd: number;
  todayEarnedUsd: number;
  revenueBreakdown: {
    transactionFees: number;
    fxSpreadMargins: number;
    adSenseRevenue: number;
    billerCommissions: number;
    merchantMdr: number;
    cardInterchange: number;
    bankReferrals: number;
    premiumTiers: number;
  };
  payoutMethods: {
    id: string;
    type: 'bank' | 'jazzcash' | 'easypaisa' | 'payoneer' | 'crypto_usdt' | 'wire';
    title: string;
    accountDetails: string;
    currency: CurrencyCode;
    isDefault: boolean;
  }[];
  withdrawals: {
    id: string;
    amount: number;
    currency: CurrencyCode;
    method: string;
    account: string;
    timestamp: string;
    status: 'completed' | 'processing';
    referenceNumber: string;
    fee: number;
  }[];
  deposits: {
    id: string;
    amount: number;
    currency: CurrencyCode;
    source: string;
    timestamp: string;
    status: 'completed';
    referenceNumber: string;
  }[];
}

