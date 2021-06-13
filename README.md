![Repo Cover](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7088efb4-ad25-4882-85aa-b32ba85a9626%2Fapi-bg-b.png?table=block&id=1b13acc2-dbb1-4c38-af65-896d34431a9d&width=3840&userId=&cache=v2)

# Axios GET AJAX API

**OBTENÇÃO DE DADOS (GET) DE UMA API COM JS, NO FRONT-END**
___

![Comunicação entre Plataformas](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7d356a55-e77d-44bd-a3ad-a5e3e3f8c778%2Fapi-objetivo.png?table=block&id=16268c4f-4d3a-47bb-aefe-37a0a4c41ffa&spaceId=fa024bdf-23e1-41d2-b1a2-6bfa1a2aa953&width=3000&userId=&cache=v2µ)

O objetivo dessa aula é conseguirmos consumir dados de uma aplicação externa - pública - através do Front End, uma operação constante no dia a dia de um desenvolvedor front end.

## \#01. Live Coding

### 01. Projetc Setup

[branch: feature/project-setup](https://github.com/Marcelo-Diament/axios-get-AJAX-API/tree/feature/project-setup)

#### 01.01. Project Init

Para podermos declarar nossas dependências, vamos criar um arquivo `package.json` através do seguinte comando:

```sh
npm init
```

Podemos configurar o arquivo da maneira que preferirsmo (ou incluir a opção `-y` para responder _yes_ e manter todas as propriedades com o valor _default_).

#### 01.02. Axios Install

Agora vamos instalar o **axios** como uma dependência:

```sh
npm i axios --save
```

> Ao baixar, clonar ou dar um fork no repositório, basta executar `npm install` para instalar a dependência.

#### 01.03. Project Architecture

Vamos organizar nossos arquivos em pastas. A arquitetura de pastas e arquivos ficará assim:

| Caminho | Arquivo | Responsabilidade |
| ------ | ------ | ------ |
| ./ | index.html | Documento HTML principal da aplicação |
| ./ | LICENSE | Sobre a licença do projeto (_default_) |
| ./ | package.json | Configurações do projeto (como dependências) |
| ./ | package-lock.json | Árvore de dependências |
| ./ | .gitignore | Listagem de arquivos a serem ignorados no repositório |
| ./node_modules/ | * | Dependências do projeto (módulos/pacotes) |
| ./assets/css/ | style.css | Estilos da aplicação |
| ./assets/js/ | main.js | Execução do _script_ customizado |
| ./assets/js/api | makeRequest.js | Responsável por criar e executar a _request_ |
| ./assets/js/helpers | general.js | Funções de apoio genéricas |
| ./assets/js/inc/ | user.js | Popular documento HTML com informações recebidas da API |
| ./assest/js/templates/ | userRepo.js | Mapa e trecho HTML referente aos repositórios do usuário |
| ./assest/js/templates/ | userTags.js | Mapa de informações do usuário no DOM (via IDs) |

Nesse momento só definiremos de fato os arquivos `./assets/js/main.js` e `./assets/js/helpers/general.js` . Os demais arquivos serão criados apenas com um comentário sobre sua responsabilidade. Ainda, alguns arquivos e trechos de código (referentes ao desafio) serão incluidos posteriormente (ainda que seus estilos já estejam previstos parcialmente no CSS).

### 02. Get User Details

[branch: feature/get-user-details](https://github.com/Marcelo-Diament/axios-get-AJAX-API/tree/feature/get-user-details)

#### 02.01. Make Request

Nossa função receberá 3 argumentos: `username` , `purpose` e `callback` .

O primeiro argumento, define de qual usuário requisitaremos as informações (parte do _endpoint_ a ser construído).

Já o segundo, define se consultaremos os detalhes do usuário ou seus repositórios (a função será feita de modo a permitir a construção de outros _endpoints_).

E o `callback` , na mais é do que a função que definirá o que será feito com a resposta recebida.

```js
const makeRequest = (username, purpose, callback) => {
    let endpoint = `${username}`
    switch (purpose) {
        case 'repos':
            endpoint += `/repos?type=public&sort=updated&direction=desc`
            break
        default:
            endpoint
    }
    axios.get(`https://api.github.com/users/${endpoint}`)
        .then(response => callback(response.data))
        .catch(error => console.error(error))
}
```

#### 02.02. User Tags Map

Antes de tratarmos o retorno da nossa request, vamos mapear cada _tag_ HTML do nosso DOM para daí podemos populá-las.

No arquivo `./assets/js/templates/userTags.js` iremos mapear os IDs dessas _tags_ através do seguinte objeto:

```js
const userTags = {
    avatar_url: '#userAvatar',
    bio: '#userBio',
    location: '#userLocation',
    name: '#userName',
    html_url: '#userUrl',
    followers: '#userFollowersCount',
    following: '#userFollowingCount',
    public_repos: '#userReposCount'
}
```

#### 02.03. Display User Details

Com os dados da resposta da nossa _request_ em mãos e elementos HTML devidamente mapeados, chegou a hora de unirmos os pontos!

Vamos criar uma função no arquivo `./assets/js/inc/user.js` para renderizar as informações do usuário.

```js
import {
    selector
} from '../helpers/general.js'
import userTags from '../templates/userTags.js'

const displayUserDetails = details => {
    for (let userTag in userTags) {
        const prop = selector(userTags[userTag]),
            value = details[userTag]
        switch (userTag) {
            case 'avatar_url':
                prop.setAttribute('src', value)
                break
            case 'html_url':
                prop.setAttribute('href', value)
                break
            default:
                prop.innerText = value
        }
    }
}
```

#### 02.04. Main Script

Nos resta executarmos tudo o que elaboramos até aqui. Faremos isso através do arquivo `./assets/js/main.js` , no qual importaremos e executaremos os métodos necessários para exibirmos as informações de um usuário.

Para deixarmos nossa aplicação um pouco mais dinâmica sem acrescentarmos uma camada de complexidade ao projeto, capturaremos o `username` a partir de um `prompt()` .

```js
import makeRequest from './api/makeRequest.js'
import {
    displayUserDetails
} from './inc/user.js'

const loadAndShowUserDetails = name => makeRequest(name, 'user', displayUserDetails)

const loadContent = name => {
    loadAndShowUserDetails(name)
}

window.onload = () => {
    const name = prompt('Digite o nome do usuário')
    name && loadContent(name)
}
```

## \#02. Compilado

_Um breve resumo para consultas rápidas e revisões_

### Propósito

Por inúmeras razões - como segurança, fonte de dados, integrações e n outras - é muito comum utilizarmos consultas a bases de dados externas. Essas consultas vão da [consulta de um endereço a partir do CEP do usuário](https://viacep.com.br/) à consulta de créditos disponíveis na conta de um usuário dentro de um eCommerce.

### Conceitos Fundamentais

Para compreendermos essa operação mais a fundo, precisamos entender 3 conceitos básicos.

#### Assincronismo

_O que significa assincronismo?_

Sincronia vem dos termos gregos *syn* - prefixo que significa *juntos* - e *khronos* - que significa *tempo*. Portanto, quando dizemos que algo ocorre de maneira assíncrona, queremos dizer que as atividades envolvidas não precisam ocorrer uma depois da outra.

Esse conceito é utilizado para não travarmos nosso código. Temos algumas maneiras de aplicarmos esse conceito em nossos códigos - desde o uso do atributo `async` em *tags* HTML (que diz ao *browser* para não esperar o carregamento de um determinado *script* para renderizar o restante do código) até o uso do `async` / `await` (que será estudado posteriormente).

Um bom exemplo da assincronia é quando pedimos uma pizza. 🍕🍴 Graças à assincronia, podemos fazer outras coisas enquanto o pizzaiolo prepara nossa pizza e enquanto o entregador nos traz essa pizza. Se as atividades envolvidas no processo de pedir uma pizza fossem síncronas, a partir do momento que finalizássemos nosso pedido, ficaríamos estáticos até que a pizza chegasse em nossa casa. 😅

#### API

_Entenda o que é uma API_

API é um acrônimo para *Application Programming Interface*, ou seja, uma Interface de Programação de Aplicações. Em outras palavras, é um conjunto de protocolos e padrões que nos permite comunicar nossa aplicações com outras plataformas (como o compartilhamento de músicas do Spotify no Facebook).

Para consultarmos APIs, enviamos uma *request* para realizarmos uma consulta específica. Essa *request* deve ter um método (no nosso caso, `GET` ) e um *endpoint* (URL que deve retornar o resultado da nossa consulta - caso tudo dê certo).

Tendo em vista a facilidade na comunicação entre plataformas, uma boa prática é adotar o padrão REST - *Representational State Transfer* (Transferência de Estado Representacional). Basicamente consiste num conjunto de regras e princípios que definem como deve ser essa interface.

Talvez já tenha ouvido falar sobre RESTful. Uma aplicação RESTful nada mais é do que uma sistema adequado aos padrões REST.

#### Promise

_Como funciona uma promise?_

Uma *promise* é basicamente uma promessa. Trata-se de um recurso que surgiu no JavaScript com o ECMA6 - seu grande trunfo é nos permitir de forma assíncrona. De forma simples, as *promises* são objetos nos prometem retornar algo - seja a resposta que esperamos ou um erro - através do processamento assíncrono.

Quando acessamos uma API (com o método `GET` ), enviamos uma requisição (*request*) e esperamos receber algo como resposta (*response*). De modo geral, o funcionamento da *promise* que consultará uma API é o seguinte:

1. Enviamos uma requisição
2. A consulta é realizada
3. Se tudo der certo, recebemos nosso retorno esperado. Caso 'dê ruim', recebemos um erro. Mas, conforme 'prometido', sempre receberemos uma resposta.

Para que esse fluxo aconteça, a *promise* recebe uma função de *callback* como argumento, que, por sua vez, recebe dois argumentos - o `resolve` e o `reject` . O `resolve` indica sucesso e o `reject` indica que houve um erro.

**then/catch**

Utilizamos o `then` e o `catch` para lidarmos com esse dois cenários (de sucesso e de erro). Como não sabemos exatamente o que ocorrerá após realizarmos nossa chamada, sempre contemplamos ambos os cenários. Então após solicitarmos nossa consulta, usamos o `then` para caso de sucesso (*then* significa *então* em inglês - no sentido de "solicitei algo e obtivo o retorno desejado, então...") e `catch` caso dê um erro (*catch* significa *capturar* - no caso, capturar o erro).

A estrutura do nosso código é algo semelhante ao exemplo a seguir:

```jsx
minhaRequisicao(...args)
	.then(retorno => casoDeCerto(retorno))
	.catch(erro => casoDeErro(erro))
```

#### AJAX

_O que é AJAX?_

AJAX é um time holandês. 🤪

![Logo AJAX](https://i.pinimg.com/originals/07/86/7e/07867e16b69b8eb61024bb3715b23a89.png)

_O que é o AJAX em programação?_

Um acrônimo para *Asynchronous JavaScript And XML* (JavaScript e XML Assíncronos). Sem entrarmos em detalhes, usamos o AJAX para realizarmos *requests* para servidores externos sem precisarmos recarregar nossa página - o que pode melhorar a experiência do usuário.

Isso pode ser usado para envio de formulários, por exemplo. Na nossa prática, usamos o AJAX para capturar dados de um usuário GitHub a partir de seu *username* (sem recarregarmos nossa página), a partir da API pública do GitHub.

#### axios

_Para que serve o axios?_

O [axios](https://axios-http.com/) é um pacote baseado em *promises* que nos permite realizar requisições à APIs (usando AJAX) de forma mais simples (seja a partir do *client side*/*browser*/*front-end* ou a partir do *server side*/back-end). Confira a [documentação](https://axios-http.com/), o [pacote disponível no npm](https://www.npmjs.com/package/axios#axios-api) e o [repositório do axios](https://github.com/axios/axios) para maiores informações.

### Finalidade

_Mas afinal, pra quê precisamos saber de tudo isso?_

Bom, como estamos consultando um sistema externo, não sabemos (com certeza absoluta) o que receberemos como retorno, quanto tempo levará para recebermos... Com tais recursos, podemos:

1. **Garantir que a aplicação não vai travar** até recebermos uma resposta;

2. **Nos precavermos caso a resposta seja um erro**;

3. **Manter o usuário na mesma página**, melhorando sua experiência;

4. **Integrar nossa aplicação com outras** aplicações (ampliando as possibilidades e mantendo nosso foco no que realmente importa para o nosso projeto).

## \#03. Exercício

_E aí? Tem coragem de encarar um desafio?_

Agora que já conhece todos os conceitos e ferramentas necessários para consultar uma API, vamos continuar com a prática exposta no Live Coding. Já conseguimos capturar as informações gerais de um usuário a partir de seu *username*.

O desafio é listar todos os repositórios do usuário, exibindo:

* Título do repositório

* Principal Linguagem

* Data de Criação

* Data de Atualização

* Descrição

* Link para o repositório

Esses repositórios só deverão ser requisitados - e exibidos - caso o usuário clique num botão 'Ver Repositórios'. O resultado esperado é algo semelhante a essas telas:

![Screenshot](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F30ec51a0-14c6-45ae-9aac-695445090f56%2Fchallenge-screenshot.png?table=block&id=035bba20-3390-4d2f-91db-1ee3217fc59e&spaceId=fa024bdf-23e1-41d2-b1a2-6bfa1a2aa953&width=1920&userId=&cache=v2)

Deixamos o HTML e o CSS preparados, para que possa focar quase que totalmente no consumo da API e em JavaScript. Mas...

> Atenção! Repare que agora estamos tratando de um array de objetos, ou seja, receberemos mais de um objeto - e não podemos usar o mesmo ID para diferentes elementos no mesmo documento, o ID deve ser único. 🧐

[Link do exercício no CodePen](https://codepen.io/marcelo-diament/pen/ZEemQqX)

## Links Complementares

_Confira alguns links interessantes para aprofundar-se no tema!_

* [Repositório da Prática da Aula | Repositório GitHub](https://github.com/Marcelo-Diament/axios-basic-practice)

* [Introdução às Web APIs | MDN](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

* [JavaScript APIs | MDN](https://developer.mozilla.org/pt-BR/docs/Mozilla/Add-ons/WebExtensions/API)

* [O que é API? REST e RESTful? | Rocketseat (YT)](https://www.youtube.com/watch?v=ghTrp1x_1As)

* [Promise | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* [Usando promises | MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises)

* [Desvendando DEFINITIVAMENTE as Promises em JavaScript | Código Fonte TV (YT)](https://www.youtube.com/watch?v=nRJhc6vXyK4)

* [AJAX Introduction | W3Schools](https://www.w3schools.com/js/js_ajax_intro.asp)

* [AJAX Crash Course | Traversy Media (YT)](https://www.youtube.com/watch?v=82hnvUYY6QA)

* [Axios | Site Oficial](https://axios-http.com/)

* [Axios | GitHub](https://github.com/axios/axios)

* [Axios | npm](https://www.npmjs.com/package/axios)

* [Axios Crash Course | Traversy Media (YT)](https://www.youtube.com/watch?v=6LyagkoRWYA)

* [Lista de APIs Públicas | public-apis (GitHub)](https://github.com/public-apis/public-apis)

---

## Obrigado!

Espero que essa aula tenha te ajudado a compreender esses conceitos básicos, necessários para realizarmos consultas `GET` a uma API pública.

Não deixe de criar projetos pessoais, consultando outras APIs públicas - dessa forma conseguirá consolidar os conhecimentos passados e deixar seu portfólio 'tunado' para encantar recrutadores e gerentes de desenvolvimento. 🚀🚀🚀

Em caso de dúvidas, comentários, críticas e sugestões, sinta-se à vontade para entrar em contato!

Marcelo Diament | [LinkedIn](https://www.linkedin.com/in/marcelodiament/) | [GitHub](https://github.com/Marcelo-Diament)
