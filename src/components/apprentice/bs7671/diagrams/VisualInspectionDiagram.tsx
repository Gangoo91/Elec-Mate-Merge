
import { Eye, CheckCircle, AlertTriangle, Home, Building, Zap, Shield } from "lucide-react";

interface VisualInspectionDiagramProps {
  stepType: string;
  installationType?: string;
}

const VisualInspectionDiagram = ({ stepType, installationType }: VisualInspectionDiagramProps) => {
  const getInspectionAreas = () => {
    if (stepType.toLowerCase().includes('external')) {
      return [
        { 
          area: "Service Head & Meter", 
          items: [
            "Service head seal integrity and security",
            "Meter tails condition and termination",
            "Earthing conductor size and connection (Reg 544.1)",
            "Main equipotential bonding conductor (Reg 411.3.1.2)"
          ], 
          icon: "🔌",
          regulation: "BS 7671 Chapter 54"
        },
        { 
          area: "External Equipment Protection", 
          items: [
            "IP rating appropriate for location (Reg 416.2)",
            "Cable entries sealed against moisture ingress",
            "Mechanical protection adequate for environment",
            "Ventilation provisions for equipment cooling"
          ], 
          icon: "🏠",
          regulation: "BS 7671 Section 416"
        },
        { 
          area: "External Bonding", 
          items: [
            "Water service bonding within 600mm of entry (Reg 544.1.2)",
            "Gas service bonding at meter position",
            "Other metallic services bonded where required",
            "Bonding conductor sizes comply with Table 54.8"
          ], 
          icon: "🔗",
          regulation: "BS 7671 Section 544"
        },
        { 
          area: "Cable Installation - External", 
          items: [
            "Underground cable depth and route marking",
            "Overhead cable clearances and supports",
            "Cable protection against mechanical damage",
            "Warning tape/covers for buried cables"
          ], 
          icon: "⚡",
          regulation: "BS 7671 Chapter 52"
        }
      ];
    } else {
      return [
        { 
          area: "Consumer Unit/Distribution Board", 
          items: [
            "RCD operation test button functional (Reg 643.8)",
            "MCB/RCBO ratings match circuit design",
            "Circuit labelling clear and durable (Reg 514.9)",
            "Phase sequence correct (three-phase systems)"
          ], 
          icon: "⚡",
          regulation: "BS 7671 Chapter 53"
        },
        { 
          area: "Wiring Systems & Installation", 
          items: [
            "Cable types appropriate for installation method",
            "Support intervals comply with Table 52.2",
            "Protection against mechanical damage adequate",
            "Segregation from non-electrical services (Reg 528.1)"
          ], 
          icon: "🔌",
          regulation: "BS 7671 Chapter 52"
        },
        { 
          area: "Accessories & Equipment", 
          items: [
            "Socket outlets RCD protected ≤20A (Reg 411.3.3)",
            "Switches and isolators correctly rated",
            "Mounting heights appropriate for accessibility",
            "Special location requirements complied with"
          ], 
          icon: "🔘",
          regulation: "BS 7671 Section 411"
        },
        { 
          area: "Connections & Terminations", 
          items: [
            "All connections tight and secure (Reg 526.1)",
            "Conductor identification correct (Reg 514.3)",
            "Junction boxes accessible for inspection",
            "No signs of overheating or damage"
          ], 
          icon: "🔗",
          regulation: "BS 7671 Chapter 52"
        }
      ];
    }
  };

  const inspectionAreas = getInspectionAreas();

  const getCriticalSafetyChecks = () => {
    return [
      "Verify all circuits are de-energised before inspection",
      "Check for any obvious damage or unsafe conditions",
      "Confirm isolation procedures have been followed",
      "Ensure test equipment is calibrated and functioning"
    ];
  };

  const getRegulationRequirements = () => {
    return [
      {
        regulation: "610.3",
        requirement: "Verify equipment complies with BS 7671 and is correctly selected and erected"
      },
      {
        regulation: "611.3",
        requirement: "Inspection shall precede testing and shall normally be done with equipment disconnected"
      },
      {
        regulation: "612.1",
        requirement: "All items in the schedule of inspections relevant to the installation shall be inspected"
      }
    ];
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-indigo-200 mb-4">
        {stepType} inspection checklist for {installationType || "standard"} installations
      </div>

      {/* Installation type indicator */}
      <div className="flex items-center gap-2 mb-4">
        {installationType === "domestic" && <Home className="h-4 w-4 text-green-400" />}
        {installationType === "commercial" && <Building className="h-4 w-4 text-blue-400" />}
        {installationType === "industrial" && <Building className="h-4 w-4 text-purple-400" />}
        <span className="text-xs text-indigo-200 capitalize">{installationType || "General"} Installation</span>
      </div>

      {/* Regulation Requirements */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4" />
          BS 7671 Inspection Requirements
        </h4>
        {getRegulationRequirements().map((req, index) => (
          <div key={index} className="mb-2 last:mb-0">
            <span className="text-xs font-medium text-blue-300">Regulation {req.regulation}:</span>
            <p className="text-xs text-blue-100">{req.requirement}</p>
          </div>
        ))}
      </div>

      {/* Inspection Areas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {inspectionAreas.map((area, index) => (
          <div key={index} className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{area.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-indigo-200">{area.area}</h4>
                <p className="text-xs text-indigo-300">{area.regulation}</p>
              </div>
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

      {/* Critical Safety Checks */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Critical Safety Checks Before Inspection
        </h4>
        <ul className="space-y-2">
          {getCriticalSafetyChecks().map((check, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-red-200">
              <span className="text-red-400 mt-1">⚠️</span>
              <span>{check}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Common Non-Compliance Issues */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Common Non-Compliance Issues to Identify
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h5 className="font-medium text-amber-200">Installation Issues:</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Inadequate cable supports (Reg 521.10.202)</li>
              <li>• Incorrect cable selection for environment</li>
              <li>• Missing circuit identification labels</li>
              <li>• Insufficient IP ratings for location</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-amber-200">Protection Issues:</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Missing RCD protection where required</li>
              <li>• Incorrect protective device ratings</li>
              <li>• Inadequate earthing arrangements</li>
              <li>• Poor connection terminations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Documentation Requirements */}
      <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
        <h4 className="font-medium text-purple-200 mb-2">
          Schedule of Inspections Documentation
        </h4>
        <p className="text-xs text-purple-100 mb-2">
          Each inspection item must be recorded on the Schedule of Inspections (BS 7671 Appendix 6):
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-green-500/10 rounded">
            <span className="text-green-300 font-medium">✓ (Tick)</span>
            <p className="text-green-100">Inspected & Satisfactory</p>
          </div>
          <div className="text-center p-2 bg-red-500/10 rounded">
            <span className="text-red-300 font-medium">✗ (Cross)</span>
            <p className="text-red-100">Inspected & Unsatisfactory</p>
          </div>
          <div className="text-center p-2 bg-gray-500/10 rounded">
            <span className="text-gray-300 font-medium">N/A</span>
            <p className="text-gray-100">Not Applicable</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualInspectionDiagram;
