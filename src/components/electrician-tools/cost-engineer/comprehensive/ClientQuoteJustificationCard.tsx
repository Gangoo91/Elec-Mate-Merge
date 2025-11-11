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
  FileText
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
✓ Full compliance with BS 7671:2018+A2:2022
✓ Electrical Installation Certificate
✓ £2M public liability insurance
✓ 12-month workmanship guarantee

This is transparent, competitive pricing that covers all costs while ensuring safety, compliance, and quality workmanship that will last 20+ years.`;

  return (
    <Card className="mobile-card-spacing">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 mobile-text-lg sm:text-xl">
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
          How to Present & Defend This Quote
        </CardTitle>
        <CardDescription className="mobile-text-sm">
          Ready-to-use responses for client conversations and pricing objections
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Value Proposition Header */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-semibold text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                30-Second Value Proposition
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
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
          <pre className="text-sm whitespace-pre-wrap font-sans text-foreground leading-relaxed">
            {valueProposition}
          </pre>
        </div>

        {/* Common Objections */}
        <div className="space-y-3">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            Common Objections & Evidence-Based Responses
          </h3>

          {/* Objection 1: Too Expensive */}
          <Collapsible open={expandedSections.has('objection1')} onOpenChange={() => toggleSection('objection1')}>
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
                <div className="flex items-center gap-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-sm">"This seems expensive / too high"</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('objection1') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <MessageSquare className="h-3 w-3 text-blue-400" />
                      Your Response:
                    </h4>
                    <div className="bg-accent/30 p-3 rounded text-sm space-y-2">
                      <p>"I understand it might seem high at first glance. Let me break down exactly what's included:"</p>
                      
                      <div className="pl-3 space-y-1 text-xs">
                        <p><strong>Materials: {formatCurrency(materialsTotal)}</strong></p>
                        <p className="text-muted-foreground">
                          • Trade supplier materials at net cost {formatCurrency(materialsNet)}<br/>
                          • Plus {materialsMarkup.toFixed(0)}% markup ({formatCurrency(markupAmount)}) to cover waste, collection time, warranty support<br/>
                          • Industry standard markup: 15-25% (we're at {materialsMarkup.toFixed(0)}%)
                        </p>
                        
                        <p className="pt-2"><strong>Labour: {formatCurrency(labourTotal)} ({Math.round(labourHours)} hours)</strong></p>
                        <p className="text-muted-foreground">
                          • Qualified electrician rate: {formatCurrency(labourRate)}/hour<br/>
                          • UK market rate for qualified: £{marketRate.min}-{marketRate.max}/hour (we're competitive)<br/>
                          • {region} regional adjustment: {regionalMultiplier}x
                        </p>
                        
                        <p className="pt-2"><strong>Business Costs: {formatCurrency(overheads)}</strong></p>
                        <p className="text-muted-foreground">
                          • Van, tools, insurance, certifications<br/>
                          • Every electrician must cover these costs<br/>
                          • Allocated fairly: {formatCurrency(dailyOverheadRate)}/day × {jobDays} days
                        </p>
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
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
                <div className="flex items-center gap-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-sm">"I got a cheaper quote from someone else"</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('objection2') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-3 rounded text-sm space-y-3">
                    <p>"That's a valid concern. Lower quotes often cut corners in these areas:"</p>
                    
                    <div>
                      <p className="font-medium text-amber-400 mb-1">⚠️ Questions to ask the cheaper quote:</p>
                      <ul className="text-xs space-y-1 pl-4 text-muted-foreground">
                        <li>• Are they 18th Edition qualified and registered?</li>
                        <li>• Do they have £2M public liability insurance?</li>
                        <li>• Will they provide BS 7671 certification?</li>
                        <li>• Are materials from reputable UK suppliers?</li>
                        <li>• What's their markup on materials? (Ours: {materialsMarkup.toFixed(0)}%)</li>
                        <li>• Is their rate realistic? (Ours: {formatCurrency(labourRate)}/hr vs market £{marketRate.min}-{marketRate.max}/hr)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-green-400 mb-1">✓ Our quote includes:</p>
                      <ul className="text-xs space-y-1 pl-4">
                        <li>• Qualified, insured electrician</li>
                        <li>• Quality materials with warranties</li>
                        <li>• Full compliance and certification</li>
                        <li>• 12-month workmanship guarantee</li>
                        <li>• No hidden extras</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-destructive mb-1">❌ Lower quotes may:</p>
                      <ul className="text-xs space-y-1 pl-4 text-muted-foreground">
                        <li>• Use unqualified labour</li>
                        <li>• Source cheap materials</li>
                        <li>• Skip proper testing</li>
                        <li>• Add 'extras' later</li>
                        <li>• Not provide certification</li>
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
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
                <div className="flex items-center gap-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-sm">"Can you do it for less / Give me a discount?"</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('objection3') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-3 rounded text-sm space-y-3">
                    <p>"I appreciate you asking, but let me explain why this price is already fair:"</p>
                    
                    <div className="bg-destructive/10 border border-destructive/20 p-2 rounded">
                      <p className="font-medium text-xs mb-1">Break-even Point: {formatCurrency(breakEven)}</p>
                      <p className="text-xs text-muted-foreground">This is the absolute minimum to cover:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground mt-1">
                        <li>• Materials: {formatCurrency(materialsTotal)}</li>
                        <li>• Labour: {formatCurrency(labourTotal)}</li>
                        <li>• Overheads: {formatCurrency(overheads)}</li>
                        <li>• Contingency: {formatCurrency(contingency)}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs">Current Quote: {formatCurrency(recommendedPrice)}</p>
                      <p className="text-xs text-muted-foreground">Profit: {formatCurrency(profit)} ({margin.toFixed(1)}% margin)</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        This {margin.toFixed(1)}% margin is my business income for living expenses, tool replacement, and ongoing training.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs mb-1">Industry standard margins:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• Budget work: 10-15% (tight)</li>
                        <li>• Professional work: 20-30% (healthy)</li>
                        <li>• Specialist work: 30-40% (premium)</li>
                      </ul>
                      <p className="text-xs mt-2">At {margin.toFixed(1)}%, I'm already competitive.</p>
                    </div>
                    
                    <div className="border-t border-border pt-2">
                      <p className="font-medium text-xs text-green-400 mb-1">What I CAN do:</p>
                      <ul className="text-xs space-y-0.5 pl-4">
                        <li>• Phase the work across multiple visits</li>
                        <li>• Adjust scope (remove non-essential items)</li>
                        <li>• Offer payment terms</li>
                      </ul>
                      <p className="font-medium text-xs text-destructive mt-2 mb-1">What I can't do:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• Work below break-even (I'd lose money)</li>
                        <li>• Cut corners on safety</li>
                        <li>• Use substandard materials</li>
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
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
                <div className="flex items-center gap-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-sm">"What if I supply the materials?"</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('objection4') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-3 rounded text-sm space-y-3">
                    <p>"I understand the thought, but here's why that rarely works well:"</p>
                    
                    <div>
                      <p className="font-medium text-destructive mb-1">❌ If you supply materials:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• No warranty if materials are faulty</li>
                        <li>• No guarantee they're correct for the job</li>
                        <li>• Delays if wrong items or missing parts</li>
                        <li>• Risk of non-compliant/counterfeit items</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded">
                      <p className="font-medium text-xs mb-1">Current materials breakdown:</p>
                      <p className="text-xs">Net cost: {formatCurrency(materialsNet)} (what I pay)</p>
                      <p className="text-xs">Markup: {formatCurrency(markupAmount)} ({materialsMarkup.toFixed(0)}%)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs mb-1">The {materialsMarkup.toFixed(0)}% markup covers:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• Expertise selecting correct items</li>
                        <li>• Trade supplier access</li>
                        <li>• Warranty and returns handling</li>
                        <li>• Waste and offcuts (5-10%)</li>
                        <li>• Collection time and checking</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 p-2 rounded">
                      <p className="font-medium text-xs mb-1">Trade pricing benefit:</p>
                      <p className="text-xs text-muted-foreground">My trade accounts get 25-40% off retail prices. You'd likely pay MORE buying retail yourself.</p>
                    </div>
                    
                    <p className="pt-2 font-medium text-xs">"Recommendation: Keep materials included for warranty protection and to avoid delays. This protects both of us."</p>
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
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
                <div className="flex items-center gap-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-sm">"Why does labour cost so much?"</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('objection5') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-3 rounded text-sm space-y-3">
                    <p>"Great question. Let me break down what you're paying for:"</p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded">
                      <p className="font-medium text-xs">Labour: {formatCurrency(labourTotal)} ({Math.round(labourHours)} hours @ {formatCurrency(labourRate)}/hour)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs mb-1">✓ What this rate covers:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• Years of training and apprenticeship</li>
                        <li>• 18th Edition BS7671:2018+A2:2022 qualification</li>
                        <li>• NICEIC/NAPIT membership (£450-520/year)</li>
                        <li>• Ongoing CPD training (£400/year)</li>
                        <li>• Professional liability insurance (£850/year)</li>
                        <li>• Experience preventing costly mistakes</li>
                        <li>• Legal compliance knowledge</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs mb-1">UK Market Rates 2025:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• Apprentice: £{marketRate.min - 12}-{marketRate.min - 6}/hour</li>
                        <li>• Improver: £{marketRate.min - 6}-{marketRate.min}/hour</li>
                        <li>• Qualified: £{marketRate.min}-{marketRate.max}/hour ← You're here</li>
                        <li>• Experienced: £{marketRate.max + 5}-{marketRate.max + 10}/hour</li>
                        <li>• Specialist: £{marketRate.max + 15}-{marketRate.max + 30}/hour</li>
                      </ul>
                      <p className="text-xs mt-2">My rate: {formatCurrency(labourRate)}/hour (competitive for qualified work)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs mb-1">Compare to other trades:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• Plumber: £40-80/hour</li>
                        <li>• Gas engineer: £50-90/hour</li>
                        <li>• Builder: £35-60/hour</li>
                        <li>• Electrician: £{marketRate.min}-{marketRate.max}/hour ← Best value</li>
                      </ul>
                    </div>
                    
                    <p className="pt-2 text-xs">"You're not just paying for time on-site. You're paying for knowledge to do it right first time, safety for your family, and years of expertise."</p>
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
            <div className="border border-border rounded-lg">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
                <div className="flex items-center gap-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                  <span className="font-medium text-sm">"Can't you just do it cash for less?"</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform shrink-0 ${expandedSections.has('objection6') ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3 border-t border-border">
                  <div className="bg-accent/30 p-3 rounded text-sm space-y-3">
                    <p>"I appreciate you asking, but I run a legitimate, registered business:"</p>
                    
                    <div className="bg-destructive/10 border border-destructive/20 p-2 rounded">
                      <p className="font-medium text-xs text-destructive mb-1">❌ Why I can't do cash-in-hand:</p>
                      <ul className="text-xs space-y-0.5 pl-4 text-muted-foreground">
                        <li>• It's illegal tax evasion (fines up to £20,000)</li>
                        <li>• Voids your building insurance</li>
                        <li>• No legal recourse if issues arise</li>
                        <li>• Can't provide proper certification</li>
                        <li>• Risk my NICEIC/NAPIT registration</li>
                        <li>• Jeopardizes professional reputation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-xs text-green-400 mb-1">✓ What you get with a proper invoice:</p>
                      <ul className="text-xs space-y-0.5 pl-4">
                        <li>• Legal proof of professional work</li>
                        <li>• Building Control notification</li>
                        <li>• Electrical Installation Certificate</li>
                        <li>• Insurance coverage maintained</li>
                        <li>• Warranty protection</li>
                        <li>• Legal guarantee rights</li>
                        <li>• Tax-deductible if rental property</li>
                      </ul>
                    </div>
                    
                    <p className="text-xs border-t border-border pt-2 mt-2">
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

        {/* Why Choose Summary */}
        <div className="p-4 bg-accent/30 border border-border rounded-lg space-y-3">
          <h3 className="font-semibold text-base flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Why Choose This Quote
          </h3>
          
          <div className="grid gap-3 text-sm">
            <div>
              <p className="font-medium text-xs text-green-400 mb-1">✅ What You Get:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pl-3">
                <div>
                  <p className="font-medium text-foreground">Professional Standards:</p>
                  <ul className="space-y-0.5">
                    <li>• 18th Edition qualified</li>
                    <li>• NICEIC/NAPIT registered</li>
                    <li>• £2M liability insurance</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">Quality Materials:</p>
                  <ul className="space-y-0.5">
                    <li>• Trade supplier materials</li>
                    <li>• Manufacturer warranties</li>
                    <li>• BS/EU compliance</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">Legal Compliance:</p>
                  <ul className="space-y-0.5">
                    <li>• BS 7671:2018+A2:2022</li>
                    <li>• Building Control notification</li>
                    <li>• EIC certification</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">Guarantees:</p>
                  <ul className="space-y-0.5">
                    <li>• 12-month workmanship</li>
                    <li>• Material warranties</li>
                    <li>• Insurance-backed work</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-3">
              <p className="font-medium text-xs text-destructive mb-1">⚠️ What Budget Quotes Often Cut:</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground pl-3">
                <div>❌ Unqualified labour</div>
                <div>❌ Cheap materials</div>
                <div>❌ No insurance</div>
                <div>❌ Missing certification</div>
                <div>❌ Corners on testing</div>
                <div>❌ No guarantee</div>
                <div>❌ Hidden extras</div>
                <div>❌ Non-compliant work</div>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 p-2 rounded">
              <p className="text-xs">
                <strong>Your Investment:</strong> {formatCurrency(recommendedPrice)} for professional electrical work 
                that will last 20+ years and keep your property safe, legal, and insurable.
              </p>
            </div>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(`Why Choose This Quote:\n\n✅ What You Get:\n\nProfessional Standards:\n• 18th Edition qualified electrician\n• NICEIC/NAPIT registered\n• £2M public liability insurance\n\nQuality Materials:\n• Trade supplier materials (CEF, TLC)\n• Manufacturer warranties\n• BS/EU standard compliance\n\nLegal Compliance:\n• BS 7671:2018+A2:2022 compliant\n• Building Control notification\n• Electrical Installation Certificate\n\nGuarantees:\n• 12-month workmanship guarantee\n• Material manufacturer warranties\n• Insurance-backed work\n\nFair Pricing:\n• Materials at trade + ${materialsMarkup.toFixed(0)}% (industry standard)\n• Labour ${formatCurrency(labourRate)}/hr (UK market rate)\n• ${margin.toFixed(1)}% margin (competitive)\n\n⚠️ Budget Quotes Often Cut:\n❌ Qualified labour\n❌ Quality materials\n❌ Insurance\n❌ Certification\n❌ Testing\n❌ Guarantees\n\nInvestment: ${formatCurrency(recommendedPrice)} for professional work lasting 20+ years.`, "Why choose summary")}
            className="w-full"
          >
            <Copy className="h-3 w-3 mr-2" />
            Copy Summary
          </Button>
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
                <p className="text-sm text-muted-foreground">Help clients properly evaluate quotes with this checklist:</p>
                
                <div className="bg-accent/30 p-3 rounded text-xs space-y-2">
                  <div>
                    <p className="font-medium mb-1">□ Qualifications</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- 18th Edition certified?</li>
                      <li>- NICEIC/NAPIT/scheme registered?</li>
                      <li>- Years of experience?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">□ Insurance</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- Public liability (min £2M)?</li>
                      <li>- Professional indemnity?</li>
                      <li>- Proof available?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">□ Materials</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- Supplier specified?</li>
                      <li>- Brand names listed?</li>
                      <li>- Warranties included?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">□ Certification</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- EIC provided?</li>
                      <li>- Building Control notification?</li>
                      <li>- Test certificates?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">□ Pricing</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- Itemized breakdown?</li>
                      <li>- Materials + labour separated?</li>
                      <li>- VAT clearly shown?</li>
                      <li>- Payment terms defined?</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">□ Guarantees</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- Workmanship guarantee period?</li>
                      <li>- What's covered?</li>
                      <li>- Insurance-backed?</li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-destructive/20 pt-2 mt-2">
                    <p className="font-medium text-destructive mb-1">🚨 Red Flags:</p>
                    <ul className="pl-4 space-y-0.5 text-muted-foreground">
                      <li>- "Cash only, no invoice"</li>
                      <li>- No qualifications mentioned</li>
                      <li>- Too cheap (below market)</li>
                      <li>- Vague pricing</li>
                      <li>- No insurance proof</li>
                      <li>- Pressure to decide immediately</li>
                      <li>- No written quote</li>
                      <li>- Payment upfront in full</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 p-2 rounded mt-2">
                    <p className="font-medium text-green-400 text-xs">✅ This Quote Checklist:</p>
                    <p className="text-muted-foreground">All boxes ticked above ✓</p>
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
          <p className="text-muted-foreground">
            These responses use your actual quote data to provide evidence-based justification. 
            Copy individual responses or the full summary to use in client conversations, emails, or printed quotes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuoteJustificationCard;
