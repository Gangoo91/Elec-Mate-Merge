import { ArrowLeft, FileCheck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 6: Testing, Servicing & Certification - Fire Alarm Course";
const DESCRIPTION = "Learn about routine testing schedules, maintenance requirements, fault finding techniques and certification documentation.";

const FireAlarmModule6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Routine Testing Requirements",
      icon: CheckCircle,
      description: "Weekly, monthly, quarterly and annual tests"
    },
    {
      id: 2,
      title: "Servicing & Maintenance",
      icon: CheckCircle,
      description: "Service visit procedures and parts replacement"
    },
    {
      id: 3,
      title: "Fault Finding Techniques",
      icon: CheckCircle,
      description: "Systematic diagnosis and common faults"
    },
    {
      id: 4,
      title: "Record Keeping & Logbooks",
      icon: CheckCircle,
      description: "Maintenance records and compliance evidence"
    },
    {
      id: 5,
      title: "Verification & Certification",
      icon: CheckCircle,
      description: "Certificates of compliance and approval"
    },
    {
      id: 6,
      title: "Handover & Client Training",
      icon: CheckCircle,
      description: "User training and documentation packages"
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
            <Link to="/electrician/upskilling/fire-alarm-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fire Alarm Course
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
            <span className="text-white/60 text-xs">{sections.length} Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">3-4 hours</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
              <FileCheck className="h-7 w-7 text-elec-yellow" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Testing, Servicing & Certification
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Maintaining fire alarm systems through routine testing, scheduled servicing and proper documentation.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fire-alarm-module-6-section-${section.id}`}
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

export default FireAlarmModule6;
