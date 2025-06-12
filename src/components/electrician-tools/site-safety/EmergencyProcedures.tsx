
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, AlertTriangle, MapPin, Users, Clock, FileText, Download } from "lucide-react";

const EmergencyProcedures = () => {
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);

  const emergencyContacts = [
    { service: "Emergency Services", number: "999", description: "Fire, Police, Ambulance" },
    { service: "NHS Direct", number: "111", description: "Non-emergency medical advice" },
    { service: "Gas Emergency", number: "0800 111 999", description: "Gas leaks and emergencies" },
    { service: "Electricity Emergency", number: "105", description: "Power cuts and electrical emergencies" }
  ];

  const emergencyProcedures = [
    {
      id: "electrical-shock",
      title: "Electrical Shock",
      priority: "Critical",
      steps: [
        "DO NOT touch the person if they are still in contact with electricity",
        "Switch off the power source immediately",
        "If unable to switch off, use a non-conductive object to separate victim from source",
        "Check for consciousness and breathing",
        "Call 999 immediately",
        "Begin CPR if qualified and necessary",
        "Monitor vital signs until help arrives"
      ]
    },
    {
      id: "fire",
      title: "Electrical Fire",
      priority: "Critical",
      steps: [
        "Raise the alarm immediately",
        "Switch off electrical supply if safe to do so",
        "Use CO2 or dry powder extinguisher - NEVER water",
        "Evacuate the area if fire cannot be controlled",
        "Call 999",
        "Ensure all personnel are accounted for",
        "Meet fire service at designated assembly point"
      ]
    },
    {
      id: "injury",
      title: "Workplace Injury",
      priority: "High",
      steps: [
        "Make the area safe",
        "Assess the casualty's condition",
        "Call 999 if serious injury",
        "Provide first aid if qualified",
        "Do not move casualty unless in immediate danger",
        "Record all details of the incident",
        "Report to supervisor and HSE if required"
      ]
    },
    {
      id: "evacuation",
      title: "Site Evacuation",
      priority: "High",
      steps: [
        "Sound the alarm (continuous siren or shouting)",
        "Stop all work immediately",
        "Switch off equipment if safe to do so",
        "Evacuate via nearest safe exit route",
        "Assist anyone who needs help",
        "Go to designated assembly point",
        "Check in with site supervisor",
        "Do not re-enter until all clear given"
      ]
    }
  ];

  const firstAidLocations = [
    { location: "Main Site Office", items: "Full first aid kit, AED, eye wash station" },
    { location: "Workshop Area", items: "Basic first aid kit, burn gel" },
    { location: "Storage Areas", items: "Portable first aid kit" },
    { location: "Vehicle", items: "Travel first aid kit, emergency blanket" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-red-500/20 rounded-lg">
                <div>
                  <div className="font-medium text-red-200">{contact.service}</div>
                  <div className="text-sm text-red-300">{contact.description}</div>
                </div>
                <div className="text-xl font-bold text-red-100">{contact.number}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* First Aid Locations */}
        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              First Aid Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {firstAidLocations.map((location, index) => (
              <div key={index} className="p-3 bg-green-500/20 rounded-lg">
                <div className="font-medium text-green-200">{location.location}</div>
                <div className="text-sm text-green-300">{location.items}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Emergency Procedures */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {emergencyProcedures.map((procedure) => (
              <div 
                key={procedure.id} 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedProcedure === procedure.id 
                    ? 'border-elec-yellow bg-elec-yellow/10' 
                    : 'border-elec-yellow/30 bg-elec-dark hover:bg-elec-yellow/5'
                }`}
                onClick={() => setSelectedProcedure(procedure.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{procedure.title}</h3>
                  <Badge 
                    variant={procedure.priority === 'Critical' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {procedure.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Click to view detailed steps
                </p>
              </div>
            ))}
          </div>

          {selectedProcedure && (
            <Card className="border-elec-yellow/30 bg-elec-dark">
              <CardHeader>
                <CardTitle className="text-elec-yellow">
                  {emergencyProcedures.find(p => p.id === selectedProcedure)?.title} Procedure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {emergencyProcedures.find(p => p.id === selectedProcedure)?.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-white">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Emergency Response Team */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            Emergency Response Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-elec-dark rounded-lg">
              <div className="font-medium text-white mb-2">Site Manager</div>
              <div className="text-sm text-muted-foreground mb-2">Overall emergency coordinator</div>
              <div className="text-elec-yellow">Extension: 001</div>
            </div>
            <div className="p-4 bg-elec-dark rounded-lg">
              <div className="font-medium text-white mb-2">First Aider</div>
              <div className="text-sm text-muted-foreground mb-2">Medical emergency response</div>
              <div className="text-elec-yellow">Extension: 002</div>
            </div>
            <div className="p-4 bg-elec-dark rounded-lg">
              <div className="font-medium text-white mb-2">Fire Marshal</div>
              <div className="text-sm text-muted-foreground mb-2">Fire and evacuation procedures</div>
              <div className="text-elec-yellow">Extension: 003</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Kit Checklist */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Emergency Kit Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">First Aid Supplies</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bandages (various sizes)</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Antiseptic wipes</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Burn gel</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Eye wash solution</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Disposable gloves</span>
                  <span className="text-red-400">✗</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Emergency Equipment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fire extinguisher (CO2)</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency torch</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency blanket</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lockout/Tagout kit</span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spill kit</span>
                  <span className="text-yellow-400">⚠</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Emergency Plan
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Schedule Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyProcedures;
