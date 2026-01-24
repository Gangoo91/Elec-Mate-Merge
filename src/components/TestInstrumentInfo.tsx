import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { cn } from '@/lib/utils';
import { User, Check } from 'lucide-react';
import { toast } from 'sonner';

interface TestInstrumentInfoProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

// Common electrical test instruments used in the UK
const commonTestInstruments = [
  // Fluke
  { value: 'Fluke 1664 FC', label: 'Fluke 1664 FC - Multifunction Installer Tester' },
  { value: 'Fluke 1663', label: 'Fluke 1663 - Multifunction Installation Tester' },
  { value: 'Fluke 1662', label: 'Fluke 1662 - Multifunction Installation Tester' },
  { value: 'Fluke 1653B', label: 'Fluke 1653B - Installation Tester' },
  { value: 'Fluke 1652C', label: 'Fluke 1652C - Installation Tester' },
  { value: 'Fluke T6-1000', label: 'Fluke T6-1000 - Electrical Tester' },
  { value: 'Fluke 117', label: 'Fluke 117 - Digital Multimeter' },
  { value: 'Fluke 376 FC', label: 'Fluke 376 FC - Clamp Meter' },
  // Megger
  { value: 'Megger MFT-X1', label: 'Megger MFT-X1 - Advanced Multifunction Tester' },
  { value: 'Megger MFT1845', label: 'Megger MFT1845 - Multifunction Installation Tester' },
  { value: 'Megger MFT1835', label: 'Megger MFT1835 - Multifunction Installation Tester' },
  { value: 'Megger MFT1825', label: 'Megger MFT1825 - Multifunction Installation Tester' },
  { value: 'Megger MFT1741', label: 'Megger MFT1741 - Multifunction Tester' },
  { value: 'Megger MFT1730', label: 'Megger MFT1730 - Multifunction Tester' },
  { value: 'Megger MFT1720', label: 'Megger MFT1720 - Multifunction Tester' },
  { value: 'Megger MIT430', label: 'Megger MIT430 - Insulation Tester' },
  { value: 'Megger MIT420', label: 'Megger MIT420 - Insulation Tester' },
  { value: 'Megger PAT450', label: 'Megger PAT450 - PAT Tester' },
  { value: 'Megger PAT420', label: 'Megger PAT420 - PAT Tester' },
  { value: 'Megger DET4TCR2', label: 'Megger DET4TCR2 - Earth Tester' },
  { value: 'Megger DET4TD2', label: 'Megger DET4TD2 - Earth Tester' },
  // Kewtech
  { value: 'Kewtech KT66DL', label: 'Kewtech KT66DL - 12-in-1 Multifunction Tester' },
  { value: 'Kewtech KT65DL', label: 'Kewtech KT65DL - Multifunction Tester' },
  { value: 'Kewtech KT64DL', label: 'Kewtech KT64DL - Digital Multifunction Tester' },
  { value: 'Kewtech KT63DL', label: 'Kewtech KT63DL - Multifunction Tester' },
  { value: 'Kewtech KT62', label: 'Kewtech KT62 - Multifunction Tester' },
  { value: 'Kewtech SMARTPAT', label: 'Kewtech SMARTPAT - PAT Tester' },
  { value: 'Kewtech LOOPCHECK', label: 'Kewtech LOOPCHECK - Loop/Socket Tester' },
  { value: 'Kewtech KEWPROVE 3', label: 'Kewtech KEWPROVE 3 - Proving Unit' },
  // Martindale
  { value: 'Martindale ET4500', label: 'Martindale ET4500 - Multifunction Tester' },
  { value: 'Martindale ET4000', label: 'Martindale ET4000 - Multifunction Tester' },
  { value: 'Martindale VI13700', label: 'Martindale VI13700 - 18th Edition Tester' },
  { value: 'Martindale VI13800', label: 'Martindale VI13800 - Voltage Indicator' },
  { value: 'Martindale EPAT1600', label: 'Martindale EPAT1600 - PAT Tester' },
  { value: 'Martindale EZ165', label: 'Martindale EZ165 - Socket Tester' },
  // Metrel
  { value: 'Metrel MI3155', label: 'Metrel MI3155 EurotestXD - Multifunction Tester' },
  { value: 'Metrel MI3152', label: 'Metrel MI3152 - Multifunction Tester' },
  { value: 'Metrel MI3125BT', label: 'Metrel MI3125BT - Insulation Tester' },
  { value: 'Metrel MI3102H', label: 'Metrel MI3102H - EurotestXE' },
  { value: 'Metrel MI3360', label: 'Metrel MI3360 - PAT Tester' },
  // Others
  { value: 'Robin KMP7250', label: 'Robin KMP7250 - Multifunction Tester' },
  { value: 'Robin KMP6250', label: 'Robin KMP6250 - Multifunction Tester' },
  { value: 'Robin KMP450', label: 'Robin KMP450 - Multifunction Tester' },
  { value: 'Seaward Apollo 600+', label: 'Seaward Apollo 600+ - PAT Tester' },
  { value: 'Seaward PrimeTest 350', label: 'Seaward PrimeTest 350 - PAT Tester' },
  { value: 'Seaward Supernova Elite', label: 'Seaward Supernova Elite - Multifunction Tester' },
  { value: 'TIS MFT1552', label: 'TIS MFT1552 - Multifunction Tester' },
  { value: 'TIS MFT1540', label: 'TIS MFT1540 - Multifunction Tester' },
  { value: 'Socket & See SOK50', label: 'Socket & See SOK50 - Socket Tester' },
  { value: 'Socket & See SOK40', label: 'Socket & See SOK40 - Socket Tester' },
  { value: 'Socket & See DLMPRO', label: 'Socket & See DLMPRO - Loop Tester' },
  { value: 'Di-Log DL9118', label: 'Di-Log DL9118 - Multifunction Tester' },
  { value: 'Di-Log DL9110', label: 'Di-Log DL9110 - Multifunction Tester' },
  { value: 'Di-Log CombiVolt 2', label: 'Di-Log CombiVolt 2 - Voltage Indicator' },
  { value: 'Chauvin Arnoux C.A 6117', label: 'Chauvin Arnoux C.A 6117 - Multifunction Tester' },
  { value: 'Chauvin Arnoux C.A 6116N', label: 'Chauvin Arnoux C.A 6116N - Multifunction Tester' },
  { value: 'Other', label: 'Other (Manual Entry)' }
];

