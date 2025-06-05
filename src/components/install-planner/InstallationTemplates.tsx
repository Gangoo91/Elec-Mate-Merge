
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Building, Factory, Zap, Download } from "lucide-react";
import { Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

interface InstallationTemplate {
  id: string;
  name: string;
  description: string;
  installationType: string;
  circuits: Omit<Circuit, 'id'>[];
}

interface InstallationTemplatesProps {
  installationType: string;
  onApplyTemplate: (circuits: Circuit[]) => void;
}

const InstallationTemplates: React.FC<InstallationTemplatesProps> = ({ 
  installationType, 
  onApplyTemplate 
}) => {
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
                loadType: "lighting",
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
                loadType: "power",
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
                loadType: "motor",
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
      default:
        return [];
    }
  };

  const templates = getTemplates(installationType);

  const handleApplyTemplate = (template: InstallationTemplate) => {
    const circuits: Circuit[] = template.circuits.map(circuit => ({
      ...circuit,
      id: uuidv4()
    }));
    onApplyTemplate(circuits);
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Installation Templates</h3>
        <p className="text-muted-foreground">
          Start with a pre-configured template for your {installationType} installation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = getInstallationIcon(template.installationType);
          
          return (
            <Card key={template.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-elec-yellow" />
                  <div>
                    <div>{template.name}</div>
                    <p className="text-sm text-muted-foreground font-normal">{template.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Included Circuits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.circuits.map((circuit, index) => (
                        <Badge key={index} variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                          {circuit.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Total Circuits:</span>
                      <span className="ml-1 font-medium">{template.circuits.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Load Type:</span>
                      <span className="ml-1 font-medium capitalize">{template.installationType}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleApplyTemplate(template)}
                    className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InstallationTemplates;
