const { mdLinks, statsLinks } = require('./index.js');

const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
  validateAndStats: process.argv.includes('--validate') && process.argv.includes('--stats'),
};

mdLinks(path, options)
  .then((results) => {
    if (options.validateAndStats) {
      printValidationAndStats(results);
    } else if (options.validate) {
      printValidationResults(results);
    } else if (options.stats) {
      printStats(results);
    } else {
      printLinks(results);
    }
  })
  .catch((error) => {
    console.error(error);
  });

function printValidationAndStats(results) {
  const linkStats = statsLinks(results);
  console.log('Total links: ' + linkStats.total);
  console.log('Unique links: ' + linkStats.unique);
  console.log('Broken links: ' + linkStats.broken);
}

function printValidationResults(results) {
  results.forEach((link) => {
    console.log('File: ' + link.file);
    console.log('Text: ' + link.text);
    console.log('Link: ' + link.href);
    console.log('Status HTTP: ' + link.status);
    console.log('OK: ' + link.ok);
    console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨');
  });
}

function printStats(results) {
  const linkStats = statsLinks(results);
  console.log('Total links: ' + linkStats.total);
  console.log('Unique links: ' + linkStats.unique);
}

function printLinks(results) {
  results.forEach((link) => {
    console.log('File: ' + link.file);
    console.log('Text: ' + link.text);
    console.log('Link: ' + link.href);
    console.log('¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨');
  });
}
