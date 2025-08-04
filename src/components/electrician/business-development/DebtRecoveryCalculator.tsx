import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CreditCard, AlertTriangle, Clock, PoundSterling, FileText, RefreshCw, Shield } from "lucide-react";

interface DebtInputs {
  // Outstanding Debts
  totalOutstanding: number;
  numberOfDebtors: number;
  averageDebtAge: number;
  largestSingleDebt: number;
  
  // Recovery Costs
  adminCosts: number;
  legalFees: number;
  collectionAgencyFees: number;
  courtCosts: number;
  
  // Business Impact
  monthlyRevenue: number;
  creditTerms: number;
  badDebtProvision: number;
  
  // Recovery Strategies
  earlySettlementDiscount: number;
  paymentPlanOption: boolean;
  collectionAgencyRate: number;
}

const DebtRecoveryCalculator = () => {
  const [inputs, setInputs] = useState<DebtInputs>({
    totalOutstanding: 25000,
    numberOfDebtors: 8,
    averageDebtAge: 65,
    largestSingleDebt: 8500,
    adminCosts: 150,
    legalFees: 500,
    collectionAgencyFees: 200,
    courtCosts: 300,
    monthlyRevenue: 15000,
    creditTerms: 30,
    badDebtProvision: 2.5,
    earlySettlementDiscount: 10,
    paymentPlanOption: true,
    collectionAgencyRate: 15
  });

  const updateInput = (field: keyof DebtInputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      totalOutstanding: 25000,
      numberOfDebtors: 8,
      averageDebtAge: 65,
      largestSingleDebt: 8500,
      adminCosts: 150,
      legalFees: 500,
      collectionAgencyFees: 200,
      courtCosts: 300,
      monthlyRevenue: 15000,
      creditTerms: 30,
      badDebtProvision: 2.5,
      earlySettlementDiscount: 10,
      paymentPlanOption: true,
      collectionAgencyRate: 15
    });
  };

  // Calculations
  const averageDebtSize = inputs.totalOutstanding / inputs.numberOfDebtors;
  const debtToRevenueRatio = (inputs.totalOutstanding / (inputs.monthlyRevenue * 12)) * 100;
  const totalRecoveryCosts = inputs.adminCosts + inputs.legalFees + inputs.collectionAgencyFees + inputs.courtCosts;
  
  // Recovery scenarios
  const earlySettlementAmount = inputs.totalOutstanding * (1 - inputs.earlySettlementDiscount / 100);
  const collectionAgencyRecovery = inputs.totalOutstanding * (1 - inputs.collectionAgencyRate / 100);
  const expectedRecoveryRate = inputs.averageDebtAge > 90 ? 0.4 : inputs.averageDebtAge > 60 ? 0.6 : 0.8;
  const likelyRecoveryAmount = inputs.totalOutstanding * expectedRecoveryRate;
  
  // Cost-benefit analysis
  const netRecoveryAfterCosts = likelyRecoveryAmount - totalRecoveryCosts;
  const recoveryROI = ((netRecoveryAfterCosts - inputs.totalOutstanding) / inputs.totalOutstanding) * 100;
  
  // Cash flow impact
  const daysInDebt = inputs.averageDebtAge;
  const cashFlowImpact = (inputs.totalOutstanding / inputs.monthlyRevenue) * 30; // Days of revenue tied up
  const annualBadDebtWriteOff = (inputs.monthlyRevenue * 12) * (inputs.badDebtProvision / 100);

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <CreditCard className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl font-bold">Debt Recovery & Non-Payers Calculator</h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Analyse outstanding debts, calculate recovery costs, and develop strategies to minimise bad debt impact on your business.
          </p>
        </div>

        <Tabs defaultValue="debts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray">
            <TabsTrigger value="debts">Outstanding Debts</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Options</TabsTrigger>
            <TabsTrigger value="analysis">Cost Analysis</TabsTrigger>
            <TabsTrigger value="prevention">Prevention Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="debts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    Current Debt Position
                  </CardTitle>
                  <CardDescription>Overview of outstanding customer debts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="totalOutstanding">Total Outstanding Debt (£)</Label>
                    <Input
                      id="totalOutstanding"
                      type="number"
                      value={inputs.totalOutstanding}
                      onChange={(e) => updateInput('totalOutstanding', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="numberOfDebtors">Number of Debtors</Label>
                    <Input
                      id="numberOfDebtors"
                      type="number"
                      value={inputs.numberOfDebtors}
                      onChange={(e) => updateInput('numberOfDebtors', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="averageDebtAge">Average Debt Age (days)</Label>
                    <Input
                      id="averageDebtAge"
                      type="number"
                      value={inputs.averageDebtAge}
                      onChange={(e) => updateInput('averageDebtAge', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="largestSingleDebt">Largest Single Debt (£)</Label>
                    <Input
                      id="largestSingleDebt"
                      type="number"
                      value={inputs.largestSingleDebt}
                      onChange={(e) => updateInput('largestSingleDebt', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                    Business Context
                  </CardTitle>
                  <CardDescription>Your business financial context</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="monthlyRevenue">Monthly Revenue (£)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => updateInput('monthlyRevenue', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="creditTerms">Standard Credit Terms (days)</Label>
                    <Input
                      id="creditTerms"
                      type="number"
                      value={inputs.creditTerms}
                      onChange={(e) => updateInput('creditTerms', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="badDebtProvision">Bad Debt Provision (%)</Label>
                    <Input
                      id="badDebtProvision"
                      type="number"
                      step="0.1"
                      value={inputs.badDebtProvision}
                      onChange={(e) => updateInput('badDebtProvision', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-elec-yellow" />
                    Recovery Costs
                  </CardTitle>
                  <CardDescription>Estimate costs for different recovery methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="adminCosts">Internal Admin Costs (£)</Label>
                    <Input
                      id="adminCosts"
                      type="number"
                      value={inputs.adminCosts}
                      onChange={(e) => updateInput('adminCosts', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="legalFees">Legal Fees (£)</Label>
                    <Input
                      id="legalFees"
                      type="number"
                      value={inputs.legalFees}
                      onChange={(e) => updateInput('legalFees', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="collectionAgencyFees">Collection Agency Fees (£)</Label>
                    <Input
                      id="collectionAgencyFees"
                      type="number"
                      value={inputs.collectionAgencyFees}
                      onChange={(e) => updateInput('collectionAgencyFees', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="courtCosts">Court Costs (£)</Label>
                    <Input
                      id="courtCosts"
                      type="number"
                      value={inputs.courtCosts}
                      onChange={(e) => updateInput('courtCosts', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-elec-yellow" />
                    Recovery Strategies
                  </CardTitle>
                  <CardDescription>Configure your recovery approach</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="earlySettlementDiscount">Early Settlement Discount (%)</Label>
                    <Input
                      id="earlySettlementDiscount"
                      type="number"
                      value={inputs.earlySettlementDiscount}
                      onChange={(e) => updateInput('earlySettlementDiscount', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="collectionAgencyRate">Collection Agency Commission (%)</Label>
                    <Input
                      id="collectionAgencyRate"
                      type="number"
                      value={inputs.collectionAgencyRate}
                      onChange={(e) => updateInput('collectionAgencyRate', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      id="paymentPlanOption"
                      type="checkbox"
                      checked={inputs.paymentPlanOption}
                      onChange={(e) => updateInput('paymentPlanOption', e.target.checked)}
                      className="rounded border-elec-yellow/30"
                    />
                    <Label htmlFor="paymentPlanOption">Offer Payment Plans</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                    Debt Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Debt Size:</span>
                    <span className="font-medium">£{averageDebtSize.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Debt to Revenue Ratio:</span>
                    <span className={`font-medium ${debtToRevenueRatio > 15 ? 'text-red-400' : debtToRevenueRatio > 10 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {debtToRevenueRatio.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cash Flow Impact:</span>
                    <span className="font-medium">{cashFlowImpact.toFixed(0)} days revenue</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expected Recovery Rate:</span>
                    <span className="font-medium">{(expectedRecoveryRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likely Recovery Amount:</span>
                    <span className="font-medium">£{likelyRecoveryAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Recovery Costs:</span>
                    <span className="font-medium">£{totalRecoveryCosts.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Net Recovery:</span>
                    <span className={netRecoveryAfterCosts > 0 ? 'text-green-400' : 'text-red-400'}>
                      £{netRecoveryAfterCosts.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle>Recovery Scenarios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-elec-dark rounded">
                    <div className="font-medium text-blue-400 mb-1">Early Settlement Option</div>
                    <div className="text-sm text-muted-foreground">
                      {inputs.earlySettlementDiscount}% discount offered
                    </div>
                    <div className="font-medium">£{earlySettlementAmount.toFixed(2)}</div>
                  </div>
                  
                  <div className="p-3 bg-elec-dark rounded">
                    <div className="font-medium text-yellow-400 mb-1">Collection Agency</div>
                    <div className="text-sm text-muted-foreground">
                      {inputs.collectionAgencyRate}% commission
                    </div>
                    <div className="font-medium">£{collectionAgencyRecovery.toFixed(2)}</div>
                  </div>
                  
                  <div className="p-3 bg-elec-dark rounded">
                    <div className="font-medium text-green-400 mb-1">Full Legal Action</div>
                    <div className="text-sm text-muted-foreground">
                      Court proceedings + costs
                    </div>
                    <div className="font-medium">£{(likelyRecoveryAmount - totalRecoveryCosts).toFixed(2)}</div>
                  </div>
                  
                  <div className="p-3 bg-elec-dark rounded">
                    <div className="font-medium text-red-400 mb-1">Write-off Provision</div>
                    <div className="text-sm text-muted-foreground">
                      Annual provision based on {inputs.badDebtProvision}%
                    </div>
                    <div className="font-medium">£{annualBadDebtWriteOff.toFixed(2)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prevention" className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  Prevention Strategy & Best Practices
                </CardTitle>
                <CardDescription>Strategies to minimise future bad debt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-3">Credit Control Measures</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Credit checks for new customers</li>
                      <li>• Clear payment terms on invoices</li>
                      <li>• Regular debt aging reports</li>
                      <li>• Automated reminder systems</li>
                      <li>• Retention of title clauses</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-3">Payment Security</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Request deposits on large jobs</li>
                      <li>• Stage payments for major projects</li>
                      <li>• Direct debit arrangements</li>
                      <li>• Personal guarantees where appropriate</li>
                      <li>• Trade credit insurance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-3">Early Warning Signs</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Payments becoming consistently late</li>
                      <li>• Partial payments without explanation</li>
                      <li>• Difficulty contacting customer</li>
                      <li>• Changes in payment method</li>
                      <li>• Complaints about work quality (delaying tactics)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-3">Recovery Actions</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Contact within 7 days of due date</li>
                      <li>• Formal demand after 14 days</li>
                      <li>• Consider early settlement discount</li>
                      <li>• Legal letter before action</li>
                      <li>• Court proceedings if economical</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Calculator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DebtRecoveryCalculator;