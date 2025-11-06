import { Shield, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from '@/components/ui/mobile-accordion';
import { getRiskColors } from '@/utils/risk-level-helpers';

interface EnhancedHazardCardProps {
  hazard: any;
  index: number;
}

export const EnhancedHazardCard = ({ hazard, index }: EnhancedHazardCardProps) => {
  const riskScore = hazard.riskScore || (hazard.likelihood * hazard.severity);
  const riskColors = getRiskColors(riskScore);

  // Create likelihood dots
  const likelihoodDots = Array.from({ length: 5 }, (_, i) => i < hazard.likelihood);
  const severityDots = Array.from({ length: 5 }, (_, i) => i < hazard.severity);

  return (
    <div 
      className={`rounded-lg border-l-4 ${riskColors.border} bg-elec-card/50 overflow-hidden hover:shadow-lg transition-all`}
    >
      <MobileAccordion 
        type="single" 
        collapsible
        defaultValue={index < 3 ? `hazard-${index}` : undefined}
      >
        <MobileAccordionItem value={`hazard-${index}`}>
          <MobileAccordionTrigger className="w-full bg-transparent hover:bg-elec-gray/30 border-0 rounded-lg p-4 cursor-pointer">
            <div className="flex items-start gap-3 w-full">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-base mb-2">{hazard.hazard}</h4>
                <Badge className={riskColors.badge}>
                  Risk Score: {riskScore}
                </Badge>
              </div>
            </div>
          </MobileAccordionTrigger>

          <MobileAccordionContent>
            <div className="space-y-4 pt-4 px-4 pb-4">
              {/* Control Measures */}
              {hazard.controlMeasure && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-amber-500 uppercase mb-1">
                        Control Measures
                      </div>
                      <div className="text-sm">{hazard.controlMeasure}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Likelihood & Severity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Likelihood
                  </div>
                  <div className="flex items-center gap-1">
                    {likelihoodDots.map((filled, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          filled ? 'bg-elec-yellow' : 'bg-elec-gray'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold">{hazard.likelihood}/5</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Severity
                  </div>
                  <div className="flex items-center gap-1">
                    {severityDots.map((filled, i) => (
                      <div
                        key={i}
                        className={`h-2 w-2 rounded-full ${
                          filled ? 'bg-red-500' : 'bg-elec-gray'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold">{hazard.severity}/5</span>
                  </div>
                </div>
              </div>

              {/* Regulation Reference */}
              {hazard.regulation && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-xs font-semibold text-blue-500 uppercase mb-1">
                    Regulation Reference
                  </div>
                  <div className="text-sm">{hazard.regulation}</div>
                </div>
              )}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};
