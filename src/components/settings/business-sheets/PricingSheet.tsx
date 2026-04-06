import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PoundSterling, Users, Loader2, CheckCircle } from 'lucide-react';
import { WorkerRates } from '@/types/company';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';

const WORKER_TYPE_LABELS: Record<keyof WorkerRates, { name: string; description: string }> = {
  electrician: { name: 'Qualified Electrician', description: 'Fully qualified' },
  apprentice: { name: 'Apprentice', description: 'Under supervision' },
  labourer: { name: 'General Labourer', description: 'General support' },
  designer: { name: 'Electrical Designer', description: 'Design specialist' },
  owner: { name: 'Business Owner', description: 'Senior electrician' },
};

const DEFAULT_WORKER_RATES: WorkerRates = {
  electrician: 45,
  apprentice: 25,
  labourer: 20,
  designer: 65,
  owner: 75,
};

interface PricingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const PricingSheet = ({ open, onOpenChange, profile, onSave }: PricingSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [paymentTerms, setPaymentTerms] = useState('30 days');
  const [overheadPercentage, setOverheadPercentage] = useState(15);
  const [profitMargin, setProfitMargin] = useState(20);
  const [workerRates, setWorkerRates] = useState<WorkerRates>(DEFAULT_WORKER_RATES);

  useEffect(() => {
    if (profile && open) {
      setHourlyRate(profile.hourly_rate || 45);
      setPaymentTerms(profile.payment_terms || '30 days');
      setOverheadPercentage(profile.overhead_percentage ?? 15);
      setProfitMargin(profile.profit_margin ?? 20);
      setWorkerRates(profile.worker_rates || DEFAULT_WORKER_RATES);
    }
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({
        hourly_rate: hourlyRate,
        payment_terms: paymentTerms,
        overhead_percentage: overheadPercentage,
        profit_margin: profitMargin,
        worker_rates: workerRates,
      });
      if (success) {
        toast.success('Pricing settings saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <PoundSterling className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pricing & Rates</h2>
              <p className="text-xs text-white">Hourly rates and profit margins</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Hourly Rate (£)</Label>
                <Input
                  type="number"
                  step="0.50"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                  placeholder="45"
                  className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Payment Terms</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-white/[0.1]">
                    <SelectItem value="On receipt">Paid on receipt</SelectItem>
                    <SelectItem value="7 days">7 days</SelectItem>
                    <SelectItem value="14 days">14 days</SelectItem>
                    <SelectItem value="30 days">30 days</SelectItem>
                    <SelectItem value="60 days">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Overhead (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={overheadPercentage}
                    onChange={(e) => setOverheadPercentage(parseFloat(e.target.value) || 0)}
                    placeholder="15"
                    className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white pr-8 focus:border-amber-500 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[14px]">%</span>
                </div>
                <p className="text-[11px] text-white">Applied to cover business running costs</p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Profit Margin (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                    placeholder="20"
                    className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white pr-8 focus:border-amber-500 focus:ring-amber-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[14px]">%</span>
                </div>
                <p className="text-[11px] text-white">Your profit on each job</p>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Worker Rates */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-400" />
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Worker Rates</Label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(Object.keys(WORKER_TYPE_LABELS) as Array<keyof WorkerRates>).map((workerKey) => {
                  const worker = WORKER_TYPE_LABELS[workerKey];
                  return (
                    <div key={workerKey} className="space-y-1.5">
                      <Label className="text-[11px] text-white font-medium">{worker.name}</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-[14px]">£</span>
                        <Input
                          type="number"
                          step="0.50"
                          value={workerRates[workerKey] || DEFAULT_WORKER_RATES[workerKey]}
                          onChange={(e) => {
                            setWorkerRates({
                              ...workerRates,
                              [workerKey]: parseFloat(e.target.value) || 0,
                            });
                          }}
                          className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white pl-7 focus:border-amber-500 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              {isSaving ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-5 w-5" /> Save</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PricingSheet;
