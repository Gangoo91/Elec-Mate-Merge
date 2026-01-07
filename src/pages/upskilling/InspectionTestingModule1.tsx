import { ArrowLeft, BookOpen, Scale, FileText, Wrench, Shield, ClipboardList, ChevronRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 'section1',
    number: 1,
    title: 'Purpose and Legal Requirements',
    description: 'Understanding why inspection and testing is essential, legal obligations under the Electricity at Work Regulations, and duty of care responsibilities.',
    icon: Scale,
    duration: '25 mins',
    topics: ['Legal framework', 'Duty of care', 'Compliance requirements']
  },
  {
    id: 'section2',
    number: 2,
    title: 'BS 7671 Testing Requirements Overview',
    description: 'Comprehensive overview of the testing requirements specified in BS 7671, including initial verification and periodic inspection.',
    icon: FileText,
    duration: '30 mins',
    topics: ['Chapter 61 requirements', 'Initial verification', 'Periodic inspection']
  },
  {
    id: 'section3',
    number: 3,
    title: 'Test Equipment and Calibration',
    description: 'Essential test instruments, their specifications, calibration requirements, and how to verify equipment accuracy.',
    icon: Wrench,
    duration: '35 mins',
    topics: ['Multifunction testers', 'Calibration certificates', 'Equipment checks']
  },
  {
    id: 'section4',
    number: 4,
    title: 'Safety During Testing',
    description: 'Safe isolation procedures, personal protective equipment, risk assessment, and safe working practices during electrical testing.',
    icon: Shield,
    duration: '30 mins',
    topics: ['Safe isolation', 'PPE requirements', 'Risk assessment']
  },
  {
    id: 'section5',
    number: 5,
    title: 'Test Sequence and Documentation',
    description: 'The correct sequence for carrying out tests and how to properly document results on electrical installation certificates.',
    icon: ClipboardList,
    duration: '25 mins',
    topics: ['Test sequence', 'Certificate completion', 'Record keeping']
  }
];

export default function InspectionTestingModule1() {
  useSEO({
    title: 'Module 1: Introduction to Inspection & Testing | Elec-Mate',
    description: 'Learn the fundamentals of electrical inspection and testing including legal requirements, BS 7671 standards, test equipment, safety procedures, and documentation.'
  });

  const totalDuration = sections.reduce((acc, section) => {
    const mins = parseInt(section.duration);
    return acc + mins;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* iOS-style Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
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
            <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate">
              Module 1
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Introduction to Inspection & Testing
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 pb-safe">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Module 1 of 8
              </span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                Introduction to Inspection & Testing
              </h2>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-4">
            Master the foundational knowledge required for electrical inspection and testing.
            This module covers legal requirements, BS 7671 standards, equipment, safety procedures,
            and proper documentation practices.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                5 Sections
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <BookOpen className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {totalDuration} mins total
              </span>
            </div>
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Learning Objectives
          </h3>
          <Card variant="ios" className="p-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">1</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Understand the legal framework and requirements for electrical testing
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">2</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Identify the testing requirements specified in BS 7671
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Select and verify appropriate test equipment for different tests
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">4</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Apply safe working practices during electrical testing
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">5</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Complete electrical certificates and documentation correctly
                </span>
              </li>
            </ul>
          </Card>
        </section>

        {/* Section Navigation Grid */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Module Sections
          </h3>
          <div className="grid gap-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Link key={section.id} to={section.id}>
                  <Card
                    variant="ios"
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors active:scale-[0.98] min-h-[48px]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            Section {section.number}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {section.duration}
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          {section.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {section.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {section.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-3" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Start Module CTA */}
        <section className="pb-6">
          <Card variant="ios" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 border-0">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to Begin?
              </h3>
              <p className="text-blue-100 mb-4">
                Start with Section 1 and work through each section in order for the best learning experience.
              </p>
              <Link to="section1">
                <Button
                  variant="ios-primary"
                  className="w-full sm:w-auto min-h-[48px] bg-white text-blue-600 hover:bg-blue-50"
                >
                  Start Section 1
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
