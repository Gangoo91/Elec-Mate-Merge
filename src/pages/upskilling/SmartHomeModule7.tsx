import { ArrowLeft, Wrench, CheckCircle, Wifi, Shield, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const SmartHomeModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "Device Wiring, Power Supplies, and Containment",
      icon: Wrench,
      description: "Proper installation practices and electrical requirements"
    },
    {
      id: 2,
      title: "Commissioning and Device Pairing", 
      icon: CheckCircle,
      description: "System commissioning procedures and device setup"
    },
    {
      id: 3,
      title: "Wi-Fi and RF Signal Verification",
      icon: Wifi,
      description: "Testing and optimising wireless communication"
    },
    {
      id: 4,
      title: "Electrical Safety and Isolation (BS 7671 Alignment)",
      icon: Shield,
      description: "Safety procedures aligned with UK electrical regulations"
    },
    {
      id: 5,
      title: "Customer Handover and App Training",
      icon: Users,
      description: "Training customers on system operation and mobile apps"
    },
    {
      id: 6,
      title: "Documentation, Warranty, and Aftercare",
      icon: FileText,
      description: "Completing installation records and ongoing support"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Smart Home Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 7: Installation, Testing, and Safety Requirements
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Professional installation practices and safety compliance
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 7
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                6 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                60 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => {
              const isClickable = section.id <= 6;
              const sectionCard = (
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
              );

              if (isClickable) {
                return (
                  <Link 
                    key={section.id} 
                    to={`../smart-home-module-7-section-${section.id}`}
                    className="h-full flex flex-col"
                  >
                    {sectionCard}
                  </Link>
                );
              }

              return (
                <div key={section.id} className="h-full flex flex-col">
                  {sectionCard}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule7;