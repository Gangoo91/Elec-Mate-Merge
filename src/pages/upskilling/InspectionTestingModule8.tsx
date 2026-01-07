import { ArrowLeft, Eye, ClipboardList, Tag, Table, FileCheck, FileText, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 'section1',
    title: 'Initial Visual Inspection Checklist',
    description: 'Systematic approach to visual inspection before testing, covering all BS 7671 requirements',
    icon: ClipboardList,
  },
  {
    id: 'section2',
    title: 'Identification and Labeling',
    description: 'Requirements for circuit identification, warning labels, and equipment marking',
    icon: Tag,
  },
  {
    id: 'section3',
    title: 'Schedule of Test Results',
    description: 'Recording and presenting test results in the correct format for certification',
    icon: Table,
  },
  {
    id: 'section4',
    title: 'Electrical Installation Certificates',
    description: 'Completing EICs for new installations including design, construction, and inspection details',
    icon: FileCheck,
  },
  {
    id: 'section5',
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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/95 border-b border-gray-800/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="../inspection-testing">
            <Button
              variant="ios-ghost"
              size="icon"
              className="h-12 w-12 min-h-[48px] min-w-[48px]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Module 8</p>
            <h1 className="text-lg font-semibold text-white truncate">
              Visual Inspection & Documentation
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe">
        {/* Hero section */}
        <section className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-elec-yellow to-yellow-600 flex items-center justify-center shadow-lg">
              <Eye className="h-10 w-10 text-black" />
            </div>
          </div>
          <h2 className="text-[34px] font-bold text-center text-white mb-3 leading-tight">
            Visual Inspection & Documentation
          </h2>
          <p className="text-center text-gray-400 max-w-md mx-auto">
            Learn systematic visual inspection techniques and master the documentation
            required for electrical installation certification.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Target className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm text-gray-400">
              5 sections • Documentation essentials
            </span>
          </div>
        </section>

        {/* Section navigation grid */}
        <section className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4 px-1">
            Module Sections
          </h3>
          <div className="grid gap-3">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.id} to={section.id}>
                  <Card
                    variant="ios"
                    interactive
                    className="p-4 min-h-[48px] bg-gray-900/50 border-gray-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 min-h-[48px] min-w-[48px] rounded-2xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-elec-yellow">
                            Section {index + 1}
                          </span>
                        </div>
                        <h4 className="font-semibold text-white text-base leading-tight mb-1">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick start CTA */}
        <section className="mb-8">
          <Card variant="ios" className="p-6 bg-gradient-to-br from-elec-yellow to-yellow-600 border-0">
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-2">
                Ready to Begin?
              </h3>
              <p className="text-black/70 text-sm mb-4">
                Start with the initial visual inspection checklist and systematic approach.
              </p>
              <Link to="section1">
                <Button
                  variant="ios-primary"
                  className="min-h-[48px] bg-black text-elec-yellow hover:bg-gray-900"
                >
                  Start Section 1
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
