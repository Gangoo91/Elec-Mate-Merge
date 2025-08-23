import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CourseMarker from "./CourseMarker";
import CourseInfoOverlay from "./CourseInfoOverlay";
import { EnhancedCareerCourse } from "../../../apprentice/career/courses/enhancedCoursesData";

interface CourseMapProps {
  courses: EnhancedCareerCourse[];
  selectedCourse: string | null;
  onCourseSelect: (courseId: string) => void;
  onCourseDeselect?: () => void;
  userLocation: string | null;
  userCoordinates: google.maps.LatLngLiteral | null;
  searchRadius: number;
  isLoading: boolean;
}

interface CourseMarkerData {
  courseId: string;
  position: google.maps.LatLngLiteral;
  course: EnhancedCareerCourse;
}

const CourseMap: React.FC<CourseMapProps> = ({ 
  courses, 
  selectedCourse, 
  onCourseSelect, 
  onCourseDeselect,
  userLocation,
  userCoordinates, 
  searchRadius,
  isLoading 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<CourseMarkerData[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const radiusCircleRef = useRef<any>(null);

  // Distance calculation helper (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Debug logging
  console.log('CourseMap received courses:', courses.length);
  console.log('User coordinates:', userCoordinates);
  console.log('Search radius:', searchRadius);

  // Initialize Google Maps
  useEffect(() => {
    if (!window.google?.maps || !mapRef.current) return;
    
    try {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 54.7023545, lng: -3.2765753 },
        zoom: 6,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });
    } catch (error) {
      console.error("Error initializing Google Maps:", error);
    }
  }, []);

  // Geocode course locations and filter by distance
  useEffect(() => {
    if (!googleMapRef.current || !courses.length || !window.google?.maps) return;
    
    const geocoder = new window.google.maps.Geocoder();
    const geocodePromises: Promise<CourseMarkerData[]>[] = courses.map(course => 
      new Promise(resolve => {
        const locations = course.locations || [];
        
        if (locations.length === 0) {
          resolve([]);
          return;
        }

        const locationPromises = locations.map(location => 
          new Promise<CourseMarkerData | null>(locationResolve => {
            const cleanLocation = location.includes(',') ? location : `${location}, UK`;
            
            geocoder.geocode({ address: cleanLocation }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const position = results[0].geometry.location.toJSON();
                
                // Filter by distance if user coordinates are available
                if (userCoordinates) {
                  const distance = calculateDistance(
                    userCoordinates.lat,
                    userCoordinates.lng,
                    position.lat,
                    position.lng
                  );
                  
                  if (distance <= searchRadius) {
                    locationResolve({ 
                      courseId: course.id.toString(), 
                      position, 
                      course 
                    });
                  } else {
                    locationResolve(null);
                  }
                } else {
                  locationResolve({ 
                    courseId: course.id.toString(), 
                    position, 
                    course 
                  });
                }
              } else {
                locationResolve(null);
              }
            });
          })
        );

        Promise.all(locationPromises).then(results => {
          const validMarkers = results.filter(result => result !== null) as CourseMarkerData[];
          resolve(validMarkers);
        });
      })
    );
    
    Promise.all(geocodePromises).then(results => {
      const allMarkers = results.flat();
      console.log('Successfully geocoded markers:', allMarkers.length);
      console.log('Filtered by distance:', userCoordinates ? `within ${searchRadius} miles` : 'no distance filter');
      setMarkers(allMarkers);
      
      // Handle map centering and bounds
      if (userCoordinates && googleMapRef.current) {
        // Center on user location if available
        googleMapRef.current.setCenter(userCoordinates);
        googleMapRef.current.setZoom(10);
      } else if (allMarkers.length > 0 && googleMapRef.current) {
        // Otherwise fit all markers
        const bounds = new window.google.maps.LatLngBounds();
        allMarkers.forEach(marker => {
          bounds.extend(marker.position);
        });
        googleMapRef.current.fitBounds(bounds);
      }
    }).catch(error => {
      console.error('Geocoding error:', error);
    });
  }, [courses, userCoordinates, searchRadius, calculateDistance]);

  // Handle user location marker and radius circle
  useEffect(() => {
    if (!googleMapRef.current || !window.google?.maps) return;

    // Clean up existing user marker and radius circle
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
    if (radiusCircleRef.current) {
      radiusCircleRef.current.setMap(null);
      radiusCircleRef.current = null;
    }

    // Add user location marker and radius circle if coordinates available
    if (userCoordinates) {
      // User location marker
      userMarkerRef.current = new window.google.maps.Marker({
        position: userCoordinates,
        map: googleMapRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
          scale: 10,
        } as any,
        title: 'Your Location',
      } as any);

      // Search radius circle
      radiusCircleRef.current = new (window.google.maps as any).Circle({
        strokeColor: '#3B82F6',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#3B82F6',
        fillOpacity: 0.1,
        map: googleMapRef.current,
        center: userCoordinates,
        radius: searchRadius * 1609.34, // Convert miles to meters
      });
    }

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }
      if (radiusCircleRef.current) {
        radiusCircleRef.current.setMap(null);
      }
    };
  }, [userCoordinates, searchRadius]);

  // Center map on selected course
  useEffect(() => {
    if (!googleMapRef.current || !selectedCourse) return;
    
    const selectedMarker = markers.find(marker => marker.courseId === selectedCourse);
    if (selectedMarker && googleMapRef.current) {
      googleMapRef.current.panTo(selectedMarker.position);
      googleMapRef.current.setZoom(12);
    }
  }, [selectedCourse, markers]);

  const getSelectedCourse = () => {
    return markers.find(marker => marker.courseId === selectedCourse)?.course;
  };

  if (isLoading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray p-4 relative h-[500px]">
        <Skeleton className="h-full w-full" />
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray p-0 relative h-[500px]">
      <div ref={mapRef} className="h-full w-full rounded-md overflow-hidden" />
      
      {/* Results info overlay */}
      {userCoordinates && (
        <div className="absolute top-2 left-2 bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg p-3 rounded-md text-xs z-[1000]">
          <div className="text-sm font-medium text-foreground">
            {markers.length} course{markers.length !== 1 ? 's' : ''} found
          </div>
          <div className="text-xs text-muted-foreground">
            Within {searchRadius} miles of your location
          </div>
        </div>
      )}
      
      {/* Debug info overlay */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded text-xs z-[1000]">
          Courses: {courses.length} | Markers: {markers.length}
          {userCoordinates && <div>User: {userCoordinates.lat.toFixed(4)}, {userCoordinates.lng.toFixed(4)}</div>}
        </div>
      )}
      
      {markers.map((markerData, index) => (
        <CourseMarker 
          key={`${markerData.courseId}-${index}`}
          course={markerData.course}
          position={markerData.position}
          map={googleMapRef.current}
          isSelected={markerData.courseId === selectedCourse}
          onClick={onCourseSelect}
        />
      ))}
      
      <CourseInfoOverlay 
        userLocation={userLocation}
        selectedCourse={getSelectedCourse()}
        selectedMarkerPosition={undefined}
        onClose={onCourseDeselect}
      />
    </Card>
  );
};

export default CourseMap;