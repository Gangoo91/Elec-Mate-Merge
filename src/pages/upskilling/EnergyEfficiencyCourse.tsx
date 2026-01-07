import { ArrowLeft, BookOpen, Gauge, Search, TrendingDown, BarChart, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={`../energy-efficiency-module-${module.id}`}
              className="block h-full"
            >
              <div className="bg-card/50 rounded-lg active:scale-[0.98] active:bg-card/70 transition-all duration-200 cursor-pointer h-full flex flex-col">
                <div className="text-center p-3 sm:p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                      <module.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                    </div>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-medium text-primary/70 uppercase tracking-wide mb-1">
                    Module {module.id}
                  </span>

                  <h3 className="text-sm sm:text-base font-semibold text-white leading-tight mb-1 line-clamp-2">
                    {module.title}
                  </h3>

                  <p className="text-white text-[10px] sm:text-xs">
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

export default EnergyEfficiencyCourse;
