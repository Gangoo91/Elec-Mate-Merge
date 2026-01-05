import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
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
} from "lucide-react";

const InspectionTesting = () => {
  const topics = [
    {
      id: "safe-isolation",
      title: "Safe Isolation",
      description: "Life-critical procedures for safely isolating electrical systems before testing",
      icon: Shield,
      iconBg: "bg-card",
      iconColor: "text-red-400",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Safety Critical",
      badgeColor: "bg-red-500/20 text-red-300",
    },
    {
      id: "initial-vs-periodic",
      title: "Initial vs Periodic Inspection",
      description: "Understanding the differences between initial verification and periodic inspection and testing",
      icon: FileSearch,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Documentation",
      badgeColor: "bg-blue-500/20 text-blue-300",
    },
    {
      id: "testing-methods",
      title: "Testing Methods",
      description: "Continuity, insulation resistance, loop impedance, RCD testing and polarity checks",
      icon: Zap,
      iconBg: "bg-elec-yellow/10",
      iconColor: "text-elec-yellow",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Electrical Testing",
      badgeColor: "bg-elec-yellow/20 text-elec-yellow",
    },
    {
      id: "certificates",
      title: "Certificate Completion",
      description: "How to properly complete EIC, EICR, and Minor Works certificates",
      icon: FileText,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      link: "/apprentice/on-job-tools/bs7671-runthrough",
      badge: "Documentation",
      badgeColor: "bg-purple-500/20 text-purple-300",
    },
  ];

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <div className="bg-elec-gray/50 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Back Button */}
            <Link to="/apprentice">
              <Button
                variant="ghost"
                className="w-fit text-muted-foreground hover:text-white p-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Apprentice Hub
              </Button>
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-elec-yellow" />
                BS7671 Inspection & Testing
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Learn the essential procedures for electrical inspection and testing
              </p>
            </div>

            {/* Safety Notice */}
            <Card className="bg-card border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Safety First</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-red-400">Always work under supervision</strong> when performing any electrical testing.
                      These materials are learning aids - follow your company's safety procedures and never work live.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Aid Notice */}
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Info className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Training Aid Notice</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      These materials supplement your <strong className="text-amber-400">2391 qualification training</strong> and
                      on-the-job learning. This is not a replacement for formal qualifications or registered training providers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Featured Learning Hub Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-lg font-semibold text-white">Interactive Learning Hub</h2>
          </div>

          <Link to="/apprentice/inspection-testing-hub" className="block focus:outline-none group touch-manipulation">
            <Card className="border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/10 to-elec-gray hover:border-elec-yellow/60 transition-all duration-300 active:scale-[0.98]">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-4 rounded-2xl bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors duration-300 flex-shrink-0">
                    <GraduationCap className="h-10 w-10 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">Inspection & Testing Hub</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow font-medium">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Access our comprehensive inspection and testing training with interactive modules covering testing procedures,
                      fault finding techniques, BS 7671 regulations reference, and knowledge assessments. Same content used by
                      qualified electricians.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">Testing Procedures</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">Fault Finding</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">Regulations</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">Quizzes</span>
                    </div>
                    <div className="flex items-center gap-2 text-elec-yellow font-semibold group-hover:gap-3 transition-all duration-300">
                      <PlayCircle className="h-5 w-5" />
                      <span>Enter Hub</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Topics Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-lg font-semibold text-white">Quick Reference Topics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                to={topic.link}
                className="block focus:outline-none group touch-manipulation"
              >
                <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.98] h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${topic.iconBg} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        <topic.icon className={`h-6 w-6 ${topic.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-semibold text-white">{topic.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {topic.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${topic.badgeColor}`}>
                            {topic.badge}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-lg font-semibold text-white">Related Resources</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <Link to="/apprentice/inspection-testing-hub">
              <Card className="border-elec-yellow/30 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/50 transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-2 rounded-lg bg-elec-yellow/20 mb-2">
                    <GraduationCap className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-sm font-medium text-white">I&T Hub</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Full training</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/apprentice/on-job-tools/bs7671-runthrough">
              <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2">
                    <CheckSquare className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-sm font-medium text-white">Run-Through</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Step-by-step</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/apprentice/on-job-tools/testing-procedures">
              <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-2 rounded-lg bg-green-500/10 mb-2">
                    <Zap className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Test Procedures</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Quick toolkit</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/apprentice/on-job-tools/flashcards">
              <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-2 rounded-lg bg-blue-500/10 mb-2">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Flashcards</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Quick revision</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/apprentice/calculators">
              <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.97] h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-2 rounded-lg bg-purple-500/10 mb-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-sm font-medium text-white">Calculators</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Zs, R1+R2</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <Card className="bg-elec-gray/30 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> These inspection and testing materials are for educational purposes only.
                Always follow your employer's procedures and work under appropriate supervision.
                For formal qualifications, contact City & Guilds, EAL, or your registered training provider.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InspectionTesting;
