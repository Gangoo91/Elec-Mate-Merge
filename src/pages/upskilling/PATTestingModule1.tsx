import { ArrowLeft, FileText, AlertTriangle, Tag, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const PATTestingModule1 = () => {
  const sections = [
    {
      id: 1,
      title: "What is PAT Testing and Why It's Required",
      icon: FileText,
      description: "Introduction to PAT testing fundamentals and legal requirements"
    },
    {
      id: 2,
      title: "Legal Duties (EAWR, PUWER, H&S at Work Act)",
      icon: AlertTriangle,
      description: "Understanding the legal framework and obligations"
    },
    {
      id: 3,
      title: "Types of Equipment Covered by PAT",
      icon: Tag,
      description: "Classification of equipment requiring PAT testing"
    },
    {
      id: 4,
      title: "Frequency of Inspection and Testing",
      icon: Clock,
      description: "Determining appropriate testing intervals"
    },
    {
      id: 5,
      title: "User Checks vs Formal Inspection and Testing",
      icon: UserCheck,
      description: "Different levels of electrical safety checks"
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
            <Link to="/electrician/upskilling/pat-testing-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to PAT Testing Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">40 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Introduction to PAT Testing
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Fundamentals of Portable Appliance Testing
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../pat-testing-module-1-section-${section.id}`}
              sectionNumber={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule1;
