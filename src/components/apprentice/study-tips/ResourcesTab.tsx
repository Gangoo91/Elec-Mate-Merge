
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video, FileText, Globe, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResourcesTab = () => {
  const resourceCategories = [
    {
      title: "Essential Textbooks",
      icon: BookOpen,
      description: "Core reference materials for electrical training",
      resources: [
        {
          name: "BS 7671:2018 (18th Edition IET Wiring Regulations)",
          description: "The definitive guide to electrical installation standards in the UK",
          type: "Official Standard",
          link: "https://electrical.theiet.org/wiring-regulations/"
        },
        {
          name: "Guidance Note 3: Inspection & Testing",
          description: "Comprehensive guide to electrical testing procedures",
          type: "IET Publication",
          link: "https://electrical.theiet.org/guidance-notes/"
        },
        {
          name: "On-Site Guide (BS 7671:2018)",
          description: "Simplified guidance for electrical installations",
          type: "IET Publication",
          link: "https://electrical.theiet.org/on-site-guide/"
        }
      ]
    },
    {
      title: "Online Learning Platforms",
      icon: Globe,
      description: "Digital resources and interactive learning",
      resources: [
        {
          name: "City & Guilds SmartScreen",
          description: "Official digital learning resources for City & Guilds qualifications",
          type: "Learning Platform",
          link: "https://www.cityandguilds.com/smartscreen"
        },
        {
          name: "EAL Digital Learning",
          description: "Interactive modules for EAL electrical qualifications",
          type: "Learning Platform",
          link: "https://www.eal.org.uk/"
        },
        {
          name: "JTL Learning Portal",
          description: "Comprehensive apprenticeship learning resources",
          type: "Training Provider",
          link: "https://www.jtltraining.com/"
        }
      ]
    },
    {
      title: "Video Learning",
      icon: Video,
      description: "Visual learning resources and demonstrations",
      resources: [
        {
          name: "IET TV",
          description: "Professional electrical engineering videos and webinars",
          type: "Video Library",
          link: "https://tv.theiet.org/"
        },
        {
          name: "Electrical Installation Work YouTube Channel",
          description: "Practical demonstrations and explanations",
          type: "Free Video Series",
          link: "https://www.youtube.com/"
        },
        {
          name: "City & Guilds Skills Bank",
          description: "Practical skills demonstrations for electrical work",
          type: "Video Resource",
          link: "https://www.cityandguilds.com/"
        }
      ]
    },
    {
      title: "Reference Materials",
      icon: FileText,
      description: "Quick reference guides and charts",
      resources: [
        {
          name: "Cable Capacity Charts",
          description: "Current carrying capacity tables for various cable types",
          type: "Reference Chart",
          downloadable: true
        },
        {
          name: "Electrical Symbols Guide",
          description: "Comprehensive guide to electrical schematic symbols",
          type: "Reference Guide",
          downloadable: true
        },
        {
          name: "Fault Finding Flowcharts",
          description: "Step-by-step troubleshooting procedures",
          type: "Flowchart",
          downloadable: true
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Study Resources Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A curated collection of essential resources for electrical apprentices and students. 
            These materials cover everything from basic principles to advanced installation techniques.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resourceCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow flex items-center gap-3">
                  <div className="p-2 bg-elec-yellow/10 rounded-lg">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  {category.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="border border-muted/30 rounded-lg p-4 bg-background/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{resource.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                          <span className="inline-block px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
                            {resource.type}
                          </span>
                        </div>
                        <div className="ml-4 flex gap-2">
                          {resource.downloadable ? (
                            <Button size="sm" variant="outline" className="border-green-500/30 hover:bg-green-500/10">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="border-blue-500/30 hover:bg-blue-500/10" asChild>
                              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Visit
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Resource Usage Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Effective Resource Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create a personal resource library with bookmarks</li>
                <li>• Download key reference materials for offline access</li>
                <li>• Use multiple formats (text, video, interactive) for better understanding</li>
                <li>• Join online communities for additional support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quality Assurance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Always use current edition materials (especially BS 7671)</li>
                <li>• Verify information from multiple sources</li>
                <li>• Check for updates to regulations and standards</li>
                <li>• Prefer official publications for exam preparation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
