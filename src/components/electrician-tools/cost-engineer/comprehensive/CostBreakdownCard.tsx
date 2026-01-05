import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Wrench, Building, AlertTriangle, Target, ChevronDown, Info, CheckCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";

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
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground">Cost Breakdown</CardTitle>
        <p className="text-base sm:text-sm text-foreground mt-1">Tap any section to see detailed justification</p>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="space-y-3">
          {/* Materials */}
          <div className="rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="font-medium text-foreground">Materials</div>
                  <div className="text-base sm:text-sm text-foreground">
                    Net: £{materialsNet.toFixed(2)} + {markupPercentage}% markup
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">£{materialsWithMarkup.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('materials')} onOpenChange={() => toggleSection('materials')}>
              <CollapsibleTrigger className="w-full px-3 pb-2 touch-manipulation min-h-11">
                <div className="flex items-center gap-2 text-base sm:text-sm text-primary hover:text-primary/80 transition-colors">
                  <Info className="h-3 w-3" />
                  <span>Why markup is essential</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('materials') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Why This Markup is Necessary
                    </div>
                    <ul className="space-y-2 text-xs text-foreground text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        <span>Covers waste and offcuts (5-10%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        <span>Damaged or faulty items replacement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        <span>Time sourcing and collecting materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        <span>Storage, handling and transport costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        <span>Returns processing and warranty admin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 flex-shrink-0">✓</span>
                        <span>Holding stock for immediate repairs</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 text-foreground">Industry Standards</div>
                    <div className="flex flex-col space-y-3 text-xs text-foreground text-left">
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Budget electricians:</span>
                        <div className="text-sm font-semibold">10-15% markup</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Professional tradespeople:</span>
                        <div className="text-sm font-semibold">15-25% markup</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Specialist contractors:</span>
                        <div className="text-sm font-semibold">20-30% markup</div>
                      </div>
                      <div className="space-y-0.5 pt-1 border-t border-border mt-2">
                        <span className="font-medium text-foreground/70">Your setting:</span>
                        <Badge variant="secondary" className="text-xs">{markupPercentage}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="font-medium mb-1 text-destructive">⚠️ Why NOT to reduce this</div>
                    <p className="text-xs text-foreground">
                      If you only charge net material costs, you're paying out of pocket for waste, your time collecting, and storage. A 0% markup means you lose money on materials.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Labour */}
          <div className="rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-orange-500" />
                <div>
                  <div className="font-medium text-foreground">Labour</div>
                  <div className="text-base sm:text-sm text-foreground">
                    {labourHours.toFixed(1)} hours @ £{calculatedLabourRate.toFixed(2)}/hr
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">£{labourTotal.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('labour')} onOpenChange={() => toggleSection('labour')}>
              <CollapsibleTrigger className="w-full px-3 pb-2 touch-manipulation min-h-11">
                <div className="flex items-center gap-2 text-base sm:text-sm text-primary hover:text-primary/80 transition-colors">
                  <Info className="h-3 w-3" />
                  <span>Why this rate is justified</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('labour') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="font-medium mb-2 text-foreground">Your Labour Rate: £{calculatedLabourRate.toFixed(2)}/hour</div>
                    <div className="flex flex-col space-y-3 text-xs text-foreground text-left">
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">UK Market Range ({experienceLevel}):</span>
                        <div className="text-sm font-semibold">£{marketRate.min}-{marketRate.max}/hr</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Typical Rate:</span>
                        <div className="text-sm font-semibold">£{marketRate.typical}/hr</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Regional Adjustment ({region}):</span>
                        <div className="text-sm font-semibold">{regionalMultiplier}x</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 flex items-center gap-2 text-foreground">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      What You Bring
                    </div>
                    <ul className="space-y-2 text-xs text-foreground text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>18th Edition BS7671:2018+A3:2024 qualified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>Years of experience and expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>Professional liability insurance coverage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>Ongoing training and CPD (annual £{MARKET_RATES_2025.businessCosts.continuousTraining}+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>NICEIC/NAPIT membership (£{MARKET_RATES_2025.businessCosts.niceicMembership}-{MARKET_RATES_2025.businessCosts.ecaMembership}/year)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>Quality workmanship with guarantees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 flex-shrink-0">✓</span>
                        <span>Legal compliance and certification</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 text-foreground">Comparison to Market</div>
                    <div className="flex flex-col space-y-3 text-xs text-foreground text-left">
                      <div className="space-y-0.5 opacity-90">
                        <span className="text-foreground/70">Apprentice rate:</span>
                        <div className="text-sm font-semibold">£{MARKET_RATES_2025.hourlyRates.apprentice.min}-{MARKET_RATES_2025.hourlyRates.apprentice.max}/hr</div>
                      </div>
                      <div className="space-y-0.5 opacity-90">
                        <span className="text-foreground/70">Improver rate:</span>
                        <div className="text-sm font-semibold">£{MARKET_RATES_2025.hourlyRates.improver.min}-{MARKET_RATES_2025.hourlyRates.improver.max}/hr</div>
                      </div>
                      <div className="space-y-0.5 border-l-2 border-orange-500 pl-2">
                        <span className="text-foreground/70">Qualified rate:</span>
                        <div className="text-sm font-semibold">£{MARKET_RATES_2025.hourlyRates.qualified.min}-{MARKET_RATES_2025.hourlyRates.qualified.max}/hr ✓</div>
                      </div>
                      <div className="space-y-0.5 opacity-90">
                        <span className="text-foreground/70">Experienced:</span>
                        <div className="text-sm font-semibold">£{MARKET_RATES_2025.hourlyRates.experienced.min}-{MARKET_RATES_2025.hourlyRates.experienced.max}/hr</div>
                      </div>
                      <div className="space-y-0.5 opacity-90">
                        <span className="text-foreground/70">Specialist:</span>
                        <div className="text-sm font-semibold">£{MARKET_RATES_2025.hourlyRates.specialist.min}-{MARKET_RATES_2025.hourlyRates.specialist.max}/hr</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-foreground italic">
                    Your rate of £{calculatedLabourRate.toFixed(2)}/hour is competitive for a {experienceLevel} professional in the {region} region. Charging less means undervaluing your skills and certifications.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Overheads */}
          {overheadTotal > 0 && (
            <div className="rounded-lg bg-background/30 border border-border/30">
              <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="font-medium text-foreground">Business Overheads</div>
                      <div className="text-base sm:text-sm text-foreground">
                        {calculatedJobDuration.toFixed(1)} days @ £{(overheadTotal / calculatedJobDuration).toFixed(2)}/day
                      </div>
                    </div>
                  </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">£{overheadTotal.toFixed(2)}</div>
                </div>
              </div>
              
              <Collapsible open={expandedSections.has('overheads')} onOpenChange={() => toggleSection('overheads')}>
                <CollapsibleTrigger className="w-full px-3 pb-2 touch-manipulation min-h-11">
                  <div className="flex items-center gap-2 text-base sm:text-sm text-primary hover:text-primary/80 transition-colors">
                    <Info className="h-3 w-3" />
                    <span>What overheads cover</span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('overheads') ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-3 pb-3 space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="font-medium mb-2 text-foreground">Typical Monthly Business Costs</div>
                      <div className="flex flex-col space-y-3 text-xs text-foreground text-left">
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Van (fuel, insurance, tax):</span>
                          <div className="text-sm font-semibold">£{(MARKET_RATES_2025.businessCosts.fuel + MARKET_RATES_2025.businessCosts.commercialInsurance + MARKET_RATES_2025.businessCosts.maintenance) / 12}/mo</div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Tool maintenance & replacement:</span>
                          <div className="text-sm font-semibold">£{MARKET_RATES_2025.businessCosts.toolsReplacement / 12}/mo</div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Public liability insurance:</span>
                          <div className="text-sm font-semibold">£{(MARKET_RATES_2025.businessCosts.publicLiabilityInsurance / 12).toFixed(0)}/mo</div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Professional memberships:</span>
                          <div className="text-sm font-semibold">£{(MARKET_RATES_2025.businessCosts.niceicMembership / 12).toFixed(0)}/mo</div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Software & subscriptions:</span>
                          <div className="text-sm font-semibold">£{((MARKET_RATES_2025.businessCosts.eicrsoftware + MARKET_RATES_2025.businessCosts.cloudStorage + MARKET_RATES_2025.businessCosts.businessApps) / 12).toFixed(0)}/mo</div>
                        </div>
                        <div className="space-y-0.5 pt-1 border-t border-border mt-2">
                          <span className="text-foreground/70">Typical total per month:</span>
                          <div className="text-sm font-semibold">£900-1,200</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="font-medium mb-2 text-foreground">This Job's Share</div>
                      <div className="flex flex-col space-y-3 text-xs text-foreground text-left">
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Job duration:</span>
                          <div className="text-sm font-semibold">{calculatedJobDuration.toFixed(1)} days</div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-foreground/70">Daily overhead rate:</span>
                          <div className="text-sm font-semibold">£{(overheadTotal / calculatedJobDuration).toFixed(2)}/day</div>
                        </div>
                        <div className="space-y-0.5 pt-1 border-t border-border mt-2">
                          <span className="text-foreground/70">Job allocation:</span>
                          <div className="text-sm font-semibold">£{overheadTotal.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="font-medium mb-1 text-destructive">⚠️ Why This Matters</div>
                      <p className="text-xs text-foreground mb-2">
                        Every job must cover its proportional share of business costs. If you don't include overheads, you're effectively working for free to cover your van, tools, and insurance.
                      </p>
                      <div className="text-xs font-medium text-destructive">
                        What happens if you don't charge this:
                      </div>
                      <ul className="text-xs text-foreground space-y-2 mt-1 text-left">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 flex-shrink-0">•</span>
                          <span>Your business runs at a loss</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 flex-shrink-0">•</span>
                          <span>Can't afford to maintain equipment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 flex-shrink-0">•</span>
                          <span>Can't reinvest in training or tools</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 flex-shrink-0">•</span>
                          <span>Eventually forced to close down</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {/* Contingency */}
          <div className="rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="font-medium text-foreground">Contingency</div>
                  <div className="text-xs text-foreground">
                    {contingencyPercent}% buffer
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-foreground">£{contingencyAmount.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('contingency')} onOpenChange={() => toggleSection('contingency')}>
              <CollapsibleTrigger className="w-full px-3 pb-2 touch-manipulation min-h-11">
                <div className="flex items-center gap-2 text-base sm:text-sm text-primary hover:text-primary/80 transition-colors">
                  <Info className="h-3 w-3" />
                  <span>Why contingency protects everyone</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('contingency') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="font-medium mb-2 flex items-center gap-2 text-foreground">
                      <CheckCircle className="h-4 w-4 text-yellow-500" />
                      What Contingency Covers
                    </div>
                    <ul className="space-y-2 text-xs text-foreground text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Hidden problems discovered on-site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Additional materials needed unexpectedly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Unforeseen complications (old wiring, asbestos)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Client change requests mid-project</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Weather delays (outdoor work)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Access issues or working restrictions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 flex-shrink-0">✓</span>
                        <span>Required upgrades for code compliance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 text-foreground">Industry Standards</div>
                    <div className="flex flex-col space-y-3 text-xs text-foreground text-left">
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Simple jobs (new build):</span>
                        <div className="text-sm font-semibold">3-5%</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Standard domestic:</span>
                        <div className="text-sm font-semibold">5-10%</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Renovation/older property:</span>
                        <div className="text-sm font-semibold">10-15%</div>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-foreground/70">Complex commercial:</span>
                        <div className="text-sm font-semibold">15-20%</div>
                      </div>
                      <div className="space-y-0.5 pt-1 border-t border-border mt-2">
                        <span className="text-foreground/70">Your setting:</span>
                        <Badge variant="secondary" className="text-xs">{contingencyPercent}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium mb-1 text-blue-500">💡 Real-World Example</div>
                    <p className="text-xs text-foreground italic">
                      "You open a ceiling to find old cloth-wrapped wiring that needs replacing. The contingency covers this extra work without awkward mid-job price negotiations."
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/20 to-amber-500/15 border border-red-400/40">
                    <div className="font-semibold mb-2 text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Without Contingency:
                    </div>
                    <ul className="text-sm text-foreground space-y-2 text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Every surprise becomes an argument</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>You absorb costs or look unprofessional</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Client trust is damaged by price increases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Projects run over budget causing disputes</span>
                      </li>
                    </ul>
                    <p className="text-sm text-foreground mt-3 italic">
                      A contingency protects BOTH parties and maintains professional standards.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Your Minimum Quote */}
          <div className="rounded-lg bg-primary/10 border-2 border-primary/30 mt-4">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-lg text-foreground">Your Minimum Quote</span>
                </div>
                <Badge variant="outline" className="self-start sm:self-auto bg-primary/20 text-primary border-primary/50 text-xs">
                  Floor Price
                </Badge>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-4">
                £{breakEven.toFixed(2)}
              </div>
              
              <div className="space-y-2 text-base text-foreground">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span>Materials with markup:</span>
                  <span className="font-medium whitespace-nowrap">£{materialsWithMarkup.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span>Labour (includes overheads):</span>
                  <span className="font-medium whitespace-nowrap">£{labourTotal.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span>Contingency ({contingencyPercent}%):</span>
                  <span className="font-medium whitespace-nowrap">£{contingencyAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-primary/30">
                <p className="text-base text-foreground mb-2">
                  <strong>This is your floor price.</strong> Your £{calculatedLabourRate.toFixed(2)}/hr rate already covers your take-home pay AND business overheads.
                </p>
                <p className="text-sm text-foreground italic">
                  Quote above this for profit. Below this = losing money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownCard;
