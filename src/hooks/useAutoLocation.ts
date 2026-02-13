import { useState, useCallback } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface UseAutoLocationReturn {
  location: string | null;
  coordinates: Coordinates | null;
  isLocating: boolean;
  error: string | null;
  requestLocation: () => Promise<string | null>;
}

export function useAutoLocation(): UseAutoLocationReturn {
  const [location, setLocation] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(async (): Promise<string | null> => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return null;
    }

    setIsLocating(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude } = position.coords;
      setCoordinates({ lat: latitude, lng: longitude });

      // Reverse geocode using free Nominatim API
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
        { headers: { 'Accept-Language': 'en-GB' } }
      );

      if (!res.ok) throw new Error('Geocoding failed');

      const data = await res.json();
      const addr = data.address || {};

      // Build a UK-friendly address
      const parts: string[] = [];
      if (addr.house_number && addr.road) {
        parts.push(`${addr.house_number} ${addr.road}`);
      } else if (addr.road) {
        parts.push(addr.road);
      }
      if (addr.suburb || addr.neighbourhood) {
        parts.push(addr.suburb || addr.neighbourhood);
      }
      if (addr.city || addr.town || addr.village) {
        parts.push(addr.city || addr.town || addr.village);
      }
      if (addr.postcode) {
        parts.push(addr.postcode);
      }

      const formatted =
        parts.length > 0
          ? parts.join(', ')
          : data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

      setLocation(formatted);
      setIsLocating(false);
      return formatted;
    } catch (err: unknown) {
      const message =
        err instanceof GeolocationPositionError
          ? err.code === 1
            ? 'Location permission denied'
            : err.code === 2
              ? 'Location unavailable'
              : 'Location request timed out'
          : 'Could not determine location';
      setError(message);
      setIsLocating(false);
      return null;
    }
  }, []);

  return { location, coordinates, isLocating, error, requestLocation };
}
