import { ArrowLeft, Flame, Layers, Search, MapPin, Battery, Wrench, FileCheck, BookOpen, ChevronRight, Clock, Target, Award, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Fire Alarm Systems Course - Electrical Upskilling";
const DESCRIPTION = "Master fire alarm system design, installation and maintenance with our comprehensive BS 5839 compliant course. 7 modules covering system categories, detectors, zone planning, installation, testing and certification.";

const FireAlarmCourse = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const modules = [
    {
      id: 1,
      title: "Categories of Fire Alarm Systems",
      description: "L, P, and M categories under BS 5839-1, applications and selection criteria",
      icon: Layers,
      link: "module-1",
      sections: 4,
      duration: "2-3 hours",
    },
    {
      id: 2,
      title: "Detectors, Call Points & Devices",
      description: "Smoke, heat, multisensor detectors, MCPs, sounders and visual alarms",
      icon: Search,
      link: "module-2",
      sections: 5,
      duration: "3-4 hours",
    },
    {
      id: 3,
      title: "System Design & Zone Planning",
      description: "Zone layouts, coverage calculations, interface design and addressable systems",
      icon: MapPin,
      link: "module-3",
      sections: 6,
      duration: "3-4 hours",
    },
    {
      id: 4,
      title: "Power Supply, Backup & Cabling",
      description: "Primary/secondary supplies, battery sizing, cable types and fire resistance",
      icon: Battery,
      link: "module-4",
      sections: 5,
      duration: "2-3 hours",
    },
    {
      id: 5,
      title: "Installation & Commissioning",
      description: "Installation procedures, wiring methods, commissioning and handover",
      icon: Wrench,
      link: "module-5",
      sections: 6,
      duration: "3-4 hours",
    },
    {
      id: 6,
      title: "Testing, Servicing & Certification",
      description: "Routine testing, maintenance schedules, fault finding and documentation",
      icon: FileCheck,
      link: "module-6",
      sections: 6,
      duration: "3-4 hours",
    },
    {
      id: 7,
      title: "Regulatory Compliance & BS 5839",
      description: "Fire safety legislation, Building Regulations, BS 5839 parts 1 and 6",
      icon: BookOpen,
      link: "module-7",
      sections: 4,
      duration: "2-3 hours",
    }
  ];

  const totalSections = modules.reduce((acc, m) => acc + m.sections, 0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="/electrician/upskilling">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Fire Alarm Systems</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
            <Flame className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Fire Alarm Systems
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-6">
          Master fire detection and alarm system design, installation and maintenance to BS 5839-1 and BS 5839-6.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-red-500">{modules.length}</div>
            <div className="text-[13px] text-white/60">Modules</div>
          </Card>
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-red-500">{totalSections}</div>
            <div className="text-[13px] text-white/60">Sections</div>
          </Card>
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-red-500">20+</div>
            <div className="text-[13px] text-white/60">Hours</div>
          </Card>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-red-500" />
              What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Fire alarm system categories (L1-L5, P1-P2, M) and selection criteria</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Detector technologies, siting requirements and coverage calculations</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Zone design, addressable systems and cause & effect programming</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Installation methods, commissioning procedures and handover</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Testing schedules, maintenance requirements and certification</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Modules Grid */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <h2 className="text-[22px] font-bold text-white mb-4">Course Modules</h2>
        <div className="grid grid-cols-1 gap-4">
          {modules.map((module) => (
            <Link key={module.id} to={module.link}>
              <Card variant="ios" className="h-full active:scale-[0.98] transition-transform touch-manipulation">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 flex-shrink-0">
                      <module.icon className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-medium text-red-500 uppercase tracking-wide">
                          Module {module.id}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-white mb-1 leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-[13px] text-white/60 line-clamp-2 mb-2">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-white/50">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {module.sections} sections
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {module.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Mock Exam Card */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <Link to="mock-exam">
          <Card variant="ios-elevated" className="border-red-500/30 active:scale-[0.98] transition-transform touch-manipulation">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                  <GraduationCap className="h-6 w-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[17px] font-semibold text-white mb-1">Mock Exam</h3>
                  <p className="text-[13px] text-white/60">Test your knowledge with a comprehensive assessment</p>
                </div>
                <ChevronRight className="h-5 w-5 text-white/30" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Key Standards Reference */}
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <Card variant="ios" className="border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold flex items-center gap-2 text-white/80">
              <BookOpen className="h-4 w-4 text-red-500" />
              Key Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-white/60">BS 5839-1</span>
                <span className="text-white/80">Non-domestic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">BS 5839-6</span>
                <span className="text-white/80">Domestic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">BS EN 54</span>
                <span className="text-white/80">Components</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">RRO 2005</span>
                <span className="text-white/80">Fire Safety</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FireAlarmCourse;
