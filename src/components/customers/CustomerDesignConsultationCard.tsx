/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Cpu,
  Plus,
  Calendar,
  Loader2,
  ExternalLink,
  PoundSterling,
  Zap,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
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

const AGENT_META = {
  'cost-engineer': {
    icon: PoundSterling,
    color: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/30',
    activeBg: 'active:bg-emerald-500/10',
    label: 'Cost Engineer',
    route: '/electrician/design-consultation',
    section: 'cost-engineer',
  },
  'circuit-designer': {
    icon: Zap,
    color: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/30',
    activeBg: 'active:bg-blue-500/10',
    label: 'Circuit Designer',
    route: '/electrician/design-consultation',
    section: 'circuit-designer',
  },
  installation: {
    icon: Wrench,
    color: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500/30',
    activeBg: 'active:bg-purple-500/10',
    label: 'Installation',
    route: '/electrician/design-consultation',
    section: 'installation-specialist',
  },
  commissioning: {
    icon: CheckCircle2,
    color: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/30',
    activeBg: 'active:bg-cyan-500/10',
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
        console.error('Failed to fetch customer design consultation jobs:', error);
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'complete':
      case 'completed':
        return 'default' as const;
      case 'processing':
      case 'pending':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const handleNavigate = (job: AgentJob) => {
    const meta = AGENT_META[job.type];
    navigate(meta.route, {
      state: { fromSavedResults: true, jobId: job.id, section: meta.section },
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-purple-400" />
            AI Design Consultation
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/electrician/design-consultation')}
            className="h-8 text-xs touch-manipulation text-elec-yellow"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-2">
            {jobs.map((job) => {
              const meta = AGENT_META[job.type];
              const Icon = meta.icon;
              return (
                <div
                  key={`${job.type}-${job.id}`}
                  onClick={() => handleNavigate(job)}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border ${meta.hoverBorder} ${meta.activeBg} cursor-pointer transition-all touch-manipulation`}
                >
                  <Icon className={`h-5 w-5 ${meta.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{meta.label}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant={getStatusVariant(job.status)} className="text-[10px]">
                      {job.status}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(job.created_at)}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No AI consultations linked to this customer yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
