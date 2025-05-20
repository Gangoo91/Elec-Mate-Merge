
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import OJTHeader from "@/components/apprentice/time-tracking/ojt/OJTHeader";
import TrainingManagementCard from "@/components/apprentice/time-tracking/ojt/TrainingManagementCard";
import TrainingGuideCard from "@/components/apprentice/time-tracking/ojt/TrainingGuideCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTrackMilestones } from "@/hooks/useTrackMilestones";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import TrackingStatusIndicator from "@/components/apprentice/time-tracking/ojt/TrackingStatusIndicator";
import { useTrainingActivityMonitor } from "@/hooks/useTrainingActivityMonitor";

const ApprenticeOJT = () => {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [targetHours] = useState(40);
  const [courseHours, setCourseHours] = useState(0);
  const [activeTab, setActiveTab] = useState("auto"); // Default to auto-tracking
  const { toast } = useToast();
  const { totalTime } = useTimeEntries();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Add milestone tracking
  useTrackMilestones();
  
  // Monitor training activity across the app
  useTrainingActivityMonitor();

  // Simulate loading course hours from various course pages
  useEffect(() => {
    // In a real implementation, this would come from Supabase
    // For now, we'll check localStorage for any course time entries
    let totalCourseTime = 0;
    
    // Loop through localStorage to find any course time entries
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const timeValue = parseInt(localStorage.getItem(key) || '0');
        totalCourseTime += timeValue;
      }
    });
    
    // Convert seconds to hours
    setCourseHours(Math.round(totalCourseTime / 36) / 100); // rounded to 2 decimal places
    
    // Update weekly hours with course hours
    setWeeklyHours(prev => {
      const newTotal = 8 + (totalCourseTime / 3600);
      return parseFloat(newTotal.toFixed(1));
    });
  }, [location.pathname]); // Re-run when location changes to capture new learning time

  const handleDownloadReport = () => {
    // The actual report download is now handled in OJTHeader component
    // This function remains for backwards compatibility
    toast({
      title: "Report Generated",
      description: "Your training report has been downloaded successfully."
    });
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Only show header on desktop */}
      {!isMobile && <OJTHeader handleDownloadReport={handleDownloadReport} />}
      
      {/* Add the training status indicator */}
      <TrackingStatusIndicator />
      
      {/* Time tracking info banner */}
      <Alert variant="default" className="bg-elec-gray/50 border-elec-yellow/30">
        <Info className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-sm">
          Your training is now tracked in 30-minute sessions to simplify your records. All time is still captured even if you do shorter sessions.
        </AlertDescription>
      </Alert>
      
      {/* Clean layout for both mobile and desktop */}
      <div className={isMobile ? "pb-24" : "space-y-6"}>
        {/* Desktop only - Guide Card first */}
        {!isMobile && <TrainingGuideCard />}
        
        {/* Training Management Card - Main Card for all layouts */}
        <TrainingManagementCard 
          initialActiveTab={activeTab}
          className="border-elec-yellow/20"
        />
      </div>
    </div>
  );
};

export default ApprenticeOJT;
