import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { FileText, Sparkles, ArrowRight, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { callOutreach, type OutreachTemplate } from './shared';

interface TemplatesTabProps {
  onUseTemplate: (template: OutreachTemplate) => void;
}

const CATEGORY_COLOUR: Record<string, string> = {
  college: 'bg-blue-500/20 text-blue-300',
  tutor: 'bg-pink-500/20 text-pink-300',
  apprentice: 'bg-yellow-500/20 text-yellow-300',
  employer: 'bg-green-500/20 text-green-300',
  follow_up: 'bg-violet-500/20 text-violet-300',
  general: 'bg-slate-500/20 text-slate-300',
};

export default function TemplatesTab({ onUseTemplate }: TemplatesTabProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<OutreachTemplate | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['outreach-templates'],
    queryFn: () => callOutreach('list_templates'),
    staleTime: 60_000,
  });

  const seedMutation = useMutation({
    mutationFn: () => callOutreach('seed_templates'),
    onSuccess: (res) => {
      toast({
        title: `Seeded ${res.upserted} templates`,
        description: 'You can edit them from here anytime.',
      });
      queryClient.invalidateQueries({ queryKey: ['outreach-templates'] });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const templates: OutreachTemplate[] = data?.templates || [];

  return (
    <div className="space-y-4">
      {/* Seed banner — shown when no templates exist */}
      {!isLoading && templates.length === 0 && (
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-amber-600/5">
          <CardContent className="p-5 text-center">
            <Sparkles className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <p className="font-semibold text-white text-lg">Seed 5 V1 templates</p>
            <p className="text-sm text-white mt-1 mb-4">
              College cold pitch, tutor free access, apprentice spotlight, 7-day follow-up,
              employer nudge. All in V10 tone. Fully editable after.
            </p>
            <Button
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
            >
              {seedMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Install templates
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Re-seed reminder */}
      {!isLoading && templates.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center h-10 text-white hover:text-white hover:bg-white/5 touch-manipulation"
          onClick={() => seedMutation.mutate()}
          disabled={seedMutation.isPending}
        >
          {seedMutation.isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          )}
          Reset templates to latest V1
        </Button>
      )}

      {/* Gallery */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : templates.length === 0 ? null : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((t) => (
            <Card
              key={t.id}
              className="border-border/30 overflow-hidden touch-manipulation active:scale-[0.99] transition-transform"
            >
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center text-2xl shrink-0">
                      {t.thumbnail_emoji || '✉️'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-white text-sm truncate">{t.name}</p>
                      </div>
                      <Badge
                        className={`${CATEGORY_COLOUR[t.category] || CATEGORY_COLOUR.general} text-[10px] uppercase tracking-wider`}
                      >
                        {t.category.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-white line-clamp-2 mb-3 min-h-[32px]">
                    {t.description || 'No description.'}
                  </p>
                  <p className="text-xs text-white mb-1 uppercase tracking-wider font-semibold">
                    Subject
                  </p>
                  <p className="text-xs text-white line-clamp-1 mb-3">{t.subject}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 h-9 text-white hover:bg-white/5 touch-manipulation"
                      onClick={() => setPreview(t)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 h-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                      onClick={() => onUseTemplate(t)}
                    >
                      Use
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && templates.length === 0 && (
        <AdminEmptyState
          icon={FileText}
          title="No templates yet"
          description="Install the V1 library above to get started."
        />
      )}

      {/* Preview sheet */}
      <Sheet open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
        <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 border-t border-border/50">
          {preview && (
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
              </div>
              <SheetHeader className="px-6 pb-4 border-b border-border/50">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <span className="text-xl">{preview.thumbnail_emoji || '✉️'}</span>
                  {preview.name}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 pt-4 pb-3 border-b border-border/30">
                  <p className="text-xs text-white uppercase tracking-wider font-semibold">
                    Subject
                  </p>
                  <p className="text-white font-medium mt-1">{preview.subject}</p>
                  {preview.preheader && (
                    <>
                      <p className="text-xs text-white uppercase tracking-wider font-semibold mt-3">
                        Preheader
                      </p>
                      <p className="text-sm text-white mt-1">{preview.preheader}</p>
                    </>
                  )}
                </div>

                <div className="p-4">
                  <div className="mx-auto max-w-[600px] rounded-xl overflow-hidden border border-border/30">
                    <iframe
                      srcDoc={preview.html_body}
                      title="Template preview"
                      className="w-full block"
                      style={{ height: '70vh', background: '#000' }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur">
                <Button
                  className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
                  onClick={() => {
                    onUseTemplate(preview);
                    setPreview(null);
                  }}
                >
                  Use this template
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
