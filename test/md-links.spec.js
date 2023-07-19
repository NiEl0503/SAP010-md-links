const { mdLinks, readDirectory, filterMarkdownFiles, extractLinks, validateLinks, statsLinks } = require('../src/index.js')
const fs = require('fs').promises;
const path = require('path');
const fetch = require('cross-fetch');

jest.mock('cross-fetch', () => {
    return jest.fn();
});

describe('mdLinks', () => {
    it('deve retornar os links encontrados no arquivo Markdown "test.md"', () => {
        const filePath = './test';
        const options = { validate: false };
        return mdLinks(filePath, options).then((links) => {

            const expectedLinks = [
                {
                    text: 'Link1',
                    href: 'https://example.com/link1',
                    file: path.resolve('./test/test.md'),
                },
            ];
            expectedLinks.forEach((expectedLink) => {
                expect(links).toContainEqual(expectedLink);
            });
        });
    });
});

    it('deve rejeitar com erro se nenhum link for encontrado nos arquivos markdown', () => {
    const filePath = './test/test.md';
    const options = { validate: false };

    return mdLinks(filePath, options).catch((error) => {
        expect(error.message).toBe('Nenhum link encontrado nos arquivos Markdown');
    });
});


jest.mock('fs').promises;

describe('readDirectory', () => {
    it('deve resolver com os arquivos encontrados no diretório', () => {
        const dirPath = './src/files';
        const files = ['arquivo1.md', 'arquivo2.md'];

        jest.spyOn(fs, 'readdir').mockResolvedValue(files);

        return readDirectory(dirPath).then((result) => {
            expect(result).toEqual(files);
        });
    });

    it('deve rejeitar com erro se houver erro na leitura do diretório', () => {
        const dirPath = './src/files';
        const errorMessage = 'Error al leer el directorio';

        jest.spyOn(fs, 'readdir').mockRejectedValue(new Error(errorMessage));

        return readDirectory(dirPath).catch((error) => {
            expect(error.message).toContain(errorMessage);
        });
    });
});

describe('filterMarkdownFiles', () => {
    it('deve retornar apenas os arquivos Markdown encontrados', () => {
        const files = ['arquivo1.md', 'arquivo2.js', 'arquivo3.md'];
        const expectedMdFiles = ['arquivo1.md', 'arquivo3.md'];

        const result = filterMarkdownFiles(files);

        expect(result).toEqual(expectedMdFiles);
    });

    it('deve gerar um erro se nenhum arquivo markdown for encontrado', () => {
        const files = ['arquivo.js', 'arquivo2.txt'];

        expect(() => filterMarkdownFiles(files)).toThrow('Nenhum arquivo Markdown encontrado no diretório.');
    });
});

describe('extractLinks', () => {
    it('deve extrair links corretamente de arquivos markdown', () => {
        const mdFiles = ['arquivo.md', 'arquivo2.md'];
        const basePath = './caminho /de/diretório';
        const file1Content = '[Link1](https://link1.com)';
        const file2Content = '[Link2](https://link2.com)';
        const expectedLinks = [
            { text: 'Link1', href: 'https://link1.com', file: path.join(basePath, 'arquivo.md') },
            { text: 'Link2', href: 'https://link2.com', file: path.join(basePath, 'arquivo2.md') },
        ];

        jest.spyOn(fs, 'readFile').mockResolvedValueOnce(file1Content).mockResolvedValueOnce(file2Content);

        return extractLinks(mdFiles, basePath).then((result) => {
            expect(result).toEqual(expectedLinks);
        });
    });
});

describe('validateLinks', () => {
    it('deve validar os links corretamente', () => {
        const links = [
            { text: 'Link1', href: 'https://link1.com', file: './caminho/de/diretório/arquivo1.md' },
            { text: 'Link2', href: 'https://link2.com', file: './caminho/de/diretório/arquivo2.md' },
        ];
        const response1 = { status: 200, ok: true };
        const response2 = { status: 404, ok: false };
        const expectedValidatedLinks = [
            { text: 'Link1', href: 'https://link1.com', file: './caminho/de/diretório/arquivo1.md', ...response1 },
            { text: 'Link2', href: 'https://link2.com', file: './caminho/de/diretório/arquivo2.md', ...response2 },
        ];

        fetch.mockImplementation((url) => {
            if (url === 'https://link1.com') {
                return Promise.resolve(response1);
            }
            if (url === 'https://link2.com') {
                return Promise.resolve(response2);
            }
        });

        return validateLinks(links).then((result) => {
            expect(result).toEqual(expectedValidatedLinks);
        });
    });
});

describe('statsLinks', () => {
    test('deve retornar o item com as estatísticas corretas', () => {
      const links = [
        { href: 'https://example.com', ok: true },
        { href: 'https://example.com', ok: true },
        { href: 'https://example.com', ok: false },
        { href: 'https://example2.com', ok: true },
        { href: 'https://example3.com', ok: false },
      ];
  
      const expectedStats = {
        total: 5,
        unique: 3,
        broken: 2,
      };
  
      const result = statsLinks(links);
      expect(result).toEqual(expectedStats);
    });
  });