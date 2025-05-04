
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { stripePriceData } from "@/data/stripePrices";
import PlansList from "./PlansList";

const PlanSelection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Choose a Plan</h2>
      
      <Tabs defaultValue="monthly" className="space-y-6">
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
