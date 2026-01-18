import React from 'react';
import { ArrowLeft, BookOpen, Thermometer, Zap, BarChart, RotateCcw, Target, Cable, Search, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const InstrumentationCourse = () => {
  const modules: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Introduction to Electrical Instrumentation",
      description: "Fundamentals and applications of instrumentation",
      duration: "50 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Sensors and Transducers Explained",
      description: "Function, types, and selection of sensors",
      duration: "55 mins",
      icon: Thermometer
    },
    {
      id: 3,
      title: "Signal Types, Conditioning, and Scaling",
      description: "Signal processing and conditioning techniques",
      duration: "60 mins",
      icon: Zap
    },
    {
      id: 4,
      title: "Measurement of Electrical Quantities",
      description: "Techniques and equipment for measurements",
      duration: "50 mins",
      icon: BarChart
    },
    {
      id: 5,
      title: "Control Loops and Feedback Systems",
      description: "Control theory and feedback systems",
      duration: "65 mins",
      icon: RotateCcw
    },
    {
      id: 6,
      title: "Calibration Methods and Standards",
      description: "Calibration procedures and certification",
      duration: "45 mins",
      icon: Target
    },
    {
      id: 7,
      title: "Instrumentation Wiring and 4–20mA Loops",
      description: "Current loop systems and wiring standards",
      duration: "55 mins",
      icon: Cable
    },
    {
      id: 8,
      title: "Fault Finding, Diagnostics, and Maintenance",
      description: "Troubleshooting and maintenance procedures",
      duration: "60 mins",
      icon: Search
    },
    {
      id: 9,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "120 mins",
      icon: Award,
      isExam: true
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            Instrumentation
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Industrial instrumentation systems, control loops, and measurement techniques
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../instrumentation-mock-exam` : `../instrumentation-module-${module.id}`}
              moduleNumber={module.id}
              title={module.title}
              description={module.description}
              duration={module.duration}
              icon={module.icon}
              isExam={module.isExam}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstrumentationCourse;
