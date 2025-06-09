
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Calendar,
  Target,
  Timer,
  BarChart3,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const TrainingTimeTracker = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    startTime: null as Date | null,
    activity: "",
    category: "",
    elapsedTime: 0
  });

  const [timeEntry, setTimeEntry] = useState({
    activity: "",
    category: "",
    hours: "",
    minutes: "",
    description: "",
    learningOutcomes: "",
    evidence: ""
  });

  // Mock data for tracking statistics
  const trackingStats = {
    todayHours: 2.5,
    weekHours: 12.5,
    monthHours: 54.2,
    totalHours: 245,
    targetHours: 832,
    weeklyTarget: 16,
    averageDaily: 3.2,
    streak: 5
  };

  const startTracking = () => {
    if (!timeEntry.activity || !timeEntry.category) {
      toast({
        title: "Missing Information",
        description: "Please select an activity and category before starting the timer.",
        variant: "destructive"
      });
      return;
    }

    setIsTracking(true);
    setCurrentSession({
      startTime: new Date(),
      activity: timeEntry.activity,
      category: timeEntry.category,
      elapsedTime: 0
    });

    toast({
      title: "Timer Started",
      description: `Tracking ${timeEntry.activity} in ${timeEntry.category}`
    });

    // Start the timer interval
    const interval = setInterval(() => {
      setCurrentSession(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1
      }));
    }, 1000);

    // Store interval ID for cleanup
    (window as any).trackingInterval = interval;
  };

  const stopTracking = () => {
    if (currentSession.startTime) {
      const endTime = new Date();
      const duration = (endTime.getTime() - currentSession.startTime.getTime()) / (1000 * 60 * 60);
      
      setTimeEntry(prev => ({
        ...prev,
        hours: Math.floor(duration).toString(),
        minutes: Math.round((duration % 1) * 60).toString()
      }));

      toast({
        title: "Timer Stopped",
        description: `Logged ${duration.toFixed(2)} hours of training time.`
      });
    }

    setIsTracking(false);
    setCurrentSession({ startTime: null, activity: "", category: "", elapsedTime: 0 });
    
    // Clear the interval
    if ((window as any).trackingInterval) {
      clearInterval((window as any).trackingInterval);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!timeEntry.activity || !timeEntry.category || (!timeEntry.hours && !timeEntry.minutes)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Time Entry Saved",
      description: "Your training time has been logged successfully."
    });

    // Reset form
    setTimeEntry({
      activity: "",
      category: "",
      hours: "",
      minutes: "",
      description: "",
      learningOutcomes: "",
      evidence: ""
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const LiveTimerView = () => (
    <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Live Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold">
            {formatTime(currentSession.elapsedTime)}
          </div>
          
          {isTracking && (
            <div className="space-y-2">
              <p className="text-lg">Tracking: {currentSession.activity}</p>
              <Badge variant="secondary" className="text-white bg-white/20">
                {currentSession.category}
              </Badge>
            </div>
          )}
          
          <div className="flex gap-2 justify-center">
            {!isTracking ? (
              <Button onClick={startTracking} size="lg" variant="secondary">
                <Play className="h-4 w-4 mr-2" />
                Start Timer
              </Button>
            ) : (
              <>
                <Button onClick={stopTracking} size="lg" variant="destructive">
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const StatsOverview = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{trackingStats.todayHours}h</div>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{trackingStats.weekHours}h</div>
            <p className="text-sm text-muted-foreground">This Week</p>
            <Progress value={(trackingStats.weekHours / trackingStats.weeklyTarget) * 100} className="mt-2" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{trackingStats.monthHours}h</div>
            <p className="text-sm text-muted-foreground">This Month</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{trackingStats.streak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Time Tracking</h2>
          <p className="text-muted-foreground">Track your off-the-job training time with precision</p>
        </div>
      </div>

      <StatsOverview />
      
      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="timer" className="flex-1">Live Timer</TabsTrigger>
          <TabsTrigger value="manual" className="flex-1">Manual Entry</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="timer" className="space-y-6">
          <LiveTimerView />
          
          {/* Quick Activity Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="activity">Training Activity</Label>
                  <Select value={timeEntry.activity} onValueChange={(value) => setTimeEntry(prev => ({ ...prev, activity: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical-theory">Electrical Theory</SelectItem>
                      <SelectItem value="practical-skills">Practical Skills</SelectItem>
                      <SelectItem value="health-safety">Health & Safety</SelectItem>
                      <SelectItem value="regulations">Regulations Study</SelectItem>
                      <SelectItem value="assessment-prep">Assessment Preparation</SelectItem>
                      <SelectItem value="portfolio-work">Portfolio Work</SelectItem>
                      <SelectItem value="research">Research & Reading</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={timeEntry.category} onValueChange={(value) => setTimeEntry(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guided-learning">Guided Learning</SelectItem>
                      <SelectItem value="independent-study">Independent Study</SelectItem>
                      <SelectItem value="practical-training">Practical Training</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manual Time Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activity">Training Activity *</Label>
                    <Input
                      id="activity"
                      placeholder="e.g. Cable sizing calculations"
                      value={timeEntry.activity}
                      onChange={(e) => setTimeEntry(prev => ({ ...prev, activity: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={timeEntry.category} onValueChange={(value) => setTimeEntry(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guided-learning">Guided Learning</SelectItem>
                        <SelectItem value="independent-study">Independent Study</SelectItem>
                        <SelectItem value="practical-training">Practical Training</SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hours">Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="24"
                      placeholder="0"
                      value={timeEntry.hours}
                      onChange={(e) => setTimeEntry(prev => ({ ...prev, hours: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="minutes">Minutes</Label>
                    <Input
                      id="minutes"
                      type="number"
                      min="0"
                      max="59"
                      placeholder="0"
                      value={timeEntry.minutes}
                      onChange={(e) => setTimeEntry(prev => ({ ...prev, minutes: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you worked on..."
                    value={timeEntry.description}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
                  <Textarea
                    id="learningOutcomes"
                    placeholder="What did you learn or achieve?"
                    value={timeEntry.learningOutcomes}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, learningOutcomes: e.target.value }))}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="evidence">Evidence/References</Label>
                  <Input
                    id="evidence"
                    placeholder="Link to portfolio items, documents, etc."
                    value={timeEntry.evidence}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, evidence: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Training Time
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Total Progress</span>
                      <span>{trackingStats.totalHours}h / {trackingStats.targetHours}h</span>
                    </div>
                    <Progress value={(trackingStats.totalHours / trackingStats.targetHours) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Weekly Target</span>
                      <span>{trackingStats.weekHours}h / {trackingStats.weeklyTarget}h</span>
                    </div>
                    <Progress value={(trackingStats.weekHours / trackingStats.weeklyTarget) * 100} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Electrical Theory</span>
                    <Badge variant="secondary">35%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Practical Skills</span>
                    <Badge variant="secondary">28%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Health & Safety</span>
                    <Badge variant="secondary">20%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Regulations</span>
                    <Badge variant="secondary">17%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingTimeTracker;
