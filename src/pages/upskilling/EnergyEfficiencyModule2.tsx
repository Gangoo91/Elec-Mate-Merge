import { ArrowLeft, Activity, BarChart, Zap, Gauge, FileBarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EnergyEfficiencyModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Power Quality Factors (Harmonics, Flicker, etc.)",
      icon: Activity,
      description: "Understanding power quality issues and their impact"
    },
    {
      id: 2,
      title: "Analysing Loads and Demand Patterns", 
      icon: BarChart,
      description: "Load analysis techniques and demand profiling"
    },
    {
      id: 3,
      title: "kW vs kVA vs kWh Explained",
      icon: Zap,
      description: "Understanding different electrical measurements and their applications"
    },
    {
      id: 4,
      title: "Equipment for Power Monitoring",
      icon: Gauge,
      description: "Selecting and using power monitoring equipment"
    },
    {
      id: 5,
      title: "Reporting Load Profiles and Variations",
      icon: FileBarChart,
      description: "Creating meaningful reports from power monitoring data"
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
              Module 2: Power Quality and Load Analysis
            </h1>
            <p className="text-xl text-white mb-6">
              Understanding power quality and electrical load characteristics
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
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

export default EnergyEfficiencyModule2;