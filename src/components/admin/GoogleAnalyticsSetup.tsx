
import { useState } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { BarChart3, ArrowRight, Check } from "lucide-react";

const GoogleAnalyticsSetup = () => {
  const [gaId, setGaId] = useState(localStorage.getItem('elecmate-ga-id') || '');
  const [enabled, setEnabled] = useState(localStorage.getItem('elecmate-ga-enabled') === 'true');
  
  const { isInitialized, isLoading, initialize } = useGoogleAnalytics({
    analyticsId: gaId,
    enabled: false, // Don't auto-initialize, we'll do it manually
  });
  
  const handleSave = async () => {
    if (!gaId.trim()) {
      toast({
        title: "Missing ID",
        description: "Please enter your Google Analytics ID.",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('elecmate-ga-id', gaId);
    localStorage.setItem('elecmate-ga-enabled', enabled.toString());
    
    if (enabled) {
      const success = await initialize(gaId);
      if (success) {
        toast({
          title: "Analytics Enabled",
          description: "Google Analytics has been successfully configured.",
        });
      }
    } else {
      toast({
        title: "Analytics Disabled",
        description: "Google Analytics integration has been disabled.",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          Google Analytics Integration
        </CardTitle>
        <CardDescription>
          Connect your Google Analytics account to track user behavior and gain deeper insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ga-id">Google Analytics ID</Label>
          <Input
            id="ga-id"
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
            className="max-w-md"
          />
          <p className="text-xs text-muted-foreground">
            Enter your Google Analytics 4 measurement ID (G-XXXXXXXXXX)
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="ga-enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <Label htmlFor="ga-enabled">Enable Google Analytics</Label>
        </div>
        
        <div className="pt-2">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? "Saving..." : "Save Configuration"}
            {isInitialized ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
        
        {isInitialized && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
            <p className="text-sm text-emerald-400 font-medium">
              Google Analytics is successfully connected
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Analytics data is now being collected and will appear in your Google Analytics dashboard.
            </p>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-elec-yellow/20">
          <h4 className="font-medium mb-2">What data is being collected?</h4>
          <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
            <li>Page views and navigation paths</li>
            <li>Feature usage and engagement metrics</li>
            <li>User session duration and frequency</li>
            <li>Conversion events (sign-ups, subscriptions)</li>
            <li>User demographics (location, device type)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleAnalyticsSetup;
