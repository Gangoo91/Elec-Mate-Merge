
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const JobVacancyHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-elec-yellow" />
          Job Vacancies
        </h1>
        <p className="text-muted-foreground mt-1">
          Find electrical jobs across the UK
        </p>
      </div>
      
      <Link to="/electrician/trade-essentials" className="w-full sm:w-auto">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Trade Essentials
        </Button>
      </Link>
    </div>
  );
};

export default JobVacancyHeader;
