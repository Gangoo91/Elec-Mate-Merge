import { ArrowLeft, BookOpen, Gauge, Search, TrendingDown, BarChart, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EnergyEfficiencyCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Energy Efficiency",
      duration: "45 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Power Quality and Load Analysis",
      duration: "55 mins",
      status: "available",
      icon: Gauge
    },
    {
      id: 3,
      title: "Energy Auditing Methods",
      duration: "60 mins",
      status: "available",
      icon: Search
    },
    {
      id: 4,
      title: "Reducing Demand and Improving Efficiency",
      duration: "50 mins",
      status: "available",
      icon: TrendingDown
    },
    {
      id: 5,
      title: "Monitoring, Analytics, and Smart Metering",
      duration: "55 mins",
      status: "available",
      icon: BarChart
    },
    {
      id: 6,
      title: "Regulations, Carbon Compliance, and ROI",
      duration: "40 mins",
      status: "available",
      icon: FileCheck
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/electrician/upskilling">
        <Button variant="ghost" className="text-white hover:text-foreground transition-colors min-h-[48px] px-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Energy Efficiency & Management
        </h1>
        <p className="text-sm sm:text-base text-white">
          Power quality analysis, energy auditing, and optimisation strategies
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
              <Link
                to={`../energy-efficiency-module-${module.id}`}
                className="block h-full"
              >
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

export default EnergyEfficiencyCourse;
