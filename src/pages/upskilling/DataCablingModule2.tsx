import { ArrowLeft, Cable, Shield, BarChart, Plug, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DataCablingModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Twisted Pair Basics and Categories",
      icon: Cable,
      description: "Understanding twisted pair cable construction and categories"
    },
    {
      id: 2,
      title: "UTP, FTP, and STP Explained", 
      icon: Shield,
      description: "Different cable shielding types and applications"
    },
    {
      id: 3,
      title: "Performance Ratings and Bandwidth Limits",
      icon: BarChart,
      description: "Cable performance specifications and limitations"
    },
    {
      id: 4,
      title: "Connectors and Patch Panel Config",
      icon: Plug,
      description: "Connector types and patch panel configuration"
    },
    {
      id: 5,
      title: "PoE (Power over Ethernet) Use and Limitations",
      icon: Zap,
      description: "Power over Ethernet capabilities and constraints"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data Cabling Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Module 2: Copper Cabling Standards (Cat5e, Cat6, etc.)
            </h1>
            <p className="text-base md:text-lg text-white mb-6">
              Copper cable types, standards, and performance characteristics
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                55 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../data-cabling-module-2-section-${section.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col min-h-[48px]">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center min-h-[48px]">
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

export default DataCablingModule2;