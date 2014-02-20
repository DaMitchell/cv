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
            return 'about';
        }

        function getDescription()
        {
            return 'Information on what this is all about.';
        }

        function execute()
        {
            function onError()
            {
                console.log('There was an error.');
            }

            function onSuccess(data)
            {
                for(var i = 0; i < data.lines.length; i++)
                {
                    $(consoleApi).trigger(events.OUTPUT, {
                        content: data.lines[i],
                        classes: ['white', 'fade-in']
                    });
                }
            }

            $.getJSON('/data/about.json').done(onSuccess);
        }

        return {
            init: init,
            getCommand: getCommand,
            getDescription: getDescription,
            execute: execute
        };
    };
});