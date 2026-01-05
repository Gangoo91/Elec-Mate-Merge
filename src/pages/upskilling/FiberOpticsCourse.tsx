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
      <div className="px-8 pt-8 pb-12">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Fiber Optics Technology
            </h1>
            <p className="text-xl text-white">
              Optical fiber installation, fusion splicing, and OTDR testing procedures
            </p>
            <div className="flex gap-4 mt-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Advanced Level
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                7 Modules
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                8 weeks duration
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link 
                key={module.id} 
                to={module.isExam ? `../fiber-optics-mock-exam` : `../fiber-optics-module-${module.id}`}
                className="h-full"
              >
                <Card className={`bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col ${module.isExam ? 'ring-2 ring-yellow-400/50' : ''}`}>
                <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center">
                    <module.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                  </div>
                  
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className={`${module.isExam ? 'bg-yellow-600/40 text-yellow-400' : 'bg-yellow-600/40 text-yellow-400'} hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0`}
                      >
                        {module.isExam ? 'Mock Exam' : `Module ${module.id}`}
                      </Badge>
                    </div>
                  
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {module.title}
                  </h3>
                  
                  <p className="text-white text-xs leading-relaxed">
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