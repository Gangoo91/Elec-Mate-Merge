
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import PlansList from "./PlansList";
import { useToast } from "@/components/ui/use-toast";

const PlanSelection = () => {
  const [activeTab, setActiveTab] = useState<string>("monthly");
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Choose a Plan</h2>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="bg-elec-gray border border-elec-yellow/20">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">Annual Billing</TabsTrigger>
          </TabsList>
        </div>

        {/* Monthly Plans */}
        <TabsContent value="monthly">
          <PlansList billing="monthly" />
        </TabsContent>

        {/* Annual Plans */}
        <TabsContent value="yearly">
          <PlansList billing="yearly" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanSelection;
