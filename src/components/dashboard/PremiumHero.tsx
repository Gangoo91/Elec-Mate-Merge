/**
 * PremiumHero
 *
 * Premium welcome card with left-aligned layout, contextual metric line,
 * glass card treatment, animated streak ring, and time-based greeting.
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Flame, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardData } from '@/hooks/useDashboardData';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// SVG Progress Ring Component - fully responsive
const StreakRing: React.FC<{
  progress: number; // 0-100
  strokeWidth?: number;
}> = ({ progress, strokeWidth = 3 }) => {
  // Use viewBox for responsive scaling
  const size = 100;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 w-full h-full -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/10"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#streakGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ type: 'spring', stiffness: 100, damping: 30, delay: 0.3 }}
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Build a contextual metric line based on role and data.
 */
function getContextLine(
  role: string,
  business: { activeQuotes: number; formattedQuoteValue: string },
  certificates: { total: number; expiringSoon: number },
  learning: { currentStreak: number; studiedToday: boolean }
): string {
  if (role === 'apprentice') {
    const parts: string[] = [];
    if (learning.currentStreak > 0) parts.push(`${learning.currentStreak}-day streak`);
    if (learning.studiedToday) parts.push('studied today');
    return parts.length > 0 ? parts.join(' \u00b7 ') : 'Welcome to Elec-Mate';
  }

  // Electrician / employer / admin
  const parts: string[] = [];
  if (business.activeQuotes > 0) {
    parts.push(`${business.activeQuotes} active quote${business.activeQuotes !== 1 ? 's' : ''}`);
    parts.push(`${business.formattedQuoteValue} pipeline`);
  } else if (certificates.total > 0) {
    parts.push(`${certificates.total} certificate${certificates.total !== 1 ? 's' : ''}`);
    parts.push(certificates.expiringSoon > 0 ? `${certificates.expiringSoon} in progress` : 'all complete');
  }

  return parts.length > 0 ? parts.join(' \u00b7 ') : 'Welcome to Elec-Mate';
}

export function PremiumHero() {
  const { user } = useAuth();
  const { profile } = useAuth();
  const { toast } = useToast();
  const { user: userData, learning, business, certificates, isLoading } = useDashboardData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);

  const greeting = getGreeting();
  const userRole = profile?.role || 'electrician';

  // Calculate streak progress (7 day goal)
  const streakProgress = Math.min((learning.currentStreak / 7) * 100, 100);

  const contextLine = getContextLine(userRole, business, certificates, learning);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image under 2MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      // Path must be user_id/filename for RLS policy
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({ title: 'Photo updated', description: 'Your profile photo has been updated' });
    } catch (error: unknown) {
      console.error('Upload error:', error);
      toast({ title: 'Upload failed', description: (error as Error).message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="relative overflow-hidden card-glass">
        {/* Gradient accent line at top */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-elec-yellow via-amber-500 to-elec-yellow" />

        {/* Content - left-aligned row layout */}
        <div className="relative z-10 p-4 sm:p-5">
          <div className="flex items-center gap-4">
            {/* Profile Photo with Streak Ring */}
            <div className="flex-shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                whileTap={{ scale: 0.95 }}
                className="group relative touch-manipulation"
              >
                <div className="relative w-14 h-14">
                  {/* Streak ring */}
                  <StreakRing progress={streakProgress} strokeWidth={3} />

                  {/* Avatar */}
                  <div
                    className={cn(
                      'absolute inset-[4px] rounded-full overflow-hidden',
                      'bg-white/[0.05] border-2 border-white/10',
                      'flex items-center justify-center',
                      'transition-all duration-200',
                      'group-hover:border-elec-yellow/50',
                      uploading && 'animate-pulse'
                    )}
                  >
                    {avatarUrl || userData.avatarUrl ? (
                      <img
                        src={avatarUrl || userData.avatarUrl || ''}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Camera overlay on hover */}
                  <div
                    className="
                    absolute inset-[4px] rounded-full
                    bg-black/60 opacity-0 group-hover:opacity-100
                    hidden sm:flex items-center justify-center
                    transition-opacity duration-200
                  "
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-white"
              >
                {greeting}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-xl sm:text-2xl font-bold text-white tracking-tight"
              >
                {userData.firstName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-sm text-white truncate mt-0.5"
              >
                {contextLine}
              </motion.p>
            </div>

            {/* Status badges - right side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-end gap-1.5 flex-shrink-0"
            >
              {/* Subscription status */}
              {userData.isSubscribed ? (
                <Badge
                  variant="outline"
                  className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[11px]"
                >
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              ) : userData.trialDaysLeft !== null && userData.trialDaysLeft > 0 ? (
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 border-amber-500/30 text-amber-400 text-[11px]"
                >
                  {userData.trialDaysLeft}d trial
                </Badge>
              ) : null}

              {/* Streak badge */}
              {learning.currentStreak > 0 && (
                <Badge
                  variant="outline"
                  className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-[11px]"
                >
                  <Flame className="w-3 h-3 mr-1" />
                  {learning.currentStreak}d
                </Badge>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PremiumHero;
