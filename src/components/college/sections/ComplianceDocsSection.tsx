import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  MoreVertical,
  Filter,
  FileCheck,
  Upload,
  Bell,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock compliance data
const mockComplianceItems = [
  {
    id: 'comp-1',
    staffId: 'staff-1',
    staffName: 'John Smith',
    staffInitials: 'JS',
    type: 'DBS',
    status: 'Valid',
    issueDate: '2023-03-15',
    expiryDate: '2026-03-15',
    documentUrl: '#',
  },
  {
    id: 'comp-2',
    staffId: 'staff-1',
    staffName: 'John Smith',
    staffInitials: 'JS',
    type: 'Teaching Qualification',
    status: 'Valid',
    issueDate: '2019-07-01',
    expiryDate: null,
    documentUrl: '#',
  },
  {
    id: 'comp-3',
    staffId: 'staff-2',
    staffName: 'Sarah Johnson',
    staffInitials: 'SJ',
    type: 'DBS',
    status: 'Expiring Soon',
    issueDate: '2021-02-20',
    expiryDate: '2024-02-20',
    documentUrl: '#',
  },
  {
    id: 'comp-4',
    staffId: 'staff-3',
    staffName: 'Mike Brown',
    staffInitials: 'MB',
    type: 'First Aid',
    status: 'Expired',
    issueDate: '2021-06-01',
    expiryDate: '2024-06-01',
    documentUrl: '#',
  },
  {
    id: 'comp-5',
    staffId: 'staff-2',
    staffName: 'Sarah Johnson',
    staffInitials: 'SJ',
    type: 'Assessor Award',
    status: 'Valid',
    issueDate: '2020-09-15',
    expiryDate: null,
    documentUrl: '#',
  },
];

const policyDocuments = [
  { id: 'policy-1', name: 'Safeguarding Policy', version: '3.2', lastUpdated: '2024-01-15', status: 'Current' },
  { id: 'policy-2', name: 'Health & Safety Policy', version: '2.1', lastUpdated: '2023-11-20', status: 'Current' },
  { id: 'policy-3', name: 'Data Protection Policy', version: '4.0', lastUpdated: '2024-01-10', status: 'Current' },
  { id: 'policy-4', name: 'Equality & Diversity Policy', version: '2.5', lastUpdated: '2023-08-01', status: 'Under Review' },
  { id: 'policy-5', name: 'Appeals Procedure', version: '1.3', lastUpdated: '2023-06-15', status: 'Current' },
];

export function ComplianceDocsSection() {
  const { staff } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("staff");

  // Calculate compliance stats
  const validCount = mockComplianceItems.filter(c => c.status === 'Valid').length;
  const expiringCount = mockComplianceItems.filter(c => c.status === 'Expiring Soon').length;
  const expiredCount = mockComplianceItems.filter(c => c.status === 'Expired').length;
  const pendingCount = mockComplianceItems.filter(c => c.status === 'Pending').length;

  const filteredCompliance = mockComplianceItems.filter(item => {
    const matchesSearch = item.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesType = filterType === "all" || item.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid':
      case 'Current':
        return 'bg-success/10 text-success border-success/20';
      case 'Expiring Soon':
      case 'Under Review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Expired':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Pending':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
      case 'Current':
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Expiring Soon':
      case 'Under Review':
        return <AlertTriangle className="h-3.5 w-3.5" />;
      case 'Expired':
        return <XCircle className="h-3.5 w-3.5" />;
      case 'Pending':
        return <Clock className="h-3.5 w-3.5" />;
      default:
        return <FileCheck className="h-3.5 w-3.5" />;
    }
  };

  const getUniqueTypes = () => {
    return [...new Set(mockComplianceItems.map(c => c.type))];
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Compliance Documents"
        description="Staff compliance and policy management"
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Record</span>
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <div>
                <p className="text-lg font-bold text-foreground">{validCount}</p>
                <p className="text-xs text-muted-foreground">Valid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{expiringCount}</p>
                <p className="text-xs text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-foreground">{expiredCount}</p>
                <p className="text-xs text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-info" />
              <div>
                <p className="text-lg font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(expiringCount > 0 || expiredCount > 0) && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-warning">
              <Bell className="h-4 w-4" />
              Compliance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expiredCount > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                  <span className="text-sm text-destructive font-medium">
                    {expiredCount} expired document(s) require immediate attention
                  </span>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/50">
                    View
                  </Button>
                </div>
              )}
              {expiringCount > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-warning/10">
                  <span className="text-sm text-warning font-medium">
                    {expiringCount} document(s) expiring within 3 months
                  </span>
                  <Button size="sm" variant="outline" className="text-warning border-warning/50">
                    View
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staff">Staff Compliance</TabsTrigger>
          <TabsTrigger value="policies">Policies & Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4 mt-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff or document type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Valid">Valid</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueTypes().map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Compliance List */}
          <div className="grid gap-3">
            {filteredCompliance.map((item) => (
              <Card key={item.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {item.staffInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm">{item.staffName}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Document</DropdownMenuItem>
                              <DropdownMenuItem>Update Record</DropdownMenuItem>
                              <DropdownMenuItem>Upload New</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Issued: {new Date(item.issueDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        {item.expiryDate && (
                          <div className={`flex items-center gap-1 ${
                            item.status === 'Expired' ? 'text-destructive' :
                            item.status === 'Expiring Soon' ? 'text-warning' : ''
                          }`}>
                            <Clock className="h-3 w-3" />
                            <span>
                              Expires: {new Date(item.expiryDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCompliance.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No compliance records found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Policy
            </Button>
          </div>

          <div className="grid gap-3">
            {policyDocuments.map((policy) => (
              <Card key={policy.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{policy.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Version {policy.version}</span>
                          <span>•</span>
                          <span>
                            Updated: {new Date(policy.lastUpdated).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(policy.status)}>
                        {policy.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Document</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Upload New Version</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
