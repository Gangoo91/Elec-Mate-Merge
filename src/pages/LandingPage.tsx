
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  GraduationCap,
  Wrench,
  UserCheck,
  ChevronRight,
  Video,
  Calculator,
  Trophy,
  CheckCircle2,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-elec-dark">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-elec-yellow/20 bg-elec-dark/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">
            <span className="text-elec-yellow">Elec</span>
            <span className="text-elec-light">Mate</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-elec-light hover:text-elec-yellow transition-colors">
              Home
            </Link>
            <Link to="#features" className="text-elec-light hover:text-elec-yellow transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-elec-light hover:text-elec-yellow transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline">
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                The Ultimate Tool for
                <span className="block gradient-text">Electrical Professionals</span>
              </h1>
              <p className="text-xl text-elec-light/80">
                From apprentice training to professional tools, ElecMate is your companion
                throughout your electrical career journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Start 7-Day Free Trial
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="#features">Explore Features</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                <span>No credit card required</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-elec-gray rounded-lg border border-elec-yellow/20 p-6 shadow-lg shadow-elec-yellow/5">
                <img 
                  src="/placeholder.svg" 
                  alt="ElecMate Dashboard Preview" 
                  className="rounded w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-elec-gray">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Tools for Every Stage of Your Electrical Career
            </h2>
            <p className="text-lg text-elec-light/80">
              Whether you're just starting as an apprentice or running your own electrical business,
              we have the resources you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Apprentice */}
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col h-full">
              <div className="h-12 w-12 rounded-full bg-elec-yellow/20 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-elec-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apprentice Hub</h3>
              <p className="text-elec-light/70 mb-4 flex-grow">
                Structured learning paths, study materials, and interactive lessons to help you master
                electrical theory and prepare for qualifications.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>MOET Level 3 Study Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Progress Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Practice Tests & Quizzes</span>
                </div>
              </div>
            </div>

            {/* Electrician */}
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col h-full">
              <div className="h-12 w-12 rounded-full bg-elec-yellow/20 flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-elec-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Electrician Tools</h3>
              <p className="text-elec-light/70 mb-4 flex-grow">
                Professional resources, calculators, and document templates to enhance your
                efficiency and service quality in the field.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Technical Calculators</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Invoice & Estimate Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Project Management Tools</span>
                </div>
              </div>
            </div>

            {/* Employer (Coming Soon) */}
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col h-full relative overflow-hidden">
              <div className="absolute -right-2 -top-2 bg-elec-yellow text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
                COMING SOON
              </div>
              <div className="h-12 w-12 rounded-full bg-elec-yellow/20 flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-elec-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Employer Dashboard</h3>
              <p className="text-elec-light/70 mb-4 flex-grow">
                Tools for electrical business owners to manage teams, post job opportunities, 
                and connect with qualified professionals.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Recruitment Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Job Posting Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  <span>Team Management</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col items-center text-center">
              <Video className="h-8 w-8 text-elec-yellow mb-3" />
              <h4 className="font-semibold mb-2">Video Lessons</h4>
              <p className="text-sm text-elec-light/70">
                Comprehensive video tutorials covering both theory and practical skills
              </p>
            </div>
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col items-center text-center">
              <Calculator className="h-8 w-8 text-elec-yellow mb-3" />
              <h4 className="font-semibold mb-2">Smart Calculators</h4>
              <p className="text-sm text-elec-light/70">
                Specialized tools for voltage drop, load calculations, and more
              </p>
            </div>
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col items-center text-center">
              <Trophy className="h-8 w-8 text-elec-yellow mb-3" />
              <h4 className="font-semibold mb-2">Leaderboards</h4>
              <p className="text-sm text-elec-light/70">
                Track your progress and compete with peers in the community
              </p>
            </div>
            <div className="bg-elec-dark rounded-lg p-6 border border-elec-yellow/20 flex flex-col items-center text-center">
              <Lightbulb className="h-8 w-8 text-elec-yellow mb-3" />
              <h4 className="font-semibold mb-2">Community Support</h4>
              <p className="text-sm text-elec-light/70">
                Connect with mentors and fellow professionals in the field
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Choose the Right Plan for Your Career Stage
            </h2>
            <p className="text-lg text-elec-light/80">
              All plans include a 7-day free trial with full access to platform features.
              No credit card required to start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Apprentice Plan */}
            <div className="bg-elec-gray rounded-lg overflow-hidden border border-elec-yellow/20">
              <div className="p-6 border-b border-elec-yellow/20">
                <h3 className="text-xl font-bold mb-2">Apprentice</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">£3.99</span>
                  <span className="text-elec-light/70">/month</span>
                </div>
                <p className="text-sm text-elec-light/70 mt-2">
                  or £39.99 billed yearly
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Complete learning resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Video lessons library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Study materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Basic calculators</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/dashboard">Start Free Trial</Link>
                </Button>
              </div>
            </div>

            {/* Electrician Plan */}
            <div className="bg-elec-gray rounded-lg overflow-hidden border border-elec-yellow relative">
              <div className="absolute top-0 right-0 bg-elec-yellow text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6 border-b border-elec-yellow">
                <h3 className="text-xl font-bold mb-2">Electrician</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">£5.99</span>
                  <span className="text-elec-light/70">/month</span>
                </div>
                <p className="text-sm text-elec-light/70 mt-2">
                  or £59.99 billed yearly
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">All Apprentice features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Full calculator suite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Invoice/estimate templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Project management tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/dashboard">Start Free Trial</Link>
                </Button>
              </div>
            </div>

            {/* Employer Plan */}
            <div className="bg-elec-gray rounded-lg overflow-hidden border border-elec-yellow/20">
              <div className="p-6 border-b border-elec-yellow/20">
                <h3 className="text-xl font-bold mb-2">Employer</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">£9.99</span>
                  <span className="text-elec-light/70">/month</span>
                </div>
                <p className="text-sm text-elec-light/70 mt-2">
                  or £99.99 billed yearly
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">All Electrician features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Recruitment dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Job posting tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Team management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm">Training oversight</span>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/dashboard">Coming Soon</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-elec-gray">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Electrical Career?
            </h2>
            <p className="text-lg text-elec-light/80 mb-8">
              Join thousands of electrical professionals who are advancing their skills and
              careers with ElecMate.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Your Free 7-Day Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-elec-yellow/20 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">
                <span className="text-elec-yellow">Elec</span>
                <span className="text-elec-light">Mate</span>
              </div>
              <p className="text-sm text-elec-light/70">
                The ultimate platform for electrical professionals at every career stage.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#features" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-elec-light/70 hover:text-elec-yellow transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-elec-yellow/10 flex flex-col md:flex-row justify-between items-center text-sm text-elec-light/60">
            <p>© {new Date().getFullYear()} ElecMate. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              Made with passion for the electrical industry.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
