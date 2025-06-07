
import { CheckSquare, AlertCircle, FileCheck, Users } from "lucide-react";

interface ComplianceChecklistDiagramProps {
  installationType?: string;
}

const ComplianceChecklistDiagram = ({ installationType }: ComplianceChecklistDiagramProps) => {
  const getComplianceCategories = () => {
    return [
      {
        category: "Design Compliance",
        items: [
          "Installation method selection appropriate for environment",
          "Cable sizing calculations verified against load requirements",
          "Protective device discrimination and selectivity confirmed",
          "Voltage drop calculations within permitted limits",
          "Short circuit and earth fault calculations completed"
        ],
        regulation: "BS 7671 Chapter 43 & 52",
        icon: "📐"
      },
      {
        category: "Protection Requirements",
        items: [
          "Automatic disconnection of supply provisions verified",
          "Additional protection by RCD where required",
          "Protection against overcurrent correctly applied",
          "Protection against overvoltage where necessary",
          "Isolation and switching arrangements adequate"
        ],
        regulation: "BS 7671 Chapter 41 & 46",
        icon: "🛡️"
      },
      {
        category: "Special Location Requirements",
        items: [
          "Bathroom zones and protection requirements",
          "Kitchen and wet area considerations",
          "Swimming pool and fountain installations",
          "Caravan, motor caravan and marina installations",
          "Medical location requirements where applicable"
        ],
        regulation: "BS 7671 Part 7",
        icon: "⚠️"
      },
      {
        category: "Installation Methods",
        items: [
          "Cable installation methods comply with manufacturer instructions",
          "Supports and fixings at correct intervals",
          "Protection against mechanical damage adequate",
          "Segregation of circuits where required",
          "Accessibility for inspection and maintenance"
        ],
        regulation: "BS 7671 Chapter 52",
        icon: "🔧"
      }
    ];
  };

  const complianceCategories = getComplianceCategories();

  return (
    <div className="space-y-6">
      <div className="text-sm text-indigo-200 mb-4">
        BS 7671 Compliance Verification Checklist
      </div>

      {/* Compliance Overview */}
      <div className="bg-green-600/20 p-4 rounded border border-green-500/30">
        <div className="flex items-center gap-2 mb-3">
          <FileCheck className="h-5 w-5 text-green-400" />
          <h4 className="font-medium text-green-200">Regulation 610.3 - Inspection Requirements</h4>
        </div>
        <p className="text-xs text-green-100">
          "The inspection shall be made to verify that the installed electrical equipment is in accordance with BS 7671, 
          is not visibly damaged or defective so as to impair safety, and is correctly selected and erected."
        </p>
      </div>

      {/* Compliance Categories */}
      <div className="space-y-4">
        {complianceCategories.map((category, index) => (
          <div key={index} className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg">{category.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-blue-200">{category.category}</h4>
                <p className="text-xs text-blue-300">{category.regulation}</p>
              </div>
            </div>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-blue-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Competent Person Requirements */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Competent Person Requirements (Regulation 610.2)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <h5 className="font-medium text-amber-200">Inspector Qualifications:</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Knowledge of BS 7671 requirements</li>
              <li>• Understanding of installation methods</li>
              <li>• Experience with testing procedures</li>
              <li>• Ability to identify non-compliance</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-amber-200">Testing Personnel:</h5>
            <ul className="text-amber-100 space-y-1">
              <li>• Competent in use of test instruments</li>
              <li>• Understanding of test sequences</li>
              <li>• Knowledge of acceptable values</li>
              <li>• Ability to interpret results</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Non-Compliance Actions */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Non-Compliance Action Required
        </h4>
        <div className="text-xs text-red-100 space-y-2">
          <p>
            <strong>If non-compliance is identified:</strong>
          </p>
          <ul className="space-y-1">
            <li>• Document the specific regulation contravention</li>
            <li>• Do not energise the installation until rectified</li>
            <li>• Notify the responsible person immediately</li>
            <li>• Re-inspect and test after modifications</li>
            <li>• Update documentation to reflect changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecklistDiagram;
