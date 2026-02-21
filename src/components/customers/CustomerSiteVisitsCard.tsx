import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardList, Plus, Calendar, Loader2, ExternalLink, MapPin } from 'lucide-react';
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
      case 'signed':
        return 'default' as const;
      case 'in_progress':
        return 'secondary' as const;
      default:
        return 'outline' as const;
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-blue-400" />
            Site Visits
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/electrician/site-visits')}
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
        ) : visits.length > 0 ? (
          <div className="space-y-2">
            {visits.map((visit) => (
              <div
                key={visit.id}
                onClick={() => navigate(`/electrician/site-visits?visitId=${visit.id}`)}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-blue-500/30 active:bg-blue-500/10 cursor-pointer transition-all touch-manipulation"
              >
                <ClipboardList className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {visit.property_address || 'No address'}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {visit.property_type || 'Unknown type'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge variant={getStatusVariant(visit.status)} className="text-[10px]">
                    {formatStatus(visit.status)}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(visit.created_at)}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No site visits linked to this customer yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
