
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  FileText, 
  Users, 
  Award,
  Clock,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Video,
  Mic,
  Download
} from "lucide-react";

const EvidenceCollectionGuide = () => {
  const evidenceTypes = [
    {
      type: "Visual Evidence",
      icon: Camera,
      color: "blue",
      description: "Photos and videos of your work and processes",
      examples: [
        "Before, during, and after photos of installations",
        "Close-up shots showing quality of workmanship",
        "Videos demonstrating testing procedures",
        "Time-lapse videos of complex installations",
        "Photos of safety measures in place"
      ],
      tips: "Always get permission before photographing on customer premises. Focus on your specific contribution to the work."
    },
    {
      type: "Written Documentation",
      icon: FileText,
      color: "green",
      description: "Reports, certificates, and written assessments",
      examples: [
        "Electrical installation certificates completed",
        "Test results and inspection reports",
        "Risk assessments you've contributed to",
        "Method statements you've helped develop",
        "Training certificates and qualifications"
      ],
      tips: "Always include your reflective commentary explaining your role and what you learned from each document."
    },
    {
      type: "Witness Testimonies",
      icon: Users,
      color: "purple",
      description: "Statements from supervisors and colleagues",
      examples: [
        "Supervisor feedback on specific projects",
        "Peer testimonies about teamwork",
        "Customer feedback (where appropriate)",
        "Trainer assessments and comments",
        "Letters of recommendation"
      ],
      tips: "Build relationships with multiple supervisors to get diverse perspectives on your development."
    },
    {
      type: "Competency Evidence",
      icon: Award,
      color: "yellow",
      description: "Proof of skills and knowledge application",
      examples: [
        "Completed assessment forms",
        "Practical skill demonstration records",
        "Problem-solving case studies",
        "Technical calculations you've performed",
        "Quality control checklists completed"
      ],
      tips: "Link each piece of evidence clearly to specific learning outcomes and competency criteria."
    },
    {
      type: "Reflective Accounts",
      icon: Lightbulb,
      color: "orange",
      description: "Your personal analysis and learning insights",
      examples: [
        "Learning diary entries",
        "Critical incident analyses",
        "Skills development reflections",
        "Career progression planning",
        "Professional development goals"
      ],
      tips: "Be honest about challenges faced and how you overcame them. Show genuine reflection and learning."
    },
    {
      type: "Time-Based Evidence",
      icon: Clock,
      color: "red",
      description: "Evidence showing progression over time",
      examples: [
        "Progress photos of long-term projects",
        "Skills development tracking charts",
        "Increasing responsibility documentation",
        "Performance improvement evidence",
        "Goal achievement records"
      ],
      tips: "Date stamp everything and create clear timelines to show your development journey."
    }
  ];

  const qualityStandards = [
    {
      standard: "Authenticity",
      description: "Evidence must be genuine and represent your own work",
      checkpoints: [
        "Your direct involvement is clearly documented",
        "Witness statements confirm your contribution",
        "Evidence is dated and contextualised"
      ]
    },
    {
      standard: "Relevance",
      description: "Evidence must relate directly to learning outcomes",
      checkpoints: [
        "Clear mapping to assessment criteria",
        "Appropriate level for your qualification",
        "Demonstrable link to competency standards"
      ]
    },
    {
      standard: "Sufficiency",
      description: "Adequate evidence to prove competency",
      checkpoints: [
        "Multiple examples across different contexts",
        "Consistent performance demonstration",
        "Coverage of all required competencies"
      ]
    },
    {
      standard: "Currency",
      description: "Evidence is recent and reflects current practices",
      checkpoints: [
        "Follows current regulations and standards",
        "Uses up-to-date techniques and methods",
        "Reflects modern industry practices"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-400";
      case "green": return "border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-400";
      case "purple": return "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-400";
      case "yellow": return "border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10 text-elec-yellow";
      case "orange": return "border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 text-orange-400";
      case "red": return "border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10 text-red-400";
      default: return "border-gray-500/30 bg-gradient-to-br from-gray-500/10 to-slate-500/10 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Camera className="h-6 w-6" />
            Evidence Collection Masterclass
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Learn how to systematically collect, organise, and present evidence that demonstrates your competency. 
            Quality evidence collection is the foundation of a successful portfolio.
          </p>
        </CardContent>
      </Card>

      {/* Evidence Types */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Types of Evidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evidenceTypes.map((evidence, index) => {
            const IconComponent = evidence.icon;
            return (
              <Card key={index} className={getColorClasses(evidence.color)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {evidence.type}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{evidence.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {evidence.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-current mt-1 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <p className="text-xs text-current">
                      <span className="font-medium">💡 Pro Tip: </span>
                      {evidence.tips}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quality Standards */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Evidence Quality Standards</CardTitle>
          <p className="text-muted-foreground">
            All evidence must meet these four key quality criteria to be acceptable for assessment.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-400">{standard.standard}</h4>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
                </div>
                <div className="space-y-1">
                  {standard.checkpoints.map((checkpoint, checkIndex) => (
                    <div key={checkIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{checkpoint}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collection Best Practices */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Evidence Collection Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Do's ✅</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Start collecting evidence from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Take multiple photos from different angles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Write reflective commentary for every piece</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Get supervisor signatures on witness statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Keep originals and make digital copies</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Don'ts ❌</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Don't leave evidence collection until the end</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Don't include evidence that isn't your own work</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Don't submit poor quality or blurry photos</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Don't forget to date and label everything</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Don't ignore customer confidentiality requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Collection Tools */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Recommended Collection Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-400" />
                <h4 className="font-medium text-white">Photography</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Smartphone with good camera</li>
                <li>• Timestamp camera apps</li>
                <li>• Tripod for stable shots</li>
                <li>• Good lighting (portable LED)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-400" />
                <h4 className="font-medium text-white">Documentation</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Digital notebook apps</li>
                <li>• Voice recording apps</li>
                <li>• PDF scanner apps</li>
                <li>• Cloud storage (Google Drive, etc.)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-purple-400" />
                <h4 className="font-medium text-white">Organisation</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Portfolio management software</li>
                <li>• File naming conventions</li>
                <li>• Regular backup systems</li>
                <li>• Evidence tracking spreadsheets</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceCollectionGuide;
