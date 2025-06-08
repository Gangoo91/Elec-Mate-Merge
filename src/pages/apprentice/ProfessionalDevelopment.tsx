
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, 
  Clock, 
  Award, 
  BookOpen, 
  Target, 
  PoundSterling, 
  MapPin, 
  CheckCircle, 
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Phone,
  ExternalLink,
  AlertCircle,
  Lightbulb
} from "lucide-react";

const ProfessionalDevelopment = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const timelineSteps = [
    {
      phase: "Months 1-3",
      title: "End-Point Assessment & Completion",
      tasks: ["Complete EPA", "Receive apprenticeship certificate", "Register with professional bodies"],
      status: "current"
    },
    {
      phase: "Months 4-6", 
      title: "Establish Independence",
      tasks: ["Build portfolio", "Gain additional certifications", "Develop specialist skills"],
      status: "upcoming"
    },
    {
      phase: "Year 1+",
      title: "Career Progression",
      tasks: ["Pursue advanced qualifications", "Consider specialisations", "Leadership development"],
      status: "future"
    }
  ];

  const essentialQualifications = [
    {
      title: "18th Edition BS 7671",
      provider: "City & Guilds / EAL",
      duration: "3-5 days",
      cost: "£400-600",
      description: "Essential for all electrical work - must be renewed every 5 years",
      priority: "Essential",
      whenNeeded: "Within 6 months of completion"
    },
    {
      title: "Initial Verification & Certification",
      provider: "Various training centres",
      duration: "1-2 days", 
      cost: "£200-350",
      description: "Learn to complete electrical installation certificates",
      priority: "Essential",
      whenNeeded: "Within 3 months of completion"
    },
    {
      title: "PAT Testing Certification",
      provider: "City & Guilds",
      duration: "1 day",
      cost: "£150-250",
      description: "Portable appliance testing - opens additional income streams",
      priority: "Recommended",
      whenNeeded: "Within 12 months"
    },
    {
      title: "HNC/HND Electrical Engineering",
      provider: "Colleges / Universities",
      duration: "2-3 years part-time",
      cost: "£3,000-6,000",
      description: "Higher qualification for engineering roles and career progression",
      priority: "Career Development",
      whenNeeded: "1-2 years post-apprenticeship"
    }
  ];

  const careerPaths = [
    {
      title: "Installation Electrician",
      timeline: "Immediate",
      description: "Continue in electrical installations with increasing responsibility",
      nextSteps: ["Gain additional certifications", "Specialise in commercial/industrial", "Consider self-employment"],
      salaryRange: "£28k - £42k",
      skills: ["Advanced installation techniques", "Project management", "Customer service"]
    },
    {
      title: "Maintenance Electrician", 
      timeline: "6-12 months",
      description: "Focus on maintenance and repair of electrical systems",
      nextSteps: ["Learn PLC systems", "Industrial automation training", "Condition monitoring"],
      salaryRange: "£30k - £45k",
      skills: ["Fault finding", "Preventive maintenance", "Industrial systems"]
    },
    {
      title: "Electrical Supervisor",
      timeline: "2-4 years",
      description: "Lead teams and manage electrical projects",
      nextSteps: ["Leadership training", "Project management certification", "Business skills"],
      salaryRange: "£35k - £55k",
      skills: ["Team leadership", "Project planning", "Quality control"]
    },
    {
      title: "Electrical Engineer",
      timeline: "3-5 years",
      description: "Design electrical systems and move into engineering roles",
      nextSteps: ["HNC/HND/Degree", "Chartered Engineer status", "Design software training"],
      salaryRange: "£40k - £70k",
      skills: ["System design", "Technical calculations", "CAD software"]
    }
  ];

  const actionSteps = [
    {
      category: "Within 1 Month",
      icon: AlertCircle,
      color: "text-red-400",
      tasks: [
        "Research professional body memberships (IET, ECA, NICEIC)",
        "Update CV with apprenticeship completion",
        "Start building digital portfolio",
        "Research local training providers"
      ]
    },
    {
      category: "Within 3 Months", 
      icon: Target,
      color: "text-orange-400",
      tasks: [
        "Complete 18th Edition training",
        "Join relevant professional bodies",
        "Book Initial Verification course",
        "Set up LinkedIn professional profile"
      ]
    },
    {
      category: "Within 6 Months",
      icon: TrendingUp, 
      color: "text-green-400",
      tasks: [
        "Complete certification courses",
        "Apply for advanced positions",
        "Consider specialisation areas",
        "Start networking with industry professionals"
      ]
    },
    {
      category: "Within 12 Months",
      icon: Award,
      color: "text-blue-400", 
      tasks: [
        "Evaluate career progression options",
        "Research higher education opportunities",
        "Build specialist skill portfolio",
        "Consider business opportunities"
      ]
    }
  ];

  const trainingProviders = [
    {
      name: "City & Guilds",
      location: "Nationwide",
      specialities: ["18th Edition", "PAT Testing", "Professional Qualifications"],
      contact: "www.cityandguilds.com",
      priceRange: "£££"
    },
    {
      name: "EAL",
      location: "Nationwide", 
      specialities: ["Electrical Installations", "Renewable Energy", "Professional Development"],
      contact: "www.eal.org.uk",
      priceRange: "£££"
    },
    {
      name: "Local FE Colleges",
      location: "Regional",
      specialities: ["HNC/HND", "Part-time courses", "Employer partnerships"],
      contact: "Contact local colleges",
      priceRange: "££"
    },
    {
      name: "Private Training Centres",
      location: "Nationwide",
      specialities: ["Fast-track courses", "Weekend training", "Bespoke programmes"],
      contact: "Various providers",
      priceRange: "££££"
    }
  ];

  const practicalGuidance = [
    {
      title: "Building Your Professional Network",
      tips: [
        "Join local electrical contractor associations",
        "Attend industry events and trade shows", 
        "Connect with former colleagues and supervisors",
        "Use LinkedIn to build professional connections",
        "Consider mentoring new apprentices"
      ]
    },
    {
      title: "Managing Career Finances",
      tips: [
        "Budget for ongoing training costs (£1,000-2,000 annually)",
        "Research employer training schemes and funding",
        "Consider apprenticeship levy funding for higher qualifications",
        "Plan for tool updates and professional insurance",
        "Investigate professional development loans"
      ]
    },
    {
      title: "Staying Current with Industry Changes",
      tips: [
        "Subscribe to industry publications (Electrical Review, Electrical Times)",
        "Follow regulation updates from IET and BSI",
        "Join professional body newsletters and forums",
        "Attend CPD events and webinars",
        "Stay informed about new technologies (smart systems, EVs, renewables)"
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Professional Development Guide</h1>
        <p className="text-muted-foreground text-center mb-4">
          Your comprehensive guide to career progression after apprenticeship completion
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      {/* Post-Apprenticeship Timeline */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Post-Apprenticeship Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    step.status === 'current' ? 'bg-elec-yellow' : 
                    step.status === 'upcoming' ? 'bg-blue-400' : 'bg-gray-400'
                  }`} />
                  {index < timelineSteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-600 mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{step.phase}</Badge>
                    <h3 className="font-semibold text-elec-yellow">{step.title}</h3>
                  </div>
                  <ul className="space-y-1">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Essential Training & Qualifications */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Essential Training & Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {essentialQualifications.map((qual, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white">{qual.title}</h3>
                    <Badge className={`text-xs ${
                      qual.priority === 'Essential' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      qual.priority === 'Recommended' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {qual.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{qual.provider}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{qual.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PoundSterling className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{qual.cost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">{qual.whenNeeded}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{qual.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Progression Paths */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Career Progression Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careerPaths.map((path, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-elec-yellow">{path.title}</h3>
                    <Badge variant="outline" className="text-xs">{path.timeline}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-medium text-elec-yellow mb-1">Salary Range</div>
                      <div className="text-sm font-semibold text-green-400">{path.salaryRange}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-elec-yellow mb-1">Key Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-elec-yellow mb-1">Next Steps</div>
                      <ul className="space-y-1">
                        {path.nextSteps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1 h-1 bg-elec-yellow rounded-full" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practical Action Steps */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Practical Action Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {actionSteps.map((category, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-3">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                  <h3 className="font-semibold text-white">{category.category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-7">
                  {category.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center gap-2 p-2 bg-elec-dark/30 rounded">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{task}</span>
                    </div>
                  ))}
                </div>
                {index < actionSteps.length - 1 && <Separator className="mt-6 bg-elec-yellow/20" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Providers & Costs */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Training Providers & Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingProviders.map((provider, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white">{provider.name}</h3>
                    <Badge variant="outline" className="text-xs">{provider.priceRange}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{provider.contact}</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-medium text-elec-yellow mb-1">Specialities</div>
                      <div className="flex flex-wrap gap-1">
                        {provider.specialities.map((spec, specIndex) => (
                          <Badge key={specIndex} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-World Guidance */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Real-World Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {practicalGuidance.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-elec-yellow mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {section.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-2 p-2 bg-elec-dark/30 rounded">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
                {index < practicalGuidance.length - 1 && <Separator className="mt-6 bg-elec-yellow/20" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold text-elec-yellow mb-2">Ready to Take the Next Step?</h2>
          <p className="text-muted-foreground mb-4">
            Your apprenticeship is just the beginning. Use this guide to plan your professional journey and build a successful electrical career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <FileText className="h-4 w-4 mr-2" />
              Download Career Checklist
            </Button>
            <Button variant="outline" className="border-elec-yellow/30">
              <Phone className="h-4 w-4 mr-2" />
              Book Career Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalDevelopment;
