
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Info, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Zap, 
  Shield, 
  TrendingUp, 
  Download,
  Save,
  Star,
  StarOff
} from "lucide-react";
import { EnhancedCableSizingResult, CableSizingRecommendation } from "./useEnhancedCableSizing";

interface EnhancedCableSizingResultProps {
  result: EnhancedCableSizingResult;
  onSaveToHistory: () => void;
  onExportReport: () => void;
}

const EnhancedCableSizingResult = ({
  result,
  onSaveToHistory,
  onExportReport
}: EnhancedCableSizingResultProps) => {

  const getStatusIcon = (status: "pass" | "fail" | "warning") => {
    switch (status) {
      case "pass": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "fail": return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const CableRecommendationCard = ({ recommendation, isMain = false }: { 
    recommendation: CableSizingRecommendation; 
    isMain?: boolean;
  }) => (
    <Card className={`${isMain ? 'border-elec-yellow bg-elec-yellow/5' : 'border-elec-yellow/30'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className={`text-lg ${isMain ? 'text-elec-yellow' : ''}`}>
              {recommendation.cable.size} ({recommendation.cable.coreConfig})
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {recommendation.cable.cableType.toUpperCase()}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${getSuitabilityColor(recommendation.suitabilityScore)}`}
              >
                {recommendation.suitabilityScore}% suitable
              </Badge>
              {isMain && <Badge className="bg-elec-yellow text-black text-xs">Recommended</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {recommendation.futureProof ? (
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Current Rating: </span>
            <span className="font-medium">
              {recommendation.cable.currentRating.pvc || recommendation.cable.currentRating.xlpe}A
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Voltage Drop: </span>
            <span className="font-medium">
              {recommendation.cable.calculatedVoltageDrop?.toFixed(2)}V
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Cost: </span>
            <span className="font-medium capitalize">{recommendation.costEffectiveness}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Installation: </span>
            <span className="font-medium capitalize">{recommendation.installationComplexity}</span>
          </div>
        </div>

        {recommendation.cable.applications && (
          <div>
            <div className="text-xs text-muted-foreground mb-1">Applications:</div>
            <div className="flex flex-wrap gap-1">
              {recommendation.cable.applications.slice(0, 3).map((app, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {app.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {recommendation.warningNotes.length > 0 && (
          <Alert className="bg-amber-900/30 border-amber-500/50">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-100 text-xs">
              {recommendation.warningNotes.join(', ')}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  if (!result.recommendedCable && result.alternativeCables.length === 0) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center space-y-4 text-center">
        <Zap className="h-12 w-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-medium">Ready to Calculate</h3>
          <p className="text-sm text-muted-foreground">
            Enter your requirements and click calculate to get cable recommendations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onSaveToHistory}>
          <Save className="h-4 w-4 mr-2" />
          Save to History
        </Button>
        <Button size="sm" variant="outline" onClick={onExportReport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Main Results Tabs */}
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Cables</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          {result.recommendedCable && (
            <div>
              <h3 className="text-lg font-medium text-elec-yellow mb-3">Recommended Cable</h3>
              <CableRecommendationCard recommendation={result.recommendedCable} isMain={true} />
            </div>
          )}

          {result.alternativeCables.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Alternative Options</h3>
              <div className="space-y-3">
                {result.alternativeCables.map((recommendation, index) => (
                  <CableRecommendationCard key={index} recommendation={recommendation} />
                ))}
              </div>
            </div>
          )}

          {result.warnings.length > 0 && (
            <Alert className="bg-amber-900/30 border-amber-500/50">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-100">
                <div className="font-medium mb-1">Warnings:</div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {result.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {result.recommendations.length > 0 && (
            <Alert className="bg-blue-900/30 border-blue-500/50">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-100">
                <div className="font-medium mb-1">Recommendations:</div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <h3 className="text-lg font-medium text-elec-yellow mb-3">Regulatory Compliance</h3>
          <div className="space-y-3">
            {result.complianceChecks.map((check, index) => (
              <Card key={index} className="border-elec-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(check.status)}
                        <span className="font-medium">{check.requirement}</span>
                        <Badge variant="outline" className="text-xs">
                          {check.regulation}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {check.reference}
                      </p>
                      {check.details && (
                        <p className="text-sm">{check.details}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Zs Calculation */}
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Earth Fault Loop Impedance (Zs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Calculated Zs: </span>
                  <span className="font-medium">{result.zsCalculation.zs.toFixed(3)}Ω</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Maximum Zs: </span>
                  <span className="font-medium">{result.zsCalculation.maxZs.toFixed(3)}Ω</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-1">
                  {result.zsCalculation.compliant ? 
                    <CheckCircle className="h-4 w-4 text-green-500" /> :
                    <XCircle className="h-4 w-4 text-red-500" />
                  }
                  <span className={result.zsCalculation.compliant ? "text-green-400" : "text-red-400"}>
                    {result.zsCalculation.compliant ? "Compliant" : "Non-compliant"}
                  </span>
                </div>
                <Progress 
                  value={(result.zsCalculation.zs / result.zsCalculation.maxZs) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <h3 className="text-lg font-medium text-elec-yellow mb-3">Environmental Analysis</h3>
          
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Derating Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Temperature: </span>
                  <span className="font-medium">
                    {(result.environmentalFactors.temperatureDerating * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Grouping: </span>
                  <span className="font-medium">
                    {(result.environmentalFactors.groupingDerating * 100).toFixed(0)}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Overall: </span>
                  <span className="font-medium">
                    {(result.environmentalFactors.overallDerating * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <Progress 
                value={result.environmentalFactors.overallDerating * 100} 
                className="h-2"
              />
              {result.environmentalFactors.overallDerating < 0.8 && (
                <Alert className="bg-amber-900/30 border-amber-500/50">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-100 text-sm">
                    High derating factor applied. Consider improving installation conditions.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle>Design Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Design Current: </span>
                  <span className="font-medium">{result.designCurrent.toFixed(1)}A</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Protective Device: </span>
                  <span className="font-medium">{result.protectiveDeviceRating}A</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <h3 className="text-lg font-medium text-elec-yellow mb-3">Calculation Summary</h3>
          
          {result.recommendedCable && (
            <Card className="border-elec-yellow/20 bg-elec-yellow/5">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-elec-yellow">
                    {result.recommendedCable.cable.size}
                  </div>
                  <div className="text-lg font-medium">
                    {result.recommendedCable.cable.coreConfig} {result.recommendedCable.cable.cableType.toUpperCase()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Recommended for your application
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Card className="border-elec-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Current Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {result.recommendedCable?.cable.currentRating.pvc || '--'}A
                </div>
                <div className="text-xs text-muted-foreground">
                  Design current: {result.designCurrent.toFixed(1)}A
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Voltage Drop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {result.recommendedCable?.cable.calculatedVoltageDrop?.toFixed(2) || '--'}V
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.recommendedCable ? 
                    `${((result.recommendedCable.cable.calculatedVoltageDrop! / 230) * 100).toFixed(1)}%` : 
                    '--'
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle className="text-sm">Installation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Use appropriate installation method as specified</li>
                <li>• Ensure proper protective device coordination</li>
                <li>• Consider environmental factors during installation</li>
                <li>• Follow BS 7671 requirements for this installation type</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedCableSizingResult;
