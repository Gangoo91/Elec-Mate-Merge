import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  PoundSterling,
  Users,
  Gauge,
  Palette,
  Loader2,
  Calendar,
  Award,
  Shield,
  Plus,
  Trash2,
  Upload,
  Pen,
  Check,
  ChevronDown,
  ChevronRight,
  X,
  Coins,
  CheckCircle,
  CreditCard,
  Landmark,
  Zap,
  Clock,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { WorkerRates, TestingInstrument } from '@/types/company';
import { AccountingProvider, ACCOUNTING_PROVIDERS, AccountingIntegration } from '@/types/accounting';
import { useAccountingIntegrations } from '@/hooks/useAccountingIntegrations';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link2Off, RefreshCw, Calculator } from 'lucide-react';

// ============================================================================
// CONSTANTS & CONFIG
// ============================================================================

const WORKER_TYPE_LABELS: Record<keyof WorkerRates, { name: string; description: string }> = {
  electrician: { name: 'Qualified Electrician', description: 'Fully qualified' },
  apprentice: { name: 'Apprentice', description: 'Under supervision' },
  labourer: { name: 'General Labourer', description: 'General support' },
  designer: { name: 'Electrical Designer', description: 'Design specialist' },
  owner: { name: 'Business Owner', description: 'Senior electrician' },
};

const DEFAULT_WORKER_RATES: WorkerRates = {
  electrician: 45,
  apprentice: 25,
  labourer: 20,
  designer: 65,
  owner: 75,
};

const REGISTRATION_SCHEMES = [
  { value: 'NICEIC', label: 'NICEIC' },
  { value: 'NAPIT', label: 'NAPIT' },
  { value: 'ELECSA', label: 'ELECSA' },
  { value: 'STROMA', label: 'STROMA' },
  { value: 'BRE', label: 'BRE' },
  { value: 'OFTEC', label: 'OFTEC' },
  { value: 'other', label: 'Other' },
];

const INSTRUMENT_TYPES = [
  { value: 'multifunction', label: 'Multifunction Tester (MFT)' },
  { value: 'insulation', label: 'Insulation Resistance Tester' },
  { value: 'loop_impedance', label: 'Loop Impedance Tester' },
  { value: 'rcd', label: 'RCD Tester' },
  { value: 'pat', label: 'PAT Tester' },
  { value: 'clamp_meter', label: 'Clamp Meter' },
  { value: 'other', label: 'Other' },
];

const AVAILABLE_QUALIFICATIONS = [
  // Core Qualifications
  '18th Edition BS7671',
  'City & Guilds 2365 Level 2',
  'City & Guilds 2365 Level 3',
  'City & Guilds 2330 Level 2',
  'City & Guilds 2330 Level 3',
  'NVQ Level 3 Electrical Installation',
  'AM2 Assessment',
  // Inspection & Testing
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'City & Guilds 2394/2395',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 3 Initial Verification',
  'EAL Level 3 Periodic Inspection',
  // PAT Testing
  'City & Guilds 2377 PAT Testing',
  'PAT Testing Certified',
  // Scheme Memberships
  'NICEIC Approved',
  'NICEIC Domestic Installer',
  'NAPIT Registered',
  'ELECSA Registered',
  'ECA Member',
  'SELECT Member',
  'JIB Approved',
  'JIB Graded Electrician',
  // Specialist
  'CompEx Certified',
  'EV Charging Installation',
  'Solar PV Installation',
  'Battery Storage Installation',
  'Fire Alarm (BS 5839)',
  'Emergency Lighting (BS 5266)',
  'Data & Fibre Installation',
];

const INSURANCE_PROVIDERS = [
  'Zurich',
  'Hiscox',
  'AXA',
  'Aviva',
  'Allianz',
  'Markel',
  'NFU Mutual',
  'QBE',
  'Tradesman Saver',
  'Simply Business',
  'PolicyBee',
  'Kingsbridge',
  'Other',
];

const INSURANCE_COVERAGE_OPTIONS = [
  '£1,000,000',
  '£2,000,000',
  '£5,000,000',
  '£10,000,000',
];

const DEFAULT_TERMS_GROUPED = {
  payment: {
    label: 'Payment Terms',
    terms: [
      { id: 'payment_30', label: 'Payment due within 30 days of invoice date' },
      { id: 'deposit_required', label: 'A deposit of the specified percentage is required before work commences' },
      { id: 'additional_charges', label: 'Additional work not included in this quote will be charged at our standard hourly rate' },
    ],
  },
  warranty: {
    label: 'Warranty & Guarantee',
    terms: [
      { id: 'warranty_workmanship', label: 'All workmanship is guaranteed for the warranty period specified' },
      { id: 'warranty_materials', label: 'Materials are covered by manufacturer warranties where applicable' },
    ],
  },
  compliance: {
    label: 'Compliance & Certification',
    terms: [
      { id: 'bs7671_compliance', label: 'All electrical work complies with BS 7671 (18th Edition) Wiring Regulations' },
      { id: 'part_p_notification', label: 'Building control notification (Part P) included where required' },
      { id: 'testing_cert', label: 'Electrical installation certificate or minor works certificate provided on completion' },
    ],
  },
  site: {
    label: 'Site Access & Safety',
    terms: [
      { id: 'access_required', label: 'Clear access to work areas must be provided' },
      { id: 'power_isolation', label: 'Power may need to be isolated during installation - advance notice will be given' },
      { id: 'site_safety', label: 'Work area will be left safe and clean at the end of each working day' },
      { id: 'asbestos_disclaimer', label: 'This quote excludes work involving asbestos - if discovered, work will stop pending survey' },
    ],
  },
  general: {
    label: 'General Conditions',
    terms: [
      { id: 'price_validity', label: 'This quotation is valid for the number of days specified from the date of issue' },
      { id: 'cancellation', label: 'Cancellation within 48 hours of scheduled work may incur charges' },
      { id: 'unforeseen_works', label: 'Unforeseen works discovered during installation will be quoted separately' },
    ],
  },
};

const ALL_DEFAULT_TERM_IDS = Object.values(DEFAULT_TERMS_GROUPED).flatMap(group => group.terms.map(t => t.id));

