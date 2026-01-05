import { ArrowLeft, Cable, CheckCircle, Clock, BookOpen, Layers, Wifi, Package, Wrench, FileCheck, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DataCablingCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Structured Cabling Systems",
      duration: "45 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Copper Cabling Standards (Cat5e, Cat6, etc.)",
      duration: "50 mins",
      status: "available",
      icon: Cable
    },
    {
      id: 3,
      title: "Fibre Optics: Types, Termination, and Testing",
      duration: "60 mins",
      status: "available",
      icon: Wifi
    },
    {
      id: 4,
      title: "Containment, Labelling, and Installation Best Practices",
      duration: "55 mins",
      status: "available",
      icon: Package
    },
    {
      id: 5,
      title: "Termination and Certification Procedures",
      duration: "50 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 6,
      title: "TIA/EIA and ISO Cabling Standards Explained",
      duration: "40 mins",
      status: "available",
      icon: FileCheck
    },
    {
      id: "exam",
      title: "Mock Exam",
      duration: "75 mins",
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
              Data & Communications Cabling
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              Structured cabling systems, fiber optics, and network infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link
                key={module.id}
                to={module.isExam ? `../data-cabling-mock-exam` : `../data-cabling-module-${module.id}`}
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

export default DataCablingCourse;