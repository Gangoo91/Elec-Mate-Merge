import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Package, 
  Lightbulb, 
  AlertCircle, 
  Star,
  Calculator
} from "lucide-react";
import { EnhancedMaterialItem, SmartPricingCalculator, PricingSettings } from "@/data/electrician/enhancedPricingData";

interface SmartPricingWidgetProps {
  material: EnhancedMaterialItem;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToQuote: (material: EnhancedMaterialItem, quantity: number, pricing: any) => void;
  settings?: Partial<PricingSettings>;
}

export const SmartPricingWidget = ({ 
  material, 
  quantity, 
  onQuantityChange, 
  onAddToQuote,
  settings = {}
}: SmartPricingWidgetProps) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const pricing = SmartPricingCalculator.calculatePrice(material, quantity, settings);
  const suggestion = SmartPricingCalculator.suggestOptimalQuantity(material, quantity);
  
  const getConfidenceBadge = () => {
    const colors = {
      high: "bg-green-500/20 text-green-300 border-green-500/50",
      medium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50", 
      low: "bg-red-500/20 text-red-300 border-red-500/50"
    };
    
    return (
      <Badge className={colors[material.confidenceLevel]}>
        {material.confidenceLevel} confidence
      </Badge>
    );
  };
  
  const getDifficultyIcon = () => {
    switch (material.installationDifficulty) {
      case 'easy': return <span className="text-green-400">●</span>;
      case 'medium': return <span className="text-yellow-400">●</span>;
      case 'hard': return <span className="text-red-400">●</span>;
    }
  };

  return (
    <TooltipProvider>
      <Card className="bg-card/50 border-elec-yellow/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                {material.name}
                {material.isFavourite && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-elec-light/80">{material.brand}</span>
                <span className="text-xs text-elec-light/60">•</span>
                <span className="text-xs text-elec-light/60">{material.code}</span>
              </div>
            </div>
            {getConfidenceBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Pricing Display */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-elec-light/80">Unit Price</Label>
              <div className="text-xl font-bold text-elec-yellow">
                £{pricing.unitPrice.toFixed(2)}
              </div>
              {pricing.discountApplied > 0 && (
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <TrendingDown className="h-3 w-3" />
                  {pricing.discountApplied}% discount
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-xs text-elec-light/80">Total Cost</Label>
              <div className="text-xl font-bold text-white">
                £{pricing.total.toFixed(2)}
              </div>
              <div className="text-xs text-elec-light/60">
                inc. VAT
              </div>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Quantity</Label>
              {typeof suggestion === 'object' && suggestion.extraUnits > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-elec-yellow hover:text-elec-dark hover:bg-elec-yellow"
                      onClick={() => typeof suggestion === 'object' ? onQuantityChange(suggestion.suggested) : undefined}
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      Suggest {typeof suggestion === 'object' ? suggestion.suggested : quantity}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{typeof suggestion === 'object' ? suggestion.reason : ''}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={quantity}
                onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                className="flex-1"
              />
              <span className="text-sm text-elec-light/80">{material.unit}</span>
            </div>
            
            {pricing.wasteQuantity > 0 && (
              <div className="text-xs text-elec-light/60">
                + {pricing.wasteQuantity.toFixed(1)} {material.unit} waste allowance
              </div>
            )}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-elec-light/60" />
              <span className="text-elec-light/80">{material.estimatedInstallTime}min</span>
            </div>
            <div className="flex items-center gap-1">
              {getDifficultyIcon()}
              <span className="text-elec-light/80 capitalize">{material.installationDifficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3 text-elec-light/60" />
              <span className="text-elec-light/80">{material.weight}kg</span>
            </div>
          </div>

          {/* Price Source & Last Updated */}
          <div className="text-xs text-elec-light/60 border-t border-elec-yellow/10 pt-2">
            <div>Source: {material.priceSource}</div>
            <div>Updated: {material.lastUpdated}</div>
          </div>

          {/* Breakdown Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            <Calculator className="h-3 w-3 mr-1" />
            {showBreakdown ? 'Hide' : 'Show'} Price Breakdown
          </Button>

          {/* Price Breakdown */}
          {showBreakdown && (
            <div className="space-y-2 text-xs bg-card/30 p-3 rounded border border-elec-yellow/10">
              <div className="flex justify-between">
                <span>Base price ({quantity} × £{material.defaultPrice.toFixed(2)})</span>
                <span>£{(material.defaultPrice * quantity).toFixed(2)}</span>
              </div>
              {pricing.discountApplied > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Quantity discount (-{pricing.discountApplied}%)</span>
                  <span>-£{((material.defaultPrice * quantity) - (pricing.basePrice * quantity)).toFixed(2)}</span>
                </div>
              )}
              {pricing.wasteQuantity > 0 && (
                <div className="flex justify-between">
                  <span>Waste allowance ({(material.wasteFactor * 100).toFixed(0)}%)</span>
                  <span>£{(pricing.basePrice * pricing.wasteQuantity).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>£{pricing.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20%)</span>
                <span>£{pricing.vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-elec-yellow/20 pt-1">
                <span>Total</span>
                <span>£{pricing.total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Alternatives */}
          {material.alternatives && material.alternatives.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-elec-light/80">Alternative Options</Label>
              <div className="flex flex-wrap gap-1">
                {material.alternatives.slice(0, 3).map((altId) => (
                  <Badge key={altId} variant="outline" className="text-xs cursor-pointer hover:bg-elec-yellow/20">
                    {altId.replace(/[_-]/g, ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add to Quote Button */}
          <Button
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            onClick={() => onAddToQuote(material, quantity, pricing)}
          >
            Add to Quote - £{pricing.total.toFixed(2)}
          </Button>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SmartPricingWidget;