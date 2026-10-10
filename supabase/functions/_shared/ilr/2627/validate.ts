/**
 * XSD validation of an ILR 2026/27 file (ELE-2087).
 *
 * libxml2-wasm (https://github.com/jameslan/libxml2-wasm, MIT) is libxml2, the
 * C library behind xmllint, compiled to WebAssembly. It runs in Deno, and its
 * XsdValidator applies the full W3C XML Schema: element order, occurrences,
 * types, lengths, patterns, enumerations and ranges. The schema is the
 * published 2026/27 XSD, bundled as a string by scripts/ilr-2627-generate.mjs.
 */
import { XmlDocument, XmlValidateError, XsdValidator } from 'npm:libxml2-wasm@0.7.2';
import { ILR_2627_XSD, ILR_2627_XSD_FILE, ILR_2627_XSD_SHA256 } from './schema.ts';
import { ELEMENTS, specUrl } from './fields.ts';

export interface SchemaError {
  line: number | null;
  message: string;
}

export interface SchemaResult {
  valid: boolean;
  errors: SchemaError[];
  schema: { file: string; sha256: string; validator: string };
}

let cached: { doc: XmlDocument; validator: XsdValidator } | null = null;

function validator(): XsdValidator {
  if (!cached) {
    const doc = XmlDocument.fromString(ILR_2627_XSD);
    cached = { doc, validator: XsdValidator.fromDoc(doc) };
  }
  return cached.validator;
}

export function validateIlrXml(xml: string): SchemaResult {
  const schema = {
    file: ILR_2627_XSD_FILE,
    sha256: ILR_2627_XSD_SHA256,
    validator: 'libxml2-wasm 0.7.2 (libxml2 XSD)',
  };
  let doc: XmlDocument;
  try {
    doc = XmlDocument.fromString(xml);
  } catch (e) {
    return {
      valid: false,
      errors: [{ line: null, message: `Not well-formed XML: ${(e as Error).message}` }],
      schema,
    };
  }
  try {
    validator().validate(doc);
    return { valid: true, errors: [], schema };
  } catch (e) {
    if (e instanceof XmlValidateError)
      return {
        valid: false,
        errors: e.details.map((x) => ({ line: x.line ?? null, message: x.message.trim() })),
        schema,
      };
    throw e;
  } finally {
    doc.dispose();
  }
}

/**
 * libxml2's schema messages, in plain English, with the field to fix. The
 * original message is kept beside it for the MIS team.
 */
export interface ExplainedSchemaError {
  plain: string;
  element: string | null;
  fix: string | null;
  spec: { field: string; url: string } | null;
}

const strip = (t: string) => t.replace(/\{ILR\/2026-27\}/g, '');
const nameOf = (el: string) => ELEMENTS[el]?.label ?? el;

export function explainSchemaError(message: string): ExplainedSchemaError {
  const m = strip(message);
  const elMatch = m.match(/^Element '([A-Za-z0-9]+)'/);
  const el = elMatch?.[1] ?? null;
  const expected = m.match(/Expected is (?:one of )?\( ?([A-Za-z0-9]+)/)?.[1] ?? null;
  const value =
    m.match(/The value '([^']*)'/)?.[1] ?? m.match(/'([^']*)' is not a valid value/)?.[1];
  const at = (e: string | null) => {
    const f = e ? ELEMENTS[e] : undefined;
    return {
      element: e,
      fix: f?.fix ?? null,
      spec: f && e ? { field: `${f.entity}.${e}`, url: specUrl(f.entity, e) } : null,
    };
  };

  if (/Missing child element/.test(m) && expected)
    return { plain: `The ${nameOf(expected)} is missing, and the file needs it.`, ...at(expected) };
  if (/This element is not expected/.test(m) && expected && el && expected !== el)
    return {
      plain: ELEMENTS[el]
        ? `The ${nameOf(expected)} is missing, and the file needs it before the ${nameOf(el)}.`
        : `The ${nameOf(expected)} is missing, and the file needs it.`,
      ...at(expected),
    };
  if (/This element is not expected/.test(m) && el)
    return { plain: `The ${nameOf(el)} appears where the schema does not allow it.`, ...at(el) };
  if (el && /facet 'pattern'/.test(m))
    return {
      plain: `The ${nameOf(el)} "${value ?? ''}" is not in the format the schema allows.`,
      ...at(el),
    };
  if (el && /facet '(maxLength|minLength|length|totalDigits)'/.test(m))
    return {
      plain: `The ${nameOf(el)} "${value ?? ''}" is too long or too short for the schema.`,
      ...at(el),
    };
  if (el && /facet '(minInclusive|maxInclusive|minExclusive|maxExclusive)'/.test(m))
    return {
      plain: `The ${nameOf(el)} ${value ?? ''} is outside the range the schema allows.`,
      ...at(el),
    };
  if (el && /facet 'enumeration'/.test(m))
    return {
      plain: `The ${nameOf(el)} "${value ?? ''}" is not one of the codes the schema allows.`,
      ...at(el),
    };
  if (el && /is not a valid value of the (atomic|local atomic) type/.test(m))
    return {
      plain: `The ${nameOf(el)} "${value ?? ''}" is the wrong kind of value (for example, text where a number or a date belongs).`,
      ...at(el),
    };
  return { plain: m.trim(), ...at(el) };
}
