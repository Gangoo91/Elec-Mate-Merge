import { useParams, useSearchParams } from "react-router-dom";
import { usePublicElecIdByToken, usePublicElecIdByNumber } from "@/hooks/usePublicElecId";
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
  Star,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ECS Card colour mapping
const getECSCardColor = (cardType: string | null) => {
  if (!cardType) return { bg: "bg-gray-500", text: "Gray" };

  const normalised = cardType.toLowerCase().trim();

  // Direct colour matches
  if (normalised.includes("gold")) return { bg: "bg-yellow-500", text: "Gold" };
  if (normalised.includes("blue")) return { bg: "bg-blue-500", text: "Blue" };
  if (normalised.includes("black")) return { bg: "bg-gray-900", text: "Black" };
  if (normalised.includes("green")) return { bg: "bg-green-500", text: "Green" };
  if (normalised.includes("yellow")) return { bg: "bg-yellow-400", text: "Yellow" };
  if (normalised.includes("red")) return { bg: "bg-red-500", text: "Red" };
  if (normalised.includes("white")) return { bg: "bg-white border border-gray-300", text: "White" };

  return { bg: "bg-gray-500", text: "Gray" };
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

export default function PublicElecIdView() {
  const { token, elecIdNumber } = useParams<{ token?: string; elecIdNumber?: string }>();
  const [searchParams] = useSearchParams();

  // Determine which type of lookup we're doing
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
            <Loader2 className="h-16 w-16 animate-spin text-yellow-500 mx-auto mb-4 relative" />
          </div>
          <p className="text-slate-300 text-lg">Verifying credentials...</p>
          <p className="text-slate-500 text-sm mt-1">Powered by Elec-ID</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="p-5 rounded-full bg-red-500/10 w-fit mx-auto mb-6">
            <ShieldAlert className="h-16 w-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Profile Not Found</h1>
          <p className="text-slate-400 mb-6">
            {isTokenLookup
              ? "This share link is invalid, expired, or has been deactivated."
              : "This Elec-ID number could not be verified. Please check the number and try again."}
          </p>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-slate-300 text-sm">
              If you believe this is an error, contact the credential holder directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { profile, sections, expiresAt } = data;
  const ecsColor = getECSCardColor(profile.ecs_card_type);
  const employee = profile.employee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Verification Badge Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-yellow-500/20">
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            <span className="font-semibold text-white">Elec-ID</span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5",
              profile.is_verified
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
            )}
          >
            {profile.is_verified ? (
              <>
                <ShieldCheck className="h-3.5 w-3.5" />
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
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Profile Hero Card */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

          <div className="relative p-6">
            {/* Photo and Name */}
            <div className="flex items-start gap-4 mb-6">
              {employee?.photo_url ? (
                <img
                  src={employee.photo_url}
                  alt={employee.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-600 shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-400">
                    {employee?.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-white truncate">
                  {employee?.name || "Unknown"}
                </h1>
                <p className="text-slate-400 text-sm truncate">
                  {employee?.role || "Electrical Professional"}
                </p>

                {/* Elec-ID Number */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-500">ID:</span>
                  <code className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                    {profile.elec_id_number}
                  </code>
                </div>
              </div>
            </div>

            {/* ECS Card Display */}
            {sections.includes("basics") && profile.ecs_card_type && (
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-14 rounded-lg shadow-lg", ecsColor.bg)} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">ECS Card</p>
                    <p className="font-semibold text-white">{profile.ecs_card_type}</p>
                    {profile.ecs_expiry_date && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        Expires: {formatDate(profile.ecs_expiry_date)}
                      </p>
                    )}
                  </div>
                  {profile.ecs_card_number && (
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Card No.</p>
                      <p className="text-sm font-mono text-slate-300">{profile.ecs_card_number}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Info (if included in basics) */}
            {sections.includes("basics") && (employee?.email || employee?.phone) && (
              <div className="flex flex-wrap gap-3">
                {employee?.email && (
                  <a
                    href={`mailto:${employee.email}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 text-sm hover:bg-slate-700/50 transition-colors touch-manipulation"
                  >
                    <Mail className="h-4 w-4 text-blue-400" />
                    <span className="truncate max-w-[150px]">{employee.email}</span>
                  </a>
                )}
                {employee?.phone && (
                  <a
                    href={`tel:${employee.phone}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 text-sm hover:bg-slate-700/50 transition-colors touch-manipulation"
                  >
                    <Phone className="h-4 w-4 text-green-400" />
                    {employee.phone}
                  </a>
                )}
              </div>
            )}

            {/* Bio */}
            {sections.includes("basics") && profile.bio && (
              <div className="mt-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <p className="text-sm text-slate-300 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Specialisations */}
            {sections.includes("basics") && profile.specialisations && profile.specialisations.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.specialisations.map((spec, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Verification Stats */}
        {profile.is_verified && (
          <section className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <BadgeCheck className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-green-400">Verified Professional</p>
                <p className="text-sm text-green-300/70">
                  Credentials verified on {formatDate(profile.verified_at)}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Qualifications Section */}
        {sections.includes("qualifications") && profile.qualifications && profile.qualifications.length > 0 && (
          <section className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <GraduationCap className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="font-semibold text-white">Qualifications</h2>
              <Badge variant="outline" className="ml-auto text-slate-400 border-slate-600">
                {profile.qualifications.length}
              </Badge>
            </div>

            <div className="divide-y divide-slate-700/50">
              {profile.qualifications.map((qual) => (
                <div key={qual.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white">{qual.qualification_name}</h3>
                      {qual.awarding_body && (
                        <p className="text-sm text-slate-400">{qual.awarding_body}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {qual.date_achieved && (
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(qual.date_achieved)}
                          </span>
                        )}
                        {qual.certificate_number && (
                          <span className="text-xs font-mono text-slate-500">
                            #{qual.certificate_number}
                          </span>
                        )}
                      </div>
                    </div>
                    {qual.is_verified && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    )}
                  </div>
                  {qual.expiry_date && (
                    <div
                      className={cn(
                        "mt-2 text-xs px-2 py-1 rounded-md inline-flex items-center gap-1",
                        new Date(qual.expiry_date) < new Date()
                          ? "bg-red-500/10 text-red-400"
                          : "bg-slate-700/50 text-slate-400"
                      )}
                    >
                      <Clock className="h-3 w-3" />
                      {new Date(qual.expiry_date) < new Date() ? "Expired" : "Expires"}: {formatDate(qual.expiry_date)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {sections.includes("skills") && profile.skills && profile.skills.length > 0 && (
          <section className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Wrench className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="font-semibold text-white">Skills</h2>
              <Badge variant="outline" className="ml-auto text-slate-400 border-slate-600">
                {profile.skills.length}
              </Badge>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={cn(
                      "px-3 py-2 rounded-lg border",
                      getSkillLevelColor(skill.skill_level)
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{skill.skill_name}</span>
                      {skill.is_verified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs opacity-75 capitalize">{skill.skill_level}</span>
                      {skill.years_experience > 0 && (
                        <span className="text-xs opacity-60">
                          {skill.years_experience} yr{skill.years_experience !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Work Experience Section */}
        {sections.includes("experience") && profile.work_history && profile.work_history.length > 0 && (
          <section className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Briefcase className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="font-semibold text-white">Experience</h2>
              <Badge variant="outline" className="ml-auto text-slate-400 border-slate-600">
                {profile.work_history.length}
              </Badge>
            </div>

            <div className="divide-y divide-slate-700/50">
              {profile.work_history.map((job) => (
                <div key={job.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-700/50 shrink-0">
                      <Building2 className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-white">{job.job_title}</h3>
                          <p className="text-sm text-slate-400">{job.employer_name}</p>
                        </div>
                        {job.is_current && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 shrink-0">
                            Current
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(job.start_date)} - {job.is_current ? "Present" : formatDate(job.end_date)}
                        </span>
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                        )}
                      </div>

                      {job.description && (
                        <p className="mt-2 text-sm text-slate-400">{job.description}</p>
                      )}

                      {job.projects && job.projects.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {job.projects.slice(0, 3).map((project, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-slate-700/30 text-slate-400 border-slate-600"
                            >
                              {project}
                            </Badge>
                          ))}
                          {job.projects.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-slate-700/30 text-slate-400 border-slate-600"
                            >
                              +{job.projects.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {(job.is_verified || job.verified_by_employer) && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
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

        {/* Training Section */}
        {sections.includes("training") && profile.training && profile.training.length > 0 && (
          <section className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
            <div className="p-4 border-b border-slate-700/50 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Award className="h-5 w-5 text-green-400" />
              </div>
              <h2 className="font-semibold text-white">Training & Certifications</h2>
              <Badge variant="outline" className="ml-auto text-slate-400 border-slate-600">
                {profile.training.length}
              </Badge>
            </div>

            <div className="divide-y divide-slate-700/50">
              {profile.training.map((training) => (
                <div key={training.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white">{training.training_name}</h3>
                      {training.provider && (
                        <p className="text-sm text-slate-400">{training.provider}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {training.completed_date && (
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Completed: {formatDate(training.completed_date)}
                          </span>
                        )}
                        {training.certificate_id && (
                          <span className="text-xs font-mono text-slate-500">
                            #{training.certificate_id}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        training.status === "active" || training.status === "completed"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-slate-700/50 text-slate-400 border-slate-600"
                      )}
                    >
                      {training.status}
                    </Badge>
                  </div>
                  {training.expiry_date && (
                    <div
                      className={cn(
                        "mt-2 text-xs px-2 py-1 rounded-md inline-flex items-center gap-1",
                        new Date(training.expiry_date) < new Date()
                          ? "bg-red-500/10 text-red-400"
                          : "bg-slate-700/50 text-slate-400"
                      )}
                    >
                      <Clock className="h-3 w-3" />
                      {new Date(training.expiry_date) < new Date() ? "Expired" : "Expires"}: {formatDate(training.expiry_date)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Limited Access Notice */}
        {isTokenLookup && sections.length < 5 && (
          <section className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300">
                  This is a limited profile view. The credential holder has chosen to share only specific sections.
                </p>
                {expiresAt && (
                  <p className="text-xs text-slate-500 mt-1">
                    This link expires on {formatDate(expiresAt)}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-slate-400">Powered by Elec-ID</span>
            </div>
            <a
              href="https://elec-mate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 touch-manipulation"
            >
              Learn more
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
