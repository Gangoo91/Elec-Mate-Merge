import React from 'react';
import { User } from '@supabase/supabase-js';
import { Camera, Shield, ChevronRight, Loader2, Verified } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { CompanyProfile } from '@/types/company';
import { ElecIdProfile } from '@/hooks/useElecIdProfile';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  user: User | null;
  profile: any;
  companyProfile: CompanyProfile | null;
  elecIdProfile: ElecIdProfile | null;
  hasElecId: boolean;
  isLoading: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  profile,
  companyProfile,
  elecIdProfile,
  hasElecId,
  isLoading,
}) => {
  const navigate = useNavigate();

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'EM';
  };

  const getVerificationBadge = () => {
    if (!elecIdProfile) return null;
    switch (elecIdProfile.verification_tier) {
      case 'premium':
        return { label: 'Gold', bg: 'bg-gradient-to-r from-yellow-400 to-amber-500', text: 'text-black' };
      case 'verified':
        return { label: 'Verified', bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white' };
      default:
        return { label: 'Basic', bg: 'bg-white/20', text: 'text-white' };
    }
  };

  const badge = getVerificationBadge();

  if (isLoading) {
    return (
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-white/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
      <div className="flex items-start gap-4 sm:gap-5">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-elec-yellow/30">
            <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
            <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow text-xl sm:text-2xl font-bold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all touch-manipulation"
          >
            <Camera className="h-4 w-4 text-white" />
          </motion.button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
            {profile?.full_name || 'Your Name'}
          </h2>
          <p className="text-sm sm:text-base text-white/70 truncate mt-0.5">
            {companyProfile?.company_name || 'Add your company name'}
          </p>

          {/* Elec-ID Badge */}
          {hasElecId && elecIdProfile ? (
            <motion.button
              onClick={() => navigate('/settings?tab=elec-id')}
              whileTap={{ scale: 0.95 }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 active:bg-emerald-500/25 transition-colors touch-manipulation"
            >
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">{elecIdProfile.elec_id_number}</span>
              {badge && (
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${badge.bg} ${badge.text}`}>
                  {badge.label}
                </span>
              )}
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate('/settings?tab=elec-id')}
              whileTap={{ scale: 0.95 }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation"
            >
              <Shield className="h-4 w-4 text-white/60" />
              <span className="text-sm font-medium text-white/80">Get Elec-ID Verified</span>
              <ChevronRight className="h-4 w-4 text-white/40" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
