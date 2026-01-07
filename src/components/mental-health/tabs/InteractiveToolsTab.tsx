
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Zap,
  Brain,
  Target,
  Bell,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Scan,
  Clock,
  Smile,
  Battery,
  RefreshCw
} from "lucide-react";
import MoodTracker from "@/components/mental-health/interactive/MoodTracker";
import SelfCareReminders from "@/components/mental-health/interactive/SelfCareReminders";
import StressManagementTools from "@/components/mental-health/interactive/StressManagementTools";
import GoalSettingTracker from "@/components/mental-health/interactive/GoalSettingTracker";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

// Body Scan Meditation Component
const BodyScanMeditation = () => {
  const bodyParts = [
    "Feet and toes", "Lower legs", "Upper legs and hips", "Abdomen and lower back",
    "Chest and upper back", "Hands and arms", "Shoulders and neck", "Face and head"
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentStep < bodyParts.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeLeft(30);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentStep, bodyParts.length]);

  const startScan = () => {
    setCurrentStep(0);
    setTimeLeft(30);
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTimeLeft(30);
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center space-y-2">
        <h4 className="font-medium text-white">Focus on: {bodyParts[currentStep]}</h4>
        <div className="text-3xl font-bold text-cyan-400">{timeLeft}s</div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((currentStep * 30 + (30 - timeLeft)) / (bodyParts.length * 30)) * 100}%` }}
          />
        </div>
        <p className="text-xs text-white">Step {currentStep + 1} of {bodyParts.length}</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={startScan}
          disabled={isActive}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {currentStep === 0 && !isActive ? 'Start Scan' : 'Resume'}
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

// Worry Time Timer Component
const WorryTimeTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const totalTime = 900;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalTime);
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center space-y-3">
        <div className="text-5xl font-bold text-orange-400">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-white">
          {!isActive && timeLeft === totalTime && "Set aside 15 minutes to process your worries"}
          {isActive && "Let your worries flow freely during this time"}
          {timeLeft === 0 && "Time's up! Now let go of those worries"}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={toggleTimer}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isActive ? 'Pause' : timeLeft === totalTime ? 'Start Worry Time' : 'Resume'}
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

// Gratitude Quick-Add Component
const GratitudeQuickAdd = () => {
  const [gratitudes, setGratitudes] = useState(['', '', '']);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const validGratitudes = gratitudes.filter(g => g.trim() !== '');
    if (validGratitudes.length > 0) {
      const existing = JSON.parse(localStorage.getItem('gratitudes') || '[]');
      const entry = {
        date: new Date().toISOString().split('T')[0],
        items: validGratitudes
      };
      localStorage.setItem('gratitudes', JSON.stringify([...existing, entry]));
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setGratitudes(['', '', '']);
      }, 2000);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-3">
        {gratitudes.map((gratitude, index) => (
          <div key={index}>
            <label className="text-xs text-white mb-1 block">Thing {index + 1}</label>
            <input
              type="text"
              value={gratitude}
              onChange={(e) => {
                const newGratitudes = [...gratitudes];
                newGratitudes[index] = e.target.value;
                setGratitudes(newGratitudes);
              }}
              placeholder={`I'm grateful for...`}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={handleSave}
        disabled={gratitudes.every(g => g.trim() === '')}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50"
      >
        {saved ? '✓ Saved!' : 'Save Gratitudes'}
      </Button>
    </div>
  );
};

// Energy Level Check Component
const EnergyLevelCheck = () => {
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const energyLevels = [
    { level: 'low', emoji: '🪫', label: 'Low Energy', color: 'from-red-500/20 to-red-500/5 border-red-500/30' },
    { level: 'medium', emoji: '🔋', label: 'Medium Energy', color: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30' },
    { level: 'high', emoji: '⚡', label: 'High Energy', color: 'from-green-500/20 to-green-500/5 border-green-500/30' }
  ];

  const handleSave = () => {
    if (selectedEnergy) {
      const existing = JSON.parse(localStorage.getItem('energyLogs') || '[]');
      const entry = {
        date: new Date().toISOString(),
        level: selectedEnergy,
        notes
      };
      localStorage.setItem('energyLogs', JSON.stringify([...existing, entry]));
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setSelectedEnergy(null);
        setNotes('');
      }, 2000);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-3 gap-3">
        {energyLevels.map((energy) => (
          <button
            key={energy.level}
            onClick={() => setSelectedEnergy(energy.level)}
            className={`p-4 rounded-xl border-2 bg-gradient-to-br transition-all ${energy.color} ${
              selectedEnergy === energy.level ? 'scale-105 shadow-lg' : 'opacity-70'
            }`}
          >
            <div className="text-3xl mb-1">{energy.emoji}</div>
            <div className="text-xs text-white font-medium">{energy.label}</div>
          </button>
        ))}
      </div>
      <div>
        <label className="text-xs text-white mb-1 block">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What's affecting your energy?"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
        />
      </div>
      <Button
        onClick={handleSave}
        disabled={!selectedEnergy}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
      >
        {saved ? '✓ Logged!' : 'Log Energy Level'}
      </Button>
    </div>
  );
};

