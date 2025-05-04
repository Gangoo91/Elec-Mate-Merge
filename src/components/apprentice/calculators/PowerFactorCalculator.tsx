
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlugZap } from "lucide-react";
import PowerFactorInputs from "./power-factor/PowerFactorInputs";
import PowerFactorResult from "./power-factor/PowerFactorResult";
import PowerFactorInfo from "./power-factor/PowerFactorInfo";
import EmptyState from "./power-factor/EmptyState";
import { useCalculator } from "./power-factor/useCalculator";

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
    resetCalculator
  } = useCalculator();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PlugZap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Factor Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate power factor from power values or electrical parameters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PowerFactorInputs
            calculationMethod={calculationMethod}
            setCalculationMethod={setCalculationMethod}
            activePower={activePower}
            setActivePower={setActivePower}
            apparentPower={apparentPower}
            setApparentPower={setApparentPower}
            current={current}
            setCurrent={setCurrent}
            voltage={voltage}
            setVoltage={setVoltage}
            errors={errors}
            clearError={clearError}
            calculatePowerFactor={calculatePowerFactor}
            resetCalculator={resetCalculator}
          />
          
          <div className="flex flex-col space-y-4">
            <div className="rounded-md bg-elec-dark p-6 flex-grow flex flex-col items-center justify-center">
              {powerFactor !== null ? (
                <PowerFactorResult powerFactor={powerFactor} />
              ) : (
                <EmptyState />
              )}
            </div>
            
            <PowerFactorInfo />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerFactorCalculator;
