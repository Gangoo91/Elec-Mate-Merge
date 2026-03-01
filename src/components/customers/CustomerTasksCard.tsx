import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Plus, Calendar, Loader2, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerTasksCardProps {
  customerId: string;
  customerName: string;
}

interface TaskRow {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_at: string | null;
  created_at: string;
}

const PRIORITY_COLOURS: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-yellow-500',
  low: 'bg-white/20',
};

export const CustomerTasksCard = ({ customerId, customerName }: CustomerTasksCardProps) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await (
          supabase as unknown as {
            from: (table: string) => {
              select: (cols: string) => {
                eq: (
                  col: string,
                  val: string
                ) => {
                  in: (
                    col: string,
                    vals: string[]
                  ) => {
                    order: (
                      col: string,
                      opts: { ascending: boolean }
                    ) => {
                      limit: (
                        n: number
                      ) => Promise<{ data: TaskRow[] | null; error: { message: string } | null }>;
                    };
                  };
                };
              };
            };
          }
        )
          .from('spark_tasks')
          .select('id, title, status, priority, due_at, created_at')
          .eq('customer_id', customerId)
          .in('status', ['open', 'done'])
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error('Failed to fetch customer tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [customerId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isOverdue = (dueAt: string | null) => {
    if (!dueAt) return false;
    return new Date(dueAt) < new Date();
  };

  const openTasks = tasks.filter((t) => t.status === 'open');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-purple-400" />
            Tasks
            {openTasks.length > 0 && (
              <Badge
                variant="outline"
                className="text-[10px] bg-purple-500/10 border-purple-500/30 text-purple-400"
              >
                {openTasks.length} open
              </Badge>
            )}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/electrician/tasks')}
            className="h-8 text-xs touch-manipulation text-purple-400"
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
        ) : tasks.length > 0 ? (
          <div className="space-y-2">
            {tasks.map((task) => {
              const overdue = task.status === 'open' && isOverdue(task.due_at);
              return (
                <div
                  key={task.id}
                  onClick={() => navigate('/electrician/tasks')}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-purple-500/30 active:bg-purple-500/10 cursor-pointer transition-all touch-manipulation"
                >
                  {/* Priority dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${PRIORITY_COLOURS[task.priority] || PRIORITY_COLOURS.normal}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium text-sm truncate ${task.status === 'done' ? 'line-through text-white' : ''}`}
                    >
                      {task.title}
                    </p>
                    {task.due_at && (
                      <p
                        className={`text-xs mt-0.5 flex items-center gap-1 ${overdue ? 'text-red-400' : 'text-white'}`}
                      >
                        <Calendar className="h-3 w-3" />
                        {overdue ? 'Overdue — ' : ''}
                        {formatDate(task.due_at)}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={task.status === 'done' ? 'default' : 'outline'}
                    className="text-[10px] flex-shrink-0"
                  >
                    {task.status === 'done' ? 'Done' : task.priority}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                </div>
              );
            })}
            {tasks.length >= 5 && (
              <button
                type="button"
                onClick={() => navigate('/electrician/tasks')}
                className="w-full text-center text-xs text-purple-400 font-medium py-2 touch-manipulation"
              >
                View all tasks
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No tasks linked to this customer yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
