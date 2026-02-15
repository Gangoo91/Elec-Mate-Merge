import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { StaffDetailSheet } from '@/components/college/sheets/StaffDetailSheet';
import { EditStaffSheet } from '@/components/college/sheets/EditStaffSheet';
import { AddTutorDialog } from '@/components/college/dialogs/AddTutorDialog';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StaffCardSkeletonList } from '@/components/college/ui/StaffCardSkeleton';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStaff } from '@/contexts/CollegeSupabaseContext';
import { getInitials, getStatusColour, getRoleLabel } from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import { Search, Plus, Mail, Phone, Filter, Briefcase, Users, CheckSquare, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SupportStaffSection() {
  const { staff, isLoading } = useCollegeSupabase();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [selectedStaff, setSelectedStaff] = useState<CollegeStaff | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);

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

  const supportStaff = useMemo(
    () =>
      staff.filter(
        (s) => s.role !== 'tutor' && s.role !== 'head_of_department' && s.status !== 'Archived'
      ),
    [staff]
  );

  const filteredStaff = useMemo(
    () =>
      supportStaff.filter((member) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (member.department ?? '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterRole === 'all' || member.role === filterRole;
        return matchesSearch && matchesFilter;
      }),
    [supportStaff, searchQuery, filterRole]
  );

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all';

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Support Staff"
        description={`${supportStaff.length} support staff members`}
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
            <Button className="gap-2 h-11 touch-manipulation" onClick={() => setAddStaffOpen(true)}>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Staff</span>
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
              placeholder="Search support staff..."
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
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="assessor">Assessor</SelectItem>
              <SelectItem value="iqa">IQA</SelectItem>
              <SelectItem value="support">Support</SelectItem>
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
                {getRoleLabel(filterRole)} <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && <StaffCardSkeletonList count={3} />}

      {/* Staff List with Pull to Refresh */}
      {!isLoading && (
        <PullToRefresh onRefresh={handleRefresh}>
          <motion.div
            className="grid gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredStaff.map((member) => {
              const isSelected = selectedIds.has(member.id);

              return (
                <motion.div key={member.id} variants={staggerItem}>
                  <SwipeableCard
                    onTap={() => handleSelectStaff(member)}
                    onLongPress={() => handleLongPress(member.id)}
                    selected={isSelected}
                    rightActions={[
                      {
                        icon: <Phone className="h-5 w-5" />,
                        label: 'Call',
                        onClick: () => {
                          if (member.phone) window.location.href = `tel:${member.phone}`;
                        },
                        className: 'bg-success text-white',
                      },
                      {
                        icon: <Mail className="h-5 w-5" />,
                        label: 'Email',
                        onClick: () => {
                          window.location.href = `mailto:${member.email}`;
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
                                <AvatarImage src={member.photo_url ?? undefined} />
                                <AvatarFallback className="bg-info/10 text-info font-semibold">
                                  {getInitials(member.name)}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-white">{member.name}</h3>
                                  <p className="text-sm text-white">{member.department}</p>
                                </div>
                                <Badge variant="outline" className={getStatusColour(member.status)}>
                                  {member.status}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  <Briefcase className="h-3 w-3 mr-1" />
                                  {getRoleLabel(member.role)}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3.5 w-3.5" />
                                  <span className="truncate max-w-[150px]">{member.email}</span>
                                </div>
                                {member.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>{member.phone}</span>
                                  </div>
                                )}
                              </div>

                              {/* Qualifications for assessors/IQA */}
                              {(member.role === 'assessor' || member.role === 'iqa') && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {member.assessor_qual && (
                                    <Badge variant="outline" className="text-xs bg-info/5">
                                      {member.assessor_qual}
                                    </Badge>
                                  )}
                                  {member.iqa_qual && (
                                    <Badge variant="outline" className="text-xs bg-warning/5">
                                      {member.iqa_qual}
                                    </Badge>
                                  )}
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

            {filteredStaff.length === 0 && !isLoading && (
              <motion.div variants={staggerItem}>
                <Card className="border-info/20 bg-elec-gray">
                  <CardContent className="p-8 text-center space-y-3">
                    <Users className="h-12 w-12 mx-auto text-white" />
                    <p className="text-white font-medium">No support staff found</p>
                    <p className="text-sm text-white">
                      {hasActiveFilters
                        ? 'Try adjusting your search or filters.'
                        : 'No support staff members have been added yet.'}
                    </p>
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

      <AddTutorDialog open={addStaffOpen} onOpenChange={setAddStaffOpen} />

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
