
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, ArrowRight, CheckCircle, Users, BookOpen, Wrench } from 'lucide-react';
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
      icon: Users,
      title: "Community Support",
      description: "Connect with mentors and fellow electricians"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-elec-yellow rounded-full flex items-center justify-center">
              <Lightbulb className="h-8 w-8 text-elec-dark" />
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-elec-yellow">Elec-</span>
            <span className="text-white">Mate</span>
          </h1>
          
          {/* Subheading */}
          <h2 className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            The UK's most comprehensive electrical industry platform for apprentices and professionals
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            From your first day as an apprentice to running your own electrical business, 
            Elec-Mate is your trusted partner throughout your entire electrical career journey.
          </p>
          
          {user && <MilestonesDisplay className="mb-12" />}
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium px-8 py-4 text-lg w-full sm:w-auto">
                  Access Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium px-8 py-4 text-lg w-full sm:w-auto">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="lg" variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow/10 font-medium px-8 py-4 text-lg w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Everything you need to succeed in the electrical industry
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-elec-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-8 border border-elec-yellow/20">
            <h3 className="text-2xl font-bold text-center mb-8">
              Why choose <span className="text-elec-yellow">Elec-Mate?</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Industry-leading training resources",
                "Professional tools and calculators", 
                "Expert mentorship programs",
                "Mental health and wellbeing support",
                "Career development guidance",
                "Active community of professionals"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
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
