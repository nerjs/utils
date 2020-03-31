module.exports = id =>
    (typeof id === 'string' && id.length === 24) ||
    (typeof id === 'object' && id._bsontype === 'ObjectID' && id.id instanceof Buffer)
