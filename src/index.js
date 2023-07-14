const fs = require('fs');
const path = require('path');
const fetch = require('cross-fetch');

const filePath = process.argv[2];

function mdLinks(filePath, options = {validate: false}) {
  const { validate } = options;
  const absolutePath = path.resolve(filePath);
  const isDirectory = fs.statSync(absolutePath).isDirectory();
  return new Promise((resolve, reject) => {
    if (isDirectory) {
      readDirectory(absolutePath)
        .then((files) => filterMarkdownFiles(files))
        .then((mdFiles) => extractLinks(mdFiles, absolutePath))
        .then((links) => {
          if (links.length === 0) {
            reject(new Error('Nenhum link encontrado nos arquivos Markdown'));
          } else if (validate) {
            validateLinks(links)
              .then((validatedLinks) => resolve(validatedLinks))
              .catch((error) => reject(error));
          } else {
            resolve(links);
          }
        })
        .catch((error) => reject(error));
    } else {
      if (path.extname(absolutePath) === '.md') {
        const file = path.basename(absolutePath);
        extractLinks([file], path.dirname(absolutePath))
          .then((links) => {
            if (validate) {
              validateLinks(links)
                .then((validatedLinks) => resolve(validatedLinks))
                .catch((error) => reject(error));
            } else {
              resolve(links);
            }
          })
          .catch((error) => reject(error));
      } else {
        reject(new Error('O caminho fornecido não é um arquivo Markdown.'));
      }
    }
  });
}

function readDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(new Error(`Erro ao ler o diretório: ${err.message}`));
      } else {
        resolve(files);
      }
    });
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
  mdFiles.forEach((file) => {
    const filePath = path.join(basePath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
      const [, text, href] = match;
      links.push({ text, href, file: filePath });
    }
  });
  return links;
}

function validateLinks(links) {
  return Promise.all(
    links.map((link) =>
      fetch(link.href)
        .then((response) => ({
          ...link,
          status: response.status,
          ok: response.ok ? 'ok' : 'fail'
        }))
        .catch(() => ({
          ...link,
          status: 0,
          ok: 'fail'
        }))
    )
  );
}

function statsLinks(links) {
    const total = links.length;
    const unique = new Set(links.map((link) => link.href)).size;
    const broken = links.filter((link) => link.ok === 'fail').length;
    return { total, unique, broken };
  }

mdLinks(filePath, { validate: true })
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
