import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertTriangle, Check, Briefcase, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Employee } from '@/services/employeeService';
import { JobAssignmentWithDetails } from '@/services/jobAssignmentService';
import { Pill } from '@/components/employer/editorial';

interface WorkerCardProps {
  employee: Employee;
  isSelected: boolean;
  onToggle: () => void;
  clashWarnings?: JobAssignmentWithDetails[];
  isCheckingClash?: boolean;
}

export function WorkerCard({
  employee,
  isSelected,
  onToggle,
  clashWarnings = [],
}: WorkerCardProps) {
  const hasClash = clashWarnings.length > 0;

  const getStatusIndicator = () => {
    if (employee.status !== 'Active') {
      return { color: 'bg-white/20', pulse: false };
    }
    if (hasClash) {
      return { color: 'bg-amber-400', pulse: true };
    }
    return { color: 'bg-green-500', pulse: false };
  };

  const status = getStatusIndicator();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        'cursor-pointer transition-colors duration-200 active:scale-[0.98] touch-manipulation rounded-2xl border p-4',
        isSelected
          ? hasClash
            ? 'border-red-500/40 bg-red-500/10'
            : 'border-elec-yellow/60 bg-elec-yellow/10'
          : hasClash
            ? 'border-amber-400/40 bg-amber-400/5'
            : 'border-white/[0.06] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)]'
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            isSelected
              ? hasClash
                ? 'bg-amber-400 border-amber-400'
                : 'bg-elec-yellow border-elec-yellow'
              : 'border-white/[0.15]'
          )}
        >
          {isSelected && <Check className="h-4 w-4 text-black animate-scale-in" />}
        </div>

        <div className="relative shrink-0">
          <Avatar className="h-14 w-14 border-2 border-[hsl(0_0%_8%)]">
            {employee.photo_url ? (
              <AvatarImage src={employee.photo_url} alt={employee.name} />
            ) : null}
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-lg">
              {employee.avatar_initials}
            </AvatarFallback>
          </Avatar>
          <span
            className={cn(
              'absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[hsl(0_0%_8%)]',
              status.color,
              status.pulse && 'animate-pulse'
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate text-base">{employee.name}</p>
          <p className="text-sm text-white truncate flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            {employee.role}
          </p>

          {employee.certifications_count > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <Pill tone="yellow">
                <Award className="h-3 w-3 mr-1" />
                {employee.certifications_count} cert
                {employee.certifications_count > 1 ? 's' : ''}
              </Pill>
              {employee.active_jobs_count > 0 && (
                <Pill tone="blue">
                  {employee.active_jobs_count} active job
                  {employee.active_jobs_count > 1 ? 's' : ''}
                </Pill>
              )}
            </div>
          )}
        </div>

        {employee.status !== 'Active' && <Pill tone="amber">{employee.status}</Pill>}
      </div>

      {hasClash && isSelected && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 animate-fade-in">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-400 text-sm">Schedule conflict detected</p>
              <p className="text-xs text-white mt-0.5">
                This worker is already assigned during these dates:
              </p>
              <div className="text-xs text-white mt-2 space-y-1.5">
                {clashWarnings.map((clash) => (
                  <div
                    key={clash.id}
                    className="flex items-center gap-2 bg-white/[0.04] rounded-lg px-2 py-1.5"
                  >
                    <Briefcase className="h-3 w-3 text-white" />
                    <span className="font-medium">{clash.job?.title}</span>
                    <span className="text-white">•</span>
                    <span className="text-white">
                      {clash.start_date}
                      {clash.end_date ? ` → ${clash.end_date}` : ' (ongoing)'}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-400 mt-2 font-medium">
                You can still assign, but this may cause scheduling issues.
              </p>
            </div>
          </div>
        </div>
      )}

      {hasClash && !isSelected && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Has conflicting assignment</span>
        </div>
      )}
    </div>
  );
}
