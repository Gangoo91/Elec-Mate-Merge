import { ArrowLeft, Wrench, ChevronRight, Clock, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 5: Installation & Commissioning - Fire Alarm Course";
const DESCRIPTION = "Learn about fire alarm installation procedures, wiring methods, commissioning processes and handover requirements.";

const FireAlarmModule5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Pre-Installation Planning",
      description: "Site surveys, coordination, health & safety and logistics",
      icon: CheckCircle,
      link: "section-1",
    },
    {
      id: 2,
      title: "Control Panel Installation",
      description: "Panel positioning, mounting, terminations and mains connection",
      icon: CheckCircle,
      link: "section-2",
    },
    {
      id: 3,
      title: "Device Installation",
      description: "Detector mounting, MCP positioning, sounder installation",
      icon: CheckCircle,
      link: "section-3",
    },
    {
      id: 4,
      title: "Wiring & Terminations",
      description: "Cable installation, termination techniques and testing",
      icon: CheckCircle,
      link: "section-4",
    },
    {
      id: 5,
      title: "Commissioning Procedures",
      description: "System setup, device testing, cause & effect verification",
      icon: CheckCircle,
      link: "section-5",
    },
    {
      id: 6,
      title: "Handover & Documentation",
      description: "Client training, O&M manuals, certificates and logbooks",
      icon: CheckCircle,
      link: "section-6",
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
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Module 5</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <Wrench className="h-7 w-7 text-orange-400" />
          </div>
          <span className="text-[11px] font-medium text-orange-400 uppercase tracking-wide">
            Module 5 of 7
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Installation & Commissioning
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Practical guidance on installing fire alarm systems, from planning through to commissioning and handover.
        </p>
        <div className="flex items-center gap-4 text-[13px] text-white/50">
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {sections.length} sections
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            3-4 hours
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
                    <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <section.icon className="h-5 w-5 text-orange-400" />
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
        <Card variant="ios-elevated" className="border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-white/80">Module Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[13px] text-white/70">
            <p>This module covers the practical aspects of fire alarm system installation, from initial site work through to final commissioning.</p>
            <p>You'll learn industry best practices for installation quality, testing procedures and professional handover documentation.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FireAlarmModule5;
