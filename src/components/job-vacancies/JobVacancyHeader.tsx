
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";

interface JobVacancyHeaderProps {
  onBack?: () => void;
}

const JobVacancyHeader = ({ onBack }: JobVacancyHeaderProps) => {

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
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 hover:bg-elec-yellow hover:text-elec-dark transition-colors w-full sm:w-auto"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Career Progression
      </Button>
    </div>
  );
};

export default JobVacancyHeader;
