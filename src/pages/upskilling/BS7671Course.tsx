import { ArrowLeft, FileText, CheckCircle, Clock, BookOpen, Book, Settings, Shield, Wrench, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`bs7671-module-${module.id}`} className="block h-full">
                <div className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[160px] flex flex-col">
                  {/* Accent line at top */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                  {/* Hover glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                  <div className="relative text-center flex-grow flex flex-col justify-center">
                    {/* Icon with gradient bg */}
                    <div className="flex justify-center mb-3">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                        <module.icon className="h-5 w-5 text-elec-yellow" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Module label */}
                    <span className="text-[10px] font-semibold text-elec-yellow/70 uppercase tracking-wider mb-1">
                      Module {module.id}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-elec-yellow transition-colors">
                      {module.title}
                    </h3>

                    {/* Duration */}
                    <p className="text-white/50 text-xs">
                      {module.duration}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default BS7671Course;