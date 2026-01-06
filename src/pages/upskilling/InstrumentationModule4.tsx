import { ArrowLeft, BarChart, Zap, Target, Gauge, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InstrumentationModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Measuring Voltage, Current, and Resistance",
      icon: Zap,
      description: "Fundamental electrical measurements and techniques"
    },
    {
      id: 2,
      title: "Frequency and Time-Based Measurements", 
      icon: BarChart,
      description: "Measuring frequency, period, and time-based parameters"
    },
    {
      id: 3,
      title: "Instrument Accuracy, Resolution, and Error",
      icon: Target,
      description: "Understanding measurement precision and error sources"
    },
    {
      id: 4,
      title: "Measurement Equipment: Multimeters, Clamp Meters, Oscilloscopes",
      icon: Gauge,
      description: "Overview of common electrical measurement instruments"
    },
    {
      id: 5,
      title: "Interpreting and Logging Readings in Real-World Systems",
      icon: FileText,
      description: "Practical application of measurements in industrial systems"
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
              Module 4: Measurement of Electrical Quantities
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Techniques and equipment for measuring electrical parameters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../instrumentation-module-4-section-${section.id}`}
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

export default InstrumentationModule4;