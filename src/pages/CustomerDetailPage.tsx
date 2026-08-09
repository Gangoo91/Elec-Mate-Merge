import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCustomer, useCustomers, Customer } from '@/hooks/inspection/useCustomers';
import { useCustomerReports } from '@/hooks/inspection/useCustomerReports';
import { useCustomerProjects } from '@/hooks/useCustomerProjects';
import { useCustomerActivity } from '@/hooks/inspection/useCustomerActivity';
import { CustomerReminders } from '@/components/customers/CustomerReminders';
import { CustomerContacts } from '@/components/customers/CustomerContacts';
import { useCustomerDuplicates } from '@/hooks/useCustomerDuplicates';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerOverviewTab } from '@/components/customers/CustomerOverviewTab';
import { CustomerFinancialsTab } from '@/components/customers/CustomerFinancialsTab';
import { CustomerPropertiesTab } from '@/components/customers/CustomerPropertiesTab';
import { CustomerSiteNotesTab } from '@/components/customers/CustomerSiteNotesTab';
import { CustomerTimelineTab } from '@/components/customers/CustomerTimelineTab';
import { QuickNoteDialog } from '@/components/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/customers/StartCertificateDialog';
import { Button } from '@/components/ui/button';
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
import { Loader2, Navigation, Users, Phone, Mail } from 'lucide-react';
import { navigateToAddress, canNavigateTo } from '@/utils/navigate-to-address';
import BusinessPageLayout from '@/components/business-hub/BusinessPageLayout';
import { cn } from '@/lib/utils';
import { Dot } from '@/components/college/primitives';

/*
 * House style, borrowed from the Business Hub so this page stops being the odd
 * one out. `card-surface-interactive` is the hub's card (hsl(0 0% 15%), 1px
 * white/10, 16px radius); the 2px yellow hairline across the top is the hub's
 * card accent. Every accent in the hub collapses to elec-yellow on purpose —
 * see the note in BusinessCard — so nothing here introduces a second colour.
 */
const HUB_CARD = 'relative overflow-hidden card-surface-interactive';

