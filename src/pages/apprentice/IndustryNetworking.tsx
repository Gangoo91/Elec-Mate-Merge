
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Globe, Building, Award, Coffee, Handshake } from "lucide-react";

const IndustryNetworking = () => {
  const networkingOpportunities = [
    {
      title: "Trade Association Events",
      description: "Connect with professionals through industry body events",
      examples: ["ECA networking evenings", "NICEIC regional meetings", "SELECT member events", "NAPIT conferences"],
      benefits: ["Industry contacts", "Business opportunities", "Professional recognition", "Technical updates"],
      frequency: "Monthly/Quarterly",
      icon: <Building className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Training Course Networking",
      description: "Meet peers during professional development courses",
      examples: ["18th Edition courses", "Inspection & Testing training", "Manufacturer workshops", "Safety seminars"],
      benefits: ["Peer learning", "Experience sharing", "Course collaboration", "Ongoing contacts"],
      frequency: "Regular",
      icon: <Award className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Industry Exhibitions",
      description: "Major trade shows and exhibitions for electrical professionals",
      examples: ["Electrical Wholesaler Show", "Electrotechnical Trade Show", "Smart Buildings Expo", "Energy Storage Show"],
      benefits: ["Product knowledge", "Supplier contacts", "Market trends", "Technology updates"],
      frequency: "Annual",
      icon: <Calendar className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Local Electrical Groups",
      description: "Regional electrical contractor and tradesperson meetups",
      examples: ["Local contractor associations", "JIB branch meetings", "Electrical safety groups", "Business networks"],
      benefits: ["Local connections", "Job opportunities", "Referral networks", "Community support"],
      frequency: "Monthly",
      icon: <MapPin className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Online Communities",
      description: "Digital platforms for electrical professionals",
      examples: ["LinkedIn electrical groups", "ElectriciansForums", "Reddit electrical communities", "Trade WhatsApp groups"],
      benefits: ["24/7 access", "Global connections", "Quick advice", "Knowledge sharing"],
      frequency: "Daily",
      icon: <Globe className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Mentorship Programmes",
      description: "Formal and informal mentoring relationships",
      examples: ["ECA mentorship scheme", "Company mentor programmes", "Peer mentoring", "Industry buddy systems"],
      benefits: ["Career guidance", "Skill development", "Professional growth", "Industry insights"],
      frequency: "Ongoing",
      icon: <Handshake className="h-6 w-6 text-elec-yellow" />
    }
  ];

  const keyAssociations = [
    {
      name: "Electrical Contractors' Association (ECA)",
      focus: "Trade association for electrical contractors",
      benefits: ["Business support", "Technical guidance", "Networking events", "Training courses"],
      website: "eca.co.uk"
    },
    {
      name: "SELECT (Scotland)",
      focus: "Scottish electrical trade association",
      benefits: ["Regional networking", "Scottish industry focus", "Technical support", "Business development"],
      website: "select.org.uk"
    },
    {
      name: "Institution of Engineering and Technology (IET)",
      focus: "Professional engineering institution",
      benefits: ["Professional development", "Technical resources", "Career progression", "Global network"],
      website: "theiet.org"
    },
    {
      name: "Joint Industry Board (JIB)",
      focus: "Electrical industry employment standards",
      benefits: ["Skills recognition", "Training standards", "Industry representation", "Safety protocols"],
      website: "jib.org.uk"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Industry Networking</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Build professional relationships and expand your career opportunities through industry networking and professional associations.
        </p>
        <BackButton customUrl="/apprentice/professional-development" label="Back to Professional Development" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {networkingOpportunities.map((opportunity, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-3">
                {opportunity.icon}
                <div className="flex-1">
                  <CardTitle className="text-lg text-elec-yellow">{opportunity.title}</CardTitle>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs mt-1">
                    {opportunity.frequency}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{opportunity.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {opportunity.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {opportunity.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-elec-yellow">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Key Industry Associations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyAssociations.map((association, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{association.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{association.focus}</p>
                <div className="space-y-1 mb-3">
                  {association.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-elec-yellow">•</span>
                      {benefit}
                    </div>
                  ))}
                </div>
                <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                  {association.website}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Networking Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Before Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Research attendees and speakers</li>
                <li>• Prepare your introduction</li>
                <li>• Set networking goals</li>
                <li>• Bring business cards</li>
                <li>• Plan conversation starters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">During Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be genuine and interested</li>
                <li>• Ask open-ended questions</li>
                <li>• Listen actively</li>
                <li>• Exchange contact information</li>
                <li>• Take notes after conversations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">After Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Follow up within 48 hours</li>
                <li>• Connect on LinkedIn</li>
                <li>• Share relevant resources</li>
                <li>• Arrange follow-up meetings</li>
                <li>• Maintain regular contact</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Building Your Professional Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Online Presence:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Professional LinkedIn profile</li>
                <li>• Industry forum participation</li>
                <li>• Share knowledge and insights</li>
                <li>• Showcase completed projects</li>
                <li>• Engage with industry content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Reputation Building:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Deliver quality work consistently</li>
                <li>• Be reliable and professional</li>
                <li>• Help other professionals</li>
                <li>• Stay updated with industry trends</li>
                <li>• Participate in community projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworking;
