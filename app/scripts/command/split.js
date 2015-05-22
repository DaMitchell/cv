'use strict';

//import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'split';
    }

    function getDescription() {
        return 'Split the console window';
    }

    function execute() {
        var left = $('<div>').addClass('left');
        var right = $('<div>').addClass('right').append(api.config.containerClone.clone());

        $(api.config.container).parent().append(left);
        $(api.config.container).parent().append(right);

        $(api.config.container).appendTo(left);

        api.hierarchy.addChild(new require('console')['default'](right.find('.console'), {
            parent: api
        }));
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
