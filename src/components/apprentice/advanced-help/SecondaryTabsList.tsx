
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb } from "lucide-react";

const SecondaryTabsList = () => {
  return (
    <TabsList className="grid w-full grid-cols-1 h-auto p-1 bg-elec-gray/30">
      <TabsTrigger value="tips" className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-elec-yellow/20">
        <Lightbulb className="h-3 w-3" />
        <span>Daily AI Tips</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SecondaryTabsList;
