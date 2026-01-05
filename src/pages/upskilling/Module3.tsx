
import { ArrowLeft, Eye, ClipboardCheck, FileText, AlertTriangle, CheckCircle, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module3 = () => {
  const sections = [
    {
      id: 1,
      title: "Purpose of Visual Inspection",
      description: "Understanding the fundamental objectives and requirements for conducting visual inspections in electrical installations",
      icon: Eye,
      link: "section-1",
    },
    {
      id: 2,
      title: "What to Look For – Common Visual Defects",
      description: "Identifying typical defects, damage and non-compliance issues during visual inspection procedures",
      icon: AlertTriangle,
      link: "section-2",
    },
    {
      id: 3,
      title: "Required Documentation & Design Information",
      description: "Essential documentation and design information needed to conduct effective visual inspections",
      icon: FileText,
      link: "section-3",
    },
    {
      id: 4,
      title: "Verifying Installation Accessibility & Labels",
      description: "Checking accessibility of electrical installations and verifying appropriate labelling and identification",
      icon: CheckCircle,
      link: "section-4",
    },
    {
      id: 5,
      title: "Confirming Readiness for Testing",
      description: "Essential verification steps to ensure installations are ready for electrical testing procedures",
      icon: ClipboardCheck,
      link: "section-5",
    },
    {
      id: 6,
      title: "Recording Visual Inspection Results",
      description: "Proper documentation methods and recording procedures for visual inspection findings and observations",
      icon: PenTool,
      link: "section-6",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../inspection-testing">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inspection & Testing
          </Button>
        </Link>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Module 3: Visual Inspection & Pre-Test Requirements
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Comprehensive visual inspection techniques and documentation requirements before testing
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
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group"
                >
                  <CardHeader className="text-center space-y-3 pb-2 p-4">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <IconComponent className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />
                    </div>
                    
                    {/* Section Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-xs px-3 py-1 border-0"
                      >
                        Section {section.id}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-2 pt-0 p-4">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
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

export default Module3;
