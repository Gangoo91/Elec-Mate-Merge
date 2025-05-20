
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import TestingHeader from "@/components/apprentice/testing-procedures/TestingHeader";
import TestingTabsList from "@/components/apprentice/testing-procedures/TestingTabsList";
import TestingResources from "@/components/apprentice/testing-procedures/TestingResources";
import R1R2TestingTab from "@/components/apprentice/testing-procedures/testing-tabs/R1R2Testing/R1R2TestingTab";
import IRTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/InsulationResistance/IRTestingTab";
import ZsTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/EarthFaultLoop/ZsTestingTab";
import PolarityTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/Polarity/PolarityTestingTab";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, HelpCircle } from "lucide-react";

const TestingProcedures = () => {
  const [activeTab, setActiveTab] = useState("r1r2");
  const [lastVisited, setLastVisited] = useState<string | null>(null);
  
  // Track active tab for persistence
  useEffect(() => {
    const savedTab = localStorage.getItem("lastTestingTab");
    if (savedTab) {
      setLastVisited(savedTab);
    }
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem("lastTestingTab", value);
    
    // Show toast when switching tabs
    toast.success(`Switched to ${getTabName(value)} tab`, {
      description: "Your progress is automatically saved",
      duration: 2000,
    });
  };
  
  const getTabName = (tabId: string) => {
    switch(tabId) {
      case "r1r2": return "R1+R2 Testing";
      case "ir": return "Insulation Resistance";
      case "zs": return "Earth Fault Loop";
      case "polarity": return "Polarity";
      default: return tabId;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <TestingHeader />
      
      {lastVisited && activeTab !== lastVisited && (
        <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-blue-100">
              You last viewed the <span className="font-medium">{getTabName(lastVisited)}</span> procedure.
            </span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs border-blue-500/40 hover:bg-blue-800/20"
            onClick={() => setActiveTab(lastVisited)}
          >
            Return
          </Button>
        </div>
      )}
      
      <div className="relative">
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <TestingTabsList />
          
          <TabsContent value="r1r2" className="animate-fade-in">
            <R1R2TestingTab />
          </TabsContent>
          
          <TabsContent value="ir" className="animate-fade-in">
            <IRTestingTab />
          </TabsContent>
          
          <TabsContent value="zs" className="animate-fade-in">
            <ZsTestingTab />
          </TabsContent>
          
          <TabsContent value="polarity" className="animate-fade-in">
            <PolarityTestingTab />
          </TabsContent>
        </Tabs>
        
        <div className="absolute top-0 right-0">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 w-8 p-0"
            onClick={() => toast.info("Need help? Contact your supervisor or send us feedback.")}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TestingResources />
    </div>
  );
};

export default TestingProcedures;
