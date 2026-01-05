import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Search,
  CheckCircle,
  Car,
  Building,
  AlertTriangle,
  Phone,
  RefreshCw,
  MessageSquare
} from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveWorkerMap } from "../LiveWorkerMap";
import { useWorkerLocations } from "@/hooks/useWorkerLocations";
import { useJobs } from "@/hooks/useJobs";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { MobileBottomSheet } from "@/components/mobile/MobileBottomSheet";
import { toast } from "@/hooks/use-toast";

export function WorkerTrackingSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  // Fetch real data from Supabase
  const { data: workerLocations = [], isLoading: locationsLoading, refetch: refetchLocations } = useWorkerLocations();
  const { data: jobsData = [], isLoading: jobsLoading } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  const handleRefresh = useCallback(async () => {
    await refetchLocations();
    toast({ title: "Workers refreshed" });
  }, [refetchLocations]);

  const handleCall = (employeeName: string) => {
    toast({ title: `Calling ${employeeName}...` });
  };

  const handleMessage = (employeeName: string) => {
    toast({ title: `Messaging ${employeeName}...` });
  };

  // Transform employees to check-in format for display
  const workerCheckIns = employees.map(emp => ({
    id: emp.id,
    employeeId: emp.id,
    employeeName: emp.name,
    status: emp.status === "Active" ? "On Site" : emp.status === "On Leave" ? "On Leave" : "Office",
    jobTitle: null as string | null,
    checkInTime: "08:00",
    avatar: emp.avatar_initials,
    role: emp.team_role,
  }));

  const filteredCheckIns = workerCheckIns.filter(c => {
    const matchesSearch = c.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (c.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(c.status);
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    onSite: workerCheckIns.filter(c => c.status === "On Site").length,
    enRoute: 0,
    office: workerCheckIns.filter(c => c.status === "Office").length,
    onLeave: workerCheckIns.filter(c => c.status === "On Leave").length,
  };

  const statusOptions = [
    { value: "On Site", label: "On Site", count: statusCounts.onSite },
    { value: "En Route", label: "En Route", count: statusCounts.enRoute },
    { value: "Office", label: "Office", count: statusCounts.office },
    { value: "On Leave", label: "On Leave", count: statusCounts.onLeave },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On Site": return <CheckCircle className="h-4 w-4 text-success" />;
      case "En Route": return <Car className="h-4 w-4 text-warning" />;
      case "Office": return <Building className="h-4 w-4 text-info" />;
      case "On Leave": return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "On Site": return "default";
      case "En Route": return "secondary";
      case "Office": return "outline";
      case "On Leave": return "secondary";
      default: return "destructive";
    }
  };

  const formatTime = (time: string | null) => {
    if (!time) return "—";
    return time;
  };

  // Skeleton loading component
  const WorkerSkeleton = () => (
    <Card className="bg-elec-gray">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted skeleton-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded skeleton-shimmer" />
            <div className="h-3 w-24 bg-muted rounded skeleton-shimmer" />
          </div>
          <div className="h-8 w-8 bg-muted rounded skeleton-shimmer" />
        </div>
      </CardContent>
    </Card>
  );

  const content = (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Worker Tracking</h1>
          <p className="text-sm text-muted-foreground">Real-time location and check-in status</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full bg-elec-gray h-11"
            />
          </div>
          
          {isMobile ? (
            <MobileBottomSheet
              trigger={
                <Button variant="outline" size="icon" className="h-11 w-11 relative">
                  <Building className="h-4 w-4" />
                  {selectedStatuses.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-[10px]">
                      {selectedStatuses.length}
                    </Badge>
                  )}
                </Button>
              }
              title="Filter by Status"
              options={statusOptions}
              selected={selectedStatuses}
              onSelectionChange={setSelectedStatuses}
              multiSelect
            />
          ) : (
            <Button variant="outline" onClick={() => refetchLocations()} className="touch-feedback">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-success/10 border-success/30 touch-feedback">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{statusCounts.onSite}</p>
                <p className="text-xs text-muted-foreground">On Site</p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/30 touch-feedback">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{statusCounts.enRoute}</p>
                <p className="text-xs text-muted-foreground">En Route</p>
              </div>
              <Car className="h-6 w-6 md:h-8 md:w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/30 touch-feedback">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-info">{statusCounts.office}</p>
                <p className="text-xs text-muted-foreground">Office</p>
              </div>
              <Building className="h-6 w-6 md:h-8 md:w-8 text-info opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted border-border touch-feedback">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-muted-foreground">{statusCounts.onLeave}</p>
                <p className="text-xs text-muted-foreground">On Leave</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Filter Pills - Horizontal scroll on mobile */}
      {isMobile && (
        <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-4 px-4 py-1">
          <Badge 
            variant={selectedStatuses.length === 0 ? "default" : "outline"}
            className="cursor-pointer touch-feedback flex-shrink-0 h-8 px-3"
            onClick={() => setSelectedStatuses([])}
          >
            All ({workerCheckIns.length})
          </Badge>
          {statusOptions.map((status) => (
            <Badge 
              key={status.value}
              variant={selectedStatuses.includes(status.value) ? "default" : "outline"}
              className="cursor-pointer touch-feedback flex-shrink-0 h-8 px-3"
              onClick={() => setSelectedStatuses(prev => 
                prev.includes(status.value) ? prev.filter(s => s !== status.value) : [...prev, status.value]
              )}
            >
              {status.label} ({status.count})
            </Badge>
          ))}
        </div>
      )}

      {/* Live Mapbox Map - Hidden on mobile */}
      {!isMobile && (
        <LiveWorkerMap 
          workerLocations={workerLocations}
          jobs={jobsData}
          onRefresh={() => refetchLocations()}
          isLoading={locationsLoading || jobsLoading}
        />
      )}

      {/* Worker List */}
      <Tabs defaultValue="all" className="space-y-4">
        {!isMobile && (
          <div className="overflow-x-auto hide-scrollbar">
            <TabsList className="bg-muted inline-flex w-auto">
              <TabsTrigger value="all" className="text-sm">All ({workerCheckIns.length})</TabsTrigger>
              <TabsTrigger value="onsite" className="text-sm">On Site ({statusCounts.onSite})</TabsTrigger>
              <TabsTrigger value="enroute" className="text-sm">En Route ({statusCounts.enRoute})</TabsTrigger>
            </TabsList>
          </div>
        )}

        <TabsContent value="all" className="space-y-3 mt-0">
          {employeesLoading ? (
            <div className="space-y-3">
              <WorkerSkeleton />
              <WorkerSkeleton />
              <WorkerSkeleton />
            </div>
          ) : filteredCheckIns.length === 0 ? (
            <Card className="bg-elec-gray">
              <CardContent className="p-12 text-center">
                <Building className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No workers found</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredCheckIns.map((checkIn) => {
              const workerCard = (
                <Card className="bg-elec-gray">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm md:text-lg font-bold text-elec-yellow">
                          {checkIn.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-foreground text-sm">{checkIn.employeeName}</h4>
                          <Badge variant={getStatusBadgeVariant(checkIn.status) as any} className="text-[10px]">
                            {getStatusIcon(checkIn.status)}
                            <span className="ml-1">{checkIn.status}</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{checkIn.role}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Checked in {formatTime(checkIn.checkInTime)}</span>
                        </div>
                      </div>
                      {!isMobile && (
                        <Button variant="outline" size="sm" className="touch-feedback flex-shrink-0">
                          <Phone className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              // Wrap with swipeable on mobile
              if (isMobile) {
                return (
                  <SwipeableRow
                    key={checkIn.id}
                    leftAction={{
                      icon: <Phone className="h-5 w-5" />,
                      label: "Call",
                      onClick: () => handleCall(checkIn.employeeName),
                      variant: "success"
                    }}
                    rightAction={{
                      icon: <MessageSquare className="h-5 w-5" />,
                      label: "Message",
                      onClick: () => handleMessage(checkIn.employeeName),
                      variant: "default"
                    }}
                  >
                    {workerCard}
                  </SwipeableRow>
                );
              }

              return <div key={checkIn.id}>{workerCard}</div>;
            })
          )}
        </TabsContent>

        <TabsContent value="onsite" className="space-y-3">
          {filteredCheckIns.filter(c => c.status === "On Site").map((checkIn) => (
            <Card key={checkIn.id} className="bg-elec-gray border-success/30 touch-feedback">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{checkIn.employeeName}</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {checkIn.jobTitle} • {checkIn.checkInTime}
                      </p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-success flex-shrink-0 text-xs">On Site</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="enroute" className="space-y-3">
          {filteredCheckIns.filter(c => c.status === "En Route").map((checkIn) => (
            <Card key={checkIn.id} className="bg-elec-gray border-warning/30 touch-feedback">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                      <Car className="h-5 w-5 text-warning" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{checkIn.employeeName}</h4>
                      <p className="text-xs text-muted-foreground truncate">
                        Heading to {checkIn.jobTitle || "assignment"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0 text-xs">En Route</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}
