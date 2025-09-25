
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Plus, AlertTriangle, CheckCircle, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      notes: "All straps and buckles in good condition"
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
      notes: "Battery compartment showing signs of corrosion"
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
      notes: "Inspection overdue - requires immediate attention"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    "All", "Fall Protection", "Testing Equipment", "Access Equipment", 
    "PPE", "First Aid", "Fire Safety", "Electrical Safety"
  ];

  const statusOptions = ["All", "Good", "Needs Attention", "Out of Service", "Overdue"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-500";
      case "Needs Attention": return "bg-yellow-500";
      case "Out of Service": return "bg-red-500";
      case "Overdue": return "bg-orange-500";
      default: return "bg-gray-500";
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
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
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

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Equipment</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.good}</div>
            <div className="text-sm text-muted-foreground">Good Condition</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.needsAttention}</div>
            <div className="text-sm text-muted-foreground">Needs Attention</div>
          </CardContent>
        </Card>
        <Card className="border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{stats.overdue}</div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{stats.outOfService}</div>
            <div className="text-sm text-muted-foreground">Out of Service</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-primary/20 bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-primary flex items-center gap-2 text-xl font-bold">
              <Wrench className="h-6 w-6" />
              Safety Equipment Tracker
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:col-span-2 md:gap-4">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showAddForm && (
            <Card className="border-primary/30 mt-4 bg-card">
              <CardContent className="p-6">
                <h4 className="font-semibold text-primary mb-6 text-lg">Add New Equipment</h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="equipmentName">Equipment Name</Label>
                    <Input id="equipmentName" placeholder="Enter equipment name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Serial Number</Label>
                    <Input id="serialNumber" placeholder="Enter serial number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate">Purchase Date</Label>
                    <Input id="purchaseDate" type="date" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-6 sm:flex-row sm:justify-end">
                  <Button 
                    size="sm" 
                    onClick={() => setShowAddForm(false)}
                    variant="outline" 
                    className="order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    className="order-1 sm:order-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Add Equipment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

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
            <Card key={item.id} className="border-primary/20 bg-card hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-0">
                {/* Equipment Header */}
                <div className="relative p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                        <Wrench className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-lg text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground font-mono">{item.serialNumber}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge 
                            variant={item.status === 'Good' ? 'default' : 'destructive'}
                            className="text-xs flex items-center gap-1"
                          >
                            {getStatusIcon(item.status)}
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Inspection Due Alert - Mobile Optimized */}
                    {isInspectionDue(item.nextInspection) && (
                      <Badge variant="destructive" className="self-start flex-shrink-0">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Inspection Due</span>
                        <span className="sm:hidden">Due</span>
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Equipment Details Grid */}
                <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Inspection Details */}
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium text-sm text-primary flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Inspection Timeline
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Last Inspection</div>
                          <div className="text-sm font-medium">{item.lastInspection}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Next Inspection</div>
                          <div className={`text-sm font-medium ${isInspectionDue(item.nextInspection) ? 'text-destructive' : ''}`}>
                            {item.nextInspection}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assignment Details */}
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium text-sm text-primary flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        Assignment
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Location</div>
                          <div className="text-sm font-medium">{item.location}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Assigned To</div>
                          <div className="text-sm font-medium">{item.assignedTo}</div>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Info & Notes */}
                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg sm:col-span-2 lg:col-span-1">
                      <h4 className="font-medium text-sm text-primary">Additional Info</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Purchase Date</div>
                          <div className="text-sm font-medium">{item.purchaseDate}</div>
                        </div>
                        {item.notes && (
                          <div>
                            <div className="text-xs text-muted-foreground">Notes</div>
                            <div className="text-sm text-muted-foreground">{item.notes}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        Update Inspection
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        Edit Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        View History
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SafetyEquipmentTracker;
