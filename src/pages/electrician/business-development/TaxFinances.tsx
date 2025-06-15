
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FileText, PoundSterling, TrendingUp, AlertTriangle, BookOpen } from "lucide-react";

const TaxFinances = () => {
  const financeTopics = [
    {
      title: "Business Structure & Tax Implications",
      description: "Understanding different business structures (sole trader, limited company, partnership) and their tax implications for electrical contractors.",
      icon: <FileText className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Sole trader vs limited company comparison",
        "Corporation tax vs income tax obligations",
        "National Insurance contributions",
        "VAT registration thresholds and benefits"
      ]
    },
    {
      title: "Expense Management & Deductions",
      description: "Maximising legitimate business expense deductions and maintaining proper records for HMRC compliance.",
      icon: <Calculator className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Allowable business expenses for electricians",
        "Vehicle and travel expense claims",
        "Tools and equipment depreciation",
        "Home office and workspace deductions"
      ]
    },
    {
      title: "Cash Flow Management",
      description: "Essential strategies for maintaining healthy cash flow in your electrical contracting business.",
      icon: <TrendingUp className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Payment terms and invoicing best practices",
        "Managing seasonal fluctuations",
        "Emergency fund planning",
        "Credit facilities and financing options"
      ]
    },
    {
      title: "VAT & HMRC Compliance",
      description: "Understanding VAT obligations, Construction Industry Scheme (CIS), and HMRC compliance requirements.",
      icon: <PoundSterling className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "VAT registration and quarterly returns",
        "Construction Industry Scheme (CIS) deductions",
        "IR35 regulations for contractors",
        "Record keeping requirements"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Tax & Finances</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Essential financial management and tax guidance for electrical contractors in the UK
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <div className="grid gap-6">
        {financeTopics.map((topic, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-elec-yellow/10">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                  <p className="text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {topic.keyPoints.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Important Financial Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The information provided here is for general guidance only and does not constitute professional 
            financial or tax advice. Tax laws and regulations change frequently, and individual circumstances 
            vary significantly. Always consult with a qualified accountant, tax advisor, or financial 
            professional for advice specific to your business situation.
          </p>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recommended Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-500/30">HMRC</Badge>
              <span className="text-sm">Construction Industry Scheme guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-500/30">GOV.UK</Badge>
              <span className="text-sm">Self-employment and business tax information</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-green-500/30">ACCA</Badge>
              <span className="text-sm">Find qualified accountants in your area</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxFinances;
