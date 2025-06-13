
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar, MapPin, Phone, Globe, Heart } from "lucide-react";

const SupportNetworkTab = () => {
  const supportGroups = [
    {
      name: "Trades Mental Health Collective",
      type: "Peer Support",
      location: "Online & UK-wide",
      members: "1,200+",
      meeting: "Weekly Wednesdays 7PM",
      focus: "General mental health support for trade workers"
    },
    {
      name: "Electrical Workers Wellbeing",
      type: "Industry Specific",
      location: "Major UK Cities",
      members: "450+",
      meeting: "Bi-weekly Saturdays 2PM",
      focus: "Mental health specifically for electrical professionals"
    },
    {
      name: "Andy's Man Club",
      type: "Men's Support",
      location: "Nationwide",
      members: "10,000+",
      meeting: "Weekly Mondays 7PM",
      focus: "Male suicide prevention and mental health support"
    }
  ];

  const communityResources = [
    {
      title: "Mental Health Mate Network",
      description: "Connect with trained volunteers for peer support",
      icon: <MessageSquare className="h-5 w-5 text-blue-400" />,
      action: "Find a Mate",
      available: "24/7"
    },
    {
      title: "Local Community Events",
      description: "Mental health awareness events in your area",
      icon: <Calendar className="h-5 w-5 text-green-400" />,
      action: "View Events",
      available: "Weekly"
    },
    {
      title: "Professional Counselling",
      description: "Access to qualified mental health professionals",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      action: "Book Session",
      available: "On Demand"
    },
    {
      title: "Crisis Support Hotlines",
      description: "Immediate support when you need it most",
      icon: <Phone className="h-5 w-5 text-red-400" />,
      action: "Get Help Now",
      available: "24/7"
    }
  ];

  const onlineForums = [
    {
      title: "Electrical Workers Mental Health Forum",
      members: "2,300+",
      posts: "Daily",
      description: "Share experiences and support with fellow electricians"
    },
    {
      title: "Trades Wellbeing Community",
      members: "5,100+",
      posts: "Hourly",
      description: "Cross-trade mental health discussions and support"
    },
    {
      title: "Mental Health Recovery Stories",
      members: "1,800+",
      posts: "Weekly",
      description: "Inspiring stories of recovery and resilience"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Support Network & Community</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You're not alone in your mental health journey. Connect with others who understand your challenges, 
            share experiences, and build meaningful support relationships within the electrical community.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">15,000+</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Peer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Support Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Confidential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Users className="h-5 w-5" />
              Support Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {supportGroups.map((group, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{group.name}</h4>
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                      {group.type}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{group.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{group.meeting}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 mb-4">{group.focus}</p>
                  <Button className="w-full" size="sm">Join Group</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Community Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityResources.map((resource, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {resource.icon}
                    <h4 className="font-semibold text-white">{resource.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                      {resource.available}
                    </Badge>
                    <Button size="sm" variant="outline">
                      {resource.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Online Forums & Communities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {onlineForums.map((forum, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">{forum.title}</h4>
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span>{forum.members}</span>
                    <span>•</span>
                    <span>{forum.posts} posts</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{forum.description}</p>
                  <Button className="w-full" size="sm">Visit Forum</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportNetworkTab;
