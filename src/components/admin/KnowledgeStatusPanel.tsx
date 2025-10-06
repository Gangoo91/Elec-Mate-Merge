import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Database, FileText } from "lucide-react";

export const KnowledgeStatusPanel = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['knowledge-stats'],
    queryFn: async () => {
      const [bs7671Result, installationResult] = await Promise.all([
        supabase.from('bs7671_embeddings').select('source, id', { count: 'exact', head: false }),
        supabase.from('installation_knowledge').select('source, id', { count: 'exact', head: false })
      ]);

      const installationBySource = installationResult.data?.reduce((acc: Record<string, number>, item) => {
        acc[item.source] = (acc[item.source] || 0) + 1;
        return acc;
      }, {}) || {};

      return {
        bs7671_total: bs7671Result.data?.length || 0,
        onsite_guide: installationBySource['on-site-guide'] || 0,
        city_guilds_book_1: installationBySource['city-guilds-book-1'] || 0,
        city_guilds_book_2: installationBySource['city-guilds-book-2'] || 0,
        emergency_lighting: installationBySource['emergency-lighting'] || 0,
        guidance_note_3: installationBySource['guidance-note-3'] || 0,
        design_guide: installationBySource['design-guide'] || 0,
        wiring_diagrams: installationBySource['wiring-diagrams'] || 0,
        ev_charging: installationBySource['ev-charging'] || 0,
        calculations_basic: installationBySource['calculations-basic'] || 0,
        inservice_testing: installationBySource['inservice-testing'] || 0,
      };
    },
    refetchInterval: 5000,
  });

  if (isLoading || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Knowledge Base Status
          </CardTitle>
          <CardDescription>Loading statistics...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const sources = [
    { name: 'BS 7671 Wiring Regulations', count: stats.bs7671_total, icon: BookOpen, table: 'bs7671_embeddings' },
    { name: 'On-Site Guide', count: stats.onsite_guide, icon: FileText, table: 'installation_knowledge' },
    { name: 'City & Guilds Book 1', count: stats.city_guilds_book_1, icon: FileText, table: 'installation_knowledge' },
    { name: 'City & Guilds Book 2', count: stats.city_guilds_book_2, icon: FileText, table: 'installation_knowledge' },
    { name: 'Emergency Lighting Guide', count: stats.emergency_lighting, icon: FileText, table: 'installation_knowledge' },
    { name: 'Guidance Note 3: Inspection & Testing', count: stats.guidance_note_3, icon: BookOpen, table: 'installation_knowledge' },
    { name: 'Installation Design Guide', count: stats.design_guide, icon: FileText, table: 'installation_knowledge' },
    { name: 'Wiring Diagrams Book', count: stats.wiring_diagrams, icon: FileText, table: 'installation_knowledge' },
    { name: 'IET Code: EV Charging', count: stats.ev_charging, icon: BookOpen, table: 'installation_knowledge' },
    { name: 'Installation Calculations: Basic', count: stats.calculations_basic, icon: FileText, table: 'installation_knowledge' },
    { name: 'IET Code: In-service Testing', count: stats.inservice_testing, icon: BookOpen, table: 'installation_knowledge' },
  ];

  const totalChunks = sources.reduce((sum, s) => sum + s.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Knowledge Base Status
        </CardTitle>
        <CardDescription>
          {totalChunks.toLocaleString()} total knowledge chunks across {sources.filter(s => s.count > 0).length} sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sources.map((source) => {
            const Icon = source.icon;
            return (
              <div key={source.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{source.name}</p>
                    <p className="text-xs text-muted-foreground">{source.table}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{source.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">chunks</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
