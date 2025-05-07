
import { ChevronRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalResource } from "../models/resource-types";
import { toast } from "sonner";

interface ResourceDetailsProps {
  resource: LocalResource;
  onBack: () => void;
}

const ResourceDetails = ({ resource, onBack }: ResourceDetailsProps) => {
  const handleCopyContact = (contact: string) => {
    navigator.clipboard.writeText(contact);
    toast.success("Contact information copied to clipboard");
  };

  const handleGetDirections = (address: string) => {
    // Open in Google Maps
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank");
    toast.success("Directions opened in Google Maps");
  };
  
  return (
    <div className="mt-4 space-y-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onBack}
        className="flex items-center gap-1"
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to results
      </Button>
      
      <div className="p-4 bg-background rounded-md border border-red-500/30">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <h3 className="font-medium flex items-center gap-2 flex-wrap">
            {resource.name}
            <span className="text-xs px-2 py-1 bg-red-500/10 text-red-500 rounded">
              {resource.type}
            </span>
          </h3>
          
          {resource.open_now !== undefined && (
            <span className={`text-xs px-2 py-1 rounded ${
              resource.open_now ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
            }`}>
              {resource.open_now ? "Open Now" : "Currently Closed"}
            </span>
          )}
        </div>
        
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">Distance:</p>
              <p>{resource.distance}</p>
            </div>
          </div>
          
          {resource.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Address:</p>
                <p>{resource.address}</p>
              </div>
            </div>
          )}
          
          {resource.contact && (
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Contact:</p>
                <p className="break-words">{resource.contact}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {resource.contact && (
            <Button 
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 w-full"
              onClick={() => handleCopyContact(resource.contact || '')}
            >
              <Phone className="h-4 w-4" /> Copy Contact
            </Button>
          )}
          
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleGetDirections(resource.address || resource.name)}
          >
            <MapPin className="h-4 w-4" /> Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
