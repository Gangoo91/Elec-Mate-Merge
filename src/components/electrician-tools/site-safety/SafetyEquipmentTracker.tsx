import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wrench, Plus, AlertTriangle, CheckCircle, Clock, Search, 
  BarChart3, Filter, Zap, Loader2, Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSafetyEquipment, SafetyEquipment } from "@/hooks/useSafetyEquipment";
import { AddEquipmentForm, EquipmentFormData } from "./equipment/AddEquipmentForm";
import { EquipmentCard } from "./equipment/EquipmentCard";
import { QuickTemplates } from "./equipment/QuickTemplates";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

type ViewMode = 'list' | 'add' | 'edit' | 'templates';

const SafetyEquipmentTracker = () => {
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

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingEquipment, setEditingEquipment] = useState<SafetyEquipment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.serial_number?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || item.category === filterCategory;
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [equipment, searchTerm, filterCategory, filterStatus]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(equipment.map(e => e.category));
    return Array.from(cats);
  }, [equipment]);

  const handleAddEquipment = async (formData: EquipmentFormData) => {
    // Calculate next inspection date
    let nextInspection: string | null = null;
    if (formData.requires_inspection && formData.last_inspection) {
      const date = new Date(formData.last_inspection);
      date.setDate(date.getDate() + formData.inspection_interval_days);
      nextInspection = date.toISOString().split('T')[0];
    }

    // Calculate calibration due date
    let calibrationDue: string | null = null;
    if (formData.requires_calibration && formData.last_calibration) {
      const date = new Date(formData.last_calibration);
      date.setDate(date.getDate() + formData.calibration_interval_days);
      calibrationDue = date.toISOString().split('T')[0];
    }

    await addEquipment.mutateAsync({
      name: formData.name,
      category: formData.category,
      serial_number: formData.serial_number || null,
      purchase_date: formData.purchase_date || null,
      purchase_price: formData.purchase_price,
      warranty_expiry: formData.warranty_expiry || null,
      location: formData.location,
      assigned_to: formData.assigned_to || null,
      last_inspection: formData.requires_inspection ? formData.last_inspection : null,
      next_inspection: nextInspection,
      inspection_interval_days: formData.inspection_interval_days,
      requires_calibration: formData.requires_calibration,
      last_calibration: formData.requires_calibration ? formData.last_calibration : null,
      calibration_due: calibrationDue,
      calibration_interval_days: formData.requires_calibration ? formData.calibration_interval_days : null,
      status: formData.status,
      condition_notes: formData.condition_notes || null,
      photos: [],
      qr_code: null,
    });

    setViewMode('list');
  };

  const handleUpdateEquipment = async (formData: EquipmentFormData) => {
    if (!editingEquipment) return;

    let nextInspection: string | null = null;
    if (formData.requires_inspection && formData.last_inspection) {
      const date = new Date(formData.last_inspection);
      date.setDate(date.getDate() + formData.inspection_interval_days);
      nextInspection = date.toISOString().split('T')[0];
    }

    let calibrationDue: string | null = null;
    if (formData.requires_calibration && formData.last_calibration) {
      const date = new Date(formData.last_calibration);
      date.setDate(date.getDate() + formData.calibration_interval_days);
      calibrationDue = date.toISOString().split('T')[0];
    }

    await updateEquipment.mutateAsync({
      id: editingEquipment.id,
      updates: {
        name: formData.name,
        category: formData.category,
        serial_number: formData.serial_number || null,
        purchase_date: formData.purchase_date || null,
        purchase_price: formData.purchase_price,
        warranty_expiry: formData.warranty_expiry || null,
        location: formData.location,
        assigned_to: formData.assigned_to || null,
        last_inspection: formData.requires_inspection ? formData.last_inspection : null,
        next_inspection: nextInspection,
        inspection_interval_days: formData.inspection_interval_days,
        requires_calibration: formData.requires_calibration,
        last_calibration: formData.requires_calibration ? formData.last_calibration : null,
        calibration_due: calibrationDue,
        calibration_interval_days: formData.requires_calibration ? formData.calibration_interval_days : null,
        status: formData.status,
        condition_notes: formData.condition_notes || null,
      },
    });

    setEditingEquipment(null);
    setViewMode('list');
  };

  const handleDeleteEquipment = async () => {
    if (!deleteConfirmId) return;
    await deleteEquipment.mutateAsync(deleteConfirmId);
    setDeleteConfirmId(null);
    setExpandedCardId(null);
  };

  const handleQuickTemplate = (template: Partial<EquipmentFormData>) => {
    setEditingEquipment(null);
    setViewMode('add');
    // The template data will be passed as initial data to the form
    // Store it temporarily for the form
    sessionStorage.setItem('equipment-template', JSON.stringify(template));
  };

  const getTemplateData = (): Partial<EquipmentFormData> | undefined => {
    const stored = sessionStorage.getItem('equipment-template');
    if (stored) {
      sessionStorage.removeItem('equipment-template');
      return JSON.parse(stored);
    }
    return undefined;
  };

  // List View
  if (viewMode === 'list') {
    return (
      <div className="space-y-4 pb-6">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-primary/20 bg-card">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <BarChart3 className="h-4 w-4 text-primary" />
                <div className="text-lg font-bold text-primary">{stats.total}</div>
              </div>
              <div className="text-xs text-muted-foreground">Total Equipment</div>
            </CardContent>
          </Card>
          
          <Card className="border-green-500/20 bg-card">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <div className="text-lg font-bold text-green-400">{stats.good}</div>
              </div>
              <div className="text-xs text-muted-foreground">Good</div>
            </CardContent>
          </Card>
          
          <Card className="border-amber-500/20 bg-card">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <div className="text-lg font-bold text-amber-400">{stats.needsAttention}</div>
              </div>
              <div className="text-xs text-muted-foreground">Attention</div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive/20 bg-card">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock className="h-4 w-4 text-destructive" />
                <div className="text-lg font-bold text-destructive">{stats.overdue}</div>
              </div>
              <div className="text-xs text-muted-foreground">Overdue</div>
            </CardContent>
          </Card>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Equipment Tracker
            </h2>
            <p className="text-sm text-muted-foreground">
              Track your tools and safety equipment
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1 h-12"
            onClick={() => setViewMode('add')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => setViewMode('templates')}
          >
            <Zap className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <MobileInput
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="needs_attention">Needs Attention</SelectItem>
                      <SelectItem value="out_of_service">Out of Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Equipment List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredEquipment.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground mb-2">No equipment found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {equipment.length === 0 
                  ? "Start by adding your first piece of equipment"
                  : "Try adjusting your search or filters"
                }
              </p>
              {equipment.length === 0 && (
                <Button onClick={() => setViewMode('templates')}>
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Add from Templates
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredEquipment.map((item) => (
              <EquipmentCard
                key={item.id}
                equipment={item}
                isExpanded={expandedCardId === item.id}
                onToggleExpand={() => setExpandedCardId(
                  expandedCardId === item.id ? null : item.id
                )}
                onEdit={() => {
                  setEditingEquipment(item);
                  setViewMode('edit');
                }}
                onDelete={() => setDeleteConfirmId(item.id)}
                onMarkInspected={() => markInspected.mutate(item.id)}
                onMarkCalibrated={() => markCalibrated.mutate(item.id)}
                isDeleting={deleteEquipment.isPending}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The equipment will be permanently removed from your inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteEquipment}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Add Equipment View
  if (viewMode === 'add') {
    return (
      <AddEquipmentForm
        onSubmit={handleAddEquipment}
        onCancel={() => setViewMode('list')}
        isLoading={addEquipment.isPending}
        initialData={getTemplateData()}
      />
    );
  }

  // Edit Equipment View
  if (viewMode === 'edit' && editingEquipment) {
    return (
      <AddEquipmentForm
        onSubmit={handleUpdateEquipment}
        onCancel={() => {
          setEditingEquipment(null);
          setViewMode('list');
        }}
        isLoading={updateEquipment.isPending}
        initialData={{
          name: editingEquipment.name,
          category: editingEquipment.category,
          serial_number: editingEquipment.serial_number || '',
          purchase_date: editingEquipment.purchase_date || '',
          purchase_price: editingEquipment.purchase_price,
          warranty_expiry: editingEquipment.warranty_expiry || '',
          location: editingEquipment.location,
          assigned_to: editingEquipment.assigned_to || '',
          requires_inspection: !!editingEquipment.next_inspection,
          inspection_interval_days: editingEquipment.inspection_interval_days,
          last_inspection: editingEquipment.last_inspection || '',
          requires_calibration: editingEquipment.requires_calibration,
          calibration_interval_days: editingEquipment.calibration_interval_days || 365,
          last_calibration: editingEquipment.last_calibration || '',
          status: editingEquipment.status as 'good' | 'needs_attention' | 'out_of_service',
          condition_notes: editingEquipment.condition_notes || '',
        }}
      />
    );
  }

  // Quick Templates View
  if (viewMode === 'templates') {
    return (
      <QuickTemplates
        onSelect={handleQuickTemplate}
        onClose={() => setViewMode('list')}
      />
    );
  }

  return null;
};

export default SafetyEquipmentTracker;
