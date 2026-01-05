import { ArrowLeft, Settings, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IndustrialElectricalCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Overview of Industrial Electrical Distribution",
      duration: "50 mins",
      status: "available"
    },
    {
      id: 2,
      title: "Motors, Starters, and Control Gear",
      duration: "65 mins",
      status: "available"
    },
    {
      id: 3,
      title: "Industrial Panel Assembly and Layout",
      duration: "60 mins",
      status: "available"
    },
    {
      id: 4,
      title: "PLC Basics and System Integration",
      duration: "70 mins",
      status: "available"
    },
    {
      id: 5,
      title: "Industrial Fault Finding and Troubleshooting",
      duration: "65 mins",
      status: "available"
    },
    {
      id: 6,
      title: "Cable Types, Containment, and Routing",
      duration: "55 mins",
      status: "available"
    },
    {
      id: 7,
      title: "Power Factor Correction and Harmonics",
      duration: "60 mins",
      status: "available"
    },
    {
      id: 8,
      title: "Industrial Safety, Isolation, and Lock-off",
      duration: "45 mins",
      status: "available"
    },
    {
      id: "exam",
      title: "Mock Exam",
      duration: "120 mins",
      status: "available",
      isExam: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - full width */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 pb-4 sm:pb-6">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground transition-colors mb-3 sm:mb-4 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Industrial Electrical Systems
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            High voltage systems, motor control, and industrial automation
          </p>
        </div>
      </div>

      {/* Module Grid - full width */}
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.isExam ? `../industrial-electrical-mock-exam` : `../industrial-electrical-module-${module.id}`}
              className="block h-full"
            >
              <div className={`bg-card/50 rounded-lg active:scale-[0.98] active:bg-card/70 transition-all duration-200 cursor-pointer h-full flex flex-col ${module.isExam ? 'ring-2 ring-primary/30' : ''}`}>
                <div className="text-center p-3 sm:p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                      {module.isExam ? (
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                      ) : (
                        <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-medium text-primary/70 uppercase tracking-wide mb-1">
                    {module.isExam ? 'Mock Exam' : `Module ${module.id}`}
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
    </div>
  );
};

export default IndustrialElectricalCourse;
