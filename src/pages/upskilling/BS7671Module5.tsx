import { ArrowLeft, Settings, Cable, Package, Power, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module5 = () => {
  const sections = [
    {
      id: 1,
      title: "Equipment Ratings and Suitability for Purpose",
      icon: Settings,
      description: "Selecting equipment including enhanced consumer units for renewable energy systems"
    },
    {
      id: 2,
      title: "Cable Types, Sizing, Grouping, and Routing", 
      icon: Cable,
      description: "Cable selection, current-carrying capacity calculations, and installation methods"
    },
    {
      id: 3,
      title: "Containment Systems and Mechanical Protection",
      icon: Package,
      description: "Cable management systems and protection against mechanical damage"
    },
    {
      id: 4,
      title: "Isolation, Switching, and Emergency Controls",
      icon: Power,
      description: "Requirements for isolation devices, switching arrangements, and emergency stopping"
    },
    {
      id: 5,
      title: "Grid Interaction and Anti-Islanding Protection",
      icon: ShieldCheck,
      description: "Grid interaction safety measures and anti-islanding protection for renewable energy"
    },
    {
      id: 6,
      title: "Environmental Protection (IP Ratings, Fire Resistance)",
      icon: Package,
      description: "Protection against environmental influences and fire safety requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              Module 5: Selection & Erection of Equipment
            </h1>
            <p className="text-xl text-white mb-6">
              Equipment selection criteria, installation methods, and protection requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link key={section.id} to={`../bs7671-module-5-section-${section.id}`}>
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

export default BS7671Module5;