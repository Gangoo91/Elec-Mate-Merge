
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ResourceCard from "@/components/apprentice/ResourceCard";
import LearningTimer from "@/components/apprentice/LearningTimer";
import { formatTime } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useInactivityDetection } from "@/hooks/useInactivityDetection";

interface CourseModule {
  id: string;
  title: string;
  content: React.ReactNode;
  resources: {
    id: string;
    title: string;
    description: string;
    type: 'document' | 'video' | 'learning';
    duration?: string;
    href?: string;
  }[];
}

const CourseDetail = () => {
  const { toast } = useToast();
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [currentResourceType, setCurrentResourceType] = useState<string | null>(null);
  
  // Get course title from slug
  const courseTitle = courseSlug?.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // Set up inactivity detection - don't stop timer for video content
  const { isInactive } = useInactivityDetection({
    timeoutSeconds: 30,
    isVideoContent: currentResourceType === 'video',
    onInactive: () => {
      if (isStudying) {
        handleStopStudy();
        toast({
          title: "Study session paused",
          description: "Your study session was paused due to inactivity.",
        });
      }
    }
  });

  // Hardcoded course modules for EAL Level 2 diploma
  const courseModules: CourseModule[] = [
    {
      id: "module-1",
      title: "Health & Safety",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Health & Safety in Electrical Installations</h3>
          <p className="text-muted-foreground mb-4">
            This module covers essential health and safety principles for electrical work, including risk assessment, 
            PPE requirements, and safe isolation procedures.
          </p>
          <div className="space-y-4 mt-6">
            <h4 className="font-medium">Learning Objectives:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand legal responsibilities for health and safety</li>
              <li>Identify common hazards in electrical work environments</li>
              <li>Demonstrate knowledge of safe isolation procedures</li>
              <li>Know when and how to use appropriate PPE</li>
            </ul>
          </div>
        </div>
      ),
      resources: [
        {
          id: "resource-1",
          title: "Safe Isolation Procedures",
          description: "Step-by-step guide to safe isolation",
          type: "document",
          duration: "20 mins"
        },
        {
          id: "resource-2",
          title: "PPE Requirements Video",
          description: "Video demonstration of required PPE",
          type: "video",
          duration: "15 mins"
        },
        {
          id: "resource-3",
          title: "Risk Assessment Quiz",
          description: "Test your knowledge of risk assessment",
          type: "learning",
          duration: "30 mins"
        }
      ]
    },
    {
      id: "module-2",
      title: "Electrical Science & Principles",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Electrical Science and Principles</h3>
          <p className="text-muted-foreground mb-4">
            This module explores fundamental electrical concepts including current, voltage, resistance, and power.
          </p>
          <div className="space-y-4 mt-6">
            <h4 className="font-medium">Learning Objectives:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Understand Ohm's Law and apply it to electrical circuits</li>
              <li>Calculate power in AC and DC circuits</li>
              <li>Explain the relationship between current, voltage and resistance</li>
              <li>Understand the principles of electromagnetic induction</li>
            </ul>
          </div>
        </div>
      ),
      resources: [
        {
          id: "resource-4",
          title: "Ohm's Law Calculations",
          description: "Practice exercises on applying Ohm's Law",
          type: "learning",
          duration: "45 mins"
        },
        {
          id: "resource-5",
          title: "Circuit Theory Explained",
          description: "Comprehensive guide to electrical circuits",
          type: "document",
          duration: "30 mins"
        }
      ]
    }
  ];

  useEffect(() => {
    // Load today's total from localStorage
    const storedTime = localStorage.getItem(`course_${courseSlug}_todayTime`);
    if (storedTime) {
      setTodayTotal(parseInt(storedTime));
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <h3 className="font-semibold">Off-the-Job Training Timer</h3>
              
              {isInactive && !currentResourceType?.includes('video') && (
                <span className="text-xs text-amber-500 bg-amber-950/30 px-2 py-1 rounded-full ml-2">
                  Inactive
                </span>
              )}
            </div>
            
            <div className="w-full md:w-auto">
              <LearningTimer 
                isRunning={isStudying}
                elapsedTime={elapsedTime} 
                todayTotal={todayTotal}
                onStart={handleStartStudy}
                onStop={handleStopStudy}
                className="md:min-w-[280px]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6">
              <Tabs defaultValue={courseModules[0].id} className="space-y-6">
                <TabsList className="bg-elec-dark">
                  {courseModules.map(module => (
                    <TabsTrigger key={module.id} value={module.id}>
                      {module.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {courseModules.map(module => (
                  <TabsContent key={module.id} value={module.id} className="space-y-6">
                    {module.content}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                      <h4 className="font-semibold col-span-full">Learning Resources</h4>
                      {module.resources.map(resource => (
                        <ResourceCard
                          key={resource.id}
                          title={resource.title}
                          description={resource.description}
                          type={resource.type}
                          cta={resource.type === 'video' ? 'Watch Video' : resource.type === 'document' ? 'Read Document' : 'Start Activity'}
                          href={resource.href}
                          duration={resource.duration}
                          onClick={() => handleResourceClick(resource.type)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground bg-elec-gray border border-elec-yellow/20 rounded-md p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-elec-yellow" />
              <p className="font-medium">Off-the-Job Training Info</p>
            </div>
            <p>
              EAL Level 2 electrical courses require a minimum of 20% off-the-job training, equating to at least 278 hours over a 12-month period. 
              Your time spent learning on this app is automatically tracked in the Off-the-Job Time Keeping section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
