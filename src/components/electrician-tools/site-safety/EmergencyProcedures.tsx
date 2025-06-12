
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, AlertTriangle, Users, Package, Download, Print } from "lucide-react";

const EmergencyProcedures = () => {
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);

  const emergencyContacts = [
    { name: "Emergency Services", number: "999", type: "primary" },
    { name: "Site Manager", number: "07123 456789", type: "internal" },
    { name: "Health & Safety Officer", number: "07987 654321", type: "internal" },
    { name: "First Aid Coordinator", number: "07456 123789", type: "internal" },
    { name: "HSE Emergency Hotline", number: "0345 300 9923", type: "external" }
  ];

  const procedures = [
    {
      id: "electrical-shock",
      title: "Electrical Shock/Electrocution",
      priority: "high",
      steps: [
        "DO NOT touch the casualty if still in contact with electricity",
        "Switch off power at source if safely possible",
        "If unable to switch off, use non-conductive material to separate casualty",
        "Check breathing and pulse - begin CPR if necessary",
        "Call 999 immediately",
        "Treat for burns and shock while waiting for emergency services"
      ]
    },
    {
      id: "fire",
      title: "Electrical Fire",
      priority: "high",
      steps: [
        "Raise the alarm immediately",
        "Switch off electrical supply if safely possible",
        "Use CO2 or dry powder extinguisher ONLY (never water)",
        "Evacuate the area if fire cannot be controlled",
        "Call 999",
        "Report to site manager and HSE"
      ]
    },
    {
      id: "injury",
      title: "Serious Injury",
      priority: "medium",
      steps: [
        "Assess the scene for safety before approaching",
        "Call 999 if serious injury suspected",
        "Provide first aid within your competence",
        "Do not move casualty unless in immediate danger",
        "Keep casualty warm and conscious",
        "Record details of incident for RIDDOR reporting"
      ]
    }
  ];

  const assemblyPoints = [
    { location: "Main Car Park", distance: "50m from main entrance" },
    { location: "Secondary Assembly Point", distance: "Loading bay area" }
  ];

  const emergencyEquipment = [
    { item: "First Aid Kit", location: "Site Office", lastChecked: "12/01/2024" },
    { item: "AED Defibrillator", location: "Main Entrance", lastChecked: "15/01/2024" },
    { item: "Eye Wash Station", location: "Workshop Area", lastChecked: "10/01/2024" },
    { item: "Fire Extinguishers", location: "Multiple Locations", lastChecked: "08/01/2024" },
    { item: "Emergency Shower", location: "Workshop Area", lastChecked: "10/01/2024" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-elec-yellow">Emergency Procedures</h2>
          <p className="text-muted-foreground">
            Critical emergency response protocols for electrical work environments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{contact.name}</p>
                    <Badge variant={contact.type === 'primary' ? 'destructive' : 'secondary'} className="text-xs">
                      {contact.type}
                    </Badge>
                  </div>
                  <div className="text-lg font-mono text-red-300">
                    {contact.number}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Procedures */}
        <Card className="border-elec-yellow/50 bg-elec-yellow/10">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Response Procedures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {procedures.map((procedure) => (
                <div key={procedure.id} className="border border-elec-yellow/30 rounded-lg p-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedProcedure(
                      selectedProcedure === procedure.id ? null : procedure.id
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium">{procedure.title}</span>
                    </div>
                    <Badge variant={procedure.priority === 'high' ? 'destructive' : 'default'}>
                      {procedure.priority}
                    </Badge>
                  </div>
                  
                  {selectedProcedure === procedure.id && (
                    <div className="mt-3 pl-6 border-l-2 border-elec-yellow/50">
                      <ol className="space-y-2 text-sm">
                        {procedure.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="font-medium text-elec-yellow min-w-[20px]">
                              {stepIndex + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assembly Points */}
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Emergency Assembly Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assemblyPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{point.location}</p>
                    <p className="text-sm text-blue-300">{point.distance}</p>
                  </div>
                  <MapPin className="h-5 w-5 text-blue-300" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Equipment */}
        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Emergency Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyEquipment.map((equipment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{equipment.item}</p>
                    <p className="text-sm text-green-300">{equipment.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-300">Last checked:</p>
                    <p className="text-sm font-medium">{equipment.lastChecked}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Team Information */}
      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Emergency Response Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-500/20 rounded-lg">
              <h4 className="font-medium text-white mb-2">Fire Warden</h4>
              <p className="text-sm text-purple-300">John Smith</p>
              <p className="text-xs text-purple-300">Ext: 234</p>
            </div>
            <div className="text-center p-4 bg-purple-500/20 rounded-lg">
              <h4 className="font-medium text-white mb-2">First Aider</h4>
              <p className="text-sm text-purple-300">Sarah Johnson</p>
              <p className="text-xs text-purple-300">Ext: 189</p>
            </div>
            <div className="text-center p-4 bg-purple-500/20 rounded-lg">
              <h4 className="font-medium text-white mb-2">Safety Officer</h4>
              <p className="text-sm text-purple-300">Mike Wilson</p>
              <p className="text-xs text-purple-300">Ext: 156</p>
            </div>
            <div className="text-center p-4 bg-purple-500/20 rounded-lg">
              <h4 className="font-medium text-white mb-2">Site Manager</h4>
              <p className="text-sm text-purple-300">Emma Davis</p>
              <p className="text-xs text-purple-300">Ext: 101</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyProcedures;
