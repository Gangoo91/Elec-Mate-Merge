import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  useSafetyEquipment,
  deriveEquipmentStatus,
  deriveWarrantyState,
  equipmentDueDate,
  nextInspectionFrom,
  todayISODate,
  type SafetyEquipment,
  type EquipmentDerivedStatus,
} from '@/hooks/useSafetyEquipment';
import {
  EquipmentFormWizard,
  EquipmentBarcodeScanner,
  EquipmentDetailView,
  type EquipmentFilterId,
  type EquipmentFormValues,
} from './equipment';
import {
  FilterBar,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { SafetyModuleShell } from './common/SafetyModuleShell';
import { SwipeableListItem } from './common/SwipeableListItem';
import { DeleteConfirmSheet } from './common/DeleteConfirmSheet';
import { LoadMoreButton } from './common/LoadMoreButton';
import { fmtCardDate } from './common/SafetyRecordCard';
import { useShowMore } from '@/hooks/useShowMore';
import { equipmentCategories } from './equipment/EquipmentCategoryPicker';
import { cn } from '@/lib/utils';
import { SafetyListCard, SafetyListRow } from './common/SafetyList';
import {
  EQUIPMENT_STATUS_LABEL,
  EQUIPMENT_STATUS_RANK,
  EQUIPMENT_STATUS_TONE,
  PILL_BASE,
  STATUS_PILL_CLASS,
} from './equipment/equipmentStatus';
import { SafetyPageHeader, SafetyStatStrip } from './common/SafetyPageHeader';

function StatusPill({ status }: { status: EquipmentDerivedStatus }) {
  return (
    <span className={cn(PILL_BASE, STATUS_PILL_CLASS[EQUIPMENT_STATUS_TONE[status]])}>
      {EQUIPMENT_STATUS_LABEL[status]}
    </span>
  );
}

function categoryLabel(category: string): string {
  return equipmentCategories.find((c) => c.id === category)?.label || category;
}

interface SafetyEquipmentTrackerProps {
  onBack?: () => void;
}

export const SafetyEquipmentTracker: React.FC<SafetyEquipmentTrackerProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const {
    equipment,
    isLoading,
    stats,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    markInspected,
    markCalibrated,
    findBySerialNumber,
    findByQrCode,
    saveQrCode,
  } = useSafetyEquipment();

  const [activeFilter, setActiveFilter] = useState<EquipmentFilterId>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<SafetyEquipment | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanSerialForNew, setScanSerialForNew] = useState<string | null>(null);

  const handleBack = onBack ?? (() => navigate('/electrician-tools/site-safety'));

  /**
   * Every row's derived status, computed once against one `today`.
   *
   * Deriving inside the sort comparator or per-filter would let two rows be
   * judged against different `today` values if the clock ticked past midnight
   * mid-render. Once, up front, and everything below shares it.
   */
  const statusById = useMemo(() => {
    const today = todayISODate();
    return new Map(equipment.map((e) => [e.id, deriveEquipmentStatus(e, today)]));
  }, [equipment]);

  const statusOf = useCallback(
    (e: SafetyEquipment): EquipmentDerivedStatus => statusById.get(e.id) ?? 'unscheduled',
    [statusById]
  );

  // Filter equipment based on active tab and search query
  const filteredEquipment = useMemo(() => {
    let result = equipment;

    // Every tab now reads the SAME derived status. It used to be split: "Good"
    // and "Attention" read the `status` column while "Overdue" read the dates,
    // so a tool three months out of test matched both the Good tab (its column
    // says `good`, as every row's does) and the Overdue tab at the same time.
    switch (activeFilter) {
      case 'good':
        result = result.filter((e) => statusOf(e) === 'good');
        break;
      case 'attention':
        result = result.filter((e) => {
          const s = statusOf(e);
          return s === 'due_soon' || s === 'unscheduled';
        });
        break;
      case 'overdue':
        result = result.filter((e) => statusOf(e) === 'overdue');
        break;
      case 'warranty':
        result = result.filter((e) => {
          const w = deriveWarrantyState(e);
          return w === 'expired' || w === 'expiring';
        });
        break;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.location?.toLowerCase().includes(query) ||
          e.serial_number?.toLowerCase().includes(query)
      );
    }

    // Surface urgent (overdue, then due soon / unscheduled) to the top, then
    // soonest-due first within a band so the list is actionable top-down.
    return [...result].sort((a, b) => {
      const byRank = EQUIPMENT_STATUS_RANK[statusOf(a)] - EQUIPMENT_STATUS_RANK[statusOf(b)];
      if (byRank !== 0) return byRank;
      const dueA = equipmentDueDate(a);
      const dueB = equipmentDueDate(b);
      if (dueA && dueB) return dueA.localeCompare(dueB);
      if (dueA) return -1;
      if (dueB) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [equipment, activeFilter, searchQuery, statusOf]);

  const {
    visible: visibleEquipment,
    hasMore: hasMoreEquipment,
    remaining: remainingEquipment,
    loadMore: loadMoreEquipment,
  } = useShowMore(filteredEquipment);

  // Filter tabs with counts
  const filterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: stats.total },
      // "In date" / "Attention" rather than "Good" / "Attention": the counts are
      // now about test dates, not a self-assessed condition.
      { value: 'good', label: 'In date', count: stats.good },
      { value: 'attention', label: 'Attention', count: stats.needsAttention },
      { value: 'overdue', label: 'Overdue', count: stats.overdue },
      { value: 'warranty', label: 'Warranty', count: stats.warrantyAlert },
    ],
    [stats]
  );

  /**
   * The wizard's payload, mapped onto table columns.
   *
   * Both handlers used to take `(data: Record<string, unknown>)`. That is
   * assignable to the wizard's `onSubmit` prop, so nothing complained at the
   * call site — but it made every field below `unknown`, which is where 24 of
   * this file's 25 type errors came from and, more importantly, meant the insert
   * payload was never once checked against `safety_equipment`.
   */
  const handleAddEquipment = async (data: EquipmentFormValues) => {
    await addEquipment.mutateAsync({
      name: data.name,
      category: data.category,
      serial_number: data.serial_number || null,
      location: data.location,
      last_inspection: data.last_inspection || null,
      next_inspection: nextInspectionFrom(data.last_inspection, data.inspection_interval_days),
      inspection_interval_days: data.inspection_interval_days,
      condition_notes: data.condition_notes || null,
      status: 'good',
      requires_calibration: false,
      photos: data.photos ?? [],
      warranty_expiry: data.warranty_expiry || null,
      warranty_provider: data.warranty_provider || null,
      warranty_claim_contact: data.warranty_claim_contact || null,
    });
    setShowForm(false);
    setEditingEquipment(null);
    setScanSerialForNew(null);
  };

  const handleUpdateEquipment = async (data: EquipmentFormValues) => {
    if (!editingEquipment) return;

    await updateEquipment.mutateAsync({
      id: editingEquipment.id,
      updates: {
        name: data.name,
        category: data.category,
        serial_number: data.serial_number || null,
        location: data.location,
        last_inspection: data.last_inspection || null,
        next_inspection: nextInspectionFrom(data.last_inspection, data.inspection_interval_days),
        inspection_interval_days: data.inspection_interval_days,
        condition_notes: data.condition_notes || null,
        photos: data.photos ?? [],
        warranty_expiry: data.warranty_expiry || null,
        warranty_provider: data.warranty_provider || null,
        warranty_claim_contact: data.warranty_claim_contact || null,
      },
    });
    setShowForm(false);
    setEditingEquipment(null);
  };

  const handleEdit = (item: SafetyEquipment) => {
    setEditingEquipment(item);
    setShowForm(true);
  };

  const handleMarkInspected = (id: string) => {
    markInspected.mutate(id);
  };

  const handleMarkCalibrated = (id: string) => {
    markCalibrated.mutate(id);
  };

  const handleSaveQrCode = useCallback(
    (id: string, qrValue: string) => {
      saveQrCode.mutate({ id, qrValue });
    },
    [saveQrCode]
  );

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEquipment(null);
    setScanSerialForNew(null);
  };

  const handleScanResult = useCallback(
    (result: { text: string; format: string }) => {
      setShowScanner(false);

      if (!result.text || !result.text.trim()) return;

      // Try matching as QR code first (https://elecmate.app/e/<id>)
      const qrMatch = findByQrCode(result.text);
      if (qrMatch) {
        setActiveFilter('all');
        setSearchQuery(qrMatch.name);
        toast.success(`Found: ${qrMatch.name}`, {
          action: {
            label: 'Mark Tested',
            onClick: () => markInspected.mutate(qrMatch.id),
          },
        });
        return;
      }

      // Try matching as serial number barcode
      const serialMatch = findBySerialNumber(result.text);
      if (serialMatch) {
        setActiveFilter('all');
        setSearchQuery(serialMatch.name);
        toast.success(`Found: ${serialMatch.name}`, {
          action: {
            label: 'Mark Tested',
            onClick: () => markInspected.mutate(serialMatch.id),
          },
        });
        return;
      }

      // No match — offer to create new equipment with this serial pre-filled
      setScanSerialForNew(result.text);
      setShowForm(true);
      toast.info(`Scanned: ${result.text} — add as new equipment`);
    },
    [findByQrCode, findBySerialNumber, markInspected]
  );

  // ─── Form wizard ───
  if (showForm) {
    const formInitialData = editingEquipment
      ? editingEquipment
      : scanSerialForNew
        ? { serial_number: scanSerialForNew }
        : undefined;

    return (
      <EquipmentFormWizard
        initialData={formInitialData}
        onClose={handleCloseForm}
        onSubmit={editingEquipment ? handleUpdateEquipment : handleAddEquipment}
        isSubmitting={addEquipment.isPending || updateEquipment.isPending}
      />
    );
  }

  // ─── Detail ───
  const selected = selectedId ? equipment.find((e) => e.id === selectedId) : null;
  if (selected) {
    return (
      <EquipmentDetailView
        equipment={selected}
        onBack={() => setSelectedId(null)}
        onEdit={() => {
          setSelectedId(null);
          handleEdit(selected);
        }}
        onDelete={() => setDeleteTarget(selected.id)}
        onMarkInspected={() => handleMarkInspected(selected.id)}
        onMarkCalibrated={
          selected.requires_calibration ? () => handleMarkCalibrated(selected.id) : undefined
        }
        onSaveQrCode={handleSaveQrCode}
      />
    );
  }

  // ─── List ───
  const emptyTitle =
    activeFilter === 'all'
      ? 'No equipment yet'
      : activeFilter === 'warranty'
        ? 'No warranty alerts'
        : `No ${filterTabs.find((t) => t.value === activeFilter)?.label.toLowerCase()} equipment`;
  const emptyDescription =
    activeFilter === 'all'
      ? 'Add your first piece of safety equipment to start tracking inspections, calibration and warranties.'
      : activeFilter === 'warranty'
        ? 'No warranties have expired or are expiring within 30 days.'
        : 'Try a different status tab or clear your search.';

  return (
    <SafetyModuleShell
      onBack={handleBack}
      moduleName="Equipment"
      trailing={
        <SecondaryButton size="sm" onClick={() => setShowScanner(true)}>
          Scan
        </SecondaryButton>
      }
      hero={
        <SafetyPageHeader
          eyebrow="Equipment · PUWER 1998 / LOLER 1998"
          title="Track every tool, test and warranty"
          description="Keep PPE and test equipment in date — inspection and calibration due dates, warranty expiry, QR labels and pre-use check history in one register."
          tone="yellow"
          actions={<PrimaryButton onClick={() => setShowForm(true)}>Add equipment</PrimaryButton>}
        />
      }
      stats={
        stats.total > 0 ? (
          <SafetyStatStrip
            stats={[
              { value: stats.total, label: 'Total', onClick: () => setActiveFilter('all') },
              {
                value: stats.good,
                label: 'In date',
                tone: 'green',
                onClick: () => setActiveFilter('good'),
              },
              {
                value: stats.needsAttention,
                label: 'Attention',
                tone: 'amber',
                // No `sub` copy here: StatStrip renders `sub` as `text-white/70`,
                // which the design system bans. The tab count carries it instead.
                onClick: () => setActiveFilter('attention'),
              },
              {
                value: stats.overdue,
                label: 'Overdue',
                tone: 'red',
                onClick: () => setActiveFilter('overdue'),
              },
            ]}
          />
        ) : undefined
      }
      filter={
        stats.total > 0 ? (
          <FilterBar
            tabs={filterTabs}
            activeTab={activeFilter}
            onTabChange={(v) => setActiveFilter(v as EquipmentFilterId)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search equipment…"
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : equipment.length === 0 ? (
        <EmptyState
          title="No equipment yet"
          description="Add your first piece of safety equipment to start tracking inspections, calibration and warranties."
          action="Add equipment"
          onAction={() => setShowForm(true)}
        />
      ) : filteredEquipment.length === 0 ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          {...(activeFilter === 'all'
            ? { action: 'Add equipment', onAction: () => setShowForm(true) }
            : {})}
        />
      ) : (
        <div className="space-y-2.5">
          {visibleEquipment.map((item) => {
            const status = statusOf(item);
            // The date shown is whichever falls FIRST — inspection or
            // calibration. Showing `next_inspection` alone contradicted the pill
            // whenever a calibration date was the earlier of the two.
            const due = equipmentDueDate(item);
            return (
              <SwipeableListItem
                key={item.id}
                rightActions={[
                  {
                    icon: Trash2,
                    label: 'Delete',
                    color: 'bg-red-500',
                    textColor: 'text-white',
                    onAction: () => setDeleteTarget(item.id),
                  },
                ]}
              >
                <SafetyListCard>
                  <SafetyListRow
                    accent={EQUIPMENT_STATUS_TONE[status]}
                    onClick={() => setSelectedId(item.id)}
                    title={item.name}
                    subtitle={`${categoryLabel(item.category)}${item.location ? ` · ${item.location}` : ''}`}
                    trailing={
                      <div className="flex flex-col items-end gap-1">
                        <StatusPill status={status} />
                        <span className="text-[11px] text-white tabular-nums">
                          {due ? `Due ${fmtCardDate(due)}` : 'No test date'}
                        </span>
                      </div>
                    }
                  />
                </SafetyListCard>
              </SwipeableListItem>
            );
          })}
          {hasMoreEquipment && (
            <LoadMoreButton onLoadMore={loadMoreEquipment} remaining={remainingEquipment} />
          )}
        </div>
      )}

      <DeleteConfirmSheet
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (deleteTarget) {
            deleteEquipment.mutate(deleteTarget);
            if (selectedId === deleteTarget) setSelectedId(null);
          }
          setDeleteTarget(null);
        }}
        title="Delete equipment?"
        description="This equipment record will be permanently removed"
        isDeleting={deleteEquipment.isPending}
      />

      <EquipmentBarcodeScanner
        open={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleScanResult}
        title="Scan equipment"
        description="Point at a barcode or QR code on your equipment"
      />
    </SafetyModuleShell>
  );
};

export default SafetyEquipmentTracker;
