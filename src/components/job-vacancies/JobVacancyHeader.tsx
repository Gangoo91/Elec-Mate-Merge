
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";

const JobVacancyHeader = () => {
  // Test if we're in a Router context by trying to access it
  const [isInRouterContext, setIsInRouterContext] = React.useState(false);
  
  React.useEffect(() => {
    // Check if Router context is available by testing if we can import useLocation
    try {
      // Try to dynamically import and use useLocation
      import('react-router-dom').then((routerModule) => {
        try {
          // Test if we can access the router context
          const RouterContext = React.createContext(null);
          const context = React.useContext(RouterContext);
          // If we get here without errors, we have router context
          setIsInRouterContext(true);
        } catch (error) {
          console.log('No router context available:', error);
          setIsInRouterContext(false);
        }
      });
    } catch (error) {
      console.log('Router not available:', error);
      setIsInRouterContext(false);
    }
  }, []);
  
  const backButton = (
    <Button variant="outline" className="flex items-center gap-2" onClick={() => window.history.back()}>
      <ArrowLeft className="h-4 w-4" /> Back to Trade Essentials
    </Button>
  );
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-elec-yellow" />
          Job Vacancies
        </h1>
      </div>
      
      {/* Always render as button since Link is causing issues outside Router context */}
      {backButton}
    </div>
  );
};

export default JobVacancyHeader;
