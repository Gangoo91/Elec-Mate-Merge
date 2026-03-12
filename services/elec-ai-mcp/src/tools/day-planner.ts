/**
 * Day planner tool — plan_my_day
 * Fetches today's calendar events, calls Google Maps Distance Matrix API,
 * and runs a brute-force TSP solver to find the optimal route.
 */

import type { UserContext } from '../auth.js';
import { getWeather } from './google-apis.js';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

interface CalendarEvent {
  id: string;
  title: string;
  address: string;
  start_at: string;
  end_at: string | null;
  event_type: string;
  fixed_time: boolean;
}

interface RouteStop {
  order: number;
  event_id: string;
  title: string;
  address: string;
  arrive_by: string;
  depart_at: string;
  travel_time_minutes: number;
}

/**
 * Brute-force TSP solver for small sets (<=7 locations).
 * Returns the permutation index order that minimises total travel time,
 * respecting fixed-time events.
 */
function solveTsp(
  distanceMatrix: number[][],
  events: CalendarEvent[],
  homeIndex: number
): number[] {
  const flexibleIndices: number[] = [];
  const fixedIndices: number[] = [];

  for (let i = 0; i < events.length; i++) {
    if (events[i].fixed_time) {
      fixedIndices.push(i);
    } else {
      flexibleIndices.push(i);
    }
  }

  // Generate all permutations of flexible events
  function permutations(arr: number[]): number[][] {
    if (arr.length <= 1) return [arr];
    const result: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.filter((_, j) => j !== i);
      for (const perm of permutations(rest)) {
        result.push([arr[i], ...perm]);
      }
    }
    return result;
  }

  const allPerms = flexibleIndices.length > 0 ? permutations(flexibleIndices) : [[]];

  let bestOrder: number[] = [];
  let bestCost = Infinity;

  for (const perm of allPerms) {
    // Merge fixed and flexible into a single route
    const route = mergeFixedAndFlexible(perm, fixedIndices, events);

    // Calculate total travel time: home -> first -> ... -> last -> home
    let cost = distanceMatrix[homeIndex][route[0]]; // home to first
    for (let i = 0; i < route.length - 1; i++) {
      cost += distanceMatrix[route[i]][route[i + 1]];
    }
    cost += distanceMatrix[route[route.length - 1]][homeIndex]; // last to home

    if (cost < bestCost) {
      bestCost = cost;
      bestOrder = route;
    }
  }

  return bestOrder;
}

/**
 * Merge flexible events (in given order) with fixed-time events (sorted by start_at).
 */
function mergeFixedAndFlexible(
  flexible: number[],
  fixed: number[],
  events: CalendarEvent[]
): number[] {
  if (fixed.length === 0) return flexible;
  if (flexible.length === 0)
    return [...fixed].sort((a, b) => events[a].start_at.localeCompare(events[b].start_at));

  // Sort fixed by start time
  const sortedFixed = [...fixed].sort(
    (a, b) => new Date(events[a].start_at).getTime() - new Date(events[b].start_at).getTime()
  );

  // Insert fixed events at their correct chronological positions
  const result: number[] = [];
  let flexIdx = 0;
  let fixIdx = 0;

  // Simple merge: put fixed events at their time positions, fill gaps with flexible
  // Since flexible events can be done in any order, we slot them around fixed ones
  for (const fi of sortedFixed) {
    // Add flexible events before this fixed event
    // Heuristic: add roughly equal number of flexible events between fixed events
    const flexPerSlot = Math.ceil((flexible.length - flexIdx) / (sortedFixed.length - fixIdx));
    for (let i = 0; i < flexPerSlot && flexIdx < flexible.length; i++) {
      result.push(flexible[flexIdx++]);
    }
    result.push(fi);
    fixIdx++;
  }

  // Add remaining flexible events
  while (flexIdx < flexible.length) {
    result.push(flexible[flexIdx++]);
  }

  return result;
}

