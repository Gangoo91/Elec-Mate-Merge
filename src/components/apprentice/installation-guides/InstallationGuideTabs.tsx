
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Wrench, 
  Shield, 
  Zap,
  Search,
  ClipboardList,
  TestTube
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
  enhancedPlanningComponent?: React.ReactNode;
  enhancedCircuitComponent?: React.ReactNode;
  enhancedTestingComponent?: React.ReactNode;
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
  enhancedPlanningComponent,
  enhancedCircuitComponent,
  enhancedTestingComponent,
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
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Planning</span>
          </TabsTrigger>
          <TabsTrigger value="circuits" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Circuits</span>
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            <span className="hidden sm:inline">Testing</span>
          </TabsTrigger>
          <TabsTrigger value="reference" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
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

        {/* Planning Tab */}
        <TabsContent value="planning" className="space-y-6">
          {enhancedPlanningComponent || (
            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Planning Considerations</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  {planningContent}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Circuits Tab */}
        <TabsContent value="circuits" className="space-y-6">
          {enhancedCircuitComponent || (
            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Circuit Design</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Circuit design information and cable specifications.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-6">
          {enhancedTestingComponent || (
            <Card className="border-elec-yellow/30 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Testing & Certification</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  {complianceContent}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Reference Tab */}
        <TabsContent value="reference" className="space-y-6">
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
      </Tabs>
    </div>
  );
};

export default InstallationGuideTabs;
