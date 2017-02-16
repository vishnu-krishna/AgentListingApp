module.exports = function () {
    var client = './app/';
var temp = './.tmp/';
    var config = {
        /**
         * Files paths
         */
        temp:  temp,
        css: temp + 'styles.css',
        client: client,
        build:'./build/',
        views: client + 'views/**/*.*',
        index: client + 'index.html',
        /**
         * browser sync
         */
        browserReloadDelay: 1000,
        /**
         * Files paths
         */
        alljs: [
            './app/**/*.js',
            './*.js'
        ],
        js: [
            client + '**/*.js',
            //Add this later for Specs
            // '!' + client + '**/*.spec.js'
        ],
        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        sass: client + 'Styles/styles.scss',
        /**
        * Bower and NPM locations
        */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },
       serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],

        /**
         * Node settings
         */
        defaultPort: 7203,
        //nodeServer: './src/server/app.js' //Change it when you make it as server
        nodeServer: 'server.js'

    };
    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
};