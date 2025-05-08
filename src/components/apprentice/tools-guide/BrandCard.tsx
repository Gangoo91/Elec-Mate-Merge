
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BrandCardProps {
  category: string;
  brands: string[];
}

const BrandCard = ({ category, brands }: BrandCardProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-6 space-y-1">
          {brands.map((brand, i) => (
            <li key={i} className="text-sm">{brand}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
