
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Shield, FileText, AlertTriangle, Camera, Users, ClipboardCheck, Wrench, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/common/BackButton";
import { RAMSProvider } from "@/components/electrician-tools/site-safety/rams/RAMSContext";
import { RAMSQuickAdd } from "@/components/electrician-tools/site-safety/RAMSQuickAdd";
import RAMSGenerator from "@/components/electrician-tools/site-safety/RAMSGenerator";

import MethodStatementGenerator from "@/components/electrician-tools/site-safety/MethodStatementGenerator";
import HazardDatabase from "@/components/electrician-tools/site-safety/HazardDatabase";
import PhotoDocumentation from "@/components/electrician-tools/site-safety/PhotoDocumentation";
import TeamBriefingTemplates from "@/components/electrician-tools/site-safety/TeamBriefingTemplates";
import NearMissReporting from "@/components/electrician-tools/site-safety/NearMissReporting";
import SafetyEquipmentTracker from "@/components/electrician-tools/site-safety/SafetyEquipmentTracker";
import EmergencyProcedures from "@/components/electrician-tools/site-safety/EmergencyProcedures";

const SiteSafety = () => {
  const [activeTab, setActiveTab] = useState("rams");

  const tabOptions = [
    { value: "rams", label: "Risk Assessment", icon: FileText },
    { value: "method-statement", label: "Method Statement", icon: ClipboardCheck },
    { value: "hazard-database", label: "Hazard Database", icon: Shield },
    { value: "photo-docs", label: "Photo Documentation", icon: Camera },
    { value: "team-briefing", label: "Team Briefing", icon: Users },
    { value: "near-miss", label: "Near Miss Reports", icon: AlertTriangle },
    { value: "equipment", label: "Safety Equipment", icon: Wrench },
    { value: "emergency", label: "Emergency Procedures", icon: Phone }
  ];

  const getCurrentTabLabel = () => {
    const currentTab = tabOptions.find(tab => tab.value === activeTab);
    return currentTab ? currentTab.label : "Select Tool";
  };

  return (
    <RAMSProvider>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in px-4 py-4 sm:py-6">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-4">Site Safety & Risk Assessment</h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-3 sm:mb-4 px-2">
            Comprehensive safety management tools for electrical contractors. Generate RAMS documents, 
            assess risks, and maintain safety compliance on all your projects.
          </p>
          <BackButton customUrl="/electrician" label="Back to Electrical Hub" />
        </div>
        <Tabs defaultValue="rams" value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Dropdown */}
        <div className="lg:hidden mb-4">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full h-12 bg-background/80 backdrop-blur-sm border-elec-yellow/20 text-base">
              <div className="flex items-center gap-3">
                {(() => {
                  const currentTab = tabOptions.find(tab => tab.value === activeTab);
                  const IconComponent = currentTab?.icon || FileText;
                  return (
                    <>
                      <IconComponent className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                      <span className="truncate">{currentTab?.label || "Select a safety tool"}</span>
                    </>
                  );
                })()}
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20">
              {tabOptions.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <SelectItem key={tab.value} value={tab.value} className="cursor-pointer h-12">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4 flex-shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Tabs */}
        <TabsList className="hidden lg:grid w-full grid-cols-4 gap-2 h-auto p-1">
          {tabOptions.slice(0, 4).map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                className="flex items-center gap-2 py-3 px-4 text-sm"
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Second row for desktop */}
        <TabsList className="hidden lg:grid w-full grid-cols-4 gap-2 h-auto p-1 mt-2">
          {tabOptions.slice(4).map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                className="flex items-center gap-2 py-3 px-4 text-sm"
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="rams" className="mt-6">
          <RAMSGenerator />
        </TabsContent>


        <TabsContent value="method-statement" className="mt-6">
          <MethodStatementGenerator />
        </TabsContent>

        <TabsContent value="hazard-database" className="mt-6">
          <HazardDatabase />
        </TabsContent>

        <TabsContent value="photo-docs" className="mt-6">
          <PhotoDocumentation />
        </TabsContent>

        <TabsContent value="team-briefing" className="mt-6">
          <TeamBriefingTemplates />
        </TabsContent>

        <TabsContent value="near-miss" className="mt-6">
          <NearMissReporting />
        </TabsContent>

        <TabsContent value="equipment" className="mt-6">
          <SafetyEquipmentTracker />
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <EmergencyProcedures />
        </TabsContent>
        </Tabs>

        {/* RAMS Quick Add Section */}
        <RAMSQuickAdd />

        {/* Safety Best Practices Card */}
        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader className="text-center">
            <CardTitle className="text-green-300 flex items-center justify-center gap-2 text-xl">
              <Shield className="h-6 w-6" />
              Safety Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-300 text-center text-base mb-4">Before Starting Work:</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Complete risk assessment for each task</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Brief all team members on hazards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Check all safety equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Document site conditions</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-green-300 text-center text-base mb-4">During Work:</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Follow method statements precisely</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Report near misses immediately</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Take photos of safety concerns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg leading-none mt-0.5">•</span>
                    <span className="text-left">Update risk assessments if conditions change</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RAMSProvider>
  );
};

export default SiteSafety;
