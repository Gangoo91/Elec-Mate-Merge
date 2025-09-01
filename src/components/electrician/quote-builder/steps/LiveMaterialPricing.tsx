import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";

interface LiveMaterialPricingProps {
  onAddToQuote: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote: (materials: MaterialToQuoteItem[]) => void;
}

export const LiveMaterialPricing = ({ onAddToQuote, onAddMultipleToQuote }: LiveMaterialPricingProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">Live Material Pricing</h3>
        <p className="text-muted-foreground">
          Search for materials with live pricing and add them directly to your quote
        </p>
      </div>
      
      <MaterialPriceComparison 
        onAddToQuote={onAddToQuote}
        onAddMultipleToQuote={onAddMultipleToQuote}
      />
    </div>
  );
};