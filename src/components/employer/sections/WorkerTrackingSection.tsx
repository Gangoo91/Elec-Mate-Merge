import { useState, useCallback, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  MessageSquare,
  MapPin,
  Radio,
  Users,
  Map as MapIcon,
  List,
  Navigation,
  Signal,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { LiveWorkerMap } from "../LiveWorkerMap";
import { GoogleMapsProvider } from "@/contexts/GoogleMapsContext";
import { useWorkerLocations, useCheckInWorker, useCheckOutWorker } from "@/hooks/useWorkerLocations";
import { useJobs } from "@/hooks/useJobs";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useQuery } from "@tanstack/react-query";
import { getOfficeLocation } from "@/services/settingsService";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { MobileBottomSheet } from "@/components/mobile/MobileBottomSheet";
import { toast } from "@/hooks/use-toast";

export function WorkerTrackingSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("");

  // Check-in/out mutations
  const checkInMutation = useCheckInWorker();
  const checkOutMutation = useCheckOutWorker();

  // Fetch real data from Supabase
  const { data: workerLocations = [], isLoading: locationsLoading, refetch: refetchLocations } = useWorkerLocations();
  const { data: jobsData = [], isLoading: jobsLoading } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  // Fetch office location for the map
  const { data: officeLocation } = useQuery({
    queryKey: ['office-location'],
    queryFn: getOfficeLocation,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchLocations();
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [refetchLocations]);

  const handleRefresh = useCallback(async () => {
    await refetchLocations();
    setLastUpdated(new Date());
    toast({ title: "Workers refreshed", description: "Location data updated" });
  }, [refetchLocations]);

  const handleCall = (employeeName: string) => {
    toast({ title: `Calling ${employeeName}...`, description: "Opening phone dialer" });
  };

  const handleMessage = (employeeName: string) => {
    toast({ title: `Messaging ${employeeName}...`, description: "Opening message composer" });
  };

  const handleCheckIn = async () => {
    if (!selectedEmployee || !selectedJob) {
      toast({ title: "Select employee and job", variant: "destructive" });
      return;
    }

    try {
      // Try to get GPS location, fallback to job location or default
      let lat = 53.4808; // Default Manchester
      let lng = -2.2426;

      // Get selected job's location if available
      const selectedJobData = jobsData.find(j => j.id === selectedJob);
      if (selectedJobData?.lat && selectedJobData?.lng) {
        lat = selectedJobData.lat;
        lng = selectedJobData.lng;
      }

      // Try GPS location (async, don't block if unavailable)
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 60000,
            });
          });
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        } catch {
          // GPS unavailable, use job location or default
        }
      }

      await checkInMutation.mutateAsync({
        employeeId: selectedEmployee,
        jobId: selectedJob,
        lat,
        lng,
      });

      toast({ title: "Worker checked in", description: "Location recorded successfully" });
      setIsCheckInOpen(false);
      setSelectedEmployee("");
      setSelectedJob("");
    } catch {
      toast({ title: "Check-in failed", variant: "destructive" });
    }
  };

  const handleCheckOut = async (locationId: string, employeeName: string) => {
    try {
      await checkOutMutation.mutateAsync(locationId);
      toast({ title: `${employeeName} checked out`, description: "Shift ended" });
    } catch {
      toast({ title: "Check-out failed", variant: "destructive" });
    }
  };

  // Merge location data with employee data for display
  const workerCheckIns = useMemo(() => {
    // Create map of employees with their latest location data
    const locationMap = new Map(
      workerLocations.map(loc => [loc.employee_id, loc])
    );

    return employees.map(emp => {
      const location = locationMap.get(emp.id);
      // Get job title from location's related job data
      const jobData = location?.jobs as { title?: string } | null | undefined;

      return {
        id: emp.id,
        employeeId: emp.id,
        employeeName: emp.name,
        // Use real status from location, fall back to employee status
        status: location?.status || (emp.status === "On Leave" ? "On Leave" : "Office"),
        // Get job title from the location's job relation
        jobTitle: jobData?.title || null,
        // Format real check-in time
        checkInTime: location?.checked_in_at
          ? new Date(location.checked_in_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          : null,
        avatar: emp.avatar_initials,
        role: emp.team_role,
        phone: emp.phone || null,
        // Include location data for map
        lat: location?.lat,
        lng: location?.lng,
        locationId: location?.id,
      };
    });
  }, [employees, workerLocations]);

  const filteredCheckIns = useMemo(() => workerCheckIns.filter(c => {
    const matchesSearch = c.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         (c.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(c.status);
    return matchesSearch && matchesStatus;
  }), [workerCheckIns, searchQuery, selectedStatuses]);

  const statusCounts = useMemo(() => ({
    onSite: workerCheckIns.filter(c => c.status === "On Site").length,
    enRoute: workerCheckIns.filter(c => c.status === "En Route").length,
    office: workerCheckIns.filter(c => c.status === "Office").length,
    onLeave: workerCheckIns.filter(c => c.status === "On Leave").length,
  }), [workerCheckIns]);

  const totalWorkers = workerCheckIns.length;

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

  const formatLastUpdated = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleStatusFilter = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  // Skeleton loading component
  const WorkerSkeleton = () => (
    <Card className="bg-elec-gray">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-8 w-8 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );

  const content = (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header with Live Indicator */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Worker Tracking</h1>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/10 border border-success/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                <span className="text-[10px] font-medium text-success uppercase tracking-wide">Live</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalWorkers} workers • Updated {formatLastUpdated()}
            </p>
          </div>

          {/* View Toggle for Mobile */}
          {isMobile && (
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search workers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("w-full bg-elec-gray h-11", !searchQuery && "pl-9")}
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
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={locationsLoading}
              className="touch-feedback"
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", locationsLoading && "animate-spin")} />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Status Summary Cards - Clickable to filter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
            "bg-success/10 border-success/30",
            selectedStatuses.includes("On Site") && "ring-2 ring-success ring-offset-2 ring-offset-background"
          )}
          onClick={() => toggleStatusFilter("On Site")}
        >
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
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
            "bg-warning/10 border-warning/30",
            selectedStatuses.includes("En Route") && "ring-2 ring-warning ring-offset-2 ring-offset-background"
          )}
          onClick={() => toggleStatusFilter("En Route")}
        >
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
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
            "bg-info/10 border-info/30",
            selectedStatuses.includes("Office") && "ring-2 ring-info ring-offset-2 ring-offset-background"
          )}
          onClick={() => toggleStatusFilter("Office")}
        >
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
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
            "bg-muted border-border",
            selectedStatuses.includes("On Leave") && "ring-2 ring-muted-foreground ring-offset-2 ring-offset-background"
          )}
          onClick={() => toggleStatusFilter("On Leave")}
        >
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

      {/* Active Filters Display */}
      {selectedStatuses.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Filtering:</span>
          {selectedStatuses.map(status => (
            <Badge
              key={status}
              variant="secondary"
              className="cursor-pointer hover:bg-destructive/20"
              onClick={() => toggleStatusFilter(status)}
            >
              {status}
              <span className="ml-1 text-muted-foreground">×</span>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => setSelectedStatuses([])}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Mobile Map View */}
      {isMobile && viewMode === "map" && (
        <GoogleMapsProvider>
          <LiveWorkerMap
            workerLocations={workerLocations}
            jobs={jobsData}
            officeLocation={officeLocation}
            onRefresh={handleRefresh}
            isLoading={locationsLoading || jobsLoading}
            className="h-[60vh]"
          />
        </GoogleMapsProvider>
      )}

      {/* Desktop Map */}
      {!isMobile && (
        <GoogleMapsProvider>
          <LiveWorkerMap
            workerLocations={workerLocations}
            jobs={jobsData}
            officeLocation={officeLocation}
            onRefresh={handleRefresh}
            isLoading={locationsLoading || jobsLoading}
          />
        </GoogleMapsProvider>
      )}

      {/* Worker List - Hidden on mobile map view */}
      {(!isMobile || viewMode === "list") && (
        <Tabs defaultValue="all" className="space-y-4">
          {!isMobile && (
            <div className="flex items-center justify-between">
              <div className="overflow-x-auto hide-scrollbar">
                <TabsList className="bg-muted inline-flex w-auto">
                  <TabsTrigger value="all" className="text-sm">
                    <Users className="h-4 w-4 mr-1.5" />
                    All ({workerCheckIns.length})
                  </TabsTrigger>
                  <TabsTrigger value="onsite" className="text-sm">
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    On Site ({statusCounts.onSite})
                  </TabsTrigger>
                  <TabsTrigger value="enroute" className="text-sm">
                    <Navigation className="h-4 w-4 mr-1.5" />
                    En Route ({statusCounts.enRoute})
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Signal className="h-3 w-3" />
                <span>Auto-refresh: 30s</span>
              </div>
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
              <Card className="bg-elec-gray border-dashed">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">No workers found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedStatuses.length > 0
                      ? "Try clearing your filters to see all workers"
                      : "Add employees to start tracking their locations"
                    }
                  </p>
                  {selectedStatuses.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setSelectedStatuses([])}>
                      Clear filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {filteredCheckIns.map((checkIn, index) => {
                  const workerCard = (
                    <Card
                      className={cn(
                        "bg-elec-gray hover:bg-elec-gray/80 transition-all duration-200",
                        "animate-fade-in"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm md:text-lg font-bold text-elec-yellow">
                                {checkIn.avatar}
                              </span>
                            </div>
                            {/* Status dot */}
                            <div className={cn(
                              "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-elec-gray flex items-center justify-center",
                              checkIn.status === "On Site" && "bg-success",
                              checkIn.status === "En Route" && "bg-warning",
                              checkIn.status === "Office" && "bg-info",
                              checkIn.status === "On Leave" && "bg-muted-foreground"
                            )}>
                              {checkIn.status === "On Site" && <CheckCircle className="h-2.5 w-2.5 text-white" />}
                              {checkIn.status === "En Route" && <Car className="h-2.5 w-2.5 text-white" />}
                              {checkIn.status === "Office" && <Building className="h-2.5 w-2.5 text-white" />}
                              {checkIn.status === "On Leave" && <Clock className="h-2.5 w-2.5 text-white" />}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-foreground text-sm">{checkIn.employeeName}</h4>
                              <Badge variant={getStatusBadgeVariant(checkIn.status) as any} className="text-[10px]">
                                {checkIn.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{checkIn.role}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{formatTime(checkIn.checkInTime)}</span>
                              </div>
                              {checkIn.jobTitle && (
                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span className="truncate max-w-[120px]">{checkIn.jobTitle}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {!isMobile && (
                            <div className="flex items-center gap-2">
                              {checkIn.locationId && checkIn.status === "On Site" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-9 px-3 text-destructive border-destructive/30 hover:bg-destructive/10"
                                  onClick={() => handleCheckOut(checkIn.locationId!, checkIn.employeeName)}
                                  disabled={checkOutMutation.isPending}
                                >
                                  <LogOut className="h-4 w-4 mr-1" />
                                  Out
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0"
                                onClick={() => handleMessage(checkIn.employeeName)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9 w-9 p-0"
                                onClick={() => handleCall(checkIn.employeeName)}
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );

                  // Wrap with swipeable on mobile
                  if (isMobile) {
                    // Show check-out action for workers on site, message for others
                    const rightAction = checkIn.locationId && checkIn.status === "On Site"
                      ? {
                          icon: <LogOut className="h-5 w-5" />,
                          label: "Check Out",
                          onClick: () => handleCheckOut(checkIn.locationId!, checkIn.employeeName),
                          variant: "destructive" as const
                        }
                      : {
                          icon: <MessageSquare className="h-5 w-5" />,
                          label: "Message",
                          onClick: () => handleMessage(checkIn.employeeName),
                          variant: "default" as const
                        };

                    return (
                      <SwipeableRow
                        key={checkIn.id}
                        leftAction={{
                          icon: <Phone className="h-5 w-5" />,
                          label: "Call",
                          onClick: () => handleCall(checkIn.employeeName),
                          variant: "success"
                        }}
                        rightAction={rightAction}
                      >
                        {workerCard}
                      </SwipeableRow>
                    );
                  }

                  return <div key={checkIn.id}>{workerCard}</div>;
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="onsite" className="space-y-3">
            {filteredCheckIns.filter(c => c.status === "On Site").length === 0 ? (
              <Card className="bg-elec-gray border-dashed">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-10 w-10 mx-auto text-success/30 mb-3" />
                  <p className="text-muted-foreground">No workers currently on site</p>
                </CardContent>
              </Card>
            ) : (
              filteredCheckIns.filter(c => c.status === "On Site").map((checkIn) => (
                <Card key={checkIn.id} className="bg-elec-gray border-success/30">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-success">{checkIn.avatar}</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-foreground text-sm">{checkIn.employeeName}</h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {checkIn.role} • Checked in {checkIn.checkInTime}
                          </p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-success flex-shrink-0 text-xs">On Site</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="enroute" className="space-y-3">
            {filteredCheckIns.filter(c => c.status === "En Route").length === 0 ? (
              <Card className="bg-elec-gray border-dashed">
                <CardContent className="p-8 text-center">
                  <Car className="h-10 w-10 mx-auto text-warning/30 mb-3" />
                  <p className="text-muted-foreground">No workers currently en route</p>
                </CardContent>
              </Card>
            ) : (
              filteredCheckIns.filter(c => c.status === "En Route").map((checkIn) => (
                <Card key={checkIn.id} className="bg-elec-gray border-warning/30">
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
              ))
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Mobile Quick Actions FABs */}
      {isMobile && viewMode === "list" && (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3">
          {/* Check-in FAB */}
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg bg-success text-white hover:bg-success/90"
            onClick={() => setIsCheckInOpen(true)}
          >
            <UserPlus className="h-6 w-6" />
          </Button>
          {/* Map view FAB */}
          {filteredCheckIns.length > 0 && (
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-6 w-6" />
            </Button>
          )}
        </div>
      )}

      {/* Desktop Check-in Button */}
      {!isMobile && (
        <div className="fixed bottom-8 right-8 z-40">
          <Button
            size="lg"
            className="h-12 px-6 shadow-lg bg-success text-white hover:bg-success/90"
            onClick={() => setIsCheckInOpen(true)}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Check In Worker
          </Button>
        </div>
      )}

      {/* Check-in Sheet */}
      <Sheet open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
        <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[70vh] rounded-t-2xl" : ""}>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5 text-success" />
              Check In Worker
            </SheetTitle>
            <SheetDescription>
              Record a worker's arrival at a job site
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Employee Selection */}
            <div className="space-y-2">
              <Label>Select Worker</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a worker..." />
                </SelectTrigger>
                <SelectContent>
                  {employees
                    .filter(emp => emp.status === "active" || emp.status === "Active")
                    .map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Selection */}
            <div className="space-y-2">
              <Label>Select Job Site</Label>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Choose a job..." />
                </SelectTrigger>
                <SelectContent>
                  {jobsData
                    .filter(job => job.status === "In Progress" || job.status === "Scheduled")
                    .map(job => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Check-in Button */}
            <Button
              className="w-full h-12 bg-success hover:bg-success/90"
              onClick={handleCheckIn}
              disabled={!selectedEmployee || !selectedJob || checkInMutation.isPending}
            >
              {checkInMutation.isPending ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <LogIn className="h-4 w-4 mr-2" />
              )}
              Check In to Site
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}
