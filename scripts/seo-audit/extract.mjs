// File-level AST extraction for the SEO audit pipeline.
// Uses TypeScript's own parser (already a project dep) so we don't add new
// packages. Returns a normalised PageExtract per file with everything the
// scoring engine needs.

import ts from 'typescript';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const SEO_PAGES_DIR_DEFAULT = 'src/pages/seo';
const SEO_ROUTES_FILE_DEFAULT = 'src/routes/SEORoutes.tsx';

// Components that gate content behind auth. If a tool component renders
// inside any of these, criterion 6 (tool_unauthenticated) fails.
const AUTH_GATE_COMPONENTS = new Set([
  'AuthGate',
  'RequireAuth',
  'RequireSubscription',
  'SubscriptionGate',
  'ProUser',
  'ProtectedRoute',
  'PaywallGate',
  'PremiumGate',
]);

// Heuristic: anything imported from these paths is treated as an interactive
// tool / calculator component. If a page renders at least one, criterion 5
// (tool_present) passes.
const TOOL_IMPORT_PREFIXES = [
  '@/components/calculators',
  '@/components/electrician-tools',
  '@/components/tools',
  '@/components/apprentice/calculators',
  '@/components/apprentice/tools',
  '@/components/business-development/tools',
  '@/components/inspection-app',
  '@/components/testing',
  '@/lib/calculators',
];

// Fallback: any import path matching one of these substrings is treated as
// a tool, regardless of where it lives in the tree.
const TOOL_IMPORT_SUBSTRINGS = [
  '/calculators/',
  '/calculator/',
  '/Calculator',
  '/scanners/',
];

// Templates we already know — used to recognise template-driven pages
const TEMPLATE_NAMES = new Set([
  'GuideTemplate',
  'ToolTemplate',
  'ComparisonTemplate',
  'CourseTemplate',
  'BusinessTemplate',
]);

// Regex for BS 7671 cites — covers "Regulation 411.3.2.1", "Reg 411.3", and
// "Section 705" forms. Tightened so generic numbers like "411" don't match.
const CITE_REGEX = /(?:Regulation|Reg\.?|Section|BS\s*7671\s*Regulation)\s+(\d+(?:\.\d+)+|\d{3})\b/gi;

// Internal links — relative paths starting with '/'.
// Catches BOTH JSX attribute form `href="/..."` AND object-literal form
// `href: '/...'` (used heavily in relatedPages arrays).
const INTERNAL_LINK_JSX_REGEX = /href\s*=\s*["'](\/[^"'\s]*)["']/g;
const INTERNAL_LINK_OBJ_REGEX = /\bhref\s*:\s*['"](\/[^'"\s]*)['"]/g;

// ---------------------------------------------------------------------------
// Route map — slug ↔ source file
// ---------------------------------------------------------------------------
export function loadRouteMap(routesFile = SEO_ROUTES_FILE_DEFAULT) {
  const src = readFileSync(routesFile, 'utf-8');
  const componentToImportName = new Map(); // ComponentVar → 'AdiabaticEquationCalculatorPage'
  const importRe =
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*['"]@\/pages\/seo\/(\w+)['"]\s*\)\s*\)/g;
  let m;
  while ((m = importRe.exec(src)) !== null) {
    componentToImportName.set(m[1], m[2]);
  }

  // Pair routes: path="..." then <ComponentVar ...>
  const slugToFile = new Map();
  const fileToSlug = new Map();
  const routeRe = /path="([^"]+)"[\s\S]*?<(\w+)\s*\/>/g;
  while ((m = routeRe.exec(src)) !== null) {
    const slug = m[1];
    const componentVar = m[2];
    const importedName = componentToImportName.get(componentVar);
    if (!importedName) continue;
    const file = `src/pages/seo/${importedName}.tsx`;
    slugToFile.set(slug, file);
    fileToSlug.set(file, slug);
  }
  return { slugToFile, fileToSlug };
}

