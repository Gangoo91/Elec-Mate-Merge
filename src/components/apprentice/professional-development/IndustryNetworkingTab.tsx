
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Globe, MessageCircle, Handshake } from "lucide-react";

const IndustryNetworkingTab = () => {
  const professionalBodies = [
    {
      name: "Institution of Engineering and Technology (IET)",
      type: "Professional Institution",
      benefits: ["Chartered Engineer pathway", "Technical resources", "Local networks", "CPD support"],
      membership: "£100-200/year",
      website: "theiet.org",
      description: "Leading professional body for electrical engineers and technicians."
    },
    {
      name: "Electrical Contractors' Association (ECA)",
      type: "Trade Association",
      benefits: ["Business support", "Training programmes", "Industry updates", "Networking events"],
      membership: "Based on turnover",
      website: "eca.co.uk",
      description: "Trade association representing electrical contractors across the UK."
    },
    {
      name: "National Inspection Council for Electrical Installation Contracting (NICEIC)",
      type: "Assessment Body",
      benefits: ["Registration schemes", "Technical support", "Industry events", "Standards updates"],
      membership: "Registration fees apply",
      website: "niceic.com",
      description: "Leading assessment and certification body for electrical contractors."
    },
    {
      name: "JIB (Joint Industry Board)",
      type: "Industry Board",
      benefits: ["Grading cards", "Industry standards", "Training guidance", "Career framework"],
      membership: "Registration required",
      website: "jib.org.uk",
      description: "Sets standards for employment and training in the electrical industry."
    }
  ];

  const networkingEvents = [
    {
      type: "Industry Trade Shows",
      frequency: "Annual",
      examples: ["Electrical Trade Show", "Smart Buildings Show", "Solar & Storage Live"],
      benefits: ["Product knowledge", "Supplier contacts", "Technology trends", "Business opportunities"],
      cost: "£20-100 entry"
    },
    {
      type: "Professional Conferences",
      frequency: "Regular",
      examples: ["IET Technical Conferences", "Electrical Safety Conference", "Smart Cities Summit"],
      benefits: ["Technical learning", "Industry insights", "Professional contacts", "CPD credits"],
      cost: "£100-500"
    },
    {
      type: "Local Branch Meetings",
      frequency: "Monthly",
      examples: ["IET Local Networks", "ECA Regional Groups", "JIB Area Committees"],
      benefits: ["Local connections", "Informal learning", "Mentoring opportunities", "Career advice"],
      cost: "Usually free"
    },
    {
      type: "Training Events",
      frequency: "Ongoing",
      examples: ["Technical Seminars", "Standards Updates", "Safety Briefings"],
      benefits: ["Skills development", "Compliance updates", "Peer learning", "Certificates"],
      cost: "£50-300"
    }
  ];

  const onlineNetworking = [
    {
      platform: "LinkedIn",
      focus: "Professional networking",
      features: ["Industry groups", "Professional profiles", "Job opportunities", "Knowledge sharing"],
      tips: ["Complete profile", "Join electrical groups", "Share industry content", "Connect professionally"]
    },
    {
      platform: "IET Communities",
      focus: "Technical discussions",
      features: ["Technical forums", "Standards discussions", "Career advice", "Expert guidance"],
      tips: ["Ask technical questions", "Share experiences", "Follow industry experts", "Participate actively"]
    },
    {
      platform: "ElectricalForum.co.uk",
      focus: "Practical support",
      features: ["Problem solving", "Advice sharing", "Tool reviews", "Job discussions"],
      tips: ["Help others", "Ask for advice", "Share knowledge", "Build reputation"]
    },
    {
      platform: "Trade Publications",
      focus: "Industry news",
      features: ["Latest standards", "Product launches", "Industry trends", "Company news"],
      tips: ["Subscribe to newsletters", "Follow on social media", "Comment on articles", "Share insights"]
    }
  ];

  const networkingTips = [
    {
      category: "Building Relationships",
      tips: [
        "Be genuine and authentic in your interactions",
        "Listen more than you speak",
        "Offer help and support to others",
        "Follow up after meeting new contacts",
        "Remember personal details about people"
      ]
    },
    {
      category: "Professional Presence",
      tips: [
        "Maintain a complete LinkedIn profile",
        "Share relevant industry content",
        "Write about your experiences",
        "Comment thoughtfully on posts",
        "Use professional photos"
      ]
    },
    {
      category: "Event Networking",
      tips: [
        "Prepare an elevator pitch",
        "Set networking goals for each event",
        "Bring plenty of business cards",
        "Ask open-ended questions",
        "Exchange contact information"
      ]
    },
    {
      category: "Long-term Strategy",
      tips: [
        "Quality over quantity in connections",
        "Regularly engage with your network",
        "Offer value before asking for help",
        "Maintain relationships over time",
        "Be consistent in your networking efforts"
      ]
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
          <div className="space-y-4">
            {professionalBodies.map((body, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{body.name}</h3>
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40 text-xs">
                        {body.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{body.description}</p>
                    <div className="flex items-center gap-4 text-sm text-elec-light/70 mb-3">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {body.website}
                      </span>
                      <span>Membership: {body.membership}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-elec-yellow text-sm mb-2">Member Benefits:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {body.benefits.map((benefit, idx) => (
                      <div key={idx} className="text-xs text-elec-light/80 flex items-center gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                        {benefit}
                      </div>
                    ))}
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
            Networking Events & Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkingEvents.map((event, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-400">{event.type}</h3>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40 text-xs">
                    {event.frequency}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white text-sm mb-1">Examples:</h4>
                    <div className="space-y-1">
                      {event.examples.map((example, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">• {example}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white text-sm mb-1">Benefits:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {event.benefits.map((benefit, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">• {benefit}</p>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-blue-400">Typical cost: {event.cost}</p>
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
            Online Networking Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineNetworking.map((platform, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">{platform.platform}</h3>
                <p className="text-sm text-muted-foreground mb-3">{platform.focus}</p>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="font-medium text-white text-xs mb-1">Features:</h4>
                    <div className="space-y-1">
                      {platform.features.map((feature, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">• {feature}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white text-xs mb-1">Success Tips:</h4>
                    <div className="space-y-1">
                      {platform.tips.map((tip, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">• {tip}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Handshake className="h-5 w-5" />
            Networking Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkingTips.map((section, index) => (
              <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-3">{section.category}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworkingTab;
