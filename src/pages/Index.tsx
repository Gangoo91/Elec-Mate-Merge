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
import { cn } from "@/lib/utils";

const Index = () => {
  const { user } = useAuth();

  const hubs = [
    {
      title: "Apprentice Hub",
      description: "Training, OJT tracking, and portfolio",
      icon: GraduationCap,
      link: "/apprentice",
      features: ["Level 2 & 3", "AM2 Prep", "OJT Log"],
      stat: "2,000+ questions"
    },
    {
      title: "Electrician Hub",
      description: "Professional tools and calculators",
      icon: Zap,
      link: "/electrician",
      features: ["BS7671", "Calcs", "Certs"],
      stat: "50+ tools"
    },
    {
      title: "Employer Hub",
      description: "Team and business management",
      icon: Briefcase,
      link: "/employer",
      features: ["Jobs", "GPS", "Voice AI"],
      stat: "Full control"
    },
    {
      title: "Study Centre",
      description: "Professional upskilling courses",
      icon: BookOpen,
      link: "/study-centre",
      features: ["14 Courses", "Exams", "Certs"],
      stat: "14 courses"
    }
  ];

  const features = [
    { icon: Shield, title: "BS7671", desc: "18th Edition" },
    { icon: BadgeCheck, title: "Elec-ID", desc: "Digital credential" },
    { icon: FileCheck, title: "Certificates", desc: "EICR & more" },
    { icon: Calculator, title: "Calculators", desc: "Cable & load" },
    { icon: Award, title: "Training", desc: "Industry recognised" },
    { icon: Users, title: "Team Tools", desc: "Manage crew" }
  ];

  const testimonials = [
    { quote: "Passed my AM2 first time with this training.", author: "James T.", role: "Manchester" },
    { quote: "Cable calculators save me hours every week.", author: "Sarah M.", role: "London" },
    { quote: "Managing my team has never been easier.", author: "David W.", role: "Birmingham" }
  ];

  return (
    <div className="min-h-screen bg-black text-white safe-top safe-bottom">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-elec-yellow/5 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative max-w-lg mx-auto px-6 pt-8 pb-12">
          {/* Logo - iOS centered */}
          <div className="flex justify-center mb-8 ios-animate-in">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(255,209,0,0.25)]">
                <img src="/logo.jpg" alt="Elec-Mate" className="w-full h-full object-cover" />
              </div>
              <span className="text-ios-title-3 font-bold">
                Elec-<span className="text-elec-yellow">Mate</span>
              </span>
            </Link>
          </div>

          {/* Free trial badge */}
          <div className="flex justify-center mb-6 ios-animate-in-delayed" style={{ '--ios-delay': '50ms' } as any}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-ios-caption-1 font-medium">
              <Play className="h-3.5 w-3.5 fill-current" />
              7-Day Free Trial
            </div>
          </div>

          {/* Headline - iOS large title */}
          <div className="text-center mb-8 ios-animate-in-delayed" style={{ '--ios-delay': '100ms' } as any}>
            <h1 className="text-ios-title-large text-white mb-3">
              Your Complete
              <br />
              <span className="text-elec-yellow">Electrical Career</span>
              <br />
              Platform
            </h1>
            <p className="text-ios-body text-white/60 max-w-sm mx-auto">
              From apprentice to master electrician. Training, tools, and team management.
            </p>
          </div>

          {/* CTA Buttons - iOS style stacked */}
          <div className="space-y-3 mb-8 ios-animate-in-delayed" style={{ '--ios-delay': '150ms' } as any}>
            {user ? (
              <Button asChild variant="ios-primary" size="ios-large" className="w-full">
                <Link to="/apprentice/study">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ios-primary" size="ios-large" className="w-full">
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="ios-secondary" size="ios-default" className="w-full">
                  <Link to="/auth/signin">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Trust indicators - horizontal scroll */}
          <div className="flex justify-center gap-4 text-ios-caption-1 text-white/50 ios-animate-in-delayed" style={{ '--ios-delay': '200ms' } as any}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              No card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              BS7671
            </span>
          </div>
        </div>
      </section>

      {/* Stats Bar - iOS style */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-lg mx-auto px-6 py-5">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: "2k+", label: "Questions" },
              { value: "50+", label: "Tools" },
              { value: "14", label: "Courses" },
              { value: "24/7", label: "Access" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-ios-headline text-elec-yellow">{stat.value}</div>
                <div className="text-ios-caption-2 text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hub Cards - iOS card style */}
      <section className="py-10 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-ios-title-2 text-white mb-2">Four Specialized Hubs</h2>
            <p className="text-ios-subhead text-white/50">Everything you need in one place</p>
          </div>

          <div className="space-y-3">
            {hubs.map((hub, index) => (
              <Link
                key={index}
                to={hub.link}
                className="block ios-animate-in-delayed"
                style={{ '--ios-delay': `${index * 50}ms` } as any}
              >
                <Card variant="ios" interactive className="ios-card-tap">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center shrink-0">
                        <hub.icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h3 className="text-ios-headline text-white">{hub.title}</h3>
                          <ChevronRight className="h-5 w-5 text-white/30" />
                        </div>
                        <p className="text-ios-caption-1 text-white/50 mb-2">{hub.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {hub.features.map((feature, i) => (
                            <span key={i} className="text-ios-caption-2 px-2 py-0.5 rounded-md bg-white/5 text-white/40">
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

      {/* Features Grid - iOS compact style */}
      <section className="py-10 px-6 bg-white/[0.02]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-ios-title-2 text-white mb-2">Built for UK Electricians</h2>
            <p className="text-ios-subhead text-white/50">Professional tools and features</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center ios-card-tap"
              >
                <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <h3 className="text-ios-footnote font-semibold text-white mb-0.5">{feature.title}</h3>
                <p className="text-ios-caption-2 text-white/40">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elec-ID Section - iOS card */}
      <section className="py-10 px-6">
        <div className="max-w-lg mx-auto">
          <Card variant="ios-elevated" className="border-elec-yellow/30 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="h-4 w-4 text-elec-yellow" />
                <span className="text-ios-caption-1 text-elec-yellow font-medium">New Feature</span>
              </div>

              <h2 className="text-ios-title-2 text-white mb-2">
                Your <span className="text-elec-yellow">Elec-ID</span>
              </h2>
              <p className="text-ios-subhead text-white/60 mb-4">
                A portable digital credential that follows your career.
              </p>

              {/* Elec-ID Card Preview */}
              <div className="bg-white/5 rounded-xl border border-elec-yellow/20 p-4 mb-4">
                <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded -mt-4 -mx-4 mb-4" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <div className="text-ios-caption-2 text-white/40 uppercase tracking-wider">Elec-ID</div>
                    <div className="font-mono text-ios-subhead font-bold text-white">ELEC-2026-00001</div>
                  </div>
                  <div className="flex items-center gap-1 text-ios-caption-2 text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
                  {[
                    { value: "5", label: "Years" },
                    { value: "8", label: "Certs" },
                    { value: "12", label: "Training" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-ios-headline text-elec-yellow">{stat.value}</div>
                      <div className="text-ios-caption-2 text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {["JIB verified credentials", "Shareable QR code", "Complete training history"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-ios-footnote text-white/70">
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow" />
                    {item}
                  </div>
                ))}
              </div>

              <Button asChild variant="ios-primary" size="ios-default" className="w-full">
                <Link to="/auth/signup">
                  Create Your Elec-ID
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials - iOS horizontal scroll */}
      <section className="py-10 px-6 bg-white/[0.02]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-ios-title-3 text-white">Trusted by Professionals</h2>
          </div>

          <div className="space-y-3">
            {testimonials.map((t, index) => (
              <Card key={index} variant="ios">
                <CardContent className="p-4">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-elec-yellow text-elec-yellow" />
                    ))}
                  </div>
                  <p className="text-ios-subhead text-white/80 mb-3">"{t.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <span className="text-ios-caption-2 font-bold text-elec-yellow">
                        {t.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-ios-footnote font-medium text-white">{t.author}</div>
                      <div className="text-ios-caption-2 text-white/40">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-6">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-elec-yellow flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_rgba(255,209,0,0.25)]">
            <Zap className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-ios-title-2 text-white mb-2">Ready to Power Up?</h2>
          <p className="text-ios-body text-white/50 mb-6">
            Join UK electrical professionals using Elec-Mate
          </p>

          <Button asChild variant="ios-primary" size="ios-large" className="w-full mb-4">
            <Link to="/auth/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <div className="flex justify-center gap-3 text-ios-caption-1 text-white/40">
            <span>No card</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
            <span>7 days free</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/10">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <span className="text-ios-subhead font-bold text-white">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </div>
          <p className="text-ios-caption-1 text-white/40">
            © {new Date().getFullYear()} Elec-Mate. Powering UK electrical professionals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
