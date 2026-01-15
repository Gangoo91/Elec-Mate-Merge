import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type TeamMemberRole = "Owner" | "Admin" | "Manager" | "Member";
export type TeamMemberStatus = "Active" | "Pending" | "Disabled";

export interface TeamMember {
  id: string;
  owner_user_id: string;
  email: string;
  name: string | null;
  role: TeamMemberRole;
  status: TeamMemberStatus;
  member_user_id: string | null;
  invited_at: string;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateTeamMemberInput = {
  email: string;
  name?: string;
  role: TeamMemberRole;
};

export type UpdateTeamMemberInput = Partial<{
  name: string;
  role: TeamMemberRole;
  status: TeamMemberStatus;
}>;

// Fetch all team members for the current user
export function useTeamMembers() {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("employer_team_members")
        .select("*")
        .eq("owner_user_id", user.id)
        .order("role", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      return data as TeamMember[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Invite a new team member
export function useInviteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTeamMemberInput): Promise<TeamMember> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Check if email already exists for this owner
      const { data: existing } = await supabase
        .from("employer_team_members")
        .select("id")
        .eq("owner_user_id", user.id)
        .eq("email", input.email.toLowerCase())
        .single();

      if (existing) {
        throw new Error("This email has already been invited");
      }

      const { data, error } = await supabase
        .from("employer_team_members")
        .insert({
          owner_user_id: user.id,
          email: input.email.toLowerCase(),
          name: input.name || null,
          role: input.role,
          status: "Pending",
        })
        .select()
        .single();

      if (error) throw error;

      // Send invitation email via edge function
      try {
        await supabase.functions.invoke("send-team-invite", {
          body: { teamMemberId: data.id },
        });
      } catch (emailError) {
        console.error("Failed to send invitation email:", emailError);
        // Don't fail the mutation - team member was created successfully
      }

      return data as TeamMember;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      toast({
        title: "Invitation sent",
        description: `${data.email} has been invited to join your team.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update a team member
export function useUpdateTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateTeamMemberInput & { id: string }): Promise<TeamMember> => {
      const { data, error } = await supabase
        .from("employer_team_members")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as TeamMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      toast({
        title: "Updated",
        description: "Team member updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Remove a team member
export function useRemoveTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("employer_team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      toast({
        title: "Removed",
        description: "Team member has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Resend invitation to a pending team member
export function useResendInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<TeamMember> => {
      // Update invited_at to trigger a new invitation
      const { data, error } = await supabase
        .from("employer_team_members")
        .update({
          invited_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Send invitation email via edge function
      try {
        await supabase.functions.invoke("send-team-invite", {
          body: { teamMemberId: data.id },
        });
      } catch (emailError) {
        console.error("Failed to send invitation email:", emailError);
        // Don't fail the mutation - record was updated successfully
      }

      return data as TeamMember;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
      toast({
        title: "Invitation resent",
        description: `Invitation resent to ${data.email}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
