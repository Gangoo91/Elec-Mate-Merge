
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, BookOpen, User, Brain, Eye } from "lucide-react";

const MobileTabsList = () => {
  return (
    <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-elec-gray/50">
      <TabsTrigger value="helpbot" className="flex flex-col items-center gap-1 py-3 text-xs data-[state=active]:bg-elec-yellow/20">
        <HelpCircle className="h-4 w-4" />
        <span>Help Bot</span>
      </TabsTrigger>
      <TabsTrigger value="assessment" className="flex flex-col items-center gap-1 py-3 text-xs data-[state=active]:bg-elec-yellow/20">
        <BookOpen className="h-4 w-4" />
        <span>Assessment</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default MobileTabsList;
