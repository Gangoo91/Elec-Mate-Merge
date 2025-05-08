
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/utils/stringUtils";
import { Trophy, Tag, Sparkles } from "lucide-react";

const TopContributors = () => {
  const contributors = [
    {
      id: "1",
      name: "John Smith",
      avatar: "https://i.pravatar.cc/100?img=1",
      role: "Master Electrician",
      points: 1250,
      badges: ["Top Contributor", "Expert"]
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/100?img=2",
      role: "Electrical Engineer",
      points: 980,
      badges: ["Helpful"]
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "https://i.pravatar.cc/100?img=3",
      role: "Journeyman Electrician",
      points: 760,
      badges: ["Engaged"]
    },
  ];
  
  const popularTags = [
    "Safety Regulations",
    "Tool Reviews",
    "Wiring Tips",
    "Code Compliance",
    "Troubleshooting",
    "Career Advice"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray-light/20 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center gap-2">
            <Trophy className="h-4 w-4 text-elec-yellow" />
            <span>Top Contributors</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contributors.map((contributor, index) => (
            <div key={contributor.id} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border border-elec-yellow/30">
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback className="bg-elec-gray-light text-white">
                    {getInitials(contributor.name)}
                  </AvatarFallback>
                </Avatar>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 bg-elec-yellow rounded-full p-0.5">
                    <Sparkles className="h-3 w-3 text-elec-dark" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{contributor.name}</p>
                <p className="text-xs text-gray-400">{contributor.role}</p>
                <div className="flex items-center gap-1 mt-1">
                  {contributor.badges.map((badge) => (
                    <Badge key={badge} variant="yellow" className="text-[10px] py-0 px-1.5">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-xs text-elec-yellow font-semibold">
                {contributor.points} pts
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/20 bg-elec-gray-light/20 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center gap-2">
            <Tag className="h-4 w-4 text-elec-yellow" />
            <span>Popular Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="cursor-pointer hover:bg-elec-yellow/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopContributors;
