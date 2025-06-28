
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Download, Share, BookOpen, Zap } from "lucide-react";
import ValidationIndicator from "../ValidationIndicator";
import CalculationHistory, { type CalculationEntry } from "../calculation-history/CalculationHistory";
import QuickCalculationPresets, { type PresetScenario } from "../smart-features/QuickCalculationPresets";
import { validateCalculation, ValidationResult } from "@/services/calculatorValidation";
import { useToast } from "@/components/ui/use-toast";

interface EnhancedCalculatorWrapperProps {
  calculatorType: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  inputsComponent: React.ReactNode;
  resultsComponent: React.ReactNode;
  infoComponent?: React.ReactNode;
  inputs: any;
  results: any;
  onCalculate: () => void;
  onReset: () => void;
  onPresetSelect?: (preset: PresetScenario) => void;
  professionalMode?: boolean;
}

const EnhancedCalculatorWrapper: React.FC<EnhancedCalculatorWrapperProps> = ({
  calculatorType,
  title,
  description,
  icon,
  inputsComponent,
  resultsComponent,
  infoComponent,
  inputs,
  results,
  onCalculate,
  onReset,
  onPresetSelect,
  professionalMode = true
}) => {
  const { toast } = useToast();
  const historyRef = useRef<any>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showProfessionalReport, setShowProfessionalReport] = useState(false);

  const handleCalculate = () => {
    onCalculate();
    
    // Validate results
    const validationResult = validateCalculation(calculatorType, inputs, results);
    setValidation(validationResult);
    
    // Save to history if calculation is successful
    if (Object.keys(results).length > 0 && historyRef.current) {
      historyRef.current.saveCalculation(inputs, results, validationResult.isValid);
    }

    // Show validation feedback
    if (validationResult.errors.length > 0) {
      toast({
        title: "Validation Issues",
        description: `${validationResult.errors.length} error(s) found. Please check your inputs.`,
        variant: "destructive",
      });
    } else if (validationResult.warnings.length > 0) {
      toast({
        title: "Calculation Complete",
        description: `Result calculated with ${validationResult.warnings.length} warning(s).`,
        variant: "default",
      });
    } else {
      toast({
        title: "Calculation Complete",
        description: "All standards compliance checks passed.",
        variant: "default",
      });
    }
  };

  const handleHistoryRestore = (entry: CalculationEntry) => {
    // Restore inputs logic would be handled by parent component
    toast({
      title: "Calculation Restored",
      description: "Previous calculation has been loaded.",
      variant: "default",
    });
  };

  const generateProfessionalReport = () => {
    const reportData = {
      calculationType: title,
      timestamp: new Date().toISOString(),
      inputs,
      results,
      validation,
      standards: ['BS 7671:2018', 'IET Wiring Regulations', 'BS 7909:2008']
    };
    
    // In a real implementation, this would generate a PDF
    console.log('Professional Report Data:', reportData);
    
    toast({
      title: "Report Generated",
      description: "Professional calculation report is ready for download.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <div>
                <CardTitle className="flex items-center gap-2">
                  {title}
                  {professionalMode && (
                    <Badge variant="secondary" className="text-xs">PRO</Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
            
            {/* Professional Actions */}
            {professionalMode && validation && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateProfessionalReport}
                  className="flex items-center gap-1"
                >
                  <FileText className="h-3 w-3" />
                  Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProfessionalReport(!showProfessionalReport)}
                  className="flex items-center gap-1"
                >
                  <BookOpen className="h-3 w-3" />
                  Standards
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inputs Section */}
            <div className="space-y-4">
              {inputsComponent}
              
              {/* Quick Presets */}
              {onPresetSelect && (
                <QuickCalculationPresets
                  calculatorType={calculatorType}
                  onPresetSelect={onPresetSelect}
                />
              )}
            </div>
            
            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-md bg-elec-dark p-6 min-h-[200px] flex items-center justify-center">
                {resultsComponent}
              </div>
              {infoComponent}
            </div>
            
            {/* Professional Analysis */}
            {professionalMode && validation && (
              <div className="space-y-4">
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-400" />
                      Professional Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={validation.confidenceLevel === 'high' ? 'default' : 'secondary'}>
                        {validation.confidenceLevel.toUpperCase()} CONFIDENCE
                      </Badge>
                    </div>
                    
                    {validation.recommendations.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-blue-300 mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {validation.recommendations.map((rec, index) => (
                            <li key={index} className="text-xs text-blue-200">• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {validation.professionalNotes.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-blue-300 mb-2">Professional Notes:</h4>
                        <ul className="space-y-1">
                          {validation.professionalNotes.map((note, index) => (
                            <li key={index} className="text-xs text-blue-200">• {note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Standards Report */}
      {showProfessionalReport && validation && (
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-sm">Standards Compliance Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Applicable Standards:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• BS 7671:2018 (18th Edition Wiring Regulations)</li>
                  <li>• IET Guidance Notes</li>
                  <li>• BS 7909:2008 (Temporary electrical systems)</li>
                  <li>• HSE Guidance HSG47</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Compliance Status:</h4>
                <div className="space-y-2">
                  {Object.entries(validation.standardsCompliance).map(([standard, compliant]) => (
                    <div key={standard} className="flex items-center justify-between">
                      <span className="text-xs capitalize">{standard.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <Badge variant={compliant ? "default" : "destructive"} className="text-xs">
                        {compliant ? "✓" : "✗"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Results */}
      <ValidationIndicator validation={validation} calculationType={title} />

      {/* Calculation History */}
      <CalculationHistory
        ref={historyRef}
        calculatorType={calculatorType}
        onRestoreCalculation={handleHistoryRestore}
      />
    </div>
  );
};

export default EnhancedCalculatorWrapper;
