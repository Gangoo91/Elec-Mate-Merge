
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TestingHeader from "@/components/apprentice/testing-procedures/TestingHeader";
import TestingTabsList from "@/components/apprentice/testing-procedures/TestingTabsList";
import TestingResources from "@/components/apprentice/testing-procedures/TestingResources";
import R1R2TestingTab from "@/components/apprentice/testing-procedures/testing-tabs/R1R2Testing/R1R2TestingTab";
import IRTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/InsulationResistance/IRTestingTab";
import ZsTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/EarthFaultLoop/ZsTestingTab";
import PolarityTestingTab from "@/components/apprentice/testing-procedures/testing-tabs/Polarity/PolarityTestingTab";

const TestingProcedures = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <TestingHeader />
      
      <p className="text-muted-foreground">
        Step-by-step guides to essential electrical testing procedures required for installation 
        and verification. Follow the wizard-style checklists to ensure complete and accurate testing.
      </p>

      <Tabs defaultValue="r1r2" className="w-full">
        <TestingTabsList />
        
        <TabsContent value="r1r2">
          <R1R2TestingTab />
        </TabsContent>
        
        <TabsContent value="ir">
          <IRTestingTab />
        </TabsContent>
        
        <TabsContent value="zs">
          <ZsTestingTab />
        </TabsContent>
        
        <TabsContent value="polarity">
          <PolarityTestingTab />
        </TabsContent>
      </Tabs>
      
      <TestingResources />
    </div>
  );
};

export default TestingProcedures;
