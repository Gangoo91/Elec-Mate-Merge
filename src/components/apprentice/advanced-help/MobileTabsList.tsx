
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot } from "lucide-react";

const MobileTabsList = () => {
  return (
    <TabsList className="grid w-full grid-cols-1 h-auto p-1 bg-elec-gray/50">
      <TabsTrigger value="helpbot" className="flex flex-col items-center gap-1 py-3 text-xs data-[state=active]:bg-elec-yellow/20">
        <Bot className="h-4 w-4" />
        <span>AI Help Bot</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default MobileTabsList;
