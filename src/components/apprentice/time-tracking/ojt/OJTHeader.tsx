
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useAuth } from "@/contexts/AuthContext";
import { generateTrainingReport } from "@/utils/report-generator";
import { useToast } from "@/components/ui/use-toast";

interface OJTHeaderProps {
  handleDownloadReport: () => void;
}

const OJTHeader = ({ handleDownloadReport }: OJTHeaderProps) => {
  const isMobile = useIsMobile();
  const { entries, totalTime } = useTimeEntries();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const generateReport = () => {
    try {
      // Call the report generator with the current entries
      // This will use the correct hour calculation from the improved report generator
      generateTrainingReport({
        studentName: profile?.full_name || user?.email?.split('@')[0] || 'Apprentice',
        totalHours: totalTime,
        entries: entries, // These are the current entries after any deletions
        targetHours: 40,
        weeklyHours: 8
      });
      
      toast({
        title: "Report Generated",
        description: "Your training report has been downloaded successfully."
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // For mobile, we'll completely hide the header as per the screenshot
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
          onClick={generateReport} 
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
