import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FileText, Plus, X, ChevronDown, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';

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

interface InvoiceSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const InvoiceSettingsSheet = ({ open, onOpenChange, profile, onSave }: InvoiceSettingsSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [latePaymentInterestRate, setLatePaymentInterestRate] = useState('8% p.a.');
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState('Bank Transfer');
  const [selectedInvoiceTerms, setSelectedInvoiceTerms] = useState<string[]>([]);
  const [customInvoiceTerms, setCustomInvoiceTerms] = useState<CustomTerm[]>([]);
  const [newCustomInvoiceTerm, setNewCustomInvoiceTerm] = useState('');
  const [expandedInvoiceGroups, setExpandedInvoiceGroups] = useState<string[]>(['payment', 'late_payment']);

  useEffect(() => {
    if (profile && open) {
      setLatePaymentInterestRate(profile.late_payment_interest_rate || '8% p.a.');
      setPreferredPaymentMethod(profile.preferred_payment_method || 'Bank Transfer');
      const parsed = parseInvoiceTerms(profile.invoice_terms);
      setSelectedInvoiceTerms(parsed.selected);
      setCustomInvoiceTerms(parsed.custom);
      setNewCustomInvoiceTerm('');
    }
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const invoiceTermsJson = JSON.stringify({ selected: selectedInvoiceTerms, custom: customInvoiceTerms });
      const success = await onSave({
        invoice_terms: invoiceTermsJson,
        late_payment_interest_rate: latePaymentInterestRate,
        preferred_payment_method: preferredPaymentMethod,
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Invoice Settings</h2>
              <p className="text-xs text-white">Payment terms and conditions</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Late Payment Interest</Label>
                <Input
                  value={latePaymentInterestRate}
                  onChange={(e) => setLatePaymentInterestRate(e.target.value)}
                  placeholder="8% p.a."
                  className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Preferred Payment</Label>
                <Input
                  value={preferredPaymentMethod}
                  onChange={(e) => setPreferredPaymentMethod(e.target.value)}
                  placeholder="Bank Transfer"
                  className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Invoice T&Cs Checklist */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-white uppercase tracking-wider">Invoice Terms & Conditions</Label>
              {Object.entries(DEFAULT_INVOICE_TERMS_GROUPED).map(([groupKey, group]) => {
                const groupTermIds = group.terms.map((t) => t.id);
                const selectedInGroup = groupTermIds.filter((id) => selectedInvoiceTerms.includes(id)).length;
                const isExpanded = expandedInvoiceGroups.includes(groupKey);

                return (
                  <Collapsible
                    key={groupKey}
                    open={isExpanded}
                    onOpenChange={(o) => setExpandedInvoiceGroups((prev) => o ? [...prev, groupKey] : prev.filter((g) => g !== groupKey))}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.06] transition-colors touch-manipulation">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-[13px] font-medium text-white">{group.label}</span>
                          <span className="text-[11px] text-white">({selectedInGroup}/{groupTermIds.length})</span>
                        </div>
                        <ChevronDown className={cn('h-4 w-4 text-white transition-transform', isExpanded && 'rotate-180')} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-3 pt-2 space-y-1">
                        {group.terms.map((term) => {
                          const isSelected = selectedInvoiceTerms.includes(term.id);
                          return (
                            <label key={term.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02] cursor-pointer touch-manipulation">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => setSelectedInvoiceTerms((prev) => checked ? [...prev, term.id] : prev.filter((id) => id !== term.id))}
                                className="mt-0.5 border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <span className="text-[13px] text-white leading-relaxed">{term.label}</span>
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
                        onCheckedChange={(checked) => setSelectedInvoiceTerms((prev) => checked ? [...prev, term.id] : prev.filter((id) => id !== term.id))}
                        className="mt-0.5 border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <span className="flex-1 text-[13px] text-white">{term.label}</span>
                      <button
                        type="button"
                        onClick={() => { setCustomInvoiceTerms((prev) => prev.filter((t) => t.id !== term.id)); setSelectedInvoiceTerms((prev) => prev.filter((id) => id !== term.id)); }}
                        className="p-1 text-white hover:text-red-400"
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
                  className="flex-1 h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCustomInvoiceTerm.trim()) {
                      e.preventDefault();
                      const newId = `inv_custom_${Date.now()}`;
                      setCustomInvoiceTerms((prev) => [...prev, { id: newId, label: newCustomInvoiceTerm.trim() }]);
                      setSelectedInvoiceTerms((prev) => [...prev, newId]);
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
                      setCustomInvoiceTerms((prev) => [...prev, { id: newId, label: newCustomInvoiceTerm.trim() }]);
                      setSelectedInvoiceTerms((prev) => [...prev, newId]);
                      setNewCustomInvoiceTerm('');
                    }
                  }}
                  className="h-11 w-11 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              {isSaving ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-5 w-5" /> Save</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InvoiceSettingsSheet;
