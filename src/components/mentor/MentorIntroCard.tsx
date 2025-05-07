
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const MentorIntroCard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Become a Mentor
        </CardTitle>
        <CardDescription>
          Share your expertise and help shape the future of the electrical industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          As an experienced electrical professional, you have valuable knowledge to share. 
          Mentoring apprentices not only helps them develop their skills but also enhances your own leadership abilities and professional development.
        </p>
        <p>
          Our mentoring program connects you with dedicated apprentices who are eager to learn from your real-world experience. 
          You'll receive recognition for your contributions, and the best mentors earn rewards including tool vouchers.
        </p>
      </CardContent>
    </Card>
  );
};

export default MentorIntroCard;
