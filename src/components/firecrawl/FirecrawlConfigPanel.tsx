import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Settings, 
  Key, 
  Globe, 
  Clock, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Upload,
  Trash2,
  Plus
} from "lucide-react";
import { firecrawlIntegration } from "@/utils/FirecrawlIntegration";

interface Source {
  url: string;
  name: string;
  active: boolean;
  type: string;
}

const FirecrawlConfigPanel = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [customKeywords, setCustomKeywords] = useState('');
  const [refreshFrequency, setRefreshFrequency] = useState('24');
  const [isScheduleActive, setIsScheduleActive] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newSourceName, setNewSourceName] = useState('');
  
  useEffect(() => {
    loadConfiguration();
    
    // Listen for refresh events
    const handleRefreshComplete = (event: CustomEvent) => {
      setLastRefresh(new Date().toLocaleTimeString());
      toast({
        title: "Refresh Completed",
        description: `Updated ${event.detail.replacedCount} projects`,
        duration: 3000,
      });
    };
    
    window.addEventListener('firecrawl-refresh-complete', handleRefreshComplete as EventListener);
    
    return () => {
      window.removeEventListener('firecrawl-refresh-complete', handleRefreshComplete as EventListener);
    };
  }, []);

  const loadConfiguration = () => {
    // Load saved configuration
    const savedApiKey = localStorage.getItem('firecrawl_api_key');
    const savedSources = localStorage.getItem('firecrawl_sources');
    const savedKeywords = localStorage.getItem('firecrawl_keywords');
    const savedSchedule = localStorage.getItem('firecrawl_schedule');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
      testConnection(savedApiKey);
    }
    
    if (savedSources) {
      setSources(JSON.parse(savedSources));
    } else {
      setSources(firecrawlIntegration.defaultSources);
    }
    
    if (savedKeywords) {
      setCustomKeywords(savedKeywords);
    } else {
      setCustomKeywords(firecrawlIntegration.electricalKeywords.join(', '));
    }
    
    if (savedSchedule) {
      const schedule = JSON.parse(savedSchedule);
      setRefreshFrequency(schedule.interval?.toString() || '24');
      setIsScheduleActive(schedule.active || false);
      setLastRefresh(schedule.lastRun ? new Date(schedule.lastRun).toLocaleTimeString() : null);
    }
  };

  const saveConfiguration = () => {
    localStorage.setItem('firecrawl_api_key', apiKey);
    localStorage.setItem('firecrawl_sources', JSON.stringify(sources));
    localStorage.setItem('firecrawl_keywords', customKeywords);
    
    const schedule = {
      interval: parseInt(refreshFrequency),
      keywords: customKeywords.split(',').map(k => k.trim()),
      active: isScheduleActive,
      lastRun: lastRefresh ? new Date().getTime() : null,
      nextRun: Date.now() + parseInt(refreshFrequency) * 60 * 60 * 1000
    };
    localStorage.setItem('firecrawl_schedule', JSON.stringify(schedule));
  };

  const testConnection = async (keyToTest = apiKey) => {
    if (!keyToTest.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsTesting(true);
    
    try {
      const isValid = await firecrawlIntegration.testConnection();
      setIsConnected(isValid);
      
      if (isValid) {
        await firecrawlIntegration.initialize(keyToTest);
        toast({
          title: "Connection Successful",
          description: "Firecrawl API is working correctly",
          duration: 3000,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Invalid API key or service unavailable",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      setIsConnected(false);
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Connection test failed",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleRefreshData = async () => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Please configure and test your API key first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const keywords = customKeywords.split(',').map(k => k.trim()).filter(k => k);
      const result = await firecrawlIntegration.replaceData([], keywords);
      
      if (result.success) {
        setLastRefresh(new Date().toLocaleTimeString());
        toast({
          title: "Refresh Successful",
          description: `Updated ${result.replacedCount} projects`,
          duration: 3000,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: error instanceof Error ? error.message : "Data refresh failed",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const toggleSource = (index: number) => {
    const updatedSources = [...sources];
    updatedSources[index].active = !updatedSources[index].active;
    setSources(updatedSources);
  };

  const addCustomSource = () => {
    if (!newSourceUrl.trim() || !newSourceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter both URL and name for the new source",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      new URL(newSourceUrl); // Validate URL
      
      const newSource: Source = {
        url: newSourceUrl.trim(),
        name: newSourceName.trim(),
        active: true,
        type: 'custom'
      };
      
      setSources([...sources, newSource]);
      setNewSourceUrl('');
      setNewSourceName('');
      
      toast({
        title: "Source Added",
        description: `Added ${newSourceName} to sources`,
        duration: 3000,
      });
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const removeSource = (index: number) => {
    const updatedSources = sources.filter((_, i) => i !== index);
    setSources(updatedSources);
  };

  const exportConfiguration = () => {
    const config = firecrawlIntegration.exportConfig();
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'firecrawl-config.json';
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Configuration Exported",
      description: "Settings saved to firecrawl-config.json",
      duration: 3000,
    });
  };

  const importConfiguration = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        firecrawlIntegration.importConfig(config);
        loadConfiguration();
        
        toast({
          title: "Configuration Imported",
          description: "Settings loaded successfully",
          duration: 3000,
        });
      } catch {
        toast({
          title: "Import Failed",
          description: "Invalid configuration file",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Firecrawl Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Connection Tab */}
          <TabsContent value="connection" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Firecrawl API Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Firecrawl API key"
                    className="flex-1"
                  />
                  <Button
                    onClick={() => testConnection()}
                    disabled={isTesting || !apiKey.trim()}
                    variant="outline"
                  >
                    {isTesting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      "Test"
                    )}
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {isConnected ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Connected and working</span>
                    </>
                  ) : apiKey.trim() ? (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-600">Not connected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-600">API key required</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Keywords (comma-separated)</Label>
                <Textarea
                  value={customKeywords}
                  onChange={(e) => setCustomKeywords(e.target.value)}
                  placeholder="electrical, power transmission, substation..."
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  Keywords to filter relevant electrical infrastructure projects
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleRefreshData} disabled={!isConnected}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data Now
                </Button>
                <Button onClick={saveConfiguration} variant="outline">
                  Save Configuration
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Data Sources</h4>
              
              <div className="space-y-2">
                {sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={source.active}
                        onCheckedChange={() => toggleSource(index)}
                      />
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">{source.url}</p>
                      </div>
                      <Badge variant={source.type === 'custom' ? 'secondary' : 'default'}>
                        {source.type}
                      </Badge>
                    </div>
                    {source.type === 'custom' && (
                      <Button
                        onClick={() => removeSource(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h5 className="font-medium mb-2">Add Custom Source</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newSourceName}
                    onChange={(e) => setNewSourceName(e.target.value)}
                    placeholder="Source name"
                  />
                  <Input
                    value={newSourceUrl}
                    onChange={(e) => setNewSourceUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <Button
                  onClick={addCustomSource}
                  className="mt-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Scheduled Refresh</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh project data at regular intervals
                  </p>
                </div>
                <Switch
                  checked={isScheduleActive}
                  onCheckedChange={setIsScheduleActive}
                />
              </div>

              {isScheduleActive && (
                <div className="space-y-2">
                  <Label>Refresh Frequency</Label>
                  <Select value={refreshFrequency} onValueChange={setRefreshFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Every Hour</SelectItem>
                      <SelectItem value="6">Every 6 Hours</SelectItem>
                      <SelectItem value="12">Every 12 Hours</SelectItem>
                      <SelectItem value="24">Daily</SelectItem>
                      <SelectItem value="168">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {lastRefresh && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Last refreshed: {lastRefresh}</span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Configuration Management</h4>
              
              <div className="flex gap-2">
                <Button onClick={exportConfiguration} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Config
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importConfiguration}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Config
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rate Limiting</Label>
                <p className="text-sm text-muted-foreground">
                  Current setting: 60 requests per minute with exponential backoff
                </p>
              </div>

              <div className="space-y-2">
                <Label>Data Quality</Label>
                <p className="text-sm text-muted-foreground">
                  Duplicate detection enabled based on title and authority similarity
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FirecrawlConfigPanel;