
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  CheckCircle, 
  Clock, 
  Users,
  FileText,
  AlertTriangle,
  Star,
  BookOpen,
  Award,
  TrendingUp
} from "lucide-react";

const AssessmentPreparation = () => {
  const assessmentTypes = [
    {
      type: "Portfolio Review",
      description: "Comprehensive review of your complete portfolio",
      duration: "2-3 hours",
      format: "Face-to-face with assessor",
      preparation: [
        "Organise portfolio with clear contents page",
        "Prepare summary of key achievements",
        "Practice explaining your evidence",
        "Have backup evidence ready"
      ]
    },
    {
      type: "Professional Discussion",
      description: "Structured conversation about your learning and development",
      duration: "45-90 minutes",
      format: "One-to-one discussion",
      preparation: [
        "Review learning outcomes and competency criteria",
        "Prepare examples of problem-solving scenarios",
        "Think about challenges overcome",
        "Consider future development goals"
      ]
    },
    {
      type: "Practical Assessment",
      description: "Demonstration of practical skills and knowledge",
      duration: "Half day",
      format: "Workplace observation",
      preparation: [
        "Ensure workplace access is arranged",
        "Prepare tools and equipment",
        "Review safety procedures",
        "Practice explaining your work process"
      ]
    }
  ];

  const assessmentCriteria = [
    {
      category: "Knowledge",
      weight: "30%",
      description: "Understanding of electrical principles, regulations, and standards",
      evidence: [
        "Technical explanations in portfolio commentary",
        "Correct application of calculations",
        "Reference to relevant standards and regulations",
        "Problem-solving approaches documented"
      ]
    },
    {
      category: "Skills",
      weight: "40%",
      description: "Practical electrical skills and competencies",
      evidence: [
        "Quality of practical work demonstrated",
        "Correct use of tools and equipment",
        "Testing and inspection competency",
        "Installation techniques and methods"
      ]
    },
    {
      category: "Behaviours",
      weight: "30%",
      description: "Professional behaviours and work ethic",
      evidence: [
        "Health and safety awareness",
        "Communication with customers and colleagues",
        "Initiative and problem-solving",
        "Continuous learning and development"
      ]
    }
  ];

  const preparationTimeline = [
    {
      timeframe: "3 Months Before",
      tasks: [
        "Complete portfolio gap analysis",
        "Identify any missing evidence",
        "Schedule additional workplace opportunities",
        "Begin preparing assessment documentation"
      ],
      priority: "high"
    },
    {
      timeframe: "6 Weeks Before",
      tasks: [
        "Submit draft portfolio for review",
        "Incorporate feedback from supervisor",
        "Practice professional discussion scenarios",
        "Confirm assessment dates and logistics"
      ],
      priority: "high"
    },
    {
      timeframe: "2 Weeks Before",
      tasks: [
        "Finalise portfolio organisation",
        "Prepare presentation materials",
        "Review all evidence one final time",
        "Confirm assessment venue and requirements"
      ],
      priority: "medium"
    },
    {
      timeframe: "1 Week Before",
      tasks: [
        "Print and bind portfolio copies",
        "Prepare assessment day kit",
        "Review learning outcomes one last time",
        "Get good rest and prepare mentally"
      ],
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            Assessment Preparation Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Prepare thoroughly for your end-point assessment with this comprehensive guide covering portfolio review, 
            professional discussion, and practical assessment components.
          </p>
        </CardContent>
      </Card>

      {/* Assessment Types */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Assessment Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assessmentTypes.map((assessment, index) => (
            <Card key={index} className="border-blue-500/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-blue-400">{assessment.type}</CardTitle>
                <p className="text-sm text-muted-foreground">{assessment.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <Badge variant="outline" className="text-blue-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {assessment.duration}
                  </Badge>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Format: {assessment.format}</span>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Preparation Checklist:</h4>
                  <ul className="space-y-1">
                    {assessment.preparation.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Assessment Criteria */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Assessment Criteria Breakdown</CardTitle>
          <p className="text-muted-foreground">
            Understanding how you'll be assessed across knowledge, skills, and behaviours
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {assessmentCriteria.map((criteria, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-green-400">{criteria.category}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {criteria.weight}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{criteria.description}</p>
                <div>
                  <h5 className="text-sm font-medium text-white mb-1">Evidence Types:</h5>
                  <ul className="space-y-1">
                    {criteria.evidence.map((evidence, evidenceIndex) => (
                      <li key={evidenceIndex} className="text-xs text-muted-foreground">
                        • {evidence}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preparation Timeline */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Assessment Preparation Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {preparationTimeline.map((period, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <Badge className={getPriorityColor(period.priority)} variant="outline">
                    {period.timeframe}
                  </Badge>
                </div>
                <div className="flex-1">
                  <ul className="space-y-2">
                    {period.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Tips */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Tips for Assessment Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">Before Assessment:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Practice explaining your work to others</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Ensure all evidence is clearly labelled and dated</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Prepare specific examples for each competency</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Get feedback from supervisors and mentors</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">During Assessment:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Be confident and speak clearly about your work</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Reference specific evidence when answering questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Admit when you don't know something - it's professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Ask for clarification if you don't understand a question</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Pitfalls */}
      <Card className="border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Assessment Pitfalls to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-white mb-2">Portfolio Issues:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Insufficient reflection in evidence commentary</li>
                <li>• Poor organisation making evidence hard to find</li>
                <li>• Missing evidence for key competencies</li>
                <li>• Weak links between evidence and learning outcomes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Assessment Day Issues:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Not being able to explain your own work</li>
                <li>• Failing to reference portfolio evidence</li>
                <li>• Poor time management during assessment</li>
                <li>• Not demonstrating professional behaviours</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentPreparation;
