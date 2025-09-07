import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Loader2, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ClientExplainerPage = () => {
  const { toast } = useToast();
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [tone, setTone] = useState("professional");
  const [readingLevel, setReadingLevel] = useState("standard");
  const [includeAnalogy, setIncludeAnalogy] = useState(true);
  const [includeCostInfo, setIncludeCostInfo] = useState(false);
  const [emphasizeSafety, setEmphasizeSafety] = useState(true);
  const [generatedExplanation, setGeneratedExplanation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!technicalNotes.trim()) {
      toast({
        title: "Error",
        description: "Please enter technical notes to explain",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-electrical-report', {
        body: {
          template: 'client-explainer',
          formData: {
            technicalNotes,
            tone,
            readingLevel,
            includeAnalogy,
            includeCostInfo,
            emphasizeSafety
          }
        }
      });

      if (error) throw error;

      setGeneratedExplanation(data.report);
      toast({
        title: "Success",
        description: "Client explanation generated successfully",
        variant: "success"
      });
    } catch (error) {
      console.error('Error generating explanation:', error);
      toast({
        title: "Error",
        description: "Failed to generate explanation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedExplanation);
      toast({
        title: "Copied",
        description: "Explanation copied to clipboard",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = () => {
    // Simple text-to-PDF conversion for now
    const element = document.createElement('a');
    const file = new Blob([generatedExplanation], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'client-explanation.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-elec-yellow/20 rounded-lg">
            <Megaphone className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white">Client Explainer</h1>
        </div>
        <p className="text-text-muted">Convert technical findings into client-friendly explanations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="bg-elec-grey border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Technical Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="technical-notes" className="text-white mb-2 block">
                Technical Notes
              </Label>
              <Textarea
                id="technical-notes"
                placeholder="Enter technical findings, test results, issues discovered, etc..."
                value={technicalNotes}
                onChange={(e) => setTechnicalNotes(e.target.value)}
                className="min-h-32 bg-elec-dark border-white/20 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-elec-dark border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="reassuring">Reassuring</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white mb-2 block">Reading Level</Label>
                <Select value={readingLevel} onValueChange={setReadingLevel}>
                  <SelectTrigger className="bg-elec-dark border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white">Include Analogies</Label>
                <Switch
                  checked={includeAnalogy}
                  onCheckedChange={setIncludeAnalogy}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-white">Include Cost Information</Label>
                <Switch
                  checked={includeCostInfo}
                  onCheckedChange={setIncludeCostInfo}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-white">Emphasize Safety</Label>
                <Switch
                  checked={emphasizeSafety}
                  onCheckedChange={setEmphasizeSafety}
                />
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Explanation"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="bg-elec-grey border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Client-Friendly Explanation</CardTitle>
              {generatedExplanation && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedExplanation ? (
              <div className="bg-elec-dark border border-white/10 rounded-lg p-4">
                <div className="mb-3 flex gap-2 flex-wrap">
                  <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                    {tone}
                  </Badge>
                  <Badge variant="outline" className="border-blue-400 text-blue-400">
                    {readingLevel}
                  </Badge>
                  {includeAnalogy && (
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      analogies
                    </Badge>
                  )}
                  {emphasizeSafety && (
                    <Badge variant="outline" className="border-red-400 text-red-400">
                      safety focus
                    </Badge>
                  )}
                </div>
                <div className="text-white whitespace-pre-wrap">
                  {generatedExplanation}
                </div>
              </div>
            ) : (
              <div className="bg-elec-dark border border-white/10 rounded-lg p-8 text-center">
                <Megaphone className="h-12 w-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">
                  Enter technical notes and click "Generate Explanation" to create a client-friendly version
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientExplainerPage;