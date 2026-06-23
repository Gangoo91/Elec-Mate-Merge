import { supabase } from '@/integrations/supabase/client';

export type PayType = 'hourly' | 'annual' | 'day_rate';

export interface Employee {
  id: string;
  name: string;
  role: string;
  team_role: string;
  status: string;
  phone: string | null;
  email: string | null;
  avatar_initials: string;
  photo_url: string | null;
  hourly_rate: number;
  annual_salary: number | null;
  pay_type: PayType;
  join_date: string | null;
  certifications_count: number;
  active_jobs_count: number;
  created_at: string;
  updated_at: string;
}

export const getEmployees = async (): Promise<Employee[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Scope to this employer's roster — the table also holds self-created
  // Elec-ID profiles (employer_id null) and other companies' rosters.
  const { data, error } = await supabase
    .from('employer_employees')
    .select('*')
    .eq('employer_id', user.id)
    .order('name');

  if (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }

  return data || [];
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const { data, error } = await supabase
    .from('employer_employees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching employee:', error);
    return null;
  }

  return data;
};

export const createEmployee = async (
  employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>
): Promise<Employee> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // employer_id links the roster row to this company; the lowercased email
  // is what lets the team member's own account claim the row on sign-in.
  const { data, error } = await supabase
    .from('employer_employees')
    .insert({
      ...employee,
      email: employee.email?.toLowerCase() ?? null,
      employer_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating employee:', error);
    throw error;
  }

  // Seat sync (dormant until billing is configured) — quantity follows the
  // active linked roster
  supabase.functions.invoke('manage-employer-seats').catch(() => {});

  // Tell the person they've been added and how to link (fire-and-forget —
  // roster creation never fails because an email didn't send)
  if (data?.email) {
    supabase.functions
      .invoke('send-team-welcome', { body: { employeeId: data.id } })
      .then(({ error: emailError }) => {
        if (emailError) console.error('Welcome email failed:', emailError);
      });
  }

  return data;
};

export const updateEmployee = async (
  id: string,
  updates: Partial<Employee>
): Promise<Employee | null> => {
  const { data, error } = await supabase
    .from('employer_employees')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating employee:', error);
    return null;
  }

  return data;
};

// Hard deletes are intentionally NOT exposed: employee history (timesheets,
// payroll, certifications, Elec-ID) is FK-RESTRICTed at the database. Archive
// via status='Archived'; full teardown only via teardown_employer_tenant.

export const getActiveEmployees = async (): Promise<Employee[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('employer_employees')
    .select('*')
    .eq('employer_id', user.id)
    .eq('status', 'active')
    .order('name');

  if (error) {
    console.error('Error fetching active employees:', error);
    throw error;
  }

  return data || [];
};
