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
  userLocation: string | null;
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
  userLocation, 
  isLoading 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<CourseMarkerData[]>([]);

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

  // Geocode course locations
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
                locationResolve({ 
                  courseId: course.id.toString(), 
                  position, 
                  course 
                });
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
      setMarkers(allMarkers);
      
      if (allMarkers.length > 0 && googleMapRef.current) {
        const bounds = new window.google.maps.LatLngBounds();
        allMarkers.forEach(marker => {
          bounds.extend(marker.position);
        });
        googleMapRef.current.fitBounds(bounds);
      }
    });
  }, [courses]);

  // Center map on selected course
  useEffect(() => {
    if (!googleMapRef.current || !selectedCourse) return;
    
    const selectedMarker = markers.find(marker => marker.courseId === selectedCourse);
    if (selectedMarker && googleMapRef.current) {
      googleMapRef.current.panTo(selectedMarker.position);
      googleMapRef.current.setZoom(10);
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
      />
    </Card>
  );
};

export default CourseMap;