export async function planMyDay(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // Determine target date
  const dateStr =
    typeof args.date === 'string' ? args.date : new Date().toISOString().split('T')[0];
  const dateStart = `${dateStr}T00:00:00`;
  const dateEnd = `${dateStr}T23:59:59`;

  // Get start address from args or company profile
  let homeAddress: string;
  if (typeof args.start_address === 'string' && args.start_address.trim().length > 0) {
    homeAddress = args.start_address.trim();
  } else {
    const { data: company } = await supabase
      .from('company_profiles')
      .select('address')
      .eq('user_id', user.userId)
      .maybeSingle();

    if (company?.address) {
      homeAddress = company.address;
    } else {
      throw new Error(
        'No start_address provided and no business address in company profile. Please provide a start_address.'
      );
    }
  }

  // Fetch today's calendar events with addresses
  const { data: rawEvents, error: calError } = await supabase
    .from('calendar_events')
    .select('id, title, address, start_at, end_at, event_type')
    .gte('start_at', dateStart)
    .lte('start_at', dateEnd)
    .is('deleted_at', null)
    .order('start_at', { ascending: true });

  if (calError) throw new Error(`Failed to read calendar: ${calError.message}`);

  // Filter to events with addresses
  const eventsWithAddress = (rawEvents || []).filter(
    (e: Record<string, unknown>) =>
      typeof e.address === 'string' && (e.address as string).trim().length > 0
  );

  if (eventsWithAddress.length === 0) {
    return {
      date: dateStr,
      optimised_route: [],
      total_driving_minutes: 0,
      saved_minutes_vs_original: 0,
      home_address: homeAddress,
      message: 'No events with addresses found for this date.',
    };
  }

  // Map to typed events
  const events: CalendarEvent[] = eventsWithAddress.map((e: Record<string, unknown>) => ({
    id: e.id as string,
    title: e.title as string,
    address: (e.address as string).trim(),
    start_at: e.start_at as string,
    end_at: (e.end_at as string) || null,
    event_type: (e.event_type as string) || 'general',
    // Events with specific times are considered fixed
    fixed_time: true,
  }));

  // Simple case: 1 event
  if (events.length === 1) {
    return {
      date: dateStr,
      optimised_route: [
        {
          order: 1,
          event_id: events[0].id,
          title: events[0].title,
          address: events[0].address,
          arrive_by: events[0].start_at,
          depart_at: events[0].end_at || events[0].start_at,
          travel_time_minutes: 0,
        },
      ],
      total_driving_minutes: 0,
      saved_minutes_vs_original: 0,
      home_address: homeAddress,
      first_departure: events[0].start_at,
      last_arrival_home: events[0].end_at || events[0].start_at,
      message: 'Only 1 event today — no route optimisation needed.',
    };
  }

  // For >7 events, skip optimisation — sort by start_at and estimate travel
  if (events.length > 7) {
    const route: RouteStop[] = events.map((e, i) => ({
      order: i + 1,
      event_id: e.id,
      title: e.title,
      address: e.address,
      arrive_by: e.start_at,
      depart_at: e.end_at || e.start_at,
      travel_time_minutes: 0,
    }));

    return {
      date: dateStr,
      optimised_route: route,
      total_driving_minutes: 0,
      saved_minutes_vs_original: 0,
      home_address: homeAddress,
      first_departure: events[0].start_at,
      last_arrival_home: events[events.length - 1].end_at || events[events.length - 1].start_at,
      message: `${events.length} events found — too many for route optimisation. Sorted by start time.`,
    };
  }

  // 2-7 events: call Distance Matrix API
  if (!GOOGLE_MAPS_API_KEY) {
    // No API key — return sorted by time without driving estimates
    const route: RouteStop[] = events.map((e, i) => ({
      order: i + 1,
      event_id: e.id,
      title: e.title,
      address: e.address,
      arrive_by: e.start_at,
      depart_at: e.end_at || e.start_at,
      travel_time_minutes: 0,
    }));

    return {
      date: dateStr,
      optimised_route: route,
      total_driving_minutes: 0,
      saved_minutes_vs_original: 0,
      home_address: homeAddress,
      first_departure: events[0].start_at,
      last_arrival_home: events[events.length - 1].end_at || events[events.length - 1].start_at,
      message:
        'Google Maps API key not configured — route sorted by time without driving estimates.',
    };
  }

  // Build all addresses: home + events
  const allAddresses = [homeAddress, ...events.map((e) => e.address)];
  const homeIndex = 0;

  // Call Distance Matrix API
  const origins = allAddresses.join('|');
  const destinations = allAddresses.join('|');

  const params = new URLSearchParams({
    origins,
    destinations,
    mode: 'driving',
    departure_time: 'now',
    units: 'imperial',
    key: GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Google Maps Distance Matrix API error: ${response.status}`);
  }

  const dmData = (await response.json()) as {
    status: string;
    rows: Array<{
      elements: Array<{
        status: string;
        duration_in_traffic?: { value: number; text: string };
        duration: { value: number; text: string };
        distance: { value: number; text: string };
      }>;
    }>;
  };

  if (dmData.status !== 'OK') {
    throw new Error(`Distance Matrix API returned: ${dmData.status}`);
  }

  // Build distance matrix (seconds)
  const matrix: number[][] = dmData.rows.map((row) =>
    row.elements.map((el) => {
      if (el.status !== 'OK') return 999999;
      return el.duration_in_traffic?.value || el.duration.value;
    })
  );

  // Run TSP solver (event indices are 0-based, but in the matrix they're 1-based because home is 0)
  const eventMatrixIndices = events.map((_, i) => i + 1);
  const eventMatrix: number[][] = [];
  for (const i of [homeIndex, ...eventMatrixIndices]) {
    const row: number[] = [];
    for (const j of [homeIndex, ...eventMatrixIndices]) {
      row.push(matrix[i][j]);
    }
    eventMatrix.push(row);
  }

  // In eventMatrix, index 0 = home, indices 1..n = events
  const bestOrder = solveTsp(eventMatrix, events, 0);

  // Calculate original order cost (sorted by start time)
  const originalOrder = events.map((_, i) => i + 1);
  let originalCost = eventMatrix[0][originalOrder[0]];
  for (let i = 0; i < originalOrder.length - 1; i++) {
    originalCost += eventMatrix[originalOrder[i]][originalOrder[i + 1]];
  }
  originalCost += eventMatrix[originalOrder[originalOrder.length - 1]][0];

  // Calculate optimised cost
  let optimisedCost = eventMatrix[0][bestOrder[0]];
  for (let i = 0; i < bestOrder.length - 1; i++) {
    optimisedCost += eventMatrix[bestOrder[i]][bestOrder[i + 1]];
  }
  optimisedCost += eventMatrix[bestOrder[bestOrder.length - 1]][0];

  // Build optimised route
  const route: RouteStop[] = [];
  let prevIndex = 0; // home
  for (let i = 0; i < bestOrder.length; i++) {
    const eventIdx = bestOrder[i] - 1; // Convert back to event index
    const event = events[eventIdx];
    const travelSeconds = eventMatrix[prevIndex][bestOrder[i]];
    route.push({
      order: i + 1,
      event_id: event.id,
      title: event.title,
      address: event.address,
      arrive_by: event.start_at,
      depart_at: event.end_at || event.start_at,
      travel_time_minutes: Math.round(travelSeconds / 60),
    });
    prevIndex = bestOrder[i];
  }

  const totalDrivingMinutes = Math.round(optimisedCost / 60);
  const savedMinutes = Math.round((originalCost - optimisedCost) / 60);

  // Fetch weather for first job location (non-critical — don't fail the whole plan)
  let weather = null;
  try {
    const firstEvent = events[bestOrder[0] - 1];
    if (firstEvent?.address) {
      weather = await getWeather({ address: firstEvent.address }, user);
    }
  } catch {
    // Weather is non-critical — return null if it fails
  }

  return {
    date: dateStr,
    optimised_route: route,
    total_driving_minutes: totalDrivingMinutes,
    saved_minutes_vs_original: Math.max(0, savedMinutes),
    home_address: homeAddress,
    first_departure: route[0]?.arrive_by,
    last_arrival_home: route[route.length - 1]?.depart_at,
    weather,
  };
}
