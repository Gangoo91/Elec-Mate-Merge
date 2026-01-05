
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
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6">
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 mb-4 sm:mb-6 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Inspection & Testing
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            Electrical inspection, testing and certification procedures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {/* Grid Container with equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
          {modules.map((module) => {
            const IconComponent = module.icon;

            const cardContent = (
              <Card className="bg-card border-border/30 hover:border-primary/40 transition-all duration-300 hover:bg-card/80 cursor-pointer group h-full flex flex-col active:scale-[0.98]">
                <CardHeader className="text-center space-y-2 sm:space-y-3 pb-2 p-3 sm:p-4 flex-shrink-0">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Module Badge */}
                  <div className="flex justify-center">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 border-0"
                    >
                      Module {module.id}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="text-center space-y-1 sm:space-y-2 pt-0 p-3 sm:p-4 flex-grow flex flex-col justify-center">
                  {/* Title */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            );

            return module.link ? (
              <Link key={module.id} to={module.link} className="block h-full">
                {cardContent}
              </Link>
            ) : (
              <div key={module.id} className="h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default InspectionTesting;
