import React, { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

interface CustomTerm {
  id: string;
  label: string;
}

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

function parseInvoiceTerms(invoiceTermsJson: string | undefined | null): {
  selected: string[];
  custom: CustomTerm[];
} {
  if (!invoiceTermsJson) {
    return {
      selected: [
        'inv_payment_due',
        'inv_use_reference',
        'inv_late_interest',
        'inv_workmanship',
        'inv_compliance',
        'inv_queries',
      ],
      custom: [],
    };
  }
  try {
    const parsed = JSON.parse(invoiceTermsJson);
    if (parsed.selected && Array.isArray(parsed.selected)) {
      return { selected: parsed.selected, custom: parsed.custom || [] };
    }
    return {
      selected: ['inv_payment_due', 'inv_use_reference', 'inv_late_interest'],
      custom: [],
    };
  } catch {
    return {
      selected: ['inv_payment_due', 'inv_use_reference', 'inv_late_interest'],
      custom: [],
    };
  }
}

interface InvoiceSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const InvoiceSettingsSheet = ({
  open,
  onOpenChange,
  profile,
  onSave,
}: InvoiceSettingsSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [latePaymentInterestRate, setLatePaymentInterestRate] = useState('8% p.a.');
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState('Bank Transfer');
  const [selectedInvoiceTerms, setSelectedInvoiceTerms] = useState<string[]>([]);
  const [customInvoiceTerms, setCustomInvoiceTerms] = useState<CustomTerm[]>([]);
  const [newCustomInvoiceTerm, setNewCustomInvoiceTerm] = useState('');
  // ELE-1083 — default toggle states for new invoices
  const [defVatRegistered, setDefVatRegistered] = useState(true);
  const [defReverseCharge, setDefReverseCharge] = useState(false);
  const [defCisEnabled, setDefCisEnabled] = useState(false);
  const [defSummaryView, setDefSummaryView] = useState(false);
  const [expandedInvoiceGroups, setExpandedInvoiceGroups] = useState<string[]>([
    'payment',
    'late_payment',
  ]);

  // Hydrate ONCE per open transition (see CompanySheet for rationale).
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    if (!profile) return;
    setLatePaymentInterestRate(profile.late_payment_interest_rate || '8% p.a.');
    setPreferredPaymentMethod(profile.preferred_payment_method || 'Bank Transfer');
    const parsed = parseInvoiceTerms(profile.invoice_terms);
    setSelectedInvoiceTerms(parsed.selected);
    setCustomInvoiceTerms(parsed.custom);
    setNewCustomInvoiceTerm('');
    setDefVatRegistered(
      profile.default_vat_registered ?? !!(profile.vat_number && profile.vat_number.trim())
    );
    setDefReverseCharge(profile.default_reverse_charge ?? false);
    setDefCisEnabled(profile.default_cis_enabled ?? false);
    setDefSummaryView(profile.default_invoice_summary_view ?? false);
    hydratedForOpenRef.current = true;
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const invoiceTermsJson = JSON.stringify({
        selected: selectedInvoiceTerms,
        custom: customInvoiceTerms,
      });
      const success = await onSave({
        invoice_terms: invoiceTermsJson,
        late_payment_interest_rate: latePaymentInterestRate,
        preferred_payment_method: preferredPaymentMethod,
        default_vat_registered: defVatRegistered,
        default_reverse_charge: defReverseCharge,
        default_cis_enabled: defCisEnabled,
        default_invoice_summary_view: defSummaryView,
      });
      if (success) {
        toast.success('Invoice settings saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Invoices</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Invoice settings
            </h2>
            <p className="mt-1 text-[13px] text-white">Payment terms and conditions</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">
                  Late payment interest
                </Label>
                <Input
                  value={latePaymentInterestRate}
                  onChange={(e) => setLatePaymentInterestRate(e.target.value)}
                  placeholder="8% p.a."
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">
                  Preferred payment
                </Label>
                <Input
                  value={preferredPaymentMethod}
                  onChange={(e) => setPreferredPaymentMethod(e.target.value)}
                  placeholder="Bank Transfer"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* ELE-1083 — Defaults for new invoices */}
            <div className="space-y-3">
              <Eyebrow>Defaults for new invoices</Eyebrow>
              <p className="text-[12px] text-white/55 -mt-1">
                These set how each new invoice starts — you can still change them per invoice.
              </p>
              {([
                ['VAT registered', 'Add VAT by default', defVatRegistered, setDefVatRegistered],
                ['Reverse charge', 'CIS domestic reverse-charge VAT by default', defReverseCharge, setDefReverseCharge],
                ['CIS deduction', 'Apply CIS to labour by default', defCisEnabled, setDefCisEnabled],
                ['Summary view', 'Show Labour & Materials totals instead of itemised', defSummaryView, setDefSummaryView],
              ] as [string, string, boolean, (v: boolean) => void][]).map(([label, hint, val, set]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-white">{label}</p>
                    <p className="text-[11.5px] text-white/55 mt-0.5">{hint}</p>
                  </div>
                  <Switch checked={val} onCheckedChange={set} className="flex-shrink-0" />
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Invoice T&Cs */}
            <div className="space-y-3">
              <Eyebrow>Invoice terms &amp; conditions</Eyebrow>
              {Object.entries(DEFAULT_INVOICE_TERMS_GROUPED).map(([groupKey, group]) => {
                const groupTermIds = group.terms.map((t) => t.id);
                const selectedInGroup = groupTermIds.filter((id) =>
                  selectedInvoiceTerms.includes(id)
                ).length;
                const isExpanded = expandedInvoiceGroups.includes(groupKey);

                return (
                  <Collapsible
                    key={groupKey}
                    open={isExpanded}
                    onOpenChange={(o) =>
                      setExpandedInvoiceGroups((prev) =>
                        o ? [...prev, groupKey] : prev.filter((g) => g !== groupKey)
                      )
                    }
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[13px] font-medium text-white">
                            {group.label}
                          </span>
                          <span className="text-[11px] text-white">
                            ({selectedInGroup}/{groupTermIds.length})
                          </span>
                        </div>
                        <span
                          aria-hidden
                          className={cn(
                            'text-[12px] text-white transition-transform',
                            isExpanded && 'rotate-180'
                          )}
                        >
                          ▾
                        </span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-3 pt-2 space-y-1">
                        {group.terms.map((term) => {
                          const isSelected = selectedInvoiceTerms.includes(term.id);
                          return (
                            <label
                              key={term.id}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer touch-manipulation"
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) =>
                                  setSelectedInvoiceTerms((prev) =>
                                    checked
                                      ? [...prev, term.id]
                                      : prev.filter((id) => id !== term.id)
                                  )
                                }
                                className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                              />
                              <span className="text-[13px] text-white leading-relaxed">
                                {term.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

              {/* Custom invoice terms */}
              {customInvoiceTerms.length > 0 && (
                <div className="space-y-2 pt-2">
                  {customInvoiceTerms.map((term) => (
                    <div
                      key={term.id}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
                    >
                      <Checkbox
                        checked={selectedInvoiceTerms.includes(term.id)}
                        onCheckedChange={(checked) =>
                          setSelectedInvoiceTerms((prev) =>
                            checked
                              ? [...prev, term.id]
                              : prev.filter((id) => id !== term.id)
                          )
                        }
                        className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                      />
                      <span className="flex-1 text-[13px] text-white">{term.label}</span>
                      <button
                        type="button"
                        aria-label="Remove term"
                        onClick={() => {
                          setCustomInvoiceTerms((prev) =>
                            prev.filter((t) => t.id !== term.id)
                          );
                          setSelectedInvoiceTerms((prev) =>
                            prev.filter((id) => id !== term.id)
                          );
                        }}
                        className="h-8 w-8 rounded-lg text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation text-[16px] leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={newCustomInvoiceTerm}
                  onChange={(e) => setNewCustomInvoiceTerm(e.target.value)}
                  placeholder="Add custom invoice term…"
                  className="flex-1 h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCustomInvoiceTerm.trim()) {
                      e.preventDefault();
                      const newId = `inv_custom_${Date.now()}`;
                      setCustomInvoiceTerms((prev) => [
                        ...prev,
                        { id: newId, label: newCustomInvoiceTerm.trim() },
                      ]);
                      setSelectedInvoiceTerms((prev) => [...prev, newId]);
                      setNewCustomInvoiceTerm('');
                    }
                  }}
                />
                <button
                  type="button"
                  disabled={!newCustomInvoiceTerm.trim()}
                  onClick={() => {
                    if (newCustomInvoiceTerm.trim()) {
                      const newId = `inv_custom_${Date.now()}`;
                      setCustomInvoiceTerms((prev) => [
                        ...prev,
                        { id: newId, label: newCustomInvoiceTerm.trim() },
                      ]);
                      setSelectedInvoiceTerms((prev) => [...prev, newId]);
                      setNewCustomInvoiceTerm('');
                    }
                  }}
                  className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvoiceSettingsSheet;
