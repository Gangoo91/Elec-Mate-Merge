/**
 * Routing tools — get_route_to_job
 * Uses Google Maps Directions API for route planning with real-time traffic.
 */

import type { UserContext } from '../auth.js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

interface DirectionsRoute {
  summary: string;
  duration: string;
  duration_in_traffic: string;
  distance: string;
  steps_summary: string[];
}

export async function getRouteToJob(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.destination !== 'string' || args.destination.trim().length === 0) {
    throw new Error('destination address is required');
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is not configured on the server');
  }

  // Determine origin — use provided origin or fall back to user's business address
  let origin: string;
  if (typeof args.origin === 'string' && args.origin.trim().length > 0) {
    origin = args.origin.trim();
  } else {
    // Look up user's business address from company_profiles
    const { data: company } = await user.supabase
      .from('company_profiles')
      .select('address')
      .eq('user_id', user.userId)
      .maybeSingle();

    if (company?.address) {
      origin = company.address;
    } else {
      throw new Error(
        'No origin address provided and no business address found in your company profile. Please provide an origin address.'
      );
    }
  }

  const destination = args.destination.trim();

  // Determine departure time
  const departureTime =
    typeof args.departure_time === 'string'
      ? Math.floor(new Date(args.departure_time).getTime() / 1000)
      : Math.floor(Date.now() / 1000);

  // Call Google Maps Directions API
  const params = new URLSearchParams({
    origin,
    destination,
    mode: 'driving',
    alternatives: 'true',
    departure_time: String(departureTime),
    traffic_model: 'best_guess',
    units: 'imperial',
    key: GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Google Maps API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as {
    status: string;
    error_message?: string;
    routes: Array<{
      summary: string;
      legs: Array<{
        distance: { text: string; value: number };
        duration: { text: string; value: number };
        duration_in_traffic?: { text: string; value: number };
        steps: Array<{ html_instructions: string }>;
      }>;
    }>;
  };

  if (data.status !== 'OK') {
    throw new Error(`Directions not found: ${data.status}. ${data.error_message || ''}`);
  }

  const routes: DirectionsRoute[] = data.routes.map((route) => {
    const leg = route.legs[0];
    return {
      summary: route.summary,
      duration: leg.duration.text,
      duration_in_traffic: leg.duration_in_traffic?.text || leg.duration.text,
      distance: leg.distance.text,
      steps_summary: leg.steps
        .slice(0, 5)
        .map((s) => s.html_instructions.replace(/<[^>]*>/g, '')),
    };
  });

  // Calculate time saved vs worst route
  const bestDuration =
    data.routes[0]?.legs[0]?.duration_in_traffic?.value ||
    data.routes[0]?.legs[0]?.duration.value ||
    0;
  const worstDuration = Math.max(
    ...data.routes.map(
      (r) => r.legs[0]?.duration_in_traffic?.value || r.legs[0]?.duration.value || 0
    )
  );
  const timeSavedMinutes = Math.round((worstDuration - bestDuration) / 60);

  return {
    origin,
    destination,
    routes,
    recommended: routes[0],
    time_saved_vs_worst: timeSavedMinutes > 0 ? `${timeSavedMinutes} min` : 'No alternative routes',
    note: 'Drive times include estimated traffic. Verify before setting off.',
  };
}
