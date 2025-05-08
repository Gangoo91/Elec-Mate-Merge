
import { useRef } from "react";
import { MentalHealthPageLayout } from "@/components/mental-health/MentalHealthPageLayout";
import MentalHealthMate from "@/components/mental-health/MentalHealthMate";
import TalkToSomeone from "@/components/mental-health/support-network/TalkToSomeone";
import SupportGroups from "@/components/mental-health/support-network/SupportGroups";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommunityResourcesList, { Resource } from "@/components/mental-health/support-network/CommunityResourcesList";
import EventsList from "@/components/mental-health/support-network/EventsList";
import { Users } from "lucide-react";

// Mock data for community resources
const communityResources: Resource[] = [
  {
    title: "Electrical Trades Union Mental Health Support",
    description: "Resources and support services specifically for electrical industry professionals",
    type: "website",
    url: "#"
  },
  {
    title: "Headspace - Mental Health Basics",
    description: "Foundational information about mental health and wellbeing",
    type: "article",
    url: "#"
  },
  {
    title: "Beyond Blue Workplace Resources",
    description: "Tools for creating mentally healthy workplaces",
    type: "document",
    url: "#"
  },
  {
    title: "MATES in Construction",
    description: "Suicide prevention and mental health support in the construction industry",
    type: "website",
    url: "#"
  }
];

const SupportNetwork = () => {
  const matesRef = useRef<HTMLDivElement>(null);
  
  const scrollToMates = () => {
    matesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <MentalHealthPageLayout
      title="Support Network"
      description="Connect with others who understand the challenges of the electrical trade"
      backLink="/apprentice/mental-health"
      icon={<Users className="h-6 w-6 text-purple-400" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div ref={matesRef}>
            <MentalHealthMate />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Community Resources</h2>
          <ScrollArea className="h-[400px] rounded-md border border-elec-yellow/20 p-4">
            <CommunityResourcesList resources={communityResources} />
          </ScrollArea>
          
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <EventsList />
        </div>
        
        <div className="col-span-1 space-y-6">
          <TalkToSomeone onShowMentalHealthMates={scrollToMates} />
          <SupportGroups />
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default SupportNetwork;
