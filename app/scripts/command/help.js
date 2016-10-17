'use strict';

import Command from './command';
import Events from '../events';

class Help extends Command {
    constructor() {
        super('help');
    }

    getDescription() {
        return 'Display help information.';
    }

    execute(args) {
        var lines = [
            {content: this._console.options.title +
                ' <span class="white">version</span> <span class="yellow">' +
                this._console.options.version + '</span>'},
            {}
        ];

        if (!args.length) {
            lines = lines.concat(this.showAll());
        } else {
            var more = this.showHelpForCommand(args);

            if(more.length === 0) {
                return false;
            }

            lines = lines.concat(more);
        }

        lines.concat({}).forEach((line) => this._eventDispatcher.trigger(Events.OUTPUT, line));
    }

    showAll() {
        var lines = [
            {content: 'Usage:', classes: ['yellow']},
            {content: '  command [arguments]', classes: ['fade-in']},
            {},
            {classes: ['yellow'], content: 'Available commands:'}
        ];

        return lines.concat(this.renderCommands(), [
            {},
            {content: 'See \'help &lt;command&gt;\' for more information on a specific command.'}
        ]);
    }

    renderCommands() {
        var longest = 0;
        var line, name;

        return this._console.commands.map(function(command) {
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
        }).map((command) => {
            return $.makeArray(command.description).map((descriptionLine, idx) => {
                if (idx === 0) {
                    line = '  ' + command.name + this.spacePadding(descriptionLine, ((longest - command.name.length) + 4));
                } else {
                    line = '  ' + this.spacePadding(descriptionLine, (longest + 4));
                }

                return {
                    content: line,
                    classes: [
                        'white',
                        'fade-in'
                    ]
                };
            });
        });
    }

    showHelpForCommand(args) {
        var lines = [];

        var command = this._console.commands.find(function(command) {
            return command.getCommand() === args[0];
        });

        if (command) {
            lines = [{
                content: 'There isn\'t any extra help for this command',
                classes: [
                    'blue',
                    'fade-in'
                ]
            }];

            if (typeof(command.getHelp) === 'function' && command.getHelp().length > 0) {
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
        } else {
            this._eventDispatcher.trigger(Events.COMMAND_NOT_FOUND, {command: args[0]});
        }

        return lines;
    }

    spacePadding(string, amount) {
        var i, padded = '';

        for (i = 0; i < amount; i++) {
            padded += ' ';
        }

        return padded + string;
    }
}

export default Help;

/*export default function() {
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

        var command = api.commands.find(function(command) {
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
}*/
