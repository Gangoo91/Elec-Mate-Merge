
import { CheckCircle, AlertTriangle, FileText, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InitialVerificationDiagramProps {
  stepType: string;
  installationType?: string;
}

const InitialVerificationDiagram = ({ stepType, installationType }: InitialVerificationDiagramProps) => {
  const getVerificationSequence = () => {
    return [
      {
        phase: "Planning & Documentation Review",
        items: [
          "Review installation drawings and specifications",
          "Check compliance with BS 7671 requirements",
          "Verify design calculations and cable schedules",
          "Confirm protective device coordination"
        ],
        icon: "📋",
        color: "blue"
      },
      {
        phase: "Visual Inspection - External",
        items: [
          "Service head and meter position inspection",
          "Main earthing terminal arrangements",
          "External bonding conductor verification",
          "Cable entry and IP rating checks"
        ],
        icon: "🏠",
        color: "green"
      },
      {
        phase: "Visual Inspection - Internal",
        items: [
          "Consumer unit/distribution board inspection",
          "Circuit protective devices verification",
          "Cable installation methods and supports",
          "Socket outlets and accessory mounting"
        ],
        icon: "⚡",
        color: "amber"
      },
      {
        phase: "Testing Preparation",
        items: [
          "Isolation and proving dead procedures",
          "Test equipment calibration verification",
          "Circuit identification and labelling",
          "Load disconnection for testing"
        ],
        icon: "🔧",
        color: "purple"
      }
    ];
  };

  const verificationSequence = getVerificationSequence();

  return (
    <div className="space-y-6">
      <div className="text-sm text-indigo-200 mb-4">
        Initial Verification Sequence for {installationType || "electrical"} installations
      </div>

      {/* BS7671 Compliance Notice */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-blue-400" />
          <h4 className="font-medium text-blue-200">BS 7671 Initial Verification Requirements</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-blue-300 font-medium">Regulation 610.1:</span>
            <p className="text-blue-100">Every installation shall be inspected and tested during erection and upon completion</p>
          </div>
          <div className="space-y-1">
            <span className="text-blue-300 font-medium">Regulation 643.1:</span>
            <p className="text-blue-100">Testing shall follow the sequence specified to avoid damage</p>
          </div>
        </div>
      </div>

      {/* Verification Sequence */}
      <div className="space-y-4">
        {verificationSequence.map((phase, index) => (
          <div key={index} className={`bg-${phase.color}-600/20 p-4 rounded border border-${phase.color}-500/30`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg">{phase.icon}</span>
              <div className="flex items-center gap-2">
                <span className={`bg-${phase.color}-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold`}>
                  {index + 1}
                </span>
                <h4 className={`font-medium text-${phase.color}-200`}>{phase.phase}</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {phase.items.map((item, itemIndex) => (
                <div key={itemIndex} className={`flex items-start gap-2 text-xs text-${phase.color}-100`}>
                  <CheckCircle className={`h-3 w-3 text-${phase.color}-400 mt-0.5 flex-shrink-0`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Critical Safety Reminder */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Initial Verification Critical Points
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <h5 className="font-medium text-red-200">Before Energising:</h5>
            <ul className="text-red-100 space-y-1">
              <li>• Complete all visual inspections</li>
              <li>• Verify all connections are secure</li>
              <li>• Confirm protective device ratings</li>
              <li>• Check polarity at all points</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-red-200">Documentation Required:</h5>
            <ul className="text-red-100 space-y-1">
              <li>• Electrical Installation Certificate</li>
              <li>• Schedule of Inspections</li>
              <li>• Schedule of Test Results</li>
              <li>• Circuit charts and drawings</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation Type Specific Requirements */}
      {installationType && (
        <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
          <h4 className="font-medium text-purple-200 mb-2">
            {installationType.charAt(0).toUpperCase() + installationType.slice(1)} Installation Specific Requirements
          </h4>
          <div className="text-xs text-purple-100">
            {installationType === "domestic" && (
              <div className="space-y-1">
                <p>• Verify main protective bonding to water, gas, and other services</p>
                <p>• Check RCD protection for socket outlets ≤20A and circuits in special locations</p>
                <p>• Confirm consumer unit location and accessibility</p>
                <p>• Verify earthing arrangements and TN-C-S supply considerations</p>
              </div>
            )}
            {installationType === "commercial" && (
              <div className="space-y-1">
                <p>• Verify fire alarm and emergency lighting integration</p>
                <p>• Check compliance with building regulations and fire safety</p>
                <p>• Confirm isolation arrangements for maintenance</p>
                <p>• Verify discrimination and selectivity of protective devices</p>
              </div>
            )}
            {installationType === "industrial" && (
              <div className="space-y-1">
                <p>• Check motor protection and control circuit arrangements</p>
                <p>• Verify hazardous area classifications and equipment</p>
                <p>• Confirm earthing and equipotential bonding systems</p>
                <p>• Check compliance with relevant industry standards</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InitialVerificationDiagram;
