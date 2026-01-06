import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Calculator, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRingCircuitCalculator } from "./ring-circuit/useRingCircuitCalculator";
import RingCircuitForm from "./ring-circuit/RingCircuitForm";
import RingCircuitResult from "./ring-circuit/RingCircuitResult";
import RingCircuitGuidance from "./ring-circuit/RingCircuitGuidance";
import { CALCULATOR_CONFIG } from "@/components/calculators/shared";

const RingCircuitCalculator = () => {
  const config = CALCULATOR_CONFIG['testing'];

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
    <div className="space-y-4">
      {/* Calculator Card Header */}
      <div
        className="rounded-2xl border p-4 sm:p-6"
        style={{
          borderColor: `${config.gradientFrom}20`,
          background: `linear-gradient(135deg, ${config.gradientFrom}08, ${config.gradientTo}05)`
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${config.gradientFrom}15` }}
          >
            <Calculator className="h-5 w-5" style={{ color: config.gradientFrom }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Ring Circuit Calculator</h2>
            <p className="text-sm text-white/60">Test and verify ring final circuit continuity per BS 7671</p>
          </div>
        </div>
      </div>

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
          <TabsList className="grid w-full grid-cols-2 h-12 bg-white/5 rounded-xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default RingCircuitCalculator;
