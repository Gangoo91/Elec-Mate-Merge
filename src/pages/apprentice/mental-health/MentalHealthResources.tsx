
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import ResourcesLibrary from "@/components/mental-health/resources/ResourcesLibrary";
import { BookOpen } from "lucide-react";

const MentalHealthResources = () => {
  return (
    <MentalHealthPageLayout
      title="Mental Health Resources"
      description="Comprehensive library of guides, tools, and support materials"
      icon={<BookOpen className="h-6 w-6 text-green-500" />}
      color="green"
    >
      <ResourcesLibrary />
    </MentalHealthPageLayout>
  );
};

export default MentalHealthResources;
