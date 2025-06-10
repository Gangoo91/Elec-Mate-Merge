
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Award,
  Users,
  BookOpen,
  Target,
  Clock,
  Star,
  MapPin,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  BarChart3,
  Briefcase
} from "lucide-react";

const ProfessionalDevelopmentDashboard = () => {
  const userProgress = {
    completedCertifications: 3,
    targetCertifications: 6,
    cpdHours: 45,
    requiredCpdHours: 100,
    networkingEvents: 7,
    targetNetworkingEvents: 12,
    coursesCompleted: 12,
    targetCourses: 20
  };

  const upcomingDeadlines = [
    {
      item: "18th Edition Renewal",
      dueDate: "15 August 2024",
      priority: "High",
      daysRemaining: 142,
      type: "Certification"
    },
    {
      item: "Annual CPD Submission",
      dueDate: "31 December 2024",
      priority: "Medium",
      daysRemaining: 280,
      type: "CPD"
    },
    {
      item: "IET Membership Renewal",
      dueDate: "30 June 2024",
      priority: "Medium",
      daysRemaining: 96,
      type: "Membership"
    }
  ];

  const recentAchievements = [
    {
      title: "Testing & Inspection Certification",
      date: "2 March 2024",
      type: "Certification",
      provider: "City & Guilds",
      impact: "Qualified to issue EICRs"
    },
    {
      title: "Solar PV Installation Course",
      date: "18 February 2024",
      type: "Course",
      provider: "Renewable Energy Training",
      impact: "10 CPD hours earned"
    },
    {
      title: "Manchester Electrical Network Meetup",
      date: "5 February 2024",
      type: "Networking",
      provider: "Local Professional Group",
      impact: "5 new professional connections"
    }
  ];

  const recommendedActions = [
    {
      title: "Complete EV Charging Course",
      description: "High-growth area with excellent career prospects",
      urgency: "Recommended",
      estimatedTime: "3 days",
      benefit: "Access to growing EV market",
      provider: "Multiple providers available"
    },
    {
      title: "Join IET Young Professionals",
      description: "Expand your professional network and career opportunities",
      urgency: "Suggested",
      estimatedTime: "1 hour setup",
      benefit: "Networking and mentoring opportunities",
      provider: "Institution of Engineering and Technology"
    },
    {
      title: "Attend Electrical Trade Show 2024",
      description: "Major networking event with 15,000+ attendees",
      urgency: "Time-sensitive",
      estimatedTime: "2-3 days",
      benefit: "Industry connections and latest technology",
      provider: "Electrical Industry Association"
    }
  ];

  const industryInsights = [
    {
      metric: "Job Growth",
      value: "+15%",
      period: "Next 5 years",
      trend: "up",
      description: "Electrical industry growth projection"
    },
    {
      metric: "Avg Salary Increase",
      value: "+8.5%",
      period: "Year on year",
      trend: "up",
      description: "With additional certifications"
    },
    {
      metric: "Skills Shortage",
      value: "78%",
      period: "Current",
      trend: "neutral",
      description: "Employers reporting skill gaps"
    },
    {
      metric: "Remote Learning",
      value: "+340%",
      period: "Since 2020",
      trend: "up",
      description: "Increase in online professional development"
    }
  ];

  const quickStats = [
    {
      label: "Professional Level",
      value: "Intermediate",
      subtext: "Based on certifications and experience",
      icon: Award
    },
    {
      label: "Career Stage",
      value: "Growing",
      subtext: "On track for career progression",
      icon: TrendingUp
    },
    {
      label: "Network Size",
      value: "24 Connections",
      subtext: "Professional contacts made",
      icon: Users
    },
    {
      label: "Market Readiness",
      value: "85%",
      subtext: "Skills match to job market",
      icon: Target
    }
  ];

  const learningRecommendations = [
    {
      title: "Advanced Circuit Design",
      provider: "Electrical Training Academy",
      rating: 4.8,
      students: 2340,
      cost: "£299",
      cpdHours: 12,
      relevance: 95
    },
    {
      title: "Smart Home Technology",
      provider: "Future Tech Learning",
      rating: 4.9,
      students: 1850,
      cost: "£199",
      cpdHours: 8,
      relevance: 88
    },
    {
      title: "Industrial Control Systems",
      provider: "Automation Institute",
      rating: 4.7,
      students: 890,
      cost: "£499",
      cpdHours: 20,
      relevance: 92
    }
  ];

  const priorityScore = Math.round(
    (userProgress.completedCertifications / userProgress.targetCertifications * 25) +
    (userProgress.cpdHours / userProgress.requiredCpdHours * 25) +
    (userProgress.networkingEvents / userProgress.targetNetworkingEvents * 25) +
    (userProgress.coursesCompleted / userProgress.targetCourses * 25)
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <stat.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="font-semibold text-white">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtext}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
              Development Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">Certifications</span>
                  <span className="text-sm text-muted-foreground">
                    {userProgress.completedCertifications}/{userProgress.targetCertifications}
                  </span>
                </div>
                <Progress value={(userProgress.completedCertifications / userProgress.targetCertifications) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">CPD Hours</span>
                  <span className="text-sm text-muted-foreground">
                    {userProgress.cpdHours}/{userProgress.requiredCpdHours}
                  </span>
                </div>
                <Progress value={(userProgress.cpdHours / userProgress.requiredCpdHours) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">Networking Events</span>
                  <span className="text-sm text-muted-foreground">
                    {userProgress.networkingEvents}/{userProgress.targetNetworkingEvents}
                  </span>
                </div>
                <Progress value={(userProgress.networkingEvents / userProgress.targetNetworkingEvents) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-white">Courses Completed</span>
                  <span className="text-sm text-muted-foreground">
                    {userProgress.coursesCompleted}/{userProgress.targetCourses}
                  </span>
                </div>
                <Progress value={(userProgress.coursesCompleted / userProgress.targetCourses) * 100} />
              </div>
            </div>
            
            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-elec-yellow">Overall Score: {priorityScore}%</div>
                  <div className="text-sm text-muted-foreground">Professional Development Progress</div>
                </div>
                <div className="text-right">
                  <Badge variant={priorityScore >= 80 ? "default" : priorityScore >= 60 ? "secondary" : "destructive"}>
                    {priorityScore >= 80 ? "Excellent" : priorityScore >= 60 ? "Good" : "Needs Focus"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-elec-yellow" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="p-3 bg-elec-dark/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{deadline.item}</h4>
                    <Badge variant={deadline.priority === "High" ? "destructive" : "secondary"}>
                      {deadline.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{deadline.dueDate}</span>
                    </div>
                    <span className="text-elec-yellow">{deadline.daysRemaining} days</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{deadline.type}</div>
                </div>
              ))}
              <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                View All Deadlines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Insights */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Industry Insights & Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-elec-dark/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{insight.metric}</span>
                  <ArrowUpRight className={`h-4 w-4 ${
                    insight.trend === 'up' ? 'text-green-400' : 
                    insight.trend === 'down' ? 'text-red-400' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="text-2xl font-bold text-elec-yellow mb-1">{insight.value}</div>
                <div className="text-xs text-muted-foreground mb-2">{insight.period}</div>
                <div className="text-xs text-white">{insight.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="p-3 bg-elec-dark/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{achievement.title}</h4>
                    <Badge variant="outline">{achievement.type}</Badge>
                  </div>
                  <div className="text-sm text-elec-yellow mb-1">{achievement.provider}</div>
                  <div className="text-xs text-muted-foreground mb-2">{achievement.date}</div>
                  <div className="text-sm text-white">{achievement.impact}</div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                View Achievement History
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedActions.map((action, index) => (
                <div key={index} className="p-3 bg-elec-dark/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{action.title}</h4>
                    <Badge variant={action.urgency === "Time-sensitive" ? "destructive" : 
                                   action.urgency === "Recommended" ? "secondary" : "outline"}>
                      {action.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {action.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {action.benefit}
                    </div>
                  </div>
                  <div className="text-xs text-white">{action.provider}</div>
                </div>
              ))}
              <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                View All Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Recommendations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Personalized Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningRecommendations.map((course, index) => (
              <div key={index} className="p-4 bg-elec-dark/50 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-white">{course.title}</h4>
                    <Badge variant="outline">{course.relevance}% match</Badge>
                  </div>
                  <p className="text-sm text-elec-yellow">{course.provider}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-muted-foreground">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{course.students} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-elec-yellow font-semibold">{course.cost}</span>
                    <span className="text-sm text-muted-foreground">{course.cpdHours} CPD hours</span>
                  </div>
                  <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                    View Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalDevelopmentDashboard;
