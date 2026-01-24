import React, { useState, useEffect } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
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
  Clock,
  Receipt,
  Plus,
  X,
  Palette,
  Shield,
  Calendar,
  Percent
} from 'lucide-react';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useSignatureProfiles } from '@/hooks/useSignatureProfiles';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

// Default T&Cs options for electrical contractors
const DEFAULT_TERMS = [
  { id: 'payment_30', label: 'Payment due within 30 days of invoice date', category: 'Payment' },
  { id: 'deposit_required', label: 'A deposit of the specified percentage is required before work commences', category: 'Payment' },
  { id: 'additional_charges', label: 'Additional work not included in this quote will be charged at our standard hourly rate', category: 'Payment' },
  { id: 'warranty_workmanship', label: 'All workmanship is guaranteed for the warranty period specified', category: 'Warranty' },
  { id: 'warranty_materials', label: 'Materials are covered by manufacturer warranties where applicable', category: 'Warranty' },
  { id: 'bs7671_compliance', label: 'All electrical work complies with BS 7671 (18th Edition) Wiring Regulations', category: 'Compliance' },
  { id: 'part_p_notification', label: 'Building control notification (Part P) included where required', category: 'Compliance' },
  { id: 'testing_cert', label: 'Electrical installation certificate or minor works certificate provided on completion', category: 'Compliance' },
  { id: 'access_required', label: 'Clear access to work areas must be provided', category: 'Access' },
  { id: 'power_isolation', label: 'Power may need to be isolated during installation - advance notice will be given', category: 'Access' },
  { id: 'site_safety', label: 'Work area will be left safe and clean at the end of each working day', category: 'Safety' },
  { id: 'asbestos_disclaimer', label: 'This quote excludes work involving asbestos - if discovered, work will stop pending survey', category: 'Safety' },
  { id: 'price_validity', label: 'This quotation is valid for the number of days specified from the date of issue', category: 'General' },
  { id: 'cancellation', label: 'Cancellation within 48 hours of scheduled work may incur charges', category: 'General' },
  { id: 'unforeseen_works', label: 'Unforeseen works discovered during installation will be quoted separately', category: 'General' },
];

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const { profiles: inspectorProfiles } = useInspectorProfiles();
  const { signatures, deleteSignature } = useSignatureProfiles();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profiles');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30);

  // Quote settings state
  const [quoteValidityDays, setQuoteValidityDays] = useState(30);
  const [depositPercentage, setDepositPercentage] = useState(30);
  const [warrantyPeriod, setWarrantyPeriod] = useState('12 months');
  const [accentColor, setAccentColor] = useState('#FFD700');
  const [selectedTerms, setSelectedTerms] = useState<string[]>([
    'payment_30', 'deposit_required', 'warranty_workmanship', 'bs7671_compliance',
    'testing_cert', 'price_validity'
  ]);
  const [customTerms, setCustomTerms] = useState<{ id: string; label: string }[]>([]);
  const [newCustomTerm, setNewCustomTerm] = useState('');
  const [isLoadingQuoteSettings, setIsLoadingQuoteSettings] = useState(false);
  const [isSavingQuoteSettings, setIsSavingQuoteSettings] = useState(false);

  // Load quote settings from database
  useEffect(() => {
    const loadQuoteSettings = async () => {
      if (!user?.id) return;
      setIsLoadingQuoteSettings(true);
      try {
        const { data, error } = await supabase
          .from('company_profiles')
          .select('quote_validity_days, deposit_percentage, warranty_period, accent_color, quote_terms')
          .eq('user_id', user.id)
          .single();

        if (data) {
          if (data.quote_validity_days) setQuoteValidityDays(data.quote_validity_days);
          if (data.deposit_percentage) setDepositPercentage(data.deposit_percentage);
          if (data.warranty_period) setWarrantyPeriod(data.warranty_period);
          if (data.accent_color) setAccentColor(data.accent_color);
          if (data.quote_terms) {
            try {
              const terms = JSON.parse(data.quote_terms);
              if (terms.selected) setSelectedTerms(terms.selected);
              if (terms.custom) setCustomTerms(terms.custom);
            } catch {
              // Legacy format - plain text
            }
          }
        }
      } catch (err) {
        console.error('Error loading quote settings:', err);
      } finally {
        setIsLoadingQuoteSettings(false);
      }
    };

    if (isOpen) {
      loadQuoteSettings();
    }
  }, [user?.id, isOpen]);

  // Save quote settings
  const saveQuoteSettings = async () => {
    if (!user?.id) {
      toast({ title: 'Error', description: 'You must be logged in to save settings', variant: 'destructive' });
      return;
    }

    setIsSavingQuoteSettings(true);
    try {
      const termsJson = JSON.stringify({
        selected: selectedTerms,
        custom: customTerms
      });

      const { error } = await supabase
        .from('company_profiles')
        .update({
          quote_validity_days: quoteValidityDays,
          deposit_percentage: depositPercentage,
          warranty_period: warrantyPeriod,
          accent_color: accentColor,
          quote_terms: termsJson
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({ title: 'Saved', description: 'Quote settings saved successfully' });
    } catch (err: any) {
      console.error('Error saving quote settings:', err);
      toast({ title: 'Error', description: err.message || 'Failed to save settings', variant: 'destructive' });
    } finally {
      setIsSavingQuoteSettings(false);
    }
  };

  // Toggle term selection
  const toggleTerm = (termId: string) => {
    setSelectedTerms(prev =>
      prev.includes(termId)
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
    );
  };

  // Add custom term
  const addCustomTerm = () => {
    if (!newCustomTerm.trim()) return;
    const id = `custom_${Date.now()}`;
    setCustomTerms(prev => [...prev, { id, label: newCustomTerm.trim() }]);
    setSelectedTerms(prev => [...prev, id]);
    setNewCustomTerm('');
  };

  // Remove custom term
  const removeCustomTerm = (termId: string) => {
    setCustomTerms(prev => prev.filter(t => t.id !== termId));
    setSelectedTerms(prev => prev.filter(id => id !== termId));
  };

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
    { value: 'quotes', label: 'Quotes', icon: <Receipt className="h-4 w-4" /> },
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

      {(!isMobile || activeTab === 'quotes') && (
        <div className="space-y-4">
          {/* Quote General Settings */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-elec-yellow" />
                Quote Settings
              </CardTitle>
              <CardDescription>Configure default settings for your quotes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quote-validity" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Quote Validity (days)
                  </Label>
                  <Input
                    id="quote-validity"
                    type="number"
                    min={7}
                    max={90}
                    value={quoteValidityDays}
                    onChange={(e) => setQuoteValidityDays(Number(e.target.value))}
                    className="h-11 touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit-percentage" className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    Deposit Required (%)
                  </Label>
                  <Input
                    id="deposit-percentage"
                    type="number"
                    min={0}
                    max={100}
                    value={depositPercentage}
                    onChange={(e) => setDepositPercentage(Number(e.target.value))}
                    className="h-11 touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warranty-period" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Warranty Period
                  </Label>
                  <Input
                    id="warranty-period"
                    type="text"
                    value={warrantyPeriod}
                    onChange={(e) => setWarrantyPeriod(e.target.value)}
                    placeholder="e.g. 12 months"
                    className="h-11 touch-manipulation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color" className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    Accent Colour
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-11 w-14 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      placeholder="#FFD700"
                      className="h-11 touch-manipulation flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions Selection */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Terms & Conditions
              </CardTitle>
              <CardDescription>Select which terms to include on your quotes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Group terms by category */}
              {['Payment', 'Warranty', 'Compliance', 'Access', 'Safety', 'General'].map(category => {
                const categoryTerms = DEFAULT_TERMS.filter(t => t.category === category);
                if (categoryTerms.length === 0) return null;
                return (
                  <div key={category} className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                      {category}
                    </h4>
                    <div className="space-y-2 pl-3">
                      {categoryTerms.map(term => (
                        <div key={term.id} className="flex items-start gap-3">
                          <Checkbox
                            id={term.id}
                            checked={selectedTerms.includes(term.id)}
                            onCheckedChange={() => toggleTerm(term.id)}
                            className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                          />
                          <Label
                            htmlFor={term.id}
                            className="text-sm leading-tight cursor-pointer"
                          >
                            {term.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Custom Terms */}
              <div className="space-y-2 pt-2 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Your Custom Terms
                </h4>
                <div className="space-y-2 pl-3">
                  {customTerms.map(term => (
                    <div key={term.id} className="flex items-start gap-3">
                      <Checkbox
                        id={term.id}
                        checked={selectedTerms.includes(term.id)}
                        onCheckedChange={() => toggleTerm(term.id)}
                        className="mt-0.5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-black"
                      />
                      <Label
                        htmlFor={term.id}
                        className="text-sm leading-tight cursor-pointer flex-1"
                      >
                        {term.label}
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCustomTerm(term.id)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {/* Add new custom term */}
                  <div className="flex gap-2 mt-3">
                    <Textarea
                      value={newCustomTerm}
                      onChange={(e) => setNewCustomTerm(e.target.value)}
                      placeholder="Add your own term..."
                      className="min-h-[60px] text-sm touch-manipulation flex-1"
                    />
                    <Button
                      onClick={addCustomTerm}
                      disabled={!newCustomTerm.trim()}
                      size="sm"
                      className="h-auto bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Selected count */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {selectedTerms.length} terms selected
                </p>
                <Button
                  onClick={saveQuoteSettings}
                  disabled={isSavingQuoteSettings}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  {isSavingQuoteSettings ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Quote Settings
                    </>
                  )}
                </Button>
              </div>
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
