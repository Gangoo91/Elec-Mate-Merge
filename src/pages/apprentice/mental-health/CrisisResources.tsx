
import { AlertCircle } from "lucide-react";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import CrisisHelplines from "@/components/mental-health/crisis/CrisisHelplines";
import OnlineCrisisSupport from "@/components/mental-health/crisis/OnlineCrisisSupport";
import AndysManClub from "@/components/mental-health/crisis/AndysManClub";
import ResourceDownloads from "@/components/mental-health/crisis/ResourceDownloads";
import EmergencyBanner from "@/components/mental-health/crisis/EmergencyBanner";
import { emergencyContacts, onlineResources } from "@/components/mental-health/crisis/CrisisResourcesData";

const CrisisResources = () => {
  return (
    <MentalHealthPageLayout
      title="Crisis Resources"
      description="Immediate support options for mental health emergencies"
      icon={<AlertCircle className="h-6 w-6 text-red-500" />}
      color="red"
    >
      <div className="space-y-6">
        <EmergencyBanner />
        
        <div className="space-y-6">
          <CrisisHelplines emergencyContacts={emergencyContacts} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4 col-span-1">
              <AndysManClub />
              <ResourceDownloads />
            </div>
            
            <OnlineCrisisSupport onlineResources={onlineResources} />
          </div>
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default CrisisResources;
