import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap, BookOpen, Cpu, Lightbulb, Network, Home, Sun, BatteryCharging, Cable, Settings, Shield, Wrench, Activity, Wifi, ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Simple course card matching apprentice study centre style
interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function CourseCard({ title, description, icon, href }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-300 h-full min-h-[120px] cursor-pointer",
        "bg-white/5 border border-white/10 rounded-xl",
        "hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
        "hover:shadow-lg hover:shadow-black/20"
      )}
      onClick={() => navigate(href)}
    >
      {/* Accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

      {/* Hover glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-elec-yellow to-amber-500" />

      <div className="relative p-4 sm:p-5">
        <div className="flex items-start gap-4">
          {/* Icon container */}
          <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0 transition-colors bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10 group-hover:from-elec-yellow/30 group-hover:to-amber-500/30">
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base mb-1.5 leading-tight text-white group-hover:text-elec-yellow/90 transition-colors">
              {title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 text-white/50">
              {description}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors shrink-0 self-center">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/40 group-hover:text-elec-yellow transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpskillingHome() {
  const [searchQuery, setSearchQuery] = useState("");

  // All professional upskilling courses
  const courses = [
    {
      id: "bs7671-course",
      title: "BS 7671 Wiring Regulations",
      description: "Comprehensive guide to the 18th Edition wiring regulations",
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "inspection-testing",
      title: "Inspection & Testing",
      description: "Complete guide to electrical inspection and testing procedures",
      icon: <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "pat-testing-course",
      title: "PAT Testing",
      description: "Portable appliance testing certification course",
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "renewable-energy-course",
      title: "Renewable Energy Systems",
      description: "Solar PV, wind turbines, and sustainable energy solutions",
      icon: <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "smart-home-course",
      title: "Smart Home Technology",
      description: "Home automation, IoT devices, and intelligent systems",
      icon: <Home className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "ev-charging-course",
      title: "EV Charging Installation",
      description: "Electric vehicle charging points and infrastructure",
      icon: <BatteryCharging className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "data-cabling-course",
      title: "Data Cabling & Networks",
      description: "Structured cabling systems and network installation",
      icon: <Network className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "fiber-optics-course",
      title: "Fiber Optics",
      description: "Fiber optic cable installation and termination",
      icon: <Wifi className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "emergency-lighting-course",
      title: "Emergency Lighting Systems",
      description: "Design, installation, and testing of emergency lighting",
      icon: <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "fire-alarm-course",
      title: "Fire Alarm Systems",
      description: "Fire detection and alarm system installation",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "bms-course",
      title: "Building Management Systems",
      description: "BMS integration and control systems",
      icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "industrial-electrical-course",
      title: "Industrial Electrical Systems",
      description: "Industrial power distribution and motor control",
      icon: <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "instrumentation-course",
      title: "Instrumentation & Control",
      description: "PLCs, sensors, and process control systems",
      icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    },
    {
      id: "energy-efficiency-course",
      title: "Energy Efficiency",
      description: "Energy auditing and efficiency improvements",
      icon: <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow/50"
              />
            </div>
          </div>

          {/* Courses Grid */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-6">
              Available Courses ({filteredCourses.length})
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  icon={course.icon}
                  href={course.id}
                />
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
