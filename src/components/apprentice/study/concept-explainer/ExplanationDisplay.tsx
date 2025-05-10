
import { Skeleton } from "@/components/ui/skeleton";

interface ExplanationDisplayProps {
  explanation: string;
  isLoading: boolean;
}

const ExplanationDisplay = ({ explanation, isLoading }: ExplanationDisplayProps) => {
  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-elec-dark rounded-md animate-pulse">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (!explanation) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-elec-dark rounded-md">
      <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Concept Explanation:</h3>
      <div className="text-sm whitespace-pre-wrap">
        {explanation.split('\n').map((line, index) => (
          <p 
            key={index} 
            className={
              line.match(/^(Definition|Key Points|Applications|Example|Summary):/) ?
              'text-elec-yellow font-semibold mt-3 mb-1' :
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

export default ExplanationDisplay;
