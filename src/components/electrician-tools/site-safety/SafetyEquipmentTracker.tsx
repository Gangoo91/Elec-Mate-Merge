import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Loader2, Search, X, ScanBarcode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSafetyEquipment, SafetyEquipment } from '@/hooks/useSafetyEquipment';
import {
  EquipmentHeroCard,
  PremiumEquipmentCard,
  EquipmentFilterTabs,
  EquipmentFormWizard,
  EquipmentBarcodeScanner,
  type EquipmentFilterId,
} from './equipment';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { DeleteConfirmSheet } from './common/DeleteConfirmSheet';
import { LoadMoreButton } from './common/LoadMoreButton';
import { useShowMore } from '@/hooks/useShowMore';
import { toast } from 'sonner';

export const SafetyEquipmentTracker: React.FC = () => {
  const navigate = useNavigate();
  const {
    equipment,
    isLoading,
    stats,
    refetch,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanSerialForNew, setScanSerialForNew] = useState<string | null>(null);

  // Filter equipment based on active tab and search query
  const filteredEquipment = useMemo(() => {
    let result = equipment;

    // Filter by status tab
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
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.location?.toLowerCase().includes(query) ||
          e.serial_number?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [equipment, activeFilter, searchQuery]);

  const {
    visible: visibleEquipment,
    hasMore: hasMoreEquipment,
    remaining: remainingEquipment,
    loadMore: loadMoreEquipment,
  } = useShowMore(filteredEquipment);

  // Tab configuration with counts
  const tabs = [
    { id: 'all' as const, label: 'All', count: stats.total, color: 'default' as const },
    { id: 'good' as const, label: 'Good', count: stats.good, color: 'green' as const },
    {
      id: 'attention' as const,
      label: 'Attention',
      count: stats.needsAttention,
      color: 'amber' as const,
    },
    { id: 'overdue' as const, label: 'Overdue', count: stats.overdue, color: 'red' as const },
  ];

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
    });
    setShowForm(false);
    setEditingEquipment(null);
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
      },
    });
    setShowForm(false);
    setEditingEquipment(null);
  };

  const handleEdit = (item: SafetyEquipment) => {
    setEditingEquipment(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
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

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEquipment(null);
    setScanSerialForNew(null);
  };

  const handleScanResult = useCallback(
    (result: { text: string; format: string }) => {
      setShowScanner(false);

      // Guard empty scans
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

  // Show form wizard
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

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/[0.08]">
        <div className="px-2 py-2">
          <button
            onClick={() => navigate('/electrician-tools/site-safety')}
            className="flex items-center gap-2 text-white hover:text-white transition-colors min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="px-2 py-2 space-y-3">
          {/* Hero Card with Stats */}
          <EquipmentHeroCard
            totalEquipment={stats.total}
            goodCount={stats.good}
            attentionCount={stats.needsAttention}
            overdueCount={stats.overdue}
            onAddEquipment={() => setShowForm(true)}
          />

          {/* Search + Scan Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                placeholder="Search equipment..."
                className="pl-8 pr-12 h-11 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/10 rounded-full touch-manipulation"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowScanner(true)}
              className="flex items-center justify-center h-11 w-11 rounded-xl bg-elec-yellow text-black touch-manipulation active:scale-[0.95] transition-all flex-shrink-0"
              title="Scan Equipment"
            >
              <ScanBarcode className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <EquipmentFilterTabs tabs={tabs} activeTab={activeFilter} onChange={setActiveFilter} />

          {/* Equipment List */}
          <div className="space-y-2">
            {isLoading ? (
              <Card className="bg-white/5 border border-white/[0.08] rounded-xl">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                      <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">Loading Equipment</p>
                      <p className="text-xs text-white mt-0.5">Fetching your safety equipment...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : filteredEquipment.length === 0 ? (
              <Card className="bg-white/5 border border-white/[0.08] border-dashed rounded-xl">
                <CardContent className="py-8 text-center">
                  <div className="p-3 mx-auto w-fit rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
                    <Package className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {activeFilter === 'all'
                      ? 'No Equipment'
                      : `No ${tabs.find((t) => t.id === activeFilter)?.label} Equipment`}
                  </h3>
                  <p className="text-xs text-white mb-4 max-w-[200px] mx-auto">
                    {activeFilter === 'all'
                      ? 'Add your first piece of equipment to start tracking'
                      : `No equipment in ${activeFilter} status`}
                  </p>
                  {activeFilter === 'all' && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="h-11 px-5 flex items-center justify-center gap-2 mx-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all"
                    >
                      Add Equipment
                    </button>
                  )}
                </CardContent>
              </Card>
            ) : (
              visibleEquipment.map((item, index) => (
                <PremiumEquipmentCard
                  key={item.id}
                  equipment={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                  onMarkInspected={() => handleMarkInspected(item.id)}
                  onMarkCalibrated={
                    item.requires_calibration ? () => handleMarkCalibrated(item.id) : undefined
                  }
                  onSaveQrCode={handleSaveQrCode}
                  index={index}
                />
              ))
            )}
            {hasMoreEquipment && (
              <LoadMoreButton onLoadMore={loadMoreEquipment} remaining={remainingEquipment} />
            )}
          </div>
        </div>
      </PullToRefresh>

      <DeleteConfirmSheet
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={() => {
          if (deleteTarget) deleteEquipment.mutate(deleteTarget);
          setDeleteTarget(null);
        }}
        title="Delete Equipment?"
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
    </div>
  );
};

export default SafetyEquipmentTracker;
