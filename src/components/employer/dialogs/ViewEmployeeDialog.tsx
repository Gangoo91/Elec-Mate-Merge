import { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogFooter,
  ResponsiveDialogBody,
} from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/employer/StatusBadge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEmployer, type Employee } from "@/contexts/EmployerContext";
import { AddNoteDialog } from "@/components/employer/dialogs/AddNoteDialog";
import { 
  Phone, Mail, MessageSquare, Calendar, Shield, FileCheck, 
  Briefcase, Award, Clock, MapPin, ChevronRight, UserCog,
  Send, Star, TrendingUp, AlertTriangle, X, PoundSterling, 
  AlertCircle, StickyNote, Plus, Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type TeamRole = "QS" | "Supervisor" | "Operative" | "Apprentice" | "Project Manager";

const roleColors: Record<TeamRole, string> = {
  "QS": "bg-elec-yellow/20 text-elec-yellow",
  "Supervisor": "bg-info/20 text-info",
  "Operative": "bg-success/20 text-success",
  "Apprentice": "bg-warning/20 text-warning",
  "Project Manager": "bg-elec-yellow/20 text-elec-yellow",
};

const noteTypeColors: Record<string, string> = {
  'General': 'border-muted-foreground/30',
  'Performance': 'border-info',
  'Incident': 'border-warning',
  'Positive': 'border-success',
};

interface ViewEmployeeDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onAssignToJob?: () => void;
  onSendMessage?: () => void;
}

