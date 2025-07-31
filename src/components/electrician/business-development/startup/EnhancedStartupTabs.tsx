
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Calculator, Shield, Phone, Lightbulb, Heart } from "lucide-react";
import BusinessPlanningTab from "./BusinessPlanningTab";
import LegalComplianceTab from "./LegalComplianceTab";
import SupportResourcesTab from "./SupportResourcesTab";
import ToolsGuidanceTab from "./ToolsGuidanceTab";

const EnhancedStartupTabs = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-center">Starting an Electrical Business</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm md:text-base px-4">
          Your complete guide to establishing and growing a successful electrical contracting business in the UK
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <DropdownTabs
        defaultValue="planning"
        placeholder="Select a section"
        tabs={[
          {
            value: "planning",
            label: "Business Planning",
            icon: Calculator,
            content: <BusinessPlanningTab />
          },
          {
            value: "legal",
            label: "Legal & Compliance",
            icon: Shield,
            content: <LegalComplianceTab />
          },
          {
            value: "support",
            label: "Support & Resources",
            icon: Phone,
            content: <SupportResourcesTab />
          },
          {
            value: "tools",
            label: "Tools & Operations",
            icon: Lightbulb,
            content: <ToolsGuidanceTab />
          }
        ]}
      />

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-center md:text-left">
            Starting a business is a significant step that requires careful planning and preparation. 
            While the journey can be challenging, with the right guidance and resources, you can build 
            a successful electrical contracting business. Take your time, seek advice when needed, 
            and remember that every successful business started with a single step.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedStartupTabs;
