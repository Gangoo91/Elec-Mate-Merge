
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
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Tax & Finances</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Essential financial management and tax guidance for electrical contractors in the UK
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Structure
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Cash Flow
          </TabsTrigger>
          <TabsTrigger value="vat" className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            VAT & HMRC
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure">
          <BusinessStructureTab />
        </TabsContent>

        <TabsContent value="expenses">
          <ExpenseManagementTab />
        </TabsContent>

        <TabsContent value="cashflow">
          <CashFlowTab />
        </TabsContent>

        <TabsContent value="vat">
          <VATComplianceTab />
        </TabsContent>
      </Tabs>

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
