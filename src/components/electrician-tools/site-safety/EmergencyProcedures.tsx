import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, MapPin, FileText, Shield, Printer, Download } from "lucide-react";

const EmergencyProcedures = () => {
  const [activeTab, setActiveTab] = useState("contacts");
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
      <Card className="bg-red-500/10 border border-red-500/30 rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/30">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <CardTitle className="text-red-300 text-lg">Emergency Procedures & Contacts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white">
            Critical emergency procedures and contact information for electrical work sites.
            Ensure all team members are familiar with these procedures before commencing work.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <button
          onClick={() => setActiveTab("contacts")}
          className={`p-4 rounded-xl border text-center transition-all touch-manipulation active:scale-[0.98] ${
            activeTab === "contacts"
              ? "bg-elec-yellow/20 border-elec-yellow/40 ring-1 ring-elec-yellow/30"
              : "bg-[#1e1e1e] border-white/10 hover:border-white/20"
          }`}
        >
          <Phone className={`h-6 w-6 mx-auto mb-2 ${activeTab === "contacts" ? "text-elec-yellow" : "text-white"}`} />
          <h3 className={`font-medium text-sm ${activeTab === "contacts" ? "text-white" : "text-white"}`}>Emergency Contacts</h3>
        </button>

        <button
          onClick={() => setActiveTab("evacuation")}
          className={`p-4 rounded-xl border text-center transition-all touch-manipulation active:scale-[0.98] ${
            activeTab === "evacuation"
              ? "bg-elec-yellow/20 border-elec-yellow/40 ring-1 ring-elec-yellow/30"
              : "bg-[#1e1e1e] border-white/10 hover:border-white/20"
          }`}
        >
          <MapPin className={`h-6 w-6 mx-auto mb-2 ${activeTab === "evacuation" ? "text-elec-yellow" : "text-white"}`} />
          <h3 className={`font-medium text-sm ${activeTab === "evacuation" ? "text-white" : "text-white"}`}>Evacuation</h3>
        </button>

        <button
          onClick={() => setActiveTab("first-aid")}
          className={`p-4 rounded-xl border text-center transition-all touch-manipulation active:scale-[0.98] ${
            activeTab === "first-aid"
              ? "bg-elec-yellow/20 border-elec-yellow/40 ring-1 ring-elec-yellow/30"
              : "bg-[#1e1e1e] border-white/10 hover:border-white/20"
          }`}
        >
          <Shield className={`h-6 w-6 mx-auto mb-2 ${activeTab === "first-aid" ? "text-elec-yellow" : "text-white"}`} />
          <h3 className={`font-medium text-sm ${activeTab === "first-aid" ? "text-white" : "text-white"}`}>First Aid</h3>
        </button>

        <button
          onClick={() => setActiveTab("procedures")}
          className={`p-4 rounded-xl border text-center transition-all touch-manipulation active:scale-[0.98] ${
            activeTab === "procedures"
              ? "bg-elec-yellow/20 border-elec-yellow/40 ring-1 ring-elec-yellow/30"
              : "bg-[#1e1e1e] border-white/10 hover:border-white/20"
          }`}
        >
          <FileText className={`h-6 w-6 mx-auto mb-2 ${activeTab === "procedures" ? "text-elec-yellow" : "text-white"}`} />
          <h3 className={`font-medium text-sm ${activeTab === "procedures" ? "text-white" : "text-white"}`}>Procedures</h3>
        </button>
      </div>

      <div className="w-full">

        {activeTab === "contacts" && (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Phone className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white text-lg">Emergency Contact Numbers</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-elec-yellow/20 border border-elec-yellow/30 rounded-full mb-3">
                        <span className="text-sm font-bold text-elec-yellow">#{index + 1}</span>
                      </div>
                      <h4 className="font-semibold text-white text-base mb-3 group-hover:text-elec-yellow transition-colors">{contact.service}</h4>
                      <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4 mb-3">
                        <span className="text-2xl font-bold text-elec-yellow tracking-wider">{contact.number}</span>
                      </div>
                      <p className="text-sm text-white mb-4">{contact.description}</p>
                      <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 w-full h-11 bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black rounded-xl transition-all duration-200 font-medium text-sm touch-manipulation active:scale-[0.98]">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "evacuation" && (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <MapPin className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white text-lg">Evacuation Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <h4 className="font-medium text-red-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Evacuation Steps
                  </h4>
                  <ol className="space-y-2">
                    {evacuationProcedures.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-left">
                        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm text-white">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
                  <h4 className="font-medium text-elec-yellow mb-2">Important Reminders</h4>
                  <ul className="text-sm space-y-2 text-white leading-relaxed text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Never use lifts during evacuation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Assist those who need help</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Do not re-enter building until given all-clear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Report missing persons immediately</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "first-aid" && (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <CardTitle className="text-white text-lg">First Aid Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <h4 className="font-medium text-green-300 mb-3">First Aid Response Steps</h4>
                  <ol className="space-y-3">
                    {firstAidProcedures.map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-left">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-sm text-white leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                    <h4 className="font-medium text-elec-yellow mb-2">Electrical Shock Response</h4>
                    <ul className="text-sm space-y-2 text-white leading-relaxed text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Switch off power source immediately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Do not touch the casualty if still live</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Use non-conductive material to separate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Check for breathing and pulse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Begin CPR if trained and necessary</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                    <h4 className="font-medium text-elec-yellow mb-2">Burns Treatment</h4>
                    <ul className="text-sm space-y-2 text-white leading-relaxed text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Cool with cold running water for 20 minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Remove jewellery before swelling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Cover with cling film or clean cloth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Do not apply creams or ointments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1">•</span>
                        <span>Seek medical attention for all electrical burns</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "procedures" && (
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white text-lg">Site-Specific Emergency Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                  <h4 className="font-medium text-white mb-3">Before Starting Work</h4>
                  <ul className="text-sm space-y-2 text-white leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Identify location of nearest emergency exits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Locate fire extinguishers and first aid kits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Establish communication methods with team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Share emergency contact details with all personnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Identify local emergency services and hospitals</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                  <h4 className="font-medium text-white mb-3">During Emergencies</h4>
                  <ul className="text-sm space-y-2 text-white leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Maintain calm and think clearly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Communicate clearly and concisely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Follow established procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Account for all team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span>Cooperate with emergency services</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all">
                    <Printer className="h-4 w-4" />
                    Print Emergency Card
                  </button>
                  <button className="flex-1 h-12 flex items-center justify-center gap-2 border border-white/10 bg-[#1a1a1a] text-white hover:bg-white/5 hover:border-white/20 font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all">
                    <Download className="h-4 w-4" />
                    Download Procedures
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmergencyProcedures;
