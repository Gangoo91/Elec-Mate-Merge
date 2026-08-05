import React, { useEffect, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
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
  const [dayRate, setDayRate] = useState<number | ''>('');
  const [paymentTerms, setPaymentTerms] = useState('30 days');
  const [workerRates, setWorkerRates] = useState<WorkerRates>(DEFAULT_WORKER_RATES);

  // Hydrate ONCE per open transition (see CompanySheet for rationale).
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    if (!profile) return;
    setHourlyRate(profile.hourly_rate || 45);
    setDayRate(profile.day_rate ?? '');
    setPaymentTerms(profile.payment_terms || '30 days');
    setWorkerRates(profile.worker_rates || DEFAULT_WORKER_RATES);
    hydratedForOpenRef.current = true;
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({
        hourly_rate: hourlyRate,
        day_rate: dayRate === '' ? null : dayRate,
        payment_terms: paymentTerms,
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
      <SettingsSheetContent className="bg-[hsl(0_0%_12%)]">
        <div className="flex flex-col h-full bg-[hsl(0_0%_12%)]">
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 lg:pt-6 pb-4">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Pricing & rates
            </h2>
            <p className="mt-1 text-[13px] text-white">Hourly rates, day rate and payment terms</p>
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
                  className="h-11 bg-white/[0.06] border-white/[0.12] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Day rate (£)</Label>
                <Input
                  type="number"
                  step="1"
                  value={dayRate}
                  onChange={(e) =>
                    setDayRate(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)
                  }
                  placeholder={`${(hourlyRate || 45) * 8}`}
                  className="h-11 bg-white/[0.06] border-white/[0.12] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
                <p className="text-[11.5px] text-white">Leave blank to use hourly rate × 8</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Payment terms</Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger className="h-11 bg-white/[0.06] border-white/[0.12] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_16%)] border-white/[0.12] shadow-xl shadow-black/50 text-white">
                    <SelectItem value="On receipt">Paid on receipt</SelectItem>
                    <SelectItem value="7 days">7 days</SelectItem>
                    <SelectItem value="14 days">14 days</SelectItem>
                    <SelectItem value="30 days">30 days</SelectItem>
                    <SelectItem value="60 days">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/*
              ELE-1473 — the Overhead (%) and Profit margin (%) fields lived
              here. They were added on top of the subtotal with no line item on
              the invoice, so the customer-facing total silently disagreed with
              the quote for the same job. Profit now belongs where the customer
              can see it: the hourly rate above, and the material markup on each
              line in the invoice builder.
            */}

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
                          className="h-11 bg-[hsl(0_0%_12%)] border-white/[0.08] pl-8 text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
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
      </SettingsSheetContent>
    </Sheet>
  );
};

export default PricingSheet;
