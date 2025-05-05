
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import OJTHeader from "@/components/apprentice/time-tracking/ojt/OJTHeader";
import WeeklyProgressCard from "@/components/apprentice/time-tracking/ojt/WeeklyProgressCard";
import TrainingManagementCard from "@/components/apprentice/time-tracking/ojt/TrainingManagementCard";
import TrainingGuideCard from "@/components/apprentice/time-tracking/ojt/TrainingGuideCard";

const ApprenticeOJT = () => {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [targetHours] = useState(40);
  const [courseHours, setCourseHours] = useState(0);
  const [activeTab, setActiveTab] = useState("recent");
  const { toast } = useToast();
  const { addTimeEntry, totalTime } = useTimeEntries();

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
    // In a real implementation, this would generate a PDF or CSV report
    toast({
      title: "Report Generated",
      description: "Your training report has been downloaded successfully."
    });
  };

  const handleLogManualHours = () => {
    setActiveTab("recent");
    // Focus on form input after tab switch
    setTimeout(() => {
      const firstInput = document.querySelector(".time-entry-form input");
      if (firstInput) {
        (firstInput as HTMLInputElement).focus();
      }
    }, 100);
  };

  const handleUploadEvidence = () => {
    setActiveTab("evidence");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <OJTHeader handleDownloadReport={handleDownloadReport} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyProgressCard 
          weeklyHours={weeklyHours}
          targetHours={targetHours}
          courseHours={courseHours}
          totalTime={totalTime}
          addTimeEntry={addTimeEntry}
          handleUploadEvidence={handleUploadEvidence}
        />

        <TrainingManagementCard initialActiveTab={activeTab} />
      </div>

      <TrainingGuideCard />
    </div>
  );
};

export default ApprenticeOJT;
