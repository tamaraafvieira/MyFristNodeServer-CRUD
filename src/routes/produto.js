const express = require('express')
const router = express.Router()
const {randomUUID} = require('crypto')
const fs = require('fs')

let produto = []

const itemNoArquivo = () => {
    fs.writeFile('produto.json', JSON.stringify(produto), (erro) => {
        if (erro){
            console.erro(erro)
        } else {
            console.log('Item inserido no arquivo produto.json')
        }
    })
}

fs.readFile('produto.json', 'utf-8', (erro, data) => {
    if (erro){
        console.erro(erro)
    } else {
        produto = JSON.parse(data)
    }
})


router.get('/', async (req, res) => {    
    return res.json(produto)
})


router.post('/', async (req, res) => {
    const {nomeItem, pesoItem, marcaItem, precoItem} = req.body

    const item ={
        nomeItem,
        pesoItem,
        marcaItem,
        precoItem,
        id: randomUUID()
    }
    produto.push(item)

    itemNoArquivo()

    return res.json(item)
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {nomeItem, pesoItem, marcaItem, precoItem} = req.body

    const itemIndex = produto.findIndex((item) => item.id === id)

    produto[itemIndex] = {
        ...produto[itemIndex],
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

router.delete('/:id', (req, res) => {
    const { id } = req.params
  
    const itemIndex = produto.findIndex((item) => item.id === id)
  
    produto.splice(itemIndex, 1)
  
    itemNoArquivo()
  
    return res.json({ mensagem: "Item removido com sucesso" })
  })
  


module.exports = router