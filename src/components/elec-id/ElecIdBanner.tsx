import { Link } from 'react-router-dom';
import { BadgeCheck, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ElecIdBannerProps {
  variant?: 'apprentice' | 'electrician';
}

export const ElecIdBanner = ({ variant = 'electrician' }: ElecIdBannerProps) => {
  const { user } = useAuth();

  // Fetch user's Elec-ID number
  const { data: profile } = useQuery({
    queryKey: ['elec-id-banner', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('elec_id_number, elec_id_enabled')
        .eq('id', user.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });

  const hasElecId = !!profile?.elec_id_number;
  const elecIdNumber = profile?.elec_id_number;

  return (
    <Link to="/elec-id">
      <Card className="border border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 via-transparent to-transparent hover:border-elec-yellow/40 hover:from-elec-yellow/10 transition-all duration-300 group">
        <div className="flex items-center justify-between p-2.5 sm:p-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 group-hover:bg-elec-yellow/15 transition-colors">
              <BadgeCheck className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">My Elec-ID</h3>
                {elecIdNumber && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono bg-elec-yellow/20 text-elec-yellow rounded border border-elec-yellow/30">
                    {elecIdNumber}
                  </span>
                )}
                {!hasElecId && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-400 rounded-full flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    FREE
                  </span>
                )}
              </div>
              <p className="text-xs text-white/60">
                {hasElecId
                  ? 'Worker-owned professional identity'
                  : 'Get your free credential'
                }
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all" />
        </div>
      </Card>
    </Link>
  );
};

export default ElecIdBanner;
