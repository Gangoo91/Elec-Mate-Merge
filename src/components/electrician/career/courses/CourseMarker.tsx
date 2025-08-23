import React, { useEffect, useRef } from "react";
import { EnhancedCareerCourse } from "../../../apprentice/career/courses/enhancedCoursesData";

interface CourseMarkerProps {
  course: EnhancedCareerCourse;
  position: google.maps.LatLngLiteral;
  map: google.maps.Map | null;
  isSelected: boolean;
  onClick: (courseId: string) => void;
}

const CourseMarker: React.FC<CourseMarkerProps> = ({
  course,
  position,
  map,
  isSelected,
  onClick
}) => {
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !window.google?.maps) return;

    const getMarkerIcon = (category: string, isSelected: boolean) => {
      const colors = {
        'Essential Qualifications': '#FFD700',
        'Emerging Technologies': '#00CED1', 
        'Safety & Compliance': '#FF6347',
        'Specialised Skills': '#9370DB',
        'Business & Management': '#32CD32',
        'default': '#4169E1'
      };

      const color = colors[category as keyof typeof colors] || colors.default;
      const scale = isSelected ? 1.2 : 1;

      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.8,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 8 * scale,
      };
    };

    if (!markerRef.current) {
      markerRef.current = new window.google.maps.Marker({
        position,
        map,
        icon: getMarkerIcon(course.category, isSelected),
        title: `${course.title} - ${course.provider}`,
      });

      markerRef.current.addListener('click', () => {
        onClick(course.id.toString());
      });
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [course, position, map, isSelected, onClick]);

  return null;
};

export default CourseMarker;