
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Users, TrendingUp, Award, BookOpen, Building } from "lucide-react";

const CareerPlanningTab = () => {
  const careerGoals = [
    {
      id: 1,
      title: "Complete Level 3 Apprenticeship",
      progress: 65,
      status: "in-progress",
      deadline: "2024-08-15"
    },
    {
      id: 2,
      title: "Achieve JIB Approved Electrician Status",
      progress: 30,
      status: "planned",
      deadline: "2024-12-01"
    },
    {
      id: 3,
      title: "18th Edition Certification",
      progress: 85,
      status: "near-completion",
      deadline: "2024-03-30"
    }
  ];

  const careerPaths = [
    {
      title: "Domestic Electrician",
      description: "Specialise in residential electrical work",
      requirements: ["Level 3 Qualification", "18th Edition", "Part P Notification"],
      timeframe: "6-12 months"
    },
    {
      title: "Commercial Electrician",
      description: "Focus on commercial and industrial installations",
      requirements: ["Advanced qualifications", "Experience with 3-phase systems", "Health & Safety training"],
      timeframe: "12-18 months"
    },
    {
      title: "Maintenance Electrician",
      description: "Preventive and reactive maintenance work",
      requirements: ["Fault finding skills", "PLC knowledge", "Planned maintenance experience"],
      timeframe: "12-24 months"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500/20 text-blue-700";
      case "near-completion":
        return "bg-green-500/20 text-green-700";
      case "planned":
        return "bg-orange-500/20 text-orange-700";
      default:
        return "bg-gray-500/20 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Active goals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Professional connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Development</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/12</div>
            <p className="text-xs text-muted-foreground">
              Core skills mastered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Career Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{goal.title}</h4>
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status.replace("-", " ")}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      Target: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Career Pathways
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{path.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Requirements:</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {path.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>• {req}</li>
                      ))}
                    </ul>
                    <div className="text-sm">
                      <span className="font-medium">Timeframe:</span> {path.timeframe}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Professional Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Recommended Qualifications</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 18th Edition BS 7671 (Update)</li>
                <li>• Testing & Inspection (2391)</li>
                <li>• PAT Testing Certification</li>
                <li>• Emergency Lighting (BS 5266)</li>
                <li>• Fire Alarm Systems (BS 5839)</li>
              </ul>
              <Button variant="outline" className="mt-3 w-full">
                View Courses
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Skill Development Areas</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Advanced fault finding</li>
                <li>• Motor control systems</li>
                <li>• Renewable energy systems</li>
                <li>• Smart home technology</li>
                <li>• Project management</li>
              </ul>
              <Button variant="outline" className="mt-3 w-full">
                Create Learning Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPlanningTab;
