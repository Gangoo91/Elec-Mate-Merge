
import { useState, useEffect } from "react";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { BarChart3, ArrowRight, Check, ExternalLink, Key, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

const GoogleAnalyticsSetup = () => {
  const [gaId, setGaId] = useState(localStorage.getItem('elecmate-ga-id') || '');
  const [oauthClientId, setOauthClientId] = useState(localStorage.getItem('elecmate-ga-oauth-client-id') || '');
  const [enabled, setEnabled] = useState(localStorage.getItem('elecmate-ga-enabled') === 'true');
  const [authTab, setAuthTab] = useState('measurement-id');
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const { isInitialized, isLoading, initialize, trackEvent } = useGoogleAnalytics({
    analyticsId: gaId,
    enabled: false, // Don't auto-initialize, we'll do it manually
  });
  
  // Check if the integration is already live
  useEffect(() => {
    const checkLiveStatus = () => {
      const gaEnabled = localStorage.getItem('elecmate-ga-enabled') === 'true';
      const gaInitialized = localStorage.getItem('elecmate-ga-initialized') === 'true';
      
      if (gaEnabled && gaInitialized) {
        setIsLive(true);
      }
    };
    
    checkLiveStatus();
  }, []);
  
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
    
    setIsSaving(true);
    
    try {
      // Store the appropriate values based on auth type
      if (authTab === 'measurement-id') {
        localStorage.setItem('elecmate-ga-id', gaId);
        localStorage.removeItem('elecmate-ga-oauth-client-id');
        
        if (enabled) {
          const success = await initialize(gaId);
          if (success) {
            localStorage.setItem('elecmate-ga-initialized', 'true');
            setIsLive(true);
            
            // Track an initial page view event to confirm it's working
            trackEvent('page_view', { 
              page_title: 'Admin Analytics',
              page_path: '/admin/analytics'
            });
            
            toast({
              title: "Analytics Now Live",
              description: "Google Analytics is now tracking site activity with your Measurement ID.",
            });
          }
        }
      } else {
        // OAuth implementation
        setIsAuthenticating(true);
        localStorage.setItem('elecmate-ga-oauth-client-id', oauthClientId);
        localStorage.setItem('elecmate-ga-id', ''); // Clear measurement ID when using OAuth
        
        try {
          const { data, error } = await supabase.functions.invoke('google-analytics-init', {
            body: { 
              oauthClientId, 
              setupOAuth: true,
              activateTracking: enabled
            }
          });
          
          if (error) throw new Error(error.message);
          
          // Handle successful OAuth setup
          if (data?.success) {
            if (enabled) {
              localStorage.setItem('elecmate-ga-initialized', 'true');
              setIsLive(true);
              
              toast({
                title: "Analytics Now Live",
                description: "Google Analytics is now tracking site activity via OAuth authentication.",
              });
            } else {
              localStorage.setItem('elecmate-ga-initialized', 'false');
              setIsLive(false);
              
              toast({
                title: "OAuth Setup Complete",
                description: "OAuth configuration saved but tracking is disabled. Enable tracking to go live.",
              });
            }
          }
        } catch (err: any) {
          throw new Error(`OAuth Setup Failed: ${err.message}`);
        } finally {
          setIsAuthenticating(false);
        }
      }
      
      localStorage.setItem('elecmate-ga-enabled', enabled.toString());
      
      if (!enabled) {
        localStorage.setItem('elecmate-ga-initialized', 'false');
        setIsLive(false);
        
        toast({
          title: "Analytics Disabled",
          description: "Google Analytics integration has been disabled.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Setup Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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

  const handleVerifyTracking = async () => {
    if (isLive) {
      try {
        // Send a test event to verify tracking is working
        await trackEvent('test_event', { 
          test_source: 'admin_panel',
          test_time: new Date().toISOString()
        });
        
        toast({
          title: "Test Event Sent",
          description: "A test event was successfully sent to Google Analytics.",
        });
      } catch (err: any) {
        toast({
          title: "Test Failed",
          description: err.message,
          variant: "destructive",
        });
      }
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          Google Analytics Integration
        </CardTitle>
        <CardDescription>
          Connect your Google Analytics account to track user behavior and gain deeper insights
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col">
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {isLive && (
              <Alert className="bg-emerald-500/10 border border-emerald-500/20">
                <Check className="h-4 w-4 text-emerald-500" />
                <AlertTitle>Google Analytics is Live</AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">
                  User activity is now being tracked and sent to Google Analytics.
                  <Button 
                    onClick={handleVerifyTracking} 
                    variant="link" 
                    className="p-0 h-auto text-sm text-emerald-500 ml-2"
                  >
                    Send Test Event
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
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
                    {isCheckingCredentials ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        Check API Credentials
                        <Key className="h-4 w-4" />
                      </>
                    )}
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
                disabled={isLoading || isSaving || isAuthenticating}
                className="flex items-center gap-2"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save & Activate
                    {isLive ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </>
                )}
              </Button>
            </div>
            
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
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GoogleAnalyticsSetup;
