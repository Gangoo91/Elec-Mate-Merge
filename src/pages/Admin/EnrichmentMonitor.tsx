import { useSearchParams } from 'react-router-dom';
import EnrichmentConsole from '@/components/admin/EnrichmentConsole';
import { Badge } from '@/components/ui/badge';
import { Database, Zap } from 'lucide-react';

export default function EnrichmentMonitor() {
  const [searchParams] = useSearchParams();
  const selectedTask = searchParams.get('task') || 'bs7671';

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Enrichment Console</h1>
            <p className="text-sm text-muted-foreground">
              Fast, accurate, complete - zero missed batches
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline" className="font-mono text-xs">
            <Zap className="w-3 h-3 mr-1" />
            6 Workers
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            UK English
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            GPT-5 Mini
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Multi-Facet
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            4m Timeout
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            30s Heartbeat
          </Badge>
        </div>
      </div>

      {/* Enrichment Console Component */}
      <EnrichmentConsole />
    </div>
  );
}
