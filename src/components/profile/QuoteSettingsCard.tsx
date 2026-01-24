import React, { useState, useEffect } from 'react';
import { ChevronRight, FileText, Check, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
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

// Default T&Cs grouped by category
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
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-white/70 text-sm">Validity (Days)</Label>
              <Input
                type="number"
                min="1"
                max="365"
                value={quoteValidityDays}
                onChange={(e) => setQuoteValidityDays(parseInt(e.target.value) || 30)}
                className="bg-white/5 border-white/10 text-white h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/70 text-sm">Deposit (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={depositPercentage}
                onChange={(e) => setDepositPercentage(parseInt(e.target.value) || 0)}
                className="bg-white/5 border-white/10 text-white h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/70 text-sm">Warranty</Label>
              <Input
                value={warrantyPeriod}
                onChange={(e) => setWarrantyPeriod(e.target.value)}
                placeholder="12 months"
                className="bg-white/5 border-white/10 text-white h-11"
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
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors touch-manipulation">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{group.label}</span>
                        <span className="text-xs text-white/40">({selectedInGroup}/{groupTermIds.length})</span>
                      </div>
                      {isGroupExpanded ? (
                        <ChevronUp className="h-4 w-4 text-white/30" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-white/30" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-3 pt-2 space-y-1">
                      {group.terms.map((term) => {
                        const isSelected = selectedTerms.includes(term.id);
                        return (
                          <label
                            key={term.id}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer touch-manipulation"
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
                              className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                            />
                            <span className="text-sm text-white/80 leading-relaxed">{term.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}

            {/* Custom Terms */}
            <div className="pt-3 border-t border-white/10">
              <Label className="text-white/70 text-sm mb-2 block">Custom Terms</Label>

              {customTerms.length > 0 && (
                <div className="space-y-1 mb-3">
                  {customTerms.map((term) => {
                    const isSelected = selectedTerms.includes(term.id);
                    return (
                      <div key={term.id} className="flex items-start gap-3 p-2 rounded-lg bg-white/5">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            setSelectedTerms(prev =>
                              checked ? [...prev, term.id] : prev.filter(id => id !== term.id)
                            );
                          }}
                          className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                        />
                        <span className="flex-1 text-sm text-white/80">{term.label}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomTerms(prev => prev.filter(t => t.id !== term.id));
                            setSelectedTerms(prev => prev.filter(id => id !== term.id));
                          }}
                          className="p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={newCustomTerm}
                  onChange={(e) => setNewCustomTerm(e.target.value)}
                  placeholder="Add your own term..."
                  className="flex-1 bg-white/5 border-white/10 text-white h-10 text-sm"
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
                  className="h-10 w-10 bg-elec-yellow/10 border-elec-yellow/30 hover:bg-elec-yellow/20 text-elec-yellow"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedTerms(ALL_DEFAULT_TERM_IDS)}
                className="text-xs border-white/10 hover:bg-white/10 text-white/70"
              >
                Select All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedTerms([])}
                className="text-xs border-white/10 hover:bg-white/10 text-white/70"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
          >
            {isSaving ? 'Saving...' : 'Save Quote Settings'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuoteSettingsCard;
