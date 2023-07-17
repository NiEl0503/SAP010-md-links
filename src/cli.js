const { mdLinks } = require('./index.js');

mdLinks('./src/files', { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });