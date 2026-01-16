import { ArrowLeft, Cable, BookOpen, Layers, Package, Wrench, FileCheck, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FiberOpticsCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Fibre Optics",
      duration: "45 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Fibre Types and Connectors",
      duration: "50 mins",
      status: "available",
      icon: Layers
    },
    {
      id: 3,
      title: "Fibre Optic Cables and Installation",
      duration: "55 mins",
      status: "available",
      icon: Cable
    },
    {
      id: 4,
      title: "Termination and Splicing Techniques",
      duration: "60 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 5,
      title: "Fibre Testing and Certification",
      duration: "50 mins",
      status: "available",
      icon: FileCheck
    },
    {
      id: 6,
      title: "Standards and Network Design Principles",
      duration: "45 mins",
      status: "available",
      icon: MapPin
    },
    {
      id: 7,
      title: "Fault Finding, Maintenance, and Upgrades",
      duration: "55 mins",
      status: "available",
      icon: Package
    },
    {
      id: "exam",
      title: "Mock Exam",
      duration: "90 mins",
      status: "available",
      icon: GraduationCap,
      isExam: true
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/electrician/upskilling">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Fiber Optics Technology
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Optical fiber installation, fusion splicing, and OTDR testing procedures
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={module.isExam ? `../fiber-optics-mock-exam` : `../fiber-optics-module-${module.id}`}
                className="block h-full"
              >
                <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[160px] flex flex-col ${module.isExam ? 'ring-2 ring-elec-yellow/30' : ''}`}>
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
                      {module.isExam ? 'Mock Exam' : `Module ${module.id}`}
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

export default FiberOpticsCourse;
