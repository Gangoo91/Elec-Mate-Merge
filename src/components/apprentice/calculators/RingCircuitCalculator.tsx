import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Calculator, BarChart3, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRingCircuitCalculator } from "./ring-circuit/useRingCircuitCalculator";
import RingCircuitForm from "./ring-circuit/RingCircuitForm";
import RingCircuitResult from "./ring-circuit/RingCircuitResult";
import RingCircuitGuidance from "./ring-circuit/RingCircuitGuidance";

const RingCircuitCalculator = () => {
  const {
    readings,
    cableType,
    cableLength,
    temperature,
    result,
    errors,
    setCableType,
    setCableLength,
    setTemperature,
    handleInputChange,
    calculateValues,
    resetCalculator
  } = useRingCircuitCalculator();

  const [activeTab, setActiveTab] = useState("calculator");
  const isMobile = useIsMobile();

  const tabs = [
    {
      value: "calculator",
      label: "Calculator",
      icon: Calculator,
      content: (
        <RingCircuitForm
          readings={readings}
          cableType={cableType}
          cableLength={cableLength}
          temperature={temperature}
          errors={errors}
          onInputChange={handleInputChange}
          onCableTypeChange={setCableType}
          onCableLengthChange={setCableLength}
          onTemperatureChange={setTemperature}
          onCalculate={calculateValues}
          onReset={resetCalculator}
          hasResults={!!result}
        />
      )
    },
    {
      value: "results",
      label: "Results",
      icon: BarChart3,
      content: result ? (
        <RingCircuitResult result={result} />
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Complete the calculator form to see results</p>
        </div>
      )
    },
    {
      value: "guidance",
      label: "Guidance",
      icon: BookOpen,
      content: <RingCircuitGuidance />
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      {/* Mobile: Dropdown Tabs, Desktop: Regular Tabs */}
      {isMobile ? (
        <DropdownTabs
          tabs={tabs}
          defaultValue="calculator"
          onValueChange={handleTabChange}
          placeholder="Select tab"
          className="w-full"
        />
      ) : (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-elec-dark/50 border border-elec-yellow/20">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default RingCircuitCalculator;