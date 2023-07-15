const fs = require('fs').promises;
const path = require('path');
const fetch = require('cross-fetch');

function mdLinks(filePath, options) {
  const { validate } = options;
  const absolutePath = path.resolve(filePath);

  return new Promise((resolve, reject) => {
    readDirectory(absolutePath)
      .then((files) => {
        return filterMarkdownFiles(files);
      })
      .then((mdFiles) => {
        return extractLinks(mdFiles, absolutePath);
      })
      .then((links) => {
        if (links.length === 0) {
          reject(new Error('Nenhum link encontrado nos arquivos Markdown'));
          return;
        }
        if (validate) {
          return validateLinks(links);
        }
        resolve(links);
      })
      .then((validatedLinks) => {
        resolve(validatedLinks);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function readDirectory(dirPath) {
  return fs.readdir(dirPath).catch((err) => {
    throw new Error(`Erro ao ler o diretório: ${err.message}`);
  });
}

function filterMarkdownFiles(files) {
  const mdFiles = files.filter((file) => path.extname(file) === '.md');
  if (mdFiles.length === 0) {
    throw new Error('Nenhum arquivo Markdown encontrado no diretório.');
  }
  return mdFiles;
}

function extractLinks(mdFiles, basePath) {
  const links = [];
  const regex = /\[([^\]]+)\]\s*\(([^)]+)\)/g;

  const promises = mdFiles.map((file) => {
    const filePath = path.join(basePath, file);
    return fs
      .readFile(filePath, 'utf8')
      .then((fileContent) => {
        let match;
        while ((match = regex.exec(fileContent)) !== null) {
          const [, text, href] = match;
          links.push({ text, href, file: filePath });
        }
      });
  });

  return Promise.all(promises).then(() => links);
}

function validateLinks(links) {
  const validatedLinks = links.map((link) => {
    return fetch(link.href)
      .then((response) => ({
        ...link,
        status: response.status,
        ok: response.ok ? 'ok' : 'fail'
      }))
      .catch(() => ({
        ...link,
        status: 0,
        ok: 'fail'
      }));
  });

  return Promise.all(validatedLinks);
}

function statsLinks(links) {
  const total = links.length;
  const unique = new Set(links.map((link) => link.href)).size;
  const broken = links.filter((link) => link.ok === 'fail').length;
  return { total, unique, broken };
}

mdLinks('./src/files', { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = {
  mdLinks,
  readDirectory,
  filterMarkdownFiles,
  extractLinks,
  validateLinks,
  statsLinks,
};
