
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";

const JobVacancyHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-elec-yellow" />
          Job Vacancies
        </h1>
        <p className="text-muted-foreground">
          Find the latest electrical job opportunities
        </p>
      </div>
      <Link to="/electrician/toolbox-talk">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
        </Button>
      </Link>
    </div>
  );
};

export default JobVacancyHeader;
