
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const JobVacancyHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Navigating back to career progression');
    navigate('/electrician/career-progression');
  };

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
      
      <Link 
        to="/electrician/career-progression" 
        onClick={handleBackClick}
        className="w-full sm:w-auto"
      >
        <Button 
          variant="outline" 
          className="flex items-center gap-2 hover:bg-elec-yellow hover:text-elec-dark transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Career Progression
        </Button>
      </Link>
    </div>
  );
};

export default JobVacancyHeader;
