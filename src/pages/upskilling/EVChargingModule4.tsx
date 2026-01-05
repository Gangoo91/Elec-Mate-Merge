import { ArrowLeft, Anchor, AlertTriangle, Eye, Pickaxe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EVChargingModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Earthing System Selection: TT, TN-S, TN-C-S",
      icon: Anchor,
      description: "Understanding and selecting appropriate earthing systems"
    },
    {
      id: 2,
      title: "Open PEN Fault Protection Methods", 
      icon: AlertTriangle,
      description: "Protecting against open PEN conductor faults"
    },
    {
      id: 3,
      title: "Use of Monitoring Devices and Relays",
      icon: Eye,
      description: "Installing monitoring equipment for enhanced protection"
    },
    {
      id: 4,
      title: "Earth Rod Installation and Testing",
      icon: Pickaxe,
      description: "Proper earth electrode installation and verification"
    },
    {
      id: 5,
      title: "Surge and Lightning Protection (SPD)",
      icon: Zap,
      description: "Protecting EV charging systems from electrical surges"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../ev-charging-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EV Charging Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 4: Earthing and Protection Considerations
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Essential earthing and protection requirements for EV charging
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                45 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => {
              const sectionPath = section.id === 1 ? "/ev-charging-module-4-section-1" : 
                                  section.id === 2 ? "/ev-charging-module-4-section-2" :
                                  section.id === 3 ? "/ev-charging-module-4-section-3" :
                                  section.id === 4 ? "/ev-charging-module-4-section-4" :
                                  section.id === 5 ? "/ev-charging-module-4-section-5" : "#";
              
              return (
                <Link key={section.id} to={sectionPath}>
                  <Card 
                    className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                  >
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

export default EVChargingModule4;