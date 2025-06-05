
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
    aliases: ["cumbria", "lake district", "carlisle", "kendal", "barrow", "penrith", "workington", "whitehaven", "barrow-in-furness", "cockermouth", "keswick", "windermere", "ambleside", "grasmere"],
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
    if (!searchLocation || searchLocation.toLowerCase() === 'united kingdom') {
      console.log('🌍 No specific location filter - returning all jobs');
      return jobs;
    }

    const normalizedSearch = this.normalizeLocation(searchLocation);
    console.log(`📍 Filtering jobs for location: "${normalizedSearch}"`);
    
    // Find the search location match
    const searchLocationMatch = this.findLocationMatch(searchLocation);
    console.log('🎯 Search location match:', searchLocationMatch?.name || 'Not found');

    const filteredJobs = jobs.filter(job => {
      const jobLocation = job.location || '';
      const normalizedJobLocation = this.normalizeLocation(jobLocation);
      
      // Direct text matching first (most reliable)
      const directMatch = normalizedJobLocation.includes(normalizedSearch) || 
                         normalizedSearch.includes(normalizedJobLocation);
      
      if (directMatch) {
        console.log(`✅ Direct match: "${jobLocation}" matches "${searchLocation}"`);
        return true;
      }

      // Check if job location matches any aliases of the search location
      if (searchLocationMatch) {
        const aliasMatch = searchLocationMatch.aliases.some(alias => 
          normalizedJobLocation.includes(alias) || alias.includes(normalizedJobLocation)
        );
        
        if (aliasMatch) {
          console.log(`✅ Alias match: "${jobLocation}" matches alias of "${searchLocation}"`);
          return true;
        }
      }

      // Check if job location is a known location that's nearby
      const jobLocationMatch = this.findLocationMatch(jobLocation);
      
      if (searchLocationMatch && jobLocationMatch && 
          searchLocationMatch.coordinates && jobLocationMatch.coordinates) {
        const distance = this.calculateDistance(
          searchLocationMatch.coordinates.lat,
          searchLocationMatch.coordinates.lng,
          jobLocationMatch.coordinates.lat,
          jobLocationMatch.coordinates.lng
        );
        
        if (distance <= maxDistanceMiles) {
          console.log(`✅ Distance match: "${jobLocation}" is ${distance.toFixed(1)} miles from "${searchLocation}"`);
          return true;
        }
      }

      // Broader matching for partial matches
      const words = normalizedSearch.split(' ');
      const jobWords = normalizedJobLocation.split(' ');
      
      const hasCommonWord = words.some(word => 
        word.length > 2 && jobWords.some(jobWord => 
          jobWord.includes(word) || word.includes(jobWord)
        )
      );

      if (hasCommonWord) {
        console.log(`✅ Word match: "${jobLocation}" has common words with "${searchLocation}"`);
        return true;
      }

      console.log(`❌ No match: "${jobLocation}" doesn't match "${searchLocation}"`);
      return false;
    });

    console.log(`📊 Location filtering result: ${filteredJobs.length}/${jobs.length} jobs match "${searchLocation}"`);
    return filteredJobs;
  }
}
