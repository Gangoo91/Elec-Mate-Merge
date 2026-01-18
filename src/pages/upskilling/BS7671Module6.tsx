import { ArrowLeft, CheckCircle, Eye, FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BS7671Module6 = () => {
  const sections = [
    {
      id: 1,
      title: "Requirements for Initial Verification",
      icon: CheckCircle,
      description: "Mandatory verification procedures for new electrical installations"
    },
    {
      id: 2,
      title: "Visual Inspection and Testing Responsibilities",
      icon: Eye,
      description: "Systematic visual inspection requirements and testing responsibilities"
    },
    {
      id: 3,
      title: "Sequence of Tests and Testing Procedures",
      icon: Lightbulb,
      description: "Correct testing sequence and step-by-step procedures per BS 7671"
    },
    {
      id: 4,
      title: "Model Forms and Certification Overview (EIC, MEIWC, EICR)",
      icon: FileText,
      description: "Understanding and completing electrical installation certificates and reports"
    },
    {
      id: 5,
      title: "Certification Errors and Common Pitfalls",
      icon: AlertTriangle,
      description: "Avoiding mistakes and understanding common certification errors"
    },
    {
      id: 6,
      title: "Recording Limitations and Safety Observations",
      icon: CheckCircle,
      description: "Documenting inspection limitations and safety-related observations"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Inspection, Testing & Certification
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Verification procedures, testing requirements, and certification processes
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-6-section-${section.id}`}
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

export default BS7671Module6;
