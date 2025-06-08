
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckSquare, ClipboardCheck, AlertTriangle, Shield, Zap, HardHat, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import InteractiveAssessmentTool from "@/components/apprentice/assessment/InteractiveAssessmentTool";
import AssessmentProgress from "@/components/apprentice/assessment/AssessmentProgress";
import AssessmentBestPractices from "@/components/apprentice/assessment/AssessmentBestPractices";
import EducationalContent from "@/components/apprentice/assessment/EducationalContent";

const OnJobAssessment = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [completedAssessments, setCompletedAssessments] = useState<string[]>([]);

  const assessmentTools = [
    {
      id: "pre-job-safety",
      title: "Pre-Job Safety Assessment",
      icon: Shield,
      description: "Comprehensive safety checklist before starting any electrical work",
      difficulty: "Essential",
      estimatedTime: "10-15 minutes",
      items: [
        "PPE requirement assessment",
        "Electrical hazard identification", 
        "Safe isolation verification",
        "Emergency procedure review"
      ]
    },
    {
      id: "site-condition",
      title: "Site Condition Evaluation",
      icon: HardHat,
      description: "Assess environmental and working conditions",
      difficulty: "Intermediate",
      estimatedTime: "15-20 minutes",
      items: [
        "Working space adequacy",
        "Lighting conditions",
        "Weather considerations",
        "Access route safety"
      ]
    },
    {
      id: "electrical-installation",
      title: "Electrical Installation Assessment",
      icon: Zap,
      description: "Evaluate existing electrical installations",
      difficulty: "Advanced",
      estimatedTime: "20-30 minutes",
      items: [
        "Consumer unit condition",
        "Cable condition assessment",
        "Earthing and bonding check",
        "RCD operation verification"
      ]
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment Matrix",
      icon: AlertTriangle,
      description: "Systematic risk evaluation framework",
      difficulty: "Intermediate",
      estimatedTime: "15-25 minutes",
      items: [
        "Hazard identification",
        "Risk probability assessment",
        "Impact severity rating",
        "Control measure planning"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Essential": return "text-green-400 bg-green-400/10";
      case "Intermediate": return "text-yellow-400 bg-yellow-400/10";
      case "Advanced": return "text-red-400 bg-red-400/10";
      default: return "text-elec-yellow bg-elec-yellow/10";
    }
  };

  const handleToolComplete = (toolId: string) => {
    if (!completedAssessments.includes(toolId)) {
      setCompletedAssessments([...completedAssessments, toolId]);
    }
  };

  if (selectedTool) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedTool(null)}
            className="flex-shrink-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </div>
        
        <InteractiveAssessmentTool
          tool={assessmentTools.find(t => t.id === selectedTool)!}
          onComplete={() => handleToolComplete(selectedTool)}
          isCompleted={completedAssessments.includes(selectedTool)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Assessment Tools</h1>
          <p className="text-muted-foreground">Interactive checklists and guides for job site evaluations</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <AssessmentProgress 
        tools={assessmentTools}
        completedAssessments={completedAssessments}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessmentTools.map((tool) => (
          <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-all cursor-pointer"
                onClick={() => setSelectedTool(tool.id)}>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <tool.icon className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(tool.difficulty)}`}>
                        {tool.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tool.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
                {completedAssessments.includes(tool.id) && (
                  <Award className="h-5 w-5 text-green-400" />
                )}
              </div>
              <p className="text-elec-light/80">{tool.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tool.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <EducationalContent />

      <AssessmentBestPractices />

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">📚 Regulations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• BS 7671 Wiring Regulations</li>
                <li>• Health & Safety at Work Act</li>
                <li>• CDM Regulations 2015</li>
                <li>• Electricity at Work Regulations</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">🛠️ Tools & Equipment</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Risk assessment forms</li>
                <li>• Site condition checklists</li>
                <li>• PPE inspection logs</li>
                <li>• Emergency contact lists</li>
              </ul>
            </div>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">🎯 Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Always assess before starting</li>
                <li>• Document everything</li>
                <li>• Communicate with team</li>
                <li>• Regular safety reviews</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobAssessment;
