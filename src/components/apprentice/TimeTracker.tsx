
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, BookOpen, Save, Plus, CheckSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";

type TimeEntry = {
  id: string;
  date: string;
  duration: number;
  activity: string;
  notes: string;
  isAutomatic?: boolean;
  isQuiz?: boolean;
  score?: number;
  totalQuestions?: number;
};

const TimeTracker = () => {
  const { toast } = useToast();
  const [duration, setDuration] = useState<number>(0);
  const [activity, setActivity] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [courseEntries, setCourseEntries] = useState<TimeEntry[]>([]);
  const [quizEntries, setQuizEntries] = useState<TimeEntry[]>([]);
  
  // On component mount, check localStorage for course time entries
  useEffect(() => {
    // In a real implementation, this would come from Supabase
    const entries: TimeEntry[] = [
      {
        id: "entry-1",
        date: new Date().toISOString().split('T')[0],
        duration: 120, // minutes
        activity: "Wiring Regulations Study",
        notes: "Completed chapters 1-3 of the BS 7671 textbook"
      },
      {
        id: "entry-2",
        date: new Date().toISOString().split('T')[0],
        duration: 90, // minutes
        activity: "Practical Workshop",
        notes: "Practiced ring final circuit installation techniques"
      }
    ];
    
    // Look for course time entries in localStorage
    const courseTimeEntries: TimeEntry[] = [];
    const quizAttemptEntries: TimeEntry[] = [];
    
    Object.keys(localStorage).forEach(key => {
      // Process course time entries
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const courseName = key.replace('course_', '').replace('_todayTime', '');
        const formattedCourseName = courseName.split('-').map(
          word => word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const timeValue = parseInt(localStorage.getItem(key) || '0');
        if (timeValue > 0) {
          courseTimeEntries.push({
            id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            date: new Date().toISOString().split('T')[0],
            duration: Math.round(timeValue / 60), // convert seconds to minutes
            activity: `Online Learning: ${formattedCourseName}`,
            notes: "Automatically tracked from the learning portal",
            isAutomatic: true
          });
        }
      }
      
      // Process quiz attempts
      if (key.includes('_quiz_attempts')) {
        try {
          const unitCode = key.split('_quiz_attempts')[0].replace('unit_', '');
          const attempts = JSON.parse(localStorage.getItem(key) || '[]');
          
          attempts.forEach((attempt: any, index: number) => {
            quizAttemptEntries.push({
              id: `quiz-${unitCode}-${index}`,
              date: new Date(attempt.date).toISOString().split('T')[0],
              duration: Math.ceil(attempt.timeTaken / 60), // convert seconds to minutes
              activity: `Quiz: Unit ${unitCode}`,
              notes: `Assessment Score: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}%)`,
              isAutomatic: true,
              isQuiz: true,
              score: attempt.score,
              totalQuestions: attempt.totalQuestions
            });
          });
        } catch (e) {
          console.error("Error parsing quiz attempts:", e);
        }
      }
    });
    
    setTimeEntries(entries);
    setCourseEntries(courseTimeEntries);
    setQuizEntries(quizAttemptEntries);
  }, []);

  const totalMinutes = [...timeEntries, ...courseEntries, ...quizEntries].reduce((total, entry) => total + entry.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!duration || !activity) {
      toast({
        title: "Missing information",
        description: "Please enter both duration and activity.",
        variant: "destructive"
      });
      return;
    }

    const newEntry: TimeEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      duration,
      activity,
      notes
    };

    setTimeEntries([...timeEntries, newEntry]);
    setDuration(0);
    setActivity("");
    setNotes("");

    toast({
      title: "Time entry added",
      description: "Your off-the-job training has been logged successfully."
    });
  };

  const allEntries = [...timeEntries, ...courseEntries, ...quizEntries].sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle>Off-The-Job Training Logger</CardTitle>
                <CardDescription>Track your 20% off-the-job training time</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-elec-yellow">{hours}h {minutes}m</div>
              <p className="text-xs text-muted-foreground">Total logged time</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duration (minutes)
                </label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={duration || ""}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  placeholder="Enter time in minutes"
                  className="border-elec-yellow/20 bg-elec-dark"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="activity" className="text-sm font-medium">
                  Activity Type
                </label>
                <Input
                  id="activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  placeholder="E.g., Video lesson, Reading, Practice"
                  className="border-elec-yellow/20 bg-elec-dark"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What did you learn? What did you practice?"
                className="min-h-[100px] border-elec-yellow/20 bg-elec-dark"
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Time Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Time Entries</h3>
        {allEntries.map((entry) => (
          <Card key={entry.id} className={`border-elec-yellow/20 ${entry.isAutomatic ? 'bg-elec-dark' : 'bg-elec-gray'}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {entry.isQuiz && <CheckSquare className="h-4 w-4 text-elec-yellow" />}
                    {entry.isAutomatic && !entry.isQuiz && <BookOpen className="h-4 w-4 text-elec-yellow" />}
                    <h4 className="font-medium">{entry.activity}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.notes}</p>
                  {entry.isQuiz && entry.score !== undefined && entry.totalQuestions !== undefined && (
                    <div className="mt-2 text-sm">
                      <div className="w-full bg-elec-gray/50 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${(entry.score / entry.totalQuestions) >= 0.7 ? 'bg-green-500' : 'bg-amber-500'}`} 
                          style={{ width: `${(entry.score / entry.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                  </div>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimeTracker;
