import { Clock, ChevronDown, Briefcase, FileText, Calendar, MapPin, AlertTriangle } from "lucide-react";
import { JobDetails } from "@/types/quote";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface JobDetailsStepProps {
  jobDetails?: JobDetails;
  onUpdate: (jobDetails: JobDetails) => void;
}

const durationOptions = [
  { value: "Half day", label: "Half day" },
  { value: "1 day", label: "1 day" },
  { value: "2 days", label: "2 days" },
  { value: "3 days", label: "3 days" },
  { value: "1 week", label: "1 week" },
  { value: "2 weeks", label: "2 weeks" },
  { value: "3 weeks", label: "3 weeks" },
  { value: "1 month", label: "1 month" },
  { value: "Other", label: "Other..." },
];

export const JobDetailsStep = ({ jobDetails, onUpdate }: JobDetailsStepProps) => {
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (field: keyof JobDetails, value: string) => {
    onUpdate({
      ...(jobDetails || {}),
      [field]: value,
    } as JobDetails);
  };

  // Clean input styles
  const inputClassName = "w-full h-8 bg-transparent border-0 outline-none text-[16px] font-medium text-white placeholder:text-white/50 caret-elec-yellow";
  const textareaClassName = "w-full bg-transparent border-0 outline-none text-[16px] font-medium text-white placeholder:text-white/50 caret-elec-yellow resize-none";
  const selectClassName = "w-full h-8 bg-transparent text-[16px] font-medium text-white appearance-none cursor-pointer outline-none";

  return (
    <div className="space-y-4 text-left">
      {/* Job Information Section */}
      <div>
        <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5" />
          Job Information
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* Job Title */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white/70 block mb-0.5">Job Title *</label>
              <input
                value={jobDetails?.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <label className="text-[12px] text-white/70 block mb-1">Job Description *</label>
                <textarea
                  value={jobDetails?.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the scope of work..."
                  rows={4}
                  className={textareaClassName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div>
        <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          Schedule
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* Duration */}
          {jobDetails?.estimatedDuration === "Other" ? (
            <div className="flex items-center gap-3 p-4">
              <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <label className="text-[12px] text-white/70 block mb-0.5">Custom Duration</label>
                <div className="flex items-center gap-2">
                  <input
                    value={jobDetails?.customDuration || ""}
                    onChange={(e) => handleChange("customDuration", e.target.value)}
                    placeholder="Enter duration"
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={() => handleChange("estimatedDuration", "")}
                    className="text-[14px] text-elec-yellow font-medium shrink-0 touch-manipulation"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4">
              <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <label className="text-[12px] text-white/70 block mb-0.5">Estimated Duration</label>
                <div className="relative">
                  <select
                    value={jobDetails?.estimatedDuration || ""}
                    onChange={(e) => handleChange("estimatedDuration", e.target.value)}
                    className={selectClassName}
                  >
                    <option value="" disabled className="bg-zinc-900">Select duration</option>
                    {durationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-zinc-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Start Date */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white/70 block mb-0.5">Proposed Start Date</label>
              <input
                type="date"
                value={jobDetails?.workStartDate || ""}
                onChange={(e) => handleChange("workStartDate", e.target.value)}
                className={cn(inputClassName, "[color-scheme:dark]")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Toggle */}
      <button
        type="button"
        onClick={() => setShowOptional(!showOptional)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all touch-manipulation active:scale-[0.99]",
          "bg-white/[0.03] border border-white/[0.06]",
          showOptional && "bg-white/[0.05] border-white/[0.1]"
        )}
      >
        <span className="text-[14px] font-medium text-white/60">Additional Details (optional)</span>
        <ChevronDown className={cn(
          "h-4 w-4 text-white/30 transition-transform",
          showOptional && "rotate-180"
        )} />
      </button>

      {/* Optional Fields */}
      {showOptional && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* Work Location */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white/70 block mb-0.5">Work Location</label>
              <input
                value={jobDetails?.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="If different from client address"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Special Requirements */}
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-black" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <label className="text-[12px] text-white/70 block mb-1">Special Requirements</label>
                <textarea
                  value={jobDetails?.specialRequirements || ""}
                  onChange={(e) => handleChange("specialRequirements", e.target.value)}
                  placeholder="Access restrictions, working hours, safety considerations..."
                  rows={3}
                  className={textareaClassName}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
