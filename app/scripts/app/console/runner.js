/* global define */
define(['jquery'], function($) {

    return function(consoleApi) {
        function execute(event, data) {
            var i, length, command;

            for (i = 0, length = consoleApi.commands.length; length > i; i++) {
                command = consoleApi.commands[i];

                if (typeof(command.getCommand) !== 'function' && typeof(command.execute) !== 'function') {
                    continue;
                }

                if (command.getCommand() === $.trim(data.command)) {
                    command.execute(data.args, consoleApi.views.output);
                    return;
                }
            }

            if (data.command.length) {
                consoleApi.views.output.addOutputLine('The command "' + data.command + '" could not be found.');
            }
        }

        return {
            execute: execute
        };
    };
});