
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
    <div className="p-3 bg-black/20 rounded-lg border border-elec-yellow/20">
      <h4 className="font-medium text-white mb-2 text-sm">{section.title}</h4>
      <ul className="space-y-1">
        {section.requirements.map((req: string, idx: number) => (
          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{req}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader className="pb-3">
        <CardTitle className="text-elec-yellow text-base sm:text-lg">Industry-Specific Portfolio Sections</CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Tailor your portfolio content to match your specific area of electrical work
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="domestic">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="domestic" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Domestic</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Building className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Commercial</span>
            </TabsTrigger>
            <TabsTrigger value="industrial" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Factory className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Industrial</span>
            </TabsTrigger>
            <TabsTrigger value="renewable" className="flex flex-col items-center gap-1 p-2 text-xs">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Renewable</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="domestic" className="mt-3">
            <div className="space-y-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                Domestic Electrical Work
              </Badge>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {domesticSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="mt-3">
            <div className="space-y-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                Commercial Electrical Work
              </Badge>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {commercialSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="industrial" className="mt-3">
            <div className="space-y-3">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                Industrial Electrical Work
              </Badge>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {industrialSections.map((section, index) => (
                  <SectionCard key={index} section={section} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="renewable" className="mt-3">
            <div className="space-y-3">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                Renewable Energy Systems
              </Badge>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
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
