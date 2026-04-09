import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ChevronRight } from 'lucide-react';
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

  return (
    <div className="card-surface-interactive rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">Tasks</h3>
          {openTasks.length > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-elec-yellow/15 text-elec-yellow">
              {openTasks.length} open
            </span>
          )}
        </div>
        <button
          onClick={() => navigate('/electrician/tasks')}
          className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          + New
        </button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
          </div>
        ) : tasks.length > 0 ? (
          <div className="space-y-2">
            {tasks.map((task) => {
              const overdue = task.status === 'open' && isOverdue(task.due_at);
              return (
                <div
                  key={task.id}
                  onClick={() => navigate('/electrician/tasks')}
                  className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]"
                >
                  {/* Priority dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${PRIORITY_COLOURS[task.priority] || PRIORITY_COLOURS.normal}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium text-sm text-white truncate ${task.status === 'done' ? 'line-through' : ''}`}
                    >
                      {task.title}
                    </p>
                    {task.due_at && (
                      <p
                        className={`text-xs mt-0.5 ${overdue ? 'text-red-400' : 'text-white'}`}
                      >
                        {overdue ? 'Overdue — ' : ''}
                        {formatDate(task.due_at)}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                      task.status === 'done'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {task.status === 'done' ? 'Done' : task.priority}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                </div>
              );
            })}
            {tasks.length >= 5 && (
              <button
                type="button"
                onClick={() => navigate('/electrician/tasks')}
                className="w-full text-center text-xs text-elec-yellow font-medium py-2 touch-manipulation"
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
      </div>
    </div>
  );
};
