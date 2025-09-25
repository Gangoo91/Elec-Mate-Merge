
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
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Safety Equipment Tracker
            </CardTitle>
            <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showAddForm && (
            <Card className="border-elec-yellow/30 mt-4">
              <CardContent className="p-4 space-y-6">
                <h4 className="font-medium text-elec-yellow">Add New Equipment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="flex gap-4">
                  <Button size="sm">Add Equipment</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
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
            <Card key={item.id} className="border-elec-yellow/30 bg-elec-gray">
              <CardContent className="p-6">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4 mb-6">
                  <div className="p-3 rounded-full bg-elec-yellow/20">
                    <Wrench className="h-6 w-6 text-elec-yellow" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl text-white">{item.name}</h3>
                    <Badge variant="outline" className="text-sm">{item.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(item.status)} text-white`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </Badge>
                    {isInspectionDue(item.nextInspection) && (
                      <Badge className="bg-orange-500 text-white">
                        <Clock className="h-3 w-3 mr-1" />
                        Inspection Due
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <div className="text-muted-foreground text-sm">Serial Number</div>
                    <div className="font-medium text-lg text-white">{item.serialNumber}</div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-muted-foreground text-sm">Last Inspection</div>
                    <div className="font-medium text-lg text-white">{item.lastInspection}</div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-muted-foreground text-sm">Next Inspection</div>
                    <div className={`font-medium text-lg ${isInspectionDue(item.nextInspection) ? 'text-orange-400' : 'text-white'}`}>
                      {item.nextInspection}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-muted-foreground text-sm">Location</div>
                    <div className="font-medium text-lg text-white">{item.location}</div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-muted-foreground text-sm">Assigned To</div>
                    <div className="font-medium text-lg text-white">{item.assignedTo}</div>
                  </div>

                  <div className="text-center space-y-1">
                    <div className="text-muted-foreground text-sm">Purchase Date</div>
                    <div className="font-medium text-lg text-white">{item.purchaseDate}</div>
                  </div>

                  {item.notes && (
                    <div className="space-y-3">
                      <div className="text-center text-muted-foreground text-sm">Notes</div>
                      <div className="p-4 bg-elec-dark rounded-lg text-center">
                        <div className="text-white">{item.notes}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full bg-elec-dark border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
                  >
                    Update Inspection
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-elec-dark border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
                  >
                    Edit Details
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-elec-dark border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
                  >
                    View History
                  </Button>
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
