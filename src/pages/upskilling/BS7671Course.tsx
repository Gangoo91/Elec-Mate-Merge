import React from 'react';
import { ArrowLeft, FileText, CheckCircle, BookOpen, Book, Settings, Shield, Wrench, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const BS7671Course = () => {
  const modules: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Scope, Object & Fundamental Principles",
      description: "Foundational principles and legal framework",
      duration: "45 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Definitions & Key Terminology",
      description: "Essential vocabulary and definitions",
      duration: "50 mins",
      icon: Book
    },
    {
      id: 3,
      title: "General Characteristics & Selection Criteria",
      description: "System design and earthing arrangements",
      duration: "55 mins",
      icon: Settings
    },
    {
      id: 4,
      title: "Protection for Safety",
      description: "Safety protection methods and devices",
      duration: "60 mins",
      icon: Shield
    },
    {
      id: 5,
      title: "Selection & Erection of Equipment",
      description: "Equipment selection and installation",
      duration: "65 mins",
      icon: Wrench
    },
    {
      id: 6,
      title: "Inspection, Testing & Certification",
      description: "Verification and certification processes",
      duration: "55 mins",
      icon: CheckCircle
    },
    {
      id: 7,
      title: "Special Installations & Locations",
      description: "Requirements for special locations",
      duration: "50 mins",
      icon: MapPin
    },
    {
      id: 8,
      title: "Appendices & Latest Amendments",
      description: "Reference materials and Amendment 3",
      duration: "45 mins",
      icon: FileText
    },
    {
      id: 9,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "90 mins",
      icon: GraduationCap,
      isExam: true
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            18th Edition (BS7671)
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Wiring regulations and electrical safety
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../bs7671-module-${module.id}` : `../bs7671-module-${module.id}`}
              moduleNumber={module.id}
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

export default BS7671Course;
