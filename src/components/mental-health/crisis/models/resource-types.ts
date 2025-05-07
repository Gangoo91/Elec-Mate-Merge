
// Define the type for local resources
export interface LocalResource {
  name: string;
  distance: string;
  type: string;
  contact?: string;
  address?: string;
  open_now?: boolean;
}

export interface SearchResult {
  services: LocalResource[];
  source?: string;
}
