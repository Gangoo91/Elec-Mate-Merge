import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Compliance data - empty until backend integration
interface ComplianceItem {
  id: string;
  staffName: string;
  staffInitials: string;
  type: string;
  status: string;
  issueDate: string;
  expiryDate?: string;
}
const mockComplianceItems: ComplianceItem[] = [];

// Policy documents - empty until backend integration
interface PolicyDocument {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
  status: string;
}
const policyDocuments: PolicyDocument[] = [];

export function ComplianceDocsSection() {
  const { staff } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('staff');

  // Calculate compliance stats
  const validCount = mockComplianceItems.filter((c) => c.status === 'Valid').length;
  const expiringCount = mockComplianceItems.filter((c) => c.status === 'Expiring Soon').length;
  const expiredCount = mockComplianceItems.filter((c) => c.status === 'Expired').length;
  const pendingCount = mockComplianceItems.filter((c) => c.status === 'Pending').length;

  const filteredCompliance = mockComplianceItems.filter((item) => {
    const matchesSearch =
      item.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;

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
        return 'bg-muted text-white';
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
    return [...new Set(mockComplianceItems.map((c) => c.type))];
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Compliance Documents"
        description="Staff compliance and policy management"
        actions={
          <Button
            className="gap-2 h-11 touch-manipulation"
            onClick={() =>
              toast({
                title: 'Add Compliance Record',
                description: 'Compliance document management is coming soon.',
              })
            }
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Record</span>
          </Button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-success/10 border-success/20 touch-manipulation">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <div>
                <p className="text-lg font-bold text-white">{validCount}</p>
                <p className="text-xs text-white">Valid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20 touch-manipulation">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-white">{expiringCount}</p>
                <p className="text-xs text-white">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20 touch-manipulation">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-white">{expiredCount}</p>
                <p className="text-xs text-white">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 touch-manipulation">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-info" />
              <div>
                <p className="text-lg font-bold text-white">{pendingCount}</p>
                <p className="text-xs text-white">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(expiringCount > 0 || expiredCount > 0) && (
        <Card className="border-warning/50 bg-warning/5 touch-manipulation">
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive/50 h-11 touch-manipulation"
                  >
                    View
                  </Button>
                </div>
              )}
              {expiringCount > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-warning/10">
                  <span className="text-sm text-warning font-medium">
                    {expiringCount} document(s) expiring within 3 months
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-warning border-warning/50 h-11 touch-manipulation"
                  >
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
          <TabsTrigger value="staff" className="h-11 touch-manipulation">
            Staff Compliance
          </TabsTrigger>
          <TabsTrigger value="policies" className="h-11 touch-manipulation">
            Policies & Procedures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4 mt-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
              )}
              <Input
                placeholder="Search staff or document type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn('touch-manipulation', !searchQuery && 'pl-9')}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[150px] h-11 touch-manipulation">
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
              <SelectTrigger className="w-full sm:w-[180px] h-11 touch-manipulation">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {getUniqueTypes().map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Compliance List */}
          <div className="grid gap-3">
            {filteredCompliance.map((item) => (
              <Card key={item.id} className="hover:shadow-sm transition-shadow touch-manipulation">
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
                          <p className="font-medium text-sm text-white">{item.staffName}</p>
                          <p className="text-xs text-white">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(item.status)} flex items-center gap-1`}
                          >
                            {getStatusIcon(item.status)}
                            {item.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-11 w-11 touch-manipulation"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="h-11 touch-manipulation"
                                onClick={() =>
                                  toast({
                                    title: 'View Document',
                                    description: 'Document viewing is coming soon.',
                                  })
                                }
                              >
                                View Document
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11 touch-manipulation"
                                onClick={() =>
                                  toast({
                                    title: 'Update Record',
                                    description: 'Record updating is coming soon.',
                                  })
                                }
                              >
                                Update Record
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11 touch-manipulation"
                                onClick={() =>
                                  toast({
                                    title: 'Upload New',
                                    description: 'Document uploads are coming soon.',
                                  })
                                }
                              >
                                Upload New
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11 touch-manipulation"
                                onClick={() =>
                                  toast({
                                    title: 'Send Reminder',
                                    description: 'Compliance reminders are coming soon.',
                                  })
                                }
                              >
                                Send Reminder
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs text-white">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Issued:{' '}
                            {new Date(item.issueDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        {item.expiryDate && (
                          <div
                            className={`flex items-center gap-1 ${
                              item.status === 'Expired'
                                ? 'text-destructive'
                                : item.status === 'Expiring Soon'
                                  ? 'text-warning'
                                  : ''
                            }`}
                          >
                            <Clock className="h-3 w-3" />
                            <span>
                              Expires:{' '}
                              {new Date(item.expiryDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
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
              <Card className="touch-manipulation">
                <CardContent className="p-8 text-center">
                  <p className="text-white">No compliance records found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button
              className="gap-2 h-11 touch-manipulation"
              onClick={() =>
                toast({
                  title: 'Upload Policy',
                  description: 'Policy document management is coming soon.',
                })
              }
            >
              <Upload className="h-4 w-4" />
              Upload Policy
            </Button>
          </div>

          <div className="grid gap-3">
            {policyDocuments.map((policy) => (
              <Card
                key={policy.id}
                className="hover:shadow-sm transition-shadow touch-manipulation"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">{policy.name}</p>
                        <div className="flex items-center gap-2 text-xs text-white">
                          <span>Version {policy.version}</span>
                          <span>.</span>
                          <span>
                            Updated:{' '}
                            {new Date(policy.lastUpdated).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-11 w-11 touch-manipulation"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() =>
                              toast({
                                title: 'View Document',
                                description: 'Document viewing is coming soon.',
                              })
                            }
                          >
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() =>
                              toast({
                                title: 'Download PDF',
                                description: 'PDF downloads are coming soon.',
                              })
                            }
                          >
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() =>
                              toast({
                                title: 'Upload New Version',
                                description: 'Version uploads are coming soon.',
                              })
                            }
                          >
                            Upload New Version
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="h-11 touch-manipulation"
                            onClick={() =>
                              toast({
                                title: 'View History',
                                description: 'Version history is coming soon.',
                              })
                            }
                          >
                            View History
                          </DropdownMenuItem>
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
