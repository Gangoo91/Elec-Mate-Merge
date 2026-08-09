/**
 * The register's filter identities.
 *
 * This file used to also export `EquipmentFilterTabs` and `EquipmentFilterPills`
 * — two full pill-bar implementations (~200 lines, plus an unused
 * `getActiveCountColor` helper) that nothing rendered. The register uses the
 * shared `FilterBar` primitive. They were removed rather than restyled: leaving
 * unrendered components carrying the superseded tinted-pill language is how that
 * language gets copied back into a live screen.
 *
 * The type is what the tracker actually consumes, so it stays.
 */

export type EquipmentFilterId = 'all' | 'good' | 'attention' | 'overdue' | 'warranty';
