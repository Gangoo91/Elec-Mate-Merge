import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
import { Check, TrendingDown, Target, TrendingUp, Star } from "lucide-react";
import { useState } from "react";

interface QuoteTier {
  description: string;
  materialsTotal?: number;
  labourTotal?: number;
  grandTotal: number;
  tradeoffs: string[];
}

interface AlternativesData {
  budget: QuoteTier;
  standard: QuoteTier;
  premium: QuoteTier;
  recommended: 'budget' | 'standard' | 'premium';
}

interface AlternativeQuotesPanelProps {
  alternatives: AlternativesData;
}

const AlternativeQuotesPanel = ({ alternatives }: AlternativeQuotesPanelProps) => {
  const [selectedTier, setSelectedTier] = useState<'budget' | 'standard' | 'premium'>(alternatives.recommended);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const tiers = [
    { 
      key: 'budget' as const, 
      label: 'Budget', 
      icon: TrendingDown, 
      color: 'text-blue-500', 
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    { 
      key: 'standard' as const, 
      label: 'Standard', 
      icon: Target, 
      color: 'text-green-500', 
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    { 
      key: 'premium' as const, 
      label: 'Premium', 
      icon: TrendingUp, 
      color: 'text-elec-yellow', 
      bgColor: 'bg-elec-yellow/10',
      borderColor: 'border-elec-yellow/30'
    },
  ];

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="mobile-heading text-foreground flex items-center gap-2">
          <Star className="h-5 w-5 text-elec-yellow" />
          Alternative Quotes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tier Selection Buttons */}
        <div className="grid grid-cols-3 gap-3 mobile-card-spacing">
          {tiers.map(({ key, label, icon: Icon, color, bgColor, borderColor }) => {
            const tierData = alternatives[key];
            const isSelected = selectedTier === key;
            const isRecommended = alternatives.recommended === key;
            
            return (
              <MobileButton
                key={key}
                onClick={() => setSelectedTier(key)}
                variant={isSelected ? "default" : "outline"}
                size="default"
                className={`
                  relative flex flex-col items-center gap-2 h-auto py-5
                  ${isSelected 
                    ? `${bgColor} border-2 ${borderColor}` 
                    : 'border-2 border-elec-yellow/10 hover:border-elec-yellow/30'
                  }
                `}
              >
                {isRecommended && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-foreground text-xs px-2 py-1">
                    <Check className="h-3 w-3" />
                  </Badge>
                )}
                <Icon className={`h-6 w-6 ${isSelected ? color : 'text-foreground'}`} />
                <div className="text-center">
                  <p className={`mobile-small-text font-bold ${isSelected ? 'text-foreground' : 'text-elec-light'}`}>
                    {label}
                  </p>
                  <p className={`mobile-text font-bold mt-1 tabular-nums ${isSelected ? color : 'text-foreground'}`}>
                    {formatCurrency(tierData.grandTotal)}
                  </p>
                </div>
              </MobileButton>
            );
          })}
        </div>

        {/* Selected Tier Details */}
        <div className="space-y-3">
          {tiers.filter(t => t.key === selectedTier).map(({ key, color, bgColor, borderColor }) => {
            const tierData = alternatives[key];
            const isRecommended = alternatives.recommended === key;
            
            return (
              <div key={key} className={`p-5 sm:p-5 rounded-xl ${bgColor} border-2 ${borderColor}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="mobile-text font-bold text-foreground capitalize">{key} Tier</h3>
                      {isRecommended && (
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30 mobile-small-text">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="mobile-small-text text-elec-light font-medium leading-relaxed">{tierData.description}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                {(tierData.materialsTotal !== undefined || tierData.labourTotal !== undefined) && (
                  <div className="space-y-3 mb-4 pb-4 border-b border-current/10">
                    {tierData.materialsTotal !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="mobile-text text-elec-light font-medium">Materials</span>
                        <span className="mobile-text font-bold text-foreground tabular-nums">{formatCurrency(tierData.materialsTotal)}</span>
                      </div>
                    )}
                    {tierData.labourTotal !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="mobile-text text-elec-light font-medium">Labour</span>
                        <span className="mobile-text font-bold text-foreground tabular-nums">{formatCurrency(tierData.labourTotal)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Grand Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="mobile-text font-bold text-foreground">Total (inc. VAT)</span>
                  <span className={`text-2xl sm:text-2xl font-bold ${color} tabular-nums`}>
                    {formatCurrency(tierData.grandTotal)}
                  </span>
                </div>

                {/* Tradeoffs */}
                <div>
                  <p className="mobile-small-text font-bold text-elec-light mb-3">What's included:</p>
                  <ul className="space-y-2">
                    {tierData.tradeoffs.map((tradeoff, idx) => (
                      <li key={idx} className="mobile-small-text text-elec-light flex items-start gap-2 leading-relaxed">
                        <Check className={`h-4 w-4 ${color} shrink-0 mt-0.5`} />
                        <span className="font-medium">{tradeoff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Note */}
        <div className="p-4 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10">
          <p className="mobile-small-text text-elec-light leading-relaxed font-medium">
            💡 All tiers meet BS 7671:2018+A3:2024 compliance. The difference is in component quality, features, and aesthetics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeQuotesPanel;
