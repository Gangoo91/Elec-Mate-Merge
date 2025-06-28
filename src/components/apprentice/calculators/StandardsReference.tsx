
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StandardsReference = () => {
  const standards = [
    {
      code: "BS 7671:2018+A2:2022",
      title: "Requirements for Electrical Installations",
      description: "IET Wiring Regulations - 18th Edition",
      key_sections: [
        "Part 4 - Protection for Safety",
        "Chapter 52 - Selection and erection of wiring systems",
        "Appendix 4 - Current-carrying capacity and voltage drop"
      ]
    },
    {
      code: "BS EN 60898-1:2019",
      title: "Electrical accessories - Circuit-breakers for overcurrent protection",
      description: "MCB standards and ratings",
      key_sections: [
        "Breaking capacity requirements",
        "Trip characteristics (B, C, D curves)",
        "Installation and testing requirements"
      ]
    },
    {
      code: "BS EN 61008-1:2012",
      title: "Residual current operated circuit-breakers",
      description: "RCD standards and requirements",
      key_sections: [
        "Trip current ratings (30mA, 100mA, 300mA)",
        "Trip time requirements",
        "Testing procedures"
      ]
    }
  ];

  const voltageDropLimits = [
    { circuit: "Lighting circuits", limit: "3%", reference: "BS 7671 - 525.201" },
    { circuit: "Power circuits", limit: "5%", reference: "BS 7671 - 525.201" },
    { circuit: "Fixed heating", limit: "5%", reference: "BS 7671 - 525.201" },
    { circuit: "Motor circuits (starting)", limit: "10%", reference: "BS 7671 - 525.202" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Book className="h-5 w-5" />
            UK Electrical Standards Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Standards List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-300">Key Standards Used in Calculations</h3>
            {standards.map((standard, index) => (
              <div key={index} className="border border-blue-500/20 rounded-lg p-4 bg-blue-500/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-blue-200">{standard.code}</h4>
                    <p className="text-sm text-blue-300">{standard.title}</p>
                    <p className="text-xs text-muted-foreground">{standard.description}</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-500/20">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-blue-300 mb-1">Key Sections:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {standard.key_sections.map((section, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {section}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Voltage Drop Limits */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-300">BS 7671 Voltage Drop Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {voltageDropLimits.map((item, index) => (
                <div key={index} className="border border-blue-500/20 rounded p-3 bg-blue-500/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-200">{item.circuit}</span>
                    <span className="text-lg font-bold text-blue-400">{item.limit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.reference}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <Alert className="border-amber-500/20 bg-amber-500/10">
            <AlertDescription className="text-xs text-amber-200">
              <strong>Important:</strong> These calculators are based on current UK electrical standards but should not replace professional electrical design. 
              Always consult qualified personnel for critical installations and verify against the latest editions of relevant standards.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default StandardsReference;
