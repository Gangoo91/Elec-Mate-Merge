
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import { AlertTriangle } from "lucide-react";
import EmergencyBanner from "@/components/mental-health/crisis/EmergencyBanner";
import CrisisHelplines from "@/components/mental-health/crisis/CrisisHelplines";
import OnlineCrisisSupport from "@/components/mental-health/crisis/OnlineCrisisSupport";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";
import ResourceDownloads from "@/components/mental-health/crisis/ResourceDownloads";
import AndysManClub from "@/components/mental-health/crisis/AndysManClub";
import { emergencyContacts, onlineResources } from "@/components/mental-health/crisis/CrisisResourcesData";

const CrisisResources = () => {
  return (
    <MentalHealthPageLayout
      title="Crisis Resources"
      description="Immediate support options for urgent mental health concerns"
      icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
      color="red"
    >
      <div className="space-y-6">
        <EmergencyBanner />
        
        <CrisisHelplines emergencyContacts={emergencyContacts} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OnlineCrisisSupport onlineResources={onlineResources} />
          
          <div className="space-y-4">
            <LocalResourceFinder />
            <ResourceDownloads />
            <AndysManClub />
          </div>
        </div>
      </div>
    </MentalHealthPageLayout>
  );
};

export default CrisisResources;
