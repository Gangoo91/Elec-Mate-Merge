import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TestInstrumentInfoProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

// Common electrical test instruments used in the UK
const commonTestInstruments = [
  { value: 'Fluke 1664 FC', label: 'Fluke 1664 FC - Multifunction Installer Tester' },
  { value: 'Fluke 1663', label: 'Fluke 1663 - Multifunction Installation Tester' },
  { value: 'Fluke 1662', label: 'Fluke 1662 - Multifunction Installation Tester' },
  { value: 'Megger MFT-X1', label: 'Megger MFT-X1 - Advanced Multifunction Tester' },
  { value: 'Megger MFT1835', label: 'Megger MFT1835 - Multifunction Installation Tester' },
  { value: 'Megger MFT1825', label: 'Megger MFT1825 - Multifunction Installation Tester' },
  { value: 'Megger MFT1741', label: 'Megger MFT1741 - Multifunction Tester' },
  { value: 'Megger MFT1730', label: 'Megger MFT1730 - Multifunction Tester' },
  { value: 'Megger MFT1720', label: 'Megger MFT1720 - Multifunction Tester' },
  { value: 'Kewtech KT66DL', label: 'Kewtech KT66DL - 12-in-1 Multifunction Tester' },
  { value: 'Kewtech KT65DL', label: 'Kewtech KT65DL - Multifunction Tester' },
  { value: 'Kewtech KT64DL', label: 'Kewtech KT64DL - Digital Multifunction Tester' },
  { value: 'Martindale VI13700', label: 'Martindale VI13700 - 18th Edition Tester' },
  { value: 'Socket & See SOK50', label: 'Socket & See SOK50 - Socket Tester' },
  { value: 'Metrel MI3155', label: 'Metrel MI3155 EurotestXD - Advanced Multifunction Tester' },
  { value: 'Metrel MI3102H', label: 'Metrel MI3102H - EurotestXE' },
  { value: 'Robin KMP450', label: 'Robin KMP450 - Multifunction Tester' },
  { value: 'Seaward Supernova', label: 'Seaward Supernova - Multifunction Tester' },
  { value: 'TIS MFT1552', label: 'TIS MFT1552 - Multifunction Tester' },
  { value: 'Other', label: 'Other (Manual Entry)' }
];

const RECENT_INSTRUMENTS_KEY = 'recent-test-instruments';

