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

        function getDescription()
        {
            return [
                'This is the help commands description',
                'It is a multi-line example of a description',
                'Just a 3rd one for example'
            ];
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

            renderCommands();
        }

        function renderCommands()
        {
            var commands = [];
            var longest = 0;
            var i, length, commandObj, command, line;

            for(i = 0, length = consoleApi.commands.length; i < length; i++)
            {
                commandObj = consoleApi.commands[i];

                if(typeof(commandObj.getCommand) !== 'function')
                {
                    continue;
                }

                command = {
                    name: commandObj.getCommand(),
                    description: typeof(commandObj.getDescription) === 'function' ? commandObj.getDescription() : ''
                };

                if(command.name.length > longest)
                {
                    longest = command.name.length;
                }

                commands.push(command);
            }

            for(i = 0, length = commands.length; i < length; i++)
            {
                command = commands[i];

                if($.isArray(command.description))
                {
                    var j;

                    for(j = 0, length = command.description.length; j < length; j++)
                    {
                        if(j === 0)
                        {
                            line = '  ' + command.name + spacePadding(command.description[j], ((longest - command.name.length) + 4));
                        }
                        else
                        {
                            line = '  ' + spacePadding(command.description[j], (longest + 4));
                        }

                        $(consoleApi).trigger(events.OUTPUT, {
                            content: line,
                            classes: ['white']
                        });
                    }
                }
                else
                {
                    line = '  ' + command.name + spacePadding(command.description, ((longest - command.name.length) + 4));

                    $(consoleApi).trigger(events.OUTPUT, {
                        content: line,
                        classes: ['white']
                    });
                }
            }
        }

        function spacePadding(string, amount)
        {
            var i, padded = '';

            for(i = 0; i < amount; i++)
            {
                padded += ' ';
            }

            return padded + string;
        }

        return {
            init: init,
            getCommand: getCommand,
            getDescription: getDescription,
            execute: execute
        };
    };
});