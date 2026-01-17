
import { ArrowLeft, Shield, Wrench, FileText, ListCheck, AlertTriangle, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module2 = () => {
  const sections = [
    {
      id: 1,
      title: "Safe Isolation Procedures",
      description: "Proper isolation techniques, lock-off procedures and proving unit verification for electrical safety",
      icon: Shield,
      link: "section-1",
    },
    {
      id: 2,
      title: "Risk Assessments & Method Statements (RAMS)",
      description: "Development and implementation of risk assessments and method statements for electrical testing activities",
      icon: FileText,
      link: "section-2",
    },
    {
      id: 3,
      title: "Personal Protective Equipment (PPE)",
      description: "Selection, use and maintenance of appropriate PPE for electrical testing and inspection work",
      icon: Shield,
      link: "section-3",
    },
    {
      id: 4,
      title: "Test Instruments Overview",
      description: "Multifunction testers, RCD testers and specialist equipment selection for different testing requirements",
      icon: Wrench,
      link: "section-4",
    },
    {
      id: 5,
      title: "Instrument Calibration & Maintenance",
      description: "Calibration requirements, maintenance procedures and verification of test instrument accuracy",
      icon: TestTube,
      link: "section-5",
    },
    {
      id: 6,
      title: "Environmental & Site-Specific Hazards",
      description: "Identifying and managing environmental hazards and site-specific risks during electrical work",
      icon: AlertTriangle,
      link: "section-6",
    },
    {
      id: 7,
      title: "Pre-Test Preparation Checklist",
      description: "Systematic preparation procedures and comprehensive checklists before commencing electrical testing",
      icon: ListCheck,
      link: "section-7",
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="/study-centre/upskilling/inspection-testing">
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
            Module 2: Safety, Tools & Preparation
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Safety protocols, testing equipment selection and pre-inspection preparation procedures
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
              
              const cardContent = (
                <Card
                  className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300 hover:bg-transparent/80 cursor-pointer group min-h-[48px]"
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
                        className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-xs px-3 py-1 border-0"
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
              );

              return section.link ? (
                <Link key={section.id} to={section.link}>
                  {cardContent}
                </Link>
              ) : (
                <div key={section.id}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Module2;
