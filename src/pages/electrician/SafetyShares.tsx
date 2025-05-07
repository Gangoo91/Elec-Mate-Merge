
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, AlertTriangle, Library, Bell, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const SafetyShares = () => {
  const safetyItems = [
    {
      id: 1,
      title: "Working at Height Safety",
      type: "Safety Alert",
      date: "23 Apr 2025",
      summary: "Important reminder about proper ladder use and fall prevention when working at height."
    },
    {
      id: 2,
      title: "Cable Strike Prevention",
      type: "Lessons From Experience",
      date: "18 Apr 2025",
      summary: "Account of a recent incident involving an underground cable strike and recommended practices to prevent similar occurrences."
    },
    {
      id: 3,
      title: "Lock Out/Tag Out Procedures",
      type: "Safety Guide",
      date: "12 Apr 2025",
      summary: "Comprehensive guide to proper isolation procedures before working on electrical systems."
    },
    {
      id: 4,
      title: "Asbestos Awareness",
      type: "Safety Alert",
      date: "5 Apr 2025",
      summary: "Updated guidance on identifying potential asbestos-containing materials in pre-2000 buildings."
    },
    {
      id: 5,
      title: "Arc Flash Prevention",
      type: "Lessons From Experience",
      date: "28 Mar 2025",
      summary: "Case study of a serious arc flash incident and recommended PPE requirements."
    }
  ];

  const regulatoryUpdates = [
    {
      id: 1,
      body: "IET",
      title: "18th Edition Amendment 2 Updates",
      date: "1 May 2025",
      summary: "New changes to the wiring regulations affecting residential installations."
    },
    {
      id: 2,
      body: "HSE",
      title: "Updated GS38 Guidance",
      date: "15 Apr 2025", 
      summary: "Revised guidance on electrical test equipment for use by electricians."
    },
    {
      id: 3,
      body: "ECA",
      title: "New Safe Working Practice Guide",
      date: "10 Apr 2025",
      summary: "Updated industry guidance on working safely in confined spaces."
    },
    {
      id: 4,
      body: "NICEIC",
      title: "Technical Bulletin 23/2",
      date: "28 Mar 2025",
      summary: "Clarification on inspection and testing requirements for new installations."
    }
  ];

  const newProjects = [
    {
      id: 1,
      title: "Commercial Warehouse Electrical Infrastructure",
      safetyFocus: "Distribution System Design Safety",
      date: "21 Apr 2025",
      summary: "Safety considerations for large-scale industrial electrical distribution systems."
    },
    {
      id: 2,
      title: "School Renovation Electrical Requirements",
      safetyFocus: "Low Voltage Systems in Public Buildings",
      date: "12 Apr 2025",
      summary: "Managing safety in educational environments during renovation work."
    },
    {
      id: 3,
      title: "EV Charging Infrastructure Development",
      safetyFocus: "High-Current Installation Safety",
      date: "5 Apr 2025",
      summary: "Risk assessment and safety protocols for installing multiple charging points."
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
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

      <Card className="bg-red-500/10 border border-red-500/30">
        <CardContent className="pt-6">
          <h2 className="text-lg font-bold text-red-500 flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5" /> Emergency Safety Notice
          </h2>
          <p>
            All electrical work must comply with the Electricity at Work Regulations and current BS7671 standards. 
            Always ensure proper isolation procedures before working on electrical systems. If in doubt, don't proceed.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="safety-alerts" className="space-y-4">
        <TabsList className="bg-elec-gray border border-elec-yellow/20 grid grid-cols-4 md:w-fit w-full">
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
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Bell className="h-4 w-4 hidden sm:block" />
            Subscribe
          </TabsTrigger>
        </TabsList>
        
        {/* Safety Alerts Tab */}
        <TabsContent value="safety-alerts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyItems.map(item => (
              <Card key={item.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className={`px-2 py-1 ${
                      item.type === "Safety Alert" 
                        ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-500" 
                        : item.type === "Lessons From Experience" 
                        ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 hover:text-amber-500" 
                        : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 hover:text-blue-500"
                    }`}>
                      {item.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                  <Button size="sm" className="w-full">Read Full Report</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Regulatory Updates Tab */}
        <TabsContent value="regulatory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regulatoryUpdates.map(update => (
              <Card key={update.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 hover:text-blue-500">
                      {update.body}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{update.date}</span>
                  </div>
                  <CardTitle className="text-lg">{update.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{update.summary}</p>
                  <Button size="sm" className="w-full">View Update</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* New Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {newProjects.map(project => (
              <Card key={project.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 hover:text-green-500">
                      New Project
                    </Badge>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="text-elec-yellow/70">{project.safetyFocus}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{project.summary}</p>
                  <Button size="sm" className="w-full">View Safety Guidelines</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Subscribe Tab */}
        <TabsContent value="all" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Stay Updated with Safety News</CardTitle>
              <CardDescription>Subscribe to receive important safety updates and alerts directly to your inbox</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-elec-yellow/20 bg-elec-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Daily Safety Digest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Get a daily summary of important safety information and regulatory updates</p>
                    <Button className="w-full">Subscribe</Button>
                  </CardContent>
                </Card>
                <Card className="border-elec-yellow/20 bg-elec-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Industry Roundup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Weekly digest of all important electrical industry news and updates</p>
                    <Button className="w-full">Subscribe</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SafetyShares;
