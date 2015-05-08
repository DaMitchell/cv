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
            return 'spin';
        }

        function getDescription()
        {
            return 'Just a random command to make the console spin';
        }

        function execute()
        {
            $(consoleApi.config.container).removeClass('spin').addClass('spin');
        }

        return {
            init: init,
            getCommand: getCommand,
            getDescription: getDescription,
            execute: execute
        };
    };
});