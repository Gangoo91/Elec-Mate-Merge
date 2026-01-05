import { ArrowLeft, Zap, Target, Settings, Wifi, FileCheck, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RenewableEnergyModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Inverter Types: String, Central, Hybrid, Micro",
      icon: Zap,
      description: "Understanding different inverter technologies and their applications"
    },
    {
      id: 2,
      title: "MPPT Tracking and Sizing for PV Arrays", 
      icon: Target,
      description: "Maximum Power Point Tracking and inverter sizing calculations"
    },
    {
      id: 3,
      title: "Grid-Tied vs Off-Grid vs Hybrid Configurations",
      icon: Settings,
      description: "Different system configurations and their operational characteristics"
    },
    {
      id: 4,
      title: "Synchronisation, Anti-Islanding, and Export Limits",
      icon: Wifi,
      description: "Grid synchronisation and safety protection systems"
    },
    {
      id: 5,
      title: "G98/G99 Compliance and DNO Notifications",
      icon: FileCheck,
      description: "UK grid connection standards and notification procedures"
    },
    {
      id: 6,
      title: "Monitoring Platforms and Remote Management",
      icon: Monitor,
      description: "System monitoring and remote management technologies"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              Module 5: Inverter Technology and Grid Integration
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding inverter technologies and grid connection requirements
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                6 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                65 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../renewable-energy-module-5-section-${section.id}`}
                className="block h-full"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule5;