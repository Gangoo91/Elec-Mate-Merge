
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TrialBanner = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">Free Trial Mode</h3>
            <p className="text-sm text-muted-foreground">
              You're currently accessing ElecMate in trial mode. Upgrade to unlock all features.
            </p>
          </div>
          <Button asChild>
            <Link to="/subscriptions">
              Upgrade Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrialBanner;
