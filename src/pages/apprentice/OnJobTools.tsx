import { SmartBackButton } from "@/components/ui/smart-back-button";
import OnTheJobToolsBox from "@/components/apprentice/OnTheJobToolsBox";
import { Card, CardContent } from "@/components/ui/card";
import {
  HardHat, MessageSquare, HelpCircle, BookOpen, Wrench, Zap, Calculator,
  ClipboardCheck, Lightbulb, Shield, Sparkles, TrendingUp, Clock, Award,
  CheckCircle, ArrowRight
} from "lucide-react";

const OnJobTools = () => {
  const onJobTools = [
    {
      id: 1,
      title: "Tools & Materials Guide",
      icon: Wrench,
      description: "Complete guide to professional electrician tools - from hand tools to test equipment, with UK supplier recommendations",
      link: "/apprentice/on-job-tools/tools-guide",
      badge: "Essential",
      color: "yellow"
    },
    {
      id: 2,
      title: "Installation Guides",
      icon: BookOpen,
      description: "Step-by-step guides for domestic, commercial, industrial & outdoor installations with BS7671 compliance",
      link: "/apprentice/on-job-tools/electrical-installation-guides",
      badge: "4 Sectors",
      color: "blue"
    },
    {
      id: 3,
      title: "Site Assessment",
      icon: ClipboardCheck,
      description: "Pre-job safety checklists, site condition assessments, risk analysis templates & installation checks",
      link: "/apprentice/on-job-tools/assessment",
      badge: "15+ Checklists",
      color: "green"
    },
    {
      id: 4,
      title: "Safety Case Studies",
      icon: HardHat,
      description: "Learn from real electrical incidents - make decisions in realistic scenarios and see consequences",
      link: "/apprentice/on-job-tools/safety-cases",
      badge: "Interactive",
      color: "red"
    },
    {
      id: 5,
      title: "Workplace Culture",
      icon: MessageSquare,
      description: "Master site communication, UK trade culture, regional terminology & professional relationships",
      link: "/apprentice/on-job-tools/workplace-culture",
      badge: "6 Modules",
      color: "purple"
    },
    {
      id: 6,
      title: "Ask a Supervisor",
      icon: HelpCircle,
      description: "Knowledge bank with common site questions, when to ask for help & professional communication tips",
      link: "/apprentice/on-job-tools/supervisor-knowledge",
      badge: "FAQ Bank",
      color: "blue"
    },
    {
      id: 7,
      title: "Flashcards",
      icon: Lightbulb,
      description: "Quick revision for cable colours, BS7671 regulations, EICR codes, safe isolation & fault finding",
      link: "/apprentice/on-job-tools/flashcards",
      badge: "100+ Cards",
      color: "orange"
    },
    {
      id: 8,
      title: "BS7671 Run-Through",
      icon: Zap,
      description: "Complete 18th Edition inspection & testing procedures with step-by-step documentation guides",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Full Guide"
    },
    {
      id: 9,
      title: "Calculators",
      icon: Calculator,
      description: "On-site tools for cable sizing, volt drop, maximum demand, protective device selection & more",
      link: "/apprentice/on-job-tools/calculations",
      badge: "10+ Tools",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-elec-yellow/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Sparkles className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  On the Job <span className="text-elec-yellow">Tools</span>
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Everything you need on site - from safety checklists to quick-reference guides.
                Built by electricians, for apprentices.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Award className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-elec-yellow">9</div>
                  <div className="text-xs sm:text-sm text-white/60">Tools Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Lightbulb className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">100+</div>
                  <div className="text-xs sm:text-sm text-white/60">Flashcards</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <ClipboardCheck className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">15+</div>
                  <div className="text-xs sm:text-sm text-white/60">Checklists</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <HardHat className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-400">25+</div>
                  <div className="text-xs sm:text-sm text-white/60">Safety Scenarios</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Safety Banner */}
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                <Shield className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-300 mb-1">Safety First</h3>
                <p className="text-sm text-amber-200/80">
                  These tools help you prepare properly, but never substitute them for training or supervision.
                  When in doubt, <span className="font-medium text-amber-200">stop and ask</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tools Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Your Toolkit
          </h2>
          <OnTheJobToolsBox tools={onJobTools} />
        </div>

        {/* Pro Tips Section */}
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-white/5 via-white/3 to-white/5 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
              </div>
              <h3 className="text-lg font-semibold text-white">Pro Tips for On-Site Success</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-blue-400">Before Starting</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Complete site assessment checklist
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Verify isolation procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Check permits and access
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                  <span className="font-medium text-elec-yellow">During Work</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Document as you go
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Take photos of existing work
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Note any deviations from plans
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-400" />
                  <span className="font-medium text-green-400">After Completion</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Test thoroughly before leaving
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Complete all paperwork
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Log OJT hours with employer
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default OnJobTools;
