import { ArrowLeft, CircleDot, Route, Home, Table, Calculator, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Earth Fault Path Principles',
    description: 'Understanding the earth fault current path and its importance for protective device operation',
    icon: Route,
  },
  {
    id: 2,
    title: 'Zs Testing Methods',
    description: 'Techniques for measuring earth fault loop impedance at circuit endpoints',
    icon: CircleDot,
  },
  {
    id: 3,
    title: 'Ze Testing at Origin',
    description: 'Measuring external earth fault loop impedance at the supply origin',
    icon: Home,
  },
  {
    id: 4,
    title: 'Maximum Zs Values (BS 7671 Tables)',
    description: 'Understanding and applying maximum permitted Zs values from regulation tables',
    icon: Table,
  },
  {
    id: 5,
    title: 'Prospective Fault Current Calculation',
    description: 'Calculating IPFC from earth fault loop impedance measurements',
    icon: Calculator,
  },
  {
    id: 6,
    title: 'EFLI Testing of RCD-Protected Circuits',
    description: 'Special considerations for testing earth fault loop impedance on RCD-protected circuits',
    icon: Shield,
  },
];

export default function InspectionTestingModule5() {
  useSEO({
    title: 'Module 5: Earth Fault Loop Impedance | Inspection & Testing',
    description: 'Learn earth fault loop impedance testing including Zs and Ze measurements, maximum values from BS 7671, and RCD-protected circuit testing.',
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
            <Link to="/electrician/upskilling/inspection-testing">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Earth Fault Loop Impedance
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master the measurement and verification of earth fault loop impedance to ensure automatic disconnection of supply operates within required times
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../inspection-testing-module-5-section-${section.id}`}
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
