module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: [
        '../components/**/*.stories.mdx',
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
        '../styles/**/*.stories.mdx',
        '../styles/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    webpackFinal: async (baseConfig) => {
        // Needed for SVG importing using svgr
        const indexOfRuleToRemove = baseConfig.module.rules.findIndex((rule) =>
            rule.test && rule.test.toString().includes('svg')
        );

        baseConfig.module.rules.splice(indexOfRuleToRemove, 1, {
            test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
            loader: require.resolve('file-loader'),
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
                esModule: false,
            },
        });

        baseConfig.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                    },
                },
            ],
        });

        baseConfig.module.rules.push({
            test: /\.scss$/,
            sideEffects: true,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        })

        return baseConfig
    },
}