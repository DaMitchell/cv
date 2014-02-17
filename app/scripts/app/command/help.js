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
            return 'help';
        }

        function execute()
        {
            var lines = [
                {content: consoleApi.config.title + ' <span class="white">version</span> <span class="yellow">' + consoleApi.config.version + '</span>'},
                {},
                {classes: ['yellow'], content: 'Usage:'},
                {classes: ['white'], content: '  command [arguments]'},
                {},
                {classes: ['yellow'], content: 'Available commands:'}
            ];

            var i, length, command;

            for(i = 0, length = lines.length; i < length; i++)
            {
                $(consoleApi).trigger(events.OUTPUT, lines[i]);
            }

            for(i = 0, length = consoleApi.commands.length; i < length; i++)
            {
                command = consoleApi.commands[i];

                if(typeof(command.getCommand) !== 'function')
                {
                    continue;
                }

                $(consoleApi).trigger(events.OUTPUT, {
                    content: '  ' + command.getCommand(),
                    classes: ['white']
                });
            }
        }


        return {
            init: init,
            getCommand: getCommand,
            execute: execute
        };
    };
});