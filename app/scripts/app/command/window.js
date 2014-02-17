/* global define */
define(['jquery'], function($)
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

            container.removeClass('full small');

            switch(size)
            {
                case 'full':
                    container.addClass('full');
                    break;
                case 'small':
                    container.addClass('small');
                    break;
            }
        }

        return {
            init: init,
            getCommand: getCommand,
            execute: execute
        };
    };
});