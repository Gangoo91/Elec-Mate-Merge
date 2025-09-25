
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

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="evacuation">Evacuation</TabsTrigger>
          <TabsTrigger value="first-aid">First Aid</TabsTrigger>
          <TabsTrigger value="procedures">Site Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contact Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{contact.service}</h4>
                      <span className="text-xl font-bold text-elec-yellow">{contact.number}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evacuation" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Evacuation Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Evacuation Steps
                  </h4>
                  <ol className="space-y-2">
                    {evacuationProcedures.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Important Reminders</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Never use lifts during evacuation</li>
                    <li>• Assist those who need help</li>
                    <li>• Do not re-enter building until given all-clear</li>
                    <li>• Report missing persons immediately</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="first-aid" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Shield className="h-5 w-5" />
                First Aid Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-300 mb-3">First Aid Response Steps</h4>
                  <ol className="space-y-2">
                    {firstAidProcedures.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-medium text-elec-yellow mb-2">Electrical Shock Response</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Switch off power source immediately</li>
                      <li>• Do not touch the casualty if still live</li>
                      <li>• Use non-conductive material to separate</li>
                      <li>• Check for breathing and pulse</li>
                      <li>• Begin CPR if trained and necessary</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-medium text-elec-yellow mb-2">Burns Treatment</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Cool with cold running water for 20 minutes</li>
                      <li>• Remove jewellery before swelling</li>
                      <li>• Cover with cling film or clean cloth</li>
                      <li>• Do not apply creams or ointments</li>
                      <li>• Seek medical attention for all electrical burns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Site-Specific Emergency Procedures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">Before Starting Work</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Identify location of nearest emergency exits</li>
                    <li>• Locate fire extinguishers and first aid kits</li>
                    <li>• Establish communication methods with team</li>
                    <li>• Share emergency contact details with all personnel</li>
                    <li>• Identify local emergency services and hospitals</li>
                  </ul>
                </div>
                <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-3">During Emergencies</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Maintain calm and think clearly</li>
                    <li>• Communicate clearly and concisely</li>
                    <li>• Follow established procedures</li>
                    <li>• Account for all team members</li>
                    <li>• Cooperate with emergency services</li>
                  </ul>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Emergency Card
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Procedures
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmergencyProcedures;
