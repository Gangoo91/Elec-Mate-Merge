import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, ChevronDown, ChevronUp, Edit2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { cn } from "@/lib/utils";

export const CompanyProfileSummary = () => {
  const navigate = useNavigate();
  const { companyProfile, loading } = useCompanyProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return (
      <div className="p-4 bg-elec-gray/30 rounded-xl animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-elec-gray rounded-lg" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-elec-gray rounded" />
            <div className="h-3 w-24 bg-elec-gray rounded" />
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
        className="w-full p-4 border-2 border-dashed border-amber-500/50 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-left flex-1">
            <p className="font-medium text-amber-500">Set Up Company Profile</p>
            <p className="text-sm text-muted-foreground">
              Add your company details for professional quotes
            </p>
          </div>
          <Edit2 className="h-4 w-4 text-muted-foreground" />
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 bg-elec-gray/20 overflow-hidden">
      {/* Collapsed View */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-3 hover:bg-elec-gray/30 transition-colors"
      >
        {/* Logo or Placeholder */}
        {companyProfile.logo_data_url ? (
          <img
            src={companyProfile.logo_data_url}
            alt={companyProfile.company_name}
            className="w-12 h-12 rounded-lg object-contain bg-background border border-border"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
            <Building className="h-6 w-6 text-elec-yellow" />
          </div>
        )}

        {/* Company Info */}
        <div className="text-left flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold truncate">{companyProfile.company_name}</p>
            {isComplete && (
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {companyProfile.company_email || "No email set"}
          </p>
        </div>

        {/* Expand Icon */}
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border/50 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {companyProfile.company_phone && (
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium">{companyProfile.company_phone}</p>
              </div>
            )}
            {companyProfile.company_address && (
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="font-medium truncate">{companyProfile.company_address}</p>
              </div>
            )}
            {companyProfile.vat_number && (
              <div>
                <p className="text-xs text-muted-foreground">VAT Number</p>
                <p className="font-medium">{companyProfile.vat_number}</p>
              </div>
            )}
            {companyProfile.company_registration && (
              <div>
                <p className="text-xs text-muted-foreground">Company Reg</p>
                <p className="font-medium">{companyProfile.company_registration}</p>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/settings?tab=company")}
            className="w-full"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Company Profile
          </Button>
        </div>
      )}
    </div>
  );
};
