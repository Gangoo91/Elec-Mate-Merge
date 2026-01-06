
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Phone, Globe, Mail, ChevronDown, ChevronUp, Sparkles, Search, ExternalLink } from "lucide-react";

const regionalData = {
  "England": {
    color: "blue",
    funding: [
      { name: "Advanced Learner Loans", description: "Available for Level 4-6 qualifications", amount: "Full course fees" },
      { name: "Skills Development Fund", description: "For emerging technologies", amount: "Up to £1,000" },
      { name: "Adult Education Budget", description: "Local authority funding", amount: "Varies by region" }
    ],
    providers: [
      { name: "City & Guilds", type: "Awarding Body", specialties: ["Electrical qualifications", "Professional development"] },
      { name: "EAL", type: "Awarding Body", specialties: ["Electrical Installation", "Maintenance"] },
      { name: "Local FE Colleges", type: "Education Provider", specialties: ["HNC/HND", "Part-time study"] }
    ],
    contacts: [
      { name: "National Careers Service", phone: "0800 100 900", website: "nationalcareers.service.gov.uk" },
      { name: "Adult Education Budget", email: "aeb.info@education.gov.uk", website: "gov.uk/adult-education-budget" }
    ]
  },
  "Scotland": {
    color: "purple",
    funding: [
      { name: "Student Awards Agency Scotland", description: "Higher education funding", amount: "Full fees + bursary" },
      { name: "Individual Learning Account", description: "Skills development", amount: "Up to £500" },
      { name: "Flexible Workforce Development Fund", description: "Employer-led training", amount: "Up to £15,000" }
    ],
    providers: [
      { name: "SQA", type: "Awarding Body", specialties: ["Scottish qualifications", "SVQs"] },
      { name: "Skills Development Scotland", type: "Government Agency", specialties: ["Career guidance", "Funding advice"] },
      { name: "Scottish Colleges", type: "Education Provider", specialties: ["HNC/HND", "Professional courses"] }
    ],
    contacts: [
      { name: "Skills Development Scotland", phone: "0800 917 8000", website: "skillsdevelopmentscotland.co.uk" },
      { name: "Student Awards Agency", phone: "0300 555 0505", website: "saas.gov.uk" }
    ]
  },
  "Wales": {
    color: "green",
    funding: [
      { name: "Student Finance Wales", description: "Higher education support", amount: "Tuition fees + grants" },
      { name: "Working Wales", description: "Skills and employment support", amount: "Free training courses" },
      { name: "ReAct Programme", description: "Redundancy support", amount: "Up to £1,500" }
    ],
    providers: [
      { name: "Qualifications Wales", type: "Regulator", specialties: ["Welsh qualifications framework"] },
      { name: "Coleg Cymru", type: "College Network", specialties: ["Further education", "Skills training"] },
      { name: "University of South Wales", type: "University", specialties: ["Engineering degrees", "Part-time study"] }
    ],
    contacts: [
      { name: "Careers Wales", phone: "0800 028 4844", website: "careerswales.gov.uk" },
      { name: "Student Finance Wales", phone: "0300 200 4050", website: "studentfinancewales.co.uk" }
    ]
  },
  "Northern Ireland": {
    color: "orange",
    funding: [
      { name: "Student Finance NI", description: "Higher education funding", amount: "Tuition fees + maintenance" },
      { name: "Skills Focus", description: "Adult skills training", amount: "Free Level 2-3 courses" },
      { name: "Department for Economy Funding", description: "Professional development", amount: "Varies" }
    ],
    providers: [
      { name: "CCEA", type: "Awarding Body", specialties: ["Northern Ireland qualifications"] },
      { name: "Further Education Colleges", type: "Education Provider", specialties: ["Technical education", "Part-time courses"] },
      { name: "Ulster University", type: "University", specialties: ["Engineering", "Technology"] }
    ],
    contacts: [
      { name: "NI Direct", phone: "0300 200 7832", website: "nidirect.gov.uk" },
      { name: "Student Finance NI", phone: "0300 100 0077", website: "studentfinanceni.co.uk" }
    ]
  }
};

const specialistCentres = [
  {
    name: "NICEIC Training",
    locations: ["Multiple UK locations"],
    specialties: ["Electrical safety", "Renewable energy", "EV charging"],
    contact: "0333 015 6626",
    website: "niceic.com/training"
  },
  {
    name: "NAPIT",
    locations: ["Multiple UK locations"],
    specialties: ["Electrical competency", "Gas safety", "Renewable technology"],
    contact: "0345 543 0330",
    website: "napit.org.uk/training"
  },
  {
    name: "City & Guilds Centres",
    locations: ["Nationwide"],
    specialties: ["Electrical qualifications", "Professional development"],
    contact: "0844 543 0000",
    website: "cityandguilds.com"
  },
  {
    name: "JTL Training",
    locations: ["England & Wales"],
    specialties: ["Electrical apprenticeships", "Adult training"],
    contact: "0800 085 2308",
    website: "jtltraining.com"
  }
];

