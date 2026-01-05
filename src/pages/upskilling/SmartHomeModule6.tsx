import { ArrowLeft, CircleDot, Mic, ArrowUpDown, Settings, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeModule6 = () => {
  const sections = [
    {
      id: 1,
      title: "Hub Types (Home Assistant, SmartThings, proprietary)",
      icon: CircleDot,
      description: "Understanding different smart home hub options"
    },
    {
      id: 2,
      title: "Alexa, Google Home, Siri Integration", 
      icon: Mic,
      description: "Connecting smart homes with voice assistants"
    },
    {
      id: 3,
      title: "Voice Control Logic and Routine Mapping",
      icon: Settings,
      description: "Programming voice commands and automation routines"
    },
    {
      id: 4,
      title: "Bridging Systems and Legacy Devices",
      icon: ArrowUpDown,
      description: "Integrating older systems with modern smart home platforms"
    },
    {
      id: 5,
      title: "Troubleshooting Ecosystem Conflicts",
      icon: AlertTriangle,
      description: "Resolving compatibility issues between different systems"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Smart Home Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 6: Smart Hubs, Voice Assistants, and Interoperability
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Centralising control and ensuring system compatibility
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                50 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => {
              const getPath = (id: number) => {
                switch(id) {
                  case 1: return "/smart-home-module-6-section-1";
                  case 2: return "/smart-home-module-6-section-2";
                  case 3: return "/smart-home-module-6-section-3";
                  case 4: return "/smart-home-module-6-section-4";
                  case 5: return "/smart-home-module-6-section-5";
                  default: return "#";
                }
              };

              return (
                <Link 
                  key={section.id}
                  to={getPath(section.id)}
                >
                  <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                    <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule6;