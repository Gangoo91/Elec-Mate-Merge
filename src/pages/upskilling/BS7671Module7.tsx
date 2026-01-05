import { ArrowLeft, MapPin, Car, TreePine, Building, Factory, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module7 = () => {
  const sections = [
    {
      id: 1,
      title: "Locations Requiring Additional Precautions (Bathrooms, Pools)",
      icon: MapPin,
      description: "Special safety requirements for wet and hazardous locations"
    },
    {
      id: 2,
      title: "Electric Vehicle Charging Installations (Part 722)", 
      icon: Car,
      description: "Requirements for EV charging point installations and associated electrical systems"
    },
    {
      id: 3,
      title: "Outdoor and Agricultural Installations",
      icon: TreePine,
      description: "Electrical installations in agricultural and horticultural premises"
    },
    {
      id: 4,
      title: "Medical, Commercial, and Industrial Locations",
      icon: Building,
      description: "Specific requirements for healthcare facilities, commercial, and industrial premises"
    },
    {
      id: 5,
      title: "Introduction to Prosumer Electrical Installations (Part 8)",
      icon: Factory,
      description: "New requirements for prosumer electrical installations and energy storage"
    },
    {
      id: 6,
      title: "Amendment 2 Highlights",
      icon: Lightbulb,
      description: "Key changes and updates introduced in the latest amendment"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bs7671-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BS7671 Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 7: Special Installations & Locations
            </h1>
            <p className="text-xl text-white mb-6">
              Requirements for special locations and installations with unique safety considerations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../bs7671-module-7-section-${section.id}`}
                className="h-full"
              >
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />
                    </div>
                    
                    {/* Section Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-bold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    {/* Description */}
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

export default BS7671Module7;