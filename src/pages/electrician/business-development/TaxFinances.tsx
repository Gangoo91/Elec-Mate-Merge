
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  FileText, 
  PoundSterling, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  ArrowLeft,
  Target,
  Clock,
  CheckCircle,
  Calendar,
  CreditCard,
  Receipt,
  Building
} from "lucide-react";
import BusinessStructureTab from "@/components/electrician/business-development/tax-finances/BusinessStructureTab";
import ExpenseManagementTab from "@/components/electrician/business-development/tax-finances/ExpenseManagementTab";
import CashFlowTab from "@/components/electrician/business-development/tax-finances/CashFlowTab";
import VATComplianceTab from "@/components/electrician/business-development/tax-finances/VATComplianceTab";

const TaxFinances = () => {
  const isMobile = useIsMobile();

  // Financial metrics for electrical contractors
  const financialMetrics = [
    {
      metric: "Tax Savings",
      data: "£4,500 average annual savings",
      icon: <Target className="h-5 w-5 text-green-400" />,
      detail: "With proper expense management"
    },
    {
      metric: "Cash Flow Impact", 
      data: "30% improvement in stability",
      icon: <TrendingUp className="h-5 w-5 text-elec-yellow" />,
      detail: "Through effective planning"
    },
    {
      metric: "VAT Registration",
      data: "£90,000 annual threshold",
      icon: <CheckCircle className="h-5 w-5 text-blue-400" />,
      detail: "Mandatory registration level"
    },
    {
      metric: "Self Assessment",
      data: "31st January deadline",
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      detail: "Annual tax return due date"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Business Development</span>
          </Button>
        </Link>
      </div>

      <div className="text-center space-y-4 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tax & Financial Management</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Essential financial management and tax guidance for electrical contractors in the UK
        </p>
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-green-500/10 mb-6">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-6 w-6" />
            Why Financial Management Matters for Your Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {financialMetrics.map((metric, index) => (
              <div key={index} className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
                <div className="flex justify-center mb-2">{metric.icon}</div>
                <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-1`}>{metric.data}</div>
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mb-1`}>{metric.metric}</div>
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.detail}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          Effective financial management can save electrical contractors £4,500+ annually and improve cash flow stability by 30%.
        </AlertDescription>
      </Alert>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="structure">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-blue-400" />}>
            Business Structure & Registration
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg">
              <BusinessStructureTab />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="expenses">
          <MobileAccordionTrigger icon={<Receipt className="h-5 w-5 text-green-400" />}>
            Expense Management & Deductions
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg">
              <ExpenseManagementTab />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="cashflow">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-purple-400" />}>
            Cash Flow Management
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg">
              <CashFlowTab />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="vat">
          <MobileAccordionTrigger icon={<PoundSterling className="h-5 w-5 text-orange-400" />}>
            VAT & HMRC Compliance
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg">
              <VATComplianceTab />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="planning">
          <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-amber-400" />}>
            Tax Planning & Deadlines
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-amber-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Key Tax Dates 2024/25</h4>
                  <ul className="space-y-2">
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-2`}>
                      <Clock className="h-3 w-3 text-amber-400 flex-shrink-0" />
                      31st January 2025 - Self Assessment deadline
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-2`}>
                      <Clock className="h-3 w-3 text-amber-400 flex-shrink-0" />
                      6th April 2025 - Tax year end
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-2`}>
                      <Clock className="h-3 w-3 text-amber-400 flex-shrink-0" />
                      5th October 2025 - Registration deadline for new self-employed
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-amber-200 flex items-center gap-2`}>
                      <Clock className="h-3 w-3 text-amber-400 flex-shrink-0" />
                      Quarterly VAT returns (if registered)
                    </li>
                  </ul>
                </div>
                
                <div className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Tax Planning Strategies</h4>
                  <ul className="space-y-2">
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Maximise annual allowance (£12,570 for 2024/25)
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Plan equipment purchases for tax relief
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Consider pension contributions
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      Track business mileage and expenses
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="templates">
          <MobileAccordionTrigger icon={<FileText className="h-5 w-5 text-cyan-400" />}>
            Financial Templates & Tools
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-cyan-500/30 text-left h-auto p-3"
                >
                  <Calculator className="h-4 w-4 mr-3 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-medium`}>Expense Tracking Spreadsheet</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-cyan-200`}>Track business expenses by category</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-green-500/30 text-left h-auto p-3"
                >
                  <FileText className="h-4 w-4 mr-3 text-green-400 flex-shrink-0" />
                  <div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-medium`}>Invoice Template</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200`}>Professional invoice format for electrical work</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-purple-500/30 text-left h-auto p-3"
                >
                  <TrendingUp className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  <div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-medium`}>Cash Flow Planner</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>Monthly cash flow forecasting tool</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start border-orange-500/30 text-left h-auto p-3"
                >
                  <PoundSterling className="h-4 w-4 mr-3 text-orange-400 flex-shrink-0" />
                  <div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-medium`}>VAT Return Calculator</div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>Quarterly VAT calculation helper</div>
                  </div>
                </Button>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2 text-lg md:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Important Financial Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            The information provided here is for general guidance only and does not constitute professional 
            financial or tax advice. Tax laws and regulations change frequently, and individual circumstances 
            vary significantly. Always consult with a qualified accountant, tax advisor, or financial 
            professional for advice specific to your business situation.
          </p>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg md:text-xl">
            <BookOpen className="h-5 w-5" />
            Recommended Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-start md:items-center gap-2">
              <Badge variant="outline" className="border-green-500/30 shrink-0">HMRC</Badge>
              <span className="text-sm leading-relaxed">Construction Industry Scheme guidance</span>
            </div>
            <div className="flex items-start md:items-center gap-2">
              <Badge variant="outline" className="border-green-500/30 shrink-0">GOV.UK</Badge>
              <span className="text-sm leading-relaxed">Self-employment and business tax information</span>
            </div>
            <div className="flex items-start md:items-center gap-2">
              <Badge variant="outline" className="border-green-500/30 shrink-0">ACCA</Badge>
              <span className="text-sm leading-relaxed">Find qualified accountants in your area</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxFinances;
