
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MentorCard from "./MentorCard";

interface MentorGridProps {
  mentors: any[];
  isLoading: boolean;
  error: string | null;
  requestingMentor: string | null;
  onConnectMentor: (mentor: any) => void;
}

const MentorGrid = ({ mentors, isLoading, error, requestingMentor, onConnectMentor }: MentorGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-elec-yellow/20 border-t-elec-yellow rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-500/20 bg-red-500/5 text-center p-6">
        <p className="text-lg font-medium">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mentors.map((mentor) => (
        <MentorCard 
          key={mentor.id}
          mentor={mentor}
          onConnect={onConnectMentor}
          isRequesting={requestingMentor === mentor.id}
        />
      ))}
    </div>
  );
};

export default MentorGrid;
