/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerDesignConsultationCardProps {
  customerId: string;
}

interface AgentJob {
  id: string;
  type: 'cost-engineer' | 'circuit-designer' | 'installation' | 'commissioning';
  title: string;
  status: string;
  created_at: string;
}

const AGENT_META: Record<string, { label: string; route: string; section: string }> = {
  'cost-engineer': {
    label: 'Cost Engineer',
    route: '/electrician/design-consultation',
    section: 'cost-engineer',
  },
  'circuit-designer': {
    label: 'Circuit Designer',
    route: '/electrician/design-consultation',
    section: 'circuit-designer',
  },
  installation: {
    label: 'Installation',
    route: '/electrician/design-consultation',
    section: 'installation-specialist',
  },
  commissioning: {
    label: 'Commissioning',
    route: '/electrician/design-consultation',
    section: 'commissioning',
  },
};

export const CustomerDesignConsultationCard = ({
  customerId,
}: CustomerDesignConsultationCardProps) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<AgentJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [costRes, circuitRes, installRes, commRes] = await Promise.all([
          supabase
            .from('cost_engineer_jobs')
            .select('id, status, created_at, job_inputs')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false })
            .limit(3),
          supabase
            .from('circuit_design_jobs')
            .select('id, status, created_at, job_inputs')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false })
            .limit(3),
          supabase
            .from('installation_method_jobs')
            .select('id, status, created_at, job_inputs')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false })
            .limit(3),
          supabase
            .from('commissioning_jobs')
            .select('id, status, created_at, job_inputs')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false })
            .limit(3),
        ]);

        const allJobs: AgentJob[] = [];

        (costRes.data || []).forEach((j: any) =>
          allJobs.push({
            id: j.id,
            type: 'cost-engineer',
            title:
              j.job_inputs?.projectContext?.projectName ||
              j.job_inputs?.query?.substring(0, 40) ||
              'Cost Analysis',
            status: j.status,
            created_at: j.created_at,
          })
        );

        (circuitRes.data || []).forEach((j: any) =>
          allJobs.push({
            id: j.id,
            type: 'circuit-designer',
            title:
              j.job_inputs?.projectInfo?.projectName ||
              j.job_inputs?.query?.substring(0, 40) ||
              'Circuit Design',
            status: j.status,
            created_at: j.created_at,
          })
        );

        (installRes.data || []).forEach((j: any) =>
          allJobs.push({
            id: j.id,
            type: 'installation',
            title:
              j.job_inputs?.projectDetails?.projectName ||
              j.job_inputs?.query?.substring(0, 40) ||
              'Installation Method',
            status: j.status,
            created_at: j.created_at,
          })
        );

        (commRes.data || []).forEach((j: any) =>
          allJobs.push({
            id: j.id,
            type: 'commissioning',
            title:
              j.job_inputs?.projectName ||
              j.job_inputs?.query?.substring(0, 40) ||
              'Testing & Commissioning',
            status: j.status,
            created_at: j.created_at,
          })
        );

        // Sort by date desc and take top 5
        allJobs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setJobs(allJobs.slice(0, 5));
      } catch (error) {
        // Silently handle — customer_id columns may not exist yet
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
      case 'complete':
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-400';
      case 'processing':
      case 'pending':
        return 'bg-blue-500/15 text-blue-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const handleNavigate = (job: AgentJob) => {
    const meta = AGENT_META[job.type];
    navigate(meta.route, {
      state: { fromSavedResults: true, jobId: job.id, section: meta.section },
    });
  };

  return (
    <div className="card-surface-interactive rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold text-white">AI Design Consultation</h3>
        <button
          onClick={() => navigate('/electrician/design-consultation')}
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
            {jobs.map((job) => {
              const meta = AGENT_META[job.type];
              return (
                <div
                  key={`${job.type}-${job.id}`}
                  onClick={() => handleNavigate(job)}
                  className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-white truncate">{job.title}</p>
                    <p className="text-xs text-white">{meta.label}</p>
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
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No AI consultations linked to this customer yet
          </p>
        )}
      </div>
    </div>
  );
};
