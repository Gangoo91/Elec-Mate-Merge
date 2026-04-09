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
      <div className="relative overflow-hidden glass-premium rounded-2xl">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow opacity-60" />

        <div className="relative z-10 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-white mb-0.5">{greeting},</p>
              <h1 className="text-xl sm:text-2xl font-bold text-elec-yellow tracking-tight">
                {userData.firstName}
              </h1>
              <p className="text-[12px] text-white mt-1 truncate">
                {contextLine}
              </p>
            </div>

            {/* Hidden file input for avatar upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PremiumHero;
