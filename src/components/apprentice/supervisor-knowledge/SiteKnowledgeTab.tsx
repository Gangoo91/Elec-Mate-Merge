
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <HardHat className="h-6 w-6 text-elec-yellow" />
            </div>
            <CardTitle className="text-2xl text-white">Site Knowledge & Procedures</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            Essential knowledge for navigating construction sites, understanding protocols,
            and working effectively within site hierarchies and procedures.
          </p>
        </CardContent>
      </Card>

      {/* Site Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {siteTopics.map((topic, index) => (
          <Card key={index} className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 hover:border-white/20 transition-all overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${topic.color.replace('bg-', 'bg-gradient-to-br from-').replace('/20', '/20 to-').replace('text-', '')} border ${topic.color.replace('bg-', 'border-').replace('/20', '/30')}`}>
                  <topic.icon className={`h-5 w-5 ${topic.color.split(' ')[1]}`} />
                </div>
                <CardTitle className="text-white">{topic.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-2.5">
                {topic.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-white/60 flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Site Scenarios */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <MapPin className="h-5 w-5 text-blue-400" />
            </div>
            Common Site Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {siteScenarios.map((scenario, index) => {
              const UrgencyIcon = getUrgencyIcon(scenario.urgency);
              return (
                <div key={index} className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${scenario.urgency === 'high' ? 'bg-red-500/20' : scenario.urgency === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                      <UrgencyIcon className={`h-4 w-4 ${scenario.urgency === 'high' ? 'text-red-400' : scenario.urgency === 'medium' ? 'text-yellow-400' : 'text-green-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h4 className="font-semibold text-white">{scenario.scenario}</h4>
                        <Badge className={getUrgencyColor(scenario.urgency)} variant="outline">
                          {scenario.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/70">{scenario.guidance}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Who to Contact */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
              <Phone className="h-5 w-5 text-green-400" />
            </div>
            Who to Contact & When
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteContacts.map((contact, index) => (
              <div key={index} className="p-5 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
                <h4 className="font-semibold text-white mb-3">{contact.role}</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-green-400 uppercase tracking-wide">When:</span>
                    <p className="text-sm text-white/70 mt-1">{contact.when}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Approach:</span>
                    <p className="text-sm text-white/70 mt-1">{contact.approach}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteKnowledgeTab;
