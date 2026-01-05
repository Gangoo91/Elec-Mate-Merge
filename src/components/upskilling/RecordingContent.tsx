
import { FileText, AlertCircle, CheckCircle, Users, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RecordingContent = () => {
  const documentTypes = [
    {
      name: "Electrical Installation Certificate (EIC)",
      purpose: "New installations and major alterations",
      visualSection: "Section for visual inspection items",
      keyPoints: [
        "Complete checklist of visual inspection requirements",
        "Reference to specific BS 7671 regulations", 
        "Declaration of compliance with design and installation standards",
        "Record of any deviations or special arrangements"
      ]
    },
    {
      name: "Minor Works Certificate (MEIWC)",
      purpose: "Small additions and alterations",
      visualSection: "Checklist confirming basic safety items",
      keyPoints: [
        "Simplified visual inspection checklist",
        "Focus on fundamental safety requirements",
        "Quick verification of protective measures",
        "Suitable for single circuits or minor modifications"
      ]
    },
    {
      name: "Electrical Installation Condition Report (EICR)",
      purpose: "Periodic inspection and condition assessment",
      visualSection: "Detailed observations with codes (C1–C3, FI)",
      keyPoints: [
        "Comprehensive assessment of installation condition",
        "Classification of defects by severity",
        "Recommendations for remedial action",
        "Schedule of next inspection due date"
      ]
    }
  ];

  const observationCodes = [
    {
      code: "C1",
      description: "Immediate danger",
      action: "Immediate remedial action required",
      example: "Live parts accessible, immediate shock risk present",
      borderColor: "border-red-600/20",
      bgColor: "bg-red-600/10",
      badgeColor: "bg-red-600 text-foreground"
    },
    {
      code: "C2", 
      description: "Potentially dangerous",
      action: "Urgent remedial action required",
      example: "Missing RCD protection, inadequate earthing arrangements",
      borderColor: "border-orange-600/20",
      bgColor: "bg-orange-600/10", 
      badgeColor: "bg-orange-600 text-foreground"
    },
    {
      code: "C3",
      description: "Improvement recommended",
      action: "Improvement recommended to enhance safety",
      example: "Outdated consumer unit, non-standard cable colours",
      borderColor: "border-yellow-600/20",
      bgColor: "bg-yellow-600/10",
      badgeColor: "bg-yellow-600 text-black"
    },
    {
      code: "FI",
      description: "Further investigation required",
      action: "Additional testing or investigation needed",
      example: "Suspected cable damage, unknown circuit arrangements",
      borderColor: "border-blue-600/20",
      bgColor: "bg-blue-600/10",
      badgeColor: "bg-blue-600 text-foreground"
    },
    {
      code: "LIM",
      description: "Limitation",
      action: "Inspection limited due to access, safety, or other constraints",
      example: "Unable to access ceiling void, sealed electrical enclosure",
      borderColor: "border-purple-600/20",
      bgColor: "bg-purple-600/10",
      badgeColor: "bg-purple-600 text-foreground"
    },
    {
      code: "NA",
      description: "Not Applicable",
      action: "Particular requirement doesn't apply to this installation",
      example: "No swimming pool circuits, no special locations present",
      borderColor: "border-green-600/20",
      bgColor: "bg-green-600/10",
      badgeColor: "bg-green-600 text-foreground"
    },
    {
      code: "NV",
      description: "Not Verified", 
      action: "Verification cannot be completed but no defect apparent",
      example: "Circuit energised but cannot be isolated for full inspection",
      borderColor: "border-cyan-600/20",
      bgColor: "bg-cyan-600/10",
      badgeColor: "bg-cyan-600 text-foreground"
    },
    {
      code: "N/O",
      description: "No Opinion",
      action: "Insufficient information available to form an opinion",
      example: "Concealed wiring methods unknown, manufacturer data unavailable",
      borderColor: "border-gray-600/20",
      bgColor: "bg-gray-600/10",
      badgeColor: "bg-gray-600 text-foreground"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Why Recording Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] rounded-lg p-4">
              <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                Legal Requirements
              </h3>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Visual inspections are mandatory under BS 7671</li>
                <li>• Documentation forms part of legal compliance</li>
                <li>• Records may be required in legal proceedings</li>
                <li>• Insurance claims depend on proper documentation</li>
              </ul>
            </div>
            
            <div className="bg-[#323232] rounded-lg p-4">
              <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Professional Responsibility
              </h3>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Protects public safety and property</li>
                <li>• Demonstrates professional competence</li>
                <li>• Provides audit trail for future work</li>
                <li>• Supports continuous improvement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
            Where to Record Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {documentTypes.map((doc, index) => (
            <div key={index} className="border border-gray-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold text-lg">{doc.name}</h3>
                  <p className="text-foreground text-sm mb-2">{doc.purpose}</p>
                  <p className="text-elec-yellow text-sm font-medium">{doc.visualSection}</p>
                </div>
              </div>
              <ul className="space-y-1 ml-8">
                {doc.keyPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-foreground text-sm flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertCircle className="h-5 w-5 text-elec-yellow" />
            EICR Observation Codes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            When using an Electrical Installation Condition Report (EICR), apply the correct observation codes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {observationCodes.map((code, index) => (
              <div 
                key={index} 
                className={`rounded-lg border p-4 ${code.borderColor} ${code.bgColor}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${code.badgeColor}`}>
                    {code.code}
                  </span>
                  <h3 className="text-foreground font-medium">{code.description}</h3>
                </div>
                <p className="text-foreground text-sm mb-2">{code.action}</p>
                <p className="text-foreground text-xs italic">Example: {code.example}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
