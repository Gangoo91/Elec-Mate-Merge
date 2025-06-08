
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SiteJargon = () => {
  const jargonTerms = [
    { term: "Sparky", definition: "Electrician" },
    { term: "Tails", definition: "Main incoming cables" },
    { term: "Trunking", definition: "Cable management system" },
    { term: "MCB", definition: "Miniature Circuit Breaker" },
    { term: "CU", definition: "Consumer Unit" },
    { term: "DB", definition: "Distribution Board" },
    { term: "PIR", definition: "Passive Infrared (motion sensor)" },
    { term: "SWA", definition: "Steel Wire Armoured cable" },
    { term: "RCD", definition: "Residual Current Device" },
    { term: "RCBO", definition: "Residual Current Breaker with Overcurrent protection" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Jargon & Terminology</h1>
          <p className="text-muted-foreground">Common electrical and construction terms you'll hear on site</p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-elec-yellow" />
            Common Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jargonTerms.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-elec-dark/30">
                <div className="font-semibold text-elec-yellow">{item.term}</div>
                <div className="text-sm text-elec-light/80">{item.definition}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteJargon;
