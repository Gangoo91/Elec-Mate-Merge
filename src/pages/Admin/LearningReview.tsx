import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { type SupabaseClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Brain, CheckCircle2, XCircle, Edit, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface LearningSuggestion {
  id: string;
  agent_name: string;
  issue_type: string;
  ai_answer: string;
  user_correction: string;
  pattern_frequency: number;
  suggested_knowledge_update: Record<string, unknown> | null;
  suggested_prompt_change: string;
  status: string;
  created_at: string;
  feedback_id?: string;
}

export default function LearningReview() {
  const haptic = useHaptic();
  const [suggestions, setSuggestions] = useState<LearningSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from('learning_review_queue')
        .select('*')
        .order('pattern_frequency', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      toast.error('Failed to load learning suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (suggestion: LearningSuggestion) => {
    setProcessing(suggestion.id);
    try {
      const knowledgeUpdate = suggestion.suggested_knowledge_update as {
        topic: string;
        content: string;
        source?: string;
      } | null;

      if (!knowledgeUpdate) throw new Error('No knowledge update data');

      // Insert into appropriate knowledge base
      const tableName = getKnowledgeTableName(suggestion.agent_name);

      // Use untyped client for dynamic table names not in generated types
      const untypedClient = supabase as unknown as SupabaseClient;
      const { error: insertError } = await untypedClient.from(tableName).insert({
        topic: knowledgeUpdate.topic,
        content: knowledgeUpdate.content,
        source: knowledgeUpdate.source || 'feedback-learning',
      });

      if (insertError) throw insertError;

      // Update review queue status
      const { error: updateError } = await supabase
        .from('learning_review_queue')
        .update({
          status: 'implemented',
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', suggestion.id);

      if (updateError) throw updateError;

      // Log in changelog
      const { error: logError } = await untypedClient.from('knowledge_base_changelog').insert({
        action: 'insert',
        record_id: knowledgeUpdate.topic,
        new_content: knowledgeUpdate.content,
        change_reason: `Added from feedback pattern (${suggestion.pattern_frequency}x)`,
      });

      if (logError) throw logError;

      haptic.success();
      toast.success('Knowledge update approved and implemented');
      loadSuggestions();
    } catch (error) {
      console.error('Error approving suggestion:', error);
      haptic.error();
      toast.error('Failed to approve suggestion');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessing(id);
    try {
      const { error } = await supabase
        .from('learning_review_queue')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      haptic.success();
      toast.success('Suggestion rejected');
      loadSuggestions();
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
      haptic.error();
      toast.error('Failed to reject suggestion');
    } finally {
      setProcessing(null);
    }
  };

  const startEditing = (suggestion: LearningSuggestion) => {
    setEditingId(suggestion.id);
    setEditedContent(JSON.stringify(suggestion.suggested_knowledge_update, null, 2));
  };

  const saveEdit = async (suggestion: LearningSuggestion) => {
    try {
      const updatedKnowledge = JSON.parse(editedContent);
      const { error } = await supabase
        .from('learning_review_queue')
        .update({
          suggested_knowledge_update: updatedKnowledge,
        })
        .eq('id', suggestion.id);

      if (error) throw error;

      haptic.success();
      toast.success('Changes saved');
      setEditingId(null);
      loadSuggestions();
    } catch (error) {
      console.error('Error saving edit:', error);
      haptic.error();
      toast.error('Failed to save changes');
    }
  };

  const getKnowledgeTableName = (agentName: string): string => {
    const mapping: Record<string, string> = {
      designer: 'design_knowledge',
      installer: 'installation_knowledge',
      'health-safety': 'health_safety_knowledge',
      commissioning: 'inspection_testing_knowledge',
      'cost-engineer': 'project_mgmt_knowledge',
    };
    return mapping[agentName] || 'design_knowledge';
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { variant: 'default' | 'secondary' | 'destructive' | 'outline'; color: string }
    > = {
      pending: { variant: 'outline', color: 'text-yellow-500' },
      implemented: { variant: 'default', color: 'text-green-500' },
      rejected: { variant: 'secondary', color: 'text-red-500' },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge variant={config.variant} className={config.color}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <PullToRefresh
      onRefresh={async () => {
        await loadSuggestions();
      }}
    >
      <div className="container mx-auto py-8 space-y-6 pb-20">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle className="text-2xl">AI Learning Review Dashboard</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Review and approve knowledge base improvements from user feedback
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-4">
              <Card className="flex-1 p-4">
                <div className="text-2xl font-bold text-elec-yellow">
                  {suggestions.filter((s) => s.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </Card>
              <Card className="flex-1 p-4">
                <div className="text-2xl font-bold text-green-500">
                  {suggestions.filter((s) => s.status === 'implemented').length}
                </div>
                <div className="text-sm text-muted-foreground">Implemented</div>
              </Card>
              <Card className="flex-1 p-4">
                <div className="text-2xl font-bold text-red-500">
                  {suggestions.filter((s) => s.status === 'rejected').length}
                </div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </Card>
            </div>

            {suggestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No learning suggestions yet. Feedback analysis runs weekly.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Suggested Fix</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((suggestion) => (
                    <TableRow key={suggestion.id}>
                      <TableCell className="font-medium">{suggestion.agent_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{suggestion.issue_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{suggestion.pattern_frequency}x</Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        {editingId === suggestion.id ? (
                          <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="min-h-[100px] font-mono text-xs"
                          />
                        ) : (
                          <div className="text-sm">
                            <p className="font-semibold">
                              {String(suggestion.suggested_knowledge_update?.topic ?? '')}
                            </p>
                            <p className="text-muted-foreground line-clamp-2">
                              {String(suggestion.suggested_knowledge_update?.content ?? '')}
                            </p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(suggestion.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {suggestion.status === 'pending' && (
                            <>
                              {editingId === suggestion.id ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="h-11 touch-manipulation"
                                    onClick={() => saveEdit(suggestion)}
                                    disabled={!!processing}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-11 touch-manipulation"
                                    onClick={() => setEditingId(null)}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => startEditing(suggestion)}
                                    variant="outline"
                                    className="h-11 touch-manipulation"
                                    disabled={!!processing}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(suggestion)}
                                    disabled={processing === suggestion.id}
                                    className="h-11 touch-manipulation bg-green-500 hover:bg-green-600"
                                  >
                                    {processing === suggestion.id ? (
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                    ) : (
                                      <CheckCircle2 className="h-3 w-3" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-11 touch-manipulation"
                                    onClick={() => handleReject(suggestion.id)}
                                    disabled={processing === suggestion.id}
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PullToRefresh>
  );
}
