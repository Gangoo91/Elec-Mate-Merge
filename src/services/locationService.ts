
interface LocationData {
  name: string;
  coordinates?: { lat: number; lng: number };
  aliases: string[];
  region: string;
  country: string;
}

// UK location database with common locations and their aliases
const UK_LOCATIONS: LocationData[] = [
  {
    name: "Cumbria",
    coordinates: { lat: 54.4609, lng: -2.9623 },
    aliases: ["cumbria", "lake district", "carlisle", "kendal", "barrow"],
    region: "North West England",
    country: "England"
  },
  {
    name: "London",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    aliases: ["london", "greater london", "central london"],
    region: "London",
    country: "England"
  },
  {
    name: "Manchester",
    coordinates: { lat: 53.4808, lng: -2.2426 },
    aliases: ["manchester", "greater manchester", "trafford", "salford"],
    region: "North West England",
    country: "England"
  },
  {
    name: "Birmingham",
    coordinates: { lat: 52.4862, lng: -1.8904 },
    aliases: ["birmingham", "west midlands", "solihull"],
    region: "West Midlands",
    country: "England"
  },
  {
    name: "Leeds",
    coordinates: { lat: 53.8008, lng: -1.5491 },
    aliases: ["leeds", "west yorkshire", "bradford", "wakefield"],
    region: "Yorkshire and the Humber",
    country: "England"
  },
  {
    name: "Glasgow",
    coordinates: { lat: 55.8642, lng: -4.2518 },
    aliases: ["glasgow", "greater glasgow", "clyde"],
    region: "Scotland",
    country: "Scotland"
  },
  {
    name: "Edinburgh",
    coordinates: { lat: 55.9533, lng: -3.1883 },
    aliases: ["edinburgh", "lothian"],
    region: "Scotland",
    country: "Scotland"
  },
  {
    name: "Cardiff",
    coordinates: { lat: 51.4816, lng: -3.1791 },
    aliases: ["cardiff", "caerdydd", "south wales"],
    region: "Wales",
    country: "Wales"
  },
  {
    name: "Belfast",
    coordinates: { lat: 54.5973, lng: -5.9301 },
    aliases: ["belfast", "northern ireland"],
    region: "Northern Ireland",
    country: "Northern Ireland"
  }
];

export class LocationService {
  static normalizeLocation(location: string): string {
    return location.toLowerCase().trim().replace(/,?\s*united kingdom$/i, '');
  }

  static findLocationMatch(searchLocation: string): LocationData | null {
    const normalized = this.normalizeLocation(searchLocation);
    
    return UK_LOCATIONS.find(location => 
      location.aliases.some(alias => 
        alias.includes(normalized) || normalized.includes(alias)
      )
    ) || null;
  }

  static isValidUKLocation(location: string): boolean {
    const normalized = this.normalizeLocation(location);
    
    // Check against known locations
    const hasMatch = UK_LOCATIONS.some(loc => 
      loc.aliases.some(alias => 
        alias.includes(normalized) || normalized.includes(alias)
      )
    );

    // Also allow "United Kingdom" and "UK" as valid
    const isGenericUK = /^(uk|united kingdom|britain|great britain)$/i.test(normalized);
    
    return hasMatch || isGenericUK;
  }

  static getLocationSuggestions(input: string): string[] {
    if (!input || input.length < 2) return [];
    
    const normalized = input.toLowerCase();
    const suggestions: string[] = [];
    
    UK_LOCATIONS.forEach(location => {
      location.aliases.forEach(alias => {
        if (alias.includes(normalized) && !suggestions.includes(location.name)) {
          suggestions.push(location.name);
        }
      });
    });
    
    return suggestions.slice(0, 5);
  }

  static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.deg2rad(lat2 - lat1);
    const dLng = this.deg2rad(lng2 - lng1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  static filterJobsByLocation(jobs: any[], searchLocation: string, maxDistanceMiles: number = 50): any[] {
    const locationMatch = this.findLocationMatch(searchLocation);
    
    if (!locationMatch || !locationMatch.coordinates) {
      // If we can't find coordinates, fall back to text matching
      return jobs.filter(job => 
        job.location.toLowerCase().includes(this.normalizeLocation(searchLocation))
      );
    }

    return jobs.filter(job => {
      const jobLocationMatch = this.findLocationMatch(job.location);
      
      if (jobLocationMatch && jobLocationMatch.coordinates) {
        const distance = this.calculateDistance(
          locationMatch.coordinates.lat,
          locationMatch.coordinates.lng,
          jobLocationMatch.coordinates.lat,
          jobLocationMatch.coordinates.lng
        );
        return distance <= maxDistanceMiles;
      }
      
      // Fall back to text matching if coordinates not available
      return job.location.toLowerCase().includes(this.normalizeLocation(searchLocation));
    });
  }
}
