
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
    <Card className="border-elec-yellow/10 md:border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors min-h-[80px] sm:min-h-[90px]">
      <CardHeader className="pb-1.5 p-2.5 sm:p-3 md:p-4 text-center">
        <CardTitle className="text-sm sm:text-base font-medium flex items-center justify-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-2.5 sm:p-3 md:p-4 pt-0 text-center">
        {description && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        <Button asChild size="sm" className="w-full text-sm">
          <Link to={linkTo} className="flex items-center justify-center gap-2">
            {linkText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
