
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  MapPin, 
  Calendar, 
  Clock,
  UserPlus,
  MessageSquare,
  Building,
  Award,
  Globe,
  Search,
  Filter,
  ExternalLink,
  Coffee,
  Briefcase,
  GraduationCap
} from "lucide-react";

const IndustryNetworkingTab = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const localGroups = [
    {
      name: "London Electrical Professionals Network",
      location: "London",
      type: "Professional Network",
      members: 2400,
      nextMeeting: "28 March 2024",
      meetingType: "Monthly Meet-up",
      venue: "IET London",
      focus: ["Industry Updates", "Networking", "Technical Discussions"],
      organizer: "IET London Local Network",
      cost: "Free for members, £10 guests",
      description: "Monthly networking events for electrical professionals in London area",
      upcomingTopics: ["Smart Grid Technology", "Sustainability in Electrical Design"]
    },
    {
      name: "Manchester Electrical Contractors Association",
      location: "Manchester",
      type: "Trade Association",
      members: 850,
      nextMeeting: "5 April 2024",
      meetingType: "Quarterly Business Meeting",
      venue: "Manchester Chamber of Commerce",
      focus: ["Business Development", "Industry Standards", "Regulation Updates"],
      organizer: "MECA",
      cost: "Members only",
      description: "Supporting electrical contractors across Greater Manchester",
      upcomingTopics: ["New Building Regulations", "Contractor Insurance Updates"]
    },
    {
      name: "Birmingham Young Electrical Engineers",
      location: "Birmingham",
      type: "Young Professionals",
      members: 320,
      nextMeeting: "12 April 2024",
      meetingType: "Social & Technical Evening",
      venue: "Birmingham Science Park",
      focus: ["Career Development", "Technical Learning", "Social Networking"],
      organizer: "IET Young Professionals",
      cost: "Free",
      description: "For electrical engineers and technicians under 35",
      upcomingTopics: ["Career Planning Workshop", "EV Charging Technology"]
    },
    {
      name: "Scottish Electrical Trade Union Branch",
      location: "Glasgow",
      type: "Trade Union",
      members: 1200,
      nextMeeting: "18 April 2024",
      meetingType: "Branch Meeting",
      venue: "Glasgow Trades Hall",
      focus: ["Workers' Rights", "Safety Standards", "Industry Advocacy"],
      organizer: "Unite the Union",
      cost: "Members only",
      description: "Representing electrical workers across Scotland",
      upcomingTopics: ["Apprenticeship Funding", "Workplace Safety Campaigns"]
    },
    {
      name: "South West Renewable Energy Group",
      location: "Bristol",
      type: "Specialist Interest",
      members: 680,
      nextMeeting: "25 April 2024",
      meetingType: "Technical Seminar",
      venue: "University of Bath",
      focus: ["Solar Technology", "Wind Power", "Battery Storage"],
      organizer: "Renewable Energy Association",
      cost: "£15 members, £25 non-members",
      description: "Focus on renewable energy technologies and installations",
      upcomingTopics: ["Grid Integration Challenges", "Battery Storage Economics"]
    },
    {
      name: "Leeds Industrial Electrical Network",
      location: "Leeds",
      type: "Industry Sector",
      members: 450,
      nextMeeting: "2 May 2024",
      meetingType: "Factory Visit & Networking",
      venue: "Various Industrial Sites",
      focus: ["Industrial Systems", "Automation", "Motor Control"],
      organizer: "Manufacturing Network Yorkshire",
      cost: "£20 including refreshments",
      description: "For professionals working in industrial electrical systems",
      upcomingTopics: ["Industry 4.0 Implementation", "Predictive Maintenance"]
    }
  ];

  const onlineNetworking = [
    {
      platform: "ElectricalChat UK",
      type: "Forum Community",
      members: "15,000+",
      activity: "Very Active",
      topics: ["Technical Help", "Job Opportunities", "Industry News", "Product Reviews"],
      cost: "Free",
      moderation: "Professional",
      description: "UK's largest online electrical community",
      link: "https://electricalchat.co.uk"
    },
    {
      platform: "IET Connect",
      type: "Professional Network",
      members: "168,000+",
      activity: "Active",
      topics: ["Technical Papers", "Professional Development", "Standards", "Research"],
      cost: "IET Membership Required",
      moderation: "Peer Reviewed",
      description: "IET's professional networking platform",
      link: "https://communities.theiet.org"
    },
    {
      platform: "LinkedIn - UK Electrical Professionals",
      type: "Social Professional",
      members: "25,000+",
      activity: "Daily Posts",
      topics: ["Career Opportunities", "Industry Insights", "Company Updates", "Professional Tips"],
      cost: "Free",
      moderation: "Community",
      description: "LinkedIn group for UK electrical industry professionals",
      link: "https://linkedin.com/groups/uk-electrical"
    },
    {
      platform: "NICEIC Technical Forum",
      type: "Technical Support",
      members: "12,000+",
      activity: "Active",
      topics: ["Regulations", "Testing Procedures", "Certification", "Technical Queries"],
      cost: "NICEIC Registration Required",
      moderation: "Technical Experts",
      description: "Technical support and discussion for NICEIC registered contractors",
      link: "https://niceic.com/forum"
    }
  ];

  const industryEvents = [
    {
      name: "Electrical Trade Show 2024",
      date: "15-17 May 2024",
      location: "NEC Birmingham",
      type: "Trade Exhibition",
      expectedAttendees: "15,000+",
      networkingOpportunities: ["Welcome Reception", "Industry Dinner", "Speed Networking", "Coffee Meetups"],
      cost: "Free registration",
      organizer: "Electrical Industry Association",
      description: "UK's premier electrical trade exhibition with extensive networking",
      exhibitors: "300+",
      specializations: ["Installation", "Testing", "Renewables", "Smart Technology"]
    },
    {
      name: "Young Electrical Engineers Conference",
      date: "8-9 June 2024",
      location: "Manchester Conference Centre",
      type: "Professional Development",
      expectedAttendees: "800+",
      networkingOpportunities: ["Welcome Drinks", "Lunch Sessions", "Evening Social", "Mentorship Matching"],
      cost: "£150 (Students: £50)",
      organizer: "IET Young Professionals",
      description: "Conference specifically for electrical engineers under 35",
      specializations: ["Career Development", "Technical Skills", "Leadership", "Innovation"]
    },
    {
      name: "Scottish Power & Energy Summit",
      date: "22-23 July 2024",
      location: "Edinburgh International Conference Centre",
      type: "Technical Conference",
      expectedAttendees: "1,200+",
      networkingOpportunities: ["Opening Reception", "Networking Lunches", "Poster Sessions", "Gala Dinner"],
      cost: "£450 (Early bird: £350)",
      organizer: "Scottish Engineering",
      description: "Focus on power systems and renewable energy in Scotland",
      specializations: ["Power Generation", "Grid Systems", "Offshore Wind", "Policy"]
    }
  ];

  const professionalMentoring = [
    {
      program: "IET Mentoring Scheme",
      type: "Formal Mentoring",
      duration: "12 months",
      matching: "Skills & Career Goals",
      cost: "Free for IET members",
      availability: "Year-round",
      benefits: ["Career guidance", "Technical support", "Professional development", "Network expansion"],
      eligibility: "IET members at any career stage",
      process: "Online application and matching system"
    },
    {
      program: "NICEIC Mentor Network",
      type: "Industry Mentoring",
      duration: "6-12 months",
      matching: "Business Focus",
      cost: "Free",
      availability: "Quarterly intakes",
      benefits: ["Business advice", "Technical guidance", "Industry connections", "Certification support"],
      eligibility: "NICEIC approved contractors",
      process: "Application through NICEIC portal"
    },
    {
      program: "JIB Apprentice Support Network",
      type: "Peer Support",
      duration: "Throughout apprenticeship",
      matching: "Regional & Sector",
      cost: "Free",
      availability: "Ongoing",
      benefits: ["Peer support", "Study groups", "Industry insights", "Career advice"],
      eligibility: "JIB registered apprentices",
      process: "Contact through training provider"
    }
  ];

  const networkingTips = [
    {
      category: "Before Events",
      tips: [
        "Research attendees and speakers in advance",
        "Set specific networking goals",
        "Prepare your elevator pitch",
        "Bring plenty of business cards",
        "Review the event agenda and plan your time"
      ]
    },
    {
      category: "During Events",
      tips: [
        "Arrive early for better networking opportunities",
        "Ask open-ended questions about others' work",
        "Listen actively and show genuine interest",
        "Exchange contact information promptly",
        "Take notes about people you meet"
      ]
    },
    {
      category: "Follow-up",
      tips: [
        "Connect within 48 hours of meeting",
        "Reference specific conversation points",
        "Offer value before asking for help",
        "Maintain regular contact with key connections",
        "Attend follow-up events and activities"
      ]
    }
  ];

  const filteredGroups = localGroups.filter(group => {
    const matchesRegion = selectedRegion === "all" || group.location.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesType = selectedType === "all" || group.type === selectedType;
    const matchesSearch = searchTerm === "" || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRegion && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Industry Networking & Professional Connections
          </CardTitle>
          <p className="text-muted-foreground">
            Build your professional network through local groups, online communities, and industry events
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Local Groups & Associations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              Local Professional Groups & Associations
            </h3>
            
            {/* Filters */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="manchester">Manchester</SelectItem>
                  <SelectItem value="birmingham">Birmingham</SelectItem>
                  <SelectItem value="glasgow">Glasgow</SelectItem>
                  <SelectItem value="bristol">Bristol</SelectItem>
                  <SelectItem value="leeds">Leeds</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Group Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Professional Network">Professional Network</SelectItem>
                  <SelectItem value="Trade Association">Trade Association</SelectItem>
                  <SelectItem value="Young Professionals">Young Professionals</SelectItem>
                  <SelectItem value="Trade Union">Trade Union</SelectItem>
                  <SelectItem value="Specialist Interest">Specialist Interest</SelectItem>
                  <SelectItem value="Industry Sector">Industry Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGroups.map((group, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{group.name}</h4>
                          <p className="text-sm text-elec-yellow">{group.organizer}</p>
                        </div>
                        <Badge variant="outline">{group.type}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{group.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{group.members.toLocaleString()} members</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Next Meeting:</div>
                        <div className="p-3 bg-elec-gray/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4 text-elec-yellow" />
                            <span className="text-sm font-medium text-white">{group.nextMeeting}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{group.meetingType} at {group.venue}</div>
                          <div className="text-xs text-elec-yellow mt-1">{group.cost}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Focus Areas:</div>
                        <div className="flex flex-wrap gap-1">
                          {group.focus.map((area, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Upcoming Topics:</div>
                        <ul className="space-y-1">
                          {group.upcomingTopics.map((topic, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Join Group
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Online Networking */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-elec-yellow" />
              Online Professional Communities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onlineNetworking.map((platform, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-white">{platform.platform}</h4>
                        <Badge variant="outline">{platform.type}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Members:</span>
                          <div className="text-white font-medium">{platform.members}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Activity:</span>
                          <div className="text-white font-medium">{platform.activity}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Popular Topics:</div>
                        <div className="flex flex-wrap gap-1">
                          {platform.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Cost: </span>
                          <span className="text-elec-yellow">{platform.cost}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Moderation: </span>
                          <span className="text-white">{platform.moderation}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Join Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry Events */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-elec-yellow" />
              Major Industry Networking Events 2024
            </h3>
            <div className="space-y-4">
              {industryEvents.map((event, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-white">{event.name}</h4>
                            <p className="text-elec-yellow">{event.organizer}</p>
                          </div>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.expectedAttendees}</span>
                          </div>
                          <div className="text-elec-yellow font-semibold">{event.cost}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-white">Networking Opportunities:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {event.networkingOpportunities.map((opportunity, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Coffee className="h-3 w-3 text-elec-yellow" />
                                <span className="text-xs text-muted-foreground">{opportunity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-white">Key Specializations:</div>
                          <div className="flex flex-wrap gap-1">
                            {event.specializations.map((spec, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-elec-gray/50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-elec-yellow">{event.expectedAttendees}</div>
                          <div className="text-sm text-muted-foreground">Expected Attendees</div>
                        </div>
                        
                        {event.exhibitors && (
                          <div className="p-4 bg-elec-gray/50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-elec-yellow">{event.exhibitors}</div>
                            <div className="text-sm text-muted-foreground">Exhibitors</div>
                          </div>
                        )}
                        
                        <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                          Register Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Mentoring */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
              Professional Mentoring Programs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {professionalMentoring.map((program, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-white">{program.program}</h4>
                        <Badge variant="outline" className="mt-1">{program.type}</Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="text-white">{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost:</span>
                          <span className="text-elec-yellow">{program.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Matching:</span>
                          <span className="text-white">{program.matching}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Key Benefits:</div>
                        <ul className="space-y-1">
                          {program.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>Eligibility:</strong> {program.eligibility}
                      </div>
                      
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Networking Tips */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-elec-yellow" />
              Professional Networking Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {networkingTips.map((category, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-elec-yellow">{category.category}</h4>
                      <ul className="space-y-2">
                        {category.tips.map((tip, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworkingTab;
