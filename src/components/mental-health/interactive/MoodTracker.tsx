
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp } from "lucide-react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

const MoodTracker = () => {
  const { moodHistory, addMoodEntry } = useMentalHealth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [todayEntry, setTodayEntry] = useState<any>(null);

  const moodOptions = [
    { value: 1, label: "Very Low", emoji: "😢", color: "bg-red-500" },
    { value: 2, label: "Low", emoji: "😞", color: "bg-orange-500" },
    { value: 3, label: "Neutral", emoji: "😐", color: "bg-yellow-500" },
    { value: 4, label: "Good", emoji: "🙂", color: "bg-green-500" },
    { value: 5, label: "Excellent", emoji: "😊", color: "bg-emerald-500" }
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const entry = moodHistory.find(entry => entry.date === today);
    if (entry) {
      setTodayEntry(entry);
      setSelectedMood(entry.mood);
      setNotes(entry.notes || "");
    }
  }, [moodHistory]);

  const handleSaveMood = () => {
    if (selectedMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      mood: selectedMood,
      notes: notes.trim() || undefined
    });

    setTodayEntry({ date: today, mood: selectedMood, notes: notes.trim() });
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.reduce((total, entry) => total + entry.mood, 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  const getWeeklyTrend = () => {
    const lastWeek = moodHistory.slice(0, 7);
    if (lastWeek.length < 2) return null;
    
    const recent = lastWeek.slice(0, 3).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(3, lastWeek.length);
    const older = lastWeek.slice(3).reduce((sum, entry) => sum + entry.mood, 0) / Math.max(1, lastWeek.length - 3);
    
    return recent > older ? "improving" : recent < older ? "declining" : "stable";
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Daily Mood Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayEntry ? (
          <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="text-2xl mb-2">
              {moodOptions.find(m => m.value === todayEntry.mood)?.emoji}
            </div>
            <p className="text-green-400 font-medium">
              Today's mood: {moodOptions.find(m => m.value === todayEntry.mood)?.label}
            </p>
            {todayEntry.notes && (
              <p className="text-sm text-muted-foreground mt-2">"{todayEntry.notes}"</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
              <div className="grid grid-cols-5 gap-2">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={selectedMood === mood.value ? "default" : "outline"}
                    className={`flex flex-col p-3 h-auto ${
                      selectedMood === mood.value ? mood.color : ""
                    }`}
                    onClick={() => setSelectedMood(mood.value)}
                  >
                    <span className="text-xl mb-1">{mood.emoji}</span>
                    <span className="text-xs">{mood.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Notes (optional)</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's influencing your mood today?"
                className="mt-1"
                rows={2}
              />
            </div>

            <Button 
              onClick={handleSaveMood}
              disabled={selectedMood === null}
              className="w-full"
            >
              Save Today's Mood
            </Button>
          </div>
        )}

        {moodHistory.length > 0 && (
          <div className="pt-4 border-t border-elec-yellow/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-white">{moodHistory.length}</div>
                <div className="text-xs text-muted-foreground">Days tracked</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{getAverageMood()}</div>
                <div className="text-xs text-muted-foreground">Average mood</div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  {getWeeklyTrend() === "improving" && (
                    <Badge className="bg-green-500/20 text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Improving
                    </Badge>
                  )}
                  {getWeeklyTrend() === "declining" && (
                    <Badge className="bg-red-500/20 text-red-400">Declining</Badge>
                  )}
                  {getWeeklyTrend() === "stable" && (
                    <Badge className="bg-blue-500/20 text-blue-400">Stable</Badge>
                  )}
                  {!getWeeklyTrend() && (
                    <div className="text-xs text-muted-foreground">Track more for trends</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
