import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Plus, Zap, Search, Filter, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { MobileButton } from "@/components/ui/mobile-button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSafetyEquipment, SafetyEquipment } from "@/hooks/useSafetyEquipment";
import { EquipmentCard } from "./equipment/EquipmentCard";
import { AddEquipmentForm } from "./equipment/AddEquipmentForm";
import { QuickTemplates } from "./equipment/QuickTemplates";
import { toast } from "sonner";

export const SafetyEquipmentTracker: React.FC = () => {
  const navigate = useNavigate();
  const { equipment, loading, addEquipment, updateEquipment, deleteEquipment } = useSafetyEquipment();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showQuickTemplates, setShowQuickTemplates] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<SafetyEquipment | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const stats = {
    total: equipment.length,
    good: equipment.filter(e => e.status === 'good').length,
    attention: equipment.filter(e => e.status === 'attention').length,
    overdue: equipment.filter(e => e.status === 'overdue').length,
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddEquipment = async (data: Partial<SafetyEquipment>) => {
    await addEquipment(data);
    setShowAddForm(false);
    setShowQuickTemplates(false);
    toast.success("Equipment added");
  };

  const handleUpdateEquipment = async (data: Partial<SafetyEquipment>) => {
    if (editingEquipment) {
      await updateEquipment(editingEquipment.id, data);
      setEditingEquipment(null);
      setShowAddForm(false);
      toast.success("Equipment updated");
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    await deleteEquipment(id);
    toast.success("Equipment deleted");
  };

  const handleMarkInspected = async (item: SafetyEquipment) => {
    await updateEquipment(item.id, { last_inspection_date: new Date().toISOString().split('T')[0], status: 'good' });
    toast.success("Marked as inspected");
  };

  const handleMarkCalibrated = async (item: SafetyEquipment) => {
    await updateEquipment(item.id, { last_calibration_date: new Date().toISOString().split('T')[0], status: 'good' });
    toast.success("Marked as calibrated");
  };

  const categories = [...new Set(equipment.map(e => e.category))];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-3">
          <button onClick={() => navigate("/electrician-tools/site-safety")} className="flex items-center gap-2 text-foreground active:opacity-70 transition-opacity touch-manipulation">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
            <Package className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Equipment Tracker</h1>
            <p className="text-sm text-foreground/70">Manage your safety equipment</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-border/50"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center"><Shield className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold text-foreground">{stats.total}</p><p className="text-xs text-foreground/70">Total</p></div></div></CardContent></Card>
          <Card className="bg-card border-border/50"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center"><CheckCircle className="h-5 w-5 text-green-500" /></div><div><p className="text-2xl font-bold text-foreground">{stats.good}</p><p className="text-xs text-foreground/70">Good</p></div></div></CardContent></Card>
          <Card className="bg-card border-border/50"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-yellow-500" /></div><div><p className="text-2xl font-bold text-foreground">{stats.attention}</p><p className="text-xs text-foreground/70">Attention</p></div></div></CardContent></Card>
          <Card className="bg-card border-border/50"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center"><XCircle className="h-5 w-5 text-red-500" /></div><div><p className="text-2xl font-bold text-foreground">{stats.overdue}</p><p className="text-xs text-foreground/70">Overdue</p></div></div></CardContent></Card>
        </div>

        <div className="space-y-3">
          <Sheet open={showAddForm} onOpenChange={setShowAddForm}>
            <SheetTrigger asChild>
              <MobileButton variant="elec" size="wide" className="h-14 text-base font-semibold shadow-lg shadow-elec-yellow/20" icon={<Plus className="h-5 w-5" />}>Add Equipment</MobileButton>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
              <SheetHeader><SheetTitle className="text-foreground">{editingEquipment ? "Edit Equipment" : "Add Equipment"}</SheetTitle></SheetHeader>
              <AddEquipmentForm initialData={editingEquipment || undefined} onSubmit={editingEquipment ? handleUpdateEquipment : handleAddEquipment} onCancel={() => { setShowAddForm(false); setEditingEquipment(null); }} />
            </SheetContent>
          </Sheet>
          <Sheet open={showQuickTemplates} onOpenChange={setShowQuickTemplates}>
            <SheetTrigger asChild>
              <MobileButton variant="elec-outline" size="wide" className="h-14 text-base font-semibold" icon={<Zap className="h-5 w-5" />}>Quick Add Templates</MobileButton>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
              <SheetHeader><SheetTitle className="text-foreground">Quick Add</SheetTitle></SheetHeader>
              <QuickTemplates onSelectTemplate={handleAddEquipment} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
              <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-14 pl-11 pr-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-foreground/50 text-base touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`h-14 w-14 rounded-xl flex items-center justify-center touch-manipulation ${showFilters ? 'bg-elec-yellow text-elec-dark' : 'bg-card border border-border/50 text-foreground'}`}><Filter className="h-5 w-5" /></button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="h-14 bg-card border-border/50 text-foreground text-base"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="good">Good</SelectItem><SelectItem value="attention">Attention</SelectItem><SelectItem value="overdue">Overdue</SelectItem></SelectContent></Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}><SelectTrigger className="h-14 bg-card border-border/50 text-foreground text-base"><SelectValue placeholder="Category" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent></Select>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="flex flex-col items-center py-12 gap-3"><div className="h-10 w-10 animate-spin rounded-full border-4 border-elec-yellow border-t-transparent" /><p className="text-foreground/70">Loading...</p></div>
          ) : filteredEquipment.length === 0 ? (
            <Card className="bg-card border-border/50"><CardContent className="py-12 text-center"><div className="h-16 w-16 mx-auto rounded-2xl bg-elec-yellow/20 flex items-center justify-center mb-4"><Package className="h-8 w-8 text-elec-yellow" /></div><h3 className="text-lg font-semibold text-foreground mb-2">No Equipment</h3><p className="text-foreground/70 mb-6">{searchQuery ? "Try a different search" : "Add your first equipment"}</p>{!searchQuery && <MobileButton variant="elec" onClick={() => setShowAddForm(true)} icon={<Plus className="h-5 w-5" />}>Add Equipment</MobileButton>}</CardContent></Card>
          ) : (
            filteredEquipment.map((item) => <EquipmentCard key={item.id} equipment={item} onEdit={(eq) => { setEditingEquipment(eq); setShowAddForm(true); }} onDelete={handleDeleteEquipment} onMarkInspected={handleMarkInspected} onMarkCalibrated={handleMarkCalibrated} />)
          )}
        </div>
      </div>
    </div>
  );
};
