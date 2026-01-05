import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertTriangle, Settings, Eye, TestTube, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { pdfMonkeyService } from '@/components/pdf/PdfMonkeyService';

interface PdfMonkeySettingsProps {
  onSave?: () => void;
}

export const PdfMonkeySettings: React.FC<PdfMonkeySettingsProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [eicTemplateId, setEicTemplateId] = useState('');
  const [eicrTemplateId, setEicrTemplateId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved configuration from IndexedDB
    const loadConfig = async () => {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorage.getApiCredentials('pdfMonkey');
      
      if (credentials.apiKey) {
        setApiKey(credentials.apiKey);
      }
      
      if (credentials.templateId) {
        setTemplateId(credentials.templateId);
      }
      
      // Load EIC and EICR template IDs
      const eicId = credentials.eicTemplateId;
      const eicrId = credentials.eicrTemplateId;
      
      if (eicId) setEicTemplateId(eicId);
      if (eicrId) setEicrTemplateId(eicrId);
      
      if (credentials.apiKey && credentials.templateId) {
        setIsConfigured(true);
        pdfMonkeyService.setConfig(credentials.apiKey, credentials.templateId);
      }
    };
    loadConfig();
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide API key.",
        variant: "destructive",
      });
      return;
    }

    // Save to IndexedDB
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.saveApiCredential('pdfMonkey', 'apiKey', apiKey);
    
    if (templateId.trim()) {
      await offlineStorage.saveApiCredential('pdfMonkey', 'templateId', templateId);
      pdfMonkeyService.setConfig(apiKey, templateId);
    }
    
    // Save EIC and EICR template IDs
    if (eicTemplateId.trim()) {
      await offlineStorage.saveApiCredential('pdfMonkey', 'eicTemplateId', eicTemplateId);
    }
    if (eicrTemplateId.trim()) {
      await offlineStorage.saveApiCredential('pdfMonkey', 'eicrTemplateId', eicrTemplateId);
    }
    
    setIsConfigured(true);
    
    toast({
      title: "Settings Saved",
      description: "PDF Monkey configuration has been saved successfully.",
    });

    onSave?.();
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim() || !templateId.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both API key and template ID before testing.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    // Temporarily set config for testing
    pdfMonkeyService.setConfig(apiKey, templateId);
    
    const result = await pdfMonkeyService.testConnection();
    setTestResult(result);
    setIsTesting(false);

    if (result.success) {
      toast({
        title: "Connection Successful",
        description: "Successfully connected to PDF Monkey template.",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: result.error || "Could not connect to PDF Monkey.",
        variant: "destructive",
      });
    }
  };

  const handleClear = async () => {
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.saveApiCredential('pdfMonkey', 'apiKey', null);
    await offlineStorage.saveApiCredential('pdfMonkey', 'templateId', null);
    await offlineStorage.saveApiCredential('pdfMonkey', 'eicTemplateId', null);
    await offlineStorage.saveApiCredential('pdfMonkey', 'eicrTemplateId', null);
    setApiKey('');
    setTemplateId('');
    setEicTemplateId('');
    setEicrTemplateId('');
    setIsConfigured(false);
    setTestResult(null);
    
    toast({
      title: "Settings Cleared",
      description: "PDF Monkey configuration has been cleared.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Monkey Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              {isConfigured ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Configured
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <Settings className="h-3 w-3 mr-1" />
                  Not Configured
                </Badge>
              )}
            </div>
            
            {testResult && (
              <Badge variant={testResult.success ? "default" : "destructive"}>
                {testResult.success ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <AlertTriangle className="h-3 w-3 mr-1" />
                )}
                {testResult.success ? 'Connected' : 'Connection Failed'}
              </Badge>
            )}
          </div>

          <Alert>
            <Eye className="h-4 w-4" />
            <AlertDescription>
              PDF Monkey allows you to use custom certificate templates. Configure your API credentials to generate certificates using your own branded templates instead of the built-in template.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">PDF Monkey API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your PDF Monkey API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Available in your PDF Monkey dashboard under API settings
              </p>
            </div>

            <div>
              <Label htmlFor="templateId">Minor Works Template ID</Label>
              <Input
                id="templateId"
                placeholder="Enter your Minor Works template ID"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                The template ID for your Minor Works Certificate template
              </p>
            </div>

            <div>
              <Label htmlFor="eicTemplateId">EIC Template ID</Label>
              <Input
                id="eicTemplateId"
                placeholder="Enter your EIC template ID (UUID format)"
                value={eicTemplateId}
                onChange={(e) => setEicTemplateId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                The template ID for your Electrical Installation Certificate template
              </p>
            </div>

            <div>
              <Label htmlFor="eicrTemplateId">EICR Template ID</Label>
              <Input
                id="eicrTemplateId"
                placeholder="Enter your EICR template ID (UUID format)"
                value={eicrTemplateId}
                onChange={(e) => setEicrTemplateId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                The template ID for your Electrical Installation Condition Report template
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave} disabled={!apiKey.trim()}>
              <Settings className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>

            <Button 
              variant="outline" 
              onClick={handleTestConnection} 
              disabled={!apiKey.trim() || !templateId.trim() || isTesting}
            >
              <TestTube className="h-4 w-4 mr-2" />
              {isTesting ? 'Testing...' : 'Test Connection'}
            </Button>

            {isConfigured && (
              <Button variant="destructive" onClick={handleClear}>
                Clear Configuration
              </Button>
            )}
          </div>

          {testResult && !testResult.success && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Connection Error:</strong> {testResult.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Your PDF template should include fields for:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Certificate details (certificateNumber, workDate)</li>
              <li>Client information (clientName, propertyAddress)</li>
              <li>Work description (workDescription, workType)</li>
              <li>Supply characteristics (supplyVoltage, earthingArrangement)</li>
              <li>Circuit details (circuitDesignation, protectiveDevice)</li>
              <li>Test results (continuity, insulation, Zs values)</li>
              <li>Declaration (electricianName, position, signatureDate)</li>
            </ul>
            <p className="mt-3">
              <strong>Note:</strong> Field names in your template should match the form field names for automatic mapping.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfMonkeySettings;