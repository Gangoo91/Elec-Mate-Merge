import React, { useState } from 'react';
import { Users, ChevronRight, Loader2, Check, PoundSterling } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CompanyProfile, WorkerRates } from '@/types/company';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface WorkerRatesCardProps {
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

const defaultWorkerRates: WorkerRates = {
  electrician: 45,
  apprentice: 25,
  labourer: 20,
  designer: 65,
  owner: 75,
};

const workerTypeLabels: { key: keyof WorkerRates; name: string; description: string }[] = [
  { key: 'electrician', name: 'Qualified Electrician', description: 'Fully qualified electrician' },
  { key: 'apprentice', name: 'Apprentice', description: 'Under supervision' },
  { key: 'labourer', name: 'General Labourer', description: 'General assistance' },
  { key: 'designer', name: 'Electrical Designer', description: 'Design & planning' },
  { key: 'owner', name: 'Business Owner', description: 'Senior electrician' },
];

const WorkerRatesCard: React.FC<WorkerRatesCardProps> = ({
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<WorkerRates>(
    companyProfile?.worker_rates || defaultWorkerRates
  );

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave({ worker_rates: formData });
    setIsSaving(false);
    if (success) {
      setShowSuccess(true);
      toast.success('Worker rates saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    }
  };

  const handleOpen = () => {
    setFormData(companyProfile?.worker_rates || defaultWorkerRates);
    setIsEditing(true);
  };

  const updateRate = (key: keyof WorkerRates, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0,
    }));
  };

  // Get current rates for display
  const rates = companyProfile?.worker_rates || defaultWorkerRates;
  const electricianRate = rates.electrician;
  const hasCustomRates = companyProfile?.worker_rates !== undefined;

  return (
    <>
      <motion.div
        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <button
          onClick={handleOpen}
          className="w-full flex items-center justify-between px-4 py-3.5 active:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="font-semibold text-[15px] text-white">Worker Rates</span>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30" />
        </button>

        <div className="border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
              <PoundSterling className="h-4 w-4 text-green-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Electrician Rate</p>
              <p className="text-[15px] text-white">£{electricianRate.toFixed(2)}/hr</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">All Worker Types</p>
              <p className="text-[15px] text-white">
                {hasCustomRates ? 'Custom rates set' : 'Using defaults'}
              </p>
              <p className="text-[12px] text-white/50 mt-0.5">
                Used in quotes & invoices
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] p-0 border-0 bg-[#1c1c1e] flex flex-col">
          <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 border-b border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[17px] text-blue-400 font-normal active:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <h2 className="text-[17px] font-semibold text-white">Worker Rates</h2>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-[17px] text-blue-400 font-semibold active:opacity-50 touch-manipulation disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : showSuccess ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                  <Check className="h-5 w-5 text-green-400" />
                </motion.div>
              ) : (
                'Save'
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-2 pb-8">
            <p className="text-[13px] text-white/50 px-1 mb-4">
              Set hourly rates for different worker types. These rates are used as defaults when creating quotes and invoices.
            </p>

            {workerTypeLabels.map((worker) => (
              <div
                key={worker.key}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-white">{worker.name}</p>
                  <p className="text-[13px] text-white/50">{worker.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] text-white/50">£</span>
                  <Input
                    type="number"
                    step="0.50"
                    min="0"
                    value={formData[worker.key] || ''}
                    onChange={(e) => updateRate(worker.key, e.target.value)}
                    className="w-20 h-[44px] text-[17px] text-right bg-white/[0.06] border-white/[0.08] rounded-xl px-3 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                  />
                  <span className="text-[13px] text-white/50">/hr</span>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default WorkerRatesCard;