const colorMap: Record<string, { border: string; bg: string; icon: string; iconBg: string; badge: string; glow: string }> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-gradient-to-br from-elec-gray to-blue-950/20",
    icon: "text-blue-400",
    iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    glow: "bg-blue-500/5"
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-gradient-to-br from-elec-gray to-purple-950/20",
    icon: "text-purple-400",
    iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    glow: "bg-purple-500/5"
  },
  green: {
    border: "border-green-500/30",
    bg: "bg-gradient-to-br from-elec-gray to-green-950/20",
    icon: "text-green-400",
    iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
    badge: "bg-green-500/10 text-green-400 border-green-500/30",
    glow: "bg-green-500/5"
  },
  orange: {
    border: "border-orange-500/30",
    bg: "bg-gradient-to-br from-elec-gray to-orange-950/20",
    icon: "text-orange-400",
    iconBg: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    glow: "bg-orange-500/5"
  }
};

const RegionalInformation = () => {
  const [expandedRegion, setExpandedRegion] = useState<string | null>("England");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <MapPin className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Regional Information & Support</h3>
            <p className="text-sm text-white/70">
              Find funding options, providers, and contact information specific to your region across the UK
            </p>
          </div>
        </div>
      </div>

      {/* Regional Cards */}
      <div className="space-y-3">
        {Object.entries(regionalData).map(([region, data]) => {
          const colors = colorMap[data.color];
          const isExpanded = expandedRegion === region;

          return (
            <Card
              key={region}
              className={`${colors.bg} ${colors.border} border overflow-hidden relative transition-all`}
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${colors.glow} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />

              {/* Header - Always visible */}
              <CardHeader
                className="relative cursor-pointer"
                onClick={() => setExpandedRegion(isExpanded ? null : region)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${colors.iconBg}`}>
                      <MapPin className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{region}</CardTitle>
                      <p className="text-xs text-white/60 mt-0.5">{data.funding.length} funding options • {data.providers.length} providers</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className={`${colors.icon}`}>
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                </div>
              </CardHeader>

              {/* Expanded Content */}
              {isExpanded && (
                <CardContent className="space-y-5 relative pt-0 animate-fade-in">
                  {/* Funding */}
                  <div>
                    <h4 className={`font-semibold ${colors.icon} mb-3 text-sm flex items-center gap-2`}>
                      <Sparkles className="h-4 w-4" />
                      Available Funding
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {data.funding.map((fund, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <h5 className="font-medium text-white text-sm mb-1">{fund.name}</h5>
                          <p className="text-xs text-white/60 mb-2">{fund.description}</p>
                          <Badge className={`text-[10px] ${colors.badge}`}>{fund.amount}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Providers */}
                  <div>
                    <h4 className={`font-semibold ${colors.icon} mb-3 text-sm flex items-center gap-2`}>
                      <Building className="h-4 w-4" />
                      Education Providers
                    </h4>
                    <div className="space-y-2">
                      {data.providers.map((provider, idx) => (
                        <div key={idx} className="flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-white text-sm">{provider.name}</h5>
                              <Badge variant="outline" className="text-[10px] bg-white/5 text-white/60 border-white/20">
                                {provider.type}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {provider.specialties.map((specialty, specIdx) => (
                                <Badge key={specIdx} className={`text-[10px] ${colors.badge}`}>
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacts */}
                  <div>
                    <h4 className={`font-semibold ${colors.icon} mb-3 text-sm flex items-center gap-2`}>
                      <Phone className="h-4 w-4" />
                      Key Contacts
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {data.contacts.map((contact, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <h5 className="font-medium text-white text-sm mb-2">{contact.name}</h5>
                          <div className="space-y-1.5 text-xs">
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-white/70">
                                <Phone className={`h-3 w-3 ${colors.icon}`} />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                            {contact.email && (
                              <div className="flex items-center gap-2 text-white/70">
                                <Mail className={`h-3 w-3 ${colors.icon}`} />
                                <span>{contact.email}</span>
                              </div>
                            )}
                            {contact.website && (
                              <div className="flex items-center gap-2 text-white/70">
                                <Globe className={`h-3 w-3 ${colors.icon}`} />
                                <span>{contact.website}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* UK-Wide Specialist Centres */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Building className="h-5 w-5 text-elec-yellow" />
            </div>
            UK-Wide Specialist Training Centres
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialistCentres.map((centre, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-elec-yellow/30 transition-all">
                <h4 className="font-semibold text-white mb-3">{centre.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                    <span>{centre.locations.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Phone className="h-4 w-4 text-elec-yellow" />
                    <span>{centre.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Globe className="h-4 w-4 text-elec-yellow" />
                    <span>{centre.website}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {centre.specialties.map((specialty, specIdx) => (
                      <Badge key={specIdx} className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/30 text-[10px]">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Local Resources Finder */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-500/20">
            <Search className="h-5 w-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-green-400 mb-1">Find Local Resources</p>
            <p className="text-sm text-white/70 mb-4">
              Use these tools to find education providers and funding opportunities in your specific area
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button variant="outline" className="h-11 border-green-500/30 text-green-400 hover:bg-green-500/10 touch-manipulation active:scale-95 transition-all">
                <Search className="h-4 w-4 mr-2" />
                Find Courses
              </Button>
              <Button variant="outline" className="h-11 border-green-500/30 text-green-400 hover:bg-green-500/10 touch-manipulation active:scale-95 transition-all">
                <Building className="h-4 w-4 mr-2" />
                Locate Colleges
              </Button>
              <Button variant="outline" className="h-11 border-green-500/30 text-green-400 hover:bg-green-500/10 touch-manipulation active:scale-95 transition-all">
                <ExternalLink className="h-4 w-4 mr-2" />
                Find Advisors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalInformation;
