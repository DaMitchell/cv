'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'window';
    }

    function getDescription() {
        return [
            'Allows you to change the size of the window.',
            'Will work depending on you screen size.'
        ];
    }

    function execute(args) {
        var container = $(api.config.container);
        var size = args[0];

        if ((size === 'full' && container.hasClass('full')) ||
            (size === 'small' && container.hasClass('small'))) {
            return;
        }

        var sizeClass;

        switch (size) {
            case 'full':
            case 'small':
                sizeClass = size;
                break;
        }

        if (sizeClass) {
            container.removeClass('full small').addClass(sizeClass);
        } else {
            $(api).trigger(Events.OUTPUT, {
                content: 'Sorry "' + size + '" is an invalid size'
            });
        }
    }

    return {
        init: init,
        getCommand: getCommand,
        getDescription: getDescription,
        execute: execute
    };
}
