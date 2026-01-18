import { ArrowLeft, CheckCircle, ToggleLeft, Activity, BarChart, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const FiberOpticsModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Continuity and Polarity Checks",
      icon: CheckCircle,
      description: "Basic connectivity and polarity verification"
    },
    {
      id: 3,
      title: "OTDR Testing Basics",
      icon: Activity,
      description: "Optical time domain reflectometer fundamentals"
    },
    {
      id: 4,
      title: "Interpreting Test Results",
      icon: BarChart,
      description: "Understanding and analyzing measurement data"
    },
    {
      id: 5,
      title: "Fibre Testing Pass/Fail Criteria",
      icon: Award,
      description: "Performance standards and acceptance criteria"
    },
    {
      id: 6,
      title: "Generating Test Reports",
      icon: FileText,
      description: "Documentation and certification reporting"
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
            <Link to="/study-centre/upskilling/fiber-optics-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fiber Optics Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fibre Testing and Certification
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Comprehensive testing methods and certification procedures
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fiber-optics-module-5-section-${section.id}`}
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

export default FiberOpticsModule5;
