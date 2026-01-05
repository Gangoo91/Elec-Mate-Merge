import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Plus, Zap, Search, Filter, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSafetyEquipment, SafetyEquipment } from "@/hooks/useSafetyEquipment";
import { EquipmentCard } from "./equipment/EquipmentCard";
import { AddEquipmentForm } from "./equipment/AddEquipmentForm";
import { QuickTemplates } from "./equipment/QuickTemplates";

export const SafetyEquipmentTracker: React.FC = () => {
  const navigate = useNavigate();
  const { equipment, isLoading, stats, addEquipment, updateEquipment, deleteEquipment, markInspected, markCalibrated } = useSafetyEquipment();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showQuickTemplates, setShowQuickTemplates] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<SafetyEquipment | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddEquipment = (data: Partial<SafetyEquipment>) => {
    addEquipment.mutate(data as any);
    setShowAddForm(false);
    setShowQuickTemplates(false);
  };

  const handleUpdateEquipment = (data: Partial<SafetyEquipment>) => {
    if (editingEquipment) {
      updateEquipment.mutate({ id: editingEquipment.id, updates: data });
      setEditingEquipment(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteEquipment = (id: string) => {
    deleteEquipment.mutate(id);
  };

  const handleMarkInspected = (item: SafetyEquipment) => {
    markInspected.mutate(item.id);
  };

  const handleMarkCalibrated = (item: SafetyEquipment) => {
    markCalibrated.mutate(item.id);
  };

  const categories = [...new Set(equipment.map(e => e.category))];

  return (
    <div className="min-h-screen bg-[#121212] pb-24">
      <div className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3">
          <button onClick={() => navigate("/electrician-tools/site-safety")} className="flex items-center gap-2 text-white active:opacity-70 transition-opacity touch-manipulation">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Package className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Equipment Tracker</h1>
            <p className="text-sm text-white/50">Manage your safety equipment</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-xs text-white/50">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.good}</p>
                  <p className="text-xs text-white/50">Good</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.needsAttention}</p>
                  <p className="text-xs text-white/50">Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.overdue}</p>
                  <p className="text-xs text-white/50">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Sheet open={showAddForm} onOpenChange={setShowAddForm}>
            <SheetTrigger asChild>
              <button className="w-full h-14 flex items-center justify-center gap-2 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation active:scale-[0.98] transition-all">
                <Plus className="h-5 w-5" />
                Add Equipment
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl bg-[#1e1e1e] border-t border-white/10">
              <SheetHeader><SheetTitle className="text-white">{editingEquipment ? "Edit Equipment" : "Add Equipment"}</SheetTitle></SheetHeader>
              <AddEquipmentForm initialData={editingEquipment || undefined} onSubmit={editingEquipment ? handleUpdateEquipment : handleAddEquipment} onCancel={() => { setShowAddForm(false); setEditingEquipment(null); }} />
            </SheetContent>
          </Sheet>
          <Sheet open={showQuickTemplates} onOpenChange={setShowQuickTemplates}>
            <SheetTrigger asChild>
              <button className="w-full h-14 flex items-center justify-center gap-2 text-base font-semibold border border-elec-yellow/30 text-elec-yellow bg-elec-yellow/10 hover:bg-elec-yellow/20 rounded-xl touch-manipulation active:scale-[0.98] transition-all">
                <Zap className="h-5 w-5" />
                Quick Add Templates
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl bg-[#1e1e1e] border-t border-white/10">
              <SheetHeader><SheetTitle className="text-white">Quick Add</SheetTitle></SheetHeader>
              <QuickTemplates onSelectTemplate={handleAddEquipment} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-14 pl-11 pr-4 rounded-xl bg-[#1a1a1a] border border-white/10 text-white placeholder:text-white/40 text-base touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 focus:border-elec-yellow/30" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className={`h-14 w-14 rounded-xl flex items-center justify-center touch-manipulation active:scale-[0.98] transition-all ${showFilters ? 'bg-elec-yellow text-black' : 'bg-[#1a1a1a] border border-white/10 text-white hover:border-white/20'}`}><Filter className="h-5 w-5" /></button>
          </div>
          {showFilters && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-14 bg-[#1a1a1a] border-white/10 text-white text-base"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  <SelectItem value="all" className="text-white">All Status</SelectItem>
                  <SelectItem value="good" className="text-white">Good</SelectItem>
                  <SelectItem value="needs_attention" className="text-white">Needs Attention</SelectItem>
                  <SelectItem value="overdue" className="text-white">Overdue</SelectItem>
                  <SelectItem value="out_of_service" className="text-white">Out of Service</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-14 bg-[#1a1a1a] border-white/10 text-white text-base"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  <SelectItem value="all" className="text-white">All</SelectItem>
                  {categories.map(cat => <SelectItem key={cat} value={cat} className="text-white">{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <Card className="bg-[#1e1e1e] border border-white/10 rounded-2xl">
              <CardContent className="py-16">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
                    <div className="h-8 w-8 animate-spin rounded-full border-3 border-elec-yellow border-t-transparent" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">Loading Equipment</p>
                    <p className="text-sm text-white/50 mt-1">Fetching your safety equipment...</p>
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
                <h3 className="text-lg font-semibold text-white mb-2">No Equipment</h3>
                <p className="text-white/50 mb-6 max-w-[280px] mx-auto">{searchQuery ? "Try a different search" : "Add your first piece of equipment to start tracking"}</p>
                {!searchQuery && (
                  <button onClick={() => setShowAddForm(true)} className="h-12 px-6 flex items-center justify-center gap-2 mx-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all">
                    <Plus className="h-5 w-5" />
                    Add Equipment
                  </button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredEquipment.map((item) => <EquipmentCard key={item.id} equipment={item} onEdit={(eq) => { setEditingEquipment(eq); setShowAddForm(true); }} onDelete={handleDeleteEquipment} onMarkInspected={handleMarkInspected} onMarkCalibrated={handleMarkCalibrated} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyEquipmentTracker;
