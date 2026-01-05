import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  GraduationCap,
  Briefcase,
  BookOpen,
  Shield,
  ShieldCheck,
  Users,
  Award,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Star,
  Lightbulb,
  BadgeCheck,
  Calculator,
  FileCheck,
  Play
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  const hubs = [
    {
      title: "Apprentice Hub",
      description: "Training, OJT tracking, and portfolio building",
      icon: GraduationCap,
      link: "/apprentice",
      features: ["Level 2 & 3", "AM2 Prep", "OJT Logbook"],
      stat: "2,000+ questions"
    },
    {
      title: "Electrician Hub",
      description: "Professional tools and calculators",
      icon: Zap,
      link: "/electrician",
      features: ["BS7671 Tools", "Calculators", "Certificates"],
      stat: "50+ tools"
    },
    {
      title: "Employer Hub",
      description: "Team and business management",
      icon: Briefcase,
      link: "/employer",
      features: ["Job Tracking", "Team GPS", "Voice AI"],
      stat: "Full control"
    },
    {
      title: "Study Centre",
      description: "Professional upskilling courses",
      icon: BookOpen,
      link: "/study-centre",
      features: ["14 Courses", "Mock Exams", "Certificates"],
      stat: "14 courses"
    }
  ];

  const features = [
    { icon: Shield, title: "BS7671 Compliant", desc: "18th Edition aligned" },
    { icon: BadgeCheck, title: "Elec-ID", desc: "Digital credential" },
    { icon: FileCheck, title: "Certificates", desc: "EICR & more" },
    { icon: Calculator, title: "Calculators", desc: "Cable & load" },
    { icon: Award, title: "Training", desc: "Industry recognised" },
    { icon: Users, title: "Team Tools", desc: "Manage your crew" }
  ];

  const testimonials = [
    {
      quote: "The apprentice training is exactly what UK electricians need. Passed my AM2 first time.",
      author: "James T.",
      role: "Manchester"
    },
    {
      quote: "Cable calculators save me hours. Essential for any working electrician.",
      author: "Sarah M.",
      role: "London"
    },
    {
      quote: "Managing my team has never been easier. The GPS tracking is brilliant.",
      author: "David W.",
      role: "Birmingham"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-elec-yellow/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-elec-yellow/10 rounded-full blur-[150px] opacity-50" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-16 sm:pt-16 sm:pb-24">
          {/* Logo */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-elec-yellow flex items-center justify-center">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-elec-dark" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">
                Elec-<span className="text-elec-yellow">Mate</span>
              </span>
            </Link>
          </div>

          {/* Free trial badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium">
              <Play className="h-4 w-4 fill-current" />
              7-Day Free Trial
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Your Complete
              <br />
              <span className="text-elec-yellow">Electrical Career</span>
              <br />
              Platform
            </h1>
            <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
              From apprentice to master electrician. Training, tools, and team management for UK electrical professionals.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 sm:mb-12">
            {user ? (
              <Button asChild size="lg" className="h-12 sm:h-14 px-8 text-base sm:text-lg font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark">
                <Link to="/apprentice/study">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="h-12 sm:h-14 px-8 text-base sm:text-lg font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark">
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 px-8 text-base sm:text-lg font-medium border-white/20 hover:bg-white/5 text-white">
                  <Link to="/auth/signin">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              BS7671 compliant
            </span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-elec-gray/50">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">2,000+</div>
              <div className="text-xs sm:text-sm text-gray-500">Quiz Questions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">50+</div>
              <div className="text-xs sm:text-sm text-gray-500">Pro Tools</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">14</div>
              <div className="text-xs sm:text-sm text-gray-500">Courses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">24/7</div>
              <div className="text-xs sm:text-sm text-gray-500">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hub Cards */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">
              Four Specialized Hubs
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Everything you need in one place
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {hubs.map((hub, index) => (
              <Link key={index} to={hub.link} className="group">
                <Card className="h-full bg-elec-gray border-white/10 hover:border-elec-yellow/50 transition-all duration-300">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center shrink-0 group-hover:bg-elec-yellow/20 transition-colors">
                        <hub.icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-white group-hover:text-elec-yellow transition-colors">
                            {hub.title}
                          </h3>
                          <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-gray-400 mb-3">
                          {hub.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {hub.features.map((feature, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-20 px-4 bg-elec-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">
              Built for UK Electricians
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Professional tools and features
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-xl bg-elec-gray border border-white/10 hover:border-elec-yellow/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base mb-1">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elec-ID Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-dark border-elec-yellow/30 overflow-hidden">
            <CardContent className="p-6 sm:p-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-xs font-medium mb-4">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    New Feature
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                    Your <span className="text-elec-yellow">Elec-ID</span>
                    <br />Digital Credential
                  </h2>
                  <p className="text-gray-400 mb-6">
                    A portable professional identity that follows your entire career. Track qualifications, training, and work history.
                  </p>

                  <div className="space-y-2 mb-6">
                    {["JIB verified credentials", "Shareable QR code", "Complete training history", "Portable across jobs"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Button asChild className="h-11 px-6 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold">
                    <Link to="/auth/signup">
                      Create Your Elec-ID
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Elec-ID Card Preview */}
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-elec-yellow/20 rounded-2xl blur-3xl" />
                  <div className="relative bg-elec-gray rounded-xl border border-elec-yellow/30 p-5 shadow-2xl">
                    <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-t -mt-5 -mx-5 mb-5" />

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-500">Elec-ID</div>
                        <div className="font-mono font-bold text-white">ELEC-2026-00001</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-lg font-bold text-white">Your Name</div>
                      <div className="text-sm text-gray-400">Approved Electrician</div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-xl font-bold text-elec-yellow">5</div>
                        <div className="text-[10px] text-gray-500 uppercase">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-elec-yellow">8</div>
                        <div className="text-[10px] text-gray-500 uppercase">Certs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-elec-yellow">12</div>
                        <div className="text-[10px] text-gray-500 uppercase">Training</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 px-4 bg-elec-gray/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
              Trusted by Professionals
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.map((t, index) => (
              <Card key={index} className="bg-elec-gray border-white/10">
                <CardContent className="p-5">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-elec-yellow text-elec-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-elec-yellow">{t.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{t.author}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-xl bg-elec-yellow flex items-center justify-center mx-auto mb-6">
            <Zap className="h-7 w-7 text-elec-dark" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-white">
            Ready to Power Up?
          </h2>
          <p className="text-gray-400 mb-8">
            Join UK electrical professionals already using Elec-Mate
          </p>

          <Button asChild size="lg" className="h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark">
            <Link to="/auth/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
            <span>No card required</span>
            <span>•</span>
            <span>7 days free</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <span className="font-bold text-white">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Elec-Mate. Powering UK electrical professionals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
