
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Clock, 
  PoundSterling, 
  MapPin,
  CheckCircle,
  AlertCircle,
  Calendar,
  BookOpen,
  Users,
  Star,
  ExternalLink,
  Download
} from "lucide-react";

const CertificationsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("essential");

  const essentialCertifications = [
    {
      title: "18th Edition BS 7671:2018",
      provider: "Various (C&G, EAL, etc.)",
      duration: "3-5 days",
      cost: "£300-£500",
      validity: "3 years",
      description: "Current wiring regulations - essential for all electrical work",
      difficulty: "Intermediate",
      passRate: "75%",
      prerequisites: ["Basic electrical knowledge"],
      examDetails: {
        type: "Multiple choice",
        duration: "120 minutes",
        questions: 60,
        passmark: "60%"
      },
      nextDates: ["15 Mar 2024", "22 Mar 2024", "29 Mar 2024"],
      locations: ["London", "Birmingham", "Manchester", "Leeds", "Cardiff"],
      benefits: [
        "Legal requirement for electrical work",
        "Foundation for all other qualifications",
        "Industry recognition",
        "Insurance compliance"
      ]
    },
    {
      title: "Level 3 Electrical Installation",
      provider: "City & Guilds 2365",
      duration: "12-36 months",
      cost: "£2,000-£4,000",
      validity: "Lifetime",
      description: "Comprehensive electrical installation qualification",
      difficulty: "Advanced",
      passRate: "82%",
      prerequisites: ["Level 2 Electrical", "Functional Skills"],
      examDetails: {
        type: "Practical & Written",
        duration: "Multiple assessments",
        questions: "Various",
        passmark: "Pass/Fail"
      },
      nextDates: ["Rolling admissions"],
      locations: ["Colleges nationwide"],
      benefits: [
        "Apprenticeship completion",
        "JIB grading eligibility",
        "Foundation for further study",
        "Industry standard qualification"
      ]
    },
    {
      title: "Testing & Inspection (2391-52)",
      provider: "City & Guilds",
      duration: "5 days",
      cost: "£800-£1,200",
      validity: "5 years",
      description: "Testing and inspection of electrical installations",
      difficulty: "Advanced",
      passRate: "68%",
      prerequisites: ["18th Edition", "Electrical experience"],
      examDetails: {
        type: "Practical & Written",
        duration: "3 hours practical + 2 hours written",
        questions: "Various",
        passmark: "70%"
      },
      nextDates: ["8 Apr 2024", "15 Apr 2024", "22 Apr 2024"],
      locations: ["Major cities", "Training centres"],
      benefits: [
        "Qualify to issue certificates",
        "Higher earning potential",
        "Career progression",
        "Independent work capability"
      ]
    }
  ];

  const specialistCertifications = [
    {
      title: "Solar PV Installation (MCS)",
      provider: "MCS Approved Centres",
      duration: "3-5 days",
      cost: "£1,500-£2,500",
      validity: "Annual surveillance",
      description: "Microgeneration Certification Scheme for solar installations",
      difficulty: "Intermediate",
      passRate: "85%",
      prerequisites: ["Electrical qualification", "Roof work experience"],
      nextDates: ["12 Apr 2024", "19 Apr 2024", "26 Apr 2024"],
      locations: ["Specialist centres"],
      benefits: [
        "Access to government schemes",
        "High demand specialty",
        "Environmental contribution",
        "Growing market"
      ]
    },
    {
      title: "EV Charging Installation",
      provider: "Various providers",
      duration: "2-3 days",
      cost: "£800-£1,200",
      validity: "3 years",
      description: "Electric vehicle charging point installation",
      difficulty: "Intermediate",
      passRate: "88%",
      prerequisites: ["Electrical qualification", "18th Edition"],
      nextDates: ["5 Apr 2024", "12 Apr 2024", "19 Apr 2024"],
      locations: ["Major cities"],
      benefits: [
        "Future-proof skill",
        "Government support",
        "High growth area",
        "Premium rates"
      ]
    },
    {
      title: "PAT Testing Certification",
      provider: "Various (C&G, NICEIC, etc.)",
      duration: "1 day",
      cost: "£200-£400",
      validity: "3 years",
      description: "Portable Appliance Testing qualification",
      difficulty: "Beginner",
      passRate: "92%",
      prerequisites: ["Basic electrical knowledge"],
      nextDates: ["Daily availability"],
      locations: ["Nationwide"],
      benefits: [
        "Business opportunity",
        "Flexible work",
        "Low startup costs",
        "Regular income stream"
      ]
    }
  ];

  const advancedCertifications = [
    {
      title: "HV Authorized Person",
      provider: "Various specialist providers",
      duration: "5-10 days",
      cost: "£3,000-£5,000",
      validity: "3 years",
      description: "High voltage electrical work authorization",
      difficulty: "Expert",
      passRate: "65%",
      prerequisites: ["Extensive electrical experience", "LV competence"],
      nextDates: ["Limited availability"],
      locations: ["Specialist centres"],
      benefits: [
        "High earning potential",
        "Specialist market",
        "Career advancement",
        "Industry recognition"
      ]
    },
    {
      title: "Electrical Engineering Degree",
      provider: "Universities",
      duration: "3-4 years",
      cost: "£9,000+ per year",
      validity: "Lifetime",
      description: "BEng/MEng Electrical Engineering",
      difficulty: "Expert",
      passRate: "Variable",
      prerequisites: ["A-levels or equivalent"],
      nextDates: ["September intake"],
      locations: ["Universities nationwide"],
      benefits: [
        "Professional engineer status",
        "Management opportunities",
        "Research & development",
        "Consultancy work"
      ]
    }
  ];

  const certificationProviders = [
    {
      name: "City & Guilds",
      logo: "C&G",
      specialties: ["Electrical Installation", "Testing & Inspection", "PAT Testing"],
      locations: "Nationwide",
      rating: 4.7,
      courses: 45
    },
    {
      name: "EAL",
      logo: "EAL",
      specialties: ["18th Edition", "Solar PV", "EV Charging"],
      locations: "UK Wide",
      rating: 4.6,
      courses: 32
    },
    {
      name: "NICEIC",
      logo: "NICEIC",
      specialties: ["Testing", "Design", "Inspection"],
      locations: "Major Cities",
      rating: 4.8,
      courses: 28
    },
    {
      name: "NAPIT",
      logo: "NAPIT",
      specialties: ["Renewables", "Gas", "Electrical"],
      locations: "Selected Centres",
      rating: 4.5,
      courses: 22
    }
  ];

  const studyResources = [
    {
      title: "18th Edition Study Guide",
      type: "PDF Guide",
      provider: "IET",
      cost: "Free",
      rating: 4.9,
      downloads: 25400
    },
    {
      title: "Testing & Inspection Handbook",
      type: "Physical Book",
      provider: "Institution of Engineering and Technology",
      cost: "£45",
      rating: 4.8,
      downloads: 0
    },
    {
      title: "Solar PV Online Course",
      type: "Online Learning",
      provider: "Renewable Energy Training",
      cost: "£299",
      rating: 4.7,
      downloads: 1200
    },
    {
      title: "EV Charging Masterclass",
      type: "Video Series",
      provider: "Electric Vehicle Academy",
      cost: "£199",
      rating: 4.6,
      downloads: 850
    }
  ];

  const getCurrentCertifications = () => {
    switch (selectedCategory) {
      case "essential":
        return essentialCertifications;
      case "specialist":
        return specialistCertifications;
      case "advanced":
        return advancedCertifications;
      default:
        return essentialCertifications;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            UK Electrical Certifications & Qualifications
          </CardTitle>
          <p className="text-muted-foreground">
            Complete guide to electrical qualifications, from essential certifications to advanced specializations
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="certifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="providers">Training Providers</TabsTrigger>
              <TabsTrigger value="resources">Study Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="certifications" className="space-y-6">
              <div className="flex gap-2 mb-6">
                <Button
                  variant={selectedCategory === "essential" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("essential")}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  Essential
                </Button>
                <Button
                  variant={selectedCategory === "specialist" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("specialist")}
                >
                  Specialist
                </Button>
                <Button
                  variant={selectedCategory === "advanced" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("advanced")}
                >
                  Advanced
                </Button>
              </div>

              <div className="space-y-6">
                {getCurrentCertifications().map((cert, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                              <p className="text-elec-yellow">{cert.provider}</p>
                            </div>
                            <Badge variant={cert.difficulty === "Beginner" ? "default" : 
                                          cert.difficulty === "Intermediate" ? "secondary" : 
                                          cert.difficulty === "Advanced" ? "destructive" : "outline"}>
                              {cert.difficulty}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{cert.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                              <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
                              <div className="text-sm font-medium text-white">{cert.duration}</div>
                              <div className="text-xs text-muted-foreground">Duration</div>
                            </div>
                            <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                              <PoundSterling className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
                              <div className="text-sm font-medium text-white">{cert.cost}</div>
                              <div className="text-xs text-muted-foreground">Cost</div>
                            </div>
                            <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                              <CheckCircle className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
                              <div className="text-sm font-medium text-white">{cert.passRate}</div>
                              <div className="text-xs text-muted-foreground">Pass Rate</div>
                            </div>
                            <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                              <Calendar className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
                              <div className="text-sm font-medium text-white">{cert.validity}</div>
                              <div className="text-xs text-muted-foreground">Validity</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-white mb-2">Prerequisites:</h4>
                              <div className="flex flex-wrap gap-1">
                                {cert.prerequisites.map((prereq, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {prereq}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-white mb-2">Key Benefits:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                {cert.benefits.map((benefit, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span className="text-sm text-muted-foreground">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-elec-gray/50 rounded-lg">
                            <h4 className="font-medium text-white mb-3">Exam Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="text-white">{cert.examDetails.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="text-white">{cert.examDetails.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Pass Mark:</span>
                                <span className="text-white">{cert.examDetails.passmark}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-elec-gray/50 rounded-lg">
                            <h4 className="font-medium text-white mb-3">Next Available Dates</h4>
                            <div className="space-y-2">
                              {cert.nextDates.map((date, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Calendar className="h-3 w-3 text-elec-yellow" />
                                  <span className="text-sm text-white">{date}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                              Find Training Providers
                            </Button>
                            <Button variant="outline" className="w-full">
                              Download Study Guide
                              <Download className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="providers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificationProviders.map((provider, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-elec-yellow text-black rounded-lg flex items-center justify-center font-bold">
                              {provider.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">{provider.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-muted-foreground">{provider.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{provider.courses} courses</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-white">Specialties:</div>
                          <div className="flex flex-wrap gap-1">
                            {provider.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{provider.locations}</span>
                        </div>
                        
                        <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                          View Courses
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studyResources.map((resource, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white">{resource.title}</h3>
                            <p className="text-sm text-elec-yellow">{resource.provider}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-muted-foreground">{resource.rating}</span>
                          </div>
                          <div className="text-elec-yellow font-semibold">{resource.cost}</div>
                        </div>
                        
                        {resource.downloads > 0 && (
                          <div className="text-sm text-muted-foreground">
                            {resource.downloads.toLocaleString()} downloads
                          </div>
                        )}
                        
                        <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Access Resource
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationsTab;
