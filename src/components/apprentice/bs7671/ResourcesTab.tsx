
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileText, 
  Video, 
  Calculator,
  Smartphone,
  Globe,
  GraduationCap,
  Users,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const ResourcesTab = () => {
  const regulations = [
    {
      title: "BS 7671:2018 (18th Edition)",
      description: "The complete wiring regulations with all requirements for electrical installations",
      type: "Regulation",
      access: "Purchase Required",
      provider: "BSI",
      url: "https://shop.bsigroup.com"
    },
    {
      title: "Guidance Note 3: Inspection & Testing",
      description: "Comprehensive guidance on inspection and testing procedures",
      type: "Guidance",
      access: "IET Members",
      provider: "IET",
      url: "https://www.theiet.org"
    },
    {
      title: "On-Site Guide (18th Edition)",
      description: "Simplified version of BS 7671 for practical use on site",
      type: "Guide",
      access: "Purchase Required",
      provider: "IET",
      url: "https://www.theiet.org"
    }
  ];

  const tools = [
    {
      name: "MFT Calculator App",
      description: "Calculate R1+R2, Zs values and other testing parameters",
      platform: "iOS/Android",
      price: "Free",
      features: ["Cable calculations", "Test result validation", "Regulation lookup"]
    },
    {
      name: "BS 7671 Explorer",
      description: "Interactive regulation search and reference tool",
      platform: "Web/Mobile",
      price: "Subscription",
      features: ["Regulation search", "Amendment tracking", "Guidance notes"]
    },
    {
      name: "Electrical Installation App",
      description: "Complete electrical installation reference and calculator",
      platform: "iOS/Android",
      price: "£19.99",
      features: ["Cable sizing", "Protection calculations", "Certification templates"]
    }
  ];

  const trainingProviders = [
    {
      name: "City & Guilds",
      courses: ["2391 Inspection & Testing", "2394/2395 Design & Verification", "18th Edition"],
      delivery: "Classroom/Online",
      recognition: "Industry Standard"
    },
    {
      name: "EAL (NICEIC)",
      courses: ["Inspection & Testing Courses", "18th Edition Updates", "Advanced Testing"],
      delivery: "Classroom/Online",
      recognition: "Industry Recognised"
    },
    {
      name: "NAPIT Training",
      courses: ["Testing & Inspection", "Design & Installation", "Periodic Inspection"],
      delivery: "Classroom",
      recognition: "Industry Recognised"
    }
  ];

  const quickReferences = [
    {
      title: "Maximum Zs Values Quick Reference",
      description: "Table of maximum earth fault loop impedance values for common protective devices",
      category: "Testing Limits",
      downloadable: true
    },
    {
      title: "RCD Testing Flowchart",
      description: "Step-by-step flowchart for comprehensive RCD testing procedures",
      category: "Testing Procedures",
      downloadable: true
    },
    {
      title: "Cable Current Capacity Tables",
      description: "Current carrying capacity for common cable types and installation methods",
      category: "Design Reference",
      downloadable: true
    },
    {
      title: "Testing Equipment Calibration Schedule",
      description: "Recommended calibration intervals for electrical test equipment",
      category: "Equipment Management",
      downloadable: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            BS 7671 Resources & References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive collection of resources, tools, and references to support your BS 7671 
            inspection and testing work. From official regulations to practical tools and training opportunities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-300">Official</div>
              <div className="text-sm text-muted-foreground">Standards & Guidance</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 text-center">
              <Smartphone className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-300">Digital Tools</div>
              <div className="text-sm text-muted-foreground">Apps & Calculators</div>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20 text-center">
              <GraduationCap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-300">Training</div>
              <div className="text-sm text-muted-foreground">Courses & Development</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Official Regulations & Standards */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Official Regulations & Standards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regulations.map((reg, index) => (
              <div key={index} className="bg-elec-gray/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{reg.title}</h4>
                    <p className="text-sm text-muted-foreground">{reg.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400">{reg.type}</Badge>
                    <Badge variant="outline" className="text-xs">{reg.access}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Provider: {reg.provider}</span>
                  <Button size="sm" variant="outline" className="border-green-500/30 text-green-400">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Access
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Digital Tools & Apps */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Digital Tools & Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="bg-elec-gray/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                    <div className="flex gap-2 mb-3">
                      <Badge className="bg-purple-500/20 text-purple-400 text-xs">{tool.platform}</Badge>
                      <Badge variant="outline" className="text-xs">{tool.price}</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-purple-300">Features:</h5>
                  <ul className="space-y-1">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training & Education */}
      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="text-yellow-300 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Training & Education Providers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingProviders.map((provider, index) => (
              <div key={index} className="bg-elec-gray/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {provider.name}
                    </h4>
                    <Badge className="bg-yellow-500/20 text-yellow-400 mt-2">{provider.recognition}</Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">{provider.delivery}</Badge>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-yellow-300 mb-2">Available Courses:</h5>
                  <div className="flex flex-wrap gap-2">
                    {provider.courses.map((course, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-yellow-500/30 text-yellow-200">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-3 border-yellow-500/30 text-yellow-400">
                  <Globe className="h-4 w-4 mr-2" />
                  View Courses
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Downloads */}
      <Card className="border-cyan-500/30 bg-cyan-500/5">
        <CardHeader>
          <CardTitle className="text-cyan-300 flex items-center gap-2">
            <Download className="h-5 w-5" />
            Quick Reference Downloads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickReferences.map((ref, index) => (
              <div key={index} className="bg-elec-gray/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{ref.title}</h4>
                    <p className="text-sm text-muted-foreground">{ref.description}</p>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400">{ref.category}</Badge>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                  disabled={!ref.downloadable}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {ref.downloadable ? 'Download PDF' : 'Coming Soon'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Important Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-amber-200">
              <strong>Always refer to the latest editions:</strong> Electrical regulations and standards are 
              regularly updated. Ensure you're working with the most current versions of all documents.
            </p>
            <p className="text-amber-200">
              <strong>Professional competence:</strong> Inspection and testing should only be carried out by 
              competent persons with appropriate qualifications and experience.
            </p>
            <p className="text-amber-200">
              <strong>Legal compliance:</strong> All work must comply with current UK legislation including 
              Building Regulations Part P and the Electricity at Work Regulations 1989.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
