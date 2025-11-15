import { Card, CardContent } from '@/components/ui/card';
import { InstallationDesign } from '@/types/installation-design';
import { ChevronDown, Zap, MapPin, User, Building2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RequestSummaryHeaderProps {
  design: InstallationDesign;
}

export const RequestSummaryHeader = ({ design }: RequestSummaryHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract supply details from consumerUnit
  const voltage = design.consumerUnit?.incomingSupply?.voltage || 230;
  const phases = design.consumerUnit?.incomingSupply?.phases || 'single';
  const earthingSystem = design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-S';
  const ze = design.consumerUnit?.incomingSupply?.Ze || 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-3 sm:p-4">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto hover:bg-transparent"
            >
              <div className="flex items-center gap-2 sm:gap-3 text-left flex-1">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground">
                    {design.projectName || 'Circuit Design'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {design.circuits?.length || 0} circuit{(design.circuits?.length || 0) !== 1 ? 's' : ''} designed • {voltage}V {phases === 'three' ? '3-phase' : 'single-phase'}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-3 sm:pt-4">
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {/* Project Details */}
              {design.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 text-foreground">{design.location}</span>
                  </div>
                </div>
              )}

              {design.clientName && (
                <div className="flex items-start gap-2">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Client:</span>
                    <span className="ml-2 text-foreground">{design.clientName}</span>
                  </div>
                </div>
              )}

              {design.electricianName && (
                <div className="flex items-start gap-2">
                  <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Designer:</span>
                    <span className="ml-2 text-foreground">{design.electricianName}</span>
                  </div>
                </div>
              )}

              {/* Supply Details */}
              <div className="pt-2 sm:pt-3 border-t border-border/50">
                <h4 className="font-medium text-foreground mb-2">Supply Details</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Earthing:</span>
                    <span className="ml-2 text-foreground">{earthingSystem}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ze:</span>
                    <span className="ml-2 text-foreground">{ze}Ω</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};
