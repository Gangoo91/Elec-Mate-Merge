
import { ArrowLeft, FileText, Award, ClipboardCheck, AlertTriangle, FileX, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module7 = () => {
  const sections = [
    {
      id: 1,
      title: "Purpose of Certification in Inspection & Testing",
      description: "Understanding the fundamental role and importance of certification in electrical inspection and testing procedures",
      icon: Award,
    },
    {
      id: 2,
      title: "Electrical Installation Certificate (EIC)",
      description: "Comprehensive guide to completing Electrical Installation Certificates for new electrical installations",
      icon: FileText,
    },
    {
      id: 3,
      title: "Minor Electrical Installation Works Certificate (MEIWC)",
      description: "Requirements and procedures for completing Minor Electrical Installation Works Certificates",
      icon: ClipboardCheck,
    },
    {
      id: 4,
      title: "Electrical Installation Condition Report (EICR)",
      description: "Detailed procedures for conducting and documenting Electrical Installation Condition Reports",
      icon: AlertTriangle,
    },
    {
      id: 5,
      title: "Understanding Observation Codes (C1, C2, C3, FI)",
      description: "Classification and application of observation codes for defects and non-compliance issues",
      icon: FileX,
    },
    {
      id: 6,
      title: "Common Mistakes & Best Practices in Documentation",
      description: "Avoiding common documentation errors and implementing best practices for electrical certification",
      icon: CheckCircle,
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../inspection-testing">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inspection & Testing
          </Button>
        </Link>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Module 7: Reporting & Certification
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Electrical Installation Condition Reports and certification procedures to BS 7671
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
                <Link
                  key={section.id}
                  to={`section-${section.id}`}
                  className="h-full"
                >
                  <Card className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300 hover:bg-transparent/80 cursor-pointer group h-full flex flex-col">
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
                    
                    <CardContent className="text-center space-y-2 pt-0 p-4 flex-grow flex flex-col justify-center">
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

export default Module7;
