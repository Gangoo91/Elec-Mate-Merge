import { useState } from "react";
import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import { SmartQuoteBuilder } from "../SmartQuoteBuilder";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";
import { Button } from "@/components/ui/button";
import { Brain, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LiveMaterialPricingProps {
  onAddToQuote: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote: (materials: MaterialToQuoteItem[]) => void;
}

export const LiveMaterialPricing = ({ onAddToQuote, onAddMultipleToQuote }: LiveMaterialPricingProps) => {
  const [activeTab, setActiveTab] = useState<'search' | 'smart'>('search');

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">Live Material Pricing</h3>
        <p className="text-muted-foreground">
          Search for materials or use AI to analyse your entire materials list
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'search' | 'smart')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Materials
          </TabsTrigger>
          <TabsTrigger value="smart" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Smart List Builder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <MaterialPriceComparison 
            onAddToQuote={onAddToQuote}
          />
        </TabsContent>

        <TabsContent value="smart">
          <SmartQuoteBuilder 
            onAddToQuote={onAddToQuote}
            onAddMultipleToQuote={onAddMultipleToQuote}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};