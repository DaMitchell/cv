'use strict';

import Events from 'events';

export default function() {
    var api;

    function init(consoleApi) {
        api = consoleApi;
    }

    function getCommand() {
        return 'help';
    }

    function getDescription() {
        return [
            'This is the help commands description',
            'It is a multi-line example of a description',
            'Just a 3rd one for example'
        ];
    }

    function execute() {
        var lines = [
            {content: api.config.title + ' <span class="white">version</span> <span class="yellow">' + api.config.version + '</span>'},
            {},
            {classes: ['yellow'], content: 'Usage:'},
            {classes: [
                'white',
                'fade-in'
            ], content: '  command [arguments]'},
            {},
            {classes: ['yellow'], content: 'Available commands:'}
        ];

        var i, length;

        for (i = 0, length = lines.length; i < length; i++) {
            $(api).trigger(Events.OUTPUT, lines[i]);
        }

        renderCommands();
    }

    function renderCommands() {
        var commands = [];
        var longest = 0;
        var i, length, commandObj, command, line;

        for (i = 0, length = api.commands.length; i < length; i++) {
            commandObj = api.commands[i];

            if (typeof(commandObj.getCommand) !== 'function') {
                continue;
            }

            command = {
                name: commandObj.getCommand(),
                description: typeof(commandObj.getDescription) === 'function' ? commandObj.getDescription() : ''
            };

            if (command.name.length > longest) {
                longest = command.name.length;
            }

            commands.push(command);
        }

        for (i = 0; i < commands.length; i++) {
            command = commands[i];

            if ($.isArray(command.description)) {
                var j;

                for (j = 0; j < command.description.length; j++) {
                    if (j === 0) {
                        line = '  ' + command.name + spacePadding(command.description[j], ((longest - command.name.length) + 4));
                    }
                    else {
                        line = '  ' + spacePadding(command.description[j], (longest + 4));
                    }

                    $(api).trigger(Events.OUTPUT, {
                        content: line,
                        classes: [
                            'white',
                            'fade-in'
                        ]
                    });
                }
            }
            else {
                line = '  ' + command.name + spacePadding(command.description, ((longest - command.name.length) + 4));

                $(api).trigger(Events.OUTPUT, {
                    content: line,
                    classes: [
                        'white',
                        'fade-in'
                    ]
                });
            }
        }
    }

    function spacePadding(string, amount) {
        var i, padded = '';

        for (i = 0; i < amount; i++) {
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
}
