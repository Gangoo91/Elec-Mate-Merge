
import { useState, useCallback, useMemo } from "react";
import { CareerCourse, TrainingCenter } from "./coursesData";

interface LocationState {
  location: string | null;
  coordinates: google.maps.LatLngLiteral | null;
  searchRadius: number;
}

export const useLocationBasedCourses = (
  allCourses: CareerCourse[],
  allCenters: TrainingCenter[]
) => {
  const [locationState, setLocationState] = useState<LocationState>({
    location: null,
    coordinates: null,
    searchRadius: 25
  });

  const handleLocationSelect = useCallback((location: string, coordinates?: google.maps.LatLngLiteral) => {
    setLocationState(prev => ({
      ...prev,
      location,
      coordinates: coordinates || null
    }));
  }, []);

  const handleRadiusChange = useCallback((radius: number) => {
    setLocationState(prev => ({
      ...prev,
      searchRadius: radius
    }));
  }, []);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = useCallback((
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Mock coordinates for demonstration purposes
  const getMockCoordinates = useCallback((location: string): google.maps.LatLngLiteral | null => {
    const locationMap: Record<string, google.maps.LatLngLiteral> = {
      "London": { lat: 51.5074, lng: -0.1278 },
      "Manchester": { lat: 53.4808, lng: -2.2426 },
      "Birmingham": { lat: 52.4862, lng: -1.8904 },
      "Leeds": { lat: 53.8008, lng: -1.5491 },
      "Glasgow": { lat: 55.8642, lng: -4.2518 },
      "Liverpool": { lat: 53.4084, lng: -2.9916 },
      "Sheffield": { lat: 53.3811, lng: -1.4701 },
      "Bristol": { lat: 51.4545, lng: -2.5879 },
      "Newcastle": { lat: 54.9783, lng: -1.6178 },
      "Cardiff": { lat: 51.4816, lng: -3.1791 }
    };

    // Try exact match first
    if (locationMap[location]) {
      return locationMap[location];
    }

    // Try partial match
    for (const [key, coords] of Object.entries(locationMap)) {
      if (location.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(location.toLowerCase())) {
        return coords;
      }
    }

    return null;
  }, []);

  // Filter courses based on location and radius
  const filteredCourses = useMemo(() => {
    if (!locationState.coordinates) {
      return allCourses;
    }

    return allCourses.filter(course => {
      // Check if course has locations within the radius
      return (course.locations || [course.location]).some(courseLocation => {
        const courseCoords = getMockCoordinates(courseLocation);
        if (!courseCoords) return false;

        const distance = calculateDistance(
          locationState.coordinates!.lat,
          locationState.coordinates!.lng,
          courseCoords.lat,
          courseCoords.lng
        );

        return distance <= locationState.searchRadius;
      });
    });
  }, [allCourses, locationState.coordinates, locationState.searchRadius, getMockCoordinates, calculateDistance]);

  // Filter training centres based on location and radius
  const filteredCentres = useMemo(() => {
    if (!locationState.coordinates) {
      return allCenters;
    }

    return allCenters.filter(center => {
      const centerCoords = getMockCoordinates(center.location);
      if (!centerCoords) return false;

      const distance = calculateDistance(
        locationState.coordinates!.lat,
        locationState.coordinates!.lng,
        centerCoords.lat,
        centerCoords.lng
      );

      return distance <= locationState.searchRadius;
    });
  }, [allCenters, locationState.coordinates, locationState.searchRadius, getMockCoordinates, calculateDistance]);

  const clearLocation = useCallback(() => {
    setLocationState({
      location: null,
      coordinates: null,
      searchRadius: 25
    });
  }, []);

  return {
    locationState,
    handleLocationSelect,
    handleRadiusChange,
    filteredCourses,
    filteredCentres,
    clearLocation,
    isLocationFiltered: !!locationState.coordinates
  };
};
