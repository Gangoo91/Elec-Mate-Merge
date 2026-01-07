
import { ArrowLeft, Shield, Layers, TestTube, AlertTriangle, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module6 = () => {
  const sections = [
    {
      id: 1,
      title: "Understanding RCDs and Their Purpose",
      description: "Fundamental principles of residual current devices and their role in electrical safety protection",
      icon: Shield,
    },
    {
      id: 2,
      title: "Types of RCDs and Where They're Used",
      description: "Classification of RCD types, their applications and appropriate installation requirements",
      icon: Layers,
    },
    {
      id: 3,
      title: "RCD Testing Procedures",
      description: "Step-by-step procedures for testing RCD operation, timing and sensitivity measurements",
      icon: TestTube,
    },
    {
      id: 4,
      title: "Expected Results and Common Issues",
      description: "Acceptable test values, fault diagnosis and resolution of common RCD testing problems",
      icon: AlertTriangle,
    },
    {
      id: 5,
      title: "Other Functional Tests (Switchgear, Controls, etc.)",
      description: "Additional functional testing procedures for switchgear, controls and protective devices",
      icon: Settings,
    },
    {
      id: 6,
      title: "Recording Results and Confirming Compliance",
      description: "Documentation requirements and compliance verification for RCD and functional testing",
      icon: FileText,
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../inspection-testing">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inspection & Testing
          </Button>
        </Link>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Module 6: RCD Testing & Functional Verification
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Residual current device testing and functional checks for safety systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.id} to={`section-${section.id}`}>
                  <Card
                    className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300 hover:bg-transparent/80 cursor-pointer group h-full min-h-[48px]"
                  >
                    <CardHeader className="text-center space-y-3 pb-2 p-4">
                      {/* Icon */}
                      <div className="flex justify-center">
                        <IconComponent className="h-8 w-8 text-elec-yellow" strokeWidth={1.5} />
                      </div>
                      
                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge 
                          variant="secondary" 
                          className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-xs px-3 py-1 border-0"
                        >
                          Section {section.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="text-center space-y-2 pt-0 p-4">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                        {section.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white text-xs leading-relaxed">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Module6;
