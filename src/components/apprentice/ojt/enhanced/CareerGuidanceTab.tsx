
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, TrendingUp, Target, Star, MapPin, Calendar, BookOpen, Users } from "lucide-react";

const CareerGuidanceTab = () => {
  const careerPaths = [
    {
      title: "Installation Electrician",
      match: 85,
      description: "Domestic and commercial electrical installations",
      skills: ["Domestic wiring", "Commercial systems", "Testing"],
      growth: "High demand",
      salary: "£28-35k"
    },
    {
      title: "Maintenance Electrician", 
      match: 78,
      description: "Industrial and commercial maintenance",
      skills: ["Fault finding", "Motor control", "PLCs"],
      growth: "Stable demand",
      salary: "£30-38k"
    },
    {
      title: "Design Engineer",
      match: 65,
      description: "Electrical system design and planning",
      skills: ["AutoCAD", "Calculations", "Regulations"],
      growth: "Growing field",
      salary: "£35-45k"
    }
  ];

  const skillDevelopment = [
    {
      skill: "Advanced Testing",
      current: 70,
      target: 85,
      importance: "Critical",
      timeToTarget: "3 months",
      recommendation: "Focus on complex installation testing"
    },
    {
      skill: "Customer Relations",
      current: 75,
      target: 90,
      importance: "High",
      timeToTarget: "6 months", 
      recommendation: "Practice professional communication scenarios"
    },
    {
      skill: "Project Management",
      current: 45,
      target: 70,
      importance: "Medium",
      timeToTarget: "12 months",
      recommendation: "Consider project management course"
    },
    {
      skill: "Renewable Technologies",
      current: 30,
      target: 75,
      importance: "Future-critical",
      timeToTarget: "18 months",
      recommendation: "Solar PV and EV charging specialisation"
    }
  ];

  const opportunities = [
    {
      type: "Training Course",
      title: "18th Edition Update",
      provider: "City & Guilds",
      duration: "5 days",
      cost: "£450",
      priority: "High",
      deadline: "Required by June 2024"
    },
    {
      type: "Networking Event",
      title: "Regional NICEIC Meeting",
      provider: "NICEIC",
      duration: "1 day", 
      cost: "Free",
      priority: "Medium",
      deadline: "Monthly events"
    },
    {
      type: "Certification",
      title: "PAT Testing Qualification",
      provider: "IET",
      duration: "2 days",
      cost: "£295",
      priority: "Medium",
      deadline: "Recommended for portfolio"
    }
  ];

  const mentorInsights = [
    {
      mentor: "Sarah Johnson",
      role: "Senior Electrician",
      company: "ABC Electrical",
      insight: "Focus on commercial experience - it opens more doors than domestic work alone",
      rating: 5
    },
    {
      mentor: "Mike Thompson", 
      role: "Electrical Contractor",
      company: "ThompsonElec Ltd",
      insight: "Customer service skills are just as important as technical ability",
      rating: 5
    },
    {
      mentor: "Lisa Chen",
      role: "Design Engineer", 
      company: "PowerTech Solutions",
      insight: "Learn CAD software early - it's becoming essential in modern electrical work",
      rating: 4
    }
  ];

  const getMatchColor = (match: number) => {
    if (match >= 80) return "text-green-500";
    if (match >= 60) return "text-blue-500";
    return "text-orange-500";
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-600 text-white">High Priority</Badge>;
      case "Medium":
        return <Badge className="bg-orange-600 text-white">Medium Priority</Badge>;
      default:
        return <Badge className="bg-green-600 text-white">Low Priority</Badge>;
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "Critical":
        return <Badge className="bg-red-600 text-white">Critical</Badge>;
      case "High":
        return <Badge className="bg-orange-600 text-white">High</Badge>;
      case "Future-critical":
        return <Badge className="bg-purple-600 text-white">Future-Critical</Badge>;
      default:
        return <Badge className="bg-blue-600 text-white">Medium</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">82%</div>
            <p className="text-xs text-muted-foreground">
              Job market ready
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Development</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">67%</div>
            <p className="text-xs text-muted-foreground">
              Target skills progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Score</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">45</div>
            <p className="text-xs text-muted-foreground">
              Professional connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">8</div>
            <p className="text-xs text-muted-foreground">
              Available now
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              AI Career Path Matching
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{path.title}</h4>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <span className={`text-lg font-bold ${getMatchColor(path.match)}`}>
                      {path.match}%
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={path.match} className="h-2" />
                    
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{path.growth}</span>
                      <span className="font-medium">{path.salary}</span>
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
              <TrendingUp className="h-5 w-5" />
              Skill Development Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillDevelopment.map((skill, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{skill.skill}</h4>
                      <p className="text-sm text-muted-foreground">{skill.recommendation}</p>
                    </div>
                    {getImportanceBadge(skill.importance)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {skill.current}%</span>
                      <span>Target: {skill.target}%</span>
                    </div>
                    <Progress value={skill.current} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Estimated time to target: {skill.timeToTarget}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.map((opp, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{opp.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {opp.provider} • {opp.duration}
                      </p>
                    </div>
                    {getPriorityBadge(opp.priority)}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">{opp.cost}</span>
                      <p className="text-muted-foreground">{opp.deadline}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Mentor Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mentorInsights.map((mentor, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{mentor.mentor}</h4>
                      <p className="text-sm text-muted-foreground">
                        {mentor.role} at {mentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < mentor.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground italic">
                    "{mentor.insight}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="h-12" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Career Consultation
        </Button>
        <Button className="h-12" variant="outline">
          <Target className="mr-2 h-4 w-4" />
          Create Development Plan
        </Button>
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <User className="h-5 w-5" />
            Personalised Career Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your AI-powered career guidance system analyses your skills, interests, and market trends 
            to provide personalised career recommendations. Connect with industry mentors, discover 
            learning opportunities, and build a strategic development plan for your electrical career.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerGuidanceTab;
