import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, PoundSterling } from "lucide-react";

export const JobCostingCalculator = () => {
  const [materials, setMaterials] = useState("");
  const [labourHours, setLabourHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [overheadPercent, setOverheadPercent] = useState("25");
  const [profitPercent, setProfitPercent] = useState("20");
  const [result, setResult] = useState<{
    materialCost: number;
    labourCost: number;
    overhead: number;
    subtotal: number;
    profit: number;
    totalCost: number;
  } | null>(null);

  const calculateJobCost = () => {
    const materialCost = parseFloat(materials) || 0;
    const labour = (parseFloat(labourHours) || 0) * (parseFloat(hourlyRate) || 0);
    const subtotalBeforeMarkup = materialCost + labour;
    const overhead = subtotalBeforeMarkup * (parseFloat(overheadPercent) / 100);
    const subtotal = subtotalBeforeMarkup + overhead;
    const profit = subtotal * (parseFloat(profitPercent) / 100);
    const total = subtotal + profit;

    setResult({
      materialCost,
      labourCost: labour,
      overhead,
      subtotal,
      profit,
      totalCost: total
    });
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          Job Costing Calculator
        </CardTitle>
        <CardDescription>
          Calculate total job cost including materials, labour, overhead, and profit margins
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="materials">Material Cost (£)</Label>
              <Input
                id="materials"
                type="number"
                placeholder="e.g. 250"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="labourHours">Labour Hours</Label>
              <Input
                id="labourHours"
                type="number"
                placeholder="e.g. 8"
                value={labourHours}
                onChange={(e) => setLabourHours(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="hourlyRate">Hourly Rate (£)</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="e.g. 45"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="overhead">Overhead (%)</Label>
              <Input
                id="overhead"
                type="number"
                placeholder="25"
                value={overheadPercent}
                onChange={(e) => setOverheadPercent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tools, van, insurance, admin costs
              </p>
            </div>

            <div>
              <Label htmlFor="profit">Profit Margin (%)</Label>
              <Input
                id="profit"
                type="number"
                placeholder="20"
                value={profitPercent}
                onChange={(e) => setProfitPercent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Target profit percentage
              </p>
            </div>

            <Button onClick={calculateJobCost} className="w-full">
              Calculate Job Cost
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <PoundSterling className="h-4 w-4" />
              Job Cost Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Materials</div>
                <div className="font-medium">£{result.materialCost.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Labour</div>
                <div className="font-medium">£{result.labourCost.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Overhead</div>
                <div className="font-medium">£{result.overhead.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Subtotal</div>
                <div className="font-medium">£{result.subtotal.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Profit</div>
                <div className="font-medium">£{result.profit.toFixed(2)}</div>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded">
                <div className="text-muted-foreground">Total Quote</div>
                <div className="font-bold text-lg text-elec-yellow">£{result.totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};