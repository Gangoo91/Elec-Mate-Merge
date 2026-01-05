import { ArrowLeft, Eye, ClipboardList, TrendingUp, Wrench, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EnergyEfficiencyModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Walkthrough and Inventory Surveys",
      icon: Eye,
      description: "Conducting comprehensive site surveys and equipment inventories"
    },
    {
      id: 2,
      title: "Data Collection (Manual, Smart Meters, Logs)", 
      icon: ClipboardList,
      description: "Methods for gathering energy consumption data"
    },
    {
      id: 3,
      title: "Comparing to Benchmarks and Tariffs",
      icon: TrendingUp,
      description: "Benchmarking performance against industry standards"
    },
    {
      id: 4,
      title: "Tools and Software for Audits",
      icon: Wrench,
      description: "Software tools and equipment for energy auditing"
    },
    {
      id: 5,
      title: "Audit Reports and Cost/Carbon Breakdown",
      icon: FileText,
      description: "Creating comprehensive audit reports with recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../energy-efficiency-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Energy Efficiency Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 3: Energy Auditing Methods
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Comprehensive energy auditing techniques and methodologies
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
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
                  
                  <p className="text-gray-400 text-xs leading-relaxed">
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

export default EnergyEfficiencyModule3;