import { ArrowLeft, Gauge, Plug, Smartphone, Cable, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EVChargingModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Mode 1–4 and Charging Speeds",
      icon: Gauge,
      description: "Understanding charging modes and power levels"
    },
    {
      id: 2,
      title: "Socketed vs Tethered EVSE", 
      icon: Plug,
      description: "Different EVSE connection types and their applications"
    },
    {
      id: 3,
      title: "Smart Chargers, App Control, and APIs",
      icon: Smartphone,
      description: "Connected charging systems and remote management"
    },
    {
      id: 4,
      title: "IEC 61851, 62196 Connectors",
      icon: Cable,
      description: "International charging standards and connector types"
    },
    {
      id: 5,
      title: "Compatibility by Manufacturer (BMW, Tesla, etc.)",
      icon: Car,
      description: "Vehicle-specific charging requirements and compatibility"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../ev-charging-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EV Charging Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 2: EVSE Types, Modes, and Standards
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding charging equipment types and international standards
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
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
            {sections.map((section) => (
              <Link key={section.id} to={`../ev-charging-module-2-section-${section.id}`}>
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

export default EVChargingModule2;