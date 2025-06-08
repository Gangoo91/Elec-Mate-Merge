
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
    title: "BS 7671:2018+A2:2022 (18th Edition)",
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
    title: "IET On-Site Guide (BS 7671:2018+A2:2022)",
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "BS7671": return "bg-blue-500/20 text-blue-400";
      case "Testing": return "bg-green-500/20 text-green-400";
      case "Safety": return "bg-red-500/20 text-red-400";
      case "Equipment": return "bg-purple-500/20 text-purple-400";
      case "Wago": return "bg-orange-500/20 text-orange-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "BS7671": return <BookOpen className="h-4 w-4" />;
      case "Testing": return <Wrench className="h-4 w-4" />;
      case "Safety": return <Shield className="h-4 w-4" />;
      case "Equipment": return <Calculator className="h-4 w-4" />;
      case "Wago": return <Cable className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleResourceClick = (resource: Resource) => {
    if (resource.downloadUrl) {
      // Handle download
      window.open(resource.downloadUrl, '_blank');
    } else if (resource.externalUrl) {
      // Handle external link
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
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            BS7671 Testing Resources Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive collection of resources, guides, standards, and tools to support your 
            BS7671 inspection and testing work. Includes detailed Wago connector guidance and 
            professional testing procedures.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(groupedResources).map((category) => (
              <div key={category} className="text-center">
                <div className={`p-3 rounded-lg ${getCategoryColor(category)} mb-2`}>
                  {getCategoryIcon(category)}
                </div>
                <div className="text-sm font-medium">{category}</div>
                <div className="text-xs text-muted-foreground">
                  {groupedResources[category].length} resources
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
              {getCategoryIcon(category)}
            </div>
            <h3 className="text-xl font-semibold">{category} Resources</h3>
            <Badge variant="secondary">{categoryResources.length}</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {categoryResources.map((resource) => (
              <Card 
                key={resource.id} 
                className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors cursor-pointer"
                onClick={() => handleResourceClick(resource)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(resource.category)}`}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-base leading-tight">
                          {resource.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {resource.fileSize && (
                        <span>{resource.fileSize}</span>
                      )}
                      {resource.duration && (
                        <span>{resource.duration}</span>
                      )}
                    </div>
                    
                    <Button size="sm" variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
                      {resource.downloadUrl ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Featured Wago Resources Section */}
      <Card className="border-orange-500/30 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Cable className="h-5 w-5" />
            Featured: Wago Connector Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Specially curated resources for using Wago connectors in testing applications. 
            These resources will help you make safe, reliable connections during BS7671 testing procedures.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <h4 className="font-semibold text-orange-300 mb-2">Quick Reference</h4>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• 221 Series: General testing connections</li>
                <li>• 773 Series: Test point access</li>
                <li>• 222 Series: Permanent installations</li>
                <li>• Selection guide and troubleshooting</li>
              </ul>
            </div>
            
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <h4 className="font-semibold text-orange-300 mb-2">Safety Benefits</h4>
              <ul className="space-y-1 text-sm text-orange-100">
                <li>• No conductor damage during testing</li>
                <li>• Reliable, repeatable connections</li>
                <li>• Visual verification of connection</li>
                <li>• Reduced risk of short circuits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-300 mb-2">Important Disclaimer</h4>
              <p className="text-sm text-amber-100">
                Always ensure you have the latest versions of standards and guidance documents. 
                Some external links may require subscription or purchase. Verify the authenticity 
                of all downloaded resources and ensure they are from official sources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
