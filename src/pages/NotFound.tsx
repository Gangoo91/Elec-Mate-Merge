
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    console.log("Full location object:", location);
    
    // Provide suggestions for common misrouted paths
    if (location.pathname.includes('/rights-and-pay')) {
      console.log("Suggestion: This should probably be /apprentice/rights-and-pay");
    }
  }, [location.pathname, location]);

  // Check if this looks like an apprentice route that's missing the prefix
  const isLikelyApprenticeRoute = location.pathname.match(/^\/(rights-and-pay|toolbox|study|mental-health|mentor|chat|ojt)$/);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-elec-dark">
      <div className="text-center p-6 max-w-md">
        <div className="inline-block p-6 rounded-full bg-elec-gray mb-6">
          <div className="text-6xl font-bold text-elec-yellow">404</div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Show current path for debugging */}
        <div className="mb-6 p-3 bg-elec-gray rounded text-sm text-muted-foreground">
          <strong>Requested path:</strong> {location.pathname}
        </div>
        
        {/* Provide helpful suggestions */}
        {isLikelyApprenticeRoute && (
          <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <p className="text-yellow-400 text-sm mb-2">
              <strong>Suggestion:</strong> This looks like an apprentice route.
            </p>
            <Link to={`/apprentice${location.pathname}`}>
              <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                Try /apprentice{location.pathname}
              </Button>
            </Link>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <Button asChild size="lg">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Return to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link to="/apprentice" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go to Apprentice Hub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
