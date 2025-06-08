
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Wrench, 
  Shield, 
  Zap,
  Search
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CableType {
  application: string;
  cable: string;
  protection: string;
  notes: string;
}

interface InstallationGuideTabsProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  commonTypes: string[];
  cableTypes: CableType[];
  keyStandards: string[];
  planningContent: string;
  safetyContent: string;
  complianceContent: string;
  additionalCards?: React.ReactNode;
  safetyNotice: {
    title: string;
    points: Array<{
      title: string;
      content: string;
    }>;
  };
}

const InstallationGuideTabs = ({ 
  title,
  icon: Icon,
  description,
  commonTypes,
  cableTypes,
  keyStandards,
  planningContent,
  safetyContent,
  complianceContent,
  additionalCards,
  safetyNotice
}: InstallationGuideTabsProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCableTypes = cableTypes.filter(cable => 
    cable.application.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cable.cable.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-elec-yellow">
            {title}
          </h1>
        </div>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Search Bar */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search cables, applications, or protection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Technical</span>
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Planning</span>
          </TabsTrigger>
          <TabsTrigger value="reference" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Reference</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Common Installation Types</CardTitle>
              <p className="text-muted-foreground">Typical work you'll encounter</p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonTypes.map((type, index) => (
                  <div key={index} className="bg-elec-dark/40 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-white">
                      <Zap className="h-4 w-4 text-elec-yellow" />
                      {type}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {additionalCards}
        </TabsContent>

        {/* Technical Details Tab */}
        <TabsContent value="technical" className="space-y-6">
          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Cable Types & Protection</CardTitle>
              <p className="text-muted-foreground">Standard specifications and protection requirements</p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {filteredCableTypes.map((cable, index) => (
                  <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-base mb-1">{cable.application}</h4>
                        <p className="text-sm text-muted-foreground">{cable.notes}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                          {cable.cable}
                        </Badge>
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          {cable.protection}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredCableTypes.length === 0 && searchTerm && (
                <div className="text-center py-8 text-muted-foreground">
                  No cables found matching "{searchTerm}"
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/30 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
              <p className="text-muted-foreground">Essential compliance requirements</p>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3">
                {keyStandards.map((standard, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{standard}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planning & Safety Tab */}
        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow text-lg">Planning Considerations</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  {planningContent}
                </p>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow text-lg">Safety Procedures</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  {safetyContent}
                </p>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow text-lg">Testing & Certification</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  {complianceContent}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Safety Notice */}
          <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <CardHeader>
              <CardTitle className="text-orange-300 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                {safetyNotice.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3">
                {safetyNotice.points.map((point, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    <strong className="text-orange-300">{point.title}:</strong> {point.content}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Reference Tab */}
        <TabsContent value="reference" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Quick Cable Reference</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {cableTypes.slice(0, 4).map((cable, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-white">{cable.application}</span>
                      <Badge variant="outline" className="border-elec-yellow text-elec-yellow text-xs">
                        {cable.cable}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Essential Standards</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {keyStandards.slice(0, 4).map((standard, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {standard.split(' ')[0]} {standard.split(' ')[1]}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstallationGuideTabs;
