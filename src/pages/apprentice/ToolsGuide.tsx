
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import HandToolsTab from "@/components/apprentice/tools-guide/HandToolsTab";
import PowerToolsTab from "@/components/apprentice/tools-guide/PowerToolsTab";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";
import PPETab from "@/components/apprentice/tools-guide/PPETab";
import ToolStorage from "@/components/apprentice/tools-guide/ToolStorage";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";
import BuildingCollection from "@/components/apprentice/tools-guide/BuildingCollection";
import SupplierFinder from "@/components/apprentice/tools-guide/SupplierFinder";

const ToolsGuide = () => {
  const [activeTab, setActiveTab] = useState("hand-tools");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowMobileMenu(false);
  };

  const tabOptions = [
    { value: "hand-tools", label: "Hand Tools", description: "Essential manual tools for electrical work" },
    { value: "power-tools", label: "Power Tools", description: "Electric and battery-powered equipment" },
    { value: "test-equipment", label: "Test Equipment", description: "Measurement and testing instruments" },
    { value: "ppe", label: "PPE & Safety", description: "Personal protective equipment and safety gear" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in max-w-6xl">
        {/* Mobile-optimised Header */}
        <div className="text-center space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Link to="/apprentice/toolbox" className="self-start">
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Toolbox
              </Button>
            </Link>
            <div className="space-y-3">
              <h1 className={`font-bold tracking-tight text-elec-yellow ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                Apprentice Tool Guide
              </h1>
              <p className={`text-muted-foreground leading-relaxed max-w-2xl mx-auto ${isMobile ? 'text-sm px-2' : 'text-base'}`}>
                Essential tools, equipment and materials for UK electrical apprentices. 
                Learn what you need, when to buy it, and where to get the best value.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile-first Navigation */}
        {isMobile ? (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-full bg-elec-gray border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
            >
              <Menu className="mr-2 h-4 w-4" />
              {tabOptions.find(tab => tab.value === activeTab)?.label || "Select Category"}
            </Button>

            {showMobileMenu && (
              <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-3 space-y-2">
                {tabOptions.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleTabChange(tab.value)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeTab === tab.value
                        ? 'bg-elec-yellow text-black font-medium'
                        : 'bg-elec-dark/50 text-white hover:bg-elec-yellow/10 border border-elec-yellow/20'
                    }`}
                  >
                    <div className="font-medium">{tab.label}</div>
                    <div className={`text-xs mt-1 ${activeTab === tab.value ? 'text-black/70' : 'text-muted-foreground'}`}>
                      {tab.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {tabOptions.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? "default" : "outline"}
                onClick={() => handleTabChange(tab.value)}
                className={`h-auto p-4 ${
                  activeTab === tab.value
                    ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                    : 'bg-elec-gray border-elec-yellow/30 text-white hover:bg-elec-yellow/10'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={`text-xs mt-1 ${activeTab === tab.value ? 'text-black/70' : 'text-muted-foreground'}`}>
                    {tab.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}

        {/* Content Tabs with enhanced mobile styling */}
        <Tabs value={activeTab} className="space-y-6">
          <TabsContent value="hand-tools" className="m-0">
            <div className="bg-elec-gray/50 backdrop-blur border border-elec-yellow/20 rounded-lg">
              <HandToolsTab />
            </div>
          </TabsContent>

          <TabsContent value="power-tools" className="m-0">
            <div className="bg-elec-gray/50 backdrop-blur border border-elec-yellow/20 rounded-lg">
              <PowerToolsTab />
            </div>
          </TabsContent>

          <TabsContent value="test-equipment" className="m-0">
            <div className="bg-elec-gray/50 backdrop-blur border border-elec-yellow/20 rounded-lg">
              <TestEquipmentTab />
            </div>
          </TabsContent>

          <TabsContent value="ppe" className="m-0">
            <div className="bg-elec-gray/50 backdrop-blur border border-elec-yellow/20 rounded-lg">
              <PPETab />
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced sections with mobile-friendly cards */}
        <div className="space-y-6">
          <Separator className="bg-elec-yellow/20" />
          
          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg">
            <SupplierFinder />
          </div>

          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg">
            <ToolStorage />
          </div>

          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg">
            <RecommendedBrands />
          </div>

          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg">
            <BuildingCollection />
          </div>
        </div>

        {/* Mobile-friendly footer note */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-green-500/10 border border-elec-yellow/30 rounded-lg p-4 mt-8">
          <p className={`text-center text-muted-foreground ${isMobile ? 'text-sm leading-relaxed' : 'text-base'}`}>
            <strong className="text-elec-yellow">Remember:</strong> Quality tools are an investment in your career. 
            Buy once, use for years. Always prioritise safety equipment and testing instruments first.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsGuide;
