import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Shield,
  ShieldOff,
  UserCheck,
  Clock,
  Mail,
  IdCard,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [adminFilter, setAdminFilter] = useState<string>("all");

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch users with their auth data
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users", search, roleFilter, adminFilter],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select(`
          id,
          full_name,
          username,
          role,
          admin_role,
          subscribed,
          created_at,
          updated_at,
          elec_id_enabled,
          onboarding_completed
        `)
        .order("created_at", { ascending: false });

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,username.ilike.%${search}%`);
      }

      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }

      if (adminFilter === "admin") {
        query = query.not("admin_role", "is", null);
      } else if (adminFilter === "non-admin") {
        query = query.is("admin_role", null);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Get presence data for online status
      const { data: presenceData } = await supabase
        .from("user_presence")
        .select("user_id, last_seen")
        .in("user_id", data?.map((u) => u.id) || []);

      const presenceMap = new Map(
        presenceData?.map((p) => [p.user_id, p.last_seen]) || []
      );

      // Get auth emails
      // Note: This requires service role key, so we'll skip it for now
      // In production, you'd use an edge function for this

      return data?.map((user) => ({
        ...user,
        last_seen: presenceMap.get(user.id),
        isOnline:
          presenceMap.get(user.id) &&
          new Date(presenceMap.get(user.id)!).getTime() > Date.now() - 5 * 60 * 1000,
      }));
    },
  });

  // Grant admin access mutation
  const grantAdminMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | null }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ admin_role: role })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "Admin access updated",
        description: "User permissions have been updated.",
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

  const handleToggleAdmin = (userId: string, currentRole: string | null) => {
    if (!isSuperAdmin) {
      toast({
        title: "Permission denied",
        description: "Only super admins can manage admin access.",
        variant: "destructive",
      });
      return;
    }

    grantAdminMutation.mutate({
      userId,
      role: currentRole ? null : "admin",
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="electrician">Electrician</SelectItem>
                <SelectItem value="apprentice">Apprentice</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="visitor">Visitor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={adminFilter} onValueChange={setAdminFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Admin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin">Admins Only</SelectItem>
                <SelectItem value="non-admin">Non-Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Users ({users?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              user.isOnline ? "bg-green-500" : "bg-muted"
                            }`}
                          />
                          <div>
                            <p className="font-medium">{user.full_name || "No name"}</p>
                            <p className="text-xs text-muted-foreground">{user.username}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {user.role || "visitor"}
                          </Badge>
                          {user.admin_role && (
                            <Badge className="text-xs bg-red-500/20 text-red-400 border-red-500/30">
                              {user.admin_role === "super_admin" ? "Super Admin" : "Admin"}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.subscribed && (
                            <Badge className="text-xs bg-green-500/20 text-green-400">
                              Subscribed
                            </Badge>
                          )}
                          {user.elec_id_enabled && (
                            <Badge className="text-xs bg-cyan-500/20 text-cyan-400">
                              <IdCard className="h-3 w-3 mr-1" />
                              Elec-ID
                            </Badge>
                          )}
                          {user.onboarding_completed && (
                            <Badge className="text-xs bg-purple-500/20 text-purple-400">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Onboarded
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.last_seen ? (
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(user.last_seen), { addSuffix: true })}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(user.created_at), "dd MMM yyyy")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Mail className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {isSuperAdmin && user.admin_role !== "super_admin" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="gap-2"
                                  onClick={() => handleToggleAdmin(user.id, user.admin_role)}
                                >
                                  {user.admin_role ? (
                                    <>
                                      <ShieldOff className="h-4 w-4" />
                                      Remove Admin
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="h-4 w-4" />
                                      Make Admin
                                    </>
                                  )}
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
