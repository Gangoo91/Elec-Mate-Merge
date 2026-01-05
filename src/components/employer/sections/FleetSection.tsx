import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { 
  Car, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Fuel,
  MapPin,
  ChevronDown,
  ChevronUp,
  Plus,
  Clock,
  Wrench
} from "lucide-react";
import { companyVehicles, fuelLogs } from "@/data/employerMockData";
import { toast } from "@/hooks/use-toast";

export function FleetSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"vehicles" | "fuel">("vehicles");

  const filteredVehicles = companyVehicles.filter(v =>
    v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExpiryStatus = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { status: "expired", color: "text-destructive", bg: "bg-destructive/10" };
    if (daysUntil < 30) return { status: "due", color: "text-warning", bg: "bg-warning/10" };
    return { status: "ok", color: "text-success", bg: "bg-success/10" };
  };

  const activeVehicles = companyVehicles.filter(v => v.status === "Active").length;
  const motDueCount = companyVehicles.filter(v => getExpiryStatus(v.motExpiry).status !== "ok").length;
  const totalMileage = companyVehicles.reduce((sum, v) => sum + v.mileage, 0);
  const monthlyFuelCost = fuelLogs.reduce((sum, f) => sum + f.cost, 0);

  const handleLogFuel = () => {
    toast({
      title: "Log Fuel",
      description: "Fuel entry form would open here.",
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Fleet Management"
        description="Vehicles, MOT tracking, and fuel logs"
        action={
          <Button size="sm" className="gap-2" onClick={handleLogFuel}>
            <Fuel className="h-4 w-4" />
            <span className="hidden sm:inline">Log Fuel</span>
          </Button>
        }
      />

      {/* Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Car className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeVehicles}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        {motDueCount > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{motDueCount}</p>
                <p className="text-xs text-muted-foreground">MOT Due</p>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{(totalMileage / 1000).toFixed(0)}k</p>
              <p className="text-xs text-muted-foreground">Total Miles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Fuel className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">£{monthlyFuelCost.toFixed(0)}</p>
              <p className="text-xs text-muted-foreground">Fuel (Feb)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 -mx-4 px-4 md:mx-0 md:px-0">
        <Badge 
          variant={activeTab === "vehicles" ? "default" : "outline"}
          className="cursor-pointer touch-feedback"
          onClick={() => setActiveTab("vehicles")}
        >
          Vehicles ({companyVehicles.length})
        </Badge>
        <Badge 
          variant={activeTab === "fuel" ? "default" : "outline"}
          className="cursor-pointer touch-feedback"
          onClick={() => setActiveTab("fuel")}
        >
          Fuel Logs ({fuelLogs.length})
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vehicles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-elec-gray border-border"
        />
      </div>

      {activeTab === "vehicles" ? (
        <div className="space-y-3">
          {filteredVehicles.map((vehicle) => {
            const isExpanded = expandedCard === vehicle.id;
            const motStatus = getExpiryStatus(vehicle.motExpiry);
            const taxStatus = getExpiryStatus(vehicle.taxExpiry);

            return (
              <Card key={vehicle.id} className="bg-elec-gray border-border overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    className="p-4 cursor-pointer touch-feedback"
                    onClick={() => setExpandedCard(isExpanded ? null : vehicle.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Car className="h-4 w-4 text-elec-yellow" />
                          <h3 className="font-bold text-foreground">{vehicle.registration}</h3>
                          {(motStatus.status !== "ok" || taxStatus.status !== "ok") && (
                            <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {vehicle.make} {vehicle.model} • {vehicle.colour}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {vehicle.assignedTo}
                          </Badge>
                          <span className="text-muted-foreground">
                            {vehicle.mileage.toLocaleString()} miles
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge 
                          className={`${vehicle.status === "Active" ? "bg-success/20 text-success" : vehicle.status === "Available" ? "bg-info/20 text-info" : "bg-muted text-muted-foreground"} border-0`}
                        >
                          {vehicle.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Expiry indicators */}
                    <div className="flex gap-2 mt-3">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${motStatus.bg}`}>
                        <Calendar className={`h-3 w-3 ${motStatus.color}`} />
                        <span className={motStatus.color}>MOT: {new Date(vehicle.motExpiry).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${taxStatus.bg}`}>
                        <Clock className={`h-3 w-3 ${taxStatus.color}`} />
                        <span className={taxStatus.color}>Tax: {new Date(vehicle.taxExpiry).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                      </div>
                    </div>

                    <div className="flex justify-center mt-2">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-border p-4 bg-muted/30 space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">MOT Expiry:</span>
                          <p className={`font-medium ${motStatus.color}`}>
                            {new Date(vehicle.motExpiry).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tax Expiry:</span>
                          <p className={`font-medium ${taxStatus.color}`}>
                            {new Date(vehicle.taxExpiry).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Insurance Expiry:</span>
                          <p className="font-medium">
                            {new Date(vehicle.insuranceExpiry).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Service:</span>
                          <p className="font-medium">
                            {new Date(vehicle.lastService).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Service:</span>
                          <p className="font-medium">
                            {new Date(vehicle.nextService).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tracker:</span>
                          <p className="font-medium flex items-center gap-1">
                            {vehicle.trackerFitted ? (
                              <><CheckCircle className="h-3 w-3 text-success" /> Fitted</>
                            ) : (
                              <><AlertTriangle className="h-3 w-3 text-warning" /> Not fitted</>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Wrench className="h-4 w-4 mr-2" />
                          Service
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Fuel className="h-4 w-4 mr-2" />
                          Log Fuel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {fuelLogs.map((log) => (
            <Card key={log.id} className="bg-elec-gray border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Fuel className="h-4 w-4 text-elec-yellow" />
                      <h3 className="font-semibold text-foreground">{log.registration}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{log.location}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">
                        {log.litres}L
                      </span>
                      <span className="text-muted-foreground">
                        {log.mileage.toLocaleString()} miles
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-foreground">£{log.cost.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredVehicles.length === 0 && activeTab === "vehicles" && (
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-8 text-center">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No vehicles found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}