
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface CareerPageHeaderProps {
  activeSection: string | null;
  onBackToSections: () => void;
}

const CareerPageHeader = ({ activeSection, onBackToSections }: CareerPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-elec-yellow" />
          Career Progression
        </h1>
        <p className="text-muted-foreground">
          Resources and guidance for advancing your electrical career
        </p>
      </div>
      {activeSection ? (
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={onBackToSections}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Career Path Sections
        </Button>
      ) : (
        <Link to="/apprentice/hub">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Apprentice Hub
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CareerPageHeader;
