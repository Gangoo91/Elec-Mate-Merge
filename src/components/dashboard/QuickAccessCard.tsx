
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface QuickAccessCardProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
}

const QuickAccessCard = ({ title, description, linkText, linkTo }: QuickAccessCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        <Button asChild>
          <Link to={linkTo}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
