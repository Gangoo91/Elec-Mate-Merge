
import { ArrowLeft, FileCheck, HelpCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8 = () => {
  const sections = [
    {
      id: 1,
      title: "Mock Exam",
      description: "Complete practice examination under timed conditions covering all inspection and testing procedures",
      icon: FileCheck,
      link: "section-1",
    },
    {
      id: 2,
      title: "Hints & Tips",
      description: "Essential guidance, best practices, and expert tips for successful examination completion",
      icon: HelpCircle,
      link: "section-2",
    },
    {
      id: 3,
      title: "Practical Assessment Help",
      description: "Comprehensive guidance for practical testing scenarios and hands-on assessment preparation",
      icon: Settings,
      link: "section-3",
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
            Inspection and Testing Exam Preparation
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Practice examinations and competency assessment for City & Guilds qualifications
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Grid Container - Fixed responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {sections.map((section) => {
              const IconComponent = section.icon;

              return (
                <Link key={section.id} to={section.link}>
                  <Card
                    className="bg-transparent border-transparent hover:border-elec-yellow/30 transition-all duration-300 hover:bg-transparent/80 cursor-pointer group h-full flex flex-col min-h-[48px]"
                  >
                    <CardHeader className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                      {/* Icon */}
                      <div className="flex justify-center">
                        <IconComponent className="h-8 w-8 text-elec-yellow" strokeWidth={2.5} />
                      </div>
                      
                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge 
                          variant="secondary" 
                          className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                        >
                          Section {section.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="text-center space-y-3 pt-0 p-4 flex-grow flex flex-col justify-center">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
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

export default Module8;
