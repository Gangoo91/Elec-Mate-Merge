
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import OJTHeader from "@/components/apprentice/time-tracking/ojt/OJTHeader";
import TrainingManagementCard from "@/components/apprentice/time-tracking/ojt/TrainingManagementCard";
import TrainingGuideCard from "@/components/apprentice/time-tracking/ojt/TrainingGuideCard";
import { useIsMobile } from "@/hooks/use-mobile";

const ApprenticeOJT = () => {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [targetHours] = useState(40);
  const [courseHours, setCourseHours] = useState(0);
  const [activeTab, setActiveTab] = useState("auto"); // Default to auto-tracking
  const { toast } = useToast();
  const { addTimeEntry, totalTime } = useTimeEntries();
  const isMobile = useIsMobile();

  // Simulate loading course hours from various course pages
  useEffect(() => {
    // In a real implementation, this would come from Supabase
    // For now, we'll check localStorage for any course times
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
  }, []);

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your training report has been downloaded successfully."
    });
  };

  const handleUploadEvidence = () => {
    setActiveTab("evidence");
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Only show header on desktop */}
      {!isMobile && <OJTHeader handleDownloadReport={handleDownloadReport} />}
      
      {/* Mobile layout has a different structure */}
      {isMobile ? (
        <div className="pb-24"> {/* Increased bottom padding for mobile */}
          {/* Training Management Card - Main Card for Mobile */}
          <TrainingManagementCard 
            initialActiveTab={activeTab}
            className="border-elec-yellow/20"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop layout - Guide Card first */}
          <TrainingGuideCard />
          
          {/* Training Management Card */}
          <TrainingManagementCard 
            initialActiveTab={activeTab}
            className="border-elec-yellow/20"
          />
        </div>
      )}
    </div>
  );
};

export default ApprenticeOJT;
