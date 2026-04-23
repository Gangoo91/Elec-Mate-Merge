import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  Sparkles,
  PoundSterling,
  Clock,
  Users,
  Package,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  MapPin,
  Building2,
  FileText,
  HardHat,
} from 'lucide-react';
import { type TenderOpportunity } from '@/hooks/useOpportunities';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SheetShell,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  Pill,
  Eyebrow,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import { cn } from '@/lib/utils';

interface AIEstimateSheetProps {
  opportunity: TenderOpportunity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseEstimate?: (estimate: EstimateData) => void;
}

interface EstimateData {
  labour_hours: number;
  labour_cost: number;
  materials_cost: number;
  equipment_cost: number;
  overheads: number;
  profit: number;
  total_estimate: number;
  hazards: string[];
  programme: string;
  confidence: 'Low' | 'Medium' | 'High';
  confidence_factors?: string[];
  notes: string;
  breakdown?: {
    labour: Array<{ task: string; hours: number; rate: number; cost: number }>;
    materials: Array<{
      item: string;
      quantity: number;
      unit: string;
      unit_price: number;
      cost: number;
    }>;
    equipment: Array<{ item: string; days: number; rate: number; cost: number }>;
  };
  regional_adjustment?: number;
  citations?: Array<{ source: string; item: string; price: number }>;
  team_size?: number;
  team_composition?: {
    electricians: number;
    mates: number;
    supervisors: number;
  };
  labour_rate_used?: number;
}

interface EstimateMetadata {
  complexity: string;
  complexity_score: number;
  region: string;
  regional_multiplier: number;
  rag_pricing_items: number;
  rag_labour_items: number;
  team_size?: number;
  team_composition?: {
    electricians: number;
    mates: number;
    supervisors: number;
  };
  labour_rate?: number;
}

