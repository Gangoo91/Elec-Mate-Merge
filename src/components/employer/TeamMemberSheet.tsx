import { useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEmployer, type Employee, type AvailabilityStatus } from '@/contexts/EmployerContext';
import { AddNoteDialog } from '@/components/employer/dialogs/AddNoteDialog';
import { CreateElecIDForEmployeeDialog } from '@/components/employer/dialogs/CreateElecIDForEmployeeDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useElecIdProfileByEmployee } from '@/hooks/useElecId';
import { PrimaryButton, SecondaryButton } from './editorial';
import {
  Phone,
  Mail,
  MessageSquare,
  Briefcase,
  Award,
  MapPin,
  ChevronRight,
  UserCog,
  Star,
  AlertTriangle,
  X,
  PoundSterling,
  AlertCircle,
  StickyNote,
  Plus,
  Zap,
  IdCard,
  ExternalLink,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { TeamRole } from '@/data/employerMockData';

const roleColors: Record<TeamRole, string> = {
  QS: 'bg-elec-yellow/20 text-elec-yellow',
  Supervisor: 'bg-blue-500/20 text-blue-400',
  Operative: 'bg-emerald-500/20 text-emerald-400',
  Apprentice: 'bg-amber-500/20 text-amber-400',
  'Project Manager': 'bg-elec-yellow/20 text-elec-yellow',
};

const availabilityColors: Record<AvailabilityStatus, string> = {
  Available: 'bg-emerald-500',
  'On Job': 'bg-blue-500',
  'On Leave': 'bg-amber-500',
  Unavailable: 'bg-white/20',
};

const noteTypeColors: Record<string, string> = {
  General: 'border-white/20',
  Performance: 'border-blue-500',
  Incident: 'border-amber-500',
  Positive: 'border-emerald-500',
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
  onSendMessage,
}: TeamMemberSheetProps) {
  const isMobile = useIsMobile();
  const { certifications, getEmployeeAssignments, removeEmployeeFromJob, setEmployeeRating } =
    useEmployer();
  const [activeTab, setActiveTab] = useState('details');
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [createElecIdOpen, setCreateElecIdOpen] = useState(false);

  const { data: elecIdProfile, isLoading: elecIdLoading } = useElecIdProfileByEmployee(
    employee?.id || ''
  );

  if (!employee) return null;

  const employeeAssignments = getEmployeeAssignments(employee.id);
  const employeeCerts = certifications.filter((c) => c.employeeId === employee.id);
  const expiringSoonCerts = employeeCerts.filter(
    (c) => c.status === 'Warning' || c.status === 'Expired'
  );

  const handleCall = () => (window.location.href = `tel:${employee.phone}`);
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
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-[hsl(0_0%_8%)]">
                <AvatarImage src={employee.photo} alt={employee.name} />
                <AvatarFallback className="text-2xl md:text-3xl font-bold bg-elec-yellow/10 text-elec-yellow">
                  {employee.avatar}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* Verification badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-elec-yellow flex items-center justify-center border-2 border-[hsl(0_0%_8%)]">
              <Award className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-white truncate">
              {employee.name}
            </h2>
            <p className="text-sm md:text-base text-white">{employee.role}</p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <Badge className={`text-xs ${roleColors[employee.teamRole]}`}>
                {employee.teamRole}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-white/20 text-white"
              >
                {employee.availability}
              </Badge>
              {employee.rating > 0 && (
                <Badge variant="outline" className="border-amber-500/50 text-amber-400 text-xs">
                  <Star className="h-3 w-3 mr-0.5 fill-amber-400" />
                  {employee.rating}
                </Badge>
              )}
              {expiringSoonCerts.length > 0 && (
                <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                  <AlertTriangle className="h-3 w-3 mr-0.5" />
                  {expiringSoonCerts.length}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Quick action bar */}
        <div className="flex gap-2">
          <SecondaryButton className="flex-1" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-2 text-emerald-400" />
            Call
          </SecondaryButton>
          <SecondaryButton className="flex-1" onClick={onSendMessage}>
            <MessageSquare className="h-4 w-4 mr-2 text-blue-400" />
            Message
          </SecondaryButton>
          <PrimaryButton className="flex-1" onClick={onAssignToJob}>
            <Briefcase className="h-4 w-4 mr-2" />
            Assign
          </PrimaryButton>
        </div>
      </div>

      {/* Tabs - flex-1 with overflow handling */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col min-h-0 overflow-hidden"
      >
        <div className="px-4 md:px-6 border-b border-white/[0.06] flex-shrink-0">
          <TabsList className="w-full justify-start gap-0 bg-transparent h-auto p-0">
            <TabsTrigger
              value="details"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm text-white"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm text-white"
            >
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="creds"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm text-white"
            >
              Credentials
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow rounded-none px-2 py-3 text-sm text-white"
            >
              Notes
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable content area with explicit height */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 md:p-6">
            {/* Details Tab */}
            <TabsContent value="details" className="mt-0 space-y-4">
              {/* Contact */}
              <div className="space-y-2">
                <button
                  onClick={handleCall}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{employee.phone}</p>
                    <p className="text-xs text-white">Mobile</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>

                <button
                  onClick={() => (window.location.href = `mailto:${employee.email}`)}
                  className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                >
                  <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{employee.email}</p>
                    <p className="text-xs text-white">Email</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Emergency Contact */}
              {employee.emergencyContact && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    Emergency Contact
                  </h4>
                  <button
                    onClick={handleEmergencyCall}
                    className="flex items-center gap-3 w-full text-left p-3 rounded-xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors touch-manipulation"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{employee.emergencyContact.name}</p>
                      <p className="text-xs text-white">
                        {employee.emergencyContact.relationship} • {employee.emergencyContact.phone}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
              )}

              {/* Pay Rates */}
              {(employee.dayRate || employee.hourlyRate) && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-center">
                    <p className="text-2xl font-bold text-elec-yellow">£{employee.dayRate}</p>
                    <p className="text-xs text-white">Day Rate</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-center">
                    <p className="text-2xl font-bold text-elec-yellow">£{employee.hourlyRate}</p>
                    <p className="text-xs text-white">Hourly Rate</p>
                  </div>
                </div>
              )}

              {/* Skills */}
              {employee.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs py-1 px-3 bg-white/[0.06] text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Performance Rating</h4>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setEmployeeRating(employee.id, star);
                        toast({ title: 'Rating Updated' });
                      }}
                      className="p-1"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${star <= employee.rating ? 'text-amber-400 fill-amber-400' : 'text-white hover:text-amber-400/50'}`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-white ml-2">{employee.rating} / 5</span>
                </div>
              </div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Current Assignments</h4>
                <SecondaryButton size="sm" onClick={onAssignToJob}>
                  <Plus className="h-3 w-3 mr-1" />
                  Assign
                </SecondaryButton>
              </div>
              {employeeAssignments.length > 0 ? (
                <div className="space-y-2">
                  {employeeAssignments.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
                    >
                      <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{a.jobTitle}</p>
                        <p className="text-xs text-white flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {a.jobLocation}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="h-8 w-8 flex items-center justify-center rounded-full text-white hover:bg-red-500/10 hover:text-red-400 touch-manipulation"
                        onClick={() => {
                          removeEmployeeFromJob(a.id);
                          toast({ title: 'Removed from Job' });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="h-10 w-10 text-white mx-auto mb-2" />
                  <p className="text-sm text-white">No active assignments</p>
                </div>
              )}
            </TabsContent>

            {/* Credentials Tab */}
            <TabsContent value="creds" className="mt-0 space-y-4">
              {/* Elec-ID Section */}
              <div className="space-y-2">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-elec-yellow" />
                  Elec-ID Profile
                </h4>
                {elecIdLoading ? (
                  <div className="p-4 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] animate-pulse">
                    <div className="h-4 bg-white/[0.06] rounded w-3/4"></div>
                  </div>
                ) : elecIdProfile ? (
                  <div className="p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                          <IdCard className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {elecIdProfile.elec_id_number}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-white">
                            <span className="capitalize">{elecIdProfile.ecs_card_type} Card</span>
                            {elecIdProfile.is_verified && (
                              <Badge
                                variant="outline"
                                className="border-emerald-500 text-emerald-400 text-[10px]"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <SecondaryButton size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </SecondaryButton>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setCreateElecIdOpen(true)}
                    className="w-full p-4 rounded-xl border border-dashed border-white/20 hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-colors text-center touch-manipulation"
                  >
                    <IdCard className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">No Elec-ID Profile</p>
                    <p className="text-xs text-white">Click to set up digital ID</p>
                  </button>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <h4 className="font-medium text-white">Certifications ({employeeCerts.length})</h4>
                {employeeCerts.length > 0 ? (
                  <div className="space-y-2">
                    {employeeCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className={`p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-4 ${cert.status === 'Expired' ? 'border-l-red-500' : cert.status === 'Warning' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white truncate">{cert.name}</p>
                            <p className="text-xs text-white">{cert.issuer}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ml-2 ${cert.status === 'Expired' ? 'border-red-500 text-red-400' : cert.status === 'Warning' ? 'border-amber-500 text-amber-400' : 'border-emerald-500 text-emerald-400'}`}
                          >
                            {cert.status === 'Expired'
                              ? 'Expired'
                              : cert.status === 'Warning'
                                ? `${cert.daysRemaining}d left`
                                : 'Active'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-sm text-white">No certifications on file</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Notes ({employee.notes.length})</h4>
                <SecondaryButton size="sm" onClick={() => setAddNoteOpen(true)}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Note
                </SecondaryButton>
              </div>
              {employee.notes.length > 0 ? (
                <div className="space-y-2">
                  {employee.notes.map((note) => (
                    <Card
                      key={note.id}
                      className={`border-l-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] ${noteTypeColors[note.type]}`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-1">
                          <Badge variant="secondary" className="text-xs bg-white/[0.06] text-white">
                            {note.type}
                          </Badge>
                          <span className="text-xs text-white">
                            {new Date(note.createdAt).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                        <p className="text-sm text-white">{note.content}</p>
                        <p className="text-xs text-white mt-1">— {note.authorName}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <StickyNote className="h-10 w-10 text-white mx-auto mb-2" />
                  <p className="text-sm text-white">No notes yet</p>
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Footer actions - fixed at bottom */}
      <div className="p-4 md:p-6 border-t border-white/[0.06] flex gap-2 flex-shrink-0">
        <SecondaryButton fullWidth onClick={onEdit}>
          <UserCog className="h-4 w-4 mr-2" />
          Edit Profile
        </SecondaryButton>
      </div>
    </>
  );

  // Mobile: Bottom Drawer
  if (isMobile) {
    return (
      <>
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="max-h-[92vh] flex flex-col bg-[hsl(0_0%_8%)] border-t border-white/[0.06]">
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
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col bg-[hsl(0_0%_8%)] border-l border-white/[0.06]">
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
