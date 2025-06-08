
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Calendar, MapPin, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

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

const IncidentList = ({ searchQuery, statusFilter, typeFilter, onEdit, onView }: IncidentListProps) => {
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
        title: "Error",
        description: "Failed to load incidents",
        variant: "destructive",
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

      setIncidents(prev => prev.filter(incident => incident.id !== incidentId));
      toast({
        title: "Incident Deleted",
        description: "The incident has been permanently deleted",
      });
    } catch (error) {
      console.error('Error deleting incident:', error);
      toast({
        title: "Error",
        description: "Failed to delete incident",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-500/20 text-gray-400', label: 'Draft' },
      submitted: { color: 'bg-blue-500/20 text-blue-400', label: 'Submitted' },
      under_review: { color: 'bg-yellow-500/20 text-yellow-400', label: 'Under Review' },
      investigating: { color: 'bg-orange-500/20 text-orange-400', label: 'Investigating' },
      resolved: { color: 'bg-green-500/20 text-green-400', label: 'Resolved' },
      closed: { color: 'bg-slate-500/20 text-slate-400', label: 'Closed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.color} variant="outline">{config.label}</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { color: 'bg-green-500/20 text-green-400', label: 'Low' },
      medium: { color: 'bg-yellow-500/20 text-yellow-400', label: 'Medium' },
      high: { color: 'bg-orange-500/20 text-orange-400', label: 'High' },
      critical: { color: 'bg-red-500/20 text-red-400', label: 'Critical' }
    };

    const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.medium;
    return <Badge className={config.color} variant="outline">{config.label}</Badge>;
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
      other: 'Other'
    };

    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = !searchQuery || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesType = typeFilter === 'all' || incident.incident_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-gray animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-elec-dark rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-elec-dark rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredIncidents.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">
            {incidents.length === 0 
              ? "No incidents reported yet. Click 'New Incident' to create your first report."
              : "No incidents match your current filters."
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredIncidents.map((incident) => (
        <Card key={incident.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{incident.title}</CardTitle>
                  {getStatusBadge(incident.status)}
                  {getSeverityBadge(incident.severity)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(incident.date_occurred), 'MMM dd, yyyy HH:mm')}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {incident.location}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {getIncidentTypeLabel(incident.incident_type)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onView(incident.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {incident.status === 'draft' && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => onEdit(incident.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(incident.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {incident.description}
            </p>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-elec-yellow/10">
              <div className="text-xs text-muted-foreground">
                Created: {format(new Date(incident.created_at), 'MMM dd, yyyy')}
                {incident.submitted_at && (
                  <span className="ml-2">
                    • Submitted: {format(new Date(incident.submitted_at), 'MMM dd, yyyy')}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IncidentList;
