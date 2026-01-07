import { ArrowLeft, BookOpen, Shield, Link2, Zap, CircleDot, FileCheck, ToggleRight, Eye, ChevronRight, Clock, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Inspection & Testing Course - Electrical Upskilling";
const DESCRIPTION = "Master electrical inspection and testing with our comprehensive BS 7671 compliant course. 8 modules covering safe isolation, continuity, insulation resistance, earth fault loop, RCD testing, and certification.";

const InspectionTesting = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const modules = [
    {
      id: 1,
      title: "Introduction to Inspection & Testing",
      description: "Purpose, legal requirements, BS 7671 overview, test equipment and safety",
      icon: BookOpen,
      link: "module1",
      sections: 5,
      duration: "2-3 hours",
    },
    {
      id: 2,
      title: "Safe Isolation Procedures",
      description: "Isolation principles, lock-off/tag-out, proving dead, re-energisation",
      icon: Shield,
      link: "module2",
      sections: 6,
      duration: "2-3 hours",
    },
    {
      id: 3,
      title: "Continuity Testing",
      description: "R1+R2, ring final circuits, bonding conductors, measurement techniques",
      icon: Link2,
      link: "module3",
      sections: 6,
      duration: "3-4 hours",
    },
    {
      id: 4,
      title: "Insulation Resistance Testing",
      description: "Test voltages, procedures, SERDs, interpreting results, troubleshooting",
      icon: Zap,
      link: "module4",
      sections: 6,
      duration: "3-4 hours",
    },
    {
      id: 5,
      title: "Earth Fault Loop Impedance",
      description: "Zs and Ze testing, maximum values, PFC calculation, RCD circuits",
      icon: CircleDot,
      link: "module5",
      sections: 6,
      duration: "3-4 hours",
    },
    {
      id: 6,
      title: "RCD Testing",
      description: "RCD types, trip time testing, ramp testing, selective discrimination",
      icon: FileCheck,
      link: "module6",
      sections: 5,
      duration: "2-3 hours",
    },
    {
      id: 7,
      title: "Polarity & Functional Testing",
      description: "Polarity verification, three-phase rotation, switchgear operation",
      icon: ToggleRight,
      link: "module7",
      sections: 5,
      duration: "2-3 hours",
    },
    {
      id: 8,
      title: "Visual Inspection & Documentation",
      description: "Inspection checklists, EICs, PIRs, Minor Works certificates",
      icon: Eye,
      link: "module8",
      sections: 5,
      duration: "2-3 hours",
    }
  ];

  const totalSections = modules.reduce((acc, m) => acc + m.sections, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="/electrician/upskilling">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Inspection & Testing</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Zap className="h-8 w-8 text-elec-yellow" />
          </div>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Inspection & Testing
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-6">
          Master electrical inspection and testing procedures to BS 7671. From safe isolation to certification documentation.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{modules.length}</div>
            <div className="text-[13px] text-white/60">Modules</div>
          </Card>
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{totalSections}</div>
            <div className="text-[13px] text-white/60">Sections</div>
          </Card>
          <Card variant="ios" className="p-3 text-center">
            <div className="text-2xl font-bold text-elec-yellow">20+</div>
            <div className="text-[13px] text-white/60">Hours</div>
          </Card>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-elec-yellow" />
              What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Safe isolation procedures and proving dead techniques</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">All BS 7671 required tests: continuity, insulation, earth fault loop, RCD</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Electrical Installation Certificates and condition reports</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Practical fault-finding and troubleshooting skills</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Module List */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Course Modules</h2>
        <div className="space-y-3">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link key={module.id} to={module.link} className="block">
                <Card
                  variant="ios"
                  interactive
                  className="p-4 transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
                          Module {module.id}
                        </span>
                        <span className="text-[11px] text-white/40">•</span>
                        <span className="text-[11px] text-white/50 flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {module.sections} sections
                        </span>
                      </div>
                      <h3 className="text-[17px] font-semibold text-white leading-tight mb-1">
                        {module.title}
                      </h3>
                      <p className="text-[13px] text-white/60 line-clamp-1">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-[12px] text-white/40">
                        <Clock className="h-3 w-3" />
                        {module.duration}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom Safe Area Padding */}
      <div className="h-8 pb-safe" />
    </div>
  );
};

export default InspectionTesting;
