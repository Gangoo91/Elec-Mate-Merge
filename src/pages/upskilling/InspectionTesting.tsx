
import { ArrowLeft, BookOpen, Shield, Eye, Zap, TestTube, FileCheck, GraduationCap, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const InspectionTesting = () => {
  const modules = [
    {
      id: 1,
      title: "Introduction to Inspection & Testing",
      description: "Essential foundation knowledge and regulatory requirements for electrical inspection and testing",
      icon: BookOpen,
      link: "../module-1",
    },
    {
      id: 2,
      title: "Safety, Tools & Preparation",
      description: "Safety protocols, testing equipment selection and pre-inspection preparation procedures",
      icon: Shield,
      link: "../module-2",
    },
    {
      id: 3,
      title: "Visual Inspection & Pre-Test Requirements",
      description: "Comprehensive visual inspection techniques and documentation requirements before testing",
      icon: Eye,
      link: "../module-3",
    },
    {
      id: 4,
      title: "Continuity & Insulation Resistance Testing",
      description: "Protective conductor continuity and insulation resistance measurement procedures",
      icon: Zap,
      link: "../module-4",
    },
    {
      id: 5,
      title: "Polarity, Earth Fault Loop Impedance & Fault Current Testing",
      description: "Advanced testing procedures for circuit protection and earthing system verification",
      icon: TestTube,
      link: "../module-5",
    },
    {
      id: 6,
      title: "RCD Testing & Functional Verification",
      description: "Residual current device testing and functional checks for safety systems",
      icon: FileCheck,
      link: "../module-6",
    },
    {
      id: 7,
      title: "Reporting & Certification",
      description: "Electrical Installation Condition Reports and certification procedures to BS 7671",
      icon: ClipboardCheck,
      link: "../module-7",
    },
    {
      id: 8,
      title: "Mock Exams & Self-Assessment",
      description: "Practice examinations and competency assessment for City & Guilds qualifications",
      icon: GraduationCap,
      link: "../module-8",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
        
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Inspection & Testing
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Electrical inspection, testing and certification procedures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Grid Container with equal height cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {modules.map((module) => {
              const IconComponent = module.icon;
              
              const cardContent = (
                <Card 
                  className="bg-card border-transparent hover:border-yellow-400/30 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col"
                >
                  <CardHeader className="text-center space-y-3 pb-2 p-4 flex-shrink-0">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <IconComponent className="h-8 w-8 text-yellow-400" strokeWidth={1.5} />
                    </div>
                    
                    {/* Module Badge */}
                    <div className="flex justify-center">
                      <Badge 
                        variant="secondary" 
                        className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-bold text-xs px-3 py-1 border-0"
                      >
                        Module {module.id}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-2 pt-0 p-4 flex-grow flex flex-col justify-center">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                      {module.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white text-xs leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              );

              return module.link ? (
                <Link key={module.id} to={module.link} className="h-full">
                  {cardContent}
                </Link>
              ) : (
                <div key={module.id} className="h-full">
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

export default InspectionTesting;
