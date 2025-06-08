
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const EducationalResourcesTab = () => {
  const regulations = [
    {
      title: "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
      description: "The IET Wiring Regulations - fundamental standard for electrical installation design",
      sections: ["Chapter 13: Fundamental principles", "Chapter 41: Protection against electric shock", "Chapter 61: Initial verification"]
    },
    {
      title: "Health and Safety at Work etc. Act 1974",
      description: "Primary legislation covering occupational health and safety",
      sections: ["Section 2: General duties of employers", "Section 7: General duties of employees"]
    },
    {
      title: "Electricity at Work Regulations 1989",
      description: "Specific regulations for electrical work safety",
      sections: ["Regulation 4: Systems, work activities and protective equipment", "Regulation 13: Precautions for work on dead conductors"]
    },
    {
      title: "CDM Regulations 2015",
      description: "Construction (Design and Management) Regulations",
      sections: ["Part 2: Client duties", "Part 3: Health and safety duties", "Part 4: General requirements"]
    }
  ];

  const bestPractices = [
    {
      category: "Planning & Preparation",
      practices: [
        "Always review drawings and specifications before starting",
        "Confirm electrical supply arrangements and isolation points",
        "Check availability of required materials and tools",
        "Coordinate with other trades to avoid conflicts"
      ]
    },
    {
      category: "Documentation",
      practices: [
        "Complete risk assessments before commencing work",
        "Record all test results and measurements accurately",
        "Photograph significant conditions or findings",
        "Maintain clear and legible installation records"
      ]
    },
    {
      category: "Safety Culture",
      practices: [
        "Challenge unsafe practices regardless of seniority",
        "Report near misses and unsafe conditions",
        "Participate actively in safety briefings",
        "Lead by example in following safety procedures"
      ]
    }
  ];

  const downloadableResources = [
    { name: "Site Assessment Checklist Template", type: "PDF", size: "245 KB" },
    { name: "Risk Assessment Matrix Template", type: "Excel", size: "89 KB" },
    { name: "Method Statement Template", type: "Word", size: "156 KB" },
    { name: "Electrical Safety Pocket Guide", type: "PDF", size: "1.2 MB" },
    { name: "PPE Inspection Checklist", type: "PDF", size: "178 KB" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Educational Resources & Guidance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive guidance, regulations, and best practices to support professional site assessment activities.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="regulations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="regulations">
          <div className="space-y-4">
            {regulations.map((reg, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{reg.title}</CardTitle>
                  <p className="text-muted-foreground">{reg.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-white mb-2">Key Sections:</h4>
                  <ul className="space-y-1">
                    {reg.sections.map((section, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                        {section}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-4" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Full Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="best-practices">
          <div className="space-y-4">
            {bestPractices.map((category, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.practices.map((practice, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        {practice}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="downloads">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Downloadable Templates & Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {downloadableResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">{resource.name}</h4>
                      <p className="text-sm text-muted-foreground">{resource.type} • {resource.size}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
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

export default EducationalResourcesTab;
