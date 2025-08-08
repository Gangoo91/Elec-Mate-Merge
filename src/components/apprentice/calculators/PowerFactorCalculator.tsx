
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlugZap, ArrowLeftRight, Calculator, RotateCcw, Zap } from "lucide-react";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { MobileButton } from "@/components/ui/mobile-button";
import { ResultCard } from "@/components/ui/result-card";
import { useCalculator } from "./power-factor/useCalculator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PowerFactorCalculator = () => {
  const {
    activePower,
    setActivePower,
    apparentPower,
    setApparentPower,
    current,
    setCurrent,
    voltage, 
    setVoltage,
    calculationMethod,
    setCalculationMethod,
    powerFactor,
    errors,
    calculatePowerFactor,
    clearError,
    resetCalculator,
    targetPF,
    setTargetPF,
    capacitorKVAr
  } = useCalculator();

  const renderCalculationForm = () => {
    if (calculationMethod === "power") {
      return (
        <div className="space-y-4">
          <MobileInput
            label="Active Power"
            type="number"
            value={activePower}
            onChange={(e) => setActivePower(e.target.value)}
            placeholder="Enter active power"
            unit="W"
            error={errors.activePower}
            clearError={() => clearError('activePower')}
          />
          <MobileInput
            label="Apparent Power"
            type="number"
            value={apparentPower}
            onChange={(e) => setApparentPower(e.target.value)}
            placeholder="Enter apparent power"
            unit="VA"
            error={errors.apparentPower}
            clearError={() => clearError('apparentPower')}
          />
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <MobileInput
            label="Voltage"
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="Enter voltage"
            unit="V"
            error={errors.voltage}
            clearError={() => clearError('voltage')}
          />
          <MobileInput
            label="Current"
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Enter current"
            unit="A"
            error={errors.current}
            clearError={() => clearError('current')}
          />
          <MobileInput
            label="Active Power"
            type="number"
            value={activePower}
            onChange={(e) => setActivePower(e.target.value)}
            placeholder="Enter active power"
            unit="W"
            error={errors.activePower}
            clearError={() => clearError('activePower')}
          />
        </div>
      );
    }
  };

  const getResultStatus = () => {
    if (powerFactor === null) return "info";
    const pf = parseFloat(powerFactor);
    if (pf >= 0.95) return "success";
    if (pf >= 0.85) return "warning";
    return "error";
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlugZap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Factor Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate power factor from power values or electrical parameters with BS 7671 compliance checking.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mobile-optimized accordion layout */}
        <div className="block lg:hidden">
          <MobileAccordion type="single" collapsible defaultValue="inputs">
            <MobileAccordionItem value="inputs">
              <MobileAccordionTrigger icon={<Calculator className="h-4 w-4" />}>
                Calculation Inputs
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="space-y-4">
                  <MobileSelect value={calculationMethod} onValueChange={(value: "power" | "currentVoltage") => setCalculationMethod(value)}>
                    <MobileSelectTrigger label="Calculation Method">
                      <MobileSelectValue placeholder="Select calculation method" />
                    </MobileSelectTrigger>
                    <MobileSelectContent>
                      <MobileSelectItem value="power">From Power Values</MobileSelectItem>
                      <MobileSelectItem value="currentVoltage">From Electrical Parameters</MobileSelectItem>
                    </MobileSelectContent>
                  </MobileSelect>

                  {renderCalculationForm()}

                  <div className="flex gap-3 pt-4">
                    <MobileButton
                      variant="elec"
                      size="wide"
                      onClick={calculatePowerFactor}
                      icon={<Calculator className="h-4 w-4" />}
                    >
                      Calculate
                    </MobileButton>
                    <MobileButton
                      variant="outline"
                      size="icon"
                      onClick={resetCalculator}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="results">
              <MobileAccordionTrigger icon={<Zap className="h-4 w-4" />}>
                Results
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <ResultCard
                  title="Power Factor"
                  value={powerFactor}
                  unit=""
                  subtitle={powerFactor !== null ? 
                    `${parseFloat(powerFactor) >= 0.95 ? 'Excellent' : parseFloat(powerFactor) >= 0.85 ? 'Good' : 'Poor'} efficiency` : 
                    undefined}
                  status={getResultStatus()}
                  icon={<PlugZap className="h-6 w-6" />}
                  isEmpty={powerFactor === null}
                  emptyMessage="Enter values to calculate power factor"
                />
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="info">
              <MobileAccordionTrigger>
                Information & Standards
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <Alert className="border-blue-500/20 bg-blue-500/10">
                  <AlertDescription className="text-blue-200 space-y-2">
                    <p><strong>Power Factor:</strong> Ratio of active to apparent power (P/S)</p>
                    <p><strong>BS 7671:</strong> Minimum 0.85 for most installations</p>
                    <p><strong>Ideal Range:</strong> 0.95-1.0 for optimal efficiency</p>
                    <p><strong>Low PF Impact:</strong> Increased current, higher losses, penalties</p>
                  </AlertDescription>
                </Alert>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>

        {/* Desktop layout remains as grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <MobileSelect value={calculationMethod} onValueChange={(value: "power" | "currentVoltage") => setCalculationMethod(value)}>
              <MobileSelectTrigger label="Calculation Method">
                <MobileSelectValue placeholder="Select calculation method" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="power">From Power Values</MobileSelectItem>
                <MobileSelectItem value="currentVoltage">From Electrical Parameters</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {renderCalculationForm()}

            <div className="flex gap-3 pt-4">
              <MobileButton
                variant="elec"
                size="wide"
                onClick={calculatePowerFactor}
                icon={<Calculator className="h-4 w-4" />}
              >
                Calculate
              </MobileButton>
              <MobileButton
                variant="outline"
                size="icon"
                onClick={resetCalculator}
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>
          
          <div className="space-y-4">
            <ResultCard
              title="Power Factor"
              value={powerFactor}
              unit=""
              subtitle={powerFactor !== null ? 
                `${parseFloat(powerFactor) >= 0.95 ? 'Excellent' : parseFloat(powerFactor) >= 0.85 ? 'Good' : 'Poor'} efficiency` : 
                undefined}
              status={getResultStatus()}
              icon={<PlugZap className="h-6 w-6" />}
              isEmpty={powerFactor === null}
              emptyMessage="Enter values to calculate power factor"
            />

            {capacitorKVAr && (
              <ResultCard
                title="Recommended Capacitor"
                value={capacitorKVAr}
                unit="kVAr"
                subtitle={`To correct to PF ${targetPF}`}
                status="info"
                icon={<Zap className="h-6 w-6" />}
                isEmpty={false}
              />
            )}
            
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <AlertDescription className="text-blue-200 space-y-2">
                <p><strong>Power Factor:</strong> Ratio of active to apparent power (P/S)</p>
                <p><strong>BS 7671:</strong> Minimum 0.85 for most installations</p>
                <p><strong>Ideal Range:</strong> 0.95-1.0 for optimal efficiency</p>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerFactorCalculator;
