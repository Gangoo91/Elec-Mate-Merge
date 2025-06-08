
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, BookOpen, Video, Headphones, FileText, HelpCircle, Users, Globe, Phone, Clock, Star } from "lucide-react";

const ResourcesTab = () => {
  const resources = [
    {
      title: "ACAS Workplace Relations Guide",
      type: "document",
      description: "Official UK guidance on workplace relationships, communication protocols, and conflict resolution",
      url: "https://www.acas.org.uk",
      category: "Official Guidance",
      isUKResource: true,
      rating: 4.8,
      downloads: 12500,
      lastUpdated: "2024"
    },
    {
      title: "JIB Electrical Industry Communication Standards",
      type: "document", 
      description: "Industry-specific communication protocols, professional standards, and best practices for electrical contractors",
      category: "Industry Standards",
      isUKResource: true,
      rating: 4.6,
      downloads: 8300,
      lastUpdated: "2024"
    },
    {
      title: "Workplace Diversity & Inclusion Guide",
      type: "document",
      description: "Comprehensive guide to inclusive workplace communication, cultural sensitivity, and respectful interaction",
      category: "Diversity & Inclusion",
      isUKResource: true,
      rating: 4.7,
      downloads: 5600,
      lastUpdated: "2023"
    },
    {
      title: "Professional Communication Podcast Series",
      type: "audio",
      description: "Weekly episodes featuring workplace communication experts, real case studies, and practical advice",
      category: "Podcasts",
      isUKResource: false,
      rating: 4.5,
      downloads: 15200,
      lastUpdated: "2024"
    },
    {
      title: "Site Safety Communication Videos",
      type: "video",
      description: "Visual demonstrations of effective safety communication, emergency procedures, and team coordination",
      category: "Video Learning",
      isUKResource: true,
      rating: 4.9,
      downloads: 9800,
      lastUpdated: "2024"
    },
    {
      title: "Electrical Industry Mentorship Handbook",
      type: "document",
      description: "Complete guide to mentorship relationships, learning from experienced professionals, and career development",
      category: "Career Development",
      isUKResource: true,
      rating: 4.4,
      downloads: 4200,
      lastUpdated: "2023"
    },
    {
      title: "Construction Site Communication Protocols",
      type: "document",
      description: "Multi-trade communication standards, coordination procedures, and conflict resolution strategies",
      category: "Site Management",
      isUKResource: true,
      rating: 4.6,
      downloads: 7100,
      lastUpdated: "2024"
    },
    {
      title: "Digital Communication in Construction",
      type: "video",
      description: "Modern communication tools, app usage, digital documentation, and remote collaboration techniques",
      category: "Technology",
      isUKResource: false,
      rating: 4.3,
      downloads: 3800,
      lastUpdated: "2024"
    }
  ];

  const quickReferenceGuides = [
    {
      title: "Emergency Communication Phrases",
      description: "Essential phrases for urgent safety and emergency situations",
      content: [
        "Stop work immediately - safety issue identified",
        "I need immediate assistance with [specific situation]",
        "Please call the site supervisor and emergency services",
        "Isolate the supply - potential electrical hazard detected",
        "Clear the area - structural concern identified",
        "All personnel report to muster point immediately"
      ],
      downloadSize: "2 pages",
      language: "UK English"
    },
    {
      title: "Professional Email Templates",
      description: "Structured templates for various workplace communication needs",
      content: [
        "Subject: Work Progress Update - [Project Name] - [Date]",
        "Dear [Supervisor Name], I hope this email finds you well...",
        "Please find attached the requested documentation for your review",
        "I would appreciate your feedback on the following matters...",
        "Thank you for your time and consideration. I look forward to your response",
        "Kind regards, [Your Name] [Your Position] [Contact Information]"
      ],
      downloadSize: "5 pages",
      language: "Professional UK"
    },
    {
      title: "Client Interaction Scripts",
      description: "Professional scripts for various client communication scenarios", 
      content: [
        "Good morning, I'm [Name] from [Company]. I'll be your electrician today",
        "I'll need to isolate your electricity supply for approximately [duration]",
        "The work is progressing well and should be completed by [estimated time]",
        "Here's what I've completed today and what's scheduled for tomorrow",
        "I need to discuss a variation that may affect the timeline and cost",
        "Thank you for your patience. Please don't hesitate to ask if you have questions"
      ],
      downloadSize: "4 pages",
      language: "Customer Service"
    },
    {
      title: "Workplace Hierarchy Navigation",
      description: "Guide to understanding and working within organisational structures",
      content: [
        "Apprentice → Electrician → Senior Electrician → Supervisor",
        "Site Manager oversees all trades and project coordination",
        "Health & Safety Officer has authority across all levels",
        "Client representatives require formal communication protocols",
        "Subcontractors maintain separate but coordinated hierarchies",
        "Emergency situations override normal hierarchy protocols"
      ],
      downloadSize: "3 pages",
      language: "UK Construction"
    },
    {
      title: "Conflict Resolution Framework",
      description: "Step-by-step approach to resolving workplace disagreements",
      content: [
        "Step 1: Remain calm and assess the situation objectively",
        "Step 2: Listen actively to all parties involved",
        "Step 3: Identify the core issue and common ground",
        "Step 4: Propose collaborative solutions and compromises",
        "Step 5: Document agreements and follow-up actions",
        "Step 6: Escalate to supervision if resolution isn't reached"
      ],
      downloadSize: "6 pages",
      language: "Professional"
    },
    {
      title: "Cultural Sensitivity Guidelines",
      description: "Best practices for inclusive and respectful workplace communication",
      content: [
        "Respect diverse backgrounds, beliefs, and communication styles",
        "Use inclusive language that welcomes all team members",
        "Be aware of cultural differences in directness and hierarchy",
        "Avoid assumptions based on appearance, accent, or background",
        "Ask respectful questions when seeking to understand differences",
        "Report discriminatory behaviour through proper channels"
      ],
      downloadSize: "8 pages",
      language: "Inclusive"
    }
  ];

  const supportContacts = [
    {
      organisation: "ACAS (Advisory, Conciliation and Arbitration Service)",
      purpose: "Workplace relations advice, conflict resolution, and employment guidance",
      contact: "0300 123 1100",
      website: "acas.org.uk",
      availability: "Monday-Friday 8am-6pm",
      services: ["Mediation services", "Training courses", "Helpline support", "Online resources"],
      speciality: "Employment Relations"
    },
    {
      organisation: "JIB (Joint Industry Board)",
      purpose: "Electrical industry employment standards, training, and professional development",
      contact: "020 7313 4800", 
      website: "jib.org.uk",
      availability: "Monday-Friday 9am-5pm",
      services: ["Grading schemes", "Training standards", "Industry guidance", "Career progression"],
      speciality: "Electrical Industry"
    },
    {
      organisation: "ECA (Electrical Contractors' Association)",
      purpose: "Industry support, technical guidance, and professional networking",
      contact: "020 7313 4800",
      website: "eca.co.uk", 
      availability: "Monday-Friday 9am-5pm",
      services: ["Technical helpline", "Business support", "Training courses", "Industry events"],
      speciality: "Contractor Support"
    },
    {
      organisation: "CITB (Construction Industry Training Board)",
      purpose: "Construction industry training, apprenticeships, and skills development",
      contact: "0344 994 4488",
      website: "citb.co.uk",
      availability: "Monday-Friday 8am-6pm",
      services: ["Apprenticeship support", "Funding guidance", "Training providers", "Industry standards"],
      speciality: "Training & Development"
    },
    {
      organisation: "Health and Safety Executive (HSE)",
      purpose: "Workplace health and safety guidance, incident reporting, and compliance",
      contact: "0300 003 1647",
      website: "hse.gov.uk",
      availability: "Monday-Friday 8am-6pm",
      services: ["Safety guidance", "Incident reporting", "Compliance advice", "Investigation support"],
      speciality: "Health & Safety"
    },
    {
      organisation: "NICEIC Technical Helpline",
      purpose: "Electrical installation standards, testing procedures, and technical guidance",
      contact: "0333 015 6626",
      website: "niceic.com",
      availability: "Monday-Friday 8am-5pm",
      services: ["Technical advice", "Standards guidance", "Testing support", "Compliance help"],
      speciality: "Technical Standards"
    }
  ];

  const onlineResources = [
    {
      platform: "LinkedIn Learning",
      courses: ["Professional Communication", "Workplace Relationships", "Conflict Resolution"],
      cost: "£24.99/month",
      rating: 4.6
    },
    {
      platform: "Coursera",
      courses: ["Business Communication", "Emotional Intelligence", "Leadership Skills"],
      cost: "£35/month",
      rating: 4.4
    },
    {
      platform: "FutureLearn",
      courses: ["Workplace Psychology", "Intercultural Communication", "Digital Communication"],
      cost: "Free + Premium",
      rating: 4.3
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document": return FileText;
      case "video": return Video;
      case "audio": return Headphones;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Official Guidance": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Industry Standards": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Diversity & Inclusion": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Podcasts": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Video Learning": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Career Development": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      case "Site Management": return "bg-teal-500/20 text-teal-400 border-teal-500/30";
      case "Technology": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Comprehensive Resources & Support Network</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Extensive collection of professional resources, expert guidance, and support contacts to help you excel 
            in workplace communication and navigate industry challenges with confidence.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">{resources.length}</div>
              <div className="text-sm text-muted-foreground">Learning Resources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">{quickReferenceGuides.length}</div>
              <div className="text-sm text-muted-foreground">Quick Guides</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">{supportContacts.length}</div>
              <div className="text-sm text-muted-foreground">Support Contacts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Access Available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Professional Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource, index) => {
                const IconComponent = getResourceIcon(resource.type);
                return (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-elec-yellow" />
                        <h4 className="font-medium text-white text-sm">{resource.title}</h4>
                      </div>
                      <div className="flex gap-1">
                        {resource.isUKResource && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            UK
                          </Badge>
                        )}
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {resource.lastUpdated}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(resource.category)} variant="outline">
                        {resource.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-elec-yellow" />
                          {resource.rating}
                        </div>
                        <span>{resource.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                      {resource.url ? (
                        <>
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Access Resource
                        </>
                      ) : (
                        <>
                          <Download className="mr-1 h-3 w-3" />
                          Download PDF
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              Quick Reference Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickReferenceGuides.map((guide, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{guide.title}</h4>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {guide.downloadSize}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">{guide.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    {guide.content.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="bg-elec-dark/40 rounded p-2">
                        <p className="text-xs text-muted-foreground font-mono">"{item}"</p>
                      </div>
                    ))}
                    {guide.content.length > 3 && (
                      <p className="text-xs text-elec-yellow text-center">+{guide.content.length - 3} more examples</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{guide.language}</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Download className="mr-1 h-3 w-3" />
                      Download Guide
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Professional Support & Advice Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportContacts.map((contact, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white text-sm">{contact.organisation}</h4>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {contact.speciality}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">{contact.purpose}</p>
                
                <div className="space-y-2 text-xs mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-blue-400" />
                    <span className="text-blue-300 font-medium">{contact.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-blue-400" />
                    <span className="text-muted-foreground">{contact.website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-blue-400" />
                    <span className="text-muted-foreground">{contact.availability}</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-blue-300 mb-1 text-xs">Services:</h5>
                  <div className="space-y-1">
                    {contact.services.map((service, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                        <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Learning Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {onlineResources.map((platform, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{platform.platform}</h4>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-300">Cost:</span>
                    <span className="text-muted-foreground">{platform.cost}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-300">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-elec-yellow" />
                      <span className="text-muted-foreground">{platform.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h5 className="font-medium text-green-300 mb-1 text-xs">Relevant Courses:</h5>
                  <div className="space-y-1">
                    {platform.courses.map((course, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">• {course}</div>
                    ))}
                  </div>
                </div>
                
                <Button size="sm" variant="outline" className="w-full h-7 text-xs">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Explore Platform
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
