import { Link } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  FileSearch,
  Zap,
  FileText,
  AlertTriangle,
  Info,
  CheckSquare,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from "lucide-react";

const InspectionTesting = () => {
  const topics = [
    {
      id: "safe-isolation",
      title: "Safe Isolation",
      description: "Life-critical procedures for safely isolating electrical systems before testing",
      icon: Shield,
      iconColor: "text-red-400",
      gradientFrom: "from-red-500/15",
      gradientTo: "to-red-500/5",
      borderColor: "border-red-500/20 hover:border-red-500/40",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Safety Critical",
      badgeColor: "bg-red-500/20 text-red-300 border border-red-500/30",
    },
    {
      id: "initial-vs-periodic",
      title: "Initial vs Periodic Inspection",
      description: "Understanding the differences between initial verification and periodic inspection and testing",
      icon: FileSearch,
      iconColor: "text-blue-400",
      gradientFrom: "from-blue-500/15",
      gradientTo: "to-blue-500/5",
      borderColor: "border-blue-500/20 hover:border-blue-500/40",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Documentation",
      badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    },
    {
      id: "testing-methods",
      title: "Testing Methods",
      description: "Continuity, insulation resistance, loop impedance, RCD testing and polarity checks",
      icon: Zap,
      iconColor: "text-elec-yellow",
      gradientFrom: "from-elec-yellow/15",
      gradientTo: "to-elec-yellow/5",
      borderColor: "border-elec-yellow/20 hover:border-elec-yellow/40",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Electrical Testing",
      badgeColor: "bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30",
    },
    {
      id: "certificates",
      title: "Certificate Completion",
      description: "How to properly complete EIC, EICR, and Minor Works certificates",
      icon: FileText,
      iconColor: "text-purple-400",
      gradientFrom: "from-purple-500/15",
      gradientTo: "to-purple-500/5",
      borderColor: "border-purple-500/20 hover:border-purple-500/40",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Documentation",
      badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-elec-yellow/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {/* Back Button */}
              <SmartBackButton />

              {/* Hero Content */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                    <CheckSquare className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                      BS7671 Inspection & Testing
                    </h1>
                    <p className="hidden sm:block text-lg text-white/80 max-w-2xl leading-relaxed">
                      Master the essential procedures for electrical inspection and testing with comprehensive learning materials
                    </p>
                  </div>
                </div>
              </div>

              {/* Safety Notices - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {/* Safety Notice */}
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">Safety First</p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        <span className="text-red-400 font-medium">Always work under supervision</span> when performing electrical testing. Follow your company's procedures.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Training Aid Notice */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Info className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">Training Aid</p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Supplements your <span className="text-amber-400 font-medium">2391 qualification</span> training. Not a replacement for formal qualifications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* Featured Learning Hub Card */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-2 w-2 rounded-full bg-elec-yellow animate-pulse" />
            <h2 className="text-xl font-bold text-white">Interactive Learning Hub</h2>
          </div>

          <Link
            to="/apprentice/inspection-testing-hub"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl group"
          >
            <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-elec-yellow/5 hover:border-elec-yellow/50 hover:from-elec-yellow/20 hover:via-elec-yellow/15 hover:to-elec-yellow/10 transition-all duration-300 active:scale-[0.98] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Left content area */}
                  <div className="flex-1 p-6 sm:p-8">
                    <div className="flex items-start gap-5">
                      <div className="min-w-[56px] min-h-[56px] p-3.5 rounded-2xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 border border-elec-yellow/20 group-hover:from-elec-yellow/40 group-hover:to-elec-yellow/20 transition-all duration-300 flex-shrink-0 shadow-lg shadow-elec-yellow/10">
                        <GraduationCap className="h-7 w-7 text-elec-yellow" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold text-white">Inspection & Testing Hub</h3>
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-elec-yellow/20 text-elec-yellow font-semibold border border-elec-yellow/30">
                            <Sparkles className="h-3 w-3" />
                            Recommended
                          </span>
                        </div>
                        <p className="text-base text-white/80 leading-relaxed max-w-xl">
                          Access comprehensive inspection and testing training with interactive modules covering testing procedures, fault finding techniques, BS 7671 regulations reference, and knowledge assessments.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-3 py-1.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20 font-medium">Testing Procedures</span>
                          <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/20 font-medium">Fault Finding</span>
                          <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 font-medium">Regulations</span>
                          <span className="text-xs px-3 py-1.5 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20 font-medium">Quizzes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA area */}
                  <div className="lg:w-64 p-6 sm:p-8 lg:py-8 bg-gradient-to-r from-transparent via-elec-yellow/5 to-elec-yellow/10 flex items-center justify-center lg:justify-end border-t lg:border-t-0 lg:border-l border-elec-yellow/10">
                    <div className="inline-flex items-center gap-3 min-h-[56px] px-6 py-3.5 rounded-xl bg-elec-yellow text-background font-bold text-lg group-hover:bg-elec-yellow/90 group-hover:shadow-lg group-hover:shadow-elec-yellow/20 transition-all duration-300">
                      <PlayCircle className="h-6 w-6" />
                      <span>Enter Hub</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Topics Section */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-2 w-2 rounded-full bg-white/50" />
            <h2 className="text-xl font-bold text-white">Quick Reference Topics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={topic.link}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl group"
              >
                <Card className={`bg-gradient-to-br ${topic.gradientFrom} ${topic.gradientTo} ${topic.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98] h-full`}>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className={`min-w-[52px] min-h-[52px] p-3 rounded-xl bg-white/10 group-hover:bg-white/15 group-hover:scale-110 transition-all duration-300 flex-shrink-0 border border-white/10`}>
                        <topic.icon className={`h-7 w-7 ${topic.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {topic.description}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className={`text-xs px-3 py-1.5 rounded-full ${topic.badgeColor} font-medium`}>
                            {topic.badge}
                          </span>
                          <div className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300">
                            <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="h-2 w-2 rounded-full bg-white/50" />
            <h2 className="text-xl font-bold text-white">Related Resources</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            <Link
              to="/apprentice/inspection-testing-hub"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
            >
              <Card className="bg-gradient-to-br from-elec-yellow/15 to-elec-yellow/5 border-elec-yellow/30 hover:border-elec-yellow/50 hover:from-elec-yellow/20 hover:to-elec-yellow/10 transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px]">
                  <div className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-elec-yellow/20 mb-3">
                    <GraduationCap className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-sm font-semibold text-white">I&T Hub</p>
                  <p className="text-xs text-white/70 mt-1 hidden sm:block">Full training</p>
                </CardContent>
              </Card>
            </Link>

            <Link
              to="/apprentice/on-job-tools/bs7671-runthrough"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
            >
              <Card className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px]">
                  <div className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-elec-yellow/10 mb-3">
                    <CheckSquare className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-sm font-semibold text-white">Run-Through</p>
                  <p className="text-xs text-white/70 mt-1 hidden sm:block">Step-by-step</p>
                </CardContent>
              </Card>
            </Link>

            <Link
              to="/apprentice/on-job-tools/testing-procedures"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
            >
              <Card className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px]">
                  <div className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-green-500/10 mb-3">
                    <Zap className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">Test Procedures</p>
                  <p className="text-xs text-white/70 mt-1 hidden sm:block">Quick toolkit</p>
                </CardContent>
              </Card>
            </Link>

            <Link
              to="/apprentice/on-job-tools/flashcards"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
            >
              <Card className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px]">
                  <div className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-blue-500/10 mb-3">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">Flashcards</p>
                  <p className="text-xs text-white/70 mt-1 hidden sm:block">Quick revision</p>
                </CardContent>
              </Card>
            </Link>

            <Link
              to="/apprentice/calculators"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
            >
              <Card className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[120px]">
                  <div className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-purple-500/10 mb-3">
                    <FileText className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">Calculators</p>
                  <p className="text-xs text-white/70 mt-1 hidden sm:block">Zs, R1+R2</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-white/70" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white/80">Disclaimer</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  These inspection and testing materials are for educational purposes only.
                  Always follow your employer's procedures and work under appropriate supervision.
                  For formal qualifications, contact City & Guilds, EAL, or your registered training provider.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InspectionTesting;
