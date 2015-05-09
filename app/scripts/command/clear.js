'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'clear';
    }

    function getDescription() {
        return 'Clear the window of all past output.';
    }

    function execute() {
        $(api).trigger(Events.OUTPUT_CLEAR);
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
