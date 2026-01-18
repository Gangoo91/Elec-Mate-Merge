
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, LucideIcon, FileText, ClipboardList, Zap, CheckCircle, Shield, BookOpen } from "lucide-react";

interface SafetyPoint {
  title: string;
  content: string;
}

interface SafetyNotice {
  title: string;
  points: SafetyPoint[];
}

interface CableType {
  application: string;
  cable: string;
  protection: string;
  notes: string;
}

interface InstallationGuideTabsProps {
  title: string;
  icon: LucideIcon;
  description: string;
  commonTypes: string[];
  cableTypes: CableType[];
  keyStandards: string[];
  planningContent: string;
  safetyContent: string;
  complianceContent: string;
  enhancedOverviewComponent?: React.ReactNode;
  enhancedPlanningComponent?: React.ReactNode;
  enhancedCircuitComponent?: React.ReactNode;
  enhancedTestingComponent?: React.ReactNode;
  enhancedReferenceComponent?: React.ReactNode;
  bottomSafetyNotice?: SafetyNotice;
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
  enhancedOverviewComponent,
  enhancedPlanningComponent,
  enhancedCircuitComponent,
  enhancedTestingComponent,
  enhancedReferenceComponent,
  bottomSafetyNotice
}: InstallationGuideTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabOptions = [
    { value: "overview", label: "Overview", icon: FileText },
    { value: "planning", label: "Planning", icon: ClipboardList },
    { value: "circuits", label: "Circuits", icon: Zap },
    { value: "testing", label: "Testing", icon: CheckCircle },
    { value: "compliance", label: "Compliance", icon: Shield },
    { value: "reference", label: "Reference", icon: BookOpen }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return enhancedOverviewComponent || (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
              <CardHeader>
                <CardTitle className="text-elec-yellow text-xl">Common Installation Types</CardTitle>
                <CardDescription className="text-neutral-300">Typical projects you'll encounter in domestic electrical work</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {commonTypes.map((type, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-elec-yellow text-lg">•</span>
                      <span className="text-sm text-white">{type}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
              <CardHeader>
                <CardTitle className="text-elec-yellow text-xl">Safety & Compliance</CardTitle>
                <CardDescription className="text-neutral-300">Essential safety practices for domestic installations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {safetyContent}
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "planning":
        return enhancedPlanningComponent || (
          <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow text-xl">Installation Planning</CardTitle>
              <CardDescription className="text-neutral-300">Comprehensive planning approach for domestic installations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {planningContent}
              </p>
            </CardContent>
          </Card>
        );
      case "circuits":
        return enhancedCircuitComponent || (
          <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow text-xl">Circuit Design & Cable Selection</CardTitle>
              <CardDescription className="text-neutral-300">Standard circuits and cable specifications for domestic installations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-elec-yellow/30 bg-elec-yellow/10">
                      <th className="text-left p-3 text-elec-yellow font-semibold">Application</th>
                      <th className="text-left p-3 text-elec-yellow font-semibold">Cable</th>
                      <th className="text-left p-3 text-elec-yellow font-semibold">Protection</th>
                      <th className="text-left p-3 text-elec-yellow font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cableTypes.map((cable, index) => (
                      <tr key={index} className={`border-b border-elec-yellow/10 hover:bg-elec-yellow/5 transition-colors ${index % 2 === 0 ? 'bg-black/10' : 'bg-transparent'}`}>
                        <td className="p-3 text-sm text-white">{cable.application}</td>
                        <td className="p-3 text-sm font-mono text-elec-yellow/90">{cable.cable}</td>
                        <td className="p-3 text-sm text-white">{cable.protection}</td>
                        <td className="p-3 text-xs text-neutral-300">{cable.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      case "testing":
        return enhancedTestingComponent || (
          <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow text-xl">Testing & Verification</CardTitle>
              <CardDescription className="text-neutral-300">Essential testing procedures for domestic installations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-200 mb-4 leading-relaxed">
                All domestic electrical installations must undergo comprehensive testing and verification in accordance with BS 7671 requirements.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 bg-elec-yellow/10 hover:bg-elec-yellow/20 transition-colors">Continuity Testing</Badge>
                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 bg-elec-yellow/10 hover:bg-elec-yellow/20 transition-colors">Insulation Resistance</Badge>
                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 bg-elec-yellow/10 hover:bg-elec-yellow/20 transition-colors">Polarity Testing</Badge>
                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 bg-elec-yellow/10 hover:bg-elec-yellow/20 transition-colors">Earth Fault Loop Impedance</Badge>
                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 bg-elec-yellow/10 hover:bg-elec-yellow/20 transition-colors">RCD Testing</Badge>
              </div>
            </CardContent>
          </Card>
        );
      case "compliance":
        return enhancedReferenceComponent ? (
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
              <CardHeader>
                <CardTitle className="text-elec-yellow text-xl">Regulatory Compliance</CardTitle>
                <CardDescription className="text-neutral-300">Legal and regulatory requirements for domestic electrical work</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-200 mb-4 leading-relaxed">
                  {complianceContent}
                </p>
              </CardContent>
            </Card>
            {enhancedReferenceComponent}
          </div>
        ) : (
          <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow text-xl">Regulatory Compliance</CardTitle>
              <CardDescription className="text-neutral-300">Legal and regulatory requirements for domestic electrical work</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-200 mb-4 leading-relaxed">
                {complianceContent}
              </p>
            </CardContent>
          </Card>
        );
      case "reference":
        return (
          <Card className="border-elec-yellow/20 bg-white/5 backdrop-blur-sm hover:border-elec-yellow/40 transition-all duration-300 shadow-lg shadow-black/20">
            <CardHeader>
              <CardTitle className="text-elec-yellow text-xl">Key Standards & Regulations</CardTitle>
              <CardDescription className="text-neutral-300">Essential standards and regulations for domestic electrical installations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {keyStandards.map((standard, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-elec-yellow mt-1 text-lg">•</span>
                    <span className="text-sm text-white">{standard}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-elec-yellow/20 blur-xl rounded-full" />
            <div className="relative bg-white/5 p-3 rounded-xl border border-elec-yellow/30">
              <Icon className="h-10 w-10 text-elec-yellow" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{title}</h1>
        </div>
        <p className="text-lg text-neutral-200 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="flex justify-center">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-[320px] md:w-[400px] bg-white/5 border-elec-yellow/30 hover:border-elec-yellow/50 transition-colors text-white h-12 text-base font-medium shadow-lg shadow-black/20">
              <SelectValue placeholder="Select section">
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentTab = tabOptions.find(tab => tab.value === activeTab);
                    const IconComponent = currentTab?.icon;
                    return (
                      <>
                        {IconComponent && <IconComponent className="h-5 w-5 text-elec-yellow" />}
                        <span>{currentTab?.label}</span>
                      </>
                    );
                  })()}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white/5 border-elec-yellow/30 shadow-xl shadow-black/30">
              {tabOptions.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <SelectItem
                    key={tab.value}
                    value={tab.value}
                    className="text-white hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 focus:text-white cursor-pointer active:bg-elec-yellow/30 transition-all touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-elec-yellow" />
                      <span>{tab.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-6">
          {renderTabContent()}
        </div>
      </div>

      {bottomSafetyNotice && (
        <Alert className="border-red-500/60 bg-red-500/15 mt-8 shadow-lg shadow-red-500/10 backdrop-blur-sm">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <AlertDescription>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-red-300 mb-3">
                {bottomSafetyNotice.title}
              </h3>
              <div className="space-y-4">
                {bottomSafetyNotice.points.map((point, index) => (
                  <div key={index} className="space-y-1 pl-2 border-l-2 border-red-500/40">
                    <h4 className="font-semibold text-red-200">{point.title}</h4>
                    <p className="text-sm text-red-100">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InstallationGuideTabs;
