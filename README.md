# Markdown Links 

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Resumo do projeto](#1-Resumo-do-projeto)
* [3. Guia de instalação](#2-Guia-de-instalação)
* [4.Guia de uso ](#3-Guia-de-uso)
* [5. Critérios de aceitação mínimos do projeto](#5-criterios-de-aceitação-mínimos-do-projeto)
* [6. Entregáveis](#6-entregáveis)

***

## 1. Prefácio 📑
[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos com este formato em qualquer repositório (começando pelo tradicional
`README.md`).

## 2. Resumo do projeto 💻

Esta é uma biblioteca NodeJS que contém um extrator de links, recebe um caminho de arquivo no formato `Markdown` ".md" e retorna via console uma lista de todos os links que o projeto contém, bem como o caminho e o texto. Além disso, se a opção `validate` for adicionada, você também pode verificar o status e ok: mensagem de falha em caso de falha ou ok em caso de sucesso. Se você colocar a opção `stats` poderá verificar se os links funcionam ou se não estão "quebrados".
<br>

## 3. Guia de instalação 📌

Para instalar esta biblioteca você deve executar a seguinte linha de comando: <strong>`npm install md-links-ninoska`</strong>. Este módulo inclui um executável como uma interface que pode ser importada com require.

Após a instalação, certifique de ter um arquivo .md com links dentro.
<br>

## 4. Guia de uso ⌨️

a) Rode o comando <strong>`mdlinks` + o caminho do seu arquivo </strong>, para obter o retorno do caminho (file), texto (text) e o link do arquivo selecionado (href).<br>
Exemplo:
`md-links <caminho-do-arquivo>`

![mdlinks](./src/assets/mdLinks.png) <br>



b) Se além de obter o caminho (file), o link (href) e o texto (text) você deseja realizar uma validação destes, utilize a propriedade <strong>--validate</strong>, para que desta forma obtenha o status da sua requisição HTTP (status) e uma mensagem com a aprovação ou rejeição do seu link (ok). <br>
🔎  observação: se o link resultar em um redirecionamento a uma URL que responde ok, então consideraremos o link como ok.<br>
Exemplo:
 `md-links <caminho-do-arquivo> --validate`
 
![mdlinks](./src/assets/validate.png)


c) Se você quiser saber as estatísticas desses links, pode digitar a opção <strong>--stats</strong> e a saída será um texto com estatísticas básicas sobre os links, onde você encontrará as informações sobre o número total de links e quantos são únicos.<br>
Exemplo:
`md-links <caminho-do-arquivo> --stats`
![mdlinks](./src/assets/stats.png)



## 4. Documentação técnica

## 5. Critérios de aceitação mínimos do projeto

## Este proyecto consta de DOS partes

### 1) JavaScript API

O módulo deve poder ser **importado** em outros scripts Node.js e deve oferecer a
seguinte interface:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Rota absoluta ou relativa ao arquivo ou diretório. Se a rota passada é
  relativa, deve resolver como sendo relativa ao diretório onde foi chamada -
  _current working directory_
* `options`: Um objeto com a seguinte propriedade:
  - `validate`: Um booleano que determina se deseja validar os links
    encontrados.
  - `stats`: Booleano que determina se deseja obter um output
    com informações estatísticas gerais.

##### Valor de retorno

A função deve **retornar uma promessa** (`Promise`) que
**resolve um array** (`Array`) e
objetos(`Object`), onde cada objeto representa um link, contendo as seguintes
propriedades:

Com `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que irá aparecer dentro de um link (`<a>`).
* `file`: Rota do arquivo onde foi encontrado o link.

Com `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de resposta HTTP.
* `ok`: Mensagem `fail` em caso de falha ou `ok` em caso de sucesso.


### 2) CLI (Command Line Interface - Interface de Linha de Comando)

O executável da nossa aplicação deve poder ser executado da seguinte maneira,
através do **terminal**:

`md-links <path-to-file> [options]`

Por exemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html algum doc
./some/example.md http://google.com/ Google
```

O comportamento padrão não deve validar se as URLs respondem ok ou não, somente
deve identificar o arquivo Markdown (a partir da rota que recebeu como
argumento), analisar o arquivo Markdown e imprimir os links que vão sendo
encontrados, junto com a rota do arquivo onde aparece e o texto encontrado
dentro do link (truncado 50 caracteres).

#### Options

##### `--validate`

Se passamos a opção `--validate`, o módulo deve fazer uma requisição HTTP para
verificar se o link funciona ou não. Se o link resultar em um redirecionamento a
uma URL que responde ok, então consideraremos o link como ok.

Por exemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html fail 404 algum doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que o _output_ neste caso inclui a palavra `ok` e `fail` depois da URL,
assim como o status da resposta recebida à requisição HTTP feita pela URL.

##### `--stats`

Se passamos a opção `--stats` o output (saída) será um texto com estatísticas
básicas sobre os links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Também podemos combinar `--stats` e `--validate` para obter estatísticas que
necessitem dos resultados da validação.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 6. Entregáveis

O módulo deve ser instalável via `npm install <github-user>/md-links`. Este
módulo deve incluir **um executável** que pode ser chamado tanto por linha de
comando, como também possa ser importado com `require` para usá-lo no seu código.

## 7. Hacker edition

As seções chamadas _Hacker Edition_ são **opcionais**. É para caso você tenha
**terminado** todos os requisitos anteriores e ainda tenha tempo disponível,
e pode assim aprofundar e/ou exercitar mais sobre os objetivos de
aprendizagem deste projeto.

* Poder adicionar uma propriedade `line` a cada objeto `link` indicando em que
  linha do arquivo está o link.
* Poder agregar mais estatísticas.
* Integração contínua com Travis ou Circle CI.

***

## 8. 

Tente ler sobre promessas e criando uma por
conta própria usando **new Promise()**

É importante que você saiba o que é um **callback** porque serão usadas
nas promessas.
