import type { SiteVisit } from '@/types/siteVisit';
import type { QuoteItem } from '@/types/quote';
import { ACCESSORY_TYPES } from '@/data/siteVisit/accessoryTypes';
import { getRoomLabel } from '@/data/siteVisit/roomTypes';

/**
 * Static fallback price lookup for common accessory types.
 * These are rough trade prices (ex-VAT) used when no live pricing is available.
 * The electrician can always adjust in the quote wizard.
 */
const FALLBACK_PRICES: Record<string, number> = {
  // Sockets
  single_socket: 4.5,
  double_socket: 5.5,
  usb_socket: 12.0,
  switched_fused_spur: 6.0,
  unswitched_fused_spur: 5.0,
  shaver_socket: 18.0,
  floor_socket: 25.0,
  // Lighting
  ceiling_pendant: 3.5,
  led_downlight: 8.0,
  led_strip: 12.0,
  wall_light: 15.0,
  spotlight_bar: 20.0,
  under_cabinet_light: 15.0,
  outdoor_light: 25.0,
  pir_sensor_light: 22.0,
  emergency_light: 35.0,
  bathroom_light: 28.0,
  // Switches
  single_switch: 3.0,
  double_switch: 4.5,
  two_way_switch: 4.0,
  intermediate_switch: 6.0,
  dimmer_switch: 12.0,
  pull_cord_switch: 8.0,
  smart_switch: 25.0,
  // Appliances
  cooker_outlet: 8.0,
  cooker_switch: 12.0,
  hob_outlet: 8.0,
  extractor_fan: 35.0,
  towel_rail_spur: 6.0,
  immersion_heater: 15.0,
  waste_disposal: 10.0,
  // Safety
  smoke_detector: 18.0,
  heat_detector: 20.0,
  co_detector: 22.0,
  // Data
  cat6_outlet: 8.0,
  tv_outlet: 5.0,
  bt_outlet: 4.0,
  // Heating
  storage_heater: 250.0,
  panel_heater: 120.0,
  thermostat: 35.0,
  underfloor_heating: 45.0,
  // EV / Outdoor
  ev_charger: 450.0,
  outside_socket: 18.0,
  garden_spike_light: 15.0,
  // Other
  consumer_unit: 180.0,
  distribution_board: 350.0,
  cable_run: 1.5,
  custom_item: 0,
};

function getUnitPrice(itemType: string): number {
  return FALLBACK_PRICES[itemType] ?? 0;
}

/**
 * Transforms a site visit's captured scope into QuoteItem[] for the quote wizard.
 * Only generates materials — labour is added by the electrician in the quote wizard.
 */
export function transformScopeToQuoteItems(visit: SiteVisit): QuoteItem[] {
  const items: QuoteItem[] = [];

  for (const room of visit.rooms) {
    const roomLabel = room.roomName || getRoomLabel(room.roomType);

    for (const item of room.items) {
      const unitPrice = getUnitPrice(item.itemType);
      const accessory = ACCESSORY_TYPES.find((a) => a.id === item.itemType);

      items.push({
        id: crypto.randomUUID(),
        description: `${roomLabel} — ${item.itemDescription}`,
        quantity: item.quantity,
        unit: item.unit || accessory?.defaultUnit || 'each',
        unitPrice,
        totalPrice: unitPrice * item.quantity,
        category: 'materials',
        subcategory: roomLabel,
      });
    }
  }

  return items;
}
