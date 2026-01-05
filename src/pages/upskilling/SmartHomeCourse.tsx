import { ArrowLeft, Home, CheckCircle, Clock, BookOpen, Wifi, Lightbulb, Thermometer, Shield, Smartphone, Wrench, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeCourse = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Smart Home Systems",
      duration: "40 mins",
      status: "available",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Smart Protocols: Zigbee, Z-Wave, Wi-Fi, and More",
      duration: "55 mins",
      status: "available",
      icon: Wifi
    },
    {
      id: 3,
      title: "Smart Lighting and Scene Programming",
      duration: "50 mins",
      status: "available",
      icon: Lightbulb
    },
    {
      id: 4,
      title: "Heating, HVAC, and Environmental Control",
      duration: "60 mins",
      status: "available",
      icon: Thermometer
    },
    {
      id: 5,
      title: "Access Control, CCTV, and Security Integration",
      duration: "55 mins",
      status: "available",
      icon: Shield
    },
    {
      id: 6,
      title: "Smart Hubs, Voice Assistants, and Interoperability",
      duration: "45 mins",
      status: "available",
      icon: Smartphone
    },
    {
      id: 7,
      title: "Installation, Testing, and Safety Requirements",
      duration: "50 mins",
      status: "available",
      icon: Wrench
    },
    {
      id: 8,
      title: "Mock Exam",
      duration: "60 mins",
      status: "available",
      icon: ClipboardCheck
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
              Smart Home Technology
            </h1>
            <p className="text-xl text-white">
              Home automation, IoT integration, and intelligent building systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {modules.map((module) => (
              <Link 
                key={module.id} 
                to={`../smart-home-module-${module.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <module.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Module {module.id}
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

export default SmartHomeCourse;