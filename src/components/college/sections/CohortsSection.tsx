import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { NewCohortDialog } from "@/components/college/dialogs/NewCohortDialog";
import { useCollege } from "@/contexts/CollegeContext";
import {
  Search,
  Plus,
  Users,
  Calendar,
  Clock,
  MapPin,
  UserCog,
  MoreVertical,
  Filter,
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

export function CohortsSection() {
  const { cohorts, getCohortAttendanceRate } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [newCohortOpen, setNewCohortOpen] = useState(false);

  const filteredCohorts = cohorts.filter(cohort => {
    const matchesSearch = cohort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cohort.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cohort.courseName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || cohort.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'Planning': return 'bg-info/10 text-info border-info/20';
      case 'Completed': return 'bg-muted text-muted-foreground';
      case 'Cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDeliveryModeColor = (mode: string) => {
    switch (mode) {
      case 'Block Release': return 'bg-primary/10 text-primary';
      case 'Day Release': return 'bg-info/10 text-info';
      case 'In-person': return 'bg-success/10 text-success';
      case 'Online': return 'bg-warning/10 text-warning';
      case 'Hybrid': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Cohorts"
        description={`${cohorts.filter(c => c.status === 'Active').length} active cohorts`}
        actions={
          <Button className="gap-2" onClick={() => setNewCohortOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Cohort</span>
          </Button>
        }
      />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cohorts..."
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
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cohorts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCohorts.map((cohort) => {
          const attendanceRate = getCohortAttendanceRate(cohort.id);
          const capacityPercent = (cohort.currentStudents / cohort.maxStudents) * 100;

          return (
            <Card key={cohort.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{cohort.name}</h3>
                    <p className="text-sm text-muted-foreground">{cohort.code}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(cohort.status)}>
                      {cohort.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Cohort</DropdownMenuItem>
                        <DropdownMenuItem>View Students</DropdownMenuItem>
                        <DropdownMenuItem>Take Register</DropdownMenuItem>
                        <DropdownMenuItem>Timetable</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{cohort.courseName}</p>

                {/* Capacity Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{cohort.currentStudents}/{cohort.maxStudents} students</span>
                  </div>
                  <Progress value={capacityPercent} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getDeliveryModeColor(cohort.deliveryMode)}>
                    {cohort.deliveryMode}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {attendanceRate}% attendance
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <UserCog className="h-3.5 w-3.5" />
                    <span className="truncate">{cohort.leadTutorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{cohort.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{cohort.meetingDay}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{cohort.meetingTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t text-xs text-muted-foreground">
                  <span>
                    {new Date(cohort.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span>→</span>
                  <span>
                    {new Date(cohort.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredCohorts.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No cohorts found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <NewCohortDialog open={newCohortOpen} onOpenChange={setNewCohortOpen} />
    </div>
  );
}
