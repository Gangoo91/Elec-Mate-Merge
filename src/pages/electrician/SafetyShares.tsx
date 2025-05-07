
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, AlertTriangle, Library, Bell, Sparkles, CalendarDays, Info, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SafetyShares = () => {
  const [activeCategory, setActiveCategory] = useState("safety-alerts");
  
  // Simulating a notification when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info("New safety alert from HSE available", {
        description: "Updated guidance on electrical test equipment use - 15 Apr 2025",
        action: {
          label: "View",
          onClick: () => setActiveCategory("regulatory")
        }
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const safetyItems = [
    {
      id: 1,
      title: "Working at Height Safety",
      type: "Safety Alert",
      date: "23 Apr 2025",
      summary: "Important reminder about proper ladder use and fall prevention when working at height.",
      severity: "high"
    },
    {
      id: 2,
      title: "Cable Strike Prevention",
      type: "Lessons From Experience",
      date: "18 Apr 2025",
      summary: "Account of a recent incident involving an underground cable strike and recommended practices to prevent similar occurrences.",
      severity: "medium"
    },
    {
      id: 3,
      title: "Lock Out/Tag Out Procedures",
      type: "Safety Guide",
      date: "12 Apr 2025",
      summary: "Comprehensive guide to proper isolation procedures before working on electrical systems.",
      severity: "high"
    },
    {
      id: 4,
      title: "Asbestos Awareness",
      type: "Safety Alert",
      date: "5 Apr 2025",
      summary: "Updated guidance on identifying potential asbestos-containing materials in pre-2000 buildings.",
      severity: "medium"
    },
    {
      id: 5,
      title: "Arc Flash Prevention",
      type: "Lessons From Experience",
      date: "28 Mar 2025",
      summary: "Case study of a serious arc flash incident and recommended PPE requirements.",
      severity: "high"
    }
  ];

  const regulatoryUpdates = [
    {
      id: 1,
      body: "IET",
      title: "18th Edition Amendment 2 Updates",
      date: "1 May 2025",
      summary: "New changes to the wiring regulations affecting residential installations.",
      category: "Regulations",
      icon: "library"
    },
    {
      id: 2,
      body: "HSE",
      title: "Updated GS38 Guidance",
      date: "15 Apr 2025", 
      summary: "Revised guidance on electrical test equipment for use by electricians.",
      category: "Guidance",
      icon: "info"
    },
    {
      id: 3,
      body: "ECA",
      title: "New Safe Working Practice Guide",
      date: "10 Apr 2025",
      summary: "Updated industry guidance on working safely in confined spaces.",
      category: "Guidance",
      icon: "info"
    },
    {
      id: 4,
      body: "NICEIC",
      title: "Technical Bulletin 23/2",
      date: "28 Mar 2025",
      summary: "Clarification on inspection and testing requirements for new installations.",
      category: "Bulletin",
      icon: "library"
    }
  ];

  const newProjects = [
    {
      id: 1,
      title: "Commercial Warehouse Electrical Infrastructure",
      safetyFocus: "Distribution System Design Safety",
      date: "21 Apr 2025",
      summary: "Safety considerations for large-scale industrial electrical distribution systems.",
      size: "large"
    },
    {
      id: 2,
      title: "School Renovation Electrical Requirements",
      safetyFocus: "Low Voltage Systems in Public Buildings",
      date: "12 Apr 2025",
      summary: "Managing safety in educational environments during renovation work.",
      size: "medium"
    },
    {
      id: 3,
      title: "EV Charging Infrastructure Development",
      safetyFocus: "High-Current Installation Safety",
      date: "5 Apr 2025",
      summary: "Risk assessment and safety protocols for installing multiple charging points.",
      size: "large"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Electrical Safety First Toolbox Talk",
      type: "PDF",
      date: "Apr 2025",
      summary: "Comprehensive guide to electrical safety standards for site work."
    },
    {
      id: 2,
      title: "HSE Working at Height Summary",
      type: "PDF",
      date: "Mar 2025", 
      summary: "Visual guide to ladder safety and working at height regulations."
    },
    {
      id: 3,
      title: "Arc Flash Protection Chart",
      type: "PDF",
      date: "Feb 2025",
      summary: "Quick reference guide for arc flash PPE requirements by voltage category."
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-elec-yellow" />
            Safety & Industry Updates
          </h1>
          <p className="text-muted-foreground">
            Stay informed with the latest safety information and industry developments
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      {/* Featured Alert Banner */}
      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-red-500/30">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="rounded-full bg-red-500/20 p-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-lg font-semibold text-red-400">Critical Safety Notice</h2>
            <p className="text-sm text-white/90">
              All electrical work must comply with the Electricity at Work Regulations and current BS7671 standards. 
              Always ensure proper isolation procedures before working on electrical systems.
            </p>
          </div>
          <div>
            <Button size="sm" variant="destructive" className="whitespace-nowrap">View Details</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
        <TabsList className="bg-elec-gray/70 border border-elec-yellow/20 grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="safety-alerts" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 hidden sm:block" />
            Safety Alerts
          </TabsTrigger>
          <TabsTrigger value="regulatory" className="flex items-center gap-1">
            <Library className="h-4 w-4 hidden sm:block" />
            Regulatory Updates
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 hidden sm:block" />
            New Projects
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <Download className="h-4 w-4 hidden sm:block" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="subscribe" className="flex items-center gap-1">
            <Bell className="h-4 w-4 hidden sm:block" />
            Subscribe
          </TabsTrigger>
        </TabsList>
        
        {/* Safety Alerts Tab */}
        <TabsContent value="safety-alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyItems.map(item => (
              <Card key={item.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
                <div className={`h-1 ${
                  item.severity === "high" ? "bg-red-500" : 
                  item.severity === "medium" ? "bg-amber-500" : 
                  "bg-blue-500"
                }`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className={`px-2 py-1 ${
                      item.type === "Safety Alert" 
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400" 
                        : item.type === "Lessons From Experience" 
                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-400" 
                        : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400"
                    }`}>
                      {item.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">Read Full Report</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Regulatory Updates Tab */}
        <TabsContent value="regulatory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regulatoryUpdates.map(update => (
              <Card key={update.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
                <div className="h-1 bg-blue-500" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400">
                      {update.body}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {update.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{update.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{update.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">View Update</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="border-blue-500/20 bg-blue-900/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Info className="h-6 w-6 text-blue-400" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium text-blue-400">New 18th Edition Update:</span> Stay current with the latest changes to BS7671. Download our summary of Amendment 2 updates and their impact on electrical installations.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="whitespace-nowrap ml-auto">Download Summary</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* New Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newProjects.map(project => (
              <Card key={project.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
                <div className="h-1 bg-green-500" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400">
                      {project.size === "large" ? "Major Project" : "Standard Project"}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {project.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-elec-yellow/80">{project.safetyFocus}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{project.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">View Safety Guidelines</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map(resource => (
              <Card key={resource.id} className="overflow-hidden border-elec-yellow/20 bg-elec-gray/80 hover:bg-elec-gray transition-all duration-200">
                <div className="h-1 bg-elec-yellow" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/30 hover:text-elec-yellow">
                      {resource.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {resource.date}
                    </div>
                  </div>
                  <CardTitle className="text-lg truncate">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{resource.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="default" className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="border-elec-yellow/20 bg-elec-gray/50">
            <CardHeader>
              <CardTitle className="text-lg">Request Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Can't find what you're looking for? Let us know what safety resources would help you in your daily work.
              </p>
              <Button className="w-full sm:w-auto">Request Resources</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subscribe Tab */}
        <TabsContent value="subscribe" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray/80">
            <CardHeader>
              <CardTitle>Stay Updated with Safety News</CardTitle>
              <CardDescription>Subscribe to receive important safety updates and alerts directly to your inbox</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Daily Safety Digest</CardTitle>
                      <Bell className="h-5 w-5 text-elec-yellow" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Get a daily summary of important safety information and regulatory updates</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Email</Badge>
                      <Button size="sm">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Weekly Industry Roundup</CardTitle>
                      <CalendarDays className="h-5 w-5 text-elec-yellow" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Weekly digest of all important electrical industry news and updates</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Email & SMS</Badge>
                      <Button size="sm">Subscribe</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Critical Safety Alerts</CardTitle>
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Immediate notifications for urgent safety issues that could affect your work
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Email, SMS & Push</Badge>
                    <Button size="sm" variant="destructive">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SafetyShares;