export function AIEstimateSheet({
  opportunity,
  open,
  onOpenChange,
  onUseEstimate,
}: AIEstimateSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateData | null>(null);
  const [metadata, setMetadata] = useState<EstimateMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    labour: true,
    materials: true,
    equipment: false,
    hazards: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedEstimate, setEditedEstimate] = useState<EstimateData | null>(null);
  const [overheadPercent, setOverheadPercent] = useState('12');
  const [profitPercent, setProfitPercent] = useState('12');

  const generateEstimate = async () => {
    if (!opportunity) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-tender-estimate', {
        body: {
          opportunityId: opportunity.id,
          description: opportunity.description,
          scope_of_works: opportunity.scope_of_works,
          postcode: opportunity.postcode,
          categories: opportunity.categories,
          value_estimate:
            opportunity.value_exact || opportunity.value_high || opportunity.value_low,
        },
      });

      if (fnError) throw fnError;

      if (data?.success && data?.estimate) {
        setEstimate(data.estimate);
        setEditedEstimate(data.estimate);
        setMetadata(data.metadata);

        const subtotal =
          data.estimate.labour_cost + data.estimate.materials_cost + data.estimate.equipment_cost;
        if (subtotal > 0) {
          const ohPct = Math.round((data.estimate.overheads / subtotal) * 100);
          const profPct = Math.round(
            (data.estimate.profit / (subtotal + data.estimate.overheads)) * 100
          );
          setOverheadPercent(String(ohPct || 12));
          setProfitPercent(String(profPct || 12));
        }

        toast.success('AI estimate generated');
      } else {
        throw new Error(data?.error || 'Failed to generate estimate');
      }
    } catch (err: any) {
      console.error('Estimate error:', err);
      setError(err.message || 'Failed to generate estimate');
      toast.error('Failed to generate estimate');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEditValue = (field: keyof EstimateData, value: number) => {
    if (!editedEstimate) return;

    const updated = { ...editedEstimate, [field]: value };

    const subtotal = updated.labour_cost + updated.materials_cost + updated.equipment_cost;
    updated.overheads = Math.round(subtotal * (parseInt(overheadPercent) / 100));
    updated.profit = Math.round((subtotal + updated.overheads) * (parseInt(profitPercent) / 100));
    updated.total_estimate = subtotal + updated.overheads + updated.profit;

    setEditedEstimate(updated);
  };

  const handleOverheadChange = (pct: string) => {
    setOverheadPercent(pct);
    if (!editedEstimate) return;

    const subtotal =
      editedEstimate.labour_cost + editedEstimate.materials_cost + editedEstimate.equipment_cost;
    const newOverheads = Math.round(subtotal * (parseInt(pct) / 100));
    const newProfit = Math.round((subtotal + newOverheads) * (parseInt(profitPercent) / 100));

    setEditedEstimate({
      ...editedEstimate,
      overheads: newOverheads,
      profit: newProfit,
      total_estimate: subtotal + newOverheads + newProfit,
    });
  };

  const handleProfitChange = (pct: string) => {
    setProfitPercent(pct);
    if (!editedEstimate) return;

    const subtotal =
      editedEstimate.labour_cost + editedEstimate.materials_cost + editedEstimate.equipment_cost;
    const newProfit = Math.round((subtotal + editedEstimate.overheads) * (parseInt(pct) / 100));

    setEditedEstimate({
      ...editedEstimate,
      profit: newProfit,
      total_estimate: subtotal + editedEstimate.overheads + newProfit,
    });
  };

  const confidenceTone: Record<string, 'emerald' | 'amber' | 'red'> = {
    High: 'emerald',
    Medium: 'amber',
    Low: 'red',
  };

  const displayEstimate = isEditing ? editedEstimate : estimate;
  const teamData = displayEstimate?.team_composition || metadata?.team_composition;

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={true}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="AI estimate"
          title={
            <span className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-elec-yellow" />
              <span className="truncate">{opportunity?.title?.substring(0, 40)}…</span>
            </span>
          }
          description="Generate and refine a detailed cost breakdown."
          footer={
            estimate ? (
              <>
                <SecondaryButton
                  onClick={generateEstimate}
                  disabled={isLoading}
                  fullWidth
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Regenerate
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => {
                    onUseEstimate?.(editedEstimate || estimate);
                    onOpenChange(false);
                  }}
                  fullWidth
                >
                  Use this estimate
                </PrimaryButton>
              </>
            ) : (
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Close
              </SecondaryButton>
            )
          }
        >
          {estimate && (
            <div className="flex justify-end">
              <SecondaryButton
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? 'bg-elec-yellow text-black border-elec-yellow' : ''}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                {isEditing ? 'Done' : 'Edit'}
              </SecondaryButton>
            </div>
          )}

          {!estimate && !isLoading && !error && (
            <>
              <div className="text-center py-4">
                <div className="p-4 rounded-full bg-elec-yellow/10 w-fit mx-auto mb-4">
                  <Sparkles className="h-12 w-12 text-elec-yellow" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">AI-powered estimation</h3>
                <p className="text-white max-w-sm mx-auto mb-6 text-sm">
                  Generate a detailed cost breakdown using our pricing database, labour standards,
                  and regional adjustments.
                </p>
              </div>

              <FormCard eyebrow="Project context">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  <Eyebrow>Context</Eyebrow>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white">
                    <Building2 className="h-4 w-4 text-white" />
                    <span>{opportunity?.client_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-4 w-4 text-white" />
                    <span>{opportunity?.location_text || opportunity?.postcode || 'UK'}</span>
                  </div>
                  {opportunity?.categories && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opportunity.categories.map((cat) => (
                        <Pill key={cat} tone="yellow">
                          {cat.replace('_', ' ')}
                        </Pill>
                      ))}
                    </div>
                  )}
                </div>
              </FormCard>

              <PrimaryButton onClick={generateEstimate} fullWidth size="lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI estimate
              </PrimaryButton>
            </>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-elec-yellow mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-white">Generating estimate…</h3>
              <p className="text-sm text-white max-w-sm mx-auto">
                Searching pricing database, calculating labour times, applying regional
                adjustments…
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-white">Estimation failed</h3>
              <p className="text-sm text-white mb-6">{error}</p>
              <SecondaryButton onClick={generateEstimate}>Try again</SecondaryButton>
            </div>
          )}

          {displayEstimate && (
            <>
              {/* Total & Confidence */}
              <div className="rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 p-5">
                <div className="flex items-center justify-between mb-2">
                  <Eyebrow>Total estimate</Eyebrow>
                  <Pill tone={confidenceTone[displayEstimate.confidence] ?? 'amber'}>
                    {displayEstimate.confidence} confidence
                  </Pill>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-elec-yellow tabular-nums">
                    £{displayEstimate.total_estimate?.toLocaleString()}
                  </span>
                  {metadata?.regional_multiplier && metadata.regional_multiplier !== 1 && (
                    <span className="text-sm text-white">({metadata.region} rates)</span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-white">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {displayEstimate.programme}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {displayEstimate.labour_hours} hours
                  </span>
                </div>
              </div>

              {teamData && (
                <FormCard eyebrow="Team composition">
                  <div className="flex items-center gap-2 text-white">
                    <HardHat className="h-4 w-4 text-blue-400" />
                    <Eyebrow>Team</Eyebrow>
                  </div>
                  <FormGrid cols={3}>
                    <div className="text-center p-3 bg-[hsl(0_0%_9%)] rounded-xl border border-white/[0.06]">
                      <p className="text-2xl font-bold text-white tabular-nums">
                        {teamData.electricians}
                      </p>
                      <p className="text-xs text-white">Electricians</p>
                    </div>
                    <div className="text-center p-3 bg-[hsl(0_0%_9%)] rounded-xl border border-white/[0.06]">
                      <p className="text-2xl font-bold text-white tabular-nums">
                        {teamData.mates}
                      </p>
                      <p className="text-xs text-white">Mates</p>
                    </div>
                    <div className="text-center p-3 bg-[hsl(0_0%_9%)] rounded-xl border border-white/[0.06]">
                      <p className="text-2xl font-bold text-white tabular-nums">
                        {teamData.supervisors}
                      </p>
                      <p className="text-xs text-white">Supervisors</p>
                    </div>
                  </FormGrid>
                  {displayEstimate.labour_rate_used && (
                    <div className="flex items-center justify-between text-sm pt-2">
                      <span className="text-white">Labour rate</span>
                      <span className="text-white font-medium tabular-nums">
                        £{displayEstimate.labour_rate_used}/hr
                      </span>
                    </div>
                  )}
                </FormCard>
              )}

              {/* Cost Summary */}
              <FormGrid cols={2}>
                <CostCard
                  icon={<Users className="h-4 w-4" />}
                  label="Labour"
                  value={displayEstimate.labour_cost}
                  isEditing={isEditing}
                  onEdit={(v) => handleEditValue('labour_cost', v)}
                />
                <CostCard
                  icon={<Package className="h-4 w-4" />}
                  label="Materials"
                  value={displayEstimate.materials_cost}
                  isEditing={isEditing}
                  onEdit={(v) => handleEditValue('materials_cost', v)}
                />
                <CostCard
                  icon={<Wrench className="h-4 w-4" />}
                  label="Equipment"
                  value={displayEstimate.equipment_cost}
                  isEditing={isEditing}
                  onEdit={(v) => handleEditValue('equipment_cost', v)}
                />
                <div className="p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <PoundSterling className="h-4 w-4" />
                    <Eyebrow>Subtotal</Eyebrow>
                  </div>
                  <p className="font-semibold text-base text-white tabular-nums">
                    £
                    {(
                      displayEstimate.labour_cost +
                      displayEstimate.materials_cost +
                      displayEstimate.equipment_cost
                    ).toLocaleString()}
                  </p>
                </div>
              </FormGrid>

              <FormGrid cols={2}>
                <div className="p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <Eyebrow>Overheads</Eyebrow>
                    <Select value={overheadPercent} onValueChange={handleOverheadChange}>
                      <SelectTrigger className={cn(selectTriggerClass, 'h-9 w-20 px-2')}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {[8, 10, 12, 15, 18, 20].map((p) => (
                          <SelectItem key={p} value={p.toString()}>
                            {p}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-lg font-semibold text-white tabular-nums">
                    £{displayEstimate.overheads?.toLocaleString()}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <Eyebrow>Profit</Eyebrow>
                    <Select value={profitPercent} onValueChange={handleProfitChange}>
                      <SelectTrigger className={cn(selectTriggerClass, 'h-9 w-20 px-2')}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {[8, 10, 12, 15, 18, 20, 25].map((p) => (
                          <SelectItem key={p} value={p.toString()}>
                            {p}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-lg font-semibold text-white tabular-nums">
                    £{displayEstimate.profit?.toLocaleString()}
                  </p>
                </div>
              </FormGrid>

              {displayEstimate.breakdown && (
                <>
                  <Collapsible
                    open={expandedSections.labour}
                    onOpenChange={() => toggleSection('labour')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation border border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span className="font-medium text-white">Labour breakdown</span>
                      </div>
                      {expandedSections.labour ? (
                        <ChevronUp className="h-4 w-4 text-white" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-white" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                      <div className="space-y-2 pl-2">
                        {displayEstimate.breakdown.labour.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm py-3 px-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                          >
                            <span className="text-white font-medium">{item.task}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-white">
                                {item.hours}hrs @ £{item.rate}/hr
                              </span>
                              <span className="font-semibold text-white tabular-nums">
                                £{item.cost.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible
                    open={expandedSections.materials}
                    onOpenChange={() => toggleSection('materials')}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation border border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-emerald-400" />
                        <span className="font-medium text-white">Materials breakdown</span>
                      </div>
                      {expandedSections.materials ? (
                        <ChevronUp className="h-4 w-4 text-white" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-white" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2">
                      <div className="space-y-2 pl-2">
                        {displayEstimate.breakdown.materials.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm py-3 px-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                          >
                            <span className="text-white font-medium">{item.item}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-white">
                                {item.quantity} {item.unit} @ £{item.unit_price}
                              </span>
                              <span className="font-semibold text-white tabular-nums">
                                £{item.cost.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </>
              )}

              {displayEstimate.hazards && displayEstimate.hazards.length > 0 && (
                <Collapsible
                  open={expandedSections.hazards}
                  onOpenChange={() => toggleSection('hazards')}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-xl bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 transition-colors touch-manipulation">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                      <span className="font-medium text-orange-400">
                        {displayEstimate.hazards.length} hazards identified
                      </span>
                    </div>
                    {expandedSections.hazards ? (
                      <ChevronUp className="h-4 w-4 text-orange-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-orange-400" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div className="space-y-2 pl-2">
                      {displayEstimate.hazards.map((hazard, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm py-2 px-3 rounded-xl bg-orange-500/5 border border-orange-500/20"
                        >
                          <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white">{hazard}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {displayEstimate.confidence_factors &&
                displayEstimate.confidence_factors.length > 0 && (
                  <FormCard eyebrow="Confidence factors">
                    <div className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                      <Eyebrow>Factors</Eyebrow>
                    </div>
                    <ul className="space-y-1 text-sm text-white">
                      {displayEstimate.confidence_factors.map((factor, idx) => (
                        <li key={idx}>• {factor}</li>
                      ))}
                    </ul>
                  </FormCard>
                )}

              {displayEstimate.notes && (
                <FormCard eyebrow="Notes & assumptions">
                  <p className="text-sm text-white">{displayEstimate.notes}</p>
                </FormCard>
              )}

              {metadata && (
                <div className="flex flex-wrap gap-2">
                  <Pill tone="yellow">
                    Complexity: {metadata.complexity} ({metadata.complexity_score}/100)
                  </Pill>
                  <Pill tone="yellow">{metadata.rag_pricing_items} pricing items</Pill>
                  <Pill tone="yellow">{metadata.rag_labour_items} labour standards</Pill>
                  {metadata.labour_rate && (
                    <Pill tone="yellow">£{metadata.labour_rate}/hr rate</Pill>
                  )}
                </div>
              )}
            </>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

interface CostCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  isEditing: boolean;
  onEdit: (value: number) => void;
}

function CostCard({ icon, label, value, isEditing, onEdit }: CostCardProps) {
  return (
    <div className="p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
      <div className="flex items-center gap-2 text-white mb-1">
        {icon}
        <Eyebrow>{label}</Eyebrow>
      </div>
      {isEditing ? (
        <Input
          type="number"
          value={value}
          onChange={(e) => onEdit(Number(e.target.value))}
          className={cn(inputClass, 'h-10')}
        />
      ) : (
        <p className="font-semibold text-base text-white tabular-nums">
          £{value?.toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default AIEstimateSheet;
