import { ArrowLeft, Layers, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
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
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Layers className="h-7 w-7 text-blue-400" />
          </div>
          <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wide">
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
          {sections.map((section) => (
            <Link key={section.id} to={section.link}>
              <Card variant="ios" className="h-full active:scale-[0.98] transition-transform touch-manipulation">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <section.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white/50 mb-1">Section {section.id}</p>
                      <h3 className="text-[15px] font-semibold text-white mb-1 leading-tight">{section.title}</h3>
                      <p className="text-[13px] text-white/60 line-clamp-2">{section.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Module Overview Card */}
      <section className="px-4 pb-safe max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-blue-500/20">
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
