
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wrench, Plus, AlertTriangle, CheckCircle, Clock, Search, 
  Calendar, MapPin, User, Edit3, Trash2, Camera, Eye,
  QrCode, TrendingUp, BarChart3, FileText, Filter, ChevronDown, ChevronUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SafetyEquipment {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  purchaseDate: string;
  lastInspection: string;
  nextInspection: string;
  status: "Good" | "Needs Attention" | "Out of Service" | "Overdue";
  location: string;
  assignedTo: string;
  notes: string;
  photos?: string[];
  maintenanceHistory?: MaintenanceEntry[];
  qrCode?: string;
  certificationExpiry?: string;
}

interface MaintenanceEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  performedBy: string;
  photos?: string[];
}

interface QuickTemplate {
  name: string;
  category: string;
  defaultLocation: string;
  inspectionInterval: number; // days
}

const SafetyEquipmentTracker = () => {
  const [equipment, setEquipment] = useState<SafetyEquipment[]>([
    {
      id: "1",
      name: "Safety Harness - Premium",
      category: "Fall Protection",
      serialNumber: "SH-2023-001",
      purchaseDate: "2023-06-15",
      lastInspection: "2024-01-10",
      nextInspection: "2024-07-10",
      status: "Good",
      location: "Van 1",
      assignedTo: "John Smith",
      notes: "All straps and buckles in good condition",
      photos: [],
      qrCode: "SH-2023-001-QR",
      certificationExpiry: "2025-06-15"
    },
    {
      id: "2",
      name: "Voltage Tester - Fluke T150",
      category: "Testing Equipment",
      serialNumber: "VT-F150-789",
      purchaseDate: "2023-03-20",
      lastInspection: "2023-12-15",
      nextInspection: "2024-06-15",
      status: "Needs Attention",
      location: "Workshop",
      assignedTo: "Mike Johnson",
      notes: "Battery compartment showing signs of corrosion",
      photos: [],
      qrCode: "VT-F150-789-QR"
    },
    {
      id: "3",
      name: "Extension Ladder - 3m",
      category: "Access Equipment",
      serialNumber: "EL-3M-456",
      purchaseDate: "2022-08-10",
      lastInspection: "2023-11-20",
      nextInspection: "2024-02-20",
      status: "Overdue",
      location: "Site Store",
      assignedTo: "Site Team",
      notes: "Inspection overdue - requires immediate attention",
      photos: [],
      qrCode: "EL-3M-456-QR"
    }
  ]);

  const quickTemplates: QuickTemplate[] = [
    { name: "Safety Harness", category: "Fall Protection", defaultLocation: "Van", inspectionInterval: 180 },
    { name: "Voltage Tester", category: "Testing Equipment", defaultLocation: "Van", inspectionInterval: 90 },
    { name: "Extension Ladder", category: "Access Equipment", defaultLocation: "Site Store", inspectionInterval: 90 },
    { name: "Hard Hat", category: "PPE", defaultLocation: "Site", inspectionInterval: 365 },
    { name: "Safety Boots", category: "PPE", defaultLocation: "Personal", inspectionInterval: 180 }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);

  // Form states
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    category: "",
    serialNumber: "",
    purchaseDate: "",
    location: "",
    assignedTo: "",
    notes: ""
  });
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const categories = [
    "All", "Fall Protection", "Testing Equipment", "Access Equipment", 
    "PPE", "First Aid", "Fire Safety", "Electrical Safety"
  ];

  const statusOptions = ["All", "Good", "Needs Attention", "Out of Service", "Overdue"];
  
  const locations = ["All", ...Array.from(new Set(equipment.map(e => e.location)))];

  const categoryIcons = {
    "Fall Protection": "🦺",
    "Testing Equipment": "⚡",
    "Access Equipment": "🪜",
    "PPE": "🥽",
    "First Aid": "🏥",
    "Fire Safety": "🧯",
    "Electrical Safety": "⚡"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "border-green-500/30 bg-green-500/10 text-green-400";
      case "Needs Attention": return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
      case "Out of Service": return "border-red-500/30 bg-red-500/10 text-red-400";
      case "Overdue": return "border-orange-500/30 bg-orange-500/10 text-orange-400";
      default: return "border-muted/30 bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Good": return <CheckCircle className="h-4 w-4" />;
      case "Needs Attention": return <AlertTriangle className="h-4 w-4" />;
      case "Out of Service": return <AlertTriangle className="h-4 w-4" />;
      case "Overdue": return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    const matchesLocation = filterLocation === "All" || item.location === filterLocation;
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const getStats = () => {
    const total = equipment.length;
    const good = equipment.filter(e => e.status === "Good").length;
    const needsAttention = equipment.filter(e => e.status === "Needs Attention").length;
    const overdue = equipment.filter(e => e.status === "Overdue").length;
    const outOfService = equipment.filter(e => e.status === "Out of Service").length;
    
    return { total, good, needsAttention, overdue, outOfService };
  };

  const stats = getStats();

  const isInspectionDue = (nextInspection: string) => {
    const today = new Date();
    const inspectionDate = new Date(nextInspection);
    const daysUntilInspection = Math.ceil((inspectionDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilInspection <= 30;
  };

  const toggleCardExpansion = (itemId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleQuickInspection = (equipmentId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const nextInspectionDate = new Date();
    nextInspectionDate.setDate(nextInspectionDate.getDate() + 90);
    
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId 
        ? { 
            ...item, 
            lastInspection: today, 
            nextInspection: nextInspectionDate.toISOString().split('T')[0],
            status: "Good" as const
          }
        : item
    ));
    
    toast({
      title: "Inspection Complete",
      description: "Equipment inspection has been updated",
      variant: "success"
    });
  };

  const handleAddFromTemplate = (template: QuickTemplate) => {
    const today = new Date();
    const nextInspection = new Date();
    nextInspection.setDate(today.getDate() + template.inspectionInterval);
    
    const newItem: SafetyEquipment = {
      id: Date.now().toString(),
      name: template.name,
      category: template.category,
      serialNumber: `${template.name.toUpperCase().replace(/\s/g, '')}-${Date.now()}`,
      purchaseDate: today.toISOString().split('T')[0],
      lastInspection: today.toISOString().split('T')[0],
      nextInspection: nextInspection.toISOString().split('T')[0],
      status: "Good",
      location: template.defaultLocation,
      assignedTo: "Unassigned",
      notes: `Added via quick template`,
      photos: [],
      qrCode: `${template.name}-${Date.now()}-QR`
    };
    
    setEquipment(prev => [...prev, newItem]);
    setShowQuickAdd(false);
    
    toast({
      title: "Equipment Added",
      description: `${template.name} has been added to your equipment list`,
      variant: "success"
    });
  };

  const handleDeleteEquipment = (equipmentId: string) => {
    setEquipment(prev => prev.filter(item => item.id !== equipmentId));
    toast({
      title: "Equipment Removed",
      description: "Equipment has been removed from your list",
      variant: "default"
    });
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
        
        <Card className="border-yellow-500/20 bg-card">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <div className="text-lg font-bold text-yellow-400">{stats.needsAttention}</div>
            </div>
            <div className="text-xs text-muted-foreground">Attention</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-500/20 bg-card">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Clock className="h-4 w-4 text-orange-400" />
              <div className="text-lg font-bold text-orange-400">{stats.overdue}</div>
            </div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
      </div>

      {/* Header with Actions */}
      <Card className="border-primary/20 bg-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-primary flex items-center gap-2 text-lg">
                <Wrench className="h-5 w-5" />
                Equipment Tracker
              </CardTitle>
              <div className="flex gap-2">
                <MobileButton
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-10 w-10"
                >
                  <Filter className="h-4 w-4" />
                </MobileButton>
                <MobileButton
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuickAdd(!showQuickAdd)}
                  className="hidden sm:flex"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Quick Add
                </MobileButton>
                <MobileButton
                  variant="elec"
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </MobileButton>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <MobileInput
                placeholder="Search by name, serial, or person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Quick Add Templates */}
      {showQuickAdd && (
        <Card className="border-primary/30 bg-card">
          <CardHeader className="pb-3">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Quick Add Templates
            </h4>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickTemplates.map((template, index) => (
                <MobileButton
                  key={index}
                  variant="outline"
                  className="h-auto p-3 justify-start"
                  onClick={() => handleAddFromTemplate(template)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg">
                      {categoryIcons[template.category as keyof typeof categoryIcons] || "📦"}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.category}</div>
                    </div>
                  </div>
                </MobileButton>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Equipment Form */}
      {showAddForm && (
        <Card className="border-primary/30 bg-card">
          <CardHeader className="pb-3">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Equipment
            </h4>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileInput
                label="Equipment Name"
                placeholder="Enter equipment name"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Select
                  value={newEquipment.category}
                  onValueChange={(value) => setNewEquipment(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          <span>{categoryIcons[category as keyof typeof categoryIcons] || "📦"}</span>
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <MobileInput
                label="Serial Number"
                placeholder="Enter serial number"
                value={newEquipment.serialNumber}
                onChange={(e) => setNewEquipment(prev => ({ ...prev, serialNumber: e.target.value }))}
              />
              
              <MobileInput
                label="Purchase Date"
                type="date"
                value={newEquipment.purchaseDate}
                onChange={(e) => setNewEquipment(prev => ({ ...prev, purchaseDate: e.target.value }))}
              />

              <MobileInput
                label="Location"
                placeholder="e.g., Van 1, Workshop"
                value={newEquipment.location}
                onChange={(e) => setNewEquipment(prev => ({ ...prev, location: e.target.value }))}
              />

              <MobileInput
                label="Assigned To"
                placeholder="Person responsible"
                value={newEquipment.assignedTo}
                onChange={(e) => setNewEquipment(prev => ({ ...prev, assignedTo: e.target.value }))}
              />
            </div>

            <MobileInput
              label="Notes"
              placeholder="Additional notes or observations"
              value={newEquipment.notes}
              onChange={(e) => setNewEquipment(prev => ({ ...prev, notes: e.target.value }))}
            />
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <MobileButton variant="elec" size="wide" className="sm:flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </MobileButton>
              <MobileButton 
                variant="outline" 
                size="wide"
                onClick={() => setShowAddForm(false)}
                className="sm:flex-1"
              >
                Cancel
              </MobileButton>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Equipment List */}
      <div className="space-y-4">
        {filteredEquipment.length === 0 ? (
          <Card className="border-dashed border-elec-yellow/50">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No equipment found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredEquipment.map((item) => (
            <Card key={item.id} className="border-elec-yellow/30 bg-elec-gray hover:border-elec-yellow/50 transition-all duration-300 animate-fade-in overflow-hidden">
              <Collapsible open={expandedCards.has(item.id)} onOpenChange={() => toggleCardExpansion(item.id)}>
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="relative px-6 pt-6 pb-4 bg-elec-gray/50">
                    <div className="flex justify-between items-start gap-2 mb-4">
                      <div className="flex-1 min-w-0"></div>
                      {isInspectionDue(item.nextInspection) && (
                        <div className="w-fit px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30 flex items-center gap-1 flex-shrink-0">
                          <Clock className="h-3 w-3" />
                          <span className="hidden sm:inline">Due</span>
                          <span className="sm:hidden">!</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {/* Equipment Name and Icon */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30 flex-shrink-0">
                          <Wrench className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <h3 className="font-bold text-lg text-white flex-1">{item.name}</h3>
                        <CollapsibleTrigger asChild>
                          <MobileButton 
                            variant="ghost" 
                            size="sm"
                            className="text-elec-yellow hover:bg-elec-yellow/10 p-2"
                          >
                            {expandedCards.has(item.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </MobileButton>
                        </CollapsibleTrigger>
                      </div>
                      
                      {/* Status and Category */}
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm rounded-lg border border-elec-yellow/20">
                          {item.category}
                        </span>
                        <div className={`px-3 py-1 ${getStatusColor(item.status)}/20 text-sm rounded-lg border flex items-center gap-2`}>
                          {getStatusIcon(item.status)}
                          <span>{item.status}</span>
                        </div>
                      </div>

                      {/* Serial Number */}
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Serial Number</div>
                        <div className="font-mono text-sm text-white/80">{item.serialNumber}</div>
                      </div>
                    </div>
                  </div>

                  <CollapsibleContent className="animate-accordion-down">
                    {/* Information Layout */}
                    <div className="p-6 space-y-6">
                      {/* Inspection Timeline */}
                      <div className="space-y-3">
                        <h4 className="text-elec-yellow font-medium text-left border-b border-elec-yellow/20 pb-2">Inspection Timeline</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="text-muted-foreground text-sm mb-1 text-left">Last Inspection</div>
                            <div className="text-white font-medium text-left">{item.lastInspection}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground text-sm mb-1 text-left">Next Inspection</div>
                            <div className={`font-medium text-left ${isInspectionDue(item.nextInspection) ? 'text-orange-400' : 'text-white'}`}>
                              {item.nextInspection}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location & Assignment */}
                      <div className="space-y-3">
                        <h4 className="text-elec-yellow font-medium text-left border-b border-elec-yellow/20 pb-2">Assignment Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                              <span className="text-muted-foreground text-sm">Location</span>
                            </div>
                            <div className="text-white font-medium text-left pl-4">{item.location}</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                              <span className="text-muted-foreground text-sm">Assigned To</span>
                            </div>
                            <div className="text-white font-medium text-left pl-4">{item.assignedTo}</div>
                          </div>
                        </div>
                      </div>

                      {/* Purchase Information */}
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          <span>Purchased on {item.purchaseDate}</span>
                        </div>
                      </div>

                      {/* Notes */}
                      {item.notes && (
                        <div className="border-l-2 border-elec-yellow/30 pl-4">
                          <div className="text-muted-foreground text-sm mb-1 text-left">Notes</div>
                          <div className="text-white/90 text-left">{item.notes}</div>
                        </div>
                      )}
                    </div>

                    {/* Flowing Action Buttons */}
                    <div className="p-8 pt-0">
                      <div className="flex flex-col xs:flex-col sm:flex-col md:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-3 md:gap-4 w-full">
                        <MobileButton 
                          variant="outline" 
                          className="flex-1"
                        >
                          Update Inspection
                        </MobileButton>
                        <MobileButton 
                          variant="outline" 
                          className="flex-1"
                        >
                          Edit Details
                        </MobileButton>
                        <MobileButton 
                          variant="outline" 
                          className="flex-1"
                        >
                          View History
                        </MobileButton>
                      </div>
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Collapsible>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SafetyEquipmentTracker;
