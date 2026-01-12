import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

interface VoiceToolRequest {
  tool: string;
  params: Record<string, unknown>;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get authorization header for user context
    const authHeader = req.headers.get('Authorization');

    // Create Supabase client with user context (if auth provided) or service role
    const supabase = authHeader
      ? createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          { global: { headers: { Authorization: authHeader } } }
        )
      : createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

    // Get user from auth header if provided
    let userId: string | null = null;
    if (authHeader) {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        return new Response(
          JSON.stringify({ error: 'Authentication failed' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userId = user?.id ?? null;
    }

    const { tool, params }: VoiceToolRequest = await req.json();

    if (!tool) {
      return new Response(
        JSON.stringify({ error: 'Tool name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Employer voice tool called: ${tool}`, { params, userId });

    let result: string;

    switch (tool) {
      // ============================================
      // EMPLOYEE QUERIES
      // ============================================
      case 'get_employee_info': {
        const { name } = params as { name?: string };
        let query = supabase
          .from('employees')
          .select('id, name, role, email, phone, hourly_rate, status, created_at')
          .order('name', { ascending: true })
          .limit(10);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        if (name) {
          query = query.ilike('name', `%${name}%`);
        }

        const { data: employees, error } = await query;

        if (error) {
          console.error('Error fetching employees:', error);
          result = 'Failed to fetch employees';
        } else if (!employees || employees.length === 0) {
          result = name ? `No employees found matching "${name}"` : 'No employees found';
        } else {
          const summary = employees.slice(0, 5).map(e =>
            `${e.name} (${e.role || 'No role'})`
          ).join(', ');
          result = `Found ${employees.length} employees: ${summary}`;
        }
        break;
      }

      case 'get_employee_certifications': {
        const { name } = params as { name: string };
        if (!name) {
          result = 'Please specify an employee name';
          break;
        }

        // First find the employee
        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${name}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${name}"`;
          break;
        }

        // Get their certifications
        const { data: certs, error } = await supabase
          .from('certifications')
          .select('id, name, expiry_date, status')
          .eq('employee_id', employee.id)
          .order('expiry_date', { ascending: true });

        if (error) {
          result = 'Failed to fetch certifications';
        } else if (!certs || certs.length === 0) {
          result = `${employee.name} has no certifications on record`;
        } else {
          const certList = certs.map(c => {
            const expiry = c.expiry_date ? new Date(c.expiry_date).toLocaleDateString('en-GB') : 'No expiry';
            return `${c.name} (expires ${expiry})`;
          }).join(', ');
          result = `${employee.name} has ${certs.length} certifications: ${certList}`;
        }
        break;
      }

      case 'get_expiring_certifications': {
        const { days = 30 } = params as { days?: number };
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);

        const { data: certs, error } = await supabase
          .from('certifications')
          .select('id, name, expiry_date, employees(name)')
          .lte('expiry_date', futureDate.toISOString())
          .gte('expiry_date', new Date().toISOString())
          .order('expiry_date', { ascending: true })
          .limit(10);

        if (error) {
          result = 'Failed to fetch expiring certifications';
        } else if (!certs || certs.length === 0) {
          result = `No certifications expiring in the next ${days} days`;
        } else {
          const certList = certs.slice(0, 5).map(c => {
            const emp = (c as any).employees?.name || 'Unknown';
            return `${emp}'s ${c.name}`;
          }).join(', ');
          result = `${certs.length} certifications expiring within ${days} days: ${certList}`;
        }
        break;
      }

      // ============================================
      // TIMESHEET QUERIES & APPROVALS
      // ============================================
      case 'get_pending_timesheets': {
        const { data: timesheets, error } = await supabase
          .from('time_entries')
          .select('id, employee_id, hours, date, status, employees(name)')
          .eq('status', 'pending')
          .order('date', { ascending: false })
          .limit(20);

        if (error) {
          result = 'Failed to fetch pending timesheets';
        } else if (!timesheets || timesheets.length === 0) {
          result = 'No pending timesheets to approve';
        } else {
          const totalHours = timesheets.reduce((sum, t) => sum + (t.hours || 0), 0);
          const employees = [...new Set(timesheets.map(t => (t as any).employees?.name))].filter(Boolean);
          result = `${timesheets.length} pending time entries from ${employees.length} employees, totalling ${totalHours} hours`;
        }
        break;
      }

      case 'approve_timesheet': {
        const { employeeName, approveAll } = params as { employeeName?: string; approveAll?: boolean };

        if (approveAll) {
          const { data, error } = await supabase
            .from('time_entries')
            .update({ status: 'approved' })
            .eq('status', 'pending')
            .select();

          if (error) {
            result = 'Failed to approve timesheets';
          } else {
            result = `Approved ${data?.length || 0} pending time entries`;
          }
        } else if (employeeName) {
          // Find employee
          const { data: employee } = await supabase
            .from('employees')
            .select('id, name')
            .ilike('name', `%${employeeName}%`)
            .single();

          if (!employee) {
            result = `No employee found matching "${employeeName}"`;
          } else {
            const { data, error } = await supabase
              .from('time_entries')
              .update({ status: 'approved' })
              .eq('employee_id', employee.id)
              .eq('status', 'pending')
              .select();

            if (error) {
              result = `Failed to approve timesheets for ${employee.name}`;
            } else {
              result = `Approved ${data?.length || 0} time entries for ${employee.name}`;
            }
          }
        } else {
          result = 'Please specify an employee name or say "approve all"';
        }
        break;
      }

      case 'reject_timesheet': {
        const { employeeName, reason } = params as { employeeName: string; reason?: string };

        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${employeeName}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${employeeName}"`;
        } else {
          const { data, error } = await supabase
            .from('time_entries')
            .update({ status: 'rejected', notes: reason })
            .eq('employee_id', employee.id)
            .eq('status', 'pending')
            .select();

          if (error) {
            result = `Failed to reject timesheets for ${employee.name}`;
          } else {
            result = `Rejected ${data?.length || 0} time entries for ${employee.name}${reason ? ` - Reason: ${reason}` : ''}`;
          }
        }
        break;
      }

      // ============================================
      // LEAVE REQUESTS
      // ============================================
      case 'get_pending_leave': {
        const { data: leaveRequests, error } = await supabase
          .from('leave_requests')
          .select('id, employee_id, start_date, end_date, type, status, employees(name)')
          .eq('status', 'pending')
          .order('start_date', { ascending: true })
          .limit(10);

        if (error) {
          result = 'Failed to fetch pending leave requests';
        } else if (!leaveRequests || leaveRequests.length === 0) {
          result = 'No pending leave requests';
        } else {
          const summary = leaveRequests.slice(0, 3).map(l => {
            const emp = (l as any).employees?.name || 'Unknown';
            const start = new Date(l.start_date).toLocaleDateString('en-GB');
            return `${emp} (${l.type} from ${start})`;
          }).join(', ');
          result = `${leaveRequests.length} pending leave requests: ${summary}`;
        }
        break;
      }

      case 'approve_leave': {
        const { employeeName } = params as { employeeName: string };

        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${employeeName}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${employeeName}"`;
        } else {
          const { data, error } = await supabase
            .from('leave_requests')
            .update({ status: 'approved' })
            .eq('employee_id', employee.id)
            .eq('status', 'pending')
            .select();

          if (error) {
            result = `Failed to approve leave for ${employee.name}`;
          } else if (!data || data.length === 0) {
            result = `No pending leave requests for ${employee.name}`;
          } else {
            result = `Approved leave request for ${employee.name}`;
          }
        }
        break;
      }

      case 'reject_leave': {
        const { employeeName, reason } = params as { employeeName: string; reason?: string };

        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${employeeName}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${employeeName}"`;
        } else {
          const { data, error } = await supabase
            .from('leave_requests')
            .update({ status: 'rejected', rejection_reason: reason })
            .eq('employee_id', employee.id)
            .eq('status', 'pending')
            .select();

          if (error) {
            result = `Failed to reject leave for ${employee.name}`;
          } else if (!data || data.length === 0) {
            result = `No pending leave requests for ${employee.name}`;
          } else {
            result = `Rejected leave request for ${employee.name}${reason ? ` - Reason: ${reason}` : ''}`;
          }
        }
        break;
      }

      // ============================================
      // EXPENSE CLAIMS
      // ============================================
      case 'get_pending_expenses': {
        const { data: expenses, error } = await supabase
          .from('expense_claims')
          .select('id, employee_id, amount, category, description, status, employees(name)')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          result = 'Failed to fetch pending expenses';
        } else if (!expenses || expenses.length === 0) {
          result = 'No pending expense claims';
        } else {
          const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
          result = `${expenses.length} pending expense claims totalling £${total.toFixed(2)}`;
        }
        break;
      }

      case 'approve_expense': {
        const { employeeName, approveAll } = params as { employeeName?: string; approveAll?: boolean };

        if (approveAll) {
          const { data, error } = await supabase
            .from('expense_claims')
            .update({ status: 'approved' })
            .eq('status', 'pending')
            .select();

          if (error) {
            result = 'Failed to approve expenses';
          } else {
            result = `Approved ${data?.length || 0} expense claims`;
          }
        } else if (employeeName) {
          const { data: employee } = await supabase
            .from('employees')
            .select('id, name')
            .ilike('name', `%${employeeName}%`)
            .single();

          if (!employee) {
            result = `No employee found matching "${employeeName}"`;
          } else {
            const { data, error } = await supabase
              .from('expense_claims')
              .update({ status: 'approved' })
              .eq('employee_id', employee.id)
              .eq('status', 'pending')
              .select();

            if (error) {
              result = `Failed to approve expenses for ${employee.name}`;
            } else {
              result = `Approved ${data?.length || 0} expense claims for ${employee.name}`;
            }
          }
        } else {
          result = 'Please specify an employee name or say "approve all"';
        }
        break;
      }

      case 'reject_expense': {
        const { employeeName, reason } = params as { employeeName: string; reason?: string };

        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${employeeName}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${employeeName}"`;
        } else {
          const { data, error } = await supabase
            .from('expense_claims')
            .update({ status: 'rejected', rejection_reason: reason })
            .eq('employee_id', employee.id)
            .eq('status', 'pending')
            .select();

          if (error) {
            result = `Failed to reject expenses for ${employee.name}`;
          } else {
            result = `Rejected ${data?.length || 0} expense claims for ${employee.name}${reason ? ` - Reason: ${reason}` : ''}`;
          }
        }
        break;
      }

      // ============================================
      // JOB QUERIES
      // ============================================
      case 'get_job_info': {
        const { title } = params as { title?: string };
        let query = supabase
          .from('jobs')
          .select('id, title, client, location, status, progress, value, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        if (title) {
          query = query.ilike('title', `%${title}%`);
        }

        const { data: jobs, error } = await query;

        if (error) {
          result = 'Failed to fetch jobs';
        } else if (!jobs || jobs.length === 0) {
          result = title ? `No jobs found matching "${title}"` : 'No jobs found';
        } else {
          const summary = jobs.slice(0, 5).map(j =>
            `${j.title} for ${j.client} (${j.status}, ${j.progress || 0}% complete)`
          ).join('. ');
          result = `Found ${jobs.length} jobs. ${summary}`;
        }
        break;
      }

      case 'get_job_workers': {
        const { title } = params as { title: string };
        if (!title) {
          result = 'Please specify a job title';
          break;
        }

        const { data: job } = await supabase
          .from('jobs')
          .select('id, title')
          .ilike('title', `%${title}%`)
          .single();

        if (!job) {
          result = `No job found matching "${title}"`;
          break;
        }

        const { data: assignments, error } = await supabase
          .from('job_assignments')
          .select('id, employees(name, role)')
          .eq('job_id', job.id);

        if (error) {
          result = 'Failed to fetch job workers';
        } else if (!assignments || assignments.length === 0) {
          result = `No workers assigned to ${job.title}`;
        } else {
          const workers = assignments.map(a => (a as any).employees?.name).filter(Boolean).join(', ');
          result = `${assignments.length} workers on ${job.title}: ${workers}`;
        }
        break;
      }

      case 'get_job_progress': {
        const { title } = params as { title: string };
        if (!title) {
          result = 'Please specify a job title';
          break;
        }

        const { data: job, error } = await supabase
          .from('jobs')
          .select('id, title, progress, status, start_date, end_date')
          .ilike('title', `%${title}%`)
          .single();

        if (error || !job) {
          result = `No job found matching "${title}"`;
        } else {
          result = `${job.title}: ${job.progress || 0}% complete, status: ${job.status}`;
        }
        break;
      }

      case 'get_upcoming_deadlines': {
        const { days = 7 } = params as { days?: number };
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);

        const { data: jobs, error } = await supabase
          .from('jobs')
          .select('id, title, client, end_date')
          .lte('end_date', futureDate.toISOString())
          .gte('end_date', new Date().toISOString())
          .neq('status', 'completed')
          .order('end_date', { ascending: true })
          .limit(10);

        if (error) {
          result = 'Failed to fetch upcoming deadlines';
        } else if (!jobs || jobs.length === 0) {
          result = `No job deadlines in the next ${days} days`;
        } else {
          const summary = jobs.slice(0, 3).map(j => {
            const date = new Date(j.end_date).toLocaleDateString('en-GB');
            return `${j.title} (${date})`;
          }).join(', ');
          result = `${jobs.length} jobs due within ${days} days: ${summary}`;
        }
        break;
      }

      // ============================================
      // WORKER LOCATIONS
      // ============================================
      case 'get_worker_locations': {
        const { data: locations, error } = await supabase
          .from('worker_locations')
          .select('id, employee_id, latitude, longitude, updated_at, employees(name)')
          .order('updated_at', { ascending: false })
          .limit(20);

        if (error) {
          result = 'Failed to fetch worker locations';
        } else if (!locations || locations.length === 0) {
          result = 'No worker location data available';
        } else {
          const workers = locations.map(l => (l as any).employees?.name).filter(Boolean);
          result = `${workers.length} workers with location data: ${workers.slice(0, 5).join(', ')}`;
        }
        break;
      }

      case 'get_worker_location': {
        const { name } = params as { name: string };
        if (!name) {
          result = 'Please specify a worker name';
          break;
        }

        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${name}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${name}"`;
          break;
        }

        const { data: location, error } = await supabase
          .from('worker_locations')
          .select('latitude, longitude, updated_at')
          .eq('employee_id', employee.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (error || !location) {
          result = `No location data for ${employee.name}`;
        } else {
          const updated = new Date(location.updated_at).toLocaleTimeString('en-GB');
          result = `${employee.name}'s last known location was updated at ${updated}`;
        }
        break;
      }

      // ============================================
      // DASHBOARD SUMMARY
      // ============================================
      case 'get_dashboard_summary': {
        // Get counts in parallel
        const [
          { count: employeeCount },
          { count: pendingTimesheets },
          { count: pendingLeave },
          { count: pendingExpenses },
          { count: activeJobs },
        ] = await Promise.all([
          supabase.from('employees').select('*', { count: 'exact', head: true }),
          supabase.from('time_entries').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('leave_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('expense_claims').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        ]);

        result = `Dashboard summary: ${employeeCount || 0} employees, ${activeJobs || 0} active jobs. ` +
          `Pending approvals: ${pendingTimesheets || 0} timesheets, ${pendingLeave || 0} leave requests, ${pendingExpenses || 0} expenses.`;
        break;
      }

      case 'get_todays_schedule': {
        const today = new Date().toISOString().split('T')[0];

        const { data: assignments, error } = await supabase
          .from('job_assignments')
          .select('id, jobs(title, client, location), employees(name)')
          .eq('date', today)
          .limit(20);

        if (error) {
          result = 'Failed to fetch today\'s schedule';
        } else if (!assignments || assignments.length === 0) {
          result = 'No job assignments scheduled for today';
        } else {
          const byJob: Record<string, string[]> = {};
          assignments.forEach(a => {
            const jobTitle = (a as any).jobs?.title || 'Unknown job';
            const worker = (a as any).employees?.name || 'Unknown';
            if (!byJob[jobTitle]) byJob[jobTitle] = [];
            byJob[jobTitle].push(worker);
          });

          const summary = Object.entries(byJob).slice(0, 3).map(([job, workers]) =>
            `${job}: ${workers.join(', ')}`
          ).join('. ');
          result = `Today's schedule: ${summary}`;
        }
        break;
      }

      // ============================================
      // CREATION TOOLS
      // ============================================
      case 'create_employee': {
        const { name, role, email, phone, hourlyRate } = params as {
          name: string;
          role?: string;
          email?: string;
          phone?: string;
          hourlyRate?: number;
        };

        if (!name) {
          result = 'Employee name is required';
          break;
        }

        const { data, error } = await supabase
          .from('employees')
          .insert({
            name,
            role: role || 'Electrician',
            email,
            phone,
            hourly_rate: hourlyRate,
            user_id: userId,
            status: 'active',
          })
          .select()
          .single();

        if (error) {
          result = `Failed to create employee: ${error.message}`;
        } else {
          result = `Created employee ${data.name}${role ? ` as ${role}` : ''}`;
        }
        break;
      }

      case 'create_job': {
        const { title, client, location, description, value } = params as {
          title: string;
          client: string;
          location: string;
          description?: string;
          value?: number;
        };

        if (!title || !client || !location) {
          result = 'Job title, client, and location are required';
          break;
        }

        const { data, error } = await supabase
          .from('jobs')
          .insert({
            title,
            client,
            location,
            description,
            value,
            user_id: userId,
            status: 'pending',
            progress: 0,
          })
          .select()
          .single();

        if (error) {
          result = `Failed to create job: ${error.message}`;
        } else {
          result = `Created job "${data.title}" for ${data.client} at ${data.location}`;
        }
        break;
      }

      case 'assign_to_job': {
        const { employeeName, jobTitle } = params as { employeeName: string; jobTitle: string };

        const { data: employee } = await supabase
          .from('employees')
          .select('id, name')
          .ilike('name', `%${employeeName}%`)
          .single();

        if (!employee) {
          result = `No employee found matching "${employeeName}"`;
          break;
        }

        const { data: job } = await supabase
          .from('jobs')
          .select('id, title')
          .ilike('title', `%${jobTitle}%`)
          .single();

        if (!job) {
          result = `No job found matching "${jobTitle}"`;
          break;
        }

        const { error } = await supabase
          .from('job_assignments')
          .insert({
            employee_id: employee.id,
            job_id: job.id,
          });

        if (error) {
          result = `Failed to assign ${employee.name} to ${job.title}`;
        } else {
          result = `Assigned ${employee.name} to ${job.title}`;
        }
        break;
      }

      case 'update_job_status': {
        const { title, status } = params as { title: string; status: string };

        const { data: job, error } = await supabase
          .from('jobs')
          .update({ status })
          .ilike('title', `%${title}%`)
          .select()
          .single();

        if (error) {
          result = `Failed to update job status: ${error.message}`;
        } else {
          result = `Updated ${job.title} status to ${status}`;
        }
        break;
      }

      case 'update_job_progress': {
        const { title, progress } = params as { title: string; progress: number };

        const { data: job, error } = await supabase
          .from('jobs')
          .update({ progress })
          .ilike('title', `%${title}%`)
          .select()
          .single();

        if (error) {
          result = `Failed to update job progress: ${error.message}`;
        } else {
          result = `Updated ${job.title} progress to ${progress}%`;
        }
        break;
      }

      // ============================================
      // INCIDENTS
      // ============================================
      case 'get_open_incidents': {
        const { data: incidents, error } = await supabase
          .from('incidents')
          .select('id, title, severity, location, created_at')
          .neq('status', 'closed')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          result = 'Failed to fetch incidents';
        } else if (!incidents || incidents.length === 0) {
          result = 'No open incidents';
        } else {
          const summary = incidents.slice(0, 3).map(i =>
            `${i.title} (${i.severity})`
          ).join(', ');
          result = `${incidents.length} open incidents: ${summary}`;
        }
        break;
      }

      case 'create_incident': {
        const { title, description, severity, location } = params as {
          title: string;
          description?: string;
          severity?: string;
          location?: string;
        };

        const { data, error } = await supabase
          .from('incidents')
          .insert({
            title,
            description,
            severity: severity || 'medium',
            location,
            user_id: userId,
            status: 'open',
          })
          .select()
          .single();

        if (error) {
          result = `Failed to report incident: ${error.message}`;
        } else {
          result = `Incident reported: ${data.title} (${data.severity} severity)`;
        }
        break;
      }

      // ============================================
      // QUOTES & INVOICES (shared with electrician)
      // ============================================
      case 'get_quote_info': {
        const { client, status } = params as { client?: string; status?: string };
        let query = supabase
          .from('quotes')
          .select('id, quoteNumber, client_data, total, status, acceptance_status, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        if (status) {
          query = query.eq('status', status);
        }

        const { data: quotes, error } = await query;

        if (error) {
          result = 'Failed to fetch quotes';
        } else if (!quotes || quotes.length === 0) {
          result = 'No quotes found';
        } else {
          let filteredQuotes = quotes;
          if (client) {
            const clientLower = client.toLowerCase();
            filteredQuotes = quotes.filter(q => {
              const clientData = typeof q.client_data === 'string'
                ? JSON.parse(q.client_data)
                : q.client_data;
              return clientData?.name?.toLowerCase().includes(clientLower);
            });
          }

          if (filteredQuotes.length === 0) {
            result = client ? `No quotes found for ${client}` : 'No quotes found';
          } else {
            const summary = filteredQuotes.slice(0, 5).map(q => {
              const clientData = typeof q.client_data === 'string'
                ? JSON.parse(q.client_data)
                : q.client_data;
              return `Quote #${q.quoteNumber} for ${clientData?.name || 'Unknown'}: £${q.total?.toFixed(2) || 0}`;
            }).join('. ');
            result = `Found ${filteredQuotes.length} quotes. ${summary}`;
          }
        }
        break;
      }

      case 'get_invoice_info': {
        const { client, status } = params as { client?: string; status?: string };
        let query = supabase
          .from('quotes')
          .select('id, invoice_number, client_data, total, invoice_status, invoice_date')
          .not('invoice_number', 'is', null)
          .order('invoice_date', { ascending: false })
          .limit(10);

        if (userId) {
          query = query.eq('user_id', userId);
        }

        if (status) {
          query = query.eq('invoice_status', status);
        }

        const { data: invoices, error } = await query;

        if (error) {
          result = 'Failed to fetch invoices';
        } else if (!invoices || invoices.length === 0) {
          result = 'No invoices found';
        } else {
          let filteredInvoices = invoices;
          if (client) {
            const clientLower = client.toLowerCase();
            filteredInvoices = invoices.filter(i => {
              const clientData = typeof i.client_data === 'string'
                ? JSON.parse(i.client_data)
                : i.client_data;
              return clientData?.name?.toLowerCase().includes(clientLower);
            });
          }

          if (filteredInvoices.length === 0) {
            result = client ? `No invoices found for ${client}` : 'No invoices found';
          } else {
            const summary = filteredInvoices.slice(0, 5).map(i => {
              const clientData = typeof i.client_data === 'string'
                ? JSON.parse(i.client_data)
                : i.client_data;
              return `Invoice #${i.invoice_number} for ${clientData?.name || 'Unknown'}: £${i.total?.toFixed(2) || 0} (${i.invoice_status})`;
            }).join('. ');
            result = `Found ${filteredInvoices.length} invoices. ${summary}`;
          }
        }
        break;
      }

      case 'get_overdue_invoices': {
        const today = new Date().toISOString().split('T')[0];
        let query = supabase
          .from('quotes')
          .select('id, invoice_number, client_data, total, invoice_status, invoice_due_date')
          .not('invoice_number', 'is', null)
          .neq('invoice_status', 'paid')
          .lt('invoice_due_date', today)
          .order('invoice_due_date', { ascending: true });

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data: overdueInvoices, error } = await query;

        if (error) {
          result = 'Failed to fetch overdue invoices';
        } else if (!overdueInvoices || overdueInvoices.length === 0) {
          result = 'No overdue invoices. All payments are on track!';
        } else {
          const totalOverdue = overdueInvoices.reduce((sum, i) => sum + (i.total || 0), 0);
          result = `You have ${overdueInvoices.length} overdue invoices totalling £${totalOverdue.toFixed(2)}`;
        }
        break;
      }

      default:
        result = `Unknown tool: ${tool}. Available employer tools: get_employee_info, get_pending_timesheets, approve_timesheet, get_job_info, get_worker_locations, and more.`;
    }

    return new Response(
      JSON.stringify({ result, message: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Employer voice tools error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage, result: `Error: ${errorMessage}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
