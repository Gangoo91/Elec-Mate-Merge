import { ArrowLeft, BookOpen, Scale, FileText, Wrench, Shield, ClipboardList, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
          <div className="grid grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={section.id} className="h-full block">
                  <Card
                    className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[200px]"
                  >
                    {/* Accent line at top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                    <CardContent className="relative text-center space-y-3 p-4">
                      {/* Icon with gradient bg */}
                      <div className="flex justify-center">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                          <section.icon className="h-6 w-6 text-elec-yellow" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Section Badge */}
                      <div className="flex justify-center">
                        <Badge
                          variant="secondary"
                          className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 font-bold text-xs px-3 py-1"
                        >
                          Section {section.number}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
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
