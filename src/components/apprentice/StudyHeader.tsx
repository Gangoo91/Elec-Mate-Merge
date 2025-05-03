
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudyHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Study Centre</h1>
        <p className="text-muted-foreground">
          Access structured learning paths and study materials for electrical apprentices
        </p>
      </div>
      <Link to="/apprentice">
        <Button variant="outline">Back to Apprentice Hub</Button>
      </Link>
    </div>
  );
};

export default StudyHeader;
