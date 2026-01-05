import { Wrench, CheckCircle, AlertTriangle, FileText, Calendar, Users, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CertificationPurposePractical = () => {
  const certificateSelection = [
    {
      scenario: "Complete house rewire",
      certificate: "Electrical Installation Certificate (EIC)",
      reason: "New installation covering entire property",
      additionalRequirements: ["Building Regulations notification", "Part P compliance", "Schedule of test results"],
      color: "green"
    },
    {
      scenario: "Adding two socket outlets to existing circuit",
      certificate: "Minor Electrical Installation Works Certificate",
      reason: "Minor addition not requiring new circuit",
      additionalRequirements: ["Circuit testing", "RCD verification", "Polarity check"],
      color: "blue"
    },
    {
      scenario: "Five-year rental property inspection",
      certificate: "Electrical Installation Condition Report (EICR)",
      reason: "Statutory requirement for private rental sector",
      additionalRequirements: ["C1, C2, C3 coding", "Remedial recommendations", "Next inspection date"],
      color: "orange"
    }
  ];

  const competencyChecklist = [
    "Current City & Guilds 2391 or equivalent qualification",
    "Up-to-date knowledge of BS 7671 (18th Edition)",
    "Practical experience in electrical installation work",
    "Understanding of inspection and testing procedures",
    "Knowledge of relevant health and safety legislation",
    "Professional indemnity insurance coverage",
    "Calibrated test equipment within certification dates",
    "Membership of appropriate competent person scheme"
  ];

  const documentationRequirements = [
    {
      stage: "Pre-Work Documentation",
      items: [
        "Risk assessment and method statements",
        "Design calculations and cable selection",
        "Equipment specifications and compliance",
        "Building Regulations notification (if required)"
      ]
    },
    {
      stage: "During Work Documentation",
      items: [
        "Progress records and material lists",
        "Any design changes or variations",
        "Health and safety incident records",
        "Quality control checkpoints"
      ]
    },
    {
      stage: "Post-Work Documentation",
      items: [
        "Completed test results and certificates",
        "Operating instructions and manuals",
        "Warranty information and guarantees",
        "Maintenance recommendations"
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Certificate Selection Guide */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Certificate Selection Guide</h3>
          <div className="space-y-4">
            {certificateSelection.map((item, index) => (
              <div key={index} className={`bg-${item.color}-600/10 border border-${item.color}-600/20 rounded-lg p-4`}>
                <h4 className={`text-${item.color}-200 font-medium mb-3 flex items-center gap-2`}>
                  <FileText className={`h-5 w-5 text-${item.color}-400`} />
                  Scenario: {item.scenario}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Required Certificate:</h5>
                    <p className="text-foreground mb-2">{item.certificate}</p>
                    <h5 className="text-foreground font-semibold mb-2">Reason:</h5>
                    <p className="text-foreground">{item.reason}</p>
                  </div>
                  <div>
                    <h5 className="text-foreground font-semibold mb-2">Additional Requirements:</h5>
                    <ul className="text-foreground space-y-1">
                      {item.additionalRequirements.map((req, reqIndex) => (
                        <li key={reqIndex}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competency Verification Checklist */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Competency Verification Checklist</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {competencyChecklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-600/10 border border-gray-600/20 rounded">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-sm">
                <strong>Important:</strong> All competency requirements must be current and verifiable. 
                Outdated qualifications or expired insurance may invalidate certificates.
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Timeline */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Documentation Timeline and Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            {documentationRequirements.map((stage, index) => (
              <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  {stage.stage}
                </h4>
                <ul className="text-foreground text-sm space-y-1 ml-6">
                  {stage.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Compliance Matrix */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal Compliance Matrix</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-2 text-foreground">Installation Type</th>
                    <th className="text-left p-2 text-foreground">Applicable Regulation</th>
                    <th className="text-left p-2 text-foreground">Certificate Required</th>
                    <th className="text-left p-2 text-foreground">Notification Required</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Domestic new circuit</td>
                    <td className="p-2">Part P Building Regulations</td>
                    <td className="p-2">EIC</td>
                    <td className="p-2">Yes (if not CPS member)</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Commercial rewire</td>
                    <td className="p-2">Electricity at Work Regs</td>
                    <td className="p-2">EIC</td>
                    <td className="p-2">No</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Rental property</td>
                    <td className="p-2">Housing Act 2004</td>
                    <td className="p-2">EICR</td>
                    <td className="p-2">No</td>
                  </tr>
                  <tr>
                    <td className="p-2">Minor additions</td>
                    <td className="p-2">BS 7671 compliance</td>
                    <td className="p-2">MEIWC</td>
                    <td className="p-2">Usually not</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Common Mistakes and How to Avoid Them */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Common Mistakes and How to Avoid Them</h3>
          <div className="space-y-3">
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Incomplete Certificates</h4>
                  <p className="text-foreground text-sm mb-2">
                    <strong>Problem:</strong> Leaving sections blank or using "N/A" inappropriately.
                  </p>
                  <p className="text-foreground text-sm">
                    <strong>Solution:</strong> Complete all applicable sections with accurate information. 
                    Use proper codes and clear explanations for any limitations.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-orange-200 font-medium mb-2">Wrong Certificate Type</h4>
                  <p className="text-foreground text-sm mb-2">
                    <strong>Problem:</strong> Using MEIWC for work requiring EIC or vice versa.
                  </p>
                  <p className="text-foreground text-sm">
                    <strong>Solution:</strong> Carefully assess scope of work and refer to guidance 
                    notes to select appropriate certificate type.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-yellow-200 font-medium mb-2">Inadequate Testing</h4>
                  <p className="text-foreground text-sm mb-2">
                    <strong>Problem:</strong> Not performing all required tests or using incorrect procedures.
                  </p>
                  <p className="text-foreground text-sm">
                    <strong>Solution:</strong> Follow BS 7671 Part 6 testing sequence exactly. 
                    Use calibrated equipment and document all results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practice Recommendations */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Best Practice Recommendations</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded p-4">
                <h4 className="text-green-200 font-medium mb-2">Quality Assurance</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Use standardised certificate templates</li>
                  <li>• Implement peer review processes</li>
                  <li>• Maintain test equipment calibration</li>
                  <li>• Keep detailed project records</li>
                </ul>
              </div>
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-4">
                <h4 className="text-blue-200 font-medium mb-2">Client Communication</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Explain certificate importance clearly</li>
                  <li>• Provide copies in multiple formats</li>
                  <li>• Advise on retention requirements</li>
                  <li>• Offer maintenance recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default CertificationPurposePractical;