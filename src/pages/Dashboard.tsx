
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, BookOpen, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock user data - would come from auth context
  const user = {
    name: "Guest User",
    role: "visitor",
    completedLessons: 0,
    totalLessons: 48,
  };

  // Mock data for recent courses
  const recentCourses = [
    {
      id: 1,
      title: "Electrical Installation Fundamentals",
      progress: 0,
      category: "Core Units",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Circuit Design & Analysis",
      progress: 0,
      category: "Theory",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Safe Working Practices",
      progress: 0,
      category: "Health & Safety",
      image: "/placeholder.svg",
    },
  ];
  
  // Mock data for popular courses
  const popularCourses = [
    {
      id: 4,
      title: "Wiring Regulations BS 7671",
      students: 1245,
      category: "Regulations",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Fault Finding Techniques",
      students: 987,
      category: "Practical Skills",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Inspection & Testing",
      students: 762,
      category: "Certification",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ElecMate, your electrical career companion.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.completedLessons}/{user.totalLessons}
            </div>
            <p className="text-xs text-muted-foreground">
              Lessons completed
            </p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
            <Clock className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 days</div>
            <p className="text-xs text-muted-foreground">
              Start learning to build your streak
            </p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Trophy className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Complete lessons to rank up
            </p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,452</div>
            <p className="text-xs text-muted-foreground">
              Active users this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trial Status */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Free Trial Mode</h3>
              <p className="text-sm text-muted-foreground">
                You're currently accessing ElecMate in trial mode. Upgrade to unlock all features.
              </p>
            </div>
            <Button asChild>
              <Link to="/subscriptions">
                Upgrade Now
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray">
                <div className="aspect-video relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-elec-dark/80 text-xs px-2 py-1 rounded">
                    {course.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {course.progress}% complete
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Play className="h-3.5 w-3.5" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray">
                <div className="aspect-video relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-elec-dark/80 text-xs px-2 py-1 rounded">
                    {course.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {course.students} students
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Play className="h-3.5 w-3.5" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Access Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Apprentice Hub</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Access structured learning paths and study materials designed for electrical apprentices.
            </p>
            <Button asChild>
              <Link to="/apprentice">Explore Hub</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Electrician Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Boost your efficiency with professional calculators, templates, and project tools.
            </p>
            <Button asChild>
              <Link to="/electrician">View Tools</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
