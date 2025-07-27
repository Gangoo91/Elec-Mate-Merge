
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
      <CardHeader className="pb-3 p-4 md:p-6 text-center">
        <CardTitle className="text-base md:text-lg font-medium flex items-center justify-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 md:p-6 pt-0 text-center">
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Button asChild size="default" className="w-full">
          <Link to={linkTo} className="flex items-center justify-center gap-2 text-sm md:text-base">
            {linkText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
