
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, FileText, Users, Award, Wrench, Shield } from "lucide-react";

const EvidenceCollectionGuide = () => {
  const evidenceTypes = [
    {
      type: "Photographic Evidence",
      icon: Camera,
      description: "Visual documentation of practical work and installations",
      examples: [
        "Before and after installation photos",
        "Cable routing and terminations",
        "Control panel layouts",
        "Testing equipment setups",
        "Safety implementations"
      ],
      tips: [
        "Ensure photos are clear and well-lit",
        "Include context and scale references",
        "Take multiple angles of complex work",
        "Respect client confidentiality"
      ]
    },
    {
      type: "Written Documentation",
      icon: FileText,
      description: "Formal documents and certificates that validate your competency",
      examples: [
        "Test certificates and reports",
        "Risk assessments completed",
        "Method statements written",
        "Training certificates received",
        "Inspection and testing results"
      ],
      tips: [
        "Keep original documents safe",
        "Scan to digital formats",
        "Organise by date and category",
        "Include explanatory notes"
      ]
    },
    {
      type: "Witness Testimonies",
      icon: Users,
      description: "Statements from supervisors and colleagues confirming your competence",
      examples: [
        "Supervisor observation forms",
        "Client feedback letters",
        "Peer assessment statements",
        "Mentor evaluation reports",
        "Customer satisfaction surveys"
      ],
      tips: [
        "Ask for testimonies immediately after tasks",
        "Provide clear guidance to witnesses",
        "Ensure testimonies are specific and detailed",
        "Include witness contact details"
      ]
    },
    {
      type: "Practical Assessments",
      icon: Wrench,
      description: "Evidence of hands-on skills and practical competency",
      examples: [
        "Practical assessment results",
        "Skills demonstration videos",
        "Tool and equipment operation",
        "Installation completion records",
        "Troubleshooting documentation"
      ],
      tips: [
        "Document the assessment criteria met",
        "Include assessor feedback",
        "Record time taken and efficiency",
        "Note any challenges overcome"
      ]
    },
    {
      type: "Safety Documentation",
      icon: Shield,
      description: "Evidence of health and safety awareness and compliance",
      examples: [
        "Safety induction completions",
        "PPE usage documentation",
        "Accident/incident reports",
        "Safety meeting attendance",
        "Risk assessment contributions"
      ],
      tips: [
        "Always prioritise safety in documentation",
        "Show proactive safety thinking",
        "Document safety improvements suggested",
        "Include safety training completed"
      ]
    },
    {
      type: "Professional Development",
      icon: Award,
      description: "Evidence of continuous learning and skill development",
      examples: [
        "Course completion certificates",
        "CPD activity records",
        "Conference attendance certificates",
        "Self-study documentation",
        "Skills progression records"
      ],
      tips: [
        "Link learning to workplace application",
        "Reflect on how training improved performance",
        "Set targets for future development",
        "Seek feedback on progress"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Evidence Collection Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive guidance on collecting, organising, and presenting evidence for your 
            electrical apprenticeship portfolio. Quality evidence demonstrates your competency 
            and learning journey effectively.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {evidenceTypes.map((evidence) => (
          <Card key={evidence.type} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <evidence.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-white text-lg">{evidence.type}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">{evidence.description}</p>
              
              <div>
                <h4 className="text-sm font-medium text-elec-yellow mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {evidence.examples.map((example, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start">
                      <span className="w-1 h-1 bg-elec-yellow rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-green-400 mb-2">Best Practice Tips:</h4>
                <ul className="space-y-1">
                  {evidence.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-green-200 flex items-start">
                      <span className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300">Evidence Quality Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-orange-300 font-medium mb-3">What Makes Good Evidence:</h4>
              <ul className="text-orange-200 text-sm space-y-1">
                <li>✓ Clearly linked to assessment criteria</li>
                <li>✓ Authentic and original</li>
                <li>✓ Sufficient detail and context</li>
                <li>✓ Recent and relevant</li>
                <li>✓ Properly dated and witnessed</li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-300 font-medium mb-3">Common Evidence Mistakes:</h4>
              <ul className="text-orange-200 text-sm space-y-1">
                <li>✗ Blurry or unclear photographs</li>
                <li>✗ Missing context or explanation</li>
                <li>✗ Outdated or irrelevant material</li>
                <li>✗ Insufficient evidence quantity</li>
                <li>✗ Poor organisation and filing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceCollectionGuide;
