
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentationRequirementsDiagramProps {
  installationType?: string;
}

const DocumentationRequirementsDiagram = ({ installationType }: DocumentationRequirementsDiagramProps) => {
  const getRequiredDocuments = () => {
    return [
      {
        document: "Electrical Installation Certificate",
        regulation: "BS 7671:2018 Appendix 6",
        purpose: "Confirms new installation complies with BS 7671",
        completedBy: "Person responsible for design, construction, inspection and testing",
        timing: "Upon completion of new installation",
        critical: true
      },
      {
        document: "Schedule of Inspections",
        regulation: "BS 7671:2018 Appendix 6",
        purpose: "Records visual inspection items checked",
        completedBy: "Competent person carrying out inspection",
        timing: "During visual inspection phase",
        critical: true
      },
      {
        document: "Schedule of Test Results",
        regulation: "BS 7671:2018 Appendix 6",
        purpose: "Records all test measurements and results",
        completedBy: "Competent person carrying out testing",
        timing: "During testing phase",
        critical: true
      },
      {
        document: "Circuit Charts",
        regulation: "Regulation 514.9.1",
        purpose: "Identification of circuits and protective devices",
        completedBy: "Installation designer/contractor",
        timing: "Before energisation",
        critical: true
      }
    ];
  };

  const requiredDocuments = getRequiredDocuments();

  const getAdditionalDocuments = () => {
    if (installationType === "domestic") {
      return [
        "Minor Electrical Installation Works Certificate (for additions)",
        "Electrical Installation Condition Report (if existing work present)",
        "Building Control notification (where required)"
      ];
    } else if (installationType === "commercial") {
      return [
        "Fire Risk Assessment electrical considerations",
        "Emergency lighting compliance certificates",
        "Electrical maintenance schedule"
      ];
    } else if (installationType === "industrial") {
      return [
        "Hazardous area classification drawings",
        "Equipment certification for ATEX compliance",
        "Earthing and bonding system verification"
      ];
    }
    return [];
  };

  const additionalDocuments = getAdditionalDocuments();

  return (
    <div className="space-y-6">
      <div className="text-sm text-indigo-200 mb-4">
        BS 7671 Documentation Requirements for Initial Verification
      </div>

      {/* Regulation Overview */}
      <div className="bg-blue-600/20 p-4 rounded border border-blue-500/30">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-blue-400" />
          <h4 className="font-medium text-blue-200">Regulation 631.1 - Documentation Requirements</h4>
        </div>
        <p className="text-xs text-blue-100">
          "Upon completion of the work, the person responsible for the construction of the installation shall provide 
          the person ordering the work with a certificate confirming that the installation complies with BS 7671."
        </p>
      </div>

      {/* Required Documents */}
      <div className="space-y-4">
        <h4 className="font-medium text-indigo-200 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Mandatory Documentation
        </h4>
        
        {requiredDocuments.map((doc, index) => (
          <div key={index} className="bg-green-600/20 p-4 rounded border border-green-500/30">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h5 className="font-medium text-green-200">{doc.document}</h5>
                <p className="text-xs text-green-300">{doc.regulation}</p>
              </div>
              {doc.critical && (
                <Badge variant="outline" className="text-red-300 border-red-400/30">
                  Critical
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-green-300 font-medium">Purpose:</span>
                <p className="text-green-100">{doc.purpose}</p>
              </div>
              <div>
                <span className="text-green-300 font-medium">Completed by:</span>
                <p className="text-green-100">{doc.completedBy}</p>
              </div>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <Clock className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-200">Timing: {doc.timing}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Installation Type Specific Documents */}
      {additionalDocuments.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-purple-200 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {installationType?.charAt(0).toUpperCase()}{installationType?.slice(1)} Installation Additional Requirements
          </h4>
          
          <div className="bg-purple-600/20 p-4 rounded border border-purple-500/30">
            <ul className="space-y-2">
              {additionalDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-purple-100">
                  <CheckCircle className="h-3 w-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Documentation Timeline */}
      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/30">
        <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Documentation Timeline
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
            <div className="text-xs">
              <span className="text-amber-200 font-medium">Before commencement:</span>
              <span className="text-amber-100"> Design documentation and calculations</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
            <div className="text-xs">
              <span className="text-amber-200 font-medium">During inspection:</span>
              <span className="text-amber-100"> Schedule of Inspections completion</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
            <div className="text-xs">
              <span className="text-amber-200 font-medium">During testing:</span>
              <span className="text-amber-100"> Schedule of Test Results completion</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
            <div className="text-xs">
              <span className="text-amber-200 font-medium">Upon completion:</span>
              <span className="text-amber-100"> Electrical Installation Certificate issue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Retention Requirements */}
      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
        <h4 className="font-medium text-red-300 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Document Retention & Distribution
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <h5 className="font-medium text-red-200">Original Copies:</h5>
            <ul className="text-red-100 space-y-1">
              <li>• Person ordering the work (customer)</li>
              <li>• Installing contractor records</li>
              <li>• Building Control (where notifiable)</li>
            </ul>
          </div>
          <div className="space-y-1">
            <h5 className="font-medium text-red-200">Retention Period:</h5>
            <ul className="text-red-100 space-y-1">
              <li>• Minimum duration of installation</li>
              <li>• Available for future inspection</li>
              <li>• Transfer with property ownership</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationRequirementsDiagram;
