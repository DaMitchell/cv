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
            return 'clear';
        }

        function execute()
        {
            $(consoleApi.config.output).find('.line').remove();
        }

        return {
            init: init,
            getCommand: getCommand,
            execute: execute
        };
    };
});