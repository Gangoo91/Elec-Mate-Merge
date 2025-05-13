
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-elec-yellow mb-6">
            Elec-Mate
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            The complete platform for electrical professionals and apprentices with learning resources, off-job training tools, electrician's toolkit, community support, mentor connect, and mental health resources
          </p>
          
          {user && <MilestonesDisplay className="mb-8" />}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="lg" variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow/10">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-elec-gray border-t border-elec-yellow/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-elec-yellow mb-10">
            Everything You Need in One Place
          </h2>
          
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
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Elec-Mate Learning Platform
        </p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6 flex flex-col items-center text-center hover:border-elec-yellow/50 transition-colors">
      <div className="bg-elec-yellow/10 p-3 rounded-full mb-4">
        <Icon className="h-6 w-6 text-elec-yellow" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-elec-light/70">{description}</p>
    </div>
  );
};

export default LandingPage;
