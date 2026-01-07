import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  } = useSafetyEquipment();

  const [activeFilter, setActiveFilter] = useState<EquipmentFilterId>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<SafetyEquipment | null>(null);

  // Filter equipment based on active tab
  const filteredEquipment = useMemo(() => {
    switch (activeFilter) {
      case "good":
        return equipment.filter((e) => e.status === "good");
      case "attention":
        return equipment.filter((e) => e.status === "needs_attention");
      case "overdue":
        return equipment.filter((e) => {
          if (e.next_inspection) {
            return new Date(e.next_inspection) < new Date();
          }
          if (e.calibration_due) {
            return new Date(e.calibration_due) < new Date();
          }
          return e.status === "overdue";
        });
      default:
        return equipment;
    }
  }, [equipment, activeFilter]);

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
    <div className="min-h-screen bg-elec-dark pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button
            onClick={() => navigate("/electrician-tools/site-safety")}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Hero Card with Stats */}
        <EquipmentHeroCard
          totalEquipment={stats.total}
          goodCount={stats.good}
          attentionCount={stats.needsAttention}
          overdueCount={stats.overdue}
          onAddEquipment={() => setShowForm(true)}
        />

        {/* Filter Tabs */}
        <EquipmentFilterTabs
          tabs={tabs}
          activeTab={activeFilter}
          onChange={setActiveFilter}
        />

        {/* Equipment List */}
        <div className="space-y-3">
          {isLoading ? (
            <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
              <CardContent className="py-16">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
                    <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">Loading Equipment</p>
                    <p className="text-sm text-white/50 mt-1">
                      Fetching your safety equipment...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : filteredEquipment.length === 0 ? (
            <Card className="bg-[#1e1e1e] border border-white/10 border-dashed rounded-2xl">
              <CardContent className="py-12 text-center">
                <div className="p-4 mx-auto w-fit rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 mb-4">
                  <Package className="h-8 w-8 text-elec-yellow" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {activeFilter === "all" ? "No Equipment" : `No ${tabs.find(t => t.id === activeFilter)?.label} Equipment`}
                </h3>
                <p className="text-white/50 mb-6 max-w-[280px] mx-auto">
                  {activeFilter === "all"
                    ? "Add your first piece of equipment to start tracking"
                    : `No equipment in ${activeFilter} status`}
                </p>
                {activeFilter === "all" && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="h-12 px-6 flex items-center justify-center gap-2 mx-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all"
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
