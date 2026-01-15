import { ArrowLeft, Zap, Gauge, TestTube, Cpu, FileCheck, Wrench, ChevronRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 4: Insulation Resistance Testing - Inspection & Testing";
const DESCRIPTION = "Master insulation resistance testing procedures including test voltages, phase-phase and phase-earth testing, SERDs, interpreting results, and troubleshooting low insulation.";

const InspectionTestingModule4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Principles of Insulation Testing",
      description: "Understanding insulation resistance fundamentals and why testing is essential for electrical safety",
      icon: Gauge,
      link: "section1",
    },
    {
      id: 2,
      title: "Test Voltages and Applications",
      description: "Selecting appropriate test voltages for different circuit types and voltage ratings",
      icon: Zap,
      link: "section2",
    },
    {
      id: 3,
      title: "Testing Procedure (Phase-Phase, Phase-Earth)",
      description: "Step-by-step procedures for conducting insulation resistance tests between conductors",
      icon: TestTube,
      link: "section3",
    },
    {
      id: 4,
      title: "Testing Sensitive Equipment (SERDs)",
      description: "Protecting surge protective devices and sensitive electronics during insulation testing",
      icon: Cpu,
      link: "section4",
    },
    {
      id: 5,
      title: "Interpreting Results and Minimum Values",
      description: "Understanding acceptable insulation resistance values and BS 7671 requirements",
      icon: FileCheck,
      link: "section5",
    },
    {
      id: 6,
      title: "Troubleshooting Low Insulation",
      description: "Diagnosing and locating insulation faults using systematic testing techniques",
      icon: Wrench,
      link: "section6",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1 min-h-[48px] min-w-[48px] touch-manipulation active:scale-[0.98]">
            <Link to="../inspection-testing">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Module 4</span>
          <div className="w-[48px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Zap className="h-8 w-8 text-elec-yellow" />
          </div>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Insulation Resistance Testing
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-6">
          Learn to perform insulation resistance tests correctly, interpret results, and troubleshoot faults to BS 7671 standards.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{sections.length}</div>
            <div className="text-[13px] text-white/60">Sections</div>
          </Card>
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-elec-yellow">3-4</div>
            <div className="text-[13px] text-white/60">Hours</div>
          </Card>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Module Sections</h2>
        <div className="grid grid-cols-1 gap-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={section.link} className="h-full block">
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
                        Section {section.id}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-300">
                      {section.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Start Learning CTA */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <Button variant="ios-primary" size="ios" asChild className="w-full min-h-[48px] touch-manipulation active:scale-[0.98]">
          <Link to="section1">
            Start Learning
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </section>

      {/* Bottom Safe Area Padding */}
      <div className="h-8 pb-safe" />
    </div>
  );
};

export default InspectionTestingModule4;
