
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Globe, Building, Award, MessageCircle, Briefcase, GraduationCap, Zap } from "lucide-react";

const IndustryNetworkingTab = () => {
  const professionalBodies = [
    {
      name: "Institution of Engineering and Technology (IET)",
      type: "Professional Institution",
      description: "The world's largest engineering institution for electrical professionals.",
      benefits: ["Professional registration", "Technical resources", "Career guidance", "Global network"],
      membership: "£200-400/year",
      website: "theiet.org",
      icon: Award,
      location: "National/International"
    },
    {
      name: "Electrical Contractors' Association (ECA)",
      type: "Trade Association",
      description: "UK's leading trade association for electrical contractors.",
      benefits: ["Industry representation", "Business support", "Training courses", "Networking events"],
      membership: "£300-800/year",
      website: "eca.co.uk",
      icon: Building,
      location: "National"
    },
    {
      name: "National Inspection Council for Electrical Installation Contracting (NICEIC)",
      type: "Regulatory Body",
      description: "Leading certification body for electrical contractors.",
      benefits: ["Industry recognition", "Customer trust", "Technical support", "Business development"],
      membership: "£500-1500/year",
      website: "niceic.com",
      icon: Award,
      location: "National"
    },
    {
      name: "National Association of Professional Inspectors and Testers (NAPIT)",
      type: "Certification Body",
      description: "Competent person scheme operator for electrical work.",
      benefits: ["Certification schemes", "Training courses", "Technical helpline", "Networking"],
      membership: "£400-1200/year",
      website: "napit.org.uk",
      icon: Award,
      location: "National"
    },
    {
      name: "Renewable Energy Association (REA)",
      type: "Trade Association",
      description: "UK's largest trade association for renewable energy.",
      benefits: ["Industry insights", "Policy updates", "Business opportunities", "Green technology focus"],
      membership: "£500-2000/year",
      website: "r-e-a.net",
      icon: Zap,
      location: "National"
    },
    {
      name: "Society of Operations Engineers (SOE)",
      type: "Professional Society",
      description: "Professional body for engineers in transport and related industries.",
      benefits: ["Professional development", "Technical publications", "Career support", "Industry connections"],
      membership: "£150-300/year",
      website: "soe.org.uk",
      icon: GraduationCap,
      location: "National"
    }
  ];

  const networkingEvents = [
    {
      name: "Electrical Industry Awards",
      type: "Annual Awards",
      description: "Premier awards ceremony celebrating excellence in the electrical industry.",
      frequency: "Annual",
      location: "London",
      cost: "£100-500",
      audience: "Industry professionals",
      benefits: ["Industry recognition", "Networking", "Business opportunities"]
    },
    {
      name: "IET Local Networks",
      type: "Regional Meetings",
      description: "Regular local meetings and technical presentations.",
      frequency: "Monthly",
      location: "Various UK locations",
      cost: "Free for members",
      audience: "Engineers and technicians",
      benefits: ["Technical learning", "Local networking", "Career development"]
    },
    {
      name: "ECA Regional Events",
      type: "Trade Events",
      description: "Regional business networking and industry updates.",
      frequency: "Quarterly",
      location: "Regional centres",
      cost: "£50-200",
      audience: "Electrical contractors",
      benefits: ["Business networking", "Industry updates", "Training opportunities"]
    },
    {
      name: "ElecTech Live",
      type: "Trade Exhibition",
      description: "Technology showcase and learning event.",
      frequency: "Annual",
      location: "Various venues",
      cost: "£200-800",
      audience: "Electrical professionals",
      benefits: ["Product launches", "Technical seminars", "Supplier meetings"]
    },
    {
      name: "Renewable Energy World Conference",
      type: "Industry Conference",
      description: "Leading renewable energy conference and exhibition.",
      frequency: "Annual",
      location: "Birmingham/London",
      cost: "£500-1500",
      audience: "Renewable energy professionals",
      benefits: ["Market insights", "Technology updates", "Business development"]
    },
    {
      name: "Smart Buildings Show",
      type: "Technology Exhibition",
      description: "Future of intelligent buildings and IoT systems.",
      frequency: "Annual",
      location: "London",
      cost: "£300-1000",
      audience: "Building services engineers",
      benefits: ["Future technologies", "Innovation showcase", "Market trends"]
    }
  ];

  const onlineNetworking = [
    {
      platform: "LinkedIn Electrical Groups",
      type: "Professional Social Media",
      description: "Various electrical industry groups and discussions.",
      members: "50k+ members",
      cost: "Free",
      benefits: ["Job opportunities", "Industry discussions", "Knowledge sharing", "Professional connections"]
    },
    {
      platform: "ElectriciansForums.net",
      type: "Industry Forum",
      description: "UK's largest electrical forum community.",
      members: "100k+ members",
      cost: "Free",
      benefits: ["Technical advice", "Peer support", "Industry news", "Problem solving"]
    },
    {
      platform: "IET Communities",
      type: "Professional Platform",
      description: "IET's online community for members.",
      members: "20k+ members",
      cost: "Membership required",
      benefits: ["Expert knowledge", "Standards discussions", "Career advice", "Technical resources"]
    },
    {
      platform: "ECA Connect",
      type: "Trade Platform",
      description: "ECA's member networking platform.",
      members: "5k+ members",
      cost: "Membership required",
      benefits: ["Business networking", "Contract opportunities", "Industry updates", "Supplier connections"]
    },
    {
      platform: "Electrical Review Online",
      type: "Industry Portal",
      description: "News, discussions, and networking for electrical professionals.",
      members: "30k+ readers",
      cost: "Free",
      benefits: ["Industry news", "Technical articles", "Product reviews", "Expert opinions"]
    },
    {
      platform: "Facebook Electrical Groups",
      type: "Social Networking",
      description: "Various UK electrical trade groups.",
      members: "Variable",
      cost: "Free",
      benefits: ["Informal networking", "Quick advice", "Local connections", "Industry banter"]
    }
  ];

  const mentorshipPrograms = [
    {
      program: "IET Mentor Scheme",
      provider: "Institution of Engineering and Technology",
      description: "Structured mentoring for engineering professionals.",
      duration: "12 months",
      cost: "Free for members",
      benefits: ["Career guidance", "Professional development", "Industry insights", "Goal setting"]
    },
    {
      program: "ECA Apprentice Mentoring",
      provider: "Electrical Contractors' Association",
      description: "Support for apprentices and new entrants.",
      duration: "Flexible",
      cost: "Free",
      benefits: ["Trade knowledge", "Career advice", "Business skills", "Network building"]
    },
    {
      program: "Women in Engineering Mentoring",
      provider: "Various organisations",
      description: "Supporting women in electrical engineering careers.",
      duration: "6-12 months",
      cost: "Usually free",
      benefits: ["Gender-specific support", "Role models", "Career progression", "Confidence building"]
    },
    {
      program: "Local Authority Mentoring",
      provider: "Local councils",
      description: "Business mentoring for new electrical contractors.",
      duration: "6-12 months",
      cost: "Often subsidised",
      benefits: ["Business skills", "Local market knowledge", "Compliance guidance", "Growth strategies"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Users className="h-5 w-5" />
            Professional Bodies & Associations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {professionalBodies.map((body, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <body.icon className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{body.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-blue-500/40 text-blue-400 text-xs">
                        {body.type}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                        {body.membership}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{body.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-elec-yellow text-sm mb-1">Benefits:</h4>
                    <ul className="space-y-1">
                      {body.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-elec-light/80 flex items-center gap-2">
                          <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-elec-light/70">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {body.website}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {body.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Industry Events & Conferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkingEvents.map((event, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-blue-400">{event.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="border-blue-500/40 text-blue-400 text-xs">
                        {event.type}
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40 text-xs">
                        {event.frequency}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-green-400 font-medium">{event.cost}</div>
                    <div className="text-muted-foreground text-xs">{event.location}</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-400 text-sm mb-1">Target Audience:</h4>
                    <p className="text-xs text-muted-foreground">{event.audience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400 text-sm mb-1">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {event.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Online Communities & Forums
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineNetworking.map((platform, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-400">{platform.platform}</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                    {platform.cost}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <Badge variant="outline" className="border-green-500/40 text-green-400 text-xs">
                    {platform.type}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{platform.description}</p>
                  <p className="text-xs text-green-400 font-medium">{platform.members}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-green-400 text-sm mb-1">Benefits:</h4>
                  <ul className="space-y-1">
                    {platform.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Mentorship Programs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentorshipPrograms.map((program, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-purple-400">{program.program}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{program.provider}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40 text-xs mb-1">
                      {program.duration}
                    </Badge>
                    <div className="text-xs text-green-400">{program.cost}</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                
                <div>
                  <h4 className="font-medium text-purple-400 text-sm mb-1">Program Benefits:</h4>
                  <ul className="grid grid-cols-2 gap-1">
                    {program.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400">Networking Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <h3 className="font-semibold mb-2 text-orange-400">Start Local</h3>
              <p className="text-sm text-muted-foreground">
                Join local IET networks and ECA regional groups to build connections in your area.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <h3 className="font-semibold mb-2 text-orange-400">Go Digital</h3>
              <p className="text-sm text-muted-foreground">
                Engage in online forums and LinkedIn groups to expand your network beyond geographical limits.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <h3 className="font-semibold mb-2 text-orange-400">Attend Events</h3>
              <p className="text-sm text-muted-foreground">
                Plan to attend at least 2-3 industry events per year to meet new contacts and learn about trends.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworkingTab;
