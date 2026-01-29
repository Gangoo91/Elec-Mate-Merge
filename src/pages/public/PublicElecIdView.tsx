import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePublicElecIdByToken, usePublicElecIdByNumber, PublicDocument } from "@/hooks/usePublicElecId";
import {
  Loader2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Award,
  Briefcase,
  GraduationCap,
  Wrench,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  BadgeCheck,
  Copy,
  FileText,
  X,
  Star,
  Verified,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getQualificationLabel, getJobTitleLabel } from "@/data/uk-electrician-constants";

// ECS Card colour mapping with proper styling
const getECSCardStyle = (cardType: string | null) => {
  if (!cardType) return { bg: "#6B7280", label: "Not Set", textColor: "white" };

  const normalised = cardType.toLowerCase().trim();

  if (normalised.includes("gold")) return { bg: "#D4AF37", label: "Gold Card", textColor: "#1a1a2e" };
  if (normalised.includes("blue")) return { bg: "#2563EB", label: "Blue Card", textColor: "white" };
  if (normalised.includes("black")) return { bg: "#1F2937", label: "Black Card", textColor: "white" };
  if (normalised.includes("green")) return { bg: "#16A34A", label: "Green Card", textColor: "white" };
  if (normalised.includes("yellow")) return { bg: "#EAB308", label: "Yellow Card", textColor: "#1a1a2e" };
  if (normalised.includes("red")) return { bg: "#DC2626", label: "Red Card", textColor: "white" };
  if (normalised.includes("white")) return { bg: "#F9FAFB", label: "White Card", textColor: "#1a1a2e" };

  return { bg: "#6B7280", label: cardType, textColor: "white" };
};

