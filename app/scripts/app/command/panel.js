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
            return 'panel';
        }

        function getDescription()
        {
            return 'Just a random command to make the console spin';
        }

        function execute()
        {
            var sidePanel = $('.side-panel');

            if(sidePanel.hasClass('show'))
            {
                sidePanel.addClass('hide').removeClass('show');
            }
            else
            {
                sidePanel.addClass('show').removeClass('hide');
            }
        }

        return {
            init: init,
            getCommand: getCommand,
            getDescription: getDescription,
            execute: execute
        };
    };
});