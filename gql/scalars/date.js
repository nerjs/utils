const { GraphQLScalarType, Kind } = require('graphql')

const parseDate = _date => {
    const date = new Date(_date)
    // if (isNaN(date)) throw new GqlValidationError(`Invalid Date.`, _date, date)
    if (isNaN(date)) throw new Error(`Invalid Date.`)
    return date
}

const DateResolver = new GraphQLScalarType({
    name: 'Date',
    description:
        'The `Date` scalar type' +
        ' Can be transmitted as a number (`timestamp`) or a string (`js Date format`)',
    serialize(value) {
        const date = parseDate(value)
        return process.env.NODE_ENV !== 'production' ? date.toJSON() : date.getTime()
    },
    parseValue: parseDate,
    parseLiteral: ast => {
        if (ast.kind === Kind.INT) return parseDate(Number(ast.value))
        if (ast.kind === Kind.STRING) return parseDate(ast.value)
        throw new GqlValidationError(
            `Incorrect type argument. [${ast.kind}!==(${Kind.INT}|${Kind.STRING})]`,
            ast.kind,
            [Kind.INT, Kind.STRING],
        )
    },
})

module.exports = DateResolver
