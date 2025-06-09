
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Target, CheckCircle, Calendar, TrendingUp, Award } from "lucide-react";

const AssessmentProgressTab = () => {
  const assessmentTimeline = [
    { phase: "Initial Assessment", timing: "Month 1", description: "Skills gap analysis and learning plan", status: "completed" },
    { phase: "6-Month Review", timing: "Month 6", description: "Progress evaluation and plan adjustment", status: "completed" },
    { phase: "12-Month Review", timing: "Month 12", description: "Mid-point assessment and competency check", status: "current" },
    { phase: "18-Month Review", timing: "Month 18", description: "Advanced skills assessment", status: "upcoming" },
    { phase: "24-Month Review", timing: "Month 24", description: "Pre-EPA preparation assessment", status: "upcoming" },
    { phase: "Gateway Meeting", timing: "Month 30", description: "EPA readiness confirmation", status: "upcoming" },
    { phase: "End-Point Assessment", timing: "Month 36", description: "Final competency assessment", status: "upcoming" }
  ];

  const competencyAreas = [
    { area: "Health & Safety", progress: 85, target: 90, status: "on-track" },
    { area: "Electrical Installation", progress: 75, target: 80, status: "on-track" },
    { area: "Testing & Inspection", progress: 60, target: 75, status: "needs-attention" },
    { area: "Fault Diagnosis", progress: 55, target: 70, status: "needs-attention" },
    { area: "Customer Service", progress: 70, target: 75, status: "on-track" },
    { area: "Technical Knowledge", progress: 80, target: 85, status: "on-track" }
  ];

  const epaPreparation = [
    { component: "Knowledge Test", description: "Online multiple choice examination", duration: "2 hours", weighting: "20%" },
    { component: "Practical Assessment", description: "Installation and testing tasks", duration: "7 hours", weighting: "60%" },
    { component: "Professional Discussion", description: "Portfolio-based interview", duration: "1 hour", weighting: "20%" }
  ];

  const progressMilestones = [
    "Level 2 Electrical Installation qualification achieved",
    "18th Edition Wiring Regulations certificate obtained",
    "Testing and Inspection (2391) course completed",
    "NVQ Level 3 portfolio 50% complete",
    "First Aid at Work certificate current",
    "CSCS card obtained and valid",
    "Mentor feedback consistently positive",
    "Customer service skills demonstrated"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400";
      case "current": return "bg-blue-500/20 text-blue-400";
      case "upcoming": return "bg-gray-500/20 text-gray-400";
      case "on-track": return "text-green-400";
      case "needs-attention": return "text-amber-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Assessment Timeline & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessmentTimeline.map((phase, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border border-elec-yellow/20 rounded-lg">
                <div className={`p-2 rounded-full ${getStatusColor(phase.status)} border`}>
                  {phase.status === "completed" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Calendar className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium text-white">{phase.phase}</h4>
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.timing}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Competency Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competencyAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-white">{area.area}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getStatusColor(area.status)}`}>
                      {area.progress}% / {area.target}%
                    </span>
                    <Badge className={
                      area.status === "on-track" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                    }>
                      {area.status === "on-track" ? "On Track" : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={area.progress} className="h-2" />
                  <div 
                    className="absolute top-0 w-0.5 h-2 bg-elec-yellow"
                    style={{ left: `${area.target}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-200">
              <strong>Progress Note:</strong> Regular assessment ensures apprentices stay on track. 
              Areas needing attention should be addressed with additional support and training.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            End-Point Assessment (EPA) Preparation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {epaPreparation.map((component, index) => (
              <div key={index} className="p-4 border border-purple-500/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-purple-300">{component.component}</h4>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    {component.weighting}
                  </Badge>
                </div>
                <p className="text-sm text-purple-200 mb-2">{component.description}</p>
                <p className="text-xs text-purple-400">Duration: {component.duration}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-purple-500/20 border border-purple-500/40 rounded-lg">
            <h5 className="font-medium text-purple-300 mb-2">EPA Success Tips</h5>
            <ul className="text-sm text-purple-200 space-y-1">
              <li>• Start portfolio preparation early in the apprenticeship</li>
              <li>• Practice practical assessments regularly</li>
              <li>• Ensure all mandatory qualifications are current</li>
              <li>• Schedule mock assessments 3 months before EPA</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievement Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {progressMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2 p-2">
                <input type="checkbox" className="rounded border-green-500" />
                <span className="text-sm text-green-200">{milestone}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-green-500/30 hover:bg-green-500/20">
              <Target className="h-4 w-4 mr-2" />
              Set New Goals
            </Button>
            <Button variant="outline" className="border-blue-500/30 hover:bg-blue-500/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress Report
            </Button>
            <Button variant="outline" className="border-purple-500/30 hover:bg-purple-500/20">
              <Award className="h-4 w-4 mr-2" />
              Certificate Tracker
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentProgressTab;
