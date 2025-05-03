
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";
import { ealLevel2Units } from "@/data/courseUnits";
import CourseTimer from "@/components/apprentice/CourseTimer";
import CourseUnitGrid from "@/components/apprentice/CourseUnitGrid";
import UnitDetails from "@/components/apprentice/UnitDetails";
import CourseInfoBox from "@/components/apprentice/CourseInfoBox";

const CourseDetail = () => {
  const { toast } = useToast();
  const { courseSlug } = useParams();
  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [currentResourceType, setCurrentResourceType] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [completedResources, setCompletedResources] = useState<Record<string, boolean>>({});
  
  // Get course title from slug
  const courseTitle = courseSlug?.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  useEffect(() => {
    // Load today's total from localStorage
    const storedTime = localStorage.getItem(`course_${courseSlug}_todayTime`);
    if (storedTime) {
      setTodayTotal(parseInt(storedTime));
    }
    
    // Load completed resources from localStorage
    const storedCompletedResources = localStorage.getItem(`course_${courseSlug}_completedResources`);
    if (storedCompletedResources) {
      try {
        setCompletedResources(JSON.parse(storedCompletedResources));
      } catch (e) {
        console.error("Error parsing completed resources from localStorage:", e);
      }
    }
  }, [courseSlug]);

  const handleStartStudy = () => {
    setIsStudying(true);
    setSessionStartTime(Date.now());
    toast({
      title: "Study session started",
      description: "Your off-the-job training time is now being recorded."
    });
  };

  const handleStopStudy = async () => {
    if (!sessionStartTime) return;
    
    const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
    setElapsedTime(prev => prev + sessionTime);
    setIsStudying(false);
    setSessionStartTime(null);
    
    // Update today's total
    const newTodayTotal = todayTotal + sessionTime;
    setTodayTotal(newTodayTotal);
    
    // Save to localStorage
    localStorage.setItem(`course_${courseSlug}_todayTime`, newTodayTotal.toString());
    
    // Log time entry
    try {
      // In a real implementation, we would save to Supabase here
      // For now, we'll just show a toast
      toast({
        title: "Study time logged",
        description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
      });
      
    } catch (error) {
      toast({
        title: "Error saving time record",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Handler for resource clicks to track resource type
  const handleResourceClick = (type: string) => {
    setCurrentResourceType(type);
    if (!isStudying) {
      toast({
        title: "Start study timer",
        description: "Click 'Start Learning' to record your training time for this activity.",
      });
    }
  };

  // Handler for unit selection
  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId === selectedUnit ? null : unitId);
  };
  
  // Handler for toggling resource completion
  const handleToggleResourceComplete = (resourceId: string) => {
    setCompletedResources(prev => {
      const updated = {
        ...prev,
        [resourceId]: !prev[resourceId]
      };
      
      // Save to localStorage
      localStorage.setItem(`course_${courseSlug}_completedResources`, JSON.stringify(updated));
      
      // Show toast notification
      toast({
        title: updated[resourceId] ? "Resource marked as completed" : "Resource marked as incomplete",
        description: "Your progress has been updated.",
      });
      
      return updated;
    });
  };

  // Find the selected unit for display
  const selectedUnitData = selectedUnit 
    ? ealLevel2Units.find(unit => unit.id === selectedUnit) 
    : null;

  return (
    <div className="space-y-8 animate-fade-in px-4 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            <span className="gradient-text">{courseTitle}</span>
          </h1>
          <p className="text-muted-foreground">
            EAL Level 2 course materials and learning resources
          </p>
        </div>
        <Link to="/apprentice/study/eal" className="flex-shrink-0 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EAL Courses
          </Button>
        </Link>
      </div>

      {/* Timer at the top */}
      <CourseTimer 
        courseSlug={courseSlug}
        isStudying={isStudying}
        elapsedTime={elapsedTime}
        todayTotal={todayTotal}
        currentResourceType={currentResourceType}
        onStartStudy={handleStartStudy}
        onStopStudy={handleStopStudy}
      />
      
      <div className="space-y-6">
        {/* Course units grid */}
        <CourseUnitGrid 
          units={ealLevel2Units} 
          selectedUnit={selectedUnit} 
          onUnitSelect={handleUnitSelect}
          completedResources={completedResources}
        />
        
        {/* Selected unit details */}
        {selectedUnitData && (
          <UnitDetails 
            unit={selectedUnitData} 
            onResourceClick={handleResourceClick}
            completedResources={completedResources}
            onToggleResourceComplete={handleToggleResourceComplete}
          />
        )}

        <CourseInfoBox />
      </div>
    </div>
  );
};

export default CourseDetail;
