
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.example.com",
    port: "587",
    username: "notifications@example.com",
    password: "************",
    fromEmail: "no-reply@example.com"
  });
  
  const handleSaveSmtpSettings = () => {
    toast({
      title: "Settings Saved",
      description: "SMTP server settings have been updated successfully.",
    });
  };
  
  const handleToggleMaintenanceMode = () => {
    const newValue = !maintenanceMode;
    setMaintenanceMode(newValue);
    
    toast({
      title: newValue ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
      description: newValue 
        ? "The site is now in maintenance mode. Only admins can access it." 
        : "The site is now accessible to all users.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Application Settings</h2>
        <p className="text-gray-400">Configure your site's settings and behavior.</p>
      </div>
      
      <Alert className="bg-yellow-900/20 text-yellow-500 border-yellow-500/30 mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          These settings are for demonstration purposes. In a real implementation, these would be connected to 
          your application's backend and persisted in a database.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Site Title</h3>
                    <p className="text-sm text-gray-400">The name of your website</p>
                  </div>
                  <Input className="max-w-xs" defaultValue="Elec-Mate" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Site Description</h3>
                    <p className="text-sm text-gray-400">A short description of your website</p>
                  </div>
                  <Input 
                    className="max-w-xs" 
                    defaultValue="Platform for Electrician Training and Resources" 
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-gray-400">
                      When enabled, only administrators can access the site
                    </p>
                  </div>
                  <Switch 
                    checked={maintenanceMode} 
                    onCheckedChange={handleToggleMaintenanceMode} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">User Registration</h3>
                    <p className="text-sm text-gray-400">Allow new users to register</p>
                  </div>
                  <Switch 
                    checked={registrationOpen} 
                    onCheckedChange={setRegistrationOpen} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email server settings for notifications and user communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input 
                    id="smtp-host" 
                    value={smtpSettings.host}
                    onChange={(e) => setSmtpSettings({...smtpSettings, host: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input 
                    id="smtp-port" 
                    value={smtpSettings.port}
                    onChange={(e) => setSmtpSettings({...smtpSettings, port: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input 
                    id="smtp-username" 
                    value={smtpSettings.username}
                    onChange={(e) => setSmtpSettings({...smtpSettings, username: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input 
                    id="smtp-password" 
                    type="password" 
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings({...smtpSettings, password: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="from-email">From Email Address</Label>
                  <Input 
                    id="from-email" 
                    value={smtpSettings.fromEmail}
                    onChange={(e) => setSmtpSettings({...smtpSettings, fromEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSmtpSettings}>Save Email Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize email templates sent by the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="welcome-email">Welcome Email</Label>
                <Textarea 
                  id="welcome-email" 
                  className="min-h-[150px]" 
                  defaultValue="Welcome to Elec-Mate! We're excited to have you join our platform for electrician training and resources. Your account has been successfully created and you now have access to our full range of features and content."
                />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure authentication, passwords, and access controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="min-password-length">Minimum Password Length</Label>
                    <Input id="min-password-length" type="number" defaultValue="8" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Strong Passwords</h3>
                    <p className="text-sm text-gray-400">
                      Require passwords to include special characters, numbers, and mixed case
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400">
                      Require two-factor authentication for administrator accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Account Lockout</h3>
                    <p className="text-sm text-gray-400">
                      Lock accounts after 5 failed login attempts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure technical aspects of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Debug Mode</h3>
                    <p className="text-sm text-gray-400">
                      Enable detailed error reporting and logging
                    </p>
                  </div>
                  <Switch 
                    checked={debugMode} 
                    onCheckedChange={setDebugMode} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">API Access</h3>
                    <p className="text-sm text-gray-400">
                      Allow external API access to the platform
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                  <Input id="cache-ttl" type="number" defaultValue="3600" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Advanced Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-900/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription className="text-red-300">
                These actions are destructive and cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-red-500">Purge Cache</h3>
                    <p className="text-sm text-gray-400">
                      Clear all system caches
                    </p>
                  </div>
                  <Button variant="destructive">Purge Now</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-red-500">Reset Application</h3>
                    <p className="text-sm text-gray-400">
                      Reset all application settings to defaults
                    </p>
                  </div>
                  <Button variant="destructive">Reset All</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
