import { ArrowLeft, Layers, Clock, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 1: Categories of Fire Alarm Systems - Fire Alarm Course";
const DESCRIPTION = "Learn about L, P, and M fire alarm system categories under BS 5839-1, their applications, and how to select the right category for different building types.";

const FireAlarmModule1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "L Category Systems (Life Safety)",
      description: "L1-L5 categories for life protection, coverage requirements and applications",
      icon: CheckCircle,
      link: "section-1",
    },
    {
      id: 2,
      title: "P Category Systems (Property)",
      description: "P1 and P2 categories for property protection and insurance requirements",
      icon: CheckCircle,
      link: "section-2",
    },
    {
      id: 3,
      title: "M Category Systems (Manual)",
      description: "Manual-only systems, call points and when M category is appropriate",
      icon: CheckCircle,
      link: "section-3",
    },
    {
      id: 4,
      title: "Category Selection & Risk Assessment",
      description: "Choosing the right category based on building use, occupancy and fire risk",
      icon: CheckCircle,
      link: "section-4",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1 text-white min-h-[48px]">
            <Link to="../fire-alarm-course">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Course</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Module 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Layers className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 1 of 7
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Categories of Fire Alarm Systems
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding L, P, and M categories under BS 5839-1 and how to select the appropriate system for different applications.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {sections.length} sections
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            2-3 hours
          </span>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

      {/* Module Overview Card */}
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-white/80">Module Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[13px] text-white/70">
            <p>This module covers the fundamental classification system used in BS 5839-1 for fire detection and alarm systems.</p>
            <p>You'll learn when to specify L1-L5 for life safety, P1-P2 for property protection, and M for manual-only applications.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FireAlarmModule1;
