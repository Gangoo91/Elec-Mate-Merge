#!/usr/bin/env node
/**
 * extract-mcqs — every multiple-choice question in the app, wherever it lives.
 *
 * WHY: the question-quality checks only read the data banks (src/data). The
 * quizzes inside lesson pages — "Quick check" and end-of-section quizzes —
 * were never measured, and that is where a Level 2 learner found wrong
 * answers "not even relevant to the question" (ELE-1803). This walks the
 * TypeScript AST of every .ts/.tsx under src and pulls out each object literal
 * that has a question, an options array of strings, and a numeric answer
 * index, whatever the key names.
 *
 *   node scripts/extract-mcqs.mjs [--out=path.jsonl] [--root=src]
 *
 * Output: one JSON object per line — { file, line, area, question, options,
 * key } — for the review and for check scripts.
 */
import ts from 'typescript';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const ROOT = args.root || 'src';
const OUT = args.out || null;

const QUESTION_KEYS = new Set(['question', 'q', 'prompt', 'text', 'stem']);
const OPTION_KEYS = new Set(['options', 'answers', 'choices']);
const KEY_KEYS = new Set(['correctAnswer', 'correctIndex', 'correct', 'answer', 'answerIndex', 'correctOption']);

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name !== 'node_modules' && name !== '__checks__') walk(p);
    } else if (/\.(ts|tsx)$/.test(name) && !name.endsWith('.d.ts')) files.push(p);
  }
};
walk(ROOT);

const text = (node) => {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return null;
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = text(node.left);
    const b = text(node.right);
    return a !== null && b !== null ? a + b : null;
  }
  if (ts.isParenthesizedExpression(node)) return text(node.expression);
  return null;
};
const propName = (p) =>
  p.name && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) ? p.name.text : null;

const areaOf = (f) => {
  const r = relative(ROOT, f);
  if (/apprentice-courses\/(level2|Module[1-8]Section)/.test(r) || /pages\/apprentice-courses\/Module[1-8]Section/.test(r)) return 'level2';
  if (/level3|Level3/.test(r)) return 'level3';
  if (/am2|AM2/.test(r)) return 'am2';
  if (/upskilling/i.test(r)) return 'upskilling';
  if (/study-centre/.test(r)) return 'study-centre';
  if (/seo/.test(r)) return 'seo';
  return 'other';
};

const out = [];
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  if (!/options|answers|choices/.test(src)) continue;
  const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, f.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      let question = null;
      let options = null;
      let key = null;
      for (const p of node.properties) {
        if (!ts.isPropertyAssignment(p)) continue;
        const n = propName(p);
        if (!n) continue;
        if (QUESTION_KEYS.has(n) && question === null) question = text(p.initializer);
        else if (OPTION_KEYS.has(n) && ts.isArrayLiteralExpression(p.initializer)) {
          const vals = p.initializer.elements.map(text);
          if (vals.length >= 2 && vals.every((v) => typeof v === 'string')) options = vals;
        } else if (KEY_KEYS.has(n) && ts.isNumericLiteral(p.initializer)) key = Number(p.initializer.text);
      }
      if (question && options && key !== null && key >= 0 && key < options.length) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart());
        out.push({ file: relative('.', f), line: line + 1, area: areaOf(f), question, options, key });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
}

if (OUT) {
  writeFileSync(OUT, out.map((o) => JSON.stringify(o)).join('\n') + '\n');
}
const by = {};
for (const o of out) by[o.area] = (by[o.area] || 0) + 1;
const filesWith = new Set(out.map((o) => o.file)).size;
console.log(`${out.length} multiple-choice questions in ${filesWith} files`);
for (const [a, n] of Object.entries(by).sort((x, y) => y[1] - x[1])) console.log(`  ${a.padEnd(14)} ${n}`);
