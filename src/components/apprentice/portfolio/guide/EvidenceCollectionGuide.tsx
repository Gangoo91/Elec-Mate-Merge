
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  FileText, 
  Video,
  Users,
  Award,
  Clock,
  Wrench,
  BookOpen,
  CheckCircle,
  Upload,
  Shield,
  Target
} from "lucide-react";

const EvidenceCollectionGuide = () => {
  const evidenceTypes = [
    {
      type: "Photographic Evidence",
      icon: Camera,
      color: "blue",
      examples: [
        "Before and after shots of installation work",
        "Step-by-step process photos",
        "Completed circuits and consumer units",
        "Tools and equipment being used correctly",
        "Safety measures and PPE in use",
        "Test results displayed on meters"
      ],
      bestPractices: [
        "Always ask permission before taking photos on site",
        "Include a ruler or coin for scale where appropriate",
        "Ensure good lighting and clear focus",
        "Take multiple angles of complex installations",
        "Include context - show the whole area, not just close-ups"
      ],
      requirements: "High resolution, clearly labelled with date, location, and description"
    },
    {
      type: "Written Reports & Reflections",
      icon: FileText,
      color: "green",
      examples: [
        "Daily work diary entries",
        "Incident reports and near-miss documentation",
        "Method statements you've followed",
        "Risk assessments you've contributed to",
        "Reflective learning logs",
        "Research on regulations or techniques"
      ],
      bestPractices: [
        "Write in first person to show your personal involvement",
        "Use technical terminology correctly",
        "Explain your thought process and decision-making",
        "Include what you learned and how you'll apply it",
        "Be honest about challenges and mistakes"
      ],
      requirements: "Clear, professional writing with proper grammar and technical accuracy"
    },
    {
      type: "Certificates & Qualifications",
      icon: Award,
      color: "yellow",
      examples: [
        "Health and safety training certificates",
        "First aid qualifications",
        "Tool training certificates",
        "Manufacturer product training",
        "CPD course completion certificates",
        "Test instrument calibration certificates"
      ],
      bestPractices: [
        "Keep original certificates safe and scan copies",
        "Check expiry dates and plan renewals",
        "Include certificates for informal training too",
        "Create a certificate tracking spreadsheet",
        "Get certificates from workplace training sessions"
      ],
      requirements: "Original or certified copies, current and relevant to electrical work"
    },
    {
      type: "Witness Testimonies",
      icon: Users,
      color: "purple",
      examples: [
        "Supervisor observations of your work",
        "Customer feedback and testimonials",
        "Peer assessments from colleagues",
        "Mentor evaluation forms",
        "Site manager commendations",
        "Training provider assessments"
      ],
      bestPractices: [
        "Use official company forms where available",
        "Ensure witnesses are qualified and credible",
        "Get testimonies promptly while work is fresh",
        "Include witness contact details and qualifications",
        "Ask for specific examples rather than general comments"
      ],
      requirements: "Signed and dated by qualified witnesses with their credentials listed"
    },
    {
      type: "Video Evidence",
      icon: Video,
      color: "red",
      examples: [
        "Demonstrating test procedures",
        "Explaining circuit operation",
        "Safety procedure walk-throughs",
        "Tool usage demonstrations",
        "Problem-solving explanations",
        "Installation technique videos"
      ],
      bestPractices: [
        "Keep videos short and focused (2-5 minutes)",
        "Plan what you'll say before recording",
        "Ensure good audio quality",
        "Show your face when explaining concepts",
        "Get permission before recording on site"
      ],
      requirements: "Clear audio and video, appropriate length, professional presentation"
    },
    {
      type: "Technical Documentation",
      icon: Wrench,
      color: "cyan",
      examples: [
        "Circuit diagrams you've drawn or modified",
        "Test results and inspection sheets",
        "Installation schedules and job sheets",
        "Material lists and specifications",
        "Fault-finding records",
        "Compliance certificates"
      ],
      bestPractices: [
        "Ensure all technical drawings are to standard",
        "Include calculations and working-out",
        "Use proper symbols and conventions",
        "Show your contribution clearly",
        "Include any corrections or improvements made"
      ],
      requirements: "Technically accurate, properly formatted, showing your input and understanding"
    }
  ];

  const collectionStrategies = [
    {
      title: "Daily Evidence Habits",
      icon: Clock,
      tips: [
        "Set phone reminders to take photos at key moments",
        "Write reflection notes during lunch breaks",
        "Ask for witness signatures at the end of each day",
        "Take photos of completed work before leaving site",
        "Note down any new techniques or learning points"
      ]
    },
    {
      title: "Workplace Integration",
      icon: Shield,
      tips: [
        "Introduce yourself to site managers and explain your apprenticeship",
        "Ask to shadow different tradespeople for diverse experience",
        "Volunteer for new types of work to broaden evidence base",
        "Request copies of all relevant documentation",
        "Build relationships with potential witnesses"
      ]
    },
    {
      title: "Quality Control",
      icon: Target,
      tips: [
        "Review evidence weekly for gaps and quality",
        "Get feedback on your reflective writing",
        "Ensure photos are clear and well-composed",
        "Check all documents are properly labelled",
        "Verify technical accuracy with supervisors"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-400",
      green: "border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 text-green-400",
      yellow: "border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10 text-elec-yellow",
      purple: "border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-400",
      red: "border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10 text-red-400",
      cyan: "border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-cyan-400"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Evidence Collection Masterclass</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            Learn how to systematically collect, organise, and present evidence that demonstrates your 
            competency and professional development throughout your electrical apprenticeship.
          </p>
        </CardContent>
      </Card>

      {/* Evidence Types */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Types of Evidence You Should Collect</h3>
        
        {evidenceTypes.map((evidence, index) => {
          const IconComponent = evidence.icon;
          const colorClasses = getColorClasses(evidence.color);
          
          return (
            <Card key={index} className={colorClasses}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconComponent className="h-6 w-6" />
                  {evidence.type}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3">Examples</h4>
                    <ul className="space-y-2">
                      {evidence.examples.map((example, exIndex) => (
                        <li key={exIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">Best Practices</h4>
                    <ul className="space-y-2">
                      {evidence.bestPractices.map((practice, practiceIndex) => (
                        <li key={practiceIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3">Requirements</h4>
                    <div className="bg-elec-gray/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">{evidence.requirements}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Collection Strategies */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Evidence Collection Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collectionStrategies.map((strategy, index) => {
            const IconComponent = strategy.icon;
            return (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-elec-yellow" />
                    {strategy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Digital Organisation Tips */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Digital Organisation & Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">File Organisation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use consistent folder structure across all devices</li>
                <li>• Name files with date and description (YYYY-MM-DD_Description)</li>
                <li>• Create separate folders for each competency area</li>
                <li>• Use cloud storage for automatic backup</li>
                <li>• Keep original files and create copies for submission</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Quality Standards</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Photos: Minimum 1920x1080 resolution</li>
                <li>• Videos: Clear audio, steady filming, good lighting</li>
                <li>• Documents: PDF format for final submission</li>
                <li>• File sizes: Balance quality with manageable file sizes</li>
                <li>• Metadata: Include descriptions and tags</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvidenceCollectionGuide;
