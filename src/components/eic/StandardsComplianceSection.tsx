import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { FileCheck, Award, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface StandardsComplianceSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const StandardsComplianceSection: React.FC<StandardsComplianceSectionProps> = ({ formData, onUpdate, isOpen, onToggle }) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(isMobile ? "" : "border border-border bg-card overflow-hidden rounded-lg")}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        {isMobile ? (
          <button onClick={onToggle} className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20 w-full text-left">
            <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
              <Award className="h-5 w-5 text-orange-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Standards & Compliance</h3>
            </div>
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform shrink-0",
              isOpen && "rotate-180"
            )} />
          </button>
        ) : (
          <SectionHeader
            title="Standards and Compliance"
            icon={FileCheck}
            isOpen={isOpen}
            color="amber-500"
          />
        )}
        <CollapsibleContent>
          <div className={cn(
            "space-y-6",
            isMobile ? "px-4 py-4" : "p-4 sm:p-6"
          )}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="designStandard" className="font-medium text-sm">Design Standard</Label>
            <Select
              value={formData.designStandard || 'BS7671'}
              onValueChange={(value) => onUpdate('designStandard', value)}
            >
              <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select standard" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border text-foreground z-50">
                <SelectItem value="BS7671">BS 7671:18+A3:2024</SelectItem>
                <SelectItem value="other">Other Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="partPCompliance" className="font-medium text-sm">Part P Compliance</Label>
            <Select
              value={formData.partPCompliance || ''}
              onValueChange={(value) => onUpdate('partPCompliance', value)}
            >
              <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select compliance" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border text-foreground z-50">
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="notApplicable">Not Applicable</SelectItem>
                <SelectItem value="nonNotifiable">Non-notifiable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default StandardsComplianceSection;
