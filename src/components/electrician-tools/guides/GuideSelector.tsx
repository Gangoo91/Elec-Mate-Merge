
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Star } from "lucide-react";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: string;
  rating: number;
  readers: number;
  updated: string;
  badge: string;
}

interface GuideSelectorProps {
  onSelectGuide: (guideId: string) => void;
}

const GuideSelector = ({ onSelectGuide }: GuideSelectorProps) => {
  const guides: Guide[] = [
    {
      id: "testing-equipment",
      title: "Essential Testing Equipment Guide 2024",
      description: "Complete guide to choosing multifunction testers, PAT testers, and calibration requirements for compliance.",
      category: "Testing Equipment",
      readTime: "8 min",
      difficulty: "Beginner",
      rating: 4.8,
      readers: 2340,
      updated: "2 days ago",
      badge: "Most Popular"
    },
    {
      id: "power-tools",
      title: "Power Tools for Electricians: What to Buy First",
      description: "Priority list for apprentices and new electricians - build your toolkit without breaking the bank.",
      category: "Power Tools",
      readTime: "12 min",
      difficulty: "Beginner",
      rating: 4.7,
      readers: 1890,
      updated: "1 week ago",
      badge: "Beginner Guide"
    },
    {
      id: "hand-tools",
      title: "Advanced Hand Tools: Professional Selection",
      description: "High-quality hand tools that will last a career. Investment pieces for experienced professionals.",
      category: "Hand Tools",
      readTime: "15 min",
      difficulty: "Advanced",
      rating: 4.9,
      readers: 987,
      updated: "3 days ago",
      badge: "Expert Level"
    },
    {
      id: "ppe",
      title: "PPE Buying Guide: Safety Without Compromise",
      description: "Navigate PPE standards, find comfortable protection, and understand compliance requirements.",
      category: "Safety Equipment",
      readTime: "10 min",
      difficulty: "Intermediate",
      rating: 4.6,
      readers: 1560,
      updated: "5 days ago",
      badge: "Safety Focus"
    }
  ];

  return (
    <div className="space-y-4">
      {guides.map((guide) => (
        <Card 
          key={guide.id} 
          className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all cursor-pointer"
          onClick={() => onSelectGuide(guide.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <Badge className={`${
                guide.badge === "Most Popular" ? "bg-elec-yellow/20 text-elec-yellow" :
                guide.badge === "Beginner Guide" ? "bg-green-500/20 text-green-400" :
                guide.badge === "Expert Level" ? "bg-purple-500/20 text-purple-400" :
                "bg-red-500/20 text-red-400"
              }`}>
                {guide.badge}
              </Badge>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {guide.readTime}
              </div>
            </div>
            <CardTitle className="text-lg text-white leading-tight">
              {guide.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{guide.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{guide.category}</span>
              <span>{guide.difficulty}</span>
              <span>Updated {guide.updated}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span>{guide.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-blue-400" />
                <span>{guide.readers.toLocaleString()} readers</span>
              </div>
            </div>
            
            <div className="flex items-center text-elec-yellow hover:text-elec-yellow/80 text-sm font-medium">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Complete Guide
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GuideSelector;
