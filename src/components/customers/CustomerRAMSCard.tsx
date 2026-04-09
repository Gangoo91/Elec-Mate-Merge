/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerRAMSCardProps {
  customerId: string;
}

interface RAMSRow {
  id: string;
  query: string;
  work_type: string;
  status: string;
  created_at: string;
  project_info: any;
}

export const CustomerRAMSCard = ({ customerId }: CustomerRAMSCardProps) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<RAMSRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('health_safety_jobs')
          .select('id, query, work_type, status, created_at, project_info')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          // health_safety_jobs may not have customer_id column yet
          setJobs([]);
          return;
        }
        setJobs(data || []);
      } catch (error) {
        // Silently handle — column may not exist yet
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [customerId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-400';
      case 'processing':
        return 'bg-blue-500/15 text-blue-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const getTitle = (job: RAMSRow) => {
    if (job.project_info?.projectName) return job.project_info.projectName;
    if (job.query && job.query.length > 50) return job.query.substring(0, 50) + '...';
    return job.query || 'Safety Documentation';
  };

  return (
    <div className="card-surface-interactive rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold text-white">RAMS</h3>
        <button
          onClick={() => navigate('/electrician/health-safety')}
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
        ) : jobs.length > 0 ? (
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() =>
                  navigate('/electrician/health-safety', {
                    state: { fromSavedResults: true, jobId: job.id },
                  })
                }
                className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{getTitle(job)}</p>
                  <p className="text-xs text-white capitalize">
                    {job.work_type || 'Unknown type'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getStatusBadge(job.status)}`}>
                    {job.status}
                  </span>
                  <p className="text-[10px] text-white mt-1">
                    {formatDate(job.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No RAMS linked to this customer yet
          </p>
        )}
      </div>
    </div>
  );
};
