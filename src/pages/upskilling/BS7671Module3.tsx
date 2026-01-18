import { ArrowLeft, Grid, Calculator, Thermometer, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BS7671Module3 = () => {
  const sections = [
    {
      id: 1,
      title: "Supply Systems – TN-S, TN-C-S, TT, IT",
      icon: Grid,
      description: "Understanding earthing arrangements and their safety implications"
    },
    {
      id: 2,
      title: "Maximum Demand, Diversity, and Load Profiles",
      icon: Calculator,
      description: "Load calculations, diversity factors, and system design principles"
    },
    {
      id: 3,
      title: "External Influences and Installation Conditions",
      icon: Thermometer,
      description: "Environmental conditions affecting material selection and installation methods"
    },
    {
      id: 4,
      title: "Voltage Drop and System Design Limits",
      icon: Zap,
      description: "Calculating and managing voltage drop within BS 7671 limits"
    },
    {
      id: 5,
      title: "Earthing Arrangements and Protective Measures Selection",
      icon: Shield,
      description: "Matching earthing systems with appropriate protection strategies"
    },
    {
      id: 6,
      title: "Amendment 3 Current Requirements",
      icon: TrendingUp,
      description: "Latest bidirectional protection and renewable energy integration requirements"
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
            <Link to="/study-centre/upskilling/bs7671-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            General Characteristics & Selection Criteria
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            System design fundamentals, earthing arrangements, and selection criteria
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bs7671-module-3-section-${section.id}`}
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

export default BS7671Module3;
