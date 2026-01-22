import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, ChevronRight, Check, AlertCircle, Phone, Mail, MapPin, FileText } from "lucide-react";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { cn } from "@/lib/utils";

export const CompanyProfileSummary = () => {
  const navigate = useNavigate();
  const { companyProfile, loading } = useCompanyProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/[0.06] rounded-xl" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-white/[0.06] rounded" />
            <div className="h-3 w-24 bg-white/[0.06] rounded" />
          </div>
        </div>
      </div>
    );
  }

  const hasProfile = companyProfile?.company_name;
  const isComplete = hasProfile && companyProfile?.company_email && companyProfile?.company_phone;

  if (!hasProfile) {
    return (
      <button
        type="button"
        onClick={() => navigate("/settings?tab=company")}
        className="w-full rounded-2xl bg-amber-500/10 border border-amber-500/20 overflow-hidden touch-manipulation active:bg-amber-500/15 transition-colors"
      >
        <div className="flex items-center gap-3 p-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[15px] font-medium text-amber-400">Set Up Company Profile</p>
            <p className="text-[13px] text-white/50">Add your details for professional quotes</p>
          </div>
          <ChevronRight className="h-4 w-4 text-amber-400/50" />
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      {/* Main Summary Row */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-3.5 touch-manipulation active:bg-white/[0.04] transition-colors"
      >
        {/* Logo or Placeholder */}
        {companyProfile.logo_data_url ? (
          <img
            src={companyProfile.logo_data_url}
            alt={companyProfile.company_name}
            className="w-11 h-11 rounded-xl object-contain bg-white border border-white/10"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
            <Building className="h-5 w-5 text-black" />
          </div>
        )}

        {/* Company Info */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-medium text-white truncate">{companyProfile.company_name}</p>
            {isComplete && (
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-[13px] text-white/50 truncate">
            {companyProfile.company_email || "Tap to expand"}
          </p>
        </div>

        {/* Chevron */}
        <ChevronRight className={cn(
          "h-4 w-4 text-white/20 transition-transform",
          isExpanded && "rotate-90"
        )} />
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-white/[0.06] divide-y divide-white/[0.06]">
          {companyProfile.company_email && (
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-white truncate">{companyProfile.company_email}</p>
                <p className="text-[12px] text-white/40">Email</p>
              </div>
            </div>
          )}
          {companyProfile.company_phone && (
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-white">{companyProfile.company_phone}</p>
                <p className="text-[12px] text-white/40">Phone</p>
              </div>
            </div>
          )}
          {companyProfile.company_address && (
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-white truncate">{companyProfile.company_address}</p>
                <p className="text-[12px] text-white/40">Address</p>
              </div>
            </div>
          )}
          {companyProfile.vat_number && (
            <div className="flex items-center gap-3 p-3.5">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FileText className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-white">{companyProfile.vat_number}</p>
                <p className="text-[12px] text-white/40">VAT Number</p>
              </div>
            </div>
          )}

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => navigate("/settings?tab=company")}
            className="w-full flex items-center justify-center gap-2 p-3.5 touch-manipulation active:bg-white/[0.04] transition-colors"
          >
            <span className="text-[15px] font-medium text-elec-yellow">Edit Company Profile</span>
            <ChevronRight className="h-4 w-4 text-elec-yellow/50" />
          </button>
        </div>
      )}
    </div>
  );
};
