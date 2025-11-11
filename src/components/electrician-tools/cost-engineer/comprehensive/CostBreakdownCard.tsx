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
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg">Cost Breakdown</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Tap any section to see detailed justification</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Materials */}
          <div className="rounded-lg bg-background/30 border border-border/30">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="font-medium">Materials</div>
                  <div className="text-xs text-muted-foreground">
                    Net: £{materialsNet.toFixed(2)} + {markupPercentage}% markup
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">£{materialsWithMarkup.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('materials')} onOpenChange={() => toggleSection('materials')}>
              <CollapsibleTrigger className="w-full px-3 pb-2">
                <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
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
                    <div className="font-medium mb-2">Industry Standards</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget electricians:</span>
                        <span>10-15% markup</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Professional tradespeople:</span>
                        <span>15-25% markup</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Specialist contractors:</span>
                        <span>20-30% markup</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border mt-2">
                        <span className="font-medium">Your setting:</span>
                        <Badge variant="secondary" className="text-xs">{markupPercentage}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="font-medium mb-1 text-destructive">⚠️ Why NOT to reduce this</div>
                    <p className="text-xs text-muted-foreground">
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
                  <div className="font-medium">Labour</div>
                  <div className="text-xs text-muted-foreground">
                    {labourHours.toFixed(1)} hours @ £{calculatedLabourRate.toFixed(2)}/hr
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">£{labourTotal.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('labour')} onOpenChange={() => toggleSection('labour')}>
              <CollapsibleTrigger className="w-full px-3 pb-2">
                <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  <Info className="h-3 w-3" />
                  <span>Why this rate is justified</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('labour') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="font-medium mb-2">Your Labour Rate: £{calculatedLabourRate.toFixed(2)}/hour</div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">UK Market Range ({experienceLevel}):</span>
                        <span>£{marketRate.min}-{marketRate.max}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Typical Rate:</span>
                        <span>£{marketRate.typical}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Regional Adjustment ({region}):</span>
                        <span>{regionalMultiplier}x</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      What You Bring
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>✓ 18th Edition BS7671:2018+A2:2022 qualified</li>
                      <li>✓ Years of experience and expertise</li>
                      <li>✓ Professional liability insurance coverage</li>
                      <li>✓ Ongoing training and CPD (annual £{MARKET_RATES_2025.businessCosts.continuousTraining}+)</li>
                      <li>✓ NICEIC/NAPIT membership (£{MARKET_RATES_2025.businessCosts.niceicMembership}-{MARKET_RATES_2025.businessCosts.ecaMembership}/year)</li>
                      <li>✓ Quality workmanship with guarantees</li>
                      <li>✓ Legal compliance and certification</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2">Comparison to Market</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between opacity-50">
                        <span>Apprentice rate:</span>
                        <span>£{MARKET_RATES_2025.hourlyRates.apprentice.min}-{MARKET_RATES_2025.hourlyRates.apprentice.max}/hr</span>
                      </div>
                      <div className="flex justify-between opacity-50">
                        <span>Improver rate:</span>
                        <span>£{MARKET_RATES_2025.hourlyRates.improver.min}-{MARKET_RATES_2025.hourlyRates.improver.max}/hr</span>
                      </div>
                      <div className="flex justify-between font-medium border-l-2 border-orange-500 pl-2">
                        <span>Qualified rate:</span>
                        <span>£{MARKET_RATES_2025.hourlyRates.qualified.min}-{MARKET_RATES_2025.hourlyRates.qualified.max}/hr ✓</span>
                      </div>
                      <div className="flex justify-between opacity-50">
                        <span>Experienced:</span>
                        <span>£{MARKET_RATES_2025.hourlyRates.experienced.min}-{MARKET_RATES_2025.hourlyRates.experienced.max}/hr</span>
                      </div>
                      <div className="flex justify-between opacity-50">
                        <span>Specialist:</span>
                        <span>£{MARKET_RATES_2025.hourlyRates.specialist.min}-{MARKET_RATES_2025.hourlyRates.specialist.max}/hr</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground italic">
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
                    <div className="font-medium">Business Overheads</div>
                    <div className="text-xs text-muted-foreground">
                      {calculatedJobDuration.toFixed(1)} days @ £{(overheadTotal / calculatedJobDuration).toFixed(2)}/day
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">£{overheadTotal.toFixed(2)}</div>
                </div>
              </div>
              
              <Collapsible open={expandedSections.has('overheads')} onOpenChange={() => toggleSection('overheads')}>
                <CollapsibleTrigger className="w-full px-3 pb-2">
                  <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <Info className="h-3 w-3" />
                    <span>What overheads cover</span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('overheads') ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-3 pb-3 space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="font-medium mb-2">Typical Monthly Business Costs</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Van (fuel, insurance, tax):</span>
                          <span>£{(MARKET_RATES_2025.businessCosts.fuel + MARKET_RATES_2025.businessCosts.commercialInsurance + MARKET_RATES_2025.businessCosts.maintenance) / 12}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tool maintenance & replacement:</span>
                          <span>£{MARKET_RATES_2025.businessCosts.toolsReplacement / 12}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Public liability insurance:</span>
                          <span>£{(MARKET_RATES_2025.businessCosts.publicLiabilityInsurance / 12).toFixed(0)}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Professional memberships:</span>
                          <span>£{(MARKET_RATES_2025.businessCosts.niceicMembership / 12).toFixed(0)}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Software & subscriptions:</span>
                          <span>£{((MARKET_RATES_2025.businessCosts.eicrsoftware + MARKET_RATES_2025.businessCosts.cloudStorage + MARKET_RATES_2025.businessCosts.businessApps) / 12).toFixed(0)}/mo</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-border mt-2 font-medium">
                          <span>Typical total per month:</span>
                          <span>£900-1,200</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="font-medium mb-2">This Job's Share</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Job duration:</span>
                          <span>{calculatedJobDuration.toFixed(1)} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Daily overhead rate:</span>
                          <span>£{(overheadTotal / calculatedJobDuration).toFixed(2)}/day</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-border mt-2 font-medium">
                          <span>Job allocation:</span>
                          <span>£{overheadTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="font-medium mb-1 text-destructive">⚠️ Why This Matters</div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Every job must cover its proportional share of business costs. If you don't include overheads, you're effectively working for free to cover your van, tools, and insurance.
                      </p>
                      <div className="text-xs font-medium text-destructive">
                        What happens if you don't charge this:
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-0.5 mt-1">
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
                  <div className="font-medium">Contingency</div>
                  <div className="text-xs text-muted-foreground">
                    {contingencyPercent}% buffer
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">£{contingencyAmount.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('contingency')} onOpenChange={() => toggleSection('contingency')}>
              <CollapsibleTrigger className="w-full px-3 pb-2">
                <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  <Info className="h-3 w-3" />
                  <span>Why contingency protects everyone</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('contingency') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-500" />
                      What Contingency Covers
                    </div>
                    <ul className="space-y-1 text-xs">
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
                    <div className="font-medium mb-2">Industry Standards</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Simple jobs (new build):</span>
                        <span>3-5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Standard domestic:</span>
                        <span>5-10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Renovation/older property:</span>
                        <span>10-15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Complex commercial:</span>
                        <span>15-20%</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border mt-2 font-medium">
                        <span>Your setting:</span>
                        <Badge variant="secondary" className="text-xs">{contingencyPercent}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium mb-1 text-blue-500">💡 Real-World Example</div>
                    <p className="text-xs text-muted-foreground italic">
                      "You open a ceiling to find old cloth-wrapped wiring that needs replacing. The contingency covers this extra work without awkward mid-job price negotiations."
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="font-medium mb-1 text-destructive">Without Contingency:</div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      <li>• Every surprise becomes an argument</li>
                      <li>• You absorb costs or look unprofessional</li>
                      <li>• Client trust is damaged by price increases</li>
                      <li>• Projects run over budget causing disputes</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      A contingency protects BOTH parties and maintains professional standards.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Break-even Total */}
          <div className="rounded-lg bg-elec-yellow/10 border-2 border-elec-yellow/30 mt-4">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                <div>
                  <div className="font-bold text-lg">Break-even Point</div>
                  <div className="text-xs text-muted-foreground">
                    Minimum to cover costs
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-elec-yellow">£{breakEven.toFixed(2)}</div>
              </div>
            </div>
            
            <Collapsible open={expandedSections.has('breakeven')} onOpenChange={() => toggleSection('breakeven')}>
              <CollapsibleTrigger className="w-full px-4 pb-2">
                <div className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  <Info className="h-3 w-3" />
                  <span>Understanding break-even</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSections.has('breakeven') ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-destructive/10 border-2 border-destructive/30">
                    <div className="font-bold mb-1 text-destructive flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      CRITICAL WARNING
                    </div>
                    <p className="text-xs font-medium mb-2">
                      This is the ABSOLUTE MINIMUM you must charge to cover all costs. There is ZERO profit at this point.
                    </p>
                    <div className="space-y-0.5 text-xs">
                      <div>⚠️ Quoting below break-even = guaranteed loss</div>
                      <div>⚠️ This is NOT profit - just covering costs</div>
                      <div>⚠️ You still need profit margin for income</div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium mb-2">What's Included</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">All materials:</span>
                        <span>£{materialsWithMarkup.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">All labour costs:</span>
                        <span>£{labourTotal.toFixed(2)}</span>
                      </div>
                      {overheadTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Business overheads:</span>
                          <span>£{overheadTotal.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contingency buffer:</span>
                        <span>£{contingencyAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-border mt-2 font-bold">
                        <span>Total Break-even:</span>
                        <span className="text-elec-yellow">£{breakEven.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <div className="font-medium mb-2">To Make a Living</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between opacity-50">
                        <span>Break-even (0% profit):</span>
                        <span>£{breakEven.toFixed(2)} ❌</span>
                      </div>
                      <div className="flex justify-between">
                        <span>+10% profit (work sparse):</span>
                        <span>£{(breakEven * 1.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium border-l-2 border-elec-yellow pl-2">
                        <span>+25% profit (normal):</span>
                        <span>£{(breakEven * 1.25).toFixed(2)} ✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>+40% profit (busy):</span>
                        <span>£{(breakEven * 1.4).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium mb-1 text-blue-500">💡 Why Profit Matters</div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Profit is your personal income, business growth fund, and financial security. Without profit, you're just moving money around while working for your suppliers and landlords.
                    </p>
                    <div className="text-xs font-medium">Industry Reality:</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Many electricians undercharge and work below break-even without realizing it. This leads to burnout, inability to pay yourself, no training budget, and business failure within 2-3 years.
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="font-bold text-green-500 mb-1">✓ Always quote ABOVE break-even</div>
                    <p className="text-xs text-muted-foreground">
                      Add appropriate profit margin for your market, circumstances, and business sustainability. Your expertise and professional service deserve fair compensation.
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownCard;
