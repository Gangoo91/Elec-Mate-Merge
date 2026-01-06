
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  Video, 
  Calculator,
  Cable,
  Wrench,
  Shield,
  AlertTriangle
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "calculator" | "guide" | "standard";
  category: "BS7671" | "Testing" | "Safety" | "Equipment" | "Wago";
  downloadUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  duration?: string;
}

const resources: Resource[] = [
  // BS7671 Resources
  {
    id: "bs7671-18th-edition",
    title: "BS 7671:2018+A3:2024 (18th Edition)",
    description: "The complete IET Wiring Regulations standard for electrical installations",
    type: "standard",
    category: "BS7671",
    externalUrl: "https://electrical.theiet.org/bs-7671/",
    fileSize: "Digital access"
  },
  {
    id: "guidance-note-3",
    title: "Guidance Note 3: Inspection & Testing",
    description: "IET guidance on inspection and testing procedures for electrical installations",
    type: "guide",
    category: "Testing",
    externalUrl: "https://electrical.theiet.org/guidance-notes/",
    fileSize: "200+ pages"
  },
  {
    id: "on-site-guide",
    title: "IET On-Site Guide (BS 7671:2018+A3:2024)",
    description: "Practical guide for electrical installation work on site",
    type: "guide",
    category: "BS7671",
    externalUrl: "https://electrical.theiet.org/on-site-guide/",
    fileSize: "150+ pages"
  },
  
  // Testing Equipment Resources
  {
    id: "mft-calibration-guide",
    title: "Multifunction Tester Calibration Guide",
    description: "Guide to calibrating and maintaining multifunction test equipment",
    type: "document",
    category: "Equipment",
    downloadUrl: "/resources/mft-calibration-guide.pdf",
    fileSize: "2.5 MB"
  },
  {
    id: "test-equipment-comparison",
    title: "Test Equipment Comparison Chart",
    description: "Comparison of different MFT brands and models with specifications",
    type: "document",
    category: "Equipment",
    downloadUrl: "/resources/test-equipment-comparison.pdf",
    fileSize: "1.8 MB"
  },
  
  // Safety Resources
  {
    id: "safe-isolation-poster",
    title: "Safe Isolation Procedure Poster",
    description: "Laminated poster showing the 6-step safe isolation procedure",
    type: "document",
    category: "Safety",
    downloadUrl: "/resources/safe-isolation-poster.pdf",
    fileSize: "500 KB"
  },
  {
    id: "ppe-requirements",
    title: "PPE Requirements for Electrical Testing",
    description: "Guide to personal protective equipment required for different types of electrical testing",
    type: "document",
    category: "Safety",
    downloadUrl: "/resources/ppe-testing-requirements.pdf",
    fileSize: "1.2 MB"
  },
  
  // Wago Connector Resources
  {
    id: "wago-selection-guide",
    title: "Wago Connector Selection Guide",
    description: "Comprehensive guide to selecting the right Wago connector for your application",
    type: "guide",
    category: "Wago",
    downloadUrl: "/resources/wago-selection-guide.pdf",
    fileSize: "3.2 MB"
  },
  {
    id: "wago-installation-video",
    title: "Wago 221 Series Installation Video",
    description: "Step-by-step video guide for installing Wago 221 series lever nuts",
    type: "video",
    category: "Wago",
    externalUrl: "https://www.youtube.com/watch?v=wago221-install",
    duration: "12 mins"
  },
  {
    id: "wago-testing-applications",
    title: "Wago Connectors in Testing Applications",
    description: "Best practices for using Wago connectors during electrical testing procedures",
    type: "document",
    category: "Wago",
    downloadUrl: "/resources/wago-testing-applications.pdf",
    fileSize: "2.1 MB"
  },
  {
    id: "wago-troubleshooting",
    title: "Wago Connector Troubleshooting Guide",
    description: "Common issues with Wago connectors and their solutions",
    type: "document",
    category: "Wago",
    downloadUrl: "/resources/wago-troubleshooting.pdf",
    fileSize: "1.5 MB"
  },
  
  // Calculation Resources
  {
    id: "zs-calculator",
    title: "Earth Fault Loop Impedance Calculator",
    description: "Interactive calculator for Zs values with BS 7671 reference tables",
    type: "calculator",
    category: "Testing",
    externalUrl: "/apprentice/calculators/zs-values"
  },
  {
    id: "r1r2-calculator",
    title: "R1+R2 Calculator",
    description: "Calculate expected R1+R2 values for different cable types and lengths",
    type: "calculator",
    category: "Testing",
    externalUrl: "/apprentice/calculators/r1r2"
  },
  
  // Video Resources
  {
    id: "testing-procedures-video",
    title: "BS 7671 Testing Procedures Complete Course",
    description: "Comprehensive video course covering all BS 7671 testing procedures",
    type: "video",
    category: "Testing",
    externalUrl: "https://example.com/testing-course",
    duration: "3.5 hours"
  },
  {
    id: "rcd-testing-video",
    title: "RCD Testing Techniques",
    description: "Professional techniques for RCD testing including troubleshooting",
    type: "video",
    category: "Testing",
    externalUrl: "https://example.com/rcd-testing",
    duration: "45 mins"
  }
];

