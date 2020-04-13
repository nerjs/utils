const { useContext } = require('react')
const ErrorsContext = require('./provider/ErrorsContext')

module.exports = () => useContext(ErrorsContext)
