
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  Save, 
  Share2, 
  History, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Settings,
  Eye,
  EyeOff,
  RotateCcw,
  Download
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CalculatorDataManager from './CalculatorDataManager';
import CalculatorEducationalContent from './CalculatorEducationalContent';

interface CalculationStep {
  id: string;
  name: string;
  description: string;
  inputs: string[];
  formula: string;
  completed: boolean;
}

interface ValidationRule {
  field: string;
  rule: 'required' | 'min' | 'max' | 'range';
  value?: number;
  message: string;
}

interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  unit?: string;
  options?: { value: string; label: string }[];
  defaultValue?: any;
  validation?: ValidationRule[];
  helpText?: string;
}

interface EnhancedCalculatorInterfaceProps {
  calculatorType: string;
  title: string;
  description: string;
  fields: CalculatorField[];
  steps?: CalculationStep[];
  onCalculate: (inputs: Record<string, any>) => Record<string, any>;
  showSteps?: boolean;
  showEducational?: boolean;
}

const EnhancedCalculatorInterface: React.FC<EnhancedCalculatorInterfaceProps> = ({
  calculatorType,
  title,
  description,
  fields,
  steps = [],
  onCalculate,
  showSteps = false,
  showEducational = true
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [outputs, setOutputs] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('calculator');

  useEffect(() => {
    // Initialize default values
    const defaultInputs = fields.reduce((acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.id] = field.defaultValue;
      }
      return acc;
    }, {} as Record<string, any>);
    
    setInputs(defaultInputs);
  }, [fields]);

  const validateField = (field: CalculatorField, value: any): string | null => {
    if (!field.validation) return null;

    for (const rule of field.validation) {
      switch (rule.rule) {
        case 'required':
          if (value === undefined || value === null || value === '') {
            return rule.message;
          }
          break;
        case 'min':
          if (typeof value === 'number' && value < (rule.value || 0)) {
            return rule.message;
          }
          break;
        case 'max':
          if (typeof value === 'number' && value > (rule.value || 0)) {
            return rule.message;
          }
          break;
        case 'range':
          if (typeof value === 'number' && rule.value) {
            const [min, max] = String(rule.value).split(',').map(Number);
            if (value < min || value > max) {
              return rule.message;
            }
          }
          break;
      }
    }
    return null;
  };

  const validateAllFields = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field, inputs[field.id]);
      if (error) {
        errors[field.id] = error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Clear validation error for this field
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleCalculate = () => {
    if (!validateAllFields()) {
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted fields before calculating.",
        variant: "destructive"
      });
      return;
    }

    try {
      const results = onCalculate(inputs);
      setOutputs(results);

      // Add to history
      const historyEntry = {
        id: Date.now().toString(),
        calculatorType,
        timestamp: new Date(),
        inputs: { ...inputs },
        outputs: results
      };
      
      setCalculationHistory(prev => [historyEntry, ...prev.slice(0, 9)]);

      toast({
        title: "Calculation Complete",
        description: "Results have been calculated successfully."
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "An error occurred during calculation. Please check your inputs.",
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    const defaultInputs = fields.reduce((acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.id] = field.defaultValue;
      }
      return acc;
    }, {} as Record<string, any>);
    
    setInputs(defaultInputs);
    setOutputs({});
    setValidationErrors({});
    setCurrentStep(0);
  };

  const loadCalculation = (calculation: any) => {
    setInputs(calculation.inputs);
    handleCalculate();
  };

  const exportResults = () => {
    const exportData = {
      calculator: calculatorType,
      timestamp: new Date().toISOString(),
      inputs,
      outputs
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculatorType}-calculation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderField = (field: CalculatorField) => {
    const error = validationErrors[field.id];

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={field.id} className="flex items-center gap-2">
          {field.label}
          {field.unit && <span className="text-sm text-muted-foreground">({field.unit})</span>}
        </Label>
        
        {field.type === 'number' && (
          <Input
            id={field.id}
            type="number"
            value={inputs[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || 0)}
            className={`bg-elec-dark border-elec-yellow/20 ${error ? 'border-red-500' : ''}`}
            placeholder={field.helpText}
          />
        )}

        {field.type === 'select' && (
          <Select
            value={inputs[field.id] || field.defaultValue}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            <SelectTrigger className={`bg-elec-dark border-elec-yellow/20 ${error ? 'border-red-500' : ''}`}>
              <SelectValue placeholder={field.helpText} />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {error && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {error}
          </p>
        )}

        {field.helpText && !error && (
          <p className="text-xs text-muted-foreground">{field.helpText}</p>
        )}
      </div>
    );
  };

  const getStepProgress = () => {
    if (!showSteps || steps.length === 0) return 100;
    return (currentStep / (steps.length - 1)) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Calculator Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                {title}
              </CardTitle>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                {showAdvanced ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
          
          {showSteps && steps.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}: {steps[currentStep]?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(getStepProgress())}% Complete
                </span>
              </div>
              <Progress value={getStepProgress()} className="h-2" />
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Main Calculator Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          {showEducational && <TabsTrigger value="learn">Learn</TabsTrigger>}
        </TabsList>

        <TabsContent value="calculator" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Fields */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map(field => renderField(field))}
                
                <div className="flex gap-2 pt-4 border-t border-elec-yellow/20">
                  <Button
                    onClick={handleCalculate}
                    className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  {Object.keys(outputs).length > 0 && (
                    <>
                      <Button
                        variant="outline"
                        onClick={exportResults}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(outputs, null, 2));
                          toast({ title: "Results copied to clipboard" });
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Display */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(outputs).length === 0 ? (
                  <div className="text-center py-8">
                    <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Enter your parameters and click Calculate to see results.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(outputs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 border border-elec-yellow/20 rounded-lg">
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-elec-yellow font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Detailed Results & Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(outputs).length === 0 ? (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No calculation results available. Complete a calculation to see detailed analysis.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Results Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(outputs).slice(0, 3).map(([key, value]) => (
                      <Card key={key} className="border-elec-yellow/10">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-elec-yellow">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Compliance Checks */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Compliance & Safety</h3>
                    <Alert className="bg-green-500/10 border-green-500/30">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-200">
                        All calculated values appear to be within acceptable ranges for standard installations.
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Recommendations</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-3 border border-blue-500/30 rounded-lg bg-blue-500/10">
                        <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                        <span className="text-sm">Consider using the next standard cable size for safety margin.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-6">
          <CalculatorDataManager
            currentCalculation={Object.keys(outputs).length > 0 ? {
              id: Date.now().toString(),
              calculatorType,
              timestamp: new Date(),
              inputs,
              outputs
            } : undefined}
            onLoadCalculation={loadCalculation}
          />
        </TabsContent>

        {showEducational && (
          <TabsContent value="learn" className="mt-6">
            <CalculatorEducationalContent
              calculatorType={calculatorType}
              currentInputs={inputs}
              currentOutputs={outputs}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default EnhancedCalculatorInterface;
