import { ArrowLeft, Thermometer, MapPin, Gauge, Calendar, Building, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Smart Thermostats and Room Zoning",
      icon: Thermometer,
      description: "Installing and configuring smart heating controls"
    },
    {
      id: 2,
      title: "Radiator Valves, Boilers, and Heat Pumps", 
      icon: MapPin,
      description: "Integrating with different heating system types"
    },
    {
      id: 3,
      title: "Environmental Sensors (Humidity, CO2, Air Quality)",
      icon: Gauge,
      description: "Monitoring and responding to environmental conditions"
    },
    {
      id: 4,
      title: "Schedule vs AI Learning Control",
      icon: Calendar,
      description: "Different approaches to heating automation"
    },
    {
      id: 5,
      title: "HVAC Integration and Interlocks",
      icon: Building,
      description: "Connecting heating systems with other building services"
    },
    {
      id: 6,
      title: "BMS Light Integration for Larger Sites",
      icon: Network,
      description: "Scaling up to building management system integration"
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
            <h1 className="text-3xl font-bold text-white mb-4">
              Module 4: Heating, HVAC, and Environmental Control
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Smart heating systems and environmental monitoring
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4
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
                to={section.id === 1 ? "smart-home-module-4-section-1" : section.id === 2 ? "smart-home-module-4-section-2" : section.id === 3 ? "smart-home-module-4-section-3" : section.id === 4 ? "smart-home-module-4-section-4" : section.id === 5 ? "smart-home-module-4-section-5" : section.id === 6 ? "smart-home-module-4-section-6" : "#"}
                className="block"
              >
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule4;