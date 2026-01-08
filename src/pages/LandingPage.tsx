import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  GraduationCap,
  Briefcase,
  BookOpen,
  Shield,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Star,
  BadgeCheck,
  Calculator,
  ClipboardCheck,
  Brain,
  MapPin,
  Receipt,
  HeartPulse,
  Play,
  Lightbulb,
  FileText,
  Wrench,
  HardHat,
  Target,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  const hubs = [
    {
      title: "Apprentice Hub",
      description: "Level 2 & 3 training, AM2 prep, OJT logbook, and portfolio building for electrical apprentices",
      icon: GraduationCap,
      features: ["2,000+ Practice Questions", "AM2 Preparation", "OJT Tracking"],
      colour: "from-blue-500/20 to-blue-600/10"
    },
    {
      title: "Electrician Hub",
      description: "Professional calculators, inspection tools, quote builder, and AI assistants for qualified electricians",
      icon: Zap,
      features: ["50+ Calculators", "Inspection Suite", "Quote Builder"],
      colour: "from-yellow-500/20 to-amber-500/10"
    },
    {
      title: "Employer Hub",
      description: "Team management, job tracking, timesheets, RAMS, and compliance tools for electrical contractors",
      icon: Briefcase,
      features: ["Team GPS", "Job Packs", "RAMS Generator"],
      colour: "from-purple-500/20 to-purple-600/10"
    },
    {
      title: "Study Centre",
      description: "Structured learning modules with practice questions, flashcards, and mock exams to support your training",
      icon: BookOpen,
      features: ["14 Topics", "6,800+ Questions", "Mock Exams"],
      colour: "from-green-500/20 to-emerald-500/10"
    }
  ];

  const keyFeatures = [
    {
      icon: Calculator,
      title: "50+ Electrical Calculators",
      description: "Voltage drop, cable sizing, Zs values, adiabatic equations, diversity, and more — all BS7671 compliant"
    },
    {
      icon: ClipboardCheck,
      title: "Inspection & Testing Suite",
      description: "Complete toolkit for EIC, EICR, and minor works — from testing procedures to certificate generation"
    },
    {
      icon: Brain,
      title: "8 AI Specialist Agents",
      description: "Circuit designer, cost engineer, H&S expert, commissioning specialist, and project manager at your fingertips"
    },
    {
      icon: Receipt,
      title: "Quote & Invoice Builder",
      description: "Professional templates with live material pricing from UK suppliers — create quotes in minutes"
    },
    {
      icon: FileText,
      title: "RAMS Generator",
      description: "AI-powered risk assessments and method statements tailored to each job — HSE compliant"
    },
    {
      icon: MapPin,
      title: "Team GPS & Job Tracking",
      description: "Know where your team is, assign jobs, track progress, and manage timesheets in real-time"
    }
  ];

  const studyTopics = [
    { name: "BS7671 Wiring Regulations", questions: "800+" },
    { name: "Inspection & Testing", questions: "600+" },
    { name: "Fire Alarm Systems", questions: "400+" },
    { name: "Emergency Lighting", questions: "350+" },
    { name: "EV Charging Installation", questions: "300+" },
    { name: "Solar PV Systems", questions: "250+" }
  ];

  const testimonials = [
    {
      quote: "Passed my AM2 first time using Elec-Mate. The practice questions are spot on for what comes up.",
      author: "James T.",
      role: "Newly Qualified, Manchester"
    },
    {
      quote: "The cable calculators save me hours on every job. Essential kit for any sparky.",
      author: "Sarah M.",
      role: "Approved Electrician, London"
    },
    {
      quote: "Managing my lads has never been easier. GPS tracking and job packs are brilliant for the business.",
      author: "David W.",
      role: "Contractor, Birmingham"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <img src="/logo.jpg" alt="Elec-Mate" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <Button asChild size="sm" className="h-9 bg-yellow-400 hover:bg-yellow-300 text-black font-medium">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link to="/auth/signin" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block">
                  Sign in
                </Link>
                <Button asChild size="sm" className="h-9 bg-yellow-400 hover:bg-yellow-300 text-black font-medium">
                  <Link to="/auth/signup">Start Free Trial</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px]" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium mb-8 animate-fade-in">
            <Play className="h-3.5 w-3.5 fill-current" />
            7-Day Free Trial — No Card Required
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            The Complete Platform for
            <span className="block text-yellow-400 mt-2">UK Electrical Professionals</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            From apprentice to approved electrician. Training aids, calculators, certificates,
            and business tools — everything aligned to BS7671.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button asChild size="lg" className="h-14 px-8 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20">
              <Link to="/auth/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-medium border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-200">
              <Link to="/auth/signin">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              BS7671 18th Edition
            </span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-400/10 to-yellow-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/5 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "50+", label: "Calculators", sublabel: "BS7671 compliant" },
              { value: "6,800+", label: "Questions", sublabel: "Practice & mock" },
              { value: "14", label: "Study Topics", sublabel: "Full curriculum" },
              { value: "8", label: "AI Agents", sublabel: "Specialist assistants" }
            ].map((stat, i) => (
              <div key={i} className="group text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-1 transition-transform group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-white">{stat.label}</div>
                <div className="text-xs text-white/50">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Hubs Section - NOT CLICKABLE */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Four Specialised Hubs
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Whether you're training, working on site, or running a business — we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {hubs.map((hub, index) => (
              <Card key={index} className={`h-full bg-gradient-to-br ${hub.colour} border-white/10 transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <hub.icon className="h-7 w-7 text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {hub.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4 leading-relaxed">
                        {hub.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {hub.features.map((feature, i) => (
                          <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA after hubs */}
          <div className="text-center mt-10">
            <Button asChild size="lg" className="h-12 px-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition-all hover:scale-105">
              <Link to="/auth/signup">
                Get Access to All Hubs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Tools Section */}
      <section className="py-20 sm:py-28 px-4 bg-neutral-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Professional Tools Built for the Trade
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything you need on site and in the office — aligned to BS7671 18th Edition
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-yellow-400/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Centre Section - TRUTHFUL */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                Training Support
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Study Centre
              </h2>
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                Structured learning modules designed to support your electrical training and exam preparation.
                Practice questions, flashcards, and mock exams to reinforce your knowledge.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>6,800+ practice questions across all topics</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Mock exams to test your readiness</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Flashcard system for revision</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Progress tracking to identify weak areas</span>
                </div>
              </div>

              <p className="text-sm text-white/60 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white">Note:</strong> Our Study Centre is a training aide designed to supplement
                your formal education and workplace learning — not a replacement for accredited courses.
              </p>

              <Button asChild className="h-12 px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition-all hover:scale-105">
                <Link to="/auth/signup">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {studyTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-neutral-900 border border-white/5 hover:border-green-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <BookOpen className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="font-medium text-white">{topic.name}</span>
                    </div>
                    <span className="text-sm text-white/50">{topic.questions} questions</span>
                  </div>
                </div>
              ))}
              <p className="text-center text-sm text-white/50 pt-2">+ 8 more topics available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Elec-ID Section */}
      <section className="py-20 sm:py-28 px-4 bg-neutral-950/50">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-yellow-500/5 border-yellow-400/20 overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium mb-6">
                    <BadgeCheck className="h-4 w-4" />
                    Digital Credential
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Your <span className="text-yellow-400">Elec-ID</span>
                  </h2>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    A portable professional identity that follows your entire career.
                    Track qualifications, training, and work history in one place.
                  </p>

                  <div className="space-y-3 mb-8">
                    {["JIB verified credentials", "Shareable QR code", "Complete training history", "Portable across employers"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-white">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="h-12 px-6 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold transition-all hover:scale-105">
                    <Link to="/auth/signup">
                      Create Your Elec-ID
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Elec-ID Card Preview */}
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-yellow-400/10 rounded-3xl blur-3xl" />
                  <div className="relative bg-neutral-900 rounded-2xl border border-yellow-400/30 p-6 shadow-2xl">
                    <div className="h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-t -mt-6 -mx-6 mb-6" />

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-wider text-white/50">Elec-ID</div>
                          <div className="font-mono font-bold text-white">ELEC-2026-00001</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                        <Shield className="h-3.5 w-3.5" />
                        Verified
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-xl font-bold text-white">Your Name</div>
                      <div className="text-white/60">Approved Electrician</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">5</div>
                        <div className="text-xs text-white/50 uppercase">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">8</div>
                        <div className="text-xs text-white/50 uppercase">Certs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">12</div>
                        <div className="text-xs text-white/50 uppercase">Courses</div>
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
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Built for UK Electricians
            </h2>
            <p className="text-white/70 text-lg">
              Designed with input from working professionals across the trade
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, index) => (
              <Card key={index} className="bg-neutral-900/50 border-white/5 hover:border-yellow-400/20 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-5 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-400">
                        {t.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{t.author}</div>
                      <div className="text-xs text-white/50">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 sm:py-28 px-4 bg-neutral-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Start with a 7-day free trial. Plans from £4.99/month for apprentices,
            £9.99/month for electricians.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { name: "Apprentice", price: "£4.99", desc: "Training & exam prep", features: ["2,000+ questions", "Study Centre", "OJT tracking", "50+ calculators"] },
              { name: "Electrician", price: "£9.99", desc: "Professional tools", features: ["Everything in Apprentice", "8 AI Agents", "Quote builder", "Inspection tools"], popular: true },
              { name: "Employer", price: "£29.99", desc: "Teams up to 5", features: ["Everything in Electrician", "Team management", "GPS tracking", "RAMS generator"] }
            ].map((plan, i) => (
              <Card key={i} className={`border-white/10 ${plan.popular ? 'bg-gradient-to-b from-yellow-500/10 to-neutral-900 border-yellow-400/30' : 'bg-neutral-900/50'} transition-all hover:-translate-y-1`}>
                <CardContent className="p-6">
                  {plan.popular && (
                    <div className="text-xs font-medium text-yellow-400 uppercase tracking-wider mb-2">Most Popular</div>
                  )}
                  <div className="text-lg font-bold text-white mb-1">{plan.name}</div>
                  <div className="text-3xl font-bold text-white mb-1">{plan.price}<span className="text-sm text-white/50 font-normal">/mo</span></div>
                  <div className="text-sm text-white/50 mb-4">{plan.desc}</div>
                  <div className="space-y-2">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {f}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button asChild size="lg" className="h-14 px-10 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all hover:scale-105">
            <Link to="/auth/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-white/60 mt-4">30-day money-back guarantee</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mx-auto mb-8 transition-transform hover:scale-110 hover:rotate-3">
            <Zap className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Power Up Your Career?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Start your 7-day free trial and explore everything Elec-Mate has to offer.
          </p>

          <Button asChild size="lg" className="h-14 px-10 text-lg font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20">
            <Link to="/auth/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/60">
            <span>No card required</span>
            <span>•</span>
            <span>7 days free</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
          </div>
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Elec-Mate. Built for UK electricians.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