// ---------------------------------------------------------------------------
// AST walk helpers
// ---------------------------------------------------------------------------

function findStringLiteralProp(propsNode, propName) {
  // Looks through JsxAttributes for a given prop, returns its string literal value
  if (!propsNode || !propsNode.properties) return null;
  for (const prop of propsNode.properties) {
    if (!prop.name) continue;
    if (prop.name.escapedText !== propName) continue;
    const init = prop.initializer;
    if (!init) continue;
    if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) {
      return init.text;
    }
    // title={`literal`}
    if (ts.isJsxExpression(init) && init.expression) {
      const expr = init.expression;
      if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
        return expr.text;
      }
    }
  }
  return null;
}

function findJsxAttribute(jsxOpeningOrSelfClosingNode, name) {
  if (!jsxOpeningOrSelfClosingNode) return null;
  // node.attributes is a JsxAttributes object; its .properties array holds the JsxAttribute nodes
  const attrs = jsxOpeningOrSelfClosingNode.attributes;
  if (!attrs || !attrs.properties) return null;
  for (const attr of attrs.properties) {
    if (ts.isJsxAttribute(attr) && attr.name && attr.name.escapedText === name) {
      return attr;
    }
  }
  return null;
}

function getStringFromJsxAttribute(attr) {
  if (!attr || !attr.initializer) return null;
  const init = attr.initializer;
  if (ts.isStringLiteral(init)) return init.text;
  if (ts.isJsxExpression(init) && init.expression) {
    const e = init.expression;
    if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) return e.text;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Per-file extract
// ---------------------------------------------------------------------------

// Page-type inference signals from the slug (read from the route map at
// audit time). When the slug starts with /guides/ the page is a guide,
// full stop — regardless of what the filename suggests.
function pageTypeFromSlug(slug) {
  if (!slug) return null;
  if (slug.startsWith('/guides/')) return 'guide';
  if (slug.startsWith('/training/')) return 'training';
  if (slug.startsWith('/compare/')) return 'comparison';
  if (slug.startsWith('/certificates/')) return 'cert';
  return null;
}

// Wrapper-page handling: when a page renders <GeneratedGuidePage config={x}>
// the audit must follow the config import to see the actual content.
// Otherwise the audit gives misleading "thin page" verdicts for what are
// in fact full content pages.
function resolveConfigImport(sourceText, sourceFile) {
  const usesGenerated = /<GeneratedGuidePage\s+config=\{(\w+)\}/.exec(sourceText);
  if (!usesGenerated) return null;
  const configVar = usesGenerated[1];

  // Find the import statement that brings configVar in
  const importRe = new RegExp(
    `import\\s*\\{[^}]*\\b${configVar}\\b[^}]*\\}\\s*from\\s*['"]([^'"]+)['"]`,
    'm',
  );
  const importMatch = importRe.exec(sourceText);
  if (!importMatch) return null;

  let configPath = importMatch[1];
  // Strip @/ alias to absolute path within src/
  if (configPath.startsWith('@/')) {
    configPath = configPath.replace('@/', 'src/');
  } else if (configPath.startsWith('./') || configPath.startsWith('../')) {
    // Relative — resolve against the source file directory
    const srcDir = sourceFile.replace(/\/[^/]+$/, '');
    configPath = `${srcDir}/${configPath.replace(/^\.\//, '')}`;
  }
  // Append .ts if missing
  if (!configPath.endsWith('.ts') && !configPath.endsWith('.tsx')) {
    configPath = configPath + '.ts';
  }
  // Walk up to project root for absolute path
  if (!configPath.startsWith('/')) {
    const root = sourceFile.includes('src/pages/seo/')
      ? sourceFile.replace(/src\/pages\/seo\/.*$/, '')
      : '';
    configPath = root + configPath;
  }
  if (!existsSync(configPath)) {
    // Try sibling generated/ directory
    const altPath = configPath.replace('src/', `src/pages/seo/generated/`).replace(/^src\/pages\/seo\/generated\/src\/pages\/seo\/generated\//, 'src/pages/seo/generated/');
    if (existsSync(altPath)) return altPath;
    return null;
  }
  return configPath;
}

export function extractPage(filePath) {
  let sourceText = readFileSync(filePath, 'utf-8');
  const originalWrapperText = sourceText;

  // If this is a thin GeneratedGuidePage wrapper, follow the config import
  // and append its content to the body text the AST visits — so word count,
  // internal links and BS7671 cites are counted against the config too.
  const configFilePath = resolveConfigImport(sourceText, filePath);
  if (configFilePath) {
    try {
      sourceText = sourceText + '\n\n// --- config content (audited) ---\n' + readFileSync(configFilePath, 'utf-8');
    } catch {
      /* ignore — read failures fall back to wrapper-only audit */
    }
  }

  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const data = {
    sourceFile: filePath,
    fileName: basename(filePath),
    title: null,
    description: null,
    h1Detected: false,
    breadcrumbs: [],
    templateUsed: null,
    pageType: 'other', // tool|guide|hub|comparison|calculator|cert|training|other
    bs7671Cites: [],
    internalLinks: [],
    externalLinks: [],
    toolComponentImports: [],
    toolComponentRendered: false,
    toolInsideAuthGate: false,
    wordCount: 0,
    audience: [],
    schemaTypes: [],   // ['Article','FAQPage','HowTo'] etc — from SEOSchemas calls
    hasUseSEO: false,
    hasHelmet: false,
    rawCharCount: sourceText.length,
  };

  // Word count — strip code/comments-ish. Cheap heuristic: extract string + template literals.
  // For audit purposes we want body word count not full source word count.
  let bodyText = '';

  // ---- Walk the AST ----
  const visit = (node) => {
    // Imports — collect tool component imports + check for helmet/useSEO
    if (ts.isImportDeclaration(node)) {
      const mod = node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)
        ? node.moduleSpecifier.text
        : '';
      if (mod === 'react-helmet' || mod === '@unhead/react/helmet') data.hasHelmet = true;
      if (mod === '@/hooks/useSEO' || mod === '@/hooks/useSEO.ts') data.hasUseSEO = true;
      const isToolImport =
        TOOL_IMPORT_PREFIXES.some((p) => mod.startsWith(p)) ||
        TOOL_IMPORT_SUBSTRINGS.some((s) => mod.includes(s));
      if (isToolImport) {
        if (node.importClause && node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
          for (const spec of node.importClause.namedBindings.elements) {
            data.toolComponentImports.push(spec.name.escapedText);
          }
        } else if (node.importClause && node.importClause.name) {
          data.toolComponentImports.push(node.importClause.name.escapedText);
        }
      }
    }

    // Top-level const PAGE_TITLE / PAGE_DESCRIPTION
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!decl.name || !ts.isIdentifier(decl.name)) continue;
        const init = decl.initializer;
        if (!init) continue;
        const isStr =
          ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init);
        const value = isStr ? init.text : null;
        if (decl.name.escapedText === 'PAGE_TITLE' && value) {
          data.title = data.title || value;
        }
        if (decl.name.escapedText === 'PAGE_DESCRIPTION' && value) {
          data.description = data.description || value;
        }
      }
    }

    // JSX element handling — find template props, H1, links, tool rendering,
    // auth gates wrapping tools, schema types
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = node.tagName && ts.isIdentifier(node.tagName)
        ? node.tagName.escapedText
        : null;

      if (tagName) {
        // <h1>
        if (tagName === 'h1') data.h1Detected = true;

        // Template usage — pull title, description from the template props
        if (TEMPLATE_NAMES.has(tagName)) {
          data.templateUsed = tagName;
          const titleAttr = findJsxAttribute(node, 'title');
          const descAttr = findJsxAttribute(node, 'description');
          const t = getStringFromJsxAttribute(titleAttr);
          const d = getStringFromJsxAttribute(descAttr);
          if (t) data.title = data.title || t;
          if (d) data.description = data.description || d;
        }

        // Tool component rendered?
        if (data.toolComponentImports.includes(tagName)) {
          data.toolComponentRendered = true;
        }

        // Auth gate wrapping any tool component — heuristic: if tagName is
        // an auth gate, check children for tool components
        if (AUTH_GATE_COMPONENTS.has(tagName)) {
          // Mark this region as gated; flagged on tools rendered as descendants
          data._currentAuthGate = true;
        }
      }
    }
    if (ts.isJsxClosingElement(node)) {
      const tagName = node.tagName && ts.isIdentifier(node.tagName)
        ? node.tagName.escapedText
        : null;
      if (tagName && AUTH_GATE_COMPONENTS.has(tagName)) {
        data._currentAuthGate = false;
      }
    }

    // SEOSchemas.<type>(...) calls — capture schema variety
    if (ts.isCallExpression(node)) {
      const expr = node.expression;
      if (
        ts.isPropertyAccessExpression(expr) &&
        ts.isIdentifier(expr.expression) &&
        expr.expression.escapedText === 'SEOSchemas'
      ) {
        data.schemaTypes.push(expr.name.escapedText);
      }
    }

    // Internal vs external href text — collect from any string literal that
    // looks like a URL or path
    if (ts.isStringLiteral(node) || ts.isJsxText(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      bodyText += ' ' + (node.text || '');
    }

    ts.forEachChild(node, visit);
  };
  visit(sf);

  // Internal links — JSX attribute form (href="/...") + object-literal form (href: '/...').
  // Dedupe so a relatedPages entry counted once even if referenced twice.
  const linkSet = new Set();
  let lm;
  while ((lm = INTERNAL_LINK_JSX_REGEX.exec(sourceText)) !== null) linkSet.add(lm[1]);
  INTERNAL_LINK_JSX_REGEX.lastIndex = 0;
  while ((lm = INTERNAL_LINK_OBJ_REGEX.exec(sourceText)) !== null) linkSet.add(lm[1]);
  INTERNAL_LINK_OBJ_REGEX.lastIndex = 0;
  data.internalLinks = [...linkSet];

  // BS 7671 cites — from full source text (handles JSX content)
  let cm;
  const citeSet = new Set();
  while ((cm = CITE_REGEX.exec(sourceText)) !== null) {
    citeSet.add(cm[1]);
  }
  CITE_REGEX.lastIndex = 0;
  data.bs7671Cites = [...citeSet];

  // Page type inference — slug-based wins over filename-based when available
  data.pageType = inferPageType(data, filePath);

  // Audience inference (cheap heuristic on file name + body text)
  data.audience = inferAudience(data, filePath, sourceText);

  // Word count from extracted body text (strips most code, keeps strings)
  data.wordCount = bodyText
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1).length;

  return data;
}

