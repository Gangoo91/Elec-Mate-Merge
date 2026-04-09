import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerSiteVisitsCardProps {
  customerId: string;
}

interface SiteVisitRow {
  id: string;
  property_address: string;
  property_type: string;
  status: string;
  created_at: string;
}

export const CustomerSiteVisitsCard = ({ customerId }: CustomerSiteVisitsCardProps) => {
  const navigate = useNavigate();
  const [visits, setVisits] = useState<SiteVisitRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const { data, error } = await supabase
          .from('site_visits')
          .select('id, property_address, property_type, status, created_at')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setVisits(data || []);
      } catch (error) {
        console.error('Failed to fetch customer site visits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisits();
  }, [customerId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'signed':
        return 'bg-emerald-500/15 text-emerald-400';
      case 'in_progress':
        return 'bg-blue-500/15 text-blue-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <div className="card-surface-interactive rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold text-white">Site Visits</h3>
        <button
          onClick={() => navigate('/electrician/site-visits')}
          className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          + New
        </button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
          </div>
        ) : visits.length > 0 ? (
          <div className="space-y-2">
            {visits.map((visit) => (
              <div
                key={visit.id}
                onClick={() => navigate(`/electrician/site-visits?visitId=${visit.id}`)}
                className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">
                    {visit.property_address || 'No address'}
                  </p>
                  <p className="text-xs text-white">
                    {visit.property_type || 'Unknown type'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getStatusBadge(visit.status)}`}>
                    {formatStatus(visit.status)}
                  </span>
                  <p className="text-[10px] text-white mt-1">
                    {formatDate(visit.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No site visits linked to this customer yet
          </p>
        )}
      </div>
    </div>
  );
};
