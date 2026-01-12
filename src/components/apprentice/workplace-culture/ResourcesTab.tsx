
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, BookOpen, Video, Headphones, FileText, HelpCircle, Users } from "lucide-react";

const ResourcesTab = () => {
  const resources = [
    {
      title: "ACAS Workplace Relations Guide",
      type: "document",
      description: "Official UK guidance on workplace relationships and communication",
      url: "https://www.acas.org.uk",
      category: "Official Guidance",
      isUKResource: true
    },
    {
      title: "Electrical Trade Communication Standards",
      type: "document",
      description: "Industry-specific communication protocols and standards",
      category: "Industry Standards",
      isUKResource: true
    },
    {
      title: "Workplace Diversity & Inclusion Guide",
      type: "document",
      description: "Best practices for inclusive workplace communication",
      category: "Diversity & Inclusion",
      isUKResource: true
    },
    {
      title: "Professional Communication Podcast Series",
      type: "audio",
      description: "Weekly episodes on workplace communication skills",
      category: "Podcasts",
      isUKResource: false
    },
    {
      title: "Site Safety Communication Videos",
      type: "video",
      description: "Video demonstrations of effective safety communication",
      category: "Video Learning",
      isUKResource: true
    }
  ];

  const quickReferenceGuides = [
    {
      title: "Emergency Communication Phrases",
      content: [
        "Stop work immediately - safety issue",
        "I need assistance with [specific task]",
        "Please call the site supervisor",
        "Isolate the supply - potential hazard"
      ]
    },
    {
      title: "Professional Email Templates",
      content: [
        "Subject: Work Progress Update - [Date]",
        "Dear [Supervisor Name], I hope this email finds you well...",
        "Please find attached the requested documentation",
        "I look forward to your feedback"
      ]
    },
    {
      title: "Client Interaction Scripts",
      content: [
        "Good morning, I'm [Name] from [Company]",
        "I'll need to isolate your electricity for approximately [time]",
        "The work is progressing well and should be completed by [time]",
        "Here's what I've completed today and what's next"
      ]
    }
  ];

  const supportContacts = [
    {
      organisation: "ACAS (Advisory, Conciliation and Arbitration Service)",
      purpose: "Workplace relations advice and guidance",
      contact: "0300 123 1100",
      website: "acas.org.uk",
      availability: "Monday-Friday 8am-6pm"
    },
    {
      organisation: "JIB (Joint Industry Board)",
      purpose: "Electrical industry employment standards",
      contact: "020 7313 4800",
      website: "jib.org.uk",
      availability: "Monday-Friday 9am-5pm"
    },
    {
      organisation: "ECA (Electrical Contractors' Association)",
      purpose: "Industry support and guidance",
      contact: "020 7313 4800",
      website: "eca.co.uk",
      availability: "Monday-Friday 9am-5pm"
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
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
            </div>
            Additional Resources & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70">
            Comprehensive collection of resources, guides, and support contacts to help you navigate
            workplace culture challenges and continue developing your communication skills.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                <BookOpen className="h-4 w-4 text-green-400" />
              </div>
              Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-3">
              {resources.map((resource, index) => {
                const IconComponent = getResourceIcon(resource.type);
                return (
                  <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 hover:border-green-500/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-green-500/20">
                          <IconComponent className="h-3.5 w-3.5 text-green-400" />
                        </div>
                        <h4 className="font-medium text-white text-sm">{resource.title}</h4>
                      </div>
                      {resource.isUKResource && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          UK
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-white/60 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(resource.category)} variant="outline">
                        {resource.category}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-11 text-xs border-white/20 hover:border-green-500/50 hover:bg-green-500/10 touch-manipulation active:scale-95">
                        {resource.url ? (
                          <>
                            <ExternalLink className="mr-1.5 h-3 w-3" />
                            View
                          </>
                        ) : (
                          <>
                            <Download className="mr-1.5 h-3 w-3" />
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

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                <FileText className="h-4 w-4 text-purple-400" />
              </div>
              Quick Reference Guides
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="space-y-4">
              {quickReferenceGuides.map((guide, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10">
                  <h4 className="font-medium text-purple-400 mb-3 text-sm">{guide.title}</h4>
                  <div className="space-y-2">
                    {guide.content.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <p className="text-xs text-white/70 font-mono">"{item}"</p>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3 h-11 text-xs border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10 text-purple-400 touch-manipulation active:scale-95">
                    <Download className="mr-1.5 h-3 w-3" />
                    Download Full Guide
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            Support & Advice Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportContacts.map((contact, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all">
                <h4 className="font-medium text-blue-400 mb-2 text-sm">{contact.organisation}</h4>
                <p className="text-xs text-white/60 mb-4">{contact.purpose}</p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10">
                    <span className="text-blue-400 font-medium">Phone:</span>
                    <span className="text-white/70">{contact.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10">
                    <span className="text-blue-400 font-medium">Website:</span>
                    <span className="text-white/70">{contact.website}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10">
                    <span className="text-blue-400 font-medium">Hours:</span>
                    <span className="text-white/70">{contact.availability}</span>
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
