import { ArrowLeft, Award, Building, FileText, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const RenewableEnergyModule8 = () => {
  const sections = [
    {
      id: 1,
      title: "MCS Requirements and Certification Pathways",
      icon: Award,
      description: "Microgeneration Certification Scheme requirements and certification process"
    },
    {
      id: 2,
      title: "Building Regulations (Part L, Part P, Structural)", 
      icon: Building,
      description: "Compliance with building regulations for renewable energy installations"
    },
    {
      id: 3,
      title: "DNO Application Processes (G98, G99)",
      icon: FileText,
      description: "Distribution Network Operator application procedures and requirements"
    },
    {
      id: 4,
      title: "Fire Safety, AC/DC Isolation & Labelling Standards",
      icon: AlertTriangle,
      description: "Fire safety requirements and isolation/labelling standards"
    },
    {
      id: 5,
      title: "Handover Documentation & Operation Manuals",
      icon: BookOpen,
      description: "Required documentation and operational guidance for system handover"
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
              Module 8: Regulations, Planning, and Compliance
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding regulatory requirements and compliance procedures
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                5 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                45 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => {
              const sectionRoutes = {
                1: "/renewable-energy-module-8-section-1",
                2: "/renewable-energy-module-8-section-2", 
                3: "/renewable-energy-module-8-section-3",
                4: "/renewable-energy-module-8-section-4",
                5: "/renewable-energy-module-8-section-5"
              };
              
              return (
                <Link key={section.id} to={sectionRoutes[section.id]}>
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule8;