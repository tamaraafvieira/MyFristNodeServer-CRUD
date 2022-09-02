---
marp: true
title: Passo-a-passo - Servidor Node express 
paginate: true

---
# Slide 1

Passo-a-passo de como criar o servidor Node express com File System

---

# Slide 2

No terminal:
1- npm install
2- npm init (aí vai seguindo o que ele te falar dando enter)
3- criar um arquivo server.js na pasta inicial
4- npm install express --save

*O --save salva o express como uma dependencia no packge.json.

---
# Slide 2
5- Para fazer uma verificação: digitar console.log('Servidor on') no arquivo server.js
6- Para rodar o servidor basta digitar no terminal: node server.js
7- no server.js digitar essas duas const:
const express = require('express');   -- essa é para requisitar o express
const server = express();             -- nessa você pode dar o nome que quiser (app, server, etc), ela também                                   é para fazer uma requisição do express

---
# Slide 3
Para o navegador poder conectar é preciso utilizar o método listen do Express. Podemos utilizar de várias formas como escrever diretamente e utilizar uma função:

server.listen(3000, function() {
  console.log('listening on 3000')
})

porém, para o código ficar limpo é importante evitar utilizar function, e usar mais Arrow functions fazendo dessa forma:

8- colocar essa const: const PORT = 8080 -- utilizar a porta que quiser
9- 
server.listen(PORT, () => {    
    console.log(`Servidor rodando na porta ${PORT}`)  
})

---
# Slide 4

É importante ressaltar a diferença entre uma Template String e uma String normal:
Template String: console.log(`Servidor rodando na porta ${PORT}`) -- só utilizar o símbolo da crase em vez das áspas
String normal: console.log('Servidor rodando na porta' + PORT)

*Com a Template String o código fica mais limpo

---
# Slide 5

Agora é só abrir o navegador e digitar 
localhost:8080  -- ou a porta que você definiu

O servidor já está on! :D 
Hora de fazer nosso CRUD

---
# Slide 6
Vamos fazer a rota GET
-> Rota/requisição do tipo GET é "pegar". 
-> Requisição é uma ação. A requisição do tipo GET é pegar uma informação . 
-> Entrar em um site e digitar algo é do tipo GET.

---
# Slide 7 
10- server.get('/', (req, res) => {
    res.sendStatus(200)
})

-A expressão é: app.get(endpoint, callback)
- *O endpoint* é o valor que vem depois do nome de domínio tipo /livros, /cliente
-Quando você visita http://localhost:8080 , você está na verdade visitando http://localhost:8080/ , nesse caso o navegador vai requisitar o  /
-Então o nome de domínio é http://localhost:8080 e a requisição de endpoint é tudo que vem depois.
- *O callback* diz para o servidor o que ele deve fazer quando há a requisição de endpoint. 
- Dessa forma temos que colcoar dois argumentos: request (req) e response (res)
- Esse sendStatus são os Status do HTML, o 200 indica que está OK
---
# Slide 8

Para poder testar o servidor é preciso primeiro fazer ele parar de rodar com o comando CRTl+C no terminal e depois iniciar ele novamente com node server.js

Se eu quiser inserir uma página html no get seria só colocar dentro da função res.sendFile(NomeDoDiretório + '/index.html')

---
# Slide 9
Agora vamos instalar o Nodemon
11- npm install nodemon --save-dev

A Flag --save-dev é porque nós utilizamos o Nodemon como uma dependência de desenvolvimento e não no server final. Então vai ser adicionada uma "devDependencies" no package.json

12- mate o servicor - CTRL + C
13- nodemon server.js

Por termos instalado o nodemon para rodar o server temos que utilizar o comando nodemon server.js

---
# Slide 10
Agora no nosso arquivo Package.json devemos escrever um script  para poder rodar o nodemon server.js

14- "scripts": {
    "dev": "nodemon server.js"
  },
  - colocar em baixo de main

  Agora podemos rodar o servidor com npm run dev - assim vai acionar o script e rodar o comando nodemon "por debaixo dos panos" 

15- mate o servidor e rode com npm run dev

Agora podemos voltar a fazer o CRUD!

---
# Slide 11

Para podermos criar operações, temos que fazer uma request do tipo POST para o server. 
Se for usar o index.html é só fazer um form com form action="/produto" com o method="POST" para poder fazer a requisição. Mas aqui só irie fazer o servidor e testar no PostMan

Vamos testar a nossa rota GET! 
Então é só abrir o PostMan e setar a rota GET > http://localhost:8080 e pronto.

---
# Slide 12

16- Criar uma pasta chamada src
17- Criar um arquivo index.js
18- Criar uma pasta chamada routes
19- Dentro de routes criar as rotas, no caso um arquivo chamado produto.js

Dentro de produto.js vamos colocar o get e o post, mas antes de tudo tem que colcoar as const do express
20 - 
const express = require('express')
const router = express.Router()

---
# Slide 13
21-
router.get('/', async (req, res) => {
    //response.status(200).json({
    //    menssagem: "Bem vindo à rota de produto"
    //})
    return res.json(produto)
})
* O que está comentado é para poder testar, depois é só apagar. 

