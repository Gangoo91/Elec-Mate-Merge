import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobPacks } from "@/hooks/useJobPacks";
import {
  Package,
  MapPin,
  FileText,
  Shield,
  ClipboardList,
  Users,
  Plus,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

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

  const selectedJobPack = jobPacks.find(jp => jp.id === selectedJobPackId);

  // Get status badges for a job pack
  const getDocumentStatus = (jp: typeof jobPacks[0]) => {
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
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Job Pack Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Select Job Pack</label>
        <Select
          value={selectedJobPackId || ""}
          onValueChange={(value) => onSelect(value || null)}
        >
          <SelectTrigger className="w-full bg-elec-gray border-elec-yellow/20">
            <SelectValue placeholder="Choose a job pack..." />
          </SelectTrigger>
          <SelectContent>
            {jobPacks.length === 0 ? (
              <SelectItem value="none" disabled>
                No job packs available
              </SelectItem>
            ) : (
              jobPacks
                .filter(jp => jp.status !== 'Completed')
                .map((jp) => (
                  <SelectItem key={jp.id} value={jp.id}>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-elec-yellow" />
                      <span>{jp.title}</span>
                      {jp.status === 'In Progress' && (
                        <Badge variant="secondary" className="text-xs bg-success/20 text-success">
                          Active
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Create New Option */}
      {onCreateNew && (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-dashed border-elec-yellow/30 text-muted-foreground hover:text-elec-yellow"
          onClick={onCreateNew}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Job Pack
        </Button>
      )}

      {/* Selected Job Pack Details */}
      {selectedJobPack && showStatus && (
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-foreground">{selectedJobPack.title}</h4>
                {selectedJobPack.client && (
                  <p className="text-sm text-muted-foreground">{selectedJobPack.client}</p>
                )}
              </div>
              <Badge
                variant="secondary"
                className={
                  selectedJobPack.status === 'In Progress'
                    ? 'bg-success/20 text-success'
                    : selectedJobPack.status === 'Draft'
                    ? 'bg-warning/20 text-warning'
                    : ''
                }
              >
                {selectedJobPack.status}
              </Badge>
            </div>

            {/* Location */}
            {selectedJobPack.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{selectedJobPack.location}</span>
              </div>
            )}

            {/* Scope Preview */}
            {selectedJobPack.scope && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{selectedJobPack.scope}</span>
              </div>
            )}

            {/* Document Status */}
            <div className="pt-2 border-t border-elec-yellow/10">
              <p className="text-xs text-muted-foreground mb-2">Document Status</p>
              <div className="flex flex-wrap gap-2">
                {getDocumentStatus(selectedJobPack).map((status, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className={`text-xs ${
                      status.complete
                        ? 'bg-success/20 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {status.complete ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {status.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Hazards if available */}
            {selectedJobPack.hazards && selectedJobPack.hazards.length > 0 && (
              <div className="pt-2 border-t border-elec-yellow/10">
                <p className="text-xs text-muted-foreground mb-2">Identified Hazards</p>
                <div className="flex flex-wrap gap-1">
                  {selectedJobPack.hazards.slice(0, 5).map((hazard, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {hazard}
                    </Badge>
                  ))}
                  {selectedJobPack.hazards.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{selectedJobPack.hazards.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
