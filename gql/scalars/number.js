const { GraphQLScalarType, Kind } = require('graphql')

const MAX_NUMBER = Math.pow(2, 64) - 1
const MIN_NUMBER = -Math.pow(2, 63)

/*
feature 
После создания кастомного GqlError
*/
// const parseNumber = num => {
//     if (typeof num !== 'number' || isNaN(num))
//         throw new GqlValidationError('Value is not a number', 'NaN', 'Number')
//     if (num < MIN_NUMBER || num > MAX_NUMBER)
//         throw new GqlValidationError('Number is out of range', num, `${MIN_NUMBER}<>${MAX_NUMBER}`)
//     if (num !== parseInt(num, 10))
//         throw new GqlValidationError(`Invalid non-fractional number.`, num, parseInt(num))

//     return num
// }

const parseNumber = num => {
    if (typeof num !== 'number' || isNaN(num)) throw new Error('Value is not a number')
    if (num < MIN_NUMBER || num > MAX_NUMBER) throw new Error('Number is out of range')
    if (num !== parseInt(num, 10)) throw new Error('Invalid non-fractional number.')

    return num
}

const NumberResolver = new GraphQLScalarType({
    name: 'Number',
    description:
        'The `Number` scalar type represents non-fractional signed whole numeric values.' +
        ' `Number` can represent values between -(2^64) and 2^64 - 1.',
    serialize: parseNumber,
    parseValue: parseNumber,
    parseLiteral(ast) {
        if (ast.kind !== Kind.INT)
            throw new GqlValidationError(`Incorrect type argument.`, ast.kind, Kind.INT)

        return parseNumber(Number(ast.value))
    },
})

module.export = NumberResolver
