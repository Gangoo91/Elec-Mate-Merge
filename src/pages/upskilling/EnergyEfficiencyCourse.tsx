import React from 'react';
import { ArrowLeft, BookOpen, Gauge, Search, TrendingDown, BarChart, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const EnergyEfficiencyCourse = () => {
  const modules: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }> = [
    {
      id: 1,
      title: "Introduction to Energy Efficiency",
      description: "Understanding the fundamentals of energy efficiency",
      duration: "45 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Power Quality and Load Analysis",
      description: "Power quality issues and load characteristics",
      duration: "55 mins",
      icon: Gauge
    },
    {
      id: 3,
      title: "Energy Auditing Methods",
      description: "Comprehensive auditing techniques",
      duration: "60 mins",
      icon: Search
    },
    {
      id: 4,
      title: "Reducing Demand and Improving Efficiency",
      description: "Practical measures for efficiency",
      duration: "50 mins",
      icon: TrendingDown
    },
    {
      id: 5,
      title: "Monitoring, Analytics, and Smart Metering",
      description: "Advanced monitoring systems",
      duration: "55 mins",
      icon: BarChart
    },
    {
      id: 6,
      title: "Regulations, Carbon Compliance, and ROI",
      description: "Compliance and financial modelling",
      duration: "40 mins",
      icon: FileCheck
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Energy Efficiency & Management
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Power quality analysis, energy auditing, and optimisation strategies
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={`../energy-efficiency-module-${module.id}`}
              moduleNumber={module.id}
              title={module.title}
              description={module.description}
              duration={module.duration}
              icon={module.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyCourse;
