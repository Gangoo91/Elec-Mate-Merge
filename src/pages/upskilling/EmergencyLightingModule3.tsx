import { ArrowLeft, Lightbulb, Route, Ruler, AlertTriangle, FileText, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EmergencyLightingModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Section 1: Minimum Illumination Levels and Durations",
      icon: Lightbulb,
      description: "Required lux levels and operating times"
    },
    {
      id: 2,
      title: "Section 2: Escape Route and Coverage Rules", 
      icon: Route,
      description: "Path lighting and coverage requirements"
    },
    {
      id: 3,
      title: "Section 3: Mounting Heights and Photometric Considerations",
      icon: Ruler,
      description: "Installation heights and light distribution"
    },
    {
      id: 4,
      title: "Section 4: Risk-Based Design Adjustments",
      icon: AlertTriangle,
      description: "Adapting design based on risk assessment"
    },
    {
      id: 5,
      title: "Section 5: Emergency Lighting Layout Drawings",
      icon: FileText,
      description: "Technical drawings and documentation"
    },
    {
      id: 6,
      title: "Section 6: Software and Calculation Tools",
      icon: Calculator,
      description: "Design software and calculation methods"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              Module 3: Design Requirements and Placement
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Technical design criteria and positioning requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../emergency-lighting-module-3-section-${section.id}`}
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

export default EmergencyLightingModule3;