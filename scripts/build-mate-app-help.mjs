#!/usr/bin/env node
/**
 * Builds Mate's knowledge of the app: every page's "How it works" help
 * (PageHelpContent constants — what the page is for, steps and tasks that
 * name the real buttons) plus the page index from src/config/searchablePages.ts
 * (name, path, section, keywords), into one JSON the tasks-ai-assistant edge
 * function searches. Mate was answering "how do I…" questions from nothing:
 * "how can I disconnect Stripe" got a safe-isolation procedure (10 Oct 2026).
 *
 *   node scripts/build-mate-app-help.mjs
 *   → supabase/functions/_shared/mate-app-help.json
 *
 * Re-run after changing page help, then redeploy tasks-ai-assistant.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'supabase/functions/_shared/mate-app-help.json');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'seo') continue;
      walk(p, out);
    } else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

/** Visible text of an expression: strings, templates and JSX text. */
function text(node) {
  if (!node) return '';
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return node.head.text + node.templateSpans.map((s) => ' … ' + s.literal.text).join('');
  }
  if (ts.isJsxText(node)) return node.text;
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression?.(node)
  )
    return text(node.expression);
  if (ts.isJsxExpression(node)) return text(node.expression);
  if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
    return node.children.map(text).join('').replace(/\s+/g, ' ');
  }
  if (ts.isJsxSelfClosingElement(node)) return '';
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)
    return text(node.left) + text(node.right);
  return '';
}

function prop(obj, name) {
  if (!obj || !ts.isObjectLiteralExpression(obj)) return undefined;
  const p = obj.properties.find(
    (x) => ts.isPropertyAssignment(x) && (x.name.text ?? x.name.escapedText) === name
  );
  return p?.initializer;
}

function arr(node) {
  return node && ts.isArrayLiteralExpression(node) ? node.elements : [];
}

const clean = (s) => s.replace(/\s+/g, ' ').trim();
/** A "title: body" line where both halves came out empty is dropped. */
const hasText = (s) => s.replace(/[:\s]/g, '').length > 0;

const helps = [];
for (const file of walk(SRC)) {
  const code = fs.readFileSync(file, 'utf8');
  if (!code.includes('PageHelpContent')) continue;
  const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.initializer) {
      const typeText = node.type ? node.type.getText(sf) : '';
      let init = node.initializer;
      if (ts.isSatisfiesExpression?.(init) || ts.isAsExpression(init)) {
        if (/PageHelpContent/.test(init.type?.getText(sf) ?? '')) init = init.expression;
      }
      if (
        (/PageHelpContent/.test(typeText) || init !== node.initializer) &&
        ts.isObjectLiteralExpression(init)
      ) {
        const h = {
          id: clean(text(prop(init, 'id'))),
          title: clean(text(prop(init, 'title'))),
          what: clean(text(prop(init, 'what'))),
          steps: arr(prop(init, 'steps'))
            .map((s) => clean(`${text(prop(s, 'title'))}: ${text(prop(s, 'body'))}`))
            .filter(hasText),
          tasks: arr(prop(init, 'tasks')).map((t) => ({
            title: clean(text(prop(t, 'title'))),
            steps: arr(prop(t, 'steps'))
              .map((x) => clean(text(x)))
              .filter(Boolean),
            who: clean(text(prop(t, 'who'))) || undefined,
          })),
          notes: arr(prop(init, 'notes'))
            .map((n) => clean(`${text(prop(n, 'title'))}: ${text(prop(n, 'body'))}`))
            .filter(hasText),
          file: path.relative(ROOT, file),
        };
        if (h.title && (h.what || h.steps.length)) helps.push(h);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

// Page index (name → path, section, keywords).
const pagesFile = path.join(SRC, 'config/searchablePages.ts');
const psf = ts.createSourceFile(
  pagesFile,
  fs.readFileSync(pagesFile, 'utf8'),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS
);
const pages = [];
const visitPages = (node) => {
  if (ts.isObjectLiteralExpression(node) && prop(node, 'path') && prop(node, 'name')) {
    pages.push({
      name: clean(text(prop(node, 'name'))),
      path: clean(text(prop(node, 'path'))),
      section: clean(text(prop(node, 'category'))) || undefined,
      keywords: arr(prop(node, 'keywords'))
        .map((k) => clean(text(k)))
        .filter(Boolean),
    });
  }
  ts.forEachChild(node, visitPages);
};
visitPages(psf);

// De-duplicate helps by id (some pages export and re-use the same constant).
const seen = new Set();
const uniqueHelps = helps.filter((h) =>
  h.id && seen.has(h.id) ? false : (seen.add(h.id || h.title), true)
);

fs.writeFileSync(
  OUT,
  JSON.stringify(
    { generated: new Date().toISOString().slice(0, 10), helps: uniqueHelps, pages },
    null,
    0
  )
);
console.log(
  `helps ${uniqueHelps.length} · pages ${pages.length} · ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB → ${path.relative(ROOT, OUT)}`
);
