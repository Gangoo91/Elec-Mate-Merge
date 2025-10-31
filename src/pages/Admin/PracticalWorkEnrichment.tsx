import PracticalWorkEnrichmentConsole from '@/components/admin/PracticalWorkEnrichmentConsole';
import { GitMerge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PracticalWorkEnrichment() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <GitMerge className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Practical Work Enrichment</h1>
            <p className="text-sm text-muted-foreground">
              Multi-pass enrichment pipeline: Unification → Primary → 4 Specialist Passes
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <Badge variant="outline" className="font-mono text-xs">10 Workers</Badge>
          <Badge variant="outline" className="font-mono text-xs">4min Timeout</Badge>
          <Badge variant="outline" className="font-mono text-xs">GPT-5 Mini</Badge>
          <Badge variant="outline" className="font-mono text-xs">Multi-Agent RAG</Badge>
        </div>
      </div>

      <PracticalWorkEnrichmentConsole />
    </div>
  );
}
