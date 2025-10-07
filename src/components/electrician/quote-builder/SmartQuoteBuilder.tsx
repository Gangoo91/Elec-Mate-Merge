import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain, Sparkles, TrendingDown, Award, Scale, AlertCircle, CheckCircle2, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MaterialToQuoteItem } from "@/hooks/useQuoteMaterialIntegration";

interface SmartQuoteBuilderProps {
  onAddToQuote?: (material: MaterialToQuoteItem, quantity?: number) => void;
  onAddMultipleToQuote?: (materials: MaterialToQuoteItem[]) => void;
}

interface OptionResult {
  name: string;
  totalCost: number;
  items: any[];
  suppliers: string[];
  estimatedDelivery: string;
  withinBudget: boolean;
}

interface AnalysisResult {
  parsedItems: any[];
  options: {
    cheapest: OptionResult;
    bestQuality: OptionResult;
    balanced: OptionResult;
  };
  warnings: string[];
  summary: {
    totalItemsRequested: number;
    totalItemsFound: number;
    parseConfidence: number;
  };
}

export const SmartQuoteBuilder = ({ onAddToQuote, onAddMultipleToQuote }: SmartQuoteBuilderProps) => {
  const [materialsText, setMaterialsText] = useState("");
  const [preference, setPreference] = useState("balanced");
  const [maxBudget, setMaxBudget] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const exampleList = `100m 2.5mm twin and earth cable
20x RCD 30mA
10 LED downlights 6000K
Consumer unit 12 way
50m 1.5mm cable
5x Double sockets white`;

  const handleAnalyze = async () => {
    if (!materialsText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a materials list to analyse",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      console.log('[SMART-QUOTE] Analyzing list...');
      
      const { data, error } = await supabase.functions.invoke('ai-materials-agent', {
        body: {
          materialsListText: materialsText,
          preference,
          maxBudget: maxBudget ? parseFloat(maxBudget) : undefined,
          includeAlternatives: true
        }
      });

      if (error) {
        console.error('[SMART-QUOTE] Error:', error);
        throw error;
      }

      console.log('[SMART-QUOTE] Analysis complete:', data);
      setResult(data);

      toast({
        title: "Analysis Complete",
        description: `Found ${data.summary.totalItemsFound} of ${data.summary.totalItemsRequested} items`,
      });

    } catch (error: any) {
      console.error('[SMART-QUOTE] Failed:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyse materials list",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddOption = (option: OptionResult) => {
    if (!onAddMultipleToQuote) {
      toast({
        title: "Not Available",
        description: "Quote integration not available in this view",
        variant: "destructive"
      });
      return;
    }

    const materials: MaterialToQuoteItem[] = option.items.map(item => ({
      id: Math.random(),
      name: item.selectedProduct.name,
      category: item.selectedProduct.category || 'Materials',
      price: item.selectedProduct.price,
      supplier: item.selectedProduct.supplier,
      stockStatus: item.selectedProduct.stockStatus || 'In Stock',
      productUrl: item.selectedProduct.productUrl,
      highlights: item.selectedProduct.highlights || []
    }));

    onAddMultipleToQuote(materials);

    toast({
      title: "Added to Quote",
      description: `${option.name} (${materials.length} items, £${option.totalCost.toFixed(2)})`,
    });
  };

  const renderOption = (option: OptionResult, icon: any) => {
    const Icon = icon;
    return (
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{option.name}</CardTitle>
            </div>
            <Badge variant={option.withinBudget ? "default" : "destructive"}>
              £{option.totalCost.toFixed(2)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Items</p>
              <p className="font-medium">{option.items.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Suppliers</p>
              <p className="font-medium">{option.suppliers.join(', ')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Delivery</p>
              <p className="font-medium">{option.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Budget Status</p>
              <p className="font-medium">{option.withinBudget ? '✓ Within' : '✗ Over'}</p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {option.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 bg-background/50 rounded-lg text-sm">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-medium break-words">{item.selectedProduct.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.requestedItem.quantity} • {item.selectedProduct.supplier}
                  </p>
                  {item.selectedProduct.stockStatus !== 'In Stock' && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      {item.selectedProduct.stockStatus}
                    </Badge>
                  )}
                </div>
                <div className="text-right flex-shrink-0 min-w-[80px]">
                  <p className="font-medium">{item.selectedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => handleAddOption(option)} 
            className="w-full"
            disabled={!onAddMultipleToQuote}
          >
            <Package className="mr-2 h-4 w-4" />
            Add to Quote
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Smart Quote Builder</h3>
        </div>
        <p className="text-muted-foreground">
          Paste your materials list and let AI find the best options
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="materials-list">Materials List</Label>
            <Textarea
              id="materials-list"
              value={materialsText}
              onChange={(e) => setMaterialsText(e.target.value)}
              placeholder={exampleList}
              className="min-h-[200px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter one item per line. Include quantities, sizes, and specifications.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Preference</Label>
              <RadioGroup value={preference} onValueChange={setPreference}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cheapest" id="cheapest" />
                  <Label htmlFor="cheapest" className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Cheapest
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced" className="flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Balanced
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="best-quality" id="best-quality" />
                  <Label htmlFor="best-quality" className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Best Quality
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-budget">Max Budget (Optional)</Label>
              <Input
                id="max-budget"
                type="number"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="e.g., 1000"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !materialsText.trim()}
            className="w-full"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Analysing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Analyse
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Summary */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p className="font-medium">
                    Found {result.summary.totalItemsFound} of {result.summary.totalItemsRequested} items
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Parse confidence: {Math.round(result.summary.parseConfidence * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">Some items not found:</p>
                    {result.warnings.map((warning, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">{warning}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Options Tabs */}
          <Tabs defaultValue="balanced" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cheapest">
                <TrendingDown className="h-4 w-4 mr-2" />
                Cheapest
              </TabsTrigger>
              <TabsTrigger value="balanced">
                <Scale className="h-4 w-4 mr-2" />
                Balanced
              </TabsTrigger>
              <TabsTrigger value="bestQuality">
                <Award className="h-4 w-4 mr-2" />
                Best Quality
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cheapest" className="mt-4">
              {renderOption(result.options.cheapest, TrendingDown)}
            </TabsContent>

            <TabsContent value="balanced" className="mt-4">
              {renderOption(result.options.balanced, Scale)}
            </TabsContent>

            <TabsContent value="bestQuality" className="mt-4">
              {renderOption(result.options.bestQuality, Award)}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};
