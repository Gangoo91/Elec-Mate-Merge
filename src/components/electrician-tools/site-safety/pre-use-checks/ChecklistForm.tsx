import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SignaturePad } from '../common/SignaturePad';
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  Sparkles,
  ArrowLeft,
  Loader2,
  Wrench,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';
import {
  useCreatePreUseCheck,
  REGULATION_REFS,
  getStatutoryInspectionStatus,
  type CheckItem,
} from '@/hooks/usePreUseChecks';
import { useSafetyEquipment, type SafetyEquipment } from '@/hooks/useSafetyEquipment';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';

// Map pre-use check equipment types to equipment register categories
const CHECK_TYPE_TO_CATEGORIES: Record<string, string[]> = {
  ladder: ['ladders'],
  scaffold: ['other'],
  power_tool: ['power-tools'],
  test_instrument: ['test-equipment', 'pat-tester'],
  access_equipment: ['other'],
};

interface ChecklistFormProps {
  equipmentType: string;
  items: CheckItem[];
  onSubmit: () => void;
  onCancel: () => void;
}

type CheckResult = 'pass' | 'fail' | 'na';

export function ChecklistForm({
  equipmentType,
  items: initialItems,
  onSubmit,
  onCancel,
}: ChecklistFormProps) {
  const [items, setItems] = useState<CheckItem[]>(initialItems);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [inspectorSigName, setInspectorSigName] = useState('');
  const [inspectorSigDate, setInspectorSigDate] = useState(new Date().toISOString().split('T')[0]);
  const [inspectorSigData, setInspectorSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const createCheck = useCreatePreUseCheck();

  // Equipment register integration
  const { equipment = [] } = useSafetyEquipment();
  const matchingCategories = CHECK_TYPE_TO_CATEGORIES[equipmentType] || [];
  const matchingEquipment = useMemo(
    () => equipment.filter((e: SafetyEquipment) => matchingCategories.includes(e.category)),
    [equipment, matchingCategories]
  );

  const selectEquipment = (eq: SafetyEquipment) => {
    setSelectedEquipmentId(eq.id);
    const desc = [eq.name, eq.serial_number ? `S/N: ${eq.serial_number}` : '']
      .filter(Boolean)
      .join(', ');
    setEquipmentDescription(desc);
  };

  const clearEquipmentSelection = () => {
    setSelectedEquipmentId(null);
    setEquipmentDescription('');
  };

  const updateItemResult = (id: string, result: CheckResult) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, result } : item)));
  };

  const handleAllPass = () => {
    setItems((prev) => prev.map((item) => ({ ...item, result: 'pass' as const })));
  };

  const computeOverallResult = (): CheckResult => {
    if (items.some((i) => i.result === 'fail')) return 'fail';
    if (items.every((i) => i.result === 'pass' || i.result === 'na')) return 'pass';
    return 'na';
  };

  const allAnswered = items.every(
    (i) => i.result !== 'na' || items.every((j) => j.result === 'na') === false
  );
  const hasAtLeastOneResult = items.some((i) => i.result === 'pass' || i.result === 'fail');

  const handleSubmit = async () => {
    await createCheck.mutateAsync({
      equipment_type: equipmentType,
      equipment_id: selectedEquipmentId || undefined,
      equipment_description: equipmentDescription || undefined,
      site_address: siteAddress || undefined,
      items,
      overall_result: computeOverallResult(),
      photos: photoUrls,
      checked_by: inspectorSigName.trim() || undefined,
      signature: inspectorSigData || undefined,
    });
    setPhotoUrls([]);
    onSubmit();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={onCancel}
          className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-lg font-semibold text-white capitalize">
          {equipmentType.replace(/_/g, ' ')} Check
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        {/* Regulation reference banner */}
        {REGULATION_REFS[equipmentType] && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-3 flex items-start gap-3">
            <BookOpen className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-blue-400">
                {REGULATION_REFS[equipmentType].shortName}
              </p>
              <p className="text-xs text-white mt-0.5 leading-relaxed">
                {REGULATION_REFS[equipmentType].description}
              </p>
            </div>
          </div>
        )}

        {/* Statutory inspection warning for linked equipment */}
        {selectedEquipmentId &&
          (() => {
            const linked = matchingEquipment.find(
              (e: SafetyEquipment) => e.id === selectedEquipmentId
            );
            if (!linked) return null;
            const inspectionStatus = getStatutoryInspectionStatus(
              equipmentType,
              linked.last_inspection
            );
            if (!inspectionStatus || inspectionStatus.status === 'ok') return null;
            return (
              <div
                className={`rounded-xl border p-3 flex items-start gap-3 ${
                  inspectionStatus.status === 'overdue'
                    ? 'border-red-500/30 bg-red-500/10'
                    : inspectionStatus.status === 'due_soon'
                      ? 'border-amber-500/30 bg-amber-500/10'
                      : 'border-white/10 bg-white/5'
                }`}
              >
                <AlertTriangle
                  className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                    inspectionStatus.status === 'overdue'
                      ? 'text-red-400'
                      : inspectionStatus.status === 'due_soon'
                        ? 'text-amber-400'
                        : 'text-white'
                  }`}
                />
                <p
                  className={`text-xs font-medium ${
                    inspectionStatus.status === 'overdue'
                      ? 'text-red-400'
                      : inspectionStatus.status === 'due_soon'
                        ? 'text-amber-400'
                        : 'text-white'
                  }`}
                >
                  {inspectionStatus.label}
                </p>
              </div>
            );
          })()}

        {/* All Pass Shortcut */}
        <button
          onClick={handleAllPass}
          className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 font-semibold text-sm touch-manipulation active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          All Pass
        </button>

        {/* Equipment Register Picker */}
        {matchingEquipment.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-elec-yellow" />
              Select from Equipment Register
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchingEquipment.map((eq: SafetyEquipment) => (
                <button
                  key={eq.id}
                  onClick={() =>
                    selectedEquipmentId === eq.id ? clearEquipmentSelection() : selectEquipment(eq)
                  }
                  className={`h-11 px-3 rounded-xl text-sm font-medium flex items-center gap-2 touch-manipulation active:scale-[0.97] transition-all ${
                    selectedEquipmentId === eq.id
                      ? 'bg-elec-yellow/20 border border-elec-yellow/50 text-elec-yellow'
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[180px]">{eq.name}</span>
                  {eq.serial_number && (
                    <Badge className="text-[10px] px-1.5 py-0 bg-white/10 text-white border-white/20">
                      {eq.serial_number}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
            {selectedEquipmentId && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Linked to equipment register
              </p>
            )}
          </div>
        )}

        {/* Optional Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Equipment Description{' '}
              {matchingEquipment.length > 0 ? '(auto-filled or manual)' : '(optional)'}
            </label>
            <Input
              value={equipmentDescription}
              onChange={(e) => {
                setEquipmentDescription(e.target.value);
                if (selectedEquipmentId) setSelectedEquipmentId(null);
              }}
              placeholder="e.g. Fluke 1664 FC, serial #12345"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <LocationAutoFill
            value={siteAddress}
            onChange={setSiteAddress}
            placeholder="e.g. 14 King Street, London"
            label="Site Address (optional)"
          />
        </div>

        {/* Checklist Items */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">Inspection Items</h3>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="flex-1 text-sm text-white">{item.label}</span>
              <div className="flex items-center gap-1">
                {/* Pass */}
                <button
                  onClick={() => updateItemResult(item.id, 'pass')}
                  className={`h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:scale-90 transition-all ${
                    item.result === 'pass'
                      ? 'bg-green-500/20 border border-green-500/50'
                      : 'bg-white/5 border border-white/10'
                  }`}
                  aria-label={`Mark ${item.label} as pass`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      item.result === 'pass' ? 'text-green-400' : 'text-white'
                    }`}
                  />
                </button>
                {/* Fail */}
                <button
                  onClick={() => updateItemResult(item.id, 'fail')}
                  className={`h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:scale-90 transition-all ${
                    item.result === 'fail'
                      ? 'bg-red-500/20 border border-red-500/50'
                      : 'bg-white/5 border border-white/10'
                  }`}
                  aria-label={`Mark ${item.label} as fail`}
                >
                  <XCircle
                    className={`w-5 h-5 ${item.result === 'fail' ? 'text-red-400' : 'text-white'}`}
                  />
                </button>
                {/* N/A */}
                <button
                  onClick={() => updateItemResult(item.id, 'na')}
                  className={`h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:scale-90 transition-all ${
                    item.result === 'na'
                      ? 'bg-white/15 border border-white/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                  aria-label={`Mark ${item.label} as not applicable`}
                >
                  <MinusCircle
                    className={`w-5 h-5 ${item.result === 'na' ? 'text-white' : 'text-white'}`}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Evidence Photos */}
        <SafetyPhotoCapture
          photos={photoUrls}
          onPhotosChange={setPhotoUrls}
          label="Evidence Photos"
        />

        {/* Inspector Signature */}
        <SignaturePad
          label="Inspector Signature"
          name={inspectorSigName}
          date={inspectorSigDate}
          signatureDataUrl={inspectorSigData}
          onSignatureChange={setInspectorSigData}
          onNameChange={setInspectorSigName}
          onDateChange={setInspectorSigDate}
        />

        {/* Spacer for fixed footer */}
        <div className="pb-20" />
      </div>

      {/* Fixed footer */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          onClick={handleSubmit}
          disabled={!hasAtLeastOneResult || createCheck.isPending}
          className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-base touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {createCheck.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            'Submit Check'
          )}
        </button>
      </div>
    </div>
  );
}

export default ChecklistForm;
