import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Incident {
  id: string;
  incident_type: string;
  title: string;
  description: string;
  location: string;
  date_occurred: string;
  severity: string;
  status: string;
  created_at: string;
  submitted_at: string | null;
}

interface IncidentListProps {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  onEdit: (incidentId: string) => void;
  onView: (incidentId: string) => void;
}

const IncidentList = ({
  searchQuery,
  statusFilter,
  typeFilter,
  onEdit,
  onView,
}: IncidentListProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, [user]);

  const loadIncidents = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setIncidents(data || []);
    } catch (error) {
      console.error('Error loading incidents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load incidents',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (incidentId: string) => {
    if (!confirm('Are you sure you want to delete this incident? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('incidents')
        .delete()
        .eq('id', incidentId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setIncidents((prev) => prev.filter((incident) => incident.id !== incidentId));
      toast({
        title: 'Incident Deleted',
        description: 'The incident has been permanently deleted',
      });
    } catch (error) {
      console.error('Error deleting incident:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete incident',
        variant: 'destructive',
      });
    }
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      draft: 'Draft',
      submitted: 'Submitted',
      under_review: 'Under review',
      investigating: 'Investigating',
      resolved: 'Resolved',
      closed: 'Closed',
    };
    return map[status] || 'Draft';
  };

  const getSeverityLabel = (severity: string) => {
    const map: Record<string, string> = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
    };
    return map[severity] || 'Medium';
  };

  const getIncidentTypeLabel = (type: string) => {
    const typeLabels = {
      near_miss: 'Near Miss',
      unsafe_practice: 'Unsafe Practice',
      faulty_equipment: 'Faulty Equipment',
      injury: 'Injury',
      property_damage: 'Property Damage',
      environmental: 'Environmental',
      security: 'Security',
      other: 'Other',
    };

    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      !searchQuery ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesType = typeFilter === 'all' || incident.incident_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 animate-pulse"
          >
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredIncidents.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <p className="text-[14px] text-white/85 leading-relaxed">
          {incidents.length === 0
            ? "No incidents reported yet. Click 'New Incident' to create your first report."
            : 'No incidents match your current filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredIncidents.map((incident) => {
        const isCritical = incident.severity === 'critical' || incident.severity === 'high';
        const containerClass = isCritical
          ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3'
          : 'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3';

        return (
          <div key={incident.id} className={containerClass}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 flex-wrap">
                  <span>{getStatusLabel(incident.status)}</span>
                  <span className="text-white/25">·</span>
                  <span>{getSeverityLabel(incident.severity)}</span>
                  <span className="text-white/25">·</span>
                  <span>{getIncidentTypeLabel(incident.incident_type)}</span>
                </div>
                <h3 className="text-[16px] font-semibold text-white leading-snug">
                  {incident.title}
                </h3>
                <div className="flex items-baseline gap-3 text-[12px] text-white/55 font-mono flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(incident.date_occurred), 'MMM dd, yyyy HH:mm')}
                  </span>
                  <span className="flex items-center gap-1 normal-case font-sans">
                    <MapPin className="h-3 w-3" />
                    {incident.location}
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(incident.id)}
                  className="h-9 w-9 p-0 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                {incident.status === 'draft' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(incident.id)}
                      className="h-9 w-9 p-0 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(incident.id)}
                      className="h-9 w-9 p-0 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            <p className="text-[14px] text-white/85 leading-relaxed line-clamp-2">
              {incident.description}
            </p>

            <div className="text-[11px] text-white/55 font-mono pt-2 border-t border-white/[0.06]">
              Created {format(new Date(incident.created_at), 'MMM dd, yyyy')}
              {incident.submitted_at && (
                <span className="ml-3">
                  Submitted {format(new Date(incident.submitted_at), 'MMM dd, yyyy')}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IncidentList;
