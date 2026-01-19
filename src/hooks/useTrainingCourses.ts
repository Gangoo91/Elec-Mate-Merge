import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TrainingCourse {
  id: string;
  title: string;
  provider_name: string;
  category: string;
  description: string | null;
  duration: string | null;
  price: string | null;
  price_numeric: number | null;
  level: string | null;
  format: string | null;
  venue_name: string | null;
  venue_city: string | null;
  venue_postcode: string | null;
  venue_region: string | null;
  latitude: number | null;
  longitude: number | null;
  is_online: boolean;
  next_dates: string[] | null;
  external_url: string;
  booking_url: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  accreditation: string[] | null;
  source: string;
  rating: number | null;
  scraped_at: string;
}

export interface TrainingCoursesFilters {
  searchQuery?: string;
  category?: string;
  region?: string;
  postcode?: string;
  radiusMiles?: number;
  format?: string;
  maxPrice?: number;
  level?: string;
  sortBy?: "rating" | "price" | "title" | "distance";
}

export interface TrainingCoursesResult {
  courses: TrainingCourse[];
  totalCount: number;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refetch: () => void;
  forceRefresh: () => Promise<void>;
}

// UK postcode area coordinates for rough distance calculation
const UK_POSTCODE_AREAS: Record<string, { lat: number; lng: number }> = {
  // London
  "E": { lat: 51.5465, lng: 0.0546 },
  "EC": { lat: 51.5155, lng: -0.0922 },
  "N": { lat: 51.5879, lng: -0.1069 },
  "NW": { lat: 51.5549, lng: -0.1879 },
  "SE": { lat: 51.4415, lng: -0.0315 },
  "SW": { lat: 51.4571, lng: -0.1728 },
  "W": { lat: 51.5085, lng: -0.2178 },
  "WC": { lat: 51.5174, lng: -0.1196 },
  // Major cities
  "B": { lat: 52.4862, lng: -1.8904 }, // Birmingham
  "M": { lat: 53.4808, lng: -2.2426 }, // Manchester
  "L": { lat: 53.4084, lng: -2.9916 }, // Liverpool
  "LS": { lat: 53.8008, lng: -1.5491 }, // Leeds
  "S": { lat: 53.3811, lng: -1.4701 }, // Sheffield
  "BS": { lat: 51.4545, lng: -2.5879 }, // Bristol
  "G": { lat: 55.8642, lng: -4.2518 }, // Glasgow
  "EH": { lat: 55.9533, lng: -3.1883 }, // Edinburgh
  "CF": { lat: 51.4816, lng: -3.1791 }, // Cardiff
  "BT": { lat: 54.5973, lng: -5.9301 }, // Belfast
  "NE": { lat: 54.9783, lng: -1.6178 }, // Newcastle
  "NG": { lat: 52.9548, lng: -1.1581 }, // Nottingham
  "LE": { lat: 52.6369, lng: -1.1398 }, // Leicester
  "CB": { lat: 52.2053, lng: 0.1218 }, // Cambridge
  "OX": { lat: 51.7520, lng: -1.2577 }, // Oxford
  "RG": { lat: 51.4543, lng: -0.9781 }, // Reading
  "SO": { lat: 50.9097, lng: -1.4044 }, // Southampton
  "BN": { lat: 50.8225, lng: -0.1372 }, // Brighton
  "PO": { lat: 50.8198, lng: -1.0880 }, // Portsmouth
  "PL": { lat: 50.3755, lng: -4.1427 }, // Plymouth
  "EX": { lat: 50.7184, lng: -3.5339 }, // Exeter
  "BA": { lat: 51.3751, lng: -2.3617 }, // Bath
  "GL": { lat: 51.8642, lng: -2.2382 }, // Gloucester
  "CV": { lat: 52.4068, lng: -1.5197 }, // Coventry
  "WV": { lat: 52.5866, lng: -2.1288 }, // Wolverhampton
  "ST": { lat: 53.0027, lng: -2.1794 }, // Stoke
  "DE": { lat: 52.9225, lng: -1.4746 }, // Derby
  "PR": { lat: 53.7632, lng: -2.7031 }, // Preston
  "BB": { lat: 53.7500, lng: -2.4833 }, // Blackburn
  "BL": { lat: 53.5785, lng: -2.4299 }, // Bolton
  "OL": { lat: 53.5409, lng: -2.1114 }, // Oldham
  "WN": { lat: 53.5461, lng: -2.6306 }, // Wigan
  "HU": { lat: 53.7676, lng: -0.3274 }, // Hull
  "DN": { lat: 53.5228, lng: -1.1286 }, // Doncaster
  "YO": { lat: 53.9591, lng: -1.0815 }, // York
  "HX": { lat: 53.7248, lng: -1.8658 }, // Halifax
  "HD": { lat: 53.6458, lng: -1.7850 }, // Huddersfield
  "BD": { lat: 53.7960, lng: -1.7594 }, // Bradford
  "WF": { lat: 53.6833, lng: -1.5000 }, // Wakefield
  "SR": { lat: 54.9069, lng: -1.3838 }, // Sunderland
  "DH": { lat: 54.7761, lng: -1.5733 }, // Durham
  "TS": { lat: 54.5733, lng: -1.2346 }, // Middlesbrough
  "DL": { lat: 54.5239, lng: -1.5597 }, // Darlington
  "CA": { lat: 54.8951, lng: -2.9382 }, // Carlisle
  "LA": { lat: 54.0466, lng: -2.7996 }, // Lancaster
  "AB": { lat: 57.1497, lng: -2.0943 }, // Aberdeen
  "DD": { lat: 56.4620, lng: -2.9707 }, // Dundee
  "KY": { lat: 56.1132, lng: -3.1653 }, // Fife
  "FK": { lat: 56.0019, lng: -3.7839 }, // Falkirk/Stirling
  "PA": { lat: 55.8456, lng: -4.4239 }, // Paisley
  "KA": { lat: 55.4589, lng: -4.6263 }, // Kilmarnock
  "DG": { lat: 55.0708, lng: -3.6039 }, // Dumfries
  "TD": { lat: 55.6000, lng: -2.7833 }, // Galashiels
  "SA": { lat: 51.6214, lng: -3.9436 }, // Swansea
  "NP": { lat: 51.5842, lng: -2.9977 }, // Newport
  "LL": { lat: 53.2274, lng: -3.8281 }, // North Wales
  "SY": { lat: 52.7079, lng: -2.7540 }, // Shrewsbury
  "HR": { lat: 52.0567, lng: -2.7160 }, // Hereford
  "WR": { lat: 52.1936, lng: -2.2216 }, // Worcester
  "TF": { lat: 52.6779, lng: -2.4497 }, // Telford
  "CT": { lat: 51.2802, lng: 1.0789 }, // Canterbury
  "ME": { lat: 51.3890, lng: 0.5392 }, // Medway
  "DA": { lat: 51.4416, lng: 0.2141 }, // Dartford
  "TN": { lat: 51.1652, lng: 0.2639 }, // Tunbridge Wells
  "RH": { lat: 51.2362, lng: -0.1913 }, // Redhill
  "GU": { lat: 51.2362, lng: -0.7429 }, // Guildford
  "KT": { lat: 51.3782, lng: -0.2912 }, // Kingston
  "SM": { lat: 51.3618, lng: -0.1945 }, // Sutton
  "CR": { lat: 51.3714, lng: -0.0977 }, // Croydon
  "BR": { lat: 51.4029, lng: 0.0135 }, // Bromley
  "RM": { lat: 51.5776, lng: 0.1826 }, // Romford
  "IG": { lat: 51.5588, lng: 0.0754 }, // Ilford
  "EN": { lat: 51.6538, lng: -0.0799 }, // Enfield
  "HA": { lat: 51.5802, lng: -0.3340 }, // Harrow
  "UB": { lat: 51.5349, lng: -0.4756 }, // Uxbridge
  "TW": { lat: 51.4490, lng: -0.3252 }, // Twickenham
  "SL": { lat: 51.5105, lng: -0.5950 }, // Slough
  "HP": { lat: 51.7518, lng: -0.5646 }, // Hemel Hempstead
  "LU": { lat: 51.8787, lng: -0.4200 }, // Luton
  "AL": { lat: 51.7520, lng: -0.3364 }, // St Albans
  "WD": { lat: 51.6565, lng: -0.3903 }, // Watford
  "SG": { lat: 51.9025, lng: -0.2075 }, // Stevenage
  "CM": { lat: 51.7343, lng: 0.4691 }, // Chelmsford
  "SS": { lat: 51.5421, lng: 0.7106 }, // Southend
  "CO": { lat: 51.8891, lng: 0.9037 }, // Colchester
  "IP": { lat: 52.0567, lng: 1.1482 }, // Ipswich
  "NR": { lat: 52.6309, lng: 1.2974 }, // Norwich
  "PE": { lat: 52.5695, lng: -0.2405 }, // Peterborough
  "MK": { lat: 52.0406, lng: -0.7594 }, // Milton Keynes
  "NN": { lat: 52.2405, lng: -0.9027 }, // Northampton
  "LN": { lat: 53.2307, lng: -0.5406 }, // Lincoln
};

