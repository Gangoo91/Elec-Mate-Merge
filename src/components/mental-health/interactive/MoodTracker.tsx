
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Smile, Frown, Meh, Heart } from "lucide-react";

interface MoodEntry {
  date: string;
  mood: number;
  notes?: string;
}

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showTrend, setShowTrend] = useState(false);

  const moodLabels = [
    { value: 1, label: "Very Low", icon: <Frown className="h-5 w-5 text-red-500" />, color: "bg-red-500" },
    { value: 2, label: "Low", icon: <Frown className="h-4 w-4 text-orange-500" />, color: "bg-orange-500" },
    { value: 3, label: "Neutral", icon: <Meh className="h-5 w-5 text-yellow-500" />, color: "bg-yellow-500" },
    { value: 4, label: "Good", icon: <Smile className="h-4 w-4 text-green-500" />, color: "bg-green-500" },
    { value: 5, label: "Excellent", icon: <Smile className="h-5 w-5 text-green-600" />, color: "bg-green-600" }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('elec-mate-mood-history');
    if (stored) {
      setMoodHistory(JSON.parse(stored));
    }
  }, []);

  const saveMood = () => {
    const entry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood
    };
    
    const updated = [...moodHistory.filter(h => h.date !== entry.date), entry]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30); // Keep last 30 days
    
    setMoodHistory(updated);
    localStorage.setItem('elec-mate-mood-history', JSON.stringify(updated));
  };

  const getWeeklyTrend = () => {
    if (moodHistory.length < 2) return null;
    
    const recent = moodHistory.slice(0, 7);
    const avg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const previousWeek = moodHistory.slice(7, 14);
    
    if (previousWeek.length === 0) return null;
    
    const prevAvg = previousWeek.reduce((sum, entry) => sum + entry.mood, 0) / previousWeek.length;
    
    return avg - prevAvg;
  };

  const trend = getWeeklyTrend();
  const currentMoodData = moodLabels.find(m => m.value === currentMood);

  return (
    <Card className="border-purple-500/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-purple-400" />
          Daily Mood Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Mood Selection */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">How are you feeling today?</p>
          
          <div className="grid grid-cols-5 gap-2">
            {moodLabels.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setCurrentMood(mood.value)}
                className={`p-3 rounded-lg border transition-all text-center ${
                  currentMood === mood.value 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  {mood.icon}
                  <span className="text-xs">{mood.label}</span>
                </div>
              </button>
            ))}
          </div>
          
          <Button 
            onClick={saveMood}
            className="w-full bg-purple-500 hover:bg-purple-600"
          >
            Save Today's Mood
          </Button>
        </div>

        {/* Mood History & Trends */}
        {moodHistory.length > 0 && (
          <div className="space-y-3 border-t border-elec-yellow/20 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Your Progress</p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTrend(!showTrend)}
              >
                {showTrend ? 'Hide' : 'Show'} Trend
              </Button>
            </div>
            
            {trend !== null && showTrend && (
              <div className="flex items-center gap-2 p-2 bg-purple-500/5 rounded-lg">
                {trend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : trend < 0 ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <Minus className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-xs">
                  {trend > 0 ? 'Improving' : trend < 0 ? 'Needs attention' : 'Stable'} mood this week
                </span>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Recent entries:</p>
              <div className="space-y-1">
                {moodHistory.slice(0, 5).map((entry, index) => {
                  const moodData = moodLabels.find(m => m.value === entry.mood);
                  return (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span>{new Date(entry.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1">
                        {moodData?.icon}
                        <span>{moodData?.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
