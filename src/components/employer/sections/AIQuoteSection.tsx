import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { JobPackSelector } from "@/components/employer/smart-docs/JobPackSelector";
import { useJobPacks } from "@/hooks/useJobPacks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Receipt,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  RefreshCw,
  Plus,
  Trash2,
  PoundSterling
} from "lucide-react";

interface AIQuoteSectionProps {
  onNavigate: (section: Section) => void;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function AIQuoteSection({ onNavigate }: AIQuoteSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedJobPack = jobPacks.find(jp => jp.id === selectedJobPackId);

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  const addLineItem = () => {
    setLineItems([...lineItems, {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0
    }]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleGenerate = async () => {
    if (!clientName.trim() || !projectDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide client name and project description.",
        variant: "destructive"
      });
      return;
    }

    const validItems = lineItems.filter(item => item.description.trim() && item.unitPrice > 0);
    if (validItems.length === 0) {
      toast({
        title: "No Line Items",
        description: "Please add at least one line item with description and price.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setResult(null);

    const progressInterval = setInterval(() => {
      setProgress(prev => prev >= 90 ? prev : prev + Math.random() * 20);
    }, 300);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('generate-quote-pdf', {
        body: {
          clientName,
          clientAddress,
          projectDescription,
          lineItems: validItems,
          subtotal,
          vat,
          total,
          jobPackId: selectedJobPackId,
          projectInfo: selectedJobPack ? {
            projectName: selectedJobPack.title,
            location: selectedJobPack.location
          } : null
        }
      });

      clearInterval(progressInterval);

      if (invokeError) {
        throw invokeError;
      }

      setProgress(100);
      setResult(data);
      setIsGenerating(false);

      toast({
        title: "Quote Generated!",
        description: "Your professional quote has been created.",
      });

    } catch (err: any) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const content = JSON.stringify(result, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quote-${clientName || 'document'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="AI Quote Generator"
        description="Create professional quotes quickly"
        icon={Receipt}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client & Project */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Company or individual name"
                  className="mt-1 bg-elec-dark border-elec-yellow/20"
                  disabled={isGenerating}
                />
              </div>
              <div>
                <Label htmlFor="clientAddress">Address</Label>
                <Textarea
                  id="clientAddress"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="Full address..."
                  className="mt-1 min-h-[80px] bg-elec-dark border-elec-yellow/20"
                  disabled={isGenerating}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Link to Job Pack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <JobPackSelector
                selectedJobPackId={selectedJobPackId}
                onSelect={setSelectedJobPackId}
                onCreateNew={() => onNavigate("jobpacks")}
                showStatus={false}
              />
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Line Items */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe the work to be quoted..."
                className="min-h-[80px] bg-elec-dark border-elec-yellow/20"
                disabled={isGenerating}
              />
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Line Items</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addLineItem}
                  disabled={isGenerating}
                  className="border-elec-yellow/30"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {lineItems.map((item, index) => (
                <div key={item.id} className="p-3 rounded-lg bg-elec-dark/50 border border-elec-yellow/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Item {index + 1}</span>
                    {lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLineItem(item.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        disabled={isGenerating}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    placeholder="Description"
                    className="bg-elec-dark border-elec-yellow/20 text-sm"
                    disabled={isGenerating}
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="bg-elec-dark border-elec-yellow/20 text-sm"
                        disabled={isGenerating}
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Unit Price (£)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="bg-elec-dark border-elec-yellow/20 text-sm"
                        disabled={isGenerating}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-elec-yellow" />
                Quote Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (20%)</span>
                <span className="text-foreground">£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-elec-yellow/10">
                <span>Total</span>
                <span className="text-elec-yellow">£{total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !clientName.trim() || !projectDescription.trim()}
                className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Quote
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {isGenerating && (
            <Card className="border-info/20 bg-info/5">
              <CardContent className="p-4">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Generating professional quote...
                </p>
              </CardContent>
            </Card>
          )}

          {error && !isGenerating && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">Generation Failed</p>
                    <p className="text-xs text-muted-foreground">{error}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleReset}>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result && !isGenerating && (
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">Quote Ready!</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="border-elec-yellow/30"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
