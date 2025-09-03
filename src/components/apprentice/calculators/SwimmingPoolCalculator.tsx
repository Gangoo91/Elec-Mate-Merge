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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-4">
            <PoolInputs
              inputs={inputs}
              errors={errors}
              onInputChange={handleInputChange}
            />
            
            <div className="flex flex-col gap-3 pt-2">
              <MobileButton 
                onClick={calculateValues}
                variant="elec"
                disabled={!inputs.poolVolume || !inputs.pumpPower}
                icon={<Calculator className="h-4 w-4" />}
                className="w-full h-12 text-base font-medium"
              >
                Calculate Pool Installation
              </MobileButton>
              <MobileButton 
                variant="elec-outline" 
                onClick={resetCalculator}
                className="w-full h-12 flex items-center justify-center gap-2 text-base"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sm:hidden">Reset</span>
                <span className="hidden sm:inline">Reset Calculator</span>
              </MobileButton>
            </div>
          </div>

          <div className="space-y-4 lg:pl-4">
            {result ? (
              <PoolResults result={result} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground min-h-[300px] lg:min-h-[400px] text-center px-4">
                <div className="space-y-2">
                  <Calculator className="h-8 w-8 mx-auto text-elec-yellow/50" />
                  <p className="text-sm lg:text-base">Enter pool details to calculate electrical requirements</p>
                </div>
              </div>
            )}
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
      <CardHeader className="pb-4 px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-lg lg:text-xl">Swimming Pool Electrical Calculator</CardTitle>
        </div>
        <CardDescription className="text-sm lg:text-base">
          Calculate electrical requirements for swimming pools according to BS 7671 Section 702 and safety regulations.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 lg:px-6">
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