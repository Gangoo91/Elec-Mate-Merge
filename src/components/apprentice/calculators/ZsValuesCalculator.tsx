
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { zsValues } from "./zs-values/ZsValuesData";
import ZsCalculatorForm from "./zs-values/ZsCalculatorForm";
import ZsCalculatorResult from "./zs-values/ZsCalculatorResult";
import ZsCalculatorInfo from "./zs-values/ZsCalculatorInfo";

const ZsValuesCalculator = () => {
  const [mcbRating, setMcbRating] = useState("");
  const [rcboRating, setRcboRating] = useState("");
  const [fusRating, setFusRating] = useState("");
  const [fuseType, setFuseType] = useState("");
  const [protectionType, setProtectionType] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateZs = () => {
    let rating: number;
    let deviceType: keyof typeof zsValues;

    if (protectionType === "mcb") {
      rating = parseInt(mcbRating);
      deviceType = "mcb";
    } else if (protectionType === "rcbo") {
      rating = parseInt(rcboRating);
      deviceType = "rcbo";
    } else if (protectionType === "fuse") {
      rating = parseInt(fusRating);
      deviceType = fuseType as keyof typeof zsValues;
    } else {
      return;
    }

    const maxZs = zsValues[deviceType][rating as keyof typeof zsValues[typeof deviceType]];
    setResult(maxZs || null);
  };

  const resetCalculator = () => {
    setMcbRating("");
    setRcboRating("");
    setFusRating("");
    setFuseType("");
    setProtectionType("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Maximum Zs Values Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ZsCalculatorForm
            mcbRating={mcbRating}
            setMcbRating={setMcbRating}
            rcboRating={rcboRating}
            setRcboRating={setRcboRating}
            fusRating={fusRating}
            setFusRating={setFusRating}
            fuseType={fuseType}
            setFuseType={setFuseType}
            protectionType={protectionType}
            setProtectionType={setProtectionType}
            onCalculate={calculateZs}
            onReset={resetCalculator}
          />

          <ZsCalculatorResult
            result={result}
            protectionType={protectionType}
            mcbRating={mcbRating}
            rcboRating={rcboRating}
            fusRating={fusRating}
            fuseType={fuseType}
          />
        </div>

        <ZsCalculatorInfo />
      </CardContent>
    </Card>
  );
};

export default ZsValuesCalculator;
