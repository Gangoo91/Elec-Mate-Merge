import { ArrowLeft, PoundSterling, TrendingUp, Calculator, Wrench, CreditCard, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const RenewableEnergyModule9 = () => {
  const sections = [
    {
      id: 1,
      title: "Feed-in Tariff (Legacy), SEG, and Net Metering",
      icon: PoundSterling,
      description: "Understanding payment schemes and energy export mechanisms"
    },
    {
      id: 2,
      title: "Understanding ROI, Payback Periods, and System Lifespan",
      icon: TrendingUp,
      description: "Financial metrics and return on investment calculations"
    },
    {
      id: 3,
      title: "Cost-Benefit Analysis (Domestic vs Commercial Systems)",
      icon: Calculator,
      description: "Comparing financial benefits across different system types"
    },
    {
      id: 4,
      title: "Tools for Estimating Yield and Return (PV*Sol, SAP, etc.)",
      icon: Wrench,
      description: "Software tools for financial modelling and yield estimation"
    },
    {
      id: 5,
      title: "Green Finance and Funding Options",
      icon: CreditCard,
      description: "Government schemes, commercial finance structures, and green loan products"
    },
    {
      id: 6,
      title: "Tax Implications and Legal Considerations",
      icon: Scale,
      description: "VAT treatment, tax allowances, planning requirements, and consumer protection"
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
            <Link to="/electrician/upskilling/renewable-energy-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Renewable Energy Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 9</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">40 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Incentives, Payback, and Financial Modelling
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding financial incentives and modelling system returns
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../renewable-energy-module-9-section-${section.id}`}
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

export default RenewableEnergyModule9;
