import { openExternalUrl } from '@/utils/open-external-url';
import { Users, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AndysManClub = () => {
  return (
    <Card className="border-white/[0.06] bg-white/[0.02] hover:shadow-md transition-shadow shadow-sm">
      <CardHeader className="pb-3 border-b border-white/[0.06]">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4 text-white/85" />
          Andy's Man Club
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-white/[0.02] p-2 rounded-md">
              <Users className="h-4 w-4 text-white/85" />
            </div>
            <div className="text-sm">
              <p>Free, peer-to-peer support group for men - #ITSOKAYTOTALK</p>
              <p className="text-xs text-white mt-1">
                Groups meet every Monday at 7pm (excluding bank holidays)
              </p>
            </div>
          </div>
          <Button
            className="w-full bg-white/[0.02] hover:bg-white/[0.02] text-white text-sm flex items-center gap-2"
            onClick={() =>
              openExternalUrl('https://andysmanclub.co.uk/find-your-nearest-group/')
            }
          >
            <MapPin className="h-4 w-4" />
            Find Nearest Group
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AndysManClub;