const ResourcesTab = () => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document": return <FileText className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "calculator": return <Calculator className="h-5 w-5" />;
      case "guide": return <BookOpen className="h-5 w-5" />;
      case "standard": return <Shield className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "BS7671": return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: <BookOpen className="h-4 w-4" /> };
      case "Testing": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: <Wrench className="h-4 w-4" /> };
      case "Safety": return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', icon: <Shield className="h-4 w-4" /> };
      case "Equipment": return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', icon: <Calculator className="h-4 w-4" /> };
      case "Wago": return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', icon: <Cable className="h-4 w-4" /> };
      default: return { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20', icon: <FileText className="h-4 w-4" /> };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "document": return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
      case "video": return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' };
      case "calculator": return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case "guide": return { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' };
      case "standard": return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      default: return { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  const handleResourceClick = (resource: Resource) => {
    if (resource.downloadUrl) {
      window.open(resource.downloadUrl, '_blank');
    } else if (resource.externalUrl) {
      window.open(resource.externalUrl, '_blank');
    }
  };

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-cyan-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
              <BookOpen className="h-5 w-5 text-cyan-400" />
            </div>
            BS7671 Testing Resources Library
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <p className="text-white/70">
            Comprehensive collection of resources, guides, standards, and tools to support your
            BS7671 inspection and testing work. Includes detailed Wago connector guidance and
            professional testing procedures.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.keys(groupedResources).map((category) => {
              const config = getCategoryConfig(category);
              return (
                <div key={category} className="p-4 rounded-xl bg-white/10 border border-white/10 text-center hover:border-white/20 transition-colors">
                  <div className={`p-2.5 rounded-lg ${config.bg} border ${config.border} inline-block mb-2`}>
                    <span className={config.text}>{config.icon}</span>
                  </div>
                  <div className="text-sm font-medium text-white">{category}</div>
                  <div className="text-xs text-white/60">
                    {groupedResources[category].length} resources
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resource Categories */}
      {Object.entries(groupedResources).map(([category, categoryResources]) => {
        const categoryConfig = getCategoryConfig(category);
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${categoryConfig.bg} border ${categoryConfig.border}`}>
                <span className={categoryConfig.text}>{categoryConfig.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{category} Resources</h3>
              <Badge className={`${categoryConfig.bg} ${categoryConfig.text} border ${categoryConfig.border}`}>
                {categoryResources.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categoryResources.map((resource) => {
                const typeConfig = getTypeConfig(resource.type);
                return (
                  <Card
                    key={resource.id}
                    className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-elec-yellow/30 transition-all duration-300 cursor-pointer group overflow-hidden relative"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="pb-3 relative">
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl ${typeConfig.bg} border ${typeConfig.border} flex-shrink-0`}>
                          <span className={typeConfig.text}>{getResourceIcon(resource.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-white text-base leading-tight">
                            {resource.title}
                          </CardTitle>
                          <p className="text-sm text-white/60 mt-1">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/80">
                          {resource.fileSize && (
                            <span className="px-2 py-1 rounded-md bg-white/5">{resource.fileSize}</span>
                          )}
                          {resource.duration && (
                            <span className="px-2 py-1 rounded-md bg-white/5">{resource.duration}</span>
                          )}
                        </div>

                        <Button
                          size="sm"
                          className="h-9 bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 touch-manipulation"
                        >
                          {resource.downloadUrl ? (
                            <>
                              <Download className="h-3.5 w-3.5 mr-1.5" />
                              Download
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                              Open
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Featured Wago Resources Section */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
              <Cable className="h-5 w-5 text-orange-400" />
            </div>
            Featured: Wago Connector Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <p className="text-white/70">
            Specially curated resources for using Wago connectors in testing applications.
            These resources will help you make safe, reliable connections during BS7671 testing procedures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/10 border border-orange-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <BookOpen className="h-4 w-4 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white">Quick Reference</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "221 Series: General testing connections",
                  "773 Series: Test point access",
                  "222 Series: Permanent installations",
                  "Selection guide and troubleshooting"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-white">Safety Benefits</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "No conductor damage during testing",
                  "Reliable, repeatable connections",
                  "Visual verification of connection",
                  "Reduced risk of short circuits"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="pt-6 relative">
          <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                <AlertTriangle className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Important Disclaimer</h4>
                <p className="text-sm text-white/70">
                  Always ensure you have the latest versions of standards and guidance documents.
                  Some external links may require subscription or purchase. Verify the authenticity
                  of all downloaded resources and ensure they are from official sources.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
