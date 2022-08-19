const express = require('express'); 
const cors = require('cors')
const server = express();
const produto = require('./src/routes/produto')

const PORT = 8080


server.use(express.json())
server.use(cors())

server.use('/produto', produto)

server.get('/', (req, res) => {
    res.sendStatus(200)    
})

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
