
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Wrench, Zap, HardHat, FileText, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SiteJargon = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const jargonTerms = {
    electrical: [
      { term: "Sparky", definition: "Slang term for an electrician", category: "People" },
      { term: "Dead", definition: "Circuit or equipment with no electrical power", category: "Safety" },
      { term: "Live", definition: "Circuit or equipment that is energised", category: "Safety" },
      { term: "Earth/Ground", definition: "Connection to the ground for safety", category: "Safety" },
      { term: "Isolate", definition: "To disconnect power supply safely", category: "Safety" },
      { term: "MCB", definition: "Miniature Circuit Breaker", category: "Components" },
      { term: "RCD", definition: "Residual Current Device", category: "Components" },
      { term: "CU", definition: "Consumer Unit (fuse box)", category: "Components" },
      { term: "T&E", definition: "Twin and Earth cable", category: "Materials" },
      { term: "SWA", definition: "Steel Wire Armoured cable", category: "Materials" },
      { term: "Trunking", definition: "Protective housing for cables", category: "Materials" },
      { term: "Conduit", definition: "Tube for protecting and routing cables", category: "Materials" },
      { term: "Socket", definition: "Power outlet point", category: "Components" },
      { term: "Spur", definition: "Branch circuit from a ring main", category: "Circuits" },
      { term: "Ring Main", definition: "Ring circuit for power outlets", category: "Circuits" },
      { term: "Radial", definition: "Circuit that doesn't return to source", category: "Circuits" }
    ],
    construction: [
      { term: "Gaffer", definition: "Site foreman or supervisor", category: "People" },
      { term: "Chippy", definition: "Carpenter", category: "People" },
      { term: "Brickie", definition: "Bricklayer", category: "People" },
      { term: "Plumber", definition: "Water/heating system installer", category: "People" },
      { term: "Scaffy", definition: "Scaffolder", category: "People" },
      { term: "First Fix", definition: "Initial rough installation work", category: "Phases" },
      { term: "Second Fix", definition: "Final finishing installation work", category: "Phases" },
      { term: "Snagging", definition: "Identifying and fixing minor defects", category: "Quality" },
      { term: "Making Good", definition: "Repairing surfaces after installation", category: "Finishing" },
      { term: "Chase", definition: "Channel cut in wall for cables", category: "Installation" },
      { term: "Back Box", definition: "Metal box behind socket/switch", category: "Installation" },
      { term: "Dry Lining", definition: "Plasterboard wall finish", category: "Construction" },
      { term: "Screed", definition: "Level floor finish layer", category: "Construction" },
      { term: "DPC", definition: "Damp Proof Course", category: "Construction" },
      { term: "RSJ", definition: "Rolled Steel Joist (beam)", category: "Structure" },
      { term: "Cavity", definition: "Gap between inner and outer walls", category: "Structure" }
    ],
    safety: [
      { term: "PPE", definition: "Personal Protective Equipment", category: "Equipment" },
      { term: "RAMS", definition: "Risk Assessment Method Statement", category: "Documentation" },
      { term: "Permit to Work", definition: "Authorization for hazardous work", category: "Documentation" },
      { term: "Lock Off", definition: "Securing isolation points", category: "Procedures" },
      { term: "LOTO", definition: "Lock Out Tag Out procedure", category: "Procedures" },
      { term: "Hot Work", definition: "Work involving heat/sparks", category: "Activities" },
      { term: "Confined Space", definition: "Restricted access work area", category: "Environment" },
      { term: "Competent Person", definition: "Qualified supervisor for specific tasks", category: "People" },
      { term: "Safe System of Work", definition: "Formal safety procedure", category: "Procedures" },
      { term: "Near Miss", definition: "Incident that could have caused injury", category: "Reporting" },
      { term: "Toolbox Talk", definition: "Short safety briefing", category: "Communication" },
      { term: "Induction", definition: "Site safety briefing for new workers", category: "Training" },
      { term: "Hard Hat Area", definition: "Zone requiring head protection", category: "Zones" },
      { term: "Exclusion Zone", definition: "Area where access is restricted", category: "Zones" },
      { term: "Site Diary", definition: "Daily record of work and issues", category: "Documentation" },
      { term: "H&S", definition: "Health and Safety", category: "General" }
    ],
    tools: [
      { term: "Multi-meter", definition: "Electrical testing instrument", category: "Testing" },
      { term: "Insulation Tester", definition: "Device for testing cable insulation", category: "Testing" },
      { term: "PAT Tester", definition: "Portable appliance testing device", category: "Testing" },
      { term: "Earth Loop Tester", definition: "Tests earth fault loop impedance", category: "Testing" },
      { term: "Crimpers", definition: "Tool for joining cable terminals", category: "Hand Tools" },
      { term: "Wire Strippers", definition: "Tool for removing cable insulation", category: "Hand Tools" },
      { term: "Side Cutters", definition: "Pliers for cutting wire", category: "Hand Tools" },
      { term: "Long Nose", definition: "Long-nosed pliers", category: "Hand Tools" },
      { term: "Chasing Machine", definition: "Tool for cutting wall channels", category: "Power Tools" },
      { term: "SDS Drill", definition: "Heavy-duty masonry drill", category: "Power Tools" },
      { term: "Angle Grinder", definition: "Cutting and grinding tool", category: "Power Tools" },
      { term: "Reciprocating Saw", definition: "Demolition cutting tool", category: "Power Tools" },
      { term: "Fish Tape", definition: "Tool for pulling cables through conduit", category: "Installation" },
      { term: "Cable Rods", definition: "Flexible rods for cable pulling", category: "Installation" },
      { term: "Knockout Punch", definition: "Tool for making holes in panels", category: "Installation" },
      { term: "Torque Wrench", definition: "Tool for precise tightening", category: "Precision" }
    ]
  };

  const filterTerms = (terms: typeof jargonTerms.electrical) => {
    if (!searchTerm) return terms;
    return terms.filter(
      item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderTermsSection = (terms: typeof jargonTerms.electrical) => {
    const filteredTerms = filterTerms(terms);
    const categories = [...new Set(filteredTerms.map(term => term.category))];

    return (
      <div className="space-y-6">
        {categories.map(category => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-elec-yellow">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTerms
                  .filter(term => term.category === category)
                  .map((term, index) => (
                    <div key={index} className="p-3 bg-elec-gray rounded-lg border border-elec-yellow/20">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-elec-yellow">{term.term}</h4>
                        <Badge variant="outline" className="text-xs">
                          {term.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{term.definition}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Site Jargon & Terminology</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Common electrical and construction terms you'll hear on site - decode the language of the trade
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Toolbox" />
      </div>

      <Alert className="border-blue-500/50 bg-blue-500/10">
        <MessageSquare className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Understanding site jargon helps you communicate effectively with colleagues and demonstrates 
          your growing expertise in the electrical trade.
        </AlertDescription>
      </Alert>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search terms, definitions, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="electrical" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="electrical" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Electrical
          </TabsTrigger>
          <TabsTrigger value="construction" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Construction
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2">
            <HardHat className="h-4 w-4" />
            Safety
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="electrical">
          {renderTermsSection(jargonTerms.electrical)}
        </TabsContent>

        <TabsContent value="construction">
          {renderTermsSection(jargonTerms.construction)}
        </TabsContent>

        <TabsContent value="safety">
          {renderTermsSection(jargonTerms.safety)}
        </TabsContent>

        <TabsContent value="tools">
          {renderTermsSection(jargonTerms.tools)}
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-green-400 mb-2">Pro Tip</h3>
          <p className="text-muted-foreground">
            Don't be afraid to ask what terms mean - every experienced electrician was once in your position. 
            Most colleagues are happy to explain jargon and appreciate apprentices who ask questions to learn properly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteJargon;
