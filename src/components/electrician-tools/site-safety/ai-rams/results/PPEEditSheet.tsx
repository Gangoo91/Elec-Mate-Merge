import React, { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X, Trash2, ShieldCheck, Plus, HardHat, Eye, Hand, Footprints, Ear, Zap, Wind, ArrowDown, Sun, Shield, ChevronRight, Sparkles, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PPEItem } from '@/types/rams';
import { toast } from '@/hooks/use-toast';
import { PPE_DATABASE, PPE_CATEGORIES, PPE_PRESETS, type PPEDefinition, type PPEPresetKey } from '@/data/ppe-database';

interface PPEEditSheetProps {
  ppeItems: PPEItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (ppeItems: PPEItem[]) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  head: HardHat,
  eye: Eye,
  hearing: Ear,
  respiratory: Wind,
  hand: Hand,
  body: Shield,
  foot: Footprints,
  fall: ArrowDown,
  electrical: Zap,
  visibility: Sun,
};

const getPPEIcon = (ppeType: string) => {
  const type = ppeType.toLowerCase();
  if (type.includes('helmet') || type.includes('hat') || type.includes('hood')) return HardHat;
  if (type.includes('eye') || type.includes('goggles') || type.includes('glasses') || type.includes('face') || type.includes('shield')) return Eye;
  if (type.includes('glove') || type.includes('insulating glove')) return Hand;
  if (type.includes('boot') || type.includes('footwear') || type.includes('shoe') || type.includes('wellington')) return Footprints;
  if (type.includes('ear') || type.includes('hearing') || type.includes('defender')) return Ear;
  if (type.includes('respiratory') || type.includes('mask') || type.includes('ffp')) return Wind;
  if (type.includes('harness') || type.includes('lanyard') || type.includes('fall')) return ArrowDown;
  if (type.includes('hi-vis') || type.includes('visibility')) return Sun;
  if (type.includes('arc') || type.includes('insulating') || type.includes('voltage') || type.includes('electrical')) return Zap;
  return ShieldCheck;
};

