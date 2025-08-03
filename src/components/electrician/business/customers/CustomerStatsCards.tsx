import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Users, PoundSterling } from "lucide-react";

const CustomerStatsCards = () => {
  const stats = [
    {
      title: "Average Customer Value",
      value: "£2,500",
      description: "Per domestic installation",
      icon: PoundSterling,
      trend: "+12%"
    },
    {
      title: "Lead Conversion Rate",
      value: "25%",
      description: "Industry average",
      icon: Target,
      trend: "+8%"
    },
    {
      title: "Customer Retention",
      value: "78%",
      description: "Annual retention rate",
      icon: Users,
      trend: "+15%"
    },
    {
      title: "Market Growth",
      value: "6.2%",
      description: "UK electrical services",
      icon: TrendingUp,
      trend: "+2.1%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="bg-card/50 border-elec-yellow/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-elec-yellow" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <span className="text-xs text-green-400">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CustomerStatsCards;