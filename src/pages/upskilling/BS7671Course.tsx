import { ArrowLeft, FileText, CheckCircle, Clock, BookOpen, Book, Settings, Shield, Wrench, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Course = () => {
  const modules = [
    {
      id: 1,
      title: "Scope, Object & Fundamental Principles",
      duration: "45 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Definitions & Key Terminology",
      duration: "50 mins",
      status: "available",
      icon: Book
    },
    {
      id: 3,
      title: "General Characteristics & Selection Criteria",
      duration: "55 mins",
      status: "available",
      icon: Settings
    },
    {
      id: 4,
      title: "Protection for Safety",
      duration: "60 mins",
      status: "available",
      icon: Shield
    },
    {
      id: 5,
      title: "Selection & Erection of Equipment",
      duration: "65 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 6,
      title: "Inspection, Testing & Certification",
      duration: "55 mins",
      status: "available",
      icon: CheckCircle
    },
    {
      id: 7,
      title: "Special Installations & Locations",
      duration: "50 mins",
      status: "available",
      icon: MapPin
    },
    {
      id: 8,
      title: "Appendices & Latest Amendments",
      duration: "45 mins",
      status: "available",
      icon: FileText
    },
    {
      id: 9,
      title: "Mock Exam",
      duration: "90 mins",
      status: "available",
      icon: GraduationCap
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/electrician/upskilling">
        <Button variant="ghost" className="text-white hover:text-foreground transition-colors p-0 min-h-[48px]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          18th Edition (BS7671)
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Wiring regulations and electrical safety
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {modules.map((module) => (
            <Link key={module.id} to={`bs7671-module-${module.id}`} className="block h-full">
              <div className="bg-card/50 rounded-lg active:scale-[0.98] active:bg-card/70 transition-all duration-200 cursor-pointer h-full flex flex-col min-h-[48px]">
                <div className="text-center p-3 sm:p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                      <module.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                    </div>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-medium text-primary/70 uppercase tracking-wide mb-1">
                    Module {module.id}
                  </span>

                  <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight mb-1 line-clamp-2">
                    {module.title}
                  </h3>

                  <p className="text-muted-foreground text-[10px] sm:text-xs">
                    {module.duration}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BS7671Course;