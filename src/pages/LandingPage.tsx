
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Wrench, MessageSquare, Sparkles, Brain, Heart } from 'lucide-react';
import MilestonesDisplay from '@/components/apprentice/MilestonesDisplay';

const LandingPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-elec-dark text-white">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="max-w-3xl">
          {/* Logo styling to exactly match the provided image */}
          <h1 className="mb-8 relative">
            <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight flex justify-center">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </span>
            <span className="absolute -top-4 right-1/4 text-xs sm:text-sm text-elec-yellow font-semibold tracking-widest">UK</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-elec-light/90 max-w-2xl mx-auto">
            The complete platform for electrical professionals and apprentices with learning resources, off-job training tools, electrician's toolkit, community support, mentor connect, and mental health resources
          </p>
          
          {user && <MilestonesDisplay className="mb-8" />}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 font-medium px-8 py-6 text-lg">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 font-medium px-8 py-6 text-lg">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="lg" variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow/10 font-medium px-8 py-6 text-lg">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Features Section with improved visual design */}
      <div className="py-16 bg-gradient-to-b from-elec-gray to-elec-dark border-t border-elec-yellow/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            <span className="text-elec-yellow">Everything</span> <span className="text-white">You Need in One Place</span>
          </h2>
          <p className="text-center text-elec-light/70 max-w-2xl mx-auto mb-12">
            ElecMate provides the complete toolkit for UK electrical professionals, from apprentices to business owners
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BookOpen} 
              title="Learning Resources" 
              description="Access comprehensive study materials, video lessons, and practice tests for apprentices and professionals."
            />
            <FeatureCard 
              icon={Wrench} 
              title="Electrician's Toolkit" 
              description="Essential calculation tools, code references, and job aids to make your work easier and more efficient."
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Community Support" 
              description="Connect with other professionals, share knowledge, and solve problems together."
            />
            <FeatureCard 
              icon={Sparkles} 
              title="Off-Job Training" 
              description="Track and document your off-job training hours with our digital logbook system."
            />
            <FeatureCard 
              icon={Brain} 
              title="Mentor Connect" 
              description="Get guidance from experienced professionals through our mentorship program."
            />
            <FeatureCard 
              icon={Heart} 
              title="Mental Health Support" 
              description="Access resources designed to support your wellbeing throughout your career."
            />
          </div>
        </div>
      </div>
      
      <footer className="py-6 border-t border-elec-yellow/30 text-center">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-2">
            <span className="text-elec-yellow">Elec-</span>
            <span className="text-white">Mate</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Elec-Mate Learning Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

// Enhanced Feature Card Component with hover effects
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6 flex flex-col items-center text-center hover:border-elec-yellow/50 transition-colors hover:shadow-lg hover:shadow-elec-yellow/5 group">
      <div className="bg-elec-yellow/10 p-4 rounded-full mb-5 group-hover:bg-elec-yellow/20 transition-colors">
        <Icon className="h-7 w-7 text-elec-yellow" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-elec-light/70">{description}</p>
    </div>
  );
};

export default LandingPage;
