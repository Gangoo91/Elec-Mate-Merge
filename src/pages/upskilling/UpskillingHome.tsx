import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModuleCard } from "@/components/shared/ModuleCard";
import { Search, Zap, BookOpen, Cpu, Lightbulb, Network, Home, Sun, BatteryCharging, Settings, Shield, Wrench, Activity, Wifi, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function UpskillingHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // All professional upskilling courses
  const courses = [
    {
      id: "bs7671-course",
      title: "BS 7671 Wiring Regulations",
      description: "Comprehensive guide to the 18th Edition wiring regulations",
      icon: <BookOpen className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 12,
      questionsCount: 200,
      duration: "6 weeks"
    },
    {
      id: "inspection-testing",
      title: "Inspection & Testing",
      description: "Complete guide to electrical inspection and testing procedures",
      icon: <Activity className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 8,
      questionsCount: 180,
      duration: "4 weeks"
    },
    {
      id: "pat-testing-course",
      title: "PAT Testing",
      description: "Portable appliance testing certification course",
      icon: <Shield className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 6,
      questionsCount: 120,
      duration: "2 weeks"
    },
    {
      id: "renewable-energy-course",
      title: "Renewable Energy Systems",
      description: "Solar PV, wind turbines, and sustainable energy solutions",
      icon: <Sun className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 10,
      questionsCount: 160,
      duration: "5 weeks"
    },
    {
      id: "smart-home-course",
      title: "Smart Home Technology",
      description: "Home automation, IoT devices, and intelligent systems",
      icon: <Home className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 8,
      questionsCount: 140,
      duration: "4 weeks"
    },
    {
      id: "ev-charging-course",
      title: "EV Charging Installation",
      description: "Electric vehicle charging points and infrastructure",
      icon: <BatteryCharging className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 7,
      questionsCount: 130,
      duration: "3 weeks"
    },
    {
      id: "data-cabling-course",
      title: "Data Cabling & Networks",
      description: "Structured cabling systems and network installation",
      icon: <Network className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 9,
      questionsCount: 150,
      duration: "4 weeks"
    },
    {
      id: "fiber-optics-course",
      title: "Fiber Optics",
      description: "Fiber optic cable installation and termination",
      icon: <Wifi className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 8,
      questionsCount: 140,
      duration: "4 weeks"
    },
    {
      id: "emergency-lighting-course",
      title: "Emergency Lighting Systems",
      description: "Design, installation, and testing of emergency lighting",
      icon: <Lightbulb className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 6,
      questionsCount: 110,
      duration: "3 weeks"
    },
    {
      id: "fire-alarm-course",
      title: "Fire Alarm Systems",
      description: "Fire detection and alarm system installation",
      icon: <Zap className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 8,
      questionsCount: 150,
      duration: "4 weeks"
    },
    {
      id: "bms-course",
      title: "Building Management Systems",
      description: "BMS integration and control systems",
      icon: <Settings className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 10,
      questionsCount: 180,
      duration: "5 weeks"
    },
    {
      id: "industrial-electrical-course",
      title: "Industrial Electrical Systems",
      description: "Industrial power distribution and motor control",
      icon: <Cpu className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 12,
      questionsCount: 200,
      duration: "6 weeks"
    },
    {
      id: "instrumentation-course",
      title: "Instrumentation & Control",
      description: "PLCs, sensors, and process control systems",
      icon: <Settings className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 10,
      questionsCount: 170,
      duration: "5 weeks"
    },
    {
      id: "energy-efficiency-course",
      title: "Energy Efficiency",
      description: "Energy auditing and efficiency improvements",
      icon: <Wrench className="h-4 w-4 text-elec-yellow" />,
      lessonsCount: 6,
      questionsCount: 100,
      duration: "3 weeks"
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Professional Development</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Electrical Upskilling
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Advanced courses for qualified electricians to expand your expertise
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
              )}
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow/50", !searchQuery && "pl-10")}
              />
            </div>
          </div>

          {/* Courses Grid */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-6">
              Available Courses ({filteredCourses.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <ModuleCard
                    title={course.title}
                    description={course.description}
                    category="Upskilling"
                    duration={course.duration}
                    progress={0}
                    completed={false}
                    lessonsCount={course.lessonsCount}
                    questionsCount={course.questionsCount}
                    icon={course.icon}
                    colorScheme="Upskilling"
                    onClick={() => navigate(course.id)}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No courses found</h3>
              <p className="text-sm text-white/60">
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
