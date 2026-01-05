import { ArrowLeft, Target, Wrench, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InstrumentationModule6 = () => {
  const sections = [
    {
      id: 1,
      title: "What Is Calibration and Why It's Important",
      icon: Target,
      description: "Understanding the fundamentals and importance of calibration"
    },
    {
      id: 2,
      title: "Calibration Equipment and Reference Standards", 
      icon: Wrench,
      description: "Tools and standards used for accurate calibration procedures"
    },
    {
      id: 3,
      title: "Step-by-Step Calibration of Pressure, Temp, and Electrical Devices",
      icon: ClipboardCheck,
      description: "Practical calibration procedures for different instrument types"
    },
    {
      id: 4,
      title: "Recording and Documenting Calibration Results",
      icon: FileText,
      description: "Proper documentation and record-keeping for calibration activities"
    },
    {
      id: 5,
      title: "Calibration Intervals, Certificates, and UKAS Traceability",
      icon: Shield,
      description: "Understanding certification requirements and traceability standards"
    },
    {
      id: 6,
      title: "Advanced Calibration Topics and Best Practices",
      icon: Shield,
      description: "Advanced techniques, troubleshooting, and future calibration trends"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Instrumentation Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Module 6: Calibration Methods and Standards
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Understanding calibration procedures, standards, and certification requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link key={section.id} to={`../instrumentation-module-6-section-${section.id}`}>
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <section.icon className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                    </div>
                    
                    {/* Section Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    
                    {/* Description */}
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

export default InstrumentationModule6;