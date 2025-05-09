
import { Users, Activity, FileText, AlertCircle } from "lucide-react";
import StatCard from "../stats/StatCard";

const OverviewStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Users" 
        value="2,431" 
        change="+12% from last month" 
        icon={Users} 
      />
      
      <StatCard 
        title="Active Sessions" 
        value="143" 
        change="Current active users" 
        icon={Activity} 
      />
      
      <StatCard 
        title="Content Items" 
        value="872" 
        change="Across all categories" 
        icon={FileText} 
      />
      
      <StatCard 
        title="Issues" 
        value="5" 
        change="Require attention" 
        icon={AlertCircle} 
        iconColor="text-red-500"
      />
    </div>
  );
};

export default OverviewStats;
