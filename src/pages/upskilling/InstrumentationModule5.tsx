import { ArrowLeft, RotateCcw, Settings, TrendingUp, AlertTriangle, Gauge, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InstrumentationModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Open Loop vs Closed Loop Systems",
      icon: RotateCcw,
      description: "Understanding the difference between open and closed loop control systems"
    },
    {
      id: 2,
      title: "Components of a Control Loop: PV, Setpoint, Output", 
      icon: Settings,
      description: "Key components and their roles in control loop operation"
    },
    {
      id: 3,
      title: "PID Control Basics (Proportional, Integral, Derivative)",
      icon: TrendingUp,
      description: "Understanding PID control principles and tuning"
    },
    {
      id: 4,
      title: "Common Loop Faults: Hunting, Overshoot, Lag",
      icon: AlertTriangle,
      description: "Identifying and troubleshooting common control loop problems"
    },
    {
      id: 5,
      title: "Loop Tuning and Stability Considerations",
      icon: Gauge,
      description: "Techniques for optimizing control loop performance"
    },
    {
      id: 6,
      title: "Examples: HVAC, Pressure Systems, and Motor Speed Control",
      icon: PlayCircle,
      description: "Real-world applications of control loops in different systems"
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
              Module 5: Control Loops and Feedback Systems
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding control theory and feedback systems in instrumentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id}
                to={`../instrumentation-module-5-section-${section.id}`}
                className="block"
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

export default InstrumentationModule5;