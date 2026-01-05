import { ArrowLeft, Settings, CheckCircle, Clock, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 mb-4 sm:mb-6 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Industrial Electrical Systems
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              High voltage systems, motor control, and industrial automation
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-[10px] sm:text-xs">
                Expert Level
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] sm:text-xs">
                8 Modules
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] sm:text-xs">
                14 weeks
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link
                key={module.id}
                to={module.isExam ? `../industrial-electrical-mock-exam` : `../industrial-electrical-module-${module.id}`}
                className="block h-full"
              >
                <Card className={`bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98] ${module.isExam ? 'ring-2 ring-primary/30' : ''}`}>
                  <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {module.isExam ? (
                          <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                        ) : (
                          <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Badge
                        variant="secondary"
                        className={`${module.isExam ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'} hover:bg-primary/20 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 border-0`}
                      >
                        {module.isExam ? 'Mock Exam' : `Module ${module.id}`}
                      </Badge>
                    </div>

                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                      {module.title}
                    </h3>

                    <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                      Duration: {module.duration}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalCourse;