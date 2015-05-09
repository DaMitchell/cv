'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'about';
    }

    function getDescription() {
        return 'Information on what this is all about.';
    }

    function execute() {
        function onError() {
            $(api).trigger(Events.COMMAND_ERROR, 'There was an error getting fetching the about information.');
        }

        function onSuccess(data) {
            for (var i = 0; i < data.lines.length; i++) {
                $(api).trigger(Events.OUTPUT, {
                    content: data.lines[i],
                    classes: [
                        'white',
                        'fade-in'
                    ]
                });
            }
        }

        $.getJSON('data/about.json').done(onSuccess).fail(onError);
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
