
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Eye, Download } from "lucide-react";
import { useState } from "react";

interface AssessmentCriteria {
  id: string;
  category: string;
  criteria: string;
  weight: number;
  status: "excellent" | "good" | "needs-improvement" | "missing";
  feedback: string;
}

const QualityAssessmentTool = () => {
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  
  const criteria: AssessmentCriteria[] = [
    {
      id: "evidence-quality",
      category: "Evidence Quality",
      criteria: "Clear, high-quality photos and documentation",
      weight: 20,
      status: "good",
      feedback: "Good photo quality overall, but ensure all images are well-lit and show details clearly."
    },
    {
      id: "learning-reflection",
      category: "Learning Reflection",
      criteria: "Thoughtful reflection on learning and development",
      weight: 15,
      status: "excellent",
      feedback: "Excellent reflective writing showing deep understanding of learning process."
    },
    {
      id: "technical-competence",
      category: "Technical Competence",
      criteria: "Demonstration of technical skills and knowledge",
      weight: 25,
      status: "good",
      feedback: "Strong technical evidence, consider adding more complex installation examples."
    },
    {
      id: "safety-compliance",
      category: "Safety Compliance",
      criteria: "Evidence of safe working practices",
      weight: 20,
      status: "needs-improvement",
      feedback: "Include more evidence of risk assessments and method statements."
    },
    {
      id: "professional-behaviour",
      category: "Professional Behaviour",
      criteria: "Evidence of professional and communication skills",
      weight: 10,
      status: "good",
      feedback: "Good examples of customer interaction and teamwork."
    },
    {
      id: "progression-evidence",
      category: "Progression Evidence",
      criteria: "Clear progression from basic to advanced skills",
      weight: 10,
      status: "missing",
      feedback: "Add more examples showing skill development over time."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "good": return <CheckCircle className="h-4 w-4 text-blue-400" />;
      case "needs-improvement": return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case "missing": return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "good": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "needs-improvement": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "missing": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const calculateOverallScore = () => {
    const scores = {
      excellent: 100,
      good: 80,
      "needs-improvement": 60,
      missing: 0
    };
    
    const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);
    const weightedScore = criteria.reduce((sum, item) => {
      return sum + (scores[item.status] * item.weight / 100);
    }, 0);
    
    return Math.round((weightedScore / totalWeight) * 100);
  };

  const overallScore = calculateOverallScore();

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
      <CardHeader>
        <CardTitle className="text-orange-400">Portfolio Quality Assessment</CardTitle>
        <p className="text-sm text-muted-foreground">
          Evaluate your portfolio against assessment standards and identify areas for improvement
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Overall Portfolio Score</span>
            <span className="text-lg font-bold text-orange-400">{overallScore}%</span>
          </div>
          <Progress value={overallScore} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">
            {overallScore >= 80 ? "Excellent - Ready for assessment" :
             overallScore >= 70 ? "Good - Minor improvements needed" :
             overallScore >= 60 ? "Satisfactory - Some work required" :
             "Needs significant improvement"}
          </p>
        </div>

        <div className="space-y-4">
          {criteria.map((item) => (
            <div key={item.id} className="p-4 bg-elec-gray/50 rounded-lg border border-orange-500/20">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h5 className="font-medium text-white text-sm">{item.criteria}</h5>
                    <p className="text-xs text-muted-foreground">{item.category} • {item.weight}% weight</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                  {item.status.replace("-", " ")}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pl-7">{item.feedback}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Run Assessment
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </Button>
        </div>

        <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <h6 className="font-medium text-blue-400 mb-2">Assessment Tips</h6>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Regular self-assessment helps identify gaps early</li>
            <li>• Ask your mentor or assessor to review using this tool</li>
            <li>• Focus on areas with lower scores first</li>
            <li>• Document improvements to show progression</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityAssessmentTool;
