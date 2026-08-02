import React from 'react';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';
import InspectionStatsSummary from './InspectionStatsSummary';
import InspectionChecklistCard from './InspectionChecklistCard';
import DefectCodesReference from './DefectCodesReference';
import DefectObservationsSection from './DefectObservationsSection';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { useEICRForm } from './eicr/EICRFormProvider';
import { useHaptic } from '@/hooks/useHaptic';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useSignatureProfiles } from '@/hooks/useSignatureProfiles';
import { toast } from 'sonner';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome:
    | 'satisfactory'
    | 'C1'
    | 'C2'
    | 'C3'
    | 'FI'
    | 'not-applicable'
    | 'not-verified'
    | 'limitation'
    | '';
  notes?: string;
}

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface EICRInspectionChecklistProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onNavigateToObservations?: () => void;
}

const EICRInspectionChecklist = ({
  formData,
  onUpdate,
  onNavigateToObservations,
}: EICRInspectionChecklistProps) => {
  const { databaseId, effectiveReportId } = useEICRForm();
  const haptic = useHaptic();

  // "Use my details" — one-tap fill of the Inspected by attestation from the
  // saved inspector profile / default signature. Deliberate tap, never an
  // auto-effect: certs must not sign themselves.
  const { profiles: inspectorProfiles, getDefaultProfile } = useInspectorProfiles();
  const { signatures: savedSignatures, getDefaultSignature } = useSignatureProfiles();
  const handlePrefillInspectedBy = () => {
    // Source chain: this cert's Sign off name → default profile → any profile.
    const profile = getDefaultProfile() || inspectorProfiles[0] || null;
    const name = (formData.inspectorName || profile?.name || '').toUpperCase();
    const signature =
      getDefaultSignature()?.signatureData ||
      savedSignatures[0]?.signatureData ||
      profile?.signatureData ||
      formData.inspectorSignature ||
      '';
    onUpdate('scheduleInspectedByDate', new Date().toISOString().split('T')[0]);
    if (name) onUpdate('scheduleInspectedByName', name);
    if (signature) onUpdate('scheduleInspectedBySignature', signature);
    if (name || signature) {
      haptic.success();
    } else {
      // Never a dead tap — say exactly where the details come from.
      haptic.warning();
      toast.info('No saved details yet', {
        description:
          'Add your name on the Sign off step, or save an inspector profile — then this fills in one tap.',
      });
    }
  };
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const observationsRef = React.useRef<HTMLDivElement>(null);

  // ELE-875 — synchronous source of truth for inspection items.
  // Why: previously getInspectionItems() read straight from formData.inspectionItems,
  // and scrollSafeUpdate's multi-setTimeout scroll restoration caused re-renders
  // that fired BEFORE the parent's debounced save committed the latest update.
  // Items 1.3 and 4.23 (last items in their A4:2026 sections) consistently lost
  // outcomes because the user navigated/collapsed immediately after tapping.
  // This ref captures the just-set value synchronously so subsequent reads see it
  // even before formData propagates back down.
  const localInspectionItemsRef = React.useRef<InspectionItem[] | null>(null);

  const getInspectionItems = (): InspectionItem[] => {
    // Use all sections from the BS 7671 residential checklist (up to 100A supply).
    // All 8 sections / ~60 items are relevant regardless of property type —
    // the inspectionRelevance filter lists were built for a larger checklist and
    // reference IDs that don't exist in this dataset, causing items to vanish.
    const allSections = bs7671InspectionSections;

    // Always ensure we have the correct number of items from the structure
    const expectedItems = allSections.flatMap((section) =>
      section.items.map((item) => ({
        id: item.id,
        section: section.title,
        sectionNumber: section.sectionNumber, // A4:2026 — needed for PDF section header
        number: item.number, // A4:2026 — needed for PDF item number column
        item: item.item,
        clause: item.clause,
        inspected: false,
        outcome: '' as const, // Default to empty string instead of 'not-applicable'
        notes: '',
      }))
    );

    // ELE-875 — prefer local ref if a write has happened in this render cycle.
    // Otherwise fall back to formData (for fresh hydration or external updates).
    const sourceItems =
      (localInspectionItemsRef.current && localInspectionItemsRef.current.length > 0
        ? localInspectionItemsRef.current
        : formData.inspectionItems) as InspectionItem[] | undefined;

    // If we have existing form data, merge it with the expected structure.
    // A4:2026 FIX — only carry over outcome/notes/inspected. Item text, clause,
    // section name + number always come from the CURRENT data file so renames
    // (e.g. A2 → A4 wording, renumbered 1.1/1.2/1.3) never leak through from
    // stale drafts saved before the amendment.
    if (sourceItems && sourceItems.length > 0) {
      const existingItemsMap = new Map(
        sourceItems.map((item: InspectionItem) => [item.id, item])
      );

      return expectedItems.map((expectedItem) => {
        const existingItem = existingItemsMap.get(expectedItem.id) as InspectionItem | undefined;
        return existingItem
          ? {
              ...expectedItem,
              outcome: existingItem.outcome || ('' as const),
              notes: existingItem.notes || '',
              inspected: existingItem.inspected ?? false,
            }
          : expectedItem;
      });
    }

    return expectedItems;
  };

  const getDefectObservations = (): DefectObservation[] => {
    return formData.defectObservations || [];
  };

  // Scroll-safe onUpdate wrapper — prevents scroll jump on state changes.
  // ELE-875 — for inspectionItems writes, we ALSO mirror the new value into a
  // local ref synchronously so subsequent reads in the same render cycle
  // (e.g. user immediately collapses the section) see the just-set outcome
  // even before the parent's debounced save fires. The multi-setTimeout retry
  // is kept (it does its job for scroll position) but no longer causes data
  // loss because reads now go through the ref.
  const scrollSafeUpdate = React.useCallback((field: string, value: any) => {
    if (field === 'inspectionItems' && Array.isArray(value)) {
      localInspectionItemsRef.current = value as InspectionItem[];
    }
    const scrollY = window.scrollY;
    onUpdate(field, value);
    const restore = () => window.scrollTo(0, scrollY);
    requestAnimationFrame(restore);
    setTimeout(restore, 50);
    setTimeout(restore, 100);
    setTimeout(restore, 200);
  }, [onUpdate]);

  // ELE-875 — when formData changes from outside (initial load, undo, sync
  // from cloud), refresh the local ref so we don't keep an out-of-date copy.
  // This effect runs only when the array identity changes (new save), not on
  // every render.
  React.useEffect(() => {
    if (Array.isArray(formData.inspectionItems)) {
      localInspectionItemsRef.current = formData.inspectionItems as InspectionItem[];
    }
  }, [formData.inspectionItems]);

  const updateInspectionItem = (
    id: string,
    field: keyof InspectionItem | '__BULK_UPDATE__',
    value: any
  ) => {
    // Handle bulk update for atomic operations
    if (id === '__BULK_UPDATE__' && field === '__BULK_UPDATE__') {
      scrollSafeUpdate('inspectionItems', value);
      return;
    }

    const items = getInspectionItems();
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      console.warn(
        `[EICRInspectionChecklist] Item ${id} not found. Available items:`,
        items.map((i) => i.id).slice(0, 10)
      );
      // Force re-initialization if item not found
      const initializedItems = getInspectionItems();
      scrollSafeUpdate('inspectionItems', initializedItems);
      return;
    }

    const currentItem = items[itemIndex];

    // Create updated items array with atomic updates
    const updatedItems = [...items];
    const updates: Partial<InspectionItem> = { [field as keyof InspectionItem]: value };

    // If updating outcome, also update inspected status appropriately
    if (field === 'outcome') {
      updates.inspected = value !== '' && value !== 'not-applicable';
    }

    updatedItems[itemIndex] = { ...currentItem, ...updates };

    // Update the form data with all changes at once
    scrollSafeUpdate('inspectionItems', updatedItems);

    // If updating notes and there's a linked observation with a critical outcome, sync notes to observation
    if (
      field === 'notes' &&
      (currentItem.outcome === 'C1' || currentItem.outcome === 'C2' || currentItem.outcome === 'C3')
    ) {
      const existingObservations = getDefectObservations();
      const linkedObservation = existingObservations.find((obs) => obs.inspectionItemId === id);

      if (linkedObservation && value && value.trim()) {
        const updatedObservations = existingObservations.map((obs) =>
          obs.id === linkedObservation.id ? { ...obs, description: value } : obs
        );
        scrollSafeUpdate('defectObservations', updatedObservations);
      }
    }
  };

  const autoCreateObservation = async (inspectionItem: InspectionItem) => {
    const existingObservations = getDefectObservations();

    // Don't create observations for N/A, satisfactory, or other non-defect outcomes.
    // FI included — an FI item needs an observation describing what to investigate
    // (BS 7671 A4:2026 Appendix 6; FI remains advisory and does not force an
    // unsatisfactory report).
    if (!['C1', 'C2', 'C3', 'FI'].includes(inspectionItem.outcome)) {
      // If there's an existing observation linked to this item, remove it
      const linkedObservation = existingObservations.find(
        (obs) => obs.inspectionItemId === inspectionItem.id
      );
      if (linkedObservation) {
        const updatedObservations = existingObservations.filter(
          (obs) => obs.id !== linkedObservation.id
        );
        scrollSafeUpdate('defectObservations', updatedObservations);
      }

      return;
    }

    const existingObservation = existingObservations.find(
      (obs) => obs.inspectionItemId === inspectionItem.id
    );

    // Use notes from inspection item if available
    const description =
      inspectionItem.notes && inspectionItem.notes.trim()
        ? inspectionItem.notes
        : 'Item requires attention - inspection outcome not satisfactory';

    let observationId: string;

    if (existingObservation) {
      observationId = existingObservation.id;
      const updatedObservations = existingObservations.map((obs) =>
        obs.id === existingObservation.id
          ? {
              ...obs,
              defectCode: inspectionItem.outcome as 'C1' | 'C2' | 'C3' | 'FI',
              item: inspectionItem.item,
              description: description, // Update description with notes
            }
          : obs
      );
      scrollSafeUpdate('defectObservations', updatedObservations);
    } else {
      observationId = Date.now().toString();
      const newObservation: DefectObservation = {
        id: observationId,
        item: inspectionItem.item,
        defectCode: inspectionItem.outcome as 'C1' | 'C2' | 'C3' | 'FI',
        description: description,
        recommendation: 'Investigate and rectify as required to comply with BS 7671',
        rectified: false,
        inspectionItemId: inspectionItem.id,
      };
      scrollSafeUpdate('defectObservations', [...existingObservations, newObservation]);
    }

    // Link all photos from this inspection item to the observation
    // Use databaseId (actual UUID) not the certificate number
    if (databaseId) {
      try {
        const { error } = await supabase
          .from('inspection_photos')
          .update({ observation_id: observationId })
          .eq('report_id', databaseId)
          .eq('item_id', inspectionItem.id)
          .is('observation_id', null); // Only update photos not already linked

        if (error) {
          console.error('Error linking photos to observation:', error);
        }
      } catch (error) {
        console.error('Error linking photos:', error);
      }
    }
  };

  const handleNavigateToObservations = () => {
    setTimeout(() => {
      if (observationsRef.current) {
        observationsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (onNavigateToObservations) {
        onNavigateToObservations();
      }
    }, 100);
  };

  const addDefectObservation = () => {
    const newObservation: DefectObservation = {
      id: Date.now().toString(),
      item: '',
      defectCode: 'C3',
      description: '',
      recommendation: '',
      rectified: false,
    };
    const observations = getDefectObservations();
    onUpdate('defectObservations', [...observations, newObservation]);
  };

  const updateDefectObservation = (
    id: string,
    field: keyof DefectObservation | '__BULK__',
    value: any
  ) => {
    const observations = getDefectObservations();
    const updatedObservations = observations.map((obs) =>
      obs.id === id
        ? field === '__BULK__'
          ? { ...obs, ...value }
          : { ...obs, [field]: value }
        : obs
    );
    onUpdate('defectObservations', updatedObservations);
  };

  const removeDefectObservation = (id: string) => {
    const observations = getDefectObservations();
    const updatedObservations = observations.filter((obs) => obs.id !== id);
    onUpdate('defectObservations', updatedObservations);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const bulkMarkSatisfactory = (sectionId: string) => {
    const items = getInspectionItems();
    const section = bs7671InspectionSections.find((s) => s.id === sectionId);

    if (!section) {
      console.warn(`[EICRInspectionChecklist] Section ${sectionId} not found`);
      return;
    }

    const updatedItems = items.map((item) => {
      const isInSection = section.items.some((sItem) => sItem.id === item.id);
      if (isInSection) {
        return {
          ...item,
          outcome: 'satisfactory' as const,
          inspected: true,
        };
      }
      return item;
    });

    scrollSafeUpdate('inspectionItems', updatedItems);
  };

  // Global bulk action — fills ONLY items with no outcome yet. Never touches
  // C1/C2/C3/FI/N-A/LIM/N-V/satisfactory already recorded, so it is
  // non-destructive and needs no confirmation. Same atomic write path as the
  // per-section bulk (scrollSafeUpdate keeps the ELE-875 ref in sync).
  const markAllRemainingSatisfactory = () => {
    const items = getInspectionItems();
    const remaining = items.filter((item) => !item.outcome).length;
    if (remaining === 0) return;

    const updatedItems = items.map((item) =>
      !item.outcome
        ? {
            ...item,
            outcome: 'satisfactory' as const,
            inspected: true,
          }
        : item
    );

    scrollSafeUpdate('inspectionItems', updatedItems);
    haptic.success();
    toast.success(
      `${remaining} ${remaining === 1 ? 'item' : 'items'} marked satisfactory`,
      { description: 'Existing outcomes were left untouched.' }
    );
  };

  const bulkClearSection = (sectionId: string) => {
    const items = getInspectionItems();
    const section = bs7671InspectionSections.find((s) => s.id === sectionId);

    if (!section) {
      console.warn(`[EICRInspectionChecklist] Section ${sectionId} not found`);
      return;
    }

    const updatedItems = items.map((item) => {
      const isInSection = section.items.some((sItem) => sItem.id === item.id);
      if (isInSection) {
        return {
          ...item,
          outcome: '' as const, // Clear to empty string
          inspected: false,
          notes: '',
        };
      }
      return item;
    });

    scrollSafeUpdate('inspectionItems', updatedItems);
  };

  // Initialize inspection items if not already present or if count mismatch
  React.useEffect(() => {
    const expectedCount = bs7671InspectionSections.reduce(
      (total, section) => total + section.items.length,
      0
    );
    const currentCount = formData.inspectionItems?.length || 0;

    if (currentCount !== expectedCount) {
      const initialItems = getInspectionItems();
      scrollSafeUpdate('inspectionItems', initialItems);
    }
  }, []);

  const inspectionItems = getInspectionItems();
  const defectObservations = getDefectObservations();

  // Calculate overall progress
  const totalItems = inspectionItems.length;
  const completedItems = inspectionItems.filter(i => i.outcome && i.outcome !== '').length;
  const c1Count = inspectionItems.filter(i => i.outcome === 'C1').length;
  const c2Count = inspectionItems.filter(i => i.outcome === 'C2').length;
  const c3Count = inspectionItems.filter(i => i.outcome === 'C3').length;
  const fiCount = inspectionItems.filter(i => i.outcome === 'FI').length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Quick mark mode
  const [quickMarkMode, setQuickMarkMode] = React.useState(false);

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 lg:pb-6">
      {/* Inspection progress header */}
      <section className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
          Schedule of inspections
        </h2>

        {/* Progress bar + count */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-white">
              {completedItems}/{totalItems} completed
            </span>
            <span
              className={`text-[12px] font-semibold tabular-nums ${progressPercent === 100 ? 'text-green-400' : 'text-elec-yellow'}`}
            >
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressPercent === 100 ? 'bg-green-500' : 'bg-elec-yellow'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Defect stats + quick mark toggle */}
        <div className="flex items-center gap-3">
          <div className="flex flex-1 flex-wrap items-center gap-1.5 text-[11px]">
            {c1Count > 0 && (
              <span className="rounded-md bg-red-600 px-2 py-0.5 font-bold text-white tabular-nums">
                {c1Count} C1
              </span>
            )}
            {c2Count > 0 && (
              <span className="rounded-md bg-orange-500 px-2 py-0.5 font-bold text-black tabular-nums">
                {c2Count} C2
              </span>
            )}
            {c3Count > 0 && (
              <span className="rounded-md bg-elec-yellow px-2 py-0.5 font-bold text-black tabular-nums">
                {c3Count} C3
              </span>
            )}
            {fiCount > 0 && (
              <span className="rounded-md bg-blue-500 px-2 py-0.5 font-bold text-white tabular-nums">
                {fiCount} FI
              </span>
            )}
            {c1Count === 0 && c2Count === 0 && c3Count === 0 && fiCount === 0 && (
              <span className="text-[12px] text-white/80">No defects recorded yet</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              haptic.light();
              setQuickMarkMode(!quickMarkMode);
            }}
            className={`h-11 shrink-0 rounded-xl px-4 text-[13px] transition-all touch-manipulation active:scale-[0.98] ${
              quickMarkMode
                ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
            }`}
          >
            {quickMarkMode ? 'Quick mark on — tap = OK' : 'Quick mark'}
          </button>
        </div>

        {/* Global fill — blank items only, never overwrites recorded outcomes */}
        {totalItems > 0 && completedItems < totalItems && (
          <button
            type="button"
            onClick={markAllRemainingSatisfactory}
            className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-all touch-manipulation active:scale-[0.98]"
          >
            Mark all remaining satisfactory
          </button>
        )}
      </section>

      {/* Checklist Sections */}
      <div className="space-y-1">
        <InspectionChecklistCard
          inspectionItems={inspectionItems}
          sections={bs7671InspectionSections}
          expandedSections={expandedSections}
          onToggleSection={toggleSection}
          onUpdateItem={updateInspectionItem}
          onNavigateToObservations={handleNavigateToObservations}
          onAutoCreateObservation={autoCreateObservation}
          onBulkMarkSatisfactory={bulkMarkSatisfactory}
          onBulkClearSection={bulkClearSection}
          quickMarkMode={quickMarkMode}
        />
      </div>

      {/* Defect Observations */}
      <DefectObservationsSection
        ref={observationsRef}
        defectObservations={defectObservations}
        reportId={effectiveReportId}
        onAddObservation={addDefectObservation}
        onUpdateObservation={updateDefectObservation}
        onRemoveObservation={removeDefectObservation}
        certificateContext={{
          certificateType: 'eicr',
          certificateNumber: formData.certificateNumber || '',
          clientName: formData.clientName || '',
          installationAddress: formData.installationAddress || formData.clientAddress || '',
        }}
      />

      {/* Inspected by sign-off (A4:2026 — Schedule of Inspections) */}
      <section className={cardCn}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Inspected by</h2>
          <button
            type="button"
            onClick={handlePrefillInspectedBy}
            className="h-9 shrink-0 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-medium text-white transition-transform touch-manipulation active:scale-[0.97]"
          >
            Use my details
          </button>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <label className={labelCn}>Name (capitals)</label>
            <input
              type="text"
              value={formData.scheduleInspectedByName || ''}
              onChange={(e) => onUpdate('scheduleInspectedByName', e.target.value.toUpperCase())}
              placeholder="FULL NAME"
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn}>Date</label>
            <input
              type="date"
              value={formData.scheduleInspectedByDate || ''}
              onChange={(e) => onUpdate('scheduleInspectedByDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <label className={labelCn}>Signature</label>
          <SignatureInput
            value={formData.scheduleInspectedBySignature || ''}
            onChange={(signature) => onUpdate('scheduleInspectedBySignature', signature)}
            placeholder="Draw, type or use a saved signature"
          />
        </div>
      </section>

      {/* Reference Guide — at bottom for reference, not workflow */}
      <DefectCodesReference />

      {/* Desktop inline inspection summary */}
      <InspectionStatsSummary inspectionItems={inspectionItems} />
    </div>
  );
};

export default EICRInspectionChecklist;