const formatDate = (date: string | null) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getSkillLevelColor = (level: string) => {
  switch (level?.toLowerCase()) {
    case "expert":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "advanced":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "intermediate":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "beginner":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

// Get display name - format properly
const getDisplayName = (name: string | undefined | null): string => {
  if (!name) return "Unknown";
  // If it looks like an email, extract the name part
  if (name.includes("@")) {
    return name.split("@")[0];
  }
  // Capitalise first letter of each word
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Get role display - use job title label if it's a code
const getRoleDisplay = (role: string | undefined | null): string => {
  if (!role) return "Electrical Professional";
  // Try to get proper label from job titles
  const label = getJobTitleLabel(role);
  if (label !== role) return label;
  // Capitalise and format
  return role
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Full-screen image viewer
function ImageViewer({
  imageUrl,
  title,
  onClose
}: {
  imageUrl: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors touch-manipulation z-10"
        aria-label="Close"
      >
        <X className="h-6 w-6 text-white" />
      </button>
      <div className="max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <p className="text-white text-sm mb-4 text-center font-medium">{title}</p>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  );
}

export default function PublicElecIdView() {
  const { token, elecIdNumber } = useParams<{ token?: string; elecIdNumber?: string }>();
  const [copiedId, setCopiedId] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<{ url: string; title: string } | null>(null);

  const isTokenLookup = !!token;
  const isNumberLookup = !!elecIdNumber;

  const {
    data: tokenData,
    isLoading: tokenLoading,
    error: tokenError,
  } = usePublicElecIdByToken(isTokenLookup ? token : undefined);

  const {
    data: numberData,
    isLoading: numberLoading,
    error: numberError,
  } = usePublicElecIdByNumber(isNumberLookup ? elecIdNumber : undefined);

  const isLoading = tokenLoading || numberLoading;
  const error = tokenError || numberError;
  const data = tokenData || numberData;

  const copyElecId = () => {
    if (data?.profile?.elec_id_number) {
      navigator.clipboard.writeText(data.profile.elec_id_number);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Find document for a qualification or training item
  const findDocument = (itemName: string, type: "qualification" | "training"): PublicDocument | null => {
    if (!data?.documents) return null;
    return data.documents.find(
      (doc) =>
        doc.document_type === type &&
        (doc.document_name?.toLowerCase().includes(itemName.toLowerCase()) ||
         itemName.toLowerCase().includes(doc.document_name?.toLowerCase() || ""))
    ) || null;
  };

  const findEcsDocument = (): PublicDocument | null => {
    if (!data?.documents) return null;
    return data.documents.find((doc) => doc.document_type === "ecs_card") || null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-yellow-500/30 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-yellow-500 to-amber-600 p-4 rounded-2xl">
              <Loader2 className="h-12 w-12 animate-spin text-white" />
            </div>
          </div>
          <p className="text-white text-lg font-medium mt-6">Verifying credentials...</p>
          <p className="text-slate-500 text-sm mt-2">Powered by Elec-ID</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex p-5 rounded-2xl bg-red-500/10 mb-6">
            <ShieldAlert className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Profile Not Found</h1>
          <p className="text-slate-400 mb-6 leading-relaxed">
            {isTokenLookup
              ? "This share link is invalid, expired, or has been deactivated."
              : "This Elec-ID number could not be verified. Please check the number and try again."}
          </p>
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <p className="text-slate-300 text-sm">
              If you believe this is an error, contact the credential holder directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { profile, sections, expiresAt, documents } = data;
  const ecsStyle = getECSCardStyle(profile.ecs_card_type);
  const employee = profile.employee;
  const ecsDocument = findEcsDocument();

  const displayName = getDisplayName(employee?.name);
  const displayRole = getRoleDisplay(employee?.role);
  const initials = displayName
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a]">
      {/* Document Image Viewer */}
      {viewingDocument && (
        <ImageViewer
          imageUrl={viewingDocument.url}
          title={viewingDocument.title}
          onClose={() => setViewingDocument(null)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight">Elec-ID</span>
              <span className="text-[10px] text-slate-500 block -mt-0.5 tracking-wider uppercase">Verified Credentials</span>
            </div>
          </div>
          <Badge
            className={cn(
              "gap-1.5 px-3 py-1.5 font-medium",
              profile.is_verified
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            )}
          >
            {profile.is_verified ? (
              <>
                <Verified className="h-3.5 w-3.5" />
                Verified
              </>
            ) : (
              <>
                <Shield className="h-3.5 w-3.5" />
                Registered
              </>
            )}
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-28">

        {/* Profile Hero Card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1e3f] via-[#1a1a2e] to-[#151525] border border-white/10 shadow-2xl">
          {/* Premium accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative p-6 sm:p-8">
            {/* Profile Header */}
            <div className="flex items-start gap-5">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                {employee?.photo_url ? (
                  <img
                    src={employee.photo_url}
                    alt={displayName}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border-2 border-white/20 flex items-center justify-center shadow-xl">
                    <span className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                      {initials || "?"}
                    </span>
                  </div>
                )}
                {/* Verified badge */}
                {profile.is_verified && (
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center border-3 border-[#1a1a2e] shadow-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              {/* Name & Details */}
              <div className="flex-1 min-w-0 pt-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {displayName}
                </h1>
                <p className="text-yellow-400 font-semibold text-base sm:text-lg mt-1">
                  {displayRole}
                </p>

                {/* ID Badge */}
                <button
                  onClick={copyElecId}
                  className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all touch-manipulation group"
                >
                  <span className="text-xs text-slate-500 font-medium">ID</span>
                  <code className="text-sm font-mono text-yellow-400 font-bold tracking-wider">
                    {profile.elec_id_number}
                  </code>
                  {copiedId ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* ECS Card Section */}
            {sections.includes("basics") && profile.ecs_card_type && (
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center gap-4">
                  {/* Card Visual */}
                  <div
                    className="w-14 h-20 rounded-xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: ecsStyle.bg }}
                  >
                    <span className="text-[10px] font-black tracking-wider" style={{ color: ecsStyle.textColor }}>ECS</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-black/10" />
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-lg">{ecsStyle.label}</span>
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    {profile.ecs_expiry_date && (
                      <p className={cn(
                        "text-sm flex items-center gap-1.5 mt-1",
                        new Date(profile.ecs_expiry_date) < new Date() ? "text-red-400" : "text-slate-400"
                      )}>
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(profile.ecs_expiry_date) < new Date() ? "Expired" : "Expires"}: {formatDate(profile.ecs_expiry_date)}
                      </p>
                    )}
                    {profile.ecs_card_number && (
                      <p className="text-xs text-slate-500 font-mono mt-1">
                        Card #{profile.ecs_card_number}
                      </p>
                    )}
                  </div>

                  {/* View Button */}
                  {ecsDocument?.file_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-xl"
                      onClick={() => setViewingDocument({ url: ecsDocument.file_url!, title: "ECS Card" })}
                    >
                      <FileText className="h-4 w-4 mr-1.5" />
                      View
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Contact Buttons */}
            {sections.includes("basics") && (employee?.email || employee?.phone) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {employee?.email && (
                  <a
                    href={`mailto:${employee.email}`}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-all touch-manipulation min-h-[48px]"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                )}
                {employee?.phone && (
                  <a
                    href={`tel:${employee.phone}`}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all touch-manipulation min-h-[48px]"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                )}
              </div>
            )}

            {/* Bio */}
            {sections.includes("basics") && profile.bio && (
              <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <p className="text-sm text-slate-300 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Specialisations */}
            {sections.includes("basics") && profile.specialisations && profile.specialisations.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.specialisations.map((spec, idx) => (
                  <Badge
                    key={idx}
                    className="bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 px-3 py-1.5 text-xs font-medium"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Verification Banner */}
        {profile.is_verified && (
          <section className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <BadgeCheck className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-emerald-400 text-lg">Verified Professional</p>
                <p className="text-sm text-emerald-300/70">
                  Credentials verified on {formatDate(profile.verified_at)}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Qualifications */}
        {sections.includes("qualifications") && profile.qualifications && profile.qualifications.length > 0 && (
          <section className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20">
                <GraduationCap className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="font-bold text-white text-lg">Qualifications</h2>
              <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/30">
                {profile.qualifications.length}
              </Badge>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {profile.qualifications.map((qual) => {
                const qualDoc = findDocument(qual.qualification_name, "qualification");
                return (
                  <div key={qual.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white text-base">
                            {getQualificationLabel(qual.qualification_name)}
                          </h3>
                          {qual.is_verified && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                        {qual.awarding_body && (
                          <p className="text-sm text-slate-400 mt-1">{qual.awarding_body}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {qual.date_achieved && (
                            <span className="text-xs text-slate-500 flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(qual.date_achieved)}
                            </span>
                          )}
                          {qual.certificate_number && (
                            <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded">
                              #{qual.certificate_number}
                            </span>
                          )}
                        </div>
                      </div>
                      {qualDoc?.file_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 text-xs border-purple-500/30 text-purple-400 hover:bg-purple-500/10 rounded-xl shrink-0"
                          onClick={() => setViewingDocument({
                            url: qualDoc.file_url!,
                            title: getQualificationLabel(qual.qualification_name)
                          })}
                        >
                          <FileText className="h-4 w-4 mr-1.5" />
                          View
                        </Button>
                      )}
                    </div>
                    {qual.expiry_date && (
                      <div
                        className={cn(
                          "mt-3 text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5",
                          new Date(qual.expiry_date) < new Date()
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-slate-800/50 text-slate-400 border border-slate-700/50"
                        )}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(qual.expiry_date) < new Date() ? "Expired" : "Expires"}: {formatDate(qual.expiry_date)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {sections.includes("skills") && profile.skills && profile.skills.length > 0 && (
          <section className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20">
                <Wrench className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="font-bold text-white text-lg">Skills</h2>
              <Badge className="ml-auto bg-blue-500/20 text-blue-400 border-blue-500/30">
                {profile.skills.length}
              </Badge>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={cn(
                      "px-4 py-2.5 rounded-xl border",
                      getSkillLevelColor(skill.skill_level)
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{skill.skill_name}</span>
                      {skill.is_verified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs opacity-75 capitalize">{skill.skill_level}</span>
                      {skill.years_experience > 0 && (
                        <span className="text-xs opacity-60">
                          • {skill.years_experience} yr{skill.years_experience !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {sections.includes("experience") && profile.work_history && profile.work_history.length > 0 && (
          <section className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20">
                <Briefcase className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="font-bold text-white text-lg">Experience</h2>
              <Badge className="ml-auto bg-amber-500/20 text-amber-400 border-amber-500/30">
                {profile.work_history.length}
              </Badge>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {profile.work_history.map((job) => (
                <div key={job.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-800/50 shrink-0">
                      <Building2 className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">{job.job_title}</h3>
                          <p className="text-sm text-slate-400">{job.employer_name}</p>
                        </div>
                        {job.is_current && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shrink-0">
                            Current
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(job.start_date)} - {job.is_current ? "Present" : formatDate(job.end_date)}
                        </span>
                        {job.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                        )}
                      </div>

                      {job.description && (
                        <p className="mt-3 text-sm text-slate-400 leading-relaxed">{job.description}</p>
                      )}

                      {job.projects && job.projects.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.projects.slice(0, 3).map((project, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-slate-800/50 text-slate-400 border-slate-700"
                            >
                              {project}
                            </Badge>
                          ))}
                          {job.projects.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-slate-800/50 text-slate-400 border-slate-700">
                              +{job.projects.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {(job.is_verified || job.verified_by_employer) && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {job.verified_by_employer ? "Verified by employer" : "Verified"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Training */}
        {sections.includes("training") && profile.training && profile.training.length > 0 && (
          <section className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20">
                <Award className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="font-bold text-white text-lg">Training & Certifications</h2>
              <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {profile.training.length}
              </Badge>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {profile.training.map((training) => {
                const trainingDoc = findDocument(training.training_name, "training");
                return (
                  <div key={training.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white">{training.training_name}</h3>
                        {training.provider && (
                          <p className="text-sm text-slate-400 mt-1">{training.provider}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          {training.completed_date && (
                            <span className="text-xs text-slate-500 flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(training.completed_date)}
                            </span>
                          )}
                          {training.certificate_id && (
                            <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded">
                              #{training.certificate_id}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          className={cn(
                            training.status === "active" || training.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : "bg-slate-800/50 text-slate-400 border-slate-700"
                          )}
                        >
                          {training.status}
                        </Badge>
                        {trainingDoc?.file_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-10 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl"
                            onClick={() => setViewingDocument({
                              url: trainingDoc.file_url!,
                              title: training.training_name
                            })}
                          >
                            <FileText className="h-4 w-4 mr-1.5" />
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                    {training.expiry_date && (
                      <div
                        className={cn(
                          "mt-3 text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5",
                          new Date(training.expiry_date) < new Date()
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-slate-800/50 text-slate-400 border border-slate-700/50"
                        )}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(training.expiry_date) < new Date() ? "Expired" : "Expires"}: {formatDate(training.expiry_date)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Limited Access Notice */}
        {isTokenLookup && sections.length < 5 && (
          <section className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-400">
                  This is a limited profile view. The credential holder has chosen to share only specific sections.
                </p>
                {expiresAt && (
                  <p className="text-xs text-slate-500 mt-2">
                    This link expires on {formatDate(expiresAt)}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0f0f1a]/95 backdrop-blur-xl border-t border-white/5 safe-area-pb">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">Powered by Elec-ID</span>
            </div>
            <a
              href="https://elec-mate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-white flex items-center gap-1.5 touch-manipulation min-h-[44px] px-3 -mr-3 transition-colors"
            >
              Learn more
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
