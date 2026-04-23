import { useState, useMemo } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Award,
  Search,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Shield,
  Trash2,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  inputClass,
  selectTriggerClass,
  selectContentClass,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Field,
  FormCard,
  FormGrid,
  SheetShell,
} from './editorial';
import {
  useEmployeeQualifications,
  useCreateQualification,
  useDeleteQualification,
  useSyncEcsFromElecId,
  type EmployeeQualification,
  type QualificationType,
} from '@/hooks/useEmployeeQualifications';
import { useEmployees } from '@/hooks/useEmployees';
import { format, differenceInDays, parseISO } from 'date-fns';

const QUALIFICATION_TYPES: { value: QualificationType; label: string }[] = [
  { value: 'ecs_card', label: 'ECS Card' },
  { value: '18th_edition', label: '18th Edition' },
  { value: '2391', label: '2391 Inspection & Testing' },
  { value: '2394', label: '2394 Initial Verification' },
  { value: '2395', label: '2395 Periodic Inspection' },
  { value: 'nvq_l3', label: 'NVQ Level 3' },
  { value: 'cscs', label: 'CSCS Card' },
  { value: 'cpcs', label: 'CPCS Card' },
  { value: 'first_aid', label: 'First Aid' },
  { value: 'ipaf', label: 'IPAF' },
  { value: 'pasma', label: 'PASMA' },
  { value: 'asbestos', label: 'Asbestos Awareness' },
  { value: 'confined_space', label: 'Confined Space' },
  { value: 'driving_licence', label: 'Driving Licence' },
  { value: 'other', label: 'Other' },
];

function getStatusBadge(status: string, expiryDate?: string) {
  const isExpired = status === 'expired';
  const isExpiring = status === 'expiring';

  let daysText = '';
  if (expiryDate) {
    const days = differenceInDays(parseISO(expiryDate), new Date());
    if (days < 0) {
      daysText = `${Math.abs(days)}d overdue`;
    } else if (days <= 30) {
      daysText = `${days}d left`;
    }
  }

  if (isExpired) {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Expired {daysText && `(${daysText})`}
      </Badge>
    );
  }

  if (isExpiring) {
    return (
      <Badge variant="outline" className="gap-1 border-amber-500/50 text-amber-400">
        <Clock className="h-3 w-3" />
        Expiring {daysText && `(${daysText})`}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1 border-green-500/50 text-green-400">
      <CheckCircle2 className="h-3 w-3" />
      Valid
    </Badge>
  );
}

