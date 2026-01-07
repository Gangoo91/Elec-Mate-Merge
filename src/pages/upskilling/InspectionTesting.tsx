import { ArrowLeft, BookOpen, Shield, Eye, Zap, TestTube, FileCheck, GraduationCap, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/electrician/upskilling">
        <Button variant="ghost" className="text-white hover:text-foreground transition-colors p-0 h-auto min-h-[48px]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Study Centre
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Inspection & Testing
        </h1>
        <p className="text-sm sm:text-base text-white">
          Electrical inspection, testing and certification procedures
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link key={module.id} to={module.link} className="block h-full">
                <div className="bg-card/50 rounded-lg active:scale-[0.98] active:bg-card/70 transition-all duration-200 cursor-pointer h-full flex flex-col min-h-[48px]">
                  <div className="text-center p-3 sm:p-4 flex-grow flex flex-col justify-center min-h-[48px]">
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
                      </div>
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-medium text-primary/70 uppercase tracking-wide mb-1">
                      Module {module.id}
                    </span>

                    <h3 className="text-sm sm:text-base font-semibold text-white leading-tight mb-1 line-clamp-2">
                      {module.title}
                    </h3>

                    <p className="text-white text-[10px] sm:text-xs line-clamp-2 hidden sm:block">
                      {module.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default InspectionTesting;
