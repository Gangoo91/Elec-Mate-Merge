
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Users, Calendar, MapPin, ExternalLink, Star, Zap, Heart, Building } from "lucide-react";

const IndustryNetworking = () => {
  const quickStats = [
    { label: "Key Organisations", value: "4", icon: Building, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Networking Tips", value: "4", icon: Users, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "Event Types", value: "3+", icon: Calendar, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" },
    { label: "Career Impact", value: "High", icon: Star, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" }
  ];

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
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-purple-500/20 rounded-2xl mb-4">
          <Users className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Industry Networking
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Build connections and advance your career through professional networks. Your network is your net worth in this industry.
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Networking Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {networkingOpportunities.map((org, index) => (
          <Card key={index} className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:border-blue-500/40 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-white">{org.title}</CardTitle>
                  <span className="text-sm text-blue-400">{org.type}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white">{org.description}</p>
              <div>
                <h4 className="font-semibold mb-2 text-white">Key Benefits:</h4>
                <ul className="space-y-1">
                  {org.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-sm text-white">{org.website}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Networking Tips */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Zap className="h-5 w-5" />
            Networking Tips for Apprentices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkingTips.map((tip, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-elec-yellow/30 transition-all">
                <h3 className="font-semibold mb-2 text-elec-yellow">{tip.title}</h3>
                <p className="text-sm text-white">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Calendar className="h-5 w-5" />
            Upcoming Industry Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white mb-4">
            Check these websites regularly for upcoming events, training sessions, and networking opportunities:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
              <MapPin className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-white">Electrical Trade Shows & Exhibitions</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-white">Local ECA Branch Meetings</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-white">IET Technical Talks and Seminars</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Card */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Building Your Network
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white leading-relaxed">
            Networking isn't just about finding jobs - it's about building relationships that support your entire career. The connections you make as an apprentice can become lifelong professional relationships and friendships.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { text: "Be genuine", icon: Heart },
              { text: "Give before you take", icon: Users },
              { text: "Stay in touch", icon: Calendar }
            ].map((tip, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                <tip.icon className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">{tip.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworking;
