
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const LandingPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-elec-dark text-white">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-elec-yellow mb-6">
            ElecTrack
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your comprehensive training partner for electrical apprenticeships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/apprentice/study">
                <Button size="lg" className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80">
                  Go to Learning Portal
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
      
      <footer className="py-6 border-t border-elec-yellow/30 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ElecTrack Learning Platform
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
