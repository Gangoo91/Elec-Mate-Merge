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
import { Gauge, Plus, Trash2, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { TestingInstrument } from '@/types/company';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';

const INSTRUMENT_TYPES = [
  { value: 'multifunction', label: 'Multifunction Tester (MFT)' },
  { value: 'insulation', label: 'Insulation Resistance Tester' },
  { value: 'loop_impedance', label: 'Loop Impedance Tester' },
  { value: 'rcd', label: 'RCD Tester' },
  { value: 'pat', label: 'PAT Tester' },
  { value: 'clamp_meter', label: 'Clamp Meter' },
  { value: 'other', label: 'Other' },
];

interface InstrumentsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const InstrumentsSheet = ({ open, onOpenChange, profile, onSave }: InstrumentsSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [instruments, setInstruments] = useState<TestingInstrument[]>([]);

  useEffect(() => {
    if (profile && open) {
      setInstruments(profile.testing_instruments || []);
    }
  }, [profile, open]);

  const handleAddInstrument = () => {
    const newInstrument: TestingInstrument = {
      id: `inst_${Date.now()}`,
      instrument_type: 'multifunction',
      make: '',
      model: '',
      serial_number: '',
      calibration_date: '',
      calibration_due: '',
    };
    setInstruments((prev) => [...prev, newInstrument]);
  };

  const handleRemoveInstrument = (id: string) => {
    setInstruments((prev) => prev.filter((inst) => inst.id !== id));
  };

  const handleInstrumentChange = (id: string, field: keyof TestingInstrument, value: string) => {
    setInstruments((prev) => prev.map((inst) => (inst.id === id ? { ...inst, [field]: value } : inst)));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({ testing_instruments: instruments });
      if (success) {
        toast.success('Instruments saved');
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
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Gauge className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Testing Instruments</h2>
              <p className="text-xs text-white">Manage your testing equipment</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-4">
            {instruments.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                <p className="text-[13px] text-white">No instruments added yet</p>
              </div>
            ) : (
              instruments.map((instrument, index) => (
                <div key={instrument.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-white">Instrument {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInstrument(instrument.id)}
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <Select
                      value={instrument.instrument_type}
                      onValueChange={(value) => handleInstrumentChange(instrument.id, 'instrument_type', value)}
                    >
                      <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INSTRUMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={instrument.make}
                      onChange={(e) => handleInstrumentChange(instrument.id, 'make', e.target.value)}
                      placeholder="Make"
                      className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Input
                      value={instrument.model}
                      onChange={(e) => handleInstrumentChange(instrument.id, 'model', e.target.value)}
                      placeholder="Model"
                      className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Input
                      value={instrument.serial_number}
                      onChange={(e) => handleInstrumentChange(instrument.id, 'serial_number', e.target.value)}
                      placeholder="Serial"
                      className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Input
                      type="date"
                      value={instrument.calibration_date}
                      onChange={(e) => handleInstrumentChange(instrument.id, 'calibration_date', e.target.value)}
                      className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Input
                      type="date"
                      value={instrument.calibration_due || ''}
                      onChange={(e) => handleInstrumentChange(instrument.id, 'calibration_due', e.target.value)}
                      className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Next cal"
                    />
                  </div>
                </div>
              ))
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddInstrument}
              className="w-full h-11 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white touch-manipulation"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Instrument
            </Button>
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

export default InstrumentsSheet;
