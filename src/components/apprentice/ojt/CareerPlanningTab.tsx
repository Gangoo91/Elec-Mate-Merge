
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Target, BookOpen, TrendingUp, Calendar, Award, Briefcase } from "lucide-react";

const CareerPlanningTab = () => {
  const careerMilestones = [
    {
      id: 1,
      title: "Complete Level 3 Apprenticeship",
      description: "Finish your electrical installation apprenticeship",
      targetDate: "2025-01-15",
      progress: 75,
      status: "in_progress"
    },
    {
      id: 2,
      title: "JIB Approved Electrician Status",
      description: "Gain JIB Approved Electrician grading",
      targetDate: "2025-03-01",
      progress: 20,
      status: "planned"
    },
    {
      id: 3,
      title: "18th Edition Qualification",
      description: "Complete BS 7671:2018 qualification",
      targetDate: "2025-06-01",
      progress: 0,
      status: "planned"
    },
    {
      id: 4,
      title: "Testing & Inspection Qualification",
      description: "2391-52 Initial Verification and Certification",
      targetDate: "2025-09-01",
      progress: 0,
      status: "planned"
    }
  ];

  const careerPaths = [
    {
      title: "Electrical Contractor",
      description: "Start your own electrical contracting business",
      timeframe: "2-3 years",
      requirements: ["Business skills", "Insurance", "NICEIC/NAPIT registration"],
      icon: <Briefcase className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Specialist Electrician",
      description: "Specialise in areas like renewable energy or automation",
      timeframe: "1-2 years",
      requirements: ["Additional qualifications", "Industry experience", "Specialist training"],
      icon: <Target className="h-6 w-6 text-green-500" />
    },
    {
      title: "Electrical Supervisor",
      description: "Lead electrical teams on large projects",
      timeframe: "3-5 years",
      requirements: ["Leadership skills", "Project management", "Advanced qualifications"],
      icon: <User className="h-6 w-6 text-purple-500" />
    },
    {
      title: "Electrical Trainer",
      description: "Teach and train the next generation of electricians",
      timeframe: "5+ years",
      requirements: ["Teaching qualification", "Industry expertise", "Communication skills"],
      icon: <BookOpen className="h-6 w-6 text-orange-500" />
    }
  ];

  const skillsToImprove = [
    { skill: "Business Skills", importance: "High", progress: 20 },
    { skill: "Advanced Testing", importance: "High", progress: 40 },
    { skill: "Renewable Energy", importance: "Medium", progress: 10 },
    { skill: "Automation", importance: "Medium", progress: 5 },
    { skill: "Project Management", importance: "High", progress: 30 }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-gray-400";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Apprenticeship completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">45 days</div>
            <p className="text-xs text-muted-foreground">
              Until apprenticeship completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Future Goals</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Career milestones planned
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Career Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerMilestones.map((milestone) => (
              <div key={milestone.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: {new Date(milestone.targetDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {milestone.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Career Pathway Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  {path.icon}
                  <div>
                    <h3 className="font-semibold">{path.title}</h3>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Timeframe: {path.timeframe}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {path.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Skills Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsToImprove.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      skill.importance === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {skill.importance}
                    </span>
                    <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                  </div>
                </div>
                <Progress value={skill.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Career Development Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Network within the industry</p>
                <p className="text-sm text-muted-foreground">
                  Join professional bodies like JIB, NICEIC, or local electrical associations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Keep learning</p>
                <p className="text-sm text-muted-foreground">
                  Technology evolves rapidly - stay updated with new regulations and techniques
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Consider specialisation</p>
                <p className="text-sm text-muted-foreground">
                  Specialising in areas like renewable energy or smart homes can increase earning potential
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPlanningTab;
