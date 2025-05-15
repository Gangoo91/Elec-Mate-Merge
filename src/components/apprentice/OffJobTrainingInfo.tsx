
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

const OffJobTrainingInfo = () => {
  return (
    <div className="bg-elec-gray border border-elec-yellow/20 rounded-md p-4">
      <div className="flex items-center gap-2 mb-2">
        <Book className="h-5 w-5 text-elec-yellow" />
        <h3 className="font-semibold">Off-the-Job Training</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Electrical apprenticeships require a minimum of 20% off-the-job training, equating to at least 278 hours 
        over a 12-month period. All courses in the Study Centre count toward this requirement. Your time spent learning 
        on this app is automatically tracked in the <Link to="/apprentice/ojt" className="text-elec-yellow hover:underline">
        Off-the-Job Time Keeping</Link> section.
      </p>
    </div>
  );
};

export default OffJobTrainingInfo;
