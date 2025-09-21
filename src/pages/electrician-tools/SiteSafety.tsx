
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
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Site Safety & Risk Assessment</h1>
          <p className="text-muted-foreground text-center max-w-2xl mb-4">
            Comprehensive safety management tools for electrical contractors. Generate RAMS documents, 
            assess risks, and maintain safety compliance on all your projects.
          </p>
          <BackButton customUrl="/electrician" label="Back to Electrical Hub" />
        </div>
        <Tabs defaultValue="rams" value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Dropdown */}
        <div className="lg:hidden mb-6">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm border-elec-yellow/20 z-50">
              <div className="flex items-center gap-3">
                {(() => {
                  const currentTab = tabOptions.find(tab => tab.value === activeTab);
                  const IconComponent = currentTab?.icon || FileText;
                  return (
                    <>
                      <IconComponent className="h-4 w-4 text-elec-yellow" />
                      <SelectValue placeholder="Select a safety tool" />
                    </>
                  );
                })()}
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
              {tabOptions.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <SelectItem key={tab.value} value={tab.value} className="cursor-pointer">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4" />
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
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-green-300 mb-2">Before Starting Work:</h4>
                <ul className="space-y-1">
                  <li>• Complete risk assessment for each task</li>
                  <li>• Brief all team members on hazards</li>
                  <li>• Check all safety equipment</li>
                  <li>• Document site conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-300 mb-2">During Work:</h4>
                <ul className="space-y-1">
                  <li>• Follow method statements precisely</li>
                  <li>• Report near misses immediately</li>
                  <li>• Take photos of safety concerns</li>
                  <li>• Update risk assessments if conditions change</li>
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
