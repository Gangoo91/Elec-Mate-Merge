
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, AlertTriangle } from "lucide-react";
import { CalculatorValidator } from "@/services/calculatorValidation";
import ValidationIndicator from "./ValidationIndicator";
import { useToast } from "@/components/ui/use-toast";

const PFCCalculator = () => {
  const [voltage, setVoltage] = useState('230');
  const [impedance, setImpedance] = useState('');
  const [pfc, setPfc] = useState<number | null>(null);
  const [validation, setValidation] = useState<any>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const calculatePFC = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!voltage || parseFloat(voltage) <= 0) {
      newErrors.voltage = 'Voltage must be greater than 0';
    }
    
    if (!impedance || parseFloat(impedance) <= 0) {
      newErrors.impedance = 'Impedance must be greater than 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const V = parseFloat(voltage);
    const Z = parseFloat(impedance);
    
    // PFC = Voltage / Impedance
    const calculatedPFC = V / Z;
    
    setPfc(calculatedPFC);
    
    // Validate the calculation
    const pfcValidation = CalculatorValidator.validatePFC(calculatedPFC, V, Z);
    setValidation(pfcValidation);
    
    if (pfcValidation.isValid && pfcValidation.warnings.length === 0) {
      toast({
        title: "PFC Calculated",
        description: `${calculatedPFC.toFixed(0)}A - BS 7671 compliant`,
        variant: "default",
      });
    } else if (pfcValidation.warnings.length > 0) {
      toast({
        title: "PFC Calculated with Warnings",
        description: "Please review validation warnings",
        variant: "default",
      });
    }
  };

  const resetCalculator = () => {
    setVoltage('230');
    setImpedance('');
    setPfc(null);
    setErrors({});
    setValidation(null);
  };

  const getStatusBadge = (value: number, thresholds: {good: number, warning: number}) => {
    if (value <= thresholds.good) return <Badge variant="default">Good</Badge>;
    if (value <= thresholds.warning) return <Badge variant="secondary">Acceptable</Badge>;
    return <Badge variant="destructive">Check Required</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Prospective Fault Current Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate PFC for circuit protection and MCB selection with BS 7671 validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voltage">Supply Voltage (V)</Label>
                <Input
                  id="voltage"
                  type="number"
                  placeholder="Enter voltage"
                  className="bg-elec-dark border-elec-yellow/20"
                  value={voltage}
                  onChange={(e) => {
                    setVoltage(e.target.value);
                    clearError('voltage');
                  }}
                />
                {errors.voltage && <p className="text-xs text-destructive">{errors.voltage}</p>}
                <p className="text-xs text-muted-foreground">Nominal supply voltage (230V/400V)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="impedance">Circuit Impedance (Ω)</Label>
                <Input
                  id="impedance"
                  type="number"
                  step="0.01"
                  placeholder="Enter impedance"
                  className="bg-elec-dark border-elec-yellow/20"
                  value={impedance}
                  onChange={(e) => {
                    setImpedance(e.target.value);
                    clearError('impedance');
                  }}
                />
                {errors.impedance && <p className="text-xs text-destructive">{errors.impedance}</p>}
                <p className="text-xs text-muted-foreground">Total circuit impedance (Ze + Zs)</p>
              </div>

              <div className="flex space-x-3 pt-2">
                <Button onClick={calculatePFC} className="flex-1">Calculate PFC</Button>
                <Button variant="outline" onClick={resetCalculator} className="flex-1">Reset</Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="rounded-md bg-elec-dark p-6 flex flex-col">
              {pfc !== null ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Prospective Fault Current</h3>
                    
                    <div className="bg-elec-gray/50 p-3 rounded mb-4">
                      <div className="text-3xl font-bold text-elec-yellow">
                        {pfc.toFixed(0)} A
                      </div>
                      <div className="text-sm text-muted-foreground">PFC at fault location</div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Protection Requirements</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">MCB Breaking Capacity:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">Required: {Math.ceil(pfc/1000)}kA</span>
                            {getStatusBadge(pfc, {good: 6000, warning: 10000})}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Circuit Impedance:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{parseFloat(impedance || '0').toFixed(3)}Ω</span>
                            {getStatusBadge(parseFloat(impedance || '0'), {good: 0.8, warning: 1.2})}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-center text-muted-foreground">
                  <div>
                    <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter voltage and impedance values to calculate PFC</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      <ValidationIndicator validation={validation} calculationType="PFC Calculation" />
    </div>
  );
};

export default PFCCalculator;
