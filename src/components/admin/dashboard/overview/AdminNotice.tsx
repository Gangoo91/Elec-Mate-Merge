
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AdminNotice = () => {
  return (
    <Alert className="bg-yellow-900/20 text-yellow-500 border-yellow-500/30">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Admin Portal Notice</AlertTitle>
      <AlertDescription>
        This is a preview of the admin dashboard. In a real implementation, 
        you would connect this to your database to display actual statistics.
      </AlertDescription>
    </Alert>
  );
};

export default AdminNotice;
