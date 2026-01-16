import { ArrowLeft, ClipboardList, Tag, Table, FileCheck, FileText, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: 'Section 1',
    title: 'Initial Visual Inspection Checklist',
    description: 'Systematic approach to visual inspection before testing, covering all BS 7671 requirements',
    icon: ClipboardList,
    href: 'section1',
  },
  {
    number: 'Section 2',
    title: 'Identification and Labelling',
    description: 'Requirements for circuit identification, warning labels, and equipment marking',
    icon: Tag,
    href: 'section2',
  },
  {
    number: 'Section 3',
    title: 'Schedule of Test Results',
    description: 'Recording and presenting test results in the correct format for certification',
    icon: Table,
    href: 'section3',
  },
  {
    number: 'Section 4',
    title: 'Electrical Installation Certificates',
    description: 'Completing EICs for new installations including design, construction, and inspection details',
    icon: FileCheck,
    href: 'section4',
  },
  {
    number: 'Section 5',
    title: 'Minor Works Certificates and PIR',
    description: 'Documentation requirements for minor works and periodic inspection reports',
    icon: FileText,
    href: 'section5',
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../inspection-testing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Zap className="h-4 w-4" />
              <span>Module 8</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Visual Inspection & Documentation
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Learn systematic visual inspection techniques and master the documentation
              required for electrical installation certification.
            </p>
          </header>

          {/* Sections Grid */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
            <div className="grid grid-cols-1 gap-4">
              {sections.map((section, index) => (
                <ModuleCard
                  key={index}
                  number={section.number}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  href={section.href}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
