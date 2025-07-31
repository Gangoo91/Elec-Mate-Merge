
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download, RefreshCw } from "lucide-react";

const BusinessCostCalculator = () => {
  const [inputs, setInputs] = useState({
    toolsCost: 3500,
    vehicleCost: 12000,
    insurance: 1500,
    certifications: 800,
    marketing: 1000,
    workingCapital: 7500,
    officeSetup: 2000,
    accountingSoftware: 300,
    websiteCost: 1500,
    initialStock: 2500
  });

  const [monthlyInputs, setMonthlyInputs] = useState({
    rent: 800,
    fuel: 400,
    phoneInternet: 100,
    accounting: 150,
    subscriptions: 200,
    maintenance: 300
  });

  const updateInput = (field: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const updateMonthlyInput = (field: string, value: string) => {
    setMonthlyInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const totalStartupCosts = Object.values(inputs).reduce((sum, cost) => sum + cost, 0);
  const totalMonthlyCosts = Object.values(monthlyInputs).reduce((sum, cost) => sum + cost, 0);
  const yearOneTotal = totalStartupCosts + (totalMonthlyCosts * 12);

  const resetCalculator = () => {
    setInputs({
      toolsCost: 3500,
      vehicleCost: 12000,
      insurance: 1500,
      certifications: 800,
      marketing: 1000,
      workingCapital: 7500,
      officeSetup: 2000,
      accountingSoftware: 300,
      websiteCost: 1500,
      initialStock: 2500
    });
    setMonthlyInputs({
      rent: 800,
      fuel: 400,
      phoneInternet: 100,
      accounting: 150,
      subscriptions: 200,
      maintenance: 300
    });
  };

  return (
    <Card className="border-blue-500/50 bg-blue-500/10">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Interactive Business Cost Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-200">Initial Startup Costs</h4>
            {Object.entries({
              toolsCost: "Professional Tools & Equipment",
              vehicleCost: "Van & Vehicle Setup",
              insurance: "Annual Insurance",
              certifications: "Certifications & Registrations",
              marketing: "Initial Marketing & Branding",
              workingCapital: "Working Capital",
              officeSetup: "Office/Workshop Setup",
              accountingSoftware: "Accounting Software",
              websiteCost: "Website Development",
              initialStock: "Initial Stock & Materials"
            }).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label className="text-blue-200">{label}</Label>
                <Input
                  type="number"
                  value={inputs[key as keyof typeof inputs]}
                  onChange={(e) => updateInput(key, e.target.value)}
                  className="bg-blue-500/20 border-blue-400/30"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-blue-200">Monthly Running Costs</h4>
            {Object.entries({
              rent: "Office/Workshop Rent",
              fuel: "Vehicle Fuel",
              phoneInternet: "Phone & Internet",
              accounting: "Accountancy Fees",
              subscriptions: "Software Subscriptions",
              maintenance: "Vehicle & Equipment Maintenance"
            }).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label className="text-blue-200">{label}</Label>
                <Input
                  type="number"
                  value={monthlyInputs[key as keyof typeof monthlyInputs]}
                  onChange={(e) => updateMonthlyInput(key, e.target.value)}
                  className="bg-blue-500/20 border-blue-400/30"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-blue-500/20 pt-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-200">Initial Startup</h4>
              <p className="text-2xl font-bold text-blue-100">£{totalStartupCosts.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-200">Monthly Running</h4>
              <p className="text-2xl font-bold text-blue-100">£{totalMonthlyCosts.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="font-semibold text-green-200">Year One Total</h4>
              <p className="text-2xl font-bold text-green-100">£{yearOneTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={resetCalculator} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset Calculator
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCostCalculator;
