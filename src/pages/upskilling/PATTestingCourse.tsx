import React from 'react';
import { ArrowLeft, BookOpen, Zap, Eye, Wrench, FileText, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const PATTestingCourse = () => {
  const modules: Array<{
    id: number | string;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Introduction to Portable Appliance Testing",
      description: "PAT testing fundamentals and legal requirements",
      duration: "40 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Understanding Class I, II, and III Appliances",
      description: "Classification of electrical appliances",
      duration: "45 mins",
      icon: Zap
    },
    {
      id: 3,
      title: "Visual Inspections and Safety Assessment",
      description: "Comprehensive visual inspection techniques",
      duration: "50 mins",
      icon: Eye
    },
    {
      id: 4,
      title: "Electrical Testing Methods and Equipment",
      description: "Practical testing techniques and equipment usage",
      duration: "55 mins",
      icon: Wrench
    },
    {
      id: 5,
      title: "Documentation, Labelling, and Legal Requirements",
      description: "Compliance and record keeping",
      duration: "45 mins",
      icon: FileText
    },
    {
      id: "exam",
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "60 mins",
      icon: GraduationCap,
      isExam: true
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            PAT Testing Certification
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Portable appliance testing procedures and certification requirements
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../pat-testing-mock-exam` : `../pat-testing-module-${module.id}`}
              moduleNumber={typeof module.id === 'number' ? module.id : 0}
              title={module.title}
              description={module.description}
              duration={module.duration}
              icon={module.icon}
              isExam={module.isExam}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PATTestingCourse;
