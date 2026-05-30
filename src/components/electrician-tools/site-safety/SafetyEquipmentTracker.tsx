import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSafetyEquipment, SafetyEquipment } from '@/hooks/useSafetyEquipment';
import {
  EquipmentFormWizard,
  EquipmentBarcodeScanner,
  EquipmentDetailView,
  type EquipmentFilterId,
} from './equipment';
import {
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  LoadingState,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';
import { SafetyModuleShell } from './common/SafetyModuleShell';
import { SwipeableListItem } from './common/SwipeableListItem';
import { DeleteConfirmSheet } from './common/DeleteConfirmSheet';
import { LoadMoreButton } from './common/LoadMoreButton';
import { fmtCardDate } from './common/SafetyRecordCard';
import { useShowMore } from '@/hooks/useShowMore';
import { equipmentCategories } from './equipment/EquipmentCategoryPicker';
import { cn } from '@/lib/utils';

// One colour dimension = status.
function statusTone(status: SafetyEquipment['status']): Tone {
  return status === 'good'
    ? 'green'
    : status === 'needs_attention'
      ? 'amber'
      : status === 'overdue'
        ? 'red'
        : 'blue';
}

const STATUS_PILL: Record<Tone, string> = {
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

const STATUS_LABEL: Record<SafetyEquipment['status'], string> = {
  good: 'Good',
  needs_attention: 'Attention',
  overdue: 'Overdue',
  out_of_service: 'Out of service',
};

function StatusPill({ status }: { status: SafetyEquipment['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        STATUS_PILL[statusTone(status)]
      )}
    >
      {STATUS_LABEL[status]}
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

  // Filter equipment based on active tab and search query
  const filteredEquipment = useMemo(() => {
    let result = equipment;

    switch (activeFilter) {
      case 'good':
        result = result.filter((e) => e.status === 'good');
        break;
      case 'attention':
        result = result.filter((e) => e.status === 'needs_attention');
        break;
      case 'overdue':
        result = result.filter((e) => {
          if (e.next_inspection) {
            return new Date(e.next_inspection) < new Date();
          }
          if (e.calibration_due) {
            return new Date(e.calibration_due) < new Date();
          }
          return e.status === 'overdue';
        });
        break;
      case 'warranty': {
        const now = new Date();
        const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        result = result.filter((e) => {
          if (!e.warranty_expiry) return false;
          const expiry = new Date(e.warranty_expiry);
          return expiry < thirtyDays; // expired or expiring within 30 days
        });
        break;
      }
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

    // Surface urgent (overdue, then attention) to the top.
    const rank: Record<SafetyEquipment['status'], number> = {
      overdue: 0,
      needs_attention: 1,
      out_of_service: 2,
      good: 3,
    };
    return [...result].sort((a, b) => rank[a.status] - rank[b.status]);
  }, [equipment, activeFilter, searchQuery]);

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
      { value: 'good', label: 'Good', count: stats.good },
      { value: 'attention', label: 'Attention', count: stats.needsAttention },
      { value: 'overdue', label: 'Overdue', count: stats.overdue },
      { value: 'warranty', label: 'Warranty', count: stats.warrantyAlert },
    ],
    [stats]
  );

  const handleAddEquipment = async (data: Record<string, unknown>) => {
    // Calculate next_inspection based on last_inspection and interval
    let next_inspection: string | null = null;
    if (data.last_inspection && data.inspection_interval_days) {
      const lastDate = new Date(data.last_inspection);
      lastDate.setDate(lastDate.getDate() + data.inspection_interval_days);
      next_inspection = lastDate.toISOString().split('T')[0];
    }

    await addEquipment.mutateAsync({
      name: data.name,
      category: data.category,
      serial_number: data.serial_number || null,
      location: data.location,
      last_inspection: data.last_inspection || null,
      next_inspection,
      inspection_interval_days: data.inspection_interval_days || 180,
      condition_notes: data.condition_notes || null,
      status: 'good',
      requires_calibration: false,
      photos: (data.photos as string[]) || [],
      warranty_expiry: data.warranty_expiry || null,
      warranty_provider: data.warranty_provider || null,
      warranty_claim_contact: data.warranty_claim_contact || null,
    });
    setShowForm(false);
    setEditingEquipment(null);
    setScanSerialForNew(null);
  };

  const handleUpdateEquipment = async (data: Record<string, unknown>) => {
    if (!editingEquipment) return;

    // Calculate next_inspection based on last_inspection and interval
    let next_inspection: string | null = null;
    if (data.last_inspection && data.inspection_interval_days) {
      const lastDate = new Date(data.last_inspection);
      lastDate.setDate(lastDate.getDate() + data.inspection_interval_days);
      next_inspection = lastDate.toISOString().split('T')[0];
    }

    await updateEquipment.mutateAsync({
      id: editingEquipment.id,
      updates: {
        name: data.name,
        category: data.category,
        serial_number: data.serial_number || null,
        location: data.location,
        last_inspection: data.last_inspection || null,
        next_inspection,
        inspection_interval_days: data.inspection_interval_days || 180,
        condition_notes: data.condition_notes || null,
        photos: (data.photos as string[]) || [],
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
        <PageHero
          eyebrow="Equipment · PUWER 1998 / LOLER 1998"
          title="Track every tool, test and warranty"
          description="Keep PPE and test equipment in date — inspection and calibration due dates, warranty expiry, QR labels and pre-use check history in one register."
          tone="yellow"
          actions={<PrimaryButton onClick={() => setShowForm(true)}>Add equipment</PrimaryButton>}
        />
      }
      stats={
        stats.total > 0 ? (
          <StatStrip
            stats={[
              { value: stats.total, label: 'Total', onClick: () => setActiveFilter('all') },
              { value: stats.good, label: 'Good', tone: 'green', onClick: () => setActiveFilter('good') },
              {
                value: stats.needsAttention,
                label: 'Attention',
                tone: 'amber',
                onClick: () => setActiveFilter('attention'),
              },
              { value: stats.overdue, label: 'Overdue', tone: 'red', onClick: () => setActiveFilter('overdue') },
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
          {...(activeFilter === 'all' ? { action: 'Add equipment', onAction: () => setShowForm(true) } : {})}
        />
      ) : (
        <div className="space-y-2.5">
          {visibleEquipment.map((item) => (
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
              <ListCard>
                <ListRow
                  accent={statusTone(item.status)}
                  onClick={() => setSelectedId(item.id)}
                  title={item.name}
                  subtitle={`${categoryLabel(item.category)}${item.location ? ` · ${item.location}` : ''}`}
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <StatusPill status={item.status} />
                      <span className="text-[11px] text-white/45 tabular-nums">
                        {item.next_inspection ? `Due ${fmtCardDate(item.next_inspection)}` : 'No date'}
                      </span>
                    </div>
                  }
                />
              </ListCard>
            </SwipeableListItem>
          ))}
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
        title="Scan Equipment"
        description="Point at a barcode or QR code on your equipment"
      />
    </SafetyModuleShell>
  );
};

export default SafetyEquipmentTracker;
