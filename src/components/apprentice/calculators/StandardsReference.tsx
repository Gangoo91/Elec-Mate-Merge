
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, CheckCircle, AlertTriangle, FileText, Settings, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MobileAccordion,
  MobileAccordionContent,
  MobileAccordionItem,
  MobileAccordionTrigger,
} from "@/components/ui/mobile-accordion";
import { ukElectricalStandards, voltageDropLimits } from "@/data/standards";

const StandardsReference = () => {
  const getStandardIcon = (code: string) => {
    if (code.includes('7671')) return <Book className="h-5 w-5 text-primary" />;
    if (code.includes('60898')) return <Zap className="h-5 w-5 text-yellow-500" />;
    if (code.includes('61008')) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (code.includes('60439')) return <Settings className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Book className="h-5 w-5" />
            UK Electrical Standards Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Standards Accordion */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Key Standards Used in Calculations</h3>
            
            <MobileAccordion type="multiple" className="w-full space-y-2">
              {ukElectricalStandards.map((standard, index) => (
                <MobileAccordionItem key={index} value={`standard-${index}`}>
                  <MobileAccordionTrigger 
                    icon={getStandardIcon(standard.code)}
                    className="text-left"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{standard.code}</div>
                      <div className="text-sm text-muted-foreground">{standard.description}</div>
                    </div>
                  </MobileAccordionTrigger>
                  <MobileAccordionContent>
                    <div className="p-4 bg-card border border-border/50 rounded-b-lg space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{standard.title}</h4>
                        <p className="text-sm text-muted-foreground">{standard.scope}</p>
                        {standard.notes && (
                          <p className="text-xs text-primary mt-2 font-medium">{standard.notes}</p>
                        )}
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Common Use Cases:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {standard.useCases.map((useCase, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1 text-xs">•</span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Key Points:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {standard.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Key Sections:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {standard.sections.map((section, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1 text-xs">§</span>
                              {section}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </MobileAccordionContent>
                </MobileAccordionItem>
              ))}
            </MobileAccordion>
          </div>

          {/* Voltage Drop Limits */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">BS 7671 Voltage Drop Limits</h3>
            <div className="space-y-3">
              {voltageDropLimits.map((item, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-foreground">{item.circuit}</span>
                    <span className="text-2xl font-bold text-primary">{item.limit}</span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><span className="font-medium">Reference:</span> {item.reference}</p>
                    <p><span className="font-medium">Application:</span> {item.application}</p>
                    <p><span className="font-medium">Calculation:</span> {item.calculation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
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
