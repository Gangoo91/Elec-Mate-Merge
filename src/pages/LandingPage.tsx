
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, ArrowRight, CheckCircle, TrendingUp, BookOpen, Wrench } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MilestonesDisplay from '@/components/apprentice/MilestonesDisplay';

const LandingPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Thanks for your interest!",
      description: "We'll keep you updated on Elec-Mate's progress.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning",
      description: "Access industry-leading training materials and resources"
    },
    {
      icon: Wrench,
      title: "Professional Tools",
      description: "Essential calculators and utilities for electrical work"
    },
    {
      icon: TrendingUp,
      title: "Career Progression",
      description: "Advanced career development and progression guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="mobile-container py-6 sm:py-8 lg:py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mobile-card-spacing mb-12 sm:mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-elec-yellow rounded-full flex items-center justify-center mobile-interactive">
              <Lightbulb className="h-6 w-6 sm:h-8 sm:w-8 text-elec-dark" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-elec-yellow">Elec-</span>
            <span className="text-white">Mate</span>
          </h1>
          
          {/* Subheading */}
          <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto px-2">
            The UK's most comprehensive electrical industry platform for apprentices and professionals
          </h2>
          
          {/* Description */}
          <p className="mobile-text text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            From your first day as an apprentice to running your own electrical business, 
            Elec-Mate is your trusted partner throughout your entire electrical career journey.
          </p>
          
          {user && <MilestonesDisplay className="mb-8 sm:mb-12" />}
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-2">
            {user ? (
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium touch-button w-full sm:w-auto mobile-interactive">
                  Access Your Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/signin" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium touch-button w-full sm:w-auto mobile-interactive">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link to="/auth/signup" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow/10 font-medium touch-button w-full sm:w-auto mobile-interactive">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12 sm:mb-16">
          <h3 className="mobile-subheading font-bold text-center mb-8 sm:mb-12 px-2">
            Everything you need to succeed in the electrical industry
          </h3>
          
          <div className="mobile-grid-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="mobile-card-compact text-center bg-elec-gray border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors mobile-interactive">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-elec-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                  </div>
                  <h4 className="mobile-subheading font-semibold text-white mb-2 sm:mb-3">{feature.title}</h4>
                  <p className="mobile-text text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
              Why choose <span className="text-elec-yellow">Elec-Mate?</span>
            </h3>
            
            <div className="space-y-4 sm:space-y-5">
              {[
                "Industry-leading training resources",
                "Professional tools and calculators", 
                "Expert mentorship programs",
                "Mental health and wellbeing support",
                "Career development guidance",
                "Active community of professionals"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-white leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Signup Section */}
        {!user && (
          <div className="text-center mb-16">
            <div className="bg-elec-gray rounded-lg p-8 border border-elec-yellow/20 max-w-md mx-auto">
              <Lightbulb className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Get the latest updates on new features and industry insights
              </p>
              
              <form onSubmit={handleEmailSignup} className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 text-white"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up for Updates'}
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Final CTA */}
        {!user && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to power up your <span className="text-elec-yellow">electrical career?</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of electrical professionals who trust Elec-Mate for their career development and training.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium px-8 py-4 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <span className="text-xl font-bold">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </span>
          </div>
          <p className="text-gray-400 mb-2">
            Powering the future of electrical professionals across the UK
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Elec-Mate Learning Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
