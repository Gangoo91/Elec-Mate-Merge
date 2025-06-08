
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Award, BookOpen, Target, Clock, Star, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProfessionalDevelopmentDashboard = () => {
  const progressData = {
    overallProgress: 68,
    careerLevel: "Level 2 Apprentice",
    timeToCompletion: "8 months",
    creditsEarned: 45,
    totalCredits: 78,
    skillsAssessed: 12,
    totalSkills: 20
  };

  const quickStats = [
    { 
      label: "CPD Hours", 
      value: "32", 
      target: "50", 
      icon: Clock, 
      color: "text-blue-400",
      trend: "+8 this month"
    },
    { 
      label: "Certifications", 
      value: "3", 
      target: "5", 
      icon: Award, 
      color: "text-green-400",
      trend: "18th Edition complete"
    },
    { 
      label: "Skills Progress", 
      value: "75%", 
      target: "100%", 
      icon: TrendingUp, 
      color: "text-purple-400",
      trend: "Above average"
    },
    { 
      label: "Next Milestone", 
      value: "6 weeks", 
      target: "Level 3", 
      icon: Target, 
      color: "text-elec-yellow",
      trend: "On track"
    }
  ];

  const featuredOpportunities = [
    {
      title: "Level 3 Electrical Installation",
      type: "Qualification",
      provider: "City & Guilds",
      duration: "12 months",
      nextStart: "September 2024",
      popularity: "Most Popular",
      description: "Advanced electrical installation qualification for progression to senior electrician roles."
    },
    {
      title: "18th Edition Amendment 3",
      type: "Update Course",
      provider: "EAL",
      duration: "3 days",
      nextStart: "Next month",
      popularity: "Required",
      description: "Stay current with the latest wiring regulations and compliance requirements."
    },
    {
      title: "Solar PV Installation",
      type: "Specialisation",
      provider: "NICEIC",
      duration: "5 days",
      nextStart: "2 weeks",
      popularity: "High Demand",
      description: "Expand your skills into renewable energy with photovoltaic installation certification."
    }
  ];

  const recentAchievements = [
    { title: "Health & Safety Assessment", date: "2 days ago", score: "94%" },
    { title: "Electrical Theory Module", date: "1 week ago", score: "87%" },
    { title: "On-site Skills Evaluation", date: "2 weeks ago", score: "Excellent" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Overview */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray via-elec-dark/50 to-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-elec-yellow mb-2">
                Your Professional Development Journey
              </CardTitle>
              <p className="text-muted-foreground">
                Track your progress, discover opportunities, and advance your electrical career
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-elec-yellow">{progressData.overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current Level</div>
              <div className="font-semibold text-white">{progressData.careerLevel}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Estimated Completion</div>
              <div className="font-semibold text-white">{progressData.timeToCompletion}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Credits Progress</div>
              <div className="font-semibold text-white">
                {progressData.creditsEarned} / {progressData.totalCredits}
              </div>
            </div>
          </div>
          <Progress value={progressData.overallProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <Badge variant="outline" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">Target: {stat.target}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Opportunities */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Featured Development Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {featuredOpportunities.map((opportunity, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {opportunity.type}
                    </Badge>
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                      {opportunity.popularity}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{opportunity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {opportunity.description}
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground mb-3">
                    <div>Provider: {opportunity.provider}</div>
                    <div>Duration: {opportunity.duration}</div>
                    <div>Next start: {opportunity.nextStart}</div>
                  </div>
                  <Button size="sm" className="w-full bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-elec-yellow" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.date}</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {achievement.score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
                <Calendar className="mr-2 h-4 w-4" />
                Book Training Course
              </Button>
              <Button variant="outline" className="w-full justify-start border-elec-yellow/30">
                <BookOpen className="mr-2 h-4 w-4" />
                Update CPD Log
              </Button>
              <Button variant="outline" className="w-full justify-start border-elec-yellow/30">
                <Users className="mr-2 h-4 w-4" />
                Find Study Groups
              </Button>
              <Button variant="outline" className="w-full justify-start border-elec-yellow/30">
                <TrendingUp className="mr-2 h-4 w-4" />
                Skills Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDevelopmentDashboard;
