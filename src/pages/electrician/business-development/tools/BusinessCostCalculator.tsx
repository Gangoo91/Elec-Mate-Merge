import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Building, Download, Lightbulb, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet";
import WhyThisMatters from "@/components/common/WhyThisMatters";

// Enhanced components
import BusinessTypeSelector from "@/components/business-calculator/BusinessTypeSelector";
import InteractiveInputs from "@/components/business-calculator/InteractiveInputs";
import BusinessAnalytics from "@/components/business-calculator/BusinessAnalytics";
import ScenarioComparison from "@/components/business-calculator/ScenarioComparison";
import ProgressIndicator from "@/components/business-calculator/ProgressIndicator";
import MobileOptimizedLayout from "@/components/business-calculator/MobileOptimizedLayout";

interface StartupInputs extends Record<string, number> {
  tools: number;
  testEquipment: number;
  vehicle: number;
  insurance: number;
  qualifications: number;
  marketing: number;
  workingCapital: number;
}

interface MonthlyInputs extends Record<string, number> {
  insurance: number;
  fuel: number;
  toolMaintenance: number;
  marketing: number;
  phoneInternet: number;
  accountancy: number;
  rent: number;
  utilities: number;
}

const BusinessCostCalculator = () => {
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState("sole-trader");
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  
  const [startupInputs, setStartupInputs] = useState<StartupInputs>({
    tools: 0,
    testEquipment: 0,
    vehicle: 0,
    insurance: 0,
    qualifications: 0,
    marketing: 0,
    workingCapital: 0,
  });

  const [monthlyInputs, setMonthlyInputs] = useState<MonthlyInputs>({
    insurance: 0,
    fuel: 0,
    toolMaintenance: 0,
    marketing: 0,
    phoneInternet: 0,
    accountancy: 0,
    rent: 0,
    utilities: 0,
  });

  const [calculated, setCalculated] = useState(false);

  const STORAGE_KEY = "business_cost_scenarios";

  useEffect(() => {
    document.documentElement.style.setProperty("--dropdown-z", "9999");
  }, []);

  const stepLabels = ["Business Type", "Startup Costs", "Monthly Costs", "Analysis"];
  const completedSteps = [
    businessType !== "",
    Object.values(startupInputs).some(v => v > 0),
    Object.values(monthlyInputs).some(v => v > 0),
    calculated
  ];

  const updateStartupInput = (field: string, value: number) => {
    setStartupInputs(prev => ({ ...prev, [field]: value }));
    setCalculated(false);
  };

  const updateMonthlyInput = (field: string, value: number) => {
    setMonthlyInputs(prev => ({ ...prev, [field]: value }));
    setCalculated(false);
  };

  const calculateCosts = () => {
    setCalculated(true);
    setCurrentStep(3);

    // Save scenario locally
    const payload = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      businessType,
      startupInputs,
      monthlyInputs,
      totals: { totalStartup, totalMonthly, yearOneTotal },
    };
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing].slice(0, 20)));

    toast({
      title: "Calculation Complete",
      description: "Your enhanced business analysis is ready!",
      variant: "success"
    });
  };
  // Calculate totals
  const totalStartup = Object.values(startupInputs).reduce((sum, value) => sum + value, 0);
  const totalMonthly = Object.values(monthlyInputs).reduce((sum, value) => sum + value, 0);
  const yearOneTotal = totalStartup + (totalMonthly * 12);

  const currentScenario = {
    businessType,
    totalStartup,
    totalMonthly,
    yearOneTotal
  };

  const sections = [
    {
      id: "business-type",
      title: "Choose Business Structure",
      icon: <Building className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <BusinessTypeSelector
            selectedType={businessType}
            onTypeChange={setBusinessType}
          />
          <div className="text-center">
            <Button 
              onClick={() => setCurrentSection(1)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Continue to Costs
            </Button>
          </div>
        </div>
      ),
      isRequired: true
    },
    {
      id: "inputs",
      title: "Cost Planning",
      icon: <Calculator className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <InteractiveInputs
            startupInputs={startupInputs}
            monthlyInputs={monthlyInputs}
            businessType={businessType}
            onStartupChange={updateStartupInput}
            onMonthlyChange={updateMonthlyInput}
          />
          <div className="text-center space-x-4">
            <Button 
              onClick={calculateCosts}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              disabled={totalStartup === 0 && totalMonthly === 0}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Generate Analysis
            </Button>
          </div>
        </div>
      ),
      isRequired: true
    },
    {
      id: "analytics",
      title: "Business Analytics",
      icon: <TrendingUp className="h-5 w-5" />,
      content: (
        <BusinessAnalytics
          startupInputs={startupInputs}
          monthlyInputs={monthlyInputs}
          businessType={businessType}
          calculated={calculated}
        />
      )
    },
    {
      id: "scenarios",
      title: "Scenario Comparison",
      icon: <Lightbulb className="h-5 w-5" />,
      content: (
        <ScenarioComparison
          currentScenario={currentScenario}
        />
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Building className="h-8 w-8 text-elec-yellow" />
          Enhanced Business Cost Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Plan your electrical contracting business with intelligent cost analysis, 
          interactive tools, and comprehensive scenario planning.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <WhyThisMatters
        points={[
          "Clarifies true start-up and monthly running costs to set realistic budgets.",
          "Reveals Year‑1 cash needs and working capital so you don’t run short.",
          "Highlights structure impacts (sole trader vs ltd) on costs and planning."
        ]}
      />

      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={4}
        stepLabels={stepLabels}
        completedSteps={completedSteps}
      />

      <MobileOptimizedLayout
        sections={sections}
        currentSectionIndex={currentSection}
        onSectionChange={setCurrentSection}
      />

      {calculated && (
        <Card className="border-elec-yellow/20 bg-elec-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-elec-yellow" />
              Export & Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="outline"
                className="border border-muted/40 hover:bg-muted/50"
                onClick={() => toast({ title: "Export Feature", description: "PDF export coming soon!" })}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Business Plan
              </Button>
              <Badge variant="secondary" className="px-4 py-2">
                Analysis Complete
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessCostCalculator;