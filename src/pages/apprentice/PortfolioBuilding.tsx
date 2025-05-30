
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Camera, FileText, CheckCircle, AlertTriangle } from "lucide-react";

const PortfolioBuilding = () => {
  const portfolioSections = [
    {
      title: "Work Evidence Documentation",
      description: "How to properly document your practical work",
      items: [
        "Take clear before/after photos of installations",
        "Document materials used and quantities",
        "Record any problems encountered and solutions",
        "Note safety considerations and precautions taken"
      ]
    },
    {
      title: "Assessment Requirements",
      description: "What assessors look for in your portfolio",
      items: [
        "Evidence of planning and preparation",
        "Demonstration of safe working practices",
        "Quality of workmanship and attention to detail",
        "Understanding of regulations and standards"
      ]
    },
    {
      title: "Common Portfolio Mistakes",
      description: "Pitfalls to avoid when building your portfolio",
      items: [
        "Poor quality or unclear photographs",
        "Insufficient detail in work descriptions",
        "Missing safety documentation",
        "Not showing your individual contribution to team projects"
      ]
    }
  ];

  const documentationTips = [
    "Use a consistent format for all entries",
    "Include dates, locations, and supervisor details",
    "Explain your role in team projects clearly",
    "Link practical work to theoretical knowledge",
    "Show progression in complexity over time",
    "Include feedback from supervisors"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Building Your Work Portfolio</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Learn how to document your work properly and create a portfolio that impresses assessors
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Portfolio Essentials</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioSections.map((section, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{section.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Documentation Best Practices</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Essential Tips</h4>
              <ul className="space-y-2">
                {documentationTips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">
                Start documenting from day one! It's much harder to reconstruct your portfolio 
                later than to maintain it as you go. Set aside 10 minutes each day to update 
                your records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Remember</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your portfolio is more than just a collection of photos - it's proof of your learning 
            journey and professional development. Quality documentation now will make your 
            end-point assessment much smoother.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioBuilding;
