export interface Witness {
  name: string;
  contact: string;
}

export interface NearMissReport {
  id: string;
  category: string;
  severity: string;
  description: string;
  location: string;
  incident_date: string;
  incident_time: string;
  reporter_name: string;
  potential_consequences?: string;
  immediate_actions?: string;
  preventive_measures?: string;
  photo_urls?: string[];
  created_at: string;
  user_id: string;
  witnesses?: Witness[];
  third_party_involved?: boolean;
  third_party_details?: string;
  weather_conditions?: string;
  lighting_conditions?: string;
  equipment_involved?: string;
  equipment_faulty?: boolean;
  equipment_fault_details?: string;
  supervisor_notified?: boolean;
  supervisor_name?: string;
  previous_similar_incidents?: string;
}
