import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
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

// Generate user-scoped storage key for business settings
const getStorageKey = (userId?: string) =>
  userId
    ? `electrician_business_settings_${userId}`
    : 'electrician_business_settings_guest';

interface BusinessSettingsDialogProps {
  onSettingsChange?: (settings: BusinessSettings) => void;
  currentSettings?: BusinessSettings;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideButton?: boolean;
  userId?: string;
}

export function BusinessSettingsDialog({
  onSettingsChange,
  currentSettings,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  hideButton = false,
  userId
}: BusinessSettingsDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Support both controlled and uncontrolled modes
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;
  const [settings, setSettings] = useState<BusinessSettings>(currentSettings || DEFAULT_BUSINESS_SETTINGS);
  const [hasConfigured, setHasConfigured] = useState(false);

  const storageKey = getStorageKey(userId);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        setHasConfigured(true);
        onSettingsChange?.(parsed);
      } catch (e) {
        console.error('Failed to parse business settings:', e);
      }
    } else {
      // Reset to defaults when no saved settings for this user
      setSettings(DEFAULT_BUSINESS_SETTINGS);
      setHasConfigured(false);
    }
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
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
      {!hideButton && (
        <DialogTrigger asChild>
          <Button
            variant={hasConfigured ? "outline" : "default"}
            size="lg"
            className={cn(
              "w-full h-12 sm:h-14 touch-manipulation text-base sm:text-lg font-semibold",
              hasConfigured
                ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/20"
                : "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 animate-pulse"
            )}
          >
            <Settings className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="truncate">
              {hasConfigured ? "Business Settings ✓" : "Configure Business Settings"}
            </span>
          </Button>
        </DialogTrigger>
      )}
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
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Total Overheads:</span>
                <span className="text-base font-semibold">£{totalMonthlyOverheads.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Per Working Day (22 days):</span>
                <span className="text-base font-semibold">£{(totalMonthlyOverheads / 22).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/day</span>
              </div>
              <div className="flex justify-between items-center border-t border-elec-yellow/20 pt-3 mt-1">
                <span className="text-sm font-medium text-foreground">Monthly Break-even Target:</span>
                <span className="text-lg font-bold text-elec-yellow">£{monthlyBreakeven.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Overheads */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Monthly Business Overheads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start">
              <MobileInput
                label="Van Costs"
                hint="Lease, fuel, insurance"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.monthlyOverheads.vanCosts.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  monthlyOverheads: { ...settings.monthlyOverheads, vanCosts: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Tool Depreciation"
                hint="Monthly replacement budget"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.monthlyOverheads.toolDepreciation.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  monthlyOverheads: { ...settings.monthlyOverheads, toolDepreciation: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Business Insurance"
                hint="Liability & equipment cover"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.monthlyOverheads.insurance.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  monthlyOverheads: { ...settings.monthlyOverheads, insurance: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Admin Costs"
                hint="Office, software, phone"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.monthlyOverheads.adminCosts.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  monthlyOverheads: { ...settings.monthlyOverheads, adminCosts: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Marketing"
                hint="Advertising & promotion"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.monthlyOverheads.marketing.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  monthlyOverheads: { ...settings.monthlyOverheads, marketing: Number(e.target.value) || 0 }
                })}
              />
            </div>
          </div>

          {/* Labour Rates */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Labour Costs & Income</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-start">
              <MobileInput
                label="Electrician Rate"
                hint="Qualified rate per hour"
                type="number"
                inputMode="decimal"
                unit="£/hr"
                value={settings.labourRates.electrician.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  labourRates: { ...settings.labourRates, electrician: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Apprentice Rate"
                hint="Apprentice rate per hour"
                type="number"
                inputMode="decimal"
                unit="£/hr"
                value={settings.labourRates.apprentice.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  labourRates: { ...settings.labourRates, apprentice: Number(e.target.value) || 0 }
                })}
              />

              <div className="sm:col-span-2">
                <MobileInput
                  label="Target Personal Income"
                  hint="What you need to earn monthly after all overheads"
                  type="number"
                  inputMode="decimal"
                  unit="£/mo"
                  value={settings.labourRates.targetIncome.toString()}
                  onChange={(e) => setSettings({
                    ...settings,
                    labourRates: { ...settings.labourRates, targetIncome: Number(e.target.value) || 0 }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Profit Targets */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Profit Margin Targets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-start">
              <MobileInput
                label="Minimum 🟡"
                hint="Conservative margin"
                type="number"
                inputMode="decimal"
                unit="%"
                value={settings.profitTargets.minimum.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  profitTargets: { ...settings.profitTargets, minimum: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Target 🟢"
                hint="Standard margin"
                type="number"
                inputMode="decimal"
                unit="%"
                value={settings.profitTargets.target.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  profitTargets: { ...settings.profitTargets, target: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Premium 🟣"
                hint="High-value margin"
                type="number"
                inputMode="decimal"
                unit="%"
                value={settings.profitTargets.premium.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  profitTargets: { ...settings.profitTargets, premium: Number(e.target.value) || 0 }
                })}
              />
            </div>
          </div>

          {/* Job-Specific Costs */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Average Job Costs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 items-start">
              <MobileInput
                label="Travel per Job"
                hint="Fuel & mileage"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.jobCosts.travel.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  jobCosts: { ...settings.jobCosts, travel: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Permits/Parking"
                hint="Parking & permit costs"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.jobCosts.permits.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  jobCosts: { ...settings.jobCosts, permits: Number(e.target.value) || 0 }
                })}
              />

              <MobileInput
                label="Waste Disposal"
                hint="Skip hire & disposal"
                type="number"
                inputMode="decimal"
                unit="£"
                value={settings.jobCosts.waste.toString()}
                onChange={(e) => setSettings({
                  ...settings,
                  jobCosts: { ...settings.jobCosts, waste: Number(e.target.value) || 0 }
                })}
              />
            </div>
          </div>

          {/* Warning Card */}
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-orange-500">Important: Review These Settings Regularly</p>
                  <p className="text-foreground">
                    Your business costs change over time. Update these settings every few months to ensure accurate profitability calculations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-6 sticky bottom-0 bg-background pb-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1 h-12 touch-manipulation">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 h-12 touch-manipulation bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
