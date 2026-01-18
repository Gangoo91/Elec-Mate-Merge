import { ArrowLeft, ClipboardList, Tag, Table, FileCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Initial Visual Inspection Checklist',
    description: 'Systematic approach to visual inspection before testing, covering all BS 7671 requirements',
    icon: ClipboardList,
  },
  {
    id: 2,
    title: 'Identification and Labelling',
    description: 'Requirements for circuit identification, warning labels, and equipment marking',
    icon: Tag,
  },
  {
    id: 3,
    title: 'Schedule of Test Results',
    description: 'Recording and presenting test results in the correct format for certification',
    icon: Table,
  },
  {
    id: 4,
    title: 'Electrical Installation Certificates',
    description: 'Completing EICs for new installations including design, construction, and inspection details',
    icon: FileCheck,
  },
  {
    id: 5,
    title: 'Minor Works Certificates and PIR',
    description: 'Documentation requirements for minor works and periodic inspection reports',
    icon: FileText,
  },
];

export default function InspectionTestingModule8() {
  useSEO({
    title: 'Module 8: Visual Inspection & Documentation | Inspection & Testing',
    description: 'Master visual inspection procedures and certification documentation including EICs, minor works certificates, and periodic inspection reports.',
  });

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
            <Link to="/study-centre/upskilling/inspection-testing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Inspection & Testing
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 8</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Visual Inspection & Documentation
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Learn systematic visual inspection techniques and master the documentation required for electrical installation certification
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-8-section-${section.id}`}
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
}