const HairlineAccent = () => (
  <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-elec-yellow opacity-25" />
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

const formatGBP = (value: number) =>
  value >= 10_000
    ? `£${Math.round(value / 1000)}k`
    : `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

// Inline-editable pill: tap to edit, blur or Enter to save, Esc to cancel.
function EditablePill({
  value,
  href,
  onActivate,
  placeholder,
  fieldKey,
  onSave,
  type = 'text',
  truncate,
}: {
  value: string | undefined;
  href?: string;
  /**
   * ELE-1520 — takes the place of `href` where the destination has to go
   * through `openExternalUrl` rather than the browser. A raw `<a href>` to
   * Google Maps is left to the WebView on native and never reaches the Maps
   * app; this routes the tap through the shared navigate helper instead.
   */
  onActivate?: () => void;
  placeholder: string;
  fieldKey: 'name' | 'email' | 'phone' | 'address';
  onSave: (field: string, value: string) => Promise<void>;
  type?: 'text' | 'email' | 'tel';
  truncate?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(value ?? '');
  }, [value]);

  const commit = async () => {
    const next = draft.trim();
    if (next === (value ?? '').trim()) {
      setEditing(false);
      return;
    }
    setSaving(true);
    await onSave(fieldKey, next);
    setSaving(false);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="inline-flex h-9 items-center gap-2 rounded-lg border border-elec-yellow/40 bg-elec-yellow/[0.06] px-2.5">
        <input
          autoFocus
          type={type}
          value={draft}
          disabled={saving}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') {
              setDraft(value ?? '');
              setEditing(false);
            }
          }}
          placeholder={placeholder}
          className="h-7 min-w-[10ch] max-w-[24ch] bg-transparent text-[12.5px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={commit}
          disabled={saving}
          className="flex h-full items-center text-[12px] font-semibold text-elec-yellow touch-manipulation"
          aria-label="Save"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    );
  }

  const display = value ?? placeholder;

  /*
    Full-width row, not a small inline pill. Three pills floating in a wide
    card left most of the width empty and read as disabled inputs — the grey
    "Add email" especially. A row gives the value room, gives the label a
    home, and makes the whole thing a 44px target.
  */
  return (
    <div className="flex min-h-11 items-center gap-3 border-t border-white/[0.10] px-1 first:border-t-0">
      <span className="w-[52px] shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
        {LABELS[fieldKey] ?? fieldKey}
      </span>
      {value && onActivate ? (
        /* focus-visible, not the UA default — an unstyled :focus put a blue
           ring on a yellow-on-black page and read as an error state. */
        <button
          type="button"
          onClick={onActivate}
          className="min-w-0 flex-1 truncate rounded-md py-2.5 text-left text-[13px] text-white transition-colors hover:text-elec-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 touch-manipulation"
        >
          {display}
        </button>
      ) : value && href ? (
        <a
          href={href}
          className="min-w-0 flex-1 truncate py-2.5 text-[13px] text-white hover:text-elec-yellow"
        >
          {display}
        </a>
      ) : (
        <span className="min-w-0 flex-1 truncate py-2.5 text-[13px] text-white">{display}</span>
      )}
      <button
        onClick={() => setEditing(true)}
        className="-mr-1 flex h-11 shrink-0 items-center px-1 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]"
        aria-label={`Edit ${fieldKey}`}
      >
        {value ? 'Edit' : 'Add'}
      </button>
    </div>
  );
}

const LABELS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
};

/**
 * One of the three things you actually do to a customer: ring them, email them,
 * drive to them.
 *
 * Shown greyed rather than hidden when there's nothing to act on. A row that
 * changes from two buttons to three depending on the record is harder to build
 * muscle memory for than one where Navigate is always in the same place — and
 * a greyed Navigate also tells you the address is missing, which a hidden
 * button never would.
 */
function ContactAction({
  icon: Icon,
  label,
  href,
  onClick,
}: {
  icon: typeof Phone;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const enabled = Boolean(href || onClick);
  const className = cn(
    'flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 transition-colors touch-manipulation',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
    enabled
      ? 'border-white/[0.1] bg-white/[0.05] hover:border-white/[0.2] hover:bg-white/[0.08] active:scale-[0.98]'
      : 'cursor-not-allowed border-white/[0.06] bg-white/[0.02] opacity-40'
  );
  const inner = (
    <>
      <Icon className={cn('h-4 w-4', enabled ? 'text-elec-yellow' : 'text-white')} />
      <span className="text-[12px] font-medium text-white">{label}</span>
    </>
  );

  if (!enabled) {
    return (
      <span className={className} aria-disabled="true">
        {inner}
      </span>
    );
  }
  if (href) {
    return (
      <a href={href} className={className} aria-label={label}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className} aria-label={label}>
      {inner}
    </button>
  );
}

// Computed "next action" suggestion from customer state.
function computeNextAction(
  customer: Customer,
  certCount: number,
  lifetimeValue: number
): { label: string; sub: string; tone: 'amber' | 'yellow' | 'blue' } | null {
  if (!customer.lastActivityAt && certCount === 0) {
    return {
      label: 'Start their first job',
      sub: 'No activity yet — kick off with a certificate or quote.',
      tone: 'yellow',
    };
  }
  if (customer.lastActivityAt) {
    const days = Math.floor(
      (Date.now() - new Date(customer.lastActivityAt).getTime()) / 86_400_000
    );
    if (days >= 90) {
      return {
        label: 'Check in',
        sub: `No activity for ${
          days >= 365 ? `${Math.floor(days / 30)} months` : `${days} days`
        }${lifetimeValue > 0 ? ` · £${Math.round(lifetimeValue).toLocaleString('en-GB')} historic` : ''}.`,
        tone: 'amber',
      };
    }
  }
  return null;
}

export default function CustomerDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const { customer, isLoading, refetch } = useCustomer(customerId || '');
  const { deleteCustomer, updateCustomer, mergeCustomers } = useCustomers();
  const { reports } = useCustomerReports(customerId || '');
  const { projects } = useCustomerProjects(customerId || '');
  const { logCall, logEmail, logVisit, isLogging } = useCustomerActivity(customerId || '');
  const { toast } = useToast();
  const { matches: duplicateMatches } = useCustomerDuplicates(
    customerId || '',
    customer?.email,
    customer?.phone
  );

  const [mergeTargetId, setMergeTargetId] = useState<string | null>(null);
  const [isMerging, setIsMerging] = useState(false);

  const handleMerge = async () => {
    if (!customerId || !mergeTargetId) return;
    setIsMerging(true);
    const success = await mergeCustomers(customerId, mergeTargetId);
    setIsMerging(false);
    if (success) {
      navigate(`/customers/${mergeTargetId}`);
    }
    setMergeTargetId(null);
  };

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [showStartCertificate, setShowStartCertificate] = useState(false);
  const [activeSection, setActiveSection] = useState<
    'work' | 'financials' | 'properties' | 'site-notes' | 'timeline'
  >('work');
  const [stats, setStats] = useState<{
    quoteCount: number;
    invoiceCount: number;
    totalInvoiced: number;
    totalQuoted: number;
  }>({ quoteCount: 0, invoiceCount: 0, totalInvoiced: 0, totalQuoted: 0 });

  useEffect(() => {
    if (!customerId) return;
    const run = async () => {
      try {
        const { data } = await supabase.rpc('get_customer_quote_stats', {
          p_customer_ids: [customerId],
        });
        if (data && data.length > 0) {
          const row = data[0];
          setStats({
            quoteCount: row.quote_count || 0,
            invoiceCount: row.invoice_count || 0,
            totalInvoiced: Number(row.total_invoiced || 0),
            totalQuoted: Number(row.total_quoted || 0),
          });
        }
      } catch {
        // RPC not available; leave defaults.
      }
    };
    run();
  }, [customerId]);

  // Pop back to the list rather than pushing a fresh /customers entry —
  // pushing meant the browser back button replayed this detail page instead
  // of leaving the CRM. Falls back to a replace for deep links.
  const backToList = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) navigate(-1);
    else navigate('/customers', { replace: true });
  };

  const handleDelete = async () => {
    if (customerId) {
      const success = await deleteCustomer(customerId);
      if (success) navigate('/customers', { replace: true });
    }
    setShowDeleteConfirm(false);
  };

  const handleUpdate = async (data: Partial<Customer>) => {
    if (customerId) {
      await updateCustomer(customerId, data as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>);
      refetch();
    }
    setShowEditDialog(false);
  };

  const handleInlineSave = async (field: string, value: string) => {
    if (!customerId) return;
    // ELE-1515 — the address is editable inline, and this path has no Places
    // dropdown behind it. Retyping it here has to drop the stored geocode, or
    // "Navigate to site" would keep routing to the previous property while the
    // screen shows the new address.
    const geoReset =
      field === 'address'
        ? { postcode: undefined, latitude: undefined, longitude: undefined }
        : {};
    await updateCustomer(customerId, {
      [field]: value || undefined,
      ...geoReset,
    } as Partial<Customer> as Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>);
    refetch();
  };

  const certCount = customer?.certificateCount ?? reports.length;
  const nextAction = useMemo(
    () => (customer ? computeNextAction(customer, certCount, stats.totalInvoiced) : null),
    [customer, certCount, stats.totalInvoiced]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          <p className="text-sm text-white">Loading customer…</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 pt-3">
          <button
            onClick={backToList}
            className="h-11 pr-2 text-[13px] font-semibold text-white transition-colors hover:text-white touch-manipulation"
          >
            Back
          </button>
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-sm rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-8 text-center">
            <p className="mb-2 text-lg font-semibold text-white">Customer not found</p>
            <p className="mb-5 text-sm text-white">This customer may have been deleted.</p>
            <Button
              onClick={() => navigate('/customers', { replace: true })}
              className="h-11 w-full rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
            >
              Back to customers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const memberSince = new Date(customer.createdAt).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  const canNavigate = canNavigateTo(customer);
  const goToSite = () =>
    navigateToAddress({
      address: customer.address,
      latitude: customer.latitude,
      longitude: customer.longitude,
    });

  return (
    <BusinessPageLayout
      title={customer.name}
      subtitle={[customer.companyName, `Customer since ${memberSince}`]
        .filter(Boolean)
        .join(' · ')}
      icon={Users}
      backUrl="/customers"
      onBack={backToList}
      actions={
        <>
          <button
            onClick={() => setShowEditDialog(true)}
            className="h-11 px-2.5 text-[13px] font-semibold text-white transition-colors touch-manipulation"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="h-11 px-2.5 text-[13px] font-semibold text-red-400/80 transition-colors hover:text-red-400 touch-manipulation"
          >
            Delete
          </button>
        </>
      }
    >
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto space-y-4 sm:space-y-5 lg:max-w-[1600px]"
      >
        {/* Identity — the name now lives in the header, so this card carries
            the things you act on rather than repeating it at 28px. */}
        <motion.div variants={itemVariants}>
          {/* Edge-to-edge on a phone, inset from sm: up — the house card rule. */}
          <div className={cn(HUB_CARD, '-mx-4 rounded-none border-x-0 p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5')}>
            <HairlineAccent />

            {/* Primary actions — the three things done on a customer record.
                Full-width 44px targets, because this is used one-handed in a
                van. All three always render; see ContactAction for why an
                unavailable one is greyed rather than hidden. */}
            <div className="flex items-stretch gap-2">
              <ContactAction
                icon={Phone}
                label="Call"
                href={customer.phone ? `tel:${customer.phone}` : undefined}
              />
              <ContactAction
                icon={Mail}
                label="Email"
                href={customer.email ? `mailto:${customer.email}` : undefined}
              />
              <ContactAction
                icon={Navigation}
                label="Navigate"
                onClick={canNavigate ? goToSite : undefined}
              />
            </div>

            {/* Tags */}
            {customer.tags && customer.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {customer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-7 items-center rounded-full border border-white/[0.16] bg-white/[0.08] px-2.5 text-[11px] font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Contact rows — inline editable */}
            <div className="mt-4 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3">
              <EditablePill
                value={customer.email}
                href={customer.email ? `mailto:${customer.email}` : undefined}
                placeholder="Not set"
                fieldKey="email"
                type="email"
                truncate={32}
                onSave={handleInlineSave}
              />
              <EditablePill
                value={customer.phone}
                href={customer.phone ? `tel:${customer.phone}` : undefined}
                placeholder="Not set"
                fieldKey="phone"
                type="tel"
                onSave={handleInlineSave}
              />
              <EditablePill
                value={customer.address}
                // ELE-1520 — prefers the stored coordinates over the address
                // text when Places captured them (ELE-1515).
                onActivate={
                  canNavigateTo(customer)
                    ? () =>
                        navigateToAddress({
                          address: customer.address,
                          latitude: customer.latitude,
                          longitude: customer.longitude,
                        })
                    : undefined
                }
                placeholder="Not set"
                fieldKey="address"
                truncate={40}
                onSave={handleInlineSave}
              />
            </div>
          </div>
        </motion.div>

        {/* Next-action banner */}
        {nextAction && (
          <motion.div variants={itemVariants}>
            <div
              className={cn(
                'flex flex-col gap-3 rounded-2xl border bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5',
                nextAction.tone === 'amber' ? 'border-amber-500/25' : 'border-white/[0.12]'
              )}
            >
              <div>
                <div
                  className={cn(
                    'text-[13px] font-semibold',
                    nextAction.tone === 'amber' ? 'text-amber-300' : 'text-elec-yellow'
                  )}
                >
                  {nextAction.label}
                </div>
                <div className="mt-0.5 text-[12.5px] text-white">{nextAction.sub}</div>
              </div>
              <div className="flex items-center gap-2 sm:shrink-0">
                {customer.phone && (
                  <a
                    href={`tel:${customer.phone}`}
                    className="flex h-9 items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[12.5px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                  >
                    Call
                  </a>
                )}
                {customer.email && (
                  <a
                    href={`mailto:${customer.email}`}
                    className="flex h-9 items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 text-[12.5px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                  >
                    Email
                  </a>
                )}
                <button
                  onClick={() => setShowStartCertificate(true)}
                  className="flex h-9 items-center rounded-full bg-elec-yellow px-4 text-[12.5px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Start
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/*
          Duplicate / merge.

          This used to render one full-size yellow button per match. Yellow is
          the primary-action colour, so three of them stacked above the record
          made "Merge into Andrew Moore" look like the main thing the page was
          for — on a screen you opened to look at a customer. Merging is also
          destructive and irreversible; it should not be the loudest control
          on the page, and certainly not a single tap away.

          Now: one quiet amber line stating the fact, and secondary buttons.
        */}
        {duplicateMatches.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="-mx-4 rounded-none border-y border-amber-500/25 bg-amber-500/[0.06] p-4 sm:mx-0 sm:rounded-2xl sm:border sm:p-5">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-amber-300">
                  {duplicateMatches.length === 1
                    ? 'Possible duplicate'
                    : `${duplicateMatches.length} possible duplicates`}
                </div>
                <div className="mt-0.5 text-[12.5px] text-white">
                  Matched on{' '}
                  {Array.from(new Set(duplicateMatches.flatMap((m) => m.matchOn))).join(' & ')}.
                  Merging combines all history and cannot be undone.
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {duplicateMatches.slice(0, 3).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMergeTargetId(m.id)}
                    className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-3.5 text-[12.5px] font-medium text-white transition-colors hover:border-white/[0.28] hover:bg-white/[0.09] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 touch-manipulation"
                  >
                    Merge into {m.name}
                    {m.certificateCount > 0 && (
                      <span className="text-white/55">· {m.certificateCount} certs</span>
                    )}
                  </button>
                ))}
                {duplicateMatches.length > 3 && (
                  <span className="text-[12px] text-white">
                    +{duplicateMatches.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/*
          One compact strip, not a 2×2 grid of large cards (~230px of phone
          screen, mostly showing zeroes on a new customer). Kept rather than
          deleted like the hub's stat board, because unlike that one these
          numbers are the customer's actual record and appear nowhere else —
          only Properties is repeated, on its tab.
        */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Certs', value: String(certCount), volt: false },
              { label: 'Properties', value: String(customer.propertyCount || 0), volt: false },
              { label: 'Quotes', value: String(stats.quoteCount), volt: false },
              {
                label: 'Lifetime',
                value: stats.totalInvoiced > 0 ? formatGBP(stats.totalInvoiced) : '£0',
                volt: stats.totalInvoiced > 0,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/[0.05] px-2 py-3 text-center"
              >
                {/* font-black + yellow on the figure, matching the hub's
                    StatCard. Lifetime stays the only one that can go yellow —
                    money is the number worth finding at a glance. */}
                <div
                  className={cn(
                    'truncate text-[17px] font-black tabular-nums tracking-tight sm:text-[19px]',
                    s.volt ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {s.value}
                </div>
                {/* 9px, no letter-spacing: "PROPERTIES" clipped to "PROPER…" in
                    a quarter of a 390px row at 10px + tracking. */}
                <div className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-normal text-white sm:text-[10px] sm:tracking-[0.1em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/*
          Actions — one card, not three sections.

          This was a 2×2 grid of prose cards (~230px of phone screen for four
          buttons), then a separate "Quick log" strip, then a separate "Ask
          Mate" banner. Three slabs, all of them launchers. Every description
          explained something the title already said: "Quick note — log a
          reminder, a follow-up, or what was said on the last call."

          Now: titles only, in a divided list. What each does is obvious from
          its name, and the whole set fits in the space one of the old cards
          took. Logging actions keep their toast, which is the confirmation
          that anything happened.
        */}
        <motion.section variants={itemVariants}>
          <div
            className={cn(
              HUB_CARD,
              '-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-2xl sm:border-x'
            )}
          >
            <HairlineAccent />
            <h3 className="px-4 pb-1 pt-4 text-[15px] font-semibold tracking-tight text-white sm:px-5">
              Actions
            </h3>
            <div className="mt-1 divide-y divide-white/[0.06]">
              {[
                { title: 'Start a certificate', onClick: () => setShowStartCertificate(true) },
                { title: 'Quote a job', onClick: () => navigate('/electrician/quotes') },
                { title: 'Add a note', onClick: () => setShowQuickNote(true) },
                {
                  title: 'Site addresses',
                  meta: `${customer.propertyCount || 0} saved`,
                  onClick: () => setActiveSection('properties'),
                },
                {
                  title: 'Log a call',
                  onClick: () => {
                    logCall();
                    toast({
                      title: 'Call logged',
                      description: `Logged call with ${customer.name}.`,
                    });
                  },
                  disabled: isLogging,
                },
                {
                  title: 'Log a site visit',
                  onClick: () => {
                    logVisit();
                    toast({
                      title: 'Site visit logged',
                      description: `Logged site visit for ${customer.name}.`,
                    });
                  },
                  disabled: isLogging,
                },
                {
                  title: 'Log an email',
                  onClick: () => {
                    logEmail();
                    toast({
                      title: 'Email logged',
                      description: `Logged email to ${customer.name}.`,
                    });
                  },
                  disabled: isLogging,
                },
                {
                  title: 'Ask Mate to handle the admin',
                  meta: 'Business Mate',
                  onClick: () => navigate('/electrician/business'),
                },
              ].map((a) => (
                <button
                  key={a.title}
                  onClick={a.onClick}
                  disabled={a.disabled}
                  className="flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.04] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/50 touch-manipulation sm:px-5"
                >
                  <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-white">
                    {a.title}
                  </span>
                  {a.meta && (
                    <span className="shrink-0 text-[11.5px] text-white">{a.meta}</span>
                  )}
                  <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">
                    Open
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.section>


        {/* Tabs */}
        <motion.section variants={itemVariants} className="space-y-4">
          {/* Five tabs no longer fit at flex-1 on a 360px phone — "Properties 3"
              would truncate to nothing. The rail scrolls on mobile (a standard
              native pattern) and goes back to equal widths from sm: up. */}
          <div className="flex w-full gap-1 overflow-x-auto rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] p-1 [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {(
              [
                { key: 'work' as const, label: 'Work' },
                { key: 'financials' as const, label: 'Financials' },
                {
                  key: 'properties' as const,
                  label: `Properties${customer.propertyCount ? ` ${customer.propertyCount}` : ''}`,
                },
                { key: 'site-notes' as const, label: 'Site notes' },
                { key: 'timeline' as const, label: 'Timeline' },
              ]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={cn(
                  'h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-[11.5px] font-medium transition-colors touch-manipulation sm:min-w-0 sm:flex-1 sm:shrink sm:truncate sm:px-4 sm:text-[13px]',
                  activeSection === tab.key
                    ? 'bg-elec-yellow font-semibold text-black'
                    : 'text-white hover:bg-white/[0.04]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'work' && (
              <CustomerOverviewTab
                customer={customer}
                onAddNote={() => setShowQuickNote(true)}
                onStartCertificate={() => setShowStartCertificate(true)}
                onRefresh={refetch}
              />
            )}
            {activeSection === 'financials' && <CustomerFinancialsTab customer={customer} />}
            {activeSection === 'properties' && (
              <CustomerPropertiesTab customerId={customer.id} onRefresh={refetch} />
            )}
            {activeSection === 'site-notes' && <CustomerSiteNotesTab customerId={customer.id} />}
            {activeSection === 'timeline' && <CustomerTimelineTab customerId={customer.id} />}
          </motion.div>
        </motion.section>

        {/* Secondary detail — reminders, extra contacts and linked projects.
            Below the tabs on purpose: these are reference, not the reason
            the page was opened, and each used to own a full-width slab above
            the content people actually came for. */}
        {/* Reminders */}
        <motion.section variants={itemVariants}>
          <CustomerReminders customerId={customer.id} />
        </motion.section>

        {/* Contacts */}
        <motion.section variants={itemVariants}>
          <CustomerContacts customerId={customer.id} />
        </motion.section>

        {/* Linked projects */}
        {projects.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Projects
                <span className="ml-2 text-[13px] font-medium text-white tabular-nums">
                  {projects.length}
                </span>
              </h3>
              <button
                onClick={() => navigate('/electrician/projects')}
                className="flex h-11 items-center text-[13px] font-semibold text-elec-yellow transition-colors hover:text-elec-yellow/80 touch-manipulation"
              >
                All projects
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] divide-y divide-white/[0.06]">
              {projects.slice(0, 5).map((p) => {
                const statusTone: 'blue' | 'green' | 'amber' | 'red' =
                  p.completedAt
                    ? 'green'
                    : p.status === 'in_progress' || p.status === 'active'
                      ? 'blue'
                      : p.status === 'on_hold' || p.status === 'blocked'
                        ? 'red'
                        : 'amber';
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/electrician/projects/${p.id}`)}
                    className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[hsl(0_0%_15%)] touch-manipulation"
                  >
                    <Dot tone={statusTone} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14.5px] font-medium text-white">
                        {p.title}
                      </div>
                      <div className="mt-0.5 truncate text-[12px] text-white">
                        {[
                          p.status.replace(/_/g, ' '),
                          p.location,
                          p.dueDate
                            ? `due ${new Date(p.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </div>
                    </div>
                    {p.estimatedValue !== null && p.estimatedValue > 0 && (
                      <span className="shrink-0 text-[12.5px] font-medium tabular-nums text-white">
                        {formatGBP(p.estimatedValue)}
                      </span>
                    )}
                    <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">
                      Open
                    </span>
                  </button>
                );
              })}
            </div>
            {projects.length > 5 && (
              <p className="text-[12px] text-white">
                Showing 5 of {projects.length} — view all in the projects hub.
              </p>
            )}
          </motion.section>
        )}

      </motion.main>

      <CustomerForm
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        customer={customer}
        onSave={handleUpdate}
      />

      {/* Merge confirmation */}
      <AlertDialog
        open={!!mergeTargetId}
        onOpenChange={(open) => !open && setMergeTargetId(null)}
      >
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.08] bg-[#111114] shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Merge customers?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white">
              Move every certificate, quote, invoice, project, contact, reminder and activity from{' '}
              <span className="font-medium text-white">&ldquo;{customer.name}&rdquo;</span> into{' '}
              <span className="font-medium text-white">
                &ldquo;
                {duplicateMatches.find((m) => m.id === mergeTargetId)?.name}&rdquo;
              </span>
              . The current customer record will then be deleted. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={handleMerge}
              disabled={isMerging}
              className="h-11 w-full touch-manipulation rounded-xl bg-elec-yellow font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50"
            >
              {isMerging ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Merge customers'}
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.08] bg-[#111114] shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Delete customer?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white">
              This will permanently remove &ldquo;{customer.name}&rdquo; and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={handleDelete}
              className="h-11 w-full touch-manipulation rounded-xl border border-red-500/25 bg-red-500/15 font-medium text-red-400 transition-all hover:bg-red-500/25 active:scale-[0.98]"
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <QuickNoteDialog
        open={showQuickNote}
        onOpenChange={setShowQuickNote}
        customerId={customer.id}
      />
      {customer && (
        <StartCertificateDialog
          open={showStartCertificate}
          onOpenChange={setShowStartCertificate}
          customer={customer}
        />
      )}
    </BusinessPageLayout>
  );
}
