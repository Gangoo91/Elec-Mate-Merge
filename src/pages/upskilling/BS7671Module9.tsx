import { ArrowLeft, FileCheck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module9 = () => {
  const sections = [
    {
      id: 1,
      title: "Mock Exam",
      description: "Complete practice examination under timed conditions covering all BS 7671 requirements",
      icon: FileCheck,
    },
    {
      id: 2,
      title: "Hints & Tips",
      description: "Essential guidance, best practices, and expert tips for successful examination completion",
      icon: HelpCircle,
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="bs7671-course">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to BS7671 Course
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Module 9: Mock Exam
            </h1>
            <p className="text-xl text-white mb-6">
              Comprehensive practice examination to test your knowledge of BS 7671
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.id === 1 ? 'bs7671-mock-exam' : section.id === 2 ? 'bs7671-exam-guide' : '#'}
                className={section.id === 1 || section.id === 2 ? '' : 'pointer-events-none'}
              >
                <Card
                  className={`bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 group h-full flex flex-col min-h-[48px] ${
                    section.id === 1 || section.id === 2 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <CardContent className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
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

export default BS7671Module9;