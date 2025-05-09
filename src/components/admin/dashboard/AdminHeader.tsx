
import { Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  isDevelopmentMode: boolean;
  isAdmin: boolean;
}

const AdminHeader = ({ isDevelopmentMode, isAdmin }: AdminHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      {isDevelopmentMode && !isAdmin && (
        <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/30 flex items-center gap-1">
          <Code className="h-3.5 w-3.5" />
          Dev Mode Access
        </Badge>
      )}
    </div>
  );
};

export default AdminHeader;
