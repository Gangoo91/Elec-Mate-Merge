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
        <CardTitle className="text-xl sm:text-lg font-bold text-white">Cost Breakdown</CardTitle>
        <p className="text-base sm:text-sm text-white mt-1">Tap any section to see detailed justification</p>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="space-y-3">
          {/* Materials */}
          <div className="rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="font-medium text-white">Materials</div>
                  <div className="text-base sm:text-sm text-white">
                    Net: £{materialsNet.toFixed(2)} + {markupPercentage}% markup
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">£{materialsWithMarkup.toFixed(2)}</div>
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
                    <ul className="space-y-1 text-xs">
                      <li>✓ Covers waste and offcuts (5-10%)</li>
                      <li>✓ Damaged or faulty items replacement</li>
                      <li>✓ Time sourcing and collecting materials</li>
                      <li>✓ Storage, handling and transport costs</li>
                      <li>✓ Returns processing and warranty admin</li>
                      <li>✓ Holding stock for immediate repairs</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 text-white">Industry Standards</div>
                    <div className="space-y-1 text-xs text-white">
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Budget electricians:</span>
                        <span className="whitespace-nowrap">10-15% markup</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Professional tradespeople:</span>
                        <span className="whitespace-nowrap">15-25% markup</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Specialist contractors:</span>
                        <span className="whitespace-nowrap">20-30% markup</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline pt-1 border-t border-border mt-2">
                        <span className="font-medium">Your setting:</span>
                        <Badge variant="secondary" className="text-xs">{markupPercentage}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="font-medium mb-1 text-destructive">⚠️ Why NOT to reduce this</div>
                    <p className="text-xs text-white">
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
                  <div className="font-medium text-white">Labour</div>
                  <div className="text-base sm:text-sm text-white">
                    {labourHours.toFixed(1)} hours @ £{calculatedLabourRate.toFixed(2)}/hr
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">£{labourTotal.toFixed(2)}</div>
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
                    <div className="font-medium mb-2 text-white">Your Labour Rate: £{calculatedLabourRate.toFixed(2)}/hour</div>
                    <div className="text-xs space-y-1 text-white">
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>UK Market Range ({experienceLevel}):</span>
                        <span className="whitespace-nowrap">£{marketRate.min}-{marketRate.max}/hr</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Typical Rate:</span>
                        <span className="whitespace-nowrap">£{marketRate.typical}/hr</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Regional Adjustment ({region}):</span>
                        <span className="whitespace-nowrap">{regionalMultiplier}x</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 flex items-center gap-2 text-white">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      What You Bring
                    </div>
                    <ul className="space-y-1 text-xs text-white">
                      <li>✓ 18th Edition BS7671:2018+A3:2024 qualified</li>
                      <li>✓ Years of experience and expertise</li>
                      <li>✓ Professional liability insurance coverage</li>
                      <li>✓ Ongoing training and CPD (annual £{MARKET_RATES_2025.businessCosts.continuousTraining}+)</li>
                      <li>✓ NICEIC/NAPIT membership (£{MARKET_RATES_2025.businessCosts.niceicMembership}-{MARKET_RATES_2025.businessCosts.ecaMembership}/year)</li>
                      <li>✓ Quality workmanship with guarantees</li>
                      <li>✓ Legal compliance and certification</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 text-white">Comparison to Market</div>
                    <div className="space-y-1 text-xs text-white">
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline opacity-90">
                        <span>Apprentice rate:</span>
                        <span className="whitespace-nowrap">£{MARKET_RATES_2025.hourlyRates.apprentice.min}-{MARKET_RATES_2025.hourlyRates.apprentice.max}/hr</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline opacity-90">
                        <span>Improver rate:</span>
                        <span className="whitespace-nowrap">£{MARKET_RATES_2025.hourlyRates.improver.min}-{MARKET_RATES_2025.hourlyRates.improver.max}/hr</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline font-medium border-l-2 border-orange-500 pl-2">
                        <span>Qualified rate:</span>
                        <span className="whitespace-nowrap">£{MARKET_RATES_2025.hourlyRates.qualified.min}-{MARKET_RATES_2025.hourlyRates.qualified.max}/hr ✓</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline opacity-90">
                        <span>Experienced:</span>
                        <span className="whitespace-nowrap">£{MARKET_RATES_2025.hourlyRates.experienced.min}-{MARKET_RATES_2025.hourlyRates.experienced.max}/hr</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline opacity-90">
                        <span>Specialist:</span>
                        <span className="whitespace-nowrap">£{MARKET_RATES_2025.hourlyRates.specialist.min}-{MARKET_RATES_2025.hourlyRates.specialist.max}/hr</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-white italic">
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
                      <div className="font-medium text-white">Business Overheads</div>
                      <div className="text-base sm:text-sm text-white">
                        {calculatedJobDuration.toFixed(1)} days @ £{(overheadTotal / calculatedJobDuration).toFixed(2)}/day
                      </div>
                    </div>
                  </div>
                <div className="text-right">
                  <div className="font-bold text-white">£{overheadTotal.toFixed(2)}</div>
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
                      <div className="font-medium mb-2 text-white">Typical Monthly Business Costs</div>
                      <div className="space-y-1 text-xs text-white">
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Van (fuel, insurance, tax):</span>
                          <span className="whitespace-nowrap">£{(MARKET_RATES_2025.businessCosts.fuel + MARKET_RATES_2025.businessCosts.commercialInsurance + MARKET_RATES_2025.businessCosts.maintenance) / 12}/mo</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Tool maintenance & replacement:</span>
                          <span className="whitespace-nowrap">£{MARKET_RATES_2025.businessCosts.toolsReplacement / 12}/mo</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Public liability insurance:</span>
                          <span className="whitespace-nowrap">£{(MARKET_RATES_2025.businessCosts.publicLiabilityInsurance / 12).toFixed(0)}/mo</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Professional memberships:</span>
                          <span className="whitespace-nowrap">£{(MARKET_RATES_2025.businessCosts.niceicMembership / 12).toFixed(0)}/mo</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Software & subscriptions:</span>
                          <span className="whitespace-nowrap">£{((MARKET_RATES_2025.businessCosts.eicrsoftware + MARKET_RATES_2025.businessCosts.cloudStorage + MARKET_RATES_2025.businessCosts.businessApps) / 12).toFixed(0)}/mo</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline pt-1 border-t border-border mt-2 font-medium">
                          <span>Typical total per month:</span>
                          <span className="whitespace-nowrap">£900-1,200</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="font-medium mb-2 text-white">This Job's Share</div>
                      <div className="space-y-1 text-xs text-white">
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Job duration:</span>
                          <span className="whitespace-nowrap">{calculatedJobDuration.toFixed(1)} days</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                          <span>Daily overhead rate:</span>
                          <span className="whitespace-nowrap">£{(overheadTotal / calculatedJobDuration).toFixed(2)}/day</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline pt-1 border-t border-border mt-2 font-medium">
                          <span>Job allocation:</span>
                          <span className="whitespace-nowrap">£{overheadTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="font-medium mb-1 text-destructive">⚠️ Why This Matters</div>
                      <p className="text-xs text-white mb-2">
                        Every job must cover its proportional share of business costs. If you don't include overheads, you're effectively working for free to cover your van, tools, and insurance.
                      </p>
                      <div className="text-xs font-medium text-destructive">
                        What happens if you don't charge this:
                      </div>
                      <ul className="text-xs text-white space-y-0.5 mt-1">
                        <li>• Your business runs at a loss</li>
                        <li>• Can't afford to maintain equipment</li>
                        <li>• Can't reinvest in training or tools</li>
                        <li>• Eventually forced to close down</li>
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
                  <div className="font-medium text-white">Contingency</div>
                  <div className="text-xs text-white">
                    {contingencyPercent}% buffer
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">£{contingencyAmount.toFixed(2)}</div>
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
                    <div className="font-medium mb-2 flex items-center gap-2 text-white">
                      <CheckCircle className="h-4 w-4 text-yellow-500" />
                      What Contingency Covers
                    </div>
                    <ul className="space-y-1 text-xs text-white">
                      <li>✓ Hidden problems discovered on-site</li>
                      <li>✓ Additional materials needed unexpectedly</li>
                      <li>✓ Unforeseen complications (old wiring, asbestos)</li>
                      <li>✓ Client change requests mid-project</li>
                      <li>✓ Weather delays (outdoor work)</li>
                      <li>✓ Access issues or working restrictions</li>
                      <li>✓ Required upgrades for code compliance</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 text-white">Industry Standards</div>
                    <div className="space-y-1 text-xs text-white">
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Simple jobs (new build):</span>
                        <span className="whitespace-nowrap">3-5%</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Standard domestic:</span>
                        <span className="whitespace-nowrap">5-10%</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Renovation/older property:</span>
                        <span className="whitespace-nowrap">10-15%</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                        <span>Complex commercial:</span>
                        <span className="whitespace-nowrap">15-20%</span>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline pt-1 border-t border-border mt-2 font-medium">
                        <span>Your setting:</span>
                        <Badge variant="secondary" className="text-xs">{contingencyPercent}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium mb-1 text-blue-500">💡 Real-World Example</div>
                    <p className="text-xs text-white italic">
                      "You open a ceiling to find old cloth-wrapped wiring that needs replacing. The contingency covers this extra work without awkward mid-job price negotiations."
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="font-medium mb-1 text-destructive">Without Contingency:</div>
                    <ul className="text-xs text-white space-y-0.5">
                      <li>• Every surprise becomes an argument</li>
                      <li>• You absorb costs or look unprofessional</li>
                      <li>• Client trust is damaged by price increases</li>
                      <li>• Projects run over budget causing disputes</li>
                    </ul>
                    <p className="text-xs text-white mt-2 italic">
                      A contingency protects BOTH parties and maintains professional standards.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Your Minimum Quote */}
          <div className="rounded-lg bg-primary/10 border-2 border-primary/30 mt-4">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <div className="font-medium text-white">Your Minimum Quote</div>
                </div>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/50 text-xs">
                  Floor Price
                </Badge>
              </div>
              
              <div className="text-2xl sm:text-xl font-bold text-primary mb-2">
                £{breakEven.toFixed(2)}
              </div>
              
              <div className="text-base sm:text-sm space-y-1 text-white">
                <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                  <span>Materials with markup:</span>
                  <span className="whitespace-nowrap">£{materialsWithMarkup.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                  <span>Labour (includes overheads):</span>
                  <span className="whitespace-nowrap">£{labourTotal.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-3 items-baseline">
                  <span>Contingency ({contingencyPercent}%):</span>
                  <span className="whitespace-nowrap">£{contingencyAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-primary/30">
                <p className="text-base sm:text-sm text-white mb-2">
                  <strong>This is your floor price.</strong> Your £{calculatedLabourRate.toFixed(2)}/hr rate already covers your take-home pay AND business overheads.
                </p>
                <p className="text-xs text-white italic">
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
