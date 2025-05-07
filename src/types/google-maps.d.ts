
// Type definitions for Google Maps JavaScript API v3
// This is a simplified version that covers just what we need for our application

declare interface Window {
  google: typeof google;
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, options?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      panTo(latLng: LatLng | LatLngLiteral): void;
      fitBounds(bounds: LatLngBounds, padding?: number | Padding): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      toJSON(): LatLngLiteral;
    }

    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
      extend(point: LatLng | LatLngLiteral): LatLngBounds;
    }

    class Marker {
      constructor(opts: MarkerOptions);
      setMap(map: Map | null): void;
      getPosition(): LatLng;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      addListener(event: string, handler: Function): MapsEventListener;
    }

    class Geocoder {
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    class DistanceMatrixService {
      getDistanceMatrix(request: DistanceMatrixRequest, callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void): void;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      mapTypeControl?: boolean;
      scaleControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string | Icon;
      animation?: Animation;
    }

    interface Icon {
      url: string;
      size?: Size;
      origin?: Point;
      anchor?: Point;
      scaledSize?: Size;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface Point {
      x: number;
      y: number;
    }

    interface Padding {
      top: number;
      right: number;
      bottom: number;
      left: number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapsEventListener {
      remove(): void;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
      bounds?: LatLngBounds;
      componentRestrictions?: GeocoderComponentRestrictions;
      region?: string;
    }

    interface GeocoderComponentRestrictions {
      administrativeArea?: string;
      country?: string | string[];
      locality?: string;
      postalCode?: string;
      route?: string;
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: GeocoderGeometry;
      place_id: string;
      types: string[];
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    interface GeocoderGeometry {
      location: LatLng;
      location_type: GeocoderLocationType;
      viewport: LatLngBounds;
      bounds?: LatLngBounds;
    }

    type GeocoderLocationType = "APPROXIMATE" | "GEOMETRIC_CENTER" | "RANGE_INTERPOLATED" | "ROOFTOP";

    type GeocoderStatus = "OK" | "ZERO_RESULTS" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST" | "UNKNOWN_ERROR";

    interface DistanceMatrixRequest {
      origins: (string | LatLng | LatLngLiteral)[];
      destinations: (string | LatLng | LatLngLiteral)[];
      travelMode: TravelMode;
      unitSystem?: UnitSystem;
      durationInTraffic?: boolean;
      avoidHighways?: boolean;
      avoidTolls?: boolean;
      region?: string;
    }

    interface DistanceMatrixResponse {
      originAddresses: string[];
      destinationAddresses: string[];
      rows: DistanceMatrixResponseRow[];
    }

    interface DistanceMatrixResponseRow {
      elements: DistanceMatrixResponseElement[];
    }

    interface DistanceMatrixResponseElement {
      status: DistanceMatrixStatus;
      duration?: Duration;
      duration_in_traffic?: Duration;
      distance?: Distance;
      fare?: TransitFare;
    }

    interface Duration {
      value: number;
      text: string;
    }

    interface Distance {
      value: number;
      text: string;
    }

    interface TransitFare {
      currency: string;
      value: number;
      text: string;
    }

    enum Animation {
      BOUNCE = 1,
      DROP = 2,
    }

    enum TravelMode {
      DRIVING = "DRIVING",
      WALKING = "WALKING",
      BICYCLING = "BICYCLING",
      TRANSIT = "TRANSIT"
    }

    enum UnitSystem {
      METRIC = 0,
      IMPERIAL = 1
    }

    type DistanceMatrixStatus = "OK" | "INVALID_REQUEST" | "MAX_ELEMENTS_EXCEEDED" | "MAX_DIMENSIONS_EXCEEDED" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "UNKNOWN_ERROR";
  }
}
