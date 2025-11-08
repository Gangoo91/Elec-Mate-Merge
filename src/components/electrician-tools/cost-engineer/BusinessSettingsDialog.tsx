import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface BusinessSettings {
  monthlyOverheads: {
    vanCosts: number;
    toolDepreciation: number;
    insurance: number;
    adminCosts: number;
    marketing: number;
  };
  labourRates: {
    electrician: number;
    apprentice: number;
    targetIncome: number;
  };
  profitTargets: {
    minimum: number;
    target: number;
    premium: number;
  };
  jobCosts: {
    travel: number;
    permits: number;
    waste: number;
  };
}

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  monthlyOverheads: {
    vanCosts: 450,
    toolDepreciation: 200,
    insurance: 150,
    adminCosts: 100,
    marketing: 50
  },
  labourRates: {
    electrician: 50,
    apprentice: 15,
    targetIncome: 3500
  },
  profitTargets: {
    minimum: 10,
    target: 25,
    premium: 40
  },
  jobCosts: {
    travel: 30,
    permits: 0,
    waste: 20
  }
};

const STORAGE_KEY = 'electrician_business_settings';

interface BusinessSettingsDialogProps {
  onSettingsChange?: (settings: BusinessSettings) => void;
  currentSettings?: BusinessSettings;
}

export function BusinessSettingsDialog({ onSettingsChange, currentSettings }: BusinessSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<BusinessSettings>(currentSettings || DEFAULT_BUSINESS_SETTINGS);
  const [hasConfigured, setHasConfigured] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setHasConfigured(true);
        onSettingsChange?.(parsed);
      } catch (e) {
        console.error('Failed to parse business settings:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setHasConfigured(true);
    onSettingsChange?.(settings);
    setOpen(false);
    toast.success("Business settings saved", {
      description: "Your profitability calculations will now use these settings"
    });
  };

  const totalMonthlyOverheads = 
    settings.monthlyOverheads.vanCosts +
    settings.monthlyOverheads.toolDepreciation +
    settings.monthlyOverheads.insurance +
    settings.monthlyOverheads.adminCosts +
    settings.monthlyOverheads.marketing;

  const monthlyBreakeven = totalMonthlyOverheads + settings.labourRates.targetIncome;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={hasConfigured ? "outline" : "default"}
          size="lg"
          className={hasConfigured 
            ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/20 h-12 sm:h-14 touch-manipulation" 
            : "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12 sm:h-14 touch-manipulation animate-pulse"
          }
        >
          <Settings className="h-5 w-5 mr-2" />
          {hasConfigured ? "Business Settings ✓" : "Configure Business Settings"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            Business Settings for Profitability
          </DialogTitle>
          <DialogDescription>
            Configure your business overheads and profit targets to get accurate break-even and quote recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="border-elec-yellow/30 bg-elec-yellow/5">
            <CardHeader>
              <CardTitle className="text-base">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Overheads:</span>
                <span className="font-semibold">£{totalMonthlyOverheads.toFixed(2)}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per Working Day (22 days):</span>
                <span className="font-semibold">£{(totalMonthlyOverheads / 22).toFixed(2)}/day</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground">Monthly Break-even Target:</span>
                <span className="font-bold text-elec-yellow">£{monthlyBreakeven.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Overheads */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Monthly Business Overheads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Van Costs (lease, fuel, insurance)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.monthlyOverheads.vanCosts}
                    onChange={(e) => setSettings({
                      ...settings,
                      monthlyOverheads: { ...settings.monthlyOverheads, vanCosts: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tool Depreciation/Replacement</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.monthlyOverheads.toolDepreciation}
                    onChange={(e) => setSettings({
                      ...settings,
                      monthlyOverheads: { ...settings.monthlyOverheads, toolDepreciation: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Insurance</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.monthlyOverheads.insurance}
                    onChange={(e) => setSettings({
                      ...settings,
                      monthlyOverheads: { ...settings.monthlyOverheads, insurance: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Office/Admin Costs</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.monthlyOverheads.adminCosts}
                    onChange={(e) => setSettings({
                      ...settings,
                      monthlyOverheads: { ...settings.monthlyOverheads, adminCosts: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Marketing/Advertising</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.monthlyOverheads.marketing}
                    onChange={(e) => setSettings({
                      ...settings,
                      monthlyOverheads: { ...settings.monthlyOverheads, marketing: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Labour Rates */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Labour Costs & Income</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Qualified Electrician Rate (per hour)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.labourRates.electrician}
                    onChange={(e) => setSettings({
                      ...settings,
                      labourRates: { ...settings.labourRates, electrician: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Apprentice Rate (per hour)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.labourRates.apprentice}
                    onChange={(e) => setSettings({
                      ...settings,
                      labourRates: { ...settings.labourRates, apprentice: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Target Personal Income (monthly)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.labourRates.targetIncome}
                    onChange={(e) => setSettings({
                      ...settings,
                      labourRates: { ...settings.labourRates, targetIncome: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">This is what you need to earn after all overheads to pay yourself</p>
              </div>
            </div>
          </div>

          {/* Profit Targets */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Profit Margin Targets (%)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Minimum Margin
                  <span className="text-xs text-yellow-500">🟡</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.profitTargets.minimum}
                    onChange={(e) => setSettings({
                      ...settings,
                      profitTargets: { ...settings.profitTargets, minimum: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Target Margin
                  <span className="text-xs text-green-500">🟢</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.profitTargets.target}
                    onChange={(e) => setSettings({
                      ...settings,
                      profitTargets: { ...settings.profitTargets, target: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Premium Margin
                  <span className="text-xs text-purple-500">🟣</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={settings.profitTargets.premium}
                    onChange={(e) => setSettings({
                      ...settings,
                      profitTargets: { ...settings.profitTargets, premium: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job-Specific Costs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Average Job Costs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Travel per Job</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.jobCosts.travel}
                    onChange={(e) => setSettings({
                      ...settings,
                      jobCosts: { ...settings.jobCosts, travel: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permits/Parking</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.jobCosts.permits}
                    onChange={(e) => setSettings({
                      ...settings,
                      jobCosts: { ...settings.jobCosts, permits: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Waste Disposal</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">£</span>
                  <Input
                    type="number"
                    value={settings.jobCosts.waste}
                    onChange={(e) => setSettings({
                      ...settings,
                      jobCosts: { ...settings.jobCosts, waste: Number(e.target.value) }
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warning Card */}
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-orange-500">Important: Review These Settings Regularly</p>
                  <p className="text-muted-foreground">
                    Your business costs change over time. Update these settings every few months to ensure accurate profitability calculations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
