import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useJobPacks } from '@/hooks/useJobPacks';
import {
  Package,
  MapPin,
  FileText,
  Plus,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  FormCard,
  Field,
  Pill,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

interface JobPackSelectorProps {
  selectedJobPackId: string | null;
  onSelect: (jobPackId: string | null) => void;
  onCreateNew?: () => void;
  showStatus?: boolean;
}

export function JobPackSelector({
  selectedJobPackId,
  onSelect,
  onCreateNew,
  showStatus = true,
}: JobPackSelectorProps) {
  const { data: jobPacks = [], isLoading } = useJobPacks();

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);

  // Get status badges for a job pack
  const getDocumentStatus = (jp: (typeof jobPacks)[0]) => {
    const statuses = [];
    if (jp.rams_generated) statuses.push({ label: 'RAMS', complete: true });
    else statuses.push({ label: 'RAMS', complete: false });

    if (jp.method_statement_generated) statuses.push({ label: 'Method', complete: true });
    else statuses.push({ label: 'Method', complete: false });

    if (jp.briefing_pack_generated) statuses.push({ label: 'Briefing', complete: true });
    else statuses.push({ label: 'Briefing', complete: false });

    return statuses;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-11 w-full bg-white/[0.04] rounded-xl" />
        <Skeleton className="h-24 w-full bg-white/[0.04] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Job Pack Selector */}
      <Field label="Select Job Pack">
        <Select value={selectedJobPackId || ''} onValueChange={(value) => onSelect(value || null)}>
          <SelectTrigger className={selectTriggerClass}>
            <SelectValue placeholder="Choose a job pack..." />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            {jobPacks.length === 0 ? (
              <SelectItem value="none" disabled className="text-white">
                No job packs available
              </SelectItem>
            ) : (
              jobPacks
                .filter((jp) => jp.status !== 'Completed')
                .map((jp) => (
                  <SelectItem
                    key={jp.id}
                    value={jp.id}
                    className="text-white focus:bg-white/[0.08] focus:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-elec-yellow" />
                      <span className="text-white">{jp.title}</span>
                      {jp.status === 'In Progress' && (
                        <Pill tone="emerald">Active</Pill>
                      )}
                    </div>
                  </SelectItem>
                ))
            )}
          </SelectContent>
        </Select>
      </Field>

      {/* Create New Option */}
      {onCreateNew && (
        <SecondaryButton fullWidth onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Job Pack
        </SecondaryButton>
      )}

      {/* Selected Job Pack Details */}
      {selectedJobPack && showStatus && (
        <FormCard eyebrow="Selected job pack">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-[14px] font-semibold text-white truncate">
                {selectedJobPack.title}
              </h4>
              {selectedJobPack.client && (
                <p className="text-[12px] text-white mt-0.5">{selectedJobPack.client}</p>
              )}
            </div>
            <Pill
              tone={
                selectedJobPack.status === 'In Progress'
                  ? 'emerald'
                  : selectedJobPack.status === 'Draft'
                    ? 'amber'
                    : 'blue'
              }
            >
              {selectedJobPack.status}
            </Pill>
          </div>

          {/* Location */}
          {selectedJobPack.location && (
            <div className="flex items-center gap-2 text-[12.5px] text-white">
              <MapPin className="h-4 w-4 text-white" />
              <span className="truncate">{selectedJobPack.location}</span>
            </div>
          )}

          {/* Scope Preview */}
          {selectedJobPack.scope && (
            <div className="flex items-start gap-2 text-[12.5px] text-white">
              <FileText className="h-4 w-4 mt-0.5 shrink-0 text-white" />
              <span className="line-clamp-2">{selectedJobPack.scope}</span>
            </div>
          )}

          {/* Document Status */}
          <div className="pt-3 border-t border-white/[0.06]">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white mb-2">
              Document Status
            </p>
            <div className="flex flex-wrap gap-2">
              {getDocumentStatus(selectedJobPack).map((status, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                    status.complete
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-white/[0.04] text-white border-white/[0.08]'
                  }`}
                >
                  {status.complete ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {status.label}
                </span>
              ))}
            </div>
          </div>

          {/* Hazards if available */}
          {selectedJobPack.hazards && selectedJobPack.hazards.length > 0 && (
            <div className="pt-3 border-t border-white/[0.06]">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white mb-2">
                Identified Hazards
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedJobPack.hazards.slice(0, 5).map((hazard, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-white/[0.04] text-white border-white/[0.08]"
                  >
                    {hazard}
                  </span>
                ))}
                {selectedJobPack.hazards.length > 5 && (
                  <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-white/[0.04] text-white border-white/[0.08]">
                    +{selectedJobPack.hazards.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </FormCard>
      )}
    </div>
  );
}
