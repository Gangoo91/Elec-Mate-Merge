import { ArrowLeft, BookOpen, Scale, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BS7671Module1 = () => {
  const sections = [
    {
      id: 1,
      title: "Purpose and Legal Status of BS 7671",
      icon: Scale,
      description: "Understanding the regulatory framework and legal standing of the wiring regulations"
    },
    {
      id: 2,
      title: "Scope and Application of the Regulations", 
      icon: BookOpen,
      description: "Where and when BS 7671 applies in electrical installations"
    },
    {
      id: 3,
      title: "Structure of BS 7671 (Parts, Chapters, Appendices)",
      icon: FileText,
      description: "How the regulations are organised and how to navigate them effectively"
    },
    {
      id: 4,
      title: "Amendment 3 Highlights",
      icon: Lightbulb,
      description: "Latest changes including bidirectional protective devices and consumer unit requirements"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              Module 1: Scope, Object & Fundamental Principles
            </h1>
            <p className="text-xl text-white mb-6">
              Understanding the foundational principles and legal framework of BS 7671
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {sections.map((section) => (
              <Link key={section.id} to={`../bs7671-module-1-section-${section.id}`}>
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

export default BS7671Module1;