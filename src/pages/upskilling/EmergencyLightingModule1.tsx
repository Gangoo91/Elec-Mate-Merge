import { ArrowLeft, BookOpen, Scale, MapPin, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EmergencyLightingModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "Section 1: Purpose and Legal Framework",
      icon: Scale,
      description: "Legal requirements and regulatory framework"
    },
    {
      id: 2,
      title: "Section 2: Locations Where Emergency Lighting is Required", 
      icon: MapPin,
      description: "Building types and mandatory installation areas"
    },
    {
      id: 3,
      title: "Section 3: Types of Emergency Lighting Systems",
      icon: BookOpen,
      description: "System categories and configuration options"
    },
    {
      id: 4,
      title: "Section 4: Overview of BS 5266 and Related Standards",
      icon: FileCheck,
      description: "Key standards and compliance requirements"
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
              Module 1: Introduction to Emergency Lighting
            </h1>
            <p className="text-lg text-white mb-6">
              Purpose, legal framework, and system fundamentals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`/electrician/upskilling/emergency-lighting-module-1-section-${section.id}`}
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

export default EmergencyLightingModule1;