import { ArrowLeft, Search, Zap, TestTube, FileSearch, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const IndustrialElectricalModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Fault-Finding Strategies and Logic Flow",
      icon: Search,
      description: "Systematic approach to industrial fault diagnosis"
    },
    {
      id: 2,
      title: "Common Control Faults (Coils, Relays, Power)", 
      icon: Zap,
      description: "Typical control system failures and diagnosis"
    },
    {
      id: 3,
      title: "Loop Testing and Continuity",
      icon: TestTube,
      description: "Circuit testing and continuity verification"
    },
    {
      id: 4,
      title: "PLC Diagnostics and Alarms",
      icon: FileSearch,
      description: "PLC system diagnostics and alarm analysis"
    },
    {
      id: 5,
      title: "Root Cause Analysis and Reporting",
      icon: FileCheck,
      description: "Investigation methods and documentation"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../industrial-electrical-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Industrial Electrical Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 5: Industrial Fault Finding and Troubleshooting
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Fault diagnosis, troubleshooting, and root cause analysis
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
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
                to={`../industrial-electrical-module-5-section-${section.id}`}
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

export default IndustrialElectricalModule5;