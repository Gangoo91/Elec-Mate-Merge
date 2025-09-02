import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Calculator, RotateCcw, Waves } from "lucide-react";
import { useSwimmingPoolCalculator } from "@/hooks/useSwimmingPoolCalculator";
import PoolInputs from "./swimming-pool/PoolInputs";
import PoolResults from "./swimming-pool/PoolResults";
import PoolGuidance from "./swimming-pool/PoolGuidance";
import { useState } from "react";

const SwimmingPoolCalculator = () => {
  const [activeTab, setActiveTab] = useState("calculator");
  const {
    inputs,
    result,
    errors,
    handleInputChange,
    calculateValues,
    resetCalculator,
    isValid
  } = useSwimmingPoolCalculator();

  const tabs = [
    {
      id: "calculator",
      value: "calculator",
      label: "Calculator",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <PoolInputs
              inputs={inputs}
              errors={errors}
              onInputChange={handleInputChange}
            />
            
            <div className="flex gap-2">
              <MobileButton 
                onClick={calculateValues}
                variant="elec"
                disabled={!inputs.poolVolume || !inputs.pumpPower}
                icon={<Calculator className="h-4 w-4" />}
                className="flex-1"
              >
                Calculate Pool Installation
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={resetCalculator}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md bg-elec-gray p-6 min-h-[600px]">
              {result ? (
                <PoolResults result={result} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter pool details to calculate electrical requirements
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "guidance",
      value: "guidance",
      label: "Guidance & Regulations",
      content: <PoolGuidance result={result} />
    }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Swimming Pool Electrical Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate electrical requirements for swimming pools according to BS 7671 Section 702 and safety regulations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <DropdownTabs
            tabs={tabs}
            placeholder="Select Calculator Section"
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="guidance">Guidance & Regulations</TabsTrigger>
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default SwimmingPoolCalculator;