ao final de tudo temos que exportar
22- module.exports = router 

23-Para o server poder ler essa nova rota temos que chama-la no server.js, então primeiro colocamos a rota: 
   const livros = require('./src/routers/produto')
24- Depois chamamos: server.use('/produto', produto)


---
# Slide 14
Para o método Post: no arquivo produto.js ...
25- 
router.post('/', async (req, res) => {
    const {nomeItem, tipoItem, marcaItem, precoItem} = req.body
    
    const item ={
        nomeProduto,
        tipoItem,
        marcaItem,
        precoItem,
        id: randomUUID()
    }

    produto.push(item)

    itemNoArquivo()

    return res.json(item)    
})

---
# Slide 15
- O '/' é a rota (no nosso caso a rota é a principal)
- async é de assincronismo, pois queremos que o código seja assíncrono
- o request.body é o corpo da requisição, onde enviamos dados que serão gravados no servidor (caso haja um)
- então, precisamos caracterizar os itens que serão "postados", cara item terá algumas características (nome, tipo, etc)
- para facilitar precisamos colocar um id em casa item e para que o id seja gerado automaticamente. Para isso utilizamos o método randomUUID() da ferramente de criptografia Crypto, mas antes precisamos chamar ela lá em cima.
- itemNoArquivo() é pq vamos ainda fazer um parâmetro para poder inserir os itens em um arquivo utilizando o file system


---
# Slide 16
26- const {randomUUID} = require('crypto')
- O método push() adiciona elementos ao final de um array e retorna o novo comprimento desse array. Então nós utilizamos ele queremos adicionar informações dentro do array.
- Para podermos consumir a API devemos fazer a validação corns no arquivo server.js
27- server.use(express.json())
28- instalar o cors com o comando: npm install cors

---
# Slide 17
29- server.use(cors())
- O cors é uma validação, sem ela não conseguimos consumir a API, lá em cima colocar também:
30- const cors = require('cors')

30- let produto = [] 
- Também colocar esse let, pois queremos que os dados sejam inseridos em um array

---
# Slide 18
- No arquivo index.js dentro de src vamos exportar para o server nossa rota de produros
31- module.exports = (server) => {
    server.use('/produto', require('./routers/produto'))
}

- Se tivéssemos outras rotas, iriamos colocá-las também no index.js

- Podemos testar com o PostMan, porém teremos que comentar o itemNoArquivo() em produto.js, pois ainda não o estamos utilizando

---
# Slide 19
- Agora itemos fazer nosso File System
No produto.js vamos incluir o File System:
32- const fs = requise('fs')

- Agora vamos dizer para o servidor criar o arquivo

33- const itemNoArquivo = () => {    
    fs.writeFile('produto.json', JSON.stringify(produto), (erro) => {        
        if (erro) {
            console.error(erro)
        } else {
            console.log('Livro inserido no arquivo produto.json')
        }
    })
}

---
# Slide 20
- O método JSON.stringify() converte valores em javascript para uma String JSON. 

- Agora é só enviar um Post pelo PostMan que ele vai criar o arquivo json que solicitamos. 

- Precisamos dizer como o fs deve ler o arquivo

---
# Slide 21
34- 
fs.readFile('produto.json', 'utf-8', (erro, data) => {
    // agora tem que fazer ele voltar a ser lido para o get, entao tem que passar ele pra objeto novamente
    if (erro){
        console.erro(erro)
    } else {
        produto = JSON.parse(data)
    }
})

- Esse data é de dados, registro... Podemos testar que está rodando...
---
# Slide 22
- Vamos fazer o PUT que serve para fazer alterações em algum registro
35-
---
# Slide 23
router.put('/:id', (req, res) => {
    const {id} = req.params
    const {nomeItem, pesoItem, marcaItem, precoItem} = req.body
    const itemIndex = produto.findIndex((item) => item.id === id)
    produto[itemIndex] = {        
        ... produto[itemIndex],        
        nomeItem,
        pesoItem,
        marcaItem,
        precoItem
    }
    itemNoArquivo()
    return res.json({
        mensagem: "Item alterado com sucesso"
    })
})

---
# Slide 24
- ... é o operador Spread: Permite expandir uma expressão em um local que receba múltiplos argumentos ou elementos. 
... é para nao mudar o id. Ele tras tudo do array em vez de ficar mudando o que está lá


---
# Slide 25
DELETE
36-
router.delete('/:id', (req, res) => {
  const { id } = req.params

  const itemIndex = produto.findIndex((item) => item.id === id)

  produto.splice(itemIndex, 1)

  produtoArquivo()

  return res.json({ mensagem: "Item removido com sucesso" })
})


---
# Slide 26
- O splice deleta, ele pode adicionar ou remover elementos antigos
- O 1 é porque ele vai excluir um elemento só

---
# Slide 27

\o/

Dica:
Encontrei essa publicação que está super explicada e ensina até a conectar com o Banco de dados Mongo
https://zellwk.com/blog/crud-express-mongodb/
