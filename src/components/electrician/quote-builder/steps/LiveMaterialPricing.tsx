import { useState } from "react";
import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";
import { SmartQuoteBuilder } from "../SmartQuoteBuilder";
import { IntelligentMaterialSearch } from "../IntelligentMaterialSearch";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";
import { Button } from "@/components/ui/button";
import { Brain, Search, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LiveMaterialPricingProps {
  onAddToQuote: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote: (materials: MaterialToQuoteItem[]) => void;
}

export const LiveMaterialPricing = ({ onAddToQuote, onAddMultipleToQuote }: LiveMaterialPricingProps) => {
  const [activeTab, setActiveTab] = useState<'intelligent' | 'screwfix' | 'smart'>('intelligent');

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">Live Material Pricing</h3>
        <p className="text-muted-foreground">
          Search 43k materials with AI or analyse your entire materials list
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'intelligent' | 'screwfix' | 'smart')} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="intelligent" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Search (43k)</span>
            <span className="sm:hidden">AI Search</span>
          </TabsTrigger>
          <TabsTrigger value="screwfix" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Screwfix</span>
            <span className="sm:hidden">Screwfix</span>
          </TabsTrigger>
          <TabsTrigger value="smart" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Smart Builder</span>
            <span className="sm:hidden">Smart</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intelligent">
          <IntelligentMaterialSearch 
            onAddToQuote={onAddToQuote}
          />
        </TabsContent>

        <TabsContent value="screwfix">
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