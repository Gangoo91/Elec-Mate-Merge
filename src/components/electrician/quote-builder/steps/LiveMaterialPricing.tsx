import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";

interface LiveMaterialPricingProps {
  onAddToQuote: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote: (materials: MaterialToQuoteItem[]) => void;
}

export const LiveMaterialPricing = ({ onAddToQuote, onAddMultipleToQuote }: LiveMaterialPricingProps) => {
  return (
    <div className="space-y-4">
      <MaterialPriceComparison 
        onAddToQuote={onAddToQuote}
        onAddMultipleToQuote={onAddMultipleToQuote}
        hideHeader={true}
      />
    </div>
  );
};