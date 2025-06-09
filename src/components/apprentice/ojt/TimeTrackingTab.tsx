
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Clock, Play, Pause, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TimeTrackingTab = () => {
  const { toast } = useToast();
  
  const [timeEntry, setTimeEntry] = useState({
    activity: "",
    description: "",
    hours: "",
    category: ""
  });

  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    startTime: null as Date | null,
    activity: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeEntry.activity || !timeEntry.hours) {
      toast({
        title: "Missing Information",
        description: "Please fill in activity and hours.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Time Entry Added",
      description: "Your training time has been logged successfully."
    });
    
    setTimeEntry({
      activity: "",
      description: "",
      hours: "",
      category: ""
    });
  };

  const startTracking = () => {
    setIsTracking(true);
    setCurrentSession({
      startTime: new Date(),
      activity: timeEntry.activity || "Training Session"
    });
    toast({
      title: "Timer Started",
      description: "Training time tracking has begun."
    });
  };

  const stopTracking = () => {
    if (currentSession.startTime) {
      const endTime = new Date();
      const duration = (endTime.getTime() - currentSession.startTime.getTime()) / (1000 * 60 * 60);
      
      setTimeEntry(prev => ({
        ...prev,
        hours: duration.toFixed(2)
      }));
      
      toast({
        title: "Timer Stopped",
        description: `Logged ${duration.toFixed(2)} hours of training time.`
      });
    }
    
    setIsTracking(false);
    setCurrentSession({ startTime: null, activity: "" });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">
              Training time logged
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">
              Of 16h target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245h</div>
            <p className="text-xs text-muted-foreground">
              Of 832h required
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Log Training Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="activity">Training Activity</Label>
                <Input
                  id="activity"
                  placeholder="e.g. Electrical Theory Study"
                  value={timeEntry.activity}
                  onChange={(e) => setTimeEntry(prev => ({ ...prev, activity: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={timeEntry.category} onValueChange={(value) => setTimeEntry(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theory">Electrical Theory</SelectItem>
                    <SelectItem value="practical">Practical Skills</SelectItem>
                    <SelectItem value="health-safety">Health & Safety</SelectItem>
                    <SelectItem value="regulations">Regulations Study</SelectItem>
                    <SelectItem value="assessment">Assessment Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.25"
                  placeholder="e.g. 2.5"
                  value={timeEntry.hours}
                  onChange={(e) => setTimeEntry(prev => ({ ...prev, hours: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What did you learn or work on?"
                  value={timeEntry.description}
                  onChange={(e) => setTimeEntry(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Log Training Time
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Live Timer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {isTracking && currentSession.startTime 
                    ? Math.floor((new Date().getTime() - currentSession.startTime.getTime()) / (1000 * 60)) 
                    : 0} min
                </div>
                <p className="text-muted-foreground">
                  {isTracking ? `Tracking: ${currentSession.activity}` : "Timer stopped"}
                </p>
              </div>
              
              <div className="flex gap-2">
                {!isTracking ? (
                  <Button onClick={startTracking} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Start Timer
                  </Button>
                ) : (
                  <Button onClick={stopTracking} variant="destructive" className="flex-1">
                    <Square className="h-4 w-4 mr-2" />
                    Stop Timer
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeTrackingTab;
