import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

interface CustomTerm {
  id: string;
  label: string;
}

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

function parseQuoteTerms(quoteTermsJson: string | undefined | null): {
  selected: string[];
  custom: CustomTerm[];
} {
  if (!quoteTermsJson) {
    return {
      selected: [
        'payment_30',
        'deposit_required',
        'warranty_workmanship',
        'bs7671_compliance',
        'testing_cert',
        'price_validity',
      ],
      custom: [],
    };
  }
  try {
    const parsed = JSON.parse(quoteTermsJson);
    if (parsed.selected && Array.isArray(parsed.selected)) {
      return { selected: parsed.selected, custom: parsed.custom || [] };
    }
    return {
      selected: ['payment_30', 'warranty_workmanship', 'bs7671_compliance'],
      custom: [],
    };
  } catch {
    return {
      selected: ['payment_30', 'warranty_workmanship', 'bs7671_compliance'],
      custom: [],
    };
  }
}

interface QuoteSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const QuoteSettingsSheet = ({ open, onOpenChange, profile, onSave }: QuoteSettingsSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [quoteValidityDays, setQuoteValidityDays] = useState(30);
  const [depositPercentage, setDepositPercentage] = useState(30);
  const [warrantyPeriod, setWarrantyPeriod] = useState('12 months');
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [customTerms, setCustomTerms] = useState<CustomTerm[]>([]);
  const [newCustomTerm, setNewCustomTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['payment', 'compliance']);

  useEffect(() => {
    if (profile && open) {
      setQuoteValidityDays(profile.quote_validity_days || 30);
      setDepositPercentage(profile.deposit_percentage ?? 30);
      setWarrantyPeriod(profile.warranty_period || '12 months');
      const parsed = parseQuoteTerms(profile.quote_terms);
      setSelectedTerms(parsed.selected);
      setCustomTerms(parsed.custom);
      setNewCustomTerm('');
    }
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const quoteTermsJson = JSON.stringify({
        selected: selectedTerms,
        custom: customTerms,
      });
      const success = await onSave({
        quote_validity_days: quoteValidityDays,
        deposit_percentage: depositPercentage,
        warranty_period: warrantyPeriod,
        quote_terms: quoteTermsJson,
      });
      if (success) {
        toast.success('Quote settings saved');
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
            <Eyebrow>Quotes</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Quote settings
            </h2>
            <p className="mt-1 text-[13px] text-white">Validity, deposit and terms</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Validity (days)</Label>
                <Input
                  type="number"
                  value={quoteValidityDays}
                  onChange={(e) =>
                    setQuoteValidityDays(parseInt(e.target.value) || 30)
                  }
                  placeholder="30"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Deposit %</Label>
                <Select
                  value={String(depositPercentage)}
                  onValueChange={(v) => setDepositPercentage(parseInt(v, 10))}
                >
                  <SelectTrigger className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                    <SelectValue placeholder="Select deposit" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
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
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Warranty</Label>
                <Input
                  value={warrantyPeriod}
                  onChange={(e) => setWarrantyPeriod(e.target.value)}
                  placeholder="12 months"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* T&Cs */}
            <div className="space-y-3">
              <Eyebrow>Terms &amp; conditions</Eyebrow>
              {Object.entries(DEFAULT_TERMS_GROUPED).map(([groupKey, group]) => {
                const groupTermIds = group.terms.map((t) => t.id);
                const selectedInGroup = groupTermIds.filter((id) =>
                  selectedTerms.includes(id)
                ).length;
                const isExpanded = expandedGroups.includes(groupKey);

                return (
                  <Collapsible
                    key={groupKey}
                    open={isExpanded}
                    onOpenChange={(o) =>
                      setExpandedGroups((prev) =>
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
                          const isSelected = selectedTerms.includes(term.id);
                          return (
                            <label
                              key={term.id}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] cursor-pointer touch-manipulation"
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) =>
                                  setSelectedTerms((prev) =>
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

              {/* Custom terms */}
              {customTerms.length > 0 && (
                <div className="space-y-2 pt-2">
                  {customTerms.map((term) => (
                    <div
                      key={term.id}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
                    >
                      <Checkbox
                        checked={selectedTerms.includes(term.id)}
                        onCheckedChange={(checked) =>
                          setSelectedTerms((prev) =>
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
                        onClick={() => {
                          setCustomTerms((prev) => prev.filter((t) => t.id !== term.id));
                          setSelectedTerms((prev) => prev.filter((id) => id !== term.id));
                        }}
                        aria-label="Remove term"
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
                  value={newCustomTerm}
                  onChange={(e) => setNewCustomTerm(e.target.value)}
                  placeholder="Add custom term…"
                  className="flex-1 h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newCustomTerm.trim()) {
                      e.preventDefault();
                      const newId = `custom_${Date.now()}`;
                      setCustomTerms((prev) => [
                        ...prev,
                        { id: newId, label: newCustomTerm.trim() },
                      ]);
                      setSelectedTerms((prev) => [...prev, newId]);
                      setNewCustomTerm('');
                    }
                  }}
                />
                <button
                  type="button"
                  disabled={!newCustomTerm.trim()}
                  onClick={() => {
                    if (newCustomTerm.trim()) {
                      const newId = `custom_${Date.now()}`;
                      setCustomTerms((prev) => [
                        ...prev,
                        { id: newId, label: newCustomTerm.trim() },
                      ]);
                      setSelectedTerms((prev) => [...prev, newId]);
                      setNewCustomTerm('');
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

export default QuoteSettingsSheet;
