import { ArrowLeft, BookOpen, Scale, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

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
            <Link to="/electrician/upskilling/bs7671-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to BS7671 Course
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
            <span className="text-white/60 text-xs">4 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">45 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Scope, Object & Fundamental Principles
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding the foundational principles and legal framework of BS 7671
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-1-section-${section.id}`}
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

export default BS7671Module1;
