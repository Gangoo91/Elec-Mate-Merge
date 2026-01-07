import { ArrowLeft, Search, TestTube, Calendar, Tag, FileCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EmergencyLightingModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Section 1: Initial Inspection and Verification",
      icon: Search,
      description: "Pre-commissioning checks and verification procedures"
    },
    {
      id: 2,
      title: "Section 2: Functional Testing and 3-Hour Duration Tests", 
      icon: TestTube,
      description: "Operational testing and duration verification"
    },
    {
      id: 3,
      title: "Section 3: Monthly and Annual Testing Requirements",
      icon: Calendar,
      description: "Scheduled testing regimes and frequencies"
    },
    {
      id: 4,
      title: "Section 4: System Labelling and Maintenance Records",
      icon: Tag,
      description: "Documentation and record-keeping requirements"
    },
    {
      id: 5,
      title: "Section 5: Certification and Commissioning Checklists",
      icon: FileCheck,
      description: "Formal certification procedures and checklists"
    },
    {
      id: 6,
      title: "Section 6: Client Handover Procedure",
      icon: Users,
      description: "Handover documentation and client training"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="/electrician/upskilling/emergency-lighting-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Emergency Lighting Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 5: Installation, Testing, and Maintenance
            </h1>
            <p className="text-lg text-white mb-6">
              Complete testing procedures and maintenance protocols
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`/electrician/upskilling/emergency-lighting-module-5-section-${section.id}`}
                className="h-full min-h-[48px]"
              >
                <Card className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col">
                  <CardContent className="text-center space-y-3 p-4 flex-grow flex flex-col justify-center">
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    <p className="text-white text-xs leading-relaxed">
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

export default EmergencyLightingModule5;