const RECENT_INSTRUMENTS_KEY = 'recent-test-instruments';

const TestInstrumentInfo = ({ formData, onUpdate }: TestInstrumentInfoProps) => {
  const isMobile = useIsMobile();
  const [recentInstruments, setRecentInstruments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { companyProfile } = useCompanyProfile();
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  // Get primary testing instrument from profile
  const profileInstrument = companyProfile?.testing_instruments?.[0];

  // Autofill from profile when form loads and fields are empty
  const handleAutoFillFromProfile = () => {
    if (!profileInstrument) return;

    const instrumentMake = `${profileInstrument.make} ${profileInstrument.model}`.trim();
    const makeNorm = profileInstrument.make?.toLowerCase() || '';
    const modelNorm = profileInstrument.model?.toLowerCase() || '';

    // Find exact or close matching option
    const matchingOption = commonTestInstruments.find(inst => {
      if (inst.value === 'Other') return false;
      const valueNorm = inst.value.toLowerCase();
      // Exact match: "Megger MFT-X1" matches profile make="Megger" model="MFT-X1"
      if (valueNorm === instrumentMake.toLowerCase()) return true;
      // Contains both make and model
      if (makeNorm && modelNorm && valueNorm.includes(makeNorm) && valueNorm.includes(modelNorm)) return true;
      // Contains exact model (for unique models like "MFT-X1", "1664 FC")
      if (modelNorm && modelNorm.length >= 4 && valueNorm.includes(modelNorm)) return true;
      return false;
    });

    if (matchingOption) {
      onUpdate('testInstrumentMake', matchingOption.value);
    } else {
      onUpdate('testInstrumentMake', 'Other');
      onUpdate('customTestInstrument', instrumentMake);
    }

    if (profileInstrument.serial_number) {
      onUpdate('testInstrumentSerial', profileInstrument.serial_number);
    }

    if (profileInstrument.calibration_date) {
      onUpdate('calibrationDate', profileInstrument.calibration_date);
    }

    setHasAutoFilled(true);
    toast.success('Test instrument details loaded from profile');
  };

  // Auto-fill on mount if fields are empty and profile has data
  useEffect(() => {
    if (
      profileInstrument &&
      !formData.testInstrumentMake &&
      !formData.testInstrumentSerial &&
      !hasAutoFilled
    ) {
      handleAutoFillFromProfile();
    }
  }, [profileInstrument, formData.testInstrumentMake, formData.testInstrumentSerial, hasAutoFilled]);

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
    <div className={cn(
      "space-y-4",
      isMobile ? "px-4 py-4" : ""
    )}>
      {/* Profile Banner - Both Mobile & Desktop */}
      {profileInstrument && (
        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 min-w-0">
            <User className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm text-blue-300 truncate">
              {profileInstrument.make} {profileInstrument.model}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoFillFromProfile}
            className="h-8 px-3 text-xs bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 flex-shrink-0"
          >
            {hasAutoFilled ? (
              <>
                <Check className="h-3 w-3 mr-1.5" />
                Loaded
              </>
            ) : (
              <>
                <User className="h-3 w-3 mr-1.5" />
                Use Profile
              </>
            )}
          </Button>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-3">
        {/* Test Instrument - Full Width */}
        <div className="space-y-1.5">
          <Label htmlFor="testInstrumentMake" className="text-xs font-medium text-foreground/70">Test Instrument</Label>
          {!isOtherSelected ? (
            <MobileSelectPicker
              value={formData.testInstrumentMake || ""}
              onValueChange={(value) => {
                onUpdate("testInstrumentMake", value);
                saveToRecent(value);
                loadInstrumentDetails(value);
                setSearchTerm('');
              }}
              options={[
                ...recentInstruments.map((instrument) => ({
                  value: instrument,
                  label: `⏱️ ${instrument}`,
                })),
                ...filteredInstruments.map((instrument) => ({
                  value: instrument.value,
                  label: instrument.label,
                })),
              ]}
              placeholder="Select test instrument..."
              title="Test Instrument"
            />
          ) : (
            <div className="space-y-2">
              <Input
                className="h-10 text-sm touch-manipulation bg-card/50 border-border/30"
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
                className="text-xs text-elec-yellow hover:text-elec-yellow/80 underline touch-manipulation"
              >
                Back to dropdown
              </button>
            </div>
          )}
        </div>

        {/* Serial Number - Full Width */}
        <div className="space-y-1.5">
          <Label htmlFor="testInstrumentSerial" className="text-xs font-medium text-foreground/70">Serial Number</Label>
          <Input
            id="testInstrumentSerial"
            value={formData.testInstrumentSerial || ''}
            onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)}
            placeholder="Enter serial number"
            className="h-10 text-sm touch-manipulation bg-card/50 border-border/30"
          />
        </div>

        {/* Calibration & Temperature - 2 Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="calibrationDate" className="text-xs font-medium text-foreground/70">Calibration Date</Label>
            <Input
              id="calibrationDate"
              type="date"
              value={formData.calibrationDate || ''}
              onChange={(e) => onUpdate('calibrationDate', e.target.value)}
              className="h-10 text-sm touch-manipulation bg-card/50 border-border/30"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="testTemperature" className="text-xs font-medium text-foreground/70">Temperature (°C)</Label>
            <Input
              id="testTemperature"
              value={formData.testTemperature || ''}
              onChange={(e) => onUpdate('testTemperature', e.target.value)}
              placeholder="20°C"
              className="h-10 text-sm touch-manipulation bg-card/50 border-border/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstrumentInfo;
