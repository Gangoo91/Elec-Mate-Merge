
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MentorIntroCard from "@/components/mentor/MentorIntroCard";
import MentorGrid from "@/components/mentor/MentorGrid";
import { useMentorConnection } from "@/hooks/mentor/useMentorConnection";

const ApprenticeMentor = () => {
  const { mentors, isLoading, error, requestingMentor, handleConnectMentor } = useMentorConnection();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentor Connect</h1>
          <p className="text-muted-foreground">
            Connect with industry mentors and experienced professionals for guidance
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <MentorIntroCard />

      <MentorGrid 
        mentors={mentors}
        isLoading={isLoading}
        error={error}
        requestingMentor={requestingMentor}
        onConnectMentor={handleConnectMentor}
      />
    </div>
  );
};

export default ApprenticeMentor;
