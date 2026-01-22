import React, { useState, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { useElecIdProfile } from '@/hooks/useElecIdProfile';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// Profile section components
import ProfileHeader from '@/components/profile/ProfileHeader';
import ContactDetailsCard from '@/components/profile/ContactDetailsCard';
import BusinessDetailsCard from '@/components/profile/BusinessDetailsCard';
import QualificationsCard from '@/components/profile/QualificationsCard';
import PaymentBankingCard from '@/components/profile/PaymentBankingCard';
import BrandingCard from '@/components/profile/BrandingCard';
import ProfileFooter from '@/components/profile/ProfileFooter';

// Skeleton loading component
const CardSkeleton = () => (
  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="h-4 w-32 bg-white/10 rounded" />
      </div>
      <div className="h-8 w-16 bg-white/10 rounded-lg" />
    </div>
    <div className="p-5 space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 bg-white/10 rounded" />
            <div className="h-4 w-40 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Progress Ring component
const ProgressRing = ({ progress, size = 44 }: { progress: number; size?: number }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="text-elec-yellow"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/**
 * Business Profile Page
 * Unified, responsive profile page - native feel on mobile, professional on desktop
 */
const ProfilePage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, profile } = useAuth();
  const { companyProfile, loading: companyLoading, saveCompanyProfile, uploadLogo, refetch: refetchCompany } = useCompanyProfile();
  const { profiles: inspectorProfiles, isLoading: inspectorLoading, updateProfile: updateInspectorProfile } = useInspectorProfiles();
  const { profile: elecIdProfile, isLoading: elecIdLoading, isActivated: hasElecId, refetch: refetchElecId } = useElecIdProfile();

  // Pull-to-refresh state (mobile only)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isPulling = useRef(false);

  // Get the default inspector profile (or first one)
  const defaultInspectorProfile = inspectorProfiles.find(p => p.isDefault) || inspectorProfiles[0] || null;

  const isLoading = companyLoading || inspectorLoading || elecIdLoading;

  // Calculate profile completion
  const calculateCompletion = () => {
    let completed = 0;
    let total = 6;

    if (profile?.phone || companyProfile?.company_email) completed++;
    if (companyProfile?.company_name && companyProfile?.company_address) completed++;
    if (defaultInspectorProfile?.registrationScheme || elecIdProfile?.ecs_card_type) completed++;
    if (companyProfile?.stripe_account_id || companyProfile?.bank_details?.accountNumber) completed++;
    if (companyProfile?.logo_url || defaultInspectorProfile?.signatureData) completed++;
    if (hasElecId) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercent = calculateCompletion();

  // Pull-to-refresh handlers (mobile only)
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchCompany?.(), refetchElecId?.()]);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
      }, 600);
    }
  }, [refetchCompany, refetchElecId]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling.current || isRefreshing) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0 && scrollRef.current?.scrollTop === 0) {
      setPullDistance(Math.min(diff * 0.5, 80));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 60 && !isRefreshing) handleRefresh();
    else setPullDistance(0);
    isPulling.current = false;
  };

  return (
    <div className="bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <motion.button
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-xl flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all touch-manipulation"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>

          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white">Business Profile</h1>
            {!isMobile && completionPercent < 100 && !isLoading && (
              <p className="text-sm text-white/60">Complete your profile to unlock all features</p>
            )}
          </div>

          {completionPercent < 100 && !isLoading && (
            <ProgressRing progress={completionPercent} size={isMobile ? 40 : 48} />
          )}
        </div>
      </div>

      {/* Pull-to-refresh (mobile only) */}
      {isMobile && (
        <AnimatePresence>
          {(pullDistance > 0 || isRefreshing) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isRefreshing ? 60 : pullDistance, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="flex items-center justify-center overflow-hidden bg-background"
            >
              <motion.div
                animate={{ rotate: isRefreshing ? 360 : pullDistance * 3 }}
                transition={{ duration: isRefreshing ? 0.8 : 0, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'text-elec-yellow' : 'text-white/50'}`} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Main Content */}
      <div
        ref={scrollRef}
        className="flex-1 momentum-scroll-y"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
          {/* Title section */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Business</h2>
            <p className="text-sm sm:text-base text-white/60 mt-1">
              Manage your business identity in one place
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Profile Header - Full Width */}
              <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
                <ProfileHeader
                  user={user}
                  profile={profile}
                  companyProfile={companyProfile}
                  elecIdProfile={elecIdProfile}
                  hasElecId={hasElecId}
                  isLoading={false}
                />
              </motion.div>

              {/* Two-column grid on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
                    <ContactDetailsCard
                      user={user}
                      profile={profile}
                      companyProfile={companyProfile}
                      onSave={saveCompanyProfile}
                      isLoading={companyLoading}
                    />
                  </motion.div>

                  <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
                    <BusinessDetailsCard
                      companyProfile={companyProfile}
                      onSave={saveCompanyProfile}
                      isLoading={companyLoading}
                    />
                  </motion.div>

                  <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible">
                    <QualificationsCard
                      inspectorProfile={defaultInspectorProfile}
                      elecIdProfile={elecIdProfile}
                      hasElecId={hasElecId}
                      onSave={updateInspectorProfile}
                      isLoading={false}
                    />
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible">
                    <PaymentBankingCard
                      companyProfile={companyProfile}
                      onSave={saveCompanyProfile}
                      isLoading={companyLoading}
                    />
                  </motion.div>

                  <motion.div custom={5} variants={cardVariants} initial="hidden" animate="visible">
                    <BrandingCard
                      companyProfile={companyProfile}
                      inspectorProfile={defaultInspectorProfile}
                      onSaveCompany={saveCompanyProfile}
                      onSaveInspector={updateInspectorProfile}
                      onUploadLogo={uploadLogo}
                      isLoading={false}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Footer - Full Width */}
              <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible" className="mt-4">
                <ProfileFooter
                  hasCompanyProfile={!!(companyProfile?.company_name)}
                  hasInspectorProfile={!!(defaultInspectorProfile?.name)}
                  hasElecId={hasElecId}
                />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
