
import { MerchantCard } from "./MerchantCard";

interface ScrapMerchant {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
  openNow: boolean;
  paymentMethods: string[];
  acceptedMaterials: string[];
  placeId?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

interface MerchantListProps {
  merchants: ScrapMerchant[];
  searchPerformed: boolean;
  isLoading: boolean;
  error: string | null;
  openDirections: (merchant: ScrapMerchant) => void;
}

export const MerchantList = ({ 
  merchants, 
  searchPerformed, 
  isLoading, 
  error, 
  openDirections 
}: MerchantListProps) => {
  if (isLoading) return null;
  
  if (searchPerformed && merchants.length === 0 && !error) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No merchants found near this location.</p>
      </div>
    );
  }
  
  if (merchants.length === 0) return null;
  
  return (
    <div className="space-y-4">
      {merchants.map((merchant) => (
        <MerchantCard 
          key={merchant.id} 
          merchant={merchant} 
          openDirections={openDirections} 
        />
      ))}
    </div>
  );
};
