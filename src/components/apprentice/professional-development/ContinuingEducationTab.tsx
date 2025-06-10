
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  GraduationCap, 
  Video, 
  Users,
  Clock,
  Star,
  Download,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  Brain
} from "lucide-react";

const ContinuingEducationTab = () => {
  const onlineCourses = [
    {
      title: "Advanced Circuit Design",
      provider: "Electrical Training Academy",
      duration: "12 hours",
      cost: "£299",
      rating: 4.8,
      students: 2340,
      level: "Intermediate",
      topics: ["Complex Circuits", "Load Calculations", "Protection Devices", "Design Standards"],
      certificate: true,
      cpdHours: 12,
      startDate: "Anytime"
    },
    {
      title: "Smart Home Technology",
      provider: "Future Tech Learning",
      duration: "8 hours",
      cost: "£199",
      rating: 4.9,
      students: 1850,
      level: "Beginner",
      topics: ["IoT Systems", "Home Automation", "Network Integration", "Troubleshooting"],
      certificate: true,
      cpdHours: 8,
      startDate: "Anytime"
    },
    {
      title: "Industrial Control Systems",
      provider: "Automation Institute",
      duration: "20 hours",
      cost: "£499",
      rating: 4.7,
      students: 890,
      level: "Advanced",
      topics: ["PLC Programming", "SCADA Systems", "Motor Control", "Safety Systems"],
      certificate: true,
      cpdHours: 20,
      startDate: "Monthly cohorts"
    },
    {
      title: "Renewable Energy Systems",
      provider: "Green Energy Education",
      duration: "16 hours",
      cost: "£399",
      rating: 4.8,
      students: 1560,
      level: "Intermediate",
      topics: ["Solar PV", "Wind Power", "Battery Storage", "Grid Integration"],
      certificate: true,
      cpdHours: 16,
      startDate: "Anytime"
    },
    {
      title: "Electrical Safety Management",
      provider: "Safety First Training",
      duration: "6 hours",
      cost: "£149",
      rating: 4.9,
      students: 3420,
      level: "All Levels",
      topics: ["Risk Assessment", "Safety Procedures", "Incident Management", "Legal Requirements"],
      certificate: true,
      cpdHours: 6,
      startDate: "Weekly"
    },
    {
      title: "Data Centre Electrical Systems",
      provider: "Tech Infrastructure Learning",
      duration: "14 hours",
      cost: "£449",
      rating: 4.6,
      students: 680,
      level: "Advanced",
      topics: ["UPS Systems", "Power Distribution", "Cooling Systems", "Monitoring"],
      certificate: true,
      cpdHours: 14,
      startDate: "Quarterly"
    }
  ];

  const universities = [
    {
      name: "University of Manchester",
      programs: [
        {
          title: "MSc Electrical Power Systems Engineering",
          duration: "1 year full-time / 2 years part-time",
          cost: "£12,500",
          entry: "BEng/BSc Engineering + experience",
          modules: ["Power Generation", "Grid Systems", "Renewable Integration", "Smart Grids"]
        },
        {
          title: "PgDip Advanced Electrical Engineering",
          duration: "9 months part-time",
          cost: "£8,500",
          entry: "Electrical qualification + 5 years experience",
          modules: ["Advanced Control", "Power Electronics", "Systems Design", "Project Management"]
        }
      ],
      location: "Manchester",
      rating: 4.7,
      ranking: "Top 10 UK",
      flexibility: "Evening/Weekend options"
    },
    {
      name: "Imperial College London",
      programs: [
        {
          title: "MSc Control and Optimisation",
          duration: "1 year full-time",
          cost: "£15,200",
          entry: "Strong mathematical background",
          modules: ["Control Theory", "Optimization", "Machine Learning", "Power Systems"]
        }
      ],
      location: "London",
      rating: 4.9,
      ranking: "Top 3 UK",
      flexibility: "Research opportunities"
    },
    {
      name: "University of Strathclyde",
      programs: [
        {
          title: "MSc Electrical Power Engineering with Business",
          duration: "1 year full-time / 2-3 years part-time",
          cost: "£11,800",
          entry: "Engineering degree or equivalent experience",
          modules: ["Power Systems", "Business Skills", "Project Management", "Sustainability"]
        }
      ],
      location: "Glasgow",
      rating: 4.6,
      ranking: "Top 15 UK",
      flexibility: "Industry partnerships"
    }
  ];

  const professionalBodies = [
    {
      name: "Institution of Engineering and Technology (IET)",
      memberships: ["Student", "Associate", "Member", "Fellow"],
      benefits: ["Professional recognition", "Networking events", "Technical resources", "Career guidance"],
      cost: "£35-£165 annually",
      requirements: "Relevant qualifications and experience",
      cpdRequirements: "20 hours annually",
      specializations: ["Power", "Control", "Communications", "Computing"]
    },
    {
      name: "Engineering Council",
      registrations: ["EngTech", "IEng", "CEng"],
      benefits: ["Professional title", "International recognition", "Career advancement", "Salary premium"],
      cost: "Via sponsoring institution",
      requirements: "Accredited qualification + competence",
      cpdRequirements: "30 hours annually",
      specializations: ["All engineering disciplines"]
    },
    {
      name: "Institute of Electrical Engineers (IEEE)",
      memberships: ["Student", "Associate", "Member", "Senior", "Fellow"],
      benefits: ["Global network", "Technical publications", "Standards access", "Career resources"],
      cost: "$49-$199 annually",
      requirements: "Engineering education or experience",
      cpdRequirements: "Encouraged but flexible",
      specializations: ["Electrical", "Electronics", "Computing", "Telecommunications"]
    }
  ];

  const conferences = [
    {
      name: "UK Power & Energy Conference 2024",
      date: "15-17 May 2024",
      location: "ExCeL London",
      cost: "£450 (Early bird: £350)",
      type: "Industry Conference",
      focus: ["Renewable Energy", "Grid Modernization", "Storage Solutions", "Policy Updates"],
      cpdHours: 18,
      audience: "Power engineers, policy makers, researchers",
      highlights: ["100+ exhibitors", "50+ technical sessions", "Networking dinner"]
    },
    {
      name: "Electrical Safety Symposium",
      date: "8-9 June 2024",
      location: "Birmingham NEC",
      cost: "£295",
      type: "Safety Focus",
      focus: ["Arc Flash", "Lockout/Tagout", "Risk Assessment", "New Technologies"],
      cpdHours: 12,
      audience: "Safety professionals, electrical engineers",
      highlights: ["Live demonstrations", "Case studies", "Expert panels"]
    },
    {
      name: "Smart Grid Innovation Summit",
      date: "22-23 July 2024",
      location: "Edinburgh",
      cost: "£520",
      type: "Technology Summit",
      focus: ["Digital Transformation", "AI in Power", "Cybersecurity", "Future Grid"],
      cpdHours: 15,
      audience: "Grid operators, technology vendors, researchers",
      highlights: ["Innovation showcase", "Technical workshops", "Site visits"]
    },
    {
      name: "Renewable Energy Expo",
      date: "10-12 September 2024",
      location: "Manchester Central",
      cost: "£380 (Students: £150)",
      type: "Trade Exhibition",
      focus: ["Solar Technology", "Wind Power", "Energy Storage", "Electric Vehicles"],
      cpdHours: 20,
      audience: "Installers, manufacturers, investors",
      highlights: ["Product launches", "Training sessions", "Business meetings"]
    }
  ];

  const webinars = [
    {
      title: "Future of Electric Vehicle Charging",
      presenter: "Dr. Sarah Johnson, EV Infrastructure Expert",
      date: "25 March 2024",
      time: "14:00-15:30 GMT",
      cost: "Free",
      attendees: 2400,
      topics: ["Rapid charging technology", "Grid integration challenges", "Installation best practices"],
      cpdHours: 1.5,
      recording: true
    },
    {
      title: "AI in Electrical Design",
      presenter: "Prof. Michael Chen, Imperial College",
      date: "2 April 2024",
      time: "19:00-20:30 GMT",
      cost: "£25",
      attendees: 1800,
      topics: ["Machine learning applications", "Automated design tools", "Future trends"],
      cpdHours: 1.5,
      recording: true
    },
    {
      title: "Battery Storage Systems Deep Dive",
      presenter: "Energy Storage Association Panel",
      date: "15 April 2024",
      time: "16:00-17:30 GMT",
      cost: "£35",
      attendees: 1200,
      topics: ["Technology comparison", "Safety considerations", "Commercial applications"],
      cpdHours: 1.5,
      recording: true
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            Continuing Professional Development & Education
          </CardTitle>
          <p className="text-muted-foreground">
            Advance your electrical career through formal education, professional development, and industry engagement
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Online Courses */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-elec-yellow" />
              Online Professional Courses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onlineCourses.map((course, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-white">{course.title}</h4>
                        <Badge variant={course.level === "Beginner" ? "default" : 
                                      course.level === "Intermediate" ? "secondary" : "destructive"}>
                          {course.level}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-elec-yellow">{course.provider}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-muted-foreground">{course.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 2).map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {course.topics.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{course.topics.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-elec-yellow font-semibold">{course.cost}</div>
                        <div className="text-sm text-muted-foreground">
                          {course.cpdHours} CPD hours
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {course.students.toLocaleString()} students enrolled
                      </div>
                      
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Universities */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Higher Education Opportunities
            </h3>
            <div className="space-y-4">
              {universities.map((university, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{university.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{university.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-muted-foreground">{university.rating}</span>
                            </div>
                            <Badge variant="outline">{university.ranking}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-elec-yellow">{university.flexibility}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {university.programs.map((program, programIndex) => (
                          <div key={programIndex} className="p-4 bg-elec-gray/50 rounded-lg">
                            <h5 className="font-medium text-white mb-2">{program.title}</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="text-white">{program.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cost:</span>
                                <span className="text-elec-yellow">{program.cost}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Entry Requirements:</span>
                                <p className="text-white text-xs mt-1">{program.entry}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Key Modules:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {program.modules.map((module, moduleIndex) => (
                                    <Badge key={moduleIndex} variant="secondary" className="text-xs">
                                      {module}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                        View Program Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Bodies */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-elec-yellow" />
              Professional Institution Memberships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionalBodies.map((body, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">{body.name}</h4>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Membership Levels:</div>
                        <div className="flex flex-wrap gap-1">
                          {body.memberships.map((level, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Key Benefits:</div>
                        <ul className="space-y-1">
                          {body.benefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Annual Cost:</span>
                          <span className="text-elec-yellow">{body.cost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPD Required:</span>
                          <span className="text-white">{body.cpdRequirements}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Conferences & Events */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              Industry Conferences & Events 2024
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {conferences.map((event, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-white">{event.name}</h4>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.date}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-elec-yellow font-semibold">{event.cost}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.cpdHours} CPD hours
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Focus Areas:</div>
                        <div className="flex flex-wrap gap-1">
                          {event.focus.map((area, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Target Audience:</div>
                        <div className="text-xs text-white">{event.audience}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white">Event Highlights:</div>
                        <ul className="space-y-1">
                          {event.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Webinars */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-elec-yellow" />
              Upcoming Webinars & Online Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {webinars.map((webinar, index) => (
                <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">{webinar.title}</h4>
                      <p className="text-sm text-elec-yellow">{webinar.presenter}</p>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{webinar.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{webinar.time}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-white">Topics Covered:</div>
                        <ul className="space-y-1">
                          {webinar.topics.map((topic, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 bg-elec-yellow rounded-full"></div>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-elec-yellow font-semibold">{webinar.cost}</div>
                        <div className="text-sm text-muted-foreground">
                          {webinar.cpdHours} CPD hours
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{webinar.attendees} registered</span>
                        {webinar.recording && <span>Recording available</span>}
                      </div>
                      
                      <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                        Register Free
                      </Button>
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

export default ContinuingEducationTab;
