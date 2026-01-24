import React, { useState, useEffect } from 'react';
import { ChevronRight, FileText, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CompanyProfile } from '@/types/company';
import { cn } from '@/lib/utils';

interface QuoteSettingsCardProps {
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

// Default T&Cs grouped by category - comprehensive list
const DEFAULT_TERMS_GROUPED = {
  payment: {
    label: 'Payment Terms',
    terms: [
      { id: 'payment_30', label: 'Payment due within 30 days of invoice date' },
      { id: 'payment_14', label: 'Payment due within 14 days of invoice date' },
      { id: 'payment_on_completion', label: 'Payment due upon completion of works' },
      { id: 'deposit_required', label: 'A deposit of the specified percentage is required before work commences' },
      { id: 'additional_charges', label: 'Additional work not included in this quote will be charged at our standard hourly rate' },
      { id: 'late_payment', label: 'Late payments may incur interest charges as per the Late Payment of Commercial Debts Act' },
      { id: 'payment_methods', label: 'We accept bank transfer, card payments, and cash' },
    ],
  },
  warranty: {
    label: 'Warranty & Guarantee',
    terms: [
      { id: 'warranty_workmanship', label: 'All workmanship is guaranteed for the warranty period specified' },
      { id: 'warranty_materials', label: 'Materials are covered by manufacturer warranties where applicable' },
      { id: 'warranty_callback', label: 'Free callback within warranty period for any defects in our workmanship' },
      { id: 'warranty_exclusions', label: 'Warranty excludes damage caused by misuse, third-party interference, or acts of nature' },
    ],
  },
  compliance: {
    label: 'Compliance & Certification',
    terms: [
      { id: 'bs7671_compliance', label: 'All electrical work complies with BS 7671 (18th Edition) Wiring Regulations' },
      { id: 'part_p_notification', label: 'Building control notification (Part P) included where required' },
      { id: 'testing_cert', label: 'Electrical installation certificate or minor works certificate provided on completion' },
      { id: 'competent_person', label: 'All work carried out by qualified electricians registered with a competent person scheme' },
      { id: 'insurance', label: 'Fully insured for public liability and professional indemnity' },
    ],
  },
  site: {
    label: 'Site Access & Safety',
    terms: [
      { id: 'access_required', label: 'Clear access to work areas must be provided' },
      { id: 'power_isolation', label: 'Power may need to be isolated during installation - advance notice will be given' },
      { id: 'site_safety', label: 'Work area will be left safe and clean at the end of each working day' },
      { id: 'asbestos_disclaimer', label: 'This quote excludes work involving asbestos - if discovered, work will stop pending survey' },
      { id: 'parking', label: 'Suitable parking should be available close to the property' },
      { id: 'working_hours', label: 'Standard working hours are 8am-5pm Monday to Friday unless otherwise agreed' },
    ],
  },
  general: {
    label: 'General Conditions',
    terms: [
      { id: 'price_validity', label: 'This quotation is valid for the number of days specified from the date of issue' },
      { id: 'cancellation', label: 'Cancellation within 48 hours of scheduled work may incur charges' },
      { id: 'unforeseen_works', label: 'Unforeseen works discovered during installation will be quoted separately' },
      { id: 'price_subject', label: 'Prices are subject to change if scope of work differs from description' },
      { id: 'materials_ownership', label: 'All materials remain our property until paid for in full' },
      { id: 'variations', label: 'Any variations to the agreed scope must be confirmed in writing' },
    ],
  },
};

const ALL_DEFAULT_TERM_IDS = Object.values(DEFAULT_TERMS_GROUPED).flatMap(group => group.terms.map(t => t.id));

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
      return {
        selected: parsed.selected,
        custom: parsed.custom || [],
      };
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

const QuoteSettingsCard: React.FC<QuoteSettingsCardProps> = ({
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [quoteValidityDays, setQuoteValidityDays] = useState(30);
  const [depositPercentage, setDepositPercentage] = useState(30);
  const [warrantyPeriod, setWarrantyPeriod] = useState('12 months');

  // T&Cs state
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);
  const [customTerms, setCustomTerms] = useState<CustomTerm[]>([]);
  const [newCustomTerm, setNewCustomTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['payment', 'compliance']);

  // Initialize from company profile
  useEffect(() => {
    if (companyProfile) {
      setQuoteValidityDays(companyProfile.quote_validity_days || 30);
      setDepositPercentage(companyProfile.deposit_percentage || 30);
      setWarrantyPeriod(companyProfile.warranty_period || '12 months');

      const parsedTerms = parseQuoteTerms(companyProfile.quote_terms);
      setSelectedTerms(parsedTerms.selected);
      setCustomTerms(parsedTerms.custom);
    }
  }, [companyProfile]);

  const handleSave = async () => {
    setIsSaving(true);
    const quoteTermsJson = JSON.stringify({
      selected: selectedTerms,
      custom: customTerms,
    });

    await onSave({
      quote_validity_days: quoteValidityDays,
      deposit_percentage: depositPercentage,
      warranty_period: warrantyPeriod,
      quote_terms: quoteTermsJson,
    });
    setIsSaving(false);
    setIsExpanded(false);
  };

  const addCustomTerm = () => {
    if (newCustomTerm.trim()) {
      const newId = `custom_${Date.now()}`;
      const newTerm = { id: newId, label: newCustomTerm.trim() };
      setCustomTerms(prev => [...prev, newTerm]);
      setSelectedTerms(prev => [...prev, newId]);
      setNewCustomTerm('');
    }
  };

  const selectedCount = selectedTerms.length;

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[15px] font-semibold text-white">Quote Settings</span>
          <span className="text-xs text-white/40 ml-2">
            {selectedCount} terms selected
          </span>
        </div>
        <ChevronRight className={cn("h-5 w-5 text-white/30 transition-transform", isExpanded && "rotate-90")} />
      </button>

      {/* Collapsed Preview */}
      {!isExpanded && (
        <div className="px-5 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-white/50">Quote Validity</p>
              <p className="text-[15px] text-white font-medium">{quoteValidityDays} days</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-white/50">Deposit</p>
              <p className="text-[15px] text-white font-medium">{depositPercentage}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Form */}
      {isExpanded && (
        <div className="p-5 space-y-6">
          {/* Quote Settings */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs sm:text-sm">Quote Valid (Days)</Label>
              <Input
                type="number"
                min="1"
                max="365"
                value={quoteValidityDays}
                onChange={(e) => setQuoteValidityDays(parseInt(e.target.value) || 30)}
                className="bg-white/5 border-white/10 text-white h-11 text-base touch-manipulation"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-xs sm:text-sm">Deposit (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={depositPercentage}
                onChange={(e) => setDepositPercentage(parseInt(e.target.value) || 0)}
                className="bg-white/5 border-white/10 text-white h-11 text-base touch-manipulation"
              />
            </div>
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label className="text-white/70 text-xs sm:text-sm">Warranty Period</Label>
              <Input
                value={warrantyPeriod}
                onChange={(e) => setWarrantyPeriod(e.target.value)}
                placeholder="12 months"
                className="bg-white/5 border-white/10 text-white h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          {/* T&Cs Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white font-medium">Terms & Conditions</Label>
              <span className="text-xs text-white/40">{selectedCount} selected</span>
            </div>

            {/* Grouped Terms */}
            {Object.entries(DEFAULT_TERMS_GROUPED).map(([groupKey, group]) => {
              const groupTermIds = group.terms.map(t => t.id);
              const selectedInGroup = groupTermIds.filter(id => selectedTerms.includes(id)).length;
              const isGroupExpanded = expandedGroups.includes(groupKey);

              return (
                <Collapsible
                  key={groupKey}
                  open={isGroupExpanded}
                  onOpenChange={(open) => {
                    setExpandedGroups(prev =>
                      open ? [...prev, groupKey] : prev.filter(g => g !== groupKey)
                    );
                  }}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-3 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation min-h-[48px]">
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          selectedInGroup > 0 ? "bg-elec-yellow" : "bg-white/20"
                        )} />
                        <span className="text-[14px] sm:text-sm font-medium text-white text-left">{group.label}</span>
                        <span className={cn(
                          "text-xs px-1.5 py-0.5 rounded-full",
                          selectedInGroup > 0 ? "bg-elec-yellow/20 text-elec-yellow" : "bg-white/10 text-white/40"
                        )}>
                          {selectedInGroup}/{groupTermIds.length}
                        </span>
                      </div>
                      {isGroupExpanded ? (
                        <ChevronUp className="h-5 w-5 text-white/40" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-white/40" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-2 sm:pl-3 pt-2 space-y-0.5">
                      {group.terms.map((term) => {
                        const isSelected = selectedTerms.includes(term.id);
                        return (
                          <label
                            key={term.id}
                            className="flex items-start gap-3 p-2.5 sm:p-2 rounded-lg hover:bg-white/5 active:bg-white/10 cursor-pointer touch-manipulation min-h-[44px]"
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                setSelectedTerms(prev =>
                                  checked
                                    ? [...prev, term.id]
                                    : prev.filter(id => id !== term.id)
                                );
                              }}
                              className="mt-0.5 h-5 w-5 shrink-0 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                            />
                            <span className="text-[14px] sm:text-sm text-white/80 leading-relaxed text-left flex-1">{term.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* Custom Terms */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-white font-medium text-sm">Your Custom Terms</Label>
                <span className="text-xs text-white/40">{customTerms.length} added</span>
              </div>

              {/* Add custom term input - prominent position */}
              <div className="flex gap-2 mb-4">
                <Input
                  value={newCustomTerm}
                  onChange={(e) => setNewCustomTerm(e.target.value)}
                  placeholder="Type your own term and tap +"
                  className="flex-1 bg-white/5 border-white/10 text-white h-11 text-[14px] sm:text-sm touch-manipulation"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTerm();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={!newCustomTerm.trim()}
                  onClick={addCustomTerm}
                  className="h-11 w-11 bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20 active:bg-elec-yellow/30 text-elec-yellow touch-manipulation shrink-0"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {customTerms.length > 0 && (
                <div className="space-y-1 bg-white/[0.02] rounded-lg p-2">
                  {customTerms.map((term) => {
                    const isSelected = selectedTerms.includes(term.id);
                    return (
                      <div key={term.id} className="flex items-start gap-3 p-2.5 sm:p-2 rounded-lg bg-white/5 min-h-[44px]">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            setSelectedTerms(prev =>
                              checked ? [...prev, term.id] : prev.filter(id => id !== term.id)
                            );
                          }}
                          className="mt-0.5 h-5 w-5 shrink-0 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                        />
                        <span className="flex-1 text-[14px] sm:text-sm text-white/80 text-left leading-relaxed">{term.label}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomTerms(prev => prev.filter(t => t.id !== term.id));
                            setSelectedTerms(prev => prev.filter(id => id !== term.id));
                          }}
                          className="p-2 -m-1 rounded-lg hover:bg-red-500/20 active:bg-red-500/30 text-white/40 hover:text-red-400 transition-colors touch-manipulation"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {customTerms.length === 0 && (
                <p className="text-xs text-white/40 text-center py-2">
                  Add your own custom terms above
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedTerms(ALL_DEFAULT_TERM_IDS)}
                className="flex-1 h-10 text-xs sm:text-sm border-white/10 hover:bg-white/10 active:bg-white/20 text-white/70 touch-manipulation"
              >
                Select All Defaults
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedTerms([])}
                className="flex-1 h-10 text-xs sm:text-sm border-white/10 hover:bg-white/10 active:bg-white/20 text-white/70 touch-manipulation"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/80 text-black font-semibold touch-manipulation"
          >
            {isSaving ? 'Saving...' : 'Save Quote Settings'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuoteSettingsCard;
