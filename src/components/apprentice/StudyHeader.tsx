
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

const StudyHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Study Centre</h1>
      <Link to="/apprentice" className="flex-shrink-0">
        <Button variant="outline" size="icon" title="Back to Apprentice Hub">
          <Book className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default StudyHeader;
