
import { Eye, CheckCircle, AlertTriangle, Home, Building, Zap, Shield, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VisualInspectionDiagramProps {
  stepType: string;
  installationType?: string;
}

const VisualInspectionDiagram = ({ stepType, installationType }: VisualInspectionDiagramProps) => {
  const getInspectionAreas = () => {
    return [
      { 
        area: "External Intake Equipment", 
        items: [
          "Service head seal integrity and security",
          "Meter tails condition and termination", 
          "Main earthing conductor size and connection",
          "Main equipotential bonding conductor"
        ], 
        icon: "🔌",
        regulation: "BS 7671 Chapter 54",
        critical: true
      },
      { 
        area: "Consumer Unit/Distribution Board", 
        items: [
          "Adequate access and working space",
          "Enclosure suitable for environment",
          "All circuits properly identified and labelled",
          "RCD(s) present and properly identified"
        ], 
        icon: "⚡",
        regulation: "BS 7671 Chapter 53",
        critical: true
      },
      { 
        area: "Earthing Arrangements", 
        items: [
          "Main earthing conductor present and adequately sized",
          "Circuit protective conductors present",
          "Equipotential bonding conductors adequate",
          "Supplementary bonding where required"
        ], 
        icon: "🌍",
        regulation: "BS 7671 Section 544",
        critical: true
      },
      { 
        area: "Wiring Systems", 
        items: [
          "Cables properly supported and protected",
          "Cables suitable for environmental conditions",
          "Adequate protection against mechanical damage",
          "Segregation from non-electrical services"
        ], 
        icon: "🔗",
        regulation: "BS 7671 Chapter 52",
        critical: false
      },
      { 
        area: "Accessories & Equipment", 
        items: [
          "Socket outlets RCD protected ≤20A",
          "Adequate IP rating for location",
          "Switches and isolators correctly rated",
          "No damage or deterioration evident"
        ], 
        icon: "🔘",
        regulation: "BS 7671 Section 411",
        critical: false
      },
      { 
        area: "Connections & Terminations", 
        items: [
          "All connections tight and secure",
          "Conductor identification correct",
          "Junction boxes accessible for inspection",
          "No signs of overheating or damage"
        ], 
        icon: "🔧",
        regulation: "BS 7671 Section 526",
        critical: true
      },
      { 
        area: "Special Locations", 
        items: [
          "Bathroom zones comply with BS 7671",
          "Kitchen requirements observed",
          "Outdoor installation IP ratings adequate",
          "Swimming pool requirements (if applicable)"
        ], 
        icon: "🏠",
        regulation: "BS 7671 Part 7",
        critical: true
      },
      { 
        area: "RCD Protection", 
        items: [
          "RCD manual test button operational",
          "RCD protection provided where required",
          "RCD ratings appropriate for circuits",
          "RCD quarterly test notice displayed"
        ], 
        icon: "🛡️",
        regulation: "BS 7671 Section 531",
        critical: true
      },
      { 
        area: "Isolation & Switching", 
        items: [
          "Main switch/isolator readily accessible",
          "Emergency switching arrangements adequate",
          "Isolation devices properly rated and marked",
          "Warning notices and labels present"
        ], 
        icon: "🔴",
        regulation: "BS 7671 Section 537",
        critical: true
      },
      { 
        area: "Undervoltage Protection", 
        items: [
          "Undervoltage protection provided where required",
          "Protection devices correctly rated",
          "Manual reset facilities where required"
        ], 
        icon: "⚡",
        regulation: "BS 7671 Section 445",
        critical: true
      }
    ];
  };

  const inspectionAreas = getInspectionAreas();

  const getOutcomeClassifications = () => {
    return [
      {
        code: "✓",
        label: "Acceptable",
        description: "No defects found - installation complies",
        color: "text-green-400 bg-green-500/20 border-green-500/30"
      },
      {
        code: "C1",
        label: "Danger Present",
        description: "Immediate remedial action required",
        color: "text-red-400 bg-red-500/20 border-red-500/30"
      },
      {
        code: "C2", 
        label: "Potentially Dangerous",
        description: "Urgent remedial action required",
        color: "text-orange-400 bg-orange-500/20 border-orange-500/30"
      },
      {
        code: "C3",
        label: "Improvement Recommended", 
        description: "Enhancement recommended for safety",
        color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      },
      {
        code: "N/V",
        label: "Not Verified",
        description: "Unable to inspect - limitation",
        color: "text-gray-400 bg-gray-500/20 border-gray-500/30"
      },
      {
        code: "LIM",
        label: "Limitation",
        description: "Limitation encountered during inspection",
        color: "text-purple-400 bg-purple-500/20 border-purple-500/30"
      },
      {
        code: "N/A",
        label: "Not Applicable",
        description: "Not applicable to this installation",
        color: "text-blue-400 bg-blue-500/20 border-blue-500/30"
      }
    ];
  };

  const outcomeClassifications = getOutcomeClassifications();

  return (
    <div className="space-y-6">
      <div className="text-sm text-indigo-200 mb-4">
        Comprehensive EICR visual inspection for {installationType || "electrical"} installations - 10 main sections with 80+ inspection items
      </div>

      {/* Installation type indicator */}
      <div className="flex items-center gap-2 mb-4">
        {installationType === "domestic" && <Home className="h-4 w-4 text-green-400" />}
        {installationType === "commercial" && <Building className="h-4 w-4 text-blue-400" />}
        {installationType === "industrial" && <Building className="h-4 w-4 text-purple-400" />}
        <span className="text-xs text-indigo-200 capitalize">{installationType || "General"} Installation</span>
      </div>

      {/* EICR Outcome Classifications */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          EICR Outcome Classifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {outcomeClassifications.map((outcome, index) => (
            <div key={index} className={`p-2 rounded border text-center ${outcome.color}`}>
              <div className="font-bold text-lg">{outcome.code}</div>
              <div className="text-xs font-medium">{outcome.label}</div>
              <div className="text-xs opacity-80">{outcome.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Inspection Areas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {inspectionAreas.map((area, index) => (
          <div key={index} className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{area.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-indigo-200">{area.area}</h4>
                <p className="text-xs text-indigo-300">{area.regulation}</p>
              </div>
              {area.critical && (
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                  Critical
                </Badge>
              )}
            </div>
            <ul className="space-y-2">
              {area.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2 text-xs text-indigo-100">
                  <Eye className="h-3 w-3 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Critical Safety Requirements */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Critical Safety Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-red-200">Before Starting:</h5>
            <ul className="text-red-100 space-y-1">
              <li>• Verify safe isolation procedures followed</li>
              <li>• Ensure adequate lighting for inspection</li>
              <li>• Have appropriate access equipment available</li>
              <li>• Check test equipment calibration certificates</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-red-200">During Inspection:</h5>
            <ul className="text-red-100 space-y-1">
              <li>• Do not remove covers unnecessarily</li>
              <li>• Take photographs of defects for evidence</li>
              <li>• Record all observations systematically</li>
              <li>• Report immediate dangers (C1) immediately</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Documentation */}
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Professional Documentation Standards
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <h5 className="font-medium text-purple-200">Recording:</h5>
            <ul className="text-purple-100 space-y-1">
              <li>• Use official BS 7671 Schedule of Inspections</li>
              <li>• Complete all applicable items</li>
              <li>• Provide detailed notes for defects</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-purple-200">Classification:</h5>
            <ul className="text-purple-100 space-y-1">
              <li>• Apply correct outcome codes (C1/C2/C3)</li>
              <li>• Justify classification decisions</li>
              <li>• Reference relevant regulations</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-purple-200">Follow-up:</h5>
            <ul className="text-purple-100 space-y-1">
              <li>• Recommend remedial actions</li>
              <li>• Set realistic timescales</li>
              <li>• Arrange re-inspection if required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualInspectionDiagram;
