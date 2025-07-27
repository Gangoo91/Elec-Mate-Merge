
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const OJTRatioCard = () => {
  const [totalOJTTime, setTotalOJTTime] = useState(0);
  const isMobile = useIsMobile();
  
  // Mock data - would come from time tracking system
  const totalWorkTime = 1600; // 40 hours * 40 weeks = 1600 hours per year
  const requiredOJTTime = totalWorkTime * 0.2; // 20% of total time = 320 hours
  
  // Load course time from localStorage
  useEffect(() => {
    let totalCourseTimeSeconds = 0;
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const timeValue = parseInt(localStorage.getItem(key) || '0');
        totalCourseTimeSeconds += timeValue;
      }
    });
    
    // Convert to hours (3600 seconds = 1 hour)
    const courseHours = totalCourseTimeSeconds / 3600;
    
    // Add to mock data (120 hours) plus course hours
    setTotalOJTTime(120 + courseHours);
  }, []);

  if (!isMobile) {
    // Original desktop version
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="text-xl font-bold">Portfolio & OJT Management</span>
            </div>
            <div className="text-sm text-muted-foreground">20% requirement</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-md bg-elec-dark p-2 text-center">
              <div className="text-2xl font-bold text-elec-yellow">{totalOJTTime.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Hours logged</p>
            </div>
            <div className="rounded-md bg-elec-dark p-2 text-center">
              <div className="text-2xl font-bold">{Math.round(requiredOJTTime)}</div>
              <p className="text-xs text-muted-foreground">Hours required</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Mobile version (much simpler as per the screenshot)
  return null; // We've moved this functionality to the TrainingManagementCard for mobile
};

export default OJTRatioCard;
