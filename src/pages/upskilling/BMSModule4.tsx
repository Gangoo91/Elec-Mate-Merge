import { ArrowLeft, Lightbulb, Sun, Lock, Blinds, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BMSModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Integration with DALI, 1–10V, and Smart Lighting",
      icon: Lightbulb,
      description: "Lighting protocols and integration methods"
    },
    {
      id: 2,
      title: "Daylight Harvesting and PIR Logic", 
      icon: Sun,
      description: "Automated lighting and daylight control"
    },
    {
      id: 3,
      title: "Access Control Basics and Door Relays",
      icon: Lock,
      description: "Security integration and door control"
    },
    {
      id: 4,
      title: "Shading, Blinds, and Façade Automation",
      icon: Blinds,
      description: "Automated shading and facade systems"
    },
    {
      id: 5,
      title: "Combined Energy Saving Scenarios (HVAC + Lighting)",
      icon: Zap,
      description: "Integrated energy optimization strategies"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bms-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BMS Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Module 4: Lighting, Access, and Environmental Control
            </h1>
            <p className="text-base text-white mb-6">
              Integrated lighting, security, and environmental systems
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                55 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../bms-module-4-section-${section.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col min-h-[48px]">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center min-h-[48px]">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-bold text-xs px-3 py-1 border-0"
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

export default BMSModule4;