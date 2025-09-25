
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Phone, MapPin, Clock, Users, FileText, Shield, Printer, Download } from "lucide-react";

const EmergencyProcedures = () => {
  const emergencyContacts = [
    { service: "Emergency Services", number: "999", description: "Fire, Police, Ambulance" },
    { service: "HSE Emergency", number: "0300 003 1747", description: "Health & Safety Executive" },
    { service: "Electrical Emergency", number: "105", description: "Power network emergency" },
    { service: "Gas Emergency", number: "0800 111 999", description: "National Gas Emergency Service" }
  ];

  const evacuationProcedures = [
    "Stop work immediately and make equipment safe",
    "Alert all personnel in the immediate area",
    "Follow designated evacuation routes",
    "Assemble at designated muster point",
    "Report to site safety officer or supervisor",
    "Remain at muster point until all-clear given"
  ];

  const firstAidProcedures = [
    "Assess the situation for ongoing dangers",
    "Call 999 immediately for serious injuries",
    "Locate nearest first aid kit and trained first aider",
    "Do not move casualties unless in immediate danger",
    "Keep casualty warm and comfortable",
    "Record all details in accident book"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Procedures & Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Critical emergency procedures and contact information for electrical work sites.
            Ensure all team members are familiar with these procedures before commencing work.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Emergency Contacts Card */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-200 cursor-pointer group">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg group-hover:text-elec-yellow/90">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light">Emergency Services</span>
                <span className="font-bold text-elec-yellow">999</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light">Electrical Emergency</span>
                <span className="font-bold text-elec-yellow">105</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light">HSE Emergency</span>
                <span className="font-bold text-elec-yellow text-xs">0300 003 1747</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10">
              <Phone className="h-4 w-4 mr-2" />
              View All Contacts
            </Button>
          </CardContent>
        </Card>

        {/* Evacuation Card */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-200 cursor-pointer group">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg group-hover:text-elec-yellow/90">
              <MapPin className="h-5 w-5" />
              Evacuation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-sm text-elec-light">Stop work immediately</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-sm text-elec-light">Alert all personnel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span className="text-sm text-elec-light">Follow evacuation routes</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10">
              <AlertTriangle className="h-4 w-4 mr-2" />
              View Full Procedure
            </Button>
          </CardContent>
        </Card>

        {/* First Aid Card */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-200 cursor-pointer group">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg group-hover:text-elec-yellow/90">
              <Shield className="h-5 w-5" />
              First Aid
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-sm text-elec-light">Assess situation safety</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-sm text-elec-light">Call 999 for serious injuries</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span className="text-sm text-elec-light">Locate first aid kit</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10">
              <Shield className="h-4 w-4 mr-2" />
              View Full Guide
            </Button>
          </CardContent>
        </Card>

        {/* Site Procedures Card */}
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-200 cursor-pointer group">
          <CardHeader className="pb-3">
            <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg group-hover:text-elec-yellow/90">
              <FileText className="h-5 w-5" />
              Site Procedures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-elec-light">Pre-work safety checks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-elec-light">Team communication</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm text-elec-light">Emergency protocols</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10">
                <Printer className="h-3 w-3 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyProcedures;
