
import { Skeleton } from "@/components/ui/skeleton";

interface PlanDisplayProps {
  plan: string;
  isLoading: boolean;
}

const PlanDisplay = ({ plan, isLoading }: PlanDisplayProps) => {
  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-elec-dark rounded-md animate-pulse">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-elec-dark rounded-md">
      <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Your Study Plan:</h3>
      <div className="text-sm whitespace-pre-wrap">
        {plan.split('\n').map((line, index) => (
          <p 
            key={index}
            className={
              line.match(/^(Week \d+:|WEEK \d+:|Goals:|Resources:|Exercises:|Assessments:|Summary:)/) ?
              'text-elec-yellow font-semibold mt-3 mb-1' :
              line.startsWith('- ') ?
              'pl-4 my-1' :
              'my-1'
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PlanDisplay;
