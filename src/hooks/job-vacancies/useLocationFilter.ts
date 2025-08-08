
import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { JobListing } from "@/pages/electrician/JobVacancies";

export const useLocationFilter = (allJobs: JobListing[]) => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(25);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(allJobs);
  const [jobDistances, setJobDistances] = useState<Record<string, number>>({});
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);

  const calculateJobDistances = useCallback(async () => {
    if (!userLocation || !allJobs.length || !window.google?.maps) {
      setFilteredJobs(allJobs);
      return;
    }

    setIsCalculating(true);
    const geocoder = new window.google.maps.Geocoder();
    
    try {
      // First, geocode the user's location
      const userGeocode = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
        geocoder.geocode({ address: userLocation }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            resolve(results[0]);
          } else {
            reject(new Error(`Could not geocode user location: ${status}`));
          }
        });
      });
      
      const userPosition = userGeocode.geometry.location;
      const distances: Record<string, number> = {};
      
      // Process jobs in batches to avoid rate limiting
      const processJobBatch = async (batch: JobListing[]) => {
        const origins = [userPosition];
        const destinations = await Promise.all(batch.map(async (job) => {
          try {
            const result = await new Promise<google.maps.GeocoderResult>((resolve, reject) => {
              geocoder.geocode({ address: `${job.location}, UK` }, (results, status) => {
                if (status === "OK" && results && results[0]) {
                  resolve(results[0]);
                } else {
                  reject(new Error(`Could not geocode job location: ${status}`));
                }
              });
            });
            return result.geometry.location;
          } catch (error) {
            console.error(`Error geocoding job location ${job.location}:`, error);
            // Return null for failed geocoding
            return null;
          }
        }));

        const validJobs = batch.filter((_, index) => destinations[index] !== null);
        const validDestinations = destinations.filter(d => d !== null) as google.maps.LatLng[];
        
        if (validDestinations.length === 0) return;
        
        const service = new window.google.maps.DistanceMatrixService();
        const result = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
          service.getDistanceMatrix({
            origins,
            destinations: validDestinations,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          }, (response, status) => {
            if (status === "OK" && response) {
              resolve(response);
            } else {
              reject(new Error(`Distance Matrix API Error: ${status}`));
            }
          });
        });
        
        // Process distance results
        result.rows[0].elements.forEach((element, index) => {
          if (element.status === "OK") {
            const job = validJobs[index];
            // Convert meters to miles (1 meter = 0.000621371 miles)
            const distanceInMiles = element.distance.value * 0.000621371;
            distances[job.id] = distanceInMiles;
          }
        });
      };
      
      // Process jobs in batches of 10
      const batchSize = 10;
      for (let i = 0; i < allJobs.length; i += batchSize) {
        const batch = allJobs.slice(i, i + batchSize);
        await processJobBatch(batch);
        // Small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setJobDistances(distances);
      
      // Filter jobs by distance
      const jobsWithDistance = allJobs.filter(job => {
        const distance = distances[job.id];
        return distance !== undefined && distance <= searchRadius;
      });
      
      // Sort jobs by distance
      const sortedJobs = [...jobsWithDistance].sort((a, b) => {
        return (distances[a.id] || Infinity) - (distances[b.id] || Infinity);
      });
      
      setFilteredJobs(sortedJobs);
      setShowMap(true);
      
    } catch (error) {
      console.error("Error calculating job distances:", error);
      toast({
        title: "Location Error",
        description: "Could not calculate distances to jobs. Using all jobs instead.",
        variant: "destructive",
      });
      setFilteredJobs(allJobs);
    } finally {
      setIsCalculating(false);
    }
  }, [userLocation, allJobs, searchRadius]);
  
  // Apply location filter when user location or radius changes
  useEffect(() => {
    if (userLocation) {
      calculateJobDistances();
    } else {
      setFilteredJobs(allJobs);
      setShowMap(false);
    }
  }, [userLocation, searchRadius, allJobs, calculateJobDistances]);

  return {
    userLocation,
    setUserLocation,
    searchRadius,
    setSearchRadius,
    filteredJobs,
    jobDistances,
    isCalculating,
    showMap,
    setShowMap,
    calculateJobDistances
  };
};
