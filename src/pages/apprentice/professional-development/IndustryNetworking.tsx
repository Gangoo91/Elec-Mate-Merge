
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const IndustryNetworking = () => {
  const networkingOpportunities = [
    {
      title: "ECA (Electrical Contractors' Association)",
      type: "Trade Association",
      description: "UK's leading trade association for electrical contractors",
      benefits: ["Industry updates", "Training opportunities", "Business support", "Networking events"],
      website: "www.eca.co.uk"
    },
    {
      title: "IET (Institution of Engineering and Technology)",
      type: "Professional Body",
      description: "Professional body for electrical and electronic engineers",
      benefits: ["Professional recognition", "CPD tracking", "Technical resources", "Local events"],
      website: "www.theiet.org"
    },
    {
      title: "JIB (Joint Industry Board)",
      type: "Industry Standards",
      description: "Sets standards for the electrical contracting industry",
      benefits: ["Grading cards", "Industry standards", "Career progression", "Training routes"],
      website: "www.jib.org.uk"
    },
    {
      title: "Local Electrical Groups",
      type: "Regional Networks",
      description: "Regional and local electrical contractor groups",
      benefits: ["Local connections", "Job opportunities", "Knowledge sharing", "Support network"],
      website: "Various locations"
    }
  ];

  const networkingTips = [
    {
      title: "Attend Industry Events",
      description: "Trade shows, conferences, and training events are great for meeting professionals"
    },
    {
      title: "Join Online Communities",
      description: "LinkedIn groups, forums, and social media electrical communities"
    },
    {
      title: "Volunteer for Projects",
      description: "Charity work and community projects build connections and reputation"
    },
    {
      title: "Maintain Relationships",
      description: "Follow up with contacts and nurture professional relationships over time"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Industry Networking</h1>
          <p className="text-muted-foreground">Build connections and advance your career through professional networks</p>
        </div>
        <Link to="/apprentice/professional-development" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professional Development
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {networkingOpportunities.map((org, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{org.title}</CardTitle>
                  <span className="text-sm text-elec-yellow">{org.type}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-elec-light/50" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{org.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {org.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-elec-light/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-elec-yellow/20">
                <p className="text-sm text-elec-light/60">{org.website}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Networking Tips for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkingTips.map((tip, index) => (
              <div key={index} className="p-4 rounded-lg bg-elec-dark/30">
                <h3 className="font-semibold mb-2 text-elec-yellow">{tip.title}</h3>
                <p className="text-sm text-elec-light/80">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Upcoming Industry Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-elec-light/80 mb-4">
            Check these websites regularly for upcoming events, training sessions, and networking opportunities:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">Electrical Trade Shows & Exhibitions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">Local ECA Branch Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">IET Technical Talks and Seminars</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworking;
