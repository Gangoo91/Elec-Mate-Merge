
import { Eye, CheckCircle, AlertTriangle, Home, Building } from "lucide-react";

interface VisualInspectionDiagramProps {
  stepType: string;
  installationType?: string;
}

const VisualInspectionDiagram = ({ stepType, installationType }: VisualInspectionDiagramProps) => {
  const getInspectionAreas = () => {
    if (stepType.toLowerCase().includes('external')) {
      return [
        { area: "Service Head", items: ["Seal integrity", "Cable condition", "Earthing conductor"], icon: "🔌" },
        { area: "Meter Position", items: ["Accessibility", "Sealing", "Labelling"], icon: "📊" },
        { area: "Main Earthing", items: ["Conductor size", "Connections", "Bonding"], icon: "🔌" },
        { area: "External Equipment", items: ["IP ratings", "Cable entries", "Ventilation"], icon: "🏠" }
      ];
    } else {
      return [
        { area: "Consumer Unit", items: ["RCD operation", "MCB ratings", "Labelling"], icon: "⚡" },
        { area: "Wiring Systems", items: ["Cable types", "Supports", "Protection"], icon: "🔌" },
        { area: "Accessories", items: ["Socket outlets", "Switches", "Mounting"], icon: "🔘" },
        { area: "Connections", items: ["Terminations", "Junction boxes", "Joints"], icon: "🔗" }
      ];
    }
  };

  const inspectionAreas = getInspectionAreas();

  return (
    <div className="space-y-4">
      <div className="text-sm text-indigo-200 mb-4">
        {stepType} checklist for {installationType || "standard"} installations
      </div>

      {/* Installation type indicator */}
      <div className="flex items-center gap-2 mb-4">
        {installationType === "domestic" && <Home className="h-4 w-4 text-green-400" />}
        {installationType === "commercial" && <Building className="h-4 w-4 text-blue-400" />}
        {installationType === "industrial" && <Building className="h-4 w-4 text-purple-400" />}
        <span className="text-xs text-indigo-200 capitalize">{installationType || "General"} Installation</span>
      </div>

      {/* Inspection Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inspectionAreas.map((area, index) => (
          <div key={index} className="bg-indigo-600/20 p-4 rounded border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{area.icon}</span>
              <h4 className="font-medium text-indigo-200">{area.area}</h4>
            </div>
            <ul className="space-y-1">
              {area.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center gap-2 text-xs text-indigo-100">
                  <Eye className="h-3 w-3 text-indigo-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Safety Reminders */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Visual Inspection Safety Notes
        </h4>
        <ul className="space-y-1 text-xs text-red-200">
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            Do not remove covers while installation is energised
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            Look for signs of overheating, burning, or damage
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            Report immediate safety concerns to supervisor
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">•</span>
            Take photos for documentation (with permission)
          </li>
        </ul>
      </div>

      {/* Common Issues */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Common Issues to Look For
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <h5 className="font-medium text-amber-200">Wiring Issues:</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Inadequate cable supports</li>
              <li>• Damaged cable sheaths</li>
              <li>• Incorrect cable types</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-amber-200">Equipment Issues:</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Missing circuit labels</li>
              <li>• Incorrect protective device ratings</li>
              <li>• Poor terminations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualInspectionDiagram;
