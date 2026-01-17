import { ArrowLeft, Search, Clock, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 2: Detectors, Call Points & Devices - Fire Alarm Course";
const DESCRIPTION = "Learn about smoke, heat, and multisensor detectors, manual call points, sounders, and visual alarm devices used in fire alarm systems.";

const FireAlarmModule2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Detector Technologies",
      description: "Smoke, heat, multisensor and beam detector types and operating principles",
      icon: CheckCircle,
      link: "section-1",
    },
    {
      id: 2,
      title: "Detector Siting & Coverage",
      description: "Spacing requirements, ceiling heights and environmental considerations",
      icon: CheckCircle,
      link: "section-2",
    },
    {
      id: 3,
      title: "Manual Call Points",
      description: "Types, positioning requirements and accessibility standards",
      icon: CheckCircle,
      link: "section-3",
    },
    {
      id: 4,
      title: "Sounders & VADs",
      description: "Audible and visual alarm devices, coverage and sound levels",
      icon: CheckCircle,
      link: "section-4",
    },
    {
      id: 5,
      title: "False Alarm Management",
      description: "Causes of false alarms, detector selection and mitigation strategies",
      icon: CheckCircle,
      link: "section-5",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1 text-white min-h-[48px]">
            <Link to="/study-centre/upskilling/fire-alarm-course">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Course</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Module 2</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Search className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 2 of 7
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Detectors, Call Points & Devices
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed mb-4">
          Understanding detection technologies, device selection, siting requirements and false alarm prevention.
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
      <section className="px-4 pb-8 max-w-3xl mx-auto">
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
      <section className="px-4 pb-safe max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[15px] font-semibold text-white/80">Module Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[13px] text-white/70">
            <p>This module covers the detection and alarm devices that form the core of any fire alarm system.</p>
            <p>You'll learn to select appropriate detector types for different environments and understand siting requirements per BS 5839.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FireAlarmModule2;
