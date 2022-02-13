const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: `http://192.168.0.93:9000/`,
                changeOrigin: true, 
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    },
    assetsDir: 'assets',
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),

            }
        },
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/app.ico'
                },
                productName:'TartanMwd'
            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
