import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, PoundSterling } from "lucide-react";

export const MaterialMarkupCalculator = () => {
  const [costPrice, setCostPrice] = useState("");
  const [markupPercent, setMarkupPercent] = useState("");
  const [markupType, setMarkupType] = useState("");
  const [handling, setHandling] = useState("");
  const [result, setResult] = useState<{
    markup: number;
    handlingCost: number;
    sellingPrice: number;
    grossProfit: number;
    marginPercent: number;
  } | null>(null);

  const calculateMarkup = () => {
    const cost = parseFloat(costPrice) || 0;
    const markupPerc = parseFloat(markupPercent) || 0;
    const handlingCost = parseFloat(handling) || 0;

    let markup = 0;
    if (markupType === "percentage") {
      markup = cost * (markupPerc / 100);
    } else if (markupType === "fixed") {
      markup = markupPerc;
    }

    const sellingPrice = cost + markup + handlingCost;
    const grossProfit = markup + handlingCost;
    const marginPercent = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;

    setResult({
      markup,
      handlingCost,
      sellingPrice,
      grossProfit,
      marginPercent
    });
  };

  const getIndustryMarkup = (category: string) => {
    const markups: { [key: string]: string } = {
      "cable": "25-40%",
      "switches": "50-75%",
      "fixtures": "40-60%",
      "panels": "20-35%",
      "conduit": "30-50%",
      "tools": "15-25%"
    };
    return markups[category] || "30-50%";
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-elec-yellow" />
          Material Markup Calculator
        </CardTitle>
        <CardDescription>
          Calculate selling prices with appropriate markup for materials and handling costs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="costPrice">Cost Price (£)</Label>
              <Input
                id="costPrice"
                type="number"
                placeholder="e.g. 50"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="markupType">Markup Type</Label>
              <Select value={markupType} onValueChange={setMarkupType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select markup type" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="markupPercent">
                {markupType === "percentage" ? "Markup %" : "Markup Amount (£)"}
              </Label>
              <Input
                id="markupPercent"
                type="number"
                placeholder={markupType === "percentage" ? "e.g. 40" : "e.g. 20"}
                value={markupPercent}
                onChange={(e) => setMarkupPercent(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="handling">Handling/Storage Cost (£)</Label>
              <Input
                id="handling"
                type="number"
                placeholder="e.g. 5"
                value={handling}
                onChange={(e) => setHandling(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Delivery, storage, admin costs
              </p>
            </div>

            <Button onClick={calculateMarkup} className="w-full">
              Calculate Selling Price
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-3">Industry Standard Markups</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Cable & Wire:</span>
                  <span className="text-elec-yellow">{getIndustryMarkup("cable")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Switches & Sockets:</span>
                  <span className="text-elec-yellow">{getIndustryMarkup("switches")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Light Fixtures:</span>
                  <span className="text-elec-yellow">{getIndustryMarkup("fixtures")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distribution Boards:</span>
                  <span className="text-elec-yellow">{getIndustryMarkup("panels")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conduit & Trunking:</span>
                  <span className="text-elec-yellow">{getIndustryMarkup("conduit")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialist Tools:</span>
                  <span className="text-elec-yellow">{getIndustryMarkup("tools")}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Markup vs Margin</h4>
              <p className="text-sm text-muted-foreground">
                Markup is added to cost price. Margin is profit as % of selling price. 
                Both are important for pricing decisions.
              </p>
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <PoundSterling className="h-4 w-4" />
              Pricing Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Cost Price</div>
                <div className="font-medium">£{parseFloat(costPrice).toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Markup</div>
                <div className="font-medium">£{result.markup.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Handling</div>
                <div className="font-medium">£{result.handlingCost.toFixed(2)}</div>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded">
                <div className="text-muted-foreground">Selling Price</div>
                <div className="font-bold text-lg text-elec-yellow">£{result.sellingPrice.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Gross Profit</div>
                <div className="font-medium">£{result.grossProfit.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">({result.marginPercent.toFixed(1)}% margin)</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-background/50 rounded border border-elec-yellow/10">
              <p className="text-sm text-muted-foreground">
                <strong>Pro Tip:</strong> Consider quantity discounts for bulk purchases and adjust markups accordingly. 
                Higher value items often have lower markup percentages but higher absolute profits.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};