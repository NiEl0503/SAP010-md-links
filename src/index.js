const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

function mdLinks(filePath) {
    return new Promise((resolve, reject) => {
        readDirectory(filePath)
            .then((files) => {
                return filterMarkdownFiles(files);
            })
            .then((mdFiles) => {
                return extractLinks(mdFiles);
            })
            .then((links) => {
                if (links.length === 0) {
                    reject(new Error('Nenhum link encontrado nos arquivos Markdown'));
                    return;
                }
                resolve(links);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function readDirectory(filePath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (err, files) => {
            if (err) {
                reject(new Error(`Erro ao ler o diretório: ${err.message}`));
                return;
            }
            resolve(files);
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

function extractLinks(mdFiles) {
    const links = [];
    const regex = /\[([^\]]+)\]\s*\(([^)]+)\)/g;
    mdFiles.forEach((file) => {
        const filePaths = path.join(filePath, file);
        const fileContent = fs.readFileSync(filePaths, 'utf8');
        let match;
        while ((match = regex.exec(fileContent)) !== null) {
            const [, text, href] = match;
            links.push({ text, href, file: filePaths });
        }
    });
    return links;
}

mdLinks(filePath)
    .then((links) => {
        console.log(links);
    })
    .catch((error) => {
        console.error(error);
    });

