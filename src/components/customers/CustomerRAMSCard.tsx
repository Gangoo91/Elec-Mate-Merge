/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Plus, Calendar, Loader2, ExternalLink } from 'lucide-react';
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

        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error('Failed to fetch customer RAMS:', error);
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
      case 'completed':
        return 'default' as const;
      case 'processing':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const getTitle = (job: RAMSRow) => {
    if (job.project_info?.projectName) return job.project_info.projectName;
    if (job.query && job.query.length > 50) return job.query.substring(0, 50) + '...';
    return job.query || 'Safety Documentation';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-orange-400" />
            RAMS
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/electrician/health-safety')}
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
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() =>
                  navigate('/electrician/health-safety', {
                    state: { fromSavedResults: true, jobId: job.id },
                  })
                }
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-orange-500/30 active:bg-orange-500/10 cursor-pointer transition-all touch-manipulation"
              >
                <Shield className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{getTitle(job)}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {job.work_type || 'Unknown type'}
                  </p>
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
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No RAMS linked to this customer yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
