import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AgriculturalEarthing = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground">Agricultural Earthing & Bonding</CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">Livestock Safety</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Critical Requirements:</h5>
          <ul className="text-sm space-y-1">
            <li>• Metal structures must be bonded together</li>
            <li>• Supplementary equipotential bonding in animal areas</li>
            <li>• Lower voltage thresholds due to animal sensitivity</li>
            <li>• Dedicated earth electrodes for agricultural buildings</li>
          </ul>
        </div>
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Protective Devices:</h5>
          <ul className="text-sm space-y-1">
            <li>• RCD protection essential (30mA maximum)</li>
            <li>• Time discrimination to prevent nuisance tripping</li>
            <li>• SPDs for overhead line protection</li>
            <li>• Appropriate fault current ratings</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgriculturalEarthing;