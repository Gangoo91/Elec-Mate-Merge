
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, CheckCircle, Cable, Home, Building } from "lucide-react";
import { BS7671StepData } from "@/data/bs7671-steps/enhancedStepData";

interface TestingInstructionsProps {
  stepData: BS7671StepData;
}

const TestingInstructions = ({ stepData }: TestingInstructionsProps) => {
  if (!stepData.mftSettings && !stepData.connections) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* MFT Settings */}
      {stepData.mftSettings && (
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
                <Settings className="h-4 w-4 text-blue-400" />
              </div>
              MFT Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="text-xs font-medium text-blue-400 block mb-1">Test Type</span>
                <p className="text-sm text-white">{stepData.mftSettings.testType}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="text-xs font-medium text-blue-400 block mb-1">Voltage</span>
                <p className="text-sm text-white font-mono">{stepData.mftSettings.voltage}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="text-xs font-medium text-blue-400 block mb-1">Current</span>
                <p className="text-sm text-white font-mono">{stepData.mftSettings.current}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                <span className="text-xs font-medium text-blue-400 block mb-1">Duration</span>
                <p className="text-sm text-white">{stepData.mftSettings.duration}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <span className="text-xs font-medium text-blue-400 block mb-2">Required Leads</span>
              <div className="flex flex-wrap gap-2">
                {stepData.mftSettings.leads.map((lead, index) => (
                  <Badge key={index} className="bg-blue-500/10 text-blue-300 border border-blue-500/30">
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
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <Cable className="h-4 w-4 text-green-400" />
              </div>
              Connection Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <ol className="space-y-3">
              {stepData.connections.map((instruction, index) => (
                <li key={index} className="flex gap-3 p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-white/80 pt-0.5">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Expected Results */}
      {stepData.expectedResults && (
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                <CheckCircle className="h-4 w-4 text-elec-yellow" />
              </div>
              Expected Results
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-3">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-400">~</span>
                <span className="text-xs font-medium text-green-400">Typical Values</span>
              </div>
              <p className="text-sm text-white/80 ml-5">{stepData.expectedResults.typical}</p>
            </div>
            {stepData.expectedResults.minimum && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400">↓</span>
                  <span className="text-xs font-medium text-blue-400">Minimum Acceptable</span>
                </div>
                <p className="text-sm text-white/80 ml-5">{stepData.expectedResults.minimum}</p>
              </div>
            )}
            {stepData.expectedResults.maximum && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-400">↑</span>
                  <span className="text-xs font-medium text-red-400">Maximum Acceptable</span>
                </div>
                <p className="text-sm text-white/80 ml-5">{stepData.expectedResults.maximum}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* System Type Specific Information */}
      {stepData.systemTypes && (
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-purple-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="pb-3 relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                <Zap className="h-4 w-4 text-purple-400" />
              </div>
              System Type Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Home className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="font-medium text-white">Single Phase Systems</h4>
                </div>
                <ul className="space-y-2">
                  {stepData.systemTypes.singlePhase.map((item, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-white/10 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Building className="h-4 w-4 text-purple-400" />
                  </div>
                  <h4 className="font-medium text-white">Three Phase Systems</h4>
                </div>
                <ul className="space-y-2">
                  {stepData.systemTypes.threePhase.map((item, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
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
