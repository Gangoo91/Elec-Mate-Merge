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
    <div key={index} className="bg-card/50 border border-elec-yellow/20 rounded-lg p-4 space-y-3">
      {/* Header with availability badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-elec-yellow text-sm truncate">{unit.brand} {unit.model}</h4>
          <p className="text-xs text-muted-foreground">{unit.ways}-way • {unit.mainSwitchRating}A</p>
        </div>
        <Badge variant={
          unit.availability === "excellent" ? "success" : 
          unit.availability === "good" ? "outline" : 
          "yellow"
        } className="text-xs shrink-0">
          {unit.availability}
        </Badge>
      </div>

      {/* Price and key features in compact row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-elec-yellow" />
          <span className="text-sm font-medium text-elec-yellow">£{unit.priceRange.min}-{unit.priceRange.max}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {unit.features.slice(0, 2).join(" • ")}
          {unit.features.length > 2 && ` +${unit.features.length - 2} more`}
        </div>
      </div>

      {/* Suppliers as compact badges */}
      <div className="flex flex-wrap gap-1">
        {unit.suppliers.slice(0, 3).map((supplier, idx) => (
          <Badge key={idx} variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/30">
            {supplier}
          </Badge>
        ))}
        {unit.suppliers.length > 3 && (
          <Badge variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/30">
            +{unit.suppliers.length - 3} more
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