/**
 * JobDetailSheet - Full job details bottom sheet
 * Parallax header, collapsible sections, sticky apply CTA
 */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Banknote,
  ChevronDown,
  ExternalLink,
  Bookmark,
  Share2,
  Star,
  Zap,
  CheckCircle2,
  Globe,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import { fadeUpVariants } from "./animations/variants";
import type { UnifiedJob } from "@/hooks/job-vacancies/useUnifiedJobSearch";

interface JobDetailSheetProps {
  job: UnifiedJob | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: UnifiedJob) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

// Company logo fallback
const CompanyLogo = ({ company, imageUrl }: { company: string; imageUrl?: string | null }) => {
  const initials = company
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={company}
        className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-2xl"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-600/50 to-slate-700/50 border-2 border-slate-500/30 flex items-center justify-center shadow-2xl">
      <span className="text-2xl font-bold text-slate-200">{initials}</span>
    </div>
  );
};

// Collapsible section component
const CollapsibleSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: typeof FileText;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon className="h-4 w-4 text-blue-400" />
          </div>
          <span className="font-semibold text-white group-hover:text-blue-200 transition-colors">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-1 text-sm text-white/70 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Stats grid item
const StatItem = ({
  icon: Icon,
  label,
  value,
  iconColor = "text-amber-400",
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
  iconColor?: string;
}) => (
  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={cn("h-4 w-4", iconColor)} />
      <span className="text-xs text-white/50">{label}</span>
    </div>
    <p className="font-semibold text-white text-sm">{value}</p>
  </div>
);

// Format posted date
const formatPostedDate = (date: string) => {
  const posted = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return posted.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

// Check if job is fresh
const isJobFresh = (postedDate: string) => {
  const posted = new Date(postedDate);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posted > oneDayAgo;
};

// Source badge color
const getSourceColor = (source: string) => {
  const colors: Record<string, string> = {
    Reed: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    Indeed: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    TotalJobs: "bg-green-500/20 border-green-500/30 text-green-300",
    "CV Library": "bg-orange-500/20 border-orange-500/30 text-orange-300",
    "Jobs.co.uk": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
  };
  return colors[source] || "bg-white/10 border-white/20 text-white/70";
};

const JobDetailSheet = ({
  job,
  isOpen,
  onClose,
  onApply,
  onSave,
  isSaved = false,
}: JobDetailSheetProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  // Parallax effect for header
  const headerY = useTransform(scrollY, [0, 100], [0, -30]);
  const headerOpacity = useTransform(scrollY, [0, 80], [1, 0.3]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  if (!job) return null;

  const isFresh = isJobFresh(job.posted_date);

  const handleApply = () => {
    if (onApply) {
      onApply(job);
    } else if (job.url) {
      window.open(job.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: job.url || window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else if (job.url) {
      navigator.clipboard.writeText(job.url);
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[95vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {/* Parallax Header */}
            <motion.div
              style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
              className="relative px-6 pb-6"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-background to-background pointer-events-none" />

              <div className="relative">
                {/* Company Logo & Badges */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <CompanyLogo company={job.company} imageUrl={job.image_url} />
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {isFresh && (
                      <Badge className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                        <Zap className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    )}
                    {job.source && (
                      <Badge className={cn("text-xs font-medium", getSourceColor(job.source))}>
                        {job.source}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Job Title */}
                <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                  {job.title}
                </h2>

                {/* Company */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-blue-400 font-semibold">{job.company}</p>
                </div>

                {/* Quick Info Row */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5">
                    <Briefcase className="h-4 w-4" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {formatPostedDate(job.posted_date)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={fadeUpVariants}
              initial="initial"
              animate="animate"
              className="px-6 pb-6"
            >
              <div className="grid grid-cols-2 gap-3">
                <StatItem
                  icon={Banknote}
                  label="Salary"
                  value={job.salary || "Not specified"}
                  iconColor="text-emerald-400"
                />
                <StatItem
                  icon={Briefcase}
                  label="Job Type"
                  value={job.type}
                  iconColor="text-blue-400"
                />
                <StatItem
                  icon={MapPin}
                  label="Location"
                  value={job.location}
                  iconColor="text-blue-400"
                />
                <StatItem
                  icon={Calendar}
                  label="Posted"
                  value={formatPostedDate(job.posted_date)}
                  iconColor="text-purple-400"
                />
              </div>
            </motion.div>

            {/* Collapsible Sections */}
            <div className="px-6 pb-32">
              {/* Job Description */}
              <CollapsibleSection title="Job Description" icon={FileText} defaultOpen>
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: job.description || "No description available.",
                  }}
                />
              </CollapsibleSection>

              {/* Requirements */}
              <CollapsibleSection title="Requirements" icon={CheckCircle2}>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Relevant electrical qualifications (NVQ Level 3 or equivalent)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Experience in commercial/domestic installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Valid ECS/CSCS card preferred</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Full UK driving licence</span>
                  </li>
                </ul>
              </CollapsibleSection>

              {/* Benefits */}
              <CollapsibleSection title="Benefits" icon={Star}>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Competitive salary package</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Company vehicle or car allowance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Pension scheme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Training and development opportunities</span>
                  </li>
                </ul>
              </CollapsibleSection>

              {/* Company Info */}
              <CollapsibleSection title="About Company" icon={Building2}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-white/40" />
                    <span className="font-medium text-white">{job.company}</span>
                  </div>
                  {job.source && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-white/40" />
                      <span>Listed on {job.source}</span>
                    </div>
                  )}
                  <p className="text-white/60">
                    Visit the company website or apply through the job listing to learn more about this employer.
                  </p>
                </div>
              </CollapsibleSection>
            </div>
          </div>

          {/* Sticky CTA Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-6">
            <div className="flex items-center gap-3">
              {/* Save Button */}
              {onSave && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onSave(job.id)}
                  className={cn(
                    "h-12 px-4 border-white/20 rounded-xl",
                    isSaved
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                      : "text-white hover:text-white hover:bg-white/10"
                  )}
                >
                  <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
                </Button>
              )}

              {/* Share Button */}
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="h-12 px-4 border-white/20 text-white hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Share2 className="h-5 w-5" />
              </Button>

              {/* Apply Button */}
              <Button
                size="lg"
                onClick={handleApply}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Apply Now
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default JobDetailSheet;
