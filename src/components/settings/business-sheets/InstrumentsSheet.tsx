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
import { TestingInstrument, CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow, EmptyState } from '@/components/college/primitives';

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

  const handleInstrumentChange = (
    id: string,
    field: keyof TestingInstrument,
    value: string
  ) => {
    setInstruments((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, [field]: value } : inst))
    );
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Equipment</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Testing instruments
            </h2>
            <p className="mt-1 text-[13px] text-white">Manage your testing equipment</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-4">
            {instruments.length === 0 ? (
              <EmptyState
                title="No instruments yet"
                description="Add your MFTs, loop and RCD testers to include calibration details on certificates."
              />
            ) : (
              instruments.map((instrument, index) => (
                <div
                  key={instrument.id}
                  className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Eyebrow>Instrument {String(index + 1).padStart(2, '0')}</Eyebrow>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstrument(instrument.id)}
                      className="h-9 px-3 rounded-xl border border-red-500/30 text-red-400 text-[12px] font-medium hover:bg-red-500/10 transition-colors touch-manipulation"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">Type</Label>
                      <Select
                        value={instrument.instrument_type}
                        onValueChange={(value) =>
                          handleInstrumentChange(instrument.id, 'instrument_type', value)
                        }
                      >
                        <SelectTrigger className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                          {INSTRUMENT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">Make</Label>
                      <Input
                        value={instrument.make}
                        onChange={(e) =>
                          handleInstrumentChange(instrument.id, 'make', e.target.value)
                        }
                        placeholder="e.g. Megger"
                        className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">Model</Label>
                      <Input
                        value={instrument.model}
                        onChange={(e) =>
                          handleInstrumentChange(instrument.id, 'model', e.target.value)
                        }
                        placeholder="e.g. MFT1741"
                        className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">Serial</Label>
                      <Input
                        value={instrument.serial_number}
                        onChange={(e) =>
                          handleInstrumentChange(instrument.id, 'serial_number', e.target.value)
                        }
                        placeholder="Serial number"
                        className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">Calibrated on</Label>
                      <Input
                        type="date"
                        value={instrument.calibration_date}
                        onChange={(e) =>
                          handleInstrumentChange(
                            instrument.id,
                            'calibration_date',
                            e.target.value
                          )
                        }
                        className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-white font-medium text-[12px]">Next calibration</Label>
                      <Input
                        type="date"
                        value={instrument.calibration_due || ''}
                        onChange={(e) =>
                          handleInstrumentChange(
                            instrument.id,
                            'calibration_due',
                            e.target.value
                          )
                        }
                        className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}

            <button
              type="button"
              onClick={handleAddInstrument}
              className="w-full h-11 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] text-white text-[13px] font-medium transition-colors touch-manipulation"
            >
              Add instrument +
            </button>
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

export default InstrumentsSheet;
