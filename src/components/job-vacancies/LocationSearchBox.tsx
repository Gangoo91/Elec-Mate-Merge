
import React from "react";
import UserLocationInput from "./UserLocationInput";
import ViewModeSwitcher from "./ViewModeSwitcher";

interface LocationSearchBoxProps {
  userLocation: string | null;
  setUserLocation: (location: string | null) => void;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  calculateJobDistances: () => void;
  showMap: boolean;
  viewMode: "list" | "map";
  setViewMode: (mode: "list" | "map") => void;
}

const LocationSearchBox: React.FC<LocationSearchBoxProps> = ({
  userLocation,
  setUserLocation,
  searchRadius,
  setSearchRadius,
  calculateJobDistances,
  showMap,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20">
      <h2 className="text-xl font-medium mb-3">Find Jobs Near You</h2>
      <UserLocationInput 
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        searchRadius={searchRadius}
        setSearchRadius={setSearchRadius}
        onLocationConfirmed={calculateJobDistances}
      />
      {userLocation && showMap && (
        <ViewModeSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      )}
    </div>
  );
};

export default LocationSearchBox;
