import { ArrowLeft, Grid, Calculator, Thermometer, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module3 = () => {
  const sections = [
    {
      id: 1,
      title: "Supply Systems – TN-S, TN-C-S, TT, IT",
      icon: Grid,
      description: "Understanding earthing arrangements and their safety implications"
    },
    {
      id: 2,
      title: "Maximum Demand, Diversity, and Load Profiles", 
      icon: Calculator,
      description: "Load calculations, diversity factors, and system design principles"
    },
    {
      id: 3,
      title: "External Influences and Installation Conditions",
      icon: Thermometer,
      description: "Environmental conditions affecting material selection and installation methods"
    },
    {
      id: 4,
      title: "Voltage Drop and System Design Limits",
      icon: Zap,
      description: "Calculating and managing voltage drop within BS 7671 limits"
    },
    {
      id: 5,
      title: "Earthing Arrangements and Protective Measures Selection",
      icon: Shield,
      description: "Matching earthing systems with appropriate protection strategies"
    },
    {
      id: 6,
      title: "Amendment 3 Current Requirements",
      icon: TrendingUp,
      description: "Latest bidirectional protection and renewable energy integration requirements"
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
              Module 3: General Characteristics & Selection Criteria
            </h1>
            <p className="text-xl text-white mb-6">
              System design fundamentals, earthing arrangements, and selection criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../bs7671-module-3-section-${section.id}`}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />
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

export default BS7671Module3;