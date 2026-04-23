import { useState } from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogFooter,
  ResponsiveDialogBody,
} from '@/components/ui/responsive-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/employer/StatusBadge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEmployer, type Employee } from '@/contexts/EmployerContext';
import { AddNoteDialog } from '@/components/employer/dialogs/AddNoteDialog';
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Briefcase,
  Award,
  MapPin,
  ChevronRight,
  UserCog,
  Send,
  Star,
  AlertTriangle,
  X,
  PoundSterling,
  AlertCircle,
  StickyNote,
  Plus,
  Zap,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  FormCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
} from '@/components/employer/editorial';

type TeamRole = 'QS' | 'Supervisor' | 'Operative' | 'Apprentice' | 'Project Manager';

const roleTones: Record<TeamRole, 'yellow' | 'blue' | 'emerald' | 'amber'> = {
  QS: 'yellow',
  Supervisor: 'blue',
  Operative: 'emerald',
  Apprentice: 'amber',
  'Project Manager': 'yellow',
};

const noteTypeBorders: Record<string, string> = {
  General: 'border-l-white/20',
  Performance: 'border-l-blue-400',
  Incident: 'border-l-amber-400',
  Positive: 'border-l-emerald-400',
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
  onSendMessage,
}: ViewEmployeeDialogProps) {
  const isMobile = useIsMobile();
  const {
    certifications,
    timesheets,
    getEmployeeAssignments,
    removeEmployeeFromJob,
    setEmployeeRating,
  } = useEmployer();
  const [activeTab, setActiveTab] = useState('profile');
  const [addNoteOpen, setAddNoteOpen] = useState(false);

  if (!employee) return null;

  const employeeAssignments = getEmployeeAssignments(employee.id);
  const employeeCerts = certifications.filter((c) => c.employeeId === employee.id);
  const expiringSoonCerts = employeeCerts.filter(
    (c) => c.status === 'Warning' || c.status === 'Expired'
  );

  const handleCall = () => (window.location.href = `tel:${employee.phone}`);
  const handleEmail = () => (window.location.href = `mailto:${employee.email}`);
  const handleEmergencyCall = () => {
    if (employee.emergencyContact) {
      window.location.href = `tel:${employee.emergencyContact.phone}`;
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-2xl">
        <ResponsiveDialogHeader className="pr-12">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-elec-yellow/10 flex items-center justify-center text-xl md:text-2xl font-bold text-elec-yellow flex-shrink-0 border border-elec-yellow/20">
              {employee.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <Eyebrow>Team member</Eyebrow>
              <ResponsiveDialogTitle className="mt-1 text-[18px] font-semibold text-white truncate pr-2">
                {employee.name}
              </ResponsiveDialogTitle>
              <p className="text-[12.5px] text-white">{employee.role}</p>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <StatusBadge status={employee.status} />
                <Pill tone={roleTones[employee.teamRole]}>{employee.teamRole}</Pill>
                {employee.rating > 0 && (
                  <Pill tone="amber">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {employee.rating}
                  </Pill>
                )}
                {expiringSoonCerts.length > 0 && (
                  <Pill tone="amber">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {expiringSoonCerts.length}
                  </Pill>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
            <SecondaryButton onClick={handleCall} size="sm">
              <Phone className="h-3.5 w-3.5 mr-1 text-emerald-400" />
              Call
            </SecondaryButton>
            <SecondaryButton onClick={onSendMessage} size="sm">
              <MessageSquare className="h-3.5 w-3.5 mr-1 text-blue-400" />
              Message
            </SecondaryButton>
            <SecondaryButton onClick={onAssignToJob} size="sm">
              <Briefcase className="h-3.5 w-3.5 mr-1 text-amber-400" />
              Assign
            </SecondaryButton>
          </div>
        </ResponsiveDialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="px-4 md:px-6 border-b border-white/[0.06] overflow-x-auto hide-scrollbar shrink-0">
            <TabsList className="w-auto justify-start gap-1 bg-transparent h-auto p-0">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:text-white rounded-none px-3 py-2 text-[12px] h-11 touch-manipulation text-white"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="jobs"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:text-white rounded-none px-3 py-2 text-[12px] h-11 touch-manipulation text-white"
              >
                Jobs
              </TabsTrigger>
              <TabsTrigger
                value="certs"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:text-white rounded-none px-3 py-2 text-[12px] h-11 touch-manipulation text-white"
              >
                Certs
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-elec-yellow data-[state=active]:text-white rounded-none px-3 py-2 text-[12px] h-11 touch-manipulation text-white"
              >
                Notes
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-4">
              <TabsContent value="profile" className="mt-0 space-y-4">
                <FormCard eyebrow="Contact details">
                  <button
                    type="button"
                    onClick={handleCall}
                    className="flex items-center gap-3 w-full text-left py-2 px-1 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white">{employee.phone}</p>
                      <p className="text-[11px] text-white">Mobile</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleEmail}
                    className="flex items-center gap-3 w-full text-left py-2 px-1 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white truncate">{employee.email}</p>
                      <p className="text-[11px] text-white">Email</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </FormCard>

                {employee.emergencyContact && (
                  <div className="bg-red-500/5 border border-red-500/25 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-white">
                        Emergency contact
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleEmergencyCall}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <Phone className="h-4 w-4 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white">
                          {employee.emergencyContact.name}
                        </p>
                        <p className="text-[11px] text-white">
                          {employee.emergencyContact.relationship} ·{' '}
                          {employee.emergencyContact.phone}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}

                {(employee.dayRate || employee.hourlyRate) && (
                  <FormCard eyebrow="Pay rates">
                    <div className="flex items-center gap-2 text-[12px] text-white">
                      <PoundSterling className="h-4 w-4 text-elec-yellow" />
                      Day and hourly rates
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3 text-center">
                        <p className="text-[22px] font-semibold text-elec-yellow tabular-nums">
                          £{employee.dayRate ?? 0}
                        </p>
                        <p className="text-[11px] text-white">Day rate</p>
                      </div>
                      <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3 text-center">
                        <p className="text-[22px] font-semibold text-elec-yellow tabular-nums">
                          £{employee.hourlyRate ?? 0}
                        </p>
                        <p className="text-[11px] text-white">Hourly rate</p>
                      </div>
                    </div>
                  </FormCard>
                )}

                {employee.skills.length > 0 && (
                  <FormCard eyebrow="Skills">
                    <div className="flex items-center gap-2 text-[12px] text-white">
                      <Zap className="h-4 w-4 text-amber-400" />
                      Competencies and specialisms
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {employee.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center h-7 px-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </FormCard>
                )}

                <FormCard eyebrow="Performance rating">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setEmployeeRating(employee.id, star);
                          toast({ title: 'Rating Updated' });
                        }}
                        className="p-1 touch-manipulation"
                      >
                        <Star
                          className={cn(
                            'h-6 w-6 cursor-pointer transition-all',
                            star <= employee.rating
                              ? 'text-elec-yellow fill-elec-yellow'
                              : 'text-white hover:text-elec-yellow/60'
                          )}
                        />
                      </button>
                    ))}
                    <span className="text-[12px] text-white ml-2 tabular-nums">
                      {employee.rating} / 5
                    </span>
                  </div>
                </FormCard>
              </TabsContent>

              <TabsContent value="jobs" className="mt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <Eyebrow>Current assignments ({employeeAssignments.length})</Eyebrow>
                  <SecondaryButton onClick={onAssignToJob} size="sm">
                    <Briefcase className="h-3 w-3 mr-1" />
                    Assign
                  </SecondaryButton>
                </div>
                {employeeAssignments.length > 0 ? (
                  <div className="space-y-2">
                    {employeeAssignments.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-start justify-between gap-2 bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-2 border-l-elec-yellow rounded-xl p-3"
                      >
                        <div>
                          <p className="text-[13px] font-medium text-white">{a.jobTitle}</p>
                          <p className="text-[11px] text-white flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" />
                            {a.jobLocation}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeEmployeeFromJob(a.id);
                            toast({ title: 'Removed from Job' });
                          }}
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white hover:bg-red-500/15 hover:text-red-400 transition-colors"
                          aria-label="Remove"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[hsl(0_0%_12%)] border border-dashed border-white/[0.12] rounded-2xl p-6 text-center">
                    <Briefcase className="h-8 w-8 text-white/50 mx-auto mb-2" />
                    <p className="text-[12.5px] text-white">No active assignments</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="certs" className="mt-0 space-y-3">
                <Eyebrow>Certifications ({employeeCerts.length})</Eyebrow>
                {employeeCerts.length > 0 ? (
                  <div className="space-y-2">
                    {employeeCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className={cn(
                          'bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-2 rounded-xl p-3',
                          cert.status === 'Expired'
                            ? 'border-l-red-400'
                            : cert.status === 'Warning'
                              ? 'border-l-amber-400'
                              : 'border-l-emerald-400'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[13px] font-medium text-white truncate">
                              {cert.name}
                            </p>
                            <p className="text-[11px] text-white">{cert.issuer}</p>
                          </div>
                          <Pill
                            tone={
                              cert.status === 'Expired'
                                ? 'red'
                                : cert.status === 'Warning'
                                  ? 'amber'
                                  : 'emerald'
                            }
                          >
                            {cert.status === 'Expired'
                              ? 'Expired'
                              : cert.status === 'Warning'
                                ? `${cert.daysRemaining}d`
                                : 'Active'}
                          </Pill>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[hsl(0_0%_12%)] border border-dashed border-white/[0.12] rounded-2xl p-6 text-center">
                    <Award className="h-8 w-8 text-white/50 mx-auto mb-2" />
                    <p className="text-[12.5px] text-white">No certifications</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="notes" className="mt-0 space-y-3">
                <div className="flex items-center justify-between">
                  <Eyebrow>Notes ({employee.notes.length})</Eyebrow>
                  <SecondaryButton onClick={() => setAddNoteOpen(true)} size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add note
                  </SecondaryButton>
                </div>
                {employee.notes.length > 0 ? (
                  <div className="space-y-2">
                    {employee.notes.map((note) => (
                      <div
                        key={note.id}
                        className={cn(
                          'bg-[hsl(0_0%_12%)] border border-white/[0.06] border-l-2 rounded-xl p-3',
                          noteTypeBorders[note.type]
                        )}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <Pill tone="yellow">{note.type}</Pill>
                          <span className="text-[11px] text-white">
                            {new Date(note.createdAt).toLocaleDateString('en-GB')}
                          </span>
                        </div>
                        <p className="text-[13px] text-white">{note.content}</p>
                        <p className="mt-1 text-[11px] text-white">— {note.authorName}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[hsl(0_0%_12%)] border border-dashed border-white/[0.12] rounded-2xl p-6 text-center">
                    <StickyNote className="h-8 w-8 text-white/50 mx-auto mb-2" />
                    <p className="text-[12.5px] text-white">No notes yet</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <ResponsiveDialogFooter className="flex gap-2">
          <SecondaryButton onClick={onEdit} fullWidth>
            <UserCog className="h-4 w-4 mr-1.5" />
            Edit
          </SecondaryButton>
          <PrimaryButton onClick={onSendMessage} fullWidth>
            <Send className="h-4 w-4 mr-1.5" />
            Message
          </PrimaryButton>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>

      <AddNoteDialog employee={employee} open={addNoteOpen} onOpenChange={setAddNoteOpen} />
    </ResponsiveDialog>
  );
}
