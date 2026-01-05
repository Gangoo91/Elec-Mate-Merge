import { ArrowLeft, Cable, BookOpen, Layers, Package, Wrench, FileCheck, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
              Fiber Optics Technology
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              Optical fiber installation, fusion splicing, and OTDR testing procedures
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-[10px] sm:text-xs">
                Advanced Level
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] sm:text-xs">
                7 Modules
              </Badge>
              <Badge variant="outline" className="border-border text-muted-foreground text-[10px] sm:text-xs">
                8 weeks
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link
                key={module.id}
                to={module.isExam ? `../fiber-optics-mock-exam` : `../fiber-optics-module-${module.id}`}
                className="block h-full"
              >
                <Card className={`bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98] ${module.isExam ? 'ring-2 ring-primary/30' : ''}`}>
                  <CardContent className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <module.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={2.5} />
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

export default FiberOpticsCourse;