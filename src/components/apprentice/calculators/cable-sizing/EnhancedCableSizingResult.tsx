
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Save, 
  Zap,
  Shield,
  TrendingUp,
  Info
} from "lucide-react";
import type { EnhancedCableSizingResult as EnhancedCableSizingResultType } from "./useEnhancedCableSizing";

interface EnhancedCableSizingResultProps {
  result: EnhancedCableSizingResultType;
  onSaveToHistory: () => void;
  onExportReport: () => void;
}

const EnhancedCableSizingResult: React.FC<EnhancedCableSizingResultProps> = ({
  result,
  onSaveToHistory,
  onExportReport
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'fail': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  if (!result.recommendedCable && Object.keys(result.errors).length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-center p-4 sm:p-6">
        <div>
          <Zap className="h-12 w-12 sm:h-16 sm:w-16 text-elec-yellow mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
            Enhanced Cable Calculator Ready
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md">
            Enter your project details and calculation parameters to get comprehensive cable sizing recommendations with compliance checking.
          </p>
        </div>
      </div>
    );
  }

  if (Object.keys(result.errors).length > 0) {
    return (
      <div className="h-full flex items-center justify-center text-center p-4 sm:p-6">
        <div>
          <XCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
            Calculation Errors
          </h3>
          <div className="space-y-2 text-sm sm:text-base">
            {Object.entries(result.errors).map(([field, error]) => (
              <p key={field} className="text-red-400">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 h-full overflow-y-auto">
      {/* Action Buttons - Mobile First */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm p-2 -m-2 rounded-lg">
        <Button
          onClick={onSaveToHistory}
          className="w-full sm:w-auto bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 text-sm sm:text-base"
          size="sm"
        >
          <Save className="h-4 w-4 mr-1 sm:mr-2" />
          Save to History
        </Button>
        <Button
          onClick={onExportReport}
          variant="outline"
          className="w-full sm:w-auto border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm sm:text-base"
          size="sm"
        >
          <Download className="h-4 w-4 mr-1 sm:mr-2" />
          Export Report
        </Button>
      </div>

      {/* Recommended Cable */}
      {result.recommendedCable && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center gap-2 text-lg sm:text-xl">
              <CheckCircle className="h-5 w-5" />
              Recommended Cable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-400">
                  {result.recommendedCable.cable.size}
                </div>
                <div className="text-sm text-muted-foreground">
                  {result.recommendedCable.cable.coreConfig} • {result.recommendedCable.cable.cableType}
                </div>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="border-green-500/30 text-green-400">
                  Suitability: {result.recommendedCable.suitabilityScore}%
                </Badge>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400 ml-2">
                  {result.recommendedCable.costEffectiveness}
                </Badge>
              </div>
            </div>

            {/* Cable Properties - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-elec-gray-light/10 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Current Rating</div>
                <div className="font-medium text-sm sm:text-base">
                  {result.recommendedCable.cable.currentRating.pvc}A (PVC)
                </div>
              </div>
              <div className="bg-elec-gray-light/10 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Max Operating Temp</div>
                <div className="font-medium text-sm sm:text-base">
                  {result.recommendedCable.cable.maxOperatingTemp}°C
                </div>
              </div>
              <div className="bg-elec-gray-light/10 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="text-xs text-muted-foreground mb-1">Voltage Drop</div>
                <div className="font-medium text-sm sm:text-base">
                  {result.recommendedCable.cable.calculatedVoltageDrop?.toFixed(2)}V
                </div>
              </div>
            </div>

            {/* Warning Notes */}
            {result.recommendedCable.warningNotes.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-500">Important Notes</span>
                </div>
                <div className="space-y-1">
                  {result.recommendedCable.warningNotes.map((note, index) => (
                    <p key={index} className="text-xs sm:text-sm text-yellow-400">{note}</p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Calculation Summary - Mobile Optimized */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="h-4 w-5" />
            Calculation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground">Design Current</div>
                <div className="font-medium text-sm sm:text-base">{result.designCurrent.toFixed(1)}A</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Protective Device Rating</div>
                <div className="font-medium text-sm sm:text-base">{result.protectiveDeviceRating}A</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground">Environmental Derating</div>
                <div className="font-medium text-sm sm:text-base">
                  {(result.environmentalFactors.overallDerating * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Zs Calculation</div>
                <div className={`font-medium text-sm sm:text-base ${result.zsCalculation.compliant ? 'text-green-400' : 'text-red-400'}`}>
                  {result.zsCalculation.zs.toFixed(2)}Ω (Max: {result.zsCalculation.maxZs.toFixed(2)}Ω)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Checks */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-5" />
            Compliance Checks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.complianceChecks.map((check, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-elec-gray-light/5 rounded-lg">
                <div className="mt-0.5">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                    <div className="font-medium text-sm sm:text-base">{check.requirement}</div>
                    <Badge variant="outline" className="text-xs w-fit">
                      {check.regulation}
                    </Badge>
                  </div>
                  {check.details && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{check.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Cables - Collapsible on Mobile */}
      {result.alternativeCables.length > 0 && (
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
              Alternative Options ({result.alternativeCables.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {result.alternativeCables.slice(0, 4).map((alt, index) => (
                <div key={index} className="p-3 bg-elec-gray-light/5 rounded-lg border border-elec-yellow/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm sm:text-base">{alt.cable.size}</div>
                    <Badge variant="outline" className="text-xs">
                      {alt.suitabilityScore}% match
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {alt.cable.coreConfig} • Rating: {alt.cable.currentRating.pvc}A
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warnings and Recommendations */}
      {(result.warnings.length > 0 || result.recommendations.length > 0) && (
        <Card className="border-elec-yellow/20">
          <CardContent className="pt-4 sm:pt-6">
            {result.warnings.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-yellow-500 text-sm sm:text-base">Warnings</span>
                </div>
                <div className="space-y-1">
                  {result.warnings.map((warning, index) => (
                    <p key={index} className="text-xs sm:text-sm text-yellow-400 pl-6">{warning}</p>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-blue-500 text-sm sm:text-base">Recommendations</span>
                </div>
                <div className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <p key={index} className="text-xs sm:text-sm text-blue-400 pl-6">{rec}</p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCableSizingResult;
