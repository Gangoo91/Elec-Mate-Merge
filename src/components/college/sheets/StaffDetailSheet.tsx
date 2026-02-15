import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import {
  getInitials,
  getStatusColour,
  getRoleLabel,
  formatUKDateShort,
} from '@/utils/collegeHelpers';
import {
  Mail,
  Phone,
  Calendar,
  Edit,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Clock,
  Archive,
  ClipboardList,
} from 'lucide-react';

interface StaffDetailSheetProps {
  staff: CollegeStaff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (staff: CollegeStaff) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function StaffDetailSheet({ staff, open, onOpenChange, onEdit }: StaffDetailSheetProps) {
  const { cohorts, students } = useCollegeSupabase();
  const [activeTab, setActiveTab] = useState('details');

  const assignedCohorts = useMemo(() => {
    if (!staff) return [];
    return cohorts.filter((c) => c.tutor_id === staff.id);
  }, [staff, cohorts]);

  const activeCohorts = useMemo(
    () => assignedCohorts.filter((c) => c.status === 'Active'),
    [assignedCohorts]
  );

  const getStudentCount = (cohortId: string): number => {
    return students.filter((s) => s.cohort_id === cohortId && s.status === 'Active').length;
  };

  const totalStudents = useMemo(() => {
    return activeCohorts.reduce((sum, c) => sum + getStudentCount(c.id), 0);
  }, [activeCohorts, students]);

  if (!staff) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 shrink-0 ring-2 ring-offset-2 ring-offset-background ring-info/50">
                <AvatarImage src={staff.photo_url ?? undefined} />
                <AvatarFallback className="bg-info/10 text-info text-lg font-semibold">
                  {getInitials(staff.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <SheetTitle className="text-xl text-left">{staff.name}</SheetTitle>
                <p className="text-sm text-white mt-0.5">{staff.department}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className={getStatusColour(staff.status)}>
                    {staff.status}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {getRoleLabel(staff.role)}
                  </Badge>
                  {activeCohorts.length > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {activeCohorts.length} cohort
                      {activeCohorts.length !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              {staff.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-11 touch-manipulation gap-2"
                  asChild
                >
                  <a href={`tel:${staff.phone}`}>
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-11 touch-manipulation gap-2"
                asChild
              >
                <a href={`mailto:${staff.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
            </div>
          </SheetHeader>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full justify-start gap-0 h-auto p-1 bg-muted/50 rounded-none border-b border-border flex-shrink-0">
              <TabsTrigger
                value="details"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="cohorts"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Cohorts
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="flex-1 h-11 touch-manipulation data-[state=active]:bg-background text-xs sm:text-sm"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {/* Details Tab */}
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {/* Contact Details */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-info" />
                          Contact Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-3 text-white">
                            <Mail className="h-4 w-4 shrink-0" />
                            <span className="truncate">{staff.email}</span>
                          </div>
                          {staff.phone && (
                            <div className="flex items-center gap-3 text-white">
                              <Phone className="h-4 w-4 shrink-0" />
                              <span>{staff.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-3 text-white">
                            <Briefcase className="h-4 w-4 shrink-0" />
                            <span>{staff.department || 'No department'}</span>
                          </div>
                          {staff.max_teaching_hours && (
                            <div className="flex items-center gap-3 text-white">
                              <Clock className="h-4 w-4 shrink-0" />
                              <span>{staff.max_teaching_hours} hours/week maximum</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Qualifications */}
                    <Card className="border-white/10">
                      <CardContent className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-info" />
                          Qualifications
                        </h4>
                        <div className="space-y-3">
                          {staff.teaching_qual && (
                            <div className="flex items-center gap-3">
                              <Award className="h-4 w-4 text-success shrink-0" />
                              <div>
                                <p className="text-xs text-white">Teaching Qualification</p>
                                <p className="text-sm font-medium text-white">
                                  {staff.teaching_qual}
                                </p>
                              </div>
                            </div>
                          )}
                          {staff.assessor_qual && (
                            <div className="flex items-center gap-3">
                              <Award className="h-4 w-4 text-info shrink-0" />
                              <div>
                                <p className="text-xs text-white">Assessor Qualification</p>
                                <p className="text-sm font-medium text-white">
                                  {staff.assessor_qual}
                                </p>
                              </div>
                            </div>
                          )}
                          {staff.iqa_qual && (
                            <div className="flex items-center gap-3">
                              <Award className="h-4 w-4 text-warning shrink-0" />
                              <div>
                                <p className="text-xs text-white">IQA Qualification</p>
                                <p className="text-sm font-medium text-white">{staff.iqa_qual}</p>
                              </div>
                            </div>
                          )}
                          {!staff.teaching_qual && !staff.assessor_qual && !staff.iqa_qual && (
                            <p className="text-sm text-white">No qualifications recorded.</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Specialisations */}
                    {staff.specialisations && staff.specialisations.length > 0 && (
                      <Card className="border-white/10">
                        <CardContent className="p-4 space-y-3">
                          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-info" />
                            Specialisations
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {staff.specialisations.map((spec, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Summary Stats */}
                    <Card className="border-white/10">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-white">{activeCohorts.length}</p>
                            <p className="text-xs text-white">Active Cohorts</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white">{totalStudents}</p>
                            <p className="text-xs text-white">Students</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white">
                              {staff.max_teaching_hours ?? '-'}
                            </p>
                            <p className="text-xs text-white">Max Hours</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Cohorts Tab */}
                {activeTab === 'cohorts' && (
                  <motion.div
                    key="cohorts"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    {assignedCohorts.length > 0 ? (
                      <div className="space-y-3">
                        {assignedCohorts.map((cohort) => {
                          const studentCount = getStudentCount(cohort.id);
                          const maxStudents = cohort.max_students ?? 20;
                          const capacityPercent = (studentCount / maxStudents) * 100;

                          return (
                            <Card key={cohort.id} className="border-white/10">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h4 className="font-semibold text-white">{cohort.name}</h4>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={getStatusColour(cohort.status)}
                                  >
                                    {cohort.status}
                                  </Badge>
                                </div>

                                {/* Capacity */}
                                <div>
                                  <div className="flex justify-between text-xs text-white mb-1">
                                    <span>Capacity</span>
                                    <span className="font-medium">
                                      {studentCount}/{maxStudents} students
                                    </span>
                                  </div>
                                  <Progress value={capacityPercent} className="h-1.5" />
                                </div>

                                <div className="flex items-center gap-2 text-xs text-white pt-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{formatUKDateShort(cohort.start_date)}</span>
                                  <span>&rarr;</span>
                                  <span>{formatUKDateShort(cohort.end_date)}</span>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <Card className="border-white/10">
                        <CardContent className="p-8 text-center space-y-3">
                          <GraduationCap className="h-12 w-12 mx-auto text-white" />
                          <p className="text-white font-medium">No Assigned Cohorts</p>
                          <p className="text-sm text-white">
                            This staff member is not currently assigned to any cohorts.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-4 space-y-4"
                  >
                    <Card className="border-white/10">
                      <CardContent className="p-8 text-center space-y-3">
                        <ClipboardList className="h-12 w-12 mx-auto text-white" />
                        <p className="text-white font-medium">Notes Coming Soon</p>
                        <p className="text-sm text-white">
                          Staff notes and communication log will appear here.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          {/* Footer Actions */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={() => onEdit?.(staff)}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            {staff.status === 'Active' && (
              <Button
                variant="outline"
                className="h-11 touch-manipulation gap-2 border-warning/30 text-warning hover:bg-warning/10"
              >
                <Archive className="h-4 w-4" />
                Archive
              </Button>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
