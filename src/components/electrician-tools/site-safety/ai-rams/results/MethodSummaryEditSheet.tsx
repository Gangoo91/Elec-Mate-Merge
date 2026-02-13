import React, { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X, Trash2, Plus, Wrench, Package, Lightbulb, AlertTriangle, LucideIcon, Search, ChevronRight, Gauge, Zap, Cable, Ruler, ArrowUp, Hammer, Flashlight, Box, Plug, Link, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { TOOLS_DATABASE, TOOL_CATEGORIES, type ToolDefinition } from '@/data/tools-database';
import { MATERIALS_DATABASE, MATERIAL_CATEGORIES, type MaterialDefinition } from '@/data/materials-database';

type SectionType = 'tools' | 'materials' | 'tips' | 'mistakes';

interface SectionConfig {
  icon: LucideIcon;
  title: string;
  placeholder: string;
  emptyMessage: string;
  hasDatabase: boolean;
  browseLabel: string;
}

const SECTION_CONFIGS: Record<SectionType, SectionConfig> = {
  tools: {
    icon: Wrench,
    title: 'Tools Required',
    placeholder: 'e.g., Multimeter',
    emptyMessage: 'No tools added yet',
    hasDatabase: true,
    browseLabel: 'Browse Tools',
  },
  materials: {
    icon: Package,
    title: 'Materials Required',
    placeholder: 'e.g., 6mm² Twin & Earth Cable',
    emptyMessage: 'No materials added yet',
    hasDatabase: true,
    browseLabel: 'Browse Materials',
  },
  tips: {
    icon: Lightbulb,
    title: 'Practical Tips',
    placeholder: 'e.g., Always verify isolation before work',
    emptyMessage: 'No tips added yet',
    hasDatabase: false,
    browseLabel: '',
  },
  mistakes: {
    icon: AlertTriangle,
    title: 'Common Mistakes',
    placeholder: 'e.g., Forgetting to test RCD',
    emptyMessage: 'No common mistakes added yet',
    hasDatabase: false,
    browseLabel: '',
  }
};

// Icons for tool categories
const TOOL_CATEGORY_ICONS: Record<string, LucideIcon> = {
  testing: Gauge,
  hand: Wrench,
  power: Zap,
  cable: Cable,
  measuring: Ruler,
  access: ArrowUp,
  fixings: Hammer,
  lighting: Flashlight,
};

// Icons for material categories
const MATERIAL_CATEGORY_ICONS: Record<string, LucideIcon> = {
  cable: Cable,
  containment: Box,
  accessories: Plug,
  distribution: Zap,
  fixings: Hammer,
  lighting: Flashlight,
  terminations: Link,
  earthing: CircleDot,
};

interface MethodSummaryEditSheetProps {
  sectionType: SectionType;
  items: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (items: string[]) => void;
}

export const MethodSummaryEditSheet: React.FC<MethodSummaryEditSheetProps> = ({
  sectionType,
  items,
  open,
  onOpenChange,
  onSave
}) => {
  const [editedItems, setEditedItems] = useState<string[]>(items);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<'items' | 'add'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const config = SECTION_CONFIGS[sectionType];
  const Icon = config.icon;

  // Get appropriate database and categories based on section type
  const isTools = sectionType === 'tools';
  const isMaterials = sectionType === 'materials';
  const database = isTools ? TOOLS_DATABASE : isMaterials ? MATERIALS_DATABASE : [];
  const categories = isTools ? TOOL_CATEGORIES : isMaterials ? MATERIAL_CATEGORIES : [];
  const categoryIcons = isTools ? TOOL_CATEGORY_ICONS : MATERIAL_CATEGORY_ICONS;

  useEffect(() => {
    setEditedItems(items);
    setHasChanges(false);
    setActiveTab(items.length === 0 ? 'add' : 'items');
    setSearchQuery('');
    setSelectedCategory('all');
  }, [items, open]);

  // Filter database for the "Add" tab
  const filteredItems = useMemo(() => {
    if (!config.hasDatabase) return [];

    return database.filter((item: ToolDefinition | MaterialDefinition) => {
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const notAlreadyAdded = !editedItems.some(
        existing => existing.toLowerCase() === item.name.toLowerCase()
      );
      return matchesSearch && matchesCategory && notAlreadyAdded;
    });
  }, [searchQuery, selectedCategory, editedItems, config.hasDatabase, database]);

  const handleItemChange = (index: number, value: string) => {
    setEditedItems(prev => prev.map((item, i) => i === index ? value : item));
    setHasChanges(true);
  };

  const handleAddItem = (value?: string) => {
    setEditedItems(prev => [...prev, value || '']);
    setHasChanges(true);
    if (!value) {
      setActiveTab('items');
    }
  };

  const handleAddFromDatabase = (item: ToolDefinition | MaterialDefinition) => {
    if (!editedItems.some(existing => existing.toLowerCase() === item.name.toLowerCase())) {
      setEditedItems(prev => [...prev, item.name]);
      setHasChanges(true);
      toast({
        title: `${isTools ? 'Tool' : 'Material'} Added`,
        description: item.name,
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setEditedItems(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleSave = () => {
    const validItems = editedItems.filter(item => item.trim());
    onSave(validItems);
    toast({
      title: `${config.title} Updated`,
      description: `${validItems.length} item${validItems.length !== 1 ? 's' : ''} saved`,
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    if (hasChanges && !confirm('You have unsaved changes. Are you sure you want to close?')) {
      return;
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[95vh] p-0 flex flex-col">
        <SheetHeader className="px-4 py-3 border-b border-white/[0.08] shrink-0">
          <SheetTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Icon className="h-5 w-5 text-elec-yellow" />
            Edit {config.title}
          </SheetTitle>
        </SheetHeader>

        {/* Tabs for tools and materials (which have database) */}
        {config.hasDatabase ? (
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'items' | 'add')} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid grid-cols-2 mx-4 mt-3 bg-white/[0.03]">
              <TabsTrigger value="items" className="data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow">
                Current ({editedItems.length})
              </TabsTrigger>
              <TabsTrigger value="add" className="data-[state=active]:bg-elec-yellow/10 data-[state=active]:text-elec-yellow">
                <Plus className="h-4 w-4 mr-1" />
                {config.browseLabel}
              </TabsTrigger>
            </TabsList>

            {/* Current Items Tab */}
            <TabsContent value="items" className="flex-1 overflow-y-auto px-4 pb-24 mt-0">
              <div className="space-y-3 py-4">
                {editedItems.length === 0 ? (
                  <div className="text-center py-8 text-white">
                    <Icon className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">{config.emptyMessage}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('add')}
                      className="mt-4 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {config.browseLabel}
                    </Button>
                  </div>
                ) : (
                  editedItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-elec-yellow" />
                      </div>
                      <Input
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                        placeholder={config.placeholder}
                        className="h-10 flex-1 border-0 bg-transparent focus-visible:ring-0 text-white px-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                        className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
                {editedItems.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => handleAddItem()}
                    className="w-full h-12 border-dashed border-white/[0.15] text-white hover:text-elec-yellow hover:border-elec-yellow/30"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Item
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Browse Tab */}
            <TabsContent value="add" className="flex-1 overflow-y-auto px-4 pb-24 mt-0">
              <div className="space-y-4 py-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${isTools ? 'tools' : 'materials'}...`}
                    className="h-11 pl-10 text-base border-white/[0.08] focus:border-elec-yellow"
                  />
                </div>

                {/* Category Filter */}
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
                  {categories.map(cat => {
                    const CatIcon = categoryIcons[cat.id] || Package;
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

                {/* Items List */}
                <div className="space-y-2">
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-6 text-white">
                      <p className="text-sm">No matching {isTools ? 'tools' : 'materials'} found</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddItem()}
                        className="mt-3 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Custom {isTools ? 'Tool' : 'Material'}
                      </Button>
                    </div>
                  ) : (
                    filteredItems.map((item: ToolDefinition | MaterialDefinition) => {
                      const CatIcon = categoryIcons[item.category] || Package;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleAddFromDatabase(item)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-elec-yellow/30 hover:bg-elec-yellow/5 transition-all text-left touch-manipulation"
                        >
                          <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                            <CatIcon className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-white block">{item.name}</span>
                            {item.description && (
                              <span className="text-xs text-white block mt-0.5">{item.description}</span>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-white shrink-0" />
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Add Custom */}
                <Button
                  variant="outline"
                  onClick={() => handleAddItem()}
                  className="w-full h-12 border-dashed border-white/[0.15] text-white hover:text-elec-yellow hover:border-elec-yellow/30"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom {isTools ? 'Tool' : 'Material'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          /* Simple list for tips, mistakes (no database) */
          <div className="flex-1 overflow-y-auto px-4 pb-24">
            <div className="flex items-center justify-between py-4">
              <Badge className="bg-white/10 text-white border-0">
                {editedItems.length} item{editedItems.length !== 1 ? 's' : ''}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddItem()}
                className="h-9 text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {editedItems.length === 0 ? (
                <div className="text-center py-8 text-white">
                  <Icon className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">{config.emptyMessage}</p>
                  <p className="text-xs mt-1">Tap "Add Item" to get started</p>
                </div>
              ) : (
                editedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                    </div>
                    <Input
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      placeholder={config.placeholder}
                      className="h-10 flex-1 border-0 bg-transparent focus-visible:ring-0 text-white px-0"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                      className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

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
            Save ({editedItems.filter(i => i.trim()).length})
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
