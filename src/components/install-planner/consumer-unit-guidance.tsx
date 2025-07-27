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
    <div key={index} className="space-y-3 py-3 border-b border-elec-yellow/10 last:border-b-0">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-elec-yellow">{unit.brand} {unit.model}</h4>
          <p className="text-sm text-muted-foreground">{unit.ways}-way • {unit.mainSwitchRating}A main switch</p>
        </div>
        <Badge variant="outline" className={`${
          unit.availability === "excellent" ? "border-green-500/50 text-green-400" :
          unit.availability === "good" ? "border-blue-500/50 text-blue-400" :
          "border-amber-500/50 text-amber-400"
        }`}>
          {unit.availability}
        </Badge>
      </div>

      {/* Price & Features */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-elec-yellow" />
          <span className="text-elec-yellow">£{unit.priceRange.min}-{unit.priceRange.max}</span>
        </div>
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-elec-yellow" />
          <span className="text-elec-yellow">{unit.features.length} features</span>
        </div>
      </div>

      {/* Features */}
      <div>
        <p className="text-sm font-medium text-elec-yellow mb-2">Key Features:</p>
        <div className="flex flex-wrap gap-1">
          {unit.features.map((feature, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {/* Required Components */}
      <div>
        <p className="text-sm font-medium text-elec-yellow mb-2">Required Components:</p>
        <div className="space-y-1">
          {unit.requiredComponents.map((component, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{component}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suppliers */}
      <div>
        <p className="text-sm font-medium text-elec-yellow mb-2">Available from:</p>
        <div className="flex flex-wrap gap-2">
          {unit.suppliers.map((supplier, idx) => (
            <Badge key={idx} variant="outline" className="text-xs border-elec-yellow/30 text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {supplier}
            </Badge>
          ))}
        </div>
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