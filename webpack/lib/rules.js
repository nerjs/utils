module.exports = ({ react, reactHot, gql, styled, targets }) => {
    const presets = [['@babel/preset-env', { targets }]]

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-runtime',
    ]

    if (react) {
        presets.push('@babel/preset-react')
    }

    if (styled) {
        plugins.push([
            'babel-plugin-styled-components',
            {
                displayName: true,
                fileName: true,
            },
        ])
    }

    if (reactHot) {
        plugins.push('react-hot-loader/babel')
    }

    const rules = [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets,
                        plugins,
                    },
                },
            ],
        },
    ]

    if (gql) {
        rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        })
    }

    return rules
}
