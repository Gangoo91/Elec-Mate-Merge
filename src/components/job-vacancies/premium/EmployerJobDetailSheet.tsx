/**
 * EmployerJobDetailSheet - Full job details for employer-posted jobs
 * Features "Apply with Elec-ID" with profile preview
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
  Bookmark,
  Share2,
  Zap,
  CheckCircle2,
  Calendar,
  FileText,
  Shield,
  BadgeCheck,
  Send,
  MessageSquare,
  Eye,
  Users,
  Award,
} from "lucide-react";
import { fadeUpVariants } from "./animations/variants";
import type { UnifiedJobListing } from "@/types/unified-jobs";

interface EmployerJobDetailSheetProps {
  job: UnifiedJobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (job: UnifiedJobListing) => void;
  onSave?: (jobId: string) => void;
  onMessage?: (job: UnifiedJobListing) => void;
  isSaved?: boolean;
}

// Company logo with employer styling
const CompanyLogo = ({
  company,
  imageUrl,
}: {
  company: string;
  imageUrl?: string;
}) => {
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
        className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400/30 shadow-2xl"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-teal-500/40 border-2 border-emerald-400/30 flex items-center justify-center shadow-2xl">
      <span className="text-2xl font-bold text-emerald-200">{initials}</span>
    </div>
  );
};

// Collapsible section
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
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="font-semibold text-white group-hover:text-emerald-200 transition-colors">
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
            <div className="pb-4 px-1 text-sm text-white/70 leading-relaxed">{children}</div>
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
  iconColor = "text-emerald-400",
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

const EmployerJobDetailSheet = ({
  job,
  isOpen,
  onClose,
  onApply,
  onSave,
  onMessage,
  isSaved = false,
}: EmployerJobDetailSheetProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  const headerY = useTransform(scrollY, [0, 100], [0, -30]);
  const headerOpacity = useTransform(scrollY, [0, 80], [1, 0.3]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  if (!job) return null;

  const isFresh = isJobFresh(job.posted_date);

  const handleApply = () => {
    if (onApply && !job.has_applied) {
      onApply(job);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
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
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain">
            {/* Parallax Header */}
            <motion.div
              style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
              className="relative px-6 pb-6"
            >
              {/* Background gradient - emerald for employer jobs */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-background to-background pointer-events-none" />

              <div className="relative">
                {/* Company Logo & Badges */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <CompanyLogo company={job.company} imageUrl={job.employer_logo} />
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {isFresh && (
                      <Badge className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                        <Zap className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    )}
                    <Badge className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                      <Shield className="h-3 w-3 mr-1" />
                      Direct Employer
                    </Badge>
                  </div>
                </div>

                {/* Job Title */}
                <h2 className="text-2xl font-bold text-white leading-tight mb-2">{job.title}</h2>

                {/* Company with verified badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-semibold">{job.company}</p>
                  <BadgeCheck className="h-5 w-5 text-emerald-400" />
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

                {/* Applied status */}
                {job.has_applied && (
                  <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <BadgeCheck className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">
                      You've applied to this position
                    </span>
                  </div>
                )}
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
                  value={job.salary || "Competitive"}
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
                  iconColor="text-purple-400"
                />
                <StatItem
                  icon={Calendar}
                  label="Posted"
                  value={formatPostedDate(job.posted_date)}
                  iconColor="text-teal-400"
                />
              </div>

              {/* Job views */}
              {job.views !== undefined && (
                <div className="mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/[0.02] text-white/40 text-xs">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{job.views} people viewed this job</span>
                </div>
              )}
            </motion.div>

            {/* Collapsible Sections */}
            <div className="px-6 pb-32">
              {/* Job Description */}
              <CollapsibleSection title="Job Description" icon={FileText} defaultOpen>
                <p className="whitespace-pre-wrap">{job.description || "No description available."}</p>
              </CollapsibleSection>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <CollapsibleSection title="Requirements" icon={CheckCircle2}>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleSection>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <CollapsibleSection title="Benefits" icon={Award}>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleSection>
              )}

              {/* Company Info */}
              <CollapsibleSection title="About the Employer" icon={Building2}>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {job.employer_logo ? (
                      <img
                        src={job.employer_logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-emerald-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white flex items-center gap-2">
                        {job.company}
                        <BadgeCheck className="h-4 w-4 text-emerald-400" />
                      </p>
                      <p className="text-xs text-white/50">Verified Employer on Elec-Mate</p>
                    </div>
                  </div>
                  <p className="text-white/60">
                    This job is posted directly by the employer. When you apply, your complete Elec-ID profile will be shared with them.
                  </p>
                </div>
              </CollapsibleSection>

              {/* What gets shared */}
              <CollapsibleSection title="What's Shared When You Apply" icon={Shield}>
                <div className="space-y-3">
                  <p className="text-white/60 mb-3">
                    Your Elec-ID profile gives employers instant verification of your credentials:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Your name, contact details, and professional summary</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>ECS Card type and verification status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>All qualifications and certifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Work history and experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>Skills and specialisations</span>
                    </li>
                  </ul>
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
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "text-white hover:text-white hover:bg-white/10"
                  )}
                >
                  <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
                </Button>
              )}

              {/* Message Button */}
              {onMessage && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onMessage(job)}
                  className="h-12 px-4 border-white/20 text-white hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <MessageSquare className="h-5 w-5" />
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
                disabled={job.has_applied}
                className={cn(
                  "flex-1 h-12 font-semibold shadow-lg rounded-xl",
                  job.has_applied
                    ? "bg-slate-600 text-white shadow-slate-500/25"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25"
                )}
              >
                {job.has_applied ? (
                  <>
                    <BadgeCheck className="h-5 w-5 mr-2" />
                    Applied
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Apply with Elec-ID
                  </>
                )}
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default EmployerJobDetailSheet;
