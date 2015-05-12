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

    function getHelp() {
        return [
            {content: 'Usage:', classes: ['yellow']},
            {content: '  window &lt;size&gt;', classes: ['fade-in']},
            {content: 'Sizes:', classes: ['yellow']},
            {content: '  min', classes: ['fade-in']},
            {content: '  max', classes: ['fade-in']},
            {content: 'Description:', classes: ['yellow']},
            {content: '  Allow you to change the size of the console window', classes: ['fade-in']},
            {content: '  If you are using this command on a mobile device nothing will happen as the console is always at max.', classes: ['fade-in']}
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
            case 'min':
            case 'max':
                sizeClass = size;
                break;
        }

        if (sizeClass) {
            container.removeClass('min max').addClass(sizeClass);
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
        getHelp: getHelp,
        execute: execute
    };
}
