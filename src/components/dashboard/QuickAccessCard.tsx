
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  icon?: ReactNode;
}

const QuickAccessCard = ({ title, description, linkText, linkTo, icon }: QuickAccessCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors h-full">
      <CardHeader className="pb-2 p-3 md:p-6">
        <CardTitle className="text-sm md:text-lg font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3 md:p-6 pt-0">
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <Button asChild size="sm" className="w-full">
          <Link to={linkTo} className="flex items-center justify-center gap-1 text-xs md:text-sm">
            {linkText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
