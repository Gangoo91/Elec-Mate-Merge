import React, { useState } from 'react';
import { Wrench, ChevronRight, Loader2, Check, Plus, Trash2, Calendar, Hash, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompanyProfile, TestingInstrument } from '@/types/company';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface TestingInstrumentsCardProps {
  companyProfile: CompanyProfile | null;
  onSave: (data: Partial<CompanyProfile>) => Promise<boolean>;
  isLoading: boolean;
}

const INSTRUMENT_TYPES = [
  { value: 'multifunction', label: 'Multifunction Tester' },
  { value: 'insulation', label: 'Insulation Resistance Tester' },
  { value: 'loop_impedance', label: 'Loop Impedance Tester' },
  { value: 'rcd', label: 'RCD Tester' },
  { value: 'continuity', label: 'Continuity Tester' },
  { value: 'earth_electrode', label: 'Earth Electrode Tester' },
  { value: 'pat', label: 'PAT Tester' },
  { value: 'clamp_meter', label: 'Clamp Meter' },
  { value: 'voltage_indicator', label: 'Voltage Indicator' },
  { value: 'phase_rotation', label: 'Phase Rotation Tester' },
  { value: 'thermal_imaging', label: 'Thermal Imaging Camera' },
  { value: 'ev_charger', label: 'EV Charger Tester' },
  { value: 'other', label: 'Other' },
] as const;

// Common UK electrical test instrument manufacturers and models
const COMMON_MAKES = [
  'Fluke',
  'Megger',
  'Kewtech',
  'Martindale',
  'Metrel',
  'Robin',
  'Seaward',
  'TIS',
  'Socket & See',
  'Di-Log',
  'Chauvin Arnoux',
  'Other',
] as const;

const COMMON_MODELS: Record<string, string[]> = {
  'Fluke': ['1664 FC', '1663', '1662', '1653B', '1652C', '1651B', 'T6-1000', 'T5-600', '117', '115', '87V', '376 FC'],
  'Megger': ['MFT-X1', 'MFT1845', 'MFT1835', 'MFT1825', 'MFT1741', 'MFT1730', 'MFT1720', 'MIT430', 'MIT420', 'MIT410', 'PAT450', 'PAT420', 'DET4TCR2', 'DET4TD2'],
  'Kewtech': ['KT66DL', 'KT65DL', 'KT64DL', 'KT63DL', 'KT62', 'KT61', 'SMARTPAT', 'EZYPAT', 'LOOPCHECK', 'KEWPROVE 3'],
  'Martindale': ['ET4500', 'ET4000', 'ET3000', 'VI13700', 'VI13800', 'EPAT1600', 'EPAT2100', 'EZ165', 'EZ150'],
  'Metrel': ['MI3155', 'MI3152', 'MI3125BT', 'MI3102H', 'MI3100', 'MI3360', 'MI3325'],
  'Robin': ['KMP7250', 'KMP6250', 'KMP450', 'Amprobe 5XP'],
  'Seaward': ['Apollo 600+', 'Apollo 500', 'PrimeTest 350', 'PrimeTest 250+', 'Supernova Elite'],
  'TIS': ['MFT1552', 'MFT1540', 'MFT1532'],
  'Socket & See': ['SOK50', 'SOK40', 'SOK32', 'DLMPRO'],
  'Di-Log': ['DL9118', 'DL9110', 'DL9109', 'CombiVolt 2'],
  'Chauvin Arnoux': ['C.A 6117', 'C.A 6116N', 'C.A 6113'],
};

const getInstrumentLabel = (type: string) => {
  const found = INSTRUMENT_TYPES.find(t => t.value === type);
  return found?.label || type;
};

