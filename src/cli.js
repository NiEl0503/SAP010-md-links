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
  console.log('\x1b[1m📊 Validation and Stats 📊\x1b[0m');
  console.log('\x1b[1m\x1b[36m🔗 Total links:\x1b[34m', linkStats.total + '\x1b[0m');
  console.log('\x1b[1m\x1b[36m🧩 Unique links:\x1b[34m', linkStats.unique + '\x1b[0m');
  console.log('\x1b[1m\x1b[36m🚫 Broken links:\x1b[34m', linkStats.broken + '\x1b[0m');
}

function printValidationResults(results) {
  console.log('\x1b[1m🔍 Validation Results 🔍\x1b[0m');
  results.forEach((link) => {
    const statusMessage = link.ok ? '\x1b[32m✅ OK\x1b[0m' : '\x1b[31m❌ Quebrado\x1b[0m';
    console.log('\x1b[36m📂 File:\x1b[0m \x1b[34m' + link.file + '\x1b[0m');
    console.log('\x1b[36m📝 Text:\x1b[0m \x1b[34m' + link.text + '\x1b[0m');
    console.log('\x1b[36m🔗 Href:\x1b[0m \x1b[34m' + link.href + '\x1b[0m');
    console.log('\x1b[36m🔄 Status:\x1b[0m', link.status);
    console.log('\x1b[36m👌 OK:\x1b[0m', statusMessage);
    console.log('\x1b[37m════════════════════════════════\x1b[0m');
  });
}

function printStats(results) {
  const linkStats = statsLinks(results);
  console.log('\x1b[1m📊 Stats 📊\x1b[0m');
  console.log('\x1b[36m🔗 Total links: \x1b[34m' + linkStats.total + '\x1b[0m');
  console.log('\x1b[36m🧩 Unique links: \x1b[34m' + linkStats.unique + '\x1b[0m');
}


function printLinks(results) {
  results.forEach((link) => {
    console.log('\x1b[36m📂 File: ' + link.file + '\x1b[0m');
    console.log('\x1b[35m📝 Text: ' + link.text + '\x1b[0m');
    console.log('\x1b[34m🔗 Href: ' + link.href + '\x1b[0m');
    console.log('\x1b[37m════════════════════════════════\x1b[0m');
  });
}
