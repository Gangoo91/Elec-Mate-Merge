import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Star className="h-5 w-5 text-elec-yellow" />
          Alternative Quotes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tier Selection Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {tiers.map(({ key, label, icon: Icon, color, bgColor, borderColor }) => {
            const tierData = alternatives[key];
            const isSelected = selectedTier === key;
            const isRecommended = alternatives.recommended === key;
            
            return (
              <Button
                key={key}
                onClick={() => setSelectedTier(key)}
                variant={isSelected ? "default" : "outline"}
                className={`
                  relative flex flex-col items-center gap-2 h-auto py-4
                  ${isSelected 
                    ? `${bgColor} border-2 ${borderColor} hover:${bgColor}` 
                    : 'border-elec-yellow/10 hover:border-elec-yellow/30'
                  }
                `}
              >
                {isRecommended && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5">
                    <Check className="h-3 w-3" />
                  </Badge>
                )}
                <Icon className={`h-5 w-5 ${isSelected ? color : 'text-muted-foreground'}`} />
                <div className="text-center">
                  <p className={`text-xs font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {label}
                  </p>
                  <p className={`text-sm font-bold mt-1 ${isSelected ? color : 'text-foreground'}`}>
                    {formatCurrency(tierData.grandTotal)}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Selected Tier Details */}
        <div className="space-y-3">
          {tiers.filter(t => t.key === selectedTier).map(({ key, color, bgColor, borderColor }) => {
            const tierData = alternatives[key];
            const isRecommended = alternatives.recommended === key;
            
            return (
              <div key={key} className={`p-4 rounded-lg ${bgColor} border ${borderColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground capitalize">{key} Tier</h3>
                      {isRecommended && (
                        <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tierData.description}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                {(tierData.materialsTotal !== undefined || tierData.labourTotal !== undefined) && (
                  <div className="space-y-2 mb-3 pb-3 border-b border-current/10">
                    {tierData.materialsTotal !== undefined && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Materials</span>
                        <span className="font-semibold text-foreground">{formatCurrency(tierData.materialsTotal)}</span>
                      </div>
                    )}
                    {tierData.labourTotal !== undefined && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Labour</span>
                        <span className="font-semibold text-foreground">{formatCurrency(tierData.labourTotal)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Grand Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-foreground">Total (inc. VAT)</span>
                  <span className={`text-xl font-bold ${color}`}>
                    {formatCurrency(tierData.grandTotal)}
                  </span>
                </div>

                {/* Tradeoffs */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">What's included:</p>
                  <ul className="space-y-1">
                    {tierData.tradeoffs.map((tradeoff, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <Check className={`h-3 w-3 ${color} shrink-0 mt-0.5`} />
                        <span>{tradeoff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Note */}
        <div className="p-3 rounded-lg bg-elec-dark/40 border border-elec-yellow/10">
          <p className="text-xs text-muted-foreground">
            💡 All tiers meet BS 7671:2018+A3:2024 compliance. The difference is in component quality, features, and aesthetics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlternativeQuotesPanel;
