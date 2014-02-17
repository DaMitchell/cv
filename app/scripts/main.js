/* global requirejs */
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts/app',

    paths: {
        jquery: '../../vendor/jquery/dist/jquery'
    }
});

requirejs(['console']);