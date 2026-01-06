import { useState } from "react";
import { Search, BookOpen, FileText, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  zsValues,
  zsValues5s,
  curveTypes,
  fuseTypes,
  rcdZsValues,
  disconnectionTimes,
  getTableReference,
  get80PercentZs
} from "./zs-values/ZsValuesData";
import ZsLookupResult from "./zs-lookup/ZsLookupResult";
import ZsLookupGuidance from "./zs-lookup/ZsLookupGuidance";
import ZsLookupStandards from "./zs-lookup/ZsLookupStandards";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const BS7671ZsLookupCalculator = () => {
  const config = CALCULATOR_CONFIG['testing'];
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState("results");
  const [searchType, setSearchType] = useState("device");
  const [deviceType, setDeviceType] = useState("");
  const [deviceRating, setDeviceRating] = useState("");
  const [curve, setCurve] = useState("");
  const [measuredZs, setMeasuredZs] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [complianceCheck, setComplianceCheck] = useState<any>(null);
  const [quickDevice, setQuickDevice] = useState("");
  const [disconnectionTime, setDisconnectionTime] = useState<"0.4" | "5">("0.4");

  const getZsData = () => {
    return disconnectionTime === "0.4" ? zsValues : zsValues5s;
  };

  const performLookup = () => {
    if (searchType === "device" && deviceType) {
      const data = getZsData();
      const deviceResults: any[] = [];
      const tableRef = getTableReference(deviceType, disconnectionTime);

      if (deviceType === "rcd") {
        // RCD values from Table 41.5
        for (const [rating, maxZs] of Object.entries(rcdZsValues)) {
          deviceResults.push({
            device: "RCD",
            curve: "N/A",
            rating: `${rating}mA`,
            maxZs: `${maxZs}Ω`,
            testZs: `${get80PercentZs(maxZs)}Ω`,
            tableRef: "Table 41.5"
          });
        }
      } else if (deviceType === "mcb" || deviceType === "rcbo") {
        const deviceData = data[deviceType as keyof typeof data];
        if (deviceData) {
          for (const [curveKey, curveLabel] of Object.entries(curveTypes)) {
            const curveData = deviceData[curveKey as keyof typeof deviceData] as any;
            if (curveData) {
              for (const [rating, maxZs] of Object.entries(curveData)) {
                deviceResults.push({
                  device: deviceType.toUpperCase(),
                  curve: curveLabel,
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`,
                  testZs: `${get80PercentZs(maxZs as number)}Ω`,
                  tableRef
                });
              }
            }
          }
        }
      } else {
        // Fuse types
        const fuseData = data[deviceType as keyof typeof data];
        if (fuseData && typeof fuseData === 'object') {
          for (const [rating, maxZs] of Object.entries(fuseData)) {
            deviceResults.push({
              device: fuseTypes[deviceType as keyof typeof fuseTypes] || deviceType.toUpperCase(),
              curve: "N/A",
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              testZs: `${get80PercentZs(maxZs as number)}Ω`,
              tableRef
            });
          }
        }
      }

      setResults(deviceResults);
    } else if (searchType === "compliance" && measuredZs) {
      checkCompliance();
    }
  };

  const checkCompliance = () => {
    const zsValue = parseFloat(measuredZs);
    if (isNaN(zsValue)) return;

    const compliantDevices: any[] = [];
    const data = getZsData();
    const tableRef = disconnectionTime === "0.4" ? "Table 41.3/41.2" : "Table 41.3/41.4";

    // Check MCBs and RCBOs
    for (const deviceKey of ["mcb", "rcbo"]) {
      const deviceData = data[deviceKey as keyof typeof data];
      if (deviceData && typeof deviceData === 'object') {
        for (const [curveKey, curveData] of Object.entries(deviceData)) {
          if (typeof curveData === 'object') {
            for (const [rating, maxZs] of Object.entries(curveData as any)) {
              const testZs = get80PercentZs(maxZs as number);
              if (zsValue <= testZs) {
                compliantDevices.push({
                  device: deviceKey.toUpperCase(),
                  curve: curveTypes[curveKey as keyof typeof curveTypes],
                  rating: `${rating}A`,
                  maxZs: `${maxZs}Ω`,
                  testZs: `${testZs}Ω`,
                  margin: `${(testZs - zsValue).toFixed(3)}Ω`,
                  tableRef
                });
              }
            }
          }
        }
      }
    }

    // Check fuses
    for (const [fuseKey, fuseName] of Object.entries(fuseTypes)) {
      const fuseData = data[fuseKey as keyof typeof data];
      if (fuseData && typeof fuseData === 'object') {
        for (const [rating, maxZs] of Object.entries(fuseData)) {
          const testZs = get80PercentZs(maxZs as number);
          if (zsValue <= testZs) {
            compliantDevices.push({
              device: fuseName,
              curve: "N/A",
              rating: `${rating}A`,
              maxZs: `${maxZs}Ω`,
              testZs: `${testZs}Ω`,
              margin: `${(testZs - zsValue).toFixed(3)}Ω`,
              tableRef: disconnectionTime === "0.4" ? "Table 41.2" : "Table 41.4"
            });
          }
        }
      }
    }

    // Check RCDs (Table 41.5)
    for (const [rating, maxZs] of Object.entries(rcdZsValues)) {
      const testZs = get80PercentZs(maxZs);
      if (zsValue <= testZs) {
        compliantDevices.push({
          device: "RCD",
          curve: "N/A",
          rating: `${rating}mA`,
          maxZs: `${maxZs}Ω`,
          testZs: `${testZs}Ω`,
          margin: `${(testZs - zsValue).toFixed(3)}Ω`,
          tableRef: "Table 41.5"
        });
      }
    }

    setComplianceCheck({
      measuredZs: zsValue,
      compliantDevices: compliantDevices.sort((a, b) => parseFloat(a.margin) - parseFloat(b.margin))
    });
  };

  const handleQuickDevice = (value: string) => {
    setQuickDevice(value);
    // Parse common formats like "B32", "C16", "D40"
    const match = value.match(/^([BCD])(\d+)$/i);
    if (match) {
      const [, curveChar, rating] = match;
      setDeviceType("mcb");
      setCurve(`type-${curveChar.toLowerCase()}`);
      setDeviceRating(rating);
    }
  };

  const resetCalculator = () => {
    setSearchType("device");
    setDeviceType("");
    setDeviceRating("");
    setCurve("");
    setMeasuredZs("");
    setResults([]);
    setComplianceCheck(null);
    setQuickDevice("");
    setDisconnectionTime("0.4");
  };

  const hasValidInputs = () => {
    if (searchType === "device") {
      return !!deviceType;
    }
    return !!measuredZs;
  };

  // Build device type options
  const deviceTypeOptions = [
    { value: "mcb", label: "MCB (Table 41.3)" },
    { value: "rcbo", label: "RCBO (Table 41.3)" },
    { value: "rcd", label: "RCD (Table 41.5)" },
    ...Object.entries(fuseTypes).map(([key, label]) => ({
      value: key,
      label
    }))
  ];

  const tabs = [
    {
      value: "results",
      label: "Results",
      icon: Search,
      content: (
        <div className="space-y-4">
          {/* Search Configuration */}
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Search Type"
              value={searchType}
              onChange={setSearchType}
              options={[
                { value: "device", label: "Lookup by Device Type" },
                { value: "compliance", label: "Check Compliance (80% rule)" },
              ]}
            />
            <CalculatorSelect
              label="Disconnection Time"
              value={disconnectionTime}
              onChange={(v) => setDisconnectionTime(v as "0.4" | "5")}
              options={Object.entries(disconnectionTimes).map(([key, label]) => ({
                value: key,
                label
              }))}
            />
          </CalculatorInputGrid>

          {searchType === "device" && (
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Quick Device"
                type="text"
                value={quickDevice}
                onChange={handleQuickDevice}
                placeholder="B32, C16, D40..."
                hint="Type MCB designation"
              />
              <CalculatorSelect
                label="Device Type"
                value={deviceType}
                onChange={setDeviceType}
                options={deviceTypeOptions}
                placeholder="Select device type"
              />
            </CalculatorInputGrid>
          )}

          {searchType === "compliance" && (
            <CalculatorInput
              label="Measured Zs Value"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={measuredZs}
              onChange={setMeasuredZs}
              placeholder="e.g., 0.75"
              hint="Checks against 80% of max Zs (ambient temperature correction)"
            />
          )}

          <CalculatorActions
            category="testing"
            onCalculate={performLookup}
            onReset={resetCalculator}
            isDisabled={!hasValidInputs()}
            calculateLabel={searchType === "device" ? "Show Values" : "Check Compliance"}
            calculateIcon={Search}
          />

          <ZsLookupResult
            searchType={searchType}
            results={results}
            complianceCheck={complianceCheck}
            measuredZs={measuredZs}
          />
        </div>
      )
    },
    {
      value: "guidance",
      label: "Guidance",
      icon: BookOpen,
      content: <ZsLookupGuidance />
    },
    {
      value: "standards",
      label: "Standards",
      icon: FileText,
      content: <ZsLookupStandards />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Calculator Header Card */}
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
            <Search className="h-5 w-5" style={{ color: config.gradientFrom }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">BS 7671 Zs Lookup</h2>
            <p className="text-sm text-white/60">Tables 41.2-41.5 Maximum Earth Fault Loop Impedance</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {isMobile ? (
        <DropdownTabs
          tabs={tabs}
          defaultValue="results"
          onValueChange={setActiveTab}
          placeholder="Select tab"
          className="w-full"
        />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white/5 rounded-xl p-1">
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

export default BS7671ZsLookupCalculator;
