
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FileText, PoundSterling, TrendingUp, AlertTriangle, BookOpen } from "lucide-react";
import BusinessStructureTab from "@/components/electrician/business-development/tax-finances/BusinessStructureTab";
import ExpenseManagementTab from "@/components/electrician/business-development/tax-finances/ExpenseManagementTab";
import CashFlowTab from "@/components/electrician/business-development/tax-finances/CashFlowTab";
import VATComplianceTab from "@/components/electrician/business-development/tax-finances/VATComplianceTab";

const TaxFinances = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Tax & Finances</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm md:text-base leading-relaxed">
          Essential financial management and tax guidance for electrical contractors in the UK
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="structure" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <FileText className="h-4 w-4" />
            <span className="text-center">Structure</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Calculator className="h-4 w-4" />
            <span className="text-center">Expenses</span>
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="text-center">Cash Flow</span>
          </TabsTrigger>
          <TabsTrigger value="vat" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <PoundSterling className="h-4 w-4" />
            <span className="text-center">VAT & HMRC</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="mt-6">
          <BusinessStructureTab />
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <ExpenseManagementTab />
        </TabsContent>

        <TabsContent value="cashflow" className="mt-6">
          <CashFlowTab />
        </TabsContent>

        <TabsContent value="vat" className="mt-6">
          <VATComplianceTab />
        </TabsContent>
      </Tabs>

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
