
import { Settings, Cable, Zap, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BS7671StepData } from "@/data/bs7671-steps/enhancedStepData";

interface MFTConnectionDiagramProps {
  stepData: BS7671StepData;
  systemType?: string;
}

const MFTConnectionDiagram = ({ stepData, systemType }: MFTConnectionDiagramProps) => {
  const getMFTSetup = () => {
    if (!stepData.mftSettings) return null;

    const { testType, voltage, current, leads } = stepData.mftSettings;

    return (
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4" />
          MFT Configuration
        </h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-blue-300 font-medium">Test Type:</span>
            <p className="text-blue-100">{testType}</p>
          </div>
          <div>
            <span className="text-blue-300 font-medium">Voltage:</span>
            <p className="text-blue-100">{voltage}</p>
          </div>
          <div>
            <span className="text-blue-300 font-medium">Current:</span>
            <p className="text-blue-100">{current}</p>
          </div>
          <div>
            <span className="text-blue-300 font-medium">Duration:</span>
            <p className="text-blue-100">{stepData.mftSettings.duration}</p>
          </div>
        </div>
      </div>
    );
  };

  const getConnectionDiagram = () => {
    if (!stepData.connections) return null;

    return (
      <div className="bg-green-600/20 p-4 rounded border border-green-500/30">
        <h4 className="font-medium text-green-200 mb-3 flex items-center gap-2">
          <Cable className="h-4 w-4" />
          Connection Instructions
        </h4>
        <div className="space-y-2">
          {stepData.connections.map((connection, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-xs text-green-100">{connection}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getLeadConfiguration = () => {
    if (!stepData.mftSettings?.leads) return null;

    return (
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Required Test Leads
        </h4>
        <div className="flex flex-wrap gap-2">
          {stepData.mftSettings.leads.map((lead, index) => (
            <Badge key={index} variant="outline" className="text-purple-200 border-purple-400/30">
              {lead}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const getSystemSpecificNotes = () => {
    if (!systemType) return null;

    return (
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {systemType === "three-phase" ? "Three-Phase" : "Single-Phase"} System Notes
        </h4>
        <div className="text-xs text-amber-200">
          {systemType === "three-phase" ? (
            <ul className="space-y-1">
              <li>• Test each phase separately (L1, L2, L3)</li>
              <li>• Consider load balancing during testing</li>
              <li>• Check phase rotation if applicable</li>
              <li>• Verify neutral integrity across all phases</li>
            </ul>
          ) : (
            <ul className="space-y-1">
              <li>• Single line and neutral to test</li>
              <li>• Ensure proper earth connection</li>
              <li>• Check for any parallel neutral paths</li>
              <li>• Verify RCD operation if present</li>
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        MFT setup and connections for {stepData.title.toLowerCase()}
      </div>

      {getMFTSetup()}
      {getConnectionDiagram()}
      {getLeadConfiguration()}
      {getSystemSpecificNotes()}
    </div>
  );
};

export default MFTConnectionDiagram;
