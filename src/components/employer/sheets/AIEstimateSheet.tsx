import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  UserCog,
  HardHat,
} from 'lucide-react';
import { type TenderOpportunity } from '@/hooks/useOpportunities';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
    materials: Array<{ item: string; quantity: number; unit: string; unit_price: number; cost: number }>;
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
          value_estimate: opportunity.value_exact || opportunity.value_high || opportunity.value_low,
        },
      });

      if (fnError) throw fnError;

      if (data?.success && data?.estimate) {
        setEstimate(data.estimate);
        setEditedEstimate(data.estimate);
        setMetadata(data.metadata);

        // Set initial percentage values from estimate
        const subtotal = data.estimate.labour_cost + data.estimate.materials_cost + data.estimate.equipment_cost;
        if (subtotal > 0) {
          const ohPct = Math.round((data.estimate.overheads / subtotal) * 100);
          const profPct = Math.round((data.estimate.profit / (subtotal + data.estimate.overheads)) * 100);
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
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEditValue = (field: keyof EstimateData, value: number) => {
    if (!editedEstimate) return;

    const updated = { ...editedEstimate, [field]: value };

    // Recalculate total with current percentages
    const subtotal = updated.labour_cost + updated.materials_cost + updated.equipment_cost;
    updated.overheads = Math.round(subtotal * (parseInt(overheadPercent) / 100));
    updated.profit = Math.round((subtotal + updated.overheads) * (parseInt(profitPercent) / 100));
    updated.total_estimate = subtotal + updated.overheads + updated.profit;

    setEditedEstimate(updated);
  };

  const handleOverheadChange = (pct: string) => {
    setOverheadPercent(pct);
    if (!editedEstimate) return;

    const subtotal = editedEstimate.labour_cost + editedEstimate.materials_cost + editedEstimate.equipment_cost;
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

    const subtotal = editedEstimate.labour_cost + editedEstimate.materials_cost + editedEstimate.equipment_cost;
    const newProfit = Math.round((subtotal + editedEstimate.overheads) * (parseInt(pct) / 100));

    setEditedEstimate({
      ...editedEstimate,
      profit: newProfit,
      total_estimate: subtotal + editedEstimate.overheads + newProfit,
    });
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20';
    }
  };

  const displayEstimate = isEditing ? editedEstimate : estimate;
  const teamData = displayEstimate?.team_composition || metadata?.team_composition;
  const teamTotal = displayEstimate?.team_size || metadata?.team_size || teamData?.electricians || 1;

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={true}>
      <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-2xl flex flex-col z-[60]">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 pb-2 flex-shrink-0 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/20">
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-lg text-foreground">AI Cost Estimate</SheetTitle>
                  <p className="text-sm text-white/70">
                    {opportunity?.title?.substring(0, 40)}...
                  </p>
                </div>
              </div>
              {estimate && (
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing ? 'bg-elec-yellow text-black' : ''}
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  {isEditing ? 'Done' : 'Edit'}
                </Button>
              )}
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <div className="p-4">
              {/* Initial State - No Estimate Yet */}
              {!estimate && !isLoading && !error && (
                <div className="text-center py-8">
                  <div className="p-4 rounded-full bg-elec-yellow/10 w-fit mx-auto mb-4">
                    <Sparkles className="h-12 w-12 text-elec-yellow" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">AI-Powered Estimation</h3>
                  <p className="text-white/70 max-w-sm mx-auto mb-6">
                    Generate a detailed cost breakdown using our pricing database, labour standards, and regional adjustments.
                  </p>

                  {/* Project Context */}
                  <div className="bg-card/50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto border border-white/10">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-foreground">
                      <FileText className="h-4 w-4 text-elec-yellow" />
                      Project Context
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/80">
                        <Building2 className="h-4 w-4 text-white/60" />
                        <span>{opportunity?.client_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin className="h-4 w-4 text-white/60" />
                        <span>{opportunity?.location_text || opportunity?.postcode || 'UK'}</span>
                      </div>
                      {opportunity?.categories && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {opportunity.categories.map(cat => (
                            <Badge key={cat} variant="outline" className="text-xs text-white/80 border-white/30">
                              {cat.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={generateEstimate}
                    className="h-12 px-8 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate AI Estimate
                  </Button>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-elec-yellow mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">Generating Estimate...</h3>
                  <p className="text-sm text-white/70 max-w-sm mx-auto">
                    Searching pricing database, calculating labour times, applying regional adjustments...
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-foreground">Estimation Failed</h3>
                  <p className="text-sm text-white/70 mb-6">{error}</p>
                  <Button onClick={generateEstimate} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Estimate Display */}
              {displayEstimate && (
                <div className="space-y-4">
                  {/* Total & Confidence */}
                  <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">Total Estimate</span>
                      <Badge variant="outline" className={getConfidenceColor(displayEstimate.confidence)}>
                        {displayEstimate.confidence} Confidence
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-elec-yellow">
                        £{displayEstimate.total_estimate?.toLocaleString()}
                      </span>
                      {metadata?.regional_multiplier && metadata.regional_multiplier !== 1 && (
                        <span className="text-sm text-white/70">
                          ({metadata.region} rates)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
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

                  {/* Team Composition Card - NEW */}
                  {teamData && (
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
                      <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <HardHat className="h-4 w-4 text-blue-400" />
                        Team Composition
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-foreground">{teamData.electricians}</p>
                          <p className="text-xs text-white/70">Electricians</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-foreground">{teamData.mates}</p>
                          <p className="text-xs text-white/70">Mates</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-2xl font-bold text-foreground">{teamData.supervisors}</p>
                          <p className="text-xs text-white/70">Supervisors</p>
                        </div>
                      </div>
                      {displayEstimate.labour_rate_used && (
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <span className="text-white/70">Labour rate</span>
                          <span className="text-foreground font-medium">£{displayEstimate.labour_rate_used}/hr</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cost Summary */}
                  <div className="grid grid-cols-2 gap-3">
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
                    {/* Subtotal display */}
                    <div className="p-3 rounded-lg bg-card/50 border border-white/10">
                      <div className="flex items-center gap-2 text-white/70 mb-1">
                        <PoundSterling className="h-4 w-4" />
                        <span className="text-xs">Subtotal</span>
                      </div>
                      <p className="font-semibold text-base text-foreground">
                        £{(displayEstimate.labour_cost + displayEstimate.materials_cost + displayEstimate.equipment_cost).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Editable Percentages - NEW */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-card/50 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70">Overheads</span>
                        <Select value={overheadPercent} onValueChange={handleOverheadChange}>
                          <SelectTrigger className="w-20 h-9 text-sm bg-background border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-white/20">
                            {[8, 10, 12, 15, 18, 20].map(p => (
                              <SelectItem key={p} value={p.toString()}>{p}%</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        £{displayEstimate.overheads?.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-card/50 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70">Profit</span>
                        <Select value={profitPercent} onValueChange={handleProfitChange}>
                          <SelectTrigger className="w-20 h-9 text-sm bg-background border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-white/20">
                            {[8, 10, 12, 15, 18, 20, 25].map(p => (
                              <SelectItem key={p} value={p.toString()}>{p}%</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-lg font-semibold text-foreground">
                        £{displayEstimate.profit?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  {displayEstimate.breakdown && (
                    <>
                      <Separator className="bg-white/10" />

                      {/* Labour Breakdown */}
                      <Collapsible open={expandedSections.labour} onOpenChange={() => toggleSection('labour')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card/50 hover:bg-card transition-colors touch-manipulation active:scale-[0.99] border border-white/10">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span className="font-medium text-foreground">Labour Breakdown</span>
                          </div>
                          {expandedSections.labour ? <ChevronUp className="h-4 w-4 text-white/70" /> : <ChevronDown className="h-4 w-4 text-white/70" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2">
                          <div className="space-y-2 pl-2">
                            {displayEstimate.breakdown.labour.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm py-3 px-3 rounded-lg bg-card/30 border border-white/5">
                                <span className="text-foreground font-medium">{item.task}</span>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs text-white/60">{item.hours}hrs @ £{item.rate}/hr</span>
                                  <span className="font-semibold text-foreground">£{item.cost.toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Materials Breakdown */}
                      <Collapsible open={expandedSections.materials} onOpenChange={() => toggleSection('materials')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card/50 hover:bg-card transition-colors touch-manipulation active:scale-[0.99] border border-white/10">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-green-400" />
                            <span className="font-medium text-foreground">Materials Breakdown</span>
                          </div>
                          {expandedSections.materials ? <ChevronUp className="h-4 w-4 text-white/70" /> : <ChevronDown className="h-4 w-4 text-white/70" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2">
                          <div className="space-y-2 pl-2">
                            {displayEstimate.breakdown.materials.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm py-3 px-3 rounded-lg bg-card/30 border border-white/5">
                                <span className="text-foreground font-medium">{item.item}</span>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs text-white/60">
                                    {item.quantity} {item.unit} @ £{item.unit_price}
                                  </span>
                                  <span className="font-semibold text-foreground">£{item.cost.toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  )}

                  {/* Hazards */}
                  {displayEstimate.hazards && displayEstimate.hazards.length > 0 && (
                    <Collapsible open={expandedSections.hazards} onOpenChange={() => toggleSection('hazards')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-colors touch-manipulation active:scale-[0.99]">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-400" />
                          <span className="font-medium text-orange-400">
                            {displayEstimate.hazards.length} Hazards Identified
                          </span>
                        </div>
                        {expandedSections.hazards ? <ChevronUp className="h-4 w-4 text-orange-400" /> : <ChevronDown className="h-4 w-4 text-orange-400" />}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2">
                        <div className="space-y-2 pl-2">
                          {displayEstimate.hazards.map((hazard, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm py-2 px-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                              <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                              <span className="text-foreground">{hazard}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Confidence Factors */}
                  {displayEstimate.confidence_factors && displayEstimate.confidence_factors.length > 0 && (
                    <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-blue-400" />
                        Confidence Factors
                      </h4>
                      <ul className="space-y-1 text-sm text-white/80">
                        {displayEstimate.confidence_factors.map((factor, idx) => (
                          <li key={idx}>• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notes */}
                  {displayEstimate.notes && (
                    <div className="p-4 rounded-lg bg-card/50 border border-white/10">
                      <h4 className="text-sm font-medium mb-2 text-foreground">Notes & Assumptions</h4>
                      <p className="text-sm text-white/80">{displayEstimate.notes}</p>
                    </div>
                  )}

                  {/* RAG Metadata */}
                  {metadata && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline" className="bg-card/50 text-white/70 border-white/20">
                        Complexity: {metadata.complexity} ({metadata.complexity_score}/100)
                      </Badge>
                      <Badge variant="outline" className="bg-card/50 text-white/70 border-white/20">
                        {metadata.rag_pricing_items} pricing items
                      </Badge>
                      <Badge variant="outline" className="bg-card/50 text-white/70 border-white/20">
                        {metadata.rag_labour_items} labour standards
                      </Badge>
                      {metadata.labour_rate && (
                        <Badge variant="outline" className="bg-card/50 text-white/70 border-white/20">
                          £{metadata.labour_rate}/hr rate
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Spacer for footer */}
                  <div className="h-24" />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Fixed Footer */}
          {estimate && (
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-background/95 backdrop-blur border-t border-white/10">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 touch-manipulation active:scale-[0.98] transition-transform border-white/20"
                  onClick={generateEstimate}
                  disabled={isLoading}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button
                  className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] transition-transform font-semibold"
                  onClick={() => {
                    onUseEstimate?.(editedEstimate || estimate);
                    onOpenChange(false);
                  }}
                >
                  Use This Estimate
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Cost Card Component
interface CostCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  isEditing: boolean;
  onEdit: (value: number) => void;
}

function CostCard({ icon, label, value, isEditing, onEdit }: CostCardProps) {
  return (
    <div className="p-3 rounded-lg bg-card border border-white/10">
      <div className="flex items-center gap-2 text-white/70 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      {isEditing ? (
        <Input
          type="number"
          value={value}
          onChange={(e) => onEdit(Number(e.target.value))}
          className="h-10 text-base font-semibold touch-manipulation bg-background border-white/20"
        />
      ) : (
        <p className="font-semibold text-base text-foreground">£{value?.toLocaleString()}</p>
      )}
    </div>
  );
}

export default AIEstimateSheet;
