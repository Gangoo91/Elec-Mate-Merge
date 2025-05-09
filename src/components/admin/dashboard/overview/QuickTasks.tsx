
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const QuickTasks = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-elec-yellow" />
        Quick Tasks
      </h3>
      <div className="space-y-3">
        <div className="bg-elec-gray-light/20 p-3 rounded-md">
          <h4 className="text-sm font-medium">Pending User Approvals</h4>
          <p className="text-xs text-gray-400 mt-1">3 new users waiting for approval</p>
          <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded mt-2 hover:bg-elec-yellow/90">Review</button>
        </div>
        <div className="bg-elec-gray-light/20 p-3 rounded-md">
          <h4 className="text-sm font-medium">Content Submissions</h4>
          <p className="text-xs text-gray-400 mt-1">2 articles pending review</p>
          <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded mt-2 hover:bg-elec-yellow/90">Review</button>
        </div>
        <div className="bg-elec-gray-light/20 p-3 rounded-md">
          <h4 className="text-sm font-medium">System Updates</h4>
          <p className="text-xs text-gray-400 mt-1">New version available: v2.4.5</p>
          <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded mt-2 hover:bg-elec-yellow/90">Update</button>
        </div>
      </div>
    </Card>
  );
};

export default QuickTasks;
