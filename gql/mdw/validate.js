const createValidateMiddleware = ({ isSchemaField, schemaOptions }) => {
    const isSchema = obj =>
        obj && !!obj[isSchemaField] && obj.validate && typeof obj.validate === 'function'

    return fields => async (resolver, parent, args, ctx, info) => {
        if (isSchema(fields)) {
            await fields.validate(args, schemaOptions)
        } else {
            await Promise.all(
                Object.keys(fields || {}).map(field =>
                    fields[field].validate(args[field], schemaOptions),
                ),
            )
        }

        return resolver(parent, args, ctx, info)
    }
}

exports = module.exports = createValidateMiddleware({
    isSchemaField: '__isYupSchema__',
    schemaOptions: { abortEarly: false },
})

exports.createValidateMiddleware = createValidateMiddleware
