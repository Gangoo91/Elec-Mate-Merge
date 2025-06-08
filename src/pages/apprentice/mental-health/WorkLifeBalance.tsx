
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { Clock, Home, GraduationCap } from "lucide-react";
import BalanceChecklist from "@/components/mental-health/work-life-balance/BalanceChecklist";
import BalanceInfoCard from "@/components/mental-health/work-life-balance/BalanceInfoCard";
import BalanceResources from "@/components/mental-health/work-life-balance/BalanceResources";

const WorkLifeBalance = () => {
  const resources = [
    {
      title: "Managing Apprenticeship Stress",
      description: "Guidance on balancing learning, work, and personal life during your apprenticeship",
      type: "document" as const,
      url: "https://www.apprenticeships.gov.uk/apprentices/support"
    },
    {
      title: "Time Management for Apprentices",
      description: "Effective strategies for managing college, work placement, and personal time",
      type: "article" as const,
      url: "https://www.prospects.ac.uk/careers-advice/work-life-balance"
    },
    {
      title: "Study-Work Balance Guide",
      description: "Tips for maintaining wellbeing whilst juggling education and employment",
      type: "document" as const,
      url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
    },
    {
      title: "Young Person's Mental Health",
      description: "Mental health support specifically designed for young people in training",
      type: "website" as const,
      url: "https://www.youngminds.org.uk/"
    },
    {
      title: "Apprentice Support Services",
      description: "Comprehensive support services available to apprentices across the UK",
      type: "website" as const,
      url: "https://www.apprenticeships.gov.uk/apprentices/support"
    },
    {
      title: "Managing Financial Stress",
      description: "Advice on managing money during apprenticeships and reducing financial anxiety",
      type: "article" as const,
      url: "https://www.citizensadvice.org.uk/about-us/our-work/policy/policy-research-topics/education-policy-research-and-consultation-responses/education-policy-research/mind-over-money/"
    }
  ];

  const apprenticeshipBalanceTips = [
    "Schedule dedicated study time outside of work hours",
    "Communicate with your employer about college commitments",
    "Use travel time effectively for reading or revision",
  ];

  const personalBalanceTips = [
    "Maintain friendships outside of work and college",
    "Set aside time for hobbies and relaxation",
    "Don't be afraid to ask for help when needed",
  ];

  return (
    <MentalHealthPageLayout
      title="Work-Life Balance"
      description="Strategies for maintaining balance during your apprenticeship journey"
      icon={<Clock className="h-6 w-6 text-green-500" />}
      color="green"
    >
      <div className="space-y-6">
        <BalanceChecklist />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BalanceInfoCard 
            title="Apprenticeship Balance"
            description="Manage your learning and work responsibilities effectively without burnout."
            tips={apprenticeshipBalanceTips}
            icon={<GraduationCap className="h-5 w-5 text-green-500" />}
          />
          
          <BalanceInfoCard 
            title="Personal Life"
            description="Maintain relationships and personal wellbeing throughout your training."
            tips={personalBalanceTips}
            icon={<Home className="h-5 w-5 text-green-500" />}
          />
        </div>
        
        <BalanceResources resources={resources} />
      </div>
    </MentalHealthPageLayout>
  );
};

export default WorkLifeBalance;
