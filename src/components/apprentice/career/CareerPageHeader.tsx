
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface CareerPageHeaderProps {
  activeSection: string | null;
  onBackToSections: () => void;
}

const CareerPageHeader = ({ activeSection, onBackToSections }: CareerPageHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
          <GraduationCap className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
          Career Progression
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Resources and guidance for advancing your electrical career
        </p>
      </div>
      {activeSection ? (
        <Button 
          variant="outline" 
          className="flex items-center gap-2 w-full sm:w-auto" 
          onClick={onBackToSections}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Career Path Sections
        </Button>
      ) : (
        <Link to="/apprentice/hub" className="w-full sm:w-auto">
          <Button variant="outline" className="flex items-center gap-2 w-full">
            <ArrowLeft className="h-4 w-4" /> Back to Apprentice Hub
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CareerPageHeader;
