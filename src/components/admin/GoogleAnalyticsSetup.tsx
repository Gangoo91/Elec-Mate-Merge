
import { useState, useEffect } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { BarChart3, ArrowRight, Check, ExternalLink, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const GoogleAnalyticsSetup = () => {
  const [gaId, setGaId] = useState(localStorage.getItem('elecmate-ga-id') || '');
  const [oauthClientId, setOauthClientId] = useState(localStorage.getItem('elecmate-ga-oauth-client-id') || '');
  const [enabled, setEnabled] = useState(localStorage.getItem('elecmate-ga-enabled') === 'true');
  const [authTab, setAuthTab] = useState('measurement-id');
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  
  const { isInitialized, isLoading, initialize } = useGoogleAnalytics({
    analyticsId: gaId,
    enabled: false, // Don't auto-initialize, we'll do it manually
  });
  
  // Check if the function has the required secret
  useEffect(() => {
    const checkSecret = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('google-analytics-init', {
          body: { checkCredentials: true }
        });
        
        if (data?.hasGoogleApiKey) {
          // If we already have a secret stored, show that to the user
          toast({
            title: "Google API Secret Found",
            description: "Your Google API credentials are already configured.",
          });
        }
      } catch (err) {
        console.error("Error checking credentials:", err);
      }
    };
    
    checkSecret();
  }, []);
  
  const handleSave = async () => {
    if (authTab === 'measurement-id' && !gaId.trim()) {
      toast({
        title: "Missing ID",
        description: "Please enter your Google Analytics Measurement ID.",
        variant: "destructive",
      });
      return;
    }
    
    if (authTab === 'oauth' && !oauthClientId.trim()) {
      toast({
        title: "Missing OAuth Client ID",
        description: "Please enter your Google OAuth Client ID.",
        variant: "destructive",
      });
      return;
    }
    
    // Store the appropriate values based on auth type
    if (authTab === 'measurement-id') {
      localStorage.setItem('elecmate-ga-id', gaId);
      localStorage.removeItem('elecmate-ga-oauth-client-id');
    } else {
      localStorage.setItem('elecmate-ga-oauth-client-id', oauthClientId);
      localStorage.setItem('elecmate-ga-id', ''); // Clear measurement ID when using OAuth
    }
    
    localStorage.setItem('elecmate-ga-enabled', enabled.toString());
    
    if (enabled) {
      if (authTab === 'measurement-id') {
        const success = await initialize(gaId);
        if (success) {
          toast({
            title: "Analytics Enabled",
            description: "Google Analytics has been successfully configured with Measurement ID.",
          });
        }
      } else {
        // OAuth implementation
        try {
          const { data, error } = await supabase.functions.invoke('google-analytics-init', {
            body: { 
              oauthClientId, 
              setupOAuth: true 
            }
          });
          
          if (error) throw new Error(error.message);
          
          toast({
            title: "OAuth Setup Initiated",
            description: "Google Analytics OAuth setup has been initiated. Check console for any additional steps.",
          });
          
          setIsInitialized(true);
        } catch (err: any) {
          toast({
            title: "OAuth Setup Failed",
            description: err.message,
            variant: "destructive",
          });
        }
      }
    } else {
      toast({
        title: "Analytics Disabled",
        description: "Google Analytics integration has been disabled.",
      });
    }
  };

  const handleCheckCredentials = async () => {
    setIsCheckingCredentials(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('google-analytics-init', {
        body: { checkCredentials: true }
      });
      
      if (error) throw new Error(error.message);
      
      if (data?.hasGoogleApiKey) {
        toast({
          title: "Credentials Valid",
          description: "Your Google API key is configured correctly.",
        });
      } else {
        toast({
          title: "Credentials Not Found",
          description: "Please add your Google API key to the Supabase secrets.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error Checking Credentials",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsCheckingCredentials(false);
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
        <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="measurement-id">Measurement ID</TabsTrigger>
            <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
          </TabsList>
          
          <TabsContent value="measurement-id" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="ga-id">Google Analytics Measurement ID</Label>
              <Input
                id="ga-id"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="max-w-md"
              />
              <p className="text-xs text-muted-foreground">
                Enter your Google Analytics 4 measurement ID (G-XXXXXXXXXX)
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="oauth" className="space-y-4 pt-4">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertTitle>OAuth Setup Required</AlertTitle>
              <AlertDescription>
                Using OAuth requires setting up credentials in Google Cloud Console and adding the 
                GoogleAPI secret to your Supabase project.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label htmlFor="oauth-client-id">OAuth Client ID</Label>
              <Input
                id="oauth-client-id"
                value={oauthClientId}
                onChange={(e) => setOauthClientId(e.target.value)}
                placeholder="123456789-abcdefg.apps.googleusercontent.com"
                className="max-w-md"
              />
              <p className="text-xs text-muted-foreground">
                Enter your Google OAuth Client ID from Google Cloud Console
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={handleCheckCredentials} 
                variant="outline"
                disabled={isCheckingCredentials}
                className="flex items-center gap-2"
              >
                {isCheckingCredentials ? "Checking..." : "Check API Credentials"}
                <Key className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center space-x-2 pt-4">
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
          
          <div className="mt-4 flex items-center gap-2">
            <a 
              href="https://console.cloud.google.com/apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-elec-yellow flex items-center gap-1 hover:underline"
            >
              Google Cloud Credentials Console <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleAnalyticsSetup;
