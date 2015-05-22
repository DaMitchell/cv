'use strict';

import Events from 'events';

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

    function execute(args) {
        var direction;

        switch(args[0]) {
            case 'horiz':
            case 'vert':
                direction = args[0];
                break;
        }

        if(direction) {
            if(direction === 'vert') {
                var left = $('<div>').addClass('left');
                var right = $('<div>').addClass('right').append(api.config.containerClone.clone());

                $(api.config.container).parent().append(left);
                $(api.config.container).parent().append(right);

                $(api.config.container).appendTo(left);

                api.hierarchy.addChild(new require('console')['default'](right.find('.console'), {
                    parent: api
                }));
            } else if(direction === 'horiz') {
                var top = $('<div>').addClass('top');
                var bottom= $('<div>').addClass('bottom').append(api.config.containerClone.clone());

                $(api.config.container).parent().append(top);
                $(api.config.container).parent().append(bottom);

                $(api.config.container).appendTo(top);

                api.hierarchy.addChild(new require('console')['default'](bottom.find('.console'), {
                    parent: api
                }));
            }

            return true;
        }

        $(api).trigger(Events.OUTPUT, {
            content: 'Sorry "' + direction + '" is an invalid split direction.'
        });
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
