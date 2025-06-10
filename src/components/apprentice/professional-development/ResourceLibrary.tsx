
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Search, 
  Calculator,
  Video,
  FileText,
  Globe,
  Star,
  Clock,
  Users,
  Award,
  Filter
} from "lucide-react";

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pdfGuides = [
    {
      title: "BS 7671:2018 Quick Reference Guide",
      description: "Essential wiring regulations summary for apprentices",
      category: "Regulations",
      pages: 24,
      downloadSize: "2.1 MB",
      rating: 4.8,
      downloads: 15420
    },
    {
      title: "Safe Isolation Procedures Handbook",
      description: "Step-by-step safety procedures for electrical isolation",
      category: "Safety",
      pages: 16,
      downloadSize: "1.8 MB",
      rating: 4.9,
      downloads: 12350
    },
    {
      title: "Cable Sizing Calculations Guide",
      description: "Comprehensive guide to cable sizing calculations",
      category: "Technical",
      pages: 32,
      downloadSize: "3.2 MB",
      rating: 4.7,
      downloads: 9840
    },
    {
      title: "EV Charging Installation Manual",
      description: "Modern guide to electric vehicle charging installations",
      category: "Emerging Tech",
      pages: 28,
      downloadSize: "2.9 MB",
      rating: 4.8,
      downloads: 8760
    },
    {
      title: "Testing & Inspection Checklist",
      description: "Complete testing procedures and inspection checklists",
      category: "Testing",
      pages: 20,
      downloadSize: "2.3 MB",
      rating: 4.6,
      downloads: 11200
    },
    {
      title: "Apprentice Portfolio Templates",
      description: "Professional templates for apprentice portfolio building",
      category: "Career",
      pages: 40,
      downloadSize: "4.1 MB",
      rating: 4.9,
      downloads: 18500
    }
  ];

  const interactiveTools = [
    {
      title: "Electrical Symbol Library",
      description: "Interactive guide to BS 3939 electrical symbols",
      type: "Interactive Guide",
      difficulty: "Beginner",
      estimatedTime: "15 mins",
      link: "/apprentice/symbols-library"
    },
    {
      title: "Circuit Design Simulator",
      description: "Practice circuit design with virtual components",
      type: "Simulator",
      difficulty: "Intermediate",
      estimatedTime: "30 mins",
      link: "/apprentice/circuit-simulator"
    },
    {
      title: "Fault Finding Challenge",
      description: "Interactive scenarios for developing fault-finding skills",
      type: "Challenge",
      difficulty: "Advanced",
      estimatedTime: "45 mins",
      link: "/apprentice/fault-finding"
    },
    {
      title: "Voltage Drop Calculator",
      description: "Calculate voltage drops across different cable types",
      type: "Calculator",
      difficulty: "Intermediate",
      estimatedTime: "10 mins",
      link: "/apprentice/calculators"
    }
  ];

  const onlineResources = [
    {
      title: "IET Wiring Regulations",
      description: "Official BS 7671 guidance and updates",
      url: "https://electrical.theiet.org/wiring-regulations/",
      provider: "IET",
      type: "Official Guide",
      rating: 5.0,
      access: "Free Registration"
    },
    {
      title: "HSE Electrical Safety",
      description: "Health and Safety Executive electrical guidance",
      url: "https://www.hse.gov.uk/electricity/",
      provider: "HSE",
      type: "Safety Guidance",
      rating: 4.9,
      access: "Free"
    },
    {
      title: "ECA Technical Helpline",
      description: "Technical support and guidance for electrical queries",
      url: "https://www.eca.co.uk/",
      provider: "ECA",
      type: "Technical Support",
      rating: 4.7,
      access: "Member Access"
    },
    {
      title: "NICEIC Technical Library",
      description: "Technical articles and guidance documents",
      url: "https://www.niceic.com/",
      provider: "NICEIC",
      type: "Technical Library",
      rating: 4.8,
      access: "Free Registration"
    },
    {
      title: "Electrical Safety First",
      description: "Safety campaigns and educational resources",
      url: "https://www.electricalsafetyfirst.org.uk/",
      provider: "ESF",
      type: "Safety Education",
      rating: 4.9,
      access: "Free"
    },
    {
      title: "JIB Grading Scheme",
      description: "Official JIB grading and career progression information",
      url: "https://www.jib.org.uk/",
      provider: "JIB",
      type: "Career Info",
      rating: 4.6,
      access: "Free"
    }
  ];

  const videoResources = [
    {
      title: "Safe Isolation Demonstration",
      description: "Step-by-step safe isolation procedure demonstration",
      duration: "12:34",
      provider: "ElectricalTV",
      difficulty: "Essential",
      views: "234K"
    },
    {
      title: "Cable Installation Techniques",
      description: "Professional cable installation methods and tips",
      duration: "18:45",
      provider: "TradeSkills",
      difficulty: "Intermediate",
      views: "156K"
    },
    {
      title: "Testing with an MFT",
      description: "Complete guide to multifunction tester usage",
      duration: "25:12",
      provider: "TestingPro",
      difficulty: "Intermediate",
      views: "189K"
    },
    {
      title: "Consumer Unit Installation",
      description: "Modern consumer unit installation best practices",
      duration: "31:20",
      provider: "ElectricalTV",
      difficulty: "Advanced",
      views: "298K"
    }
  ];

  const handleDownloadPDF = (guide: any) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,`; // In reality, this would be a real PDF
    link.download = `${guide.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPDFs = pdfGuides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "all" || guide.category === selectedCategory)
  );

  const categories = ["all", "Regulations", "Safety", "Technical", "Testing", "Career", "Emerging Tech"];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Professional Resource Library
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive collection of guides, tools, and resources for electrical apprentices
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pdf-guides" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pdf-guides" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                PDF Guides
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Interactive Tools
              </TabsTrigger>
              <TabsTrigger value="online" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Online Resources
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Learning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pdf-guides" className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPDFs.map((guide, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="text-xs">
                            {guide.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-muted-foreground">{guide.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-white">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground">{guide.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{guide.pages} pages</span>
                          <span>{guide.downloadSize}</span>
                          <span>{guide.downloads.toLocaleString()} downloads</span>
                        </div>
                        <Button 
                          onClick={() => handleDownloadPDF(guide)}
                          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                          size="sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interactive" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interactiveTools.map((tool, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="text-xs">
                            {tool.type}
                          </Badge>
                          <Badge 
                            variant={tool.difficulty === "Beginner" ? "default" : 
                                   tool.difficulty === "Intermediate" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {tool.difficulty}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-white">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{tool.estimatedTime}</span>
                        </div>
                        <Button 
                          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                          size="sm"
                        >
                          Launch Tool
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="online" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {onlineResources.map((resource, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="text-xs">
                            {resource.provider}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-muted-foreground">{resource.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-white">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{resource.access}</span>
                        </div>
                        <Button 
                          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                          size="sm"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Resource
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videoResources.map((video, index) => (
                  <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="text-xs">
                            {video.provider}
                          </Badge>
                          <Badge 
                            variant={video.difficulty === "Essential" ? "default" : 
                                   video.difficulty === "Intermediate" ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {video.difficulty}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-white">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {video.views} views
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                          size="sm"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Watch Video
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

export default ResourceLibrary;
