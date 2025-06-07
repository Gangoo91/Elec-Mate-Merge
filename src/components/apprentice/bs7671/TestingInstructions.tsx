
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, AlertTriangle, CheckCircle, Cable } from "lucide-react";
import { BS7671StepData } from "@/data/bs7671-steps/enhancedStepData";

interface TestingInstructionsProps {
  stepData: BS7671StepData;
}

const TestingInstructions = ({ stepData }: TestingInstructionsProps) => {
  if (!stepData.mftSettings && !stepData.connections) return null;

  return (
    <div className="space-y-4">
      {/* MFT Settings */}
      {stepData.mftSettings && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-300">
              <Settings className="h-5 w-5" />
              MFT Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-blue-200">Test Type:</span>
                  <p className="text-sm text-blue-100">{stepData.mftSettings.testType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-200">Voltage:</span>
                  <p className="text-sm text-blue-100">{stepData.mftSettings.voltage}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-blue-200">Current:</span>
                  <p className="text-sm text-blue-100">{stepData.mftSettings.current}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-200">Duration:</span>
                  <p className="text-sm text-blue-100">{stepData.mftSettings.duration}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="text-sm font-medium text-blue-200">Required Leads:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {stepData.mftSettings.leads.map((lead, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-blue-400/30 text-blue-200">
                    {lead}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connection Instructions */}
      {stepData.connections && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-300">
              <Cable className="h-5 w-5" />
              Connection Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {stepData.connections.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-green-100">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Expected Results */}
      {stepData.expectedResults && (
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-300">
              <CheckCircle className="h-5 w-5" />
              Expected Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-green-300">~ Typical Values:</span>
                <p className="text-sm text-yellow-100 ml-4">{stepData.expectedResults.typical}</p>
              </div>
              {stepData.expectedResults.minimum && (
                <div>
                  <span className="text-sm font-medium text-blue-300">⬇ Minimum Acceptable:</span>
                  <p className="text-sm text-yellow-100 ml-4">{stepData.expectedResults.minimum}</p>
                </div>
              )}
              {stepData.expectedResults.maximum && (
                <div>
                  <span className="text-sm font-medium text-red-300">⬆ Maximum Acceptable:</span>
                  <p className="text-sm text-yellow-100 ml-4">{stepData.expectedResults.maximum}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Type Specific Information */}
      {stepData.systemTypes && (
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-300">
              <Zap className="h-5 w-5" />
              System Type Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Single Phase Systems:</h4>
                <ul className="space-y-1">
                  {stepData.systemTypes.singlePhase.map((item, index) => (
                    <li key={index} className="text-sm text-purple-100 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-300 mb-2">Three Phase Systems:</h4>
                <ul className="space-y-1">
                  {stepData.systemTypes.threePhase.map((item, index) => (
                    <li key={index} className="text-sm text-purple-100 flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestingInstructions;
