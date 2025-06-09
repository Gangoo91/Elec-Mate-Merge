
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Target, TrendingUp, Award, Briefcase, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const CareerPlanningTab = () => {
  // Mock career planning data
  const careerGoals = [
    {
      title: "Complete Level 3 Apprenticeship",
      description: "Finish all required units and assessments",
      progress: 65,
      target_date: "2024-12-31",
      status: "in_progress"
    },
    {
      title: "Achieve ECS Gold Card",
      description: "Obtain JIB Gold Card certification",
      progress: 30,
      target_date: "2025-03-15",
      status: "planned"
    },
    {
      title: "Specialise in Industrial Installations",
      description: "Focus on high-voltage industrial work",
      progress: 10,
      target_date: "2025-08-30",
      status: "planned"
    }
  ];

  const developmentAreas = [
    {
      area: "Technical Skills",
      current: "Installation & Testing",
      next: "Design & Commissioning",
      priority: "High"
    },
    {
      area: "Qualifications",
      current: "Level 3 Apprenticeship",
      next: "HNC Electrical Engineering",
      priority: "Medium"
    },
    {
      area: "Specialisation",
      current: "Domestic & Commercial",
      next: "Industrial & Renewable Energy",
      priority: "High"
    }
  ];

  const careerPaths = [
    {
      title: "Electrical Installation Specialist",
      description: "Focus on complex electrical installations",
      timeframe: "1-2 years",
      requirements: ["Level 3 completion", "18th Edition", "Testing qualifications"]
    },
    {
      title: "Electrical Design Engineer",
      description: "Move into electrical design and project management",
      timeframe: "3-5 years",
      requirements: ["HNC/HND", "Design experience", "CAD skills"]
    },
    {
      title: "Electrical Contractor",
      description: "Start your own electrical business",
      timeframe: "5+ years",
      requirements: ["JIB Grade", "Business skills", "Insurance", "Experience"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Apprenticeship completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerGoals.length}</div>
            <p className="text-xs text-muted-foreground">
              Career objectives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m</div>
            <p className="text-xs text-muted-foreground">
              To apprenticeship completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Paths</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPaths.length}</div>
            <p className="text-xs text-muted-foreground">
              Available routes
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
              {careerGoals.map((goal, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{goal.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      goal.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Target: {new Date(goal.target_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Development Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {developmentAreas.map((area, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{area.area}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      area.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {area.priority}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Current:</p>
                      <p className="text-sm text-muted-foreground">{area.current}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Next Step:</p>
                      <p className="text-sm text-muted-foreground">{area.next}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Career Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{path.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{path.timeframe}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Requirements:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {path.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/apprentice/professional-development">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>Explore Career Paths</span>
              </Button>
            </Link>
            <Link to="/apprentice/professional-development/certifications">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Award className="h-5 w-5" />
                <span>View Certifications</span>
              </Button>
            </Link>
            <Link to="/apprentice/mentor">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <User className="h-5 w-5" />
                <span>Get Career Advice</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPlanningTab;
