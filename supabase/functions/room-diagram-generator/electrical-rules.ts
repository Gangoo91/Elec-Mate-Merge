/**
 * The electrical rules both readers design to — the whole-plan reader in
 * `plan-reader.ts` and the single-room description mode in `index.ts`. One copy, so
 * the two cannot drift.
 */
export const ELECTRICAL_RULES = `VALID SYMBOL IDs (use ONLY these exact IDs, no suffixes):
Lighting: light-ceiling, light-wall, light-downlight, light-emergency, light-fluorescent, light-pendant, light-bulkhead, light-pir, light-outside, light-led-strip, light-exit-sign, light-twin-emergency, light-high-bay
Sockets: socket-single-13a, socket-double-13a, socket-fused-spur, socket-switched-fused-spur, socket-unswitched-spur, socket-cooker-45a, socket-floor, socket-outdoor, socket-usb, socket-ev-charger, socket-tv-aerial, socket-data, socket-telephone, socket-shaver, socket-comms-cabinet
Switches: switch-1way, switch-2way, switch-intermediate, switch-dimmer, switch-pull-cord, switch-double, switch-pir, switch-timer, switch-isolator, switch-emergency-stop, switch-fan-isolator, switch-key, switch-heater
Distribution: consumer-unit, mcb, rcd, rcbo, main-isolator, distribution-board, spd, meter, mccb, contactor, changeover-switch, generator-changeover, busbar-chamber, sub-main-board
Safety: smoke-detector, co-detector, heat-detector, fire-alarm, bell, junction-box, thermostat, extractor-fan, cctv, door-entry, emergency-call-point, disabled-alarm, sounder-beacon, access-control, door-release, motion-detector, break-glass

ROOM-SPECIFIC UK WIRING REGULATIONS:

BATHROOM (BS 7671 Section 701):
- NO 13A socket outlets (except shaver sockets to BS EN 61558-2-5)
- Light switches MUST be pull-cord type (not plate switches) — use switch-pull-cord
- All circuits must be 30mA RCD protected
- Use IP-rated downlights (light-downlight)
- Include extractor-fan
- Include shaver socket (socket-shaver)
- NEVER place socket-single-13a or socket-double-13a in bathrooms

KITCHEN:
- Minimum 4 double sockets on worktop ring final circuit at 1.15m height
- Dedicated 45A cooker circuit (socket-cooker-45a)
- FCU for extractor (socket-fused-spur or socket-switched-fused-spur)
- RCD protection for sockets within 1m of sink
- Place worktop sockets above worktop height (1.15m)

GARAGE/WORKSHOP:
- Consider consumer-unit or sub-main-board
- Outdoor IP66 sockets (socket-outdoor)
- Fluorescent or high-bay lighting (light-fluorescent or light-high-bay)
- RCD protection on all circuits

HALLWAY/LANDING/CORRIDOR:
- 2-way switching (switch-2way) for lights (switch at each end / top and bottom of stairs)
- Smoke detector required (smoke-detector)
- Emergency lighting if commercial (light-emergency)

LONG ROOMS AND CORRIDORS — SPACE THE LIGHTING OUT:
- A single fitting at the centre of a long room leaves most of it dark. Any room
  longer than 5m gets multiple lighting points spread along its length, each with
  its own "position" in metres, roughly one every 3-4m.
- The same applies to emergency lighting and detection on an escape route: space
  them along the corridor rather than placing one in the middle.
- A 20m corridor should have around 5-6 lighting points, not one.

ALL ROOMS:
- Smoke detector required in habitable rooms and escape routes
- CO detector required where there is a combustion appliance
- Consider switch position relative to door opening direction`;
