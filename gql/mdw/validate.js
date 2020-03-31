const YupGqlError = require('@nerjs/errors/YupGqlError')
const GqlError = require('@nerjs/errors/GqlError')

const createValidateMiddleware = ({ isSchemaField, schemaOptions, errorWrapper }) => {
    const isSchema = obj =>
        obj && !!obj[isSchemaField] && obj.validate && typeof obj.validate === 'function'

    return fields => async (resolver, parent, args, ctx, info) => {
        try {
            if (isSchema(fields)) {
                await fields.validate(args, schemaOptions)
            } else {
                await Promise.all(
                    Object.keys(fields || {}).map(field =>
                        fields[field].validate(args[field], schemaOptions),
                    ),
                )
            }
        } catch (e) {
            if (e.name === 'ValidationError') throw new errorWrapper(e)

            throw new GqlError('Something went wrong', GqlError.codes.INTERNAL_SERVER_ERROR, {}, e)
        }

        return resolver(parent, args, ctx, info)
    }
}

exports = module.exports = createValidateMiddleware({
    isSchemaField: '__isYupSchema__',
    schemaOptions: { abortEarly: false },
    errorWrapper: YupGqlError,
})

exports.createValidateMiddleware = createValidateMiddleware
