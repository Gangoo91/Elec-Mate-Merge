import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { cn } from '@/lib/utils';

export const CompanyProfileSummary = () => {
  const navigate = useNavigate();
  const { companyProfile, loading } = useCompanyProfile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return (
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 animate-pulse">
        <div className="h-4 w-32 bg-white/[0.06] rounded" />
      </div>
    );
  }

  const hasProfile = companyProfile?.company_name;
  const isComplete = hasProfile && companyProfile?.company_email && companyProfile?.company_phone;

  if (!hasProfile) {
    return (
      <button
        type="button"
        onClick={() => navigate('/settings?tab=company')}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15 touch-manipulation active:bg-amber-500/10 transition-colors"
      >
        <div>
          <p className="text-[13px] font-semibold text-amber-400">Set Up Company Profile</p>
          <p className="text-[11px] text-white">Required for professional quotes</p>
        </div>
        <ChevronRight className="h-4 w-4 text-amber-400" />
      </button>
    );
  }

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 touch-manipulation active:bg-white/[0.04] transition-colors"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {companyProfile.logo_data_url ? (
            <img
              src={companyProfile.logo_data_url}
              alt={companyProfile.company_name}
              className="w-8 h-8 rounded-lg object-contain bg-white"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0">
              <span className="text-[12px] font-bold text-white">
                {companyProfile.company_name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[14px] font-medium text-white truncate">{companyProfile.company_name}</p>
            <p className="text-[11px] text-white truncate">
              {companyProfile.company_email || 'Tap to see details'}
            </p>
          </div>
        </div>
        <ChevronRight
          className={cn('h-4 w-4 text-white flex-shrink-0 transition-transform', isExpanded && 'rotate-90')}
        />
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-white/[0.06] space-y-1.5">
          {companyProfile.company_phone && (
            <p className="text-[12px] text-white">{companyProfile.company_phone}</p>
          )}
          {companyProfile.company_address && (
            <p className="text-[12px] text-white">{companyProfile.company_address}</p>
          )}
          {companyProfile.vat_number && (
            <p className="text-[12px] text-white">VAT: {companyProfile.vat_number}</p>
          )}
          <button
            type="button"
            onClick={() => navigate('/settings?tab=company')}
            className="text-[11px] font-medium text-elec-yellow touch-manipulation mt-1"
          >
            Edit Company Details
          </button>
        </div>
      )}
    </div>
  );
};
