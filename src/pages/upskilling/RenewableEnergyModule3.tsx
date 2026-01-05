import { ArrowLeft, Wind, RotateCw, MapPin, Settings, Waves, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const RenewableEnergyModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Wind Generation Principles and Power Curves",
      description: "Understand the conversion of wind energy to electrical power and power curve interpretation",
      icon: Wind,
      path: "/renewable-energy-module-3-section-1",
      completed: false,
      duration: "45 min"
    },
    {
      id: 2,
      title: "Horizontal vs Vertical Axis Turbines",
      description: "Compare HAWT and VAWT designs, efficiency trade-offs, and application scenarios",
      icon: RotateCw,
      path: "/renewable-energy-module-3-section-2", 
      completed: false,
      duration: "40 min"
    },
    {
      id: 3,
      title: "Wind Resource Assessment",
      description: "Site evaluation, wind measurement, and resource characterisation methods",
      icon: MapPin,
      path: "/renewable-energy-module-3-section-3",
      completed: false,
      duration: "50 min"
    },
    {
      id: 4,
      title: "Wind Farm Layout and Wake Effects",
      description: "Optimising turbine spacing, wake management, and array performance",
      icon: Settings,
      path: "/renewable-energy-module-3-section-4",
      completed: false,
      duration: "45 min"
    },
    {
      id: 5,
      title: "Offshore Wind Technology",
      description: "Offshore wind systems, floating platforms, and marine considerations",
      icon: Waves,
      path: "/renewable-energy-module-3-section-5",
      completed: false,
      duration: "55 min"
    }
  ];

  const completedSections = sections.filter(section => section.completed).length;
  const progressPercentage = (completedSections / sections.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Renewable Energy Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 3: Wind Energy Systems
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comprehensive coverage of wind energy technology, from fundamental principles to advanced offshore systems
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                ~235 min
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={section.path}
                className="h-full"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
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

export default RenewableEnergyModule3;