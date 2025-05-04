
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Leaderboards = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
        <p className="text-muted-foreground">
          Leaderboard functionality coming soon. Check back later!
        </p>
      </div>
      
      <Alert>
        <AlertTitle>In Development</AlertTitle>
        <AlertDescription>
          Leaderboards are currently under development. This feature will be available soon.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Leaderboards;
