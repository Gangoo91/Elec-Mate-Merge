
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, BookOpen, Video, Headphones, FileText, HelpCircle, Users, Phone } from "lucide-react";

const ResourcesTab = () => {
  const learningResources = [
    {
      title: "JIB Apprentice Handbook",
      type: "document",
      description: "Official guidance on apprenticeship progression and workplace expectations",
      url: "https://www.jib.org.uk",
      category: "Official Guidance",
      isUKResource: true
    },
    {
      title: "Communication Skills for Trades",
      type: "video",
      description: "Video series on professional communication in construction environments",
      category: "Video Learning",
      isUKResource: true
    },
    {
      title: "Electrical Safety Communication Protocols",
      type: "document",
      description: "Industry-specific communication standards for electrical work",
      category: "Industry Standards",
      isUKResource: true
    },
    {
      title: "The Confident Apprentice Podcast",
      type: "audio",
      description: "Weekly episodes on building confidence and communication skills",
      category: "Podcasts",
      isUKResource: false
    },
    {
      title: "Technical Discussion Templates",
      type: "document",
      description: "Ready-to-use templates for technical discussions and questions",
      category: "Templates",
      isUKResource: true
    },
    {
      title: "Supervisor Relationship Building Guide",
      type: "document",
      description: "Strategies for building positive relationships with supervisors and mentors",
      category: "Professional Development",
      isUKResource: true
    }
  ];

  const quickReferenceGuides = [
    {
      title: "Technical Question Starters",
      content: [
        "Could you help me understand the reasoning behind...?",
        "I want to make sure I'm approaching this correctly...",
        "What's the best practice for... in this situation?",
        "Could you walk me through the procedure for...?"
      ]
    },
    {
      title: "Professional Problem Reporting",
      content: [
        "I've noticed an issue with... and here's what I observed",
        "I need to report a potential problem with...",
        "I'd like to discuss a concern about safety/quality",
        "Could we review the procedure for... as I'm getting unexpected results?"
      ]
    },
    {
      title: "Seeking Feedback Effectively",
      content: [
        "How do you think I handled... and what could I improve?",
        "What would you suggest I focus on developing next?",
        "Is there anything I should do differently when...?",
        "Could you give me feedback on my approach to...?"
      ]
    },
    {
      title: "Emergency Communication Phrases",
      content: [
        "Stop work immediately - safety concern",
        "I need immediate assistance with...",
        "Please call the site supervisor urgently",
        "We need to isolate the supply - potential hazard identified"
      ]
    }
  ];

  const supportContacts = [
    {
      organisation: "JIB (Joint Industry Board)",
      purpose: "Apprenticeship standards, progression, and workplace issues",
      contact: "020 7313 4800",
      website: "jib.org.uk",
      availability: "Monday-Friday 9am-5pm",
      specialty: "Industry standards and apprentice rights"
    },
    {
      organisation: "ACAS (Advisory, Conciliation and Arbitration Service)",
      purpose: "Workplace relations, communication issues, and conflict resolution",
      contact: "0300 123 1100",
      website: "acas.org.uk",
      availability: "Monday-Friday 8am-6pm",
      specialty: "Employment relations and communication guidance"
    },
    {
      organisation: "ECA (Electrical Contractors' Association)",
      purpose: "Technical guidance, industry support, and career development",
      contact: "020 7313 4800",
      website: "eca.co.uk",
      availability: "Monday-Friday 9am-5pm",
      specialty: "Technical support and industry networking"
    },
    {
      organisation: "Unite the Union (Electrical)",
      purpose: "Workplace representation, rights protection, and advocacy",
      contact: "0808 100 0845",
      website: "unitetheunion.org",
      availability: "Monday-Friday 8am-6pm",
      specialty: "Worker rights and workplace advocacy"
    }
  ];

  const mentoringPrograms = [
    {
      program: "JIB Mentoring Scheme",
      description: "Formal mentoring for electrical apprentices with experienced electricians",
      benefits: ["One-to-one support", "Career guidance", "Technical development", "Industry networking"],
      howToApply: "Contact your training provider or visit jib.org.uk"
    },
    {
      program: "ECA Young Professionals Network",
      description: "Networking and development opportunities for early-career electricians",
      benefits: ["Peer networking", "Industry events", "Skills workshops", "Career progression support"],
      howToApply: "Register online at eca.co.uk or through your employer"
    },
    {
      program: "Local Electrical Apprentice Groups",
      description: "Regional apprentice support groups and peer learning networks",
      benefits: ["Peer support", "Shared experiences", "Local networking", "Group learning"],
      howToApply: "Check with your training provider or local electrical contractors"
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
      case "Professional Development": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Podcasts": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Video Learning": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Templates": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Resources & Support Network</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive collection of resources, support contacts, and guidance to help you communicate 
            effectively with supervisors and build strong professional relationships throughout your apprenticeship.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {learningResources.map((resource, index) => {
                const IconComponent = getResourceIcon(resource.type);
                return (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-elec-yellow" />
                        <h4 className="font-medium text-white text-sm">{resource.title}</h4>
                      </div>
                      {resource.isUKResource && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          UK
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(resource.category)} variant="outline">
                        {resource.category}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        {resource.url ? (
                          <>
                            <ExternalLink className="mr-1 h-3 w-3" />
                            View
                          </>
                        ) : (
                          <>
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>
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
                  <h4 className="font-medium text-white mb-3 text-sm">{guide.title}</h4>
                  <div className="space-y-2">
                    {guide.content.map((item, idx) => (
                      <div key={idx} className="bg-elec-dark/40 rounded p-2">
                        <p className="text-xs text-muted-foreground font-mono">"{item}"</p>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3 h-7 text-xs">
                    <Download className="mr-1 h-3 w-3" />
                    Download Full Guide
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Support & Advice Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportContacts.map((contact, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2 text-sm">{contact.organisation}</h4>
                <p className="text-xs text-muted-foreground mb-3">{contact.purpose}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">Phone:</span>
                    <span className="text-muted-foreground">{contact.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">Website:</span>
                    <span className="text-muted-foreground">{contact.website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">Hours:</span>
                    <span className="text-muted-foreground">{contact.availability}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">Specialty:</span>
                    <span className="text-muted-foreground">{contact.specialty}</span>
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
            <Users className="h-5 w-5" />
            Mentoring & Support Programs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentoringPrograms.map((program, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{program.program}</h4>
                <p className="text-sm text-green-300 mb-3">{program.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-medium text-green-400 mb-2">Benefits:</h5>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-green-300 flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-green-400 mb-2">How to Apply:</h5>
                    <p className="text-xs text-green-300">{program.howToApply}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
