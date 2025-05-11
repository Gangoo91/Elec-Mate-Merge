
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign, Calculator, Percent, LineChart, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState("profitCalculator");

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality will be available soon.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Tools</h1>
          <p className="text-muted-foreground">
            Calculate profit margins and manage financial aspects.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="profitCalculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" /> Profit Calculator
          </TabsTrigger>
          <TabsTrigger value="marginAnalyzer" className="flex items-center gap-2">
            <Percent className="h-4 w-4" /> Margin Analyzer
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Cash Flow
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" /> Forecasting
          </TabsTrigger>
          <TabsTrigger value="invoicing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Invoicing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profitCalculator" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Job Profit Calculator</CardTitle>
                <CardDescription>Calculate profit margin for electrical jobs.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Calculate Profit")}
                >
                  Open Calculator
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Material Cost Analysis</CardTitle>
                <CardDescription>Analyse material costs and markup.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Material Cost Analysis")}
                >
                  Analyse Costs
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Labour Pricing Tool</CardTitle>
                <CardDescription>Calculate labour costs and rates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Calculate Labour Rates")}
                >
                  Calculate Rates
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marginAnalyzer" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Profit Margin Analysis</CardTitle>
              <CardDescription>Analyze profit margins across different job types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Analyze Margins")}
                >
                  Analyze Margins
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Cash Flow Tracker</CardTitle>
              <CardDescription>Track business cash flow and forecast future funds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Track Cash Flow")}
                >
                  View Cash Flow
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Financial Forecasting</CardTitle>
              <CardDescription>Project future revenue and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Create Forecast")}
                >
                  Create Forecast
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoicing" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Invoice Generator</CardTitle>
              <CardDescription>Create professional invoices for clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Create Invoice")}
                >
                  Create Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialTools;
