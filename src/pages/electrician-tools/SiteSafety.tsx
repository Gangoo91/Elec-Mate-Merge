
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Wrench, Scale, ClipboardCheck, ArrowRight } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { RAMSProvider } from "@/components/electrician-tools/site-safety/rams/RAMSContext";
import RAMSGenerator from "@/components/electrician-tools/site-safety/RAMSGenerator";
import MethodStatementGenerator from "@/components/electrician-tools/site-safety/MethodStatementGenerator";
import IntegratedRAMSGenerator from "@/components/electrician-tools/site-safety/IntegratedRAMSGenerator";
import EnhancedHazardDatabase from "@/components/electrician-tools/site-safety/enhanced/EnhancedHazardDatabase";
import PhotoDocumentation from "@/components/electrician-tools/site-safety/PhotoDocumentation";
import TeamBriefingTemplates from "@/components/electrician-tools/site-safety/TeamBriefingTemplates";
import NearMissReporting from "@/components/electrician-tools/site-safety/NearMissReporting";
import SafetyEquipmentTracker from "@/components/electrician-tools/site-safety/SafetyEquipmentTracker";
import EmergencyProcedures from "@/components/electrician-tools/site-safety/EmergencyProcedures";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import SafetyToolsTab from "@/components/electrician-tools/site-safety/tabs/SafetyToolsTab";
import ElectricalSafetyTab from "@/components/electrician-tools/site-safety/tabs/ElectricalSafetyTab";
import SafeWorkingPracticesTab from "@/components/electrician-tools/site-safety/tabs/SafeWorkingPracticesTab";
import RegulationsTab from "@/components/electrician-tools/site-safety/tabs/RegulationsTab";

const SiteSafety = () => {
  const [activeView, setActiveView] = useState<string | null>(null);

  const handleToolSelect = (toolId: string) => {
    setActiveView(toolId);
  };

  const tabs: DropdownTab[] = [
    {
      value: "tools",
      label: "Safety Tools & Generators",
      icon: Wrench,
      content: <SafetyToolsTab onToolSelect={handleToolSelect} />
    },
    {
      value: "electrical-safety",
      label: "Electrical Safety Fundamentals",
      icon: Shield,
      content: <ElectricalSafetyTab />
    },
    {
      value: "working-practices",
      label: "Safe Working Practices",
      icon: ClipboardCheck,
      content: <SafeWorkingPracticesTab />
    },
    {
      value: "regulations",
      label: "Regulations & Standards",
      icon: Scale,
      content: <RegulationsTab />
    }
  ];

  const renderToolContent = () => {
    switch (activeView) {
      case "integrated-rams":
        return <IntegratedRAMSGenerator />;
      case "rams":
        return <RAMSGenerator />;
      case "method-statement":
        return <MethodStatementGenerator />;
      case "hazard-database":
        return <EnhancedHazardDatabase />;
      case "photo-docs":
        return <PhotoDocumentation />;
      case "team-briefing":
        return <TeamBriefingTemplates />;
      case "near-miss":
        return <NearMissReporting />;
      case "equipment":
        return <SafetyEquipmentTracker />;
      case "emergency":
        return <EmergencyProcedures />;
      default:
        return null;
    }
  };

  if (activeView) {
    return (
      <RAMSProvider>
        <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark to-elec-gray animate-fade-in">
          <div className="max-w-7xl mx-auto pl-4 pr-4 py-6">
            <div className="mb-6">
              <Button 
                onClick={() => setActiveView(null)}
                variant="outline" 
                className="mb-4 border-elec-yellow/30 hover:border-elec-yellow/60 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Site Safety
              </Button>
            </div>
            {renderToolContent()}
          </div>
        </div>
      </RAMSProvider>
    );
  }

  return (
    <RAMSProvider>
      <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark to-elec-gray">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12 relative">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                  <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-elec-yellow" />
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Site Safety & Risk Assessment
              </h1>
              
              <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2">
                <span className="hidden sm:inline">Comprehensive safety management tools for electrical contractors. Generate RAMS documents, assess risks, and maintain safety compliance on all your projects.</span>
                <span className="sm:hidden">Essential safety tools for electrical contractors. Generate RAMS, assess risks, and maintain compliance.</span>
              </p>
              
              <div className="flex justify-center pt-2 sm:pt-4">
                <BackButton customUrl="/electrician" label="Back to Electrical Hub" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-12 animate-fade-in">
          <DropdownTabs 
            tabs={tabs}
            defaultValue="tools"
            placeholder="Select a safety topic"
          />
        </div>
      </div>
    </RAMSProvider>
  );
};

export default SiteSafety;
