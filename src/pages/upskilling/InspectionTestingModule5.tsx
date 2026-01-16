import { ArrowLeft, CircleDot, Route, Home, Table, Calculator, Shield, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    number: 'Section 1',
    title: 'Earth Fault Path Principles',
    description: 'Understanding the earth fault current path and its importance for protective device operation',
    icon: Route,
    href: 'section1',
  },
  {
    number: 'Section 2',
    title: 'Zs Testing Methods',
    description: 'Techniques for measuring earth fault loop impedance at circuit endpoints',
    icon: CircleDot,
    href: 'section2',
  },
  {
    number: 'Section 3',
    title: 'Ze Testing at Origin',
    description: 'Measuring external earth fault loop impedance at the supply origin',
    icon: Home,
    href: 'section3',
  },
  {
    number: 'Section 4',
    title: 'Maximum Zs Values (BS 7671 Tables)',
    description: 'Understanding and applying maximum permitted Zs values from regulation tables',
    icon: Table,
    href: 'section4',
  },
  {
    number: 'Section 5',
    title: 'Prospective Fault Current Calculation',
    description: 'Calculating IPFC from earth fault loop impedance measurements',
    icon: Calculator,
    href: 'section5',
  },
  {
    number: 'Section 6',
    title: 'EFLI Testing of RCD-Protected Circuits',
    description: 'Special considerations for testing earth fault loop impedance on RCD-protected circuits',
    icon: Shield,
    href: 'section6',
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
              <span>Module 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Earth Fault Loop Impedance
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto">
              Master the measurement and verification of earth fault loop impedance to ensure
              automatic disconnection of supply operates within required times.
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
