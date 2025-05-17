
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const SaveToFavouritesButton = () => {
  const saveToFavourites = () => {
    toast({
      title: "Saved to favourites",
      description: "This customer acquisition guide has been saved to your favourites",
      variant: "success",
    });
  };

  return (
    <div className="flex justify-end mt-4">
      <Button 
        variant="study" 
        className="text-elec-yellow border-elec-yellow/50 hover:bg-elec-yellow/10"
        onClick={saveToFavourites}
      >
        Save to Favourites
      </Button>
    </div>
  );
};

export default SaveToFavouritesButton;
