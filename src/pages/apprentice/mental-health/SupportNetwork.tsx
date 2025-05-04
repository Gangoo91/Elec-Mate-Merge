
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourceCard from "@/components/mental-health/ResourceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SupportNetwork = () => {
  const upcomingEvents = [
    {
      name: "Apprentice Wellbeing Social",
      date: "18 May 2025",
      time: "18:30 - 20:30",
      location: "The Training Center"
    },
    {
      name: "Peer Support Group Meeting",
      date: "22 May 2025",
      time: "12:00 - 13:00",
      location: "Online (Zoom)"
    },
    {
      name: "Mental Health First Aid Training",
      date: "1 June 2025",
      time: "09:00 - 17:00",
      location: "Madison Training Hub"
    }
  ];

  const supportGroups = [
    {
      name: "First Year Apprentices",
      members: 24,
      meetings: "Weekly",
      format: "Hybrid (In-person & Online)"
    },
    {
      name: "Women in Electrical Trades",
      members: 18,
      meetings: "Bi-weekly",
      format: "Online"
    },
    {
      name: "Mature-Age Apprentices",
      members: 12,
      meetings: "Monthly",
      format: "In-person"
    }
  ];

  const handleJoinGroup = () => {
    toast.success("Request sent!", {
      description: "We'll contact you with details about joining the support group.",
    });
  };

  const communityResources = [
    {
      title: "Building Your Support Network",
      description: "Strategies for creating connections with fellow apprentices",
      type: "document" as const,
      url: "https://www.mentalhealth.org.uk/publications/guide-investing-your-relationships"
    },
    {
      title: "Mentorship Program Information",
      description: "Learn about our industry mentorship opportunities",
      type: "article" as const,
      url: "https://www.electricalcareers.co.uk/mentoring"
    }
  ];

  return (
    <MentalHealthPageLayout
      title="Apprentice Support Network"
      description="Connect with fellow apprentices in a supportive environment"
      icon={<Users className="h-6 w-6 text-purple-400" />}
      color="purple"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Upcoming Support Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div 
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-purple-500/5 border border-purple-500/10 rounded-lg gap-3"
              >
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">{event.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
                  onClick={() => toast.success(`You've registered for: ${event.name}`)}
                >
                  Register
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-purple-500/20 bg-elec-gray col-span-1 sm:col-span-2">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-medium">Support Groups</h3>
              <div className="space-y-3">
                {supportGroups.map((group, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm flex items-center">
                        <Users className="h-4 w-4 mr-2 text-purple-400" />
                        {group.name}
                      </h4>
                      <span className="text-xs px-2 py-0.5 bg-purple-500/10 rounded-full text-purple-400">
                        {group.members} members
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Meetings: {group.meetings}</span>
                      <span>Format: {group.format}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={handleJoinGroup}
                    >
                      Request to join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-500/20 bg-elec-gray">
            <CardContent className="p-4 flex flex-col h-full">
              <h3 className="text-lg font-medium mb-3">Talk to Someone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need someone to talk to? Connect with a mental health mate or professional counselor.
              </p>
              <div className="space-y-3 mt-auto">
                <Link to="/messages" className="w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Message a Mate</span>
                  </Button>
                </Link>
                <Link to="/apprentice/mentor" className="w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Find a Mentor</span>
                  </Button>
                </Link>
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
                  size="sm"
                  onClick={() => toast.success("A counselor will contact you within 24 hours")}
                >
                  <Heart className="h-4 w-4" />
                  <span>Request Counselor</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Community Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {communityResources.map((resource, index) => (
              <ResourceCard 
                key={index}
                title={resource.title}
                description={resource.description}
                type={resource.type}
                url={resource.url}
              />
            ))}
          </div>
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default SupportNetwork;
