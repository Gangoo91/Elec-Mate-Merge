import { ArrowLeft, Shield, BookOpen, Layers, MapPin, Battery, Wrench, FileCheck, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EmergencyLightingCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Module 1: Introduction to Emergency Lighting",
      duration: "40 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Module 2: System Categories and Lighting Types",
      duration: "45 mins",
      status: "available",
      icon: Layers
    },
    {
      id: 3,
      title: "Module 3: Design Requirements and Placement",
      duration: "50 mins",
      status: "available",
      icon: MapPin
    },
    {
      id: 4,
      title: "Module 4: Cabling, Battery Backup, and Circuiting",
      duration: "55 mins",
      status: "available",
      icon: Battery
    },
    {
      id: 5,
      title: "Module 5: Installation, Testing, and Maintenance",
      duration: "50 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 6,
      title: "Module 6: Regulatory Compliance and BS 5266",
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
            <h1 className="text-2xl font-bold text-white mb-4">
              Emergency Lighting Systems
            </h1>
            <p className="text-lg text-white">
              Emergency lighting design, testing schedules, and BS 5266 compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link
                key={module.id}
                to={module.isExam ? `../emergency-lighting-mock-exam` : `../emergency-lighting-module-${module.id}`}
                className="h-full"
              >
                <Card className={`bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col ${module.isExam ? 'ring-2 ring-yellow-400/50' : ''}`}>
                <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                  <div className="flex justify-center">
                    <module.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
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

export default EmergencyLightingCourse;
