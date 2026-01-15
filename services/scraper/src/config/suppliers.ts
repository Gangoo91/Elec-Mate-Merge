/**
 * Supplier Configuration
 * Defines all suppliers and their scraping selectors/URLs
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
    },
    dealsUrl: '/search?search=deals&page_size=100',
    couponsUrl: null,
    selectors: {
      productCard: '[data-product-id], .product-card',
      productName: '.product-card__title, [data-test-id="product-name"]',
      productPrice: '.product-card__price-now, .price--current',
      originalPrice: '.product-card__price-was, .price--was',
      productImage: '.product-card__image img, [data-test-id="product-image"] img',
      productUrl: 'a[href*="/p/"]',
      productSku: '[data-product-code], [data-sku]',
      stockStatus: '.stock-indicator, .availability-status',
      nextPage: '.pagination__next, [data-test-id="pagination-next"]',
      brand: '.brand-name, [data-brand]',
    },
    pagination: {
      type: 'query',
      param: 'page',
      maxPages: 10,
    },
    rateLimit: 2000, // 2 seconds between requests
  },

  toolstation: {
    name: 'Toolstation',
    slug: 'toolstation',
    baseUrl: 'https://www.toolstation.com',
    categoryUrls: {
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
    },
    dealsUrl: '/deals',
    couponsUrl: null,
    selectors: {
      productCard: '.product-card, [data-testid="product-card"]',
      productName: '.product-card__title, .product-name',
      productPrice: '.product-card__price, .price-now',
      originalPrice: '.product-card__price--was, .price-was',
      productImage: '.product-card__image img',
      productUrl: 'a.product-card__link',
      productSku: '[data-product-code]',
      stockStatus: '.stock-status',
      nextPage: '.pagination-next, [aria-label="Next page"]',
      brand: '.product-brand',
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
      'hand-tools': [
        '/catalogue/products/hand-tools',
      ],
      'power-tools': [
        '/catalogue/products/power-tools',
      ],
      'test-equipment': [
        '/catalogue/products/test-measurement',
      ],
    },
    dealsUrl: '/offers',
    couponsUrl: null,
    selectors: {
      productCard: '.product-item, .product-card',
      productName: '.product-item-name, .product-title',
      productPrice: '.price-box .price, .product-price',
      originalPrice: '.old-price .price',
      productImage: '.product-image img',
      productUrl: 'a.product-item-link',
      productSku: '[data-product-sku]',
      stockStatus: '.stock-status',
      nextPage: '.pages-item-next a',
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
      productCard: '.product-item',
      productName: '.product-item-name',
      productPrice: '.price',
      originalPrice: '.old-price',
      productImage: '.product-image img',
      productUrl: 'a.product-item-link',
      productSku: '[data-sku]',
      stockStatus: '.stock',
      nextPage: '.next',
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
      productCard: '.product-tile',
      productName: '.product-tile__name',
      productPrice: '.price__current',
      originalPrice: '.price__was',
      productImage: '.product-tile__image img',
      productUrl: 'a.product-tile__link',
      productSku: '[data-stock-number]',
      stockStatus: '.availability-status',
      nextPage: '.pagination__next',
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
      'test-equipment': [
        '/main/section_T.html',
      ],
      'cables': [
        '/main/section_C.html',
      ],
    },
    dealsUrl: '/sale',
    couponsUrl: null,
    selectors: {
      productCard: '.product-item',
      productName: '.product-name',
      productPrice: '.product-price',
      originalPrice: '.was-price',
      productImage: '.product-image img',
      productUrl: 'a.product-link',
      productSku: '.product-code',
      stockStatus: '.stock-level',
      nextPage: '.next-page',
    },
    pagination: {
      type: 'query',
      param: 'page',
      maxPages: 10,
    },
    rateLimit: 2000,
  },
};

export const getSupplierConfig = (slug: string): SupplierConfig | null => {
  return SUPPLIERS[slug] || null;
};

export const getAllSupplierSlugs = (): string[] => {
  return Object.keys(SUPPLIERS);
};
