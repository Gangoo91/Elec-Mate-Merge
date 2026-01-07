import { ArrowLeft, Shield, Eye, Target, Settings, MapPin, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EmergencyLightingModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Section 1: Emergency Escape Lighting",
      icon: Shield,
      description: "Exit route and escape path lighting requirements"
    },
    {
      id: 2,
      title: "Section 2: Open Area (Anti-Panic) Lighting", 
      icon: Eye,
      description: "General area lighting to prevent panic"
    },
    {
      id: 3,
      title: "Section 3: High-Risk Task Area Lighting",
      icon: Target,
      description: "Specialist lighting for critical operations"
    },
    {
      id: 4,
      title: "Section 4: Maintained vs Non-Maintained Systems",
      icon: Settings,
      description: "System operation modes and configurations"
    },
    {
      id: 5,
      title: "Section 5: Signage and Wayfinding Lighting",
      icon: MapPin,
      description: "Directional and informational lighting systems"
    },
    {
      id: 6,
      title: "Section 6: System Testing and Record Keeping",
      icon: ClipboardCheck,
      description: "Testing schedules, maintenance requirements and compliance documentation"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/electrician/upskilling/emergency-lighting-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Emergency Lighting Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 2: System Categories and Lighting Types
            </h1>
            <p className="text-lg text-white mb-6">
              Understanding different emergency lighting categories and applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`/electrician/upskilling/emergency-lighting-module-2-section-${section.id}`}
                className="h-full min-h-[48px]"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    <p className="text-white text-xs leading-relaxed">
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

export default EmergencyLightingModule2;