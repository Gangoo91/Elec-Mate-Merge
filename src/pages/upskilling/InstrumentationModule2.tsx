import { ArrowLeft, BookOpen, Gauge, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InstrumentationModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Difference Between Sensors and Transducers",
      icon: Gauge,
      description: "Understanding the distinction and relationship between sensors and transducers in instrumentation systems"
    },
    {
      id: 2,
      title: "Temperature Sensors – Thermocouples, RTDs, Thermistors", 
      icon: Thermometer,
      description: "Comprehensive guide to temperature measurement devices, their principles, and applications"
    },
    {
      id: 3,
      title: "Pressure and Flow Sensors",
      icon: Gauge,
      description: "Understanding pressure and flow measurement for fluid and gas systems"
    },
    {
      id: 4,
      title: "Level, Position, and Proximity Sensors",
      icon: Gauge,
      description: "Understanding spatial awareness sensors for level detection, positioning, and proximity monitoring"
    },
    {
      id: 5,
      title: "Digital vs Analog Sensor Output",
      icon: Gauge,
      description: "Understanding output types and their implications for signal processing and system integration"
    },
    {
      id: 6,
      title: "Choosing the Right Sensor for the Application",
      icon: Gauge,
      description: "Decision-making framework for sensor selection based on technical and environmental criteria"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Instrumentation Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Module 2: Sensors and Transducers Explained
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-6">
              Understanding the function, types, and selection of sensors and transducers in electrical instrumentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link key={section.id} to={`../instrumentation-module-2-section-${section.id}`}>
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
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

export default InstrumentationModule2;