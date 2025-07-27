import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Download, Home, Building, Factory, Zap } from "lucide-react";
import { Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

interface InstallationTemplate {
  id: string;
  name: string;
  description: string;
  installationType: string;
  circuits: Omit<Circuit, 'id'>[];
}

interface MobileInstallationTemplatesProps {
  installationType: string;
  onApplyTemplate: (circuits: Circuit[]) => void;
}

const MobileInstallationTemplates: React.FC<MobileInstallationTemplatesProps> = ({ 
  installationType, 
  onApplyTemplate 
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const getTemplates = (instType: string): InstallationTemplate[] => {
    switch (instType) {
      case "domestic":
        return [
          {
            id: "small-flat",
            name: "Small Flat/Apartment",
            description: "Basic electrical installation for 1-2 bedroom property",
            installationType: "domestic",
            circuits: [
              {
                name: "Lighting Circuit",
                loadType: "lighting",
                totalLoad: 800,
                voltage: 230,
                phases: "single",
                cableLength: 25,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Power Circuit - Kitchen/Living",
                loadType: "power",
                totalLoad: 2300,
                voltage: 230,
                phases: "single",
                cableLength: 20,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Power Circuit - Bedrooms",
                loadType: "power",
                totalLoad: 1500,
                voltage: 230,
                phases: "single",
                cableLength: 30,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "rcbo",
                enabled: true
              }
            ]
          },
          {
            id: "family-house",
            name: "Family House (3-4 Bed)",
            description: "Complete installation for typical family home",
            installationType: "domestic",
            circuits: [
              {
                name: "Downstairs Lighting",
                loadType: "lighting",
                totalLoad: 600,
                voltage: 230,
                phases: "single",
                cableLength: 40,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Upstairs Lighting",
                loadType: "lighting",
                totalLoad: 500,
                voltage: 230,
                phases: "single",
                cableLength: 35,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Kitchen Ring Circuit",
                loadType: "power",
                totalLoad: 7200,
                voltage: 230,
                phases: "single",
                cableLength: 50,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Downstairs Ring Circuit",
                loadType: "power",
                totalLoad: 7200,
                voltage: 230,
                phases: "single",
                cableLength: 60,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Upstairs Ring Circuit",
                loadType: "power",
                totalLoad: 7200,
                voltage: 230,
                phases: "single",
                cableLength: 45,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Cooker Circuit",
                loadType: "cooker",
                totalLoad: 7000,
                voltage: 230,
                phases: "single",
                cableLength: 15,
                installationMethod: "clipped-direct",
                cableType: "t&e",
                protectiveDevice: "mcb",
                enabled: true
              }
            ]
          }
        ];
      case "commercial":
        return [
          {
            id: "small-office",
            name: "Small Office",
            description: "Basic commercial office installation",
            installationType: "commercial",
            circuits: [
              {
                name: "General Lighting",
                loadType: "commercial-lighting",
                totalLoad: 2000,
                voltage: 230,
                phases: "single",
                cableLength: 80,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Power - Workstations",
                loadType: "commercial-power",
                totalLoad: 5000,
                voltage: 230,
                phases: "single",
                cableLength: 60,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "IT Equipment",
                loadType: "it-equipment",
                totalLoad: 3000,
                voltage: 230,
                phases: "single",
                cableLength: 40,
                installationMethod: "trunking",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "HVAC System",
                loadType: "hvac",
                totalLoad: 8000,
                voltage: 400,
                phases: "three",
                cableLength: 25,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              }
            ]
          }
        ];
      case "industrial":
        return [
          {
            id: "workshop",
            name: "Small Workshop",
            description: "Basic industrial workshop installation",
            installationType: "industrial",
            circuits: [
              {
                name: "Workshop Lighting",
                loadType: "lighting",
                totalLoad: 1500,
                voltage: 230,
                phases: "single",
                cableLength: 100,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "General Power",
                loadType: "power",
                totalLoad: 10000,
                voltage: 400,
                phases: "three",
                cableLength: 75,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Motor Drive 1",
                loadType: "motor-small",
                totalLoad: 15000,
                voltage: 400,
                phases: "three",
                cableLength: 50,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              }
            ]
          }
        ];
      case "data-center":
        return [
          {
            id: "small-data-center",
            name: "Small Data Center",
            description: "Basic data center installation with UPS and cooling",
            installationType: "data-center",
            circuits: [
              {
                name: "UPS System",
                loadType: "ups-system",
                totalLoad: 50000,
                voltage: 400,
                phases: "three",
                cableLength: 20,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "mcb",
                enabled: true
              },
              {
                name: "Server Racks",
                loadType: "server-rack",
                totalLoad: 8000,
                voltage: 230,
                phases: "single",
                cableLength: 15,
                installationMethod: "tray",
                cableType: "swa",
                protectiveDevice: "rcbo",
                enabled: true
              }
            ]
          }
        ];
      case "healthcare":
        return [
          {
            id: "medical-facility",
            name: "Medical Facility",
            description: "Healthcare facility with medical equipment and backup power",
            installationType: "healthcare",
            circuits: [
              {
                name: "Medical Equipment",
                loadType: "medical",
                totalLoad: 8000,
                voltage: 230,
                phases: "single",
                cableLength: 20,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "rcbo",
                enabled: true
              },
              {
                name: "Emergency Systems",
                loadType: "emergency",
                totalLoad: 1500,
                voltage: 230,
                phases: "single",
                cableLength: 80,
                installationMethod: "conduit",
                cableType: "mineral",
                protectiveDevice: "mcb",
                enabled: true
              }
            ]
          }
        ];
      default:
        return [];
    }
  };

  const templates = getTemplates(installationType);
  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const handleApplyTemplate = () => {
    if (selectedTemplateData) {
      const circuits: Circuit[] = selectedTemplateData.circuits.map(circuit => ({
        ...circuit,
        id: uuidv4()
      }));
      onApplyTemplate(circuits);
    }
  };

  const getInstallationIcon = (type: string) => {
    switch (type) {
      case "domestic": return Home;
      case "commercial": return Building;
      case "industrial": return Factory;
      default: return Zap;
    }
  };

  if (templates.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="text-center py-8">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Templates Available</h3>
          <p className="text-muted-foreground">
            Templates for {installationType} installations are coming soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  const templateOptions = templates.map(template => ({
    value: template.id,
    label: template.name
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <MobileSelectWrapper
          label="Select Template"
          placeholder="Choose an installation template"
          value={selectedTemplate}
          onValueChange={setSelectedTemplate}
          options={templateOptions}
        />

        {selectedTemplateData && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base">
                <div className="h-8 w-8 rounded bg-elec-yellow/20 flex items-center justify-center">
                  {React.createElement(getInstallationIcon(selectedTemplateData.installationType), {
                    className: "h-4 w-4 text-elec-yellow"
                  })}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{selectedTemplateData.name}</div>
                  <p className="text-sm text-muted-foreground font-normal">
                    {selectedTemplateData.description}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Collapsible 
                open={expandedTemplate === selectedTemplateData.id}
                onOpenChange={(open) => setExpandedTemplate(open ? selectedTemplateData.id : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-0 h-auto text-sm"
                  >
                    <span>View {selectedTemplateData.circuits.length} circuits</span>
                    {expandedTemplate === selectedTemplateData.id ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-2 mt-3">
                  {selectedTemplateData.circuits.map((circuit, index) => (
                    <div key={index} className="p-3 bg-black/20 rounded-md">
                      <div className="text-sm font-medium mb-3 text-center">{circuit.name}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-black/30 rounded p-2 text-center">
                          <div className="text-muted-foreground mb-1">Load</div>
                          <div className="font-medium text-elec-yellow">{circuit.totalLoad}W</div>
                        </div>
                        <div className="bg-black/30 rounded p-2 text-center">
                          <div className="text-muted-foreground mb-1">Voltage</div>
                          <div className="font-medium text-blue-400">{circuit.voltage}V</div>
                        </div>
                        <div className="bg-black/30 rounded p-2 text-center col-span-2">
                          <div className="text-muted-foreground mb-1">Type</div>
                          <div className="font-medium text-purple-400">{circuit.loadType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-black/20 rounded-md p-2">
                  <span className="text-muted-foreground">Total Circuits</span>
                  <div className="font-medium">{selectedTemplateData.circuits.length}</div>
                </div>
                <div className="bg-black/20 rounded-md p-2">
                  <span className="text-muted-foreground">Installation Type</span>
                  <div className="font-medium capitalize">{selectedTemplateData.installationType}</div>
                </div>
              </div>

              <Button 
                onClick={handleApplyTemplate}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Apply Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MobileInstallationTemplates;