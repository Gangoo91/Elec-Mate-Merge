
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { Users } from "lucide-react";
import EventsList from "@/components/mental-health/support-network/EventsList";
import SupportGroups from "@/components/mental-health/support-network/SupportGroups";
import TalkToSomeone from "@/components/mental-health/support-network/TalkToSomeone";
import CommunityResourcesList from "@/components/mental-health/support-network/CommunityResourcesList";

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
