import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Loader2, Megaphone, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link to="/electrician-tools/ai-tooling">
              <Button 
                variant="outline" 
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to AI Tools
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-6 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-2xl border border-yellow-400/30">
              <Megaphone className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Client Explainer</h1>
            <p className="text-gray-300 max-w-4xl mx-auto">
              Convert technical findings into client-friendly explanations that are easy to understand and professional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Megaphone className="h-5 w-5 text-yellow-400" />
                  <CardTitle className="text-xl text-white">Technical Input</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <div>
                  <Label htmlFor="technical-notes" className="text-white mb-3 block font-medium">
                    Technical Notes
                  </Label>
                  <Textarea
                    id="technical-notes"
                    placeholder="Enter technical findings, test results, issues discovered, etc..."
                    value={technicalNotes}
                    onChange={(e) => setTechnicalNotes(e.target.value)}
                    className="min-h-[120px] bg-neutral-700/50 border-neutral-600 focus:border-yellow-400 text-white placeholder:text-gray-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white mb-3 block font-medium">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-neutral-700/50 border-neutral-600 text-white focus:border-yellow-400">
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
                    <Label className="text-white mb-3 block font-medium">Reading Level</Label>
                    <Select value={readingLevel} onValueChange={setReadingLevel}>
                      <SelectTrigger className="bg-neutral-700/50 border-neutral-600 text-white focus:border-yellow-400">
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
                  <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                    <Label className="text-white font-medium">Include Analogies</Label>
                    <Switch
                      checked={includeAnalogy}
                      onCheckedChange={setIncludeAnalogy}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                    <Label className="text-white font-medium">Include Cost Information</Label>
                    <Switch
                      checked={includeCostInfo}
                      onCheckedChange={setIncludeCostInfo}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-700/30 rounded-lg">
                    <Label className="text-white font-medium">Emphasize Safety</Label>
                    <Switch
                      checked={emphasizeSafety}
                      onCheckedChange={setEmphasizeSafety}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-medium py-3 h-12"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Explanation"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Megaphone className="h-4 w-4 text-yellow-400" />
                    </div>
                    <CardTitle className="text-xl text-white">Client-Friendly Explanation</CardTitle>
                  </div>
                  {generatedExplanation && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadPDF}
                        className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {generatedExplanation ? (
                  <div className="bg-neutral-700/30 border border-neutral-600/50 rounded-lg p-6">
                    <div className="mb-4 flex gap-2 flex-wrap">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-400 bg-yellow-400/10">
                        {tone}
                      </Badge>
                      <Badge variant="outline" className="border-blue-400 text-blue-400 bg-blue-400/10">
                        {readingLevel}
                      </Badge>
                      {includeAnalogy && (
                        <Badge variant="outline" className="border-green-400 text-green-400 bg-green-400/10">
                          analogies
                        </Badge>
                      )}
                      {emphasizeSafety && (
                        <Badge variant="outline" className="border-red-400 text-red-400 bg-red-400/10">
                          safety focus
                        </Badge>
                      )}
                    </div>
                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {generatedExplanation}
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral-700/30 border border-neutral-600/50 rounded-lg p-8 text-center">
                    <Megaphone className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Enter technical notes and click "Generate Explanation" to create a client-friendly version
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientExplainerPage;