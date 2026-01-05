import { ArrowLeft, MapPin, Shield, Map, Users, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const FireAlarmModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Zone Planning Principles and Fire Compartments",
      icon: Map,
      description: "Zone layout and fire compartment considerations"
    },
    {
      id: 2,
      title: "Detection Coverage Requirements (BS 5839)", 
      icon: Shield,
      description: "British Standard coverage requirements"
    },
    {
      id: 3,
      title: "Detector and Sounder Placement Rules",
      icon: MapPin,
      description: "Device positioning and placement guidelines"
    },
    {
      id: 4,
      title: "Designing for Accessibility and Escape Routes",
      icon: Users,
      description: "Accessibility considerations and escape route design"
    },
    {
      id: 5,
      title: "Cause and Effect Programming Basics",
      icon: Settings,
      description: "Programming cause and effect relationships"
    },
    {
      id: 6,
      title: "Planning Drawings and Fire Strategy Alignment",
      icon: FileText,
      description: "Documentation and fire strategy integration"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../fire-alarm-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Fire Alarm Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Module 3: System Design and Zone Planning
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Zone planning, coverage requirements, and system design principles
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                6 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                60 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../fire-alarm-module-3-section-${section.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {section.description}
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

export default FireAlarmModule3;