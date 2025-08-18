import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Key, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { FirecrawlService } from "@/utils/FirecrawlService";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApiKeyConfigured: () => void;
}

export function ApiKeyDialog({ open, onOpenChange, onApiKeyConfigured }: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState("");
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const { toast } = useToast();

  const handleTest = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key first",
        variant: "destructive",
      });
      return;
    }

    setIsTestingKey(true);
    setTestResult(null);

    try {
      const isValid = await FirecrawlService.testApiKey(apiKey.trim());
      
      if (isValid) {
        setTestResult("success");
        toast({
          title: "Success",
          description: "API key is valid and working!",
          variant: "success",
        });
      } else {
        setTestResult("error");
        toast({
          title: "Error", 
          description: "Invalid API key or service unavailable",
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestResult("error");
      toast({
        title: "Error",
        description: "Failed to test API key",
        variant: "destructive",
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    if (testResult !== "success") {
      toast({
        title: "Warning",
        description: "Please test your API key first",
        variant: "destructive",
      });
      return;
    }

    FirecrawlService.saveApiKey(apiKey.trim());
    toast({
      title: "Success",
      description: "API key saved successfully!",
      variant: "success",
    });
    
    onApiKeyConfigured();
    onOpenChange(false);
    setApiKey("");
    setTestResult(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    setApiKey("");
    setTestResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-elec-gray border-elec-yellow/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-elec-yellow">
            <Key className="h-5 w-5" />
            Configure Firecrawl API Key
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Enter your Firecrawl API key to enable real-time news fetching from industry websites.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-blue-500/20 bg-blue-500/10">
            <AlertDescription className="text-sm text-gray-300">
              Don't have an API key? Get one free at{" "}
              <a 
                href="https://www.firecrawl.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                firecrawl.dev
                <ExternalLink className="h-3 w-3" />
              </a>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-white">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="fc-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-elec-dark border-elec-yellow/20 text-white"
            />
          </div>

          {testResult && (
            <Alert className={testResult === "success" ? "border-green-500/20 bg-green-500/10" : "border-red-500/20 bg-red-500/10"}>
              <AlertDescription className="flex items-center gap-2 text-sm">
                {testResult === "success" ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">API key is valid and working!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">Invalid API key or service unavailable</span>
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleTest}
            disabled={!apiKey.trim() || isTestingKey}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            {isTestingKey ? "Testing..." : "Test Key"}
          </Button>
          <Button
            onClick={handleSave}
            disabled={testResult !== "success"}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            Save & Use
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}