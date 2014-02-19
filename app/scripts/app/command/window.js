/* global define */
define(['jquery', 'events'], function($, events)
{
    'use strict';

    /** @constructor */
    return function()
    {
        var consoleApi;

        function init(api)
        {
            consoleApi = api;
        }

        function getCommand()
        {
            return 'window';
        }

        function execute(args)
        {
            var container = $(consoleApi.config.container);
            var size = args[0];

            if((size === 'full' && container.hasClass('full')) ||
               (size === 'small' && container.hasClass('small')))
            {
                return;
            }

            var sizeClass;

            switch(size)
            {
                case 'full':
                case 'small':
                    sizeClass = size;
                    break;
            }

            if(sizeClass)
            {
                container.removeClass('full small').addClass(sizeClass);
            }
            else
            {
                $(consoleApi).trigger(events.OUTPUT, {
                    content: 'Sorry "' + size + '" is an invalid size'
                });
            }
        }

        function displayHelp()
        {

        }

        return {
            init: init,
            getCommand: getCommand,
            execute: execute
        };
    };
});