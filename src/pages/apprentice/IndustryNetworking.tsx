
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Globe, Building, Award, Coffee, Handshake, MessageSquare, Briefcase, GraduationCap, Zap } from "lucide-react";

const IndustryNetworking = () => {
  const networkingOpportunities = [
    {
      title: "Trade Association Events & Conferences",
      description: "Connect with industry professionals through established electrical trade bodies and their regional events",
      examples: [
        "ECA Annual Conference and Exhibition", 
        "NICEIC regional contractor meetings",
        "SELECT Annual Dinner and networking events",
        "NAPIT member breakfast seminars",
        "JIB regional branch meetings",
        "IET electrical industry networking events"
      ],
      benefits: ["Access to industry leaders", "Policy and regulation updates", "Business development opportunities", "Technical knowledge sharing", "Contract and partnership opportunities"],
      frequency: "Monthly/Quarterly regional, Annual national",
      bestFor: "Established electricians and contractors",
      icon: <Building className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Professional Development Training",
      description: "Build relationships with peers whilst gaining qualifications and updating skills",
      examples: [
        "18th Edition group training courses",
        "Inspection & Testing (2391) workshops", 
        "Manufacturer training programmes",
        "Health & safety refresher courses",
        "CPD seminars and technical updates",
        "New technology demonstration events"
      ],
      benefits: ["Peer learning and knowledge exchange", "Course collaboration and study groups", "Ongoing professional contacts", "Shared learning experiences", "Industry best practice sharing"],
      frequency: "Regular throughout the year",
      bestFor: "All levels of electrical professionals",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Electrical Industry Exhibitions",
      description: "Major trade shows featuring the latest electrical products, technologies, and industry innovations",
      examples: [
        "Electrical Wholesaler Show (Coventry)",
        "Electrotechnical Trade Show", 
        "Smart Buildings Show (London)",
        "Energy & Environment Expo",
        "Lighting Show (Birmingham)",
        "Renewable Energy World Conference"
      ],
      benefits: ["Latest product knowledge", "Manufacturer representative contacts", "Technology trend insights", "Supplier relationship building", "Industry market intelligence"],
      frequency: "Annual exhibitions",
      bestFor: "Contractors and specialist electricians",
      icon: <Calendar className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Local Electrical Business Networks",
      description: "Regional groups of electrical contractors and professionals focused on local business development",
      examples: [
        "Local Chamber of Commerce electrical groups",
        "Business networking breakfast clubs",
        "Regional contractor associations",
        "Electrical wholesaler customer events",
        "Local authority contractor forums",
        "Tradesmen business networks"
      ],
      benefits: ["Local market intelligence", "Subcontracting opportunities", "Referral network development", "Shared resources and bulk purchasing", "Collaborative project opportunities"],
      frequency: "Monthly local meetings",
      bestFor: "Self-employed electricians and small contractors",
      icon: <MapPin className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Online Professional Communities",
      description: "Digital platforms connecting electrical professionals for knowledge sharing and career development",
      examples: [
        "LinkedIn electrical industry groups",
        "ElectriciansForums.co.uk discussions",
        "Reddit electrical communities",
        "Facebook electrical contractor groups",
        "WhatsApp local tradesman groups",
        "Industry-specific mobile apps"
      ],
      benefits: ["24/7 access to peer advice", "Global knowledge sharing", "Quick problem-solving support", "Industry news and updates", "Career opportunity alerts"],
      frequency: "Continuous online engagement",
      bestFor: "All electrical professionals",
      icon: <Globe className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Mentorship & Apprentice Programmes",
      description: "Formal and informal relationships connecting experienced professionals with newcomers",
      examples: [
        "ECA mentorship scheme for new contractors",
        "Company apprentice mentor programmes",
        "Electrical training college networks",
        "Industry buddy systems",
        "Peer mentoring circles",
        "Cross-company knowledge exchange"
      ],
      benefits: ["Career guidance and development", "Industry knowledge transfer", "Professional relationship building", "Leadership skill development", "Industry reputation building"],
      frequency: "Ongoing relationship development",
      bestFor: "Both mentors and mentees at all levels",
      icon: <Handshake className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Supplier & Manufacturer Networks",
      description: "Build relationships with electrical suppliers, manufacturers, and their representatives",
      examples: [
        "Electrical wholesaler customer appreciation events",
        "Manufacturer product launch demonstrations",
        "Supplier technical training sessions",
        "Trade counter networking opportunities",
        "Manufacturer partner programmes",
        "Industry supplier golf days and social events"
      ],
      benefits: ["Preferred supplier pricing", "Early access to new products", "Technical support relationships", "Credit terms negotiation", "Industry trend insights"],
      frequency: "Regular supplier engagement",
      bestFor: "Contractors and frequent purchasers",
      icon: <Briefcase className="h-6 w-6 text-elec-yellow" />
    },
    {
      title: "Specialist Interest Groups",
      description: "Networks focused on specific electrical specialisms and emerging technologies",
      examples: [
        "Renewable energy professional groups",
        "Smart home technology networks",
        "Industrial automation societies",
        "EV charging specialist communities",
        "Fire and security system groups",
        "Building services engineering networks"
      ],
      benefits: ["Specialist market knowledge", "Technology development insights", "Niche opportunity identification", "Expert status development", "Innovation collaboration"],
      frequency: "Regular specialist meetings",
      bestFor: "Specialists and those developing expertise",
      icon: <Zap className="h-6 w-6 text-elec-yellow" />
    }
  ];

  const keyAssociations = [
    {
      name: "Electrical Contractors' Association (ECA)",
      focus: "Leading trade association for electrical contractors",
      membershipCost: "£300-£800 annually",
      benefits: ["Industry representation", "Business support services", "Networking events", "Training programmes", "Technical guidance"],
      website: "eca.co.uk",
      bestFor: "Established electrical contractors"
    },
    {
      name: "SELECT (Scotland)",
      focus: "Scottish electrical trade association",
      membershipCost: "£200-£600 annually",
      benefits: ["Scottish industry focus", "Regional networking", "Government liaison", "Technical support", "Training opportunities"],
      website: "select.org.uk",
      bestFor: "Scottish electrical professionals"
    },
    {
      name: "Institution of Engineering and Technology (IET)",
      focus: "Professional engineering body",
      membershipCost: "£150-£300 annually",
      benefits: ["Professional development", "Technical resources", "Global networking", "Career progression support", "Professional recognition"],
      website: "theiet.org",
      bestFor: "Engineering-focused electrical professionals"
    },
    {
      name: "Joint Industry Board (JIB)",
      focus: "Electrical industry employment and training standards",
      membershipCost: "Employer-based membership",
      benefits: ["Industry standards setting", "Training framework", "Grading system", "Employment terms guidance", "Skills recognition"],
      website: "jib.org.uk",
      bestFor: "Employers and training providers"
    },
    {
      name: "National Federation of Builders (NFB)",
      focus: "Construction industry trade federation",
      membershipCost: "£200-£500 annually",
      benefits: ["Cross-trade networking", "Construction industry insights", "Business support", "Legal guidance", "Insurance schemes"],
      website: "builders.org.uk",
      bestFor: "Electricians working in construction"
    },
    {
      name: "Federation of Master Builders (FMB)",
      focus: "Construction and building trade association",
      membershipCost: "£300-£600 annually",
      benefits: ["Quality assurance schemes", "Business development", "Customer referrals", "Training opportunities", "Industry representation"],
      website: "fmb.org.uk",
      bestFor: "Multi-trade contractors including electrical"
    }
  ];

  const networkingStrategy = [
    {
      phase: "Apprentice Stage (Years 1-3)",
      focus: "Foundation Building",
      activities: [
        "Join online electrical forums and groups",
        "Attend local training centre events",
        "Connect with fellow apprentices",
        "Build relationships with college tutors",
        "Participate in apprentice competitions"
      ],
      goals: ["Learn from experienced professionals", "Build peer support network", "Understand industry structure"]
    },
    {
      phase: "Qualified Electrician (Years 3-6)",
      focus: "Professional Development",
      activities: [
        "Join relevant trade associations",
        "Attend CPD events and seminars",
        "Participate in manufacturer training",
        "Build supplier relationships",
        "Connect with local contractors"
      ],
      goals: ["Expand technical knowledge", "Develop business contacts", "Explore specialist opportunities"]
    },
    {
      phase: "Experienced Professional (Years 6+)",
      focus: "Leadership & Business Growth",
      activities: [
        "Speak at industry events",
        "Mentor apprentices and newcomers",
        "Join trade association committees",
        "Participate in policy discussions",
        "Lead specialist interest groups"
      ],
      goals: ["Establish industry reputation", "Give back to the profession", "Shape industry development"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Networking in the Electrical Industry</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Build meaningful professional relationships that accelerate career growth, create business opportunities, 
          and keep you connected to industry developments. Networking is essential for long-term success in the electrical trade.
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
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                      {opportunity.frequency}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-300 text-xs">
                      {opportunity.bestFor}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{opportunity.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Networking Opportunities:</h4>
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
                <h4 className="font-semibold text-white mb-2">Professional Benefits:</h4>
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
          <CardTitle className="text-elec-yellow">UK Electrical Industry Associations & Bodies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Strategic membership in industry associations provides structured networking opportunities and professional development:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyAssociations.map((association, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white text-sm">{association.name}</h4>
                  <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                    {association.membershipCost}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{association.focus}</p>
                <div className="space-y-1 mb-3">
                  {association.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="text-elec-yellow">•</span>
                      {benefit}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="border-blue-500/40 text-blue-300 text-xs">
                    {association.website}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{association.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Strategic Networking by Career Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {networkingStrategy.map((stage, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                    {stage.phase}
                  </Badge>
                  <h4 className="font-semibold text-white">{stage.focus}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h5 className="font-medium text-white mb-2">Recommended Activities:</h5>
                    <ul className="space-y-1">
                      {stage.activities.map((activity, activityIndex) => (
                        <li key={activityIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-elec-yellow">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Key Goals:</h5>
                    <ul className="space-y-1">
                      {stage.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-elec-yellow">•</span>
                          {goal}
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

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            Effective Networking Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Before Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Research attendees and speakers in advance</li>
                <li>• Prepare a brief personal introduction</li>
                <li>• Set specific networking objectives</li>
                <li>• Bring professional business cards</li>
                <li>• Plan conversation starters about industry topics</li>
                <li>• Update LinkedIn profile and social media</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">During Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be genuinely interested in others' work</li>
                <li>• Ask open-ended questions about their experiences</li>
                <li>• Listen actively and remember key details</li>
                <li>• Exchange contact information meaningfully</li>
                <li>• Take notes after conversations</li>
                <li>• Offer help and expertise when appropriate</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">After Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Follow up within 48 hours with personalised messages</li>
                <li>• Connect on LinkedIn with personal notes</li>
                <li>• Share relevant resources or information</li>
                <li>• Arrange follow-up meetings or calls</li>
                <li>• Maintain regular but non-intrusive contact</li>
                <li>• Introduce contacts to each other when appropriate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Building Your Professional Brand & Reputation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Digital Presence Strategy:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Maintain professional LinkedIn profile with regular updates</li>
                <li>• Participate constructively in industry forum discussions</li>
                <li>• Share knowledge, insights, and helpful resources</li>
                <li>• Showcase completed projects and achievements</li>
                <li>• Engage thoughtfully with industry content</li>
                <li>• Write articles about electrical topics you know well</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Reputation Building Activities:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Consistently deliver high-quality work</li>
                <li>• Be reliable, punctual, and professional</li>
                <li>• Help other professionals solve problems</li>
                <li>• Stay updated with industry developments</li>
                <li>• Volunteer for community electrical projects</li>
                <li>• Mentor apprentices and newcomers to the trade</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-elec-yellow/10 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Professional Success Tip:</h4>
            <p className="text-muted-foreground text-sm">
              The most successful electrical professionals view networking as relationship building, not just business card collection. 
              Focus on how you can help others first, and opportunities will naturally follow. Remember that strong professional 
              relationships often take years to develop but can provide career opportunities, business referrals, and industry 
              insights that last throughout your career.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworking;
