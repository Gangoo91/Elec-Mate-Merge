import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { Package, DollarSign, MapPin, ShoppingCart, CheckCircle } from "lucide-react";
import { getRecommendedConsumerUnit, ConsumerUnitData } from "./consumer-unit-database";

interface ConsumerUnitGuidanceProps {
  totalCircuits: number;
  recommendedMainSwitch: number;
}

export const ConsumerUnitGuidance: React.FC<ConsumerUnitGuidanceProps> = ({
  totalCircuits,
  recommendedMainSwitch
}) => {
  const recommendations = getRecommendedConsumerUnit(totalCircuits, recommendedMainSwitch);
  
  const renderConsumerUnit = (unit: ConsumerUnitData, index: number) => (
    <div key={index} className="py-4 border-b border-elec-yellow/10 last:border-b-0">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-elec-yellow text-sm">{unit.brand} {unit.model}</h4>
          <p className="text-xs text-muted-foreground">{unit.ways}-way • {unit.mainSwitchRating}A</p>
        </div>
        <Badge variant={
          unit.availability === "excellent" ? "success" : 
          unit.availability === "good" ? "outline" : 
          "yellow"
        } className="text-xs">
          {unit.availability}
        </Badge>
      </div>

      {/* Price row */}
      <div className="flex items-center gap-1 mb-2">
        <DollarSign className="h-3 w-3 text-elec-yellow" />
        <span className="text-sm font-medium text-elec-yellow">£{unit.priceRange.min}-{unit.priceRange.max}</span>
      </div>

      {/* Features */}
      <p className="text-xs text-muted-foreground mb-2">
        {unit.features.slice(0, 3).join(" • ")}
        {unit.features.length > 3 && ` +${unit.features.length - 3} more`}
      </p>

      {/* Suppliers */}
      <div className="flex flex-wrap gap-1">
        {unit.suppliers.slice(0, 3).map((supplier, idx) => (
          <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0.5">
            {supplier}
          </Badge>
        ))}
        {unit.suppliers.length > 3 && (
          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
            +{unit.suppliers.length - 3}
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <ResultCard 
      icon={<Package className="h-5 w-5" />}
      title="Consumer Unit Selection"
      status="info"
      className="w-full"
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-elec-yellow">Requirements</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Minimum Ways</p>
              <p className="font-medium text-elec-yellow">{totalCircuits + 2} ways</p>
              <p className="text-xs text-muted-foreground">({totalCircuits} circuits + 2 spare)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Main Switch Rating</p>
              <p className="font-medium text-elec-yellow">{recommendedMainSwitch}A minimum</p>
            </div>
          </div>
        </div>

        <MobileAccordion type="single" collapsible className="w-full">
          <MobileAccordionItem value="recommendations">
            <MobileAccordionTrigger icon={<ShoppingCart className="h-4 w-4" />}>
              View Recommended Consumer Units ({recommendations.length})
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="space-y-4 pt-4">
                {recommendations.length > 0 ? (
                  recommendations.slice(0, 3).map((unit, index) => renderConsumerUnit(unit, index))
                ) : (
                  <div className="text-center text-muted-foreground py-4">
                    <p>No standard consumer units meet the requirements.</p>
                    <p className="text-xs mt-1">Consider custom distribution board or multiple consumer units.</p>
                  </div>
                )}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        </MobileAccordion>

        {/* Quick Buying Guide */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-elec-yellow">Quick Buying Checklist:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Verify main switch rating meets calculated requirements</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Ensure sufficient ways for current circuits plus future expansion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Check RCD/RCBO compatibility for your protection strategy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Confirm SPD (surge protection) compatibility if required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Verify earthing system compatibility (TN-S, TN-C-S, TT)</span>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};