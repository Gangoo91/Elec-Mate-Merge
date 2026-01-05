import { ArrowLeft, GitBranch, Compass, Wifi, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RenewableEnergyModule6 = () => {
  const sections = [
    {
      id: 1,
      title: "Comparison: Off-Grid, Grid-Tied, and Hybrid Systems",
      icon: GitBranch,
      description: "Understanding the differences between system configurations"
    },
    {
      id: 2,
      title: "Off-Grid Design Considerations (Autonomy, Generator Backup)", 
      icon: Compass,
      description: "Designing standalone systems with backup generation"
    },
    {
      id: 3,
      title: "Grid-Tied Sizing and Export Management",
      icon: Wifi,
      description: "Sizing grid-connected systems and managing energy export"
    },
    {
      id: 4,
      title: "Control Strategies: Manual vs Automated Switching",
      icon: Settings,
      description: "Different control approaches for system switching and management"
    },
    {
      id: 5,
      title: "Load Priority, Critical Loads, and Energy Routing",
      icon: Zap,
      description: "Managing energy distribution and load prioritisation"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
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
              Module 6: Off-Grid vs Grid-Tied System Configuration
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comparing different system configurations and design considerations
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                55 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => {
              if (section.id <= 5) {
                return (
                  <Link 
                    key={section.id} 
                    to={`../renewable-energy-module-6-section-${section.id}`}
                  >
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
                        
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                          {section.title}
                        </h3>
                        
                        <p className="text-gray-400 text-xs leading-relaxed">
                          {section.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              } else {
                return (
                  <Card 
                    key={section.id}
                    className="bg-card border-transparent opacity-50 cursor-not-allowed h-full flex flex-col"
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
                      
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {section.title}
                      </h3>
                      
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6;