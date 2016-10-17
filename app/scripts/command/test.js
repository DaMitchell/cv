'use strict';

import Events from '../events';

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
        var deferred = $.Deferred();
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

        colors.forEach(function(color, i){
            _.delay(function() {
                $(api).trigger(Events.OUTPUT, {content: testText, classes: [color, 'fade-in']});

                if(i === (colors.length - 1)) {
                    deferred.resolve();
                }
            }, (i * 100));
        });

        return deferred.promise();
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
