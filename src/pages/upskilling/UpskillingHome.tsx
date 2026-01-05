import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModuleCard } from "@/components/shared/ModuleCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Zap, BookOpen, Cpu, Lightbulb, Network, Home, Sun, BatteryCharging, Cable, Settings, Shield, Wrench, Activity, Wifi } from "lucide-react";

export default function UpskillingHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // All professional upskilling courses - IDs match route paths
  const courses = [
    {
      id: "bs7671-course",
      title: "BS 7671 Wiring Regulations",
      description: "Comprehensive guide to the 18th Edition wiring regulations",
      category: "Regulations",
      duration: "12 weeks",
      progress: 0,
      lessonsCount: 45,
      questionsCount: 500,
      icon: <BookOpen className="h-4 w-4 text-primary/70" />
    },
    {
      id: "inspection-testing",
      title: "Inspection & Testing",
      description: "Complete guide to electrical inspection and testing procedures",
      category: "Testing",
      duration: "10 weeks",
      progress: 0,
      lessonsCount: 50,
      questionsCount: 480,
      icon: <Activity className="h-4 w-4 text-primary/70" />
    },
    {
      id: "pat-testing-course",
      title: "PAT Testing",
      description: "Portable appliance testing certification course",
      category: "Testing",
      duration: "4 weeks",
      progress: 0,
      lessonsCount: 20,
      questionsCount: 200,
      icon: <Shield className="h-4 w-4 text-primary/70" />
    },
    {
      id: "renewable-energy-course",
      title: "Renewable Energy Systems",
      description: "Solar PV, wind turbines, and sustainable energy solutions",
      category: "Renewable",
      duration: "10 weeks",
      progress: 0,
      lessonsCount: 38,
      questionsCount: 420,
      icon: <Sun className="h-4 w-4 text-primary/70" />
    },
    {
      id: "smart-home-course",
      title: "Smart Home Technology",
      description: "Home automation, IoT devices, and intelligent systems",
      category: "Technology",
      duration: "8 weeks",
      progress: 0,
      lessonsCount: 32,
      questionsCount: 350,
      icon: <Home className="h-4 w-4 text-primary/70" />
    },
    {
      id: "ev-charging-course",
      title: "EV Charging Installation",
      description: "Electric vehicle charging points and infrastructure",
      category: "EV",
      duration: "6 weeks",
      progress: 0,
      lessonsCount: 24,
      questionsCount: 280,
      icon: <BatteryCharging className="h-4 w-4 text-primary/70" />
    },
    {
      id: "data-cabling-course",
      title: "Data Cabling & Networks",
      description: "Structured cabling systems and network installation",
      category: "Networks",
      duration: "8 weeks",
      progress: 0,
      lessonsCount: 30,
      questionsCount: 320,
      icon: <Network className="h-4 w-4 text-primary/70" />
    },
    {
      id: "fiber-optics-course",
      title: "Fiber Optics",
      description: "Fiber optic cable installation and termination",
      category: "Networks",
      duration: "6 weeks",
      progress: 0,
      lessonsCount: 24,
      questionsCount: 260,
      icon: <Wifi className="h-4 w-4 text-primary/70" />
    },
    {
      id: "emergency-lighting-course",
      title: "Emergency Lighting Systems",
      description: "Design, installation, and testing of emergency lighting",
      category: "Lighting",
      duration: "5 weeks",
      progress: 0,
      lessonsCount: 20,
      questionsCount: 240,
      icon: <Lightbulb className="h-4 w-4 text-primary/70" />
    },
    {
      id: "fire-alarm-course",
      title: "Fire Alarm Systems",
      description: "Fire detection and alarm system installation",
      category: "Safety",
      duration: "7 weeks",
      progress: 0,
      lessonsCount: 28,
      questionsCount: 300,
      icon: <Zap className="h-4 w-4 text-primary/70" />
    },
    {
      id: "bms-course",
      title: "Building Management Systems",
      description: "BMS integration and control systems",
      category: "Commercial",
      duration: "9 weeks",
      progress: 0,
      lessonsCount: 35,
      questionsCount: 380,
      icon: <Settings className="h-4 w-4 text-primary/70" />
    },
    {
      id: "industrial-electrical-course",
      title: "Industrial Electrical Systems",
      description: "Industrial power distribution and motor control",
      category: "Industrial",
      duration: "10 weeks",
      progress: 0,
      lessonsCount: 40,
      questionsCount: 450,
      icon: <Cpu className="h-4 w-4 text-primary/70" />
    },
    {
      id: "instrumentation-course",
      title: "Instrumentation & Control",
      description: "PLCs, sensors, and process control systems",
      category: "Industrial",
      duration: "12 weeks",
      progress: 0,
      lessonsCount: 48,
      questionsCount: 520,
      icon: <Settings className="h-4 w-4 text-primary/70" />
    },
    {
      id: "energy-efficiency-course",
      title: "Energy Efficiency",
      description: "Energy auditing and efficiency improvements",
      category: "Renewable",
      duration: "6 weeks",
      progress: 0,
      lessonsCount: 22,
      questionsCount: 240,
      icon: <Wrench className="h-4 w-4 text-primary/70" />
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(courses.map(c => c.category)));

  const filterByCategory = (category?: string) => {
    if (!category) return filteredCourses;
    return filteredCourses.filter(course => course.category === category);
  };

  const completedCount = courses.filter(c => c.progress === 100).length;
  const inProgressCount = courses.filter(c => c.progress > 0 && c.progress < 100).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Professional Upskilling
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Advanced electrical courses for qualified electricians
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Total</div>
                <div className="text-2xl font-bold text-foreground">{courses.length}</div>
              </div>
              <div className="bg-warning/10 rounded-lg p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">In Progress</div>
                <div className="text-2xl font-bold text-warning">{inProgressCount}</div>
              </div>
              <div className="bg-success/10 rounded-lg p-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Completed</div>
                <div className="text-2xl font-bold text-success">{completedCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto mb-6 flex-wrap h-auto">
            <TabsTrigger value="all">
              All ({filteredCourses.length})
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category} ({filterByCategory(category).length})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <ModuleCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  duration={course.duration}
                  progress={course.progress}
                  completed={course.progress === 100}
                  lessonsCount={course.lessonsCount}
                  questionsCount={course.questionsCount}
                  icon={course.icon}
                  onClick={() => navigate(`/electrician/upskilling/${course.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterByCategory(category).map((course) => (
                  <ModuleCard
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    category={course.category}
                    duration={course.duration}
                    progress={course.progress}
                    completed={course.progress === 100}
                    lessonsCount={course.lessonsCount}
                    questionsCount={course.questionsCount}
                    icon={course.icon}
                    onClick={() => navigate(`/electrician/upskilling/${course.id}`)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
