import { ArrowLeft, BookOpen, Key, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module2 = () => {
  const sections = [
    {
      id: 1,
      title: "Navigating Part 2 – How Definitions Shape Application",
      icon: BookOpen,
      description: "Understanding how definitions in Part 2 influence the application of regulations"
    },
    {
      id: 2,
      title: "Key Terms: CPC, ADS, SELV, PELV, Protective Devices", 
      icon: Key,
      description: "Essential terminology for circuit protective conductors, automatic disconnection, and safety systems"
    },
    {
      id: 3,
      title: "New Definitions from Amendment 2 & 3 (AFDD, PEI, Bidirectional Protection)",
      icon: AlertTriangle,
      description: "Updated terminology from Amendment 2 and Amendment 3's bidirectional protection requirements"
    },
    {
      id: 4,
      title: "Amendment 3 Highlights & Current Requirements",
      icon: Lightbulb,
      description: "Key changes in Amendment 3 focusing on bidirectional protection and renewable energy safety"
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
              Module 2: Definitions & Key Terminology
            </h1>
            <p className="text-xl text-white mb-6">
              Mastering the essential vocabulary and definitions that underpin BS 7671
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../bs7671-module-2-section-${section.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
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

export default BS7671Module2;