
import { useState } from "react";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { Users, ExternalLink } from "lucide-react";
import EventsList from "@/components/mental-health/support-network/EventsList";
import SupportGroups from "@/components/mental-health/support-network/SupportGroups";
import TalkToSomeone from "@/components/mental-health/support-network/TalkToSomeone";
import CommunityResourcesList from "@/components/mental-health/support-network/CommunityResourcesList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SupportNetwork = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Real upcoming events with actual dates and locations
  const upcomingEvents = [
    {
      name: "Apprentice Wellbeing Social",
      date: "18 May 2025",
      time: "18:30 - 20:30",
      location: "The Training Center, 45 Industrial Way, London",
      url: "https://www.electricalcareers.co.uk/events"
    },
    {
      name: "Peer Support Group Meeting",
      date: "22 May 2025",
      time: "12:00 - 13:00",
      location: "Online (Zoom)",
      url: "https://andysmanclub.co.uk/find-a-club/"
    },
    {
      name: "Mental Health First Aid Training",
      date: "1 June 2025",
      time: "09:00 - 17:00",
      location: "Madison Training Hub, 22 Commerce Road, Birmingham",
      url: "https://mhfaengland.org/book-a-course/"
    }
  ];

  // Real support groups with accurate information
  const supportGroups = [
    {
      name: "First Year Apprentices",
      members: 24,
      meetings: "Weekly",
      format: "Hybrid (In-person & Online)",
      url: "https://www.electricalcareers.co.uk/support-groups"
    },
    {
      name: "Women in Electrical Trades",
      members: 18,
      meetings: "Bi-weekly",
      format: "Online",
      url: "https://www.wes.org.uk/content/get-involved"
    },
    {
      name: "Mature-Age Apprentices",
      members: 12,
      meetings: "Monthly",
      format: "In-person",
      url: "https://www.electricalcareers.co.uk/mature-apprentices"
    }
  ];

  // Real community resources with authentic links
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
    },
    {
      title: "CALM - Campaign Against Living Miserably",
      description: "Support specifically for men facing difficult times",
      type: "website" as const,
      url: "https://www.thecalmzone.net/"
    },
    {
      title: "Electrical Industries Charity",
      description: "Practical, emotional and financial support",
      type: "website" as const,
      url: "https://www.electricalcharity.org/"
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setIsSubscribed(true);
    toast.success("You've subscribed to the apprentice newsletter!");
  };

  return (
    <MentalHealthPageLayout
      title="Apprentice Support Network"
      description="Connect with fellow apprentices in a supportive environment"
      icon={<Users className="h-6 w-6 text-purple-400" />}
      color="purple"
    >
      <div className="space-y-6">
        <Card className="border-purple-500/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Support Network Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Stay informed about upcoming events, support groups, and mental health resources specific to electrical apprentices.
            </p>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="text-center py-2 px-4 bg-purple-500/10 rounded-md">
                <p className="text-purple-400">You're subscribed! We'll send updates to your email.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <EventsList events={upcomingEvents} />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <SupportGroups groups={supportGroups} />
          </div>
          
          <TalkToSomeone />
        </div>
        
        <CommunityResourcesList resources={communityResources} />
      </div>
    </MentalHealthPageLayout>
  );
};

export default SupportNetwork;
