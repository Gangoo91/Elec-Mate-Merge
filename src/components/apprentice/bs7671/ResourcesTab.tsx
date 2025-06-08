
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Calculator, FileText, Video, Globe, Wrench } from "lucide-react";

const ResourcesTab = () => {
  const resources = [
    {
      category: "Official Standards",
      icon: BookOpen,
      items: [
        { name: "BS 7671:2018+A2:2022", type: "Standard", description: "18th Edition IET Wiring Regulations", url: "#" },
        { name: "IET Guidance Note 3", type: "Guide", description: "Inspection & Testing", url: "#" },
        { name: "IET On-Site Guide", type: "Guide", description: "Practical application of BS 7671", url: "#" }
      ]
    },
    {
      category: "Online Tools",
      icon: Calculator,
      items: [
        { name: "Cable Calculation Tool", type: "Calculator", description: "Calculate cable sizes and volt drop", url: "#" },
        { name: "Zs Values Database", type: "Database", description: "Maximum Zs values for protective devices", url: "#" },
        { name: "RCD Trip Time Calculator", type: "Calculator", description: "Calculate RCD operating times", url: "#" }
      ]
    },
    {
      category: "Video Tutorials",
      icon: Video,
      items: [
        { name: "Safe Isolation Procedures", type: "Video", description: "Step-by-step isolation process", url: "#" },
        { name: "MFT Testing Techniques", type: "Video", description: "Proper use of multifunction testers", url: "#" },
        { name: "EICR Best Practices", type: "Video", description: "Professional inspection techniques", url: "#" }
      ]
    },
    {
      category: "Reference Materials",
      icon: FileText,
      items: [
        { name: "Testing Sequence Flowchart", type: "Chart", description: "Visual guide to testing order", url: "#" },
        { name: "Common Defects Guide", type: "Guide", description: "Identification and classification", url: "#" },
        { name: "Certificate Examples", type: "Examples", description: "Properly completed certificates", url: "#" }
      ]
    }
  ];

  const quickLinks = [
    { name: "IET Website", url: "https://www.theiet.org", icon: Globe },
    { name: "NICEIC Guidance", url: "#", icon: FileText },
    { name: "NAPIT Resources", url: "#", icon: Tool },
    { name: "Building Regulations", url: "#", icon: BookOpen }
  ];

  const emergencyContacts = [
    { service: "HSE Incident Reporting", number: "0845 300 9923", type: "Emergency" },
    { service: "Electrical Safety First", number: "020 3463 5100", type: "Advice" },
    { service: "DNO Emergency", number: "105", type: "Power Outage" }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Standard': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Guide': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Calculator': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Video': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Links */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Quick Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <link.icon className="h-6 w-6 text-elec-yellow" />
                <span className="text-sm text-center">{link.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      <Badge variant="outline" className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                    </div>
                    <Button size="sm" className="w-full">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Access
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contacts */}
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border border-red-500/20 rounded-lg p-4 text-center">
                <h4 className="font-medium text-white mb-1">{contact.service}</h4>
                <p className="text-xl font-bold text-red-400 mb-2">{contact.number}</p>
                <Badge variant="outline" className="border-red-500/40 text-red-400">
                  {contact.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study & Practice Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Practice with actual MFT equipment</li>
                <li>• Review failed EICRs for learning</li>
                <li>• Study real-world installation examples</li>
                <li>• Join professional forums and discussions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-300">Common Mistakes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Skipping visual inspection steps</li>
                <li>• Incorrect test sequence order</li>
                <li>• Poor documentation practices</li>
                <li>• Inadequate safe isolation procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
