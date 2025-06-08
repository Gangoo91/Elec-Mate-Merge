
import MentalHealthHubLayout from "@/components/mental-health/MentalHealthHubLayout";
import MentalHealthMate from "@/components/mental-health/MentalHealthMate";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";
import MoodTracker from "@/components/mental-health/interactive/MoodTracker";
import SelfCareReminders from "@/components/mental-health/interactive/SelfCareReminders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApprenticeMentalHealth = () => {
  const resources = [
    {
      id: 1,
      title: "Managing Workplace Stress",
      description: "Techniques for handling stress on job sites and during training",
      type: "Guide",
      link: "/apprentice/mental-health/stress-management"
    },
    {
      id: 2,
      title: "Apprentice Support Network",
      description: "Connect with fellow apprentices in a supportive environment",
      type: "Community",
      link: "/apprentice/mental-health/support-network"
    },
    {
      id: 3,
      title: "Work-Life Balance",
      description: "Strategies for maintaining balance during your apprenticeship",
      type: "Workshop",
      link: "/apprentice/mental-health/work-life-balance"
    },
    {
      id: 4,
      title: "Crisis Resources",
      description: "Immediate support options for urgent mental health concerns",
      type: "Helpline",
      link: "/apprentice/mental-health/crisis-resources"
    }
  ];

  return (
    <MentalHealthHubLayout>
      {/* Interactive Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodTracker />
        <SelfCareReminders />
      </div>

      {/* Local Resources Finder */}
      <LocalResourceFinder />
      
      {/* Mental Health Mate */}
      <MentalHealthMate />

      {/* Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {resources.map((resource) => (
          <Link 
            to={resource.link} 
            key={resource.id} 
            className="block transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 rounded-lg"
          >
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:shadow-md hover:border-elec-yellow/30 transition-colours">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base sm:text-xl">{resource.title}</CardTitle>
                  <span className="text-xs px-2 py-1 bg-elec-yellow/10 rounded-md text-elec-yellow">
                    {resource.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{resource.description}</p>
                <Button className="w-full text-sm" size="sm">Access Resource</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </MentalHealthHubLayout>
  );
};

export default ApprenticeMentalHealth;
