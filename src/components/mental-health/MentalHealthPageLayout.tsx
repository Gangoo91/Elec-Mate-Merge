
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { ReactNode } from "react";

interface MentalHealthPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  icon: ReactNode;
  color?: string;
}

const MentalHealthPageLayout = ({
  title,
  description,
  children,
  icon,
  color = "purple"
}: MentalHealthPageLayoutProps) => {
  const colorClasses = {
    purple: "border-purple-500/20 from-purple-500/10 to-purple-500/5",
    yellow: "border-elec-yellow/20 from-elec-yellow/10 to-elec-yellow/5",
    green: "border-green-500/20 from-green-500/10 to-green-500/5",
    red: "border-red-500/20 from-red-500/10 to-red-500/5",
    blue: "border-blue-500/20 from-blue-500/10 to-blue-500/5",
    orange: "border-orange-500/20 from-orange-500/10 to-orange-500/5"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className={`p-3 rounded-2xl mb-4 ${color === 'red' ? 'bg-red-500/20' : color === 'orange' ? 'bg-orange-500/20' : color === 'blue' ? 'bg-blue-500/20' : color === 'green' ? 'bg-green-500/20' : 'bg-purple-500/20'}`}>
          {icon}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          {title}
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          {description}
        </p>
        <SmartBackButton />
      </div>

      {/* Main Content Card */}
      <Card className={`${colorClasses[color as keyof typeof colorClasses]} bg-gradient-to-br border`}>
        <CardHeader className="pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <CardTitle className="text-lg sm:text-xl text-white">{title}</CardTitle>
              <CardDescription className="text-sm text-white">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthPageLayout;
