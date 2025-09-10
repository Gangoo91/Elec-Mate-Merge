
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
                    className="text-left bg-elec-gray hover:bg-elec-gray/80"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{standard.code}</div>
                      <div className="text-sm text-muted-foreground">{standard.description}</div>
                    </div>
                  </MobileAccordionTrigger>
                  <MobileAccordionContent>
                    <div className="p-4 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-white">{standard.title}</h4>
                        <p className="text-white leading-relaxed">{standard.scope}</p>
                        {standard.notes && (
                          <p className="text-primary font-medium">{standard.notes}</p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-base font-semibold text-white">Common Use Cases:</h5>
                        <ul className="space-y-2">
                          {standard.useCases.map((useCase, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1 text-sm font-bold">•</span>
                              <span className="text-white leading-relaxed">{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-base font-semibold text-white">Key Points:</h5>
                        <ul className="space-y-2">
                          {standard.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-white leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-base font-semibold text-white">Key Sections:</h5>
                        <ul className="space-y-2">
                          {standard.sections.map((section, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1 text-sm font-bold">§</span>
                              <span className="text-white leading-relaxed">{section}</span>
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
            <div className="space-y-4">
              {voltageDropLimits.map((item, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-semibold text-white text-base">{item.circuit}</span>
                    <span className="text-3xl font-bold text-primary">{item.limit}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white"><span className="font-semibold">Reference:</span> {item.reference}</p>
                    <p className="text-white"><span className="font-semibold">Application:</span> {item.application}</p>
                    <p className="text-white"><span className="font-semibold">Calculation:</span> {item.calculation}</p>
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
