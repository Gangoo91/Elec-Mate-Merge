import { ArrowLeft, BookOpen, Gauge, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base min-h-[48px] touch-manipulation active:scale-[0.98]"
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

          <div className="grid grid-cols-1 gap-4 auto-rows-fr">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`../instrumentation-module-2-section-${section.id}`} className="h-full block">
                  <Card
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[200px]"
                  >
                    {/* Accent line at top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                    <CardContent className="relative text-center space-y-3 p-4">
                      {/* Icon with gradient bg */}
                      <div className="flex justify-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                          <section.icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge
                          variant="secondary"
                          className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 font-bold text-xs px-3 py-1"
                        >
                          Section {section.id}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule2;
