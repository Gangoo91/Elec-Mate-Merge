import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getJobAssignments,
  getEmployeeAssignments,
  createJobAssignment,
  updateJobAssignment,
  deleteJobAssignment,
  removeWorkerFromJob,
  checkForClashes,
  JobAssignment,
  JobAssignmentWithDetails,
} from '@/services/jobAssignmentService';
import { createNotification } from '@/services/notificationService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useJobAssignments = (jobId: string) => {
  return useQuery({
    queryKey: ['job-assignments', jobId],
    queryFn: () => getJobAssignments(jobId),
    enabled: !!jobId,
  });
};

export const useEmployeeAssignments = (employeeId: string) => {
  return useQuery({
    queryKey: ['employee-assignments', employeeId],
    queryFn: () => getEmployeeAssignments(employeeId),
    enabled: !!employeeId,
  });
};

export const useCreateJobAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      assignment,
      jobTitle,
      jobLocation,
      sendNotification = true,
    }: {
      assignment: {
        job_id: string;
        employee_id: string;
        start_date: string;
        end_date?: string | null;
        role_on_job?: string | null;
        notes?: string | null;
        notify_email?: boolean;
        assigned_by?: string;
      };
      jobTitle: string;
      jobLocation: string;
      sendNotification?: boolean;
    }) => {
      // Create the assignment
      const newAssignment = await createJobAssignment(assignment);

      // Create in-app notification
      if (sendNotification) {
        try {
          await createNotification({
            employee_id: assignment.employee_id,
            type: 'job_assignment',
            title: 'New Job Assignment',
            message: `You have been assigned to "${jobTitle}" at ${jobLocation}`,
            job_id: assignment.job_id,
            action_url: `/jobs/${assignment.job_id}`,
          });
          console.log('In-app notification created for employee:', assignment.employee_id);
        } catch (notifError) {
          console.error('Failed to create in-app notification:', notifError);
        }

        // Send email notification via edge function if enabled
        if (assignment.notify_email !== false) {
          try {
            const { error: emailError } = await supabase.functions.invoke('send-job-notification', {
              body: {
                employee_id: assignment.employee_id,
                job_id: assignment.job_id,
                job_title: jobTitle,
                job_location: jobLocation,
                start_date: assignment.start_date,
                end_date: assignment.end_date,
                notes: assignment.notes,
              },
            });
            if (emailError) {
              console.error('Email notification error:', emailError);
              toast.info('Worker assigned', {
                description: 'In-app notification sent. Email notification may have failed.',
              });
            } else {
              console.log('Email notification sent successfully');
            }
          } catch (error) {
            console.error('Failed to send email notification:', error);
          }
        }
      }

      return newAssignment;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job-assignments', variables.assignment.job_id] });
      queryClient.invalidateQueries({ queryKey: ['employee-assignments', variables.assignment.employee_id] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useUpdateJobAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<JobAssignment> }) =>
      updateJobAssignment(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['employee-assignments'] });
    },
  });
};

export const useDeleteJobAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['employee-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useRemoveWorkerFromJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, employeeId }: { jobId: string; employeeId: string }) =>
      removeWorkerFromJob(jobId, employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['employee-assignments'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useCheckForClashes = () => {
  return useMutation({
    mutationFn: ({
      employeeId,
      startDate,
      endDate,
      excludeJobId,
    }: {
      employeeId: string;
      startDate: string;
      endDate: string | null;
      excludeJobId?: string;
    }) => checkForClashes(employeeId, startDate, endDate, excludeJobId),
  });
};
