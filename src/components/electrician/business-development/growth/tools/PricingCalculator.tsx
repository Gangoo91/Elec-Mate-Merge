import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, PoundSterling } from "lucide-react";

export const PricingCalculator = () => {
  const [directCosts, setDirectCosts] = useState("");
  const [pricingStrategy, setPricingStrategy] = useState("");
  const [targetMargin, setTargetMargin] = useState("");
  const [marketRate, setMarketRate] = useState("");
  const [result, setResult] = useState<{
    costPlus: number;
    marginBased: number;
    marketBased: number;
    recommended: number;
    strategy: string;
  } | null>(null);

  const calculatePricing = () => {
    const costs = parseFloat(directCosts) || 0;
    const margin = parseFloat(targetMargin) || 20;
    const market = parseFloat(marketRate) || 0;

    // Cost-plus pricing
    const costPlus = costs * (1 + margin / 100);

    // Margin-based pricing
    const marginBased = costs / (1 - margin / 100);

    // Market-based pricing
    const marketBased = market;

    // Determine recommended price and strategy
    let recommended = costPlus;
    let strategy = "Cost-Plus";

    if (pricingStrategy === "value") {
      recommended = Math.max(costPlus, market * 0.9);
      strategy = "Value-Based";
    } else if (pricingStrategy === "competitive") {
      recommended = market * 0.95;
      strategy = "Competitive";
    } else if (pricingStrategy === "premium") {
      recommended = Math.max(costPlus, market * 1.1);
      strategy = "Premium";
    }

    setResult({
      costPlus,
      marginBased,
      marketBased,
      recommended,
      strategy
    });
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Pricing Strategy Calculator
        </CardTitle>
        <CardDescription>
          Compare different pricing strategies to find the optimal price point
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="directCosts">Direct Costs (£)</Label>
              <Input
                id="directCosts"
                type="number"
                placeholder="e.g. 400"
                value={directCosts}
                onChange={(e) => setDirectCosts(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Materials + labour + direct expenses
              </p>
            </div>

            <div>
              <Label htmlFor="targetMargin">Target Margin (%)</Label>
              <Input
                id="targetMargin"
                type="number"
                placeholder="e.g. 25"
                value={targetMargin}
                onChange={(e) => setTargetMargin(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="marketRate">Market Rate (£)</Label>
              <Input
                id="marketRate"
                type="number"
                placeholder="e.g. 550"
                value={marketRate}
                onChange={(e) => setMarketRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                What competitors charge for similar work
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="strategy">Pricing Strategy</Label>
              <Select value={pricingStrategy} onValueChange={setPricingStrategy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="cost-plus">Cost-Plus</SelectItem>
                  <SelectItem value="value">Value-Based</SelectItem>
                  <SelectItem value="competitive">Competitive</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Cost-Plus:</strong> Cost + fixed margin</p>
              <p><strong>Value-Based:</strong> Price based on value delivered</p>
              <p><strong>Competitive:</strong> Match market rates</p>
              <p><strong>Premium:</strong> Higher than market for quality</p>
            </div>

            <Button onClick={calculatePricing} className="w-full">
              Calculate Pricing Options
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <PoundSterling className="h-4 w-4" />
              Pricing Options
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Cost-Plus</div>
                <div className="font-medium">£{result.costPlus.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Margin-Based</div>
                <div className="font-medium">£{result.marginBased.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Market Rate</div>
                <div className="font-medium">£{result.marketBased.toFixed(2)}</div>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded">
                <div className="text-muted-foreground">Recommended</div>
                <div className="font-bold text-lg text-elec-yellow">£{result.recommended.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">{result.strategy}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};