
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Target, TrendingUp, CheckCircle, Clock, FileText, Award, AlertTriangle } from "lucide-react";

const AssessmentProgressTab = () => {
  const assessmentMilestones = [
    {
      phase: "Initial Assessment (Month 1)",
      description: "Baseline skills evaluation",
      components: [
        "Basic electrical knowledge test",
        "Practical skills demonstration", 
        "Health and safety awareness",
        "Maths and English assessment"
      ],
      passMark: "60%",
      importance: "Identifies training needs and starting point"
    },
    {
      phase: "6-Month Review",
      description: "First formal progress review",
      components: [
        "Workplace competency assessment",
        "College coursework evaluation",
        "Employer feedback review",
        "Career development discussion"
      ],
      passMark: "Pass/Fail",
      importance: "Ensures apprentice is on track and engaged"
    },
    {
      phase: "Annual Gateway Assessment",
      description: "Preparation for End Point Assessment",
      components: [
        "Portfolio of evidence review",
        "Knowledge and skills evaluation",
        "Workplace competency verification",
        "EPA readiness assessment"
      ],
      passMark: "Competent",
      importance: "Gateway to final EPA process"
    },
    {
      phase: "End Point Assessment (EPA)",
      description: "Final independent assessment",
      components: [
        "Knowledge test (90 minutes)",
        "Practical demonstration (6 hours)",
        "Professional discussion (60 minutes)",
        "Portfolio presentation"
      ],
      passMark: "Pass/Merit/Distinction",
      importance: "Final qualification determination"
    }
  ];

  const progressTrackingTools = [
    {
      tool: "Digital Portfolio System",
      description: "Online platform for evidence collection",
      features: ["Photo/video uploads", "Competency tracking", "Supervisor sign-offs", "Progress reports"],
      cost: "£15-25/month per apprentice"
    },
    {
      tool: "Learning Management System",
      description: "Centralised training and assessment platform",
      features: ["Course delivery", "Assessment tracking", "Progress monitoring", "Reporting tools"],
      cost: "£200-500/month (multiple users)"
    },
    {
      tool: "Skills Matrix Dashboard",
      description: "Visual representation of apprentice capabilities",
      features: ["Skills mapping", "Gap analysis", "Development planning", "Progress visualisation"],
      cost: "Free (spreadsheet) or £50-100/month"
    }
  ];

  const competencyAreas = [
    {
      area: "Electrical Installation",
      skills: [
        "Cable installation and routing",
        "Wiring accessories and equipment",
        "Circuit protection devices",
        "Earthing and bonding systems"
      ],
      assessmentMethods: ["Practical demonstration", "Workplace observation", "Portfolio evidence"]
    },
    {
      area: "Testing and Inspection",
      skills: [
        "Use of test instruments",
        "Installation testing procedures",
        "Test result interpretation",
        "Documentation and certification"
      ],
      assessmentMethods: ["Practical testing", "Knowledge assessment", "Portfolio evidence"]
    },
    {
      area: "Health and Safety",
      skills: [
        "Risk assessment procedures",
        "Safe isolation methods",
        "PPE selection and use",
        "Emergency procedures"
      ],
      assessmentMethods: ["Written assessment", "Practical demonstration", "Ongoing observation"]
    },
    {
      area: "Customer Service",
      skills: [
        "Professional communication",
        "Problem-solving approach",
        "Quality workmanship",
        "Work area management"
      ],
      assessmentMethods: ["Customer feedback", "Supervisor observation", "Portfolio evidence"]
    }
  ];

  const supportStrategies = [
    {
      challenge: "Struggling with theoretical concepts",
      solutions: [
        "Additional college support sessions",
        "Peer mentoring programmes",
        "Visual learning aids and demonstrations",
        "One-to-one tuition if needed"
      ]
    },
    {
      challenge: "Practical skills development",
      solutions: [
        "Extended supervised practice time",
        "Skills workshops and masterclasses",
        "Rotation through different work types",
        "Video analysis of techniques"
      ]
    },
    {
      challenge: "Time management and organisation",
      solutions: [
        "Digital planning tools and apps",
        "Structured work scheduling",
        "Regular progress reviews",
        "Goal-setting workshops"
      ]
    },
    {
      challenge: "Confidence and motivation",
      solutions: [
        "Regular positive feedback",
        "Achievement recognition schemes",
        "Career progression discussions",
        "Success story sharing"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <GraduationCap className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Effective assessment and progress tracking increases apprentice completion rates from 68% to over 85%.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assessment Milestones & Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {assessmentMilestones.map((milestone, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{milestone.phase}</h4>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow">
                    {milestone.passMark}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3">{milestone.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-400 mb-2">Assessment Components</h5>
                    <ul className="space-y-1">
                      {milestone.components.map((component, compIndex) => (
                        <li key={compIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-400 mb-2">Why It Matters</h5>
                    <p className="text-sm text-muted-foreground">{milestone.importance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Tracking Tools & Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressTrackingTools.map((tool, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-white">{tool.tool}</h4>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    {tool.cost}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-3">{tool.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="outline" className="text-purple-300 border-purple-400/30">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-5 w-5" />
            Competency Areas & Assessment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competencyAreas.map((area, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{area.area}</h4>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-blue-400 mb-2">Key Skills</h5>
                    <ul className="space-y-1">
                      {area.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-400 mb-2">Assessment Methods</h5>
                    <div className="flex flex-wrap gap-1">
                      {area.assessmentMethods.map((method, methodIndex) => (
                        <Badge key={methodIndex} variant="outline" className="text-green-300 border-green-400/30 text-xs">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Supporting Struggling Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supportStrategies.map((strategy, index) => (
              <div key={index} className="border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-300 mb-3">{strategy.challenge}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strategy.solutions.map((solution, solutionIndex) => (
                    <div key={solutionIndex} className="flex items-start gap-2 p-2 bg-amber-500/5 rounded">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-amber-200">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h5 className="font-medium text-green-400 mb-2">Early Intervention is Key</h5>
            <p className="text-sm text-green-200">
              Identify and address issues early in the apprenticeship. Regular check-ins and open communication 
              can prevent small problems from becoming major obstacles to completion.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assessment Documentation & Record Keeping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-300 mb-3">Essential Records</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-200">Individual learning plans</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-200">Progress review meeting notes</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-200">Assessment results and feedback</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-200">Skills development evidence</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-200">Time allocation records (20% off-job training)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-green-300 mb-3">Digital Tools</h4>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-green-500/30">
                  <FileText className="h-4 w-4 mr-2" />
                  Portfolio Management System
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-500/30">
                  <Clock className="h-4 w-4 mr-2" />
                  Time Tracking Software
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-500/30">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Progress Monitoring Dashboard
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentProgressTab;
