import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ElecIdBannerProps {
  variant?: 'apprentice' | 'electrician';
}

export const ElecIdBanner = ({ variant = 'electrician' }: ElecIdBannerProps) => {
  const { user } = useAuth();

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

  return (
    <Link to="/elec-id" className="block group touch-manipulation">
      <div className="relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />

        <div className="relative z-10 flex flex-col h-full p-3.5 sm:p-4 min-h-[110px]">
          <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            My Elec-ID
          </h3>
          <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight">
            {hasElecId ? 'Worker-owned professional identity' : 'Get your free digital credential'}
          </p>

          <div className="flex-grow" />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ElecIdBanner;
