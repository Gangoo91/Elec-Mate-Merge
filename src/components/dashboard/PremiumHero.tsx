/**
 * PremiumHero
 *
 * Premium welcome card with animated streak ring, time-based greeting,
 * and status badges. Glass morphism styling with Framer Motion animations.
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, User, Flame, Crown } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 w-full h-full -rotate-90"
    >
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
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
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

export function PremiumHero() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { user: userData, learning, isLoading } = useDashboardData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);

  const greeting = getGreeting();

  // Calculate streak progress (7 day goal)
  const streakProgress = Math.min((learning.currentStreak / 7) * 100, 100);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please select an image under 2MB', variant: 'destructive' });
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

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({ title: 'Photo updated', description: 'Your profile photo has been updated' });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className="relative overflow-hidden glass-premium glow-yellow">
        {/* Gradient accent line at top */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-500 to-elec-yellow" />

        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-5">
          {/* Header label */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 text-elec-yellow mb-3"
          >
            <Sparkles className="h-3 w-3 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
              Dashboard
            </span>
          </motion.div>

          {/* Main content row - icon and text aligned */}
          <div className="flex items-center gap-4">
            {/* Profile Photo with Streak Ring */}
            <div className="relative flex-shrink-0">
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
                <div className="relative w-16 h-16">
                  {/* Streak ring */}
                  <StreakRing progress={streakProgress} strokeWidth={3} />

                  {/* Avatar */}
                  <div className={cn(
                    'absolute inset-[5px] rounded-xl overflow-hidden',
                    'bg-white/[0.05] border border-white/10',
                    'flex items-center justify-center',
                    'transition-all duration-200',
                    'group-hover:border-elec-yellow/50',
                    uploading && 'animate-pulse'
                  )}>
                    {avatarUrl || userData.avatarUrl ? (
                      <img
                        src={avatarUrl || userData.avatarUrl || ''}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-white/40" />
                    )}
                  </div>

                  {/* Camera overlay on hover */}
                  <div className="
                    absolute inset-[5px] rounded-xl
                    bg-black/60 opacity-0 group-hover:opacity-100
                    hidden sm:flex items-center justify-center
                    transition-opacity duration-200
                  ">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Text - vertically centered with icon */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl font-bold text-elec-yellow leading-tight"
              >
                {userData.firstName.toUpperCase()}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-sm text-white/70 mt-0.5"
              >
                Your command center for electrical excellence
              </motion.p>
            </div>
          </div>

          {/* Status badges - aligned below */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mt-4 pl-20"
          >
            {/* Online status */}
            <Badge
              variant="outline"
              className="bg-green-500/10 border-green-500/30 text-green-400 text-[10px] sm:text-xs"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
              Online
            </Badge>

            {/* Streak badge */}
            {learning.currentStreak > 0 && (
              <Badge
                variant="outline"
                className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-[10px] sm:text-xs"
              >
                <Flame className="w-3 h-3 mr-1" />
                {learning.currentStreak} day streak
              </Badge>
            )}

            {/* Subscription status */}
            {userData.isSubscribed ? (
              <Badge
                variant="outline"
                className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[10px] sm:text-xs hidden sm:flex"
              >
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            ) : userData.trialDaysLeft !== null && userData.trialDaysLeft > 0 ? (
              <Badge
                variant="outline"
                className="bg-blue-500/10 border-blue-500/30 text-blue-400 text-[10px] sm:text-xs hidden sm:flex"
              >
                Trial: {userData.trialDaysLeft}d left
              </Badge>
            ) : null}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

export default PremiumHero;
