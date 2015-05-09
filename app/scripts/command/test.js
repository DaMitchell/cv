'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'test';
    }

    function getDescription() {
        return 'Some test lines to see the different theme colors';
    }

    function execute() {

        var testText = 'This is some test text to see the colors';
        var colors = [
            'black',
            'red',
            'green',
            'yellow',
            'blue',
            'magenta',
            'cyan',
            'white',
        ];

        colors.map(function(color){
            $(api).trigger(Events.OUTPUT, {content: testText, classes: [color]});
        });
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
