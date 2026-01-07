import { ArrowLeft, Lightbulb, Settings, Users, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EnergyEfficiencyModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "LED and Lighting Control Upgrades",
      icon: Lightbulb,
      description: "Upgrading to efficient lighting systems and controls"
    },
    {
      id: 2,
      title: "Motor Efficiency and VSD Retrofitting", 
      icon: Settings,
      description: "Improving motor efficiency and variable speed drive retrofits"
    },
    {
      id: 3,
      title: "Energy-Efficient Controls (Timers, BMS)",
      icon: Settings,
      description: "Implementing smart controls and building management systems"
    },
    {
      id: 4,
      title: "Behavioural Measures and Awareness",
      icon: Users,
      description: "Creating energy awareness and behavioural change programmes"
    },
    {
      id: 5,
      title: "ROI Calculators and Energy Saving Tools",
      icon: Calculator,
      description: "Tools for calculating return on investment and savings"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../energy-efficiency-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 min-h-[48px] rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Energy Efficiency Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 4: Reducing Demand and Improving Efficiency
            </h1>
            <p className="text-xl text-white mb-6">
              Practical measures for reducing energy demand and improving efficiency
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                50 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Card 
                key={section.id} 
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
                  
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  <p className="text-white text-xs leading-relaxed">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4;