// Default Invoice T&Cs - specific to invoices
const DEFAULT_INVOICE_TERMS_GROUPED = {
  payment: {
    label: 'Payment Terms',
    terms: [
      { id: 'inv_payment_due', label: 'Payment is due within the period specified above' },
      { id: 'inv_use_reference', label: 'Please use invoice number as payment reference' },
      { id: 'inv_bank_transfer', label: 'Bank transfer is the preferred payment method' },
    ],
  },
  late_payment: {
    label: 'Late Payment',
    terms: [
      { id: 'inv_late_interest', label: 'Late payment interest may be charged on overdue invoices' },
      { id: 'inv_debt_recovery', label: 'We reserve the right to recover debt collection costs under the Late Payment of Commercial Debts Act' },
      { id: 'inv_credit_hold', label: 'Future work may be suspended if invoices remain unpaid' },
    ],
  },
  warranty: {
    label: 'Warranty & Guarantees',
    terms: [
      { id: 'inv_workmanship', label: 'All workmanship guaranteed as per original quotation' },
      { id: 'inv_compliance', label: 'All work complies with BS 7671 (18th Edition)' },
      { id: 'inv_certificates', label: 'Relevant certificates have been provided separately' },
    ],
  },
  general: {
    label: 'General',
    terms: [
      { id: 'inv_queries', label: 'Queries to be raised within 7 days of invoice date' },
      { id: 'inv_thank_you', label: 'Thank you for your business' },
    ],
  },
};

const ALL_DEFAULT_INVOICE_TERM_IDS = Object.values(DEFAULT_INVOICE_TERMS_GROUPED).flatMap(group => group.terms.map(t => t.id));

interface CustomTerm {
  id: string;
  label: string;
}

function parseQuoteTerms(quoteTermsJson: string | undefined | null): { selected: string[]; custom: CustomTerm[] } {
  if (!quoteTermsJson) {
    return {
      selected: ['payment_30', 'deposit_required', 'warranty_workmanship', 'bs7671_compliance', 'testing_cert', 'price_validity'],
      custom: [],
    };
  }
  try {
    const parsed = JSON.parse(quoteTermsJson);
    if (parsed.selected && Array.isArray(parsed.selected)) {
      return { selected: parsed.selected, custom: parsed.custom || [] };
    }
    return { selected: ['payment_30', 'warranty_workmanship', 'bs7671_compliance'], custom: [] };
  } catch {
    return { selected: ['payment_30', 'warranty_workmanship', 'bs7671_compliance'], custom: [] };
  }
}

function parseInvoiceTerms(invoiceTermsJson: string | undefined | null): { selected: string[]; custom: CustomTerm[] } {
  if (!invoiceTermsJson) {
    return {
      selected: ['inv_payment_due', 'inv_use_reference', 'inv_late_interest', 'inv_workmanship', 'inv_compliance', 'inv_queries'],
      custom: [],
    };
  }
  try {
    const parsed = JSON.parse(invoiceTermsJson);
    if (parsed.selected && Array.isArray(parsed.selected)) {
      return { selected: parsed.selected, custom: parsed.custom || [] };
    }
    return { selected: ['inv_payment_due', 'inv_use_reference', 'inv_late_interest'], custom: [] };
  } catch {
    return { selected: ['inv_payment_due', 'inv_use_reference', 'inv_late_interest'], custom: [] };
  }
}

// ============================================================================
// SECTION COMPONENT - Collapsible Card
// ============================================================================

