
import { ArrowLeft, BookOpen, FileText, Shield, Eye, Zap, Check, Flag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module1 = () => {
  const sections = [
    {
      id: 1,
      title: "What Is Inspection & Testing?",
      description: "Fundamental definition and purpose of electrical inspection and testing in accordance with BS 7671",
      icon: BookOpen,
      link: "../module-1/section-1",
    },
    {
      id: 2,
      title: "Legal & Regulatory Framework",
      description: "Statutory requirements, Building Regulations Part P and legal obligations for electrical installations",
      icon: FileText,
      link: "../module-1/section-2",
    },
    {
      id: 3,
      title: "When Is Inspection & Testing Required?",
      description: "Circumstances and timescales requiring electrical inspection and testing procedures",
      icon: Shield,
      link: "../module-1/section-3",
    },
    {
      id: 4,
      title: "Types of Testing (Overview)",
      description: "Introduction to different categories of electrical testing and their specific applications",
      icon: Eye,
      link: "../module-1/section-4",
    },
    {
      id: 5,
      title: "Responsibilities & Competency",
      description: "Professional responsibilities and competency requirements for inspection and testing personnel",
      icon: Zap,
      link: "../module-1/section-5",
    },
    {
      id: 6,
      title: "Overview of Test Documentation",
      description: "Essential documentation requirements and certification procedures for electrical installations",
      icon: Check,
      link: "../module-1/section-6",
    },
    {
      id: 7,
      title: "Summary & Key Takeaways",
      description: "Consolidation of essential knowledge and fundamental principles for inspection and testing",
      icon: Flag,
      link: "../module-1/section-7",
    },
    {
      id: 8,
      title: "Terminology Refresher",
      description: "Key electrical terminology and definitions used in inspection and testing procedures",
      icon: Info,
      link: "../module-1/section-8",
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
            Module 1: Introduction to Inspection & Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Essential foundation knowledge and regulatory requirements for electrical inspection and testing
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

export default Module1;
