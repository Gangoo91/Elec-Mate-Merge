
import { useState } from "react";
import { Button } from "@/components/ui/button";
import GuideSelector from "./guides/GuideSelector";
import TestingEquipmentGuide from "./guides/TestingEquipmentGuide";
import PowerToolsGuide from "./guides/PowerToolsGuide";

const ToolBuyingGuides = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuide(guideId);
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
  };

  const renderGuideContent = () => {
    switch (selectedGuide) {
      case "testing-equipment":
        return <TestingEquipmentGuide onBack={handleBackToGuides} />;
      case "power-tools":
        return <PowerToolsGuide onBack={handleBackToGuides} />;
      case "hand-tools":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleBackToGuides}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                Back to Guides
              </Button>
              <h1 className="text-3xl font-bold text-elec-yellow">Hand Tools Guide</h1>
            </div>
            <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
              <p className="text-muted-foreground">
                Comprehensive hand tools guide coming soon! This will include detailed reviews of 
                professional-grade hand tools, investment recommendations, and lifetime value analysis.
              </p>
            </div>
          </div>
        );
      case "ppe":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleBackToGuides}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                Back to Guides
              </Button>
              <h1 className="text-3xl font-bold text-elec-yellow">PPE & Safety Guide</h1>
            </div>
            <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
              <p className="text-muted-foreground">
                Complete PPE buying guide coming soon! This will cover safety standards, 
                comfort considerations, and compliance requirements.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (selectedGuide) {
    return renderGuideContent();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Expert Buying Guides</h2>
          <p className="text-muted-foreground">Professional recommendations from experienced electricians</p>
        </div>
        <Button variant="outline" size="sm" className="border-elec-yellow/30">
          View All Guides
        </Button>
      </div>
      
      <GuideSelector onSelectGuide={handleSelectGuide} />
    </div>
  );
};

export default ToolBuyingGuides;
