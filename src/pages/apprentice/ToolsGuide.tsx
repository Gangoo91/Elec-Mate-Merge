
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench, Toolbox, Shield, Ruler } from "lucide-react";

const ToolsGuide = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apprentice Tool Guide</h1>
          <p className="text-muted-foreground">
            Essential tools for UK electrical apprentices
          </p>
        </div>
        <Link to="/apprentice/toolbox">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="hand-tools" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hand-tools">Hand Tools</TabsTrigger>
          <TabsTrigger value="power-tools">Power Tools</TabsTrigger>
          <TabsTrigger value="test-equipment">Test Equipment</TabsTrigger>
          <TabsTrigger value="ppe">PPE & Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="hand-tools" className="space-y-4">
          <h2 className="text-2xl font-semibold text-elec-yellow">Essential Hand Tools</h2>
          <p className="text-muted-foreground">
            Every apprentice electrician in the UK should have the following hand tools in their toolkit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <ToolCard
              title="Screwdrivers"
              icon={<Wrench className="h-8 w-8 text-elec-yellow" />}
              description="You'll need a full set of insulated screwdrivers including flat-head (terminal and standard), Phillips, and Pozidriv. Look for VDE certified screwdrivers that are rated to 1000V."
              items={[
                "Flared terminal screwdriver (2.5mm & 4mm)",
                "Pozidriv (PZ1 & PZ2)",
                "Phillips (PH1 & PH2)",
                "Standard flat-head in various sizes",
                "VDE rating to BS EN 60900"
              ]}
            />

            <ToolCard
              title="Pliers & Cutters"
              icon={<Toolbox className="h-8 w-8 text-elec-yellow" />}
              description="A range of insulated pliers and cutters are essential for wire work and cable terminations."
              items={[
                "Combination pliers (160-180mm)",
                "Side cutters (160mm)",
                "Long nose pliers (200mm)",
                "Wire strippers with cable crimping function",
                "Cable sheath stripping knife (must be insulated)"
              ]}
            />

            <ToolCard
              title="Spanners & Wrenches"
              icon={<Wrench className="h-8 w-8 text-elec-yellow" />}
              description="For tightening nuts and bolts on electrical equipment and enclosures."
              items={[
                "Adjustable wrench (200-250mm)",
                "Set of combination spanners (8-17mm)",
                "Hexagon keys (metric)",
                "Conduit box spanner set"
              ]}
            />

            <ToolCard
              title="Measuring & Marking"
              icon={<Ruler className="h-8 w-8 text-elec-yellow" />}
              description="Precision is crucial for electrical installations and tracking material usage."
              items={[
                "Tape measure (5m minimum)",
                "Spirit level (600mm minimum)",
                "Steel rule (300mm)",
                "Cable measuring wheel",
                "Carpenter's pencil and permanent marker"
              ]}
            />
          </div>

          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-medium text-elec-yellow mb-2">UK Electrical Standards Note</h3>
            <p>
              Tools used in the UK must comply with British Standards for electrical safety. Look for BS EN 60900 certification for insulated tools and the BS kite mark on safety equipment. Tools should be regularly inspected for damage to insulation or wear.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="power-tools" className="space-y-4">
          <h2 className="text-2xl font-semibold text-elec-yellow">Power Tools</h2>
          <p className="text-muted-foreground">
            While your employer often provides larger power tools, having some basics of your own is advantageous.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <ToolCard
              title="Cordless Drill/Driver"
              icon={<Toolbox className="h-8 w-8 text-elec-yellow" />}
              description="An essential power tool for electrical installations."
              items={[
                "18V lithium-ion battery system",
                "Two batteries minimum (one charging while one in use)",
                "Fast charger",
                "HSS drill bit set",
                "Screwdriver bit set with magnetic holder"
              ]}
            />

            <ToolCard
              title="Inspection Tools"
              icon={<Toolbox className="h-8 w-8 text-elec-yellow" />}
              description="For accessing and examining difficult-to-reach areas."
              items={[
                "Inspection lamp/torch (preferably LED)",
                "Inspection mirror",
                "Flexible magnetic pick-up tool",
                "Cable fishing rods"
              ]}
            />
          </div>

          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-medium text-elec-yellow mb-2">Power Tool Safety</h3>
            <p>
              Always ensure power tools are PAT tested annually (or as per company policy). Tools with damaged casings or cables should be immediately taken out of service. Follow manufacturer guidelines for usage and maintenance.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="test-equipment" className="space-y-4">
          <h2 className="text-2xl font-semibold text-elec-yellow">Test Equipment</h2>
          <p className="text-muted-foreground">
            As you progress through your apprenticeship, you'll need appropriate test equipment that meets UK regulations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <ToolCard
              title="Basic Test Equipment"
              icon={<Toolbox className="h-8 w-8 text-elec-yellow" />}
              description="Essential testing tools for day-to-day work."
              items={[
                "Voltage indicator (approved to GS38)",
                "Proving unit for testing your voltage indicator",
                "Continuity tester",
                "Socket tester",
                "Test leads with fused probes"
              ]}
            />

            <ToolCard
              title="Advanced Testing (Later Years)"
              icon={<Toolbox className="h-8 w-8 text-elec-yellow" />}
              description="Equipment needed as you progress to testing and inspection."
              items={[
                "Multifunction installation tester (compliant with 18th Edition)",
                "Earth loop impedance tester",
                "RCD tester",
                "Insulation resistance tester",
                "Test leads and accessories"
              ]}
            />
          </div>

          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-medium text-elec-yellow mb-2">18th Edition Testing Requirements</h3>
            <p>
              The BS 7671:2018 Amendment 2:2022 (18th Edition) of the IET Wiring Regulations specifies requirements for electrical installations. Your test equipment must comply with these regulations. Always ensure your equipment is calibrated annually and has valid certificates.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="ppe" className="space-y-4">
          <h2 className="text-2xl font-semibold text-elec-yellow">PPE & Safety Equipment</h2>
          <p className="text-muted-foreground">
            Personal Protective Equipment is essential for every UK electrical apprentice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <ToolCard
              title="Basic PPE"
              icon={<Shield className="h-8 w-8 text-elec-yellow" />}
              description="Minimum safety equipment for everyday work."
              items={[
                "Safety boots (compliant with BS EN ISO 20345)",
                "Hard hat (BS EN 397)",
                "Safety glasses (BS EN 166)",
                "Work gloves",
                "Hi-visibility vest (BS EN ISO 20471)"
              ]}
            />

            <ToolCard
              title="Specialist PPE"
              icon={<Shield className="h-8 w-8 text-elec-yellow" />}
              description="Additional protection for specific tasks."
              items={[
                "Arc flash protection (when working on live equipment)",
                "Insulating gloves (BS EN 60903)",
                "Ear defenders (BS EN 352)",
                "FFP3 dust mask (for drilling)",
                "Knee pads (for floor work)"
              ]}
            />
          </div>

          <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-medium text-elec-yellow mb-2">PPE Regulations in the UK</h3>
            <p>
              The Personal Protective Equipment at Work Regulations 1992 (amended in 2022) requires employers to provide adequate PPE. However, apprentices should have their own basic PPE. Always ensure your PPE is in good condition and appropriate for the task at hand.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-elec-yellow">Tool Storage & Organization</h2>
        <p>
          A good quality tool bag or box is essential for organizing and protecting your tools. Consider:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>A hard-bottom tool bag with multiple compartments</li>
          <li>Tool belt for keeping frequently used items accessible</li>
          <li>Small component organizers for screws, terminals, etc.</li>
          <li>Tool tracking system (simple inventory list or app)</li>
        </ul>
        
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
          <h3 className="text-lg font-medium text-elec-yellow mb-2">UK Apprentice Tip</h3>
          <p>
            Many UK electrical wholesalers like CEF, City Electrical Factors, and Edmundson Electrical offer apprentice discounts on tools. Always bring your apprentice ID card or college enrollment confirmation when purchasing tools. Some manufacturers also offer apprentice starter kits at discounted rates.
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-elec-yellow">Recommended Brands in the UK</h2>
        <p>
          Quality tools are an investment in your career. Here are some respected brands in the UK electrical industry:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <BrandCard 
            category="Hand Tools" 
            brands={["CK Tools", "Knipex", "Wera", "Stanley", "Draper"]}
          />
          <BrandCard 
            category="Power Tools" 
            brands={["Makita", "DeWalt", "Milwaukee", "Bosch Professional", "Festool"]}
          />
          <BrandCard 
            category="Test Equipment" 
            brands={["Fluke", "Megger", "Metrel", "Kewtech", "Di-Log"]}
          />
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold text-elec-yellow">Building Your Tool Collection</h2>
        <p>
          As an apprentice electrician in the UK, building your tool collection takes time. Focus on these priorities:
        </p>

        <ol className="list-decimal pl-6 space-y-2 mt-4">
          <li>
            <strong>First Year:</strong> Focus on basic hand tools, PPE, and a voltage indicator approved to GS38.
          </li>
          <li>
            <strong>Second Year:</strong> Add better quality screwdrivers, pliers, and basic power tools.
          </li>
          <li>
            <strong>Third Year:</strong> Begin investing in basic test equipment beyond a voltage indicator.
          </li>
          <li>
            <strong>Fourth Year:</strong> Complete your collection with advanced test equipment needed for commissioning and testing to the 18th Edition requirements.
          </li>
        </ol>

        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-medium text-elec-yellow mb-2">Final Advice</h3>
          <p>
            Tool theft is unfortunately common on construction sites. Always mark your tools with your name or unique identifier. Consider insuring your tools once your collection grows in value. Some specialist insurance policies for tradespeople cover tools in vans and on site.
          </p>
        </div>
      </div>
    </div>
  );
};

// Tool Card Component
const ToolCard = ({ 
  title, 
  icon, 
  description, 
  items 
}: { 
  title: string; 
  icon: React.ReactNode; 
  description: string; 
  items: string[] 
}) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-elec-light/80 mb-4">
          {description}
        </CardDescription>
        <ul className="list-disc pl-6 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm">{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Brand Card Component
const BrandCard = ({ 
  category, 
  brands 
}: { 
  category: string; 
  brands: string[] 
}) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1">
          {brands.map((brand, i) => (
            <li key={i} className="text-sm">{brand}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ToolsGuide;
