/**
 * Script to convert quiz questions from TypeScript to SQL
 * More robust parsing using state machine approach
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the TypeScript file
const filePath = path.join(__dirname, '../src/data/quizQuestions.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// Split into individual question blocks
const questions = [];

// Find all question objects using a simpler approach
// Match each complete object from { to the closing }
const lines = content.split('\n');
let inQuestion = false;
let currentQuestion = {};
let currentKey = '';
let bracketDepth = 0;
let optionsArray = [];
let inOptions = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // Skip comments and empty lines
  if (line.startsWith('//') || line === '' || line.startsWith('import') || line.startsWith('export')) {
    continue;
  }

  // Start of a new question object
  if (line === '{' && !inQuestion) {
    inQuestion = true;
    currentQuestion = {};
    continue;
  }

  // End of question object
  if ((line === '},' || line === '}') && inQuestion && !inOptions) {
    if (currentQuestion.id && currentQuestion.question && currentQuestion.options) {
      questions.push({ ...currentQuestion });
    }
    inQuestion = false;
    currentQuestion = {};
    continue;
  }

  if (!inQuestion) continue;

  // Parse id
  const idMatch = line.match(/^id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    currentQuestion.id = idMatch[1];
    continue;
  }

  // Parse question
  const questionMatch = line.match(/^question:\s*['"](.+)['"]/);
  if (questionMatch) {
    currentQuestion.question = questionMatch[1];
    continue;
  }

  // Start of options array
  if (line.match(/^options:\s*\[/)) {
    inOptions = true;
    optionsArray = [];
    // Check if options are on the same line
    const sameLine = line.match(/^options:\s*\[([^\]]+)\]/);
    if (sameLine) {
      const opts = sameLine[1].match(/'[^']+'/g) || sameLine[1].match(/"[^"]+"/g);
      if (opts) {
        optionsArray = opts.map(o => o.slice(1, -1));
      }
      currentQuestion.options = optionsArray;
      inOptions = false;
    }
    continue;
  }

  // Inside options array
  if (inOptions) {
    if (line === '],') {
      currentQuestion.options = optionsArray;
      inOptions = false;
      continue;
    }
    // Extract option string
    const optMatch = line.match(/['"](.+)['"]/);
    if (optMatch) {
      optionsArray.push(optMatch[1].replace(/,\s*$/, ''));
    }
    continue;
  }

  // Parse correctAnswer
  const correctMatch = line.match(/^correctAnswer:\s*(\d+)/);
  if (correctMatch) {
    currentQuestion.correctAnswer = parseInt(correctMatch[1]);
    continue;
  }

  // Parse explanation
  const explMatch = line.match(/^explanation:\s*['"](.+)['"]/);
  if (explMatch) {
    currentQuestion.explanation = explMatch[1];
    continue;
  }

  // Parse category
  const catMatch = line.match(/^category:\s*['"]([^'"]+)['"]/);
  if (catMatch) {
    currentQuestion.category = catMatch[1];
    continue;
  }

  // Parse difficulty
  const diffMatch = line.match(/^difficulty:\s*['"]([^'"]+)['"]/);
  if (diffMatch) {
    currentQuestion.difficulty = diffMatch[1];
    continue;
  }

  // Parse regulation
  const regMatch = line.match(/^regulation:\s*['"]([^'"]+)['"]/);
  if (regMatch) {
    currentQuestion.regulation = regMatch[1];
    continue;
  }

  // Parse imageUrl
  const imgMatch = line.match(/^imageUrl:\s*['"]([^'"]+)['"]/);
  if (imgMatch) {
    currentQuestion.imageUrl = imgMatch[1];
    continue;
  }
}

console.log(`Found ${questions.length} valid questions`);

// Validate questions
const validQuestions = questions.filter(q =>
  q.id &&
  q.question &&
  Array.isArray(q.options) &&
  q.options.length >= 2 &&
  typeof q.correctAnswer === 'number' &&
  q.explanation &&
  q.category &&
  q.difficulty
);

console.log(`Valid questions after filtering: ${validQuestions.length}`);

// Escape SQL string
function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

// Generate SQL INSERT statements in batches
const batchSize = 100;
let sql = `-- Quiz Questions Seed Data
-- Generated from quizQuestions.ts on ${new Date().toISOString()}
-- Total questions: ${validQuestions.length}

`;

for (let i = 0; i < validQuestions.length; i += batchSize) {
  const batch = validQuestions.slice(i, i + batchSize);

  sql += `INSERT INTO quiz_questions (question_id, question, options, correct_answer, explanation, category, difficulty, regulation, image_url, course)
VALUES
`;

  const values = batch.map(q => {
    const optionsJson = JSON.stringify(q.options).replace(/'/g, "''");
    return `  (${escapeSql(q.id)}, ${escapeSql(q.question)}, '${optionsJson}'::jsonb, ${q.correctAnswer}, ${escapeSql(q.explanation)}, ${escapeSql(q.category)}, ${escapeSql(q.difficulty)}, ${q.regulation ? escapeSql(q.regulation) : 'NULL'}, ${q.imageUrl ? escapeSql(q.imageUrl) : 'NULL'}, 'inspection-testing')`;
  });

  sql += values.join(',\n') + ';\n\n';
}

// Write to migration file
const outputPath = path.join(__dirname, '../supabase/migrations/quiz_seed_data.sql');
fs.writeFileSync(outputPath, sql);
console.log(`SQL written to ${outputPath}`);
