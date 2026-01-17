import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { AddTutorDialog } from "@/components/college/dialogs/AddTutorDialog";
import { useCollege } from "@/contexts/CollegeContext";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Mail,
  Phone,
  Award,
  Calendar,
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

export function TutorsSection() {
  const { staff } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [addTutorOpen, setAddTutorOpen] = useState(false);

  const tutors = staff.filter(s =>
    (s.role === 'tutor' || s.role === 'head_of_department') &&
    s.status !== 'Archived'
  );

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterRole === "all" || tutor.role === filterRole;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'On Leave': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Tutors"
        description={`${tutors.length} tutors in the department`}
        actions={
          <Button className="gap-2" onClick={() => setAddTutorOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Tutor</span>
          </Button>
        }
      />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("", !searchQuery && "pl-9")}
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="tutor">Tutor</SelectItem>
            <SelectItem value="head_of_department">Head of Dept</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tutors List */}
      <div className="grid gap-3">
        {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={tutor.photoUrl} />
                  <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                    {tutor.avatarInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{tutor.name}</h3>
                      <p className="text-sm text-muted-foreground">{tutor.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(tutor.status)}>
                        {tutor.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>View Timetable</DropdownMenuItem>
                          <DropdownMenuItem>Assign to Cohort</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {tutor.specializations.slice(0, 3).map((spec, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {tutor.specializations.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tutor.specializations.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[150px]">{tutor.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{tutor.phone}</span>
                    </div>
                    {tutor.maxTeachingHours && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{tutor.maxTeachingHours}h/week</span>
                      </div>
                    )}
                  </div>

                  {/* Qualifications */}
                  <div className="flex items-center gap-2 mt-3">
                    <Award className="h-3.5 w-3.5 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {tutor.teachingQual && (
                        <Badge variant="outline" className="text-xs bg-success/5">
                          {tutor.teachingQual}
                        </Badge>
                      )}
                      {tutor.assessorQual && (
                        <Badge variant="outline" className="text-xs bg-info/5">
                          {tutor.assessorQual}
                        </Badge>
                      )}
                      {tutor.iqaQual && (
                        <Badge variant="outline" className="text-xs bg-warning/5">
                          {tutor.iqaQual}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTutors.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No tutors found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <AddTutorDialog open={addTutorOpen} onOpenChange={setAddTutorOpen} />
    </div>
  );
}
