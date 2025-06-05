
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";

const JobVacancyHeader = () => {
  // More robust Router context detection
  const [isInRouterContext, setIsInRouterContext] = React.useState(false);
  
  React.useEffect(() => {
    try {
      // Test if we can access router context
      const testLocation = window.location.pathname;
      if (testLocation) {
        setIsInRouterContext(true);
      }
    } catch (error) {
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
      
      {isInRouterContext ? (
        <Link to="/electrician/trade-essentials">
          {backButton}
        </Link>
      ) : (
        backButton
      )}
    </div>
  );
};

export default JobVacancyHeader;
