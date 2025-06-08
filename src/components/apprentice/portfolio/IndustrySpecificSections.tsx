
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Home, Building, Factory, Zap, CheckCircle } from "lucide-react";

const IndustrySpecificSections = () => {
  const domesticSections = [
    {
      title: "Domestic Installation Work",
      requirements: [
        "Consumer unit installations and upgrades",
        "Socket and lighting circuit installations",
        "Electric shower and cooker installations",
        "Smoke alarm and security system installations"
      ]
    },
    {
      title: "Testing and Certification",
      requirements: [
        "EICR testing and certification",
        "New installation testing certificates",
        "Portable appliance testing records",
        "Minor works certificates"
      ]
    },
    {
      title: "Customer Interaction",
      requirements: [
        "Customer consultation records",
        "Quotation and estimate examples",
        "Customer feedback and testimonials",
        "After-sales service documentation"
      ]
    }
  ];

  const commercialSections = [
    {
      title: "Commercial Installation Projects",
      requirements: [
        "Office lighting and power installations",
        "Retail and hospitality electrical work",
        "Distribution board installations",
        "Emergency lighting systems"
      ]
    },
    {
      title: "Project Management",
      requirements: [
        "Project planning and scheduling",
        "Material ordering and management",
        "Coordination with other trades",
        "Progress reporting and updates"
      ]
    },
    {
      title: "Compliance and Standards",
      requirements: [
        "Building regulations compliance",
        "BS 7671 application examples",
        "CDM regulations adherence",
        "Quality assurance procedures"
      ]
    }
  ];

  const industrialSections = [
    {
      title: "Industrial Systems",
      requirements: [
        "Motor control installations",
        "PLC and automation systems",
        "High voltage work (if qualified)",
        "Instrumentation and control wiring"
      ]
    },
    {
      title: "Maintenance Activities",
      requirements: [
        "Planned preventive maintenance",
        "Fault finding and diagnostics",
        "Emergency repair work",
        "Equipment upgrade projects"
      ]
    },
    {
      title: "Safety in Industrial Environments",
      requirements: [
        "Risk assessment documentation",
        "LOTO (Lock Out Tag Out) procedures",
        "Confined space work permits",
        "Arc flash safety protocols"
      ]
    }
  ];

  const renewableSections = [
    {
      title: "Solar PV Installations",
      requirements: [
        "Roof survey and design work",
        "DC and AC installation work",
        "Grid connection procedures",
        "Performance monitoring setup"
      ]
    },
    {
      title: "Energy Storage Systems",
      requirements: [
        "Battery storage installations",
        "EV charging point installations",
        "Smart grid technology work",
        "Energy efficiency assessments"
      ]
    },
    {
      title: "Renewable Energy Compliance",
      requirements: [
        "MCS certification requirements",
        "DNO application procedures",
        "Feed-in tariff documentation",
        "Environmental impact assessments"
      ]
    }
  ];

  const SectionCard = ({ section }: { section: any }) => (
    <div className="p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
      <h4 className="font-medium text-white mb-3">{section.title}</h4>
      <ul className="space-y-2">
        {section.requirements.map((req: string, idx: number) => (
          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            {req}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
      <CardHeader>
        <CardTitle className="text-elec-yellow">Industry-Specific Portfolio Sections</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tailor your portfolio content to match your specific area of electrical work
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="domestic">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="domestic" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Domestic</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Commercial</span>
            </TabsTrigger>
            <TabsTrigger value="industrial" className="flex items-center gap-1">
              <Factory className="h-4 w-4" />
              <span className="hidden sm:inline">Industrial</span>
            </TabsTrigger>
            <TabsTrigger value="renewable" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Renewable</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="domestic" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Domestic Electrical Work
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {domesticSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Commercial Electrical Work
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {commercialSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="industrial" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  Industrial Electrical Work
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {industrialSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="renewable" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Renewable Energy Systems
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renewableSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IndustrySpecificSections;
