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
    },
    {
      metric: "VAT Registration",
      data: "£90,000 threshold",
      icon: <FileCheck className="h-5 w-5 text-yellow-400" />,
      detail: "Annual turnover limit before mandatory VAT registration"
    },
    {
      metric: "Administrative Burden",
      data: "Limited company requires more",
      icon: <FileText className="h-5 w-5 text-red-400" />,
      detail: "Annual accounts, CT600, Companies House filing"
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

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3 xl:grid-cols-6'}`}>
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
                The simplest business structure for individual electricians - easy to set up with complete control over business decisions.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-2">Strategy Overview</h4>
                    <p className="text-sm">Ideal for new electricians with straightforward business needs and annual profits under £50,000.</p>
                  </div>
                  
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-2">Implementation Timeline</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Day 1: Register for Self Assessment</li>
                      <li>• Week 1: Set up business bank account</li>
                      <li>• Week 2: Arrange business insurance</li>
                      <li>• Ongoing: Keep records for tax returns</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                    <h4 className="font-semibold text-orange-400 mb-2">Business Benefits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Quick and easy setup</li>
                      <li>• Complete business control</li>
                      <li>• All profits belong to you</li>
                      <li>• Simple tax obligations</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-2">Key Features & Requirements</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Self Assessment tax returns</li>
                      <li>• National Insurance contributions</li>
                      <li>• Personal liability for debts</li>
                      <li>• Simple accounting requirements</li>
                      <li>• No Companies House registration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                    <h4 className="font-semibold text-yellow-400 mb-2">Tax Considerations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Income tax: 20%, 40%, or 45%</li>
                      <li>• Class 2 NI: £3.45/week if profits &gt;£6,515</li>
                      <li>• Class 4 NI: 9% on profits £12,570-£50,270</li>
                      <li>• Personal allowance: £12,570</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <h4 className="font-semibold text-red-400 mb-2">Success Metrics/KPIs</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Annual profit threshold: Under £50k</li>
                      <li>• Tax efficiency: Monitor vs limited company</li>
                      <li>• Personal liability exposure</li>
                      <li>• Administrative time: &lt;2 hours/month</li>
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
      </MobileAccordion>
    </div>
  );
};

export default BusinessStructureTab;