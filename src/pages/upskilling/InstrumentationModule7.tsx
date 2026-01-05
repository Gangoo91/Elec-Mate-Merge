import { ArrowLeft, Cable, Power, Calculator, Palette, Shield, Wrench, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InstrumentationModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "What Is a 4–20mA Loop and Why It's Used",
      icon: Cable,
      description: "Understanding the 4-20mA current loop standard and its advantages"
    },
    {
      id: 2,
      title: "Loop-Powered vs Externally Powered Devices", 
      icon: Power,
      description: "Different power supply configurations for instrumentation loops"
    },
    {
      id: 3,
      title: "Loop Design and Load Calculations",
      icon: Calculator,
      description: "Designing current loops and calculating power requirements"
    },
    {
      id: 4,
      title: "Wiring Standards and Colour Coding",
      icon: Palette,
      description: "Industry standards for instrumentation wiring and identification"
    },
    {
      id: 5,
      title: "Barriers, Isolators, and Intrinsically Safe Loops",
      icon: Shield,
      description: "Safety devices and intrinsically safe system design"
    },
    {
      id: 6,
      title: "Loop Testing Tools (Loop Calibrators, Simulators, Multimeters)",
      icon: Wrench,
      description: "Equipment and techniques for testing current loops"
    },
    {
      id: 7,
      title: "Common Wiring Faults and Loop Integrity Checks",
      icon: AlertTriangle,
      description: "Troubleshooting wiring problems and verifying loop integrity"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Instrumentation Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 7: Instrumentation Wiring and 4–20mA Loops
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding current loop systems, wiring standards, and testing procedures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id}
                to={`../instrumentation-module-7-section-${section.id}`}
                className="block h-full"
              >
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    {/* Section Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    {/* Description */}
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

export default InstrumentationModule7;