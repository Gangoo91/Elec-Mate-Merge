import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkerRates, CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Pricing & rates
            </h2>
            <p className="mt-1 text-[13px] text-white">Hourly rates and profit margins</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Hourly rate (£)</Label>
                <Input
                  type="number"
                  step="0.50"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                  placeholder="45"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Payment terms</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Overhead (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={overheadPercentage}
                    onChange={(e) => setOverheadPercentage(parseFloat(e.target.value) || 0)}
                    placeholder="15"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white pr-8 focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[14px] pointer-events-none">
                    %
                  </span>
                </div>
                <p className="text-[11.5px] text-white">Applied to cover business running costs</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Profit margin (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                    placeholder="20"
                    className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white pr-8 focus:border-elec-yellow focus:ring-0 touch-manipulation"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[14px] pointer-events-none">
                    %
                  </span>
                </div>
                <p className="text-[11.5px] text-white">Your profit on each job</p>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Worker rates */}
            <div className="space-y-3">
              <Eyebrow>Worker rates</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(Object.keys(WORKER_TYPE_LABELS) as Array<keyof WorkerRates>).map((workerKey) => {
                  const worker = WORKER_TYPE_LABELS[workerKey];
                  return (
                    <div key={workerKey} className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">{worker.name}</Label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-white">
                          £
                        </span>
                        <Input
                          type="number"
                          step="0.50"
                          value={workerRates[workerKey] ?? DEFAULT_WORKER_RATES[workerKey]}
                          onChange={(e) => {
                            setWorkerRates({
                              ...workerRates,
                              [workerKey]: parseFloat(e.target.value) || 0,
                            });
                          }}
                          className="h-11 bg-[#0a0a0a] border-white/[0.08] pl-8 text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                        />
                      </div>
                      <p className="text-[11px] text-white">{worker.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PricingSheet;
