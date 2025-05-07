
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { StarRating } from "./StarRating";
import { ScrapMerchant } from "@/hooks/useScrapMerchantFinder";

interface MerchantCardProps {
  merchant: ScrapMerchant;
  openDirections: (merchant: ScrapMerchant) => void;
}

export const MerchantCard = ({ merchant, openDirections }: MerchantCardProps) => {
  return (
    <div 
      key={merchant.id} 
      className="border border-elec-yellow/20 rounded-lg p-4 bg-black/10"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{merchant.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {merchant.address} ({merchant.distance})
          </p>
        </div>
        <span className={`px-2 py-0.5 text-xs rounded-full ${
          merchant.openNow ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
        }`}>
          {merchant.openNow ? "Open Now" : "Closed"}
        </span>
      </div>
      
      <div className="mt-2">
        <StarRating rating={merchant.rating} />
      </div>
      
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Accepts</p>
          <p className="text-sm">{merchant.acceptedMaterials.join(", ")}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Payment</p>
          <p className="text-sm">{merchant.paymentMethods.join(", ")}</p>
        </div>
      </div>
      
      <div className="mt-3 flex flex-col gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          disabled={merchant.phone === 'Not available'}
          onClick={() => window.open(`tel:${merchant.phone}`, '_blank')}
        >
          <Phone className="h-3 w-3" />
          <span>{merchant.phone === 'Not available' ? 'No Phone' : merchant.phone}</span>
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={() => openDirections(merchant)}
        >
          <ExternalLink className="h-3 w-3" />
          <span>Directions</span>
        </Button>
      </div>
    </div>
  );
};
