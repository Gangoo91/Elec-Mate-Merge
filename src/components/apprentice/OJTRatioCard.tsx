
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

const OJTRatioCard = () => {
  const [totalOJTTime, setTotalOJTTime] = useState(0);
  
  // Mock data - would come from time tracking system
  const totalWorkTime = 1600; // 40 hours * 40 weeks = 1600 hours per year
  const requiredOJTTime = totalWorkTime * 0.2; // 20% of total time = 320 hours
  const requiredWeekly = Math.round(requiredOJTTime / 52); // 6.15 hours per week
  
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
  
  const percentageComplete = Math.min(100, Math.round((totalOJTTime / requiredOJTTime) * 100));

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>20% Off-The-Job Training</CardTitle>
            <CardDescription>EAL Level 2 requirement: 278 hours per year</CardDescription>
          </div>
          <BookOpen className="h-5 w-5 text-elec-yellow" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Progress toward required 20%</span>
            <span className="font-medium">{percentageComplete}%</span>
          </div>
          <Progress value={percentageComplete} className="h-2 bg-elec-dark" />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-md bg-elec-dark p-2 text-center">
              <div className="text-2xl font-bold text-elec-yellow">{totalOJTTime.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Hours logged</p>
            </div>
            <div className="rounded-md bg-elec-dark p-2 text-center">
              <div className="text-2xl font-bold">{requiredWeekly}</div>
              <p className="text-xs text-muted-foreground">Hours per week</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OJTRatioCard;
