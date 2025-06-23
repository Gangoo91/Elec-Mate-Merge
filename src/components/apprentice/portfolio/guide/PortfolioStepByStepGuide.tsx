
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  FolderOpen,
  Calendar,
  Target,
  Users,
  RefreshCw,
  Download,
  Upload
} from "lucide-react";

const PortfolioStepByStepGuide = () => {
  const steps = [
    {
      number: 1,
      title: "Initial Planning & Setup",
      description: "Establish your portfolio structure and understand requirements",
      timeframe: "Week 1-2",
      status: "foundation",
      tasks: [
        "Review your apprenticeship standards and learning outcomes",
        "Create a folder structure (digital and physical)",
        "Set up a portfolio tracking system",
        "Identify key assessment criteria",
        "Create an evidence collection timeline"
      ],
      tips: "Start with a simple structure - you can always reorganise later as you progress."
    },
    {
      number: 2,
      title: "Evidence Collection Strategy",
      description: "Develop systematic approaches to gathering evidence",
      timeframe: "Ongoing",
      status: "active",
      tasks: [
        "Photograph your work (before, during, after)",
        "Collect witness testimonies from supervisors",
        "Document problem-solving processes",
        "Keep records of training attended",
        "Save certificates and assessments"
      ],
      tips: "Make evidence collection a daily habit - set aside 10 minutes each day to document your work."
    },
    {
      number: 3,
      title: "Reflection & Analysis",
      description: "Add context and learning insights to your evidence",
      timeframe: "Weekly",
      status: "ongoing",
      tasks: [
        "Write reflective commentary for each piece of evidence",
        "Explain how the work relates to learning outcomes",
        "Identify skills demonstrated and knowledge applied",
        "Describe challenges faced and how you overcame them",
        "Link evidence to industry standards"
      ],
      tips: "Quality over quantity - a well-reflected piece of evidence is worth more than multiple unreflected items."
    },
    {
      number: 4,
      title: "Organisation & Cross-Referencing",
      description: "Structure your portfolio for easy navigation and assessment",
      timeframe: "Monthly",
      status: "maintenance",
      tasks: [
        "Create clear section dividers and contents pages",
        "Cross-reference evidence against learning outcomes",
        "Ensure evidence covers all required competencies",
        "Remove duplicate or weak evidence",
        "Update your progress tracking charts"
      ],
      tips: "Think like an assessor - make it easy for them to find evidence for specific criteria."
    },
    {
      number: 5,
      title: "Supervisor Review & Feedback",
      description: "Get professional input on your portfolio development",
      timeframe: "Quarterly",
      status: "collaborative",
      tasks: [
        "Schedule regular portfolio reviews with your supervisor",
        "Request specific feedback on evidence quality",
        "Identify gaps in your evidence collection",
        "Discuss upcoming opportunities for evidence gathering",
        "Get witness signatures and testimonies"
      ],
      tips: "Don't wait for formal reviews - ask for feedback regularly and build relationships with multiple supervisors."
    },
    {
      number: 6,
      title: "Final Preparation & Submission",
      description: "Prepare your portfolio for formal assessment",
      timeframe: "Final Month",
      status: "completion",
      tasks: [
        "Complete final evidence gap analysis",
        "Write a comprehensive portfolio introduction",
        "Create detailed contents and index pages",
        "Proofread all written work",
        "Prepare digital and physical copies as required"
      ],
      tips: "Leave plenty of time for final preparation - portfolios always take longer to complete than expected."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "foundation": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "ongoing": return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
      case "maintenance": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "collaborative": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "completion": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "foundation": return FolderOpen;
      case "active": return Upload;
      case "ongoing": return FileText;
      case "maintenance": return RefreshCw;
      case "collaborative": return Users;
      case "completion": return CheckCircle;
      default: return Target;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            Six-Step Portfolio Development Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Follow this proven six-step process to build a comprehensive and professional portfolio. 
            Each step builds on the previous one, creating a systematic approach to evidence collection and documentation.
          </p>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const StatusIcon = getStatusIcon(step.status);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.number} className="relative">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 border-2 border-elec-yellow/30">
                        <span className="text-xl font-bold text-elec-yellow">{step.number}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(step.status)} variant="outline">
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {step.status}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {step.timeframe}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-3">Key Tasks:</h4>
                      <ul className="space-y-2">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                      <p className="text-sm text-blue-300">
                        <span className="font-medium">💡 Pro Tip: </span>
                        {step.tips}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Connector Arrow */}
              {!isLast && (
                <div className="flex justify-center py-4">
                  <ArrowRight className="h-6 w-6 text-elec-yellow/60" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Reference Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Quick Reference Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-white mb-2">Daily (5-10 minutes):</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Take photos of your work</li>
                <li>• Note any new skills learned</li>
                <li>• Record problems solved</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Weekly (30 minutes):</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Write reflective commentary</li>
                <li>• Organise collected evidence</li>
                <li>• Update progress tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Monthly (1-2 hours):</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Review and reorganise portfolio</li>
                <li>• Check coverage of learning outcomes</li>
                <li>• Plan next month's evidence goals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Quarterly (Half day):</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Supervisor review meeting</li>
                <li>• Gap analysis and planning</li>
                <li>• Quality improvement review</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStepByStepGuide;
