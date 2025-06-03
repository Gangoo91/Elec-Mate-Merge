
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Wrench, MessageSquare, Sparkles, Brain, Heart, Users, Shield, Award, Zap } from 'lucide-react';
import MilestonesDisplay from '@/components/apprentice/MilestonesDisplay';

const LandingPage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning Hub"
    },
    {
      icon: Wrench,
      title: "Professional Toolkit"
    },
    {
      icon: Users,
      title: "Industry Community"
    },
    {
      icon: Sparkles,
      title: "Digital Training Management"
    },
    {
      icon: Brain,
      title: "Expert Mentorship Program"
    },
    {
      icon: Heart,
      title: "Mental Health & Wellbeing"
    },
    {
      icon: Shield,
      title: "Safety Knowledge Sharing"
    },
    {
      icon: Award,
      title: "Career Development"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Professionals" },
    { number: "500+", label: "Training Resources" },
    { number: "50+", label: "Professional Tools" },
    { number: "24/7", label: "Community Support" }
  ];
  
  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="mb-8">
            <span className="text-6xl md:text-8xl font-light tracking-tight flex justify-center">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
              The UK's Most Comprehensive <span className="text-elec-yellow">Electrical Industry Platform</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Empowering electrical professionals and apprentices with cutting-edge learning resources, 
              professional tools, community support, and mental health resources. From your first day 
              as an apprentice to running your own electrical business, Elec-Mate is your trusted partner 
              throughout your entire electrical career journey.
            </p>
          </div>
          
          {user && <MilestonesDisplay className="mb-12" />}
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 font-medium px-12 py-6 text-lg">
                  Access Your Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 font-medium px-12 py-6 text-lg">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="lg" variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow/10 font-medium px-12 py-6 text-lg">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-light text-elec-yellow mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-500 group">
                <div className="w-16 h-16 bg-elec-yellow/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-elec-yellow/20 transition-all duration-300">
                  <IconComponent className="h-8 w-8 text-elec-yellow" />
                </div>
                
                <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-elec-yellow transition-colors duration-300">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 rounded-lg p-12 text-center border border-elec-yellow/20">
          <Zap className="h-16 w-16 text-elec-yellow mx-auto mb-6" />
          <h3 className="text-3xl font-light text-white mb-4">
            Ready to Power Up Your <span className="text-elec-yellow">Electrical Career?</span>
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of electrical professionals who trust Elec-Mate for their career development, 
            training, and professional growth. Start your journey today.
          </p>
          {!user && (
            <Link to="/auth/signup">
              <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 font-medium px-12 py-6 text-lg">
                Get Started Free
              </Button>
            </Link>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-light mb-4">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </h3>
            <p className="text-gray-400 mb-2">
              Powering the future of electrical professionals across the UK
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Elec-Mate Learning Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
