/**
 * JobTypeSelectorDesktop - Inline popover combobox for job type selection
 *
 * Features:
 * - Popover dropdown (400px width)
 * - Searchable with Command component
 * - Grouped by category
 * - "Other / Unlisted Job" option
 */

import React, { useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useJobTypes, JobTypeConfig } from "@/hooks/useJobTypes";
import { cn } from "@/lib/utils";
import {
  FileText,
  ChevronDown,
  Search,
  Zap,
  Plug,
  AlertTriangle,
  Shield,
  Cable,
  Wrench,
  Building2,
  ClipboardCheck,
  Home,
  X,
  Check,
} from "lucide-react";

// Category icons
const CATEGORY_ICONS: Record<string, typeof Zap> = {
  "EV Charging": Zap,
  "Installation & Wiring": Plug,
  "Emergency & Call-outs": AlertTriangle,
  "Consumer Units & Boards": Shield,
  "Earthing & Bonding": Cable,
  "Repairs & Maintenance": Wrench,
  "Commercial & Industrial": Building2,
  "Testing & Certification": ClipboardCheck,
  "Smart Home": Home,
};

interface JobTypeSelectorDesktopProps {
  value: string | null;
  onChange: (jobType: string | null, config: JobTypeConfig | null) => void;
  className?: string;
}

const JobTypeSelectorDesktop: React.FC<JobTypeSelectorDesktopProps> = ({
  value,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data } = useJobTypes();
  const byCategory = data?.byCategory ?? {};
  const configs = data?.configs ?? [];

  // Find selected config
  const selectedConfig = useMemo(() => {
    if (!value || value === "Other") return null;
    return configs.find((c) => c.job_type === value) || null;
  }, [value, configs]);

  // Filter configs by search
  const filteredByCategory = useMemo(() => {
    if (!search.trim()) return byCategory;

    const query = search.toLowerCase();
    const filtered: Record<string, JobTypeConfig[]> = {};

    Object.entries(byCategory).forEach(([category, jobs]) => {
      const matchingJobs = jobs.filter(
        (job) =>
          job.job_type.toLowerCase().includes(query) ||
          job.job_category.toLowerCase().includes(query)
      );
      if (matchingJobs.length > 0) {
        filtered[category] = matchingJobs;
      }
    });

    return filtered;
  }, [search, byCategory]);

  const handleSelect = (jobType: string, config: JobTypeConfig | null) => {
    onChange(jobType, config);
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null, null);
  };

  const hasResults = Object.keys(filteredByCategory).length > 0;

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full h-14 justify-between text-left font-normal",
              "bg-neutral-800 border-2 border-white/10 hover:border-yellow-400/50 hover:bg-neutral-800",
              "rounded-xl px-4",
              value && "border-yellow-400/30"
            )}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  value ? "bg-yellow-400/20" : "bg-white/10"
                )}
              >
                <FileText
                  className={cn(
                    "h-5 w-5",
                    value ? "text-yellow-400" : "text-white/60"
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                {value ? (
                  <>
                    <p className="font-medium text-white truncate">{value}</p>
                    {selectedConfig && (
                      <p className="text-xs text-white/60 truncate">
                        {selectedConfig.job_category}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-white/30">Select job type...</p>
                )}
              </div>
            </div>
            {value ? (
              <X
                className="h-5 w-5 text-white/40 hover:text-white flex-shrink-0"
                onClick={handleClear}
              />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[400px] p-0 bg-neutral-900 border-white/10"
          align="start"
          sideOffset={8}
        >
          <Command className="bg-transparent" shouldFilter={false}>
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <CommandInput
                  placeholder="Search 77 job types..."
                  value={search}
                  onValueChange={setSearch}
                  className={cn(
                    "h-10 pl-9 bg-neutral-800 border-white/10 rounded-lg text-white text-sm",
                    "placeholder:text-white/30 focus:border-yellow-400/50"
                  )}
                />
              </div>
            </div>

            <CommandList className="max-h-[350px] overflow-y-auto p-2">
              {!hasResults && search && (
                <CommandEmpty className="py-6 text-center">
                  <Search className="h-6 w-6 mx-auto text-white/20 mb-2" />
                  <p className="text-sm text-white/60">No jobs match "{search}"</p>
                  <Button
                    variant="link"
                    className="text-yellow-400 text-sm mt-1"
                    onClick={() => handleSelect("Other", null)}
                  >
                    Use "Other / Unlisted Job"
                  </Button>
                </CommandEmpty>
              )}

              {Object.entries(filteredByCategory).map(([category, jobs]) => {
                const CategoryIcon = CATEGORY_ICONS[category] || FileText;
                return (
                  <CommandGroup
                    key={category}
                    heading={
                      <div className="flex items-center gap-2 py-1.5 text-white/70">
                        <CategoryIcon className="h-3.5 w-3.5 text-yellow-400" />
                        <span className="font-medium text-xs">{category}</span>
                        <span className="text-[10px] text-white/40">
                          ({jobs.length})
                        </span>
                      </div>
                    }
                    className="mb-1"
                  >
                    {jobs.map((job) => (
                      <CommandItem
                        key={job.job_type}
                        value={job.job_type}
                        onSelect={() => handleSelect(job.job_type, job)}
                        className={cn(
                          "rounded-lg cursor-pointer py-2 px-3",
                          "hover:bg-white/5",
                          value === job.job_type && "bg-yellow-400/10"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-white truncate">
                              {job.job_type}
                            </p>
                            <p className="text-[11px] text-white/50">
                              Per {job.unit}
                              {job.attributes && job.attributes.length > 0 && (
                                <span className="text-yellow-400/70 ml-1">
                                  • Has options
                                </span>
                              )}
                            </p>
                          </div>
                          {value === job.job_type && (
                            <Check className="h-4 w-4 text-yellow-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}

              {/* Other / Unlisted option */}
              <div className="pt-2 border-t border-white/10 mt-2">
                <CommandItem
                  value="Other"
                  onSelect={() => handleSelect("Other", null)}
                  className={cn(
                    "rounded-lg cursor-pointer py-2 px-3",
                    "hover:bg-white/5",
                    value === "Other" && "bg-yellow-400/10"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-white/40" />
                      <div>
                        <p className="text-sm text-white">Other / Unlisted Job</p>
                        <p className="text-[11px] text-white/50">
                          Describe your job manually
                        </p>
                      </div>
                    </div>
                    {value === "Other" && (
                      <Check className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                </CommandItem>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default JobTypeSelectorDesktop;
