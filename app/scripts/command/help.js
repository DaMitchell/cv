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
            'Display help information'
        ];
    }

    function execute(args) {
        var lines = [
            {content: api.config.title + ' <span class="white">version</span> <span class="yellow">' + api.config.version + '</span>'},
            {}
        ];

        if (!args.length) {
            lines = lines.concat(showAll());
        } else {
            lines = lines.concat(showHelpForCommand(args));
        }

        lines.map(function(line) {
            $(api).trigger(Events.OUTPUT, line);
        });
    }

    function showAll() {
        var lines = [
            {content: 'Usage:', classes: ['yellow']},
            {content: '  command [arguments]', classes: ['fade-in']},
            {},
            {classes: ['yellow'], content: 'Available commands:'}
        ];

        return lines.concat(renderCommands(), [
            {},
            {content: 'See \'help &lt;command&gt;\' for more information on a specific command.'},
            {}
        ]);
    }

    function renderCommands() {
        var longest = 0;
        var lines = [];
        var line, name;

        var commands = api.commands.map(function(command) {
            if (typeof(command.getCommand) !== 'function') {
                return false;
            }

            name = command.getCommand();

            if (name.length > longest) {
                longest = name.length;
            }

            return {
                name: name,
                description: typeof(command.getDescription) === 'function' ? command.getDescription() : ''
            };
        });

        commands.map(function(command) {
            $.makeArray(command.description).map(function(descriptionLine, idx) {
                if (idx === 0) {
                    line = '  ' + command.name + spacePadding(descriptionLine, ((longest - command.name.length) + 4));
                } else {
                    line = '  ' + spacePadding(descriptionLine, (longest + 4));
                }

                 lines.push({
                    content: line,
                    classes: [
                        'white',
                        'fade-in'
                    ]
                });
            });
        });

        return lines;
    }

    function showHelpForCommand(args) {
        var lines = [{
            content: 'There isn\'t any extra help for this command',
            classes: [
                'blue',
                'fade-in'
            ]
        }];

        var command = _.find(api.commands, function(command) {
            return command.getCommand() === args[0];
        });

        if (command && typeof(command.getHelp) === 'function') {
            lines = $.makeArray(command.getHelp()).map(function(line) {
                if(_.isString(line)) {
                    line = {
                        content: line,
                        classes: ['fade-in']
                    };
                }

                return line;
            });
        }

        return lines;
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
