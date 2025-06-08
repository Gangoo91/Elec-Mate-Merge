
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HardHat, FileText, Users, Clock, MapPin, Phone, AlertTriangle, CheckCircle } from "lucide-react";

const SiteKnowledgeTab = () => {
  const siteTopics = [
    {
      title: "Site Induction & Setup",
      icon: HardHat,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      items: [
        "What to expect in your first week on site",
        "Essential documents and certifications to bring",
        "Site-specific safety procedures and emergency contacts",
        "Welfare facilities location and usage protocols",
        "Tool storage and security arrangements"
      ]
    },
    {
      title: "Daily Site Routine",
      icon: Clock,
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      items: [
        "Morning briefing procedures and toolbox talks",
        "Work allocation and task prioritisation",
        "Progress reporting and time recording",
        "Material ordering and waste management",
        "End-of-day procedures and site security"
      ]
    },
    {
      title: "Site Hierarchy & Communication",
      icon: Users,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      items: [
        "Understanding the chain of command on site",
        "When to approach different levels of management",
        "Formal vs informal communication channels",
        "Inter-trade coordination and cooperation",
        "Client interaction protocols and boundaries"
      ]
    },
    {
      title: "Documentation & Paperwork",
      icon: FileText,
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      items: [
        "Daily worksheets and time recording",
        "Material requisition and delivery notes",
        "Test certificates and completion records",
        "Variation orders and additional work",
        "Health and safety documentation requirements"
      ]
    }
  ];

  const siteScenarios = [
    {
      scenario: "You arrive on a new construction site for the first time",
      guidance: "Report to the main office, present your CSCS card and any required certifications, attend the mandatory site induction, collect PPE if needed, and get introduced to your supervisor and immediate team.",
      urgency: "standard"
    },
    {
      scenario: "You notice another trade has damaged your cable run",
      guidance: "Document the damage with photos, inform your supervisor immediately, don't attempt repairs without authorisation, and complete an incident report if required.",
      urgency: "high"
    },
    {
      scenario: "Client asks you to do additional work not on the original plan",
      guidance: "Politely explain you need supervisor approval, don't commit to timeframes or costs, document the request, and refer them to your supervisor or project manager.",
      urgency: "medium"
    },
    {
      scenario: "Weather conditions make outdoor work unsafe",
      guidance: "Stop work immediately if conditions are dangerous, inform your supervisor, seek alternative indoor tasks if available, and never risk safety for project deadlines.",
      urgency: "high"
    }
  ];

  const siteContacts = [
    {
      role: "Site Manager",
      when: "Overall site issues, major problems, disputes between trades",
      approach: "Formal appointment, document issues beforehand"
    },
    {
      role: "Electrical Supervisor",
      when: "Technical questions, work allocation, electrical safety concerns",
      approach: "Direct communication, daily check-ins encouraged"
    },
    {
      role: "Health & Safety Officer",
      when: "Safety incidents, PPE issues, hazard reporting",
      approach: "Immediate contact for urgent safety matters"
    },
    {
      role: "Stores/Materials",
      when: "Material shortages, tool requirements, deliveries",
      approach: "Follow requisition procedures, advance notice preferred"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "high": return AlertTriangle;
      case "medium": return Clock;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Site Knowledge & Procedures</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Essential knowledge for navigating construction sites, understanding protocols, 
            and working effectively within site hierarchies and procedures.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {siteTopics.map((topic, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <topic.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle className="text-white">{topic.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Common Site Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {siteScenarios.map((scenario, index) => {
              const UrgencyIcon = getUrgencyIcon(scenario.urgency);
              return (
                <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <UrgencyIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-white text-sm">{scenario.scenario}</h4>
                        <Badge className={getUrgencyColor(scenario.urgency)} variant="outline">
                          {scenario.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-300">{scenario.guidance}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Who to Contact & When
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteContacts.map((contact, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{contact.role}</h4>
                <p className="text-sm text-green-300 mb-2">
                  <strong>When:</strong> {contact.when}
                </p>
                <p className="text-sm text-green-300">
                  <strong>Approach:</strong> {contact.approach}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteKnowledgeTab;
