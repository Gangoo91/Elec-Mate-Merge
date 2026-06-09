import { useMemo, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  FileText,
  CheckCircle,
  X,
  FileSignature,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Briefcase,
  GitBranch,
  Plus,
  Minus,
  Pencil,
  CreditCard,
  CalendarClock,
  ExternalLink,
} from 'lucide-react';
import { Quote, QuoteItem } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import SignaturePad from '@/components/forms/SignaturePad';
import { diffQuoteItems, formatDeltaCurrency, QuoteDiff } from '@/utils/quote-diff';
import { buildCategoryBreakdowns, computeQuoteTotals, getDisplayItems } from '@/utils/quote-calculations';
import { cn } from '@/lib/utils';

// Brand defaults match the shared email design system fallbacks.
const DEFAULT_BRAND = '#0f172a';
const safeHex = (v: string | null | undefined, fallback = DEFAULT_BRAND): string => {
  const raw = String(v || '').trim();
  return /^#[0-9a-fA-F]{6}$/.test(raw) ? raw : fallback;
};

interface CompanyBrand {
  companyName: string;
  logoUrl: string | null;
  primaryColor: string;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  vatNumber: string | null;
  registrationNumber: string | null;
  sparkyName: string | null;
  sparkyAvatarUrl: string | null;
  /** Bank transfer details for the deposit-by-bank fallback */
  bankDetails: {
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    sortCode: string | null;
  } | null;
  /** 'active' if the sparky has live Stripe Connect; anything else means
   *  card payment isn't available — fall back to bank transfer. */
  stripeAccountStatus: string | null;
  /** % of the total taken as deposit — set on company_profiles or
   *  overridden per-quote on quote.settings.depositPercentage */
  depositPercentage: number | null;
}

interface DepositInvoice {
  invoiceId: string;
  invoiceNumber: string;
  total: number;
  status: string;
  dueDate: string | null;
  paidAt: string | null;
  payUrl: string | null;
}

const DEFAULT_BRAND_PROFILE: CompanyBrand = {
  companyName: 'Your Electrician',
  logoUrl: null,
  primaryColor: DEFAULT_BRAND,
  email: null,
  phone: null,
  website: null,
  address: null,
  vatNumber: null,
  registrationNumber: null,
  sparkyName: null,
  sparkyAvatarUrl: null,
  bankDetails: null,
  stripeAccountStatus: null,
  depositPercentage: null,
};