export function ViewEmployeeDialog({ 
  employee, 
  open, 
  onOpenChange, 
  onEdit,
  onAssignToJob,
  onSendMessage
}: ViewEmployeeDialogProps) {
  const isMobile = useIsMobile();
  const { certifications, timesheets, getEmployeeAssignments, removeEmployeeFromJob, setEmployeeRating } = useEmployer();
  const [activeTab, setActiveTab] = useState("profile");
  const [addNoteOpen, setAddNoteOpen] = useState(false);

  if (!employee) return null;

  const employeeAssignments = getEmployeeAssignments(employee.id);
  const employeeCerts = certifications.filter(c => c.employeeId === employee.id);
  const expiringSoonCerts = employeeCerts.filter(c => c.status === "Warning" || c.status === "Expired");
  const employeeTimesheets = timesheets.filter(t => t.employeeId === employee.id).slice(0, 5);
  const hoursThisWeek = employeeTimesheets.reduce((acc, t) => acc + t.totalHours, 0);

  const handleCall = () => window.location.href = `tel:${employee.phone}`;
  const handleEmail = () => window.location.href = `mailto:${employee.email}`;
  const handleEmergencyCall = () => {
    if (employee.emergencyContact) {
      window.location.href = `tel:${employee.emergencyContact.phone}`;
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-2xl">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 rounded-t-lg" />

        {/* Fixed Header */}
        <ResponsiveDialogHeader className="pr-12">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-elec-yellow/10 flex items-center justify-center text-xl md:text-2xl font-bold text-elec-yellow flex-shrink-0 border border-elec-yellow/20">
              {employee.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <ResponsiveDialogTitle className="text-lg font-bold truncate pr-2">{employee.name}</ResponsiveDialogTitle>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <StatusBadge status={employee.status} />
                <Badge className={`text-xs ${roleColors[employee.teamRole]}`}>{employee.teamRole}</Badge>
                {employee.rating > 0 && (
                  <Badge variant="outline" className="border-warning/50 text-warning text-xs">
                    <Star className="h-3 w-3 mr-1 fill-warning" />{employee.rating}
                  </Badge>
                )}
                {expiringSoonCerts.length > 0 && (
                  <Badge variant="outline" className="border-warning text-warning text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />{expiringSoonCerts.length}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
            <Button size="sm" variant="outline" className="gap-1.5 flex-shrink-0 text-xs h-11 touch-manipulation" onClick={handleCall}>
              <Phone className="h-3.5 w-3.5 text-success" />Call
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 flex-shrink-0 text-xs h-11 touch-manipulation" onClick={onSendMessage}>
              <MessageSquare className="h-3.5 w-3.5 text-info" />Message
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5 flex-shrink-0 text-xs h-11 touch-manipulation" onClick={onAssignToJob}>
              <Briefcase className="h-3.5 w-3.5 text-warning" />Assign
            </Button>
          </div>
        </ResponsiveDialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className="px-4 md:px-6 border-b border-border overflow-x-auto hide-scrollbar shrink-0">
            <TabsList className="w-auto justify-start gap-1 bg-transparent h-auto p-0">
              <TabsTrigger value="profile" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3 py-2 text-xs h-11 touch-manipulation">Profile</TabsTrigger>
              <TabsTrigger value="jobs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3 py-2 text-xs h-11 touch-manipulation">Jobs</TabsTrigger>
              <TabsTrigger value="certs" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3 py-2 text-xs h-11 touch-manipulation">Certs</TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-3 py-2 text-xs h-11 touch-manipulation">Notes</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-0 space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Contact Details</h4>
                  <Card className="border-border/50">
                    <CardContent className="p-3 space-y-3">
                      <button onClick={handleCall} className="flex items-center gap-3 w-full text-left hover:bg-muted/50 -mx-1 px-1 py-1 rounded-md">
                        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center"><Phone className="h-4 w-4 text-success" /></div>
                        <div className="flex-1"><p className="text-sm font-medium">{employee.phone}</p><p className="text-xs text-muted-foreground">Mobile</p></div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button onClick={handleEmail} className="flex items-center gap-3 w-full text-left hover:bg-muted/50 -mx-1 px-1 py-1 rounded-md">
                        <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center"><Mail className="h-4 w-4 text-elec-yellow" /></div>
                        <div className="flex-1"><p className="text-sm font-medium truncate">{employee.email}</p><p className="text-xs text-muted-foreground">Email</p></div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Contact */}
                {employee.emergencyContact && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><AlertCircle className="h-4 w-4 text-destructive" />Emergency Contact</h4>
                    <Card className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-3">
                        <button onClick={handleEmergencyCall} className="flex items-center gap-3 w-full text-left">
                          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"><Phone className="h-4 w-4 text-destructive" /></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{employee.emergencyContact.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.emergencyContact.relationship} • {employee.emergencyContact.phone}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Pay Rates */}
                {(employee.dayRate || employee.hourlyRate) && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><PoundSterling className="h-4 w-4 text-elec-yellow" />Pay Rates</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-2xl font-bold text-elec-yellow">£{employee.dayRate}</p><p className="text-xs text-muted-foreground">Day Rate</p></CardContent></Card>
                      <Card className="border-border/50"><CardContent className="p-3 text-center"><p className="text-2xl font-bold text-elec-yellow">£{employee.hourlyRate}</p><p className="text-xs text-muted-foreground">Hourly Rate</p></CardContent></Card>
                    </div>
                  </div>
                )}

                {/* Skills */}
                {employee.skills.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Zap className="h-4 w-4 text-warning" />Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {employee.skills.map(skill => <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>)}
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Performance Rating</h4>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => { setEmployeeRating(employee.id, star); toast({ title: "Rating Updated" }); }}>
                        <Star className={`h-6 w-6 cursor-pointer transition-colors ${star <= employee.rating ? 'text-warning fill-warning' : 'text-muted-foreground hover:text-warning/50'}`} />
                      </button>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">{employee.rating} / 5</span>
                  </div>
                </div>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Current Assignments ({employeeAssignments.length})</h4>
                  <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={onAssignToJob}><Briefcase className="h-3 w-3" />Assign</Button>
                </div>
                {employeeAssignments.length > 0 ? (
                  <div className="space-y-2">
                    {employeeAssignments.map((a) => (
                      <Card key={a.id} className="border-l-2 border-l-primary">
                        <CardContent className="p-3 flex items-start justify-between gap-2">
                          <div><p className="font-medium text-sm">{a.jobTitle}</p><p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{a.jobLocation}</p></div>
                          <Button size="icon" variant="ghost" className="h-9 w-9 sm:h-6 sm:w-6 text-muted-foreground hover:text-destructive" onClick={() => { removeEmployeeFromJob(a.id); toast({ title: "Removed from Job" }); }}><X className="h-3 w-3" /></Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed"><CardContent className="p-6 text-center"><Briefcase className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">No active assignments</p></CardContent></Card>
                )}
              </TabsContent>

              {/* Certs Tab */}
              <TabsContent value="certs" className="mt-0 space-y-4">
                <h4 className="text-sm font-semibold">Certifications ({employeeCerts.length})</h4>
                {employeeCerts.length > 0 ? (
                  <div className="space-y-2">
                    {employeeCerts.map((cert) => (
                      <Card key={cert.id} className={`border-l-2 ${cert.status === 'Expired' ? 'border-l-destructive' : cert.status === 'Warning' ? 'border-l-warning' : 'border-l-success'}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between"><div><p className="font-medium text-sm truncate">{cert.name}</p><p className="text-xs text-muted-foreground">{cert.issuer}</p></div>
                            <Badge variant="outline" className={`text-xs ${cert.status === 'Expired' ? 'border-destructive text-destructive' : cert.status === 'Warning' ? 'border-warning text-warning' : ''}`}>{cert.status === 'Expired' ? 'Expired' : cert.status === 'Warning' ? `${cert.daysRemaining}d` : 'Active'}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : <Card className="border-dashed"><CardContent className="p-6 text-center"><Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">No certifications</p></CardContent></Card>}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Notes ({employee.notes.length})</h4>
                  <Button size="sm" variant="outline" className="gap-1 text-xs h-11 touch-manipulation" onClick={() => setAddNoteOpen(true)}><Plus className="h-3 w-3" />Add Note</Button>
                </div>
                {employee.notes.length > 0 ? (
                  <div className="space-y-2">
                    {employee.notes.map((note) => (
                      <Card key={note.id} className={`border-l-2 ${noteTypeColors[note.type]}`}>
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
                ) : <Card className="border-dashed"><CardContent className="p-6 text-center"><StickyNote className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">No notes yet</p></CardContent></Card>}
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <ResponsiveDialogFooter className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-2 h-11 touch-manipulation" onClick={onEdit}><UserCog className="h-4 w-4" />Edit</Button>
          <Button className="flex-1 gap-2 h-11 touch-manipulation" onClick={onSendMessage}><Send className="h-4 w-4" />Message</Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>

      <AddNoteDialog employee={employee} open={addNoteOpen} onOpenChange={setAddNoteOpen} />
    </ResponsiveDialog>
  );
}