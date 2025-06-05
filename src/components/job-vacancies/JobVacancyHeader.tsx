
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";

const JobVacancyHeader = () => {
  // Check if we're in a Router context
  let location;
  try {
    location = useLocation();
  } catch (error) {
    // Not in Router context, render without Link
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-elec-yellow" />
            Job Vacancies
          </h1>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" /> Back to Trade Essentials
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-elec-yellow" />
          Job Vacancies
        </h1>
      </div>
      <Link to="/electrician/trade-essentials">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Trade Essentials
        </Button>
      </Link>
    </div>
  );
};

export default JobVacancyHeader;
