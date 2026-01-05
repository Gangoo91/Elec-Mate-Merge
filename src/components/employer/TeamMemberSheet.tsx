import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEmployer, type Employee, type AvailabilityStatus } from "@/contexts/EmployerContext";
import { AddNoteDialog } from "@/components/employer/dialogs/AddNoteDialog";
import { CreateElecIDForEmployeeDialog } from "@/components/employer/dialogs/CreateElecIDForEmployeeDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useElecIdProfileByEmployee } from "@/hooks/useElecId";
import { 
  Phone, Mail, MessageSquare, Briefcase, Award, 
  MapPin, ChevronRight, UserCog, Star, AlertTriangle, 
  X, PoundSterling, AlertCircle, StickyNote, Plus, Zap, IdCard, ExternalLink
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { TeamRole } from "@/data/employerMockData";

const roleColors: Record<TeamRole, string> = {
  "QS": "bg-elec-yellow/20 text-elec-yellow",
  "Supervisor": "bg-info/20 text-info",
  "Operative": "bg-success/20 text-success",
  "Apprentice": "bg-warning/20 text-warning",
  "Project Manager": "bg-elec-yellow/20 text-elec-yellow",
};

const availabilityColors: Record<AvailabilityStatus, string> = {
  "Available": "bg-success",
  "On Job": "bg-info",
  "On Leave": "bg-warning",
  "Unavailable": "bg-muted-foreground",
};

const noteTypeColors: Record<string, string> = {
  'General': 'border-muted-foreground/30',
  'Performance': 'border-info',
  'Incident': 'border-warning',
  'Positive': 'border-success',
};

interface TeamMemberSheetProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onAssignToJob?: () => void;
  onSendMessage?: () => void;
}

