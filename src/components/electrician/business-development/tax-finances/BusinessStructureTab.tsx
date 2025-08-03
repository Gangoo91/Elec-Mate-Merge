import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Building, FileText, Users, Shield, Calculator, Banknote, UserCheck, FileCheck, Scale, TrendingUp, CheckCircle } from "lucide-react";

const BusinessStructureTab = () => {
  const isMobile = useIsMobile();

  const structureMetrics = [
    {
      metric: "Tax Efficiency Threshold",
      data: "£50,000 annual profit",
      icon: <Calculator className="h-5 w-5 text-purple-400" />,
      detail: "Point where limited company becomes more tax efficient"
    },
    {
      metric: "Corporation Tax Rates",
      data: "19% to 25%",
      icon: <Banknote className="h-5 w-5 text-blue-400" />,
      detail: "Small profits rate 19%, main rate 25% over £250k"
    },
    {
      metric: "Personal Allowance",
      data: "£12,570 tax-free",
      icon: <UserCheck className="h-5 w-5 text-green-400" />,
      detail: "Tax-free income threshold for 2024/25"
    },
    {
      metric: "Liability Protection",
      data: "Limited company advantage",
      icon: <Shield className="h-5 w-5 text-orange-400" />,
      detail: "Personal assets protected from business debts"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-purple-400/50 bg-purple-400/10">
        <Building className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-400">
          Choosing the right business structure can save thousands in tax and protect your personal assets. Review annually as your business grows.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {structureMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="sole-trader">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-purple-400" />}>
            Sole Trader Structure
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                The simplest and most popular business structure for individual electricians starting their trade business in the UK.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Perfect for new electricians with straightforward business needs, annual profits under £50,000, and those who want immediate trading capability with minimal paperwork.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Day 1: Register for Self Assessment with HMRC</li>
                      <li>• Week 1: Open dedicated business bank account</li>
                      <li>• Week 2: Arrange public liability insurance (minimum £2m)</li>
                      <li>• Week 3: Set up basic bookkeeping system</li>
                      <li>• Ongoing: Maintain records for annual tax returns</li>
                      <li>• Monthly: Track income, expenses, and mileage</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Quick setup - can start trading immediately</li>
                      <li>• Complete control over business decisions</li>
                      <li>• All profits belong to you after tax</li>
                      <li>• Simple tax obligations and reporting</li>
                      <li>• Flexibility to work for multiple clients</li>
                      <li>• No requirement for separate business premises</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual Self Assessment tax return by 31st January</li>
                      <li>• National Insurance contributions (Class 2 and 4)</li>
                      <li>• Unlimited personal liability for business debts</li>
                      <li>• Simple record keeping - receipts and invoices</li>
                      <li>• No Companies House registration required</li>
                      <li>• VAT registration if turnover exceeds £90,000</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Income tax: 20%, 40%, or 45% on profit bands</li>
                      <li>• Class 2 NI: £3.45/week if profits &gt;£6,515</li>
                      <li>• Class 4 NI: 9% on profits £12,570-£50,270</li>
                      <li>• Personal allowance: £12,570 (2024/25)</li>
                      <li>• Can claim business expenses against income</li>
                      <li>• Higher rate threshold: £50,270</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual profit threshold: Monitor under £50k</li>
                      <li>• Tax efficiency: Compare with limited company annually</li>
                      <li>• Personal liability exposure assessment</li>
                      <li>• Administrative time: &lt;2 hours/month</li>
                      <li>• Business growth rate: Track for structure review</li>
                      <li>• Client diversity: Avoid over-dependence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="limited-company">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-blue-400" />}>
            Limited Company Structure
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                A separate legal entity offering liability protection and tax efficiency for established electricians with higher profits.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Best for established electricians with annual profits over £50,000 seeking liability protection and tax efficiency.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Companies House registration</li>
                      <li>• Week 2: Business bank account setup</li>
                      <li>• Week 3: PAYE & VAT registration if needed</li>
                      <li>• Month 1: Accounting system implementation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Limited personal liability</li>
                      <li>• Tax efficiency for higher profits</li>
                      <li>• Professional credibility</li>
                      <li>• Easier to raise investment</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual accounts filing</li>
                      <li>• Corporation tax returns</li>
                      <li>• Directors' responsibilities</li>
                      <li>• PAYE for salary payments</li>
                      <li>• Companies House compliance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Corporation tax: 19% (under £50k)</li>
                      <li>• Corporation tax: 25% (over £250k)</li>
                      <li>• Dividend tax: 8.75%, 33.75%, 39.35%</li>
                      <li>• Salary & dividend optimisation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Tax savings vs sole trader</li>
                      <li>• Compliance costs: &lt;5% of profit</li>
                      <li>• Return on investment</li>
                      <li>• Administrative efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="partnership">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-green-400" />}>
            Partnership Structure
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Two or more electricians working together, sharing skills, costs, and responsibilities in a flexible business arrangement.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Ideal for electricians combining complementary skills and sharing business risks while maintaining simple tax structure.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Partnership agreement drafting</li>
                      <li>• Week 2: HMRC partnership registration</li>
                      <li>• Week 3: Joint business bank account</li>
                      <li>• Week 4: Accounting system setup</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Shared responsibilities & workload</li>
                      <li>• Combined skills & resources</li>
                      <li>• Shared startup costs & risks</li>
                      <li>• Flexible profit sharing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Partnership agreement essential</li>
                      <li>• Joint and several liability</li>
                      <li>• Partnership tax return (SA800)</li>
                      <li>• Individual Self Assessment</li>
                      <li>• Shared decision-making</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Each partner pays income tax on share</li>
                      <li>• Class 2 & 4 National Insurance</li>
                      <li>• Partnership return required</li>
                      <li>• Profit sharing affects tax liability</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Partnership harmony & communication</li>
                      <li>• Profit sharing satisfaction</li>
                      <li>• Combined business growth</li>
                      <li>• Risk management effectiveness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="decision-tool">
          <MobileAccordionTrigger icon={<Scale className="h-5 w-5 text-yellow-400" />}>
            Structure Decision Tool
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Use this comprehensive tool to evaluate which business structure best suits your electrical contracting business needs.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Systematic evaluation of profit levels, liability exposure, administrative capacity, and growth plans.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Assess current business metrics</li>
                      <li>• Week 2: Evaluate 3-year projections</li>
                      <li>• Week 3: Compare tax implications</li>
                      <li>• Week 4: Make informed decision</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Optimised tax efficiency</li>
                      <li>• Appropriate liability protection</li>
                      <li>• Scalable business structure</li>
                      <li>• Future-proofed decisions</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual profit assessment</li>
                      <li>• Liability risk evaluation</li>
                      <li>• Administrative capacity review</li>
                      <li>• Growth plan alignment</li>
                      <li>• Professional advice consideration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Under £20k: Sole trader optimal</li>
                      <li>• £20k-£50k: Consider both options</li>
                      <li>• Over £50k: Limited company advantageous</li>
                      <li>• Review annually for changes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Tax efficiency gains</li>
                      <li>• Liability protection level</li>
                      <li>• Administrative burden management</li>
                      <li>• Structure change readiness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="llp">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-orange-400" />}>
            Limited Liability Partnership (LLP)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                A hybrid structure combining partnership flexibility with limited liability protection - ideal for professional electrical partnerships.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Perfect for established electrical partnerships requiring liability protection whilst maintaining tax transparency and operational flexibility.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1-2: LLP agreement drafting with solicitor</li>
                      <li>• Week 3: Companies House registration (£20 fee)</li>
                      <li>• Week 4: Business bank account and insurance</li>
                      <li>• Month 2: HMRC registration and accounting setup</li>
                      <li>• Ongoing: Annual confirmation statements</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Limited liability protection for all members</li>
                      <li>• Flexible management and profit sharing</li>
                      <li>• Professional credibility and standing</li>
                      <li>• Tax transparency - no double taxation</li>
                      <li>• Suitable for professional electrical firms</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Minimum 2 designated members required</li>
                      <li>• Annual confirmation statement to Companies House</li>
                      <li>• LLP agreement defines roles and responsibilities</li>
                      <li>• Members not liable for other members&apos; debts</li>
                      <li>• Must display LLP status on documentation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Members taxed as if self-employed</li>
                      <li>• No corporation tax on LLP profits</li>
                      <li>• Each member pays income tax on their share</li>
                      <li>• Class 2 and 4 National Insurance applicable</li>
                      <li>• Partnership return required annually</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Member satisfaction with profit allocation</li>
                      <li>• Liability protection effectiveness</li>
                      <li>• Administrative costs vs benefits</li>
                      <li>• Professional service delivery standards</li>
                      <li>• Client retention and growth rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="comparison-tool">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-cyan-400" />}>
            Business Structure Comparison
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Comprehensive side-by-side comparison of all business structures to help UK electricians make informed decisions.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Compare liability, tax efficiency, setup costs, and administrative requirements across all structure types for electrical contractors.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Week 1: Current situation analysis</li>
                      <li>• Week 2: 3-5 year business projection</li>
                      <li>• Week 3: Tax calculation comparison</li>
                      <li>• Week 4: Professional consultation if needed</li>
                      <li>• Decision: Choose optimal structure</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Optimal tax efficiency selection</li>
                      <li>• Appropriate liability protection level</li>
                      <li>• Informed decision making</li>
                      <li>• Future-proofed business planning</li>
                      <li>• Professional advisory guidance</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Setup cost comparison (£12 to £500+)</li>
                      <li>• Annual compliance cost analysis</li>
                      <li>• Tax efficiency at different profit levels</li>
                      <li>• Liability protection assessment</li>
                      <li>• Administrative burden evaluation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Sole trader: Simple but higher tax on growth</li>
                      <li>• Limited company: Complex but tax efficient</li>
                      <li>• Partnership: Shared but joint liability</li>
                      <li>• LLP: Protected but professional costs</li>
                      <li>• Consider IR35 implications for contractors</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual tax savings achieved</li>
                      <li>• Compliance burden vs business size</li>
                      <li>• Liability protection adequacy</li>
                      <li>• Structure flexibility for growth</li>
                      <li>• Professional service access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default BusinessStructureTab;