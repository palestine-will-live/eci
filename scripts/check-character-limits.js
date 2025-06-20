#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to count characters without spaces
function countCharsWithoutSpaces(text) {
  return text.replace(/\s/g, '').length;
}

// Function to check file and report results
function checkFile(filePath, limit, fileName) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${fileName} file not found at ${filePath}`);
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const charCount = countCharsWithoutSpaces(content);
  const remaining = limit - charCount;
  
  console.log(`\n📄 ${fileName}:`);
  console.log(`   File: ${filePath}`);
  console.log(`   Characters (without spaces): ${charCount.toLocaleString()}`);
  console.log(`   Limit: ${limit.toLocaleString()}`);
  
  if (charCount <= limit) {
    console.log(`   ✅ PASS - Under limit by ${remaining.toLocaleString()} characters`);
    return true;
  } else {
    console.log(`   ❌ FAIL - Over limit by ${Math.abs(remaining).toLocaleString()} characters`);
    return false;
  }
}

// Main execution
console.log('🔍 ECI Character Limit Checker');
console.log('================================');

// Check objectives.md (1100 char limit without spaces)
const objectivesPass = checkFile(
  'objectives.md', 
  1100, 
  'Objectives'
);

// Check annex.md (5000 char limit without spaces)
const annexPass = checkFile(
  'annex.md', 
  5000, 
  'Annex'
);

console.log(`\n📊 Summary:`);
console.log(`   Objectives: ${objectivesPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   Annex: ${annexPass ? '✅ PASS' : '❌ FAIL'}`);

if (!objectivesPass || !annexPass) {
  console.log(`\n❌ Character limit check failed!`);
  console.log(`Please reduce character count in the failing file(s).`);
  console.log(`\nRemember: Limits are for characters WITHOUT spaces.`);
  process.exit(1);
} else {
  console.log(`\n✅ All character limits passed!`);
  console.log(`Ready for ECI submission! 🎉`);
}