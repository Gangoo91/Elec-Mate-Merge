import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
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
  Play,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const Index = () => {
  const { user } = useAuth();

  // Respect reduced motion preferences
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const hubs = [
    {
      title: "Apprentice Hub",
      description: "Training, OJT tracking, and portfolio",
      icon: GraduationCap,
      link: "/apprentice",
      features: ["Level 2 & 3", "AM2 Prep", "OJT Log"],
      stat: "2,000+ questions",
      color: "blue"
    },
    {
      title: "Electrician Hub",
      description: "Professional tools and calculators",
      icon: Zap,
      link: "/electrician",
      features: ["BS7671", "Calcs", "Certs"],
      stat: "50+ tools",
      color: "yellow"
    },
    {
      title: "Employer Hub",
      description: "Team and business management",
      icon: Briefcase,
      link: "/employer",
      features: ["Jobs", "GPS", "Voice AI"],
      stat: "Full control",
      color: "purple"
    },
    {
      title: "Study Centre",
      description: "Professional upskilling courses",
      icon: BookOpen,
      link: "/study-centre",
      features: ["14 Courses", "Exams", "Certs"],
      stat: "14 courses",
      color: "green"
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

  // Animation variants - Smooth, fast entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen pb-[env(safe-area-inset-bottom)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-elec-yellow/10 via-elec-yellow/5 to-transparent"
          />
          {/* Primary animated orb - skip animation if reduced motion preferred */}
          <motion.div
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-elec-yellow/20 blur-[120px]"
          />
          {/* Secondary orb - skip animation if reduced motion preferred */}
          <motion.div
            animate={prefersReducedMotion ? {} : {
              scale: [1.1, 0.9, 1.1],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/15 blur-[100px]"
          />
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-lg mx-auto px-6 pt-2 sm:pt-8 pb-12"
        >
          {/* Logo - hidden on mobile to avoid status bar overlap */}
          <motion.div variants={itemVariants} className="hidden sm:flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(255,209,0,0.3)] ring-2 ring-elec-yellow/20"
              >
                <img src="/logo.jpg" alt="Elec-Mate" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </motion.div>
              <span className="text-[22px] font-bold tracking-tight">
                Elec-<span className="text-elec-yellow">Mate</span>
              </span>
            </Link>
          </motion.div>

          {/* Free trial badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-ios-footnote font-semibold shadow-lg shadow-elec-yellow/10"
            >
              <Play className="h-4 w-4 fill-current" />
              7-Day Free Trial
              <Sparkles className="h-3.5 w-3.5 opacity-70" />
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-[32px] leading-tight font-bold tracking-tight text-white mb-4">
              Your Complete
              <br />
              <span className="text-elec-yellow bg-gradient-to-r from-elec-yellow to-yellow-300 bg-clip-text text-transparent">Electrical Career</span>
              <br />
              Platform
            </h1>
            <p className="text-ios-body text-white/60 max-w-sm mx-auto leading-relaxed">
              From apprentice to master electrician. Training, tools, and team management.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="space-y-3 mb-8">
            {user ? (
              <Button asChild variant="ios-primary" size="ios-large" className="w-full h-[56px] shadow-lg shadow-elec-yellow/25">
                <Link to="/apprentice/study">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button asChild variant="ios-primary" size="ios-large" className="w-full h-[56px] shadow-lg shadow-elec-yellow/25">
                    <Link to="/auth/signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button asChild variant="ios-secondary" size="ios-default" className="w-full h-[52px]">
                    <Link to="/auth/signin">
                      Sign In
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 text-ios-caption-1 text-white/50"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              BS7671 Compliant
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-y border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03]"
      >
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: "2k+", label: "Questions" },
              { value: "50+", label: "Tools" },
              { value: "14", label: "Courses" },
              { value: "24/7", label: "Access" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
              >
                <div className="text-[20px] font-bold text-elec-yellow">{stat.value}</div>
                <div className="text-ios-caption-2 text-white/40 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Hub Cards */}
      <section className="py-12 px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-[24px] font-bold text-white mb-2">Four Specialised Hubs</h2>
            <p className="text-ios-body text-white/50">Everything you need in one place</p>
          </motion.div>

          <div className="space-y-3">
            {hubs.map((hub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              >
                <Link to={hub.link} className="block">
                  <motion.div
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card variant="ios" interactive className="bg-white/[0.04] backdrop-blur-xl border-white/10 hover:border-white/20 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg",
                            hub.color === 'blue' && "bg-gradient-to-br from-blue-500/30 to-blue-600/10 shadow-blue-500/20",
                            hub.color === 'yellow' && "bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 shadow-elec-yellow/20",
                            hub.color === 'purple' && "bg-gradient-to-br from-purple-500/30 to-purple-600/10 shadow-purple-500/20",
                            hub.color === 'green' && "bg-gradient-to-br from-green-500/30 to-green-600/10 shadow-green-500/20"
                          )}>
                            <hub.icon className={cn(
                              "h-7 w-7",
                              hub.color === 'blue' && "text-blue-400",
                              hub.color === 'yellow' && "text-elec-yellow",
                              hub.color === 'purple' && "text-purple-400",
                              hub.color === 'green' && "text-green-400"
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-ios-headline font-semibold text-white">{hub.title}</h3>
                              <ChevronRight className="h-5 w-5 text-white/30" />
                            </div>
                            <p className="text-ios-caption-1 text-white/50 mb-2">{hub.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {hub.features.map((feature, i) => (
                                <span key={i} className="text-ios-caption-2 px-2.5 py-1 rounded-lg bg-white/5 text-white/50 border border-white/5">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-6 relative">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-[24px] font-bold text-white mb-2">Built for UK Electricians</h2>
            <p className="text-ios-body text-white/50">Professional tools and features</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 400 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center backdrop-blur-sm hover:bg-white/[0.06] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-elec-yellow/15 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <h3 className="text-ios-footnote font-semibold text-white mb-0.5">{feature.title}</h3>
                <p className="text-ios-caption-2 text-white/40">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elec-ID Section */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300 }}
          className="max-w-lg mx-auto"
        >
          <Card variant="ios-elevated" className="border-elec-yellow/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] overflow-hidden backdrop-blur-xl">
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-elec-yellow/20 text-elec-yellow text-ios-caption-1 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  New Feature
                </div>
              </motion.div>

              <h2 className="text-[24px] font-bold text-white mb-2">
                Your <span className="text-elec-yellow">Elec-ID</span>
              </h2>
              <p className="text-ios-body text-white/60 mb-5 leading-relaxed">
                A portable digital credential that follows your career.
              </p>

              {/* Elec-ID Card Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-elec-yellow/20 p-5 mb-5 shadow-lg shadow-elec-yellow/5"
              >
                <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full -mt-5 -mx-5 mb-5" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
                    <Lightbulb className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <div className="text-ios-caption-2 text-white/40 uppercase tracking-wider">Elec-ID</div>
                    <div className="font-mono text-ios-headline font-bold text-white">ELEC-2026-00001</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-ios-caption-1 text-green-400 bg-green-500/15 px-3 py-1.5 rounded-full font-medium">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {[
                    { value: "5", label: "Years" },
                    { value: "8", label: "Certs" },
                    { value: "12", label: "Training" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                      <div className="text-ios-headline font-bold text-elec-yellow">{stat.value}</div>
                      <div className="text-ios-caption-2 text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="space-y-2.5 mb-5">
                {["JIB verified credentials", "Shareable QR code", "Complete training history"].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2.5 text-ios-footnote text-white/70"
                  >
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    {item}
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button asChild variant="ios-primary" size="ios-default" className="w-full h-[52px] shadow-lg shadow-elec-yellow/20">
                  <Link to="/auth/signup">
                    Create Your Elec-ID
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-[24px] font-bold text-white">Trusted by Professionals</h2>
          </motion.div>

          <div className="space-y-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <Card variant="ios" className="bg-white/[0.04] backdrop-blur-xl border-white/10">
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-elec-yellow text-elec-yellow" />
                      ))}
                    </div>
                    <p className="text-ios-body text-white/80 mb-4 leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center">
                        <span className="text-ios-footnote font-bold text-elec-yellow">
                          {t.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-ios-subhead font-semibold text-white">{t.author}</div>
                        <div className="text-ios-caption-1 text-white/40">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 relative">
        {/* Background glow - skip animation if reduced motion preferred */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-elec-yellow/15 blur-[100px] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-sm mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-elec-yellow to-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(255,209,0,0.35)]"
          >
            <Zap className="h-10 w-10 text-black" />
          </motion.div>
          <h2 className="text-[26px] font-bold text-white mb-3">Ready to Power Up?</h2>
          <p className="text-ios-body text-white/50 mb-8 leading-relaxed">
            Join UK electrical professionals using Elec-Mate
          </p>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button asChild variant="ios-primary" size="ios-large" className="w-full h-[56px] mb-5 shadow-lg shadow-elec-yellow/25">
              <Link to="/auth/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <div className="flex justify-center gap-4 text-ios-caption-1 text-white/40">
            <span>No card</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
            <span>7 days free</span>
            <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-8 px-6 border-t border-white/10"
      >
        <div className="max-w-lg mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-elec-yellow flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="text-ios-headline font-bold text-white">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </div>
          <p className="text-ios-caption-1 text-white/40">
            © {new Date().getFullYear()} Elec-Mate. Powering UK electrical professionals.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