const PublicQuoteView = () => {
  const { token } = useParams<{ token: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [brand, setBrand] = useState<CompanyBrand>(DEFAULT_BRAND_PROFILE);

  const categoryBreakdowns = useMemo(
    () => (quote ? buildCategoryBreakdowns(quote.items || [], quote.settings) : []),
    [quote]
  );
  // CIS / VAT reverse charge. Quotes don't apply overhead/profit (see
  // useQuoteBuilder), so match that so cisT.total === quote.total.
  const cisT = useMemo(
    () =>
      quote
        ? computeQuoteTotals(quote.items || [], quote.settings, { applyOverheadAndProfit: false })
        : null,
    [quote]
  );
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [declineConfirmOpen, setDeclineConfirmOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [signatureData, setSignatureData] = useState<string>('');
  const signaturePadRef = useRef<any>(null);
  const [variationDiff, setVariationDiff] = useState<QuoteDiff | null>(null);
  const [depositInvoice, setDepositInvoice] = useState<DepositInvoice | null>(null);

  useEffect(() => {
    if (token) {
      loadQuote();
      loadBrand();
      loadDepositInvoice();
    }
  }, [token]);

  // Auto-scroll to acceptance section when URL has #accept or #reject anchor
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#accept' || hash === '#reject') {
      setTimeout(() => {
        const acceptSection = document.getElementById('acceptance-section');
        if (acceptSection) {
          acceptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          acceptSection.style.boxShadow = `0 0 0 3px ${brand.primaryColor}40`;
          setTimeout(() => {
            acceptSection.style.boxShadow = '';
          }, 2000);
        }
      }, 300);
    }
  }, [quote, brand.primaryColor]);

  const loadBrand = async () => {
    if (!token) return;
    try {
      const { data, error } = await supabase.rpc('get_company_brand_by_quote_token', {
        token_param: token,
      });
      if (error || !data || (Array.isArray(data) && data.length === 0)) return;
      const row = (Array.isArray(data) ? data[0] : data) as Record<string, unknown>;
      const str = (v: unknown): string | null =>
        typeof v === 'string' && v.length > 0 ? v : null;
      const rawBank = row.bank_details as
        | { bankName?: string; accountName?: string; accountNumber?: string; sortCode?: string }
        | null
        | undefined;
      setBrand({
        companyName: str(row.company_name) || DEFAULT_BRAND_PROFILE.companyName,
        logoUrl: str(row.logo_url) || str(row.logo_data_url) || null,
        primaryColor: safeHex(str(row.primary_color)),
        email: str(row.company_email),
        phone: str(row.company_phone),
        website: str(row.company_website),
        address: str(row.company_address),
        vatNumber: str(row.vat_number),
        sparkyName: str(row.sparky_full_name),
        sparkyAvatarUrl: str(row.sparky_avatar_url),
        registrationNumber: str(row.company_registration),
        bankDetails: rawBank
          ? {
              bankName: rawBank.bankName || null,
              accountName: rawBank.accountName || null,
              accountNumber: rawBank.accountNumber || null,
              sortCode: rawBank.sortCode || null,
            }
          : null,
        stripeAccountStatus: str(row.stripe_account_status),
        depositPercentage:
          typeof row.deposit_percentage === 'number' ? row.deposit_percentage : null,
      });
    } catch {
      // Non-fatal — fall back to defaults; the page still renders.
    }
  };

  const loadDepositInvoice = async () => {
    if (!token) return;
    try {
      const { data, error } = await supabase.rpc('get_deposit_invoice_by_quote_token', {
        token_param: token,
      });
      if (error || !data || (Array.isArray(data) && data.length === 0)) return;
      const row = (Array.isArray(data) ? data[0] : data) as Record<string, unknown>;
      setDepositInvoice({
        invoiceId: String(row.invoice_id || ''),
        invoiceNumber: String(row.invoice_number || ''),
        total: Number(row.total || 0),
        status: String(row.status || ''),
        dueDate: (row.due_date as string) || null,
        paidAt: (row.paid_at as string) || null,
        payUrl: (row.stripe_payment_link_url as string) || null,
      });
    } catch {
      // Non-fatal
    }
  };

  const loadQuote = async () => {
    if (!token) return;

    try {
      setLoading(true);

      // Use secure RPC function to fetch quote by token (prevents viewing other quotes)
      const { data: quoteResults, error: quoteError } = await supabase.rpc(
        'get_quote_by_public_token',
        { token_param: token }
      );

      if (quoteError) {
        throw new Error('Quote not found or expired');
      }

      // RPC returns an array, get the first (and only) result
      const quoteData = Array.isArray(quoteResults) ? quoteResults[0] : quoteResults;

      if (!quoteData) {
        throw new Error('Quote not found or expired');
      }

      const convertedQuote: Quote = {
        id: quoteData.id,
        quoteNumber: quoteData.quote_number,
        user_id: quoteData.user_id,
        client: quoteData.client_data as any,
        items: quoteData.items as any,
        settings: quoteData.settings as any,
        jobDetails: (quoteData as any).job_details || undefined,
        subtotal: quoteData.subtotal,
        overhead: quoteData.overhead,
        profit: quoteData.profit,
        vatAmount: quoteData.vat_amount,
        total: quoteData.total,
        status: quoteData.status as Quote['status'],
        tags: quoteData.tags as any,
        notes: quoteData.notes,
        createdAt: new Date(quoteData.created_at),
        updatedAt: new Date(quoteData.updated_at),
        expiryDate: new Date(quoteData.expiry_date),
        lastReminderSentAt: quoteData.last_reminder_sent_at
          ? new Date(quoteData.last_reminder_sent_at)
          : undefined,
        acceptance_status: quoteData.acceptance_status as any,
        acceptance_method: quoteData.acceptance_method as any,
        accepted_at: quoteData.accepted_at ? new Date(quoteData.accepted_at) : undefined,
        accepted_by_name: quoteData.accepted_by_name,
        accepted_by_email: quoteData.accepted_by_email,
        accepted_ip: quoteData.accepted_ip,
        accepted_user_agent: quoteData.accepted_user_agent,
        signature_url: quoteData.signature_url,
        docusign_envelope_id: quoteData.docusign_envelope_id,
        docusign_status: quoteData.docusign_status,
        public_token: quoteData.public_token,
        version_number: (quoteData as any).version_number,
        parent_quote_id: (quoteData as any).parent_quote_id,
        supersedes_id: (quoteData as any).supersedes_id,
        variation_reason: (quoteData as any).variation_reason,
        variation_type: (quoteData as any).variation_type,
      };

      setQuote(convertedQuote);
      setClientName(convertedQuote.client?.name || '');
      setClientEmail(convertedQuote.client?.email || '');

      // ELE-956 — for v2+ quotes, fetch the version that this one supersedes
      // and compute the diff so the client sees what changed before they sign.
      if ((convertedQuote.version_number ?? 1) > 1 && convertedQuote.supersedes_id) {
        const { data: prevQuote } = await supabase
          .from('quotes')
          .select('items')
          .eq('id', convertedQuote.supersedes_id)
          .maybeSingle();
        if (prevQuote?.items) {
          setVariationDiff(
            diffQuoteItems(prevQuote.items as QuoteItem[], convertedQuote.items)
          );
        }
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Quote not found or has expired',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async () => {
    if (!quote || !clientName || !clientEmail || !signatureData) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields and provide your signature',
        variant: 'destructive',
      });
      return;
    }

    setAccepting(true);
    try {
      // ELE-954/955 — Go through the accept-quote-public edge function so
      // the deposit invoice + Stripe pay link get created in the same
      // round-trip. (The old accept_quote_by_token RPC only flipped the
      // status flag and silently skipped the deposit/booking flow.)
      const clientIP = await getUserIP();
      const { data: result, error: invokeError } = await supabase.functions.invoke(
        'accept-quote-public',
        {
          body: {
            token: quote.public_token,
            name: clientName,
            email: clientEmail,
            signature: signatureData,
            ip: clientIP,
            userAgent: navigator.userAgent,
          },
        }
      );

      if (invokeError) throw invokeError;
      if (!result?.success) throw new Error(result?.error || 'Quote could not be accepted.');

      // Populate the post-accept state from the edge fn response.
      if (result.depositRequired && result.depositInvoiceId) {
        setDepositInvoice({
          invoiceId: result.depositInvoiceId,
          invoiceNumber: '',
          total: Number(result.depositAmount) || 0,
          status: 'sent',
          dueDate: null,
          paidAt: null,
          payUrl: result.depositPayUrl || null,
        });
      }

      toast({
        title: result.depositRequired ? 'Quote accepted — one step left' : 'Quote accepted',
        description: result.depositRequired
          ? `Pay the deposit below to confirm your booking.`
          : `We've sent you a confirmation email. Pick a slot below to lock in your booking.`,
        variant: 'success',
      });

      // Refresh the quote so acceptance_status reflects the new state.
      loadQuote();
      loadDepositInvoice();
    } catch (err) {
      toast({
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Failed to accept quote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setAccepting(false);
    }
  };

  const handleRejectQuote = async () => {
    if (!quote) return;

    setRejecting(true);
    try {
      const clientIP = await getUserIP();
      const { data: success, error } = await supabase.rpc('reject_quote_by_token', {
        token_param: quote.public_token,
        rejected_name: clientName || 'Client',
        rejected_email: clientEmail || null,
        client_ip: clientIP,
        client_user_agent: navigator.userAgent,
      });

      if (error) throw error;

      if (!success) {
        throw new Error('Quote could not be declined. It may have expired.');
      }

      toast({
        title: 'Quote Declined',
        description: 'Thank you for letting us know.',
        variant: 'default',
      });

      loadQuote();
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to decline quote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setRejecting(false);
      setDeclineConfirmOpen(false);
    }
  };

  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const groupItemsByCategory = (items: QuoteItem[]) => {
    const grouped = items.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, QuoteItem[]>
    );

    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => b.totalPrice - a.totalPrice);
    });

    return grouped;
  };

  // Loading state — match shared design (light slate body, white card)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="h-7 w-7 text-slate-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading quote…</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!quote) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-6 w-6 text-rose-500" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900 mb-1">Quote not found</h1>
          <p className="text-sm text-slate-500">This quote may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  // ELE-954/955 — finer-grained accept states. accepted_pending_deposit
  // means "they signed but Stripe hasn't seen the deposit yet"; once paid
  // the stripe webhook flips it to 'accepted'.
  const isPendingDeposit = quote.acceptance_status === 'accepted_pending_deposit';
  const isAccepted = quote.acceptance_status === 'accepted' || isPendingDeposit;
  const isRejected = quote.acceptance_status === 'rejected';
  const isPending = !isAccepted && !isRejected;
  const isDepositPaid = !!depositInvoice?.paidAt;
  const bookedSlotStart =
    (quote as { booked_slot_start?: string | Date | null }).booked_slot_start || null;
  // When the electrician has opted to hide their per-category markup from
  // the customer (settings.hideMarkupFromCustomer), bake it into each
  // item's displayed unit/total price so the customer-visible sum still
  // reconciles to the subtotal. The "X markup (+Y%)" totals row is also
  // suppressed below.
  const hideMarkup = quote.settings?.hideMarkupFromCustomer === true;
  const displayItems = getDisplayItems(quote.items || [], quote.settings, {
    absorbCategoryAdjustments: hideMarkup,
  });
  const groupedItems = groupItemsByCategory(displayItems);
  const brandHex = brand.primaryColor;
  const expiryStr = quote.expiryDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Footer details — mirror the email's two-row layout.
  const contactParts = [brand.address, brand.phone, brand.email, brand.website]
    .filter(Boolean)
    .join('  ·  ');
  const legalParts = [
    brand.vatNumber ? `VAT ${brand.vatNumber}` : '',
    brand.registrationNumber ? `Co. ${brand.registrationNumber}` : '',
  ]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <div
      className={cn(
        'min-h-screen bg-slate-100 py-6 sm:py-12 px-4',
        // Extra bottom padding so the sticky mobile CTA doesn't overlap
        // the footer when the user scrolls to the end. Desktop uses normal
        // padding since there's no sticky bar there.
        isPending && 'pb-28 sm:pb-12'
      )}
    >
      <div
        className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
        style={{ ['--brand' as never]: brandHex }}
      >
        {/* Brand accent rail — same as the email shell */}
        <div className="h-1" style={{ backgroundColor: brandHex }} />

        {/* Header — logo (or company name) + sparky avatar + status pill */}
        <div className="px-6 sm:px-9 pt-8 pb-2 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 flex items-center gap-3">
            {/* Sparky avatar — small portrait, builds trust by showing the
                human behind the quote. Falls back to a brand-coloured initial
                circle if no avatar is set. */}
            {brand.sparkyAvatarUrl ? (
              <img
                src={brand.sparkyAvatarUrl}
                alt={brand.sparkyName || brand.companyName}
                className="w-11 h-11 rounded-full object-cover border border-slate-200 flex-shrink-0"
              />
            ) : brand.sparkyName ? (
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                style={{ backgroundColor: brandHex }}
                aria-hidden="true"
              >
                {brand.sparkyName.charAt(0).toUpperCase()}
              </div>
            ) : null}
            <div className="min-w-0 flex-1">
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.companyName}
                  className="max-h-10 max-w-[180px] object-contain"
                />
              ) : (
                <p className="text-[20px] font-bold text-slate-900 tracking-tight truncate">
                  {brand.companyName}
                </p>
              )}
              {brand.sparkyName && brand.logoUrl && (
                <p className="text-[12px] text-slate-500 mt-0.5 truncate">{brand.sparkyName}</p>
              )}
              {brand.sparkyName && !brand.logoUrl && (
                <p className="text-[12px] text-slate-500 mt-0.5 truncate">
                  Quote from {brand.sparkyName}
                </p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 pt-1">
            {isAccepted && !isPendingDeposit && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                <CheckCircle className="h-3.5 w-3.5" />
                Accepted
              </span>
            )}
            {isPendingDeposit && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                <CreditCard className="h-3.5 w-3.5" />
                Deposit due
              </span>
            )}
            {isRejected && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                <X className="h-3.5 w-3.5" />
                Declined
              </span>
            )}
            {isPending && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                Awaiting response
              </span>
            )}
          </div>
        </div>

        {/* Revision banner — for v2+ quotes with a diff against the previous
            version, surface this BEFORE the hero so a returning client sees
            "what changed" before the price. Single quick-jump anchor to the
            detailed diff section further down the page. */}
        {variationDiff && variationDiff.hasChanges && (
          <div className="px-6 sm:px-9 pt-6">
            <a
              href="#variation-diff"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('variation-diff')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left no-underline"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <GitBranch className="h-4 w-4 text-amber-700 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-amber-900">
                    Revised quote · v{quote?.version_number ?? 2}
                  </p>
                  <p className="text-[12px] text-amber-800 truncate">
                    {(() => {
                      const n =
                        variationDiff.added.length +
                        variationDiff.removed.length +
                        variationDiff.changed.length;
                      return `${n} change${n === 1 ? '' : 's'} since v${(quote?.version_number ?? 2) - 1} — see what changed`;
                    })()}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  'text-sm font-bold tabular-nums flex-shrink-0',
                  variationDiff.totalDelta > 0
                    ? 'text-amber-800'
                    : variationDiff.totalDelta < 0
                      ? 'text-emerald-700'
                      : 'text-slate-500'
                )}
              >
                {formatDeltaCurrency(variationDiff.totalDelta)}
              </span>
            </a>
          </div>
        )}

        {/* Hero — small eyebrow + big total + meta grid (3 cells) */}
        <div className="px-6 sm:px-9 pt-8 pb-2 text-center">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em]">
            Quote total
          </p>
          <p className="mt-2 text-5xl font-bold text-slate-900 tracking-tight leading-none">
            {formatCurrency(quote.total)}
          </p>
          {quote.settings?.vatRegistered && quote.vatAmount > 0 && (
            <p className="mt-2 text-[13px] text-slate-500">
              Inc. VAT ({formatCurrency(quote.vatAmount)})
            </p>
          )}

          <div className="mt-6 grid grid-cols-3 gap-0 border-t border-slate-200 pt-5">
            <div className="text-center">
              <p className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-[0.12em]">
                Quote
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900 font-mono">
                {quote.quoteNumber}
              </p>
            </div>
            <div className="text-center border-l border-slate-200">
              <p className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-[0.12em]">
                Valid until
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">{expiryStr}</p>
            </div>
            <div className="text-center border-l border-slate-200">
              <p className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-[0.12em]">
                Status
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">
                {isPendingDeposit
                  ? 'Deposit due'
                  : isAccepted
                    ? 'Accepted'
                    : isRejected
                      ? 'Declined'
                      : 'Pending'}
              </p>
            </div>
          </div>
        </div>

        {/* Job details */}
        {quote.jobDetails && (
          <section className="px-6 sm:px-9 pt-8">
            <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.12em] flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" />
              Job details
            </h2>
            <div className="mt-4 space-y-4">
              {quote.jobDetails.title && (
                <div>
                  <p className="text-[11px] font-medium text-slate-500">Project</p>
                  <p className="mt-1 text-[15px] font-semibold text-slate-900">
                    {quote.jobDetails.title}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {quote.jobDetails.location && (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Location
                    </p>
                    <p className="mt-1 text-[14px] text-slate-700 leading-snug">
                      {quote.jobDetails.location}
                    </p>
                  </div>
                )}
                {quote.jobDetails.estimatedDuration && (
                  <div>
                    <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Duration
                    </p>
                    <p className="mt-1 text-[14px] text-slate-700">
                      {quote.jobDetails.estimatedDuration}
                    </p>
                  </div>
                )}
              </div>
              {quote.jobDetails.description && (
                <div>
                  <p className="text-[11px] font-medium text-slate-500">Description</p>
                  <p className="mt-1 text-[14px] text-slate-700 leading-relaxed whitespace-pre-line">
                    {quote.jobDetails.description}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Variation diff — ELE-956. Anchor target for the revision pill
            above the hero. */}
        {variationDiff && variationDiff.hasChanges && (
          <section id="variation-diff" className="px-6 sm:px-9 pt-8 scroll-mt-6">
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.12em] flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5" />
                  What's changed since v{(quote?.version_number ?? 2) - 1}
                </h2>
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    variationDiff.totalDelta > 0
                      ? 'text-amber-700'
                      : variationDiff.totalDelta < 0
                        ? 'text-emerald-700'
                        : 'text-slate-500'
                  )}
                >
                  {formatDeltaCurrency(variationDiff.totalDelta)}
                </span>
              </div>
              {quote?.variation_reason && (
                <div className="mb-4">
                  <p className="text-[11px] font-medium text-slate-500">Why this variation</p>
                  <p className="mt-1 text-[14px] text-slate-700 leading-snug">
                    {quote.variation_reason}
                  </p>
                </div>
              )}
              <div className="space-y-3">
                {variationDiff.added.map((item) => (
                  <div key={`added-${item.id}`} className="flex items-start gap-3">
                    <Plus className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-slate-900">{item.description}</p>
                      <p className="text-[12px] text-slate-500">
                        {item.quantity} {item.unit} · added
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-700 tabular-nums">
                      {formatDeltaCurrency(item.totalPrice || 0)}
                    </span>
                  </div>
                ))}
                {variationDiff.removed.map((item) => (
                  <div key={`removed-${item.id}`} className="flex items-start gap-3">
                    <Minus className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-slate-900 line-through decoration-slate-300">
                        {item.description}
                      </p>
                      <p className="text-[12px] text-slate-500">removed</p>
                    </div>
                    <span className="text-sm font-semibold text-rose-600 tabular-nums">
                      {formatDeltaCurrency(-(item.totalPrice || 0))}
                    </span>
                  </div>
                ))}
                {variationDiff.changed.map((change) => (
                  <div key={`changed-${change.itemId}`} className="flex items-start gap-3">
                    <Pencil className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-slate-900">{change.description}</p>
                      <p className="text-[12px] text-slate-500">
                        {change.changedFields.join(', ')} updated
                      </p>
                    </div>
                    <span
                      className={cn(
                        'text-sm font-semibold tabular-nums',
                        change.totalDelta > 0 ? 'text-amber-700' : 'text-emerald-700'
                      )}
                    >
                      {formatDeltaCurrency(change.totalDelta)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quote breakdown */}
        <section className="px-6 sm:px-9 pt-8">
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.12em]">
              Quote breakdown
            </h2>
            <div className="mt-5 space-y-7">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-[12px] font-semibold text-slate-700 capitalize mb-3 flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: brandHex }}
                    />
                    {category}{' '}
                    <span className="text-slate-400 font-normal">({items.length})</span>
                  </h4>
                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between gap-3 py-1.5">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-[14px] text-slate-900 font-medium leading-snug">
                            {item.description}
                          </p>
                          <p className="text-[12px] text-slate-500 mt-0.5">
                            {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                          </p>
                          {typeof item.itemAdjustmentPercent === 'number' &&
                            item.itemAdjustmentPercent !== 0 && (
                              <span
                                className={cn(
                                  'inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded tabular-nums',
                                  item.itemAdjustmentPercent > 0
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                )}
                              >
                                {item.itemAdjustmentPercent > 0 ? '+' : ''}
                                {item.itemAdjustmentPercent}%
                                {item.itemAdjustmentLabel && (
                                  <span className="text-slate-500 font-normal">
                                    · {item.itemAdjustmentLabel}
                                  </span>
                                )}
                              </span>
                            )}
                        </div>
                        <p className="text-[14px] font-semibold text-slate-900 tabular-nums flex-shrink-0">
                          {formatCurrency(item.totalPrice)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals — right-aligned column */}
            <div className="mt-6 border-t border-slate-200 pt-4 space-y-1.5 text-[14px]">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(quote.subtotal)}</span>
              </div>
              {/* ELE-891 / ELE-973 — per-category adjustment lines with live £ delta.
                  Hidden when the electrician has opted to bake markup into the line
                  items via settings.hideMarkupFromCustomer. */}
              {!hideMarkup && categoryBreakdowns
                .filter((b) => b.categoryAdjustmentDelta !== 0)
                .map((b) => {
                  const isMarkup = b.categoryAdjustmentDelta > 0;
                  return (
                    <div key={b.category} className="flex justify-between text-[12px]">
                      <span
                        className={cn(
                          'capitalize',
                          isMarkup ? 'text-amber-700' : 'text-emerald-700'
                        )}
                      >
                        {b.category} {isMarkup ? 'markup' : 'discount'} (
                        {b.categoryAdjustmentPercent > 0 ? '+' : ''}
                        {b.categoryAdjustmentPercent}%)
                      </span>
                      <span
                        className={cn(
                          'tabular-nums font-medium',
                          isMarkup ? 'text-amber-700' : 'text-emerald-700'
                        )}
                      >
                        {isMarkup ? '+' : '-'}
                        {formatCurrency(Math.abs(b.categoryAdjustmentDelta))}
                      </span>
                    </div>
                  );
                })}
              {quote.overhead > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Overhead ({quote.settings?.overheadPercentage || 0}%)</span>
                  <span className="tabular-nums">{formatCurrency(quote.overhead)}</span>
                </div>
              )}
              {quote.profit > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Profit ({quote.settings?.profitMargin || 0}%)</span>
                  <span className="tabular-nums">{formatCurrency(quote.profit)}</span>
                </div>
              )}
              {quote.settings?.vatRegistered && quote.vatAmount > 0 && !cisT?.reverseCharge && (
                <div className="flex justify-between text-slate-600">
                  <span>VAT ({quote.settings?.vatRate || 20}%)</span>
                  <span className="tabular-nums">{formatCurrency(quote.vatAmount)}</span>
                </div>
              )}
              {cisT?.reverseCharge && (
                <div className="flex justify-between text-slate-600">
                  <span>VAT — reverse charge</span>
                  <span className="tabular-nums">{formatCurrency(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-[15px] font-bold text-slate-900 pt-3 border-t border-slate-200 mt-2">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(quote.total)}</span>
              </div>
              {cisT && cisT.cisAmount > 0 && (
                <>
                  <div className="flex justify-between text-slate-600 pt-1">
                    <span>Less: CIS ({cisT.cisRate}% on labour)</span>
                    <span className="tabular-nums text-red-600">−{formatCurrency(cisT.cisAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[15px] font-bold text-slate-900">
                    <span>Net payable</span>
                    <span className="tabular-nums">{formatCurrency(cisT.netPayable)}</span>
                  </div>
                </>
              )}
              {cisT?.reverseCharge && (
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  Reverse charge: customer to account to HMRC for the VAT — {formatCurrency(cisT.notionalVat)} @ {quote.settings?.vatRate ?? 20}%.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Acceptance section — only when pending */}
        {isPending && (
          <section
            id="acceptance-section"
            className="px-6 sm:px-9 pt-8 transition-shadow duration-300"
          >
            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.12em] flex items-center gap-1.5">
                <FileSignature className="h-3.5 w-3.5" />
                Accept or decline
              </h2>
              <p className="mt-1 text-[13px] text-slate-600 leading-relaxed">
                Please review the details above, then add your details and signature below to accept.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName" className="text-[12px] font-medium text-slate-700">
                    Full name
                  </Label>
                  <Input
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Your full name"
                    className="h-11 mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 touch-manipulation text-base"
                    style={{
                      ['--tw-ring-color' as never]: brandHex,
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail" className="text-[12px] font-medium text-slate-700">
                    Email address
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 mt-1.5 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 touch-manipulation text-base"
                  />
                </div>
              </div>

              <div className="mt-5">
                <Label className="text-[12px] font-medium text-slate-700">Digital signature</Label>
                <p className="mt-1 text-[12px] text-slate-500">
                  Draw your signature in the box below using your finger or mouse.
                </p>
                <div className="mt-2">
                  <SignaturePad
                    ref={signaturePadRef}
                    onSignatureChange={setSignatureData}
                    className="w-full"
                  />
                </div>
                {!signatureData && (
                  <p className="text-[12px] text-amber-700 mt-2">
                    Draw your signature above to enable the Accept button.
                  </p>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleAcceptQuote}
                  disabled={accepting || rejecting || !clientName || !clientEmail || !signatureData}
                  className="h-12 text-white font-semibold text-[15px] rounded-xl touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed sm:order-2"
                  style={{ backgroundColor: brandHex }}
                >
                  {accepting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Accept quote
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setDeclineConfirmOpen(true)}
                  disabled={accepting || rejecting}
                  variant="outline"
                  className="h-12 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-[15px] rounded-xl touch-manipulation sm:order-1"
                >
                  Decline
                </Button>
              </div>

              <p className="mt-4 text-[12px] text-slate-500 leading-relaxed">
                By accepting, you agree to the quoted amount and terms set out above. Your
                signature is stored securely against your job record.
              </p>
            </div>
          </section>
        )}

        {/* Accepted / Declined confirmation + post-accept next step
            (pay deposit → pick slot → booked). ELE-954/955. */}
        {(isAccepted || isRejected) && (
          <section className="px-6 sm:px-9 pt-8">
            <div className="border-t border-slate-200 pt-6 space-y-5">
              {/* Status pill (always shown) */}
              <div
                className={cn(
                  'rounded-xl p-5 text-center',
                  isAccepted ? 'bg-emerald-50' : 'bg-rose-50'
                )}
              >
                <div
                  className={cn(
                    'w-11 h-11 rounded-full mx-auto mb-3 flex items-center justify-center',
                    isAccepted ? 'bg-emerald-100' : 'bg-rose-100'
                  )}
                >
                  {isAccepted ? (
                    <CheckCircle className="h-6 w-6 text-emerald-700" />
                  ) : (
                    <X className="h-6 w-6 text-rose-700" />
                  )}
                </div>
                <h3
                  className={cn(
                    'text-base font-semibold mb-1',
                    isAccepted ? 'text-emerald-900' : 'text-rose-900'
                  )}
                >
                  {isAccepted ? 'Quote accepted' : 'Quote declined'}
                </h3>
                <p className="text-[13px] text-slate-700">
                  {isAccepted
                    ? `Accepted by ${quote.accepted_by_name} on ${quote.accepted_at ? new Date(quote.accepted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}`
                    : `Declined by ${quote.accepted_by_name || 'Client'} on ${quote.accepted_at ? new Date(quote.accepted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}`}
                </p>
                {isAccepted && quote.signature_url && (
                  <div className="mt-4 pt-4 border-t border-emerald-100">
                    <p className="text-[11px] font-medium text-slate-500 mb-2 uppercase tracking-wider">
                      Signature on file
                    </p>
                    <img
                      src={quote.signature_url}
                      alt="Client signature"
                      className="max-h-16 mx-auto bg-white rounded border border-slate-200 px-2"
                    />
                  </div>
                )}
              </div>

              {/* Next step — pay deposit, pick slot, or booked confirmation.
                  Walks the client through what comes next so they don't have
                  to wait for a separate email. */}
              {isPendingDeposit && !isDepositPaid && (
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-[10.5px] font-semibold text-amber-700 uppercase tracking-[0.12em] flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5" />
                    One step left · pay deposit
                  </p>
                  <p className="mt-2 text-[15px] text-slate-700 leading-relaxed">
                    To confirm your booking with {brand.companyName}, please pay the deposit
                    below. The remainder is payable on completion.
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-[28px] font-bold text-slate-900 tabular-nums">
                      {formatCurrency(depositInvoice?.total || 0)}
                    </span>
                    <span className="text-[13px] text-slate-500">deposit</span>
                  </div>
                  {depositInvoice?.payUrl ? (
                    <>
                      <a
                        href={depositInvoice.payUrl}
                        className="mt-4 inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-6 rounded-xl text-white font-semibold text-[15px] touch-manipulation"
                        style={{ backgroundColor: brandHex }}
                      >
                        Pay {formatCurrency(depositInvoice.total)} deposit
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-[12px] text-slate-400">
                        Secure payment by card · powered by Stripe. Your booking is confirmed as
                        soon as the payment lands.
                      </p>
                    </>
                  ) : brand.bankDetails &&
                    (brand.bankDetails.accountNumber || brand.bankDetails.sortCode) ? (
                    // No Stripe Connect — show bank details inline so the
                    // client can pay the deposit by bank transfer. The
                    // quote number doubles as the payment reference so
                    // the sparky can match it up when it lands.
                    <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4 text-left">
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.12em]">
                        Pay by bank transfer
                      </p>
                      <table className="mt-3 w-full text-[13px]">
                        <tbody>
                          {brand.bankDetails.accountName && (
                            <tr>
                              <td className="py-1 text-slate-500 w-[42%]">Account name</td>
                              <td className="py-1 text-slate-900 font-medium font-mono">
                                {brand.bankDetails.accountName}
                              </td>
                            </tr>
                          )}
                          {brand.bankDetails.sortCode && (
                            <tr>
                              <td className="py-1 text-slate-500">Sort code</td>
                              <td className="py-1 text-slate-900 font-medium font-mono">
                                {brand.bankDetails.sortCode}
                              </td>
                            </tr>
                          )}
                          {brand.bankDetails.accountNumber && (
                            <tr>
                              <td className="py-1 text-slate-500">Account number</td>
                              <td className="py-1 text-slate-900 font-medium font-mono">
                                {brand.bankDetails.accountNumber}
                              </td>
                            </tr>
                          )}
                          {brand.bankDetails.bankName && (
                            <tr>
                              <td className="py-1 text-slate-500">Bank</td>
                              <td className="py-1 text-slate-900 font-medium">
                                {brand.bankDetails.bankName}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <p className="mt-3 text-[12px] text-slate-600">
                        Use{' '}
                        <strong className="font-mono text-slate-900">{quote.quoteNumber}</strong>{' '}
                        as the payment reference. Once {brand.companyName} sees the deposit
                        they'll confirm and book a time with you.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-[13px] text-slate-500">
                      {brand.companyName} will be in touch shortly with deposit details.
                    </p>
                  )}
                </div>
              )}

              {/* Slot picker prompt — shown when accepted (no deposit OR
                  deposit paid) and we don't yet have a booked slot. */}
              {isAccepted && !isPendingDeposit && !bookedSlotStart && (
                <div className="rounded-xl border border-slate-200 p-5">
                  <p className="text-[10.5px] font-semibold text-emerald-700 uppercase tracking-[0.12em] flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5" />
                    Last step · pick a time
                  </p>
                  <p className="mt-2 text-[15px] text-slate-700 leading-relaxed">
                    {isDepositPaid
                      ? `Thanks for the deposit. Pick a time below and ${brand.companyName} will lock it in instantly.`
                      : `Pick a time below and ${brand.companyName} will lock it in instantly.`}
                  </p>
                  <a
                    href={
                      quote.user_id
                        ? `/book/${quote.user_id}?quote=${quote.id}`
                        : `/book/${quote.id}`
                    }
                    className="mt-4 inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-6 rounded-xl text-white font-semibold text-[15px] touch-manipulation"
                    style={{ backgroundColor: brandHex }}
                  >
                    Pick your time slot
                    <Calendar className="h-4 w-4" />
                  </a>
                  <p className="mt-3 text-[12px] text-slate-400">
                    Slots show real availability from {brand.companyName}'s calendar. We'll hold
                    your pick for 10 minutes while you confirm.
                  </p>
                </div>
              )}

              {/* Booked confirmation — slot is locked in. */}
              {isAccepted && bookedSlotStart && (
                <div className="rounded-xl border border-slate-200 p-5 text-center">
                  <p className="text-[10.5px] font-semibold text-emerald-700 uppercase tracking-[0.12em] flex items-center justify-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5" />
                    Booked
                  </p>
                  <p className="mt-2 text-[15px] text-slate-700 leading-relaxed">
                    See you on{' '}
                    <strong className="text-slate-900">
                      {new Date(bookedSlotStart).toLocaleString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </strong>
                    . A calendar invite (.ics) is on its way to {quote.accepted_by_email}.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Sign-off — mirrors the email sign-off */}
        <div className="px-6 sm:px-9 pt-8 pb-9">
          <p className="text-[15px] text-slate-700 leading-relaxed">Thanks,</p>
          <p className="text-[15px] font-semibold text-slate-900 leading-relaxed">
            {brand.companyName}
          </p>
          <p className="mt-3 text-[13px] text-slate-400 leading-relaxed">
            Any questions? Just reply to the email this came from and I'll come back to you.
          </p>
        </div>

        {/* Footer — contact + legal, same as email */}
        {(contactParts || legalParts) && (
          <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-9 py-5 text-center">
            {contactParts && (
              <p className="text-[12px] text-slate-500 leading-relaxed">{contactParts}</p>
            )}
            {legalParts && (
              <p className={cn('text-[11px] text-slate-400 leading-relaxed', contactParts && 'mt-1.5')}>
                {legalParts}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sticky mobile bottom CTA — pinned to the viewport on phones while
          the quote is awaiting a response. On long quotes the Accept form
          is well below the fold; this keeps it one tap away. Hidden on
          ≥sm and once the quote is accepted/declined. */}
      {isPending && (
        <div
          className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-white/95 backdrop-blur border-t border-slate-200"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
        >
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.12em]">
                Total
              </p>
              <p className="text-[18px] font-bold text-slate-900 leading-tight tabular-nums">
                {formatCurrency(quote.total)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('acceptance-section');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="h-12 px-5 rounded-xl text-white font-semibold text-[14px] touch-manipulation active:scale-[0.98] transition-transform shadow-sm flex items-center gap-1.5"
              style={{ backgroundColor: brandHex }}
            >
              <FileSignature className="h-4 w-4" />
              Review & sign
            </button>
          </div>
        </div>
      )}

      {/* Decline confirm — two-step so a stray tap doesn't kill the quote */}
      <AlertDialog open={declineConfirmOpen} onOpenChange={setDeclineConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline this quote?</AlertDialogTitle>
            <AlertDialogDescription>
              Letting {brand.companyName} know you don't want to go ahead. You can always get back
              in touch if you change your mind — they can send a fresh quote.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={rejecting}>Keep open</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectQuote}
              disabled={rejecting}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              {rejecting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Yes, decline'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PublicQuoteView;
