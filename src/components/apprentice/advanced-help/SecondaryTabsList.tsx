
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Brain, Eye } from "lucide-react";

const SecondaryTabsList = () => {
  return (
    <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-elec-gray/30">
      <TabsTrigger value="career" className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-elec-yellow/20">
        <User className="h-3 w-3" />
        <span>Career</span>
      </TabsTrigger>
      <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-elec-yellow/20">
        <Brain className="h-3 w-3" />
        <span>Analytics</span>
      </TabsTrigger>
      <TabsTrigger value="ar" className="flex flex-col items-center gap-1 py-2 text-xs data-[state=active]:bg-elec-yellow/20">
        <Eye className="h-3 w-3" />
        <span>AR Training</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SecondaryTabsList;
