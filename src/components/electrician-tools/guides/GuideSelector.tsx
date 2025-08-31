
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Star, Wrench, TestTube, HardHat, Package, Cable, FolderOpen } from "lucide-react";

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
  icon: any;
  status: "complete" | "coming-soon";
}

interface GuideSelectorProps {
  onSelectGuide: (guideId: string, guideTitle: string) => void;
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
      badge: "Most Popular",
      icon: TestTube,
      status: "complete"
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
      badge: "Beginner Guide",
      icon: Wrench,
      status: "complete"
    },
    {
      id: "hand-tools",
      title: "Professional Hand Tools: Investment Guide",
      description: "High-quality hand tools that will last a career. Investment pieces for experienced professionals.",
      category: "Hand Tools",
      readTime: "15 min",
      difficulty: "Intermediate",
      rating: 4.9,
      readers: 1567,
      updated: "3 days ago",
      badge: "Professional Choice",
      icon: Package,
      status: "complete"
    },
    {
      id: "ppe",
      title: "PPE Buying Guide: Safety Without Compromise",
      description: "Navigate PPE standards, find comfortable protection, and understand compliance requirements.",
      category: "Safety Equipment",
      readTime: "10 min",
      difficulty: "Essential",
      rating: 4.6,
      readers: 1560,
      updated: "5 days ago",
      badge: "Safety Focus",
      icon: HardHat,
      status: "complete"
    },
    {
      id: "cable-tools",
      title: "Cable Preparation & Termination Tools",
      description: "Comprehensive guide to cable stripping, crimping, and termination equipment for all cable types.",
      category: "Cable Tools",
      readTime: "12 min",
      difficulty: "Intermediate",
      rating: 4.5,
      readers: 890,
      updated: "Coming Soon",
      badge: "New Guide",
      icon: Cable,
      status: "coming-soon"
    },
    {
      id: "storage",
      title: "Tool Storage & Organisation Systems",
      description: "Professional storage solutions from toolboxes to van organisation and workshop setups.",
      category: "Storage & Organisation",
      readTime: "8 min",
      difficulty: "All Levels",
      rating: 4.4,
      readers: 657,
      updated: "Coming Soon",
      badge: "Productivity",
      icon: FolderOpen,
      status: "coming-soon"
    }
  ];

  return (
    <div className="space-y-4">
      {guides.map((guide) => (
        <Card 
          key={guide.id} 
          className={`border-elec-yellow/20 bg-elec-gray transition-all cursor-pointer ${
            guide.status === "complete" 
              ? "hover:border-elec-yellow/50" 
              : "opacity-75 hover:border-elec-yellow/30"
          }`}
          onClick={() => onSelectGuide(guide.id, guide.title)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge className={`${
                  guide.badge === "Most Popular" ? "bg-elec-yellow/20 text-elec-yellow" :
                  guide.badge === "Beginner Guide" ? "bg-green-500/20 text-green-400" :
                  guide.badge === "Professional Choice" ? "bg-purple-500/20 text-purple-400" :
                  guide.badge === "Safety Focus" ? "bg-red-500/20 text-red-400" :
                  guide.badge === "New Guide" ? "bg-blue-500/20 text-blue-400" :
                  "bg-amber-500/20 text-amber-400"
                }`}>
                  {guide.badge}
                </Badge>
                {guide.status === "coming-soon" && (
                  <Badge className="bg-gray-500/20 text-gray-400">
                    Coming Soon
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {guide.readTime}
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <guide.icon className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg text-white leading-tight">
                  {guide.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{guide.category}</span>
              <span>{guide.difficulty}</span>
              <span>Updated {guide.updated}</span>
            </div>
            
            {guide.status === "complete" && (
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
            )}
            
            <div className={`flex items-center text-sm font-medium ${
              guide.status === "complete" 
                ? "text-elec-yellow hover:text-elec-yellow/80" 
                : "text-gray-400"
            }`}>
              <BookOpen className="h-4 w-4 mr-2" />
              {guide.status === "complete" ? "Read Complete Guide" : "Guide In Development"}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GuideSelector;
