/**
 * Supplier Configuration
 * Defines all suppliers and their scraping selectors/URLs
 * Updated 2026-01-15 with working selectors
 */

export interface SupplierConfig {
  name: string;
  slug: string;
  baseUrl: string;
  categoryUrls: Record<string, string[]>;
  dealsUrl: string | null;
  couponsUrl: string | null;
  selectors: {
    productCard: string;
    productName: string;
    productPrice: string;
    originalPrice: string;
    productImage: string;
    productUrl: string;
    productSku: string;
    stockStatus: string;
    nextPage: string;
    brand?: string;
  };
  pagination: {
    type: 'query' | 'button' | 'scroll';
    param?: string;
    maxPages: number;
  };
  rateLimit: number; // milliseconds between requests
}

export const SUPPLIERS: Record<string, SupplierConfig> = {
  screwfix: {
    name: 'Screwfix',
    slug: 'screwfix',
    baseUrl: 'https://www.screwfix.com',
    categoryUrls: {
      // === TOOLS ===
      'hand-tools': [
        '/c/tools/screwdrivers/cat9780002?page_size=100',
        '/c/tools/pliers-cutters/cat831008?page_size=100',
        '/c/tools/spanners-wrenches/cat831010?page_size=100',
      ],
      'power-tools': [
        '/c/tools/drills/cat830704?page_size=100',
        '/c/tools/saws/cat830716?page_size=100',
        '/c/tools/angle-grinders/cat830694?page_size=100',
      ],
      'test-equipment': [
        '/c/tools/electrical-testers/cat7910001?page_size=100',
        '/c/tools/measuring-tools/cat830714?page_size=100',
      ],
      'ppe': [
        '/c/workwear-safety/safety-clothing/cat830838?page_size=100',
        '/c/workwear-safety/safety-footwear/cat830840?page_size=100',
      ],
      'tool-storage': [
        '/c/tools/tool-boxes-storage/cat830718?page_size=100',
      ],
      // === MATERIALS (using search URLs for reliability) ===
      'cables': [
        '/search?search=twin+and+earth+cable&page_size=100',
        '/search?search=armoured+cable+swa&page_size=100',
        '/search?search=flex+cable&page_size=100',
      ],
      'consumer-units': [
        '/search?search=consumer+unit&page_size=100',
        '/search?search=distribution+board&page_size=100',
      ],
      'circuit-protection': [
        '/search?search=mcb+circuit+breaker&page_size=100',
        '/search?search=rcd+rcbo&page_size=100',
        '/search?search=surge+protection&page_size=100',
      ],
      'wiring-accessories': [
        '/search?search=socket+outlet&page_size=100',
        '/search?search=light+switch&page_size=100',
        '/search?search=back+box+pattress&page_size=100',
      ],
      'lighting': [
        '/search?search=led+bulb&page_size=100',
        '/search?search=downlight+spotlight&page_size=100',
        '/search?search=emergency+lighting&page_size=100',
        '/search?search=batten+light&page_size=100',
      ],
      'containment': [
        '/search?search=cable+trunking&page_size=100',
        '/search?search=conduit+fitting&page_size=100',
        '/search?search=cable+tray&page_size=100',
      ],
      'earthing': [
        '/search?search=earth+rod+clamp&page_size=100',
        '/search?search=earth+tape+bonding&page_size=100',
      ],
      'fire-security': [
        '/search?search=smoke+alarm+detector&page_size=100',
        '/search?search=fire+alarm&page_size=100',
      ],
      'ev-charging': [
        '/search?search=ev+charger+electric+vehicle&page_size=100',
      ],
      'data-networking': [
        '/search?search=cat6+ethernet+cable&page_size=100',
        '/search?search=data+socket+rj45&page_size=100',
      ],
      'fixings': [
        '/search?search=cable+clip&page_size=100',
        '/search?search=cable+gland&page_size=100',
        '/search?search=cable+tie&page_size=100',
      ],
    },
    dealsUrl: '/search?search=deals&page_size=100',
    couponsUrl: null,
    // Screwfix uses obfuscated class names - selectors work via data attributes and structure
    selectors: {
      productCard: '[data-qaid="product-heading"]',  // Parent container
      productName: 'a[data-qaid="product_description"] span',
      productPrice: '[class*="price"]',  // Will extract £X.XX pattern
      originalPrice: '[class*="was"], [class*="Was"]',
      productImage: 'picture img, img[src*="screwfix.com"]',
      productUrl: 'a[href*="/p/"]',
      productSku: 'span[data-qaid="sku"]',
      stockStatus: '[class*="stock"], [class*="availability"]',
      nextPage: '[class*="pagination"] [class*="next"]',
      brand: '[class*="brand"]',
    },
    pagination: {
      type: 'query',
      param: 'page',
      maxPages: 10,
    },
    rateLimit: 2000,
  },

  toolstation: {
    name: 'Toolstation',
    slug: 'toolstation',
    baseUrl: 'https://www.toolstation.com',
    categoryUrls: {
      // === TOOLS ===
      'hand-tools': [
        '/hand-tools/screwdrivers/c675',
        '/hand-tools/pliers-cutters/c670',
        '/hand-tools/electrical-tools/c39',
      ],
      'power-tools': [
        '/power-tools/drills/c719',
        '/power-tools/saws/c722',
        '/power-tools/angle-grinders/c378',
      ],
      'test-equipment': [
        '/electrical-supplies-accessories/electrical-test-equipment/c1024',
      ],
      'ppe': [
        '/workwear-safety/ppe/c735',
      ],
      'tool-storage': [
        '/site-equipment/tool-storage/c742',
      ],
      // === MATERIALS (using search URLs for reliability) ===
      'cables': [
        '/search?q=twin+earth+cable',
        '/search?q=armoured+cable',
        '/search?q=flex+cable',
      ],
      'consumer-units': [
        '/search?q=consumer+unit',
        '/search?q=distribution+board',
      ],
      'circuit-protection': [
        '/search?q=mcb',
        '/search?q=rcbo+rcd',
        '/search?q=surge+protector',
      ],
      'wiring-accessories': [
        '/search?q=socket+outlet',
        '/search?q=light+switch',
        '/search?q=back+box',
      ],
      'lighting': [
        '/search?q=led+bulb',
        '/search?q=downlight',
        '/search?q=emergency+light',
        '/search?q=batten+light',
      ],
      'containment': [
        '/search?q=cable+trunking',
        '/search?q=conduit',
        '/search?q=cable+tray',
      ],
      'earthing': [
        '/search?q=earth+rod',
        '/search?q=earth+clamp',
      ],
      'fire-security': [
        '/search?q=smoke+alarm',
        '/search?q=fire+alarm',
      ],
      'ev-charging': [
        '/search?q=ev+charger',
      ],
      'data-networking': [
        '/search?q=cat6+cable',
        '/search?q=ethernet+socket',
      ],
      'fixings': [
        '/search?q=cable+clip',
        '/search?q=cable+gland',
        '/search?q=cable+tie',
      ],
    },
    dealsUrl: '/deals',
    couponsUrl: null,
    // Toolstation uses data-testid attributes
    selectors: {
      productCard: '[data-testid="product-card"]',
      productName: '[data-testid="product-card-reviews"]',  // Use title attribute
      productPrice: '.font-bold.text-blue, span.text-blue',
      originalPrice: '.line-through, [class*="was"]',
      productImage: 'img[src*="toolstation.com/images"]',
      productUrl: '[data-testid="product-card-image-link"]',
      productSku: '[data-testid="product-card-reviews"]',  // Use data-product-id
      stockStatus: '[class*="stock"]',
      nextPage: '[aria-label="Next page"], .pagination-next',
      brand: 'img[alt]:first-child',  // Brand logo
    },
    pagination: {
      type: 'scroll',
      maxPages: 5,
    },
    rateLimit: 2000,
  },

  cef: {
    name: 'CEF',
    slug: 'cef',
    baseUrl: 'https://www.cef.co.uk',
    categoryUrls: {
      // === TOOLS ===
      'hand-tools': [
        '/catalogue/products/hand-tools',
      ],
      'power-tools': [
        '/catalogue/products/power-tools',
      ],
      'test-equipment': [
        '/catalogue/products/test-measurement',
      ],
      // === MATERIALS (CEF is primarily an electrical wholesaler) ===
      'cables': [
        '/catalogue/products/cables-accessories',
        '/catalogue/products/cable',
        '/catalogue/products/data-cable',
      ],
      'consumer-units': [
        '/catalogue/products/consumer-units',
        '/catalogue/products/distribution-boards',
      ],
      'circuit-protection': [
        '/catalogue/products/circuit-protection',
        '/catalogue/products/mcbs',
        '/catalogue/products/rcds',
        '/catalogue/products/rcbos',
      ],
      'wiring-accessories': [
        '/catalogue/products/wiring-accessories',
        '/catalogue/products/switches-sockets',
        '/catalogue/products/back-boxes',
      ],
      'lighting': [
        '/catalogue/products/lighting',
        '/catalogue/products/led-lighting',
        '/catalogue/products/emergency-lighting',
        '/catalogue/products/commercial-lighting',
      ],
      'containment': [
        '/catalogue/products/cable-management',
        '/catalogue/products/trunking',
        '/catalogue/products/conduit',
        '/catalogue/products/cable-tray',
      ],
      'earthing': [
        '/catalogue/products/earthing-bonding',
      ],
      'fire-security': [
        '/catalogue/products/fire-alarms',
        '/catalogue/products/smoke-detectors',
        '/catalogue/products/intruder-alarms',
      ],
      'ev-charging': [
        '/catalogue/products/ev-charging',
      ],
      'data-networking': [
        '/catalogue/products/data-communications',
        '/catalogue/products/structured-cabling',
      ],
      'fixings': [
        '/catalogue/products/fixings-fasteners',
        '/catalogue/products/cable-accessories',
      ],
    },
    dealsUrl: '/offers',
    couponsUrl: null,
    selectors: {
      productCard: '.product-item, .product-card, [class*="product-tile"]',
      productName: '.product-item-name, .product-title, h3 a',
      productPrice: '.price-box .price, .product-price, [class*="price"]',
      originalPrice: '.old-price .price, [class*="was"]',
      productImage: '.product-image img, img[src*="cef.co.uk"]',
      productUrl: 'a.product-item-link, a[href*="/catalogue/"]',
      productSku: '[data-product-sku], [data-sku]',
      stockStatus: '.stock-status, [class*="availability"]',
      nextPage: '.pages-item-next a, [class*="next"]',
    },
    pagination: {
      type: 'query',
      param: 'p',
      maxPages: 10,
    },
    rateLimit: 3000,
  },

  'electrical-direct': {
    name: 'ElectricalDirect',
    slug: 'electrical-direct',
    baseUrl: 'https://www.electricaldirect.co.uk',
    categoryUrls: {
      'test-equipment': [
        '/test-equipment',
      ],
      'cable-accessories': [
        '/cable-accessories',
      ],
    },
    dealsUrl: '/deals',
    couponsUrl: '/voucher-codes',
    selectors: {
      productCard: '.product-item, [class*="product-card"]',
      productName: '.product-item-name, h3 a',
      productPrice: '.price, [class*="price-now"]',
      originalPrice: '.old-price, [class*="was"]',
      productImage: '.product-image img',
      productUrl: 'a.product-item-link, a[href*="/p/"]',
      productSku: '[data-sku], [data-product-id]',
      stockStatus: '.stock, [class*="availability"]',
      nextPage: '.next, [class*="pagination-next"]',
    },
    pagination: {
      type: 'query',
      param: 'page',
      maxPages: 10,
    },
    rateLimit: 2000,
  },

  'rs-components': {
    name: 'RS Components',
    slug: 'rs-components',
    baseUrl: 'https://uk.rs-online.com',
    categoryUrls: {
      'test-equipment': [
        '/web/c/test-measurement/',
      ],
      'hand-tools': [
        '/web/c/hand-tools/',
      ],
      'power-tools': [
        '/web/c/power-tools/',
      ],
    },
    dealsUrl: '/web/c/offers/',
    couponsUrl: null,
    selectors: {
      productCard: '.product-tile, [class*="ProductCard"], [data-testid*="product"]',
      productName: '.product-tile__name, h3 a, [class*="product-name"]',
      productPrice: '.price__current, [class*="price-now"]',
      originalPrice: '.price__was, [class*="was"]',
      productImage: '.product-tile__image img, img[src*="rs-online"]',
      productUrl: 'a.product-tile__link, a[href*="/p/"]',
      productSku: '[data-stock-number], [data-sku]',
      stockStatus: '.availability-status, [class*="stock"]',
      nextPage: '.pagination__next, [class*="next"]',
    },
    pagination: {
      type: 'query',
      param: 'pn',
      maxPages: 10,
    },
    rateLimit: 3000,
  },

  'tlc-electrical': {
    name: 'TLC Electrical',
    slug: 'tlc-electrical',
    baseUrl: 'https://www.tlc-direct.co.uk',
    categoryUrls: {
      // === TOOLS ===
      'test-equipment': [
        '/Catalogue/Test_Equipment',
        '/Catalogue/Testers_Meters',
      ],
      'hand-tools': [
        '/Catalogue/Hand_Tools',
        '/Catalogue/Electricians_Tools',
      ],
      // === MATERIALS (TLC Direct is primarily electrical wholesale) ===
      'cables': [
        '/Catalogue/Cable',
        '/Catalogue/Twin_and_Earth',
        '/Catalogue/Flex',
        '/Catalogue/SWA_Cable',
        '/Catalogue/Data_Cable',
      ],
      'consumer-units': [
        '/Catalogue/Consumer_Units',
        '/Catalogue/Distribution_Boards',
        '/Catalogue/Enclosures',
      ],
      'circuit-protection': [
        '/Catalogue/MCBs',
        '/Catalogue/RCDs',
        '/Catalogue/RCBOs',
        '/Catalogue/AFDDs',
        '/Catalogue/Surge_Protection',
      ],
      'wiring-accessories': [
        '/Catalogue/Wiring_Accessories',
        '/Catalogue/Switches_Sockets',
        '/Catalogue/Grid_Systems',
        '/Catalogue/Back_Boxes',
      ],
      'lighting': [
        '/Catalogue/Lighting',
        '/Catalogue/LED_Lighting',
        '/Catalogue/Emergency_Lighting',
        '/Catalogue/Downlights',
        '/Catalogue/Battens',
      ],
      'containment': [
        '/Catalogue/Cable_Management',
        '/Catalogue/Trunking',
        '/Catalogue/Conduit',
        '/Catalogue/Cable_Tray',
      ],
      'earthing': [
        '/Catalogue/Earthing_Bonding',
        '/Catalogue/Earth_Rods',
      ],
      'fire-security': [
        '/Catalogue/Fire_Alarms',
        '/Catalogue/Smoke_Detectors',
        '/Catalogue/Security',
      ],
      'ev-charging': [
        '/Catalogue/EV_Charging',
      ],
      'data-networking': [
        '/Catalogue/Data_Communications',
        '/Catalogue/Structured_Cabling',
      ],
      'fixings': [
        '/Catalogue/Fixings',
        '/Catalogue/Cable_Clips',
        '/Catalogue/Cable_Glands',
      ],
    },
    dealsUrl: '/sale',
    couponsUrl: null,
    selectors: {
      productCard: '.product-item, tr[class*="product"], [class*="prod-row"]',
      productName: '.product-name, td a, [class*="prod-title"]',
      productPrice: '.product-price, [class*="price"]',
      originalPrice: '.was-price, [class*="was"]',
      productImage: '.product-image img, img[src*="tlc-direct"]',
      productUrl: 'a.product-link, a[href*=".html"]',
      productSku: '.product-code, [class*="code"]',
      stockStatus: '.stock-level, [class*="stock"]',
      nextPage: '.next-page, [class*="next"]',
    },
    pagination: {
      type: 'query',
      param: 'page',
      maxPages: 10,
    },
    rateLimit: 2000,
  },

  edmundson: {
    name: 'Edmundson Electrical',
    slug: 'edmundson',
    baseUrl: 'https://www.edmundson-electrical.co.uk',
    categoryUrls: {
      // === MATERIALS (Edmundson is primarily electrical wholesale) ===
      'cables': [
        '/search?q=twin+earth+cable',
        '/search?q=armoured+cable',
        '/search?q=flex+cable',
        '/search?q=data+cable+cat6',
      ],
      'consumer-units': [
        '/search?q=consumer+unit',
        '/search?q=distribution+board',
      ],
      'circuit-protection': [
        '/search?q=mcb',
        '/search?q=rcbo',
        '/search?q=rcd',
        '/search?q=surge+protection',
      ],
      'wiring-accessories': [
        '/search?q=socket+outlet',
        '/search?q=light+switch',
        '/search?q=back+box',
      ],
      'lighting': [
        '/search?q=led+downlight',
        '/search?q=led+panel',
        '/search?q=emergency+lighting',
        '/search?q=batten+light',
      ],
      'containment': [
        '/search?q=cable+trunking',
        '/search?q=conduit',
        '/search?q=cable+tray',
      ],
      'earthing': [
        '/search?q=earth+rod',
        '/search?q=earth+clamp',
      ],
      'fire-security': [
        '/search?q=smoke+alarm',
        '/search?q=fire+alarm',
      ],
      'ev-charging': [
        '/search?q=ev+charger',
      ],
      'data-networking': [
        '/search?q=cat6+cable',
        '/search?q=data+socket',
      ],
      'fixings': [
        '/search?q=cable+clip',
        '/search?q=cable+gland',
        '/search?q=cable+tie',
      ],
      // === TOOLS ===
      'test-equipment': [
        '/search?q=multimeter',
        '/search?q=insulation+tester',
        '/search?q=fluke',
      ],
      'hand-tools': [
        '/search?q=electricians+tools',
        '/search?q=cable+cutter',
      ],
    },
    dealsUrl: '/offers',
    couponsUrl: null,
    selectors: {
      productCard: '[class*="product-card"], [class*="product-item"], article',
      productName: 'h2, h3, h4, [class*="name"], [class*="title"]',
      productPrice: '[class*="price"]',
      originalPrice: '[class*="was"], [class*="old"]',
      productImage: 'img',
      productUrl: 'a[href*="/product/"]',
      productSku: '[data-sku], [data-product-id]',
      stockStatus: '[class*="stock"]',
      nextPage: '[class*="next"]',
    },
    pagination: {
      type: 'scroll',
      maxPages: 5,
    },
    rateLimit: 3000,
  },

  yesss: {
    name: 'Yesss Electrical',
    slug: 'yesss',
    baseUrl: 'https://www.yesss.co.uk',
    categoryUrls: {
      // === MATERIALS ===
      'cables': [
        '/search?q=twin+earth+cable',
        '/search?q=armoured+cable',
        '/search?q=flex+cable',
      ],
      'consumer-units': [
        '/search?q=consumer+unit',
        '/search?q=distribution+board',
      ],
      'circuit-protection': [
        '/search?q=mcb',
        '/search?q=rcbo',
        '/search?q=rcd',
      ],
      'wiring-accessories': [
        '/search?q=socket',
        '/search?q=switch',
        '/search?q=back+box',
      ],
      'lighting': [
        '/search?q=led+downlight',
        '/search?q=emergency+light',
        '/search?q=batten',
      ],
      'containment': [
        '/search?q=trunking',
        '/search?q=conduit',
        '/search?q=cable+tray',
      ],
      'earthing': [
        '/search?q=earth+rod',
        '/search?q=earth+clamp',
      ],
      'fire-security': [
        '/search?q=smoke+detector',
        '/search?q=fire+alarm',
      ],
      'ev-charging': [
        '/search?q=ev+charger',
      ],
      'data-networking': [
        '/search?q=cat6',
        '/search?q=data+socket',
      ],
      'fixings': [
        '/search?q=cable+clip',
        '/search?q=cable+gland',
      ],
      // === TOOLS ===
      'test-equipment': [
        '/search?q=multimeter',
        '/search?q=tester',
      ],
      'hand-tools': [
        '/search?q=electrician+tools',
      ],
    },
    dealsUrl: '/offers',
    couponsUrl: null,
    selectors: {
      productCard: '[class*="product-card"], [class*="product-item"], article',
      productName: 'h4, h3, h2, [class*="name"], [class*="title"]',
      productPrice: '[class*="price"]',
      originalPrice: '[class*="was"], [class*="old"]',
      productImage: 'img',
      productUrl: 'a[href*="/product/"]',
      productSku: '[data-sku], [data-product-id]',
      stockStatus: '[class*="stock"]',
      nextPage: '[class*="next"]',
    },
    pagination: {
      type: 'scroll',
      maxPages: 5,
    },
    rateLimit: 3000,
  },

  'electric-center': {
    name: 'Electric Center',
    slug: 'electric-center',
    baseUrl: 'https://www.electric-center.com',
    categoryUrls: {
      // === MATERIALS ===
      'cables': [
        '/search?q=twin+earth+cable',
        '/search?q=armoured+cable',
        '/search?q=flex+cable',
      ],
      'consumer-units': [
        '/search?q=consumer+unit',
        '/search?q=distribution+board',
      ],
      'circuit-protection': [
        '/search?q=mcb',
        '/search?q=rcbo',
        '/search?q=rcd',
      ],
      'wiring-accessories': [
        '/search?q=socket',
        '/search?q=switch',
        '/search?q=back+box',
      ],
      'lighting': [
        '/search?q=led+downlight',
        '/search?q=emergency+lighting',
        '/search?q=batten',
      ],
      'containment': [
        '/search?q=trunking',
        '/search?q=conduit',
        '/search?q=cable+tray',
      ],
      'earthing': [
        '/search?q=earth+rod',
        '/search?q=earth+clamp',
      ],
      'fire-security': [
        '/search?q=smoke+detector',
        '/search?q=fire+alarm',
      ],
      'ev-charging': [
        '/search?q=ev+charger',
      ],
      'data-networking': [
        '/search?q=cat6',
        '/search?q=data+socket',
      ],
      'fixings': [
        '/search?q=cable+clip',
        '/search?q=cable+gland',
      ],
      // === TOOLS ===
      'test-equipment': [
        '/search?q=multimeter',
        '/search?q=tester',
      ],
      'hand-tools': [
        '/search?q=electrician+tools',
      ],
    },
    dealsUrl: '/offers',
    couponsUrl: null,
    selectors: {
      productCard: '[class*="product-card"], [class*="product-item"], article',
      productName: 'h2, h3, h4, [class*="name"], [class*="title"]',
      productPrice: '[class*="price"]',
      originalPrice: '[class*="was"], [class*="old"]',
      productImage: 'img',
      productUrl: 'a[href*="/product/"]',
      productSku: '[data-sku], [data-product-id]',
      stockStatus: '[class*="stock"]',
      nextPage: '[class*="next"]',
    },
    pagination: {
      type: 'scroll',
      maxPages: 5,
    },
    rateLimit: 3000,
  },

  rexel: {
    name: 'Rexel',
    slug: 'rexel',
    baseUrl: 'https://www.rfrelectrical.co.uk',
    categoryUrls: {
      // === MATERIALS ===
      'cables': [
        '/search?q=twin+earth+cable',
        '/search?q=armoured+cable',
        '/search?q=flex+cable',
      ],
      'consumer-units': [
        '/search?q=consumer+unit',
        '/search?q=distribution+board',
      ],
      'circuit-protection': [
        '/search?q=mcb',
        '/search?q=rcbo',
        '/search?q=rcd',
      ],
      'wiring-accessories': [
        '/search?q=socket',
        '/search?q=switch',
        '/search?q=back+box',
      ],
      'lighting': [
        '/search?q=led+downlight',
        '/search?q=emergency+lighting',
        '/search?q=batten',
      ],
      'containment': [
        '/search?q=trunking',
        '/search?q=conduit',
        '/search?q=cable+tray',
      ],
      'earthing': [
        '/search?q=earth+rod',
        '/search?q=earth+clamp',
      ],
      'fire-security': [
        '/search?q=smoke+detector',
        '/search?q=fire+alarm',
      ],
      'ev-charging': [
        '/search?q=ev+charger',
      ],
      'data-networking': [
        '/search?q=cat6',
        '/search?q=data+socket',
      ],
      'fixings': [
        '/search?q=cable+clip',
        '/search?q=cable+gland',
      ],
      // === TOOLS ===
      'test-equipment': [
        '/search?q=multimeter',
        '/search?q=tester',
      ],
      'hand-tools': [
        '/search?q=electrician+tools',
      ],
    },
    dealsUrl: '/offers',
    couponsUrl: null,
    selectors: {
      productCard: '[class*="product-card"], [class*="product-item"], article',
      productName: 'h2, h3, h4, [class*="name"], [class*="title"]',
      productPrice: '[class*="price"]',
      originalPrice: '[class*="was"], [class*="old"]',
      productImage: 'img',
      productUrl: 'a[href*="/product/"]',
      productSku: '[data-sku], [data-product-id]',
      stockStatus: '[class*="stock"]',
      nextPage: '[class*="next"]',
    },
    pagination: {
      type: 'scroll',
      maxPages: 5,
    },
    rateLimit: 3000,
  },
};

export const getSupplierConfig = (slug: string): SupplierConfig | null => {
  return SUPPLIERS[slug] || null;
};

export const getAllSupplierSlugs = (): string[] => {
  return Object.keys(SUPPLIERS);
};
