
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BookOpen, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [mcbCurve, setMcbCurve] = useState("");
  const [rcboCurve, setRcboCurve] = useState("");
  const [ze, setZe] = useState<string>("");
  const [r1r2, setR1R2] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculatedZs = ze && r1r2 ? parseFloat(ze) + parseFloat(r1r2) : null;

  const calculateZs = () => {
    let rating: number;
    let deviceType: keyof typeof zsValues;
    let curveType: string | undefined;

    if (protectionType === "mcb") {
      rating = parseInt(mcbRating);
      deviceType = "mcb";
      curveType = mcbCurve;
    } else if (protectionType === "rcbo") {
      rating = parseInt(rcboRating);
      deviceType = "rcbo";
      curveType = rcboCurve;
    } else if (protectionType === "fuse") {
      rating = parseInt(fusRating);
      deviceType = fuseType as keyof typeof zsValues;
    } else {
      return;
    }

    let maxZs: number | undefined;

    if ((deviceType === "mcb" || deviceType === "rcbo") && curveType) {
      const deviceData = zsValues[deviceType] as any;
      const curveData = deviceData[curveType];
      maxZs = curveData?.[rating as keyof typeof curveData];
    } else {
      const deviceData = zsValues[deviceType] as any;
      maxZs = deviceData?.[rating as keyof typeof deviceData];
    }

    setResult(maxZs || null);
  };

const resetCalculator = () => {
    setMcbRating("");
    setRcboRating("");
    setFusRating("");
    setFuseType("");
    setProtectionType("");
    setMcbCurve("");
    setRcboCurve("");
    setZe("");
    setR1R2("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Maximum Zs Values Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate maximum earth fault loop impedance values according to BS 7671
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="guidance" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guidance
            </TabsTrigger>
            <TabsTrigger value="standards" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Standards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                mcbCurve={mcbCurve}
                setMcbCurve={setMcbCurve}
                rcboCurve={rcboCurve}
                setRcboCurve={setRcboCurve}
                ze={ze}
                setZe={setZe}
                r1r2={r1r2}
                setR1R2={setR1R2}
                onCalculate={calculateZs}
                onReset={resetCalculator}
              />
              
              <ZsCalculatorResult
                result={result}
                calculatedZs={calculatedZs}
                protectionType={protectionType}
                mcbRating={mcbRating}
                rcboRating={rcboRating}
                fusRating={fusRating}
                fuseType={fuseType}
                mcbCurve={mcbCurve}
                rcboCurve={rcboCurve}
              />
            </div>
          </TabsContent>

          <TabsContent value="guidance">
            <ZsCalculatorInfo />
          </TabsContent>

          <TabsContent value="standards">
            <div className="space-y-4">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg">BS 7671 Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-blue-200">
                    <h4 className="font-medium mb-2">Regulation 411.4.5</h4>
                    <p className="text-blue-200/80 mb-3">
                      The earth fault loop impedance (Zs) at every point of utilisation shall not exceed the values given in Tables 41.2, 41.3 and 41.4.
                    </p>
                    
                    <h4 className="font-medium mb-2">Table 41.3 Application</h4>
                    <ul className="space-y-1 text-blue-200/80">
                      <li>• Maximum Zs values for final circuits not exceeding 32A</li>
                      <li>• Values applicable at normal operating temperature (70°C for PVC cables)</li>
                      <li>• Assumes disconnection within 0.4s for final circuits ≤32A</li>
                      <li>• Values based on 0.8 × Uo for calculation of fault current</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300 text-lg">Temperature Considerations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-amber-200">
                    <p className="mb-3">
                      The tabulated Zs values in BS 7671 assume conductors are at their normal operating temperature. 
                      During testing, conductors are typically at ambient temperature, so their resistance is lower.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Why Use 80% Values?</h4>
                      <ul className="space-y-1 text-amber-200/80">
                        <li>• Conductors heat up during normal operation</li>
                        <li>• Resistance increases with temperature</li>
                        <li>• Testing at 80% provides safety margin</li>
                        <li>• Ensures compliance under all operating conditions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ZsValuesCalculator;
