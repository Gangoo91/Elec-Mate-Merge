import { ArrowLeft, BookOpen, Building, TrendingUp, MapPin, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BMSModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "What is a BMS and Why It's Used",
      icon: BookOpen,
      description: "Introduction to Building Management Systems"
    },
    {
      id: 2,
      title: "Common Systems Integrated with BMS (HVAC, Lighting, Access)", 
      icon: Building,
      description: "System integration and connectivity"
    },
    {
      id: 3,
      title: "Benefits of BMS: Efficiency, Comfort, Control",
      icon: TrendingUp,
      description: "Advantages and value proposition"
    },
    {
      id: 4,
      title: "Real-World Environments Using BMS (Commercial, Healthcare, Retail)",
      icon: MapPin,
      description: "Application sectors and use cases"
    },
    {
      id: 5,
      title: "Overview of Relevant Standards (ISO 16484, EN 15232)",
      icon: FileCheck,
      description: "Industry standards and compliance"
    },
    {
      id: 6,
      title: "The Electrician's Role in BMS Installations",
      icon: FileCheck,
      description: "Professional responsibilities and best practices"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../bms-course">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BMS Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 1: BMS Overview and Industry Applications
            </h1>
            <p className="text-base text-white mb-6">
              Introduction to Building Management Systems and their applications
            </p>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                6 Sections
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                50 minutes
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link 
                key={section.id} 
                to={`../bms-module-1-section-${section.id}`}
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
                        className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/10 font-bold text-xs px-3 py-1 border-0"
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

export default BMSModule1;