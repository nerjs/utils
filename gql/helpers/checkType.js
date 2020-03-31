const isObjectId = require('./isObjectId')

const isNumber = num => typeof num === 'number'

const isString = str => typeof str === 'string'

module.exports = {
    ObjectId: isObjectId,
    string: isString,
    number: isNumber,
    id: id => isObjectId(id) || isNumber(id),
}
