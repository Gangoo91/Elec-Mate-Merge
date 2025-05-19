
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TestingHeader from "@/components/apprentice/testing-procedures/TestingHeader";
import TestingTabsList from "@/components/apprentice/testing-procedures/TestingTabsList";
import TestingResources from "@/components/apprentice/testing-procedures/TestingResources";
import R1R2TestingTab from "@/components/apprentice/testing-procedures/testing-tabs/R1R2Testing/R1R2TestingTab";
import IRTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/InsulationResistance/IRTestingTab";
import ZsTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/EarthFaultLoop/ZsTestingTab";
import PolarityTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/Polarity/PolarityTestingTab";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, ChevronDown, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const TestingProcedures = () => {
  const [activeTab, setActiveTab] = useState("r1r2");
  const [lastVisited, setLastVisited] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  
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
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in px-2 sm:px-0">
      <TestingHeader />
      
      {lastVisited && activeTab !== lastVisited && (
        <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-3 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-blue-100">
              You last viewed the <span className="font-medium">{getTabName(lastVisited)}</span> procedure.
            </span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs border-blue-500/40 hover:bg-blue-800/20 w-full sm:w-auto"
            onClick={() => setActiveTab(lastVisited)}
          >
            Return
          </Button>
        </div>
      )}

      <Collapsible open={showGuidance} onOpenChange={setShowGuidance} className="mb-6 w-full">
        <div className="bg-gradient-to-r from-blue-950/30 to-blue-900/20 border border-blue-500/30 rounded-md p-4">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <h3 className="font-medium text-blue-200">Testing Guidance & Best Practices</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${showGuidance ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 text-sm text-blue-100/90">
            <div className="space-y-4">
              <p>
                When conducting electrical testing, always follow these professional guidelines:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Always ensure the testing circuit is isolated before connecting test equipment</li>
                <li>Use correctly calibrated, appropriate test equipment for each procedure</li>
                <li>Fully document all test results, including date and time of testing</li>
                <li>Verify test results against expected values from BS 7671</li>
                <li>Complete tests in the sequence specified in the IET Guidance Note 3</li>
                <li>Ensure personal protective equipment is worn during all testing procedures</li>
                <li>When in doubt, consult the manufacturer's guidelines for your specific test equipment</li>
              </ul>
              <p className="font-medium text-blue-300 mt-2">
                Remember: Documentation is as important as the testing itself. Keep comprehensive records.
              </p>
              
              <div className="mt-4 text-right">
                <Link to="/apprentice/study/inspection-testing">
                  <Button size="sm" variant="outline" className="border-blue-500/40 hover:bg-blue-800/20">
                    <span>View Full Inspection & Testing Guide</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      
      <div className="relative overflow-hidden w-full">
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
