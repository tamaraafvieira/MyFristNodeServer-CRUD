module.exports = (server) => {
    server.use('/produto', require('./routes/produto'))
}