function inferPageType(data, filePath) {
  const fn = basename(filePath).toLowerCase();
  const fnRaw = basename(filePath);

  // Promotional / feature-landing pages that exist to sell features —
  // they're not standalone calcs. App-store landings, "best X" comparisons,
  // partnership pages, insurance / business / website / SEO landings.
  const isPromoLanding =
    /AppWithAI|AppIphone|OfflineElectricalApp|LearningVideos|BoardScanner|TestingCalculators/i.test(fnRaw) ||
    /Insurance|Partnership|Valuation|Website|^SEO|^BestElectrician|^ElectricalApp|^ElectricianApp|^OfflineElectrical/.test(fnRaw);
  if (isPromoLanding) return 'hub';

  // AI feature landing pages — these promote AI agents/tools that require
  // auth + cloud. They're NOT standalone calculators; they're hub pages.
  // Detect by AI prefix in filename + presence of "tool"/"agent"/etc words.
  const isAiFeature =
    /^AI[A-Z]/.test(fnRaw) ||
    fnRaw.startsWith('Mate') ||
    /^Elec(AI|Mate)/.test(fnRaw);
  if (isAiFeature) return 'hub';

  // Business-feature pages — Elec-Mate's in-app business management tools
  // (CV builder, customer management, business analytics, capacity planning
  // etc). They're authenticated multi-page features, not standalone calcs.
  // Classify as hub so the audit doesn't flag them for missing a calc.
  const isBusinessFeature =
    /Builder|Manager|Management|Dashboard|Analytics|ProfessionalCard|ElecID|Studio|Portal|Library|Inbox|Booking|Workflow|Pipeline/i.test(fnRaw) ||
    /^(College|Employer|Business|Customer|Spark|Quote|Invoice|RAMS|Photo|Snagging|Schedule|Material|Inventory|Vacancy|Expense|Compliance|CPD)/.test(fnRaw);
  if (isBusinessFeature) return 'hub';

  // Comparison
  if (data.templateUsed === 'ComparisonTemplate' || fn.includes('vs') || fn.includes('compare')) {
    return 'comparison';
  }

  // True standalone calculators — filename contains "calculator" AND the
  // page actually imports a calc component (we check toolComponentImports
  // later, but here use the import list directly)
  if (fn.includes('calculator') && data.toolComponentImports.length > 0) return 'calculator';

  // Calculator pages that don't yet embed a calc — still calculator type so
  // the audit correctly flags them as missing the calc.
  if (fn.includes('calculator')) return 'calculator';

  // Course/training pages
  if (data.templateUsed === 'CourseTemplate' || fn.includes('course') || fn.includes('training')) {
    return 'training';
  }

  // Cert pages
  if (fn.includes('certificate') || (fn.endsWith('certpage.tsx') || fn.includes('-cert-'))) {
    return 'cert';
  }

  // Hub pages
  if (fn.includes('hub')) return 'hub';

  // Generic "tool" pages that aren't AI features and aren't calculators
  if (data.templateUsed === 'ToolTemplate' || fn.includes('tool')) return 'tool';

  // Business tool/landing pages
  if (data.templateUsed === 'BusinessTemplate' || fn.includes('business')) return 'tool';

  // Guides — default for anything matching guide keywords or GuideTemplate
  if (data.templateUsed === 'GuideTemplate' || fn.includes('guide')) return 'guide';

  return 'other';
}

