import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface OJTHeaderProps {
  handleDownloadReport: () => void;
}

const OJTHeader = ({ handleDownloadReport }: OJTHeaderProps) => {
  const isMobile = useIsMobile();
  
  // For mobile, we'll simplify the header since the design shows we don't need this
  if (isMobile) {
    return null;
  }
  
  // Desktop header remains the same
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Off the Job Training</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Track, manage and provide evidence for your 20% off-the-job training requirements
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={handleDownloadReport} 
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Link to="/apprentice">
          <Button variant="outline">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default OJTHeader;
