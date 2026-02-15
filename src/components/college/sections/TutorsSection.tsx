import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials, getStatusColour } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  Search,
  Plus,
  Mail,
  Phone,
  Award,
  Calendar,
  Filter,
  UserCog,
  CheckSquare,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TutorsSection() {
  const { staff, cohorts, isLoading } = useCollegeSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [addTutorOpen, setAddTutorOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // Batch selection
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { staggerContainer, staggerItem, tapAnimation } = useHapticFeedback();

  const handleSelectStaff = (member: CollegeStaff) => {
    if (batchMode) {
      toggleSelection(member.id);
      return;
    }
    setSelectedStaff(member);
    setDetailOpen(true);
  };

  const handleEditStaff = (member: CollegeStaff) => {
    setSelectedStaff(member);
    setDetailOpen(false);
    setEditOpen(true);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLongPress = useCallback(
    (id: string) => {
      if (!batchMode) {
        setBatchMode(true);
        setSelectedIds(new Set([id]));
      }
    },
    [batchMode]
  );

  const exitBatchMode = () => {
    setBatchMode(false);
    setSelectedIds(new Set());
  };

  const tutors = useMemo(
    () =>
      staff.filter(
        (s) => (s.role === 'tutor' || s.role === 'head_of_department') && s.status !== 'Archived'
      ),
    [staff]
  );

  const filteredTutors = useMemo(
    () =>
      tutors.filter((tutor) => {
        const matchesSearch =
          tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (tutor.department ?? '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterRole === 'all' || tutor.role === filterRole;
        return matchesSearch && matchesFilter;
      }),
    [tutors, searchQuery, filterRole]
  );

  const getCohortCount = (staffId: string): number => {
    return cohorts.filter((c) => c.tutor_id === staffId && c.status === 'Active').length;
  };

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all';

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Tutors"
        description={`${tutors.length} tutors in the department`}
        actions={
          <div className="flex items-center gap-2">
            {batchMode && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1 h-11 touch-manipulation"
                onClick={exitBatchMode}
              >
                <X className="h-4 w-4" />
                {selectedIds.size} selected
              </Button>
            )}
            <Button className="gap-2" onClick={() => setAddTutorOpen(true)}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Tutor</span>
            </Button>
          </div>
        }
      />

      {/* Sticky Search and Filters */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm -mx-4 px-4 py-2 md:mx-0 md:px-0 md:static md:bg-transparent md:backdrop-blur-none md:py-0">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            )}
            <Input
              placeholder="Search tutors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn('h-11 touch-manipulation', !searchQuery && 'pl-9')}
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-full sm:w-[180px] h-11 touch-manipulation">
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

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {searchQuery && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer touch-manipulation gap-1"
                onClick={() => setSearchQuery('')}
              >
                &quot;{searchQuery}&quot; <X className="h-3 w-3" />
              </Badge>
            )}
            {filterRole !== 'all' && (
              <Badge
                variant="secondary"
                className="text-xs cursor-pointer touch-manipulation gap-1"
                onClick={() => setFilterRole('all')}
              >
                {filterRole === 'head_of_department' ? 'Head of Dept' : 'Tutor'}{' '}
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && <StaffCardSkeletonList count={3} />}

      {/* Tutors List with Pull to Refresh */}
      {!isLoading && (
        <PullToRefresh onRefresh={handleRefresh}>
          <motion.div
            className="grid gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredTutors.map((tutor) => {
              const cohortCount = getCohortCount(tutor.id);
              const isSelected = selectedIds.has(tutor.id);

              return (
                <motion.div key={tutor.id} variants={staggerItem}>
                  <SwipeableCard
                    onTap={() => handleSelectStaff(tutor)}
                    onLongPress={() => handleLongPress(tutor.id)}
                    selected={isSelected}
                    rightActions={[
                      {
                        icon: <Phone className="h-5 w-5" />,
                        label: 'Call',
                        onClick: () => {
                          if (tutor.phone) window.location.href = `tel:${tutor.phone}`;
                        },
                        className: 'bg-success text-white',
                      },
                      {
                        icon: <Mail className="h-5 w-5" />,
                        label: 'Email',
                        onClick: () => {
                          window.location.href = `mailto:${tutor.email}`;
                        },
                        className: 'bg-info text-white',
                      },
                    ]}
                  >
                    <motion.div {...tapAnimation}>
                      <Card className="relative overflow-hidden border-info/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-info/40 transition-all duration-300">
                        {/* Gradient accent line (blue for staff) */}
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-info via-blue-400 to-info/50" />
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-info/[0.04] rounded-full blur-3xl pointer-events-none" />

                        <CardContent className="p-4 relative">
                          <div className="flex items-start gap-4">
                            {/* Batch checkbox or Avatar */}
                            {batchMode ? (
                              <div
                                className={cn(
                                  'h-12 w-12 shrink-0 rounded-full flex items-center justify-center border-2 transition-colors',
                                  isSelected ? 'bg-info border-info' : 'border-white/30'
                                )}
                              >
                                {isSelected && <CheckSquare className="h-5 w-5 text-white" />}
                              </div>
                            ) : (
                              <Avatar className="h-12 w-12 shrink-0 ring-2 ring-offset-2 ring-offset-elec-gray ring-info/50">
                                <AvatarImage src={tutor.photo_url ?? undefined} />
                                <AvatarFallback className="bg-info/10 text-info font-semibold">
                                  {getInitials(tutor.name)}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-white">{tutor.name}</h3>
                                  <p className="text-sm text-white">{tutor.department}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={getStatusColour(tutor.status)}
                                  >
                                    {tutor.status}
                                  </Badge>
                                  {cohortCount > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                      {cohortCount} cohort
                                      {cohortCount !== 1 ? 's' : ''}
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {tutor.specialisations && tutor.specialisations.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {tutor.specialisations.slice(0, 3).map((spec, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {spec}
                                    </Badge>
                                  ))}
                                  {tutor.specialisations.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{tutor.specialisations.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}

                              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3.5 w-3.5" />
                                  <span className="truncate max-w-[150px]">{tutor.email}</span>
                                </div>
                                {tutor.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>{tutor.phone}</span>
                                  </div>
                                )}
                                {tutor.max_teaching_hours && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{tutor.max_teaching_hours}h/week</span>
                                  </div>
                                )}
                              </div>

                              {/* Qualifications */}
                              {(tutor.teaching_qual || tutor.assessor_qual || tutor.iqa_qual) && (
                                <div className="flex items-center gap-2 mt-3">
                                  <Award className="h-3.5 w-3.5 text-white" />
                                  <div className="flex flex-wrap gap-1">
                                    {tutor.teaching_qual && (
                                      <Badge variant="outline" className="text-xs bg-success/5">
                                        {tutor.teaching_qual}
                                      </Badge>
                                    )}
                                    {tutor.assessor_qual && (
                                      <Badge variant="outline" className="text-xs bg-info/5">
                                        {tutor.assessor_qual}
                                      </Badge>
                                    )}
                                    {tutor.iqa_qual && (
                                      <Badge variant="outline" className="text-xs bg-warning/5">
                                        {tutor.iqa_qual}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </SwipeableCard>
                </motion.div>
              );
            })}

            {filteredTutors.length === 0 && !isLoading && (
              <motion.div variants={staggerItem}>
                <Card className="border-info/20 bg-elec-gray">
                  <CardContent className="p-8 text-center space-y-3">
                    <UserCog className="h-12 w-12 mx-auto text-white" />
                    <p className="text-white font-medium">No tutors found</p>
                    <p className="text-sm text-white">
                      {hasActiveFilters
                        ? 'Try adjusting your search or filters.'
                        : 'Get started by adding your first tutor.'}
                    </p>
                    {!hasActiveFilters && (
                      <Button className="gap-2 mt-2" onClick={() => setAddTutorOpen(true)}>
                        <Plus className="h-4 w-4" />
                        Add Tutor
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </PullToRefresh>
      )}

      {/* Batch Actions Bar */}
      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border"
        >
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <p className="text-sm text-white font-medium">{selectedIds.size} selected</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-11 touch-manipulation gap-2"
                onClick={exitBatchMode}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <AddTutorDialog open={addTutorOpen} onOpenChange={setAddTutorOpen} />

      <StaffDetailSheet
        staff={selectedStaff}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStaff}
      />

      <EditStaffSheet staff={selectedStaff} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
}
