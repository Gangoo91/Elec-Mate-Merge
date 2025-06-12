
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, FileText, AlertTriangle, Camera, Users, ClipboardCheck, Wrench, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/common/BackButton";
import RAMSGenerator from "@/components/electrician-tools/site-safety/RAMSGenerator";
import RiskAssessmentBuilder from "@/components/electrician-tools/site-safety/RiskAssessmentBuilder";
import MethodStatementGenerator from "@/components/electrician-tools/site-safety/MethodStatementGenerator";
import HazardDatabase from "@/components/electrician-tools/site-safety/HazardDatabase";
import PhotoDocumentation from "@/components/electrician-tools/site-safety/PhotoDocumentation";
import TeamBriefingTemplates from "@/components/electrician-tools/site-safety/TeamBriefingTemplates";
import NearMissReporting from "@/components/electrician-tools/site-safety/NearMissReporting";
import SafetyEquipmentTracker from "@/components/electrician-tools/site-safety/SafetyEquipmentTracker";
import EmergencyProcedures from "@/components/electrician-tools/site-safety/EmergencyProcedures";

const SiteSafety = () => {
  const [activeTab, setActiveTab] = useState("rams");

  const safetyStats = [
    { label: "Active Risk Assessments", value: "12", color: "text-blue-400" },
    { label: "Method Statements", value: "8", color: "text-green-400" },
    { label: "Near Miss Reports", value: "3", color: "text-yellow-400" },
    { label: "Safety Equipment Items", value: "45", color: "text-purple-400" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Site Safety & Risk Assessment</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive safety management tools for electrical contractors. Generate RAMS documents, 
          assess risks, and maintain safety compliance on all your projects.
        </p>
        <BackButton customUrl="/electrician-tools/admin" label="Back to Admin Tools" />
      </div>

      {/* Safety Statistics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {safetyStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="rams" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 gap-1">
          <TabsTrigger value="rams" className="flex items-center gap-1 text-xs">
            <FileText className="h-3 w-3" />
            <span className="hidden sm:inline">RAMS</span>
          </TabsTrigger>
          <TabsTrigger value="risk-assessment" className="flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            <span className="hidden sm:inline">Risk</span>
          </TabsTrigger>
          <TabsTrigger value="method-statement" className="flex items-center gap-1 text-xs">
            <ClipboardCheck className="h-3 w-3" />
            <span className="hidden sm:inline">Method</span>
          </TabsTrigger>
          <TabsTrigger value="hazard-database" className="flex items-center gap-1 text-xs">
            <Shield className="h-3 w-3" />
            <span className="hidden sm:inline">Hazards</span>
          </TabsTrigger>
          <TabsTrigger value="photo-docs" className="flex items-center gap-1 text-xs">
            <Camera className="h-3 w-3" />
            <span className="hidden sm:inline">Photos</span>
          </TabsTrigger>
          <TabsTrigger value="team-briefing" className="flex items-center gap-1 text-xs">
            <Users className="h-3 w-3" />
            <span className="hidden sm:inline">Briefing</span>
          </TabsTrigger>
          <TabsTrigger value="near-miss" className="flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            <span className="hidden sm:inline">Near Miss</span>
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-1 text-xs">
            <Wrench className="h-3 w-3" />
            <span className="hidden sm:inline">Equipment</span>
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-1 text-xs">
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline">Emergency</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rams" className="mt-6">
          <RAMSGenerator />
        </TabsContent>

        <TabsContent value="risk-assessment" className="mt-6">
          <RiskAssessmentBuilder />
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
  );
};

export default SiteSafety;
