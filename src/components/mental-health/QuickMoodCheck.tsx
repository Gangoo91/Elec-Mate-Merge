
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

interface QuickMoodCheckProps {
  onClose: () => void;
}

const QuickMoodCheck = ({ onClose }: QuickMoodCheckProps) => {
  const { moodHistory, addMoodEntry } = useMentalHealth();
  const [step, setStep] = useState<'select' | 'note' | 'complete'>('select');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const moods = [
    { value: 1, emoji: "😢", label: "Struggling", color: "from-red-500 to-rose-500", bg: "bg-red-500/20" },
    { value: 2, emoji: "😔", label: "Low", color: "from-orange-500 to-amber-500", bg: "bg-orange-500/20" },
    { value: 3, emoji: "😐", label: "Okay", color: "from-yellow-500 to-amber-400", bg: "bg-yellow-500/20" },
    { value: 4, emoji: "🙂", label: "Good", color: "from-green-500 to-emerald-500", bg: "bg-green-500/20" },
    { value: 5, emoji: "😊", label: "Great", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-500/20" }
  ];

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setStep('note');
  };

  const handleSave = () => {
    if (selectedMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      mood: selectedMood,
      notes: note.trim() || undefined
    });
    setStep('complete');
  };

  const handleSkipNote = () => {
    if (selectedMood === null) return;

    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      mood: selectedMood
    });
    setStep('complete');
  };

  const getTrend = () => {
    if (moodHistory.length < 3) return null;
    const recent = moodHistory.slice(0, 3);
    const avg = recent.reduce((sum, e) => sum + e.mood, 0) / recent.length;
    const older = moodHistory.slice(3, 6);
    if (older.length === 0) return null;
    const oldAvg = older.reduce((sum, e) => sum + e.mood, 0) / older.length;

    if (avg > oldAvg + 0.3) return 'up';
    if (avg < oldAvg - 0.3) return 'down';
    return 'stable';
  };

  const selectedMoodData = moods.find(m => m.value === selectedMood);

  return (
    <div className="min-h-[70vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {step === 'select' && (
          <div className="w-full max-w-sm space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">How are you feeling?</h2>
              <p className="text-white text-sm">
                Take a moment to check in with yourself
              </p>
            </div>

            <div className="space-y-3">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`w-full p-4 rounded-xl border border-white/10 ${mood.bg}
                    hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                    flex items-center gap-4`}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{mood.label}</div>
                    <div className="text-xs text-foreground/60">
                      {mood.value === 1 && "Finding things difficult right now"}
                      {mood.value === 2 && "Not my best, but managing"}
                      {mood.value === 3 && "Neither good nor bad"}
                      {mood.value === 4 && "Feeling positive today"}
                      {mood.value === 5 && "Feeling really good!"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'note' && selectedMoodData && (
          <div className="w-full max-w-sm space-y-6 animate-fade-in">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${selectedMoodData.bg} mb-4`}>
                <span className="text-5xl">{selectedMoodData.emoji}</span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Feeling {selectedMoodData.label.toLowerCase()}
              </h2>
              <p className="text-white text-sm">
                Want to add a note? (optional)
              </p>
            </div>

            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind? What influenced your mood today?"
              className="min-h-[120px] resize-none"
              autoFocus
            />

            <div className="space-y-2">
              <Button onClick={handleSave} className="w-full" size="lg">
                Save Check-In
              </Button>
              <Button onClick={handleSkipNote} variant="ghost" className="w-full">
                Skip Note
              </Button>
            </div>
          </div>
        )}

        {step === 'complete' && selectedMoodData && (
          <div className="w-full max-w-sm space-y-6 animate-fade-in text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${selectedMoodData.color}`}>
              <Check className="h-12 w-12 text-foreground" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check-In Saved</h2>
              <p className="text-white">
                Thanks for taking a moment to check in.
              </p>
            </div>

            {/* Stats */}
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{moodHistory.length}</div>
                    <div className="text-xs text-white">Days Tracked</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      {getTrend() === 'up' && (
                        <>
                          <TrendingUp className="h-5 w-5 text-green-400" />
                          <span className="text-lg font-bold text-green-400">Up</span>
                        </>
                      )}
                      {getTrend() === 'down' && (
                        <>
                          <TrendingDown className="h-5 w-5 text-red-400" />
                          <span className="text-lg font-bold text-red-400">Down</span>
                        </>
                      )}
                      {getTrend() === 'stable' && (
                        <>
                          <Minus className="h-5 w-5 text-blue-400" />
                          <span className="text-lg font-bold text-blue-400">Stable</span>
                        </>
                      )}
                      {!getTrend() && (
                        <span className="text-sm text-white">Keep tracking</span>
                      )}
                    </div>
                    <div className="text-xs text-white">Trend</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supportive Message */}
            {selectedMood && selectedMood <= 2 && (
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="p-4">
                  <p className="text-sm text-amber-200">
                    It's okay to not be okay. Consider reaching out to someone you trust, or explore our support resources.
                  </p>
                </CardContent>
              </Card>
            )}

            <Button onClick={onClose} className="w-full" size="lg">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickMoodCheck;
