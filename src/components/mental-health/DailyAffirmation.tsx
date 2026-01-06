
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, RefreshCw, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";

const affirmations = [
  {
    text: "You are capable of handling whatever today brings.",
    category: "strength"
  },
  {
    text: "Your skills and expertise make a real difference in people's lives.",
    category: "purpose"
  },
  {
    text: "It's okay to ask for help. That's a sign of strength, not weakness.",
    category: "support"
  },
  {
    text: "Every expert was once a beginner. Your progress matters.",
    category: "growth"
  },
  {
    text: "Taking breaks is not lazy - it's essential for doing your best work.",
    category: "self-care"
  },
  {
    text: "You deserve to feel safe, valued, and respected at work.",
    category: "worth"
  },
  {
    text: "Difficult days don't define you. Your resilience does.",
    category: "resilience"
  },
  {
    text: "Your mental health is just as important as physical safety on site.",
    category: "awareness"
  },
  {
    text: "Small steps forward are still progress. Be patient with yourself.",
    category: "patience"
  },
  {
    text: "You bring unique value to your team. Your contribution matters.",
    category: "value"
  },
  {
    text: "It's okay to not be okay. What matters is reaching out when you need to.",
    category: "vulnerability"
  },
  {
    text: "Your wellbeing comes first. Everything else can wait.",
    category: "priority"
  },
  {
    text: "You've overcome challenges before. You'll overcome this too.",
    category: "experience"
  },
  {
    text: "Taking time for yourself isn't selfish - it's necessary.",
    category: "self-care"
  },
  {
    text: "Your feelings are valid. Don't let anyone dismiss them.",
    category: "validation"
  },
  {
    text: "Every job completed safely is a success worth celebrating.",
    category: "achievement"
  },
  {
    text: "Connecting with others who understand is a powerful form of support.",
    category: "community"
  },
  {
    text: "Your best is enough. You don't need to be perfect.",
    category: "acceptance"
  },
  {
    text: "Rest is productive. Your mind and body need recovery time.",
    category: "rest"
  },
  {
    text: "You are more than your job. Your whole self matters.",
    category: "identity"
  }
];

const DailyAffirmation = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Get today's affirmation based on date (consistent per day)
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const index = dayOfYear % affirmations.length;
    setCurrentAffirmation(affirmations[index]);

    // Check if user liked this affirmation
    const liked = localStorage.getItem('elec-mate-liked-affirmations');
    if (liked) {
      const likedList = JSON.parse(liked);
      setIsLiked(likedList.includes(affirmations[index].text));
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setTimeout(() => {
      setCurrentAffirmation(affirmations[randomIndex]);
      setIsRefreshing(false);

      // Check if this one is liked
      const liked = localStorage.getItem('elec-mate-liked-affirmations');
      if (liked) {
        const likedList = JSON.parse(liked);
        setIsLiked(likedList.includes(affirmations[randomIndex].text));
      } else {
        setIsLiked(false);
      }
    }, 300);
  };

  const handleLike = () => {
    const liked = localStorage.getItem('elec-mate-liked-affirmations');
    let likedList = liked ? JSON.parse(liked) : [];

    if (isLiked) {
      likedList = likedList.filter((t: string) => t !== currentAffirmation.text);
    } else {
      likedList.push(currentAffirmation.text);
    }

    localStorage.setItem('elec-mate-liked-affirmations', JSON.stringify(likedList));
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    const shareText = `"${currentAffirmation.text}" - Daily affirmation from Elec-Mate Mental Health Hub`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Quote className="h-5 w-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-purple-400 font-medium mb-1.5">Daily Affirmation</div>
            <p
              className={`text-foreground font-medium leading-relaxed transition-opacity duration-300 ${
                isRefreshing ? 'opacity-0' : 'opacity-100'
              }`}
            >
              "{currentAffirmation.text}"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1 mt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`h-8 w-8 p-0 ${isLiked ? 'text-pink-400' : 'text-white/80'}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 w-8 p-0 text-white/80"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-8 w-8 p-0 text-white/80"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyAffirmation;
