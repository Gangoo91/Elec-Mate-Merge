/**
 * Google API tools — Solar, Geocoding, Address Validation, Static Maps, YouTube + Weather
 * All use GOOGLE_MAPS_API_KEY from env (already in Docker container).
 * Weather uses Open-Meteo (free, no key needed).
 */

import type { UserContext } from '../auth.js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

// ─── Shared: geocode an address to lat/lng ─────────────────────────────

interface GeocodedLocation {
  formatted_address: string;
  lat: number;
  lng: number;
  postcode: string | null;
  locality: string | null;
  country: string | null;
  place_id: string;
}

async function geocodeToLatLng(address: string): Promise<GeocodedLocation> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  const params = new URLSearchParams({
    address,
    region: 'gb',
    key: GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as {
    status: string;
    error_message?: string;
    results: Array<{
      formatted_address: string;
      geometry: { location: { lat: number; lng: number } };
      address_components: Array<{
        long_name: string;
        short_name: string;
        types: string[];
      }>;
      place_id: string;
    }>;
  };

  if (data.status !== 'OK' || data.results.length === 0) {
    throw new Error(
      `Geocoding failed: ${data.status}. ${data.error_message || 'No results found.'}`
    );
  }

  const result = data.results[0];
  const components = result.address_components;

  const postcode = components.find((c) => c.types.includes('postal_code'))?.long_name || null;
  const locality =
    components.find((c) => c.types.includes('postal_town'))?.long_name ||
    components.find((c) => c.types.includes('locality'))?.long_name ||
    null;
  const country = components.find((c) => c.types.includes('country'))?.long_name || null;

  return {
    formatted_address: result.formatted_address,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    postcode,
    locality,
    country,
    place_id: result.place_id,
  };
}

async function reverseGeocode(lat: number, lng: number): Promise<GeocodedLocation> {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  const params = new URLSearchParams({
    latlng: `${lat},${lng}`,
    region: 'gb',
    key: GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Reverse geocoding API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as {
    status: string;
    error_message?: string;
    results: Array<{
      formatted_address: string;
      geometry: { location: { lat: number; lng: number } };
      address_components: Array<{
        long_name: string;
        short_name: string;
        types: string[];
      }>;
      place_id: string;
    }>;
  };

  if (data.status !== 'OK' || data.results.length === 0) {
    throw new Error(
      `Reverse geocoding failed: ${data.status}. ${data.error_message || 'No results found.'}`
    );
  }

  const result = data.results[0];
  const components = result.address_components;

  return {
    formatted_address: result.formatted_address,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    postcode: components.find((c) => c.types.includes('postal_code'))?.long_name || null,
    locality:
      components.find((c) => c.types.includes('postal_town'))?.long_name ||
      components.find((c) => c.types.includes('locality'))?.long_name ||
      null,
    country: components.find((c) => c.types.includes('country'))?.long_name || null,
    place_id: result.place_id,
  };
}

// ─── 1. analyseSolarRoof ───────────────────────────────────────────────

export async function analyseSolarRoof(args: Record<string, unknown>, _user: UserContext) {
  if (typeof args.address !== 'string' || args.address.trim().length === 0) {
    throw new Error('address is required');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  const panelCapacity =
    typeof args.panel_capacity_watts === 'number' ? args.panel_capacity_watts : 400;

  // Geocode the address first
  const geo = await geocodeToLatLng(args.address.trim());

  // Call Solar API
  const params = new URLSearchParams({
    'location.latitude': String(geo.lat),
    'location.longitude': String(geo.lng),
    requiredQuality: 'HIGH',
    key: GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://solar.googleapis.com/v1/buildingInsights:findClosest?${params.toString()}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Solar API error: ${response.status} — ${errorText}`);
  }

  const data = (await response.json()) as {
    solarPotential?: {
      maxArrayPanelsCount?: number;
      maxArrayAreaMeters2?: number;
      maxSunshineHoursPerYear?: number;
      carbonOffsetFactorKgPerMwh?: number;
      roofSegmentStats?: Array<{
        pitchDegrees?: number;
        azimuthDegrees?: number;
        stats?: {
          areaMeters2?: number;
          sunshineQuantiles?: number[];
        };
      }>;
      solarPanelConfigs?: Array<{
        panelsCount?: number;
        yearlyEnergyDcKwh?: number;
      }>;
    };
  };

  const solar = data.solarPotential;
  if (!solar) {
    throw new Error(
      'Solar data not available for this location. The building may not be in the Solar API coverage area.'
    );
  }

  // Find the best config matching default panel capacity
  const maxPanels = solar.maxArrayPanelsCount || 0;
  const maxArea = solar.maxArrayAreaMeters2 || 0;

  // Get yearly energy from the largest config
  const configs = solar.solarPanelConfigs || [];
  const bestConfig = configs.length > 0 ? configs[configs.length - 1] : null;
  const yearlyEnergyKwh = bestConfig?.yearlyEnergyDcKwh || 0;

  // Carbon offset estimate (UK grid average ~233g CO2/kWh)
  const carbonOffsetKg = Math.round(yearlyEnergyKwh * 0.233);

  // Build roof segments
  const roofSegments = (solar.roofSegmentStats || []).map((seg) => ({
    pitch_degrees: seg.pitchDegrees || 0,
    azimuth_degrees: seg.azimuthDegrees || 0,
    area_m2: seg.stats?.areaMeters2 || 0,
  }));

  return {
    address: geo.formatted_address,
    lat: geo.lat,
    lng: geo.lng,
    max_panel_count: maxPanels,
    max_array_area_m2: Math.round(maxArea * 10) / 10,
    yearly_energy_kwh: Math.round(yearlyEnergyKwh),
    roof_segments: roofSegments,
    carbon_offset_kg: carbonOffsetKg,
    panel_capacity_watts: panelCapacity,
    note: 'Estimates based on Google Solar API building insights. Actual output depends on panel spec, shading, and installation angle.',
  };
}

// ─── 2. geocodeAddress ─────────────────────────────────────────────────

export async function geocodeAddress(args: Record<string, unknown>, _user: UserContext) {
  const hasAddress = typeof args.address === 'string' && args.address.trim().length > 0;
  const hasLatLng = typeof args.lat === 'number' && typeof args.lng === 'number';

  if (!hasAddress && !hasLatLng) {
    throw new Error('Either address or lat+lng is required');
  }

  if (hasAddress) {
    return geocodeToLatLng((args.address as string).trim());
  }

  return reverseGeocode(args.lat as number, args.lng as number);
}

// ─── 3. validateAddress ────────────────────────────────────────────────

export async function validateAddress(args: Record<string, unknown>, _user: UserContext) {
  if (typeof args.address !== 'string' || args.address.trim().length === 0) {
    throw new Error('address is required');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  const response = await fetch(
    `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_MAPS_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: {
          regionCode: 'GB',
          addressLines: [args.address.trim()],
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Address Validation API error: ${response.status} — ${errorText}`);
  }

  const data = (await response.json()) as {
    result?: {
      verdict?: {
        addressComplete?: boolean;
        hasUnconfirmedComponents?: boolean;
        hasInferredComponents?: boolean;
        validationGranularity?: string;
      };
      address?: {
        formattedAddress?: string;
        postalAddress?: {
          postalCode?: string;
          locality?: string;
          administrativeArea?: string;
          addressLines?: string[];
        };
      };
      geocode?: {
        location?: { latitude: number; longitude: number };
      };
    };
  };

  const result = data.result;
  if (!result) {
    throw new Error('Address validation returned no result');
  }

  const verdict = result.verdict || {};
  const postalAddress = result.address?.postalAddress;

  const validationNotes: string[] = [];
  if (verdict.hasUnconfirmedComponents)
    validationNotes.push('Some address components could not be confirmed');
  if (verdict.hasInferredComponents)
    validationNotes.push('Some components were inferred/corrected');
  if (verdict.validationGranularity)
    validationNotes.push(`Validation granularity: ${verdict.validationGranularity}`);

  return {
    validated_address: result.address?.formattedAddress || args.address,
    postcode: postalAddress?.postalCode || null,
    locality: postalAddress?.locality || null,
    administrative_area: postalAddress?.administrativeArea || null,
    lat: result.geocode?.location?.latitude || null,
    lng: result.geocode?.location?.longitude || null,
    is_valid: verdict.addressComplete === true,
    validation_notes: validationNotes,
    formatted_address: result.address?.formattedAddress || null,
  };
}

// ─── 4. generateMapImage ──────────────────────────────────────────────

export async function generateMapImage(args: Record<string, unknown>, _user: UserContext) {
  if (!Array.isArray(args.locations) || args.locations.length === 0) {
    throw new Error('locations array is required (each item needs label and address)');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  const size = typeof args.size === 'string' ? args.size : '600x400';
  const zoom = typeof args.zoom === 'number' ? args.zoom : undefined;

  const locations = args.locations as Array<{ label?: string; address?: string }>;

  // Geocode each location
  const geocoded: Array<{ label: string; lat: number; lng: number; address: string }> = [];
  for (const loc of locations) {
    if (typeof loc.address !== 'string' || loc.address.trim().length === 0) {
      throw new Error(`Each location must have an address. Got: ${JSON.stringify(loc)}`);
    }
    const geo = await geocodeToLatLng(loc.address.trim());
    geocoded.push({
      label: (loc.label || String.fromCharCode(65 + geocoded.length)).charAt(0).toUpperCase(),
      lat: geo.lat,
      lng: geo.lng,
      address: geo.formatted_address,
    });
  }

  // Build Static Maps URL
  const params = new URLSearchParams({
    size,
    maptype: 'roadmap',
    key: GOOGLE_MAPS_API_KEY,
  });

  if (zoom !== undefined) {
    params.set('zoom', String(zoom));
  }

  const markers = geocoded.map(
    (loc) => `markers=color:red%7Clabel:${loc.label}%7C${loc.lat},${loc.lng}`
  );

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}&${markers.join('&')}`;

  return {
    map_url: mapUrl,
    locations_plotted: geocoded.map((loc) => ({
      label: loc.label,
      address: loc.address,
      lat: loc.lat,
      lng: loc.lng,
    })),
    note: 'Send this image URL using MEDIA:<url> on its own line.',
  };
}

// ─── 5. searchYoutubeVideos ────────────────────────────────────────────

export async function searchYoutubeVideos(args: Record<string, unknown>, _user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('query is required');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google API key is not configured on the server');
  }

  const maxResults = typeof args.max_results === 'number' ? Math.min(args.max_results, 10) : 5;

  // Auto-prepend "electrical" if not present
  let query = args.query.trim();
  if (!/\belectri/i.test(query)) {
    query = `electrical ${query}`;
  }

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: String(maxResults),
    regionCode: 'GB',
    relevanceLanguage: 'en',
    key: GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`YouTube API error: ${response.status} — ${errorText}`);
  }

  const data = (await response.json()) as {
    pageInfo?: { totalResults?: number };
    items?: Array<{
      id?: { videoId?: string };
      snippet?: {
        title?: string;
        description?: string;
        thumbnails?: { medium?: { url?: string } };
        channelTitle?: string;
        publishedAt?: string;
      };
    }>;
  };

  const videos = (data.items || []).map((item) => ({
    title: item.snippet?.title || '',
    description: (item.snippet?.description || '').slice(0, 200),
    video_id: item.id?.videoId || '',
    thumbnail_url: item.snippet?.thumbnails?.medium?.url || '',
    channel_title: item.snippet?.channelTitle || '',
    published_at: item.snippet?.publishedAt || '',
    watch_url: `https://www.youtube.com/watch?v=${item.id?.videoId || ''}`,
  }));

  return {
    query,
    videos,
    total_results: data.pageInfo?.totalResults || videos.length,
  };
}

// ─── 6. getWeather (Google Weather API) ────────────────────────────────

export async function getWeather(args: Record<string, unknown>, _user: UserContext) {
  const hasAddress = typeof args.address === 'string' && args.address.trim().length > 0;
  const hasLatLng = typeof args.lat === 'number' && typeof args.lng === 'number';

  if (!hasAddress && !hasLatLng) {
    throw new Error('Either address or lat+lng is required');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  let lat: number;
  let lng: number;
  let location: string;

  if (hasLatLng) {
    lat = args.lat as number;
    lng = args.lng as number;
    try {
      const geo = await reverseGeocode(lat, lng);
      location = geo.locality || geo.formatted_address;
    } catch {
      location = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  } else {
    const geo = await geocodeToLatLng((args.address as string).trim());
    lat = geo.lat;
    lng = geo.lng;
    location = geo.locality || geo.formatted_address;
  }

  // ── Current conditions (Google Weather API) ──────────────────────────
  const currentParams = new URLSearchParams({
    key: GOOGLE_MAPS_API_KEY,
    'location.latitude': String(lat),
    'location.longitude': String(lng),
    languageCode: 'en',
  });

  const currentResp = await fetch(
    `https://weather.googleapis.com/v1/currentConditions:lookup?${currentParams.toString()}`
  );

  if (!currentResp.ok) {
    const errorText = await currentResp.text();
    throw new Error(`Google Weather API (current) error: ${currentResp.status} — ${errorText}`);
  }

  const currentData = (await currentResp.json()) as {
    temperature?: { degrees?: number; unit?: string };
    weatherCondition?: {
      description?: { text?: string };
      type?: string;
    };
    wind?: {
      speed?: { value?: number; unit?: string };
      direction?: { degrees?: number; cardinal?: string };
    };
    precipitation?: {
      probability?: { percent?: number; type?: string };
      qpf?: { quantity?: number; unit?: string };
    };
    relativeHumidity?: number;
    uvIndex?: number;
    isDaytime?: boolean;
  };

  // ── 3-day forecast (Google Weather API) ──────────────────────────────
  const forecastParams = new URLSearchParams({
    key: GOOGLE_MAPS_API_KEY,
    'location.latitude': String(lat),
    'location.longitude': String(lng),
    days: '3',
    languageCode: 'en',
  });

  const forecastResp = await fetch(
    `https://weather.googleapis.com/v1/forecast/days:lookup?${forecastParams.toString()}`
  );

  if (!forecastResp.ok) {
    const errorText = await forecastResp.text();
    throw new Error(`Google Weather API (forecast) error: ${forecastResp.status} — ${errorText}`);
  }

  const forecastData = (await forecastResp.json()) as {
    forecastDays?: Array<{
      displayDate?: { year?: number; month?: number; day?: number };
      daytimeForecast?: {
        weatherCondition?: {
          description?: { text?: string };
          type?: string;
        };
        precipitation?: {
          probability?: { percent?: number };
          qpf?: { quantity?: number; unit?: string };
        };
        wind?: {
          speed?: { value?: number; unit?: string };
        };
      };
      maxTemperature?: { degrees?: number; unit?: string };
      minTemperature?: { degrees?: number; unit?: string };
    }>;
  };

  const forecast = (forecastData.forecastDays || []).map((day) => {
    const d = day.displayDate;
    const date = d
      ? `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
      : null;
    return {
      date,
      high_c: day.maxTemperature?.degrees ?? null,
      low_c: day.minTemperature?.degrees ?? null,
      condition: day.daytimeForecast?.weatherCondition?.description?.text || null,
      precipitation_mm: day.daytimeForecast?.precipitation?.qpf?.quantity ?? 0,
      rain_chance_pct: day.daytimeForecast?.precipitation?.probability?.percent ?? null,
      wind_kph: day.daytimeForecast?.wind?.speed?.value ?? null,
    };
  });

  return {
    location,
    lat,
    lng,
    current: {
      temperature_c: currentData.temperature?.degrees ?? null,
      condition: currentData.weatherCondition?.description?.text || null,
      wind_kph: currentData.wind?.speed?.value ?? null,
      wind_direction: currentData.wind?.direction?.cardinal || null,
      precipitation_mm: currentData.precipitation?.qpf?.quantity ?? 0,
      rain_chance_pct: currentData.precipitation?.probability?.percent ?? null,
      humidity_pct: currentData.relativeHumidity ?? null,
      uv_index: currentData.uvIndex ?? null,
      is_daytime: currentData.isDaytime ?? null,
    },
    forecast,
  };
}
