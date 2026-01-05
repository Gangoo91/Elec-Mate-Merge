
import { ArrowLeft, Zap, Cable, TestTube, AlertTriangle, FileText, CheckCircle, Settings, Wrench, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module4 = () => {
  const sections = [
    {
      id: 1,
      title: "Purpose of Continuity Testing",
      description: "Understanding the fundamental reasons and requirements for conducting continuity testing in electrical installations",
      icon: Zap,
      link: "section-1"
    },
    {
      id: 2,
      title: "Protective Conductor Continuity",
      description: "Testing methods and procedures for protective conductor continuity including CPC and equipotential bonding",
      icon: ShieldCheck,
      link: "section-2"
    },
    {
      id: 3,
      title: "Ring Final Circuit Continuity",
      description: "Comprehensive testing procedures for ring final circuits including end-to-end and cross-connection tests",
      icon: RotateCcw,
      link: "section-3"
    },
    {
      id: 4,
      title: "Test Procedures & Expected Values",
      description: "Step-by-step testing procedures and acceptable values for continuity measurements",
      icon: Settings,
      link: "section-4"
    },
    {
      id: 5,
      title: "Purpose of Insulation Resistance Testing",
      description: "Understanding the fundamental principles and requirements for insulation resistance testing",
      icon: Cable,
      link: "section-5"
    },
    {
      id: 6,
      title: "Insulation Resistance Test Methods",
      description: "Practical testing methods and procedures for measuring insulation resistance in different circuit types",
      icon: TestTube,
      link: "section-6"
    },
    {
      id: 7,
      title: "Recording & Interpreting Results",
      description: "Proper documentation and interpretation of continuity and insulation resistance test results",
      icon: FileText,
      link: "section-7"
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
            Module 4: Continuity & Insulation Resistance Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Protective conductor continuity and insulation resistance measurement procedures
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
                <Link key={section.id} to={section.link}>
                  <Card 
                    className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full"
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
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Module4;
