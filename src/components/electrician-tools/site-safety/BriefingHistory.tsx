import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download, Search, Calendar, MapPin, User, Sparkles, Filter } from "lucide-react";
import { BriefingPDFActions } from "./BriefingPDFActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BriefingHistory = () => {
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
        .order('briefing_date', { ascending: false });

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
            {filteredBriefings.map((briefing) => (
              <Card key={briefing.id} className="bg-card/50 border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-elec-light">
                          {briefing.job_name || briefing.briefing_name}
                        </h3>
                        {briefing.ai_generated && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-elec-light/70">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(briefing.briefing_date).toLocaleDateString('en-GB')} at {briefing.briefing_time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {briefing.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {briefing.conductor_name || 'Not specified'}
                        </div>
                      </div>

                      {briefing.team_size && (
                        <p className="text-xs text-elec-light/60 mt-2">
                          Team: {briefing.team_size} electricians | Risk: <span className="uppercase font-medium">{briefing.risk_level || 'medium'}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-end gap-2">
                      <BriefingPDFActions briefing={briefing} companyProfile={companyProfile} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
