
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MockUser } from "../types";

interface UserManagementProps {
  users: MockUser[];
}

const UserManagement = ({ users }: UserManagementProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">User Management</h3>
        <div className="flex gap-2">
          <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded hover:bg-elec-yellow/90 flex items-center gap-1">
            <Users className="h-3 w-3" /> Add User
          </button>
          <button className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded hover:bg-elec-gray-light/70">
            Export
          </button>
        </div>
      </div>
      
      <div className="rounded-md border border-elec-yellow/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <button className="text-xs bg-elec-gray-light/30 hover:bg-elec-gray-light/50 px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="text-xs bg-red-900/20 text-red-400 hover:bg-red-900/40 px-2 py-1 rounded">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>Showing 1-4 of 2,431 users</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
          <button className="px-2 py-1 rounded bg-elec-yellow/20 text-elec-yellow">1</button>
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">2</button>
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">3</button>
          <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">Next</button>
        </div>
      </div>
    </Card>
  );
};

export default UserManagement;