// Positive Affirmation Generator Component
const PositiveAffirmationGenerator = () => {
  const affirmations = [
    "I am worthy of love and respect",
    "I choose to focus on what I can control",
    "I am growing and learning every day",
    "My feelings are valid and important",
    "I have the strength to overcome challenges",
    "I am enough just as I am",
    "I deserve happiness and peace",
    "I am proud of how far I've come",
    "I trust myself to make good decisions",
    "I am capable of amazing things",
    "I choose to be kind to myself today",
    "My best is good enough",
    "I am resilient and brave",
    "I attract positive energy into my life",
    "I am in charge of how I feel",
    "I release what I cannot change",
    "I am worthy of good things",
    "I celebrate my progress, not perfection",
    "I am becoming the best version of myself",
    "I deserve to take up space"
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  const generateNew = () => {
    const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(newAffirmation);
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-purple-500/5 border border-purple-500/20">
        <div className="absolute top-3 left-3">
          <Sparkles className="h-5 w-5 text-purple-400" />
        </div>
        <div className="absolute bottom-3 right-3">
          <Sparkles className="h-5 w-5 text-pink-400" />
        </div>
        <p className="text-lg font-medium text-center text-white leading-relaxed px-4">
          "{currentAffirmation}"
        </p>
      </div>
      <Button
        onClick={generateNew}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        New Affirmation
      </Button>
    </div>
  );
};

const InteractiveToolsTab = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("mood");
  const { moodHistory } = useMentalHealth();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Check if user has logged mood today
  const today = new Date().toISOString().split('T')[0];
  const hasMoodToday = moodHistory.some(entry => entry.date === today);

  const sections = [
    {
      id: "mood",
      title: "Mood Tracker",
      description: hasMoodToday ? "Today's mood logged" : "Log how you're feeling",
      icon: Heart,
      color: "pink",
      badge: hasMoodToday ? null : "Check in",
      component: <MoodTracker />
    },
    {
      id: "bodyscan",
      title: "Body Scan Meditation",
      description: "Guided body relaxation journey",
      icon: Scan,
      color: "cyan",
      badge: "4 min",
      component: <BodyScanMeditation />
    },
    {
      id: "worry",
      title: "Worry Time Timer",
      description: "Scheduled 15-min worry window",
      icon: Clock,
      color: "orange",
      badge: "15 min",
      component: <WorryTimeTimer />
    },
    {
      id: "gratitude",
      title: "Gratitude Quick-Add",
      description: "Log 3 things you're grateful for",
      icon: Smile,
      color: "emerald",
      badge: "Daily",
      component: <GratitudeQuickAdd />
    },
    {
      id: "energy",
      title: "Energy Level Check",
      description: "Quick energy assessment",
      icon: Battery,
      color: "violet",
      badge: "Quick",
      component: <EnergyLevelCheck />
    },
    {
      id: "affirmation",
      title: "Positive Affirmations",
      description: "Uplifting messages for you",
      icon: Sparkles,
      color: "purple",
      badge: "20+ quotes",
      component: <PositiveAffirmationGenerator />
    },
    {
      id: "stress",
      title: "Stress Relief",
      description: "Breathing & relaxation exercises",
      icon: Brain,
      color: "blue",
      badge: "3 exercises",
      component: <StressManagementTools />
    },
    {
      id: "goals",
      title: "Goal Setting",
      description: "Track your wellbeing goals",
      icon: Target,
      color: "green",
      badge: null,
      component: <GoalSettingTracker />
    },
    {
      id: "selfcare",
      title: "Self-Care Reminders",
      description: "Daily wellness prompts",
      icon: Bell,
      color: "amber",
      badge: null,
      component: <SelfCareReminders />
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; bg: string; icon: string; iconBg: string }> = {
      pink: {
        border: "border-pink-500/20",
        bg: "from-pink-500/10 to-transparent",
        icon: "text-pink-400",
        iconBg: "bg-pink-500/20"
      },
      cyan: {
        border: "border-cyan-500/20",
        bg: "from-cyan-500/10 to-transparent",
        icon: "text-cyan-400",
        iconBg: "bg-cyan-500/20"
      },
      orange: {
        border: "border-orange-500/20",
        bg: "from-orange-500/10 to-transparent",
        icon: "text-orange-400",
        iconBg: "bg-orange-500/20"
      },
      emerald: {
        border: "border-emerald-500/20",
        bg: "from-emerald-500/10 to-transparent",
        icon: "text-emerald-400",
        iconBg: "bg-emerald-500/20"
      },
      violet: {
        border: "border-violet-500/20",
        bg: "from-violet-500/10 to-transparent",
        icon: "text-violet-400",
        iconBg: "bg-violet-500/20"
      },
      purple: {
        border: "border-purple-500/20",
        bg: "from-purple-500/10 to-transparent",
        icon: "text-purple-400",
        iconBg: "bg-purple-500/20"
      },
      blue: {
        border: "border-blue-500/20",
        bg: "from-blue-500/10 to-transparent",
        icon: "text-blue-400",
        iconBg: "bg-blue-500/20"
      },
      green: {
        border: "border-green-500/20",
        bg: "from-green-500/10 to-transparent",
        icon: "text-green-400",
        iconBg: "bg-green-500/20"
      },
      amber: {
        border: "border-amber-500/20",
        bg: "from-amber-500/10 to-transparent",
        icon: "text-amber-400",
        iconBg: "bg-amber-500/20"
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="text-center py-2 px-4">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 mb-3">
          <Zap className="h-6 w-6 md:h-7 md:w-7 text-yellow-400" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Interactive Tools</h2>
        <p className="text-sm md:text-base text-white">
          Track, manage, and improve your wellbeing
        </p>
      </div>

      {/* Quick Stats */}
      {moodHistory.length > 0 && (
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">{moodHistory.length}</div>
                <div className="text-xs text-white">Days Tracked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {(moodHistory.reduce((sum, e) => sum + e.mood, 0) / moodHistory.length).toFixed(1)}
                </div>
                <div className="text-xs text-white">Avg Mood</div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  {hasMoodToday ? (
                    <span className="text-green-400 text-lg">
                      {['', '😢', '😔', '😐', '🙂', '😊'][moodHistory.find(e => e.date === today)?.mood || 0]}
                    </span>
                  ) : (
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  )}
                </div>
                <div className="text-xs text-white">
                  {hasMoodToday ? "Today" : "Log today"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expandable Sections */}
      <div className="space-y-3">
        {sections.map((section) => {
          const colors = getColorClasses(section.color);
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <Card
              key={section.id}
              className={`${colors.border} overflow-hidden transition-all duration-300 hover:border-${section.color}-500/40 ${
                isExpanded ? 'shadow-lg shadow-' + section.color + '-500/10' : ''
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full min-h-[3rem] md:min-h-[3.5rem] p-4 flex items-center justify-between bg-gradient-to-r ${colors.bg} hover:opacity-90 transition-all duration-200 active:scale-[0.99]`}
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isExpanded ? 'scale-110' : ''
                  }`}>
                    <Icon className={`h-6 w-6 md:h-7 md:w-7 ${colors.icon}`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-base md:text-lg">{section.title}</h3>
                      {section.badge && (
                        <span className={`text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 rounded-full ${colors.iconBg} ${colors.icon} font-medium`}>
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-white mt-0.5">{section.description}</p>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} flex-shrink-0 ml-2`}>
                  <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </button>

              <div className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <CardContent className="p-4 border-t border-white/5">
                  {section.component}
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tips Card */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium text-purple-400 text-sm md:text-base mb-1">Pro Tip</h4>
              <p className="text-sm md:text-base text-white">
                Try different tools to find what works best for you. Start with Body Scan Meditation for relaxation,
                use Worry Time to manage anxious thoughts, or boost your mood with Positive Affirmations.
                Consistency is more important than perfection.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