function inferAudience(data, filePath, sourceText) {
  const audience = new Set();
  const fn = basename(filePath).toLowerCase();
  const body = sourceText.toLowerCase();
  if (fn.includes('apprentice') || body.includes('apprentice')) audience.add('apprentice');
  if (fn.includes('college') || body.includes('college tutor') || body.includes('city & guilds') || body.includes('city and guilds')) {
    audience.add('college');
  }
  if (fn.includes('employer') || fn.includes('business') || body.includes('employer')) audience.add('employer');
  // Default — electrician is the broad audience
  if (audience.size === 0) audience.add('electrician');
  // Apprentice/college pages typically also useful for electricians
  if (audience.has('apprentice') || audience.has('college')) audience.add('electrician');
  return [...audience];
}

// ---------------------------------------------------------------------------
// Bulk extract
// ---------------------------------------------------------------------------

export function listSeoFiles(seoDir = SEO_PAGES_DIR_DEFAULT) {
  if (!existsSync(seoDir)) throw new Error(`SEO dir not found: ${seoDir}`);
  return readdirSync(seoDir)
    .filter((f) => f.endsWith('.tsx'))
    .filter((f) => {
      const full = join(seoDir, f);
      try {
        return statSync(full).isFile();
      } catch {
        return false;
      }
    })
    .map((f) => join(seoDir, f));
}
