import { ArrowLeft, CheckCircle, Eye, FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module6 = () => {
  const sections = [
    {
      id: 1,
      title: "Requirements for Initial Verification",
      icon: CheckCircle,
      description: "Mandatory verification procedures for new electrical installations"
    },
    {
      id: 2,
      title: "Visual Inspection and Testing Responsibilities", 
      icon: Eye,
      description: "Systematic visual inspection requirements and testing responsibilities"
    },
    {
      id: 3,
      title: "Sequence of Tests and Testing Procedures",
      icon: Lightbulb,
      description: "Correct testing sequence and step-by-step procedures per BS 7671"
    },
    {
      id: 4,
      title: "Model Forms and Certification Overview (EIC, MEIWC, EICR)",
      icon: FileText,
      description: "Understanding and completing electrical installation certificates and reports"
    },
    {
      id: 5,
      title: "Certification Errors and Common Pitfalls",
      icon: AlertTriangle,
      description: "Avoiding mistakes and understanding common certification errors"
    },
    {
      id: 6,
      title: "Recording Limitations and Safety Observations",
      icon: CheckCircle,
      description: "Documenting inspection limitations and safety-related observations"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bs7671-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BS7671 Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 6: Inspection, Testing & Certification
            </h1>
            <p className="text-xl text-white mb-6">
              Verification procedures, testing requirements, and certification processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link key={section.id} to={`../bs7671-module-6-section-${section.id}`}>
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />
                    </div>
                    
                    {/* Section Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-bold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                     {/* Description */}
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

export default BS7671Module6;