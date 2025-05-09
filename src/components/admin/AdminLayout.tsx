
import { Outlet } from "react-router-dom";
import { Shield } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="space-y-6">
      <div className="border border-yellow-500/30 bg-yellow-950/20 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-medium text-yellow-500">Admin Area</h2>
        </div>
        <p className="text-sm text-yellow-300/70">
          You are currently in the administration area. Changes made here will affect all users.
        </p>
      </div>
      
      <Outlet />
    </div>
  );
};

export default AdminLayout;
