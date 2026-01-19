import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Loader2, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSafetyEquipment, SafetyEquipment } from "@/hooks/useSafetyEquipment";
import {
  EquipmentHeroCard,
  PremiumEquipmentCard,
  EquipmentFilterTabs,
  EquipmentFormWizard,
  type EquipmentFilterId,
} from "./equipment";

export const SafetyEquipmentTracker: React.FC = () => {
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
  } = useSafetyEquipment();

  const [activeFilter, setActiveFilter] = useState<EquipmentFilterId>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<SafetyEquipment | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter equipment based on active tab and search query
  const filteredEquipment = useMemo(() => {
    let result = equipment;

    // Filter by status tab
    switch (activeFilter) {
      case "good":
        result = result.filter((e) => e.status === "good");
        break;
      case "attention":
        result = result.filter((e) => e.status === "needs_attention");
        break;
      case "overdue":
        result = result.filter((e) => {
          if (e.next_inspection) {
            return new Date(e.next_inspection) < new Date();
          }
          if (e.calibration_due) {
            return new Date(e.calibration_due) < new Date();
          }
          return e.status === "overdue";
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

  // Tab configuration with counts
  const tabs = [
    { id: "all" as const, label: "All", count: stats.total, color: "default" as const },
    { id: "good" as const, label: "Good", count: stats.good, color: "green" as const },
    { id: "attention" as const, label: "Attention", count: stats.needsAttention, color: "amber" as const },
    { id: "overdue" as const, label: "Overdue", count: stats.overdue, color: "red" as const },
  ];

  const handleAddEquipment = async (data: any) => {
    // Calculate next_inspection based on last_inspection and interval
    let next_inspection: string | null = null;
    if (data.last_inspection && data.inspection_interval_days) {
      const lastDate = new Date(data.last_inspection);
      lastDate.setDate(lastDate.getDate() + data.inspection_interval_days);
      next_inspection = lastDate.toISOString().split("T")[0];
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
      status: "good",
      requires_calibration: false,
      photos: [],
    });
    setShowForm(false);
    setEditingEquipment(null);
  };

  const handleUpdateEquipment = async (data: any) => {
    if (!editingEquipment) return;

    // Calculate next_inspection based on last_inspection and interval
    let next_inspection: string | null = null;
    if (data.last_inspection && data.inspection_interval_days) {
      const lastDate = new Date(data.last_inspection);
      lastDate.setDate(lastDate.getDate() + data.inspection_interval_days);
      next_inspection = lastDate.toISOString().split("T")[0];
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
    deleteEquipment.mutate(id);
  };

  const handleMarkInspected = (id: string) => {
    markInspected.mutate(id);
  };

  const handleMarkCalibrated = (id: string) => {
    markCalibrated.mutate(id);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEquipment(null);
  };

  // Show form wizard
  if (showForm) {
    return (
      <EquipmentFormWizard
        initialData={editingEquipment || undefined}
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
            onClick={() => navigate("/electrician-tools/site-safety")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <div className="px-2 py-2 space-y-3">
        {/* Hero Card with Stats */}
        <EquipmentHeroCard
          totalEquipment={stats.total}
          goodCount={stats.good}
          attentionCount={stats.needsAttention}
          overdueCount={stats.overdue}
          onAddEquipment={() => setShowForm(true)}
        />

        {/* Compact Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder="Search equipment..."
            className="pl-8 pr-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3.5 w-3.5 text-white/40" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <EquipmentFilterTabs
          tabs={tabs}
          activeTab={activeFilter}
          onChange={setActiveFilter}
        />

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
                    <p className="text-xs text-white/50 mt-0.5">
                      Fetching your safety equipment...
                    </p>
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
                  {activeFilter === "all" ? "No Equipment" : `No ${tabs.find(t => t.id === activeFilter)?.label} Equipment`}
                </h3>
                <p className="text-xs text-white/50 mb-4 max-w-[200px] mx-auto">
                  {activeFilter === "all"
                    ? "Add your first piece of equipment to start tracking"
                    : `No equipment in ${activeFilter} status`}
                </p>
                {activeFilter === "all" && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="h-10 px-5 flex items-center justify-center gap-2 mx-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all"
                  >
                    Add Equipment
                  </button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredEquipment.map((item, index) => (
              <PremiumEquipmentCard
                key={item.id}
                equipment={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
                onMarkInspected={() => handleMarkInspected(item.id)}
                onMarkCalibrated={item.requires_calibration ? () => handleMarkCalibrated(item.id) : undefined}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyEquipmentTracker;
