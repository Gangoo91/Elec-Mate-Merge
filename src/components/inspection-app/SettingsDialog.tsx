import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownTabs, DropdownTab } from '@/components/ui/dropdown-tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import PdfMonkeySettings from './settings/PdfMonkeySettings';
import InspectorProfileForm from './settings/InspectorProfileForm';
import { 
  Download, 
  Trash2, 
  User,
  FileSignature,
  Save,
  FileText,
  Settings as SettingsIcon,
  Database,
  Clock
} from 'lucide-react';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useSignatureProfiles } from '@/hooks/useSignatureProfiles';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const { profiles: inspectorProfiles } = useInspectorProfiles();
  const { signatures, deleteSignature } = useSignatureProfiles();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('profiles');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30);

  const exportData = () => {
    const data = {
      inspectorProfiles,
      signatures,
      settings: {
        autoSaveEnabled,
        autoSaveInterval
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAllData = async () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      await offlineStorage.clearAll();
      toast({
        title: "Data cleared",
        description: "All application data has been cleared"
      });
      window.location.reload();
    }
  };

  const tabs: DropdownTab[] = [
    { value: 'profiles', label: 'Profiles', icon: <User className="h-4 w-4" /> },
    { value: 'drafts', label: 'Drafts', icon: <Save className="h-4 w-4" /> },
    { value: 'pdf', label: 'PDF', icon: <FileText className="h-4 w-4" /> },
    { value: 'preferences', label: 'Preferences', icon: <SettingsIcon className="h-4 w-4" /> },
    { value: 'data', label: 'Data', icon: <Database className="h-4 w-4" /> },
  ];

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-elec-yellow" />
            Settings
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your application preferences, profiles, and data
          </p>
        </div>
      </div>

      {isMobile && (
        <DropdownTabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          placeholder="Select settings section..."
        />
      )}

      {!isMobile && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                {tab.icon}
                <span className="hidden lg:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {(!isMobile || activeTab === 'profiles') && (
        <div className="space-y-6">
          <InspectorProfileForm />
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-elec-yellow" />
                Signature Profiles
                <Badge variant="secondary">{signatures.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {signatures.length === 0 ? (
                <p className="text-sm text-muted-foreground">No signatures saved yet</p>
              ) : (
                signatures.map((sig) => (
                  <div key={sig.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{sig.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(sig.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSignature(sig.id)}
                      className="h-9 w-9 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {(!isMobile || activeTab === 'pdf') && (
        <div className="space-y-4">
          <PdfMonkeySettings />
        </div>
      )}

      {(!isMobile || activeTab === 'preferences') && (
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5 text-elec-yellow" />
                Auto-Save Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save">Enable Auto-Save</Label>
                  <p className="text-sm text-muted-foreground">Automatically save your work as you type</p>
                </div>
                <Switch
                  id="auto-save"
                  checked={autoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                />
              </div>

              {autoSaveEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="interval">Auto-Save Interval (seconds)</Label>
                  <Input
                    id="interval"
                    type="number"
                    min={10}
                    max={300}
                    value={autoSaveInterval}
                    onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {(!isMobile || activeTab === 'data') && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-elec-yellow" />
                  Export Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Export all your profiles, settings, and save points as a backup file
                </p>
                <Button onClick={exportData} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  Clear All Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Permanently delete all profiles, drafts, and settings. This cannot be undone.
                </p>
                <Button variant="destructive" onClick={clearAllData} className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto p-6">
          <SheetHeader className="mb-6">
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Settings</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
