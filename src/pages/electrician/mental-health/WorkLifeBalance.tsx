
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { Clock, Home, Wrench } from "lucide-react";
import BalanceChecklist from "@/components/mental-health/work-life-balance/BalanceChecklist";
import BalanceInfoCard from "@/components/mental-health/work-life-balance/BalanceInfoCard";
import BalanceResources from "@/components/mental-health/work-life-balance/BalanceResources";

const WorkLifeBalance = () => {
  const resources = [
    {
      title: "Setting Professional Boundaries",
      description: "Learn how to create healthy limits between work and personal life for electrical professionals",
      type: "document" as const,
      url: "https://www.mind.org.uk/information-support/tips-for-everyday-living/work-life-balance/"
    },
    {
      title: "Time Management for Electrical Contractors",
      description: "Strategies for balancing job site demands with personal wellbeing",
      type: "video" as const,
      url: "https://www.electricalsafetyfirst.org.uk/guidance/"
    },
    {
      title: "Rest and Recovery Workshop",
      description: "Understanding the importance of downtime for productivity and wellbeing in physically demanding trades",
      type: "article" as const,
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
    },
    {
      title: "Electrical Industries Charity Support",
      description: "UK charity providing welfare support specifically for people from the electrical sector",
      type: "website" as const,
      url: "https://www.electricalcharity.org/"
    },
    {
      title: "NICEIC Wellbeing Resources",
      description: "Mental health guidance tailored for registered electrical contractors",
      type: "document" as const,
      url: "https://www.niceic.com/contractor/mental-health-awareness"
    },
    {
      title: "HSE Work-Related Stress Resources",
      description: "Official UK Health and Safety Executive guidance on managing work stress",
      type: "document" as const,
      url: "https://www.hse.gov.uk/stress/"
    },
    {
      title: "Construction Industry Helpline",
      description: "Free 24/7 confidential support line for UK construction workers including electricians",
      type: "website" as const,
      url: "https://www.constructionindustryhelpline.com/"
    },
    {
      title: "Mates in Mind",
      description: "UK charity addressing mental wellbeing in the construction sector",
      type: "website" as const,
      url: "https://www.matesinmind.org/"
    }
  ];

  const professionalBalanceTips = [
    "Create a realistic job schedule that accounts for travel time between sites",
    "Set aside time for CPD and keeping up with regulations",
    "Consider using job management software to streamline admin tasks",
  ];

  const homeBalanceTips = [
    "Communicate your on-call schedule clearly with family members",
    "Designate device-free quality time with loved ones",
    "Plan activities that help you disconnect from work stress",
  ];

  return (
    <MentalHealthPageLayout
      title="Work-Life Balance"
      description="Strategies for maintaining balance during your electrical career"
      icon={<Clock className="h-6 w-6 text-green-500" />}
      color="green"
    >
      <div className="space-y-6">
        <BalanceChecklist />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BalanceInfoCard 
            title="Professional Balance"
            description="Manage your workload effectively to prevent burnout and maintain quality service."
            tips={professionalBalanceTips}
            icon={<Wrench className="h-5 w-5 text-green-500" />}
          />
          
          <BalanceInfoCard 
            title="Home & Family"
            description="Maintain healthy relationships while managing the demands of electrical work."
            tips={homeBalanceTips}
            icon={<Home className="h-5 w-5 text-green-500" />}
          />
        </div>
        
        <BalanceResources resources={resources} />
      </div>
    </MentalHealthPageLayout>
  );
};

export default WorkLifeBalance;
