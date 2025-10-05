import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Search, Calendar, MapPin, User, Sparkles, Camera, Clock, CheckCircle2, FileEdit, Wrench, ClipboardList } from "lucide-react";
import { BriefingPDFActions } from "./BriefingPDFActions";
import { BriefingActionsMenu } from "./BriefingActionsMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BriefingHistoryProps {
  onEdit: (briefing: any) => void;
  onDuplicate: (briefing: any) => void;
  onStatusChange: (briefingId: string, status: string) => void;
}

export const BriefingHistory = ({ onEdit, onDuplicate, onStatusChange }: BriefingHistoryProps) => {
  const { toast } = useToast();
  const [briefings, setBriefings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [aiFilter, setAiFilter] = useState("all");
  const [companyProfile, setCompanyProfile] = useState<any>(null);

  useEffect(() => {
    fetchBriefings();
    fetchCompanyProfile();
  }, []);

  const fetchBriefings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('team_briefings')
        .select('*')
        .neq('status', 'cancelled')
        .order('briefing_date', { ascending: true });

      if (error) throw error;
      setBriefings(data || []);
    } catch (error: any) {
      console.error('Error fetching briefings:', error);
      toast({
        title: "Error",
        description: "Failed to load briefings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setCompanyProfile(data);
    } catch (error) {
      console.error('Error fetching company profile:', error);
    }
  };

  const filteredBriefings = briefings.filter(briefing => {
    const matchesSearch = 
      briefing.briefing_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      briefing.job_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      briefing.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || briefing.status === statusFilter;
    
    const matchesAI = 
      aiFilter === "all" ||
      (aiFilter === "ai" && briefing.ai_generated) ||
      (aiFilter === "manual" && !briefing.ai_generated);

    return matchesSearch && matchesStatus && matchesAI;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-elec-light">Loading briefings...</p>
      </div>
    );
  }

  return (
    <Card className="bg-background border-primary/30">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Briefing History
        </CardTitle>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-elec-light/60" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search briefings..."
              className="pl-10 bg-card border-primary/30 text-elec-light"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px] bg-card border-primary/30 text-elec-light">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-elec-yellow/30">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={aiFilter} onValueChange={setAiFilter}>
            <SelectTrigger className="w-full sm:w-[150px] bg-card border-primary/30 text-elec-light">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-elec-yellow/30">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ai">AI Generated</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredBriefings.length === 0 ? (
          <div className="text-center py-12 text-elec-light/60">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No briefings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBriefings.map((briefing) => {
              const briefingTypeConfig = {
                'site-work': { label: 'Site Work', color: 'bg-blue-500/20 text-blue-400' },
                'lfe': { label: 'LFE Report', color: 'bg-red-500/20 text-red-400' },
                'hse-update': { label: 'HSE Update', color: 'bg-orange-500/20 text-orange-400' },
                'business-update': { label: 'Business', color: 'bg-purple-500/20 text-purple-400' },
                'safety-alert': { label: 'Safety Alert', color: 'bg-yellow-500/20 text-yellow-400' },
                'regulatory': { label: 'Regulatory', color: 'bg-green-500/20 text-green-400' },
                'general': { label: 'General', color: 'bg-gray-500/20 text-gray-400' },
              };
              
              const typeInfo = briefingTypeConfig[briefing.briefing_type as keyof typeof briefingTypeConfig] || briefingTypeConfig['general'];
              const photoCount = briefing.photos?.length || 0;
              const equipmentCount = briefing.equipment?.length || 0;
              const keyPointsCount = briefing.key_points?.length || 0;
              const description = briefing.briefing_description || briefing.job_description || '';
              const truncatedDesc = description.length > 80 ? description.substring(0, 80) + '...' : description;
              
              const getStatusBadge = (status: string, completed: boolean) => {
                if (status === 'completed' || completed) {
                  return <Badge className="bg-green-500/20 text-green-400 border-0 text-xs"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>;
                }
                if (status === 'in_progress') {
                  return <Badge className="bg-blue-500/20 text-blue-400 border-0 text-xs">In Progress</Badge>;
                }
                if (status === 'cancelled') {
                  return <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">Cancelled</Badge>;
                }
                return <Badge className="bg-gray-500/20 text-gray-400 border-0 text-xs">Scheduled</Badge>;
              };

              return (
                <Card key={briefing.id} className="bg-card/50 border-primary/20">
                  <CardContent className="p-4">
                    {/* Top badges row with actions */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`${typeInfo.color} border-0 text-xs`}>
                          {typeInfo.label}
                        </Badge>
                        {briefing.ai_generated && (
                          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                        {getStatusBadge(briefing.status, briefing.completed)}
                      </div>
                      <BriefingActionsMenu
                        briefing={briefing}
                        onEdit={() => onEdit(briefing)}
                        onDuplicate={() => onDuplicate(briefing)}
                        onStatusChange={(status) => onStatusChange(briefing.id, status)}
                        onRefresh={fetchBriefings}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-elec-light mb-2">
                      {briefing.job_name || briefing.briefing_name}
                    </h3>

                    {/* Description preview */}
                    {truncatedDesc && (
                      <p className="text-sm text-elec-light/60 mb-3">
                        {truncatedDesc}
                      </p>
                    )}

                    {/* Metadata grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-elec-light/70 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-elec-yellow" />
                        <span>{new Date(briefing.briefing_date).toLocaleDateString('en-GB')} at {briefing.briefing_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-elec-yellow" />
                        <span>{briefing.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-elec-yellow" />
                        <span>{briefing.conductor_name || 'Not specified'}</span>
                      </div>
                      {briefing.team_size && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-elec-yellow" />
                          <span>Team: {briefing.team_size}</span>
                        </div>
                      )}
                      {briefing.duration_minutes && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-elec-yellow" />
                          <span>{briefing.duration_minutes} min</span>
                        </div>
                      )}
                      {briefing.risk_level && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase font-medium">
                            Risk: {briefing.risk_level}
                          </span>
                        </div>
                      )}
                      {photoCount > 0 && (
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-elec-yellow" />
                          <span>{photoCount} photo{photoCount > 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {equipmentCount > 0 && (
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-elec-yellow" />
                          <span>{equipmentCount} equipment</span>
                        </div>
                      )}
                      {keyPointsCount > 0 && (
                        <div className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-elec-yellow" />
                          <span>{keyPointsCount} key points</span>
                        </div>
                      )}
                    </div>

                    {/* PDF Actions at bottom */}
                    <div className="pt-3 border-t border-primary/10">
                      <BriefingPDFActions briefing={briefing} companyProfile={companyProfile} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
