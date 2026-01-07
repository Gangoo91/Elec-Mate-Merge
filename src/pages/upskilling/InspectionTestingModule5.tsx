import { ArrowLeft, CircleDot, Route, Home, Table, Calculator, Shield, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 'section1',
    title: 'Earth Fault Path Principles',
    description: 'Understanding the earth fault current path and its importance for protective device operation',
    icon: Route,
  },
  {
    id: 'section2',
    title: 'Zs Testing Methods',
    description: 'Techniques for measuring earth fault loop impedance at circuit endpoints',
    icon: CircleDot,
  },
  {
    id: 'section3',
    title: 'Ze Testing at Origin',
    description: 'Measuring external earth fault loop impedance at the supply origin',
    icon: Home,
  },
  {
    id: 'section4',
    title: 'Maximum Zs Values (BS 7671 Tables)',
    description: 'Understanding and applying maximum permitted Zs values from regulation tables',
    icon: Table,
  },
  {
    id: 'section5',
    title: 'Prospective Fault Current Calculation',
    description: 'Calculating IPFC from earth fault loop impedance measurements',
    icon: Calculator,
  },
  {
    id: 'section6',
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* iOS-style sticky header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50">
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Module 5</p>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              Earth Fault Loop Impedance
            </h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe">
        {/* Hero section */}
        <section className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
              <CircleDot className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-3">
            Earth Fault Loop Impedance
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Master the measurement and verification of earth fault loop impedance to ensure
            automatic disconnection of supply operates within required times.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              6 sections • Critical safety testing
            </span>
          </div>
        </section>

        {/* Section navigation grid */}
        <section className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4 px-1">
            Module Sections
          </h3>
          <div className="grid gap-3">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.id} to={section.id}>
                  <Card
                    variant="ios"
                    className="p-4 min-h-[48px] active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 min-h-[48px] min-w-[48px] rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                            Section {index + 1}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-base leading-tight mb-1">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick start CTA */}
        <section className="mb-8">
          <Card variant="ios" className="p-6 bg-gradient-to-br from-orange-500 to-amber-600 border-0">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Begin?
              </h3>
              <p className="text-orange-100 text-sm mb-4">
                Start with understanding earth fault path principles and their importance.
              </p>
              <Link to="section1">
                <Button
                  variant="ios-primary"
                  className="min-h-[48px] bg-white text-orange-600 hover:bg-orange-50"
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
