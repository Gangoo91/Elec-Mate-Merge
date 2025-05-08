
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle2, Award, TrendingUp, MessageCircle } from "lucide-react";

const contributors = [
  {
    id: "1",
    name: "Jamie Wilson",
    avatar: "/placeholder.svg",
    role: "Master Electrician",
    posts: 142,
    likes: 568
  },
  {
    id: "2",
    name: "Sarah Thompson",
    avatar: "/placeholder.svg",
    role: "Electrical Engineer",
    posts: 98,
    likes: 412
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "/placeholder.svg",
    role: "Journeyman",
    posts: 76,
    likes: 233
  },
  {
    id: "4",
    name: "Alex Rivera",
    avatar: "/placeholder.svg",
    role: "Apprentice",
    posts: 52,
    likes: 187
  },
];

const TopContributors = () => {
  return (
    <div className="space-y-4">
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Award className="h-4 w-4 text-elec-yellow" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {contributors.map((contributor) => (
              <div key={contributor.id} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow text-xs">
                    {contributor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{contributor.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{contributor.role}</p>
                </div>
                <div className="flex flex-col items-end text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageCircle className="h-3 w-3" />
                    <span>{contributor.posts}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-elec-yellow" />
                    <span>{contributor.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-elec-yellow/10 hover:bg-elec-yellow/20 cursor-pointer">#SafetyFirst</Badge>
            <Badge variant="secondary" className="bg-elec-yellow/10 hover:bg-elec-yellow/20 cursor-pointer">#Regulations</Badge>
            <Badge variant="secondary" className="bg-elec-yellow/10 hover:bg-elec-yellow/20 cursor-pointer">#ToolTips</Badge>
            <Badge variant="secondary" className="bg-elec-yellow/10 hover:bg-elec-yellow/20 cursor-pointer">#ApprenticeHelp</Badge>
            <Badge variant="secondary" className="bg-elec-yellow/10 hover:bg-elec-yellow/20 cursor-pointer">#TechInnovation</Badge>
            <Badge variant="secondary" className="bg-elec-yellow/10 hover:bg-elec-yellow/20 cursor-pointer">#BusinessTalk</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopContributors;
