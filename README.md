# Markdown Links 

## Índice

* [1. Prefácio](#1-prefácio)
* [2. Resumo do projeto](#1-Resumo-do-projeto)
* [3. Guia de instalação](#2-Guia-de-instalação)
* [4.Guia de uso ](#3-Guia-de-uso)
* [5. Fluxograma](#5-Fluxograma)
* [6. Tecnologias Utilizadas](#6-Tecnologias-utilizadas)

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


d) Também é possível combinar ´--validate´ e ´--stats´ para obter o número total de links, quantos são únicos e quantos estão quebrados.
`md-links <caminho-do-arquivo> --validate --stats`. <br>
Exemplo:

![mdlinks](./src/assets/validateAndStats.png)


## 5. Fluxograma 
Fluxograma utilizado na realização deste projeto <br>


![fluxograma](./src/assets/flux.drawio.png)

## 6. Tecnologias Utilizadas
<a href="https://www.javascript.com/"><img height= "35" src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></a>
<a href="https://nodejs.org/en/"><img height= "35" src= "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"></a>
<a href="https://git-scm.com/"><img height= "35" src= "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"></a>



