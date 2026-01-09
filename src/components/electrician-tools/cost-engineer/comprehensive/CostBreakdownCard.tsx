import { Package, Wrench, Building, AlertTriangle, Target, ChevronDown, Info, CheckCircle, Calculator } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CostBreakdownCardProps {
  materialsNet: number;
  materialsMarkup: number;
  labourHours: number;
  labourTotal: number;
  overheads?: any;
  contingencyPercent: number;
  breakEven: number;
  labourRate?: number;
  region?: string;
  experienceLevel?: string;
  jobDuration?: number;
}

const CostBreakdownCard = ({
  materialsNet,
  materialsMarkup,
  labourHours,
  labourTotal,
  overheads,
  contingencyPercent,
  breakEven,
  labourRate,
  region = 'other',
  experienceLevel = 'qualified',
  jobDuration
}: CostBreakdownCardProps) => {
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Calculations
  const overheadTotal = overheads?.total || 0;
  const contingencyAmount = (materialsNet + labourTotal) * (contingencyPercent / 100);
  const markupPercentage = materialsMarkup || 15;
  const markupAmount = materialsNet * (markupPercentage / 100);
  const materialsWithMarkup = materialsNet + markupAmount;
  const calculatedLabourRate = labourRate || (labourHours > 0 ? labourTotal / labourHours : 0);
  const calculatedJobDuration = jobDuration || (labourHours > 0 ? labourHours / 8 : 0);
  
  // Get market rates for comparison
  const regionKey = region as keyof typeof MARKET_RATES_2025.regionalMultipliers;
  const regionalMultiplier = MARKET_RATES_2025.regionalMultipliers[regionKey] || 1.0;
  const expLevel = experienceLevel as keyof typeof MARKET_RATES_2025.hourlyRates;
  const marketRate = MARKET_RATES_2025.hourlyRates[expLevel] || MARKET_RATES_2025.hourlyRates.qualified;

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shadow-md"
          >
            <Calculator className="h-5 w-5 text-elec-yellow" />
          </motion.div>
          <div>
              <h3 className="text-base sm:text-lg text-white font-semibold">Cost Breakdown</h3>
              <p className="text-xs sm:text-sm text-white/50">Tap sections for detailed justification</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Materials */}
          <div className="rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium text-white">Materials</div>
                  <div className="text-xs sm:text-sm text-white/50">
                    Net: £{materialsNet.toFixed(2)} + {markupPercentage}%
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base font-bold text-blue-400">£{materialsWithMarkup.toFixed(2)}</div>
              </div>
            </div>

            <Collapsible open={expandedSections.has('materials')} onOpenChange={() => toggleSection('materials')}>
              <CollapsibleTrigger className="w-full px-4 pb-3 touch-manipulation min-h-11">
                <div className="flex items-center gap-2 text-xs text-elec-yellow transition-transform active:scale-95 touch-manipulation">
                  <Info className="h-3 w-3" />
                  <span>Why markup is essential</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", expandedSections.has('materials') && 'rotate-180')} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="text-xs font-medium mb-2 flex items-center gap-2 text-white">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Why This Markup is Necessary
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/70 text-left">
                      <li className="flex items-start gap-2"><span className="text-blue-400">✓</span><span>Covers waste and offcuts (5-10%)</span></li>
                      <li className="flex items-start gap-2"><span className="text-blue-400">✓</span><span>Damaged or faulty items replacement</span></li>
                      <li className="flex items-start gap-2"><span className="text-blue-400">✓</span><span>Time sourcing and collecting materials</span></li>
                      <li className="flex items-start gap-2"><span className="text-blue-400">✓</span><span>Storage, handling and transport costs</span></li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs font-medium mb-2 text-white">Industry Standards</div>
                    <div className="space-y-2 text-xs sm:text-sm text-white/60 text-left">
                      <div>Budget: <span className="text-white">10-15%</span></div>
                      <div>Professional: <span className="text-white">15-25%</span></div>
                      <div>Specialist: <span className="text-white">20-30%</span></div>
                      <div className="pt-2 border-t border-white/10">Your setting: <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs ml-1">{markupPercentage}%</Badge></div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Labour */}
          <div className="rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Wrench className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium text-white">Labour</div>
                  <div className="text-xs sm:text-sm text-white/50">
                    {labourHours.toFixed(1)}h @ £{calculatedLabourRate.toFixed(2)}/hr
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base font-bold text-orange-400">£{labourTotal.toFixed(2)}</div>
              </div>
            </div>

            <Collapsible open={expandedSections.has('labour')} onOpenChange={() => toggleSection('labour')}>
              <CollapsibleTrigger className="w-full px-4 pb-3 touch-manipulation min-h-11">
                <div className="flex items-center gap-2 text-xs text-elec-yellow transition-transform active:scale-95 touch-manipulation">
                  <Info className="h-3 w-3" />
                  <span>Why this rate is justified</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", expandedSections.has('labour') && 'rotate-180')} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <div className="text-xs font-medium mb-2 text-white">Your Rate: £{calculatedLabourRate.toFixed(2)}/hr</div>
                    <div className="space-y-2 text-xs sm:text-sm text-white/60 text-left">
                      <div>UK Market ({experienceLevel}): <span className="text-white">£{marketRate.min}-{marketRate.max}/hr</span></div>
                      <div>Typical Rate: <span className="text-white">£{marketRate.typical}/hr</span></div>
                      <div>Regional ({region}): <span className="text-white">{regionalMultiplier}x</span></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs font-medium mb-2 flex items-center gap-2 text-white">
                      <CheckCircle className="h-4 w-4 text-orange-400" />
                      What You Bring
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-white/70 text-left">
                      <li className="flex items-start gap-2"><span className="text-orange-400">✓</span><span>18th Edition qualified</span></li>
                      <li className="flex items-start gap-2"><span className="text-orange-400">✓</span><span>Professional insurance</span></li>
                      <li className="flex items-start gap-2"><span className="text-orange-400">✓</span><span>NICEIC/NAPIT membership</span></li>
                      <li className="flex items-start gap-2"><span className="text-orange-400">✓</span><span>Quality guarantees</span></li>
                    </ul>
                  </div>

                  <p className="text-xs sm:text-sm text-white/50 italic">
                    £{calculatedLabourRate.toFixed(2)}/hr is competitive for {experienceLevel} in {region}.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Overheads */}
          {overheadTotal > 0 && (
            <div className="rounded-xl bg-black/30 border border-white/10">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Building className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-medium text-white">Business Overheads</div>
                    <div className="text-xs sm:text-sm text-white/50">
                      {calculatedJobDuration.toFixed(1)} days @ £{(overheadTotal / calculatedJobDuration).toFixed(2)}/day
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm sm:text-base font-bold text-purple-400">£{overheadTotal.toFixed(2)}</div>
                </div>
              </div>

              <Collapsible open={expandedSections.has('overheads')} onOpenChange={() => toggleSection('overheads')}>
                <CollapsibleTrigger className="w-full px-4 pb-3 touch-manipulation min-h-11">
                  <div className="flex items-center gap-2 text-xs text-elec-yellow transition-transform active:scale-95 touch-manipulation">
                    <Info className="h-3 w-3" />
                    <span>What overheads cover</span>
                    <ChevronDown className={cn("h-3 w-3 transition-transform", expandedSections.has('overheads') && 'rotate-180')} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3 text-sm">
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="text-xs font-medium mb-2 text-white">Monthly Business Costs</div>
                      <div className="space-y-2 text-xs sm:text-sm text-white/60 text-left">
                        <div>Van & fuel: <span className="text-white">£{(MARKET_RATES_2025.businessCosts.fuel + MARKET_RATES_2025.businessCosts.commercialInsurance) / 12}/mo</span></div>
                        <div>Tools: <span className="text-white">£{MARKET_RATES_2025.businessCosts.toolsReplacement / 12}/mo</span></div>
                        <div>Insurance: <span className="text-white">£{(MARKET_RATES_2025.businessCosts.publicLiabilityInsurance / 12).toFixed(0)}/mo</span></div>
                        <div className="pt-2 border-t border-white/10">Total: <span className="text-white">£900-1,200/mo</span></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-xs font-medium mb-2 text-white">This Job's Share</div>
                      <div className="space-y-1 text-xs sm:text-sm text-white/60 text-left">
                        <div>Duration: <span className="text-white">{calculatedJobDuration.toFixed(1)} days</span></div>
                        <div>Daily rate: <span className="text-white">£{(overheadTotal / calculatedJobDuration).toFixed(2)}/day</span></div>
                        <div className="pt-2 border-t border-white/10">Allocation: <span className="text-white font-medium">£{overheadTotal.toFixed(2)}</span></div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Contingency */}
          <div className="rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-medium text-white">Contingency</div>
                  <div className="text-xs sm:text-sm text-white/50">{contingencyPercent}% buffer</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base font-bold text-amber-400">£{contingencyAmount.toFixed(2)}</div>
              </div>
            </div>

            <Collapsible open={expandedSections.has('contingency')} onOpenChange={() => toggleSection('contingency')}>
              <CollapsibleTrigger className="w-full px-4 pb-3 touch-manipulation min-h-11">
                <div className="flex items-center gap-2 text-xs text-elec-yellow transition-transform active:scale-95 touch-manipulation">
                  <Info className="h-3 w-3" />
                  <span>Why contingency protects everyone</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", expandedSections.has('contingency') && 'rotate-180')} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="text-xs font-medium mb-2 flex items-center gap-2 text-white">
                      <CheckCircle className="h-4 w-4 text-amber-400" />
                      What Contingency Covers
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-white/70 text-left">
                      <li className="flex items-start gap-2"><span className="text-amber-400">✓</span><span>Hidden problems on-site</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-400">✓</span><span>Additional materials needed</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-400">✓</span><span>Unforeseen complications</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-400">✓</span><span>Client change requests</span></li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-xs font-medium mb-2 text-white">Industry Standards</div>
                    <div className="space-y-1 text-xs sm:text-sm text-white/60 text-left">
                      <div>Simple jobs: <span className="text-white">3-5%</span></div>
                      <div>Standard domestic: <span className="text-white">5-10%</span></div>
                      <div>Renovation: <span className="text-white">10-15%</span></div>
                      <div className="pt-2 border-t border-white/10">Your setting: <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs ml-1">{contingencyPercent}%</Badge></div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Your Minimum Quote */}
          <div className="rounded-xl bg-elec-yellow/10 border-2 border-elec-yellow/30 mt-4">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  <span className="text-base sm:text-lg font-semibold text-white">Minimum Quote</span>
                </div>
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                  Floor Price
                </Badge>
              </div>

              <div className="text-3xl font-bold text-elec-yellow mb-4">
                £{breakEven.toFixed(2)}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Materials + markup:</span>
                  <span className="font-medium text-white">£{materialsWithMarkup.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Labour (incl. overheads):</span>
                  <span className="font-medium text-white">£{labourTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Contingency ({contingencyPercent}%):</span>
                  <span className="font-medium text-white">£{contingencyAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <p className="text-xs sm:text-sm text-white/70">
                  <span className="text-white font-medium">Floor price.</span> Quote above for profit. Below = losing money.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CostBreakdownCard;
