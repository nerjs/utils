const graphqlFields = require('graphql-fields')
const checkType = require('../helpers/checkType')

const onlyIdMiddleware = (type = 'ObjectId', fieldQueryName = 'id', nullIfNotArg) => async (
    resolver,
    parent,
    args,
    ctx,
    info,
) => {
    const { fieldName } = info
    if (!parent[fieldName]) return nullIfNotArg ? null : resolver(parent, args, ctx, info)

    if (!checkType[type] || !checkType[type](parent[fieldName]))
        return resolver(parent, args, ctx, info)

    const fields = Object.keys(graphqlFields(info))

    if (fields.length === 1 && fields[0] === fieldQueryName)
        return { [fieldQueryName]: parent[fieldName] }

    return resolver(parent, args, ctx, info)
}

module.exports = onlyIdMiddleware