export const PPEEditSheet: React.FC<PPEEditSheetProps> = ({
  ppeItems,
  open,
  onOpenChange,
  onSave
}) => {
  const [editedItems, setEditedItems] = useState<PPEItem[]>(ppeItems);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<'items' | 'add'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setEditedItems(ppeItems);
    setHasChanges(false);
    setActiveTab('items');
    setSearchQuery('');
    setSelectedCategory('all');
  }, [ppeItems, open]);

  // Filter PPE database based on search and category
  const filteredPPE = useMemo(() => {
    return PPE_DATABASE.filter(ppe => {
      const matchesSearch = searchQuery === '' ||
        ppe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ppe.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ppe.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || ppe.category === selectedCategory;
      // Don't show items already added
      const notAlreadyAdded = !editedItems.some(
        item => item.ppeType.toLowerCase() === ppe.name.toLowerCase()
      );
      return matchesSearch && matchesCategory && notAlreadyAdded;
    });
  }, [searchQuery, selectedCategory, editedItems]);

  const handleItemChange = (id: string, updates: Partial<PPEItem>) => {
    setEditedItems(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
    setHasChanges(true);
  };

  const handleAddFromDatabase = (ppeDef: PPEDefinition) => {
    const newItem: PPEItem = {
      id: `ppe-${Date.now()}`,
      itemNumber: editedItems.length + 1,
      ppeType: ppeDef.name,
      standard: ppeDef.standard,
      mandatory: ppeDef.mandatory,
      purpose: ppeDef.purpose
    };
    setEditedItems(prev => [...prev, newItem]);
    setHasChanges(true);
    toast({
      title: 'PPE Added',
      description: `${ppeDef.name} added with ${ppeDef.standard}`,
    });
  };

  const handleAddCustom = () => {
    const newItem: PPEItem = {
      id: `ppe-${Date.now()}`,
      itemNumber: editedItems.length + 1,
      ppeType: '',
      standard: '',
      mandatory: true,
      purpose: ''
    };
    setEditedItems(prev => [...prev, newItem]);
    setHasChanges(true);
    setActiveTab('items');
  };

  const handleApplyPreset = (presetKey: PPEPresetKey) => {
    const presetIds = PPE_PRESETS[presetKey];
    const newItems: PPEItem[] = [];

    presetIds.forEach((ppeId, idx) => {
      const ppeDef = PPE_DATABASE.find(p => p.id === ppeId);
      if (ppeDef && !editedItems.some(item => item.ppeType.toLowerCase() === ppeDef.name.toLowerCase())) {
        newItems.push({
          id: `ppe-${Date.now()}-${idx}`,
          itemNumber: editedItems.length + newItems.length + 1,
          ppeType: ppeDef.name,
          standard: ppeDef.standard,
          mandatory: ppeDef.mandatory,
          purpose: ppeDef.purpose
        });
      }
    });

    if (newItems.length > 0) {
      setEditedItems(prev => [...prev, ...newItems]);
      setHasChanges(true);
      toast({
        title: 'Preset Applied',
        description: `Added ${newItems.length} PPE items`,
      });
    } else {
      toast({
        title: 'No New Items',
        description: 'All items from this preset are already added',
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    setEditedItems(prev => prev.filter(item => item.id !== id).map((item, idx) => ({
      ...item,
      itemNumber: idx + 1
    })));
    setHasChanges(true);
  };

  const handleSave = () => {
    const validItems = editedItems.filter(item => item.ppeType.trim());
    onSave(validItems);
    toast({
      title: 'PPE Updated',
      description: `${validItems.length} PPE item${validItems.length !== 1 ? 's' : ''} saved`,
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    if (hasChanges && !confirm('You have unsaved changes. Are you sure you want to close?')) {
      return;
    }
    onOpenChange(false);
  };

  // Find matching PPE definition for autocomplete
  const findMatchingPPE = (ppeType: string): PPEDefinition | undefined => {
    return PPE_DATABASE.find(p =>
      p.name.toLowerCase() === ppeType.toLowerCase() ||
      p.name.toLowerCase().includes(ppeType.toLowerCase())
    );
  };

  const handlePPETypeChange = (id: string, value: string) => {
    const match = findMatchingPPE(value);
    if (match) {
      handleItemChange(id, {
        ppeType: match.name,
        standard: match.standard,
        purpose: match.purpose,
        mandatory: match.mandatory
      });
    } else {
      handleItemChange(id, { ppeType: value });
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] p-0 flex flex-col">
        <SheetHeader className="px-4 py-3 border-b border-white/[0.08] shrink-0">
          <SheetTitle className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-elec-yellow" />
            Edit PPE Requirements
          </SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'items' | 'add')} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid grid-cols-2 mx-4 mt-3 bg-white/[0.03]">
            <TabsTrigger value="items" className="data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow">
              Current ({editedItems.length})
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow">
              <Plus className="h-4 w-4 mr-1" />
              Add PPE
            </TabsTrigger>
          </TabsList>

          {/* Current Items Tab */}
          <TabsContent value="items" className="flex-1 overflow-y-auto px-4 pb-24 mt-0">
            <div className="space-y-3 py-4">
              {editedItems.length === 0 ? (
                <div className="text-center py-8 text-white">
                  <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No PPE items yet</p>
                  <p className="text-xs mt-1">Tap "Add PPE" to add requirements</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab('add')}
                    className="mt-4 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add PPE
                  </Button>
                </div>
              ) : (
                editedItems.map((item, index) => {
                  const Icon = getPPEIcon(item.ppeType);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      {/* Item Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-elec-yellow" />
                          </div>
                          <span className="text-xs font-bold text-white">#{index + 1}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* PPE Type - with database suggestions */}
                      <div className="space-y-1.5 mb-3">
                        <label className="text-xs font-medium text-white">PPE Type</label>
                        <Select
                          value={item.ppeType}
                          onValueChange={(value) => handlePPETypeChange(item.id, value)}
                        >
                          <SelectTrigger className="h-11 text-base border-white/[0.08] focus:border-elec-yellow bg-transparent">
                            <SelectValue placeholder="Select PPE type..." />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] bg-[#1c1c1e] border-white/[0.08]">
                            {item.ppeType && !PPE_DATABASE.some(p => p.name === item.ppeType) && (
                              <SelectItem value={item.ppeType}>
                                {item.ppeType} (Custom)
                              </SelectItem>
                            )}
                            {PPE_CATEGORIES.map(cat => {
                              const catItems = PPE_DATABASE.filter(p => p.category === cat.id);
                              if (catItems.length === 0) return null;
                              const CatIcon = CATEGORY_ICONS[cat.id] || ShieldCheck;
                              return (
                                <React.Fragment key={cat.id}>
                                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-2 bg-[#1c1c1e] sticky top-0 z-10">
                                    <CatIcon className="h-3 w-3" />
                                    {cat.name}
                                  </div>
                                  {catItems.map(ppe => (
                                    <SelectItem key={ppe.id} value={ppe.name}>
                                      {ppe.name}
                                    </SelectItem>
                                  ))}
                                </React.Fragment>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Standard - auto-filled but editable */}
                      <div className="space-y-1.5 mb-3">
                        <label className="text-xs font-medium text-white">BS EN Standard</label>
                        <Input
                          value={item.standard}
                          onChange={(e) => handleItemChange(item.id, { standard: e.target.value })}
                          placeholder="e.g., BS EN 397"
                          className="h-11 text-base border-white/[0.08] focus:border-elec-yellow"
                        />
                      </div>

                      {/* Purpose - auto-filled but editable */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white">Purpose</label>
                        <Input
                          value={item.purpose}
                          onChange={(e) => handleItemChange(item.id, { purpose: e.target.value })}
                          placeholder="e.g., Head protection from falling objects"
                          className="h-11 text-base border-white/[0.08] focus:border-elec-yellow"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>

          {/* Add PPE Tab */}
          <TabsContent value="add" className="flex-1 overflow-y-auto px-4 pb-24 mt-0">
            <div className="space-y-4 py-4">
              {/* Quick Presets */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wide">Quick Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'domestic-electrical', label: 'Domestic', icon: '🏠' },
                    { key: 'commercial-electrical', label: 'Commercial', icon: '🏢' },
                    { key: 'industrial-electrical', label: 'Industrial', icon: '🏭' },
                    { key: 'live-lv-working', label: 'Live LV Work', icon: '⚡' },
                    { key: 'hv-switching', label: 'HV Switching', icon: '🔌' },
                    { key: 'height-work', label: 'Height Work', icon: '🪜' },
                  ].map(preset => (
                    <button
                      key={preset.key}
                      onClick={() => handleApplyPreset(preset.key as PPEPresetKey)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-left hover:border-elec-yellow/30 hover:bg-elec-yellow/5 transition-all touch-manipulation"
                    >
                      <span className="text-lg">{preset.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-white block">{preset.label}</span>
                        <span className="text-[10px] text-white">
                          {PPE_PRESETS[preset.key as PPEPresetKey].length} items
                        </span>
                      </div>
                      <Sparkles className="h-4 w-4 text-elec-yellow/50" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Search & Filter */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wide">Browse PPE Database</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search PPE, standards..."
                    className="h-11 pl-10 text-base border-white/[0.08] focus:border-elec-yellow"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all touch-manipulation",
                      selectedCategory === 'all'
                        ? "bg-elec-yellow text-black"
                        : "bg-white/[0.05] text-white hover:bg-white/[0.08]"
                    )}
                  >
                    All
                  </button>
                  {PPE_CATEGORIES.map(cat => {
                    const CatIcon = CATEGORY_ICONS[cat.id];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all touch-manipulation",
                          selectedCategory === cat.id
                            ? "bg-elec-yellow text-black"
                            : "bg-white/[0.05] text-white hover:bg-white/[0.08]"
                        )}
                      >
                        <CatIcon className="h-3 w-3" />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PPE List */}
              <div className="space-y-2">
                {filteredPPE.length === 0 ? (
                  <div className="text-center py-6 text-white">
                    <p className="text-sm">No matching PPE found</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddCustom}
                      className="mt-3 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Custom PPE
                    </Button>
                  </div>
                ) : (
                  filteredPPE.map(ppe => {
                    const CatIcon = CATEGORY_ICONS[ppe.category] || ShieldCheck;
                    return (
                      <button
                        key={ppe.id}
                        onClick={() => handleAddFromDatabase(ppe)}
                        className="w-full flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-elec-yellow/30 hover:bg-elec-yellow/5 transition-all text-left touch-manipulation"
                      >
                        <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                          <CatIcon className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-medium text-white">{ppe.name}</span>
                            {ppe.mandatory && (
                              <Badge className="bg-elec-yellow/10 text-elec-yellow border-0 text-[9px] shrink-0">
                                Mandatory
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-elec-yellow/80 font-mono mt-0.5">{ppe.standard}</p>
                          <p className="text-xs text-white mt-1 line-clamp-2">{ppe.purpose}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white shrink-0 mt-1" />
                      </button>
                    );
                  })
                )}
              </div>

              {/* Add Custom Button */}
              <Button
                variant="outline"
                onClick={handleAddCustom}
                className="w-full h-12 border-dashed border-white/[0.15] text-white hover:text-elec-yellow hover:border-elec-yellow/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Custom PPE Item
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Fixed Bottom Action Bar */}
        <div className="shrink-0 bg-background border-t border-white/[0.08] p-4 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 min-h-[48px] border-white/[0.08]"
            onClick={handleClose}
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </Button>
          <Button
            className="flex-1 min-h-[48px] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-card"
            onClick={handleSave}
          >
            <Save className="h-5 w-5 mr-2" />
            Save ({editedItems.filter(i => i.ppeType.trim()).length})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