// Extract postcode area from full postcode
const getPostcodeArea = (postcode: string): string => {
  const cleaned = postcode.replace(/\s/g, "").toUpperCase();
  // Match 1-2 letters at the start
  const match = cleaned.match(/^([A-Z]{1,2})/);
  return match ? match[1] : "";
};

// Calculate rough distance between two points (Haversine)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get coordinates from postcode
const getPostcodeCoordinates = (postcode: string): { lat: number; lng: number } | null => {
  const area = getPostcodeArea(postcode);
  return UK_POSTCODE_AREAS[area] || null;
};

export const useTrainingCourses = (filters: TrainingCoursesFilters = {}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["training-courses", filters],
    queryFn: async () => {
      let query = supabase
        .from("training_courses")
        .select("*", { count: "exact" });

      // Apply category filter
      if (filters.category) {
        // Map quick category IDs to actual categories
        const categoryMap: Record<string, string[]> = {
          "18th-edition": ["18th Edition", "BS 7671"],
          "inspection-testing": ["Inspection & Testing", "2391", "Testing"],
          "ev-charging": ["EV Charging", "Electric Vehicle", "EV"],
          "fire-alarm": ["Fire Alarm", "Fire Safety", "Fire Detection"],
          "pat-testing": ["PAT Testing", "Portable Appliance"],
          "level-3": ["Level 3", "NVQ Level 3", "Installation"],
        };

        const categoryTerms = categoryMap[filters.category] || [filters.category];
        const categoryFilters = categoryTerms.map(term => `category.ilike.%${term}%`).join(",");
        query = query.or(categoryFilters);
      }

      // Apply region filter
      if (filters.region) {
        query = query.eq("venue_region", filters.region);
      }

      // Apply format filter (Online/Classroom/Blended)
      if (filters.format) {
        if (filters.format.toLowerCase() === "online") {
          query = query.eq("is_online", true);
        } else {
          query = query.ilike("format", `%${filters.format}%`);
        }
      }

      // Apply search query
      if (filters.searchQuery) {
        const searchTerm = filters.searchQuery.toLowerCase();
        query = query.or(
          `title.ilike.%${searchTerm}%,provider_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
        );
      }

      // Apply max price filter
      if (filters.maxPrice) {
        query = query.lte("price_numeric", filters.maxPrice * 100); // Stored in pence
      }

      // Apply level filter
      if (filters.level) {
        query = query.ilike("level", `%${filters.level}%`);
      }

      // Initial sort by rating
      query = query.order("rating", { ascending: false, nullsFirst: false });

      const { data: courses, error, count } = await query;

      if (error) throw error;

      let processedCourses = courses as TrainingCourse[];

      // Calculate distances if postcode provided
      if (filters.postcode && processedCourses.length > 0) {
        const userCoords = getPostcodeCoordinates(filters.postcode);

        if (userCoords) {
          processedCourses = processedCourses.map((course) => {
            let distance: number | null = null;

            // Try to get distance from course coordinates
            if (course.latitude && course.longitude) {
              distance = calculateDistance(
                userCoords.lat,
                userCoords.lng,
                course.latitude,
                course.longitude
              );
            } else if (course.venue_postcode) {
              // Fall back to postcode area estimation
              const courseCoords = getPostcodeCoordinates(course.venue_postcode);
              if (courseCoords) {
                distance = calculateDistance(
                  userCoords.lat,
                  userCoords.lng,
                  courseCoords.lat,
                  courseCoords.lng
                );
              }
            }

            return { ...course, _distance: distance };
          });

          // Filter by radius if specified
          if (filters.radiusMiles) {
            processedCourses = processedCourses.filter(
              (course: any) => course._distance === null || course._distance <= filters.radiusMiles!
            );
          }

          // Sort by distance if requested
          if (filters.sortBy === "distance") {
            processedCourses.sort((a: any, b: any) => {
              if (a._distance === null) return 1;
              if (b._distance === null) return -1;
              return a._distance - b._distance;
            });
          }
        }
      }

      // Apply other sorting
      if (filters.sortBy && filters.sortBy !== "distance") {
        switch (filters.sortBy) {
          case "price":
            processedCourses.sort((a, b) => (a.price_numeric || 999999) - (b.price_numeric || 999999));
            break;
          case "title":
            processedCourses.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "rating":
            processedCourses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        }
      }

      // Update last updated time
      if (processedCourses.length > 0) {
        const latestScraped = processedCourses.reduce((latest, course) => {
          const courseDate = new Date(course.scraped_at);
          return courseDate > latest ? courseDate : latest;
        }, new Date(0));
        setLastUpdated(latestScraped);
      }

      return {
        courses: processedCourses,
        totalCount: count || 0,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Force refresh - triggers the scraper
  const forceRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke("training-courses-refresh", {
        body: { forceRefresh: true },
      });

      if (error) throw error;

      toast.success("Courses refreshed successfully");
      queryClient.invalidateQueries({ queryKey: ["training-courses"] });
      refetch();
    } catch (err) {
      console.error("Failed to refresh courses:", err);
      toast.error("Failed to refresh courses");
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient, refetch]);

  return {
    courses: data?.courses || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    isRefreshing,
    error: error as Error | null,
    lastUpdated,
    refetch,
    forceRefresh,
  };
};

// Analytics calculation helper
export const calculateCoursesAnalytics = (courses: TrainingCourse[]) => {
  if (!courses.length) {
    return {
      totalCourses: 0,
      totalProviders: 0,
      averageRating: 0,
      highDemandCourses: 0,
    };
  }

  const providers = new Set(courses.map((c) => c.provider_name));
  const ratingsSum = courses.reduce((sum, c) => sum + (c.rating || 0), 0);
  const coursesWithRating = courses.filter((c) => c.rating).length;

  // High demand categories
  const highDemandCategories = ["18th Edition", "EV Charging", "Inspection", "Testing", "Fire"];
  const highDemand = courses.filter((c) =>
    highDemandCategories.some((cat) => c.category.toLowerCase().includes(cat.toLowerCase()))
  );

  return {
    totalCourses: courses.length,
    totalProviders: providers.size,
    averageRating: coursesWithRating > 0 ? ratingsSum / coursesWithRating : 0,
    highDemandCourses: highDemand.length,
  };
};

export default useTrainingCourses;
