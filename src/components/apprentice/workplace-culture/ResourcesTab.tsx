
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
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Additional Resources & Support</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive collection of resources, guides, and support contacts to help you navigate 
            workplace culture challenges and continue developing your communication skills.
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
              {resources.map((resource, index) => {
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
            <Users className="h-5 w-5" />
            Support & Advice Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