const TestInstrumentInfo = ({ formData, onUpdate }: TestInstrumentInfoProps) => {
  const [recentInstruments, setRecentInstruments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load recent instruments on mount
  useEffect(() => {
    const loadInstruments = async () => {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        const instruments = await offlineStorage.getRecentInstruments();
        setRecentInstruments(instruments);
      } catch (e) {
        console.error('Failed to load recent instruments', e);
      }
    };
    loadInstruments();
  }, []);

  // Auto-fill serial and calibration when instrument is selected and fields are empty
  const loadInstrumentDetails = async (make: string) => {
    if (!make || make === 'Other') return;
    try {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const details = await offlineStorage.getInstrumentDetails(make);
      if (details) {
        // Only auto-fill if the fields are currently empty
        if (!formData.testInstrumentSerial && details.serialNumber) {
          onUpdate('testInstrumentSerial', details.serialNumber);
        }
        if (!formData.calibrationDate && details.calibrationDate) {
          onUpdate('calibrationDate', details.calibrationDate);
        }
      }
    } catch (e) {
      console.error('Failed to load instrument details', e);
    }
  };

  // Save instrument details when serial or calibration changes
  const saveInstrumentDetails = async () => {
    const make = formData.testInstrumentMake;
    if (!make || make === 'Other') return;

    const serial = formData.testInstrumentSerial;
    const calibration = formData.calibrationDate;

    // Only save if we have at least a serial number
    if (serial) {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        await offlineStorage.saveInstrumentDetails(make, {
          serialNumber: serial,
          calibrationDate: calibration || ''
        });
      } catch (e) {
        console.error('Failed to save instrument details', e);
      }
    }
  };

  // Save details when serial or calibration changes (debounced effect)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveInstrumentDetails();
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.testInstrumentSerial, formData.calibrationDate, formData.testInstrumentMake]);

  // Save instrument to recent list
  const saveToRecent = async (instrument: string) => {
    if (!instrument || instrument === 'Other') return;

    const updated = [
      instrument,
      ...recentInstruments.filter(i => i !== instrument)
    ].slice(0, 3); // Keep only last 3

    setRecentInstruments(updated);
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.saveRecentInstrument(instrument);
  };

  // Filter instruments based on search
  const filteredInstruments = searchTerm
    ? commonTestInstruments.filter(inst =>
        inst.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : commonTestInstruments;
  const isOtherSelected = formData.testInstrumentMake === 'Other';

  const handleInstrumentChange = (value: string) => {
    onUpdate('testInstrumentMake', value);
    // Clear the custom value if switching away from 'Other'
    if (value !== 'Other' && formData.customTestInstrument) {
      onUpdate('customTestInstrument', '');
    }
  };

  return (
    <div className="space-y-4">
      {/* Instrument Selection - Full Width */}
      <div className="space-y-2">
        <Label htmlFor="testInstrumentMake" className="text-xs font-medium text-white/70 uppercase tracking-wide">
          Test Instrument
        </Label>
        {!isOtherSelected ? (
          <Select
            value={formData.testInstrumentMake || ""}
            onValueChange={(value) => {
              onUpdate("testInstrumentMake", value);
              saveToRecent(value);
              loadInstrumentDetails(value); // Auto-fill serial & calibration
              setSearchTerm('');
            }}
          >
            <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white focus:border-elec-yellow/50">
              <SelectValue placeholder="Select test instrument..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50 max-h-[300px] overflow-y-auto">
              {recentInstruments.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow/80">
                    Recently Used
                  </div>
                  {recentInstruments.map((instrument) => (
                    <SelectItem key={`recent-${instrument}`} value={instrument}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-elec-yellow">⏱</span>
                        {instrument}
                      </div>
                    </SelectItem>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                </>
              )}
              <div className="px-2 py-1.5 text-xs font-semibold text-white/50">
                All Instruments
              </div>
              {filteredInstruments.map((instrument) => (
                <SelectItem key={instrument.value} value={instrument.value}>
                  {instrument.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="space-y-2">
            <Input
              className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
              placeholder="Enter make/model"
              value={formData.customTestInstrument || ''}
              onChange={(e) => onUpdate('customTestInstrument', e.target.value)}
              autoComplete="test-equipment"
              list="instrument-suggestions"
            />
            <datalist id="instrument-suggestions">
              {commonTestInstruments.map((instrument) => (
                <option key={instrument.value} value={instrument.value} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={() => handleInstrumentChange('')}
              className="text-xs text-elec-yellow hover:text-elec-yellow/80 underline"
            >
              Back to dropdown selection
            </button>
          </div>
        )}
      </div>

      {/* Three Column Grid for Remaining Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-2">
          <Label htmlFor="testInstrumentSerial" className="text-xs font-medium text-white/70 uppercase tracking-wide">
            Serial No.
          </Label>
          <Input
            id="testInstrumentSerial"
            value={formData.testInstrumentSerial || ''}
            onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)}
            placeholder="Serial number"
            className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calibrationDate" className="text-xs font-medium text-white/70 uppercase tracking-wide">
            Calibration
          </Label>
          <Input
            id="calibrationDate"
            type="date"
            value={formData.calibrationDate || ''}
            onChange={(e) => onUpdate('calibrationDate', e.target.value)}
            className="h-11 bg-white/5 border-white/10 text-white focus:border-elec-yellow/50 [color-scheme:dark]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="testTemperature" className="text-xs font-medium text-white/70 uppercase tracking-wide">
            Temperature
          </Label>
          <div className="relative">
            <Input
              id="testTemperature"
              value={formData.testTemperature || ''}
              onChange={(e) => onUpdate('testTemperature', e.target.value)}
              placeholder="20"
              className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-elec-yellow/50 pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstrumentInfo;