export function QualificationTracker() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [addSheetOpen, setAddSheetOpen] = useState(false);

  // Form state
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [qualType, setQualType] = useState<QualificationType>('18th_edition');
  const [qualName, setQualName] = useState('');
  const [issuingBody, setIssuingBody] = useState('');
  const [certNumber, setCertNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const { data: qualifications = [], isLoading } = useEmployeeQualifications();
  const { data: employees = [] } = useEmployees();
  const createQualification = useCreateQualification();
  const deleteQualification = useDeleteQualification();
  const syncEcs = useSyncEcsFromElecId();

  // Filter qualifications
  const filteredQualifications = useMemo(() => {
    return qualifications.filter((q) => {
      // Search filter
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        const matchesName = q.qualification_name.toLowerCase().includes(search);
        const matchesEmployee = q.employee?.name?.toLowerCase().includes(search);
        if (!matchesName && !matchesEmployee) return false;
      }

      // Type filter
      if (filterType !== 'all' && q.qualification_type !== filterType) {
        return false;
      }

      // Status filter
      if (filterStatus !== 'all' && q.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [qualifications, searchQuery, filterType, filterStatus]);

  // Group by employee
  const groupedByEmployee = useMemo(() => {
    const groups: Record<string, EmployeeQualification[]> = {};
    filteredQualifications.forEach((q) => {
      const employeeName = q.employee?.name || 'Unknown';
      if (!groups[employeeName]) {
        groups[employeeName] = [];
      }
      groups[employeeName].push(q);
    });
    return groups;
  }, [filteredQualifications]);

  const handleAddQualification = async () => {
    if (!selectedEmployee || !qualType) return;

    await createQualification.mutateAsync({
      employee_id: selectedEmployee,
      qualification_type: qualType,
      qualification_name:
        qualName || QUALIFICATION_TYPES.find((t) => t.value === qualType)?.label || qualType,
      issuing_body: issuingBody || undefined,
      certificate_number: certNumber || undefined,
      issue_date: issueDate || undefined,
      expiry_date: expiryDate || undefined,
    });

    // Reset form
    setSelectedEmployee('');
    setQualType('18th_edition');
    setQualName('');
    setIssuingBody('');
    setCertNumber('');
    setIssueDate('');
    setExpiryDate('');
    setAddSheetOpen(false);
  };

  const handleSyncEcs = async (employeeId: string) => {
    await syncEcs.mutateAsync(employeeId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none z-10" />
          )}
          <Input
            placeholder="Search qualifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(inputClass, !searchQuery && 'pl-9')}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className={cn(selectTriggerClass, 'w-full sm:w-40')}>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">All Types</SelectItem>
            {QUALIFICATION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className={cn(selectTriggerClass, 'w-full sm:w-32')}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expiring">Expiring</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <PrimaryButton onClick={() => setAddSheetOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </PrimaryButton>
      </div>

      {/* Qualifications List */}
      {Object.keys(groupedByEmployee).length === 0 ? (
        <div className="bg-[hsl(0_0%_12%)] border border-dashed border-white/[0.08] rounded-2xl p-8 text-center">
          <Award className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="font-medium text-white mb-2">No qualifications found</h3>
          <p className="text-sm text-white mb-4">
            {searchQuery || filterType !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your filters'
              : 'Add employee qualifications to track certifications and expiry dates'}
          </p>
          <PrimaryButton onClick={() => setAddSheetOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Qualification
          </PrimaryButton>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByEmployee).map(([employeeName, quals]) => (
            <div
              key={employeeName}
              className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="font-medium text-white">{employeeName}</h3>
                  <Badge variant="secondary" className="bg-white/[0.06] text-white">
                    {quals.length}
                  </Badge>
                </div>
                {quals[0]?.employee_id && (
                  <SecondaryButton
                    size="sm"
                    onClick={() => handleSyncEcs(quals[0].employee_id)}
                    disabled={syncEcs.isPending}
                  >
                    <RefreshCw
                      className={cn('h-3 w-3 mr-1', syncEcs.isPending && 'animate-spin')}
                    />
                    Sync ECS
                  </SecondaryButton>
                )}
              </div>

              <div className="space-y-2">
                {quals.map((qual) => (
                  <div
                    key={qual.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Shield className="h-4 w-4 text-white shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-white truncate">
                          {qual.qualification_name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-white">
                          {qual.certificate_number && <span>#{qual.certificate_number}</span>}
                          {qual.expiry_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Expires {format(parseISO(qual.expiry_date), 'dd/MM/yyyy')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(qual.status, qual.expiry_date)}
                      {qual.file_url && (
                        <button
                          type="button"
                          className="h-8 w-8 p-0 flex items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                          onClick={() => openExternalUrl(qual.file_url)}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteQualification.mutate(qual.id)}
                        disabled={deleteQualification.isPending}
                        className="h-8 w-8 p-0 flex items-center justify-center rounded-full text-red-400 hover:bg-red-500/10 touch-manipulation disabled:opacity-40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Qualification Sheet */}
      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden">
          <SheetShell
            eyebrow="Compliance"
            title="Add Qualification"
            footer={
              <>
                <SecondaryButton
                  onClick={() => setAddSheetOpen(false)}
                  size="lg"
                  fullWidth
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleAddQualification}
                  disabled={!selectedEmployee || createQualification.isPending}
                  size="lg"
                  fullWidth
                >
                  {createQualification.isPending ? 'Adding...' : 'Add Qualification'}
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="Assignment">
              <Field label="Employee" required>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Qualification Type" required>
                <Select value={qualType} onValueChange={(v) => setQualType(v as QualificationType)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {QUALIFICATION_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Qualification Name">
                <Input
                  value={qualName}
                  onChange={(e) => setQualName(e.target.value)}
                  placeholder="e.g., 18th Edition Wiring Regulations"
                  className={inputClass}
                />
              </Field>
            </FormCard>

            <FormCard eyebrow="Certificate details">
              <FormGrid cols={2}>
                <Field label="Issuing Body">
                  <Input
                    value={issuingBody}
                    onChange={(e) => setIssuingBody(e.target.value)}
                    placeholder="e.g., City & Guilds"
                    className={inputClass}
                  />
                </Field>
                <Field label="Certificate Number">
                  <Input
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    placeholder="e.g., 123456"
                    className={inputClass}
                  />
                </Field>
              </FormGrid>

              <FormGrid cols={2}>
                <Field label="Issue Date">
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Expiry Date">
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FormGrid>
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </div>
  );
}