export function TeamMemberSheet({ 
  employee, 
  open, 
  onOpenChange, 
  onEdit,
  onAssignToJob,
  onSendMessage
}: TeamMemberSheetProps) {
  const isMobile = useIsMobile();
  const { certifications, getEmployeeAssignments, removeEmployeeFromJob, setEmployeeRating } = useEmployer();
  const [activeTab, setActiveTab] = useState("details");
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [createElecIdOpen, setCreateElecIdOpen] = useState(false);
  
  const { data: elecIdProfile, isLoading: elecIdLoading } = useElecIdProfileByEmployee(employee?.id || "");

  if (!employee) return null;

  const employeeAssignments = getEmployeeAssignments(employee.id);
  const employeeCerts = certifications.filter(c => c.employeeId === employee.id);
  const expiringSoonCerts = employeeCerts.filter(c => c.status === "Warning" || c.status === "Expired");

  const handleCall = () => window.location.href = `tel:${employee.phone}`;
  const handleEmergencyCall = () => {
    if (employee.emergencyContact) {
      window.location.href = `tel:${employee.emergencyContact.phone}`;
    }
  };

  // Shared content for both Sheet and Drawer
  const ProfileContent = () => (
    <>
      {/* Header with large photo - fixed height, no shrink */}
      <div className="px-4 md:px-6 pt-4 pb-2 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          {/* Large photo with availability ring */}
          <div className="relative">
            <div className={`p-1 rounded-full ${availabilityColors[employee.availability]}`}>
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-background">
                <AvatarImage src={employee.photo} alt={employee.name} />
                <AvatarFallback className="text-2xl md:text-3xl font-bold bg-elec-yellow/10 text-elec-yellow">
                  {employee.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* Verification badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-elec-yellow flex items-center justify-center border-2 border-background">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-elec-dark" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-foreground truncate">{employee.name}</h2>
            <p className="text-sm md:text-base text-muted-foreground">{employee.role}</p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <Badge className={`text-xs ${roleColors[employee.teamRole]}`}>{employee.teamRole}</Badge>
              <Badge variant="outline" className={`text-xs ${availabilityColors[employee.availability].replace('bg-', 'border-').replace('bg-', 'text-')}`}>
                {employee.availability}
              </Badge>
              {employee.rating > 0 && (
                <Badge variant="outline" className="border-warning/50 text-warning text-xs">
                  <Star className="h-3 w-3 mr-0.5 fill-warning" />{employee.rating}
                </Badge>
              )}
              {expiringSoonCerts.length > 0 && (
                <Badge variant="outline" className="border-warning text-warning text-xs">
                  <AlertTriangle className="h-3 w-3 mr-0.5" />{expiringSoonCerts.length}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Quick action bar */}
        <div className="flex gap-2">
          <Button className="flex-1 gap-2" variant="outline" onClick={handleCall}>
            <Phone className="h-4 w-4 text-success" />
            Call
          </Button>
          <Button className="flex-1 gap-2" variant="outline" onClick={onSendMessage}>
            <MessageSquare className="h-4 w-4 text-info" />
            Message
          </Button>
          <Button className="flex-1 gap-2" onClick={onAssignToJob}>
            <Briefcase className="h-4 w-4" />
            Assign
          </Button>
        </div>
      </div>

      {/* Tabs - flex-1 with overflow handling */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="px-4 md:px-6 border-b border-border flex-shrink-0">
          <TabsList className="w-full justify-start gap-0 bg-transparent h-auto p-0">
            <TabsTrigger value="details" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm">Details</TabsTrigger>
            <TabsTrigger value="jobs" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm">Jobs</TabsTrigger>
            <TabsTrigger value="creds" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm">Credentials</TabsTrigger>
            <TabsTrigger value="notes" className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm">Notes</TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable content area with explicit height */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 md:p-6">
            {/* Details Tab */}
            <TabsContent value="details" className="mt-0 space-y-4">
              {/* Contact */}
              <div className="space-y-2">
                <button onClick={handleCall} className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-elec-gray border border-border hover:bg-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{employee.phone}</p>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
                
                <button onClick={() => window.location.href = `mailto:${employee.email}`} className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-elec-gray border border-border hover:bg-accent transition-colors">
                  <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{employee.email}</p>
                    <p className="text-xs text-muted-foreground">Email</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Emergency Contact */}
              {employee.emergencyContact && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />Emergency Contact
                  </h4>
                  <button onClick={handleEmergencyCall} className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{employee.emergencyContact.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.emergencyContact.relationship} • {employee.emergencyContact.phone}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>
              )}

              {/* Pay Rates */}
              {(employee.dayRate || employee.hourlyRate) && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-elec-gray border border-border text-center">
                    <p className="text-2xl font-bold text-elec-yellow">£{employee.dayRate}</p>
                    <p className="text-xs text-muted-foreground">Day Rate</p>
                  </div>
                  <div className="p-4 rounded-xl bg-elec-gray border border-border text-center">
                    <p className="text-2xl font-bold text-elec-yellow">£{employee.hourlyRate}</p>
                    <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  </div>
                </div>
              )}

              {/* Skills */}
              {employee.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-warning" />Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs py-1 px-3">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Performance Rating</h4>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => { setEmployeeRating(employee.id, star); toast({ title: "Rating Updated" }); }} className="p-1">
                      <Star className={`h-7 w-7 transition-colors ${star <= employee.rating ? 'text-warning fill-warning' : 'text-muted-foreground/30 hover:text-warning/50'}`} />
                    </button>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">{employee.rating} / 5</span>
                </div>
              </div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Current Assignments</h4>
                <Button size="sm" variant="outline" className="gap-1" onClick={onAssignToJob}>
                  <Plus className="h-3 w-3" />Assign
                </Button>
              </div>
              {employeeAssignments.length > 0 ? (
                <div className="space-y-2">
                  {employeeAssignments.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-elec-gray border border-border">
                      <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{a.jobTitle}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{a.jobLocation}
                        </p>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => { removeEmployeeFromJob(a.id); toast({ title: "Removed from Job" }); }}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No active assignments</p>
                </div>
              )}
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="creds" className="mt-0 space-y-4">
              {/* Elec-ID Section */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-elec-yellow" />
                  Elec-ID Profile
                </h4>
                {elecIdLoading ? (
                  <div className="p-4 rounded-xl bg-elec-gray border border-border animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                ) : elecIdProfile ? (
                  <div className="p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                          <IdCard className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{elecIdProfile.elec_id_number}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="capitalize">{elecIdProfile.ecs_card_type} Card</span>
                            {elecIdProfile.is_verified && (
                              <Badge variant="outline" className="border-success text-success text-[10px]">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <ExternalLink className="h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setCreateElecIdOpen(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-colors text-center"
                  >
                    <IdCard className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">No Elec-ID Profile</p>
                    <p className="text-xs text-muted-foreground/70">Click to set up digital ID</p>
                  </button>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <h4 className="font-medium">Certifications ({employeeCerts.length})</h4>
                {employeeCerts.length > 0 ? (
                  <div className="space-y-2">
                    {employeeCerts.map((cert) => (
                      <div key={cert.id} className={`p-3 rounded-xl bg-elec-gray border border-border border-l-4 ${cert.status === 'Expired' ? 'border-l-destructive' : cert.status === 'Warning' ? 'border-l-warning' : 'border-l-success'}`}>
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-foreground truncate">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          </div>
                          <Badge variant="outline" className={`text-xs ml-2 ${cert.status === 'Expired' ? 'border-destructive text-destructive' : cert.status === 'Warning' ? 'border-warning text-warning' : 'border-success text-success'}`}>
                            {cert.status === 'Expired' ? 'Expired' : cert.status === 'Warning' ? `${cert.daysRemaining}d left` : 'Active'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No certifications on file</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Notes ({employee.notes.length})</h4>
                <Button size="sm" variant="outline" className="gap-1" onClick={() => setAddNoteOpen(true)}>
                  <Plus className="h-3 w-3" />Add Note
                </Button>
              </div>
              {employee.notes.length > 0 ? (
                <div className="space-y-2">
                  {employee.notes.map((note) => (
                    <Card key={note.id} className={`border-l-4 ${noteTypeColors[note.type]}`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-1">
                          <Badge variant="secondary" className="text-xs">{note.type}</Badge>
                          <span className="text-xs text-muted-foreground">{new Date(note.createdAt).toLocaleDateString('en-GB')}</span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">— {note.authorName}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <StickyNote className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No notes yet</p>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Footer actions - fixed at bottom */}
      <div className="p-4 md:p-6 border-t border-border flex gap-2 flex-shrink-0">
        <Button variant="outline" className="flex-1 gap-2" onClick={onEdit}>
          <UserCog className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
    </>
  );

  // Mobile: Bottom Drawer
  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="max-h-[92vh] flex flex-col">
            <ProfileContent />
          </DrawerContent>
        </Drawer>
        <AddNoteDialog employee={employee} open={addNoteOpen} onOpenChange={setAddNoteOpen} />
        <CreateElecIDForEmployeeDialog
          employeeId={employee.id}
          employeeName={employee.name}
          open={createElecIdOpen}
          onOpenChange={setCreateElecIdOpen}
        />
      </>
    );
  }

  // Desktop: Side Sheet
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
          <ProfileContent />
        </SheetContent>
      </Sheet>
      <AddNoteDialog employee={employee} open={addNoteOpen} onOpenChange={setAddNoteOpen} />
      <CreateElecIDForEmployeeDialog
        employeeId={employee.id}
        employeeName={employee.name}
        open={createElecIdOpen}
        onOpenChange={setCreateElecIdOpen}
      />
    </>
  );
}