interface SectionProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  badge?: string;
  badgeColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Section = ({ title, icon: Icon, iconColor, iconBg, badge, badgeColor = 'text-white/50', defaultOpen = false, children }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[#1c1c1e] border border-white/[0.08] overflow-hidden"
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 active:bg-white/[0.02] transition-colors touch-manipulation">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
                <Icon className={cn("h-5 w-5", iconColor)} />
              </div>
              <div className="text-left">
                <h3 className="text-[15px] font-semibold text-white">{title}</h3>
                {badge && (
                  <p className={cn("text-[13px]", badgeColor)}>{badge}</p>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-white/30" />
            </motion.div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-5 pt-1">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

// ============================================================================
// FORM DATA INTERFACE
// ============================================================================

interface FormData {
  company_name: string;
  company_address: string;
  company_postcode: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_registration: string;
  vat_number: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  currency: string;
  locale: string;
  payment_terms: string;
  hourly_rate: number;
  worker_rates: WorkerRates;
  quote_validity_days: number;
  warranty_period: string;
  deposit_percentage: number;
  inspector_name: string;
  inspector_qualifications: string[];
  registration_scheme: string;
  registration_number: string;
  registration_expiry: string;
  insurance_provider: string;
  insurance_policy_number: string;
  insurance_coverage: string;
  insurance_expiry: string;
  signature_data: string;
}

interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
}

interface StripeConnectStatus {
  connected: boolean;
  status: 'not_connected' | 'pending' | 'active' | 'restricted';
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const BusinessTab = () => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
  const { addNotification } = useNotifications();
  const [isSaving, setIsSaving] = useState(false);

  // Logo state
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [logoSize, setLogoSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Testing instruments
  const [instruments, setInstruments] = useState<TestingInstrument[]>([]);

  // T&Cs state (Quotes)
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [customTerms, setCustomTerms] = useState<CustomTerm[]>([]);
  const [newCustomTerm, setNewCustomTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['payment', 'compliance']);

  // Invoice T&Cs state
  const [selectedInvoiceTerms, setSelectedInvoiceTerms] = useState<string[]>([]);
  const [customInvoiceTerms, setCustomInvoiceTerms] = useState<CustomTerm[]>([]);
  const [newCustomInvoiceTerm, setNewCustomInvoiceTerm] = useState('');
  const [expandedInvoiceGroups, setExpandedInvoiceGroups] = useState<string[]>(['payment', 'late_payment']);
  const [latePaymentInterestRate, setLatePaymentInterestRate] = useState('8% p.a.');
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState('Bank Transfer');

  // Bank details
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: '',
    bankName: '',
    accountNumber: '',
    sortCode: '',
  });

  // Stripe Connect
  const [stripeStatus, setStripeStatus] = useState<StripeConnectStatus | null>(null);
  const [stripeLoading, setStripeLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  // Accounting integrations
  const {
    integrations: accountingIntegrations,
    loading: accountingLoading,
    connecting: accountingConnecting,
    hasConnectedProvider,
    connectProvider,
    disconnectProvider,
    refreshStatus: refreshAccountingStatus,
    isProviderConnected,
    getIntegration,
  } = useAccountingIntegrations();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    defaultValues: {
      company_name: '',
      company_address: '',
      company_postcode: '',
      company_phone: '',
      company_email: '',
      company_website: '',
      company_registration: '',
      vat_number: '',
      primary_color: '#FFCC00',
      secondary_color: '#1A1A1A',
      accent_color: '#F59E0B',
      currency: 'GBP',
      locale: 'en-GB',
      payment_terms: '30 days',
      hourly_rate: 45,
      worker_rates: DEFAULT_WORKER_RATES,
      quote_validity_days: 30,
      warranty_period: '12 months',
      deposit_percentage: 30,
      inspector_name: '',
      inspector_qualifications: [],
      registration_scheme: '',
      registration_number: '',
      registration_expiry: '',
      insurance_provider: '',
      insurance_policy_number: '',
      insurance_coverage: '',
      insurance_expiry: '',
      signature_data: '',
    }
  });

  // Check Stripe status
  useEffect(() => {
    const checkStripeStatus = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          setStripeStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false });
          setStripeLoading(false);
          return;
        }

        const response = await supabase.functions.invoke('get-stripe-connect-status', {
          headers: { Authorization: `Bearer ${session.session.access_token}` },
        });

        if (response.error) throw response.error;
        setStripeStatus(response.data as StripeConnectStatus);
      } catch (error) {
        console.error('Error checking Stripe status:', error);
        setStripeStatus({ connected: false, status: 'not_connected', chargesEnabled: false, payoutsEnabled: false });
      } finally {
        setStripeLoading(false);
      }
    };

    checkStripeStatus();
    const handleFocus = () => checkStripeStatus();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Populate from profile
  useEffect(() => {
    if (companyProfile) {
      setValue('company_name', companyProfile.company_name || '');
      setValue('company_address', companyProfile.company_address || '');
      setValue('company_postcode', companyProfile.company_postcode || '');
      setValue('company_phone', companyProfile.company_phone || '');
      setValue('company_email', companyProfile.company_email || '');
      setValue('company_website', companyProfile.company_website || '');
      setValue('company_registration', companyProfile.company_registration || '');
      setValue('vat_number', companyProfile.vat_number || '');
      setValue('primary_color', companyProfile.primary_color || '#FFCC00');
      setValue('secondary_color', companyProfile.secondary_color || '#1A1A1A');
      setValue('accent_color', companyProfile.accent_color || '#F59E0B');
      setValue('currency', companyProfile.currency || 'GBP');
      setValue('locale', companyProfile.locale || 'en-GB');
      setValue('payment_terms', companyProfile.payment_terms || '30 days');
      setValue('hourly_rate', companyProfile.hourly_rate || 45);
      setValue('worker_rates', companyProfile.worker_rates || DEFAULT_WORKER_RATES);
      setValue('quote_validity_days', companyProfile.quote_validity_days || 30);
      setValue('warranty_period', companyProfile.warranty_period || '12 months');
      setValue('deposit_percentage', companyProfile.deposit_percentage ?? 30);
      setValue('inspector_name', companyProfile.inspector_name || '');
      setValue('inspector_qualifications', companyProfile.inspector_qualifications || []);
      setValue('registration_scheme', companyProfile.registration_scheme || '');
      setValue('registration_number', companyProfile.registration_number || '');
      setValue('registration_expiry', companyProfile.registration_expiry || '');
      setValue('insurance_provider', companyProfile.insurance_provider || '');
      setValue('insurance_policy_number', companyProfile.insurance_policy_number || '');
      setValue('insurance_coverage', companyProfile.insurance_coverage || '');
      setValue('insurance_expiry', companyProfile.insurance_expiry || '');
      setValue('signature_data', companyProfile.signature_data || '');
      setLogoPreview(companyProfile.logo_url || null);
      setLogoSize((companyProfile as any).logo_size || 'medium');

      if (companyProfile.testing_instruments) {
        setInstruments(companyProfile.testing_instruments);
      }

      if (companyProfile.bank_details) {
        setBankDetails({
          accountName: companyProfile.bank_details.accountName || '',
          bankName: companyProfile.bank_details.bankName || '',
          accountNumber: companyProfile.bank_details.accountNumber || '',
          sortCode: companyProfile.bank_details.sortCode || '',
        });
      }

      const parsedTerms = parseQuoteTerms(companyProfile.quote_terms);
      setSelectedTerms(parsedTerms.selected);
      setCustomTerms(parsedTerms.custom);

      // Invoice settings
      const parsedInvoiceTerms = parseInvoiceTerms(companyProfile.invoice_terms);
      setSelectedInvoiceTerms(parsedInvoiceTerms.selected);
      setCustomInvoiceTerms(parsedInvoiceTerms.custom);
      setLatePaymentInterestRate(companyProfile.late_payment_interest_rate || '8% p.a.');
      setPreferredPaymentMethod(companyProfile.preferred_payment_method || 'Bank Transfer');
    }
  }, [companyProfile, setValue]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddInstrument = () => {
    const newInstrument: TestingInstrument = {
      id: `inst_${Date.now()}`,
      instrument_type: 'multifunction',
      make: '',
      model: '',
      serial_number: '',
      calibration_date: '',
      calibration_due: '',
    };
    setInstruments(prev => [...prev, newInstrument]);
  };

  const handleRemoveInstrument = (id: string) => {
    setInstruments(prev => prev.filter(inst => inst.id !== id));
  };

  const handleInstrumentChange = (id: string, field: keyof TestingInstrument, value: string) => {
    setInstruments(prev => prev.map(inst =>
      inst.id === id ? { ...inst, [field]: value } : inst
    ));
  };

  const formatSortCode = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
  };

  const handleConnectStripe = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast.error('Please log in to connect Stripe');
        return;
      }

      const response = await supabase.functions.invoke('stripe-connect-oauth', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { action: 'get_oauth_url', returnUrl: window.location.href },
      });

      if (response.error) throw response.error;
      if (response.data?.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      console.error('Error connecting Stripe:', error);
      toast.error(error?.message || 'Failed to connect Stripe');
    } finally {
      setConnecting(false);
    }
  };

  const handleOpenStripeDashboard = async () => {
    try {
      setConnecting(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) return;

      const response = await supabase.functions.invoke('create-stripe-connect-account', {
        headers: { Authorization: `Bearer ${session.session.access_token}` },
        body: { returnUrl: window.location.href },
      });

      if (response.data?.url) {
        window.open(response.data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening Stripe dashboard:', error);
    } finally {
      setConnecting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    let logoData = {};

    if (logoFile) {
      setUploading(true);
      const uploadResult = await uploadLogo(logoFile);
      setUploading(false);

      if (uploadResult) {
        logoData = {
          logo_url: uploadResult.url,
          logo_data_url: uploadResult.dataUrl,
        };
        setLogoFile(null); // Clear the file after successful upload
      } else {
        // Upload failed - stop the save process
        setIsSaving(false);
        return;
      }
    }

    const quoteTermsJson = JSON.stringify({
      selected: selectedTerms,
      custom: customTerms,
    });

    const invoiceTermsJson = JSON.stringify({
      selected: selectedInvoiceTerms,
      custom: customInvoiceTerms,
    });

    // Build the profile data to save
    const profileData = {
      company_name: data.company_name,
      company_address: data.company_address,
      company_postcode: data.company_postcode,
      company_phone: data.company_phone,
      company_email: data.company_email,
      company_website: data.company_website,
      company_registration: data.company_registration,
      vat_number: data.vat_number,
      primary_color: data.primary_color,
      secondary_color: data.secondary_color,
      accent_color: data.accent_color || '#F59E0B',
      currency: data.currency,
      locale: data.locale,
      payment_terms: data.payment_terms,
      hourly_rate: data.hourly_rate,
      worker_rates: data.worker_rates || DEFAULT_WORKER_RATES,
      quote_validity_days: data.quote_validity_days || 30,
      warranty_period: data.warranty_period || '12 months',
      deposit_percentage: data.deposit_percentage ?? 30,
      quote_terms: quoteTermsJson,
      invoice_terms: invoiceTermsJson,
      late_payment_interest_rate: latePaymentInterestRate,
      preferred_payment_method: preferredPaymentMethod,
      bank_details: bankDetails,
      testing_instruments: instruments,
      inspector_name: data.inspector_name || null,
      inspector_qualifications: data.inspector_qualifications?.length > 0 ? data.inspector_qualifications : null,
      registration_scheme: data.registration_scheme || null,
      registration_number: data.registration_number || null,
      registration_expiry: data.registration_expiry || null,
      insurance_provider: data.insurance_provider || null,
      insurance_policy_number: data.insurance_policy_number || null,
      insurance_coverage: data.insurance_coverage || null,
      insurance_expiry: data.insurance_expiry || null,
      signature_data: data.signature_data || null,
      logo_size: logoSize,
      ...logoData,
    };

    console.log('[BusinessTab] Saving profile data:', profileData);

    try {
      const success = await saveCompanyProfile(profileData);

      if (success) {
        addNotification({
          title: 'Settings Saved',
          message: 'Your business settings have been saved.',
          type: 'success'
        });
      } else {
        addNotification({
          title: 'Save Failed',
          message: 'Could not save settings. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('[BusinessTab] Failed to save business settings:', error);
      addNotification({
        title: 'Save Failed',
        message: 'Could not save settings. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl bg-[#1c1c1e] border border-white/[0.08] h-20" />
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/10 to-orange-500/5 border border-elec-yellow/20 p-5"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center">
            <Building2 className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Business Settings</h2>
            <p className="text-[13px] text-white/60 mt-0.5">
              Single source of truth for all your documents
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-elec-yellow/50" />
        </div>
      </motion.div>

      {/* Company Identity */}
      <Section
        title="Company Identity"
        icon={Building2}
        iconColor="text-blue-400"
        iconBg="bg-blue-500/15"
        badge={watch('company_name') || 'Not set'}
        badgeColor={watch('company_name') ? 'text-blue-400' : 'text-white/40'}
        defaultOpen={true}
      >
        <div className="space-y-5">
          {/* Logo Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={cn(
                "rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center overflow-hidden transition-all",
                logoSize === 'small' && "w-16 h-16",
                logoSize === 'medium' && "w-20 h-20",
                logoSize === 'large' && "w-28 h-28"
              )}>
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Building2 className={cn(
                    "text-white/20",
                    logoSize === 'small' && "h-6 w-6",
                    logoSize === 'medium' && "h-8 w-8",
                    logoSize === 'large' && "h-10 w-10"
                  )} />
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] transition-colors touch-manipulation">
                    <Upload className="h-4 w-4 text-white/50" />
                    <span className="text-[14px] text-white/70">Upload Logo</span>
                  </div>
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <p className="text-[11px] text-white/40 mt-1.5 px-1">PNG, JPG or HEIC, max 2MB</p>
              </div>
            </div>

            {/* Logo Size Options */}
            <div className="space-y-2">
              <Label className="text-[11px] text-white/40 font-medium">Logo Size on Documents</Label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setLogoSize(size)}
                    className={cn(
                      "flex-1 py-2 px-3 rounded-xl text-[13px] font-medium transition-all touch-manipulation capitalize",
                      logoSize === size
                        ? "bg-blue-500 text-white"
                        : "bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label className="text-[13px] text-white/50 font-medium">Company Name *</Label>
            <Input
              {...register('company_name', { required: 'Required' })}
              placeholder="ABC Electrical Ltd"
              className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
            />
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Email</Label>
              <Input
                {...register('company_email')}
                type="email"
                placeholder="info@company.com"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Phone</Label>
              <Input
                {...register('company_phone')}
                placeholder="0123 456 7890"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Website</Label>
              <Input
                {...register('company_website')}
                placeholder="www.company.com"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">VAT Number</Label>
              <Input
                {...register('vat_number')}
                placeholder="GB123456789"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label className="text-[13px] text-white/50 font-medium">Business Address</Label>
            <Textarea
              {...register('company_address')}
              placeholder="123 Business Street, Business Park"
              rows={2}
              className="text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Postcode</Label>
              <Input
                {...register('company_postcode')}
                placeholder="AB1 2CD"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Company Reg</Label>
              <Input
                {...register('company_registration')}
                placeholder="12345678"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Payment & Banking */}
      <Section
        title="Payment & Banking"
        icon={CreditCard}
        iconColor="text-green-400"
        iconBg="bg-green-500/15"
        badge={stripeStatus?.status === 'active' ? 'Stripe Connected' : bankDetails.accountNumber ? 'Bank details set' : 'Not configured'}
        badgeColor={stripeStatus?.status === 'active' ? 'text-green-400' : bankDetails.accountNumber ? 'text-green-400' : 'text-white/40'}
      >
        <div className="space-y-5">
          {/* Stripe Connect */}
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">Card Payments</p>
                  {stripeLoading ? (
                    <p className="text-[13px] text-white/50">Checking status...</p>
                  ) : stripeStatus?.status === 'active' ? (
                    <p className="text-[13px] text-green-400 flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Stripe Connected
                    </p>
                  ) : stripeStatus?.status === 'pending' ? (
                    <p className="text-[13px] text-amber-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Setup incomplete
                    </p>
                  ) : (
                    <p className="text-[13px] text-white/50">Accept card payments</p>
                  )}
                </div>
              </div>
              {stripeStatus?.status === 'active' ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenStripeDashboard}
                  disabled={connecting}
                  className="text-[13px] text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleConnectStripe}
                  disabled={connecting || stripeLoading}
                  className="h-9 px-4 text-[13px] bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  {connecting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Connect'}
                </Button>
              )}
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-cyan-400" />
              <Label className="text-[13px] text-white/70 font-medium">Bank Transfer Details</Label>
            </div>
            <p className="text-[12px] text-white/40 -mt-2">Appears on invoices for clients paying by BACS</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[13px] text-white/50 font-medium">Account Name</Label>
                <Input
                  value={bankDetails.accountName}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                  placeholder="ABC Electrical Ltd"
                  className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-cyan-500/50 focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] text-white/50 font-medium">Bank Name</Label>
                <Input
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  placeholder="e.g. Barclays"
                  className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-cyan-500/50 focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] text-white/50 font-medium">Sort Code</Label>
                <Input
                  value={bankDetails.sortCode}
                  onChange={(e) => setBankDetails({ ...bankDetails, sortCode: formatSortCode(e.target.value) })}
                  placeholder="12-34-56"
                  className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-cyan-500/50 focus:ring-0"
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[13px] text-white/50 font-medium">Account Number</Label>
                <Input
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value.replace(/\D/g, '').slice(0, 8) })}
                  placeholder="12345678"
                  className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-cyan-500/50 focus:ring-0"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Accounting Software */}
      <Section
        title="Accounting Software"
        icon={Calculator}
        iconColor="text-purple-400"
        iconBg="bg-purple-500/15"
        badge={hasConnectedProvider ? 'Connected' : 'Not connected'}
        badgeColor={hasConnectedProvider ? 'text-green-400' : 'text-white/40'}
      >
        <div className="space-y-4">
          <p className="text-[12px] text-white/40">
            Connect your accounting software to automatically sync invoices
          </p>

          {/* Accounting Integrations */}
          {(['xero', 'sage', 'quickbooks'] as AccountingProvider[]).map((providerId) => {
            const provider = ACCOUNTING_PROVIDERS[providerId];
            const integration = getIntegration(providerId);
            const isConnected = isProviderConnected(providerId);
            const isImplemented = providerId === 'xero' || providerId === 'sage' || providerId === 'quickbooks'; // Xero, Sage, and QuickBooks are implemented

            return (
              <div
                key={providerId}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  isConnected
                    ? 'bg-white/[0.04] border-green-500/30'
                    : isImplemented
                    ? 'bg-white/[0.02] border-white/[0.08]'
                    : 'bg-white/[0.01] border-white/[0.04] opacity-60'
                }`}
              >
                {/* Provider Logo */}
                <div className={`w-12 h-12 rounded-xl ${provider.bgColor} flex items-center justify-center flex-shrink-0 ${!isImplemented ? 'opacity-50' : ''}`}>
                  <span className={provider.logoColor}>
                    {providerId === 'xero' ? (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.894l-3.188-3.188 3.188-3.188a.75.75 0 10-1.06-1.06L12 12.645 9.166 9.81a.75.75 0 10-1.06 1.06l3.188 3.188-3.188 3.188a.75.75 0 101.06 1.06L12 14.118l2.834 2.836a.75.75 0 101.06-1.06z" />
                      </svg>
                    ) : providerId === 'sage' ? (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75a6.75 6.75 0 110-13.5 6.75 6.75 0 010 13.5zm0-10.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
                      </svg>
                    )}
                  </span>
                </div>

                {/* Provider Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] font-semibold ${isImplemented ? 'text-white' : 'text-white/70'}`}>
                    {provider.name}
                  </p>
                  {isConnected ? (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                      <span className="text-[13px] text-green-400">
                        {integration?.tenantName || 'Connected'}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[13px] text-white/50">
                      {isImplemented ? provider.description : 'Coming soon'}
                    </p>
                  )}
                </div>

                {/* Action Button */}
                {isImplemented ? (
                  isConnected ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (window.confirm(`Disconnect ${provider.name}? You can reconnect anytime.`)) {
                          disconnectProvider(providerId);
                        }
                      }}
                      disabled={accountingConnecting}
                      className="h-9 px-3 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      {accountingConnecting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Link2Off className="h-4 w-4 mr-1" />
                          Disconnect
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => connectProvider(providerId)}
                      disabled={accountingConnecting || accountingLoading}
                      className={`h-9 px-4 text-[13px] ${provider.bgColor} border border-current/30 hover:opacity-90 ${provider.logoColor}`}
                    >
                      {accountingConnecting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Connect
                        </>
                      )}
                    </Button>
                  )
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.05] text-[11px] font-medium text-white/40">
                    Soon
                  </span>
                )}
              </div>
            );
          })}

          {/* Help Text */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <p className="text-[11px] text-white/40">
              When connected, you can sync invoices to your accounting software directly from the invoice page. Contacts and line items are created automatically.
            </p>
          </div>
        </div>
      </Section>

      {/* Pricing & Rates */}
      <Section
        title="Pricing & Rates"
        icon={PoundSterling}
        iconColor="text-emerald-400"
        iconBg="bg-emerald-500/15"
        badge={`£${watch('hourly_rate') || 45}/hr default`}
        badgeColor="text-emerald-400"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Hourly Rate (£)</Label>
              <Input
                type="number"
                step="0.50"
                {...register('hourly_rate', { valueAsNumber: true })}
                placeholder="45"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-emerald-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Payment Terms</Label>
              <Select
                value={watch('payment_terms') || '30 days'}
                onValueChange={(value) => setValue('payment_terms', value)}
              >
                <SelectTrigger className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-emerald-500/50 focus:ring-0">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-white/[0.1]">
                  <SelectItem value="On receipt">Paid on receipt</SelectItem>
                  <SelectItem value="7 days">7 days</SelectItem>
                  <SelectItem value="14 days">14 days</SelectItem>
                  <SelectItem value="30 days">30 days</SelectItem>
                  <SelectItem value="60 days">60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Worker Rates */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />
              <Label className="text-[13px] text-white/70 font-medium">Worker Rates</Label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(Object.keys(WORKER_TYPE_LABELS) as Array<keyof WorkerRates>).map((workerKey) => {
                const worker = WORKER_TYPE_LABELS[workerKey];
                const rates = watch('worker_rates') || DEFAULT_WORKER_RATES;
                return (
                  <div key={workerKey} className="space-y-1.5">
                    <Label className="text-[11px] text-white/40 font-medium">{worker.name}</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[14px]">£</span>
                      <Input
                        type="number"
                        step="0.50"
                        value={rates[workerKey] || DEFAULT_WORKER_RATES[workerKey]}
                        onChange={(e) => {
                          const newRates = { ...rates, [workerKey]: parseFloat(e.target.value) || 0 };
                          setValue('worker_rates', newRates);
                        }}
                        className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl pl-7 focus:border-emerald-500/50 focus:ring-0"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Quote Settings */}
      <Section
        title="Quote Settings"
        icon={FileText}
        iconColor="text-amber-400"
        iconBg="bg-amber-500/15"
        badge={`${selectedTerms.length} T&Cs selected`}
        badgeColor="text-amber-400"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-[11px] text-white/40 font-medium">Validity (days)</Label>
              <Input
                type="number"
                {...register('quote_validity_days', { valueAsNumber: true })}
                placeholder="30"
                className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-amber-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] text-white/40 font-medium">Deposit %</Label>
              <Select
                value={String(watch('deposit_percentage') ?? 30)}
                onValueChange={(value) => setValue('deposit_percentage', parseInt(value, 10))}
              >
                <SelectTrigger className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-amber-500/50 focus:ring-0">
                  <SelectValue placeholder="Select deposit" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-white/[0.1]">
                  <SelectItem value="0">No deposit</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="100">Full payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] text-white/40 font-medium">Warranty</Label>
              <Input
                {...register('warranty_period')}
                placeholder="12 months"
                className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-amber-500/50 focus:ring-0"
              />
            </div>
          </div>

          {/* T&Cs Checklist */}
          <div className="space-y-3">
            <Label className="text-[13px] text-white/70 font-medium">Terms & Conditions</Label>
            {Object.entries(DEFAULT_TERMS_GROUPED).map(([groupKey, group]) => {
              const groupTermIds = group.terms.map(t => t.id);
              const selectedInGroup = groupTermIds.filter(id => selectedTerms.includes(id)).length;
              const isExpanded = expandedGroups.includes(groupKey);

              return (
                <Collapsible
                  key={groupKey}
                  open={isExpanded}
                  onOpenChange={(open) => {
                    setExpandedGroups(prev =>
                      open ? [...prev, groupKey] : prev.filter(g => g !== groupKey)
                    );
                  }}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors touch-manipulation">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-[13px] font-medium text-white">{group.label}</span>
                        <span className="text-[11px] text-white/40">({selectedInGroup}/{groupTermIds.length})</span>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 text-white/30 transition-transform", isExpanded && "rotate-180")} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-3 pt-2 space-y-1">
                      {group.terms.map((term) => {
                        const isSelected = selectedTerms.includes(term.id);
                        return (
                          <label
                            key={term.id}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02] cursor-pointer touch-manipulation"
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                setSelectedTerms(prev =>
                                  checked ? [...prev, term.id] : prev.filter(id => id !== term.id)
                                );
                              }}
                              className="mt-0.5 border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                            <span className="text-[13px] text-white/70 leading-relaxed">{term.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* Custom Terms */}
            {customTerms.length > 0 && (
              <div className="space-y-2 pt-2">
                {customTerms.map((term) => (
                  <div key={term.id} className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02]">
                    <Checkbox
                      checked={selectedTerms.includes(term.id)}
                      onCheckedChange={(checked) => {
                        setSelectedTerms(prev =>
                          checked ? [...prev, term.id] : prev.filter(id => id !== term.id)
                        );
                      }}
                      className="mt-0.5 border-white/30 data-[state=checked]:bg-amber-500"
                    />
                    <span className="flex-1 text-[13px] text-white/70">{term.label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomTerms(prev => prev.filter(t => t.id !== term.id));
                        setSelectedTerms(prev => prev.filter(id => id !== term.id));
                      }}
                      className="p-1 text-white/30 hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={newCustomTerm}
                onChange={(e) => setNewCustomTerm(e.target.value)}
                placeholder="Add custom term..."
                className="flex-1 h-10 text-[14px] bg-white/[0.04] border-white/[0.06] rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCustomTerm.trim()) {
                    e.preventDefault();
                    const newId = `custom_${Date.now()}`;
                    setCustomTerms(prev => [...prev, { id: newId, label: newCustomTerm.trim() }]);
                    setSelectedTerms(prev => [...prev, newId]);
                    setNewCustomTerm('');
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={!newCustomTerm.trim()}
                onClick={() => {
                  if (newCustomTerm.trim()) {
                    const newId = `custom_${Date.now()}`;
                    setCustomTerms(prev => [...prev, { id: newId, label: newCustomTerm.trim() }]);
                    setSelectedTerms(prev => [...prev, newId]);
                    setNewCustomTerm('');
                  }
                }}
                className="h-10 w-10 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Invoice Settings */}
      <Section
        title="Invoice Settings"
        icon={FileText}
        iconColor="text-cyan-400"
        iconBg="bg-cyan-500/15"
        badge={`${selectedInvoiceTerms.length} T&Cs selected`}
        badgeColor="text-cyan-400"
      >
        <div className="space-y-5">
          {/* Invoice-specific settings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-[11px] text-white/40 font-medium">Late Payment Interest</Label>
              <Input
                value={latePaymentInterestRate}
                onChange={(e) => setLatePaymentInterestRate(e.target.value)}
                placeholder="8% p.a."
                className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-cyan-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] text-white/40 font-medium">Preferred Payment</Label>
              <Input
                value={preferredPaymentMethod}
                onChange={(e) => setPreferredPaymentMethod(e.target.value)}
                placeholder="Bank Transfer"
                className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-cyan-500/50 focus:ring-0"
              />
            </div>
          </div>

          {/* Invoice T&Cs Checklist */}
          <div className="space-y-3">
            <Label className="text-[13px] text-white/70 font-medium">Invoice Terms & Conditions</Label>
            {Object.entries(DEFAULT_INVOICE_TERMS_GROUPED).map(([groupKey, group]) => {
              const groupTermIds = group.terms.map(t => t.id);
              const selectedInGroup = groupTermIds.filter(id => selectedInvoiceTerms.includes(id)).length;
              const isExpanded = expandedInvoiceGroups.includes(groupKey);

              return (
                <Collapsible
                  key={groupKey}
                  open={isExpanded}
                  onOpenChange={(open) => {
                    setExpandedInvoiceGroups(prev =>
                      open ? [...prev, groupKey] : prev.filter(g => g !== groupKey)
                    );
                  }}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors touch-manipulation">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-[13px] font-medium text-white">{group.label}</span>
                        <span className="text-[11px] text-white/40">({selectedInGroup}/{groupTermIds.length})</span>
                      </div>
                      <ChevronDown className={cn("h-4 w-4 text-white/30 transition-transform", isExpanded && "rotate-180")} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-3 pt-2 space-y-1">
                      {group.terms.map((term) => {
                        const isSelected = selectedInvoiceTerms.includes(term.id);
                        return (
                          <label
                            key={term.id}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02] cursor-pointer touch-manipulation"
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                setSelectedInvoiceTerms(prev =>
                                  checked ? [...prev, term.id] : prev.filter(id => id !== term.id)
                                );
                              }}
                              className="mt-0.5 border-white/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                            />
                            <span className="text-[13px] text-white/70 leading-relaxed">{term.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* Custom Invoice Terms */}
            {customInvoiceTerms.length > 0 && (
              <div className="space-y-2 pt-2">
                {customInvoiceTerms.map((term) => (
                  <div key={term.id} className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02]">
                    <Checkbox
                      checked={selectedInvoiceTerms.includes(term.id)}
                      onCheckedChange={(checked) => {
                        setSelectedInvoiceTerms(prev =>
                          checked ? [...prev, term.id] : prev.filter(id => id !== term.id)
                        );
                      }}
                      className="mt-0.5 border-white/30 data-[state=checked]:bg-cyan-500"
                    />
                    <span className="flex-1 text-[13px] text-white/70">{term.label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomInvoiceTerms(prev => prev.filter(t => t.id !== term.id));
                        setSelectedInvoiceTerms(prev => prev.filter(id => id !== term.id));
                      }}
                      className="p-1 text-white/30 hover:text-red-400"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={newCustomInvoiceTerm}
                onChange={(e) => setNewCustomInvoiceTerm(e.target.value)}
                placeholder="Add custom invoice term..."
                className="flex-1 h-10 text-[14px] bg-white/[0.04] border-white/[0.06] rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newCustomInvoiceTerm.trim()) {
                    e.preventDefault();
                    const newId = `inv_custom_${Date.now()}`;
                    setCustomInvoiceTerms(prev => [...prev, { id: newId, label: newCustomInvoiceTerm.trim() }]);
                    setSelectedInvoiceTerms(prev => [...prev, newId]);
                    setNewCustomInvoiceTerm('');
                  }
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={!newCustomInvoiceTerm.trim()}
                onClick={() => {
                  if (newCustomInvoiceTerm.trim()) {
                    const newId = `inv_custom_${Date.now()}`;
                    setCustomInvoiceTerms(prev => [...prev, { id: newId, label: newCustomInvoiceTerm.trim() }]);
                    setSelectedInvoiceTerms(prev => [...prev, newId]);
                    setNewCustomInvoiceTerm('');
                  }
                }}
                className="h-10 w-10 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Brand Colours */}
      <Section
        title="Brand Colours"
        icon={Palette}
        iconColor="text-pink-400"
        iconBg="bg-pink-500/15"
        badge="For documents"
        badgeColor="text-white/40"
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Primary', field: 'primary_color' as const },
            { label: 'Secondary', field: 'secondary_color' as const },
            { label: 'Accent', field: 'accent_color' as const },
          ].map(({ label, field }) => {
            const currentValue = watch(field) || '#FFCC00';
            return (
              <div key={field} className="space-y-2">
                <Label className="text-[11px] text-white/40 font-medium">{label}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentValue}
                    onChange={(e) => setValue(field, e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/[0.1] cursor-pointer bg-transparent"
                  />
                  <Input
                    value={currentValue}
                    onChange={(e) => setValue(field, e.target.value)}
                    className="flex-1 h-10 text-[13px] font-mono bg-white/[0.04] border-white/[0.06] rounded-lg uppercase"
                    maxLength={7}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Inspector Details */}
      <Section
        title="Inspector Details"
        icon={Shield}
        iconColor="text-blue-400"
        iconBg="bg-blue-500/15"
        badge="For certificates"
        badgeColor="text-white/40"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-[13px] text-white/50 font-medium">Inspector Name</Label>
              <Input
                {...register('inspector_name')}
                placeholder="Full name"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Registration Scheme</Label>
              <Select
                value={watch('registration_scheme') || ''}
                onValueChange={(value) => setValue('registration_scheme', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  {REGISTRATION_SCHEMES.map((scheme) => (
                    <SelectItem key={scheme.value} value={scheme.value}>{scheme.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[13px] text-white/50 font-medium">Registration Number</Label>
              <Input
                {...register('registration_number')}
                placeholder="NICEIC/12345"
                className="h-12 text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl focus:border-blue-500/50 focus:ring-0"
              />
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-3">
            <Label className="text-[13px] text-white/50 font-medium">Qualifications</Label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_QUALIFICATIONS.map((qual) => {
                const currentQuals = watch('inspector_qualifications') || [];
                const isSelected = currentQuals.includes(qual);
                return (
                  <button
                    key={qual}
                    type="button"
                    onClick={() => {
                      const updated = isSelected
                        ? currentQuals.filter((q: string) => q !== qual)
                        : [...currentQuals, qual];
                      setValue('inspector_qualifications', updated);
                    }}
                    className={cn(
                      "px-3 py-2 rounded-xl text-[13px] font-medium transition-all touch-manipulation",
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white/[0.04] text-white/60 border border-white/[0.08] hover:bg-white/[0.08]"
                    )}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 inline mr-1.5" />}
                    {qual}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Insurance */}
          <div className="space-y-3">
            <Label className="text-[13px] text-white/70 font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              Insurance Details
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={watch('insurance_provider') || ''}
                onValueChange={(value) => setValue('insurance_provider', value)}
              >
                <SelectTrigger className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-white/[0.1]">
                  {INSURANCE_PROVIDERS.map((provider) => (
                    <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={watch('insurance_coverage') || ''}
                onValueChange={(value) => setValue('insurance_coverage', value)}
              >
                <SelectTrigger className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl">
                  <SelectValue placeholder="Coverage" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-white/[0.1]">
                  {INSURANCE_COVERAGE_OPTIONS.map((coverage) => (
                    <SelectItem key={coverage} value={coverage}>{coverage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                {...register('insurance_policy_number')}
                placeholder="Policy number"
                className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl"
              />
              <Input
                type="date"
                {...register('insurance_expiry')}
                className="h-11 text-[15px] bg-white/[0.06] border-white/[0.08] rounded-xl"
              />
            </div>
          </div>

          {/* Signature */}
          <div className="space-y-3">
            <Label className="text-[13px] text-white/70 font-medium flex items-center gap-2">
              <Pen className="h-4 w-4 text-blue-400" />
              Signature
            </Label>
            <SignatureInput
              value={watch('signature_data') || ''}
              onChange={(signature) => setValue('signature_data', signature || '')}
            />
          </div>
        </div>
      </Section>

      {/* Testing Instruments */}
      <Section
        title="Testing Instruments"
        icon={Gauge}
        iconColor="text-purple-400"
        iconBg="bg-purple-500/15"
        badge={`${instruments.length} instrument${instruments.length !== 1 ? 's' : ''}`}
        badgeColor={instruments.length > 0 ? 'text-purple-400' : 'text-white/40'}
      >
        <div className="space-y-4">
          {instruments.length === 0 ? (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <p className="text-[13px] text-white/50">No instruments added yet</p>
            </div>
          ) : (
            instruments.map((instrument, index) => (
              <div key={instrument.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white">Instrument {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveInstrument(instrument.id)}
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Select
                    value={instrument.instrument_type}
                    onValueChange={(value) => handleInstrumentChange(instrument.id, 'instrument_type', value)}
                  >
                    <SelectTrigger className="h-12 sm:h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INSTRUMENT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={instrument.make}
                    onChange={(e) => handleInstrumentChange(instrument.id, 'make', e.target.value)}
                    placeholder="Make"
                    className="h-10 text-[13px] bg-white/[0.04] border-white/[0.06]"
                  />
                  <Input
                    value={instrument.model}
                    onChange={(e) => handleInstrumentChange(instrument.id, 'model', e.target.value)}
                    placeholder="Model"
                    className="h-10 text-[13px] bg-white/[0.04] border-white/[0.06]"
                  />
                  <Input
                    value={instrument.serial_number}
                    onChange={(e) => handleInstrumentChange(instrument.id, 'serial_number', e.target.value)}
                    placeholder="Serial"
                    className="h-10 text-[13px] bg-white/[0.04] border-white/[0.06]"
                  />
                  <Input
                    type="date"
                    value={instrument.calibration_date}
                    onChange={(e) => handleInstrumentChange(instrument.id, 'calibration_date', e.target.value)}
                    className="h-10 text-[13px] bg-white/[0.04] border-white/[0.06]"
                  />
                  <Input
                    type="date"
                    value={instrument.calibration_due || ''}
                    onChange={(e) => handleInstrumentChange(instrument.id, 'calibration_due', e.target.value)}
                    className="h-10 text-[13px] bg-white/[0.04] border-white/[0.06]"
                    placeholder="Next cal"
                  />
                </div>
              </div>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            onClick={handleAddInstrument}
            className="w-full h-11 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white/70"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Instrument
          </Button>
        </div>
      </Section>

      {/* Regional Settings */}
      <Section
        title="Regional Settings"
        icon={Coins}
        iconColor="text-rose-400"
        iconBg="bg-rose-500/15"
        badge={watch('currency') || 'GBP'}
        badgeColor="text-rose-400"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[13px] text-white/50 font-medium">Currency</Label>
            <Select value={watch('currency')} onValueChange={(value) => setValue('currency', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-white/50 font-medium">Locale</Label>
            <Select value={watch('locale')} onValueChange={(value) => setValue('locale', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky bottom-4 pt-4"
      >
        <Button
          type="submit"
          disabled={isSaving || uploading}
          className="w-full h-14 rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-[16px] shadow-lg shadow-elec-yellow/20"
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Uploading Logo...
            </>
          ) : isSaving ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Save All Settings
            </>
          )}
        </Button>
      </motion.div>

      {/* Bottom Padding for Mobile */}
      <div className="h-20 sm:h-4" />
    </form>
  );
};

export default BusinessTab;
