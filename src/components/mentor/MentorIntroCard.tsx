
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const MentorIntroCard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Find Your Mentor
        </CardTitle>
        <CardDescription>
          A good mentor can make all the difference in your apprenticeship journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Browse our network of experienced electricians who volunteer their time to support apprentices. 
          You can schedule one-to-one sessions, ask questions, or join group mentoring.
        </p>
      </CardContent>
    </Card>
  );
};

export default MentorIntroCard;
