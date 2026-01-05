import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Unlock, Lock, TrendingUp, DollarSign, Shield, Users } from 'lucide-react';

export const BMSModule5Section1ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Unlock className="h-5 w-5 text-elec-yellow" />
          Open vs Proprietary Protocols
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
              <Unlock className="h-4 w-4 text-green-400" />
              Open Protocols
            </h4>
            <ul className="text-foreground text-sm space-y-1">
              <li>• Published international standards</li>
              <li>• Multiple vendor support</li>
              <li>• Public documentation</li>
              <li>• Competitive procurement</li>
              <li>• Lower total cost of ownership</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-orange-400" />
              Proprietary Protocols
            </h4>
            <ul className="text-foreground text-sm space-y-1">
              <li>• Owned by single manufacturer</li>
              <li>• Limited documentation</li>
              <li>• Vendor lock-in risk</li>
              <li>• Tighter integration within ecosystem</li>
              <li>• Single point of support</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-yellow-400" />
            Cost Comparison Example
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <h5 className="text-green-400 font-medium mb-1">Open Protocol (10 years):</h5>
              <p className="text-foreground">Total: £4.2M - Multiple suppliers, competitive pricing</p>
            </div>
            <div>
              <h5 className="text-orange-400 font-medium mb-1">Proprietary (10 years):</h5>
              <p className="text-foreground">Total: £5.43M - Vendor lock-in premium</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};