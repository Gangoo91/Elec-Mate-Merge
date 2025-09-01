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
        <div className="space-y-6">
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
          {result && (
            <div id="calculator-results">
              <RingCircuitResult result={result} />
            </div>
          )}
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
          <TabsList className="grid w-full grid-cols-2 bg-elec-dark/50 border border-elec-yellow/20">
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