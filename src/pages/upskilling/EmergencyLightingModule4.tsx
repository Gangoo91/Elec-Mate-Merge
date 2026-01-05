import { ArrowLeft, Cable, Battery, Clock, Flame, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EmergencyLightingModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Section 1: Cable Types and Installation Requirements",
      icon: Cable,
      description: "Cable specifications and installation methods"
    },
    {
      id: 2,
      title: "Section 2: Self-Contained vs Central Battery Systems", 
      icon: Battery,
      description: "System architectures and backup power options"
    },
    {
      id: 3,
      title: "Section 3: Battery Sizing and Autonomy Duration",
      icon: Clock,
      description: "Battery capacity calculations and runtime requirements"
    },
    {
      id: 4,
      title: "Section 4: Circuit Segregation and Fire Integrity",
      icon: Flame,
      description: "Fire-resistant cabling and circuit protection"
    },
    {
      id: 5,
      title: "Section 5: Remote Testing and Monitoring Systems",
      icon: Monitor,
      description: "Automated testing and monitoring solutions"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../emergency-lighting-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Emergency Lighting Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 4: Cabling, Battery Backup, and Circuiting
            </h1>
            <p className="text-lg text-white mb-6">
              Power supply systems and circuit design considerations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../emergency-lighting-module-4-section-${section.id}`}
                className="h-full"
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

export default EmergencyLightingModule4;