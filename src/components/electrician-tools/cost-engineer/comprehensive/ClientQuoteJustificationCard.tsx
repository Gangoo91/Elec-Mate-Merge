import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  MessageSquare, 
  ChevronDown, 
  Copy, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Shield,
  TrendingUp,
  FileText,
  Package
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/format";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";

interface ClientQuoteJustificationCardProps {
  materialsNet: number;
  materialsMarkup: number;
  materialsTotal: number;
  labourHours: number;
  labourRate: number;
  labourTotal: number;
  overheads: number;
  contingency: number;
  breakEven: number;
  recommendedPrice: number;
  profit: number;
  margin: number;
  region?: string;
  experienceLevel?: string;
  jobDescription?: string;
}

const ClientQuoteJustificationCard = ({
  materialsNet,
  materialsMarkup,
  materialsTotal,
  labourHours,
  labourRate,
  labourTotal,
  overheads,
  contingency,
  breakEven,
  recommendedPrice,
  profit,
  margin,
  region = 'other',
  experienceLevel = 'qualified',
}: ClientQuoteJustificationCardProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  // Calculate values
  const markupAmount = materialsNet * (materialsMarkup / 100);
  const jobDays = Math.ceil(labourHours / 8);
  const dailyOverheadRate = jobDays > 0 ? overheads / jobDays : 0;
  const regionKey = region as keyof typeof MARKET_RATES_2025.regionalMultipliers;
  const regionalMultiplier = MARKET_RATES_2025.regionalMultipliers[regionKey] || 1.0;
  const marketRate = MARKET_RATES_2025.hourlyRates.qualified;

  // Value Proposition
  const valueProposition = `Professional Electrical Quote - ${formatCurrency(recommendedPrice)}

I'm a qualified electrician with 18th Edition certification and full NICEIC/NAPIT registration. This quote covers ${Math.round(labourHours)} hours of professional work using quality materials from trusted UK suppliers (CEF, TLC, etc.).

What's Included:
✓ Quality materials: ${formatCurrency(materialsTotal)}
✓ Professional labour: ${formatCurrency(labourTotal)} (${Math.round(labourHours)} hours)
✓ Full compliance with BS7671:2018+A3:2024
✓ Electrical Installation Certificate
✓ £2M public liability insurance
✓ 12-month workmanship guarantee

This is transparent, competitive pricing that covers all costs while ensuring safety, compliance, and quality workmanship that will last 20+ years.`;

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          How to Present & Defend This Quote
        </CardTitle>
        <CardDescription className="text-base sm:text-sm text-foreground">
          Ready-to-use responses for client conversations and pricing objections
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Value Proposition Header */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-semibold text-lg sm:text-base text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                30-Second Value Proposition
              </h3>
              <p className="text-base sm:text-sm text-foreground mt-1">
                Your elevator pitch for this quote
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(valueProposition, "Value proposition")}
              className="shrink-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <pre className="text-base sm:text-sm whitespace-pre-wrap font-sans text-foreground leading-relaxed text-left">
            {valueProposition}
          </pre>
        </div>

        {/* Common Objections */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg sm:text-base text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            Common Objections & Evidence-Based Responses
          </h3>

          {/* Objection 1: Too Expensive */}
          <Collapsible open={expandedSections.has('objection1')} onOpenChange={() => toggleSection('objection1')}>
            <div className="border-2 border-border/50 bg-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/30 active:bg-accent/50 transition-colors touch-manipulation min-h-14">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                  </div>
                  <span className="font-medium text-base text-foreground">"This seems expensive / too high"</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${expandedSections.has('objection1') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="space-y-2">
                    <h4 className="font-medium text-lg sm:text-base text-foreground flex items-center gap-2">
                      <MessageSquare className="h-3 w-3 text-blue-400" />
                      Your Response:
                    </h4>
                    <div className="bg-accent/30 p-4 sm:p-3 rounded text-base sm:text-sm text-foreground space-y-3 text-left">
                      <p>"I understand it might seem high at first glance. Let me break down exactly what's included:"</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold mb-2">Materials: {formatCurrency(materialsTotal)}</p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Trade supplier materials at net cost {formatCurrency(materialsNet)}</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Plus {materialsMarkup.toFixed(0)}% markup ({formatCurrency(markupAmount)}) to cover waste, collection time, warranty support</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Industry standard markup: 15-25% (we're at {materialsMarkup.toFixed(0)}%)</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Labour: {formatCurrency(labourTotal)} ({Math.round(labourHours)} hours)</p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Qualified electrician rate: {formatCurrency(labourRate)}/hour</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>UK market rate for qualified: £{marketRate.min}-{marketRate.max}/hour (we're competitive)</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>{region} regional adjustment: {regionalMultiplier}x</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2">Business Costs: {formatCurrency(overheads)}</p>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Van, tools, insurance, certifications</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Every electrician must cover these costs</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span>Allocated fairly: {formatCurrency(dailyOverheadRate)}/day × {jobDays} days</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <p className="pt-2">"This quote reflects professional work that will last 20+ years and keep your family safe."</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`I understand it might seem high at first glance. Let me break down exactly what's included:\n\nMaterials: ${formatCurrency(materialsTotal)}\n- Quality materials from trusted suppliers at trade prices\n- Materials cost ${formatCurrency(materialsNet)}, plus ${materialsMarkup.toFixed(0)}% to cover waste, collection, and warranty\n- Industry standard markup: 15-25% (we're at ${materialsMarkup.toFixed(0)}%)\n\nLabour: ${formatCurrency(labourTotal)} (${Math.round(labourHours)} hours)\n- Qualified electrician: ${formatCurrency(labourRate)}/hour\n- UK market rate: £${marketRate.min}-${marketRate.max}/hour (competitive)\n- ${region} regional adjustment: ${regionalMultiplier}x\n\nBusiness Costs: ${formatCurrency(overheads)}\n- Van, tools, insurance, certifications\n- ${formatCurrency(dailyOverheadRate)}/day × ${jobDays} days\n\nThis reflects professional work that will last 20+ years and keep your family safe.`, "Response to 'too expensive'")}
                      className="w-full"
                    >
                      <Copy className="h-3 w-3 mr-2" />
                      Copy Response
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Objection 2: Cheaper Quote */}
          <Collapsible open={expandedSections.has('objection2')} onOpenChange={() => toggleSection('objection2')}>
            <div className="border-2 border-border/50 bg-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/30 transition-colors touch-manipulation min-h-14">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                  </div>
                  <span className="font-medium text-base text-foreground">"I got a cheaper quote from someone else"</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${expandedSections.has('objection2') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-4 sm:p-3 rounded text-base sm:text-sm text-foreground space-y-4 text-left">
                    <p>"That's a valid concern. Lower quotes often cut corners in these areas:"</p>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                      <p className="font-medium text-amber-400 mb-3">⚠️ Questions to ask the cheaper quote:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Are they 18th Edition qualified and registered?</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Do they have £2M public liability insurance?</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Will they provide BS 7671 certification?</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Are materials from reputable UK suppliers?</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>What's their markup on materials? (Ours: {materialsMarkup.toFixed(0)}%)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Is their rate realistic? (Ours: {formatCurrency(labourRate)}/hr vs market £{marketRate.min}-{marketRate.max}/hr)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="font-medium text-green-400 mb-3">✓ Our quote includes:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Qualified, insured electrician</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Quality materials with warranties</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Full compliance and certification</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>12-month workmanship guarantee</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>No hidden extras</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <p className="font-medium text-destructive mb-3">❌ Lower quotes may:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Use unqualified labour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Source cheap materials</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Skip proper testing</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Add 'extras' later</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Not provide certification</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="pt-2 font-medium">"Your safety and compliance aren't worth the risk."</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("Lower quotes often cut corners. Questions to ask:\n\n⚠️ Are they:\n- 18th Edition qualified?\n- Fully insured (£2M)?\n- Providing BS 7671 certification?\n- Using quality UK materials?\n\n✓ Our quote includes:\n- Qualified, insured electrician\n- Quality materials with warranties\n- Full compliance and certification\n- 12-month guarantee\n- No hidden extras\n\n❌ Budget quotes may:\n- Use unqualified labour\n- Source cheap materials\n- Skip proper testing\n- Add extras later\n\nYour safety isn't worth the risk.", "Cheaper quote response")}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy Response
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Objection 3: Discount Request */}
          <Collapsible open={expandedSections.has('objection3')} onOpenChange={() => toggleSection('objection3')}>
            <div className="border-2 border-border/50 bg-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/30 transition-colors touch-manipulation min-h-14">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                  </div>
                  <span className="font-medium text-base text-foreground">"Can you do it for less / Give me a discount?"</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${expandedSections.has('objection3') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-4 sm:p-3 rounded text-base sm:text-sm text-foreground space-y-4 text-left">
                    <p>"I appreciate you asking, but let me explain why this price is already fair:"</p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                      <p className="font-semibold mb-2 text-blue-400">Break-even Point: {formatCurrency(breakEven)}</p>
                      <p className="text-sm text-foreground mb-2">This is the absolute minimum to cover:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Materials: {formatCurrency(materialsTotal)}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Labour: {formatCurrency(labourTotal)}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Overheads: {formatCurrency(overheads)}</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Contingency: {formatCurrency(contingency)}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-sm">Current Quote: {formatCurrency(recommendedPrice)}</p>
                      <p className="text-sm text-foreground mt-1">Profit: {formatCurrency(profit)} ({margin.toFixed(1)}% margin)</p>
                      <p className="text-sm text-foreground mt-2">
                        This {margin.toFixed(1)}% margin is my business income for living expenses, tool replacement, and ongoing training.
                      </p>
                    </div>
                    
                    <div className="bg-accent/20 border border-primary/20 p-3 rounded-lg">
                      <p className="font-semibold text-sm mb-2">Industry standard margins:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Budget work: 10-15% (tight)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Professional work: 20-30% (healthy)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Specialist work: 30-40% (premium)</span>
                        </li>
                      </ul>
                      <p className="text-sm mt-2">At {margin.toFixed(1)}%, I'm already competitive.</p>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="font-semibold text-sm text-green-400 mb-2">What I CAN do:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Phase the work across multiple visits</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Adjust scope (remove non-essential items)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Offer payment terms</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <p className="font-semibold text-sm text-red-400 mb-2">What I can't do:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Work below break-even (I'd lose money)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Cut corners on safety</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Use substandard materials</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`This price is already fair:\n\nBreak-even: ${formatCurrency(breakEven)}\n(Materials ${formatCurrency(materialsTotal)} + Labour ${formatCurrency(labourTotal)} + Overheads ${formatCurrency(overheads)} + Contingency ${formatCurrency(contingency)})\n\nQuote: ${formatCurrency(recommendedPrice)}\nProfit: ${formatCurrency(profit)} (${margin.toFixed(1)}% margin)\n\nThis ${margin.toFixed(1)}% is my business income for living, tools, and training.\n\nIndustry margins:\n• Budget: 10-15%\n• Professional: 20-30%\n• Specialist: 30-40%\n\nWhat I CAN do:\n• Phase the work\n• Adjust scope\n• Offer payment terms\n\nWhat I can't do:\n• Work below break-even\n• Cut corners on safety\n• Use substandard materials`, "Discount response")}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy Response
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Objection 4: Supply Materials */}
          <Collapsible open={expandedSections.has('objection4')} onOpenChange={() => toggleSection('objection4')}>
            <div className="border-2 border-border/50 bg-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/30 transition-colors touch-manipulation min-h-14">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                  </div>
                  <span className="font-medium text-base text-foreground">"What if I supply the materials?"</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${expandedSections.has('objection4') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-4 sm:p-3 rounded text-sm space-y-4 text-left">
                    <p>"I understand the thought, but here's why that rarely works well:"</p>
                    
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <p className="font-semibold text-red-400 mb-3">❌ If you supply materials:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>No warranty if materials are faulty</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>No guarantee they're correct for the job</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Delays if wrong items or missing parts</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Risk of non-compliant/counterfeit items</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                      <p className="font-semibold text-blue-400 mb-2">Current materials breakdown:</p>
                      <div className="space-y-1 text-sm text-foreground">
                        <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                          <span>Net cost (what I pay):</span>
                          <span className="font-medium whitespace-nowrap">{formatCurrency(materialsNet)}</span>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                          <span>Markup ({materialsMarkup.toFixed(0)}%):</span>
                          <span className="font-medium whitespace-nowrap">{formatCurrency(markupAmount)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-accent/20 border border-primary/20 p-3 rounded-lg">
                      <p className="font-semibold text-sm mb-3">The {materialsMarkup.toFixed(0)}% markup covers:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Expertise selecting correct items</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Trade supplier access</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Warranty and returns handling</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Waste and offcuts (5-10%)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Collection time and checking</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <p className="font-semibold text-green-400 mb-2">Trade pricing benefit:</p>
                      <p className="text-sm text-foreground">My trade accounts get 25-40% off retail prices. You'd likely pay MORE buying retail yourself.</p>
                    </div>
                    
                    <p className="pt-2 font-medium text-sm">"Recommendation: Keep materials included for warranty protection and to avoid delays. This protects both of us."</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`Client-supplied materials rarely work well:\n\n❌ Issues:\n• No warranty if faulty\n• No guarantee they're correct\n• Delays with wrong/missing items\n• Risk of non-compliant materials\n\nMaterials breakdown:\nNet: ${formatCurrency(materialsNet)}\nMarkup: ${formatCurrency(markupAmount)} (${materialsMarkup.toFixed(0)}%)\n\nThe ${materialsMarkup.toFixed(0)}% covers:\n• Expertise selecting correct items\n• Trade supplier access\n• Warranty handling\n• Waste (5-10%)\n• Collection time\n\n✓ Trade pricing benefit:\nI get 25-40% off retail - you'd pay MORE buying retail yourself.\n\nRecommendation: Keep materials included for warranty and to avoid delays.`, "Supply materials response")}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy Response
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Objection 5: Labour Costs */}
          <Collapsible open={expandedSections.has('objection5')} onOpenChange={() => toggleSection('objection5')}>
            <div className="border-2 border-border/50 bg-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/30 transition-colors touch-manipulation min-h-14">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                  </div>
                  <span className="font-medium text-base text-foreground">"Why does labour cost so much?"</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${expandedSections.has('objection5') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-4 sm:p-3 rounded text-sm space-y-4 text-left">
                    <p>"Great question. Let me break down what you're paying for:"</p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                      <p className="font-semibold text-blue-400">Labour: {formatCurrency(labourTotal)} ({Math.round(labourHours)} hours @ {formatCurrency(labourRate)}/hour)</p>
                    </div>
                    
                    <div className="bg-accent/20 border border-primary/20 p-3 rounded-lg text-left">
                      <p className="font-semibold text-sm mb-3">✓ What this rate covers:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Years of training and apprenticeship</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>18th Edition BS7671:2018+A3:2024 qualification</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>NICEIC/NAPIT membership (£450-520/year)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Ongoing CPD training (£400/year)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Professional liability insurance (£850/year)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Experience preventing costly mistakes</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Legal compliance knowledge</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg text-left">
                      <p className="font-semibold text-sm mb-3 text-purple-400">UK Market Rates 2025:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Apprentice: £{marketRate.min - 12}-{marketRate.min - 6}/hour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Improver: £{marketRate.min - 6}-{marketRate.min}/hour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Qualified: £{marketRate.min}-{marketRate.max}/hour ← You're here</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Experienced: £{marketRate.max + 5}-{marketRate.max + 10}/hour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Specialist: £{marketRate.max + 15}-{marketRate.max + 30}/hour</span>
                        </li>
                      </ul>
                      <p className="text-sm mt-3 text-foreground">My rate: {formatCurrency(labourRate)}/hour (competitive for qualified work)</p>
                    </div>
                    
                    <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-lg text-left">
                      <p className="font-semibold text-sm mb-3 text-cyan-400">Compare to other trades:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Plumber: £40-80/hour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Gas engineer: £50-90/hour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Builder: £35-60/hour</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-400 flex-shrink-0">•</span>
                          <span>Electrician: £{marketRate.min}-{marketRate.max}/hour ← Best value</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="pt-2 text-sm">"You're not just paying for time on-site. You're paying for knowledge to do it right first time, safety for your family, and years of expertise."</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`Labour breakdown:\n${formatCurrency(labourTotal)} (${Math.round(labourHours)} hours @ ${formatCurrency(labourRate)}/hour)\n\n✓ What this covers:\n• Years of training\n• 18th Edition qualified\n• NICEIC membership (£450-520/yr)\n• Training (£400/yr)\n• Insurance (£850/yr)\n• Experience and expertise\n• Legal compliance\n\nUK Market Rates 2025:\n• Apprentice: £12-18/hr\n• Improver: £18-25/hr\n• Qualified: £${marketRate.min}-${marketRate.max}/hr ← You're here\n• Experienced: £${marketRate.max + 5}-${marketRate.max + 10}/hr\n• Specialist: £${marketRate.max + 15}-${marketRate.max + 30}/hr\n\nMy rate: ${formatCurrency(labourRate)}/hr (competitive)\n\nCompare trades:\n• Plumber: £40-80/hr\n• Gas: £50-90/hr\n• Builder: £35-60/hr\n• Electrician: £${marketRate.min}-${marketRate.max}/hr ← Best value\n\nYou're paying for knowledge, safety, and expertise.`, "Labour costs response")}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy Response
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Objection 6: Cash Discount */}
          <Collapsible open={expandedSections.has('objection6')} onOpenChange={() => toggleSection('objection6')}>
            <div className="border-2 border-destructive/50 bg-card rounded-xl overflow-hidden hover:border-destructive/70 transition-colors">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors touch-manipulation min-h-14">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                  </div>
                  <span className="font-medium text-base text-foreground">"Can't you just do it cash for less?"</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${expandedSections.has('objection6') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-4 sm:p-3 rounded text-sm space-y-4 text-left">
                    <p>"I appreciate you asking, but I run a legitimate, registered business:"</p>
                    
                    <div className="bg-red-400/20 border border-red-400/30 p-3 rounded-lg text-left">
                      <p className="font-semibold text-red-400 mb-3">❌ Why I can't do cash-in-hand:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>It's illegal tax evasion (fines up to £20,000)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Voids your building insurance</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>No legal recourse if issues arise</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Can't provide proper certification</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Risk my NICEIC/NAPIT registration</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-400 flex-shrink-0">•</span>
                          <span>Jeopardizes professional reputation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-left">
                      <p className="font-semibold text-green-400 mb-3">✓ What you get with a proper invoice:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Legal proof of professional work</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Building Control notification</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Electrical Installation Certificate</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Insurance coverage maintained</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Warranty protection</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Legal guarantee rights</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Tax-deductible if rental property</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="text-sm border-t border-border pt-3 mt-3 text-foreground">
                      "VAT-registered businesses must charge VAT by law. This protects you with proper documentation and certification. Professional electrical work requires proper records for safety and legal compliance."
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard("I run a legitimate, registered business.\n\n❌ Cash-in-hand issues:\n• Illegal tax evasion (£20k fines)\n• Voids building insurance\n• No legal recourse\n• Can't provide certification\n• Risk professional registration\n\n✓ Proper invoice benefits:\n• Legal proof of work\n• Building Control notification\n• EIC certificate\n• Insurance maintained\n• Warranty protection\n• Legal rights\n• Tax-deductible (if rental)\n\nVAT-registered businesses MUST charge VAT by law. This protects you with proper documentation and certification.", "Cash discount response")}
                    className="w-full"
                  >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy Response
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        {/* Why Choose Summary - Card Grid */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            Why Choose This Quote
          </h3>
          
          {/* What You Get - Card Grid */}
          <div>
            <p className="font-medium text-sm text-green-400 mb-3">✅ What You Get:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <h4 className="font-medium text-sm text-foreground">Professional Standards</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-green-400 flex-shrink-0">•</span>
                    <span>18th Edition qualified</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-green-400 flex-shrink-0">•</span>
                    <span>NICEIC/NAPIT registered</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-green-400 flex-shrink-0">•</span>
                    <span>£2M liability insurance</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <Package className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <h4 className="font-medium text-sm text-foreground">Quality Materials</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-blue-400 flex-shrink-0">•</span>
                    <span>Trade supplier materials</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-blue-400 flex-shrink-0">•</span>
                    <span>Manufacturer warranties</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-blue-400 flex-shrink-0">•</span>
                    <span>BS/EU compliance</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <FileText className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  <h4 className="font-medium text-sm text-foreground">Legal Compliance</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-purple-400 flex-shrink-0">•</span>
                    <span>BS7671:2018+A3:2024</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-purple-400 flex-shrink-0">•</span>
                    <span>Building Control notification</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-purple-400 flex-shrink-0">•</span>
                    <span>EIC certification</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <h4 className="font-medium text-sm text-foreground">Guarantees</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>12-month workmanship</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>Material warranties</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-foreground">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>Insurance-backed work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* What Budget Quotes Cut */}
          <div className="bg-red-400/20 border border-red-400/30 rounded-lg p-4 text-left">
            <p className="font-medium text-sm text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              What Budget Quotes Often Cut:
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-foreground">
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>Unqualified labour</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>Cheap materials</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>No insurance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>Missing certification</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>Corners on testing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>No guarantee</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>Hidden extras</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <span>Non-compliant work</span>
              </div>
            </div>
          </div>
          
          {/* Investment Summary */}
          <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong className="text-primary">Your Investment:</strong> {formatCurrency(recommendedPrice)} for professional electrical work 
                that will last 20+ years and keep your property safe, legal, and insurable.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Comparison Checklist */}
        <Collapsible open={expandedSections.has('checklist')} onOpenChange={() => toggleSection('checklist')}>
          <div className="border border-border rounded-lg">
            <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
              <div className="flex items-center gap-2 text-left">
                <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="font-medium text-sm">Client Quote Comparison Checklist</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('checklist') ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 pt-2 space-y-3 border-t border-border">
                <p className="text-sm text-foreground">Help clients properly evaluate quotes with this checklist:</p>
                
                <div className="bg-accent/30 p-3 rounded text-xs space-y-3 text-left">
                  <div>
                    <p className="font-medium mb-1.5 flex items-start gap-2">
                      <span className="text-amber-400">□</span>
                      <span>Qualifications</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>18th Edition certified?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>NICEIC/NAPIT/scheme registered?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Years of experience?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1.5 flex items-start gap-2">
                      <span className="text-amber-400">□</span>
                      <span>Insurance</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Public liability (min £2M)?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Professional indemnity?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Proof available?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1.5 flex items-start gap-2">
                      <span className="text-amber-400">□</span>
                      <span>Materials</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Supplier specified?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Brand names listed?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Warranties included?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1.5 flex items-start gap-2">
                      <span className="text-amber-400">□</span>
                      <span>Certification</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>EIC provided?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Building Control notification?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Test certificates?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1.5 flex items-start gap-2">
                      <span className="text-amber-400">□</span>
                      <span>Pricing</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Itemized breakdown?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Materials + labour separated?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>VAT clearly shown?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Payment terms defined?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1.5 flex items-start gap-2">
                      <span className="text-amber-400">□</span>
                      <span>Guarantees</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Workmanship guarantee period?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>What's covered?</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-amber-400 flex-shrink-0">•</span>
                        <span>Insurance-backed?</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-red-400/30 pt-3 mt-1">
                    <p className="font-medium text-red-400 mb-1.5 flex items-start gap-2">
                      <span>🚨</span>
                      <span>Red Flags:</span>
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>"Cash only, no invoice"</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>No qualifications mentioned</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Too cheap (below market)</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Vague pricing</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>No insurance proof</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Pressure to decide immediately</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>No written quote</span>
                      </li>
                      <li className="flex items-start gap-2 text-foreground">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>Payment upfront in full</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded mt-2 text-left">
                    <p className="font-medium text-green-400 text-xs mb-1">✅ This Quote Checklist:</p>
                    <p className="text-foreground">All boxes ticked above ✓</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard("Quote Comparison Checklist:\n\n□ Qualifications\n  - 18th Edition certified?\n  - NICEIC/NAPIT registered?\n  - Years of experience?\n\n□ Insurance\n  - Public liability (£2M min)?\n  - Professional indemnity?\n  - Proof available?\n\n□ Materials\n  - Supplier specified?\n  - Brand names listed?\n  - Warranties included?\n\n□ Certification\n  - EIC provided?\n  - Building Control notification?\n  - Test certificates?\n\n□ Pricing\n  - Itemized breakdown?\n  - Materials + labour separated?\n  - VAT clearly shown?\n  - Payment terms defined?\n\n□ Guarantees\n  - Workmanship guarantee?\n  - What's covered?\n  - Insurance-backed?\n\n🚨 Red Flags:\n- Cash only, no invoice\n- No qualifications\n- Too cheap\n- Vague pricing\n- No insurance\n- Pressure tactics\n- No written quote\n- Full upfront payment\n\n✅ This Quote: All boxes ticked ✓", "Comparison checklist")}
                  className="w-full"
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy Checklist
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Info Footer */}
        <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-foreground">
            These responses use your actual quote data to provide evidence-based justification. 
            Copy individual responses or the full summary to use in client conversations, emails, or printed quotes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuoteJustificationCard;