const generateId = () => `inst_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const TestingInstrumentsCard: React.FC<TestingInstrumentsCardProps> = ({
  companyProfile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [instruments, setInstruments] = useState<TestingInstrument[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpen = () => {
    setInstruments(companyProfile?.testing_instruments || []);
    setEditingIndex(null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const success = await onSave({
      testing_instruments: instruments,
    });

    setIsSaving(false);

    if (success) {
      setShowSuccess(true);
      toast.success('Testing instruments saved');
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 400);
    }
  };

  const addInstrument = () => {
    const newInstrument: TestingInstrument = {
      id: generateId(),
      instrument_type: 'multifunction',
      make: '',
      model: '',
      serial_number: '',
      calibration_date: '',
    };
    setInstruments([...instruments, newInstrument]);
    setEditingIndex(instruments.length);
  };

  const updateInstrument = (index: number, updates: Partial<TestingInstrument>) => {
    const updated = [...instruments];
    updated[index] = { ...updated[index], ...updates };
    setInstruments(updated);
  };

  const removeInstrument = (index: number) => {
    const updated = instruments.filter((_, i) => i !== index);
    setInstruments(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const savedInstruments = companyProfile?.testing_instruments || [];
  const primaryInstrument = savedInstruments[0];

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
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="font-semibold text-[15px] text-white">Testing Instruments</span>
          </div>
          <div className="flex items-center gap-2">
            {savedInstruments.length > 0 && (
              <span className="text-[13px] text-white/50 bg-white/[0.06] px-2 py-0.5 rounded-full">
                {savedInstruments.length}
              </span>
            )}
            <ChevronRight className="h-5 w-5 text-white/30" />
          </div>
        </button>

        <div className="border-t border-white/[0.06]">
          {savedInstruments.length === 0 ? (
            <div className="px-4 py-4 text-center">
              <p className="text-[13px] text-white/40">
                No testing instruments configured
              </p>
              <p className="text-[12px] text-white/30 mt-1">
                Add your testers to autofill certificates
              </p>
            </div>
          ) : (
            <>
              {/* Primary Instrument */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Wrench className="h-4 w-4 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">
                    {getInstrumentLabel(primaryInstrument.instrument_type)}
                  </p>
                  <p className="text-[15px] text-white truncate">
                    {primaryInstrument.make} {primaryInstrument.model}
                  </p>
                </div>
              </div>

              {/* Serial & Calibration */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04]">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <Hash className="h-4 w-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Serial Number</p>
                  <p className="text-[15px] text-white">
                    {primaryInstrument.serial_number || 'Not set'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[11px] font-medium text-white/50 uppercase tracking-wide">Calibration Date</p>
                  <p className="text-[15px] text-white">
                    {primaryInstrument.calibration_date
                      ? new Date(primaryInstrument.calibration_date).toLocaleDateString('en-GB')
                      : 'Not set'}
                  </p>
                </div>
              </div>

              {savedInstruments.length > 1 && (
                <div className="px-4 py-2 bg-white/[0.02]">
                  <p className="text-[12px] text-white/40 text-center">
                    +{savedInstruments.length - 1} more instrument{savedInstruments.length > 2 ? 's' : ''}
                  </p>
                </div>
              )}
            </>
          )}
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
            <h2 className="text-[17px] font-semibold text-white">Testing Instruments</h2>
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

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 pb-8">
            <p className="text-[13px] text-white/50 px-1">
              Add your testing instruments. The first instrument will be used to autofill EICR, EIC, and Minor Works certificates.
            </p>

            <AnimatePresence mode="popLayout">
              {instruments.map((instrument, index) => (
                <motion.div
                  key={instrument.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                    className="w-full flex items-center justify-between px-4 py-3 active:bg-white/[0.02] touch-manipulation"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-orange-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-[15px] font-medium text-white">
                          {instrument.make && instrument.model
                            ? `${instrument.make} ${instrument.model}`
                            : 'New Instrument'}
                        </p>
                        <p className="text-[12px] text-white/50">
                          {getInstrumentLabel(instrument.instrument_type)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <span className="text-[10px] uppercase font-semibold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                      <ChevronRight className={`h-5 w-5 text-white/30 transition-transform ${editingIndex === index ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {editingIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-4 border-t border-white/[0.06] pt-4">
                          {/* Instrument Type */}
                          <div className="space-y-2">
                            <Label className="text-[12px] font-medium text-white/50 uppercase tracking-wide">
                              Instrument Type
                            </Label>
                            <Select
                              value={instrument.instrument_type}
                              onValueChange={(value) => updateInstrument(index, { instrument_type: value as TestingInstrument['instrument_type'] })}
                            >
                              <SelectTrigger className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 touch-manipulation text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-[#2c2c2e] border-white/[0.1] rounded-xl">
                                {INSTRUMENT_TYPES.map((type) => (
                                  <SelectItem key={type.value} value={type.value} className="text-white">
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Make */}
                          <div className="space-y-2">
                            <Label className="text-[12px] font-medium text-white/50 uppercase tracking-wide">
                              Make
                            </Label>
                            <Select
                              value={instrument.make || ''}
                              onValueChange={(value) => {
                                updateInstrument(index, { make: value, model: '' });
                              }}
                            >
                              <SelectTrigger className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 touch-manipulation text-white">
                                <SelectValue placeholder="Select manufacturer..." />
                              </SelectTrigger>
                              <SelectContent className="bg-[#2c2c2e] border-white/[0.1] rounded-xl max-h-[300px]">
                                {COMMON_MAKES.map((make) => (
                                  <SelectItem key={make} value={make} className="text-white">
                                    {make}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Model */}
                          <div className="space-y-2">
                            <Label className="text-[12px] font-medium text-white/50 uppercase tracking-wide">
                              Model
                            </Label>
                            {instrument.make && instrument.make !== 'Other' && COMMON_MODELS[instrument.make] ? (
                              <Select
                                value={instrument.model || ''}
                                onValueChange={(value) => updateInstrument(index, { model: value })}
                              >
                                <SelectTrigger className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 touch-manipulation text-white">
                                  <SelectValue placeholder="Select model..." />
                                </SelectTrigger>
                                <SelectContent className="bg-[#2c2c2e] border-white/[0.1] rounded-xl max-h-[300px]">
                                  {COMMON_MODELS[instrument.make].map((model) => (
                                    <SelectItem key={model} value={model} className="text-white">
                                      {model}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="other_model" className="text-white/50 italic">
                                    Other (type manually)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                placeholder="Enter model number"
                                value={instrument.model}
                                onChange={(e) => updateInstrument(index, { model: e.target.value })}
                                className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                              />
                            )}
                            {instrument.model === 'other_model' && (
                              <Input
                                placeholder="Enter model number"
                                value={''}
                                onChange={(e) => updateInstrument(index, { model: e.target.value })}
                                className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white mt-2"
                                autoFocus
                              />
                            )}
                          </div>

                          {/* Serial Number */}
                          <div className="space-y-2">
                            <Label className="text-[12px] font-medium text-white/50 uppercase tracking-wide">
                              Serial Number
                            </Label>
                            <Input
                              placeholder="Enter serial number"
                              value={instrument.serial_number}
                              onChange={(e) => updateInstrument(index, { serial_number: e.target.value })}
                              className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 placeholder:text-white/30 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white"
                            />
                          </div>

                          {/* Calibration Date */}
                          <div className="space-y-2">
                            <Label className="text-[12px] font-medium text-white/50 uppercase tracking-wide">
                              Calibration Date
                            </Label>
                            <Input
                              type="date"
                              value={instrument.calibration_date}
                              onChange={(e) => updateInstrument(index, { calibration_date: e.target.value })}
                              className="h-[50px] text-[16px] bg-white/[0.06] border-white/[0.08] rounded-xl px-4 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-0 touch-manipulation text-white [color-scheme:dark]"
                            />
                          </div>

                          {/* Delete Button */}
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeInstrument(index)}
                            className="w-full flex items-center justify-center gap-2 h-[44px] rounded-xl bg-red-500/10 text-red-400 text-[15px] font-medium active:bg-red-500/20 touch-manipulation mt-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove Instrument
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add Instrument Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={addInstrument}
              className="w-full flex items-center justify-center gap-2 h-[50px] rounded-xl border-2 border-dashed border-white/[0.15] text-white/60 text-[15px] font-medium active:bg-white/[0.04] touch-manipulation"
            >
              <Plus className="h-5 w-5" />
              Add Instrument
            </motion.button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TestingInstrumentsCard;
